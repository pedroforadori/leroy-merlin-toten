import styled, { css } from 'styled-components'

import theme from '../../styles/theme'

export const selectStyle = {
  control: (provided, state) => ({
    ...provided,
    height: 57,
    border: `1px solid ${state.isDisabled ? theme.gray : theme.primaryDefault} !important`,
    borderRadius: 8,
    boxShadow: 'none'
    // boxShadow: state.isFocused || state.isSelected ? `0 0 0 1px ${theme.primaryDefault}` : ''
    // color: state.isSelected ? 'red' : 'blue'
  }),
  container: (provided, state) => ({
    ...provided,
    fontSize: 18
    // border: `1px solid ${theme.primaryDefault}`
    // color: state.isSelected ? 'red' : 'blue'
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'white' : theme.primaryDefault,
    backgroundColor: state.isSelected ? theme.primaryDefault : 'white',
    opacity: state.isSelected ? 0.8 : 1
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: theme.primaryDefault,
    fontSize: 18,
    lineHeight: '24px',
    fontWeight: 600
  })
}

export const selectTheme = {
  primary: theme.primaryDefault,
  neutral50: theme.darkGray04
}

export const Container = styled.div`
  width: 100%;
  padding: 0 40px 80px;
  ${({ hidden }) =>
    hidden &&
    css`
      display: none;
    `};
`

export const Filters = styled.div`
  display: flex;

  @media (orientation: landscape) {
    flex-direction: row;
  }

  @media (orientation: portrait) {
    flex-direction: column;
  }
`

export const SelectWrapper = styled.div`
  flex: 1;

  > div {
    margin-top: 13px;
  }

  @media (orientation: landscape) {
    :last-child {
      margin-left: 54px;
    }
  }

  @media (orientation: portrait) {
    :last-child {
      margin-top: 40px;
    }
  }
`

export const Title = styled.p`
  font-size: 40px;
  line-height: 49px;
  color: ${theme.darkGray};
`

export const SubTitle = styled.p`
  font-size: 14px;
  line-height: 17px;
  color: ${theme.darkGray};
  margin-top: 10px;
`

export const TabWrapper = styled.div`
  display: flex;
  margin-top: 50px;
`

export const TabTitle = styled.div`
  color: ${({ isSelected }) => (isSelected ? theme.darkGray : theme.primaryDefault)};
  margin-right: 34px;
  cursor: pointer;
  transition: all 150ms ease;

  p {
    font-size: 18;
    line-height: 22px;
    ${({ isSelected }) =>
      isSelected &&
      css`
        font-weight: 600;
      `};
  }

  div {
    border: ${({ isSelected }) =>
      isSelected ? `2px solid ${theme.darkGray}` : '2px solid transparent'};
    transition: all 150ms ease;
  }
`

export const Label = styled.span`
  font-size: 12px;
  line-height: 24px;
  color: ${theme.primaryDefault};
`

export const Content = styled.div`
  margin-top: 50px;
`

export const Categories = styled.div`
  margin-top: 41px;
`

export const Grid = styled.div`
  margin-top: 13px;
  display: grid;
  grid-gap: 31px;
  grid-template-columns: repeat(auto-fit, 200px);
  justify-content: space-between;
`

export const CheckItem = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;

  span {
    font-size: 16px;
    line-height: 21px;
    color: ${theme.darkGray};
    margin-left: 7px;
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const SelectAll = styled.span`
  font-size: 16px;
  line-height: 21px;
  color: ${theme.primaryDefault};
  cursor: pointer;
`

export const TitleInput = styled.div`
  font-size: 18px;
  line-height: 24px;
  font-weight: 600;
  color: ${theme.primaryDefault};
  margin-top: 60px;
`

export const InputWrapper = styled.div`
  flex: 1;
  margin-top: 33px;

  > input {
    margin-top: 13px;
  }
`

export const Input = styled.input`
  width: 100%;
  height: 57px;
  border: 1px solid ${theme.primaryDefault};
  border-radius: 8px;
  font-size: 18px;
  line-height: 24px;
  font-weight: 600;
  color: ${theme.primaryDefault};
  padding-left: 10px;

  ::placeholder {
    font-weight: 400;
    color: ${theme.darkGray04};
  }
`
