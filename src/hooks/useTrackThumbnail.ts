import { Track } from '../types/track'
import { useYoutubeId } from './useYoutubeId'

export default function useTrackThumbnail({ videoUrl }: Track) {
  const youtubeId = useYoutubeId(videoUrl)
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
}
