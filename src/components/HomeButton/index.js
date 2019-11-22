import React from 'react'
import { ClickOption, Icon, Description } from './style'



const HomeButton = props => {
    const { iconUrl, text } = props;

    return (
        <>
            <ClickOption>
                <Icon src={iconUrl}></Icon>
                <Description>{text}</Description>
            </ClickOption>
        </>
    )
}

export default HomeButton;