/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/contentScript/bottomTranscriptView.css":
/*!******************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/contentScript/bottomTranscriptView.css ***!
  \******************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* これがどこに配置されるのか確認しないと... */\r\n.ex--dashboard-transcript-wrapper {\r\n    z-index: 3;\r\n    position: absolute;\r\n    top: 0;\r\n    width: 100%;\r\n}\r\n\r\n.ex--dashboard-transcript--header {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    padding: 0.8rem 0.8rem 0.8rem 1.6rem;\r\n    border: 1 px solid orange;\r\n    /* background-color: #fff; */\r\n\r\n    /* dev */\r\n    background-color: red;\r\n\r\n    box-shadow: 0 0 1px 1px rgb(28 29 31 / 10%), 0 3px 1px 0 rgb(28 29 31 / 10%);\r\n    margin-bottom: 3px;\r\n}\r\n\r\n.ex--dashboard-transcript--transcript-panel {\r\n    /* max-height: 300px; */\r\n    height: 300px;\r\n    overflow-y: auto;\r\n    /* dev */\r\n    background-color: red;\r\n}\r\n\r\n.ex--dashboard-transcript--autoscroll-wrapper {\r\n    padding: 8px 16px;\r\n    border-left: 1px solid orange;\r\n    border-right: 1px solid orange;\r\n    /* background: #f7f9fa; */\r\n    /* dev */\r\n    background-color: red;\r\n}\r\n\r\n.ex--dashboard-transcript--cue-container {\r\n    padding: 4px 4px;\r\n    margin: 1px;\r\n}\r\n\r\n.--highlight-- {\r\n    background-color: #fff;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/contentScript/bottomTranscriptView.css"],"names":[],"mappings":"AAAA,2BAA2B;AAC3B;IACI,UAAU;IACV,kBAAkB;IAClB,MAAM;IACN,WAAW;AACf;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,8BAA8B;IAC9B,oCAAoC;IACpC,yBAAyB;IACzB,4BAA4B;;IAE5B,QAAQ;IACR,qBAAqB;;IAErB,4EAA4E;IAC5E,kBAAkB;AACtB;;AAEA;IACI,uBAAuB;IACvB,aAAa;IACb,gBAAgB;IAChB,QAAQ;IACR,qBAAqB;AACzB;;AAEA;IACI,iBAAiB;IACjB,6BAA6B;IAC7B,8BAA8B;IAC9B,yBAAyB;IACzB,QAAQ;IACR,qBAAqB;AACzB;;AAEA;IACI,gBAAgB;IAChB,WAAW;AACf;;AAEA;IACI,sBAAsB;AAC1B","sourcesContent":["/* これがどこに配置されるのか確認しないと... */\r\n.ex--dashboard-transcript-wrapper {\r\n    z-index: 3;\r\n    position: absolute;\r\n    top: 0;\r\n    width: 100%;\r\n}\r\n\r\n.ex--dashboard-transcript--header {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    padding: 0.8rem 0.8rem 0.8rem 1.6rem;\r\n    border: 1 px solid orange;\r\n    /* background-color: #fff; */\r\n\r\n    /* dev */\r\n    background-color: red;\r\n\r\n    box-shadow: 0 0 1px 1px rgb(28 29 31 / 10%), 0 3px 1px 0 rgb(28 29 31 / 10%);\r\n    margin-bottom: 3px;\r\n}\r\n\r\n.ex--dashboard-transcript--transcript-panel {\r\n    /* max-height: 300px; */\r\n    height: 300px;\r\n    overflow-y: auto;\r\n    /* dev */\r\n    background-color: red;\r\n}\r\n\r\n.ex--dashboard-transcript--autoscroll-wrapper {\r\n    padding: 8px 16px;\r\n    border-left: 1px solid orange;\r\n    border-right: 1px solid orange;\r\n    /* background: #f7f9fa; */\r\n    /* dev */\r\n    background-color: red;\r\n}\r\n\r\n.ex--dashboard-transcript--cue-container {\r\n    padding: 4px 4px;\r\n    margin: 1px;\r\n}\r\n\r\n.--highlight-- {\r\n    background-color: #fff;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/contentScript/sidebarTranscriptView.css":
/*!*******************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/contentScript/sidebarTranscriptView.css ***!
  \*******************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".ex--sidebar-column {\r\n    position: fixed;\r\n    right: 0;\r\n    /* \r\n      975px < window.innerWidth =< 1182px でwidth: 300px\r\n      window.innerWidth > 1182pxでwidth: 25%;\r\n      なのでセレクタを追加したほうがいいかも\r\n      */\r\n    /* width: 25%; */\r\n    /* top: specified by JavaScript */\r\n    /* 重ね合わせコンテキストがあったら埋もれないようにひとまず2にした */\r\n    z-index: 2;\r\n}\r\n\r\n.ex--sidebar--wideview {\r\n    width: 25%;\r\n}\r\n\r\n.ex--sidebar--middleview {\r\n    width: 300px;\r\n}\r\n\r\n.ex--sidebar--sidebar {\r\n}\r\n\r\n.ex--sidebar--sidebar-header {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    padding: 0.8rem 0.8rem 0.8rem 1.6rem;\r\n    border: 1px solid #d1d7dc;\r\n    border-right: 0;\r\n    /* background-color: #fff; */\r\n\r\n    /* dev */\r\n    background-color: red;\r\n}\r\n\r\n.ex--sidebar--content {\r\n    z-index: 1;\r\n    background-color: #fff;\r\n    border: 1px solid #f7f9fa;\r\n    overflow-x: hidden;\r\n    overflow-y: auto;\r\n    /* height:  */\r\n    /* dev */\r\n    background-color: red;\r\n}\r\n\r\n.ex--sidebar-transcript--autoscroll-wrapper {\r\n    position: fixed;\r\n    bottom: 0;\r\n    width: 100%;\r\n\r\n    padding: 8px 16px;\r\n    border-left: 1px solid #f7f9fa;\r\n    border-right: 1px solid #f7f9fa;\r\n    background: #f7f9fa;\r\n\r\n    /* dev */\r\n    background-color: red;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/contentScript/sidebarTranscriptView.css"],"names":[],"mappings":"AAAA;IACI,eAAe;IACf,QAAQ;IACR;;;;OAIG;IACH,gBAAgB;IAChB,iCAAiC;IACjC,qCAAqC;IACrC,UAAU;AACd;;AAEA;IACI,UAAU;AACd;;AAEA;IACI,YAAY;AAChB;;AAEA;AACA;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,8BAA8B;IAC9B,oCAAoC;IACpC,yBAAyB;IACzB,eAAe;IACf,4BAA4B;;IAE5B,QAAQ;IACR,qBAAqB;AACzB;;AAEA;IACI,UAAU;IACV,sBAAsB;IACtB,yBAAyB;IACzB,kBAAkB;IAClB,gBAAgB;IAChB,aAAa;IACb,QAAQ;IACR,qBAAqB;AACzB;;AAEA;IACI,eAAe;IACf,SAAS;IACT,WAAW;;IAEX,iBAAiB;IACjB,8BAA8B;IAC9B,+BAA+B;IAC/B,mBAAmB;;IAEnB,QAAQ;IACR,qBAAqB;AACzB","sourcesContent":[".ex--sidebar-column {\r\n    position: fixed;\r\n    right: 0;\r\n    /* \r\n      975px < window.innerWidth =< 1182px でwidth: 300px\r\n      window.innerWidth > 1182pxでwidth: 25%;\r\n      なのでセレクタを追加したほうがいいかも\r\n      */\r\n    /* width: 25%; */\r\n    /* top: specified by JavaScript */\r\n    /* 重ね合わせコンテキストがあったら埋もれないようにひとまず2にした */\r\n    z-index: 2;\r\n}\r\n\r\n.ex--sidebar--wideview {\r\n    width: 25%;\r\n}\r\n\r\n.ex--sidebar--middleview {\r\n    width: 300px;\r\n}\r\n\r\n.ex--sidebar--sidebar {\r\n}\r\n\r\n.ex--sidebar--sidebar-header {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    padding: 0.8rem 0.8rem 0.8rem 1.6rem;\r\n    border: 1px solid #d1d7dc;\r\n    border-right: 0;\r\n    /* background-color: #fff; */\r\n\r\n    /* dev */\r\n    background-color: red;\r\n}\r\n\r\n.ex--sidebar--content {\r\n    z-index: 1;\r\n    background-color: #fff;\r\n    border: 1px solid #f7f9fa;\r\n    overflow-x: hidden;\r\n    overflow-y: auto;\r\n    /* height:  */\r\n    /* dev */\r\n    background-color: red;\r\n}\r\n\r\n.ex--sidebar-transcript--autoscroll-wrapper {\r\n    position: fixed;\r\n    bottom: 0;\r\n    width: 100%;\r\n\r\n    padding: 8px 16px;\r\n    border-left: 1px solid #f7f9fa;\r\n    border-right: 1px solid #f7f9fa;\r\n    background: #f7f9fa;\r\n\r\n    /* dev */\r\n    background-color: red;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/contentScript/bottomTranscriptView.css":
/*!****************************************************!*\
  !*** ./src/contentScript/bottomTranscriptView.css ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_bottomTranscriptView_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./bottomTranscriptView.css */ "./node_modules/css-loader/dist/cjs.js!./src/contentScript/bottomTranscriptView.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_bottomTranscriptView_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_bottomTranscriptView_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_bottomTranscriptView_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_bottomTranscriptView_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/contentScript/sidebarTranscriptView.css":
/*!*****************************************************!*\
  !*** ./src/contentScript/sidebarTranscriptView.css ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_sidebarTranscriptView_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./sidebarTranscriptView.css */ "./node_modules/css-loader/dist/cjs.js!./src/contentScript/sidebarTranscriptView.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_sidebarTranscriptView_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_sidebarTranscriptView_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_sidebarTranscriptView_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_sidebarTranscriptView_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/contentScript/bottomTranscriptView.ts":
/*!***************************************************!*\
  !*** ./src/contentScript/bottomTranscriptView.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/selectors */ "./src/utils/selectors.ts");
