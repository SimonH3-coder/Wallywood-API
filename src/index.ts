import express from "express";
import dotenv from "dotenv";
import { cartlinesRoutes } from "./routes/cartlinesRoutes.js";
import { genresRoutes } from "./routes/genresRoutes.js";
import { posterRoutes } from "./routes/posterRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import { userRatingsRoutes } from "./routes/userRatingsRoutes.js";
import { loginRoutes } from "./routes/loginRoutes.js";
import { authRoutes } from "./routes/authRoutes.js";

// Indlæs miljøvirabler fra .env (uden at vise logs)
dotenv.config({ quiet: true });

// Brug port fra .env eller falde tilbage til 3000
const Port = process.env.PORT || 3000;

// Opret express app
const app = express();

// Tilføjer controller som middelware

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
app.use("/api/cartlines", cartlinesRoutes);
app.use("/api/genres", genresRoutes);
app.use("/api/posters", posterRoutes);
app.use("/api/userRatings", userRatingsRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/auth", authRoutes);

//Start serveren
app.listen(Port, () => {
  console.log(`Server running on http://localhost:${Port} `);
});
