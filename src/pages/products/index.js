import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import Select from 'react-select'

import {
  selectStyle,
  selectTheme,
  Container,
  ProductCard,
  DescriptionProduct,
  IdProduct,
  PriceProduct,
  BoxDecription,
  NotFoundWrapper,
  SelectWrapper
} from './style'

import productPlaceholder from '../../assets/images/product_placeholder.png'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProductImg from '../../components/ProductImg'
import GoBackLink from '../../components/GoBackLink'
import LoadingFill from '../../components/LoadingFill'
import RedirectTimer from '../../components/RedirectTimer'

import CarouselTitle from '../../components/CarouselTitle'

import { Creators as ProductsActions } from '../../store/ducks/products'

import { ga } from '../../services/analytics'
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

  const loading = useSelector(state => state.products.loading)
  const products = useSelector(state => state.products.products)
  const brands = useSelector(state => state.products.brands)
  const colors = useSelector(state => state.products.colors)
  const brandObj = useSelector(state => state.products.brandObj)
  const colorObj = useSelector(state => state.products.colorObj)

  // const [brand, setBrand] = useState()
  // const [color, setColor] = useState()

  if (!getStoreId() || getEditSetup() === 'true') history.push('/setup')

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

    const logPayload = {
      device_id: `${getStoreId()} - ${getDepartmentName()}`,
      departament: getDepartmentName(),
      category: {
        id: categoryId,
        name: categoryName
      },
      store_id: getStoreId(),
      name: history.location.pathname
    }

    dispatch(ProductsActions.sendLogRequest(logPayload))

    const payload = {
      store_id: getStoreId(),
      categories: categoryId,
      brands: brandObj && brandObj.value,
      colors: colorObj && colorObj.value
    }

    console.log('payload', payload)

    dispatch(ProductsActions.getProductsRequest(payload))
  }, [brandObj, categoryId, categoryName, colorObj, dispatch, history.location.pathname])

  const handleSelectBrand = selection => {
    if (brandObj && selection.value === brandObj.value) return

    dispatch(ProductsActions.setBrand(selection))
  }

  const handleSelectColor = selection => {
    if (colorObj && selection.value === colorObj.value) return

    dispatch(ProductsActions.setColor(selection))
  }

  const handleClearFilters = () => {
    dispatch(ProductsActions.setBrand(null))
    dispatch(ProductsActions.setColor(null))

    const payload = {
      store_id: getStoreId(),
      categories: categoryId
    }

    dispatch(ProductsActions.getProductsRequest(payload))
  }

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

  console.log('brands', brands)
  console.log('brandObj', brandObj)
  console.log('colorObj', colorObj)

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

          <SelectWrapper>
            <p>
              Listar <span>{categoryName}</span> com
            </p>

            <Select
              options={brands.map(brand => ({ label: brand[0], value: brand[0] }))}
              defaultValue={brandObj}
              placeholder="Marca"
              isSearchable={false}
              styles={selectStyle}
              onChange={handleSelectBrand}
              theme={defaultTheme => ({
                ...defaultTheme,
                colors: {
                  ...defaultTheme.colors,
                  ...selectTheme
                }
              })}
            />

            <p>+</p>

            <Select
              options={colors.map(color => ({ label: color[0], value: color[0] }))}
              defaultValue={colorObj}
              placeholder="Cores"
              isSearchable={false}
              styles={selectStyle}
              onChange={handleSelectColor}
              theme={defaultTheme => ({
                ...defaultTheme,
                colors: {
                  ...defaultTheme.colors,
                  ...selectTheme
                }
              })}
            />

            <p onClick={handleClearFilters}>Limpar Filtros</p>
          </SelectWrapper>

          <CarouselTitle text={categoryName} />

          {products.length ? (
            <Container>
              {products.map(product => (
                <ProductCard
                  key={product._id}
                  onClick={() => handleClick(product._id, product.name, product.lm_leroy)}
                >
                  <ProductImg
                    src={
                      (product.pictures && product.pictures[0] && product.pictures[0].url) ||
                      productPlaceholder
                    }
                  />
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