/* harmony import */ var _bottomTranscriptView_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bottomTranscriptView.css */ "./src/contentScript/bottomTranscriptView.css");


const BottomTranscriptView = function () {
    // insert position for Element.insertAdjaccentHTML()
    this.insertPosition = 'afterbegin';
    this.insertParentSelector = _utils_selectors__WEBPACK_IMPORTED_MODULE_0__.EX.noSidebarParent;
    this.transcriptSelectors = [
        _utils_selectors__WEBPACK_IMPORTED_MODULE_0__.EX.dashboardTranscriptWrapper,
        _utils_selectors__WEBPACK_IMPORTED_MODULE_0__.EX.dashboardTranscriptHeader,
        _utils_selectors__WEBPACK_IMPORTED_MODULE_0__.EX.dashboardTranscriptPanel,
        _utils_selectors__WEBPACK_IMPORTED_MODULE_0__.EX.dashboardTranscriptBottom,
    ];
};
/*
.ex--dashboard-transcript--cue-container
.ex--dashboard-transcript--cue--underline
span[data-purpose="ex--dashboard-cue-text"]

*/
BottomTranscriptView.prototype.generateSubtitleMarkup = function (subtitles) {
    var mu = '';
    for (const s of subtitles) {
        const _mu = `
        <div class="${_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.EX.dashboardTranscriptCueContainer.slice(1)}" data-id="${s.index}">
            <p data-purpose="ex-transcript-cue" class="${_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.EX.dashboardTranscriptCue.slice(1)}">
                <span data-purpose="ex--dashboard-cue-text">
                    ${s.subtitle}
                </span>
            </p>
        </div>
    `;
        // concatでいいのかな...
        mu = mu.concat(_mu);
    }
    return mu;
};
BottomTranscriptView.prototype.generateMarkup = function (subtitleStrings) {
    return `
    <div class="${_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.EX.dashboardTranscriptWrapper.slice(1)}">
        <div class="${_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.EX.dashboardTranscriptHeader.slice(1)}">ExTranscript</div>
        <div class="${_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.EX.dashboardTranscriptPanel.slice(1)}">
            ${subtitleStrings === undefined ? '' : subtitleStrings}
        </div>
        <div class="${_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.EX.dashboardTranscriptBottom.slice(1)}">Auto Scroll</div>
    </div>
    `;
};
// BottomTranscriptView.prototype.render = function (): void {
//   console.log("[BottomTranscriptView]render");
//   //   親要素を`position: relative`にする
//   const e: HTMLElement = document.querySelector<HTMLElement>(
//     this.insertParentSelector
//   );
//   e.style.position = "relative";
//   const p: InsertPosition = this.insertPosition;
//   const html: string = this.generateMarkup();
//   e.insertAdjacentHTML(p, html);
// };
BottomTranscriptView.prototype.render = function (subtitles) {
    //   親要素を`position: relative`にする
    const e = document.querySelector(this.insertParentSelector);
    e.style.position = 'relative';
    const p = this.insertPosition;
    var html = '';
    if (subtitles.length > 0) {
        const s = this.generateSubtitleMarkup(subtitles);
        html = this.generateMarkup(s);
    }
    else {
        html = this.generateMarkup();
    }
    e.insertAdjacentHTML(p, html);
};
// Udemyページのコンテンツを間違っても消してしまわないように
BottomTranscriptView.prototype.clear = function () {
    this.transcriptSelectors.forEach((s) => {
        const e = document.querySelector(s);
        if (e)
            e.remove();
    });
    //   親要素につけていた`position: relative`を解除する
    const parent = document.querySelector(this.insertParentSelector);
    parent.style.position = '';
};
BottomTranscriptView.prototype.renderSpinner = function () {
    console.log('[BottomTranscriptView] render spinner');
};
BottomTranscriptView.prototype.renderError = function () {
    console.log('[BottomTranscriptView] render error');
};
BottomTranscriptView.prototype.renderMessage = function () {
    console.log('[BottomTranscriptView] render message');
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new BottomTranscriptView());
/*
 */


/***/ }),

/***/ "./src/contentScript/sidebarTranscriptView.ts":
/*!****************************************************!*\
  !*** ./src/contentScript/sidebarTranscriptView.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/selectors */ "./src/utils/selectors.ts");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.ts");
/* harmony import */ var _sidebarTranscriptView_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sidebarTranscriptView.css */ "./src/contentScript/sidebarTranscriptView.css");



