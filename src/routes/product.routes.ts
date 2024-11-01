import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Product, ProductRequestBody } from "../types/product";
const productRouter = Router()


// In-memory Database  // book-test
let products: Product[] = [
    {
        id: "abc", // string
        name: "book",
        description: "a book",
        price: 24.00,
    }
]

// - `/products` : GET request for all products
productRouter.get('/', (req: Request, res: Response) => {
    res.status(200).json(products)
})

// - `/products` : POST request to add one product
productRouter.post('/', (req: Request<{}, {}, ProductRequestBody>, res: Response) => {
    const newProduct: Product = {
        id: uuidv4(),
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    }
    products = [...products, newProduct]
    res.status(200).send('Product add successfully.')
})


// - `/products/:id` : GET request to fetch one product based on id
productRouter.get('/:id', (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params
    const foundProduct = products.find(product => product.id === id)
    if (foundProduct) {
        res.status(200).json(foundProduct)
    } else {
        res.status(404).send("product notfound")
    }
})

// - `/products/:id` : PUT request to update one product based on id
productRouter.put('/:id', (req: Request<{ id: string }, {}, ProductRequestBody>, res: Response) => {
    const { id } = req.params
    const productIndex = products.findIndex(product => product.id === id)
    if (productIndex !== - 1) {
        const UpdateProduct = {
            ...products[productIndex],
            name: req.body.name ?? products[productIndex].name,
            description: req.body.description ?? products[productIndex].description,
            price: req.body.price ?? products[productIndex].price
        }
        products[productIndex] = UpdateProduct
        res.status(201).json(UpdateProduct)
    } else {
        res.status(404).send("Product item not found.")
    }
})

// - `/products/:id` : DELETE request to delete one product based on id
productRouter.delete('/:id', (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params
    const foundProduct = products.find(product => product.id === id)
    if (foundProduct) {
        products = products.filter(product => product.id !== id)
        res.status(200).send("product deleted").json(products)
    } else {
        res.status(404).send("product notfound")
    }
})



export default productRouter;