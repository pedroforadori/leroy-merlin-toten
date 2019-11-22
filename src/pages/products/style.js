import styled from 'styled-components'

import theme from '../../styles/theme'

export const Container = styled.div`
  display: grid;
  grid-gap: 50px;
  grid-template-columns: repeat(auto-fit, 239px);
  justify-content: center;
  padding: 100px 50px;
`

export const Category = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url(${({ src }) => src});
  background-position: 50% 15%;
  background-repeat: no-repeat;
  height: 432px;
  width: 239px;
  border: 1px solid #666666;
  box-sizing: border-box;
  padding-top: 10px;

  div{
      margin-left: 10px;
  }
`

export const DescriptionProduct = styled.div`
    font-size: 16px;
    line-height: 19px;
    padding-top: 250px;
    /* cinza */
    color: #666666;
`

export const IdProduct = styled.div`
    color: #666666;
    opacity: 0.6;
    font-size: 12px;
    line-height: 144%;
    margin-top: 5px;
`

export const PriceProduct = styled.div`
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    /* cinza */
    color: #333333;
    margin-top: 10px;
`

export const PortionProduct = styled.div`
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;

    color: #666666;
    `