export interface FolderLoaderFolder {
    path: string;
    namespace?: string;
    keyFormat?: string;
}
export interface FolderLoaderConfig {
    folders: FolderLoaderFolder[];
}
export default function ({config: {env}}: {
    config: {
        env: any;
    };
}): {
    folders: ({
        path: string;
        namespace: string;
    } | {
        path: string;
    })[];
};
