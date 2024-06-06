export interface product {
    id: number,
    productsTitle: string,
    productsDetails: string,
    productDiscount: number,
    productPrice: number,
    productImage: string,
    productquantity?: number,
    productDateChoosed?: string,
}

export interface productForPayment {
    "name": string,
    "description": string,
    "price": number,
    "quantity": number
}