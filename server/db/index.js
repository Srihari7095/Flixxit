import mongoose from "mongoose";
import { config } from "dotenv";


config()
const connection = mongoose.connect(`mongodb+srv://srihari7095:7095496400@cluster0.cje7s4j.mongodb.net/?retryWrites=true&w=majority
`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export default connection;
