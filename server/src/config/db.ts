import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("URI =", process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI as string, {
  family: 4
});

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;