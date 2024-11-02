"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupInput = void 0;
const zod_1 = require("zod");
const signupInput = zod_1.z.object({
    username: zod_1.z.string().min(1),
    email: zod_1.z.string(),
    password: zod_1.z.string().min(8)
});
exports.signupInput = signupInput;
