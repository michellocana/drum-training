import { useAuth } from '../../contexts/AuthProvider'
import { useTracks } from '../../contexts/TracksProvider'
import Pluralize from '../Pluralize'
import TrackForm from '../Track/TrackForm'
import ActionMenu from '../UI/ActionMenu'
import SkeletonText from '../UI/SkeletonText'
import ProfilePicture from '../User/ProfilePicture'

import s from './Menu.module.css'

export default function Menu2() {
  const { user, logout } = useAuth()
  const { tracks, isLoading: isLoadingTracks } = useTracks()

  return (
    <nav className={s.container}>
      <div className={s.userInfo}>
        <ProfilePicture />
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

        <ActionMenu className={s.actionMenu}>
          <ActionMenu.Item id='copy' onAction={() => logout()}>
            Sair
          </ActionMenu.Item>
        </ActionMenu>
      </div>

      <TrackForm />
    </nav>
  )
}
