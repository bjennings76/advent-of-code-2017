"use strict";
/** @flow */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * detemines whether `str` is a string.
 * @name isString
 * @param {*} val
 * @returns {boolean}
 * @example
 *  isString(3) // => false
 *  isString('') // => true
 */
function isString(val) {
    return typeof val === 'string';
}
exports.default = isString;
;
//# sourceMappingURL=isString.js.map