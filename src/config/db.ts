import colors from 'colors'
import mongoose from 'mongoose';  

export const connectDB = async () => {
  try {
    const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/express-mongo';
    const {connection} = await mongoose.connect(url);
    const connectedURL = `Mongo DB conectado a: ${connection.host}:${connection.port}/${connection.name}`
    console.log(colors.bgCyan.black.bold(connectedURL))

    console.log(colors.bgGreen.white.bold('mongo db conectado'))
  } catch (error) {
    console.log(colors.bgRed.black.bold(`Error while connecting to the DB: ${error.message}`))
  }
}