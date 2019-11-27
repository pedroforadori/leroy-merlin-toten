import styled from 'styled-components'

export const Container = styled.div`
    background-image: url(${({ src }) => src});
    background-position: center;
    background-size: cover;
    height: 203px;
    width: 219px;
    margin-top: 40px;
`
