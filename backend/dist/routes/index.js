"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_1 = require("./admin");
const user_1 = require("./user");
const routes = (0, express_1.Router)();
// Use the admin routes under the '/admin' path
routes.use('/admin', admin_1.router);
routes.use('/api/v1', user_1.userRoutes);
exports.default = routes;
