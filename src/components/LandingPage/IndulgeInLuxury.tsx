import { Link } from 'react-router-dom'
import image from '../../assets/images/Collections/5.png'

const IndulgeInLuxury = () => {
  return (
    <div className="mx-6 sm:px-24 flex   flex-col sm:flex-row sm:gap-12  items-start sm:items-center  justify-start">
        <div className="sm:flex sm:flex-col gap-6 justify-start ">
            <h2 className="text-3xl sm:text-4xl mt-16 mb-6 font-queens  uppercase">indulge in luxury</h2>
            <p className="sm:text-2xl">Experience the ultimate in hair care with our premium collection. From silky extensions to nourishing treatments, every product is crafted to elevate your look. Embrace luxury, confidence, and style—because you deserve nothing less than perfection for your hair.</p>
            <Link className='bg-primary w-64 mt-6 block text-secondary text-center py-2 px-6' to="/">
                SHOP NOW
            </Link>
        </div>
        <div className="sm:w-[80rem] sm:h-[30rem] overflow-hidden">
            <img  className="mt-14" src={image} alt="" />
        </div>
    </div>
  )
}

export default IndulgeInLuxury