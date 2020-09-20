export interface Thumbs {
    path: string
    width: number
    height: number
    thumbWidth: number
    thumbHeight: number
    count: number
}

export interface VideoPreview {
    cover: string
    thumbs: Thumbs
}

export interface Video {
    name: string
    path: string
    duration: number
    width: number
    height: number
    preview: VideoPreview
}