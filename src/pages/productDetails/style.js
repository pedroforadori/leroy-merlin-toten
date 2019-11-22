import styled from 'styled-components'

import theme from '../../styles/theme'

export const MainPage = styled.div`
  display: flex;
  /* display: flex;
  justify-content: center; 
  align-items: center;*/
  margin-left: 44px;
 
  div {
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
  } 
`

export const Title = styled.h2`
    display: grid;
    grid-template-columns: repeat(auto-fit, 410px);
    font-weight: normal;
    font-size: 24px;
    line-height: 29px;
    /* Grey 700 */
    color: #555555;
`

export const IdProduct = styled.div`

`

export const ImageProduct = styled.img`
    align-items: flex-start;
`

export const About = styled.div`
    margin-top: 10px;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;

    div{

    }
`

export const Details = styled.div`
    margin-left: 44px;
    margin-top: 180px;

    p{
        margin-top: 5px;
    } 
    /* strong{
        margin-right: 100px;
    } */
`

export const Price = styled.div`
    float: right;
    margin-right: 44px;
    margin-top: 30px;
    font-style: normal;
    font-weight: normal;
    font-size: 48px;
    line-height: 58px;

    div{
        font-weight: normal;
        font-size: 16px;
        line-height: 14px;
    }
`

