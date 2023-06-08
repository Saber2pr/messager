"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrollToBottom = exports.rgb = void 0;
/*
 * @Author: saber2pr
 * @Date: 2020-06-21 11:44:05
 * @Last Modified by: saber2pr
 * @Last Modified time: 2020-06-21 12:33:01
 */
var rgb = function () {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var rgb = "rgb(" + r + "," + g + "," + b + ")";
    return rgb;
};
exports.rgb = rgb;
var scrollToBottom = function (ele) {
    return ele.scrollTo({
        top: ele.scrollHeight,
        behavior: "smooth"
    });
};
exports.scrollToBottom = scrollToBottom;
//# sourceMappingURL=utils.js.map