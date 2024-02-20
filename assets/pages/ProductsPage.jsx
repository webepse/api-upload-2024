import React, {useEffect, useState} from 'react';
import Axios from 'axios'
import { Link } from 'react-router-dom';

const ProductsPage = () => {
    const [products, setProducts] = useState([])

    useEffect(()=>{
        Axios.get("http://127.0.0.1:8000/api/products")
            .then(response => response.data['hydra:member'])
            .then(data => setProducts(data))
            .catch(error => {
                console.log(error.response)
            })
    },[])


    return ( 
        <>
            <h1>Les produits</h1>
            <Link to="/" className='btn btn-secondary my-3'>Retour</Link>
            <div className="row">
                {products.map(product => (
                    <div className='col-md-4' key={product.id}>
                        <div className="card mb-3">
                            <img src={`http://127.0.0.1:8000/images/${product.image}`} alt={"image de "+product.name} className='card-img-top' />
                            <div className="card-body">
                                <h4 className="card-title">{product.name}</h4>
                                <p className='card-text'>{product.description}</p>
                                <a href="#" className='btn btn-primary'>En savoir plus</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
     );
}
 
export default ProductsPage;