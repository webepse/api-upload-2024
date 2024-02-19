/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */
import './styles/app.css';
import React from 'react';
import ReactDOM from 'react-dom/client'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; 
import HomePage from './pages/HomePage';
import AddProduct from './pages/AddProduct';
import ProductsPage from './pages/ProductsPage';


function App() {
    return (
        <Router>
            <main className='container pt-5'>
                <Routes>
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/add-prod" element={<AddProduct />} />
                    <Route path="/" element={ <HomePage />}/>
                </Routes>
            </main>
        </Router>
    )
}

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

