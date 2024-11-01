export interface Product {
    id: string // for v4 
    name: string
    description: string
    price: number
}

export interface ProductRequestBody {
    name: string
    description: string
    price: number
}