import React, { useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import Carousel from 're-carousel'

import Dots from '../../components/Dots'
import SideText from '../../components/SideText'
import SideShape from '../../components/SideShape'
import SideLogo from '../../components/SideLogo'

import homeLandscape from '../../assets/images/home_landscape.png'
import homePortrait from '../../assets/images/home_portrait.png'
import home2Landscape from '../../assets/images/home2_landscape.png'
import home2Portrait from '../../assets/images/home2_portrait.png'

import theme from '../../styles/theme'
import { Image } from './style'

import {
  getEditSetup,
  getStoreId,
  getBanner1Title,
  getBanner1Subtitle,
  getBanner2Title,
  getBanner2Subtitle
} from '../../services/auth'

const Home = () => {
  let history = useHistory()

  if (!getStoreId() || getEditSetup() === 'true') history.push('/setup')

  const handleClick = useCallback(() => {
    history.push('/categories')
  }, [history])

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [handleClick])

  return (
    <Carousel auto loop widgets={[Dots]}>
      <Image src={[homeLandscape, homePortrait]}>
        <SideText
          color={theme.primaryDefault}
          title={getBanner1Title()}
          subTitle={getBanner1Subtitle()}
          zIndex="1"
        />
        <SideShape color={theme.textYellow} zIndex="0" />
        <SideLogo />
      </Image>
      <Image src={[home2Landscape, home2Portrait]}>
        <SideText
          color={theme.red}
          title={getBanner2Title()}
          subTitle={getBanner2Subtitle()}
          zIndex="1"
        />
        <SideShape color={theme.textYellow} zIndex="0" />
        <SideLogo />
      </Image>
    </Carousel>
  )
}

export default Home
