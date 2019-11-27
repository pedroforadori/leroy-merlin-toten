import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { MainImage, Container, Category } from './style'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import { Creators as ProductsActions } from '../../store/ducks/products'

import decoracaoImage from '../../mock/decoracao.png'

import { getDepartmentId } from '../../services/auth'

const Categories = () => {
  let history = useHistory()

  if (!getDepartmentId()) history.push('/setup')

  const categories = useSelector(state => state.products.categories)

  const dispatch = useDispatch()

  const redirectHome = () => history.push('/home')

  let redirectionDelay

  const startTimeout = useCallback(() => {
    redirectionDelay = setTimeout(redirectHome, 60000)
    console.log('timeout started')
  }, [redirectionDelay])

  const handleAction = useCallback(() => {
    clearTimeout(redirectionDelay)
    startTimeout()
  }, [redirectionDelay, startTimeout])

  useEffect(() => {
    document.addEventListener('click', handleAction)
    console.log('addEventListener handleAction')

    return () => {
      document.removeEventListener('click', handleAction)
      console.log('removeEventListener handleAction')
    }
  }, [handleAction])

  useEffect(() => {
    startTimeout()
    dispatch(ProductsActions.getCategoriesRequest(getDepartmentId(), true))
  }, [dispatch, startTimeout])

  return (
    <>
      <Header />

      <MainImage src={decoracaoImage}>
        <div>Decoração</div>
      </MainImage>

      <Container>
        {categories.map(category => (
          <Category
            src={category.imageUrl}
            key={category.name}
            onClick={() => history.push(`/categories/${category.id}/${category.name}`)}
          >
            <div>{category.name}</div>
            <div>{category.description}</div>
          </Category>
        ))}
      </Container>

      <Footer />
    </>
  )
}

export default Categories
