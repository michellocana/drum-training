import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import { useAuth } from '../../contexts/AuthProvider'
import useIsMobile from '../../hooks/useIsMobile'
import useProfilePicture from '../../hooks/useProfilePicture'
import TrackForm from '../Track/TrackForm'
import ActionMenu from '../UI/ActionMenu'
import RoundImage from '../UI/RoundImage'
import s from './Menu.module.css'
import MenuToggle from './MenuToggle'
import MenuUserInfo from './MenuUserInfo'

export default function Menu2() {
  const { logout } = useAuth()
  const isMobile = useIsMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const profilePicture = useProfilePicture()

  const renderActionMenu = useCallback(() => {
    return (
      <ActionMenu className={s.actionMenu} isProfilePicture={isMobile} src={profilePicture}>
        <ActionMenu.Item id='logout' onAction={() => logout()}>
          Sair
        </ActionMenu.Item>
      </ActionMenu>
    )
  }, [isMobile, logout, profilePicture])

  if (isMobile) {
    return (
      <div className={s.wrapper}>
        <nav className={s.containerMobile}>
          <div className={s.toggleWrapper}>
            <MenuToggle isActive={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
            {renderActionMenu()}
            <motion.div
              className={s.overlay}
              animate={{ x: isMenuOpen ? 0 : '-100%', transition: { ease: 'circIn' } }}
            >
              <TrackForm />
            </motion.div>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  variants={{
                    visible: { opacity: 0.8 },
                    hidden: { opacity: 0 },
                  }}
                  transition={{ ease: 'circIn' }}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  className={s.overlayBackground}
                  onClick={() => setIsMenuOpen(false)}
                />
              )}
            </AnimatePresence>
          </div>
        </nav>
      </div>
    )
  }

  return (
    <div className={s.wrapper}>
      <nav className={s.container}>
        <div className={s.userInfo}>
          <RoundImage src={profilePicture} className={s.profilePicture} size='large' />
          <MenuUserInfo />
          {renderActionMenu()}
        </div>

        <TrackForm />
      </nav>
    </div>
  )
}
