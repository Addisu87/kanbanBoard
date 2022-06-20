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

/***/ "./api/KanbanAPI.js":
/*!**************************!*\
  !*** ./api/KanbanAPI.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ KanbanAPI)\n/* harmony export */ });\nclass KanbanAPI {\n  static getItems(columnId) {\n    const column = read().find((column) => column.id == columnId);\n\n    if (!column) {\n      return [];\n    }\n\n    return column.items;\n  }\n\n  static insertItem(columnId, content) {\n    const data = read();\n    const column = data.find((column) => column.id == columnId);\n    const item = {\n      id: Math.floor(Math.random() * 100000),\n      content\n    };\n\n    if (!column) {\n      throw new Error('Column does not exist.');\n    }\n\n    column.items.push(item);\n    save(data);\n\n    return item;\n  }\n\n  static updateItem(itemId, newProps) {\n    const data = read();\n    const [item, currentColumn] = (() => {\n      for (const column of data) {\n        const item = column.items.find((item) => item.id == itemId);\n\n        if (item) {\n          return [item, column];\n        }\n      }\n    })();\n\n    if (!item) {\n      throw new Error('Item not found.');\n    }\n\n    item.content =\n      newProps.content === undefined ? item.content : newProps.content;\n\n    // Update column and position\n    if (newProps.columnId !== undefined && newProps.position !== undefined) {\n      const targetColumn = data.find(\n        (column) => column.id == newProps.columnId\n      );\n\n      if (!targetColumn) {\n        throw new Error('Target column not found.');\n      }\n\n      // Delete the item from it's current column\n      currentColumn.items.splice(currentColumn.items.indexOf(item), 1);\n\n      // Move item into it's new column and position\n      targetColumn.items.splice(newProps.position, 0, item);\n    }\n\n    save(data);\n  }\n\n  static deleteItem(itemId) {\n    const data = read();\n\n    for (const column of data) {\n      const item = column.items.find((item) => item.id == itemId);\n\n      if (item) {\n        column.items.splice(column.items.indexOf(item), 1);\n      }\n    }\n\n    save(data);\n  }\n}\n\nfunction read() {\n  const json = localStorage.getItem('kanban-data');\n\n  if (!json) {\n    return [\n      {\n        id: 1,\n        items: []\n      },\n      {\n        id: 2,\n        items: []\n      },\n      {\n        id: 3,\n        items: []\n      }\n    ];\n  }\n\n  return JSON.parse(json);\n}\n\nfunction save(data) {\n  localStorage.setItem('kanban-data', JSON.stringify(data));\n}\n\n\n//# sourceURL=webpack://kanbandboard/./api/KanbanAPI.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _view_Kanban_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/Kanban.js */ \"./view/Kanban.js\");\n\n\nnew _view_Kanban_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](document.querySelector('.kanban'));\n\n\n//# sourceURL=webpack://kanbandboard/./src/index.js?");

/***/ }),

/***/ "./view/Column.js":
/*!************************!*\
  !*** ./view/Column.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Column)\n/* harmony export */ });\n/* harmony import */ var _api_KanbanAPI_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/KanbanAPI.js */ \"./api/KanbanAPI.js\");\n/* harmony import */ var _DropZone_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DropZone.js */ \"./view/DropZone.js\");\n/* harmony import */ var _Item_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Item.js */ \"./view/Item.js\");\n\n\n\n\nclass Column {\n  constructor(id, title) {\n    const topDropZone = _DropZone_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].createDropZone();\n\n    this.elements = {};\n    this.elements.root = Column.createRoot();\n    this.elements.title = this.elements.root.querySelector(\n      '.kanban__column-title'\n    );\n    this.elements.items = this.elements.root.querySelector(\n      '.kanban__column-items'\n    );\n    this.elements.addItem =\n      this.elements.root.querySelector('.kanban__add-item');\n\n    this.elements.root.dataset.id = id;\n    this.elements.title.textContent = title;\n    this.elements.items.appendChild(topDropZone);\n\n    this.elements.addItem.addEventListener('click', () => {\n      const newItem = _api_KanbanAPI_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].insertItem(id, '');\n\n      this.renderItem(newItem);\n    });\n\n    _api_KanbanAPI_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getItems(id).forEach((item) => {\n      this.renderItem(item);\n    });\n  }\n\n  static createRoot() {\n    const range = document.createRange();\n\n    range.selectNode(document.body);\n\n    return range.createContextualFragment(`\n\t\t\t<div class=\"kanban__column\">\n\t\t\t\t<div class=\"kanban__column-title\"></div>\n\t\t\t\t<div class=\"kanban__column-items\"></div>\n\t\t\t\t<button class=\"kanban__add-item\" type=\"button\">+ Add</button>\n\t\t\t</div>\n\t\t`).children[0];\n  }\n\n  renderItem(data) {\n    const item = new _Item_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](data.id, data.content);\n\n    this.elements.items.appendChild(item.elements.root);\n  }\n}\n\n\n//# sourceURL=webpack://kanbandboard/./view/Column.js?");

/***/ }),

