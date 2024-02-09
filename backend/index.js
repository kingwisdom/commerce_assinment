import express from 'express';
import Boom from 'boom';
import cors from 'cors';
//import limiter from './rate-limiter';
import mongoose from 'mongoose';
import routes from './routes/index.js';


const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(routes);

app.use((req, res, next) => {
    return next(Boom.notFound('This route does not exist.'));
});




mongoose.set('strictQuery', false)
const connectDb = async () => {
    try {
        await mongoose.connect("mongodb+srv://commerce:@@Commerce@@123!@cluster0.grv5otc.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected to mongodb')
    } catch (error) {
        console.log('Not Connected to database', error)
    }
}


app.use((err, req, res, next) => {
    console.log(err);
    if (err) {
        if (err.output) {
            return res.status(err.output.statusCode || 500).json(err.output.payload);
        }
        return res.status(500).json(err);
    }
});

connectDb()

// app.listen(4000, () => console.log('Server is up!'));
app.listen()