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

import {
  Container,
  WrapperCenter,
  Title,
  MainPage,
  ImageProduct,
  ImageProductSmall,
  ImagesWrapper,
  OverflowWrapper,
  Details,
  Price
} from './style'

import { ga } from '../../services/analytics'
import { getEditSetup, getStoreId, getStoreName, getDepartmentName } from '../../services/auth'

import productPlaceholder from '../../assets/images/product_placeholder.png'
import ImageViewer from '../../components/ImageViewer'

const ProductDetails = () => {
  let history = useHistory()
  const { categoryId, categoryName, productId } = useParams()

  if (!getStoreId() || getEditSetup() === 'true') history.push('/setup')

  const productDetails = useSelector(state => state.products.productDetails)
  const loading = useSelector(state => state.products.loading)

  const [isOpen, setIsOpen] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ProductsActions.getProductDetailsRequest(getStoreId(), productId))
  }, [dispatch, productId])

  useEffect(() => {
    if (getStoreId() && productDetails.lm_leroy) {
      // ga.pageview(`produtos/${productDetails.name}`)

      // ga.set({
      //   productId: productDetails.lm_leroy,
      //   dimension2: productDetails.name,
      //   categoryId,
      //   dimension1: categoryName,
      //   storeId: getStoreId(),
      //   dimension3: getStoreName(),
      //   dimension4: getDepartmentName()
      // })

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

      dispatch(ProductsActions.sendLogRequest(payload))
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

  return (
    <>
      <RedirectTimer />

      <Header />

      <GoBackLink>{categoryName}</GoBackLink>

      {loading ? (
        <WrapperCenter loading={loading ? 'true' : undefined}>
          <LoadingIcon />
        </WrapperCenter>
      ) : !Object.keys(productDetails).length ? (
        <WrapperCenter loading={!Object.keys(productDetails).length ? 'true' : undefined}>
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

            <div>
              <ImageProduct
                src={
                  (productDetails &&
                    productDetails.pictures &&
                    productDetails.pictures.length &&
                    productDetails.pictures[imageIndex].url) ||
                  productPlaceholder
                }
                onClick={() =>
                  productDetails &&
                  productDetails.pictures &&
                  productDetails.pictures.length &&
                  setIsOpen(true)
                }
              />

              <ImageViewer
                images={
                  productDetails &&
                  productDetails.pictures &&
                  productDetails.pictures.length &&
                  productDetails.pictures.map(picture => picture.url)
                }
                index={imageIndex}
                isOpen={isOpen}
                onCloseRequest={() => setIsOpen(false)}
                onMoveNextRequest={setImageIndex}
                onMovePrevRequest={setImageIndex}
              />

              <OverflowWrapper>
                <ImagesWrapper>
                  <div />

                  {productDetails.pictures.map((picture, index) => (
                    <ImageProductSmall
                      isSelected={imageIndex === index}
                      onClick={() => setImageIndex(index)}
                    >
                      <img src={picture.url} alt={picture.alt} />
                    </ImageProductSmall>
                  ))}

                  <div />
                </ImagesWrapper>
              </OverflowWrapper>
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
