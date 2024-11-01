"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//Set up express
const app = (0, express_1.default)();
app.use(express_1.default.json());
//Routes
app.get('/', (req, res) => {
    res.status(200).send('home page');
});
app.post('/', (req, res) => {
    res.status(200).send('sending test');
});
app.use('/products', product_routes_1.default);
//start server
const PORT = Number(process.env.PORT || 4500);
app.listen(PORT, () => {
    console.log(`server is running on port:${PORT}`);
});
