import React from 'react'
import Slideshow from '../ImageSlides2'
const images=[
    {
        src:"https://plus.unsplash.com/premium_photo-1682096515837-81ef4d728980?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2lnfGVufDB8fDB8fHww",
        label:"WIGS",
        ctaLabel:"Shop now",
        ctaLink:"/"
    },
    {
        src:"https://images.unsplash.com/photo-1712641966810-611ff1503c6d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGhhaXIlMjB0b29sc3xlbnwwfHwwfHx8MA%3D%3D",
        label:"Hair Tools",
        ctaLabel:"Shop now",
        ctaLink:"/"
    },
    {
        src:"https://images.unsplash.com/photo-1712112797786-d43620cac1fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGFpciUyMHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
        label:"Hair Care Product",
        ctaLabel:"Shop now",
        extraClass:"bg-[rgba(0,0,0,.1)]",
        ctaLink:"/"
    },
]


const ShopByCategory = () => {
  return (
    <section className='my-8'>
        <h1 className='font-queens text-3xl text-center my-10'>Shop By Category</h1>
        <div className='px-6'>
            <Slideshow images={images}/>
        </div>
    </section>
  )
}

export default ShopByCategory