import express from "express";
import dotenv from "dotenv";
import { userRoutes } from "./routes/userRoutes.js";

// Indlæs miljøvirabler fra .env (uden at vise logs)
dotenv.config({ quiet: true });

// Brug port fra .env eller falde tilbage til 3000
const Port = process.env.PORT || 3000;

// Opret express app
const app = express();

// Tilføjer controller som middelware
app.use("api/users", userRoutes);

// Starter serveren
app.listen(3000, () => {
  console.log("Serveren kører på adressen http://localhost:3000");
});

// Gør det muligt at modtage JSON i requests
app.use(express.json());

// Gør det muligt at modatage form-data (fx fra formularer)
app.use(express.urlencoded({ extended: true }));

// Brug vores user-routes under /api/users
app.use("/api/users", userRoutes);

//Start serveren
app.listen(Port, () => {
  console.log(`Server running on http://localhost:${Port} `);
});