const SidebarTranscriptView = function () {
    // insert position for Element.insertAdjaccentHTML()
    this.insertPosition = "afterbegin";
    this.insertParentSelector = _utils_selectors__WEBPACK_IMPORTED_MODULE_0__.EX.sidebarParent;
    this.transcriptSelectors = [_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.EX.sidebarWrapper];
};
SidebarTranscriptView.prototype.generateMarkup = function (subtitles) {
    const s = subtitles ? subtitles : "";
    return `
          <div class="${_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.EX.sidebarWrapper.slice(1)}">
              <section class="${_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.EX.sidebarSection.slice(1)}">
                  <div class="${_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.EX.sidebarHeader.slice(1)}">ExTranscript</div>
                  <div class="${_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.EX.sidebarContent.slice(1)}">
                    <div class="${_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.EX.sidebarContentPanel.slice(1)}">
                      ${s}
                    </div>
                  </div>
                  <div class="${_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.EX.sidebarFooter.slice(1)}">Auto Scroll</div>
              </section>
          </div>
      `;
};
SidebarTranscriptView.prototype.generateSubtitleMarkup = function (subtitles) {
    var mu = "";
    for (const s of subtitles) {
        const _mu = `
        <div class="${_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.EX.sidebarCueContainer.slice(1)}" data-id="${s.index}">
          <p class="nothingYet">
            <span data-purpose="nothingYet">${s.subtitle}</span>
          </p>
        </div>
      `;
        // concatでいいのかな...
        mu = mu.concat(_mu);
    }
    return mu;
};
// render
//
// 変更点
// - 引数 subtitle を追加
// - subtitles の中身の有無でgenerateMarkupの呼出を条件分岐させる
//
// これでsubtitleがあってもなくても両方の場合に対応できる
SidebarTranscriptView.prototype.render = function (subtitles) {
    const e = document.querySelector(this.insertParentSelector);
    const p = this.insertPosition;
    var html = "";
    if (subtitles.length > 0) {
        const s = this.generateSubtitleMarkup(subtitles);
        html = this.generateMarkup(s);
    }
    else {
        html = this.generateMarkup();
    }
    e.insertAdjacentHTML(p, html);
};
SidebarTranscriptView.prototype.clear = function () {
    this.transcriptSelectors.forEach((s) => {
        const e = document.querySelector(s);
        if (e)
            e.remove();
    });
};
//
SidebarTranscriptView.prototype.updateContentTop = function (top) {
    const wrapper = document.querySelector(_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.EX.sidebarWrapper);
    wrapper.style.top = top + "px";
};
SidebarTranscriptView.prototype.updateContentHeight = function () {
    const content = document.querySelector(_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.EX.sidebarContent);
    const footer = document.querySelector(_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.EX.sidebarFooter);
    const header = document.querySelector(_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.EX.sidebarHeader);
    const height = document.documentElement.clientHeight -
        parseInt(window.getComputedStyle(footer).height.replace("px", "")) -
        parseInt(window.getComputedStyle(header).height.replace("px", ""));
    content.style.height = height + "px";
};
SidebarTranscriptView.prototype.updateWidth = function (signal) {
    console.log("[SidebarTranscriptView] updateWidth");
    const wrapper = document.querySelector(_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.EX.sidebarWrapper);
    // toggle class
    // 以下の処理より
    // cssの重ね掛けのときにあとづけのselectorのほうが優先されるという特性があるなら
    // もっとシンプルになるんだけれど
    if (signal === _utils_constants__WEBPACK_IMPORTED_MODULE_1__.SIGNAL.widthStatus.wideview) {
        wrapper.classList.remove(_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.EX.middleView.slice(1));
        wrapper.classList.add(_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.EX.wideView.slice(1));
    }
    else {
        wrapper.classList.remove(_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.EX.wideView.slice(1));
        wrapper.classList.add(_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.EX.middleView.slice(1));
    }
};
SidebarTranscriptView.prototype.renderSpinner = function () {
    console.log("[SidebarTranscriptView] render spinner");
};
SidebarTranscriptView.prototype.renderError = function () {
    console.log("[SidebarTranscriptView] render error");
};
SidebarTranscriptView.prototype.renderMessage = function () {
    console.log("[SidebarTranscriptView] render message");
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new SidebarTranscriptView());
// ------ LEGACY CODE ---------------------------------------
// SidebarTranscriptView.prototype.generateMarkup = function (): string {
//   return `
//         <div class="${SELECTORS.EX.sidebarWrapper.slice(1)}">
//             <section class="${SELECTORS.EX.sidebarSection.slice(1)}">
//                 <div class="${SELECTORS.EX.sidebarHeader.slice(
//                   1
//                 )}">ExTranscript</div>
//                 <div class="${SELECTORS.EX.sidebarContent.slice(1)}">
//                     <p>
//                     </p>
//                 </div>
//                 <div class="${SELECTORS.EX.sidebarFooter.slice(
//                   1
//                 )}">Auto Scroll</div>
//             </section>
//         </div>
//     `;
// };
// SidebarTranscriptView.prototype.render = function (): void {
//   console.log("[SidebarTranscriptView] render");
//   const e: Element = document.querySelector(this.insertParentSelector);
//   const p: InsertPosition = this.insertPosition;
//   const html: string = this.generateMarkup();
//   e.insertAdjacentHTML(p, html);
// };


/***/ }),

/***/ "./src/utils/MutationObserver_.ts":
/*!****************************************!*\
  !*** ./src/utils/MutationObserver_.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**************************************************
 * MutationObserver wrapper class
 *
 * NOTE: targetはNodeListOf<Element>だけで全く再利用性がない
 *
 * いまのところsrc/contentScript/controller.tsでしか使われていない
 * *************************************************/
class MutationObserver_ {
    constructor(callback, config, target) {
        this._callback = callback;
        this._config = config;
        this._target = target;
        this._observer = new MutationObserver(this._callback);
    }
    observe() {
        this._target.forEach((ts) => {
            this._observer.observe(ts, this._config);
        });
    }
    disconnect() {
        this._observer.disconnect();
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MutationObserver_);


/***/ }),

/***/ "./src/utils/Observable.ts":
/*!*********************************!*\
  !*** ./src/utils/Observable.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Observable {
    constructor() {
        this._observers = [];
    }
    register(func) {
        this._observers.push(func);
    }
    unregister(func) {
        this._observers = this._observers.filter((o) => {
            return o !== func;
        });
    }
    notify(prop, prev) {
        this._observers.forEach((o) => {
            o(prop, prev);
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Observable);


/***/ }),

/***/ "./src/utils/constants.ts":
/*!********************************!*\
  !*** ./src/utils/constants.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_key_of_model_state__": () => (/* binding */ _key_of_model_state__),
/* harmony export */   "urlPattern": () => (/* binding */ urlPattern),
/* harmony export */   "extensionStatus": () => (/* binding */ extensionStatus),
/* harmony export */   "extensionNames": () => (/* binding */ extensionNames),
/* harmony export */   "orderNames": () => (/* binding */ orderNames),
/* harmony export */   "RESIZE_BOUNDARY": () => (/* binding */ RESIZE_BOUNDARY),
/* harmony export */   "SIDEBAR_WIDTH_BOUNDARY": () => (/* binding */ SIDEBAR_WIDTH_BOUNDARY),
/* harmony export */   "RESIZE_TIMER": () => (/* binding */ RESIZE_TIMER),
/* harmony export */   "SIGNAL": () => (/* binding */ SIGNAL),
/* harmony export */   "positionStatus": () => (/* binding */ positionStatus),
/* harmony export */   "viewStatusNames": () => (/* binding */ viewStatusNames),
/* harmony export */   "port_names": () => (/* binding */ port_names)
/* harmony export */ });
/**************************************************
 * constants
 * ________________________________________________
 *
 * ************************************************/
const _key_of_model_state__ = "_key_of_model_state__@&%8=8";
const urlPattern = /https:\/\/www.udemy.com\/course\/*/gm;
const extensionStatus = {
    working: "working",
    notWorking: "notWorking",
    idle: "idle",
};
const extensionNames = {
    popup: "popup",
    contentScript: "contentScript",
    controller: "controller",
    captureSubtitle: "captureSubtitle",
    background: "background",
};
//
// Updated
//
const orderNames = {
    // // Inject content script order
    // injectCaptureSubtitleScript: 'injectCaptureSubtitleScript',
    // injectExTranscriptScript: 'injectExTranscriptScript',
    // From background to contentScript
    sendStatus: "sendStatus",
    // from controller to background
    sendSubtitles: "sendSubtitles",
    // order to disconnect port
    disconnect: "disconnect",
    // from popup inquire the url is correct
    inquireUrl: "inquireUrl",
    // from popup, run process
    run: "run",
    // reset content script
    reset: "reset",
    // Turn Off ExTranscript
    turnOff: "turnOff",
    // something succeeded
    success: "success",
    // NOTE: new added
    // Is the page moved to text page?
    isPageIncludingMovie: "isPageIncludingMovie",
    // NOTE: new added
    // Alert
    alert: "alert",
};
// --- constants for controller.js -------------------------------
// // To pass to setTimeout
// export const TEN_SEC: number = 10000;
// transcript要素はwinodwサイズが975px以下の時にdashboardへ以上でsidebarへ移動する
const RESIZE_BOUNDARY = 975;
// sidebarのwidthは2通りあって、
// 975px < w =< 1182pxだと300px, w > 1182pxで25%
const SIDEBAR_WIDTH_BOUNDARY = 1182;
// window onResize時の反応遅延速度
const RESIZE_TIMER = 100;
const SIGNAL = {
    widthStatus: {
        wideview: true,
        middleview: false,
    },
};
const positionStatus = {
    sidebar: "sidebar",
    noSidebar: "noSidebar",
};
const viewStatusNames = {
    wideView: "wideView",
    middleView: "middleView",
};
// ---- ABOUT PORT ----------------------------------
const port_names = {
    _requiring_subtitles: "_port_name_require_subtitles",
    _injected_contentScript: "_port_name_injected_contentScript",
};
// // Usage
// type _order = orderTypes[];
// const oo: _order = [
//   orderNames.sendStatus, orderNames.disconnect
// ];
// console.log(oo);
// const messageHandler = (m: iMessage): void => {
//   const { from, to, order } = m;
//   // もしもorderプロパティが含まれていて、中身があれば
//   if (order && order.length) {
//     console.log("there is order");
//     //
//     // この時点だとorderが何者かわからないみたいだからincludes()メソッドなんて使えないよ
//     // というエラーが出る
//     // でも使えた
//     // codesandboxでは
//     if (order.includes(orderNames.sendStatus)) {
//       console.log("SEND STATUS");
//     }
//     if (order.includes(orderNames.disconnect)) {
//       console.log("DISCONNECT");
//     }
//   }
// };
// messageHandler({
//   from: "background",
//   to: "content script",
//   order: [
//     orderNames.sendStatus, orderNames.disconnect
//   ]
// });
// messageHandler({
//   from: "background",
//   to: "content script",
//   order: []
// });
// messageHandler({
//   from: "background",
//   to: "content script"
// });
/*
## 変数がいくつかの特定の値を持つように強制する方法

https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types

```TypeScript

// -- example 1 --

let x: "hello" = "hello";
// OK
x = "hello";
// ...
x = "howdy";
// Type '"howdy"' is not assignable to type '"hello"'.

// -- example 2 --

function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "centre");
Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.
```

https://typescript-jp.gitbook.io/deep-dive/type-system/literal-types



*/


