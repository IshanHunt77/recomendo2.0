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
exports.UserSignin = exports.UserSignup = void 0;
const zodvalidation_1 = require("../zod/zodvalidation");
const Schema_1 = require("../Schema");
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedResult = zodvalidation_1.signupInput.safeParse(req.body);
        if (!parsedResult.success) {
            res.status(400).json({ msg: "Invalid Schema" });
            return;
        }
        const { username, email, password } = parsedResult.data;
        const user = yield Schema_1.User.create({ username, email, password });
        const token = jsonwebtoken_1.default.sign({ id: user.id }, config_1.JWT_Secret);
        res.status(201).json({ token, msg: "User Created Successfully" });
    }
    catch (err) {
        res.status(500).json({ msg: "Internal Error" });
    }
});
exports.UserSignup = UserSignup;
// Signin Route (no auth required)
const UserSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield Schema_1.User.findOne({ email });
        if (!user || user.password !== password) {
            res.status(403).json({ msg: "Invalid email or password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, config_1.JWT_Secret);
        res.status(200).json({ token, msg: "Signin Successful" });
    }
    catch (err) {
        res.status(500).json({ msg: "Internal Error" });
    }
});
exports.UserSignin = UserSignin;
