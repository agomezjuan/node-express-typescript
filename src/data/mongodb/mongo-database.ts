import mongoose from "mongoose";

interface Options {
  mongoURI: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: Options) {
    const { mongoURI, dbName } = options;

    try {
      await mongoose.connect(mongoURI, {
        dbName,
      });
      console.log(`Connected to ${dbName} database`);

      return mongoose.connection;
    } catch (error) {
      console.error(`Error connecting to database: ${error}`);
      throw error;
    }
  }
}
