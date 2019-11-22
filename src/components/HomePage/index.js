import React from 'react';

import HomeTitle from '../HomeTitle';

import { Option, AlignButton, Separator } from './style'
import HomeButton from '../HomeButton';
import LinkWrapper from '../../tools/LinkWrapper';

const HomePage = () => (
    <>
        <HomeTitle />
        <Option>
            Escolha uma opção abaixo
        </Option>
        <AlignButton>
            <LinkWrapper className="button link" to={`/categoria/`}>
                <HomeButton iconUrl={'../img/icon/list.svg'} text={'Categorias'} />
            </LinkWrapper>
            <Separator />
            <HomeButton iconUrl={'../img/icon/list.svg'} text={'Produtos'} />
        </AlignButton>

    </>
);

export default HomePage;