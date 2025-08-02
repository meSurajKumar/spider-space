import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsDark } from '../app/themeSlice'
import SpaceBackground from '../SpaceBackground'

const SpaceBackgroundDemo = ({ children }) => {
  const isDark = useSelector(selectIsDark)

  return (
    <SpaceBackground
      isDark={isDark}
      autoRotate={true}
      autoRotateSpeed={0.3}
      systemRotationSpeed={0.0005}
      showAsteroidBelt={true}
      starsCount={isDark ? 5000 : 3000}
      enableControls={true}
      backgroundColor='#0a0a0f'
    >
      {children}
    </SpaceBackground>
  )
}

export default SpaceBackgroundDemo