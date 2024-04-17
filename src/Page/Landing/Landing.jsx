import React from 'react'
import LayOut from '../../Componenet/LayOut/LayOut';
import CarouselEffect from "../../Componenet/Carousel/CarouselEffect";
import Category from "../../Componenet/Category/Category";
import Product from "../../Componenet/Producut/Product";

function Landing() {
  return (
    <LayOut>
      <CarouselEffect />
      <Category />
      <Product />
    </LayOut>
  );
}

export default Landing
