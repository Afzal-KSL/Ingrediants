import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if(!DB_URI){
    throw new Error(`Please define the DB_URI in .env.${NODE_ENV}.local`)
}

export let conn = null;

export const connectToDatabase = async () => {
    try{
        await mongoose.connect(DB_URI)
        conn = await mongoose.connection;
        console.log(`Connected to Database in ${ NODE_ENV } mode`)
    }
    catch(error){
        console.log("Error connecting to database:",error)
        process.exit(1)
    }
}