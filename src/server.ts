import express, { Request, Response, NextFunction } from "express";
import productRouter from "./routes/product.routes";
import dotenv from "dotenv";
dotenv.config()


//Set up express
const app = express()
app.use(express.json())


//Routes
app.get('/', (req: Request, res: Response) => {
    res.status(200).send('home page')
})

app.post('/', (req: Request, res: Response) => {
    res.status(200).send('sending test')
})

app.use('/products', productRouter)


//start server
const PORT: number = Number(process.env.PORT || 4500)
app.listen(PORT, () => {
    console.log(`server is running on port:${PORT}`)
})
