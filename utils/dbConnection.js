import mongoose from 'mongoose';


const connectDb = async () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log(`DB CONNECTED SUCCESSFULLY`.rainbow)
        })
        .catch((error) => {
            console.error(error);
            console.log(`ERROR IN CONNECTING DB:-${error.message}`.red)
            process.exit(1);
        })
}


export default connectDb