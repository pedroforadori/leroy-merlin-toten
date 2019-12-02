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

import { ga, initializeReactGA } from '../../services/analytics'
import {
  getEditSetup,
  getStoreId,
  getStoreName,
  getDepartmentName,
  getSelectedCategories
} from '../../services/auth'
import { currencyDisplay } from '../../utils/currency'

const Products = props => {
  let history = useHistory()
  let { categoryId, categoryName } = useParams()

  if (!getStoreId() || getEditSetup() === 'true') history.push('/setup')

  // if (!ga) initializeReactGA(getStoreId, getStoreName, getDepartmentName)

  const loading = useSelector(state => state.products.loading)
  const products = useSelector(state => state.products.products)

  const dispatch = useDispatch()

  useEffect(() => {
    ga.pageview(`categorias/${categoryName}`)

    ga.set({
      categoryId,
      dimension1: categoryName, // ga('set', 'dimension1', dimensionValue)
      storeId: getStoreId(),
      dimension3: getStoreName(), // ga('set', 'dimension3', dimensionValue);
      dimension4: getDepartmentName() // ga('set', 'dimension4', dimensionValue);
    })

    const payload = {
      device_id: `${getStoreId()} - ${getDepartmentName()}`,
      departament: getDepartmentName(),
      category: {
        id: categoryId,
        name: categoryName
      },
      store_id: getStoreId(),
      name: history.location.pathname
    }

    dispatch(ProductsActions.postLogRequest(payload))

    dispatch(ProductsActions.getProductsRequest(getStoreId(), categoryId))
  }, [categoryId, categoryName, dispatch, history.location.pathname])

  const handleClick = (productId, productName, productCode) => {
    // ga.event({
    //   category: 'Produtos',
    //   action: 'Selecionar produto',
    //   label: productName,
    //   productId,
    //   productCode,
    //   categoryName,
    //   storeId: getStoreId(),
    //   storeName: getStoreName(),
    //   departmentName: getDepartmentName()
    // })

    history.push(`/categories/${categoryId}/${categoryName}/product/${productId}`)
  }

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
                  key={product._id}
                  onClick={() => handleClick(product._id, product.name, product.lm_leroy)}
                >
                  <ProductImg src={product.pictures[0].url || productPlaceholder} />
                  <BoxDecription>
                    <DescriptionProduct>
                      <p>{product.name}</p>
                    </DescriptionProduct>
                    <IdProduct>(Cod. {product.lm_leroy})</IdProduct>
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
