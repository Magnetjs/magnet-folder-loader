import { Module } from 'magnet-core/module'
import * as requireAll from 'require-all'
import * as path from 'path'
import * as fs from 'mz/fs'
import * as _ from 'lodash'
import * as mapValues from 'lodash/mapValues'
import * as mapKeys from 'lodash/mapKeys'
import * as isPromise from 'is-promise'

import defaultConfig, { FolderLoaderConfig } from './config/folderLoader'

export default class FolderLoader extends Module {
  async setup () {
    const config: FolderLoaderConfig = this.prepareConfig('folderLoader', defaultConfig)

    for (const folder of config.folders) {
      if (!folder.path) {
        this.log.warn(`Missing folder path ${folder.path}`)
        continue
      }

      try {
        await fs.stat(path.join(this.config.baseDirPath, folder.path))
        const folderFunction = requireAll(path.join(this.config.baseDirPath, folder.path))

        const result = mapValues(folderFunction, (item, key) => {
          if (!item.default) {
            this.log.warn(`${key} file missing default export`)
            return
          }

          return item.default(this.app)
        })

        if (folder.keyFormat) {
          this.app[folder.namespace] = mapKeys(result, async (item, key) => {
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
