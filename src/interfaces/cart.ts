import { IProduct } from "./productInterface"

export interface Cart{
    product:IProduct,
    variant:{type:string,name:string}
    price:number,
    quantity:number
}