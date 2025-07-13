import mongoose from 'mongoose'
 
export const connectedToDb = async()=>{
    try {
        const res = await mongoose.connect(process.env.MONOGO_URL)
        if(res){
            console.log("connected To mongoDB")
        }
    } catch (error) {
     console.log(error)   
    }
}