import React from 'react'
import { Description } from '../CarouselTitle/style';

const CarouselTitle = props => {
    const { text } = props;

    return (
        <>
            <Description>
                {text}
            </Description>
        </>
    )

} 

export default CarouselTitle