import express from "express";
import request from "supertest";
import { country_route } from "../api/country";
import Logger from "../utils/logger";

// mock logger 
jest.mock("../utils/logger");

describe("country route", () => {

  // create express instance and use country route
  const app = express();
  app.use(country_route);

  describe("GET /api/:country", () => {

    // test 1
    it("should return data from external api", async () => {
      // mock response
      const mockResponse = [
        {
          name: {
            common: "Ireland",
            official: "Republic of Ireland",
          },
        },
      ];

      // mock global fetch
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      // make request to the endpoint
      const response = await request(app).get("/api/Ireland");

      // Expect the response to match the mocked response
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);

      // Expect the logger to have been called with the correct message
      expect(Logger.info).toHaveBeenCalledWith(
        `Country API = https://restcountries.com/v3.1/name/Ireland`
      );
    });

    // test 2
    it("should return API error when it fails", async () => {
      // mock failed response from external API
      global.fetch = jest.fn().mockRejectedValue(new Error("API error"));

      // Make a request to the endpoint
      const response = await request(app).get("/api/India");

      // Expect the response to have a 500 status code and an error message
      expect(response.status).toBe(500);
      expect(response.text).toBe("Failed to fetch data");

      // Expect the logger to have been called with the error message
      expect(Logger.error).toHaveBeenCalledWith(new Error("API error"));
    });
  });
});
