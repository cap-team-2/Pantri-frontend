// ProductById.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
const API = import.meta.env.VITE_APP_API_URL;

export default function ProductById() {
    const [product, setProduct] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`${API}/products/${id}`)
            .then((res) => {
                console.log(res.data);
                setProduct(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])


    return (
        <div>
            
        </div>
    )
}