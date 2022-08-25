import firebaseAdmin from "firebase-admin";

interface IProduct {
    id?: string,
    name: string | '' | undefined,
    type: string | '' | undefined,
    category: string | '' | undefined,
    // imageUrl: string | '' | undefined,
    status: boolean | '' | undefined,
}

export const fetchAllProducts = async () => {
    let products: any = [];
    try {
        const productsRef = firebaseAdmin.firestore().collection('products');
        const snapshot = await productsRef.get();
        if (snapshot.empty) {
            console.log('Products List is Empty!');
            return {
                data: [],
                status: 200
            };
        }
        snapshot.forEach(doc => {
            products.push({
                id: doc.id,
                ...doc.data()
            })
        });
        return {
            data: products,
            status: 200
        }
    } catch (error) {
        console.log(error);
        return {
            data: {
                message: "Something went Wrong!"
            },
            status: 500
        }
    }
}

export const addProduct = async (product: IProduct) => {
    try {
        const productsRef = await firebaseAdmin.firestore().collection('products').add(product);
        const newProcuctRef = firebaseAdmin.firestore().collection('products').doc(productsRef.id);
        const newProduct = await newProcuctRef.get();
        return {
            data: {
                id: newProcuctRef.id,
                ...newProduct.data()
            },
            status: 201
        }

    } catch (error) {
        console.log(error);
        return {
            data: {
                message: "Something went Wrong!"
            },
            status: 500
        }
    }

}