"""
Background job runner for long tasks (model inference, evaluation, hashing).

The web UI polls /api/jobs/{id} for progress; jobs run in daemon threads so the
ASGI event loop stays responsive while the GPU works.
"""
from __future__ import annotations

import threading
import time
import traceback
import uuid
from typing import Any, Callable

JobFn = Callable[["Job"], Any]


class Job:
    def __init__(self, kind: str, title: str = ""):
        self.id = uuid.uuid4().hex[:10]
        self.kind = kind
        self.title = title or kind
        self.status = "queued"  # queued | running | done | error | cancelled
        self.progress = 0
        self.total = 0
        self.message = ""
        self.result: Any = None
        self.error: str | None = None
        self.started = time.time()
        self.finished: float | None = None
        self.cancel_event = threading.Event()

    def update(self, done: int, total: int, message: str = "") -> None:
        self.progress, self.total = done, total
        if message:
            self.message = message

    def to_dict(self) -> dict[str, Any]:
        elapsed = (self.finished or time.time()) - self.started
        eta = None
        if self.status == "running" and self.progress and self.total:
            eta = elapsed / self.progress * (self.total - self.progress)
        return {
            "id": self.id,
            "kind": self.kind,
            "title": self.title,
            "status": self.status,
            "progress": self.progress,
            "total": self.total,
            "message": self.message,
            "result": self.result,
            "error": self.error,
            "elapsed": round(elapsed, 2),
            "eta": round(eta, 1) if eta is not None else None,
        }


class JobManager:
    def __init__(self, keep: int = 50):
        self._jobs: dict[str, Job] = {}
        self._keep = keep
        self._lock = threading.Lock()
        # one GPU-heavy job at a time keeps memory predictable
        self._gpu_lock = threading.Lock()

    def submit(self, kind: str, fn: JobFn, title: str = "", exclusive: bool = True) -> Job:
        job = Job(kind, title)
        with self._lock:
            self._jobs[job.id] = job
            if len(self._jobs) > self._keep:
                for old in list(self._jobs)[: len(self._jobs) - self._keep]:
                    if self._jobs[old].status not in ("queued", "running"):
                        self._jobs.pop(old, None)

        def run() -> None:
            lock = self._gpu_lock if exclusive else None
            if lock:
                lock.acquire()
            try:
                if job.cancel_event.is_set():
                    job.status = "cancelled"
                    return
                job.status = "running"
                job.started = time.time()
                job.result = fn(job)
                job.status = "cancelled" if job.cancel_event.is_set() else "done"
            except Exception as e:  # surfaced to the UI
                job.status = "error"
                job.error = f"{type(e).__name__}: {e}"
                job.message = traceback.format_exc(limit=3)
            finally:
                job.finished = time.time()
                if lock:
                    lock.release()

        threading.Thread(target=run, daemon=True, name=f"guava-job-{job.id}").start()
        return job

    def get(self, job_id: str) -> Job | None:
        return self._jobs.get(job_id)

    def cancel(self, job_id: str) -> bool:
        job = self._jobs.get(job_id)
        if job and job.status in ("queued", "running"):
            job.cancel_event.set()
            return True
        return False

    def list(self) -> list[dict[str, Any]]:
        return [j.to_dict() for j in reversed(list(self._jobs.values()))]


job_manager = JobManager()