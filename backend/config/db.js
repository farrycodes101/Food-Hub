import mongoose from "mongoose";
export const connectDB = async () => {
    await mongoose.connect(`mongodb+srv://syntonym121:tMNwBVsJmQFarLka@foodhub.x1qur.mongodb.net/Food-Hub`)
    .then(()=> console.log('Database Connected Successfully!'));
}

