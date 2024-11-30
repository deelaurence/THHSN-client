import Button from "../Button"

const store=[
    {
        text:"We provide 100 percent human hair and hair products",
        image:"https://plus.unsplash.com/premium_photo-1682096515837-81ef4d728980?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2lnfGVufDB8fDB8fHww"
    },
    {
        text:"We are a trusted brand in the hair industry worldwide with positive customer reviews",
        image:"https://images.unsplash.com/photo-1606859282527-a6e888c92867?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdpZ3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
        text:"We offer exceptional customer service, flexible return and exchange policies with dedicated support team",
        image:"https://images.unsplash.com/photo-1556745753-b2904692b3cd?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3VzdG9tZXIlMjBzZXJ2aWNlfGVufDB8fDB8fHww"
    },
    {
        text:"Easy online shopping with convenient payment options",
        image:"https://media.istockphoto.com/id/1399726824/photo/mature-women-shopping-online-using-mobile-phone-at-home.webp?a=1&b=1&s=612x612&w=0&k=20&c=CGeoWA0o0R2Xb8P4C7rc-gDGeCBdL3kb-5sBLh7ANdk="
    },
]


const WhyUs = () => {
  return (
    <section >
        <h2 className="text-3xl pt-6 pb-4 font-queens text-center mx-auto" >Why Shop With Us?</h2>
        <div className="sm:flex sm:flex-row gap-4 sm:px-16">
        {store.map((item,index)=>{
            return(
                <div className="" key={index}>
                    <div className="h-64 sm:h-72 overflow-hidden">
                        <img className="object-cover h-full w-full" src={item.image} alt="" />
                    </div>
                    <p className="px-6  flex gap-2 items-center text-sm py-4"><span className="border  rounded-full h-2 w-2  flex items-center justify-center  border-primary p-2">{index+1}</span> {item.text}</p>
                </div>
            )
        })}
        </div>
        <Button size="large" extraClass="mx-6 my-4 font-thin" loading={false} label="shop now"/>
    </section>
  )
}

export default WhyUs