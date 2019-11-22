import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from '../pages/home'
import Categories from '../pages/categories'
import Products from '../pages/products'
import ProductDetails from '../pages/productDetails'

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/categories">
        <Categories />
      </Route>
      <Route exact path="/categories/:categoryId">
        <Products />
      </Route>
      <Route exact path="/categories/:categoryId/product/:productId">
        <ProductDetails />
      </Route>

      <Redirect from="/" exact to="/home" />
    </Switch>
  )
}

export default Routes
