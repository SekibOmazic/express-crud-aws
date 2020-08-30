import express from "express";
import bodyParser from "body-parser";

import usersRoutes from "./routes/users.js";

const app = express();
const PORT = 4000;

app.use(bodyParser.json());

app.use("/user", usersRoutes);
app.get("/", (_req, res) => res.send("Welcome to the Users API!"));
app.all("*", (_req, res) => res.send("Ooops, no such route"));

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
