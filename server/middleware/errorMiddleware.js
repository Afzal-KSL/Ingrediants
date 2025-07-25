const errorMiddleware = (err,req,res,next) => {
    try{
        let error = { ...err}
        error.message = err.message
        console.log(err)

        // Mongoose Bad ObjectId
        if(err.name === 'CastError'){
            const message = 'Resource Not Found'
            error = new Error(message)
            error.statusCode = 404
        }

        // Mongoose Duplication Key
        if(err.code === 11000){
            const message = 'Duplicate Field Value Entered'
            error = new Error(message)
            error.statusCode = 400
        }

        // Mongoose Validation Error
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(val => val.message)
            error = new Error(message.join(', '))
            error.statusCode = 400
        }

        res.status(error.statusCode || 500).json({success: false, error: error.message || 'Server Error'})
    }
    catch(error){
        next(error)
    }
}

export default errorMiddleware