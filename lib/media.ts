export const isVideo = (url: string) => /\.(mp4|webm|mov|mkv|avi)$/i.test(url);
export const isImage = (url: string) => /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(url);
