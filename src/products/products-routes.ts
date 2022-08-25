import { Router } from "express";
import { getAllProducts, createProduct } from "./products-controllers"

export const productRouter: Router = Router();

productRouter.post('/', createProduct);
productRouter.get('/', getAllProducts);
