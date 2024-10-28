import mongoose from 'mongoose'
const mongoDB = async() => {
  try {    
    await mongoose.connect(process.env.MONGO_DB_URL)
    console.log('mongodb connected..');
    
  } catch (error) {
    console.log(error.message); 
    
  }
}

export default mongoDB