/***/ }),

/***/ "./src/utils/contentScript/State.ts":
/*!******************************************!*\
  !*** ./src/utils/contentScript/State.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*************************************************************
 * State class
 *
 *
 * ../contentScript/controller.tsなどで使われるためのもの
 * ../background/background.tsのためのものと混同しないこと
 *
 * Observableのインスタンスを必須とする
 * ObservableはObserverデザインパターンのsubjectである
 * Stateはpublicとしてこのインスタンスを登録し
 * あとからobserverを登録できる
 * **********************************************************/
class State {
    constructor(s, o) {
        this.observable = o;
        this._state = Object.assign({}, s);
    }
    setState(prop) {
        const prev = Object.assign({}, this._state);
        // _stateは一段階の深さなので
        // コピーはspread構文で充分
        this._state = Object.assign(Object.assign({}, this._state), prop);
        this.observable.notify(prop, prev);
    }
    getState() {
        // _stateは一段階の深さなので
        // コピーはspread構文で充分
        return Object.assign({}, this._state);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (State);


/***/ }),

/***/ "./src/utils/selectors.ts":
/*!********************************!*\
  !*** ./src/utils/selectors.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "videoContainer": () => (/* binding */ videoContainer),
/* harmony export */   "transcript": () => (/* binding */ transcript),
/* harmony export */   "controlBar": () => (/* binding */ controlBar),
/* harmony export */   "EX": () => (/* binding */ EX)
/* harmony export */ });
/***************************************************
 * SELECTORS
 * ________________________________________________
 *
 *
 *
 *
 * **************************************************/
// --- Selectors related to Transcript ---------------------------
// Udemy講義ページが動画ページならこのセレクタが一致する
// テキストページとかなら一致しない
const videoContainer = "div.video-viewer--container--23VX7";
const transcript = {
    // HTMLSpanElement which is Highlight as current subtitle on movie.
    highlight: "span.transcript--highlight-cue--1bEgq",
    // NodeListOf<HTMLSpanElement> which are list of subtitle element.
    transcripts: "div.transcript--cue-container--wu3UY p.transcript--underline-cue--3osdw span",
    // top element of side bar
    noSidebar: "div.app--no-sidebar--1naXE",
    sidebar: "div.has-sidebar",
    // High level element of Movie element
    movieContainer: "div.app--curriculum-item--2GBGE",
    // Movie Replay button
    replayButton: "button[data-purpose='video-play-button-initial']",
    // Controlbar
    controlbar: "div.control-bar--control-bar--MweER[data-purpose='video-controls']",
    //
};
// --- Selectors related to control bar. -------------------------
const controlBar = {
    // "closed captioning"
    cc: {
        // 字幕メニューpopupボタン
        popupButton: "button[data-purpose='captions-dropdown-button']",
        // textContentで取得できる言語を取得可能
        //   languageList:
        //     "button.udlite-btn.udlite-btn-large.udlite-btn-ghost.udlite-text-sm.udlite-block-list-item.udlite-block-list-item-small.udlite-block-list-item-neutral > div.udlite-block-list-item-content",
        //
        // 言語リストを取得するには一旦languageButtonsを取得してからそれからquerySelectorする
        // いらないかも
        menuCheckButtons: "button",
        menuList: ".udlite-block-list-item-content",
        menuListParent: "ul[role='menu'][data-purpose='captions-dropdown-menu']",
        // 上記のセレクタのラッパーボタン。
        // 属性`aria-checked`で選択されているかどうかわかる
        checkButtons: "button.udlite-btn.udlite-btn-large.udlite-btn-ghost.udlite-text-sm.udlite-block-list-item.udlite-block-list-item-small.udlite-block-list-item-neutral",
    },
    transcript: {
        toggleButton: "button[data-purpose='transcript-toggle']",
    },
    theatre: {
        theatreToggle: "button[data-purpose='theatre-mode-toggle-button']",
    },
};
// --- Selectors related ex-transcript -----------------------
const EX = {
    // Udemy page-specific selector
    sidebarParent: ".app--content-column--HC_i1",
    noSidebarParent: ".app--dashboard-content--r2Ce9",
    movieContainer: ".app--body-container",
    // 独自selector `ex--`を接頭辞とする
    // sidebar ex-transcript selectors
    sidebarWrapper: ".ex--sidebar-column",
    sidebarSection: ".ex--sidebar--sidebar",
    sidebarHeader: ".ex--sidebar--sidebar-header",
    sidebarContent: ".ex--sidebar--content",
    sidebarContentPanel: ".ex--sidebar-content-panel",
    sidebarCueContainer: ".ex--sidebar-transcript--cue-container",
    sidebarFooter: ".ex--sidebar-transcript--autoscroll-wrapper",
    // sidebar width in case more than SIDEBAR_WIDTH_BOUNDARY
    wideView: ".ex--sidebar--wideview",
    // sidebar width in case less than SIDEBAR_WIDTH_BOUNDARY
    middleView: ".ex--sidebar--middleview",
    // bottom ex-transcript selectors
    dashboardTranscriptWrapper: ".ex--dashboard-transcript-wrapper",
    dashboardTranscriptHeader: ".ex--dashboard-transcript--header",
    dashboardTranscriptPanel: ".ex--dashboard-transcript--transcript-panel",
    dashboardTranscriptCueContainer: ".ex--dashboard-transcript--cue-container",
    dashboardTranscriptCue: ".ex--dashboard-transcript--cue--underline",
    dashboardTranscriptCueText: "span[data-purpose='ex--dashboard-cue-text']",
    dashboardTranscriptBottom: ".ex--dashboard-transcript--autoscroll-wrapper",
    // To Highlight Transcriot Cue Container
    highlight: ".--highlight--",
};
// --- LEGACY -------------------------
// sectionTitle: 'div.udlite-text-md.video-viewer--title-overlay--OoQ6e',


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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************************!*\
  !*** ./src/contentScript/controller.ts ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sidebarTranscriptView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sidebarTranscriptView */ "./src/contentScript/sidebarTranscriptView.ts");
/* harmony import */ var _bottomTranscriptView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bottomTranscriptView */ "./src/contentScript/bottomTranscriptView.ts");
/* harmony import */ var _utils_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/selectors */ "./src/utils/selectors.ts");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.ts");
/* harmony import */ var _utils_Observable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/Observable */ "./src/utils/Observable.ts");
/* harmony import */ var _utils_contentScript_State__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/contentScript/State */ "./src/utils/contentScript/State.ts");
/* harmony import */ var _utils_MutationObserver___WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/MutationObserver_ */ "./src/utils/MutationObserver_.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
/********************************************************
 * controller
 * ____________________________________________
 *
 * 本家Udemy講義ページのトランスクリプト機能と(ほぼ)同じものを生成する
 * 字幕データだけ、特別に生成された字幕データを取り扱う
 *
 * 機能：
 * - background scriptからの要請に応じてExTranscriptを展開または非表示にする
 * - 字幕データはbackground scriptから送信されしだい展開する
 * - ExTranscriptの表示の仕方は本家トランスクリプトと同様の動きになるように制御する機能
 * - ブラウザの横幅が小さくなりすぎたかどうかもこちらで計算する機能
 *  これによりonWindowResizeHandler()の一部が実行されないように制限をかける
 *  これはbackground scriptからのorderとonWindowResizeHandler()がバッティングするのを防ぐ
 * 　応急処置である
 *
 *
 * 制約：
 * - ExTranscriptの表示・非表示はbackground scriptの指示に従う
 * - 字幕データはこちらか要求しない
 *
 * NOTE:
 *
 * - 自動スクロール機能は本家の自動スクロール・チェックボックスを実装しない。
 * これは仕様とする
 *
 *
 * TODO: コード中の'TODO'を確認して修正のこと
 *
 *
 * *******************************************************/







