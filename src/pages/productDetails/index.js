import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import GoBackLink from '../../components/GoBackLink'
import LoadingIcon from '../../components/icons/LoadingIcon'
import RedirectTimer from '../../components/RedirectTimer'

import { Creators as ProductsActions } from '../../store/ducks/products'

import { currencyDisplay } from '../../utils/currency'

import { Container, WrapperCenter, Title, MainPage, ImageProduct, Details, Price } from './style'

import { ga, initializeReactGA } from '../../services/analytics'
import { getEditSetup, getStoreId, getStoreName, getDepartmentName } from '../../services/auth'

import productPlaceholder from '../../assets/images/product_placeholder.png'
import ImageViewer from '../../components/ImageViewer'

const ProductDetails = () => {
  let history = useHistory()
  const { categoryId, categoryName, productId } = useParams()

  if (!getStoreId() || getEditSetup() === 'true') history.push('/setup')

  // if (!ga) initializeReactGA(getStoreId, getStoreName, getDepartmentName)

  const productDetails = useSelector(state => state.products.productDetails)
  const loading = useSelector(state => state.products.loading)

  const [isOpen, setIsOpen] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ProductsActions.getProductDetailsRequest(getStoreId(), productId))
  }, [dispatch, productId])

  useEffect(() => {
    if (productDetails.lm_leroy) {
      ga.pageview(`produtos/${productDetails.name}`)

      ga.set({
        productId: productDetails.lm_leroy,
        productName: productDetails.name,
        categoryId,
        categoryName,
        storeId: getStoreId(),
        storeName: getStoreName(),
        departmentName: getDepartmentName()
      })

      const payload = {
        device_id: `${getStoreId()} - ${getDepartmentName()}`,
        departament: getDepartmentName(),
        category: {
          id: categoryId,
          name: categoryName
        },
        product: {
          id: productDetails._id,
          id_leroy: productDetails.lm_leroy,
          name: productDetails.name
        },
        store_id: getStoreId(),
        name: history.location.pathname
      }

      dispatch(ProductsActions.postLogRequest(payload))
    }
  }, [
    categoryId,
    categoryName,
    dispatch,
    history.location.pathname,
    loading,
    productDetails._id,
    productDetails.lm_leroy,
    productDetails.name
  ])

  // console.log('image', productDetails.pictures)
  // console.log('image', productDetails.pictures && productDetails.pictures[imageIndex].url)

  return (
    <>
      <RedirectTimer />

      <Header />

      <GoBackLink>{categoryName}</GoBackLink>

      {loading ? (
        <WrapperCenter loading={loading}>
          <LoadingIcon />
        </WrapperCenter>
      ) : !Object.keys(productDetails).length ? (
        <WrapperCenter loading={!Object.keys(productDetails).length}>
          Categoria sem produtos
        </WrapperCenter>
      ) : (
        <Container>
          <MainPage>
            <Title>
              <h2>{productDetails.name}</h2>
              <p className="codProducty">(Cod:{productDetails.lm_leroy})</p>
              <h3>Sobre o produto</h3>
              <p>{productDetails.description}</p>
            </Title>

            <div style={{ cursor: 'pointer' }} onClick={() => setIsOpen(true)}>
              <ImageProduct
                src={
                  (productDetails &&
                    productDetails.pictures &&
                    productDetails.pictures[imageIndex].url) ||
                  productPlaceholder
                }
              />

              <ImageViewer
                images={productDetails.pictures.map(picture => picture.url)}
                index={imageIndex}
                isOpen={isOpen}
                onCloseRequest={() => setIsOpen(false)}
                onMovePrevRequest={setImageIndex}
                onMoveNextRequest={setImageIndex}
              />
            </div>

            {productDetails.prices && productDetails.prices.price ? (
              <Price>
                <h1>
                  <span className="cifra">R$</span>
                  <span className="fristPrice">
                    {
                      currencyDisplay(
                        productDetails.prices && productDetails.prices.price,
                        false
                      ).split(',')[0]
                    }
                    ,
                  </span>
                  <span className="secondPrice">
                    {
                      currencyDisplay(
                        productDetails.prices && productDetails.prices.price,
                        false
                      ).split(',')[1]
                    }
                  </span>
                  <span className="unit"> / cada</span>
                </h1>
              </Price>
            ) : (
              ''
            )}
          </MainPage>

          <Details>
            <h3>Características Técnicas</h3>
            {productDetails &&
              productDetails.attributes &&
              productDetails.attributes.map((items, index) => {
                return (
                  <Fragment key={items.name + index}>
                    <div>
                      <p>{items.name}</p>
                    </div>
                    <div>
                      <p>{items.value}</p>
                    </div>
                  </Fragment>
                )
              })}
          </Details>
        </Container>
      )}
      <Footer />
    </>
  )
}

export default ProductDetails
