import mongoose from 'mongoose';


mongoose.set('strictQuery', false)
mongoose
  .connect('mongodb+srv://commerce:@@Commerce@@123!@cluster0.grv5otc.mongodb.net/?retryWrites=true&w=majority', {
    // .connect('mongodb+srv://afeexclusive:iPjfkN1Paqn4Y4Eu@sandbox.zlbw3z6.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => console.log('MongoDB: Connectted'))
  .catch((err) => console.log("error", err.message));



// const connectDb = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     })
//     console.log('Connected to mongodb')
//   } catch (error) {
//     console.log('Not Connected to database', error)
//   }
// }