#!/usr/bin/env node
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_1 = __importDefault(require("koa"));
var koa_router_1 = __importDefault(require("koa-router"));
var utils_1 = require("./utils");
var util_1 = require("util");
var fs_1 = require("fs");
var path_1 = require("path");
// fs
var ReadFile = (0, util_1.promisify)(fs_1.readFile);
// constant
var NETWORK_IP = (0, utils_1.getLocalIP)();
var PORT = 3000;
var PATH_ROOT = (0, path_1.join)(__dirname, '../../');
var PATH_API = "/api";
var PATH_STATIC = "/build";
// redis
var MessagePool = [];
// server
var app = new koa_1.default();
// static
app.use(function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var url, req, res, target, data, target, data, accept;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = ctx.url;
                req = ctx.req;
                res = ctx.res;
                if (!(url === "/")) return [3 /*break*/, 2];
                target = (0, path_1.join)(PATH_ROOT, url, PATH_STATIC, "index.html");
                return [4 /*yield*/, ReadFile(target)];
            case 1:
                data = _a.sent();
                res.writeHead(200, {
                    "content-type": "text/html;charset=\"utf-8\""
                });
                res.end(data);
                return [3 /*break*/, 6];
            case 2:
                if (!url.startsWith(PATH_STATIC)) return [3 /*break*/, 4];
                target = (0, path_1.join)(PATH_ROOT, url);
                return [4 /*yield*/, ReadFile(target)];
            case 3:
                data = _a.sent();
                accept = req.headers.accept;
                res.writeHead(200, {
                    "content-type": "".concat(accept, ";charset=\"utf-8\"")
                });
                res.end(data);
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, next()];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); });
// router
var router = new koa_router_1.default({ prefix: PATH_API });
// config
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT, function () { return console.log("http://".concat(NETWORK_IP, ":").concat(PORT)); });
// routes
router.get("/send", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var message;
    return __generator(this, function (_a) {
        message = ctx.query.message;
        MessagePool.push({ message: message });
        ctx.body = message;
        return [2 /*return*/];
    });
}); });
router.get("/get", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.body = MessagePool;
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=index.js.map