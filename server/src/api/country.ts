import express, {Request, Response } from "express";
import logger from "../utils/logger";

export const country_route = express.Router();

// External API path
const rest_country_api = "https://restcountries.com/v3.1/name/";

/**
 * Get endpoint that gets the data from an external API and returns it
 * It takes a path parameter country. 
 */
country_route.get("/api/:country", async (req: Request, res: Response) => {
    try {
        const country = req.params.country;
        const url = rest_country_api + country;
        logger.info(`Country API = ${url}`);
        const response = await fetch(url);
        const data = await response.json();
        res.send(data);
      } catch (error) {
        logger.error(error);
        res.status(500).send('Failed to fetch data');
      }
});

module.exports = country_route;