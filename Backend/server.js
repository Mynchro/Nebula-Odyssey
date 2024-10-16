import express from "express";
import { connectToDB } from "./libs/db.js";
import userRoute from "./routes/userRoute.js";
import interfaceRoute from "./routes/interfaceRoute.js";
import adminRoute from "./routes/adminRoute.js";
import { calculateResources } from "./middleware/calculateResources.js";

const port = 3000;
const app = express();

//Middleware
app.use(express.json());

const startServer = async () => {
    try {
        await connectToDB();
        app.use("/admin", adminRoute);
        app.use("/user", userRoute);
        app.use("/api", interfaceRoute);

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            calculateResources();
        });
    } catch (error) {
        console.error("Fehler beim Starten des Servers:", error);
    }
};

startServer();
