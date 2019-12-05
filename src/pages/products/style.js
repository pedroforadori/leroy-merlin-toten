import styled from 'styled-components'

import theme from '../../styles/theme'

export const selectStyle = {
  control: (provided, state) => ({
    ...provided,
    minHeight: 30,
    maxHeight: 30,
    width: 130,
    border: `1px solid ${state.isDisabled ? theme.gray : theme.primaryDefault} !important`,
    borderRadius: 27,
    paddingRight: 8,
    boxShadow: state.isFocused || state.isSelected ? `0 0 0 1px ${theme.primaryDefault}` : ''
  }),
  container: (provided, state) => ({
    ...provided,
    fontSize: 14,
    lineHeight: '17px',
    margin: '0 11px'
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
    fontSize: 14,
    lineHeight: '27px',
    fontWeight: 700
  })
}

export const selectTheme = {
  primary: theme.primaryDefault,
  primary75: theme.primaryDefault,
  primary50: theme.primaryDefault02,
  primary25: theme.primaryDefault,
  neutral0: theme.white,
  neutral5: theme.darkGray04,
  neutral10: theme.darkGray04,
  neutral20: theme.primaryDefault,
  neutral30: theme.darkGray04,
  neutral40: theme.darkGray04,
  neutral50: theme.primaryDefault,
  neutral60: theme.darkGray04,
  neutral70: theme.darkGray04,
  neutral80: theme.darkGray04,
  neutral90: theme.darkGray04,
  danger: theme.red,
  dangerLight: theme.red
}

export const Container = styled.div`
  display: grid;
  grid-column-gap: 22px;
  grid-row-gap: 45px;
  grid-template-columns: repeat(auto-fit, 239px);
  justify-content: space-around;
  padding: 0 47px 80px;
`

export const Title = styled.h2`
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 38px;
  color: ${theme.textDefault};
  margin: 47px auto 26px 3.85%;
`

export const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 432px;
  width: 239px;
  border: 1px solid ${theme.darkGray};
  box-sizing: border-box;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
`

export const NotFoundWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: ${theme.darkGray};
  height: calc(100% - 292px);
`

export const BoxDecription = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const DescriptionProduct = styled.div`
  font-size: 16px;
  line-height: 19px;
  margin-top: 14px;
  color: ${theme.darkGray};
  min-height: 57px;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const IdProduct = styled.div`
  color: ${theme.darkGray};
  opacity: 0.6;
  font-size: 12px;
  line-height: 144%;
  margin-top: 6px;
`

export const PriceProduct = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: ${theme.textDefault};
  margin-top: 15px;
  position: relative;

  span {
    font-size: 24px;
  }

  span:nth-of-type(2) {
    position: absolute;
    font-size: 12px;
    top: -5px;
  }

  span:nth-of-type(3) {
    font-size: 14px;
    margin-left: 20px;
  }
`

export const PortionProduct = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;

  color: ${theme.darkGray};
`

export const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 50px;

  p {
    font-size: 14px;
    line-height: 17px;
    color: ${theme.darkGray};

    :last-child {
      color: ${theme.primaryDefault};
      font-weight: 700;
      margin-left: 27px;
      cursor: pointer;
    }

    span {
      font-weight: 600;
    }
  }

  div {
    div:nth-of-type(1) {
      div {
        span {
          display: none;
        }

        > div {
          padding: 0;
        }
      }
    }
  }
`
