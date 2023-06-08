"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalIP = void 0;
/*
 * @Author: saber2pr
 * @Date: 2020-06-21 10:10:08
 * @Last Modified by: saber2pr
 * @Last Modified time: 2020-06-27 15:05:03
 */
var os_1 = require("os");
function getLocalIP() {
    var interfaces = (0, os_1.networkInterfaces)();
    for (var _i = 0, _a = Object.keys(interfaces); _i < _a.length; _i++) {
        var name_1 = _a[_i];
        for (var _b = 0, _c = interfaces[name_1]; _b < _c.length; _b++) {
            var interf = _c[_b];
            var address = interf.address, family = interf.family, internal = interf.internal;
            if (family === "IPv4" && !internal) {
                return address;
            }
        }
    }
}
exports.getLocalIP = getLocalIP;
//# sourceMappingURL=utils.js.map