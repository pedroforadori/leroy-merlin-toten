import styled from 'styled-components'

import theme from '../../styles/theme'

export const MainPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  /* display: flex;
  justify-content: center; 
  align-items: center;*/
  margin-left: 44px; 
`

export const Title = styled.div`
    /* display: grid;
    grid-template-columns: repeat(auto-fit, 410px); */

    /* Grey 700 */
    color:${theme.darkGray};
    h2 {
        font-style: normal;
        font-weight: normal;
        font-size: 24px;
        line-height: 29px;
    }
    p.codProducty {
        font-size: 14px;
        line-height: 20px;
        margin-top:19px;
    }
    h3 {
        font-weight: bold;
        font-size: 14px;
        line-height: 29px;
        margin-top: 25px;
    }
    p {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 22px;
        margin-top: 5px;
    }
`

export const ImageProduct = styled.img`
    max-width: 400px;
    height: auto;
    border-radius: 3px;
`

export const Price = styled.div`
    font-style: normal;
    font-weight: normal;
    h1 {
        font-size: 48px;
        line-height: 58px;
    }
    span.cifra {
        font-size: 35px;
        line-height: 40px;
    }
    span.secondPrice {
        font-size: 35px;
        line-height: 40px;
    }
    span.unit {
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
    }
`
export const Details = styled.div`
    width: 50%;
    margin: 27px 0 80px 44px;
    font-size:14px;

    h3 {
        text-decoration: underline;
    };

    div {
        display:inline-block;
        width: 50%;
        margin-top: 27px;
    };

    div:nth-child(even) {
        font-weight:bold;
    };
`
