import express from "express";
import { connectToDB } from "./libs/db.js";
import userRoute from "./routes/userRoute.js";
import interfaceRoute from "./routes/interfaceRoute.js";
import adminRoute from "./routes/adminRoute.js";
import { createGameworld } from "./seeder/createGameworld.js";
import cors from "cors";
import buildingsRoutes from "./routes/building.js";
import { startResourceCalculation } from "./middleware/scheduler.js";

const port = 3000;
const app = express();

//Middleware
app.use(express.json());
app.use(cors());

await connectToDB();
app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/api", interfaceRoute);
app.use("/api", buildingsRoutes);

// seedResources();
createGameworld();
//startResourceCalculation();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// const startServer = async () => {
//   try {
//     await connectToDB();
//     app.use("/admin", adminRoute);
//     app.use("/user", userRoute);
//     app.use("/api", interfaceRoute);
//     // seedResources();
//     createGameworld();

//     app.listen(port, () => {
//       console.log(`Server is running on port ${port}`);
//       // calculateResources();
//     });
//   } catch (error) {
//     console.error("Fehler beim Starten des Servers:", error);
//   }
// };

// startServer();
