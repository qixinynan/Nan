/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/nan.ts":
/*!********************!*\
  !*** ./src/nan.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Nan\": () => (/* binding */ Nan)\n/* harmony export */ });\nvar Nan = /** @class */ (function () {\r\n    function Nan(canvas) {\r\n        this.objList = [];\r\n        this.canvas = canvas;\r\n        this.ctx = canvas.getContext('2d');\r\n    }\r\n    Nan.prototype.addObject = function (obj) {\r\n        console.log(\"Add \" + obj.name);\r\n        this.objList.push(obj);\r\n    };\r\n    return Nan;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://nan/./src/nan.ts?");

/***/ }),

/***/ "./src/object/nanobject.ts":
/*!*********************************!*\
  !*** ./src/object/nanobject.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"NanObject\": () => (/* binding */ NanObject)\n/* harmony export */ });\nvar NanObject = /** @class */ (function () {\r\n    function NanObject(name, transform) {\r\n        this.name = name;\r\n        this.transform = transform;\r\n    }\r\n    return NanObject;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://nan/./src/object/nanobject.ts?");

/***/ }),

/***/ "./src/object/sprite.ts":
/*!******************************!*\
  !*** ./src/object/sprite.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Sprite\": () => (/* binding */ Sprite)\n/* harmony export */ });\n/* harmony import */ var _nanobject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nanobject */ \"./src/object/nanobject.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\nvar Sprite = /** @class */ (function (_super) {\r\n    __extends(Sprite, _super);\r\n    function Sprite() {\r\n        return _super !== null && _super.apply(this, arguments) || this;\r\n    }\r\n    return Sprite;\r\n}(_nanobject__WEBPACK_IMPORTED_MODULE_0__.NanObject));\r\n\r\n\n\n//# sourceURL=webpack://nan/./src/object/sprite.ts?");

/***/ }),

/***/ "./src/test.ts":
/*!*********************!*\
  !*** ./src/test.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _nan__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nan */ \"./src/nan.ts\");\n/* harmony import */ var _object_sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./object/sprite */ \"./src/object/sprite.ts\");\n/* harmony import */ var _utils_transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/transform */ \"./src/utils/transform.ts\");\n/* harmony import */ var _utils_vector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/vector */ \"./src/utils/vector.ts\");\n\r\n\r\n\r\n\r\nvar canvas = document.getElementById('canvas');\r\nvar nan = new _nan__WEBPACK_IMPORTED_MODULE_0__.Nan(canvas);\r\nvar sprite = new _object_sprite__WEBPACK_IMPORTED_MODULE_1__.Sprite(\"Hello\", new _utils_transform__WEBPACK_IMPORTED_MODULE_2__.Transform(new _utils_vector__WEBPACK_IMPORTED_MODULE_3__.Vector2(0, 0), new _utils_vector__WEBPACK_IMPORTED_MODULE_3__.Vector2(0, 0)));\r\nnan.addObject(sprite);\r\n\n\n//# sourceURL=webpack://nan/./src/test.ts?");

/***/ }),

/***/ "./src/utils/transform.ts":
/*!********************************!*\
  !*** ./src/utils/transform.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Transform\": () => (/* binding */ Transform)\n/* harmony export */ });\nvar Transform = /** @class */ (function () {\r\n    function Transform(position, rotation) {\r\n        this.position = position;\r\n        this.rotation = rotation;\r\n    }\r\n    return Transform;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://nan/./src/utils/transform.ts?");

/***/ }),

/***/ "./src/utils/vector.ts":
/*!*****************************!*\
  !*** ./src/utils/vector.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Vector2\": () => (/* binding */ Vector2)\n/* harmony export */ });\nvar Vector2 = /** @class */ (function () {\r\n    function Vector2(x, y) {\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n    return Vector2;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://nan/./src/utils/vector.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/test.ts");
/******/ 	
/******/ })()
;