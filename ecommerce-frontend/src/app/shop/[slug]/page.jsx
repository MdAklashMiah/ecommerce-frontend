"use client"

import ProductDetails from '@/components/products/ProductDetails'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
  let [product, setProduct] = useState({})
  let {slug} = useParams()

  useEffect(()=>{
    axios.get(`${process.env.NEXT_PUBLIC_API}/product/product/${slug}`).then((res)=>{
      setProduct(res.data.data)
    }).catch((err)=>{
      console.log(err)
    })
  },[])

console.log(product)


  return (
    <ProductDetails product={product}/>
  )
}

export default page