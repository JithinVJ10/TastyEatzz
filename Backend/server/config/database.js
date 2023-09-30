import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        const con = await mongoose.connect(process.env.MONGODB_URL)

        console.log("MongoDB Connected");
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}

export default connectDB