import styled, { css } from 'styled-components'

import theme from '../../styles/theme'

export const Container = styled.div`
  display: grid;
  grid-column-gap: 22px;
  grid-row-gap: 45px;
  grid-template-columns: repeat(auto-fit, 239px);
  justify-content: space-around;
  padding: 0 47px 80px 47px;
`

export const Category = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 432px;
  width: 239px;
  border: 1px solid ${theme.darkGray};
  box-sizing: border-box;
  padding: 10px;
  border-radius: 8px;
`

export const WrapperCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: ${theme.darkGray};

  ${({ loading }) =>
    loading &&
    css`
      height: calc(100% - 232px);
    `};
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
