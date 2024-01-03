import React, { useEffect, useState } from 'react'
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { axiosInstance } from '../../../api/axiosInstance';
import { Link } from "react-router-dom";
import { SINGLE_FOOD } from '../../../RoutePaths/RoutePaths';

const ProductCard = (props) => {
  const [products,setProducts] = useState([])

   useEffect(()=>{
    if (props.products) {
      setProducts(props.products)
    }
    
   },[props.products])

  return (
    <>
    <div className="pt-20">
    <p className="ms-6 mb-3 font-bold">{props.title}</p>
    <div className="flex overflow-scroll scrollbar-hide">

    {
       products
       .filter((product) =>
         (props.selectedCategory === 'all' || product.category._id === props.selectedCategory) &&
         (product.name.toLowerCase().includes(props.searchQuery.toLowerCase()))
       )
       .map((product) =>{
        return (
        <Link key={product._id} to={`${SINGLE_FOOD.replace(':id', product._id)}`}>

          <Card className="min-w-fit drop-shadow-lg ms-2 mb-2 mt-2  ">
            <CardBody className="">
            <img
              src={product.imageUrl}
              alt="card-image"
              width={200}
            />
              <Typography variant="p" color="blue-gray" className="mb-2">
              {product.name}
              </Typography>
              <Typography>
                {product.cuisineType.name}
              </Typography>
            </CardBody>

          </Card>
        </Link>
        )
      })
    }
    

    </div>

    </div>
    </>
  )
}

export default ProductCard
