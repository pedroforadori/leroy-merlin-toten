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
  ButtonWrapper,
  Wrapper,
  SelectAll
} from './style'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Checkbox from '../../components/Checkbox'
import Button from '../../components/Button'

import { Creators as ProductsActions } from '../../store/ducks/products'

import { getDepartmentId, persistData } from '../../services/auth'

const Setup = () => {
  let history = useHistory()

  if (getDepartmentId()) history.push('/home')

  const stores = useSelector(state => state.products.stores)
  const departments = useSelector(state => state.products.departments)
  const categories = useSelector(state => state.products.categories)

  const [section, setSection] = useState('categories')
  const [selectAll, toggleSelectAll] = useState(false)
  const [store, setStore] = useState({})
  const [department, setDepartment] = useState({})

  const dispatch = useDispatch()

  const handleCategoryCheck = index => {
    const newCategories = [...categories]

    newCategories[index] = { ...categories[index], isSelected: !categories[index].isSelected }

    dispatch(ProductsActions.setCategories(newCategories))
  }

  const handleSelectAll = () => {
    const newCategories = categories.map(category => ({ ...category, isSelected: !selectAll }))

    toggleSelectAll(!selectAll)
    dispatch(ProductsActions.setCategories(newCategories))
  }

  const handleSelectStore = selection => {
    if (selection.id === store.id) return

    setStore(selection)
    setDepartment({})
    toggleSelectAll(false)
    dispatch(ProductsActions.getDepartmentsRequest(selection.id))
  }

  const handleSelectDepartment = selection => {
    if (selection.id === department.id) return

    setDepartment(selection)
    toggleSelectAll(false)
    dispatch(ProductsActions.getCategoriesRequest(selection.id))
  }

  const handleSubmit = () => {
    persistData({
      storeId: store.id,
      departmentId: department.id,
      selectedCategories: categories
        .filter(category => category.isSelected)
        .map(category => ({ id: category.id, name: category.name }))
    })

    history.push('/home')
  }

  useEffect(() => {
    dispatch(ProductsActions.getStoresRequest())
  }, [dispatch])

  console.log('stores', stores)
  console.log('departments', departments)
  console.log('categories', categories)
  console.log('getDepartmentId', getDepartmentId())

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
                getOptionValue={({ id }) => id}
                placeholder="Selecione a Unidade"
                isSearchable={false}
                styles={selectStyle}
                onChange={handleSelectStore}
              />
            </SelectWrapper>

            <SelectWrapper>
              <Label>Selecione um Departamento</Label>

              <Select
                options={departments}
                getOptionLabel={({ name }) => name}
                getOptionValue={({ id }) => id}
                value={departments.filter(({ id }) => id === department.id)}
                placeholder="Selecione o Departamento"
                isSearchable={false}
                isDisabled={!departments.length}
                styles={selectStyle}
                onChange={handleSelectDepartment}
              />
            </SelectWrapper>
          </Filters>

          {department.id && (
            <Categories>
              <Wrapper>
                <Label>Selecione as Categorias do Departamento</Label>
                <SelectAll onClick={handleSelectAll}>{`${
                  selectAll ? 'Des' : 'S'
                }elecionar todos`}</SelectAll>
              </Wrapper>

              <Grid>
                {categories.map((category, index) => (
                  <CheckItem key={category + index}>
                    <Checkbox
                      checked={category.isSelected}
                      onChange={() => handleCategoryCheck(index)}
                    />
                    <span>{category.name}</span>
                  </CheckItem>
                ))}
              </Grid>
            </Categories>
          )}
        </Content>

        {department.id && (
          <ButtonWrapper>
            <Button
              disabled={!categories.some(category => category.isSelected)}
              onClick={handleSubmit}
            >
              FINALIZAR
            </Button>
          </ButtonWrapper>
        )}
      </Container>
      <Footer />
    </>
  )
}

export default Setup