const statusBase = {
    // NOTE: position, viewの初期値は意味をなさず、
    // すぐに変更されることが前提である
    position: null,
    view: null,
    highlight: null,
    ExHighlight: null,
    indexList: null,
    isAutoscrollInitialized: false,
    isWindowTooSmall: false,
};
const subtitleBase = {
    subtitles: [],
};
// ウィンドウが小さすぎてトランスクリプトが表示されなくなる境界値
const MINIMUM_BOUNDARY = 600;
let timerQueue = null;
let sStatus;
let sSubtitles;
let transcriptListObserver = null;
const moConfig = {
    attributes: true,
    childList: false,
    subtree: false,
    attributeOldValue: true,
};
/*************************************************************************
 * Callback for MutationObserver.
 *
 * guard: 以下の理由で設けている変数
 *
 * NOTE: Udemyの字幕はまったく同じ字幕要素が2個も3個も生成されている
 *
 * つまりまったく同じ要素が同時に複数存在する状況が発生してしまっている
 * 多分バグだけど、同じ要素が何個も生成されてしまうとリスナが何度も
 * 反応してしまう可能性がある
 *
 *
 * */
const moCallback = function (mr) {
    let guard = false;
    mr.forEach((record) => {
        if (record.type === "attributes" &&
            record.attributeName === "class" &&
            record.oldValue === "" &&
            !guard) {
            console.log("OBSERVED");
            guard = true;
            try {
                updateHighlightIndexes();
                updateExTranscriptHighlight();
                scrollToHighlight();
            }
            catch (e) {
                chrome.runtime.sendMessage({
                    from: _utils_constants__WEBPACK_IMPORTED_MODULE_3__.extensionNames.controller,
                    to: _utils_constants__WEBPACK_IMPORTED_MODULE_3__.extensionNames.background,
                    error: e
                });
            }
        }
    });
};
//
// --- CHROME LISTENERS ----------------------------------------
//
/***************************************************************
 * On Message Handler
 *
 * @return {boolean} Return true to indicate that it will respond asynchronously.
 * */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, to, order } = message, rest = __rest(message, ["from", "to", "order"]);
    if (to !== _utils_constants__WEBPACK_IMPORTED_MODULE_3__.extensionNames.controller)
        return;
    const response = { from: to, to: from };
    console.log('[controller] CONTROLLER GOT MESSAGE');
    if (order && order.length) {
        if (order.includes(_utils_constants__WEBPACK_IMPORTED_MODULE_3__.orderNames.reset)) {
            console.log('[controller] order: RESET');
            try {
                handlerOfReset();
                response.complete = true;
            }
            catch (e) {
                response.error = e;
                response.complete = false;
            }
            finally {
                sendResponse(response);
            }
        }
        if (order.includes(_utils_constants__WEBPACK_IMPORTED_MODULE_3__.orderNames.turnOff)) {
            console.log('[controller] order: TURN OFF ExTranscript');
            try {
                handlerOfTurnOff();
                response.success = true;
                response.complete = true;
            }
            catch (e) {
                response.success = false;
                response.error = e;
                response.complete = false;
            }
            finally {
                sendResponse(response);
            }
        }
    }
    // 字幕データが送られてきたら
    if (rest.subtitles) {
        console.log('[controller] Got subtitles');
        try {
            sSubtitles.setState({ subtitles: rest.subtitles });
            response.success = true;
            response.complete = true;
        }
        catch (e) {
            response.success = false;
            response.error = e;
            response.complete = false;
        }
        finally {
            sendResponse(response);
        }
    }
    return true;
}));
//
// --- VIEW METHODS ------------------------------------------
//
/************************************************
 * Insert sidebar ExTranscript
 * And clear previoud ExTranscript.
 * */
const renderSidebarTranscript = () => {
    console.log('[controller] Rerender sidebar ExTranscript');
    const { subtitles } = sSubtitles.getState();
    _bottomTranscriptView__WEBPACK_IMPORTED_MODULE_1__["default"].clear();
    _sidebarTranscriptView__WEBPACK_IMPORTED_MODULE_0__["default"].clear();
    _sidebarTranscriptView__WEBPACK_IMPORTED_MODULE_0__["default"].render(subtitles);
    _sidebarTranscriptView__WEBPACK_IMPORTED_MODULE_0__["default"].updateContentHeight();
    // sidebarの時だけに必要
    window.addEventListener('scroll', onWindowScrollHandler);
};
/************************************************
 * Insert bttom ExTranscript
 * And clear previoud ExTranscript.
 * */
const renderBottomTranscript = () => {
    console.log('[controller] Rerender bottom ExTranscript');
    const { subtitles } = sSubtitles.getState();
    _sidebarTranscriptView__WEBPACK_IMPORTED_MODULE_0__["default"].clear();
    _bottomTranscriptView__WEBPACK_IMPORTED_MODULE_1__["default"].clear();
    _bottomTranscriptView__WEBPACK_IMPORTED_MODULE_1__["default"].render(subtitles);
    // noSidebarの時は不要
    window.removeEventListener('scroll', onWindowScrollHandler);
};
//
// --- HANDLERS ----------------------------------------------
//
/************************************************
 * Reduction of onWindowResizeHandler()
 *
 * Delays reaction of window resize.
 * */
const reductionOfwindowResizeHandler = () => {
    clearTimeout(timerQueue);
    timerQueue = setTimeout(onWindowResizeHandler, _utils_constants__WEBPACK_IMPORTED_MODULE_3__.RESIZE_TIMER);
};
/************************************************
 * Handler of Turning off ExTranscript.
 *
 *
 * */
const handlerOfTurnOff = () => {
    console.log('[controller] handlerOfTurnOff()');
    // REMOVAL Listeners
    window.removeEventListener('resize', reductionOfwindowResizeHandler);
    window.removeEventListener('scroll', onWindowScrollHandler);
    // CLEAR ExTranscript
    const { position } = sStatus.getState();
    if (position === _utils_constants__WEBPACK_IMPORTED_MODULE_3__.positionStatus.sidebar) {
        _sidebarTranscriptView__WEBPACK_IMPORTED_MODULE_0__["default"].clear();
    }
    else {
        _bottomTranscriptView__WEBPACK_IMPORTED_MODULE_1__["default"].clear();
    }
    // REMOVAL MutationObserver
    transcriptListObserver.disconnect();
    // RESET State
    sStatus.setState(Object.assign({}, statusBase));
    sSubtitles.setState(Object.assign({}, subtitleBase));
};
/**************************************************
 * Handler of Reset ExTranscript.
 *
 *
 * */
const handlerOfReset = () => {
    console.log('[controller] handlerOfReset()');
    handlerOfTurnOff();
    // NOTE: 以下はMAINの後半の処理と同じである
    const w = document.documentElement.clientWidth;
    const s = w > _utils_constants__WEBPACK_IMPORTED_MODULE_3__.RESIZE_BOUNDARY ? _utils_constants__WEBPACK_IMPORTED_MODULE_3__.positionStatus.sidebar : _utils_constants__WEBPACK_IMPORTED_MODULE_3__.positionStatus.noSidebar;
    sStatus.setState({ position: s });
    if (s === _utils_constants__WEBPACK_IMPORTED_MODULE_3__.positionStatus.sidebar) {
        sStatus.setState({
            view: w > _utils_constants__WEBPACK_IMPORTED_MODULE_3__.SIDEBAR_WIDTH_BOUNDARY
                ? _utils_constants__WEBPACK_IMPORTED_MODULE_3__.viewStatusNames.wideView
                : _utils_constants__WEBPACK_IMPORTED_MODULE_3__.viewStatusNames.middleView,
        });
    }
    window.addEventListener('resize', reductionOfwindowResizeHandler);
};
/**********************************************************
 * OnScroll handler for sidebar ExTranscript.
 *
 * */
