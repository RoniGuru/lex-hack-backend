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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db/db");
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const wordBankRoutes_1 = __importDefault(require("./routes/wordBankRoutes"));
const publicRoutes_1 = __importDefault(require("./routes/publicRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const environment = process.env.NODE_ENV || 'development';
dotenv_1.default.config({
    path: environment === 'production' ? '.env.production' : '.env.development',
});
const app = (0, express_1.default)();
const port = process.env.PORT || 3300;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use('/', publicRoutes_1.default);
app.use('/v1/users', userRoutes_1.default);
app.use('/v1/wordBanks', wordBankRoutes_1.default);
function initializeDB() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Connected!');
        // Get the environment
        const environment = process.env.NODE_ENV || 'development';
        // Helper function to check environment
        const isDevelopment = () => environment === 'development';
        // Usage example
        if (isDevelopment()) {
            console.log('Running in development mode');
            yield db_1.mysqlDB.query('DROP DATABASE IF EXISTS word_test');
            yield db_1.mysqlDB.query('USE word_test');
        }
        else {
            console.log('Running in production mode');
            yield db_1.mysqlDB.query('CREATE DATABASE IF NOT EXISTS lex_prod');
            yield db_1.mysqlDB.query('USE lex_prod');
        }
        yield db_1.mysqlDB.query('CREATE TABLE IF NOT EXISTS users (id INT  PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL,email VARCHAR(255) , refresh_token VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP )');
        yield db_1.mysqlDB.query('CREATE TABLE IF NOT EXISTS wordBanks (id INT  PRIMARY KEY AUTO_INCREMENT, user_id INT NOT NULL, name VARCHAR(100) NOT NULL, words JSON ,FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, UNIQUE KEY unique_bank_name (user_id, name)) ');
    });
}
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`[server]: Server is running at http://localhost:${port}sssddd`);
    yield initializeDB();
}));
