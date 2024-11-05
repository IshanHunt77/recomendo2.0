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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const reviewRoute_1 = __importDefault(require("./routes/reviewRoute"));
const commentRoute_1 = __importDefault(require("./routes/commentRoute"));
const homeRoute_1 = __importDefault(require("./routes/homeRoute"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/', homeRoute_1.default);
app.use('/api/v1/user', userRoute_1.default);
app.use('/api/v1/review', reviewRoute_1.default);
app.use('/api/v1/comment', commentRoute_1.default);
const mongooseConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect("mongodb+srv://ishanproj:recum789@cluster0.pqe04.mongodb.net/Recommendo?retryWrites=true&w=majority");
        console.log("MongoDB connected successfully");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
});
mongooseConnect();
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
