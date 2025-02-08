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
exports.createWordBank = createWordBank;
exports.getAllWordBanksByUser = getAllWordBanksByUser;
exports.updateWordBank = updateWordBank;
exports.deleteWordBank = deleteWordBank;
const dotenv_1 = __importDefault(require("dotenv"));
const wordBank_1 = require("../db/wordBank");
dotenv_1.default.config();
function createWordBank(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name } = req.body;
            const id = Number(req.params.id);
            if (!id) {
                res.status(400).json({ error: 'no id' });
                return;
            }
            if (!name) {
                res.status(400).json({ error: 'please provide a name' });
                return;
            }
            const result = yield (0, wordBank_1.createWordBankDB)(id, name);
            if (!result) {
                res.status(400).json({ error: 'word Bank not created' });
                return;
            }
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ error: 'failed to create word Bank' });
        }
    });
}
function getAllWordBanksByUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            if (!id) {
                res.status(400).json({ error: 'no id' });
                return;
            }
            const result = yield (0, wordBank_1.getAllWordBanksByUserDB)(id);
            res.status(200).json({ wordBanks: result });
        }
        catch (error) {
            res.status(500).json({ error: 'failed to get all word banks' });
        }
    });
}
function updateWordBank(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user_id = Number(req.params.user_id);
            const id = Number(req.params.id);
            const { addedWords, newName } = req.body;
            if (!user_id || !id) {
                res.status(400).json({ error: 'no id' });
                return;
            }
            if (newName) {
                const result = yield (0, wordBank_1.updateWordBankNameDB)(id, user_id, newName);
                res.status(200).json(result);
                return;
            }
            else if (addedWords) {
                const result = yield (0, wordBank_1.updateWordBankWordsDB)(id, user_id, addedWords);
                res.status(200).json(result);
                return;
            }
            res.status(200).json(false);
        }
        catch (error) {
            res.status(500).json({ error: 'failed to update word bank' });
        }
    });
}
function deleteWordBank(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user_id = Number(req.params.user_id);
            const id = Number(req.params.id);
            if (!user_id || !id) {
                res.status(400).json({ error: 'no id' });
                return;
            }
            const result = yield (0, wordBank_1.deleteWordBankDB)(id, user_id);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ error: 'failed to delete word bank' });
        }
    });
}
