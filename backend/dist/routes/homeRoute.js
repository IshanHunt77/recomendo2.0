"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const home_1 = require("../controllers/home");
const router = express_1.default.Router();
router.route('/home').get(home_1.Home);
exports.default = router;
