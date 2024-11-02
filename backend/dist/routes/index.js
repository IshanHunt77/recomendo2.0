"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_1 = require("./admin"); // Ensure this points to the correct path
const routes = (0, express_1.Router)();
// Use the admin routes under the '/admin' path
routes.use('/admin', admin_1.router);
exports.default = routes;
