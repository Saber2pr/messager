"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
/*
 * @Author: saber2pr
 * @Date: 2020-06-21 12:33:16
 * @Last Modified by: saber2pr
 * @Last Modified time: 2022-02-26 17:05:52
 */
var react_1 = __importStar(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
require("normalize.css");
require("./app.less");
var axios_1 = __importDefault(require("axios"));
var react_use_1 = require("react-use");
var utils_1 = require("./utils");
var clipboard_1 = __importDefault(require("clipboard"));
var qrcode_react_1 = __importDefault(require("qrcode.react"));
var request = axios_1.default.create({
    baseURL: "/api"
});
var cache = {
    lastQueueLen: -1
};
var pendingMessage = { message: "等待连接中" };
var useRefreshMessagePool = function () {
    var ref = (0, react_1.useRef)();
    var _a = (0, react_1.useState)([pendingMessage]), state = _a[0], setState = _a[1];
    (0, react_use_1.useInterval)(function () {
        request
            .get("/get")
            .then(function (res) {
            var next = res.data || [];
            if (next.length === cache.lastQueueLen) {
            }
            else {
                setState(next);
                cache.lastQueueLen = next.length;
                (0, utils_1.scrollToBottom)(ref.current);
            }
        })
            .catch(function () { return setState(__spreadArray(__spreadArray([], state, true), [pendingMessage], false)); });
    }, 500);
    return [state, ref];
};
var Line = react_1.default.memo(function (_a) {
    var children = _a.children, id = _a.id;
    var ref = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        var cp = new clipboard_1.default(ref.current);
        return function () { return cp.destroy(); };
    }, []);
    var clipId = "clipId-" + id;
    return (react_1.default.createElement("pre", { className: "line", id: clipId, style: {
            backgroundColor: (0, utils_1.rgb)()
        } },
        children,
        react_1.default.createElement("i", { ref: ref, "data-clipboard-target": "#" + clipId, className: "iconfont icon-fuzhi clip", title: "\u590D\u5236" })));
});
var App = function () {
    var ref = (0, react_1.useRef)();
    var _a = (0, react_1.useState)(false), showQrcode = _a[0], setShowQrcode = _a[1];
    var onSubmit = function (event) {
        event.preventDefault();
        var body = { message: ref.current.innerText };
        request.get("/send", {
            params: body
        });
    };
    var _b = useRefreshMessagePool(), mpl = _b[0], containRef = _b[1];
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("header", { onClick: function () { return setShowQrcode(!showQrcode); } },
            react_1.default.createElement("u", null, "Messager")),
        react_1.default.createElement("main", null,
            showQrcode && react_1.default.createElement(qrcode_react_1.default, { style: { margin: '1rem auto' }, value: location.href }),
            react_1.default.createElement("div", { ref: containRef, className: "message-contain" }, mpl.map(function (_a, i) {
                var message = _a.message;
                return (react_1.default.createElement(Line, { key: message + i, id: i }, message));
            })),
            react_1.default.createElement("form", { className: "input-form", onSubmit: onSubmit },
                react_1.default.createElement("div", { ref: ref, className: "text-input", contentEditable: true }),
                react_1.default.createElement("input", { className: "submit", type: "submit", value: "\u53D1\u9001" }))),
        react_1.default.createElement("footer", null, "by saber2pr")));
};
exports.App = App;
react_dom_1.default.render(react_1.default.createElement(exports.App, null), document.getElementById("root"));
//# sourceMappingURL=app.js.map