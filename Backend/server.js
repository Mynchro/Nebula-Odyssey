import express from "express";
import { connectToDB } from "./libs/db.js";
import userRoute from "./routes/userRoute.js";
import interfaceRoute from "./routes/interfaceRoute.js";
import adminRoute from "./routes/adminRoute.js";
import shipYardRoute from "./routes/shipYardRoute.js";
import { createGameworld } from "./seeder/createGameworld.js";
import cors from "cors";
import buildingsRoutes from "./routes/building.js";
import { startResourceCalculation } from "./middleware/scheduler.js";
import cookieParser from "cookie-parser";

const port = 3000;
const app = express();

//Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

await connectToDB();
app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/api", interfaceRoute);
app.use("/api", buildingsRoutes);
app.use("/shipyard", shipYardRoute);

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
