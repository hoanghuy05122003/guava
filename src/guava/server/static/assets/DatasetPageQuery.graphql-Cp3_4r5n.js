var e=(function(){var e={defaultValue:null,kind:`LocalArgument`,name:`count`},t={defaultValue:null,kind:`LocalArgument`,name:`cursor`},n={defaultValue:null,kind:`LocalArgument`,name:`extendedView`},r={defaultValue:null,kind:`LocalArgument`,name:`name`},i={defaultValue:null,kind:`LocalArgument`,name:`savedViewSlug`},a={defaultValue:``,kind:`LocalArgument`,name:`search`},o={defaultValue:null,kind:`LocalArgument`,name:`view`},s={alias:null,args:null,kind:`ScalarField`,name:`colorBy`,storageKey:null},c={alias:null,args:null,kind:`ScalarField`,name:`colorPool`,storageKey:null},l={alias:null,args:null,kind:`ScalarField`,name:`colorscale`,storageKey:null},u={alias:null,args:null,kind:`ScalarField`,name:`multicolorKeypoints`,storageKey:null},d={alias:null,args:null,kind:`ScalarField`,name:`showSkeletons`,storageKey:null},f=[{kind:`Variable`,name:`name`,variableName:`name`},{kind:`Variable`,name:`savedViewSlug`,variableName:`savedViewSlug`},{kind:`Variable`,name:`view`,variableName:`extendedView`}],p={alias:null,args:null,kind:`ScalarField`,name:`name`,storageKey:null},m={alias:null,args:null,kind:`ScalarField`,name:`defaultGroupSlice`,storageKey:null},h={alias:null,args:null,kind:`ScalarField`,name:`id`,storageKey:null},g={alias:null,args:null,kind:`ScalarField`,name:`opacity`,storageKey:null},_={alias:null,args:null,kind:`ScalarField`,name:`color`,storageKey:null},v=[{alias:null,args:null,kind:`ScalarField`,name:`intTarget`,storageKey:null},_],y={alias:null,args:null,concreteType:`MaskColor`,kind:`LinkedField`,name:`defaultMaskTargetsColors`,plural:!0,selections:v,storageKey:null},b={alias:null,args:null,kind:`ScalarField`,name:`value`,storageKey:null},x={alias:null,args:null,concreteType:`ColorscaleList`,kind:`LinkedField`,name:`list`,plural:!0,selections:[b,_],storageKey:null},S={alias:null,args:null,kind:`ScalarField`,name:`rgb`,storageKey:null},C={alias:null,args:null,concreteType:`DefaultColorscale`,kind:`LinkedField`,name:`defaultColorscale`,plural:!1,selections:[p,x,S],storageKey:null},w={alias:null,args:null,kind:`ScalarField`,name:`path`,storageKey:null},T={alias:null,args:null,concreteType:`Colorscale`,kind:`LinkedField`,name:`colorscales`,plural:!0,selections:[w,p,x,S],storageKey:null},E={alias:null,args:null,kind:`ScalarField`,name:`fieldColor`,storageKey:null},D={alias:null,args:null,concreteType:`ValueColor`,kind:`LinkedField`,name:`valueColors`,plural:!0,selections:[_,b],storageKey:null},O={alias:null,args:null,concreteType:`CustomizeColor`,kind:`LinkedField`,name:`fields`,plural:!0,selections:[{alias:null,args:null,kind:`ScalarField`,name:`colorByAttribute`,storageKey:null},E,w,D,{alias:null,args:null,concreteType:`MaskColor`,kind:`LinkedField`,name:`maskTargetsColors`,plural:!0,selections:v,storageKey:null}],storageKey:null},k=[E,D],A={alias:null,args:null,concreteType:`LabelTagColor`,kind:`LinkedField`,name:`labelTags`,plural:!1,selections:k,storageKey:null},j={alias:null,args:null,kind:`ScalarField`,name:`disableFrameFiltering`,storageKey:null},M={alias:null,args:null,kind:`ScalarField`,name:`mediaFallback`,storageKey:null},N={alias:null,args:null,kind:`ScalarField`,name:`plugins`,storageKey:null},P={alias:null,args:null,kind:`ScalarField`,name:`paths`,storageKey:null},F={alias:null,args:null,kind:`ScalarField`,name:`createdAt`,storageKey:null},ee={alias:null,args:null,kind:`ScalarField`,name:`datasetId`,storageKey:null},I={alias:null,args:null,kind:`ScalarField`,name:`info`,storageKey:null},L={alias:null,args:null,kind:`ScalarField`,name:`lastLoadedAt`,storageKey:null},R={alias:null,args:null,kind:`ScalarField`,name:`mediaType`,storageKey:null},z={alias:null,args:null,kind:`ScalarField`,name:`version`,storageKey:null},B={alias:null,args:null,kind:`ScalarField`,name:`key`,storageKey:null},V={alias:null,args:null,kind:`ScalarField`,name:`timestamp`,storageKey:null},H={alias:null,args:null,kind:`ScalarField`,name:`viewStages`,storageKey:null},U={alias:null,args:null,kind:`ScalarField`,name:`cls`,storageKey:null},W={alias:null,args:null,kind:`ScalarField`,name:`type`,storageKey:null},G=[{alias:null,args:null,kind:`ScalarField`,name:`target`,storageKey:null},b],K={alias:null,args:null,kind:`ScalarField`,name:`labels`,storageKey:null},q={alias:null,args:null,kind:`ScalarField`,name:`edges`,storageKey:null},J={alias:null,args:null,kind:`ScalarField`,name:`ftype`,storageKey:null},Y={alias:null,args:null,kind:`ScalarField`,name:`subfield`,storageKey:null},X={alias:null,args:null,kind:`ScalarField`,name:`embeddedDocType`,storageKey:null},Z={alias:null,args:null,kind:`ScalarField`,name:`dbField`,storageKey:null},Q={alias:null,args:null,kind:`ScalarField`,name:`description`,storageKey:null},$=[p,{alias:null,args:null,kind:`ScalarField`,name:`unique`,storageKey:null},{alias:null,args:null,concreteType:`IndexFields`,kind:`LinkedField`,name:`key`,plural:!0,selections:[{alias:null,args:null,kind:`ScalarField`,name:`field`,storageKey:null},W],storageKey:null},{alias:null,args:null,concreteType:`WildcardProjection`,kind:`LinkedField`,name:`wildcardProjection`,plural:!1,selections:[{alias:null,args:null,kind:`ScalarField`,name:`fields`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`inclusion`,storageKey:null}],storageKey:null}],te=[{kind:`Variable`,name:`after`,variableName:`cursor`},{kind:`Variable`,name:`first`,variableName:`count`},{kind:`Variable`,name:`search`,variableName:`search`}],ne={kind:`Variable`,name:`datasetName`,variableName:`name`},re=[w,J,Y,X,I,Q];return{fragment:{argumentDefinitions:[e,t,n,r,i,a,o],kind:`Fragment`,metadata:null,name:`DatasetPageQuery`,selections:[{alias:null,args:null,concreteType:`AppConfig`,kind:`LinkedField`,name:`config`,plural:!1,selections:[s,c,l,u,d],storageKey:null},l,{alias:null,args:f,concreteType:`Dataset`,kind:`LinkedField`,name:`dataset`,plural:!1,selections:[p,m,{alias:null,args:null,concreteType:`DatasetAppConfig`,kind:`LinkedField`,name:`appConfig`,plural:!1,selections:[{alias:null,args:null,concreteType:`ColorScheme`,kind:`LinkedField`,name:`colorScheme`,plural:!1,selections:[h,s,c,u,g,d,y,C,T,O,A],storageKey:null}],storageKey:null},{args:null,kind:`FragmentSpread`,name:`datasetFragment`}],storageKey:null},{args:null,kind:`FragmentSpread`,name:`NavFragment`},{args:null,kind:`FragmentSpread`,name:`savedViewsFragment`},{args:null,kind:`FragmentSpread`,name:`configFragment`},{args:null,kind:`FragmentSpread`,name:`stageDefinitionsFragment`},{args:null,kind:`FragmentSpread`,name:`viewSchemaFragment`}],type:`Query`,abstractKey:null},kind:`Request`,operation:{argumentDefinitions:[e,t,r,n,i,a,o],kind:`Operation`,name:`DatasetPageQuery`,selections:[{alias:null,args:null,concreteType:`AppConfig`,kind:`LinkedField`,name:`config`,plural:!1,selections:[s,c,l,u,d,j,{alias:null,args:null,kind:`ScalarField`,name:`gridZoom`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`enableQueryPerformance`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`defaultQueryPerformance`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`loopVideos`,storageKey:null},M,{alias:null,args:null,kind:`ScalarField`,name:`maxQueryTime`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`notebookHeight`,storageKey:null},N,{alias:null,args:null,kind:`ScalarField`,name:`showConfidence`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`showIndex`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`showLabel`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`showTooltip`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`theme`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`timezone`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`useFrameNumber`,storageKey:null}],storageKey:null},l,{alias:null,args:f,concreteType:`Dataset`,kind:`LinkedField`,name:`dataset`,plural:!1,selections:[p,m,{alias:null,args:null,concreteType:`DatasetAppConfig`,kind:`LinkedField`,name:`appConfig`,plural:!1,selections:[{alias:null,args:null,concreteType:`ColorScheme`,kind:`LinkedField`,name:`colorScheme`,plural:!1,selections:[h,s,c,u,g,d,y,C,T,O,A,{alias:null,args:null,concreteType:`TemporalTagColor`,kind:`LinkedField`,name:`temporalTags`,plural:!1,selections:k,storageKey:null}],storageKey:null},{alias:null,args:null,concreteType:`ActiveFields`,kind:`LinkedField`,name:`activeFields`,plural:!1,selections:[{alias:null,args:null,kind:`ScalarField`,name:`exclude`,storageKey:null},P],storageKey:null},j,{alias:null,args:null,kind:`ScalarField`,name:`dynamicGroupsTargetFrameRate`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`gridMediaField`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`mediaFields`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`modalMediaField`,storageKey:null},M,N,{alias:null,args:null,concreteType:`SidebarGroup`,kind:`LinkedField`,name:`sidebarGroups`,plural:!0,selections:[{alias:null,args:null,kind:`ScalarField`,name:`expanded`,storageKey:null},P,p],storageKey:null}],storageKey:null},F,ee,{alias:null,args:null,kind:`ScalarField`,name:`groupField`,storageKey:null},h,I,L,{alias:null,args:null,kind:`ScalarField`,name:`mediaSources`,storageKey:null},R,{alias:null,args:null,kind:`ScalarField`,name:`parentMediaType`,storageKey:null},z,{alias:null,args:null,concreteType:`BrainRun`,kind:`LinkedField`,name:`brainMethods`,plural:!0,selections:[B,z,V,H,{alias:null,args:null,kind:`ScalarField`,name:`ready`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`error`,storageKey:null},{alias:null,args:null,concreteType:`BrainRunConfig`,kind:`LinkedField`,name:`config`,plural:!1,selections:[U,{alias:null,args:null,kind:`ScalarField`,name:`embeddingsField`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`method`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`patchesField`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`supportsPrompts`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`numDims`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`pointsField`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`model`,storageKey:null},W,{alias:null,args:null,kind:`ScalarField`,name:`maxK`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`supportsLeastSimilarity`,storageKey:null}],storageKey:null}],storageKey:null},{alias:null,args:null,concreteType:`Target`,kind:`LinkedField`,name:`defaultMaskTargets`,plural:!0,selections:G,storageKey:null},{alias:null,args:null,concreteType:`KeypointSkeleton`,kind:`LinkedField`,name:`defaultSkeleton`,plural:!1,selections:[K,q],storageKey:null},{alias:null,args:null,concreteType:`EvaluationRun`,kind:`LinkedField`,name:`evaluations`,plural:!0,selections:[B,z,V,H,{alias:null,args:null,concreteType:`EvaluationRunConfig`,kind:`LinkedField`,name:`config`,plural:!1,selections:[U,{alias:null,args:null,kind:`ScalarField`,name:`predField`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`gtField`,storageKey:null}],storageKey:null}],storageKey:null},{alias:null,args:null,concreteType:`Group`,kind:`LinkedField`,name:`groupMediaTypes`,plural:!0,selections:[p,R],storageKey:null},{alias:null,args:null,concreteType:`NamedTargets`,kind:`LinkedField`,name:`maskTargets`,plural:!0,selections:[p,{alias:null,args:null,concreteType:`Target`,kind:`LinkedField`,name:`targets`,plural:!0,selections:G,storageKey:null}],storageKey:null},{alias:null,args:null,concreteType:`NamedKeypointSkeleton`,kind:`LinkedField`,name:`skeletons`,plural:!0,selections:[p,K,q],storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`estimatedFrameCount`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`estimatedSampleCount`,storageKey:null},{alias:null,args:null,concreteType:`SampleField`,kind:`LinkedField`,name:`frameFields`,plural:!0,selections:[J,Y,X,w,Z,Q,I],storageKey:null},{alias:null,args:null,concreteType:`Index`,kind:`LinkedField`,name:`frameIndexes`,plural:!0,selections:$,storageKey:null},{alias:null,args:null,concreteType:`Index`,kind:`LinkedField`,name:`sampleIndexes`,plural:!0,selections:$,storageKey:null},{alias:null,args:null,concreteType:`SampleField`,kind:`LinkedField`,name:`sampleFields`,plural:!0,selections:[w,J,Y,X,Z,Q,I],storageKey:null},{alias:null,args:[{kind:`Variable`,name:`slug`,variableName:`savedViewSlug`},{kind:`Variable`,name:`view`,variableName:`view`}],kind:`ScalarField`,name:`stages`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`viewCls`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`viewName`,storageKey:null}],storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`context`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`dev`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`doNotTrack`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`uid`,storageKey:null},z,{alias:null,args:te,concreteType:`DatasetStrConnection`,kind:`LinkedField`,name:`datasets`,plural:!1,selections:[{alias:null,args:null,kind:`ScalarField`,name:`total`,storageKey:null},{alias:null,args:null,concreteType:`DatasetStrEdge`,kind:`LinkedField`,name:`edges`,plural:!0,selections:[{alias:null,args:null,kind:`ScalarField`,name:`cursor`,storageKey:null},{alias:null,args:null,concreteType:`Dataset`,kind:`LinkedField`,name:`node`,plural:!1,selections:[p,h,{alias:null,args:null,kind:`ScalarField`,name:`__typename`,storageKey:null}],storageKey:null}],storageKey:null},{alias:null,args:null,concreteType:`DatasetStrPageInfo`,kind:`LinkedField`,name:`pageInfo`,plural:!1,selections:[{alias:null,args:null,kind:`ScalarField`,name:`endCursor`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`hasNextPage`,storageKey:null}],storageKey:null}],storageKey:null},{alias:null,args:te,filters:[`search`],handle:`connection`,key:`DatasetsList_query_datasets`,kind:`LinkedHandle`,name:`datasets`},{alias:null,args:[ne],concreteType:`SavedView`,kind:`LinkedField`,name:`savedViews`,plural:!0,selections:[h,ee,p,{alias:null,args:null,kind:`ScalarField`,name:`slug`,storageKey:null},Q,_,H,F,{alias:null,args:null,kind:`ScalarField`,name:`lastModifiedAt`,storageKey:null},L],storageKey:null},{alias:null,args:null,concreteType:`StageDefinition`,kind:`LinkedField`,name:`stageDefinitions`,plural:!0,selections:[p,{alias:null,args:null,concreteType:`StageParameter`,kind:`LinkedField`,name:`params`,plural:!0,selections:[p,W,{alias:null,args:null,kind:`ScalarField`,name:`default`,storageKey:null},{alias:null,args:null,kind:`ScalarField`,name:`placeholder`,storageKey:null}],storageKey:null}],storageKey:null},{alias:null,args:[ne,{kind:`Variable`,name:`viewStages`,variableName:`view`}],concreteType:`SchemaResult`,kind:`LinkedField`,name:`schemaForViewStages`,plural:!1,selections:[{alias:null,args:null,concreteType:`SampleField`,kind:`LinkedField`,name:`fieldSchema`,plural:!0,selections:re,storageKey:null},{alias:null,args:null,concreteType:`SampleField`,kind:`LinkedField`,name:`frameFieldSchema`,plural:!0,selections:re,storageKey:null}],storageKey:null}]},params:{cacheID:`9cd022fc1c6a047a8ea56d9957dfb672`,id:null,metadata:{},name:`DatasetPageQuery`,operationKind:`query`,text:`query DatasetPageQuery(
  $count: Int
  $cursor: String
  $name: String!
  $extendedView: BSONArray!
  $savedViewSlug: String
  $search: String = ""
  $view: BSONArray!
) {
  config {
    colorBy
    colorPool
    colorscale
    multicolorKeypoints
    showSkeletons
  }
  colorscale
  dataset(name: $name, view: $extendedView, savedViewSlug: $savedViewSlug) {
    name
    defaultGroupSlice
    appConfig {
      colorScheme {
        id
        colorBy
        colorPool
        multicolorKeypoints
        opacity
        showSkeletons
        defaultMaskTargetsColors {
          intTarget
          color
        }
        defaultColorscale {
          name
          list {
            value
            color
          }
          rgb
        }
        colorscales {
          path
          name
          list {
            value
            color
          }
          rgb
        }
        fields {
          colorByAttribute
          fieldColor
          path
          valueColors {
            color
            value
          }
          maskTargetsColors {
            intTarget
            color
          }
        }
        labelTags {
          fieldColor
          valueColors {
            color
            value
          }
        }
      }
    }
    ...datasetFragment
    id
  }
  ...NavFragment
  ...savedViewsFragment
  ...configFragment
  ...stageDefinitionsFragment
  ...viewSchemaFragment
}

fragment Analytics on Query {
  context
  dev
  doNotTrack
  uid
  version
}

fragment NavDatasets on Query {
  datasets(search: $search, first: $count, after: $cursor) {
    total
    edges {
      cursor
      node {
        name
        id
        __typename
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment NavFragment on Query {
  ...Analytics
  ...NavDatasets
}

fragment colorSchemeFragment on ColorScheme {
  id
  colorBy
  colorPool
  multicolorKeypoints
  opacity
  showSkeletons
  labelTags {
    fieldColor
    valueColors {
      color
      value
    }
  }
  temporalTags {
    fieldColor
    valueColors {
      color
      value
    }
  }
  defaultMaskTargetsColors {
    intTarget
    color
  }
  defaultColorscale {
    name
    list {
      value
      color
    }
    rgb
  }
  colorscales {
    path
    name
    list {
      value
      color
    }
    rgb
  }
  fields {
    colorByAttribute
    fieldColor
    path
    valueColors {
      color
      value
    }
    maskTargetsColors {
      intTarget
      color
    }
  }
}

fragment configFragment on Query {
  config {
    colorBy
    colorPool
    colorscale
    disableFrameFiltering
    gridZoom
    enableQueryPerformance
    defaultQueryPerformance
    loopVideos
    mediaFallback
    maxQueryTime
    multicolorKeypoints
    notebookHeight
    plugins
    showConfidence
    showIndex
    showLabel
    showSkeletons
    showTooltip
    theme
    timezone
    useFrameNumber
  }
  colorscale
}

fragment datasetAppConfigFragment on DatasetAppConfig {
  activeFields {
    exclude
    paths
  }
  colorScheme {
    ...colorSchemeFragment
    id
  }
  disableFrameFiltering
  dynamicGroupsTargetFrameRate
  gridMediaField
  mediaFields
  modalMediaField
  mediaFallback
  plugins
}

fragment datasetFragment on Dataset {
  createdAt
  datasetId
  groupField
  id
  info
  lastLoadedAt
  mediaSources
  mediaType
  name
  parentMediaType
  version
  appConfig {
    ...datasetAppConfigFragment
  }
  brainMethods {
    key
    version
    timestamp
    viewStages
    ready
    error
    config {
      cls
      embeddingsField
      method
      patchesField
      supportsPrompts
      numDims
      pointsField
      model
      type
      maxK
      supportsLeastSimilarity
    }
  }
  defaultMaskTargets {
    target
    value
  }
  defaultSkeleton {
    labels
    edges
  }
  evaluations {
    key
    version
    timestamp
    viewStages
    config {
      cls
      predField
      gtField
    }
  }
  groupMediaTypes {
    name
    mediaType
  }
  maskTargets {
    name
    targets {
      target
      value
    }
  }
  skeletons {
    name
    labels
    edges
  }
  ...estimatedCountsFragment
  ...frameFieldsFragment
  ...groupSliceFragment
  ...indexesFragment
  ...mediaFieldsFragment
  ...mediaTypeFragment
  ...sampleFieldsFragment
  ...sidebarGroupsFragment
  ...viewFragment
}

fragment estimatedCountsFragment on Dataset {
  estimatedFrameCount
  estimatedSampleCount
}

fragment frameFieldsFragment on Dataset {
  frameFields {
    ftype
    subfield
    embeddedDocType
    path
    dbField
    description
    info
  }
}

fragment groupSliceFragment on Dataset {
  defaultGroupSlice
}

fragment indexesFragment on Dataset {
  frameIndexes {
    name
    unique
    key {
      field
      type
    }
    wildcardProjection {
      fields
      inclusion
    }
  }
  sampleIndexes {
    name
    unique
    key {
      field
      type
    }
    wildcardProjection {
      fields
      inclusion
    }
  }
}

fragment mediaFieldsFragment on Dataset {
  name
  appConfig {
    gridMediaField
    mediaFields
    modalMediaField
    mediaFallback
  }
  sampleFields {
    path
  }
}

fragment mediaTypeFragment on Dataset {
  mediaType
}

fragment sampleFieldsFragment on Dataset {
  sampleFields {
    ftype
    subfield
    embeddedDocType
    path
    dbField
    description
    info
  }
}

fragment savedViewsFragment on Query {
  savedViews(datasetName: $name) {
    id
    datasetId
    name
    slug
    description
    color
    viewStages
    createdAt
    lastModifiedAt
    lastLoadedAt
  }
}

fragment sidebarGroupsFragment on Dataset {
  datasetId
  appConfig {
    sidebarGroups {
      expanded
      paths
      name
    }
  }
  ...frameFieldsFragment
  ...sampleFieldsFragment
}

fragment stageDefinitionsFragment on Query {
  stageDefinitions {
    name
    params {
      name
      type
      default
      placeholder
    }
  }
}

fragment viewFragment on Dataset {
  stages(slug: $savedViewSlug, view: $view)
  viewCls
  viewName
}

fragment viewSchemaFragment on Query {
  schemaForViewStages(datasetName: $name, viewStages: $view) {
    fieldSchema {
      path
      ftype
      subfield
      embeddedDocType
      info
      description
    }
    frameFieldSchema {
      path
      ftype
      subfield
      embeddedDocType
      info
      description
    }
  }
}
`}}})();e.hash=`ab62132aa2263272549c2597ae82996f`;export{e as default};