const onWindowScrollHandler = () => {
    console.log('[controller] onWindowScrollHandler()');
    const y = window.scrollY;
    y < 56
        ? _sidebarTranscriptView__WEBPACK_IMPORTED_MODULE_0__["default"].updateContentTop(56 - y)
        : _sidebarTranscriptView__WEBPACK_IMPORTED_MODULE_0__["default"].updateContentTop(0);
};
/*************************************************************
 * window onResize handler.
 *
 * Checks...
 * If window clientWidth straddle the MINIMUM_BOUNDARY, update state.
 * If window clientWidth straddle the RESIZE_BOUNDARY, update state.
 * If ExTranscript is sidebar, check if window clientWidth straddble
 * the SIDEBAR_WIDTH_BOUNDARY to update view state.
 * */
const onWindowResizeHandler = () => {
    console.log('[controller] onWindowResizeHandler()');
    const w = document.documentElement.clientWidth;
    const { position, view, isWindowTooSmall } = sStatus.getState();
    //  MINIMUM_BOUNDARYの境界値をまたいだ時は何もしない
    if (w < MINIMUM_BOUNDARY && !isWindowTooSmall) {
        sStatus.setState({ isWindowTooSmall: true });
        return;
    }
    if (w > MINIMUM_BOUNDARY && isWindowTooSmall) {
        sStatus.setState({ isWindowTooSmall: false });
        return;
    }
    // ブラウザの幅がRESIZE_BOUNDARYを上回るとき
    // Transcriptをsidebarに設置する
    if (w > _utils_constants__WEBPACK_IMPORTED_MODULE_3__.RESIZE_BOUNDARY && position !== _utils_constants__WEBPACK_IMPORTED_MODULE_3__.positionStatus.sidebar) {
        sStatus.setState({ position: _utils_constants__WEBPACK_IMPORTED_MODULE_3__.positionStatus.sidebar });
        sStatus.setState({ view: _utils_constants__WEBPACK_IMPORTED_MODULE_3__.viewStatusNames.middleView });
        // 同時に、sidebar時のTranscriptの表示方法の変更
        sStatus.setState({
            view: w > _utils_constants__WEBPACK_IMPORTED_MODULE_3__.SIDEBAR_WIDTH_BOUNDARY
                ? _utils_constants__WEBPACK_IMPORTED_MODULE_3__.viewStatusNames.wideView
                : _utils_constants__WEBPACK_IMPORTED_MODULE_3__.viewStatusNames.middleView,
        });
    }
    // ブラウザの幅がRESIZE＿BOUNDARYを下回るとき
    // Transcriptを動画下部に表示する
    if (w < _utils_constants__WEBPACK_IMPORTED_MODULE_3__.RESIZE_BOUNDARY && position !== _utils_constants__WEBPACK_IMPORTED_MODULE_3__.positionStatus.noSidebar) {
        sStatus.setState({ position: _utils_constants__WEBPACK_IMPORTED_MODULE_3__.positionStatus.noSidebar });
    }
    // Transcriptがsidebarの時、
    // 2通りある表示方法を決定する
    if (position === _utils_constants__WEBPACK_IMPORTED_MODULE_3__.positionStatus.sidebar) {
        _sidebarTranscriptView__WEBPACK_IMPORTED_MODULE_0__["default"].updateContentHeight();
        if (view === _utils_constants__WEBPACK_IMPORTED_MODULE_3__.viewStatusNames.middleView && w > _utils_constants__WEBPACK_IMPORTED_MODULE_3__.SIDEBAR_WIDTH_BOUNDARY) {
            // sidebar widthを300pxから25%へ
            sStatus.setState({ view: _utils_constants__WEBPACK_IMPORTED_MODULE_3__.viewStatusNames.wideView });
        }
        if (view === _utils_constants__WEBPACK_IMPORTED_MODULE_3__.viewStatusNames.wideView && w < _utils_constants__WEBPACK_IMPORTED_MODULE_3__.SIDEBAR_WIDTH_BOUNDARY) {
            // sideba widthを25%から300pxへ
            sStatus.setState({ view: _utils_constants__WEBPACK_IMPORTED_MODULE_3__.viewStatusNames.middleView });
        }
    }
};
//
// ----- METHODS RELATED TO AUTO SCROLL -----------------------------
//
/***********************************************************************
 * Initialize sStatus.indexList
 *
 * sSubtitles.subtitlesのindex番号からなる配列を
 * sStatus.indexListとして保存する
 *
 * */
const initializeIndexList = () => {
    console.log('[controller] initializeIndexList()');
    const { subtitles } = sSubtitles.getState();
    const indexes = subtitles.map((s) => s.index);
    sStatus.setState({ indexList: indexes });
};
/************************************************************************
 * Returns the index number if the list contains an element.
 *
 * @param {NodeListOf<Element>} from: List of subtitles data.
 * @param {Element} lookFor: Check whether the element is contained in the array.
 * @return {number} Return -1 as element was not contained.
 *
 * @throws {Error}
 * If "lookFor" param was null, then an exception is thrown to prevent next step.
 *
 * TODO: -1を返す以外の方法ないかしら
 * もしくは-1をenumでラベル付けにするとか
 * */
/**
 * 例外発生検証結果：
 * 1. lookForがnullでfromが空でない配列だと、-1を返して、例外は発生しない
 * 2. 逆にfromがnullだとTypeErrorがgetElementIndexOfList()で発生する
 *
 *  */
const getElementIndexOfList = (from, lookFor) => {
    console.log('[controller] getElementIndexOfList()');
    var num = 0;
    for (const el of Array.from(from)) {
        if (el === lookFor)
            return num;
        num++;
    }
    // NOTE: ありえない値　一致するものがなかった場合
    return -1;
};
/*********************************************************************
 * Update sStatus.ExHighlight.
 * Invoked by MutationObserver
 * when Udemy highlighted element changed.
 *
 * 1. Get latest original highlighted element index.
 * 2. Check if the index number includes in sStaus.indexList.
 *    If not included,
 *    Sets the index closest to the current index number
 *    that is less than the "current highlight.
 *
 * NOTE: ExTranscript index list is different from Original index list.
 *
 * この関数はsStatus.ExHighlightを更新するための関数
 * sStatus更新内容をもとにレンダリング要素を更新するのは以下の関数で行う
 * updateExTranscriptHighlight()
 *
 * @throws {SyntaxError}:
 * SyntaxError possibly occures if DOM unable to caught.
 * @throws {RangeError}:
 * Thrown if getElementIndexOfList() returned -1 not to steps next.
 *
 *
 * */
const updateHighlightIndexes = () => {
    console.log('[controller] updateHighlightIndexes()');
    // １．本家のハイライト要素を取得して、その要素群の中での「順番」を保存する
    const nextHighlight = document.querySelector(_utils_selectors__WEBPACK_IMPORTED_MODULE_2__.transcript.highlight);
    const list = document.querySelectorAll(_utils_selectors__WEBPACK_IMPORTED_MODULE_2__.transcript.transcripts);
    const next = getElementIndexOfList(list, nextHighlight);
    if (next < 0)
        throw new RangeError("Returned value is out of range.");
    sStatus.setState({ highlight: next });
    // 2. 1で取得した「順番」がstate._subtitlesのindexと一致するか比較して、
    // ExTranscriptのハイライト要素の番号を保存する
    const { indexList } = sStatus.getState();
    if (indexList.includes(next)) {
        sStatus.setState({ ExHighlight: next });
    }
    else {
        // 一致するindexがない場合
        // currentHighlightの番号に最も近い、currentHighlightより小さいindexをsetする
        let prev = null;
        for (let i of indexList) {
            if (i > next) {
                sStatus.setState({ ExHighlight: prev });
                break;
            }
            prev = i;
        }
    }
};
/***************************************************************************
 * Update ExTranscript highlighted element.
 * Invoked by MutationObserver
 * just after updateHighlightIndexes().
 *
 * Update based on sStatus.ExHighlight.
 *
 * TODO: (対応)currentもnextもnullであってはならない場面でnullだとsyntaxerrorになる
 * */
