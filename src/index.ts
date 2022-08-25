import express, { Application, Request, Response } from "express";
import { productRouter } from "./products/products-routes";
import helmet, { HelmetOptions } from "helmet";
import firebaseAdmin from "firebase-admin";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import multer from "multer";

dotenv.config();

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY
  })
});

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string) || 1234;

const corsOptions: CorsOptions = {
    origin: ['http://localhost:4200', 'http://localhost:1234'],
    optionsSuccessStatus: 200
}
const helmetOptions: HelmetOptions = {
    hidePoweredBy: true
}
const upload = multer();

app.use(cors(corsOptions));
app.use(helmet(helmetOptions));
app.use(morgan("combined"));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Health is Good!'
    })
})

app.delete('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Health is Good!'
    })
})
app.use('/products', upload.single('image'), productRouter);

app.listen(PORT, 'localhost', () => {
    console.log(`server is listening on: http://localhost:${PORT}`);
})