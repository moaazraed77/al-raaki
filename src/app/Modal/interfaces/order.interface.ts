export interface order{
    id:number,
    products:orderProducts[]
    total:number,
    address:any
}

export interface orderProducts{
    "name": string,
    "description": string,
    "price": number,
    "quantity": number
}


export interface address{
    name: string,
    phone: string,
    country: string,
    area: string,
    block: string,
    gadah: string,
    street: string,
    home: string,
}