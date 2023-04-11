"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const country_1 = require("../api/country");
const logger_1 = __importDefault(require("../utils/logger"));
// mock logger 
jest.mock("../utils/logger");
describe("country route", () => {
    // create express instance and use country route
    const app = (0, express_1.default)();
    app.use(country_1.country_route);
    describe("GET /api/:country", () => {
        // test 1
        it("should return data from external api", () => __awaiter(void 0, void 0, void 0, function* () {
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
            const response = yield (0, supertest_1.default)(app).get("/api/Ireland");
            // Expect the response to match the mocked response
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockResponse);
            // Expect the logger to have been called with the correct message
            expect(logger_1.default.info).toHaveBeenCalledWith(`Country API = https://restcountries.com/v3.1/name/Ireland`);
        }));
        // test 2
        it("should return API error when it fails", () => __awaiter(void 0, void 0, void 0, function* () {
            // mock failed response from external API
            global.fetch = jest.fn().mockRejectedValue(new Error("API error"));
            // Make a request to the endpoint
            const response = yield (0, supertest_1.default)(app).get("/api/India");
            // Expect the response to have a 500 status code and an error message
            expect(response.status).toBe(500);
            expect(response.text).toBe("Failed to fetch data");
            // Expect the logger to have been called with the error message
            expect(logger_1.default.error).toHaveBeenCalledWith(new Error("API error"));
        }));
    });
});
//# sourceMappingURL=country.test.js.map