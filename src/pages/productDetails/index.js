import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Title, MainPage, IdProduct, ImageProduct, About, Details, Price } from './style'
import img from '../../img/photo.png'

const ProductDetails = () => {

    return (
        <>
            <Header />

            <MainPage>
                <Title>
                    Lixeira para Pia de Cozinha Inox Prata e Vermelho 4L Click
                    <div>(Cod: 9192332)</div>
                    <About>
                        Sobre o produto
                        <div>
                            <p>- Contrary to popular belief, Lorem Ipsum is not; </p>
                            <p>- It has roots in a piece of classical Latin; </p>
                            <p>- Contrary to popular belief, Lorem Ipsum is not; </p>
                            <p>- It has roots in a piece of classical Latin; </p>
                            <p>- It has roots in a piece of classical Latin;</p>
                        </div>
                    </About>
                </Title>

                <ImageProduct src={img}>
                </ImageProduct>
            </MainPage>
            <Price>
                R$ 18,90 / cada
                <div>12x juros no cartão</div>
            </Price>
            <Details>
                Características Técnicas
                <p><strong>Produto</strong>....................................................Produto</p>
                <p><strong>Material da Porta do Bo</strong> ........................Material da Porta do Bo</p>
                <p><strong>Tipo de Abertura</strong> ....................................Tipo de Abertura</p>
                <p><strong>Cor</strong> ...........................................................Cor</p>
                <p><strong>Altura</strong> ......................................................Altura</p>
                <p><strong>Largura</strong> ....................................................Largura</p>
                <p><strong>Dimensão</strong>................................................. Dimensão</p>
                <p><strong>Característica Adicional</strong> .........................Característica Adicional</p>
                <p><strong>Marca</strong>....................................................... Marca</p>
            </Details>

            <Footer />
        </>
    )
}

export default ProductDetails
