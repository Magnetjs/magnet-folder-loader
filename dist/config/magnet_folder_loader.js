"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1({ config: { env } }) {
    const basePath = env.dev ? 'server' : 'dist/server';
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
    };
}
exports.default = default_1;
//# sourceMappingURL=magnet_folder_loader.js.map