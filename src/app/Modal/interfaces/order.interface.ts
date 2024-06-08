export interface order{
    id:number,
    products:orderProducts[]
    total:number,
}

export interface orderProducts{
    "name": string,
    "description": string,
    "price": number,
    "quantity": number
}