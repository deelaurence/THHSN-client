import BestSellersAndNewArrivals from './_BestSellersAndNewArrivals'
import image1 from "../../assets/images/BestSellers/1.png"
import image2 from "../../assets/images/BestSellers/2.png"
import image3 from "../../assets/images/BestSellers/3.png"
import image4 from "../../assets/images/BestSellers/4.png"
import image5 from "../../assets/images/BestSellers/5.png"
import image6 from "../../assets/images/BestSellers/6.png"

const store=[
    {
        text:"Curly wavy hair extension",
        image:image1,
        secondaryImage:image2,
        price:200,
        path:"/"

    },
    {
        text:"hair extension Wavy",
        image:image2,
        secondaryImage:image6,
        price:200,
        path:"/"
    },
    {
        text:"Straight hair extension",
        image:image3,
        secondaryImage:image2,
        price:200,
        path:"/"
    },
    {
        text:"Lace Frontal",
        image:image4,
        secondaryImage:image6,
        price:200,
        path:"/"
    },
    {
        text:"Bundles",
        image:image5,
        secondaryImage:image1,
        price:200,
        path:"/"
    }
]




const BestSellers = () => {
  return (
    <div className='my-32'>
        <BestSellersAndNewArrivals title='Best Sellers' subtitle='From wigs to bundles. to waves to curlies, shop our best sellers' store={store}/>
    </div>
  )
}

export default BestSellers