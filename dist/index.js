"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("magnet-core/module");
const requireAll = require("require-all");
const path = require("path");
const fs = require("mz/fs");
const _ = require("lodash");
const isPromise = require("is-promise");
class MagnetFolderLoader extends module_1.Module {
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const folder of this.config.folders) {
                if (!folder.path) {
                    this.log.warn(`Missing folder path ${folder.path}`);
                    continue;
                }
                try {
                    yield fs.stat(path.join(this.app.config.baseDirPath, folder.path));
                    const folderFunction = requireAll(path.join(this.app.config.baseDirPath, folder.path));
                    const result = _.mapValues(folderFunction, (item, key) => {
                        if (!item.default) {
                            this.log.warn(`${key} file missing default export`);
                            return;
                        }
                        return item.default(this.app);
                    });
                    if (folder.keyFormat) {
                        this.app[folder.namespace] = _.mapKeys(result, (item, key) => __awaiter(this, void 0, void 0, function* () {
                            const fd = _[folder.keyFormat](key);
                            if (isPromise(fd)) {
                                return yield fd;
                            }
                            return fd;
                        }));
                    }
                    else {
                        this.app[folder.namespace] = result;
                    }
                }
                catch (err) {
                    if (err.code !== 'ENOENT')
                        throw err;
                    this.log.warn(err.message);
                }
            }
        });
    }
}
exports.default = MagnetFolderLoader;
//# sourceMappingURL=index.js.map