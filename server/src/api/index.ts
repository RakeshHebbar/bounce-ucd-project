import express from "express";
import {country_route} from "./country";

const app = express();

app.use(country_route);

module.exports = app;