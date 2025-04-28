import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    text: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const ingredientsModel = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    ingredient: {
        type: String,
        required: true,
    },
    timetaken: {
        type: String,
    },
    cook: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    comments: [commentSchema],
},{ timestamps: true });

const Ingredients = mongoose.model("Ingredients", ingredientsModel);
export default Ingredients;