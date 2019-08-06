import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlus, faChevronLeft, faTrashAlt, faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import 'typeface-roboto'

import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';


library.add(faPlus, faChevronLeft, faTrashAlt, faCheckDouble)

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, 
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
