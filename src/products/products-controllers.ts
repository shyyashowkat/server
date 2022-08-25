import { Request, Response } from "express";
import { uploadFile } from "../utility/google-drive-upload";
import { fetchAllProducts, addProduct } from "./products-services"

interface IResponse{
    data: any,
    status: number
}

interface IProduct {
    id?: string,
    name: string,
    type: string,
    category: string,
    imageUrl: string,
    status: boolean,
}

export const getAllProducts = async (req: Request, res: Response) => {
    try{
        const response: IResponse = await fetchAllProducts();
        res.status(response.status).json(response.data);
    }catch(error: any){
        console.log(error);
        res.status(500).json({
            message: "Something went Wrong!"
        })
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product: IProduct = req.body;
        product['imageUrl'] = await uploadFile(req.file)
        const response = await addProduct(product)
        res.status(response.status).json(response.data);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            message: "Something went Wrong!"
        })
    }
}
