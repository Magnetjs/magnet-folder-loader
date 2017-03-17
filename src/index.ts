import { Module } from 'magnet-core/module'
import * as requireAll from 'require-all'
import * as path from 'path'
import * as fs from 'mz/fs'
import * as _ from 'lodash'
import * as isPromise from 'is-promise'

export default class MagnetFolderLoader extends Module {
  get moduleName () { return 'magnet_folder_loader' }
  get defaultConfig () { return __dirname }

  async setup () {
    for (const folder of this.config.folders) {
      if (!folder.path) {
        this.log.warn(`Missing folder path ${folder.path}`)
        continue
      }

      try {
        await fs.stat(path.join(this.app.config.baseDirPath, folder.path))
        const folderFunction = requireAll(path.join(this.app.config.baseDirPath, folder.path))

        const result = _.mapValues(folderFunction, (item, key) => {
          if (!item.default) {
            this.log.warn(`${key} file missing default export`)
            return
          }

          return item.default(this.app)
        })

        if (folder.keyFormat) {
          this.app[folder.namespace] = _.mapKeys(result, async (item, key) => {
            const fd = _[folder.keyFormat](key)

            if (isPromise(fd)) {
              return await fd
            }

            return fd
          })
        } else {
          this.app[folder.namespace] = result
        }
      } catch (err) {
        if (err.code !== 'ENOENT') throw err

        this.log.warn(err.message)
      }
    }
  }
}
