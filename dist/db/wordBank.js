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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWordBankDB = createWordBankDB;
exports.getAllWordBanksByUserDB = getAllWordBanksByUserDB;
exports.updateWordBankNameDB = updateWordBankNameDB;
exports.updateWordBankWordsDB = updateWordBankWordsDB;
exports.deleteWordBankDB = deleteWordBankDB;
const db_1 = require("./db");
function createWordBankDB(user_id, name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [results] = yield db_1.mysqlDB.query('Insert into wordBanks (user_id,name) values (?,?)', [user_id, name]);
            if (results.affectedRows === 0)
                return null;
            const [rows] = yield db_1.mysqlDB.query('SELECT * FROM wordBanks WHERE user_id = ? AND name = ?', [user_id, name]);
            return rows[0];
        }
        catch (error) {
            console.log('error creating user in db');
            console.log(error);
            return null;
        }
    });
}
function getAllWordBanksByUserDB(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield db_1.mysqlDB.query('SELECT * FROM wordBanks WHERE user_id = ? ', [user_id]);
            return rows;
        }
        catch (error) {
            console.log('error creating user in db');
            console.log(error);
            return null;
        }
    });
}
function updateWordBankNameDB(id, user_id, name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [results] = yield db_1.mysqlDB.query('UPDATE wordBanks SET name = ? WHERE id = ? AND user_id = ?', [name, id, user_id]);
            if (results.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.log('error updating word bank name in db');
            return false;
        }
    });
}
function updateWordBankWordsDB(id, user_id, words) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const wordsJson = JSON.stringify(words);
            const [results] = yield db_1.mysqlDB.query('UPDATE wordBanks SET words = ? WHERE id = ? AND user_id = ?', [wordsJson, id, user_id]);
            if (results.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.log('error updating word bank words in db');
            return false;
        }
    });
}
function deleteWordBankDB(id, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [results] = yield db_1.mysqlDB.query('DELETE from  wordBanks  where id = ? And user_id = ?', [id, user_id]);
            if (results.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.log('error deleting wordbank in db');
            return false;
        }
    });
}
