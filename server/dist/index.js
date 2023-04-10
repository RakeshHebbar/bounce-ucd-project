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
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./utils/logger"));
const country_1 = require("./api/country");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// routes
app.use(country_1.country_route);
// server port
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
    logger_1.default.info(`App listening on port http://localhost:${port}`);
});
// handled signals for shutdown
const signals = ["SIGTERM", "SIGINT"];
signals.forEach(function (signal) {
    gracefulShutDown(signal);
});
/**
 * This function gracefully shuts down and closes the connection
 * @param signal signal passed to shutdown the server
 */
function gracefulShutDown(signal) {
    process.on(signal, () => __awaiter(this, void 0, void 0, function* () {
        server.close();
        logger_1.default.info("My work here is done...");
        process.exit(0);
    }));
}
module.exports = app;
//# sourceMappingURL=index.js.map