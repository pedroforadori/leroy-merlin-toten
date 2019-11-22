import React from 'react'
import CategoryHeader from '../CategoryHeader'
import CategoryFooter from '../CategoryFooter'

import logo from "../../img/decoracao-de-natal-corpo.png";
import CategoryCarousel from '../CategoryCarousel';
import CarouselTitle from '../CarouselTitle';

const CategoryPage = () => (
    <>
        <CategoryHeader imageUrl={logo} text={"Decoração"}></CategoryHeader>
        <CarouselTitle text={"Decore a Janela"}></CarouselTitle>
        <CategoryCarousel></CategoryCarousel>
        <CategoryFooter />
    </>
);

export default CategoryPage;
