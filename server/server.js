import express from 'express';
import cookieParser from 'cookie-parser';
import { PORT } from './config/env.js';
import { connectToDatabase } from './database/mongodb.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import userRouter from './routes/userRouter.js';
import ingredientsRouter from './routes/ingredientsRouter.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/',(req, res) => {
    res.send('Recipe');
})

app.use('/auth', userRouter);

app.use('/home', ingredientsRouter);

app.use(errorMiddleware)

app.listen(PORT, async () => {
    console.log(`Server listening on port: http://localhost:${ PORT }.`);
    await connectToDatabase();
})