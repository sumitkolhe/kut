import express from "express";
import { config } from "../config";
const app = express();

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = config.PORT || 80;

app.listen(port, () => console.log(`Server started on port ${port}`));
