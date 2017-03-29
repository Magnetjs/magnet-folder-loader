export interface FolderLoaderFolder {
  path: string
  namespace?: string
  keyFormat?: string
}

export interface FolderLoaderConfig {
  folders: FolderLoaderFolder[]
}

export default function ({ config: { env } }) {
  const basePath = env.dev ? 'src' : 'dist/src'

  return {
    folders: [
      {
        path: 'src/models', namespace: 'models'
        // keyFormat: 'capitalize'
      },
      { path: 'src/services', namespace: 'svc' },
      { path: 'src/utils', namespace: 'utils' },

      { path: 'src/controllers', namespace: 'ctrls' },

      { path: 'src/routers/tcp' },
      // { path: 'routers/ws' },
      // { path: 'routers/commands' },
      // { path: 'routers/graphql' },

      { path: 'src/schedulers' },
      { path: 'src/queues' }
    ]
  }
}
