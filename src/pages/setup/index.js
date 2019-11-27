import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Select from 'react-select'

import {
  selectStyle,
  Container,
  Filters,
  SelectWrapper,
  Title,
  SubTitle,
  TabWrapper,
  TabTitle,
  Label,
  Content,
  Categories,
  Grid,
  CheckItem,
  Wrapper,
  SelectAll
} from './style'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Checkbox from '../../components/Checkbox'
import Button from '../../components/Button'

import { Creators as ProductsActions } from '../../store/ducks/products'

import { getStoreId, persistData } from '../../services/auth'

const Setup = () => {
  let history = useHistory()

  if (getStoreId()) history.push('/home')

  const storeId = useSelector(state => state.products.storeId)
  const stores = useSelector(state => state.products.stores)
  // const departments = useSelector(state => state.products.departments)
  const categories = useSelector(state => state.products.categories)
  const loading = useSelector(state => state.products.loading)

  const [section, setSection] = useState('categories')
  const [selectAll, toggleSelectAll] = useState(false)
  // const [filteredCategories, setFilteredCategories] = useState([])

  const dispatch = useDispatch()

  const handleCategoryCheck = id => {
    const newCategories = [...categories]

    // newCategories[index] = { ...categories[index], isSelected: !categories[index].isSelected }
    // setFilteredCategories(filteredCategories.map(category => category))

    let category = categories.find(category => category._id === id)
    category.isSelected = !category.isSelected

    dispatch(ProductsActions.setCategories(newCategories))
  }

  const handleSelectAll = () => {
    const newCategories = categories.map(category => ({ ...category, isSelected: !selectAll }))

    toggleSelectAll(!selectAll)
    dispatch(ProductsActions.setCategories(newCategories))
  }

  const handleSelectStore = selection => {
    if (selection._id === storeId) return

    dispatch(ProductsActions.setStoreId(selection.store_id))
    // setDepartment({})
    // toggleSelectAll(false)
    // dispatch(ProductsActions.getDepartmentsRequest(selection.id))
  }

  const handleFilterCategories = selection => {
    let filteredCategories // = categories

    if (selection) {
      filteredCategories = categories.map(category => {
        return category._id === selection._id
          ? { ...category, hidden: false }
          : { ...category, hidden: true }
      })

      // const item = categories.find(category => category._id === selection._id)
      // item.visible = true

      // const categoryIndex = categories.findIndex(category => category._id === selection._id)
      // filteredCategories[categoryIndex] = { ...filteredCategories[categoryIndex], visible: true }

      // array = categories.filter(category => category._id === selection._id)
    } else {
      filteredCategories = categories.map(category => ({ ...category, hidden: false }))
    }

    console.log(filteredCategories)

    dispatch(ProductsActions.setCategories(filteredCategories))

    // setFilteredCategories(array)
    // if (selection.id === department.id) return
    // setDepartment(selection)
    // toggleSelectAll(false)
    // dispatch(ProductsActions.getCategoriesRequest())
  }

  const handleSubmit = () => {
    persistData({
      storeId,
      // departmentId: department.id,
      selectedCategories: categories
        .filter(category => category.isSelected)
        .map(category => ({ id: category._id, name: category.name, image: category.picture }))
    })

    history.push('/home')
  }

  useEffect(() => {
    dispatch(ProductsActions.getStoresRequest())
    dispatch(ProductsActions.getCategoriesRequest())
  }, [dispatch])

  // console.log('stores', stores)
  // console.log('departments', departments)
  // console.log('categories', categories)
  // console.log('getStoreId', getStoreId())

  return (
    <>
      <Header />

      <Container>
        <Title>Configure o sistema para começar a usar</Title>
        <SubTitle>Selecione abaixo sua loja e as categorias que deseja habilitar</SubTitle>

        <TabWrapper>
          <TabTitle isSelected={section === 'categories'} onClick={() => setSection('categories')}>
            <p>Categorias</p>
            <div />
          </TabTitle>

          {/* <TabTitle isSelected={section === 'banner'} onClick={() => setSection('banner')}>
            <p>Banner</p>
            <div />
          </TabTitle> */}
        </TabWrapper>

        <Content>
          <Filters>
            <SelectWrapper>
              <Label>Selecione sua Loja</Label>

              <Select
                options={stores}
                getOptionLabel={({ name }) => name}
                getOptionValue={({ _id }) => _id}
                placeholder="Selecione a Unidade"
                isSearchable={false}
                styles={selectStyle}
                onChange={handleSelectStore}
              />
            </SelectWrapper>

            <SelectWrapper>
              <Label>Selecione um Departamento</Label>

              <Select
                options={categories}
                getOptionLabel={({ name }) => name}
                getOptionValue={({ _id }) => _id}
                // value={categories.filter(({ _id }) => category._id === ''._id)}
                placeholder="Buscar Categoria"
                isSearchable
                isClearable
                // isDisabled={!categories.length}
                styles={selectStyle}
                onChange={handleFilterCategories}
                // onInputChange={handleFilterCategories}
              />
            </SelectWrapper>
          </Filters>

          {!loading && !!categories.length && (
            <Categories>
              <Wrapper>
                <Label>Selecione as Categorias do Departamento</Label>
                <SelectAll onClick={handleSelectAll}>{`${
                  selectAll ? 'Des' : 'S'
                }elecionar todos`}</SelectAll>
              </Wrapper>

              <Grid>
                {/* {((filteredCategories.length && filteredCategories) || categories).map( */}
                {categories
                  .filter(category => !category.hidden)
                  .map(category => (
                    <CheckItem key={category._id}>
                      <Checkbox
                        checked={category.isSelected}
                        onChange={() => handleCategoryCheck(category._id)}
                      />
                      <span>{category.name}</span>
                    </CheckItem>
                  ))}
              </Grid>
            </Categories>
          )}
        </Content>

        {!loading && !!categories.length && (
          // <ButtonWrapper>
          <Button
            fixed
            disabled={!(storeId && categories.some(category => category.isSelected))}
            onClick={handleSubmit}
          >
            FINALIZAR
          </Button>
          // </ButtonWrapper>
        )}
      </Container>
      <Footer />
    </>
  )
}

export default Setup
