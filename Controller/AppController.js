import product from "../models/Products.js";
import User from "../models/Users.js";
import bcrypt from "bcryptjs";

export const SignUp = async (req, res) =>{
const {name, email, password} = req.body;

try{
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            message: "User already exist with this email."
        });
    }
    const salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(password, salt);
    console.log(hashPassword)
    const newUser =  new User();
    newUser.name = name;
    newUser.email = email;
    newUser.password = hashPassword;
    await newUser.save();

    res.status(201).json({
        message: "User created Successfully"
    });
} catch (error) {
    res.status(500).json({
        message: "error registering new User",
        error: error.message
    })
}
}


export const Login = async (req, res) =>{
    const {email, password} = req.body;
    try{
        const isUser = await User.findOne({email});
        if(!isUser){
            return res.status(400).json({
                message: "No record found please Register."
            });
        }
        const isMatch = await bcrypt.compare(password, isUser.password);
        console.log(isMatch,"match")
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }
    
        res.status(201).json({
            message: "Login Successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "error login",
            error: error.message
        })
    }
    }


    export const addProduct = async (req,res) =>{
        const {name, price, description, imgUrl} = req.body;
        try{
            const newProduct = new product;
            newProduct.name = name;
            newProduct.price = price;
            newProduct.description = description;
            newProduct.imgUrl = imgUrl;
    
           let added =  await newProduct.save();
    
           if(added){
            res.status(200).json({
                message: "product added successfully",
                product: added
            })
           }
        } catch (error) {
            res.status(400).json({
                message: "Failed to add product"
            })
        }

    }

    export const update = async (req,res) =>{
        const { id } = req.params;
        console.log(id)
        const { name, price, description } = req.body;
        const updates = {};
    
      
        if (name !== undefined) updates.name = name;
        if (price !== undefined) updates.price = price;
        if (description !== undefined) updates.description = description;
    
        try {
           
            const updatedProduct = await product.findByIdAndUpdate(id, { $set: updates }, { new: true });
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found.' });
            }
    
            res.json({
                message: "Product updated successfully!",
                product: updatedProduct
            });
        } catch (error) {
            res.status(500).json({ message: "Error updating product.", error: error.message });
        }
    
    }


    export const deleteProduct = async (req, res) =>{
        try{

            const id = req.params;
            const isProduct = await product.findByIdAndDelete(id);
    
            if(!isProduct){
                res.status(404).json({
                    message: "No such product exist"
                });
            }
            res.send({
                message: 'Product deleted successfully',
                product: deletedProduct
            });
        } catch(error) {
            res.status(500).json({ message: 'Error deleting product', error: error.message });
        }

    }

    
