import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import CarouselTitle from '../../components/CarouselTitle'

import {
  Container,
  ProductCard,
  DescriptionProduct,
  IdProduct,
  PriceProduct,
  BoxDecription,
  NotFoundWrapper
} from './style'

import productPlaceholder from '../../assets/images/product_placeholder.png'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProductImg from '../../components/ProductImg'
import GoBackLink from '../../components/GoBackLink'
import LoadingFill from '../../components/LoadingFill'
import RedirectTimer from '../../components/RedirectTimer'

import { Creators as ProductsActions } from '../../store/ducks/products'

import {
  getStoreId,
  getEditSetup,
  getDepartmentName,
  getSelectedCategories
} from '../../services/auth'
import { currencyDisplay } from '../../utils/currency'

const Products = props => {
  let history = useHistory()
  let { categoryId, categoryName } = useParams()

  if (!getStoreId() || getEditSetup() === 'true') history.push('/setup')

  const loading = useSelector(state => state.products.loading)
  const products = useSelector(state => state.products.products)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ProductsActions.getProductsRequest(getStoreId(), categoryId))
  }, [categoryId, dispatch])

  return (
    <>
      <RedirectTimer />

      <div style={{ height: 1 }} />

      {loading ? (
        <LoadingFill />
      ) : (
        <>
          <Header />

          {getSelectedCategories().split(',').length !== 1 && (
            <GoBackLink>{getDepartmentName()}</GoBackLink>
          )}

          <CarouselTitle text={categoryName}></CarouselTitle>

          {products.length ? (
            <Container>
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  onClick={() =>
                    history.push(`/categories/${categoryId}/${categoryName}/product/${product._id}`)
                  }
                >
                  <ProductImg src={product.pictures[0].url || productPlaceholder} />
                  <BoxDecription>
                    <DescriptionProduct>
                      <p>{product.name || 'Sample Title'}</p>
                    </DescriptionProduct>
                    <IdProduct>(Cod. {product.lm_leroy || '9192332'})</IdProduct>
                    {product.prices && product.prices.price ? (
                      <PriceProduct>
                        R$
                        <span>
                          {
                            currencyDisplay(product.prices && product.prices.price, false).split(
                              ','
                            )[0]
                          }
                        </span>
                        <span>
                          ,
                          {
                            currencyDisplay(product.prices && product.prices.price, false).split(
                              ','
                            )[1]
                          }
                        </span>
                        <span>cada</span>
                      </PriceProduct>
                    ) : (
                      ''
                    )}
                    {/* <PortionProduct>12x de R$ 3,15 sem juros</PortionProduct> */}
                  </BoxDecription>
                </ProductCard>
              ))}
            </Container>
          ) : (
            <NotFoundWrapper>Categoria sem produtos</NotFoundWrapper>
          )}

          <Footer />
        </>
      )}
    </>
  )
}

export default Products
