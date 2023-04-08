export function useYoutubeId(videoUrl?: string) {
  return videoUrl ? new URL(videoUrl).searchParams.get('v') : null
}
