import { Track } from '../types/track'

export default function useTrackThumbnail({ videoUrl }: Track) {
  const url = new URL(videoUrl)
  const videoId = url.searchParams.get('v')
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}
