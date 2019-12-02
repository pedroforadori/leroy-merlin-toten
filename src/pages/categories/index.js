import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Container, Category } from './style'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import RedirectTimer from '../../components/RedirectTimer'
import LoadingFill from '../../components/LoadingFill'

import { Creators as ProductsActions } from '../../store/ducks/products'

import { getEditSetup, getStoreId, getSelectedCategories } from '../../services/auth'

const Categories = () => {
  let history = useHistory()

  if (!getStoreId() || getEditSetup() === 'true') history.push('/setup')

  const categories = useSelector(state => state.products.categoriesSelected)

  if (categories.length === 1)
    history.push(`/categories/${categories[0]._id}/${categories[0].name}`)

  const loadingCategories = useSelector(state => state.products.loadingCategories)

  const dispatch = useDispatch()

  useEffect(() => {
    const ids = getSelectedCategories().split(',')
    const payload = { ids }

    dispatch(ProductsActions.getCategoriesByIdRequest(payload))
  }, [dispatch])

  const handleClick = (id, name) => {
    // ga.event({
    //   storeId: getStoreId(),
    //   storeName: getStoreName(),
    //   departmentName: getDepartmentName(),
    //   category: 'Categorias',
    //   action: 'Selecionar categoria',
    //   label: name
    // })

    history.push(`/categories/${id}/${name}`)
  }

  // console.log('categories selected', categories)

  return (
    <>
      <RedirectTimer />

      <div style={{ height: 1 }} />

      {/* <MainImage>
        <div>{getDepartmentName()}</div>
      </MainImage> */}

      {loadingCategories ? (
        <LoadingFill />
      ) : (
        <>
          <Header />

          <Container>
            {categories.map(category => (
              <Category
                key={category._id}
                src={category.picture}
                onClick={() => handleClick(category._id, category.name)}
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
      )}
    </>
  )
}

export default Categories
