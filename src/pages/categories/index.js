import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { MainImage, Container, Category } from './style'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import RedirectTimer from '../../components/RedirectTimer'

import { Creators as ProductsActions } from '../../store/ducks/products'

import decoracaoImage from '../../mock/decoracao.png'

import { getStoreId, getDepartmentName, getSelectedCategories } from '../../services/auth'

const Categories = () => {
  let history = useHistory()

  if (!getStoreId()) history.push('/setup')

  // const categories = useSelector(state => state.products.categories)

  const [selectedCategories, setSelectedCategories] = useState(getSelectedCategories())

  const dispatch = useDispatch()

  return (
    <>
      <RedirectTimer />

      <Header />

      <MainImage>
        <div>{getDepartmentName()}</div>
      </MainImage>

      <Container>
        {selectedCategories &&
          selectedCategories.map(category => (
            <Category
              src={category.image}
              key={category.name}
              onClick={() => history.push(`/categories/${category.id}/${category.name}`)}
            >
              <div>
                <div>{category.name}</div>
                <div>{category.description}</div>
              </div>
            </Category>
          ))}
      </Container>

      <Footer />
    </>
  )
}

export default Categories
