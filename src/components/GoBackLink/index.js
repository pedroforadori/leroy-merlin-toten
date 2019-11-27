import React from 'react'
import { useHistory } from 'react-router-dom'
import { Container } from './style'

import ArrowIcon from '../../components/icons/ArrowIcon'

const GoBackLink = props => {

    let history = useHistory();

    const handleClick = () => {
        props.goBack ? history.goBack() : history.push(props.path);
    };

    return(
        <Container onClick={handleClick} >
            <ArrowIcon /><span> Voltar para {props.children}</span> 
        </Container>
    )
}

export default GoBackLink;