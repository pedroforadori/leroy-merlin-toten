import React, { useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import Carousel from 're-carousel'

import Dots from '../../components/Dots'

import homeLandscape from '../../assets/images/home_landscape.png'
import homePortrait from '../../assets/images/home_portrait.png'
import home2Landscape from '../../assets/images/home2_landscape.png'
import home2Portrait from '../../assets/images/home2_portrait.png'

import { Image } from './style'

const Home = () => {
  let history = useHistory()

  const handleClick = useCallback(() => {
    history.push('/categories')
  }, [history])

  useEffect(() => {
    document.addEventListener('click', handleClick)
    console.log('addEventListener')

    return () => {
      document.removeEventListener('click', handleClick)
      console.log('removeEventListener')
    }
  }, [handleClick])

  return (
    <Carousel auto loop widgets={[Dots]}>
      <Image src={[homeLandscape, homePortrait]} />
      <Image src={[home2Landscape, home2Portrait]} />
    </Carousel>
  )
}

export default Home
