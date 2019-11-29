import React, { useEffect, Fragment } from 'react'
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
import { getStoreId } from '../../services/auth'

import noImg from '../../img/sampler.png'

const ProductDetails = () => {
  let history = useHistory()
  const { productId, categoryName } = useParams()

  if (!getStoreId()) history.push('/setup')

  const productDetails = useSelector(state => state.products.productDetails)
  const loading = useSelector(state => state.products.loading)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ProductsActions.getProductDetailsRequest(getStoreId(), productId))
  }, [dispatch, productId])

  return (
    <>
      <RedirectTimer />

      <Header />

      <GoBackLink goBack>{categoryName || 'pagina anterior'}</GoBackLink>

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

            <div>
              <ImageProduct
                src={
                  (productDetails && productDetails.pictures && productDetails.pictures[0].url) ||
                  noImg
                }
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
