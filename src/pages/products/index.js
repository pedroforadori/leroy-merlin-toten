import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import CarouselTitle from '../../components/CarouselTitle'

import {
  MainImage,
  Container,
  Category,
  DescriptionProduct,
  IdProduct,
  PriceProduct,
  PortionProduct
} from './style'
import img from '../../img/photo.png'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import { Creators as ProductsActions } from '../../store/ducks/products'

import { getStoreId } from '../../services/auth'
import { currencyDisplay } from '../../utils/currency'

const Products = props => {
  let history = useHistory()
  let { categoryId } = useParams()

  if (!getStoreId()) history.push('/setup')

  const products = useSelector(state => state.products.products)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ProductsActions.getProductsRequest(categoryId))
  }, [categoryId, dispatch])

  return (
    <>
      <Header />

      <CarouselTitle text={'Decore a Janela'}></CarouselTitle>

      <Container>
        {products.map(product => (
          <Category
            src={product.url || img}
            key={product.id}
            onClick={() => history.push(`/categories/${categoryId}/product/${product.id}`)}
          >
            <div>
              <DescriptionProduct>
                {product.shortTitle || 'Lixeira Inox Prata e Vermelho 4L Click'}
              </DescriptionProduct>
              <IdProduct>(Cod. {product.id || '9192332'})</IdProduct>
              <PriceProduct>{currencyDisplay(product.price || 18.9)} cada</PriceProduct>
              {/* <PortionProduct>12x de R$ 3,15 sem juros</PortionProduct> */}
            </div>
          </Category>
        ))}
      </Container>

      <Footer />
    </>
  )
}

export default Products
