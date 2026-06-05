import mongoose from "mongoose";

async function connectDB(url) {
    return await mongoose.connect(url).then(() => console.log("Connction done")).catch(() => console.log("an error occured"));
    
}

export default connectDB;