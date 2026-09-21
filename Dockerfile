FROM python:3.11-slim

LABEL maintainer="Guava Contributors"
LABEL description="Guava — Unified Dataset Management & Visualization Platform"
LABEL version="0.1.0"

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libcurl4-openssl-dev \
    libssl-dev \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install Rust (for Datumaro's Rust core)
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | \
    sh -s -- -y --default-toolchain stable --profile minimal
ENV PATH="/root/.cargo/bin:${PATH}"

# Set working directory
WORKDIR /app

# Copy project files
COPY pyproject.toml ./
COPY src/ ./src/
COPY README.md ./

# Install Guava with all extras
RUN pip install --no-cache-dir -e ".[torch,huggingface,ultralytics,cli]"

# Default port for Guava App (FiftyOne)
EXPOSE 5151

# MongoDB connection (optional - use external MongoDB)
ENV FIFTYONE_DATABASE_URI=""
ENV GUAVA_DEFAULT_STORAGE="arrow"

# Entry point
ENTRYPOINT ["guava"]
CMD ["--help"]
