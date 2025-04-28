import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import Ingredients from "../model/ingredientsModel.js";
import { conn } from "../database/mongodb.js"
import multer from "multer";
import { Readable } from "stream";

const storage = multer.memoryStorage();
export const uploads = multer({storage});

// let bucket;
// if(conn){
//     bucket = new GridFSBucket(conn.db,{
//         bucketName: "uploads",
//     });
// };

const uploadReceipe = async (req, res, next) => {
    try{
        const file = req.file;
        const {name, ingredient, timetaken, cook} = req.body;

        if(!file){
            return res.status(404).json({
                success: false,
                message: 'No File Uploaded',
            });
        }

        const bucket = new GridFSBucket(conn.db,{
            bucketName: "uploads",
        });

        const readableStream = new Readable();
        readableStream.push(file.buffer);
        readableStream.push(null);

        const uploadStream = bucket.openUploadStream(file.originalname,{
            contentType: file.mimetype,
        })

        readableStream.pipe(uploadStream);

        if (!req.user || !req.user._id) {
            return res.status(401).json({ success: false, message: 'User not authorized' });
        }
        

        uploadStream.on('finish', async () => {
            const upload = await Ingredients.create([
                {image: uploadStream.id, name, ingredient, timetaken, cook, user:req.user._id}
            ]);

            res.status(200).json({
                success: true,
                message: 'Uploaded successfully',
                data: upload,
            })
        });

        uploadStream.on('error', async(err) => {
            next(err);
        });
    }
    catch(error){
        next(error);
    }
}

const getReceipe = async (req, res, next) => {
    try{
        const receive = await Ingredients.find();

        res.status(200).json({
            success: true,
            data: receive,
        })
    }
    catch(error){
        next(error);
    }
}

const search = async (req, res, next) => {
    try{
        const {name} = req.query;

        const search = await Ingredients.find({name: { $regex: name, $options: 'i' }});

        res.status(200).json({
            success: true,
            data: search,
        })
    }
    catch(error){
        next(error);
    }
}

export { uploadReceipe, getReceipe, search};