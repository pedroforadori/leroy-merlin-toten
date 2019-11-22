import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CarouselTitle from '../../components/CarouselTitle';
import { useHistory } from 'react-router-dom'

import { MainImage, Container, Category, DescriptionProduct, IdProduct, PriceProduct, PortionProduct } from './style'

import Footer from '../../components/Footer'

import img from '../../img/photo.png'
import Header from '../../components/Header';

const Products = props => {
    let history = useHistory()

    const { text } = props;

    const categories = useSelector(state => state.products.categories)

    return (
        <>
        <Header/>
            <CarouselTitle text={"Decore a Janela"}></CarouselTitle>
            <Container>
                {categories.map(category => (
                    <Category
                        src={img}
                        key={category.name}
                     onClick={() => history.push(`/categories/${category.id}/product/1`)}
                    >
                        <div>
                            <DescriptionProduct>{category.name}</DescriptionProduct>
                            <IdProduct>(Cod. 3423498274)</IdProduct>
                            <PriceProduct> R$ 18,90 cada</PriceProduct>
                            <PortionProduct>12x de R$ 3,15 sem juros</PortionProduct>
                        </div>

                    </Category>
                ))}
            </Container>

            <Footer />
        </>
    )

}

export default Products
