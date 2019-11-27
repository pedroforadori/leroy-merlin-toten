import React, { Fragment } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from 'react-redux'; 

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GoBackLink from "../../components/GoBackLink";

import { currencyDisplay } from "../../utils/currency";

import { Title, MainPage, ImageProduct, Details, Price } from "./style";
import { getStoreId } from '../../services/auth'

import img from "../../img/sampler.png";

  if (!getStoreId()) history.push('/setup')

const ProductDetails = () => {
  let history = useHistory();
  const {categoryName } = useParams()
  if (!getDepartmentId()) history.push("/setup");  
  
  return (
    <>
      <Header />
      <GoBackLink goBack >
        {categoryName || 'pagina anterior'}
      </GoBackLink>
      <MainPage>
        <Title>
          <h2>{obj[0].name}</h2>
          <p className='codProducty'>(Cod:{obj[0].lm_leroy})</p>
          <h3>Sobre o produto</h3>
          <p>{obj[0].description}</p>
        </Title>
        <div>
          <ImageProduct src={img}></ImageProduct>
        </div>
        <Price>
          <h1>
            <span className='cifra'>R$</span>
            <span className='fristPrice'>
              {currencyDisplay(obj[0].prices[0].price, false).split(",")[0]},
            </span>
            <span className='secondPrice'>
              {currencyDisplay(obj[0].prices[0].price, false).split(",")[1]}
            </span>
            <span className='unit'> / cada</span>
          </h1>
        </Price>
      </MainPage>
      <Details>
        <h3>Características Técnicas</h3>
        {obj[0].attributes.map((items, index) => {
          return (
            <Fragment key={items.name + index}>
              <div>
                <p>{items.name}</p>
              </div>
              <div>
                <p>{items.value}</p>
              </div>
            </Fragment>
          );
        })}
      </Details>

      <Footer />
    </>
  );
};

export default ProductDetails;
