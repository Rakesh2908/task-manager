// database/dbConnection.js
import mongoose from 'mongoose';

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_TASK_MANAGEMENT",
    })
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.error(`Some error occurred while connecting to database! : ${err.message}`);
    });
};
