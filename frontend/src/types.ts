export interface App {
    id: string
    name: string
    packageId: string
    playStoreUrl: string
    createdAt: string
}

export interface Screenshot {
    id: string
    appId: string
    fileName: string
    takenAt: string
}
