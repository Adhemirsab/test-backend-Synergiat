import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const BASE_URI: string = process.env.BASE_URI as string;
    await mongoose.connect(BASE_URI);
    console.log("***CONEXION CORRECTA***");
  } catch (error) {
    console.log(error);

    console.log("***ERROR DE CONEXION***");
  }
};

export default dbConnect;
