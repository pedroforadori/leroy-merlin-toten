import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Setup from '../pages/setup'
import Home from '../pages/home'
import Categories from '../pages/categories'
import Products from '../pages/products'
import ProductDetails from '../pages/productDetails'

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/setup">
        <Setup />
      </Route>

      <Route exact path="/home">
        <Home />
      </Route>

      <Route exact path="/categories">
        <Categories />
      </Route>

      <Route exact path="/categories/:categoryId/:categoryName">
        <Products />
      </Route>

      <Route exact path="/categories/:categoryId/:categoryName/product/:productId">
        <ProductDetails />
      </Route>

      <Redirect from="*" exact to="/setup" />
    </Switch>
  )
}
