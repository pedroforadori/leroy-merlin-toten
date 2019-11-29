import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Select from 'react-select'

import {
  selectStyle,
  selectTheme,
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
  SelectAll,
  TitleInput,
  InputWrapper,
  Input,
  WrapperCenter
} from './style'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Checkbox from '../../components/Checkbox'
import Button from '../../components/Button'
import LoadingIcon from '../../components/icons/LoadingIcon'

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
  const loadingCategories = useSelector(state => state.products.loadingCategories)
  const departmentName = useSelector(state => state.products.departmentName)
  const banner1Title = useSelector(state => state.products.banner1Title)
  const banner1Subtitle = useSelector(state => state.products.banner1Subtitle)
  const banner2Title = useSelector(state => state.products.banner2Title)
  const banner2Subtitle = useSelector(state => state.products.banner2Subtitle)

  const [section, setSection] = useState('categories')
  const [selectAll, toggleSelectAll] = useState(false)
  // const [filteredCategories, setFilteredCategories] = useState([])
  // const [departmentName, setDepartmentName] = useState('')

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

  const handleInput = e => {
    const { name, value } = e.target

    dispatch(ProductsActions.setAttrValue(name, value))
    // name === 'departmentName' && setDepartmentName(value)
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
      departmentName,
      banner1Title,
      banner1Subtitle,
      banner2Title,
      banner2Subtitle,
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

  return (
    <>
      <Header />

      <Container loadingCategories={loadingCategories}>
        <Title>Configure o sistema para começar a usar</Title>
        <SubTitle>Selecione abaixo sua loja e as categorias que deseja habilitar</SubTitle>
        <TabWrapper>
          <TabTitle isSelected={section === 'categories'} onClick={() => setSection('categories')}>
            <p>Categorias</p>
            <div />
          </TabTitle>

          <TabTitle isSelected={section === 'banner'} onClick={() => setSection('banner')}>
            <p>Banner</p>
            <div />
          </TabTitle>
        </TabWrapper>

        <Content hidden={section !== 'categories'} loadingCategories={loadingCategories}>
          <Filters>
            <SelectWrapper>
              <Label>Selecione sua Loja</Label>

              <Select
                options={stores}
                getOptionLabel={({ name }) => name}
                getOptionValue={({ _id }) => _id}
                placeholder="Selecione a Unidade"
                isSearchable={false}
                isLoading={loading}
                loadingMessage="Carregando..."
                styles={selectStyle}
                onChange={handleSelectStore}
                theme={defaultTheme => ({
                  ...defaultTheme,
                  colors: {
                    ...defaultTheme.colors,
                    ...selectTheme
                  }
                })}
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
                isLoading={loadingCategories}
                loadingMessage="Carregando..."
                // isDisabled={!categories.length}
                styles={selectStyle}
                onChange={handleFilterCategories}
                // onInputChange={handleFilterCategories}
                theme={defaultTheme => ({
                  ...defaultTheme,
                  fontSize: 18,
                  lineHeight: '24px',
                  colors: {
                    ...defaultTheme.colors,
                    ...selectTheme
                  }
                })}
              />
            </SelectWrapper>
          </Filters>

          {loadingCategories || !categories.length ? (
            <WrapperCenter>
              <LoadingIcon />
            </WrapperCenter>
          ) : (
            <Categories>
              <Wrapper>
                <Label>Selecione as Categorias do Departamento</Label>
                <SelectAll onClick={handleSelectAll}>{`${
                  selectAll ? 'Des' : 'S'
                }elecionar todos`}</SelectAll>
              </Wrapper>

              <Grid>
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

        <Content hidden={section !== 'banner'}>
          <TitleInput>Departamento</TitleInput>

          <InputWrapper>
            <Label>Nome do Departamento</Label>

            <Input
              name="departmentName"
              placeholder="Digite o Nome"
              value={departmentName}
              onChange={handleInput}
            />
          </InputWrapper>

          <TitleInput>Banner 1</TitleInput>

          <InputWrapper>
            <Label>Título do Banner</Label>

            <Input
              name="banner1Title"
              placeholder="Digite o Título"
              value={banner1Title}
              onChange={handleInput}
            />
          </InputWrapper>

          <InputWrapper>
            <Label>Subtítulo do Banner</Label>

            <Input
              name="banner1Subtitle"
              placeholder="Digite o Subtítulo"
              value={banner1Subtitle}
              onChange={handleInput}
            />
          </InputWrapper>

          <TitleInput>Banner 2</TitleInput>

          <InputWrapper>
            <Label>Título do Banner</Label>

            <Input
              name="banner2Title"
              placeholder="Digite o Título"
              value={banner2Title}
              onChange={handleInput}
            />
          </InputWrapper>

          <InputWrapper>
            <Label>Subtítulo do Banner</Label>

            <Input
              name="banner2Subtitle"
              placeholder="Digite o Subtítulo"
              value={banner2Subtitle}
              onChange={handleInput}
            />
          </InputWrapper>
        </Content>

        {!loading && !!categories.length && (
          // <ButtonWrapper>
          <Button
            fixed
            disabled={
              !(
                storeId &&
                categories.some(category => category.isSelected) &&
                departmentName.trim() &&
                banner1Title.trim() &&
                banner1Subtitle.trim() &&
                banner2Title.trim() &&
                banner2Subtitle.trim()
              )
            }
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