const updateExTranscriptHighlight = () => {
    console.log('[controller] updateExTranscriptHighlight()');
    // 次ハイライトする要素のdata-idの番号
    const { ExHighlight, position } = sStatus.getState();
    const next = position === _utils_constants__WEBPACK_IMPORTED_MODULE_3__.positionStatus.sidebar
        ? document.querySelector(`${_utils_selectors__WEBPACK_IMPORTED_MODULE_2__.EX.sidebarCueContainer}[data-id="${ExHighlight}"]`)
        : document.querySelector(`${_utils_selectors__WEBPACK_IMPORTED_MODULE_2__.EX.dashboardTranscriptCueContainer}[data-id="${ExHighlight}"]`);
    // 現在のハイライト要素
    const current = position === _utils_constants__WEBPACK_IMPORTED_MODULE_3__.positionStatus.sidebar
        ? document.querySelector(`${_utils_selectors__WEBPACK_IMPORTED_MODULE_2__.EX.sidebarCueContainer}${_utils_selectors__WEBPACK_IMPORTED_MODULE_2__.EX.highlight}`)
        : document.querySelector(`${_utils_selectors__WEBPACK_IMPORTED_MODULE_2__.EX.dashboardTranscriptCueContainer}${_utils_selectors__WEBPACK_IMPORTED_MODULE_2__.EX.highlight}`);
    if (!current) {
        //   初期化時
        console.log('---- INITIALIZE -----');
        next.classList.add(_utils_selectors__WEBPACK_IMPORTED_MODULE_2__.EX.highlight.slice(1));
        console.log(next);
    }
    else {
        //   更新時
        const currentIndex = parseInt(current.getAttribute('data-id'));
        // もしも変わらないなら何もしない
        if (currentIndex === ExHighlight) {
            console.log('--- NO UPDATE ---');
            return;
        }
        // 更新ならば、前回のハイライト要素を解除して次の要素をハイライトさせる
        else {
            console.log('--- UPDATE ---');
            current.classList.remove(_utils_selectors__WEBPACK_IMPORTED_MODULE_2__.EX.highlight.slice(1));
            next.classList.add(_utils_selectors__WEBPACK_IMPORTED_MODULE_2__.EX.highlight.slice(1));
            console.log(next);
        }
    }
};
/********************************************************************
 * Reset MutationObserver API for detect scroll system.
 *
 * Reset based on sStatus.isAutroscrollInitialized.
 *
 * Udemyの自動スクロール機能と同じ機能をセットアップする関数
 *
 * NOTE: Udemyの字幕はまったく同じ字幕要素が2個も3個も生成されている
 *
 * つまりまったく同じ要素が同時に複数存在する状況が発生してしまっている
 * 多分バグだけど、同じ要素が何個も生成されてしまうとリスナが何度も
 * 反応してしまう可能性がある
 * MutationObserverのコールバック関数にはこれを避けるための仕組みを設けている
 *
 *
 * TODO: DOM transcriptList が取得できなくてもスルーされちゃうかも？
 *
 * 確認：`new MutationObserver()`の時にnullを渡したらSyntaxErrorになるかな？
 *
 * ***/
const resetDetectScroll = () => {
    console.log('[controller] reset Autro Scroll System');
    const { isAutoscrollInitialized } = sStatus.getState();
    if (!isAutoscrollInitialized) {
        // 初期化処理
        // 一旦リセットしてから
        if (transcriptListObserver) {
            transcriptListObserver.disconnect();
            transcriptListObserver = null;
        }
        //   NodeListOf HTMLSpanElement
        const transcriptList = document.querySelectorAll(_utils_selectors__WEBPACK_IMPORTED_MODULE_2__.transcript.transcripts);
        transcriptListObserver = new _utils_MutationObserver___WEBPACK_IMPORTED_MODULE_6__["default"](moCallback, moConfig, transcriptList);
        transcriptListObserver.observe();
        sStatus.setState({ isAutoscrollInitialized: true });
    }
    else {
        // リセット処理: targetを変更するだけ
        transcriptListObserver.disconnect();
        //   NodeListOf HTMLSpanElement
        const transcriptList = document.querySelectorAll(_utils_selectors__WEBPACK_IMPORTED_MODULE_2__.transcript.transcripts);
        transcriptListObserver._target = transcriptList;
        transcriptListObserver.observe();
    }
};
/*****************************************************************
 * Scroll to Highlight
 *
 * Make ExTranscript subtitle panel scroll to latest highlighted element.
 *
 * TODO: (対応) DOMが取得できなかったらSyntaxErrorが発生する
 * */
const scrollToHighlight = () => {
    console.log('[controller] scrollToHighlight()');
    // そのたびにいまハイライトしている要素を取得する
    const { ExHighlight, position } = sStatus.getState();
    const current = position === _utils_constants__WEBPACK_IMPORTED_MODULE_3__.positionStatus.sidebar
        ? document.querySelector(`${_utils_selectors__WEBPACK_IMPORTED_MODULE_2__.EX.sidebarCueContainer}[data-id="${ExHighlight}"]`)
        : document.querySelector(`${_utils_selectors__WEBPACK_IMPORTED_MODULE_2__.EX.dashboardTranscriptCueContainer}[data-id="${ExHighlight}"]`);
    const panel = position === _utils_constants__WEBPACK_IMPORTED_MODULE_3__.positionStatus.sidebar
        ? document.querySelector(_utils_selectors__WEBPACK_IMPORTED_MODULE_2__.EX.sidebarContent)
        : document.querySelector(_utils_selectors__WEBPACK_IMPORTED_MODULE_2__.EX.dashboardTranscriptPanel);
    const panelRect = panel.getBoundingClientRect();
    const currentRect = current.getBoundingClientRect();
    console.log(`currentRect.y: ${currentRect.y}`);
    console.log(`panelRect.y: ${panelRect.y}`);
    if (currentRect.y > panelRect.y) {
        const distance = currentRect.y - panelRect.y;
        panel.scrollTop = distance + panel.scrollTop;
    }
    else {
        if (currentRect.y > 0) {
            const distance = panelRect.y - currentRect.y;
            panel.scrollTop = panel.scrollTop - distance;
        }
        else {
            const distance = panelRect.y + Math.abs(currentRect.y);
            panel.scrollTop = panel.scrollTop - distance;
        }
    }
};
//
// --- UPDATE METHODS -----------------------------------
//
/**
 *  Update subtitles rendering.
 *
 * 常に受け取った字幕データ通りに再レンダリングさせる
 * 同時に、
 *
 * */
const updateSubtitle = (prop, prev) => {
    if (prop.subtitles === undefined)
        return;
    // 字幕データのアップデート
    const { position, view } = sStatus.getState();
    if (position === 'sidebar') {
        renderSidebarTranscript();
        _sidebarTranscriptView__WEBPACK_IMPORTED_MODULE_0__["default"].updateContentHeight();
        view === 'middleView'
            ? _sidebarTranscriptView__WEBPACK_IMPORTED_MODULE_0__["default"].updateWidth(_utils_constants__WEBPACK_IMPORTED_MODULE_3__.SIGNAL.widthStatus.middleview)
            : _sidebarTranscriptView__WEBPACK_IMPORTED_MODULE_0__["default"].updateWidth(_utils_constants__WEBPACK_IMPORTED_MODULE_3__.SIGNAL.widthStatus.wideview);
    }
    if (position === 'noSidebar') {
        renderBottomTranscript();
    }
    initializeIndexList();
    resetDetectScroll();
};
const updatePosition = (prop, prev) => {
    const { position } = prop;
    if (position === undefined)
        return;
    if (position === 'sidebar')
        renderSidebarTranscript();
    else if (position === 'noSidebar')
        renderBottomTranscript();
    // 必須：自動スクロール機能のリセット
    resetDetectScroll();
};
const updateSidebarView = (prop, prev) => {
    const { view } = prop;
    if (view === undefined)
        return;
    if (view === 'middleView')
        _sidebarTranscriptView__WEBPACK_IMPORTED_MODULE_0__["default"].updateWidth(_utils_constants__WEBPACK_IMPORTED_MODULE_3__.SIGNAL.widthStatus.middleview);
    else if (view === 'wideView')
        _sidebarTranscriptView__WEBPACK_IMPORTED_MODULE_0__["default"].updateWidth(_utils_constants__WEBPACK_IMPORTED_MODULE_3__.SIGNAL.widthStatus.wideview);
};
// NOTE: リファクタリング未定...
// const updateHighlight = (prop, prev): void => {
//   const { highlight } = prop;
//   if (highlight === undefined) return;
//   console.log("[controller] UPDATED Highlight");
// };
// NOTE: リファクタリング未定...
// const updateExHighlight = (prop, prev): void => {
//   const { highlight } = prop;
//   if (highlight === undefined) return;
//   console.log("[controller] UPDATED ExHighlight");
// };
/******************************************************
 * Entry Point
 *
 * */
