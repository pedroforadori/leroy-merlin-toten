import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import CarouselTitle from '../../components/CarouselTitle'

import {
  Container,
  Category,
  DescriptionProduct,
  IdProduct,
  PriceProduct,
  BoxDecription,
  WrapperCenter
} from './style'

import img from '../../img/sampler.png'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProductImg from '../../components/ProductImg'
import GoBackLink from '../../components/GoBackLink'
import LoadingIcon from '../../components/icons/LoadingIcon'
import RedirectTimer from '../../components/RedirectTimer'

import { Creators as ProductsActions } from '../../store/ducks/products'

import { getStoreId } from '../../services/auth'
import { currencyDisplay } from '../../utils/currency'

const Products = props => {
  let history = useHistory()
  let { categoryId, categoryName } = useParams()

  if (!getStoreId()) history.push('/setup')

  const products = useSelector(state => state.products.products)
  const departmentName = useSelector(state => state.products.departmentName)
  const loading = useSelector(state => state.products.loading)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ProductsActions.getProductsRequest(getStoreId(), categoryId))
  }, [categoryId, dispatch])

  return (
    <>
      <RedirectTimer />

      <Header />

      <GoBackLink goBack>{departmentName || 'Decoração'}</GoBackLink>

      <CarouselTitle text={categoryName}></CarouselTitle>

      {loading ? (
        <WrapperCenter loading={loading}>
          <LoadingIcon />
        </WrapperCenter>
      ) : !products.length ? (
        <WrapperCenter loading={!products.length}>Categoria sem produtos</WrapperCenter>
      ) : (
        <Container>
          {products.map(product => (
            <Category
              key={product.id}
              onClick={() =>
                history.push(`/categories/${categoryId}/${categoryName}/product/${product._id}`)
              }
            >
              <ProductImg src={product.pictures[0].url || img} />
              <BoxDecription>
                <DescriptionProduct>
                  <p>{product.name || 'Sample Title'}</p>
                </DescriptionProduct>
                <IdProduct>(Cod. {product.lm_leroy || '9192332'})</IdProduct>
                {product.prices && product.prices.price ? (
                  <PriceProduct>
                    R$
                    <span>
                      {currencyDisplay(product.prices && product.prices.price, false).split(',')[0]}
                    </span>
                    <span>
                      ,
                      {currencyDisplay(product.prices && product.prices.price, false).split(',')[1]}
                    </span>
                    <span>cada</span>
                  </PriceProduct>
                ) : (
                  ''
                )}
                {/* <PortionProduct>12x de R$ 3,15 sem juros</PortionProduct> */}
              </BoxDecription>
            </Category>
          ))}
        </Container>
      )}

      <Footer />
    </>
  )
}

export default Products
