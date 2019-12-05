import styled from 'styled-components'

import theme from '../../styles/theme'

export const Container = styled.div`
  display: grid;
  grid-gap: 50px;
  grid-template-columns: repeat(auto-fit, 198px);
  justify-content: center;
  padding: 30px 50px 100px;
`

export const Category = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${({ src }) => src});
  background-position: center;
  background-size: cover;
  height: 198px;
  width: 198px;
  border-radius: 8px;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 198px;
    width: 198px;
    background-color: ${theme.shadowHover};
    border-radius: 8px;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      font-size: 24px;
      font-weight: ${theme.fontBold};
      color: ${theme.white};
      text-align: center;
      transition: all 0.2s ease;

      :last-child {
        font-size: 12px;
      }
    }
  }

  :hover > div {
    transition: all 0.2s ease;
    opacity: 0;
  }
`

export const WrapperCenter = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
