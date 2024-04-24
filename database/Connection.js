import { MongoMemoryServer } from "mongodb-memory-server-global";
import mongoose from "mongoose";

export default async function connect(){
    const MongoServer = await MongoMemoryServer.create();
    const mongoUri = MongoServer.getUri();

    await mongoose.connect(mongoUri);
    console.log(`MongoDB successfully connected with ${mongoUri}`);
}