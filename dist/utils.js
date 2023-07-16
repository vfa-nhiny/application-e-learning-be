"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortObject = void 0;
function sortObject(o) {
    let sorted = {}, key, a = [];
    for (key in o) {
        if (o.hasOwnProperty(key)) {
            a.push(key);
        }
    }
    a.sort();
    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }
    return sorted;
}
exports.sortObject = sortObject;
//# sourceMappingURL=utils.js.map