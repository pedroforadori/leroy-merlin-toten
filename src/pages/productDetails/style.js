import styled, { css } from 'styled-components'

import theme from '../../styles/theme'

export const Container = styled.div`
  width: 100%;
  padding: 0 40px 40px;

  ${({ loading }) =>
    loading &&
    css`
      height: calc(100% - 107px);
    `};
`

export const WrapperCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ loading }) =>
    loading &&
    css`
      height: calc(100% - 232px);
    `};
`

export const MainPage = styled.div`
  display: grid;
  grid-gap: 20px;

  div:nth-child(2) {
    grid-area: image;
  }

  @media (orientation: landscape) {
    grid-template-columns: 350px 300px 1fr;
    grid-template-areas: 'title image price';
  }

  @media (orientation: portrait) {
    grid-template-columns: 267px 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      'image price'
      'title title';
  }
`

export const Title = styled.div`
  grid-area: title;
  color: ${theme.darkGray};
  h2 {
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 29px;
  }
  p.codProducty {
    font-size: 14px;
    line-height: 20px;
    margin-top: 19px;
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
  width: 300px;
  height: auto;
  border-radius: 8px;
  cursor: pointer;

  @media (orientation: portrait) {
    width: 267px;
  }
`

export const ImageProductSmall = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 53px;
  min-width: 79px;
  border: 1px solid ${theme.darkGray02};
  border-radius: 2px;
  margin: 0 10px;
  cursor: pointer;

  img {
    height: 47px;
    width: 47px;

    ${({ isSelected }) =>
      isSelected &&
      css`
        opacity: 0.4;
      `};
  }

  @media (orientation: portrait) {
    width: 100%;
    min-width: 69px;
  }
`

export const OverflowWrapper = styled.div`
  overflow: hidden;
  height: 53px;
  margin-top: 29px;
`

export const ImagesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  overflow-x: scroll;

  div:first-child,
  div:last-child {
    display: block;
    min-height: 1px;
    min-width: 1px;
  }
`

export const Price = styled.div`
  grid-area: price;
  font-style: normal;
  font-weight: normal;
  h1 {
    font-size: 48px;
    line-height: 58px;
    white-space: nowrap;
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
  width: 800px;
  margin-top: 27px;
  font-size: 14px;

  h3 {
    text-decoration: underline;
  }

  div {
    display: inline-block;
    width: 50%;
    margin-top: 27px;

    :nth-child(even) {
      font-weight: bold;
    }
  }

  @media (orientation: portrait) {
    width: 100%;
  }
`
