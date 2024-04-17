import React, { useEffect } from 'react'
import LayOut from '../../Componenet/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ProductCard from '../../Componenet/Producut/ProductCard'
import {productUrl} from '../../Api/endPoint'
import classes from './Results.module.css'
import Loader from '../../Componenet/Loader/Loader'
import { useState } from 'react'
function Results() {
    const [result , setResult] =React.useState([])
     const [isloading, setIsLoading] = useState(false);
    const {categoryName} = useParams()
    useEffect(()=>{
        setIsLoading(true)
         axios.get(`${productUrl}/products/category/${categoryName}`)
          .then((res)=>{
            setResult(res.data)
            setIsLoading(false)
           
          })
          .catch((err) => {
            console.log(err)
            setIsLoading(false)
        });
},[]);

   
    
   
  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>category/{categoryName}</p>
        <hr />
        {isloading ? (
          <Loader />
        ) : (
          <div className={classes.products_container}>
            {result?.map((product) => (
              <ProductCard
               key={product.id}
               renderAdd= {true}
               renderDesc={false}
               product={product} />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results
