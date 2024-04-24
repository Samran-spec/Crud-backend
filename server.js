import  express  from "express";
import cors from 'cors'

import connect from "./database/Connection.js";
import { SignUp,Login, addProduct, update, deleteProduct } from "./Controller/AppController.js";
export const app = express();

app.use(express.json());
app.use(cors());

const port = 3000;

app.post('/signin', SignUp);
app.post('/login', Login);
app.post('/add-product', addProduct)
app.put('/update/:id',update)
app.delete('/delete/:id', deleteProduct)
connect().then(() =>{
    app.listen(port, ()=>{
        console.log(`Connected to server on port ${port}`);
    })
}).catch((err)=>{
    console.log("Failed")
})
