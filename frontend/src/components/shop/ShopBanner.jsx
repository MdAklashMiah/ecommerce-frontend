
import React from 'react'
import Container from '../common/Container'

const ShopBanner = () => {
  return (
    <section className='pt-32'>
        <Container>
            <div className="w-full bg-[url('/images/bg/bg.png')] bg-cover bg-center py-24">
                <h1 className='text-center text-6xl text-secondary font-bold'>Welcome to Our Shop</h1>
                <h4 className='text-2xl text-center text-gray-700 font-medium mt-4'>Discover Your Style</h4>
            </div>
        </Container>
    </section>
  )
}

export default ShopBanner