/***/ "./view/DropZone.js":
/*!**************************!*\
  !*** ./view/DropZone.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ DropZone)\n/* harmony export */ });\n/* harmony import */ var _api_KanbanAPI_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/KanbanAPI.js */ \"./api/KanbanAPI.js\");\n\n\nclass DropZone {\n  static createDropZone() {\n    const range = document.createRange();\n\n    range.selectNode(document.body);\n\n    const dropZone = range.createContextualFragment(`\n\t\t\t<div class=\"kanban__dropzone\"></div>\n\t\t`).children[0];\n\n    dropZone.addEventListener('dragover', (e) => {\n      e.preventDefault();\n      dropZone.classList.add('kanban__dropzone--active');\n    });\n\n    dropZone.addEventListener('dragleave', () => {\n      dropZone.classList.remove('kanban__dropzone--active');\n    });\n\n    dropZone.addEventListener('drop', (e) => {\n      e.preventDefault();\n      dropZone.classList.remove('kanban__dropzone--active');\n\n      const columnElement = dropZone.closest('.kanban__column');\n      const columnId = Number(columnElement.dataset.id);\n      const dropZonesInColumn = Array.from(\n        columnElement.querySelectorAll('.kanban__dropzone')\n      );\n      const droppedIndex = dropZonesInColumn.indexOf(dropZone);\n      const itemId = Number(e.dataTransfer.getData('text/plain'));\n      const droppedItemElement = document.querySelector(\n        `[data-id=\"${itemId}\"]`\n      );\n      const insertAfter = dropZone.parentElement.classList.contains(\n        'kanban__item'\n      )\n        ? dropZone.parentElement\n        : dropZone;\n\n      // protect bugs\n      if (droppedItemElement.contains(dropZone)) {\n        return;\n      }\n\n      insertAfter.after(droppedItemElement);\n      _api_KanbanAPI_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].updateItem(itemId, {\n        columnId,\n        position: droppedIndex\n      });\n    });\n\n    return dropZone;\n  }\n}\n\n\n//# sourceURL=webpack://kanbandboard/./view/DropZone.js?");

/***/ }),

/***/ "./view/Item.js":
/*!**********************!*\
  !*** ./view/Item.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Item)\n/* harmony export */ });\n/* harmony import */ var _DropZone_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DropZone.js */ \"./view/DropZone.js\");\n/* harmony import */ var _api_KanbanAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/KanbanAPI.js */ \"./api/KanbanAPI.js\");\n\n\n\nclass Item {\n  constructor(id, content) {\n    const bottomDropZone = _DropZone_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createDropZone();\n\n    this.elements = {};\n    this.elements.root = Item.createRoot();\n    this.elements.input = this.elements.root.querySelector(\n      '.kanban__item-input'\n    );\n\n    this.elements.root.dataset.id = id;\n    this.elements.input.textContent = content;\n    this.content = content;\n    this.elements.root.appendChild(bottomDropZone);\n\n    const onBlur = () => {\n      const newContent = this.elements.input.textContent.trim();\n\n      if (newContent == this.content) {\n        return;\n      }\n\n      this.content = newContent;\n\n      _api_KanbanAPI_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].updateItem(id, {\n        content: this.content\n      });\n    };\n\n    this.elements.input.addEventListener('blur', onBlur);\n    this.elements.root.addEventListener('dblclick', () => {\n      const check = confirm('Are you sure you want to delete this item?');\n\n      if (check) {\n        _api_KanbanAPI_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].deleteItem(id);\n\n        this.elements.input.removeEventListener('blur', onBlur);\n        this.elements.root.parentElement.removeChild(this.elements.root);\n      }\n    });\n\n    this.elements.root.addEventListener('dragstart', (e) => {\n      e.dataTransfer.setData('text/plain', id);\n    });\n\n    this.elements.input.addEventListener('drop', (e) => {\n      e.preventDefault();\n    });\n  }\n\n  static createRoot() {\n    const range = document.createRange();\n\n    range.selectNode(document.body);\n\n    return range.createContextualFragment(`\n\t\t\t<div class=\"kanban__item\" draggable=\"true\">\n\t\t\t\t<div class=\"kanban__item-input\" contenteditable></div>\n\t\t\t</div>\n\t\t`).children[0];\n  }\n}\n\n\n//# sourceURL=webpack://kanbandboard/./view/Item.js?");

/***/ }),

/***/ "./view/Kanban.js":
/*!************************!*\
  !*** ./view/Kanban.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Kanban)\n/* harmony export */ });\n/* harmony import */ var _Column_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Column.js */ \"./view/Column.js\");\n\n\nclass Kanban {\n  constructor(root) {\n    this.root = root;\n\n    Kanban.columns().forEach((column) => {\n      const columnView = new _Column_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](column.id, column.title);\n\n      this.root.appendChild(columnView.elements.root);\n    });\n  }\n\n  static columns() {\n    return [\n      {\n        id: 1,\n        title: 'Not Started'\n      },\n      {\n        id: 2,\n        title: 'In Progress'\n      },\n      {\n        id: 3,\n        title: 'Completed'\n      }\n    ];\n  }\n}\n\n\n//# sourceURL=webpack://kanbandboard/./view/Kanban.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;