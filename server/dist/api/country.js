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
exports.country_route = void 0;
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("../utils/logger"));
exports.country_route = express_1.default.Router();
// External API path
const rest_country_api = "https://restcountries.com/v3.1/name/";
/**
 * Get endpoint that gets the data from an external API and returns it
 * It takes a path parameter country.
 */
exports.country_route.get("/api/:country", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const country = req.params.country;
        const url = rest_country_api + country;
        logger_1.default.info(`Country API = ${url}`);
        const response = yield fetch(url);
        const data = yield response.json();
        res.send(data);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(500).send('Failed to fetch data');
    }
}));
