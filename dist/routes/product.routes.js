"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const productRouter = (0, express_1.Router)();
// In-memory Database  // book-test
let products = [
    {
        id: "abc", // string
        name: "book",
        description: "a book",
        price: 24.00,
    }
];
// - `/products` : GET request for all products
productRouter.get('/', (req, res) => {
    res.status(200).json(products);
});
// - `/products` : POST request to add one product
productRouter.post('/', (req, res) => {
    const newProduct = {
        id: (0, uuid_1.v4)(),
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    };
    products = [...products, newProduct];
    res.status(200).send('Product add successfully.');
});
// - `/products/:id` : GET request to fetch one product based on id
productRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const foundProduct = products.find(product => product.id === id);
    if (foundProduct) {
        res.status(200).json(foundProduct);
    }
    else {
        res.status(404).send("product notfound");
    }
});
// - `/products/:id` : PUT request to update one product based on id
productRouter.put('/:id', (req, res) => {
    var _a, _b, _c;
    const { id } = req.params;
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
        const UpdateProduct = Object.assign(Object.assign({}, products[productIndex]), { name: (_a = req.body.name) !== null && _a !== void 0 ? _a : products[productIndex].name, description: (_b = req.body.description) !== null && _b !== void 0 ? _b : products[productIndex].description, price: (_c = req.body.price) !== null && _c !== void 0 ? _c : products[productIndex].price });
        products[productIndex] = UpdateProduct;
        res.status(201).json(UpdateProduct);
    }
    else {
        res.status(404).send("Product item not found.");
    }
});
// - `/products/:id` : DELETE request to delete one product based on id
productRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    const foundProduct = products.find(product => product.id === id);
    if (foundProduct) {
        products = products.filter(product => product.id !== id);
        res.status(200).send("product deleted").json(products);
    }
    else {
        res.status(404).send("product notfound");
    }
});
exports.default = productRouter;
