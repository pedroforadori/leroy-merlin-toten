import React from 'react'

import { Description, Image } from './style'

const CategoryHeader = props => {
    const { imageUrl, text } = props;

    return (
        <>
            <Description>{text}</Description>
            <Image src={imageUrl}></Image>
        </>
    )
};

export default CategoryHeader;