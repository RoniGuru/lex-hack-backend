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
exports.createUserDB = createUserDB;
exports.checkUserNameDB = checkUserNameDB;
exports.getUserByIdDB = getUserByIdDB;
exports.getUserByNameDB = getUserByNameDB;
exports.deleteUserDB = deleteUserDB;
exports.updateUserNameDB = updateUserNameDB;
exports.updateUserPasswordDB = updateUserPasswordDB;
exports.updateUserEmailDB = updateUserEmailDB;
exports.updateUserRefreshTokenDB = updateUserRefreshTokenDB;
const db_1 = require("./db");
function createUserDB(username, password, email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [results] = yield db_1.mysqlDB.query('Insert into users (name, password,email) values (?,?,?)', [username, password, email || null]);
            if (results.affectedRows === 0)
                return null;
            const [rows] = yield db_1.mysqlDB.query('SELECT * FROM users WHERE name = ?', [username]);
            return rows[0];
        }
        catch (error) {
            console.log('error creating user in db');
            console.log(error);
            return null;
        }
    });
}
function checkUserNameDB(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield db_1.mysqlDB.query('Select * FROM users WHERE id = ?', [name]);
            if (rows.length === 0)
                return true;
            return false;
        }
        catch (error) {
            console.log('error getting user in db');
            return false;
        }
    });
}
function getUserByIdDB(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield db_1.mysqlDB.query('Select * FROM users WHERE id = ?', [id]);
            if (rows.length === 0)
                return null;
            return rows[0];
        }
        catch (error) {
            console.log('error getting user in db');
            return null;
        }
    });
}
function getUserByNameDB(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield db_1.mysqlDB.query('Select * FROM users WHERE name = ?', [name]);
            if (rows.length === 0)
                return null;
            return rows[0];
        }
        catch (error) {
            console.log('error getting user in db');
            return null;
        }
    });
}
function deleteUserDB(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [results] = yield db_1.mysqlDB.query('delete from  users  where id = ?', [id]);
            if (results.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.log('error deleting user in db');
            return false;
        }
    });
}
function updateUserNameDB(id, name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [results] = yield db_1.mysqlDB.query('UPDATE users SET name = ? WHERE id = ?', [name, id]);
            if (results.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.log('error updating user name in db');
            return false;
        }
    });
}
function updateUserPasswordDB(id, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [results] = yield db_1.mysqlDB.query('UPDATE users SET password = ? WHERE id = ?', [password, id]);
            if (results.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.log('error updating user password in db');
            return false;
        }
    });
}
function updateUserEmailDB(id, email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [results] = yield db_1.mysqlDB.query('UPDATE users SET email = ? WHERE id = ?', [email, id]);
            if (results.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.log('error updating user email in db');
            return false;
        }
    });
}
function updateUserRefreshTokenDB(id, refresh_token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [results] = yield db_1.mysqlDB.query('UPDATE users SET refresh_token = ? WHERE id = ?', [refresh_token, id]);
            if (results.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.log('error updating user refresh token in db');
            return false;
        }
    });
}