(function () {
    console.log('[controller] Initializing...');
    const oStatus = new _utils_Observable__WEBPACK_IMPORTED_MODULE_4__["default"]();
    const oSubtitle = new _utils_Observable__WEBPACK_IMPORTED_MODULE_4__["default"]();
    sStatus = new _utils_contentScript_State__WEBPACK_IMPORTED_MODULE_5__["default"](statusBase, oStatus);
    sSubtitles = new _utils_contentScript_State__WEBPACK_IMPORTED_MODULE_5__["default"](subtitleBase, oSubtitle);
    sSubtitles.observable.register(updateSubtitle);
    sStatus.observable.register(updatePosition);
    sStatus.observable.register(updateSidebarView);
    //   TODO: (未定)下記update関数が機能するようにリファクタリングするかも...
    //   sStatus.observable.register(updateHighlight);
    //   sStatus.observable.register(updateExHighlight);
    // 初期のExTranscriptの展開場所に関するステータスを取得する
    const w = document.documentElement.clientWidth;
    const s = w > _utils_constants__WEBPACK_IMPORTED_MODULE_3__.RESIZE_BOUNDARY ? _utils_constants__WEBPACK_IMPORTED_MODULE_3__.positionStatus.sidebar : _utils_constants__WEBPACK_IMPORTED_MODULE_3__.positionStatus.noSidebar;
    sStatus.setState({ position: s });
    if (s === _utils_constants__WEBPACK_IMPORTED_MODULE_3__.positionStatus.sidebar) {
        sStatus.setState({
            view: w > _utils_constants__WEBPACK_IMPORTED_MODULE_3__.SIDEBAR_WIDTH_BOUNDARY
                ? _utils_constants__WEBPACK_IMPORTED_MODULE_3__.viewStatusNames.wideView
                : _utils_constants__WEBPACK_IMPORTED_MODULE_3__.viewStatusNames.middleView,
        });
    }
    sStatus.setState({ isWindowTooSmall: w < MINIMUM_BOUNDARY ? true : false });
    window.removeEventListener('resize', reductionOfwindowResizeHandler);
    window.addEventListener('resize', reductionOfwindowResizeHandler);
})();
//
// ---- LEGACY ----------------------------------------
//
// const init = async (): Promise<void> => {
//   try {
//     await sendMessagePromise({
//       from: extensionNames.controller,
//       to: extensionNames.background,
//       activated: true,
//     });
//     const temporary = state.loadSubtitles();
//     console.log(temporary);
//     const w: number = document.documentElement.clientWidth;
//     const s: keyof_positionStatus =
//       w > RESIZE_BOUNDARY
//         ? positionStatus.sidebar
//         : positionStatus.noSidebar;
//     state.setState({ position: s });
//     if (s === positionStatus.sidebar) {
//       renderSidebarTranscript();
//       sidebarTranscriptView.updateContentHeight();
//       if (w > SIDEBAR_WIDTH_BOUNDARY) {
//         state.setState({ view: viewStatusNames.wideView });
//         sidebarTranscriptView.updateWidth(SIGNAL.widthStatus.wideview);
//       } else {
//         state.setState({ view: viewStatusNames.middleView });
//         sidebarTranscriptView.updateWidth(SIGNAL.widthStatus.middleview);
//       }
//     } else {
//       renderBottomTranscript();
//     }
//     window.addEventListener("resize", function () {
//       clearTimeout(timerQueue);
//       timerQueue = setTimeout(onWindowResizeHandler, RESIZE_TIMER);
//     });
//     // --- ここまでで初期化完了 ---
//     // ViewにLoading画面を表示させる
//     // subtitlesをViewに表示準備できたら
//     // ViewのLoading画面を終了させる
//   } catch (err) {
//     if (err === chrome.runtime.lastError) {
//       console.error(err.message);
//     } else {
//       console.log(err);
//     }
//   }
// };
//
// init();
// /*
//     movieContainerClickHandler
//     _____________________________________
//     Udemyの講義ページで動画が再生開始したかどうかを判断する
//     これは一時停止かどうかではなく
//     ページのリロード時などに動画の上にリプレイボタンが表示されているかどうかである
//     リプレイボタン要素がなければ再生中という判断である
//     再生が始まったら初めて自動スクロール機能をセットできる
//     ...とおもったらclickイベントでbuttonがなくなったかチェックしようと思ったら
//     clickイベントが終わってからじゃにとbuttonは消去されないので
//     clickイベント中だと確認できない
//     MutationObserverつかうしかない？
// */
// const movieReplayClickHandler = (ev: PointerEvent): void => {
//   console.log("[controller] Movie clicked");
//   const movieContainer: HTMLElement = document.querySelector<HTMLElement>(
//     selectors.movieContainer
//   );
//   movieContainer.removeEventListener("click", movieReplayClickHandler);
//   //   set up auto scroll handling
//   //   initializeDetecting();
//   resetDetectScroll();
// };
// /*
//     resetDetectScroll()
//     ______________________________________
//     本家のハイライトされている字幕が、
//     自動スクロール機能で移り変わるたびに反応するオブザーバを生成する
//     12/7:
//     欲しいタイミングで発火していないみたい
//     _callbackの内容をMutationRecordを精査することで条件分岐させること
//     まず、Udemyは同じ字幕を2，3回繰り返し生成してしまうみたいで
//     つまりまったく同じ要素が同時に複数存在する状況が発生されてしまっている
//     これに伴って
//     MutationObserverのMutationRecordも複数ある要素のすべてを記録するので
//     1度だけ行いたい処理を2回以上行わなくてはならない危険性がある
//     これを避けるためにisItDoneで処理が既に完了しているのかどうかを確認するようにしている
// */
// const resetDetectScroll = (): void => {
//   const _callback = (mr: MutationRecord[]): void => {
//     console.log("observed");
//     var isItDone: boolean = false;
//     mr.forEach((record: MutationRecord) => {
//       if (
//         record.type === "attributes" &&
//         record.attributeName === "class" &&
//         record.oldValue === "" &&
//         !isItDone
//       ) {
//         // oldValueには""の時と、"ranscript--highlight-cue--1bEgq"の両方の時がある
//         // "ranscript--highlight-cue--1bEgq"をoldValueで受け取るときは
//         // ハイライトのclassをその要素からremoveしたときと考えて
//         // その時は何もしない
//         // 処理は1度だけになるように
//         console.log("-- observer executed --");
//         isItDone = true;
//         updateHighlightIndexes();
//         updateExTranscriptHighlight();
//         scrollToHighlight();
//       }
//     });
//   };
//   const observer: MutationObserver = new MutationObserver(_callback);
//   const config: MutationObserverInit = {
//     attributes: true,
//     childList: false,
//     subtree: false,
//     attributeOldValue: true,
//   };
//   //   NodeListOf HTMLSpanElement
//   const transcriptList: NodeListOf<Element> = document.querySelectorAll(
//     selectors.transcript.transcripts
//   );
//   transcriptList.forEach((ts) => {
//     observer.observe(ts, config);
//   });
// };
//
//     movieContainerClickHandler
//     _____________________________________
//     Udemyの講義ページで動画が再生開始したかどうかを判断する
//     これは一時停止かどうかではなく
//     ページのリロード時などに動画の上にリプレイボタンが表示されているかどうかである
//     リプレイボタン要素がなければ再生中という判断である
//     再生が始まったら初めて自動スクロール機能をセットできる
//     ...とおもったらclickイベントでbuttonがなくなったかチェックしようと思ったら
//     clickイベントが終わってからじゃにとbuttonは消去されないので
//     clickイベント中だと確認できない
//     MutationObserverつかうしかない？
//
// const movieReplayClickHandler = (ev: PointerEvent): void => {
//   console.log("[controller] Movie clicked");
//   const movieContainer: HTMLElement = document.querySelector<HTMLElement>(
//     selectors.transcript.movieContainer
//   );
//   movieContainer.removeEventListener("click", movieReplayClickHandler);
//   //   set up auto scroll handling
//   //   initializeDetecting();
//   resetDetectScroll();

})();

/******/ })()
;
//# sourceMappingURL=controller.js.map