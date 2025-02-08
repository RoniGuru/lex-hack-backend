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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.logout = logout;
exports.getUserById = getUserById;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
exports.getToken = getToken;
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../db/user");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password } = req.body;
            const result = yield (0, user_1.checkUserNameDB)(name);
            if (!result) {
                res.status(400).json({ error: 'user name already taken' });
                return;
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = yield (0, user_1.createUserDB)(name, hashedPassword, email);
            if (!user) {
                res.status(500).json({ error: 'failed to register user' });
                return;
            }
            res.status(200).json({ message: 'user registered' });
        }
        catch (error) {
            res.status(500).json({ error: 'failed to register user' });
        }
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, password } = req.body;
            const user = yield (0, user_1.getUserByNameDB)(name);
            if (!user) {
                res.status(404).json({ error: 'details invalid' });
                return;
            }
            const compare = yield bcrypt_1.default.compare(password, user.password);
            if (!compare) {
                res.status(404).send('password incorrect');
                return;
            }
            const refreshToken = generateRefreshToken(user.name);
            const accessToken = generateAccessToken(user.name);
            const update = yield (0, user_1.updateUserRefreshTokenDB)(user.id, refreshToken);
            if (!update) {
                res.status(404).json({ error: 'cant update refresh token' });
                return;
            }
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            });
            res.json({
                accessToken,
                user: { id: user.id, name: user.name, email: user.email },
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to login user' });
        }
    });
}
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, user_1.getUserByIdDB)(Number(req.params.id));
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            const update = (0, user_1.updateUserRefreshTokenDB)(user.id, '');
            if (!update) {
                res.status(404).json({ error: 'logout failed' });
                return;
            }
            res.json({
                message: 'you are logged out',
            });
        }
        catch (error) {
            res.status(500).json({ error: 'failed to logout user' });
        }
    });
}
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, user_1.getUserByIdDB)(Number(req.params.id));
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            const { refresh_token, created_at, password } = user, userWithoutToken = __rest(user, ["refresh_token", "created_at", "password"]);
            res.status(200).json(userWithoutToken);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch user' });
        }
    });
}
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, user_1.getUserByIdDB)(Number(req.params.id));
            const password = req.body.password;
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            if (password) {
                const compare = yield bcrypt_1.default.compare(password, user.password);
                if (compare) {
                    const result = yield (0, user_1.deleteUserDB)(Number(req.params.id));
                    if (result) {
                        res.status(200).json({ error: 'User deleted' });
                        return;
                    }
                    else {
                        res.status(404).json({ error: 'User not deleted' });
                        return;
                    }
                }
            }
            else {
                res.status(404).json({ error: 'invalid password' });
                return;
            }
            res.status(200).json();
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to delete user' });
        }
    });
}
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, user_1.getUserByIdDB)(Number(req.params.id));
            const { newName, password, newPassword, newEmail } = req.body;
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            let result = false;
            if (password) {
                const compare = yield bcrypt_1.default.compare(password, user.password);
                if (compare) {
                    const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
                    result = yield (0, user_1.updateUserPasswordDB)(Number(req.params.id), hashedPassword);
                }
                else {
                    res.status(400).json({ error: 'invalid password ' });
                    return;
                }
            }
            else if (newName) {
                result = yield (0, user_1.updateUserNameDB)(Number(req.params.id), newName);
            }
            else if (newEmail) {
                result = yield (0, user_1.updateUserEmailDB)(Number(req.params.id), newEmail);
            }
            if (result) {
                res.status(200).json({ message: 'user updated' });
            }
            else {
                res.status(400).json({ error: 'user update failed' });
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch user' });
        }
    });
}
function getToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.cookies.refreshToken == null) {
                res.status(401).json({ error: 'no refresh token' });
                return;
            }
            //compare refresh token with user
            const user = yield (0, user_1.getUserByIdDB)(Number(req.params.id));
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            if (req.cookies.refreshToken != user.refresh_token) {
                res.status(401).json({ error: 'refresh token  not similar' });
                return;
            }
            const decoded = jsonwebtoken_1.default.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET);
            // Generate new access token
            const accessToken = generateAccessToken(decoded.name);
            res.status(200).json({ accessToken: accessToken });
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                // Invalid signature
                console.error('Invalid token');
            }
            else if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                // Token has expired
                console.error('Token expired');
            }
            res
                .status(500)
                .json({ error: 'Failed to get token or refresh token expired' });
        }
    });
}
function generateAccessToken(name) {
    return jsonwebtoken_1.default.sign({ name: name }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1hr',
    });
}
function generateRefreshToken(name) {
    return jsonwebtoken_1.default.sign({ name: name }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '30 days',
    });
}
