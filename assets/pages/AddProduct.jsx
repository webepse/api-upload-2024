import React, {useState} from 'react';
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import Field from '../components/Field';
import Textarea from '../components/Textarea';
import FieldImg from '../components/FieldImg';


const AddProduct = (props) => {
    const navigate = useNavigate()

    const [info, setInfo] = useState({
        name: "",
        description: "",
        price: "",
        image: null
    })

    const [errors, setErrors] = useState({
        name: "",
        description: "",
        price: "",
        image: ""
    })

    const handleChange = (event) => {
        const {name, value} = event.currentTarget 
        setInfo({...info, [name]:value})
    }

    const handleFileChange = (event) => {
        const name = event.currentTarget.name 
        const myFile = event.currentTarget.files[0]
        console.log(myFile)
        setInfo({...info, [name]:myFile})

    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            // tester les valeurs avant d'envoyer

            // construire l'objet que je dois envoyer
            const bodyFormData = new FormData()
            bodyFormData.append('name', info.name)
            bodyFormData.append('description', info.description)
            bodyFormData.append('price', info.price)
            bodyFormData.append('image', info.image)
            // const config = {
            //     headers: {
            //         'Content-Type': 'multimpart/form-data',
            //     }
            // }

            await Axios({
                method: "post",
                url: "http://127.0.0.1:8000/api/products/upload",
                data: bodyFormData,
                headers: { "Content-type": "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substring(2) }
            }).then(response => {
                console.log(response.data)
                navigate("/", {replace:true})
            })

        }catch({response})
        {
            const {violations} = response.data
            const apiErrors = {}
            if(violations){
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message
                })
                setErrors(apiErrors)
            }else{
                apiErrors["image"] = response.data.detail 
                setErrors(apiErrors)
            }
        }
    }

    return ( 
        <>
            <h1>Ajouter un produit</h1>
            <form onSubmit={handleSubmit}>
                <Field 
                    name="name"
                    label="Nom du produit"
                    placeholder='Nom du produit'
                    value={info.name}
                    onChange={handleChange}
                    error={errors.name}
                />
                <Textarea 
                    name="description"
                    label="Description"
                    placeholder='Description du produit'
                    value={info.description}
                    error={errors.description}
                    onChange={handleChange}
                />
                <FieldImg 
                    name="image"
                    label="Image"
                    placeholder='Votre image'
                    error={errors.image}
                    onChange={handleFileChange}
                />
                <Field 
                    name="price"
                    type="number"
                    label="Prix"
                    placeholder='Prix du produit'
                    value={info.price}
                    error={errors.price}
                    onChange={handleChange}
                />
                <div className="my-3">
                    <button type="submit" className='btn btn-success'>Enregistrer</button>
                    <Link className='btn btn-secondary' to="/">Retour</Link>
                </div>



            </form>
        </>
     );
}
 
export default AddProduct;