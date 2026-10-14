import mongoose from "mongoose";
import seedPortfolio from "./seedPortfolio.js";
import seedAssets from "./seedAssets.js";

const isAtlasIpWhitelistError = (error: unknown) => {
  if (!(error instanceof Error)) {
    return false;
  }

  return /IP.*whitelist|not whitelisted|Could not connect to any servers in your MongoDB Atlas cluster/i.test(
    error.message,
  );
};

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI?.trim();

    if (!mongoUri) {
      throw new Error(
        "MONGODB_URI is not configured. Add a MongoDB Atlas or local MongoDB connection string to server/.env.",
      );
    }

    await mongoose.connect(mongoUri, {
      family: 4,
      serverSelectionTimeoutMS: 15000,
    });

    console.log("MongoDB Connected");
    void seedAssets().catch((error: unknown) => {
      const message = error instanceof Error ? error.message : "Unknown asset seed error";
      console.error("Portfolio media synchronization failed:", message);
    });
    void seedPortfolio().catch((error: unknown) => {
      const message = error instanceof Error ? error.message : "Unknown portfolio seed error";
      console.error("Portfolio data synchronization failed:", message);
    });
  } catch (error) {
    const message = isAtlasIpWhitelistError(error)
      ? "MongoDB Atlas rejected the current IP address. Add this machine's public IP to Atlas Network Access, or switch to a local MongoDB instance and update MONGODB_URI."
      : error instanceof Error
        ? error.message
        : "Unknown MongoDB connection error";

    console.error("MongoDB connection failed:", message);
    throw new Error(message);
  }
};

export default connectDB;