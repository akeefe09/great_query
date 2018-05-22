/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html(arg) {
    if (typeof arg === "string") {
      this.nodes.forEach(node => {
        node.innerHTML = arg;
      });
    } else {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.nodes.forEach((node) => {
      node.innerHTML = '';
    });
  }

  append(children) {
    if (children instanceof DOMNodeCollection) {
      this.nodes.forEach(node => {
        children.nodes.forEach((childNode) => {
          node.appendChild(child.cloneNode(true));
        });
      });
    } else if (typeof children === "string") {
      this.nodes.forEach((node) => {
        node.innerHTML += children;
      });
    } else {
      return;
    }
  }

  children() {
    let childNodes = [];
    this.nodes.forEach((node) => {
      childNodes = childNodes.concat(Array.from(node.children));
    });
    return new DOMNodeCollection(childNodes);
  }

  parentals() {
    let parentsArray = [];
    this.nodes.forEach((node) => {
      if(!parentsArray.includes(node.parentNode)) {
        parentsArray.push(node.parentNode);
      }
    });
    return new DOMNodeCollection(parentsArray);
  }

  find(selector) {
    let found = [];
    for (let i = 0; i < this.nodes.length; i++) {
      const foundNode = Array.from(this.nodes[i].querySelectorAll(selector));
      found = found.concat(Array.from(foundNode));
    }
    return new DOMNodeCollection(found);
  }

  remove() {
    this.nodes.forEach((node) => {
      node.parentNode.removeChild(node);
    });
  }

  removeClass(classArg) {
    this.nodes.forEach((node) => {
      node.classList.remove(classArg);
    });
  }

  addClass(classArg) {
    this.nodes.forEach((node) => {
      node.classList.add(classArg);
    });
  }

  toggleClass(classArg) {
    this.nodes.forEach((node) => {
      node.classList.toggle(classArg);
    });
  };

  attr(attribute, property) {
    if (!property) {
      return this.nodes[0].getAttribute(attribute);
    } else if(typeof property === "string") {
      return this.nodes[0].setAttribute(attribute, property);
    }
  }

  on(e, fn) {
    this.nodes.forEach((node) => {
      node.addEventListener(e, fn);
    });
  }

  off(e, fn) {
    
  }

}

module.exports = DOMNodeCollection;


/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection */ "./lib/dom_node_collection.js");

window.$l = (arg) => {
  switch (typeof arg) {
    case "string":
      return getNodesFromDom(arg);
    case HTMLElement:
      return new DOMNodeCollection(arg);
    default:

  }
};

const getNodesFromDom = (selector) => {
  const nodes = document.querySelectorAll(selector);
  const nodesArray = Array.from(nodes);
  return new DOMNodeCollection(nodesArray);
};


/***/ })

/******/ });
//# sourceMappingURL=jquery_lite.js.map