import React, { useEffect } from 'react'
import classes from "./ProductDetail.module.css";
import LayOut from '../../Componenet/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/endPoint';
import Loader from '../../Componenet/Loader/Loader'
import ProductCard from '../../Componenet/Producut/ProductCard';
import { useState } from 'react';

function ProductDetail() {
    const {productId} =  useParams();

    // console.log(productId)
    const [product , setProduct] = React.useState({});
    const [isloading , setIsLoading ]= useState(false);
    useEffect(() => {
        setIsLoading (true);
      axios
        .get(`${productUrl}/products/${productId}`)
        .then((res) => {
          setProduct(res.data);
          setIsLoading(false);
        })
        .catch((err) =>{ 
            console.log(err)
            setIsLoading(false)
        });
    }, []);
  return (
    <LayOut>
      {isloading ? <Loader /> : <ProductCard product={product} 
      flex = {true}
      renderDesc = {true}
      renderAdd={true}
      />}
     
    </LayOut>
  );
}

export default ProductDetail
