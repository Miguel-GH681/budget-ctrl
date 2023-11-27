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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const budget_1 = __importDefault(require("./routes/budget"));
const account_1 = __importDefault(require("./routes/account"));
const connection_1 = __importDefault(require("./db/connection"));
class Server {
    constructor() {
        this.paths = {
            budgets: '/api/budgets/',
            accounts: '/api/accounts/'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8090';
        this.middlewares();
        this.routes();
        this.dbConnection();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on ${this.port}`);
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(this.paths.budgets, budget_1.default);
        this.app.use(this.paths.accounts, account_1.default);
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Successful connection');
            }
            catch (error) {
                throw new Error('Bad connection: ' + error);
            }
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map