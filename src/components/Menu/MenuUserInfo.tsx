import { PropsWithChildren } from 'react'
import { useAuth } from '../../contexts/AuthProvider'
import { useTracks } from '../../contexts/TracksProvider'
import Pluralize from '../Pluralize'
import SkeletonText from '../UI/SkeletonText'
import s from './MenuUserInfo.module.css'
import cn from 'classnames'

export default function MenuUserInfo({ children }: PropsWithChildren) {
  const { user } = useAuth()
  const { tracks, isLoading: isLoadingTracks } = useTracks()

  return (
    <div className={cn(s.container, { [s.containerHasChildren]: !!children })}>
      <h1 className={s.userName}>{user?.firstName}</h1>
      <span className={s.trackCount}>
        {isLoadingTracks ? (
          <SkeletonText
            text='2 saved tracks'
            fontSize={12}
            lineHeight={1.33}
            className={s.skeletonTrackCount}
          />
        ) : (
          <Pluralize
            count={tracks.length}
            singular={`${tracks.length} saved track`}
            plural={`${tracks.length} saved tracks`}
          />
        )}
      </span>
      <div className={s.children}>{children}</div>
    </div>
  )
}
