export interface FolderLoaderFolder {
  path: string
  namespace?: string
  keyFormat?: string
}

export interface FolderLoaderConfig {
  folders: FolderLoaderFolder[]
}

export default function ({ config: { env } }) {
  const basePath = env.dev ? 'server' : 'dist/server'

  return {
    folders: [
      {
        path: `${basePath}/models`, namespace: 'models'
        // keyFormat: 'capitalize'
      },
      { path: `${basePath}/services`, namespace: 'svc' },
      { path: `${basePath}/controllers`, namespace: 'ctrls' },
      { path: `${basePath}/routers/http` },
      { path: `${basePath}/schedulers` },
      { path: `${basePath}/queues` },

      { path: `${basePath}/commands` }
    ]
  }
}
