import React from 'react';
import ReactDOM from 'react-dom';

import './styles/settings/colors.css';
import './styles/tools/fonts.css';
import './styles/generic/reset.css';
import './styles/generic/content.css';

import './index.css';
import App from './App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import CategoryPage from './components/CategoryPage';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App} />
            <Route path="/categoria/" component={CategoryPage}/>
            {/* <Route path="/detail/:id" component={DetailNurse} /> */}
        </Switch>
    </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
