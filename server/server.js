import { connectedToDb } from "./config/db.js";
import { app } from "./app.js";

app.listen(process.env.PORT , async()=>{

    await connectedToDb();
    console.log(`Server is running on ${process.env.PORT}`)
})

