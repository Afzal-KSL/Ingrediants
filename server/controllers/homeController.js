// controllers/likeCommentController.js
import Ingredients from "../model/ingredientsModel.js";

// Toggle Like
const likeRecipe = async (req, res, next) => {
  const { id } = req.params; // recipe id
  const userId = req.user._id; // user from authorize middleware

  try {
    const recipe = await Ingredients.findById(id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    const index = recipe.likes.indexOf(userId);
    if (index === -1) {
      recipe.likes.push(userId); // Like
    } else {
        recipe.likes.splice(index, 1); // Unlike
    }

    await recipe.save();
    res.status(200).json({ success: true, likes: recipe.likes });
  }
  catch (error) {
    next(error);
  }
};

// Add Comment
const commentOnRecipe = async (req, res, next) => {
  const { id } = req.params; // recipe id
  const userId = req.user._id;
  const { text } = req.body;

  try {
    const recipe = await Ingredients.findById(id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    const newComment = {
      user: userId,
      text,
    };

    recipe.comments.push(newComment);
    await recipe.save();

    res.status(200).json({ success: true, comments: recipe.comments });
  }
  catch (error) {
    next(error);
  }
};

const readLike = async (req, res, next) => {
    try{
      const receipe = await Ingredients.findById(req.params.id);
      const count = receipe.likes.length;

      res.status(200).json({
          success: true,
          // data: receipe.likes,
          likes: count,
      });
  }
  catch(error){
      next(error);
  }
}

const readComment = async (req, res, next) => {
  try{
    // const receipe = await Ingredients.findById(req.params.id).populate('comments.user');
    const text = req.body;

    res.status(200).json({
        success: true,
        // data: receipe.comments,
        text,
    });
  }
  catch(error){
      next(error);
  }
}

export { likeRecipe, commentOnRecipe, readLike, readComment };