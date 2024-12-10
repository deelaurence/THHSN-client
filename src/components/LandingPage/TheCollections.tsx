import Button from "../Button"
import image1 from "../../assets/images/Collections/1.png"
import image2 from "../../assets/images/Collections/2.png"
import image3 from "../../assets/images/Collections/3.png"
import image4 from "../../assets/images/Collections/4.png"
import image5 from "../../assets/images/Collections/5.png"
import image6 from "../../assets/images/Collections/6.png"

const store=[
    {
        text:"Curly",
        image:image1
    },
    {
        text:"Wavy",
        image:image2
    },
    {
        text:"Straight",
        image:image3
    },
    {
        text:"Lace Frontal",
        image:image4
    },
    {
        text:"Bundles",
        image:image5
    },
    {
        text:"Hair Care Products",
        image:image6
    },
]


const TheCollections = () => {
  return (
    <section className="">
        <h2 className="text-3xl mt-16 mb-6 adelia text-center mx-auto " >The collections</h2>
        <div className="flex flex-row gap-4 sm:px-16 overflow-scroll">
        {store.map((item,index)=>{
            return(
                <div className="min-w-64 sm:min-w-72" key={index}>
                    <div className="h-64 sm:h-72 ">
                        <img className="object-cover h-full w-full px-6" src={item.image} alt="" />
                    </div>
                    <p className="px-6  flex gap-2 items-center text-sm py-4">{item.text}</p>
                </div>
            )
        })}
        </div>
        <Button size="large" extraClass="mx-6 my-4 font-thin" loading={false} label="shop now"/>
    </section>
  )
}

export default TheCollections