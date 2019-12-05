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

import {
  getEditSetup,
  setEditSetup,
  persistData,
  getStoreId,
  getStoreName,
  getDepartmentName,
  getBanner1Title,
  getBanner1Subtitle,
  getBanner2Title,
  getBanner2Subtitle
} from '../../services/auth'

const Setup = () => {
  let history = useHistory()

  const stores = useSelector(state => state.products.stores)
  const categories = useSelector(state => state.products.categories)
  const loading = useSelector(state => state.products.loading)
  const loadingCategories = useSelector(state => state.products.loadingCategories)

  const [section, setSection] = useState('categories')
  const [storeId, setStoreId] = useState(getStoreId())
  const [storeName, setStoreName] = useState(getStoreName())
  const [departmentName, setDepartmentName] = useState(getDepartmentName() || '')
  const [banner1Title, setBanner1Title] = useState(getBanner1Title() || 'Veja aqui')
  const [banner1Subtitle, setBanner1Subtitle] = useState(
    getBanner1Subtitle() || 'Todas as opções de decoração'
  )
  const [banner2Title, setBanner2Title] = useState(getBanner2Title() || 'Renove sua Casa')
  const [banner2Subtitle, setBanner2Subtitle] = useState(
    getBanner2Subtitle() || 'Com os melhores descontos e as melhores marcas'
  )
  const [selectAll, toggleSelectAll] = useState(false)

  const dispatch = useDispatch()

  const handleCategoryCheck = id => {
    let newCategories = [...categories]

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
    if (selection.store_id === storeId) return

    setStoreId(selection.store_id)
    setStoreName(selection.name)
  }

  const handleFilterCategories = selection => {
    let filteredCategories

    if (selection) {
      filteredCategories = categories.map(category => {
        return category._id === selection._id
          ? { ...category, hidden: false }
          : { ...category, hidden: true }
      })
    } else {
      filteredCategories = categories.map(category => ({ ...category, hidden: false }))
    }

    dispatch(ProductsActions.setCategories(filteredCategories))
  }
  const handleSubmit = () => {
    persistData({
      storeId,
      storeName,
      departmentName,
      banner1Title,
      banner1Subtitle,
      banner2Title,
      banner2Subtitle,
      selectedCategories: categories
        .filter(category => category.isSelected)
        .map(category => category._id)
        .join(',')
    })

    setEditSetup('false')

    history.push('/home')
  }

  useEffect(() => {
    if (getEditSetup() === 'false') {
      history.push('/home')
    } else {
      dispatch(ProductsActions.getStoresRequest())
      dispatch(ProductsActions.getCategoriesRequest())
    }
  }, [dispatch, history])

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
            <p>Departamento & Banners</p>
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
                getOptionValue={({ store_id }) => store_id}
                defaultValue={storeName ? { name: storeName, store_id: storeId } : ''}
                placeholder="Selecione a Unidade"
                isSearchable={false}
                isLoading={loading}
                loadingMessage={() => 'Carregando lojas...'}
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
              <Label>Busque uma Categoria</Label>

              <Select
                options={categories}
                getOptionLabel={({ name }) => name}
                getOptionValue={({ _id }) => _id}
                placeholder="Buscar Categoria"
                isSearchable
                isClearable
                isLoading={loadingCategories}
                loadingMessage={() => 'Carregando categorias...'}
                styles={selectStyle}
                onChange={handleFilterCategories}
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
                <Label>Selecione as Categorias da Unidade</Label>
                <SelectAll onClick={handleSelectAll}>{`${
                  selectAll ? 'Des' : 'S'
                }elecionar todas`}</SelectAll>
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
              onChange={e => setDepartmentName(e.target.value)}
            />
          </InputWrapper>

          <TitleInput>Banner 1</TitleInput>

          <InputWrapper>
            <Label>Título do Banner</Label>

            <Input
              name="banner1Title"
              placeholder="Digite o Título"
              value={banner1Title}
              onChange={e => setBanner1Title(e.target.value)}
            />
          </InputWrapper>

          <InputWrapper>
            <Label>Subtítulo do Banner</Label>

            <Input
              name="banner1Subtitle"
              placeholder="Digite o Subtítulo"
              value={banner1Subtitle}
              onChange={e => setBanner1Subtitle(e.target.value)}
            />
          </InputWrapper>

          <TitleInput>Banner 2</TitleInput>

          <InputWrapper>
            <Label>Título do Banner</Label>

            <Input
              name="banner2Title"
              placeholder="Digite o Título"
              value={banner2Title}
              onChange={e => setBanner2Title(e.target.value)}
            />
          </InputWrapper>

          <InputWrapper>
            <Label>Subtítulo do Banner</Label>

            <Input
              name="banner2Subtitle"
              placeholder="Digite o Subtítulo"
              value={banner2Subtitle}
              onChange={e => setBanner2Subtitle(e.target.value)}
            />
          </InputWrapper>
        </Content>

        {!loading && !!categories.length && (
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
        )}
      </Container>
      <Footer />
    </>
  )
}

export default Setup
