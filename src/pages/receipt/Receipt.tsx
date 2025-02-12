import { useSearchParams } from "react-router-dom";
import PriceToast from "../../components/PriceToast";
import { Link } from "react-router-dom";
import { sdk } from "../../utils/sdk";
const Receipt = () => {
  const [searchParams] = useSearchParams();
  sdk.clearCart()
  const orderNumber = searchParams.get("reference") || "1527369";
  const description = JSON.parse(searchParams.get("description")||"{}");
//   const name = searchParams.get("name") || "Customer";
  const items = description.cart

  return (
    <div className="flex flex-col text-primary items-center justify-center min-h-screen  p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-4xl  mb-12 font-queens">Thanks for shopping with us!</h1>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Order Confirmation</h2>
        <span className="text-gray-500 text-sm">{new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })}</span>
        </div>

        {/* Order Number */}
        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
          <span className="text-gray-600 text-sm">Order number</span>
          {/* <span className="bg-white border border-gray-300 px-3 py-1 rounded text-gray-900 text-sm">{orderNumber}</span> */}
          <div className="bg-purple-500 text-white px-4 py-1 rounded-lg text-center text-sm hover:bg-purple-600">{orderNumber}</div>
        </div>

        {/* Items */}
        <div className="mt-4 space-y-3">
          {items.map((item:any, index:number) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg">
              <h3 className="font-medium ">{item.name}</h3>
              <p className="text-gray-500 text-xs">{item.variant.type}/{item.variant.name}</p>
              <div className="flex justify-between mt-1">
                <div className="text-gray-700 text-sm opacity-50  flex items-end"><PriceToast className=" " price={item.price}/>&nbsp;x{item.quantity}</div>
                <PriceToast className="text-gray-900 font-medium" price={item.price*item.quantity} />
              </div>
            </div>
          ))}
        </div>

        {/* Subtotal and Delivery */}
        <div className="mt-4 bg-gray-100 p-3 rounded-lg">
          <div className="flex justify-between">
            <span className="text-gray-700">Subtotal</span>
            <PriceToast className="text-gray-900 font-medium" price={description.cartTotal} />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-700">Delivery</span>
            <PriceToast className="text-gray-900 font-medium" price={description.shippingFees} />
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mt-4 text-lg font-bold">
          <span>Total</span>
          <PriceToast className="" price={description.grandTotal} />
        </div>


        <p className="text-xs mt-16">Our dedicated support team will reach out to you shortly to provide comprehensive details regarding the delivery process, including timelines, logistics, and any additional requirements necessary to ensure a seamless experience.</p>
        <Link to={sdk.shopRoute} className="mt-4 underline block">Continue shopping</Link>
        {/* Download Receipt Button */}
        {/* <button
          className="mt-4 flex items-center justify-center w-full bg-gray-200 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-300"
          onClick={() => window.print()}
        >
          ⬇ Download receipt
        </button> */}
      </div>
    </div>
  );
};

export default Receipt;
