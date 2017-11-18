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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 136);
/******/ })
/************************************************************************/
/******/ ({

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(137);


/***/ }),

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

try {
    window.$ = window.jQuery = __webpack_require__(8);

    __webpack_require__(138);
} catch (e) {}

var formatoRut = function formatoRut() {
    var $this = $(this);
    $this.on('change', function (e) {
        var val = this.value.replace(/[\.\-A-Ja-jL-Zl-z]/g, '');
        if (val.length > 1) {
            val = val.split('').reverse().join('');
            var dv = val.substring(0, 1);
            var r = val.substring(1);
            r = r.replace(/(\d{3})/g, '$1.').split('').reverse().join('').replace(/^\./, '');
            val = r + '-' + dv;
        }
        this.value = val;
    });
};

$(function () {
    $('.tooltipped').tooltip();
    $('.ci-field').each(formatoRut);
});

/***/ }),

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Materialize v1.0.0-alpha.1 (http://materializecss.com)
 * Copyright 2014-2017 Materialize
 * MIT License (https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE)
 */
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*! cash-dom 1.3.5, https://github.com/kenwheeler/cash @license MIT */
(function (factory) {
  window.cash = factory();
})(function () {
  var doc = document,
      win = window,
      ArrayProto = Array.prototype,
      slice = ArrayProto.slice,
      filter = ArrayProto.filter,
      push = ArrayProto.push;

  var noop = function () {},
      isFunction = function (item) {
    // @see https://crbug.com/568448
    return typeof item === typeof noop && item.call;
  },
      isString = function (item) {
    return typeof item === typeof "";
  };

  var idMatch = /^#[\w-]*$/,
      classMatch = /^\.[\w-]*$/,
      htmlMatch = /<.+>/,
      singlet = /^\w+$/;

  function find(selector, context) {
    context = context || doc;
    var elems = classMatch.test(selector) ? context.getElementsByClassName(selector.slice(1)) : singlet.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector);
    return elems;
  }

  var frag;
  function parseHTML(str) {
    if (!frag) {
      frag = doc.implementation.createHTMLDocument();
      var base = frag.createElement("base");
      base.href = doc.location.href;
      frag.head.appendChild(base);
    }

    frag.body.innerHTML = str;

    return frag.body.childNodes;
  }

  function onReady(fn) {
    if (doc.readyState !== "loading") {
      fn();
    } else {
      doc.addEventListener("DOMContentLoaded", fn);
    }
  }

  function Init(selector, context) {
    if (!selector) {
      return this;
    }

    // If already a cash collection, don't do any further processing
    if (selector.cash && selector !== win) {
      return selector;
    }

    var elems = selector,
        i = 0,
        length;

    if (isString(selector)) {
      elems = idMatch.test(selector) ?
      // If an ID use the faster getElementById check
      doc.getElementById(selector.slice(1)) : htmlMatch.test(selector) ?
      // If HTML, parse it into real elements
      parseHTML(selector) :
      // else use `find`
      find(selector, context);

      // If function, use as shortcut for DOM ready
    } else if (isFunction(selector)) {
      onReady(selector);return this;
    }

    if (!elems) {
      return this;
    }

    // If a single DOM element is passed in or received via ID, return the single element
    if (elems.nodeType || elems === win) {
      this[0] = elems;
      this.length = 1;
    } else {
      // Treat like an array and loop through each item.
      length = this.length = elems.length;
      for (; i < length; i++) {
        this[i] = elems[i];
      }
    }

    return this;
  }

  function cash(selector, context) {
    return new Init(selector, context);
  }

  var fn = cash.fn = cash.prototype = Init.prototype = { // jshint ignore:line
    cash: true,
    length: 0,
    push: push,
    splice: ArrayProto.splice,
    map: ArrayProto.map,
    init: Init
  };

  Object.defineProperty(fn, "constructor", { value: cash });

  cash.parseHTML = parseHTML;
  cash.noop = noop;
  cash.isFunction = isFunction;
  cash.isString = isString;

  cash.extend = fn.extend = function (target) {
    target = target || {};

    var args = slice.call(arguments),
        length = args.length,
        i = 1;

    if (args.length === 1) {
      target = this;
      i = 0;
    }

    for (; i < length; i++) {
      if (!args[i]) {
        continue;
      }
      for (var key in args[i]) {
        if (args[i].hasOwnProperty(key)) {
          target[key] = args[i][key];
        }
      }
    }

    return target;
  };

  function each(collection, callback) {
    var l = collection.length,
        i = 0;

    for (; i < l; i++) {
      if (callback.call(collection[i], collection[i], i, collection) === false) {
        break;
      }
    }
  }

  function matches(el, selector) {
    var m = el && (el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector || el.oMatchesSelector);
    return !!m && m.call(el, selector);
  }

  function getCompareFunction(selector) {
    return (
      /* Use browser's `matches` function if string */
      isString(selector) ? matches :
      /* Match a cash element */
      selector.cash ? function (el) {
        return selector.is(el);
      } :
      /* Direct comparison */
      function (el, selector) {
        return el === selector;
      }
    );
  }

  function unique(collection) {
    return cash(slice.call(collection).filter(function (item, index, self) {
      return self.indexOf(item) === index;
    }));
  }

  cash.extend({
    merge: function (first, second) {
      var len = +second.length,
          i = first.length,
          j = 0;

      for (; j < len; i++, j++) {
        first[i] = second[j];
      }

      first.length = i;
      return first;
    },

    each: each,
    matches: matches,
    unique: unique,
    isArray: Array.isArray,
    isNumeric: function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

  });

  var uid = cash.uid = "_cash" + Date.now();

  function getDataCache(node) {
    return node[uid] = node[uid] || {};
  }

  function setData(node, key, value) {
    return getDataCache(node)[key] = value;
  }

  function getData(node, key) {
    var c = getDataCache(node);
    if (c[key] === undefined) {
      c[key] = node.dataset ? node.dataset[key] : cash(node).attr("data-" + key);
    }
    return c[key];
  }

  function removeData(node, key) {
    var c = getDataCache(node);
    if (c) {
      delete c[key];
    } else if (node.dataset) {
      delete node.dataset[key];
    } else {
      cash(node).removeAttr("data-" + name);
    }
  }

  fn.extend({
    data: function (name, value) {
      if (isString(name)) {
        return value === undefined ? getData(this[0], name) : this.each(function (v) {
          return setData(v, name, value);
        });
      }

      for (var key in name) {
        this.data(key, name[key]);
      }

      return this;
    },

    removeData: function (key) {
      return this.each(function (v) {
        return removeData(v, key);
      });
    }

  });

  var notWhiteMatch = /\S+/g;

  function getClasses(c) {
    return isString(c) && c.match(notWhiteMatch);
  }

  function hasClass(v, c) {
    return v.classList ? v.classList.contains(c) : new RegExp("(^| )" + c + "( |$)", "gi").test(v.className);
  }

  function addClass(v, c, spacedName) {
    if (v.classList) {
      v.classList.add(c);
    } else if (spacedName.indexOf(" " + c + " ")) {
      v.className += " " + c;
    }
  }

  function removeClass(v, c) {
    if (v.classList) {
      v.classList.remove(c);
    } else {
      v.className = v.className.replace(c, "");
    }
  }

  fn.extend({
    addClass: function (c) {
      var classes = getClasses(c);

      return classes ? this.each(function (v) {
        var spacedName = " " + v.className + " ";
        each(classes, function (c) {
          addClass(v, c, spacedName);
        });
      }) : this;
    },

    attr: function (name, value) {
      if (!name) {
        return undefined;
      }

      if (isString(name)) {
        if (value === undefined) {
          return this[0] ? this[0].getAttribute ? this[0].getAttribute(name) : this[0][name] : undefined;
        }

        return this.each(function (v) {
          if (v.setAttribute) {
            v.setAttribute(name, value);
          } else {
            v[name] = value;
          }
        });
      }

      for (var key in name) {
        this.attr(key, name[key]);
      }

      return this;
    },

    hasClass: function (c) {
      var check = false,
          classes = getClasses(c);
      if (classes && classes.length) {
        this.each(function (v) {
          check = hasClass(v, classes[0]);
          return !check;
        });
      }
      return check;
    },

    prop: function (name, value) {
      if (isString(name)) {
        return value === undefined ? this[0][name] : this.each(function (v) {
          v[name] = value;
        });
      }

      for (var key in name) {
        this.prop(key, name[key]);
      }

      return this;
    },

    removeAttr: function (name) {
      return this.each(function (v) {
        if (v.removeAttribute) {
          v.removeAttribute(name);
        } else {
          delete v[name];
        }
      });
    },

    removeClass: function (c) {
      if (!arguments.length) {
        return this.attr("class", "");
      }
      var classes = getClasses(c);
      return classes ? this.each(function (v) {
        each(classes, function (c) {
          removeClass(v, c);
        });
      }) : this;
    },

    removeProp: function (name) {
      return this.each(function (v) {
        delete v[name];
      });
    },

    toggleClass: function (c, state) {
      if (state !== undefined) {
        return this[state ? "addClass" : "removeClass"](c);
      }
      var classes = getClasses(c);
      return classes ? this.each(function (v) {
        var spacedName = " " + v.className + " ";
        each(classes, function (c) {
          if (hasClass(v, c)) {
            removeClass(v, c);
          } else {
            addClass(v, c, spacedName);
          }
        });
      }) : this;
    } });

  fn.extend({
    add: function (selector, context) {
      return unique(cash.merge(this, cash(selector, context)));
    },

    each: function (callback) {
      each(this, callback);
      return this;
    },

    eq: function (index) {
      return cash(this.get(index));
    },

    filter: function (selector) {
      if (!selector) {
        return this;
      }

      var comparator = isFunction(selector) ? selector : getCompareFunction(selector);

      return cash(filter.call(this, function (e) {
        return comparator(e, selector);
      }));
    },

    first: function () {
      return this.eq(0);
    },

    get: function (index) {
      if (index === undefined) {
        return slice.call(this);
      }
      return index < 0 ? this[index + this.length] : this[index];
    },

    index: function (elem) {
      var child = elem ? cash(elem)[0] : this[0],
          collection = elem ? this : cash(child).parent().children();
      return slice.call(collection).indexOf(child);
    },

    last: function () {
      return this.eq(-1);
    }

  });

  var camelCase = function () {
    var camelRegex = /(?:^\w|[A-Z]|\b\w)/g,
        whiteSpace = /[\s-_]+/g;
    return function (str) {
      return str.replace(camelRegex, function (letter, index) {
        return letter[index === 0 ? "toLowerCase" : "toUpperCase"]();
      }).replace(whiteSpace, "");
    };
  }();

  var getPrefixedProp = function () {
    var cache = {},
        doc = document,
        div = doc.createElement("div"),
        style = div.style;

    return function (prop) {
      prop = camelCase(prop);
      if (cache[prop]) {
        return cache[prop];
      }

      var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
          prefixes = ["webkit", "moz", "ms", "o"],
          props = (prop + " " + prefixes.join(ucProp + " ") + ucProp).split(" ");

      each(props, function (p) {
        if (p in style) {
          cache[p] = prop = cache[prop] = p;
          return false;
        }
      });

      return cache[prop];
    };
  }();

  cash.prefixedProp = getPrefixedProp;
  cash.camelCase = camelCase;

  fn.extend({
    css: function (prop, value) {
      if (isString(prop)) {
        prop = getPrefixedProp(prop);
        return arguments.length > 1 ? this.each(function (v) {
          return v.style[prop] = value;
        }) : win.getComputedStyle(this[0])[prop];
      }

      for (var key in prop) {
        this.css(key, prop[key]);
      }

      return this;
    }

  });

  function compute(el, prop) {
    return parseInt(win.getComputedStyle(el[0], null)[prop], 10) || 0;
  }

  each(["Width", "Height"], function (v) {
    var lower = v.toLowerCase();

    fn[lower] = function () {
      return this[0].getBoundingClientRect()[lower];
    };

    fn["inner" + v] = function () {
      return this[0]["client" + v];
    };

    fn["outer" + v] = function (margins) {
      return this[0]["offset" + v] + (margins ? compute(this, "margin" + (v === "Width" ? "Left" : "Top")) + compute(this, "margin" + (v === "Width" ? "Right" : "Bottom")) : 0);
    };
  });

  function registerEvent(node, eventName, callback) {
    var eventCache = getData(node, "_cashEvents") || setData(node, "_cashEvents", {});
    eventCache[eventName] = eventCache[eventName] || [];
    eventCache[eventName].push(callback);
    node.addEventListener(eventName, callback);
  }

  function removeEvent(node, eventName, callback) {
    var events = getData(node, "_cashEvents"),
        eventCache = events && events[eventName],
        index;

    if (!eventCache) {
      return;
    }

    if (callback) {
      node.removeEventListener(eventName, callback);
      index = eventCache.indexOf(callback);
      if (index >= 0) {
        eventCache.splice(index, 1);
      }
    } else {
      each(eventCache, function (event) {
        node.removeEventListener(eventName, event);
      });
      eventCache = [];
    }
  }

  fn.extend({
    off: function (eventName, callback) {
      return this.each(function (v) {
        return removeEvent(v, eventName, callback);
      });
    },

    on: function (eventName, delegate, callback, runOnce) {
      // jshint ignore:line

      var originalCallback;

      if (!isString(eventName)) {
        for (var key in eventName) {
          this.on(key, delegate, eventName[key]);
        }
        return this;
      }

      if (isFunction(delegate)) {
        callback = delegate;
        delegate = null;
      }

      if (eventName === "ready") {
        onReady(callback);
        return this;
      }

      if (delegate) {
        originalCallback = callback;
        callback = function (e) {
          var t = e.target;

          while (!matches(t, delegate)) {
            if (t === this) {
              return t = false;
            }
            t = t.parentNode;
          }

          if (t) {
            originalCallback.call(t, e);
          }
        };
      }

      return this.each(function (v) {
        var finalCallback = callback;
        if (runOnce) {
          finalCallback = function () {
            callback.apply(this, arguments);
            removeEvent(v, eventName, finalCallback);
          };
        }
        registerEvent(v, eventName, finalCallback);
      });
    },

    one: function (eventName, delegate, callback) {
      return this.on(eventName, delegate, callback, true);
    },

    ready: onReady,

    /**
     * Modified
     * Triggers browser event
     * @param String eventName
     * @param Object data - Add properties to event object
     */
    trigger: function (eventName, data) {
      if (document.createEvent) {
        var evt = document.createEvent('HTMLEvents');
        evt.initEvent(eventName, true, false);
        evt = this.extend(evt, data);
        return this.each(function (v) {
          return v.dispatchEvent(evt);
        });
      }
    }

  });

  function encode(name, value) {
    return "&" + encodeURIComponent(name) + "=" + encodeURIComponent(value).replace(/%20/g, "+");
  }

  function getSelectMultiple_(el) {
    var values = [];
    each(el.options, function (o) {
      if (o.selected) {
        values.push(o.value);
      }
    });
    return values.length ? values : null;
  }

  function getSelectSingle_(el) {
    var selectedIndex = el.selectedIndex;
    return selectedIndex >= 0 ? el.options[selectedIndex].value : null;
  }

  function getValue(el) {
    var type = el.type;
    if (!type) {
      return null;
    }
    switch (type.toLowerCase()) {
      case "select-one":
        return getSelectSingle_(el);
      case "select-multiple":
        return getSelectMultiple_(el);
      case "radio":
        return el.checked ? el.value : null;
      case "checkbox":
        return el.checked ? el.value : null;
      default:
        return el.value ? el.value : null;
    }
  }

  fn.extend({
    serialize: function () {
      var query = "";

      each(this[0].elements || this, function (el) {
        if (el.disabled || el.tagName === "FIELDSET") {
          return;
        }
        var name = el.name;
        switch (el.type.toLowerCase()) {
          case "file":
          case "reset":
          case "submit":
          case "button":
            break;
          case "select-multiple":
            var values = getValue(el);
            if (values !== null) {
              each(values, function (value) {
                query += encode(name, value);
              });
            }
            break;
          default:
            var value = getValue(el);
            if (value !== null) {
              query += encode(name, value);
            }
        }
      });

      return query.substr(1);
    },

    val: function (value) {
      if (value === undefined) {
        return getValue(this[0]);
      } else {
        return this.each(function (v) {
          return v.value = value;
        });
      }
    }

  });

  function insertElement(el, child, prepend) {
    if (prepend) {
      var first = el.childNodes[0];
      el.insertBefore(child, first);
    } else {
      el.appendChild(child);
    }
  }

  function insertContent(parent, child, prepend) {
    var str = isString(child);

    if (!str && child.length) {
      each(child, function (v) {
        return insertContent(parent, v, prepend);
      });
      return;
    }

    each(parent, str ? function (v) {
      return v.insertAdjacentHTML(prepend ? "afterbegin" : "beforeend", child);
    } : function (v, i) {
      return insertElement(v, i === 0 ? child : child.cloneNode(true), prepend);
    });
  }

  fn.extend({
    after: function (selector) {
      cash(selector).insertAfter(this);
      return this;
    },

    append: function (content) {
      insertContent(this, content);
      return this;
    },

    appendTo: function (parent) {
      insertContent(cash(parent), this);
      return this;
    },

    before: function (selector) {
      cash(selector).insertBefore(this);
      return this;
    },

    clone: function () {
      return cash(this.map(function (v) {
        return v.cloneNode(true);
      }));
    },

    empty: function () {
      this.html("");
      return this;
    },

    html: function (content) {
      if (content === undefined) {
        return this[0].innerHTML;
      }
      var source = content.nodeType ? content[0].outerHTML : content;
      return this.each(function (v) {
        return v.innerHTML = source;
      });
    },

    insertAfter: function (selector) {
      var _this = this;

      cash(selector).each(function (el, i) {
        var parent = el.parentNode,
            sibling = el.nextSibling;
        _this.each(function (v) {
          parent.insertBefore(i === 0 ? v : v.cloneNode(true), sibling);
        });
      });

      return this;
    },

    insertBefore: function (selector) {
      var _this2 = this;
      cash(selector).each(function (el, i) {
        var parent = el.parentNode;
        _this2.each(function (v) {
          parent.insertBefore(i === 0 ? v : v.cloneNode(true), el);
        });
      });
      return this;
    },

    prepend: function (content) {
      insertContent(this, content, true);
      return this;
    },

    prependTo: function (parent) {
      insertContent(cash(parent), this, true);
      return this;
    },

    remove: function () {
      return this.each(function (v) {
        if (!!v.parentNode) {
          return v.parentNode.removeChild(v);
        }
      });
    },

    text: function (content) {
      if (content === undefined) {
        return this[0].textContent;
      }
      return this.each(function (v) {
        return v.textContent = content;
      });
    }

  });

  var docEl = doc.documentElement;

  fn.extend({
    position: function () {
      var el = this[0];
      return {
        left: el.offsetLeft,
        top: el.offsetTop
      };
    },

    offset: function () {
      var rect = this[0].getBoundingClientRect();
      return {
        top: rect.top + win.pageYOffset - docEl.clientTop,
        left: rect.left + win.pageXOffset - docEl.clientLeft
      };
    },

    offsetParent: function () {
      return cash(this[0].offsetParent);
    }

  });

  fn.extend({
    children: function (selector) {
      var elems = [];
      this.each(function (el) {
        push.apply(elems, el.children);
      });
      elems = unique(elems);

      return !selector ? elems : elems.filter(function (v) {
        return matches(v, selector);
      });
    },

    closest: function (selector) {
      if (!selector || this.length < 1) {
        return cash();
      }
      if (this.is(selector)) {
        return this.filter(selector);
      }
      return this.parent().closest(selector);
    },

    is: function (selector) {
      if (!selector) {
        return false;
      }

      var match = false,
          comparator = getCompareFunction(selector);

      this.each(function (el) {
        match = comparator(el, selector);
        return !match;
      });

      return match;
    },

    find: function (selector) {
      if (!selector || selector.nodeType) {
        return cash(selector && this.has(selector).length ? selector : null);
      }

      var elems = [];
      this.each(function (el) {
        push.apply(elems, find(selector, el));
      });

      return unique(elems);
    },

    has: function (selector) {
      var comparator = isString(selector) ? function (el) {
        return find(selector, el).length !== 0;
      } : function (el) {
        return el.contains(selector);
      };

      return this.filter(comparator);
    },

    next: function () {
      return cash(this[0].nextElementSibling);
    },

    not: function (selector) {
      if (!selector) {
        return this;
      }

      var comparator = getCompareFunction(selector);

      return this.filter(function (el) {
        return !comparator(el, selector);
      });
    },

    parent: function () {
      var result = [];

      this.each(function (item) {
        if (item && item.parentNode) {
          result.push(item.parentNode);
        }
      });

      return unique(result);
    },

    parents: function (selector) {
      var last,
          result = [];

      this.each(function (item) {
        last = item;

        while (last && last.parentNode && last !== doc.body.parentNode) {
          last = last.parentNode;

          if (!selector || selector && matches(last, selector)) {
            result.push(last);
          }
        }
      });

      return unique(result);
    },

    prev: function () {
      return cash(this[0].previousElementSibling);
    },

    siblings: function (selector) {
      var collection = this.parent().children(selector),
          el = this[0];

      return collection.filter(function (i) {
        return i !== el;
      });
    }

  });

  return cash;
});
; /*! VelocityJS.org (1.4.2). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */
/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */
!function (a) {
  "use strict";
  function b(a) {
    var b = a.length,
        d = c.type(a);return "function" !== d && !c.isWindow(a) && (!(1 !== a.nodeType || !b) || "array" === d || 0 === b || "number" == typeof b && b > 0 && b - 1 in a);
  }if (!a.jQuery) {
    var c = function (a, b) {
      return new c.fn.init(a, b);
    };c.isWindow = function (a) {
      return a && a === a.window;
    }, c.type = function (a) {
      return a ? "object" == typeof a || "function" == typeof a ? e[g.call(a)] || "object" : typeof a : a + "";
    }, c.isArray = Array.isArray || function (a) {
      return "array" === c.type(a);
    }, c.isPlainObject = function (a) {
      var b;if (!a || "object" !== c.type(a) || a.nodeType || c.isWindow(a)) return !1;try {
        if (a.constructor && !f.call(a, "constructor") && !f.call(a.constructor.prototype, "isPrototypeOf")) return !1;
      } catch (d) {
        return !1;
      }for (b in a) {}return void 0 === b || f.call(a, b);
    }, c.each = function (a, c, d) {
      var e,
          f = 0,
          g = a.length,
          h = b(a);if (d) {
        if (h) for (; f < g && (e = c.apply(a[f], d), e !== !1); f++) {} else for (f in a) {
          if (a.hasOwnProperty(f) && (e = c.apply(a[f], d), e === !1)) break;
        }
      } else if (h) for (; f < g && (e = c.call(a[f], f, a[f]), e !== !1); f++) {} else for (f in a) {
        if (a.hasOwnProperty(f) && (e = c.call(a[f], f, a[f]), e === !1)) break;
      }return a;
    }, c.data = function (a, b, e) {
      if (void 0 === e) {
        var f = a[c.expando],
            g = f && d[f];if (void 0 === b) return g;if (g && b in g) return g[b];
      } else if (void 0 !== b) {
        var h = a[c.expando] || (a[c.expando] = ++c.uuid);return d[h] = d[h] || {}, d[h][b] = e, e;
      }
    }, c.removeData = function (a, b) {
      var e = a[c.expando],
          f = e && d[e];f && (b ? c.each(b, function (a, b) {
        delete f[b];
      }) : delete d[e]);
    }, c.extend = function () {
      var a,
          b,
          d,
          e,
          f,
          g,
          h = arguments[0] || {},
          i = 1,
          j = arguments.length,
          k = !1;for ("boolean" == typeof h && (k = h, h = arguments[i] || {}, i++), "object" != typeof h && "function" !== c.type(h) && (h = {}), i === j && (h = this, i--); i < j; i++) {
        if (f = arguments[i]) for (e in f) {
          f.hasOwnProperty(e) && (a = h[e], d = f[e], h !== d && (k && d && (c.isPlainObject(d) || (b = c.isArray(d))) ? (b ? (b = !1, g = a && c.isArray(a) ? a : []) : g = a && c.isPlainObject(a) ? a : {}, h[e] = c.extend(k, g, d)) : void 0 !== d && (h[e] = d)));
        }
      }return h;
    }, c.queue = function (a, d, e) {
      function f(a, c) {
        var d = c || [];return a && (b(Object(a)) ? !function (a, b) {
          for (var c = +b.length, d = 0, e = a.length; d < c;) {
            a[e++] = b[d++];
          }if (c !== c) for (; void 0 !== b[d];) {
            a[e++] = b[d++];
          }return a.length = e, a;
        }(d, "string" == typeof a ? [a] : a) : [].push.call(d, a)), d;
      }if (a) {
        d = (d || "fx") + "queue";var g = c.data(a, d);return e ? (!g || c.isArray(e) ? g = c.data(a, d, f(e)) : g.push(e), g) : g || [];
      }
    }, c.dequeue = function (a, b) {
      c.each(a.nodeType ? [a] : a, function (a, d) {
        b = b || "fx";var e = c.queue(d, b),
            f = e.shift();"inprogress" === f && (f = e.shift()), f && ("fx" === b && e.unshift("inprogress"), f.call(d, function () {
          c.dequeue(d, b);
        }));
      });
    }, c.fn = c.prototype = { init: function (a) {
        if (a.nodeType) return this[0] = a, this;throw new Error("Not a DOM node.");
      }, offset: function () {
        var b = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : { top: 0, left: 0 };return { top: b.top + (a.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0), left: b.left + (a.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0) };
      }, position: function () {
        function a(a) {
          for (var b = a.offsetParent; b && "html" !== b.nodeName.toLowerCase() && b.style && "static" === b.style.position;) {
            b = b.offsetParent;
          }return b || document;
        }var b = this[0],
            d = a(b),
            e = this.offset(),
            f = /^(?:body|html)$/i.test(d.nodeName) ? { top: 0, left: 0 } : c(d).offset();return e.top -= parseFloat(b.style.marginTop) || 0, e.left -= parseFloat(b.style.marginLeft) || 0, d.style && (f.top += parseFloat(d.style.borderTopWidth) || 0, f.left += parseFloat(d.style.borderLeftWidth) || 0), { top: e.top - f.top, left: e.left - f.left };
      } };var d = {};c.expando = "velocity" + new Date().getTime(), c.uuid = 0;for (var e = {}, f = e.hasOwnProperty, g = e.toString, h = "Boolean Number String Function Array Date RegExp Object Error".split(" "), i = 0; i < h.length; i++) {
      e["[object " + h[i] + "]"] = h[i].toLowerCase();
    }c.fn.init.prototype = c.fn, a.Velocity = { Utilities: c };
  }
}(window), function (a) {
  "use strict";
  "object" == typeof module && "object" == typeof module.exports ? module.exports = a() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (a),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : a();
}(function () {
  "use strict";
  return function (a, b, c, d) {
    function e(a) {
      for (var b = -1, c = a ? a.length : 0, d = []; ++b < c;) {
        var e = a[b];e && d.push(e);
      }return d;
    }function f(a) {
      return t.isWrapped(a) ? a = s.call(a) : t.isNode(a) && (a = [a]), a;
    }function g(a) {
      var b = o.data(a, "velocity");return null === b ? d : b;
    }function h(a, b) {
      var c = g(a);c && c.delayTimer && !c.delayPaused && (c.delayRemaining = c.delay - b + c.delayBegin, c.delayPaused = !0, clearTimeout(c.delayTimer.setTimeout));
    }function i(a, b) {
      var c = g(a);c && c.delayTimer && c.delayPaused && (c.delayPaused = !1, c.delayTimer.setTimeout = setTimeout(c.delayTimer.next, c.delayRemaining));
    }function j(a) {
      return function (b) {
        return Math.round(b * a) * (1 / a);
      };
    }function k(a, c, d, e) {
      function f(a, b) {
        return 1 - 3 * b + 3 * a;
      }function g(a, b) {
        return 3 * b - 6 * a;
      }function h(a) {
        return 3 * a;
      }function i(a, b, c) {
        return ((f(b, c) * a + g(b, c)) * a + h(b)) * a;
      }function j(a, b, c) {
        return 3 * f(b, c) * a * a + 2 * g(b, c) * a + h(b);
      }function k(b, c) {
        for (var e = 0; e < p; ++e) {
          var f = j(c, a, d);if (0 === f) return c;var g = i(c, a, d) - b;c -= g / f;
        }return c;
      }function l() {
        for (var b = 0; b < t; ++b) {
          x[b] = i(b * u, a, d);
        }
      }function m(b, c, e) {
        var f,
            g,
            h = 0;do {
          g = c + (e - c) / 2, f = i(g, a, d) - b, f > 0 ? e = g : c = g;
        } while (Math.abs(f) > r && ++h < s);return g;
      }function n(b) {
        for (var c = 0, e = 1, f = t - 1; e !== f && x[e] <= b; ++e) {
          c += u;
        }--e;var g = (b - x[e]) / (x[e + 1] - x[e]),
            h = c + g * u,
            i = j(h, a, d);return i >= q ? k(b, h) : 0 === i ? h : m(b, c, c + u);
      }function o() {
        y = !0, a === c && d === e || l();
      }var p = 4,
          q = .001,
          r = 1e-7,
          s = 10,
          t = 11,
          u = 1 / (t - 1),
          v = "Float32Array" in b;if (4 !== arguments.length) return !1;for (var w = 0; w < 4; ++w) {
        if ("number" != typeof arguments[w] || isNaN(arguments[w]) || !isFinite(arguments[w])) return !1;
      }a = Math.min(a, 1), d = Math.min(d, 1), a = Math.max(a, 0), d = Math.max(d, 0);var x = v ? new Float32Array(t) : new Array(t),
          y = !1,
          z = function (b) {
        return y || o(), a === c && d === e ? b : 0 === b ? 0 : 1 === b ? 1 : i(n(b), c, e);
      };z.getControlPoints = function () {
        return [{ x: a, y: c }, { x: d, y: e }];
      };var A = "generateBezier(" + [a, c, d, e] + ")";return z.toString = function () {
        return A;
      }, z;
    }function l(a, b) {
      var c = a;return t.isString(a) ? x.Easings[a] || (c = !1) : c = t.isArray(a) && 1 === a.length ? j.apply(null, a) : t.isArray(a) && 2 === a.length ? y.apply(null, a.concat([b])) : !(!t.isArray(a) || 4 !== a.length) && k.apply(null, a), c === !1 && (c = x.Easings[x.defaults.easing] ? x.defaults.easing : w), c;
    }function m(a) {
      if (a) {
        var b = x.timestamp && a !== !0 ? a : r.now(),
            c = x.State.calls.length;c > 1e4 && (x.State.calls = e(x.State.calls), c = x.State.calls.length);for (var f = 0; f < c; f++) {
          if (x.State.calls[f]) {
            var h = x.State.calls[f],
                i = h[0],
                j = h[2],
                k = h[3],
                l = !!k,
                q = null,
                s = h[5],
                u = h[6];if (k || (k = x.State.calls[f][3] = b - 16), s) {
              if (s.resume !== !0) continue;k = h[3] = Math.round(b - u - 16), h[5] = null;
            }u = h[6] = b - k;for (var v = Math.min(u / j.duration, 1), w = 0, y = i.length; w < y; w++) {
              var A = i[w],
                  C = A.element;if (g(C)) {
                var D = !1;if (j.display !== d && null !== j.display && "none" !== j.display) {
                  if ("flex" === j.display) {
                    var E = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];o.each(E, function (a, b) {
                      z.setPropertyValue(C, "display", b);
                    });
                  }z.setPropertyValue(C, "display", j.display);
                }j.visibility !== d && "hidden" !== j.visibility && z.setPropertyValue(C, "visibility", j.visibility);for (var F in A) {
                  if (A.hasOwnProperty(F) && "element" !== F) {
                    var G,
                        H = A[F],
                        I = t.isString(H.easing) ? x.Easings[H.easing] : H.easing;if (t.isString(H.pattern)) {
                      var J = 1 === v ? function (a, b, c) {
                        var d = H.endValue[b];return c ? Math.round(d) : d;
                      } : function (a, b, c) {
                        var d = H.startValue[b],
                            e = H.endValue[b] - d,
                            f = d + e * I(v, j, e);return c ? Math.round(f) : f;
                      };G = H.pattern.replace(/{(\d+)(!)?}/g, J);
                    } else if (1 === v) G = H.endValue;else {
                      var K = H.endValue - H.startValue;G = H.startValue + K * I(v, j, K);
                    }if (!l && G === H.currentValue) continue;if (H.currentValue = G, "tween" === F) q = G;else {
                      var L;if (z.Hooks.registered[F]) {
                        L = z.Hooks.getRoot(F);var M = g(C).rootPropertyValueCache[L];M && (H.rootPropertyValue = M);
                      }var N = z.setPropertyValue(C, F, H.currentValue + (p < 9 && 0 === parseFloat(G) ? "" : H.unitType), H.rootPropertyValue, H.scrollData);z.Hooks.registered[F] && (z.Normalizations.registered[L] ? g(C).rootPropertyValueCache[L] = z.Normalizations.registered[L]("extract", null, N[1]) : g(C).rootPropertyValueCache[L] = N[1]), "transform" === N[0] && (D = !0);
                    }
                  }
                }j.mobileHA && g(C).transformCache.translate3d === d && (g(C).transformCache.translate3d = "(0px, 0px, 0px)", D = !0), D && z.flushTransformCache(C);
              }
            }j.display !== d && "none" !== j.display && (x.State.calls[f][2].display = !1), j.visibility !== d && "hidden" !== j.visibility && (x.State.calls[f][2].visibility = !1), j.progress && j.progress.call(h[1], h[1], v, Math.max(0, k + j.duration - b), k, q), 1 === v && n(f);
          }
        }
      }x.State.isTicking && B(m);
    }function n(a, b) {
      if (!x.State.calls[a]) return !1;for (var c = x.State.calls[a][0], e = x.State.calls[a][1], f = x.State.calls[a][2], h = x.State.calls[a][4], i = !1, j = 0, k = c.length; j < k; j++) {
        var l = c[j].element;b || f.loop || ("none" === f.display && z.setPropertyValue(l, "display", f.display), "hidden" === f.visibility && z.setPropertyValue(l, "visibility", f.visibility));var m = g(l);if (f.loop !== !0 && (o.queue(l)[1] === d || !/\.velocityQueueEntryFlag/i.test(o.queue(l)[1])) && m) {
          m.isAnimating = !1, m.rootPropertyValueCache = {};var n = !1;o.each(z.Lists.transforms3D, function (a, b) {
            var c = /^scale/.test(b) ? 1 : 0,
                e = m.transformCache[b];m.transformCache[b] !== d && new RegExp("^\\(" + c + "[^.]").test(e) && (n = !0, delete m.transformCache[b]);
          }), f.mobileHA && (n = !0, delete m.transformCache.translate3d), n && z.flushTransformCache(l), z.Values.removeClass(l, "velocity-animating");
        }if (!b && f.complete && !f.loop && j === k - 1) try {
          f.complete.call(e, e);
        } catch (p) {
          setTimeout(function () {
            throw p;
          }, 1);
        }h && f.loop !== !0 && h(e), m && f.loop === !0 && !b && (o.each(m.tweensContainer, function (a, b) {
          if (/^rotate/.test(a) && (parseFloat(b.startValue) - parseFloat(b.endValue)) % 360 === 0) {
            var c = b.startValue;b.startValue = b.endValue, b.endValue = c;
          }/^backgroundPosition/.test(a) && 100 === parseFloat(b.endValue) && "%" === b.unitType && (b.endValue = 0, b.startValue = 100);
        }), x(l, "reverse", { loop: !0, delay: f.delay })), f.queue !== !1 && o.dequeue(l, f.queue);
      }x.State.calls[a] = !1;for (var q = 0, r = x.State.calls.length; q < r; q++) {
        if (x.State.calls[q] !== !1) {
          i = !0;break;
        }
      }i === !1 && (x.State.isTicking = !1, delete x.State.calls, x.State.calls = []);
    }var o,
        p = function () {
      if (c.documentMode) return c.documentMode;for (var a = 7; a > 4; a--) {
        var b = c.createElement("div");if (b.innerHTML = "<!--[if IE " + a + "]><span></span><![endif]-->", b.getElementsByTagName("span").length) return b = null, a;
      }return d;
    }(),
        q = function () {
      var a = 0;return b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame || function (b) {
        var c,
            d = new Date().getTime();return c = Math.max(0, 16 - (d - a)), a = d + c, setTimeout(function () {
          b(d + c);
        }, c);
      };
    }(),
        r = function () {
      var a = b.performance || {};if (!Object.prototype.hasOwnProperty.call(a, "now")) {
        var c = a.timing && a.timing.domComplete ? a.timing.domComplete : new Date().getTime();a.now = function () {
          return new Date().getTime() - c;
        };
      }return a;
    }(),
        s = function () {
      var a = Array.prototype.slice;try {
        a.call(c.documentElement);
      } catch (b) {
        a = function () {
          for (var a = this.length, b = []; --a > 0;) {
            b[a] = this[a];
          }return cloned;
        };
      }return a;
    }(),
        t = { isNumber: function (a) {
        return "number" == typeof a;
      }, isString: function (a) {
        return "string" == typeof a;
      }, isArray: Array.isArray || function (a) {
        return "[object Array]" === Object.prototype.toString.call(a);
      }, isFunction: function (a) {
        return "[object Function]" === Object.prototype.toString.call(a);
      }, isNode: function (a) {
        return a && a.nodeType;
      }, isWrapped: function (a) {
        return a && t.isNumber(a.length) && !t.isString(a) && !t.isFunction(a) && !t.isNode(a) && (0 === a.length || t.isNode(a[0]));
      }, isSVG: function (a) {
        return b.SVGElement && a instanceof b.SVGElement;
      }, isEmptyObject: function (a) {
        for (var b in a) {
          if (a.hasOwnProperty(b)) return !1;
        }return !0;
      } },
        u = !1;if (a.fn && a.fn.jquery ? (o = a, u = !0) : o = b.Velocity.Utilities, p <= 8 && !u) throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");if (p <= 7) return void (jQuery.fn.velocity = jQuery.fn.animate);var v = 400,
        w = "swing",
        x = { State: { isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), isAndroid: /Android/i.test(navigator.userAgent), isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent), isChrome: b.chrome, isFirefox: /Firefox/i.test(navigator.userAgent), prefixElement: c.createElement("div"), prefixMatches: {}, scrollAnchor: null, scrollPropertyLeft: null, scrollPropertyTop: null, isTicking: !1, calls: [], delayedElements: { count: 0 } }, CSS: {}, Utilities: o, Redirects: {}, Easings: {}, Promise: b.Promise, defaults: { queue: "", duration: v, easing: w, begin: d, complete: d, progress: d, display: d, visibility: d, loop: !1, delay: !1, mobileHA: !0, _cacheValues: !0, promiseRejectEmpty: !0 }, init: function (a) {
        o.data(a, "velocity", { isSVG: t.isSVG(a), isAnimating: !1, computedStyle: null, tweensContainer: null, rootPropertyValueCache: {}, transformCache: {} });
      }, hook: null, mock: !1, version: { major: 1, minor: 4, patch: 2 }, debug: !1, timestamp: !0, pauseAll: function (a) {
        var b = new Date().getTime();o.each(x.State.calls, function (b, c) {
          if (c) {
            if (a !== d && (c[2].queue !== a || c[2].queue === !1)) return !0;c[5] = { resume: !1 };
          }
        }), o.each(x.State.delayedElements, function (a, c) {
          c && h(c, b);
        });
      }, resumeAll: function (a) {
        var b = new Date().getTime();o.each(x.State.calls, function (b, c) {
          if (c) {
            if (a !== d && (c[2].queue !== a || c[2].queue === !1)) return !0;c[5] && (c[5].resume = !0);
          }
        }), o.each(x.State.delayedElements, function (a, c) {
          c && i(c, b);
        });
      } };b.pageYOffset !== d ? (x.State.scrollAnchor = b, x.State.scrollPropertyLeft = "pageXOffset", x.State.scrollPropertyTop = "pageYOffset") : (x.State.scrollAnchor = c.documentElement || c.body.parentNode || c.body, x.State.scrollPropertyLeft = "scrollLeft", x.State.scrollPropertyTop = "scrollTop");var y = function () {
      function a(a) {
        return -a.tension * a.x - a.friction * a.v;
      }function b(b, c, d) {
        var e = { x: b.x + d.dx * c, v: b.v + d.dv * c, tension: b.tension, friction: b.friction };return { dx: e.v, dv: a(e) };
      }function c(c, d) {
        var e = { dx: c.v, dv: a(c) },
            f = b(c, .5 * d, e),
            g = b(c, .5 * d, f),
            h = b(c, d, g),
            i = 1 / 6 * (e.dx + 2 * (f.dx + g.dx) + h.dx),
            j = 1 / 6 * (e.dv + 2 * (f.dv + g.dv) + h.dv);return c.x = c.x + i * d, c.v = c.v + j * d, c;
      }return function d(a, b, e) {
        var f,
            g,
            h,
            i = { x: -1, v: 0, tension: null, friction: null },
            j = [0],
            k = 0,
            l = 1e-4,
            m = .016;for (a = parseFloat(a) || 500, b = parseFloat(b) || 20, e = e || null, i.tension = a, i.friction = b, f = null !== e, f ? (k = d(a, b), g = k / e * m) : g = m;;) {
          if (h = c(h || i, g), j.push(1 + h.x), k += 16, !(Math.abs(h.x) > l && Math.abs(h.v) > l)) break;
        }return f ? function (a) {
          return j[a * (j.length - 1) | 0];
        } : k;
      };
    }();x.Easings = { linear: function (a) {
        return a;
      }, swing: function (a) {
        return .5 - Math.cos(a * Math.PI) / 2;
      }, spring: function (a) {
        return 1 - Math.cos(4.5 * a * Math.PI) * Math.exp(6 * -a);
      } }, o.each([["ease", [.25, .1, .25, 1]], ["ease-in", [.42, 0, 1, 1]], ["ease-out", [0, 0, .58, 1]], ["ease-in-out", [.42, 0, .58, 1]], ["easeInSine", [.47, 0, .745, .715]], ["easeOutSine", [.39, .575, .565, 1]], ["easeInOutSine", [.445, .05, .55, .95]], ["easeInQuad", [.55, .085, .68, .53]], ["easeOutQuad", [.25, .46, .45, .94]], ["easeInOutQuad", [.455, .03, .515, .955]], ["easeInCubic", [.55, .055, .675, .19]], ["easeOutCubic", [.215, .61, .355, 1]], ["easeInOutCubic", [.645, .045, .355, 1]], ["easeInQuart", [.895, .03, .685, .22]], ["easeOutQuart", [.165, .84, .44, 1]], ["easeInOutQuart", [.77, 0, .175, 1]], ["easeInQuint", [.755, .05, .855, .06]], ["easeOutQuint", [.23, 1, .32, 1]], ["easeInOutQuint", [.86, 0, .07, 1]], ["easeInExpo", [.95, .05, .795, .035]], ["easeOutExpo", [.19, 1, .22, 1]], ["easeInOutExpo", [1, 0, 0, 1]], ["easeInCirc", [.6, .04, .98, .335]], ["easeOutCirc", [.075, .82, .165, 1]], ["easeInOutCirc", [.785, .135, .15, .86]]], function (a, b) {
      x.Easings[b[0]] = k.apply(null, b[1]);
    });var z = x.CSS = { RegEx: { isHex: /^#([A-f\d]{3}){1,2}$/i, valueUnwrap: /^[A-z]+\((.*)\)$/i, wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/, valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi }, Lists: { colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"], transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"], transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"], units: ["%", "em", "ex", "ch", "rem", "vw", "vh", "vmin", "vmax", "cm", "mm", "Q", "in", "pc", "pt", "px", "deg", "grad", "rad", "turn", "s", "ms"], colorNames: { aliceblue: "240,248,255", antiquewhite: "250,235,215", aquamarine: "127,255,212", aqua: "0,255,255", azure: "240,255,255", beige: "245,245,220", bisque: "255,228,196", black: "0,0,0", blanchedalmond: "255,235,205", blueviolet: "138,43,226", blue: "0,0,255", brown: "165,42,42", burlywood: "222,184,135", cadetblue: "95,158,160", chartreuse: "127,255,0", chocolate: "210,105,30", coral: "255,127,80", cornflowerblue: "100,149,237", cornsilk: "255,248,220", crimson: "220,20,60", cyan: "0,255,255", darkblue: "0,0,139", darkcyan: "0,139,139", darkgoldenrod: "184,134,11", darkgray: "169,169,169", darkgrey: "169,169,169", darkgreen: "0,100,0", darkkhaki: "189,183,107", darkmagenta: "139,0,139", darkolivegreen: "85,107,47", darkorange: "255,140,0", darkorchid: "153,50,204", darkred: "139,0,0", darksalmon: "233,150,122", darkseagreen: "143,188,143", darkslateblue: "72,61,139", darkslategray: "47,79,79", darkturquoise: "0,206,209", darkviolet: "148,0,211", deeppink: "255,20,147", deepskyblue: "0,191,255", dimgray: "105,105,105", dimgrey: "105,105,105", dodgerblue: "30,144,255", firebrick: "178,34,34", floralwhite: "255,250,240", forestgreen: "34,139,34", fuchsia: "255,0,255", gainsboro: "220,220,220", ghostwhite: "248,248,255", gold: "255,215,0", goldenrod: "218,165,32", gray: "128,128,128", grey: "128,128,128", greenyellow: "173,255,47", green: "0,128,0", honeydew: "240,255,240", hotpink: "255,105,180", indianred: "205,92,92", indigo: "75,0,130", ivory: "255,255,240", khaki: "240,230,140", lavenderblush: "255,240,245", lavender: "230,230,250", lawngreen: "124,252,0", lemonchiffon: "255,250,205", lightblue: "173,216,230", lightcoral: "240,128,128", lightcyan: "224,255,255", lightgoldenrodyellow: "250,250,210", lightgray: "211,211,211", lightgrey: "211,211,211", lightgreen: "144,238,144", lightpink: "255,182,193", lightsalmon: "255,160,122", lightseagreen: "32,178,170", lightskyblue: "135,206,250", lightslategray: "119,136,153", lightsteelblue: "176,196,222", lightyellow: "255,255,224", limegreen: "50,205,50", lime: "0,255,0", linen: "250,240,230", magenta: "255,0,255", maroon: "128,0,0", mediumaquamarine: "102,205,170", mediumblue: "0,0,205", mediumorchid: "186,85,211", mediumpurple: "147,112,219", mediumseagreen: "60,179,113", mediumslateblue: "123,104,238", mediumspringgreen: "0,250,154", mediumturquoise: "72,209,204", mediumvioletred: "199,21,133", midnightblue: "25,25,112", mintcream: "245,255,250", mistyrose: "255,228,225", moccasin: "255,228,181", navajowhite: "255,222,173", navy: "0,0,128", oldlace: "253,245,230", olivedrab: "107,142,35", olive: "128,128,0", orangered: "255,69,0", orange: "255,165,0", orchid: "218,112,214", palegoldenrod: "238,232,170", palegreen: "152,251,152", paleturquoise: "175,238,238", palevioletred: "219,112,147", papayawhip: "255,239,213", peachpuff: "255,218,185", peru: "205,133,63", pink: "255,192,203", plum: "221,160,221", powderblue: "176,224,230", purple: "128,0,128", red: "255,0,0", rosybrown: "188,143,143", royalblue: "65,105,225", saddlebrown: "139,69,19", salmon: "250,128,114", sandybrown: "244,164,96", seagreen: "46,139,87", seashell: "255,245,238", sienna: "160,82,45", silver: "192,192,192", skyblue: "135,206,235", slateblue: "106,90,205", slategray: "112,128,144", snow: "255,250,250", springgreen: "0,255,127", steelblue: "70,130,180", tan: "210,180,140", teal: "0,128,128", thistle: "216,191,216", tomato: "255,99,71", turquoise: "64,224,208", violet: "238,130,238", wheat: "245,222,179", whitesmoke: "245,245,245", white: "255,255,255", yellowgreen: "154,205,50", yellow: "255,255,0" } }, Hooks: { templates: { textShadow: ["Color X Y Blur", "black 0px 0px 0px"], boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"], clip: ["Top Right Bottom Left", "0px 0px 0px 0px"], backgroundPosition: ["X Y", "0% 0%"], transformOrigin: ["X Y Z", "50% 50% 0px"], perspectiveOrigin: ["X Y", "50% 50%"] }, registered: {}, register: function () {
          for (var a = 0; a < z.Lists.colors.length; a++) {
            var b = "color" === z.Lists.colors[a] ? "0 0 0 1" : "255 255 255 1";z.Hooks.templates[z.Lists.colors[a]] = ["Red Green Blue Alpha", b];
          }var c, d, e;if (p) for (c in z.Hooks.templates) {
            if (z.Hooks.templates.hasOwnProperty(c)) {
              d = z.Hooks.templates[c], e = d[0].split(" ");var f = d[1].match(z.RegEx.valueSplit);"Color" === e[0] && (e.push(e.shift()), f.push(f.shift()), z.Hooks.templates[c] = [e.join(" "), f.join(" ")]);
            }
          }for (c in z.Hooks.templates) {
            if (z.Hooks.templates.hasOwnProperty(c)) {
              d = z.Hooks.templates[c], e = d[0].split(" ");for (var g in e) {
                if (e.hasOwnProperty(g)) {
                  var h = c + e[g],
                      i = g;z.Hooks.registered[h] = [c, i];
                }
              }
            }
          }
        }, getRoot: function (a) {
          var b = z.Hooks.registered[a];return b ? b[0] : a;
        }, getUnit: function (a, b) {
          var c = (a.substr(b || 0, 5).match(/^[a-z%]+/) || [])[0] || "";return c && z.Lists.units.indexOf(c) >= 0 ? c : "";
        }, fixColors: function (a) {
          return a.replace(/(rgba?\(\s*)?(\b[a-z]+\b)/g, function (a, b, c) {
            return z.Lists.colorNames.hasOwnProperty(c) ? (b ? b : "rgba(") + z.Lists.colorNames[c] + (b ? "" : ",1)") : b + c;
          });
        }, cleanRootPropertyValue: function (a, b) {
          return z.RegEx.valueUnwrap.test(b) && (b = b.match(z.RegEx.valueUnwrap)[1]), z.Values.isCSSNullValue(b) && (b = z.Hooks.templates[a][1]), b;
        }, extractValue: function (a, b) {
          var c = z.Hooks.registered[a];if (c) {
            var d = c[0],
                e = c[1];return b = z.Hooks.cleanRootPropertyValue(d, b), b.toString().match(z.RegEx.valueSplit)[e];
          }return b;
        }, injectValue: function (a, b, c) {
          var d = z.Hooks.registered[a];if (d) {
            var e,
                f,
                g = d[0],
                h = d[1];return c = z.Hooks.cleanRootPropertyValue(g, c), e = c.toString().match(z.RegEx.valueSplit), e[h] = b, f = e.join(" ");
          }return c;
        } }, Normalizations: { registered: { clip: function (a, b, c) {
            switch (a) {case "name":
                return "clip";case "extract":
                var d;return z.RegEx.wrappedValueAlreadyExtracted.test(c) ? d = c : (d = c.toString().match(z.RegEx.valueUnwrap), d = d ? d[1].replace(/,(\s+)?/g, " ") : c), d;case "inject":
                return "rect(" + c + ")";}
          }, blur: function (a, b, c) {
            switch (a) {case "name":
                return x.State.isFirefox ? "filter" : "-webkit-filter";case "extract":
                var d = parseFloat(c);if (!d && 0 !== d) {
                  var e = c.toString().match(/blur\(([0-9]+[A-z]+)\)/i);d = e ? e[1] : 0;
                }return d;case "inject":
                return parseFloat(c) ? "blur(" + c + ")" : "none";}
          }, opacity: function (a, b, c) {
            if (p <= 8) switch (a) {case "name":
                return "filter";case "extract":
                var d = c.toString().match(/alpha\(opacity=(.*)\)/i);return c = d ? d[1] / 100 : 1;case "inject":
                return b.style.zoom = 1, parseFloat(c) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(c), 10) + ")";} else switch (a) {case "name":
                return "opacity";case "extract":
                return c;case "inject":
                return c;}
          } }, register: function () {
          function a(a, b, c) {
            var d = "border-box" === z.getPropertyValue(b, "boxSizing").toString().toLowerCase();if (d === (c || !1)) {
              var e,
                  f,
                  g = 0,
                  h = "width" === a ? ["Left", "Right"] : ["Top", "Bottom"],
                  i = ["padding" + h[0], "padding" + h[1], "border" + h[0] + "Width", "border" + h[1] + "Width"];for (e = 0; e < i.length; e++) {
                f = parseFloat(z.getPropertyValue(b, i[e])), isNaN(f) || (g += f);
              }return c ? -g : g;
            }return 0;
          }function b(b, c) {
            return function (d, e, f) {
              switch (d) {case "name":
                  return b;case "extract":
                  return parseFloat(f) + a(b, e, c);case "inject":
                  return parseFloat(f) - a(b, e, c) + "px";}
            };
          }p && !(p > 9) || x.State.isGingerbread || (z.Lists.transformsBase = z.Lists.transformsBase.concat(z.Lists.transforms3D));for (var c = 0; c < z.Lists.transformsBase.length; c++) {
            !function () {
              var a = z.Lists.transformsBase[c];z.Normalizations.registered[a] = function (b, c, e) {
                switch (b) {case "name":
                    return "transform";case "extract":
                    return g(c) === d || g(c).transformCache[a] === d ? /^scale/i.test(a) ? 1 : 0 : g(c).transformCache[a].replace(/[()]/g, "");case "inject":
                    var f = !1;switch (a.substr(0, a.length - 1)) {case "translate":
                        f = !/(%|px|em|rem|vw|vh|\d)$/i.test(e);break;case "scal":case "scale":
                        x.State.isAndroid && g(c).transformCache[a] === d && e < 1 && (e = 1), f = !/(\d)$/i.test(e);break;case "skew":
                        f = !/(deg|\d)$/i.test(e);break;case "rotate":
                        f = !/(deg|\d)$/i.test(e);}return f || (g(c).transformCache[a] = "(" + e + ")"), g(c).transformCache[a];}
              };
            }();
          }for (var e = 0; e < z.Lists.colors.length; e++) {
            !function () {
              var a = z.Lists.colors[e];z.Normalizations.registered[a] = function (b, c, e) {
                switch (b) {case "name":
                    return a;case "extract":
                    var f;if (z.RegEx.wrappedValueAlreadyExtracted.test(e)) f = e;else {
                      var g,
                          h = { black: "rgb(0, 0, 0)", blue: "rgb(0, 0, 255)", gray: "rgb(128, 128, 128)", green: "rgb(0, 128, 0)", red: "rgb(255, 0, 0)", white: "rgb(255, 255, 255)" };/^[A-z]+$/i.test(e) ? g = h[e] !== d ? h[e] : h.black : z.RegEx.isHex.test(e) ? g = "rgb(" + z.Values.hexToRgb(e).join(" ") + ")" : /^rgba?\(/i.test(e) || (g = h.black), f = (g || e).toString().match(z.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ");
                    }return (!p || p > 8) && 3 === f.split(" ").length && (f += " 1"), f;case "inject":
                    return (/^rgb/.test(e) ? e : (p <= 8 ? 4 === e.split(" ").length && (e = e.split(/\s+/).slice(0, 3).join(" ")) : 3 === e.split(" ").length && (e += " 1"), (p <= 8 ? "rgb" : "rgba") + "(" + e.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")")
                    );}
              };
            }();
          }z.Normalizations.registered.innerWidth = b("width", !0), z.Normalizations.registered.innerHeight = b("height", !0), z.Normalizations.registered.outerWidth = b("width"), z.Normalizations.registered.outerHeight = b("height");
        } }, Names: { camelCase: function (a) {
          return a.replace(/-(\w)/g, function (a, b) {
            return b.toUpperCase();
          });
        }, SVGAttribute: function (a) {
          var b = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";return (p || x.State.isAndroid && !x.State.isChrome) && (b += "|transform"), new RegExp("^(" + b + ")$", "i").test(a);
        }, prefixCheck: function (a) {
          if (x.State.prefixMatches[a]) return [x.State.prefixMatches[a], !0];for (var b = ["", "Webkit", "Moz", "ms", "O"], c = 0, d = b.length; c < d; c++) {
            var e;if (e = 0 === c ? a : b[c] + a.replace(/^\w/, function (a) {
              return a.toUpperCase();
            }), t.isString(x.State.prefixElement.style[e])) return x.State.prefixMatches[a] = e, [e, !0];
          }return [a, !1];
        } }, Values: { hexToRgb: function (a) {
          var b,
              c = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
              d = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;return a = a.replace(c, function (a, b, c, d) {
            return b + b + c + c + d + d;
          }), b = d.exec(a), b ? [parseInt(b[1], 16), parseInt(b[2], 16), parseInt(b[3], 16)] : [0, 0, 0];
        }, isCSSNullValue: function (a) {
          return !a || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(a);
        }, getUnitType: function (a) {
          return (/^(rotate|skew)/i.test(a) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(a) ? "" : "px"
          );
        }, getDisplayType: function (a) {
          var b = a && a.tagName.toString().toLowerCase();return (/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(b) ? "inline" : /^(li)$/i.test(b) ? "list-item" : /^(tr)$/i.test(b) ? "table-row" : /^(table)$/i.test(b) ? "table" : /^(tbody)$/i.test(b) ? "table-row-group" : "block"
          );
        }, addClass: function (a, b) {
          if (a) if (a.classList) a.classList.add(b);else if (t.isString(a.className)) a.className += (a.className.length ? " " : "") + b;else {
            var c = a.getAttribute(p <= 7 ? "className" : "class") || "";a.setAttribute("class", c + (c ? " " : "") + b);
          }
        }, removeClass: function (a, b) {
          if (a) if (a.classList) a.classList.remove(b);else if (t.isString(a.className)) a.className = a.className.toString().replace(new RegExp("(^|\\s)" + b.split(" ").join("|") + "(\\s|$)", "gi"), " ");else {
            var c = a.getAttribute(p <= 7 ? "className" : "class") || "";a.setAttribute("class", c.replace(new RegExp("(^|s)" + b.split(" ").join("|") + "(s|$)", "gi"), " "));
          }
        } }, getPropertyValue: function (a, c, e, f) {
        function h(a, c) {
          var e = 0;if (p <= 8) e = o.css(a, c);else {
            var i = !1;/^(width|height)$/.test(c) && 0 === z.getPropertyValue(a, "display") && (i = !0, z.setPropertyValue(a, "display", z.Values.getDisplayType(a)));var j = function () {
              i && z.setPropertyValue(a, "display", "none");
            };if (!f) {
              if ("height" === c && "border-box" !== z.getPropertyValue(a, "boxSizing").toString().toLowerCase()) {
                var k = a.offsetHeight - (parseFloat(z.getPropertyValue(a, "borderTopWidth")) || 0) - (parseFloat(z.getPropertyValue(a, "borderBottomWidth")) || 0) - (parseFloat(z.getPropertyValue(a, "paddingTop")) || 0) - (parseFloat(z.getPropertyValue(a, "paddingBottom")) || 0);return j(), k;
              }if ("width" === c && "border-box" !== z.getPropertyValue(a, "boxSizing").toString().toLowerCase()) {
                var l = a.offsetWidth - (parseFloat(z.getPropertyValue(a, "borderLeftWidth")) || 0) - (parseFloat(z.getPropertyValue(a, "borderRightWidth")) || 0) - (parseFloat(z.getPropertyValue(a, "paddingLeft")) || 0) - (parseFloat(z.getPropertyValue(a, "paddingRight")) || 0);return j(), l;
              }
            }var m;m = g(a) === d ? b.getComputedStyle(a, null) : g(a).computedStyle ? g(a).computedStyle : g(a).computedStyle = b.getComputedStyle(a, null), "borderColor" === c && (c = "borderTopColor"), e = 9 === p && "filter" === c ? m.getPropertyValue(c) : m[c], "" !== e && null !== e || (e = a.style[c]), j();
          }if ("auto" === e && /^(top|right|bottom|left)$/i.test(c)) {
            var n = h(a, "position");("fixed" === n || "absolute" === n && /top|left/i.test(c)) && (e = o(a).position()[c] + "px");
          }return e;
        }var i;if (z.Hooks.registered[c]) {
          var j = c,
              k = z.Hooks.getRoot(j);e === d && (e = z.getPropertyValue(a, z.Names.prefixCheck(k)[0])), z.Normalizations.registered[k] && (e = z.Normalizations.registered[k]("extract", a, e)), i = z.Hooks.extractValue(j, e);
        } else if (z.Normalizations.registered[c]) {
          var l, m;l = z.Normalizations.registered[c]("name", a), "transform" !== l && (m = h(a, z.Names.prefixCheck(l)[0]), z.Values.isCSSNullValue(m) && z.Hooks.templates[c] && (m = z.Hooks.templates[c][1])), i = z.Normalizations.registered[c]("extract", a, m);
        }if (!/^[\d-]/.test(i)) {
          var n = g(a);if (n && n.isSVG && z.Names.SVGAttribute(c)) {
            if (/^(height|width)$/i.test(c)) try {
              i = a.getBBox()[c];
            } catch (q) {
              i = 0;
            } else i = a.getAttribute(c);
          } else i = h(a, z.Names.prefixCheck(c)[0]);
        }return z.Values.isCSSNullValue(i) && (i = 0), x.debug >= 2 && console.log("Get " + c + ": " + i), i;
      }, setPropertyValue: function (a, c, d, e, f) {
        var h = c;if ("scroll" === c) f.container ? f.container["scroll" + f.direction] = d : "Left" === f.direction ? b.scrollTo(d, f.alternateValue) : b.scrollTo(f.alternateValue, d);else if (z.Normalizations.registered[c] && "transform" === z.Normalizations.registered[c]("name", a)) z.Normalizations.registered[c]("inject", a, d), h = "transform", d = g(a).transformCache[c];else {
          if (z.Hooks.registered[c]) {
            var i = c,
                j = z.Hooks.getRoot(c);e = e || z.getPropertyValue(a, j), d = z.Hooks.injectValue(i, d, e), c = j;
          }if (z.Normalizations.registered[c] && (d = z.Normalizations.registered[c]("inject", a, d), c = z.Normalizations.registered[c]("name", a)), h = z.Names.prefixCheck(c)[0], p <= 8) try {
            a.style[h] = d;
          } catch (k) {
            x.debug && console.log("Browser does not support [" + d + "] for [" + h + "]");
          } else {
            var l = g(a);l && l.isSVG && z.Names.SVGAttribute(c) ? a.setAttribute(c, d) : a.style[h] = d;
          }x.debug >= 2 && console.log("Set " + c + " (" + h + "): " + d);
        }return [h, d];
      }, flushTransformCache: function (a) {
        var b = "",
            c = g(a);if ((p || x.State.isAndroid && !x.State.isChrome) && c && c.isSVG) {
          var d = function (b) {
            return parseFloat(z.getPropertyValue(a, b));
          },
              e = { translate: [d("translateX"), d("translateY")], skewX: [d("skewX")], skewY: [d("skewY")], scale: 1 !== d("scale") ? [d("scale"), d("scale")] : [d("scaleX"), d("scaleY")], rotate: [d("rotateZ"), 0, 0] };o.each(g(a).transformCache, function (a) {
            /^translate/i.test(a) ? a = "translate" : /^scale/i.test(a) ? a = "scale" : /^rotate/i.test(a) && (a = "rotate"), e[a] && (b += a + "(" + e[a].join(" ") + ") ", delete e[a]);
          });
        } else {
          var f, h;o.each(g(a).transformCache, function (c) {
            return f = g(a).transformCache[c], "transformPerspective" === c ? (h = f, !0) : (9 === p && "rotateZ" === c && (c = "rotate"), void (b += c + f + " "));
          }), h && (b = "perspective" + h + " " + b);
        }z.setPropertyValue(a, "transform", b);
      } };z.Hooks.register(), z.Normalizations.register(), x.hook = function (a, b, c) {
      var e;return a = f(a), o.each(a, function (a, f) {
        if (g(f) === d && x.init(f), c === d) e === d && (e = z.getPropertyValue(f, b));else {
          var h = z.setPropertyValue(f, b, c);"transform" === h[0] && x.CSS.flushTransformCache(f), e = h;
        }
      }), e;
    };var A = function () {
      function a() {
        return k ? y.promise || null : p;
      }function e(a, e) {
        function f(f) {
          var k, n;if (i.begin && 0 === C) try {
            i.begin.call(r, r);
          } catch (p) {
            setTimeout(function () {
              throw p;
            }, 1);
          }if ("scroll" === F) {
            var q,
                v,
                w,
                A = /^x$/i.test(i.axis) ? "Left" : "Top",
                D = parseFloat(i.offset) || 0;i.container ? t.isWrapped(i.container) || t.isNode(i.container) ? (i.container = i.container[0] || i.container, q = i.container["scroll" + A], w = q + o(a).position()[A.toLowerCase()] + D) : i.container = null : (q = x.State.scrollAnchor[x.State["scrollProperty" + A]], v = x.State.scrollAnchor[x.State["scrollProperty" + ("Left" === A ? "Top" : "Left")]], w = o(a).offset()[A.toLowerCase()] + D), j = { scroll: { rootPropertyValue: !1, startValue: q, currentValue: q, endValue: w, unitType: "", easing: i.easing, scrollData: { container: i.container, direction: A, alternateValue: v } }, element: a }, x.debug && console.log("tweensContainer (scroll): ", j.scroll, a);
          } else if ("reverse" === F) {
            if (k = g(a), !k) return;if (!k.tweensContainer) return void o.dequeue(a, i.queue);"none" === k.opts.display && (k.opts.display = "auto"), "hidden" === k.opts.visibility && (k.opts.visibility = "visible"), k.opts.loop = !1, k.opts.begin = null, k.opts.complete = null, u.easing || delete i.easing, u.duration || delete i.duration, i = o.extend({}, k.opts, i), n = o.extend(!0, {}, k ? k.tweensContainer : null);for (var E in n) {
              if (n.hasOwnProperty(E) && "element" !== E) {
                var G = n[E].startValue;n[E].startValue = n[E].currentValue = n[E].endValue, n[E].endValue = G, t.isEmptyObject(u) || (n[E].easing = i.easing), x.debug && console.log("reverse tweensContainer (" + E + "): " + JSON.stringify(n[E]), a);
              }
            }j = n;
          } else if ("start" === F) {
            k = g(a), k && k.tweensContainer && k.isAnimating === !0 && (n = k.tweensContainer);var H = function (b, c) {
              var d, f, g;return t.isFunction(b) && (b = b.call(a, e, B)), t.isArray(b) ? (d = b[0], !t.isArray(b[1]) && /^[\d-]/.test(b[1]) || t.isFunction(b[1]) || z.RegEx.isHex.test(b[1]) ? g = b[1] : t.isString(b[1]) && !z.RegEx.isHex.test(b[1]) && x.Easings[b[1]] || t.isArray(b[1]) ? (f = c ? b[1] : l(b[1], i.duration), g = b[2]) : g = b[1] || b[2]) : d = b, c || (f = f || i.easing), t.isFunction(d) && (d = d.call(a, e, B)), t.isFunction(g) && (g = g.call(a, e, B)), [d || 0, f, g];
            },
                I = function (e, f) {
              var g,
                  l = z.Hooks.getRoot(e),
                  m = !1,
                  p = f[0],
                  q = f[1],
                  r = f[2];
              if (!(k && k.isSVG || "tween" === l || z.Names.prefixCheck(l)[1] !== !1 || z.Normalizations.registered[l] !== d)) return void (x.debug && console.log("Skipping [" + l + "] due to a lack of browser support."));(i.display !== d && null !== i.display && "none" !== i.display || i.visibility !== d && "hidden" !== i.visibility) && /opacity|filter/.test(e) && !r && 0 !== p && (r = 0), i._cacheValues && n && n[e] ? (r === d && (r = n[e].endValue + n[e].unitType), m = k.rootPropertyValueCache[l]) : z.Hooks.registered[e] ? r === d ? (m = z.getPropertyValue(a, l), r = z.getPropertyValue(a, e, m)) : m = z.Hooks.templates[l][1] : r === d && (r = z.getPropertyValue(a, e));var s,
                  u,
                  v,
                  w = !1,
                  y = function (a, b) {
                var c, d;return d = (b || "0").toString().toLowerCase().replace(/[%A-z]+$/, function (a) {
                  return c = a, "";
                }), c || (c = z.Values.getUnitType(a)), [d, c];
              };if (r !== p && t.isString(r) && t.isString(p)) {
                g = "";var A = 0,
                    B = 0,
                    C = [],
                    D = [],
                    E = 0,
                    F = 0,
                    G = 0;for (r = z.Hooks.fixColors(r), p = z.Hooks.fixColors(p); A < r.length && B < p.length;) {
                  var H = r[A],
                      I = p[B];if (/[\d\.]/.test(H) && /[\d\.]/.test(I)) {
                    for (var J = H, K = I, M = ".", N = "."; ++A < r.length;) {
                      if (H = r[A], H === M) M = "..";else if (!/\d/.test(H)) break;J += H;
                    }for (; ++B < p.length;) {
                      if (I = p[B], I === N) N = "..";else if (!/\d/.test(I)) break;K += I;
                    }var O = z.Hooks.getUnit(r, A),
                        P = z.Hooks.getUnit(p, B);if (A += O.length, B += P.length, O === P) J === K ? g += J + O : (g += "{" + C.length + (F ? "!" : "") + "}" + O, C.push(parseFloat(J)), D.push(parseFloat(K)));else {
                      var Q = parseFloat(J),
                          R = parseFloat(K);g += (E < 5 ? "calc" : "") + "(" + (Q ? "{" + C.length + (F ? "!" : "") + "}" : "0") + O + " + " + (R ? "{" + (C.length + (Q ? 1 : 0)) + (F ? "!" : "") + "}" : "0") + P + ")", Q && (C.push(Q), D.push(0)), R && (C.push(0), D.push(R));
                    }
                  } else {
                    if (H !== I) {
                      E = 0;break;
                    }g += H, A++, B++, 0 === E && "c" === H || 1 === E && "a" === H || 2 === E && "l" === H || 3 === E && "c" === H || E >= 4 && "(" === H ? E++ : (E && E < 5 || E >= 4 && ")" === H && --E < 5) && (E = 0), 0 === F && "r" === H || 1 === F && "g" === H || 2 === F && "b" === H || 3 === F && "a" === H || F >= 3 && "(" === H ? (3 === F && "a" === H && (G = 1), F++) : G && "," === H ? ++G > 3 && (F = G = 0) : (G && F < (G ? 5 : 4) || F >= (G ? 4 : 3) && ")" === H && --F < (G ? 5 : 4)) && (F = G = 0);
                  }
                }A === r.length && B === p.length || (x.debug && console.error('Trying to pattern match mis-matched strings ["' + p + '", "' + r + '"]'), g = d), g && (C.length ? (x.debug && console.log('Pattern found "' + g + '" -> ', C, D, "[" + r + "," + p + "]"), r = C, p = D, u = v = "") : g = d);
              }g || (s = y(e, r), r = s[0], v = s[1], s = y(e, p), p = s[0].replace(/^([+-\/*])=/, function (a, b) {
                return w = b, "";
              }), u = s[1], r = parseFloat(r) || 0, p = parseFloat(p) || 0, "%" === u && (/^(fontSize|lineHeight)$/.test(e) ? (p /= 100, u = "em") : /^scale/.test(e) ? (p /= 100, u = "") : /(Red|Green|Blue)$/i.test(e) && (p = p / 100 * 255, u = "")));var S = function () {
                var d = { myParent: a.parentNode || c.body, position: z.getPropertyValue(a, "position"), fontSize: z.getPropertyValue(a, "fontSize") },
                    e = d.position === L.lastPosition && d.myParent === L.lastParent,
                    f = d.fontSize === L.lastFontSize;L.lastParent = d.myParent, L.lastPosition = d.position, L.lastFontSize = d.fontSize;var g = 100,
                    h = {};if (f && e) h.emToPx = L.lastEmToPx, h.percentToPxWidth = L.lastPercentToPxWidth, h.percentToPxHeight = L.lastPercentToPxHeight;else {
                  var i = k && k.isSVG ? c.createElementNS("http://www.w3.org/2000/svg", "rect") : c.createElement("div");x.init(i), d.myParent.appendChild(i), o.each(["overflow", "overflowX", "overflowY"], function (a, b) {
                    x.CSS.setPropertyValue(i, b, "hidden");
                  }), x.CSS.setPropertyValue(i, "position", d.position), x.CSS.setPropertyValue(i, "fontSize", d.fontSize), x.CSS.setPropertyValue(i, "boxSizing", "content-box"), o.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function (a, b) {
                    x.CSS.setPropertyValue(i, b, g + "%");
                  }), x.CSS.setPropertyValue(i, "paddingLeft", g + "em"), h.percentToPxWidth = L.lastPercentToPxWidth = (parseFloat(z.getPropertyValue(i, "width", null, !0)) || 1) / g, h.percentToPxHeight = L.lastPercentToPxHeight = (parseFloat(z.getPropertyValue(i, "height", null, !0)) || 1) / g, h.emToPx = L.lastEmToPx = (parseFloat(z.getPropertyValue(i, "paddingLeft")) || 1) / g, d.myParent.removeChild(i);
                }return null === L.remToPx && (L.remToPx = parseFloat(z.getPropertyValue(c.body, "fontSize")) || 16), null === L.vwToPx && (L.vwToPx = parseFloat(b.innerWidth) / 100, L.vhToPx = parseFloat(b.innerHeight) / 100), h.remToPx = L.remToPx, h.vwToPx = L.vwToPx, h.vhToPx = L.vhToPx, x.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(h), a), h;
              };if (/[\/*]/.test(w)) u = v;else if (v !== u && 0 !== r) if (0 === p) u = v;else {
                h = h || S();var T = /margin|padding|left|right|width|text|word|letter/i.test(e) || /X$/.test(e) || "x" === e ? "x" : "y";switch (v) {case "%":
                    r *= "x" === T ? h.percentToPxWidth : h.percentToPxHeight;break;case "px":
                    break;default:
                    r *= h[v + "ToPx"];}switch (u) {case "%":
                    r *= 1 / ("x" === T ? h.percentToPxWidth : h.percentToPxHeight);break;case "px":
                    break;default:
                    r *= 1 / h[u + "ToPx"];}
              }switch (w) {case "+":
                  p = r + p;break;case "-":
                  p = r - p;break;case "*":
                  p *= r;break;case "/":
                  p = r / p;}j[e] = { rootPropertyValue: m, startValue: r, currentValue: r, endValue: p, unitType: u, easing: q }, g && (j[e].pattern = g), x.debug && console.log("tweensContainer (" + e + "): " + JSON.stringify(j[e]), a);
            };for (var J in s) {
              if (s.hasOwnProperty(J)) {
                var K = z.Names.camelCase(J),
                    N = H(s[J]);if (z.Lists.colors.indexOf(K) >= 0) {
                  var O = N[0],
                      P = N[1],
                      Q = N[2];if (z.RegEx.isHex.test(O)) {
                    for (var R = ["Red", "Green", "Blue"], S = z.Values.hexToRgb(O), T = Q ? z.Values.hexToRgb(Q) : d, U = 0; U < R.length; U++) {
                      var V = [S[U]];P && V.push(P), T !== d && V.push(T[U]), I(K + R[U], V);
                    }continue;
                  }
                }I(K, N);
              }
            }j.element = a;
          }j.element && (z.Values.addClass(a, "velocity-animating"), M.push(j), k = g(a), k && ("" === i.queue && (k.tweensContainer = j, k.opts = i), k.isAnimating = !0), C === B - 1 ? (x.State.calls.push([M, r, i, null, y.resolver, null, 0]), x.State.isTicking === !1 && (x.State.isTicking = !0, m())) : C++);
        }var h,
            i = o.extend({}, x.defaults, u),
            j = {};switch (g(a) === d && x.init(a), parseFloat(i.delay) && i.queue !== !1 && o.queue(a, i.queue, function (b) {
          x.velocityQueueEntryFlag = !0;var c = x.State.delayedElements.count++;x.State.delayedElements[c] = a;var d = function (a) {
            return function () {
              x.State.delayedElements[a] = !1, b();
            };
          }(c);g(a).delayBegin = new Date().getTime(), g(a).delay = parseFloat(i.delay), g(a).delayTimer = { setTimeout: setTimeout(b, parseFloat(i.delay)), next: d };
        }), i.duration.toString().toLowerCase()) {case "fast":
            i.duration = 200;break;case "normal":
            i.duration = v;break;case "slow":
            i.duration = 600;break;default:
            i.duration = parseFloat(i.duration) || 1;}if (x.mock !== !1 && (x.mock === !0 ? i.duration = i.delay = 1 : (i.duration *= parseFloat(x.mock) || 1, i.delay *= parseFloat(x.mock) || 1)), i.easing = l(i.easing, i.duration), i.begin && !t.isFunction(i.begin) && (i.begin = null), i.progress && !t.isFunction(i.progress) && (i.progress = null), i.complete && !t.isFunction(i.complete) && (i.complete = null), i.display !== d && null !== i.display && (i.display = i.display.toString().toLowerCase(), "auto" === i.display && (i.display = x.CSS.Values.getDisplayType(a))), i.visibility !== d && null !== i.visibility && (i.visibility = i.visibility.toString().toLowerCase()), i.mobileHA = i.mobileHA && x.State.isMobile && !x.State.isGingerbread, i.queue === !1) {
          if (i.delay) {
            var k = x.State.delayedElements.count++;x.State.delayedElements[k] = a;var n = function (a) {
              return function () {
                x.State.delayedElements[a] = !1, f();
              };
            }(k);g(a).delayBegin = new Date().getTime(), g(a).delay = parseFloat(i.delay), g(a).delayTimer = { setTimeout: setTimeout(f, parseFloat(i.delay)), next: n };
          } else f();
        } else o.queue(a, i.queue, function (a, b) {
          return b === !0 ? (y.promise && y.resolver(r), !0) : (x.velocityQueueEntryFlag = !0, void f(a));
        });"" !== i.queue && "fx" !== i.queue || "inprogress" === o.queue(a)[0] || o.dequeue(a);
      }var j,
          k,
          p,
          q,
          r,
          s,
          u,
          w = arguments[0] && (arguments[0].p || o.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || t.isString(arguments[0].properties));t.isWrapped(this) ? (k = !1, q = 0, r = this, p = this) : (k = !0, q = 1, r = w ? arguments[0].elements || arguments[0].e : arguments[0]);var y = { promise: null, resolver: null, rejecter: null };if (k && x.Promise && (y.promise = new x.Promise(function (a, b) {
        y.resolver = a, y.rejecter = b;
      })), w ? (s = arguments[0].properties || arguments[0].p, u = arguments[0].options || arguments[0].o) : (s = arguments[q], u = arguments[q + 1]), r = f(r), !r) return void (y.promise && (s && u && u.promiseRejectEmpty === !1 ? y.resolver() : y.rejecter()));var B = r.length,
          C = 0;if (!/^(stop|finish|finishAll|pause|resume)$/i.test(s) && !o.isPlainObject(u)) {
        var D = q + 1;u = {};for (var E = D; E < arguments.length; E++) {
          t.isArray(arguments[E]) || !/^(fast|normal|slow)$/i.test(arguments[E]) && !/^\d/.test(arguments[E]) ? t.isString(arguments[E]) || t.isArray(arguments[E]) ? u.easing = arguments[E] : t.isFunction(arguments[E]) && (u.complete = arguments[E]) : u.duration = arguments[E];
        }
      }var F;switch (s) {case "scroll":
          F = "scroll";break;case "reverse":
          F = "reverse";break;case "pause":
          var G = new Date().getTime();return o.each(r, function (a, b) {
            h(b, G);
          }), o.each(x.State.calls, function (a, b) {
            var c = !1;b && o.each(b[1], function (a, e) {
              var f = u === d ? "" : u;return f !== !0 && b[2].queue !== f && (u !== d || b[2].queue !== !1) || (o.each(r, function (a, d) {
                if (d === e) return b[5] = { resume: !1 }, c = !0, !1;
              }), !c && void 0);
            });
          }), a();case "resume":
          return o.each(r, function (a, b) {
            i(b, G);
          }), o.each(x.State.calls, function (a, b) {
            var c = !1;b && o.each(b[1], function (a, e) {
              var f = u === d ? "" : u;return f !== !0 && b[2].queue !== f && (u !== d || b[2].queue !== !1) || !b[5] || (o.each(r, function (a, d) {
                if (d === e) return b[5].resume = !0, c = !0, !1;
              }), !c && void 0);
            });
          }), a();case "finish":case "finishAll":case "stop":
          o.each(r, function (a, b) {
            g(b) && g(b).delayTimer && (clearTimeout(g(b).delayTimer.setTimeout), g(b).delayTimer.next && g(b).delayTimer.next(), delete g(b).delayTimer), "finishAll" !== s || u !== !0 && !t.isString(u) || (o.each(o.queue(b, t.isString(u) ? u : ""), function (a, b) {
              t.isFunction(b) && b();
            }), o.queue(b, t.isString(u) ? u : "", []));
          });var H = [];return o.each(x.State.calls, function (a, b) {
            b && o.each(b[1], function (c, e) {
              var f = u === d ? "" : u;return f !== !0 && b[2].queue !== f && (u !== d || b[2].queue !== !1) || void o.each(r, function (c, d) {
                if (d === e) if ((u === !0 || t.isString(u)) && (o.each(o.queue(d, t.isString(u) ? u : ""), function (a, b) {
                  t.isFunction(b) && b(null, !0);
                }), o.queue(d, t.isString(u) ? u : "", [])), "stop" === s) {
                  var h = g(d);h && h.tweensContainer && f !== !1 && o.each(h.tweensContainer, function (a, b) {
                    b.endValue = b.currentValue;
                  }), H.push(a);
                } else "finish" !== s && "finishAll" !== s || (b[2].duration = 1);
              });
            });
          }), "stop" === s && (o.each(H, function (a, b) {
            n(b, !0);
          }), y.promise && y.resolver(r)), a();default:
          if (!o.isPlainObject(s) || t.isEmptyObject(s)) {
            if (t.isString(s) && x.Redirects[s]) {
              j = o.extend({}, u);var I = j.duration,
                  J = j.delay || 0;return j.backwards === !0 && (r = o.extend(!0, [], r).reverse()), o.each(r, function (a, b) {
                parseFloat(j.stagger) ? j.delay = J + parseFloat(j.stagger) * a : t.isFunction(j.stagger) && (j.delay = J + j.stagger.call(b, a, B)), j.drag && (j.duration = parseFloat(I) || (/^(callout|transition)/.test(s) ? 1e3 : v), j.duration = Math.max(j.duration * (j.backwards ? 1 - a / B : (a + 1) / B), .75 * j.duration, 200)), x.Redirects[s].call(b, b, j || {}, a, B, r, y.promise ? y : d);
              }), a();
            }var K = "Velocity: First argument (" + s + ") was not a property map, a known action, or a registered redirect. Aborting.";return y.promise ? y.rejecter(new Error(K)) : console.log(K), a();
          }F = "start";}var L = { lastParent: null, lastPosition: null, lastFontSize: null, lastPercentToPxWidth: null, lastPercentToPxHeight: null, lastEmToPx: null, remToPx: null, vwToPx: null, vhToPx: null },
          M = [];o.each(r, function (a, b) {
        t.isNode(b) && e(b, a);
      }), j = o.extend({}, x.defaults, u), j.loop = parseInt(j.loop, 10);var N = 2 * j.loop - 1;if (j.loop) for (var O = 0; O < N; O++) {
        var P = { delay: j.delay, progress: j.progress };O === N - 1 && (P.display = j.display, P.visibility = j.visibility, P.complete = j.complete), A(r, "reverse", P);
      }return a();
    };x = o.extend(A, x), x.animate = A;var B = b.requestAnimationFrame || q;if (!x.State.isMobile && c.hidden !== d) {
      var C = function () {
        c.hidden ? (B = function (a) {
          return setTimeout(function () {
            a(!0);
          }, 16);
        }, m()) : B = b.requestAnimationFrame || q;
      };C(), c.addEventListener("visibilitychange", C);
    }return a.Velocity = x, a !== b && (a.fn.velocity = A, a.fn.velocity.defaults = x.defaults), o.each(["Down", "Up"], function (a, b) {
      x.Redirects["slide" + b] = function (a, c, e, f, g, h) {
        var i = o.extend({}, c),
            j = i.begin,
            k = i.complete,
            l = {},
            m = { height: "", marginTop: "", marginBottom: "", paddingTop: "", paddingBottom: "" };i.display === d && (i.display = "Down" === b ? "inline" === x.CSS.Values.getDisplayType(a) ? "inline-block" : "block" : "none"), i.begin = function () {
          0 === e && j && j.call(g, g);for (var c in m) {
            if (m.hasOwnProperty(c)) {
              l[c] = a.style[c];var d = z.getPropertyValue(a, c);m[c] = "Down" === b ? [d, 0] : [0, d];
            }
          }l.overflow = a.style.overflow, a.style.overflow = "hidden";
        }, i.complete = function () {
          for (var b in l) {
            l.hasOwnProperty(b) && (a.style[b] = l[b]);
          }e === f - 1 && (k && k.call(g, g), h && h.resolver(g));
        }, x(a, m, i);
      };
    }), o.each(["In", "Out"], function (a, b) {
      x.Redirects["fade" + b] = function (a, c, e, f, g, h) {
        var i = o.extend({}, c),
            j = i.complete,
            k = { opacity: "In" === b ? 1 : 0 };0 !== e && (i.begin = null), e !== f - 1 ? i.complete = null : i.complete = function () {
          j && j.call(g, g), h && h.resolver(g);
        }, i.display === d && (i.display = "In" === b ? "auto" : "none"), x(this, k, i);
      };
    }), x;
  }(window.jQuery || window.Zepto || window, window, window ? window.document : void 0);
});; // Required for Meteor package, the use of window prevents export by Meteor
(function (window) {
  if (window.Package) {
    M = {};
  } else {
    window.M = {};
  }

  // Check for jQuery
  M.jQueryLoaded = !!window.jQuery;
})(window);

// AMD
if (true) {
  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
    return M;
  }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

  // Common JS
} else if (typeof exports !== 'undefined' && !exports.nodeType) {
  if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
    exports = module.exports = M;
  }
  exports.default = M;
}

M.keys = {
  TAB: 9,
  ENTER: 13,
  ESC: 27,
  ARROW_UP: 38,
  ARROW_DOWN: 40
};

/**
 * Initialize jQuery wrapper for plugin
 * @param {Class} plugin  javascript class
 * @param {string} pluginName  jQuery plugin name
 * @param {string} classRef  Class reference name
 */
M.initializeJqueryWrapper = function (plugin, pluginName, classRef) {
  jQuery.fn[pluginName] = function (methodOrOptions) {
    // Call plugin method if valid method name is passed in
    if (plugin.prototype[methodOrOptions]) {
      var params = Array.prototype.slice.call(arguments, 1);

      // Getter methods
      if (methodOrOptions.slice(0, 3) === 'get') {
        var instance = this.first()[0][classRef];
        return instance[methodOrOptions].apply(instance, params);

        // Void methods
      } else {
        return this.each(function () {
          var instance = this[classRef];
          instance[methodOrOptions].apply(instance, params);
        });
      }

      // Initialize plugin if options or no argument is passed in
    } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
      plugin.init(this, arguments[0]);
      return this;

      // Return error if an unrecognized  method name is passed in
    } else {
      jQuery.error("Method " + methodOrOptions + " does not exist on jQuery." + pluginName);
    }
  };
};

/**
 * Generate approximated selector string for a jQuery object
 * @param {jQuery} obj  jQuery object to be parsed
 * @returns {string}
 */
M.objectSelectorString = function (obj) {
  var tagStr = obj.prop('tagName') || '';
  var idStr = obj.attr('id') || '';
  var classStr = obj.attr('class') || '';
  return (tagStr + idStr + classStr).replace(/\s/g, '');
};

// Unique Random ID
M.guid = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return function () {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  };
}();

/**
 * Escapes hash from special characters
 * @param {string} hash  String returned from this.hash
 * @returns {string}
 */
M.escapeHash = function (hash) {
  return hash.replace(/(:|\.|\[|\]|,|=)/g, "\\$1");
};

M.elementOrParentIsFixed = function (element) {
  var $element = $(element);
  var $checkElements = $element.add($element.parents());
  var isFixed = false;
  $checkElements.each(function () {
    if ($(this).css("position") === "fixed") {
      isFixed = true;
      return false;
    }
  });
  return isFixed;
};

/**
 * @typedef {Object} Edges
 * @property {Boolean} top  If the top edge was exceeded
 * @property {Boolean} right  If the right edge was exceeded
 * @property {Boolean} bottom  If the bottom edge was exceeded
 * @property {Boolean} left  If the left edge was exceeded
 */

/**
 * @typedef {Object} Bounding
 * @property {Number} left  left offset coordinate
 * @property {Number} top  top offset coordinate
 * @property {Number} width
 * @property {Number} height
 */

/**
 * Escapes hash from special characters
 * @param {Element} container  Container element that acts as the boundary
 * @param {Bounding} bounding  element bounding that is being checked
 * @param {Number} offset  offset from edge that counts as exceeding
 * @returns {Edges}
 */
M.checkWithinContainer = function (container, bounding, offset) {
  var edges = {
    top: false,
    right: false,
    bottom: false,
    left: false
  };

  var containerRect = container.getBoundingClientRect();

  var scrollLeft = container.scrollLeft;
  var scrollTop = container.scrollTop;

  var scrolledX = bounding.left - scrollLeft;
  var scrolledY = bounding.top - scrollTop;

  // Check for container and viewport for each edge
  if (scrolledX < containerRect.left + offset || scrolledX < offset) {
    edges.left = true;
  }

  if (scrolledX + bounding.width > containerRect.right - offset || scrolledX + bounding.width > window.innerWidth - offset) {
    edges.right = true;
  }

  if (scrolledY < containerRect.top + offset || scrolledY < offset) {
    edges.top = true;
  }

  if (scrolledY + bounding.height > containerRect.bottom - offset || scrolledY + bounding.height > window.innerHeight - offset) {
    edges.bottom = true;
  }

  return edges;
};

M.checkPossibleAlignments = function (el, container, bounding, offset) {
  var canAlign = {
    top: true,
    right: true,
    bottom: true,
    left: true,
    spaceOnTop: null,
    spaceOnRight: null,
    spaceOnBottom: null,
    spaceOnLeft: null
  };

  var containerAllowsOverflow = getComputedStyle(container).overflow === 'visible';
  var containerRect = container.getBoundingClientRect();
  var elOffsetRect = el.getBoundingClientRect();

  var scrollLeft = container.scrollLeft;
  var scrollTop = container.scrollTop;

  var scrolledX = bounding.left - scrollLeft;
  var scrolledY = bounding.top - scrollTop;

  // Check for container and viewport for left
  canAlign.spaceOnRight = !containerAllowsOverflow ? container.offsetWidth - (scrolledX + bounding.width) : window.innerWidth - (elOffsetRect.left + bounding.width);
  if (!containerAllowsOverflow && scrolledX + bounding.width > container.offsetWidth || containerAllowsOverflow && elOffsetRect.left + bounding.width > window.innerWidth) {
    canAlign.left = false;
  }

  // Check for container and viewport for Right
  canAlign.spaceOnLeft = !containerAllowsOverflow ? scrolledX - bounding.width + elOffsetRect.width : elOffsetRect.right - bounding.width;
  if (!containerAllowsOverflow && scrolledX - bounding.width + elOffsetRect.width < 0 || containerAllowsOverflow && elOffsetRect.right - bounding.width < 0) {
    canAlign.right = false;
  }

  // Check for container and viewport for Top
  canAlign.spaceOnBottom = !containerAllowsOverflow ? containerRect.height - (scrolledY + bounding.height + offset) : window.innerHeight - (elOffsetRect.top + bounding.height + offset);
  if (!containerAllowsOverflow && scrolledY + bounding.height + offset > containerRect.height || containerAllowsOverflow && elOffsetRect.top + bounding.height + offset > window.innerHeight) {
    canAlign.top = false;
  }

  // Check for container and viewport for Bottom
  canAlign.spaceOnTop = !containerAllowsOverflow ? scrolledY - (bounding.height + offset) : elOffsetRect.bottom - (bounding.height + offset);
  if (!containerAllowsOverflow && scrolledY - bounding.height - offset < 0 || containerAllowsOverflow && elOffsetRect.bottom - bounding.height - offset < 0) {
    canAlign.bottom = false;
  }

  return canAlign;
};

M.getOverflowParent = function (element) {
  if (element == null) {
    return null;
  }

  if (element === document.body || getComputedStyle(element).overflow !== 'visible') {
    return element;
  } else {
    return M.getOverflowParent(element.parentElement);
  }
};

/**
 * Gets id of component from a trigger
 * @param {Element} trigger  trigger
 * @returns {string}
 */
M.getIdFromTrigger = function (trigger) {
  var id = trigger.getAttribute('data-target');
  if (!id) {
    id = trigger.getAttribute('href');
    if (id) {
      id = id.slice(1);
    } else {
      id = "";
    }
  }
  return id;
};

/**
 * Multi browser support for document scroll top
 * @returns {Number}
 */
M.getDocumentScrollTop = function () {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
};

/**
 * Multi browser support for document scroll left
 * @returns {Number}
 */
M.getDocumentScrollLeft = function () {
  return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
};

/**
 * @typedef {Object} Edges
 * @property {Boolean} top  If the top edge was exceeded
 * @property {Boolean} right  If the right edge was exceeded
 * @property {Boolean} bottom  If the bottom edge was exceeded
 * @property {Boolean} left  If the left edge was exceeded
 */

/**
 * @typedef {Object} Bounding
 * @property {Number} left  left offset coordinate
 * @property {Number} top  top offset coordinate
 * @property {Number} width
 * @property {Number} height
 */

/**
 * Get time in ms
 * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
 * @type {function}
 * @return {number}
 */
var getTime = Date.now || function () {
  return new Date().getTime();
};

/**
 * Returns a function, that, when invoked, will only be triggered at most once
 * during a given window of time. Normally, the throttled function will run
 * as much as it can, without ever going more than once per `wait` duration;
 * but if you'd like to disable the execution on the leading edge, pass
 * `{leading: false}`. To disable execution on the trailing edge, ditto.
 * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
 * @param {function} func
 * @param {number} wait
 * @param {Object=} options
 * @returns {Function}
 */
M.throttle = function (func, wait, options) {
  var context = void 0,
      args = void 0,
      result = void 0;
  var timeout = null;
  var previous = 0;
  options || (options = {});
  var later = function () {
    previous = options.leading === false ? 0 : getTime();
    timeout = null;
    result = func.apply(context, args);
    context = args = null;
  };
  return function () {
    var now = getTime();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

// Velocity has conflicts when loaded with jQuery, this will check for it
// First, check if in noConflict mode
var Vel = void 0;
if (M.jQueryLoaded) {
  Vel = jQuery.Velocity;
} else {
  Vel = Velocity;
}

if (Vel) {
  M.Vel = Vel;
} else {
  M.Vel = Velocity;
}
;(function ($, Vel) {
  'use strict';

  var _defaults = {
    accordion: true,
    onOpenStart: undefined,
    onOpenEnd: undefined,
    onCloseStart: undefined,
    onCloseEnd: undefined,
    inDuration: 300,
    outDuration: 300
  };

  /**
   * @class
   *
   */

  var Collapsible = function () {
    /**
     * Construct Collapsible instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Collapsible(el, options) {
      _classCallCheck(this, Collapsible);

      // If exists, destroy and reinitialize
      if (!!el.M_Collapsible) {
        el.M_Collapsible.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_Collapsible = this;

      /**
       * Options for the collapsible
       * @member Collapsible#options
       * @prop {Boolean} [accordion=false] - Type of the collapsible
       * @prop {Function} onOpenStart - Callback function called before collapsible is opened
       * @prop {Function} onOpenEnd - Callback function called after collapsible is opened
       * @prop {Function} onCloseStart - Callback function called before collapsible is closed
       * @prop {Function} onCloseEnd - Callback function called after collapsible is closed
       * @prop {Number} inDuration - Transition in duration in milliseconds.
       * @prop {Number} outDuration - Transition duration in milliseconds.
       */
      this.options = $.extend({}, Collapsible.defaults, options);

      this._setupEventHandlers();

      // Open first active
      var $activeBodies = this.$el.children('li.active').children('.collapsible-body');
      if (this.options.accordion) {
        // Handle Accordion
        $activeBodies.first().css('display', 'block');
      } else {
        // Handle Expandables
        $activeBodies.css('display', 'block');
      }
    }

    _createClass(Collapsible, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.M_Collapsible = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleCollapsibleClickBound = this._handleCollapsibleClick.bind(this);
        this.el.addEventListener('click', this._handleCollapsibleClickBound);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('click', this._handleCollapsibleClickBound);
      }

      /**
       * Handle Collapsible Click
       * @param {Event} e
       */

    }, {
      key: "_handleCollapsibleClick",
      value: function _handleCollapsibleClick(e) {
        var $header = $(e.target).closest('.collapsible-header');
        if (e.target && $header.length) {
          var $collapsible = $header.closest('.collapsible');
          if ($collapsible[0] === this.el) {
            var $collapsibleLi = $header.closest('li');
            var $collapsibleLis = $collapsible.children('li');
            var isActive = $collapsibleLi[0].classList.contains('active');
            var index = $collapsibleLis.index($collapsibleLi);

            if (isActive) {
              this.close(index);
            } else {
              this.open(index);
            }
          }
        }
      }

      /**
       * Animate in collapsible slide
       * @param {Number} index - 0th index of slide
       */

    }, {
      key: "_animateIn",
      value: function _animateIn(index) {
        var _this3 = this;

        var $collapsibleLi = this.$el.children('li').eq(index);
        if ($collapsibleLi.length) {
          var $body = $collapsibleLi.children('.collapsible-body');
          Vel($body[0], 'stop');
          Vel($body[0], 'slideDown', { duration: this.options.inDuration, easing: 'easeInOutCubic', queue: false,
            complete: function () {
              $body[0].style.height = '';
              $body[0].style.overflow = '';
              $body[0].style.padding = '';
              $body[0].style.margin = '';

              // onOpenEnd callback
              if (typeof _this3.options.onOpenEnd === 'function') {
                _this3.options.onOpenEnd.call(_this3, $collapsibleLi[0]);
              }
            } });
        }
      }

      /**
       * Animate out collapsible slide
       * @param {Number} index - 0th index of slide to open
       */

    }, {
      key: "_animateOut",
      value: function _animateOut(index) {
        var _this4 = this;

        var $collapsibleLi = this.$el.children('li').eq(index);
        if ($collapsibleLi.length) {
          var $body = $collapsibleLi.children('.collapsible-body');
          Vel($body[0], 'stop');
          Vel($body[0], 'slideUp', { duration: this.options.outDuration, easing: 'easeInOutCubic', queue: false,
            complete: function () {
              $body[0].style.height = '';
              $body[0].style.overflow = '';
              $body[0].style.padding = '';
              $body[0].style.margin = '';

              // onCloseEnd callback
              if (typeof _this4.options.onCloseEnd === 'function') {
                _this4.options.onCloseEnd.call(_this4, $collapsibleLi[0]);
              }
            } });
        }
      }

      /**
       * Open Collapsible
       * @param {Number} index - 0th index of slide
       */

    }, {
      key: "open",
      value: function open(index) {
        var _this5 = this;

        var $collapsibleLi = this.$el.children('li').eq(index);
        if ($collapsibleLi.length && !$collapsibleLi[0].classList.contains('active')) {

          // onOpenStart callback
          if (typeof this.options.onOpenStart === 'function') {
            this.options.onOpenStart.call(this, $collapsibleLi[0]);
          }

          // Handle accordion behavior
          if (this.options.accordion) {
            var $collapsibleLis = this.$el.children('li');
            var $activeLis = this.$el.children('li.active');
            $activeLis.each(function (el) {
              var index = $collapsibleLis.index($(el));
              _this5.close(index);
            });
          }

          // Animate in
          $collapsibleLi[0].classList.add('active');
          this._animateIn(index);
        }
      }

      /**
       * Close Collapsible
       * @param {Number} index - 0th index of slide
       */

    }, {
      key: "close",
      value: function close(index) {
        var $collapsibleLi = this.$el.children('li').eq(index);
        if ($collapsibleLi.length && $collapsibleLi[0].classList.contains('active')) {

          // onCloseStart callback
          if (typeof this.options.onCloseStart === 'function') {
            this.options.onCloseStart.call(this, $collapsibleLi[0]);
          }

          // Animate out
          $collapsibleLi[0].classList.remove('active');
          this._animateOut(index);
        }
      }
    }], [{
      key: "init",
      value: function init($els, options) {
        var arr = [];
        $els.each(function () {
          arr.push(new Collapsible(this, options));
        });
        return arr;
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Collapsible;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Collapsible;
  }();

  M.Collapsible = Collapsible;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Collapsible, 'collapsible', 'M_Collapsible');
  }
})(cash, M.Vel);
;(function ($, Vel) {
  'use strict';

  var _defaults = {
    alignment: 'left',
    constrainWidth: true,
    coverTrigger: true,
    closeOnClick: true,
    hover: false,
    inDuration: 150,
    outDuration: 250,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null
  };

  /**
   * @class
   */

  var Dropdown = function () {
    function Dropdown(el, options) {
      _classCallCheck(this, Dropdown);

      // If exists, destroy and reinitialize
      if (!!el.M_Dropdown) {
        el.M_Dropdown.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_Dropdown = this;
      Dropdown._dropdowns.push(this);

      this.id = M.getIdFromTrigger(el);
      this.dropdownEl = document.getElementById(this.id);
      this.$dropdownEl = $(this.dropdownEl);

      /**
       * Options for the dropdown
       * @member Dropdown#options
       * @prop {Function} onOpenStart - Function called when sidenav starts entering
       * @prop {Function} onOpenEnd - Function called when sidenav finishes entering
       * @prop {Function} onCloseStart - Function called when sidenav starts exiting
       * @prop {Function} onCloseEnd - Function called when sidenav finishes exiting
       */
      this.options = $.extend({}, Dropdown.defaults, options);

      /**
       * Describes open/close state of dropdown
       * @type {Boolean}
       */
      this.isOpen = false;

      this.focusedIndex = null;
      this.filterQuery = [];

      // Move dropdown-content after dropdown-trigger
      this.$el.after(this.dropdownEl);

      this._makeDropdownFocusable();
      this._resetFilterQueryBound = this._resetFilterQuery.bind(this);
      this._handleDocumentClickBound = this._handleDocumentClick.bind(this);
      this._handleDropdownKeydownBound = this._handleDropdownKeydown.bind(this);
      this._handleTriggerKeydownBound = this._handleTriggerKeydown.bind(this);
      this._setupEventHandlers();
    }

    _createClass(Dropdown, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._resetDropdownStyles();
        this._removeEventHandlers();
        Dropdown._dropdowns.splice(Dropdown._dropdowns.indexOf(this), 1);
        this.el.M_Dropdown = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        // Trigger keydown handler
        this.el.addEventListener('keydown', this._handleTriggerKeydownBound);

        // Hover event handlers
        if (this.options.hover) {
          this._handleMouseEnterBound = this._handleMouseEnter.bind(this);
          this.el.addEventListener('mouseenter', this._handleMouseEnterBound);
          this._handleMouseLeaveBound = this._handleMouseLeave.bind(this);
          this.el.addEventListener('mouseleave', this._handleMouseLeaveBound);
          this.dropdownEl.addEventListener('mouseleave', this._handleMouseLeaveBound);

          // Click event handlers
        } else {
          this._handleClickBound = this._handleClick.bind(this);
          this.el.addEventListener('click', this._handleClickBound);
        }
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        // Trigger keydown handler
        this.el.removeEventListener('keydown', this._handleTriggerKeydownBound);

        if (this.options.hover) {
          this.el.removeEventHandlers('mouseenter', this._handleMouseEnterBound);
          this.el.removeEventHandlers('mouseleave', this._handleMouseLeaveBound);
          this.dropdownEl.removeEventHandlers('mouseleave', this._handleMouseLeaveBound);
        } else {
          this.el.removeEventListener('click', this._handleClickBound);
        }
      }
    }, {
      key: "_setupTemporaryEventHandlers",
      value: function _setupTemporaryEventHandlers() {
        // Use capture phase event handler to prevent click
        document.body.addEventListener('click', this._handleDocumentClickBound, true);
        this.dropdownEl.addEventListener('keydown', this._handleDropdownKeydownBound);
      }
    }, {
      key: "_removeTemporaryEventHandlers",
      value: function _removeTemporaryEventHandlers() {
        // Use capture phase event handler to prevent click
        document.body.removeEventListener('click', this._handleDocumentClickBound, true);
        this.dropdownEl.removeEventListener('keydown', this._handleDropdownKeydownBound);
      }
    }, {
      key: "_handleClick",
      value: function _handleClick(e) {
        e.preventDefault();
        this.open();
      }
    }, {
      key: "_handleMouseEnter",
      value: function _handleMouseEnter() {
        this.open();
      }
    }, {
      key: "_handleMouseLeave",
      value: function _handleMouseLeave(e) {
        var toEl = e.toElement || e.relatedTarget;
        var leaveToDropdownContent = !!$(toEl).closest('.dropdown-content').length;
        var leaveToActiveDropdownTrigger = false;

        var $closestTrigger = $(toEl).closest('.dropdown-trigger');
        if ($closestTrigger.length && !!$closestTrigger[0].M_Dropdown && $closestTrigger[0].M_Dropdown.isOpen) {
          leaveToActiveDropdownTrigger = true;
        }

        // Close hover dropdown if mouse did not leave to either active dropdown-trigger or dropdown-content
        if (!leaveToActiveDropdownTrigger && !leaveToDropdownContent) {
          this.close();
        }
      }
    }, {
      key: "_handleDocumentClick",
      value: function _handleDocumentClick(e) {
        var _this6 = this;

        var $target = $(e.target);
        if (this.options.closeOnClick && $target.closest('.dropdown-content').length) {
          setTimeout(function () {
            _this6.close();
          }, 0);
        } else if ($target.closest('.dropdown-trigger').length) {
          setTimeout(function () {
            _this6.close();
          }, 0);
        } else if (!$target.closest('.dropdown-content').length) {
          setTimeout(function () {
            _this6.close();
          }, 0);
        }
      }
    }, {
      key: "_handleTriggerKeydown",
      value: function _handleTriggerKeydown(e) {
        // ARROW DOWN OR ENTER WHEN SELECT IS CLOSED - open Dropdown
        if ((e.which === M.keys.ARROW_DOWN || e.which === M.keys.ENTER) && !this.isOpen) {
          e.preventDefault();
          this.open();
        }
      }

      /**
       * Handle Dropdown Keydown
       * @param {Event} e
       */

    }, {
      key: "_handleDropdownKeydown",
      value: function _handleDropdownKeydown(e) {
        if (e.which === M.keys.TAB) {
          e.preventDefault();
          this.close();

          // Navigate down dropdown list
        } else if ((e.which === M.keys.ARROW_DOWN || e.which === M.keys.ARROW_UP) && this.isOpen) {
          e.preventDefault();
          var direction = e.which === M.keys.ARROW_DOWN ? 1 : -1;
          this.focusedIndex = Math.max(Math.min(this.focusedIndex + direction, this.dropdownEl.children.length - 1), 0);
          this._focusFocusedItem();

          // ENTER selects choice on focused item
        } else if (e.which === M.keys.ENTER && this.isOpen) {
          // Search for <a> and <button>
          var focusedElement = this.dropdownEl.children[this.focusedIndex];
          var $activatableElement = $(focusedElement).find('a, button').first();

          // Click a or button tag if exists, otherwise click li tag
          !!$activatableElement.length ? $activatableElement[0].click() : focusedElement.click();

          // Close dropdown on ESC
        } else if (e.which === M.keys.ESC && this.isOpen) {
          e.preventDefault();
          this.close();
        }

        // CASE WHEN USER TYPE LETTERS
        var letter = String.fromCharCode(e.which).toLowerCase(),
            nonLetters = [9, 13, 27, 38, 40];
        if (letter && nonLetters.indexOf(e.which) === -1) {
          this.filterQuery.push(letter);

          var string = this.filterQuery.join(''),
              newOptionEl = $(this.dropdownEl).find('li').filter(function (el) {
            return $(el).text().toLowerCase().indexOf(string) === 0;
          })[0];

          if (newOptionEl) {
            this.focusedIndex = $(newOptionEl).index();
            this._focusFocusedItem();
          }
        }

        this.filterTimeout = setTimeout(this._resetFilterQueryBound, 1000);
      }

      /**
       * Setup dropdown
       */

    }, {
      key: "_resetFilterQuery",
      value: function _resetFilterQuery() {
        this.filterQuery = [];
      }
    }, {
      key: "_resetDropdownStyles",
      value: function _resetDropdownStyles() {
        this.$dropdownEl.css({
          display: '',
          width: '',
          height: '',
          left: '',
          top: '',
          'transform-origin': '',
          transform: '',
          opacity: ''
        });
      }
    }, {
      key: "_makeDropdownFocusable",
      value: function _makeDropdownFocusable() {
        if (this.dropdownEl.tabIndex === -1) {
          this.dropdownEl.tabIndex = 0;
        }

        $(this.dropdownEl).children().attr('tabindex', 0);
      }
    }, {
      key: "_focusFocusedItem",
      value: function _focusFocusedItem() {
        this.dropdownEl.children[this.focusedIndex].focus();
      }
    }, {
      key: "_getDropdownPosition",
      value: function _getDropdownPosition() {
        var offsetParentBRect = this.el.offsetParent.getBoundingClientRect();
        var triggerOffset = { left: this.el.offsetLeft, top: this.el.offsetTop, width: this.el.offsetWidth, height: this.el.offsetHeight };
        var dropdownOffset = { left: this.dropdownEl.offsetLeft, top: this.dropdownEl.offsetTop, width: this.dropdownEl.offsetWidth, height: this.dropdownEl.offsetHeight };
        var triggerBRect = this.el.getBoundingClientRect();
        var dropdownBRect = this.dropdownEl.getBoundingClientRect();

        var idealHeight = dropdownBRect.height;
        var idealWidth = dropdownBRect.width;
        var idealXPos = triggerOffset.left;
        var idealYPos = triggerOffset.top;

        var dropdownBounds = {
          left: idealXPos,
          top: idealYPos,
          height: idealHeight,
          width: idealWidth
        };

        // Countainer here will be closest ancestor with overflow: hidden
        var closestOverflowParent = this.dropdownEl.offsetParent;
        var alignments = M.checkPossibleAlignments(this.el, closestOverflowParent, dropdownBounds, this.options.coverTrigger ? 0 : triggerBRect.height);

        var verticalAlignment = 'top';
        var horizontalAlignment = this.options.alignment;
        idealYPos += this.options.coverTrigger ? 0 : triggerBRect.height;
        if (!alignments.top) {
          if (alignments.bottom) {
            verticalAlignment = 'bottom';
          } else {
            // Determine which side has most space and cutoff at correct height
            if (alignments.spaceOnTop > alignments.spaceOnBottom) {
              verticalAlignment = 'bottom';
              idealHeight += alignments.spaceOnTop;
              idealYPos -= alignments.spaceOnTop;
            } else {
              idealHeight += alignments.spaceOnBottom;
            }
          }
        }

        // If preferred horizontal alignment is possible
        if (!alignments[horizontalAlignment]) {
          var oppositeAlignment = horizontalAlignment === 'left' ? 'right' : 'left';
          if (alignments[oppositeAlignment]) {
            horizontalAlignment = oppositeAlignment;
          } else {
            // Determine which side has most space and cutoff at correct height
            if (alignments.spaceOnLeft > alignments.spaceOnRight) {
              horizontalAlignment = 'right';
              idealWidth += alignments.spaceOnLeft;
              idealXPos -= alignments.spaceOnLeft;
            } else {
              horizontalAlignment = 'left';
              idealWidth += alignments.spaceOnRight;
            }
          }
        }

        if (verticalAlignment === 'bottom') {
          idealYPos = idealYPos - dropdownBRect.height + (this.options.coverTrigger ? triggerBRect.height : 0);
        }
        if (horizontalAlignment === 'right') {
          idealXPos = idealXPos - dropdownBRect.width + triggerBRect.width;
        }
        return { x: idealXPos,
          y: idealYPos,
          verticalAlignment: verticalAlignment,
          horizontalAlignment: horizontalAlignment,
          height: idealHeight,
          width: idealWidth };
      }

      /**
       * Animate in dropdown
       */

    }, {
      key: "_animateIn",
      value: function _animateIn(positionInfo) {
        var _this7 = this;

        // Place dropdown
        this.dropdownEl.style.left = positionInfo.x + 'px';
        this.dropdownEl.style.top = positionInfo.y + 'px';
        this.dropdownEl.style.height = positionInfo.height + 'px';
        this.dropdownEl.style.width = positionInfo.width + 'px';
        this.dropdownEl.style.transformOrigin = (positionInfo.horizontalAlignment === 'left' ? '0' : '100%') + " " + (positionInfo.verticalAlignment === 'top' ? '0' : '100%');

        Vel(this.dropdownEl, {
          opacity: [1, 'easeOutQuad'],
          scaleX: [1, .3],
          scaleY: [1, .3] }, {
          duration: this.options.inDuration,
          queue: false,
          easing: 'easeOutQuint',
          complete: function () {
            _this7._focusFocusedItem();

            // onOpenEnd callback
            if (typeof _this7.options.onOpenEnd === 'function') {
              _this7.options.onOpenEnd.call(_this7, _this7.el);
            }
          }
        });
      }

      /**
       * Animate out dropdown
       */

    }, {
      key: "_animateOut",
      value: function _animateOut() {
        var _this8 = this;

        Vel(this.dropdownEl, {
          opacity: [0, 'easeOutQuint'],
          scaleX: [.3, 1],
          scaleY: [.3, 1] }, {
          duration: this.options.outDuration,
          queue: false,
          easing: 'easeOutQuint',
          complete: function () {
            _this8._resetDropdownStyles();

            // onCloseEnd callback
            if (typeof _this8.options.onCloseEnd === 'function') {
              _this8.options.onCloseEnd.call(_this8, _this8.el);
            }
          }
        });
      }

      /**
       * Open Dropdown
       */

    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }
        this.isOpen = true;

        // Highlight focused item
        if (this.focusedIndex === null) {
          this.focusedIndex = 0;
        }

        // onOpenStart callback
        if (typeof this.options.onOpenStart === 'function') {
          this.options.onOpenStart.call(this, this.el);
        }

        // Stop any previous animation
        Vel(this.dropdownEl, 'stop');
        this._resetDropdownStyles();
        Vel.hook(this.dropdownEl, 'display', 'block');

        // Set width before calculating positionInfo
        var idealWidth = this.options.constrainWidth ? this.el.getBoundingClientRect().width : this.dropdownEl.getBoundingClientRect().width;
        this.dropdownEl.style.width = idealWidth + 'px';

        var positionInfo = this._getDropdownPosition();
        this._animateIn(positionInfo);
        this._setupTemporaryEventHandlers();
      }

      /**
       * Close Dropdown
       */

    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }
        this.isOpen = false;

        // onCloseStart callback
        if (typeof this.options.onCloseStart === 'function') {
          this.options.onCloseStart.call(this, this.el);
        }

        this._animateOut();
        this._removeTemporaryEventHandlers();
        this.el.focus();
      }
    }], [{
      key: "init",
      value: function init($els, options) {
        var arr = [];
        $els.each(function () {
          arr.push(new Dropdown(this, options));
        });
        return arr;
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Dropdown;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Dropdown;
  }();

  /**
   * @static
   * @memberof Dropdown
   */


  Dropdown._dropdowns = [];

  window.M.Dropdown = Dropdown;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Dropdown, 'dropdown', 'M_Dropdown');
  }
})(cash, M.Vel);
;(function ($, Vel) {
  'use strict';

  var _defaults = {
    opacity: 0.5,
    inDuration: 250,
    outDuration: 250,
    ready: undefined,
    complete: undefined,
    dismissible: true,
    startingTop: '4%',
    endingTop: '10%'
  };

  /**
   * @class
   *
   */

  var Modal = function () {
    /**
     * Construct Modal instance and set up overlay
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Modal(el, options) {
      _classCallCheck(this, Modal);

      // If exists, destroy and reinitialize
      if (!!el.M_Modal) {
        el.M_Modal.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_Modal = this;

      /**
       * Options for the modal
       * @member Modal#options
       * @prop {Number} [opacity=0.5] - Opacity of the modal overlay
       * @prop {Number} [inDuration=250] - Length in ms of enter transition
       * @prop {Number} [outDuration=250] - Length in ms of exit transition
       * @prop {Function} ready - Callback function called when modal is finished entering
       * @prop {Function} complete - Callback function called when modal is finished exiting
       * @prop {Boolean} [dismissible=true] - Allow modal to be dismissed by keyboard or overlay click
       * @prop {String} [startingTop='4%'] - startingTop
       * @prop {String} [endingTop='10%'] - endingTop
       */
      this.options = $.extend({}, Modal.defaults, options);

      /**
       * Describes open/close state of modal
       * @type {Boolean}
       */
      this.isOpen = false;

      this.id = this.$el.attr('id');
      this._openingTrigger = undefined;
      this.$overlay = $('<div class="modal-overlay"></div>');

      Modal._increment++;
      Modal._count++;
      this.$overlay[0].style.zIndex = 1000 + Modal._increment * 2;
      this.el.style.zIndex = 1000 + Modal._increment * 2 + 1;
      this._setupEventHandlers();
    }

    _createClass(Modal, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        Modal._count--;
        this._removeEventHandlers();
        this.el.removeAttribute('style');
        this.$overlay.remove();
        this.el.M_Modal = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleOverlayClickBound = this._handleOverlayClick.bind(this);
        this._handleModalCloseClickBound = this._handleModalCloseClick.bind(this);

        if (Modal._count === 1) {
          document.body.addEventListener('click', this._handleTriggerClick);
        }
        this.$overlay[0].addEventListener('click', this._handleOverlayClickBound);
        this.el.addEventListener('click', this._handleModalCloseClickBound);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        if (Modal._count === 0) {
          document.body.removeEventListener('click', this._handleTriggerClick);
        }
        this.$overlay[0].removeEventListener('click', this._handleOverlayClickBound);
        this.el.removeEventListener('click', this._handleModalCloseClickBound);
      }

      /**
       * Handle Trigger Click
       * @param {Event} e
       */

    }, {
      key: "_handleTriggerClick",
      value: function _handleTriggerClick(e) {
        var $trigger = $(e.target).closest('.modal-trigger');
        if ($trigger.length) {
          var modalId = M.getIdFromTrigger($trigger[0]);
          var modalInstance = document.getElementById(modalId).M_Modal;
          if (modalInstance) {
            modalInstance.open($trigger);
          }
          e.preventDefault();
        }
      }

      /**
       * Handle Overlay Click
       */

    }, {
      key: "_handleOverlayClick",
      value: function _handleOverlayClick() {
        if (this.options.dismissible) {
          this.close();
        }
      }

      /**
       * Handle Modal Close Click
       * @param {Event} e
       */

    }, {
      key: "_handleModalCloseClick",
      value: function _handleModalCloseClick(e) {
        var $closeTrigger = $(e.target).closest('.modal-close');
        if ($closeTrigger.length) {
          this.close();
        }
      }

      /**
       * Handle Keydown
       * @param {Event} e
       */

    }, {
      key: "_handleKeydown",
      value: function _handleKeydown(e) {
        // ESC key
        if (e.keyCode === 27 && this.options.dismissible) {
          this.close();
        }
      }

      /**
       * Animate in modal
       */

    }, {
      key: "_animateIn",
      value: function _animateIn() {
        var _this9 = this;

        // Set initial styles
        $.extend(this.el.style, {
          display: 'block',
          opacity: 0
        });
        $.extend(this.$overlay[0].style, {
          display: 'block',
          opacity: 0
        });

        // Animate overlay
        Vel(this.$overlay[0], { opacity: this.options.opacity }, { duration: this.options.inDuration, queue: false, ease: 'easeOutCubic' });

        // Define modal animation options
        var enterVelocityOptions = {
          duration: this.options.inDuration,
          queue: false,
          ease: 'easeOutCubic',
          // Handle modal ready callback
          complete: function () {
            if (typeof _this9.options.ready === 'function') {
              _this9.options.ready.call(_this9, _this9.el, _this9._openingTrigger);
            }
          }
        };

        // Bottom sheet animation
        if (this.el.classList.contains('bottom-sheet')) {
          Vel(this.el, { bottom: 0, opacity: 1 }, enterVelocityOptions);

          // Normal modal animation
        } else {
          Vel.hook(this.el, 'scaleX', 0.8);
          Vel.hook(this.el, 'scaleY', 0.8);
          this.el.style.top = this.options.startingTop;
          Vel(this.el, { top: this.options.endingTop, opacity: 1, scaleX: 1, scaleY: 1 }, enterVelocityOptions);
        }
      }

      /**
       * Animate out modal
       */

    }, {
      key: "_animateOut",
      value: function _animateOut() {
        var _this10 = this;

        // Animate overlay
        Vel(this.$overlay[0], { opacity: 0 }, { duration: this.options.outDuration, queue: false, ease: 'easeOutQuart' });

        // Define modal animation options
        var exitVelocityOptions = {
          duration: this.options.outDuration,
          queue: false,
          ease: 'easeOutCubic',
          // Handle modal ready callback
          complete: function () {
            _this10.el.style.display = 'none';
            // Call complete callback
            if (typeof _this10.options.complete === 'function') {
              _this10.options.complete.call(_this10, _this10.$el);
            }
            _this10.$overlay.remove();
          }
        };

        // Bottom sheet animation
        if (this.el.classList.contains('bottom-sheet')) {
          Vel(this.el, { bottom: '-100%', opacity: 0 }, exitVelocityOptions);

          // Normal modal animation
        } else {
          Vel(this.el, { top: this.options.startingTop, opacity: 0, scaleX: 0.8, scaleY: 0.8 }, exitVelocityOptions);
        }
      }

      /**
       * Open Modal
       * @param {cash} [$trigger]
       */

    }, {
      key: "open",
      value: function open($trigger) {
        if (this.isOpen) {
          return;
        }

        this.isOpen = true;
        var body = document.body;
        body.style.overflow = 'hidden';
        this.el.classList.add('open');
        body.appendChild(this.$overlay[0]);

        // Set opening trigger, undefined indicates modal was opened by javascript
        this._openingTrigger = !!$trigger ? $trigger : undefined;

        if (this.options.dismissible) {
          this._handleKeydownBound = this._handleKeydown.bind(this);
          document.addEventListener('keydown', this._handleKeydownBound);
        }

        this._animateIn();
        return this;
      }

      /**
       * Close Modal
       */

    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }

        this.isOpen = false;
        this.el.classList.remove('open');
        document.body.style.overflow = '';

        if (this.options.dismissible) {
          document.removeEventListener('keydown', this._handleKeydownBound);
        }

        this._animateOut();
        return this;
      }
    }], [{
      key: "init",
      value: function init($els, options) {
        var arr = [];
        $els.each(function () {
          arr.push(new Modal(this, options));
        });
        return arr;
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Modal;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Modal;
  }();

  /**
   * @static
   * @memberof Modal
   */


  Modal._increment = 0;

  /**
   * @static
   * @memberof Modal
   */
  Modal._count = 0;

  M.Modal = Modal;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Modal, 'modal', 'M_Modal');
  }
})(cash, M.Vel);
;(function ($, Vel) {
  'use strict';

  var _defaults = {
    inDuration: 275,
    outDuration: 200
  };

  /**
   * @class
   *
   */

  var Materialbox = function () {
    /**
     * Construct Materialbox instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Materialbox(el, options) {
      _classCallCheck(this, Materialbox);

      // If exists, destroy and reinitialize
      if (!!el.M_Materialbox) {
        el.M_Materialbox.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_Materialbox = this;

      /**
       * Options for the modal
       * @member Materialbox#options
       * @prop {Number} [inDuration=275] - Length in ms of enter transition
       * @prop {Number} [outDuration=200] - Length in ms of exit transition
       */
      this.options = $.extend({}, Materialbox.defaults, options);

      this.overlayActive = false;
      this.doneAnimating = true;
      this.placeholder = $('<div></div>').addClass('material-placeholder');
      this.originalWidth = 0;
      this.originalHeight = 0;
      this.originInlineStyles = this.$el.attr('style');
      this.caption = this.el.getAttribute('data-caption') || "";

      // Wrap
      this.$el.before(this.placeholder);
      this.placeholder.append(this.$el);

      this._setupEventHandlers();
    }

    _createClass(Materialbox, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.M_Materialbox = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleMaterialboxClickBound = this._handleMaterialboxClick.bind(this);
        this.el.addEventListener('click', this._handleMaterialboxClickBound);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "removeEventHandlers",
      value: function removeEventHandlers() {
        this.el.removeEventListener('click', this._handleMaterialboxClickBound);
      }

      /**
       * Handle Materialbox Click
       * @param {Event} e
       */

    }, {
      key: "_handleMaterialboxClick",
      value: function _handleMaterialboxClick(e) {
        // If already modal, return to original
        if (this.doneAnimating === false || this.overlayActive && this.doneAnimating) {
          this.close();
        } else {
          this.open();
        }
      }

      /**
       * Handle Window Scroll
       */

    }, {
      key: "_handleWindowScroll",
      value: function _handleWindowScroll() {
        if (this.overlayActive) {
          this.close();
        }
      }

      /**
       * Handle Window Resize
       */

    }, {
      key: "_handleWindowResize",
      value: function _handleWindowResize() {
        if (this.overlayActive) {
          this.close();
        }
      }

      /**
       * Handle Window Resize
       * @param {Event} e
       */

    }, {
      key: "_handleWindowEscape",
      value: function _handleWindowEscape(e) {
        // ESC key
        if (e.keyCode === 27 && this.doneAnimating && this.overlayActive) {
          this.close();
        }
      }

      /**
       * Find ancestors with overflow: hidden; and make visible
       */

    }, {
      key: "_makeAncestorsOverflowVisible",
      value: function _makeAncestorsOverflowVisible() {
        this.ancestorsChanged = $();
        var ancestor = this.placeholder[0].parentNode;
        while (ancestor !== null && !$(ancestor).is(document)) {
          var curr = $(ancestor);
          if (curr.css('overflow') !== 'visible') {
            curr.css('overflow', 'visible');
            if (this.ancestorsChanged === undefined) {
              this.ancestorsChanged = curr;
            } else {
              this.ancestorsChanged = this.ancestorsChanged.add(curr);
            }
          }
          ancestor = ancestor.parentNode;
        }
      }

      /**
       * Animate image in
       */

    }, {
      key: "_animateImageIn",
      value: function _animateImageIn() {
        var _this11 = this;

        var velocityOptions = {
          duration: this.options.inDuration,
          queue: false,
          ease: 'easeOutQuad',
          complete: function () {
            _this11.doneAnimating = true;
          }
        };

        var velocityProperties = {
          height: this.newHeight,
          width: this.newWidth,
          left: M.getDocumentScrollLeft() + this.windowWidth / 2 - this.placeholder.offset().left - this.newWidth / 2,
          top: M.getDocumentScrollTop() + this.windowHeight / 2 - this.placeholder.offset().top - this.newHeight / 2
        };

        if (this.$el.hasClass('responsive-img')) {
          velocityProperties.maxWidth = [this.newWidth, this.newWidth];
          velocityProperties.width = [velocityProperties.width, this.originalWidth];
        } else {
          velocityProperties.left = [velocityProperties.left, 0];
          velocityProperties.top = [velocityProperties.top, 0];
        }

        Vel(this.el, velocityProperties, velocityOptions);
      }

      /**
       * Animate image out
       */

    }, {
      key: "_animateImageOut",
      value: function _animateImageOut() {
        var _this12 = this;

        var velocityOptions = {
          duration: this.options.outDuration,
          queue: false,
          ease: 'easeOutQuad',
          complete: function () {
            _this12.placeholder.css({
              height: '',
              width: '',
              position: '',
              top: '',
              left: ''
            });

            _this12.$el.removeAttr('style');
            _this12.$el.attr('style', _this12.originInlineStyles);

            // Remove class
            _this12.$el.removeClass('active');
            _this12.doneAnimating = true;

            // Remove overflow overrides on ancestors
            if (_this12.ancestorsChanged.length) {
              _this12.ancestorsChanged.css('overflow', '');
            }
          }
        };

        Vel(this.el, {
          width: this.originalWidth,
          height: this.originalHeight,
          left: 0,
          top: 0
        }, velocityOptions);
      }

      /**
       * Update open and close vars
       */

    }, {
      key: "_updateVars",
      value: function _updateVars() {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.caption = this.el.getAttribute('data-caption') || "";
      }

      /**
       * Open Materialbox
       */

    }, {
      key: "open",
      value: function open() {
        var _this13 = this;

        this._updateVars();
        this.originalWidth = this.el.getBoundingClientRect().width;
        this.originalHeight = this.el.getBoundingClientRect().height;

        // Set states
        this.doneAnimating = false;
        this.$el.addClass('active');
        this.overlayActive = true;

        // Set positioning for placeholder
        this.placeholder.css({
          width: this.placeholder[0].getBoundingClientRect().width + 'px',
          height: this.placeholder[0].getBoundingClientRect().height + 'px',
          position: 'relative',
          top: 0,
          left: 0
        });

        this._makeAncestorsOverflowVisible();

        // Set css on origin
        this.$el.css({
          position: 'absolute',
          'z-index': 1000,
          'will-change': 'left, top, width, height'
        });

        // Add overlay
        this.$overlay = $('<div id="materialbox-overlay"></div>').css({
          opacity: 0
        }).one('click', function () {
          if (_this13.doneAnimating) {
            _this13.close();
          }
        });

        // Put before in origin image to preserve z-index layering.
        this.$el.before(this.$overlay);

        // Set dimensions if needed
        var overlayOffset = this.$overlay[0].getBoundingClientRect();
        this.$overlay.css({
          width: this.windowWidth + 'px',
          height: this.windowHeight + 'px',
          left: -1 * overlayOffset.left + 'px',
          top: -1 * overlayOffset.top + 'px'
        });

        // Animate Overlay
        Vel(this.$overlay[0], { opacity: 1 }, { duration: this.options.inDuration, queue: false, ease: 'easeOutQuad' });

        // Add and animate caption if it exists
        if (this.caption !== "") {
          this.$photoCaption = $('<div class="materialbox-caption"></div>');
          this.$photoCaption.text(this.caption);
          $('body').append(this.$photoCaption);
          this.$photoCaption.css({ "display": "inline" });
          Vel(this.$photoCaption[0], { opacity: 1 }, { duration: this.options.inDuration, queue: false, ease: 'easeOutQuad' });
        }

        // Resize Image
        var ratio = 0;
        var widthPercent = this.originalWidth / this.windowWidth;
        var heightPercent = this.originalHeight / this.windowHeight;
        this.newWidth = 0;
        this.newHeight = 0;

        if (widthPercent > heightPercent) {
          ratio = this.originalHeight / this.originalWidth;
          this.newWidth = this.windowWidth * 0.9;
          this.newHeight = this.windowWidth * 0.9 * ratio;
        } else {
          ratio = this.originalWidth / this.originalHeight;
          this.newWidth = this.windowHeight * 0.9 * ratio;
          this.newHeight = this.windowHeight * 0.9;
        }

        this._animateImageIn();

        // Handle Exit triggers
        this._handleWindowScrollBound = this._handleWindowScroll.bind(this);
        this._handleWindowResizeBound = this._handleWindowResize.bind(this);
        this._handleWindowEscapeBound = this._handleWindowEscape.bind(this);

        window.addEventListener('scroll', this._handleWindowScrollBound);
        window.addEventListener('resize', this._handleWindowResizeBound);
        window.addEventListener('keyup', this._handleWindowEscapeBound);
      }

      /**
       * Close Materialbox
       */

    }, {
      key: "close",
      value: function close() {
        var _this14 = this;

        this._updateVars();
        this.doneAnimating = false;

        Vel(this.el, 'stop');
        Vel(this.$overlay[0], 'stop');
        if (this.caption !== "") {
          Vel(this.$photoCaption[0], 'stop');
        }

        // disable exit handlers
        window.removeEventListener('scroll', this._handleWindowScrollBound);
        window.removeEventListener('resize', this._handleWindowResizeBound);
        window.removeEventListener('keyup', this._handleWindowEscapeBound);

        Vel(this.$overlay[0], { opacity: 0 }, { duration: this.options.outDuration, queue: false, ease: 'easeOutQuad', complete: function () {
            _this14.overlayActive = false;
            _this14.$overlay.remove();
          } });

        this._animateImageOut();

        // Remove Caption + reset css settings on image
        if (this.caption !== "") {
          Vel(this.$photoCaption[0], { opacity: 0 }, { duration: this.options.outDuration, queue: false, ease: 'easeOutQuad', complete: function () {
              _this14.$photoCaption.remove();
            } });
        }
      }
    }], [{
      key: "init",
      value: function init($els, options) {
        var arr = [];
        $els.each(function () {
          arr.push(new Materialbox(this, options));
        });
        return arr;
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Materialbox;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Materialbox;
  }();

  M.Materialbox = Materialbox;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Materialbox, 'materialbox', 'M_Materialbox');
  }
})(cash, M.Vel);
;(function ($) {
  'use strict';

  var _defaults = {};

  var Parallax = function () {
    function Parallax(el, options) {
      _classCallCheck(this, Parallax);

      // If exists, destroy and reinitialize
      if (!!el.M_Parallax) {
        el.M_Parallax.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_Parallax = this;

      this.options = $.extend({}, Parallax.defaults, options);

      this.$img = this.$el.find('img').first();
      this._updateParallax();
      this._setupEventHandlers();
      this._setupStyles();

      Parallax._parallaxes.push(this);
    }

    _createClass(Parallax, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {}
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleImageLoadBound = this._handleImageLoad.bind(this);
        this.$img[0].addEventListener('load', this._handleImageLoadBound);

        if (Parallax._parallaxes.length === 0) {
          Parallax._handleScrollThrottled = M.throttle(Parallax._handleScroll, 5);
          window.addEventListener('scroll', Parallax._handleScrollThrottled);
        }
      }
    }, {
      key: "_setupStyles",
      value: function _setupStyles() {
        this.$img[0].style.opacity = 1;
      }
    }, {
      key: "_handleImageLoad",
      value: function _handleImageLoad() {
        this._updateParallax();
        this.$img.each(function () {
          var el = this;
          if (el.complete) $(el).trigger("load");
        });
      }
    }, {
      key: "_updateParallax",
      value: function _updateParallax() {
        var containerHeight = this.$el.height() > 0 ? this.el.parentNode.offsetHeight : 500;
        var imgHeight = this.$img[0].offsetHeight;
        var parallaxDist = imgHeight - containerHeight;
        var bottom = this.$el.offset().top + containerHeight;
        var top = this.$el.offset().top;
        var scrollTop = M.getDocumentScrollTop();
        var windowHeight = window.innerHeight;
        var windowBottom = scrollTop + windowHeight;
        var percentScrolled = (windowBottom - top) / (containerHeight + windowHeight);
        var parallax = parallaxDist * percentScrolled;

        if (bottom > scrollTop && top < scrollTop + windowHeight) {
          this.$img[0].style.transform = "translate3D(-50%, " + parallax + "px, 0)";
        }
      }
    }], [{
      key: "init",
      value: function init($els, options) {
        var arr = [];
        $els.each(function () {
          arr.push(new Parallax(this, options));
        });
        return arr;
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Parallax;
      }
    }, {
      key: "_handleScroll",
      value: function _handleScroll() {
        for (var i = 0; i < Parallax._parallaxes.length; i++) {
          var parallaxInstance = Parallax._parallaxes[i];
          parallaxInstance._updateParallax.call(parallaxInstance);
        }
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Parallax;
  }();

  /**
   * @static
   * @memberof Parallax
   */


  Parallax._parallaxes = [];

  M.Parallax = Parallax;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Parallax, 'parallax', 'M_Parallax');
  }
})(cash);
;(function ($, Vel) {
  'use strict';

  var _defaults = {
    duration: 300,
    onShow: null,
    swipeable: false,
    responsiveThreshold: Infinity // breakpoint for swipeable
  };

  /**
   * @class
   *
   */

  var Tabs = function () {
    /**
     * Construct Tabs instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Tabs(el, options) {
      _classCallCheck(this, Tabs);

      // If exists, destroy and reinitialize
      if (!!el.M_Tabs) {
        el.M_Tabs.destroy();
      }

      /**
       * The jQuery element
       * @type {jQuery}
       */
      this.$el = $(el);

      this.el = el;

      /**
       * Options for the carousel
       * @member Tabs#options
       * @prop {Number} duration
       * @prop {Function} onShow
       * @prop {Boolean} swipeable
       * @prop {Number} responsiveThreshold
       */
      this.options = $.extend({}, Tabs.defaults, options);

      this.el.M_Tabs = this;

      // Setup
      this.$tabLinks = this.$el.children('li.tab').children('a');
      this.index = 0;
      this._setTabsAndTabWidth();
      this._setupActiveTabLink();
      this._createIndicator();

      if (this.options.swipeable) {
        this._setupSwipeableTabs();
      } else {
        this._setupNormalTabs();
      }

      this._setupEventHandlers();
    }

    _createClass(Tabs, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this._indicator.parentNode.removeChild(this._indicator);

        if (this.options.swipeable) {
          this._teardownSwipeableTabs();
        } else {
          this._teardownNormalTabs();
        }

        this.$el[0].M_Tabs = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleWindowResizeBound = this._handleWindowResize.bind(this);
        window.addEventListener('resize', this._handleWindowResizeBound);

        this._handleTabClickBound = this._handleTabClick.bind(this);
        this.el.addEventListener('click', this._handleTabClickBound);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        window.removeEventListener('resize', this._handleWindowResizeBound);
        this.el.removeEventListener('click', this._handleTabClickBound);
      }

      /**
       * Handle window Resize
       */

    }, {
      key: "_handleWindowResize",
      value: function _handleWindowResize() {
        this._setTabsAndTabWidth();

        if (this.tabWidth !== 0 && this.tabsWidth !== 0) {
          this._indicator.style.left = this._calcLeftPos(this.$activeTabLink) + 'px';
          this._indicator.style.right = this._calcRightPos(this.$activeTabLink) + 'px';
        }
      }

      /**
       * Handle tab click
       * @param {Event} e
       */

    }, {
      key: "_handleTabClick",
      value: function _handleTabClick(e) {
        var _this15 = this;

        var tab = $(e.target).closest('li.tab');
        var tabLink = $(e.target).closest('a');

        // Handle click on tab link only
        if (!tabLink.length || !tabLink.parent().hasClass('tab')) {
          return;
        }

        if (tab.hasClass('disabled')) {
          e.preventDefault();
          return;
        }

        // Act as regular link if target attribute is specified.
        if (!!tabLink.attr("target")) {
          return;
        }

        this._setTabsAndTabWidth();

        // Make the old tab inactive.
        this.$activeTabLink.removeClass('active');
        var $oldContent = this.$content;

        // Update the variables with the new link and content
        this.$activeTabLink = tabLink;
        this.$content = $(M.escapeHash(tabLink[0].hash));
        this.$tabLinks = this.$el.children('li.tab').children('a');

        // Make the tab active.
        this.$activeTabLink.addClass('active');
        var prevIndex = this.index;
        this.index = Math.max(this.$tabLinks.index(tabLink), 0);

        // Swap content
        if (this.options.swipeable) {
          if (this._tabsCarousel) {
            this._tabsCarousel.set(this.index, function () {
              if (typeof _this15.options.onShow === "function") {
                _this15.options.onShow.call(_this15, _this15.$content[0]);
              }
            });
          }
        } else {
          if (this.$content !== undefined) {
            this.$content[0].style.display = 'block';
            this.$content.addClass('active');
            if (typeof this.options.onShow === 'function') {
              this.options.onShow.call(this, this.$content[0]);
            }

            if ($oldContent !== undefined && !$oldContent.is(this.$content)) {
              $oldContent[0].style.display = 'none';
              $oldContent.removeClass('active');
            }
          }
        }

        // Update indicator
        this._animateIndicator(prevIndex);

        // Prevent the anchor's default click action
        e.preventDefault();
      }

      /**
       * Generate elements for tab indicator.
       */

    }, {
      key: "_createIndicator",
      value: function _createIndicator() {
        var _this16 = this;

        var indicator = document.createElement('li');
        indicator.classList.add('indicator');

        this.el.appendChild(indicator);
        this._indicator = indicator;

        setTimeout(function () {
          _this16._indicator.style.left = _this16._calcLeftPos(_this16.$activeTabLink) + 'px';
          _this16._indicator.style.right = _this16._calcRightPos(_this16.$activeTabLink) + 'px';
        }, 0);
      }

      /**
       * Setup first active tab link.
       */

    }, {
      key: "_setupActiveTabLink",
      value: function _setupActiveTabLink() {
        // If the location.hash matches one of the links, use that as the active tab.
        this.$activeTabLink = $(this.$tabLinks.filter('[href="' + location.hash + '"]'));

        // If no match is found, use the first link or any with class 'active' as the initial active tab.
        if (this.$activeTabLink.length === 0) {
          this.$activeTabLink = this.$el.children('li.tab').children('a.active').first();
        }
        if (this.$activeTabLink.length === 0) {
          this.$activeTabLink = this.$el.children('li.tab').children('a').first();
        }

        this.$tabLinks.removeClass('active');
        this.$activeTabLink[0].classList.add('active');

        this.index = Math.max(this.$tabLinks.index(this.$activeTabLink), 0);

        if (this.$activeTabLink.length) {
          this.$content = $(M.escapeHash(this.$activeTabLink[0].hash));
          this.$content.addClass('active');
        }
      }

      /**
       * Setup swipeable tabs
       */

    }, {
      key: "_setupSwipeableTabs",
      value: function _setupSwipeableTabs() {
        var _this17 = this;

        // Change swipeable according to responsive threshold
        if (window.innerWidth > options.responsiveThreshold) {
          this.options.swipeable = false;
        }

        var $tabsContent = $();
        this.$tabLinks.each(function (link) {
          var $currContent = $(M.escapeHash(link.hash));
          $currContent.addClass('carousel-item');
          $tabsContent = $tabsContent.add($currContent);
        });

        var $tabsWrapper = $('<div class="tabs-content carousel carousel-slider"></div>');
        $tabsContent.first().before($tabsWrapper);
        $tabsWrapper.append($tabsContent);
        $tabsContent[0].style.display = '';

        this._tabsCarousel = new M.Carousel($tabsWrapper[0], {
          fullWidth: true,
          noWrap: true,
          onCycleTo: function (item) {
            var prevIndex = _this17.index;
            _this17.index = $(item).index();
            _this17.$activeTabLink.removeClass('active');
            _this17.$activeTabLink = _this17.$tabLinks.eq(_this17.index);
            _this17.$activeTabLink.addClass('active');
            _this17._animateIndicator(prevIndex);
            if (typeof _this17.options.onShow === "function") {
              _this17.options.onShow.call(_this17, _this17.$content);
            }
          }
        });
      }

      /**
       * Teardown normal tabs.
       */

    }, {
      key: "_teardownSwipeableTabs",
      value: function _teardownSwipeableTabs() {
        var $tabsWrapper = this._tabsCarousel.$el;
        this._tabsCarousel.destroy();

        // Unwrap
        $tabsWrapper.after($tabsWrapper.children());
        $tabsWrapper.remove();
      }

      /**
       * Setup normal tabs.
       */

    }, {
      key: "_setupNormalTabs",
      value: function _setupNormalTabs() {
        // Hide Tabs Content
        this.$tabLinks.not(this.$activeTabLink).each(function (link) {
          if (!!link.hash) {
            var $currContent = $(M.escapeHash(link.hash));
            if ($currContent.length) {
              $currContent[0].style.display = 'none';
            }
          }
        });
      }

      /**
       * Teardown normal tabs.
       */

    }, {
      key: "_teardownNormalTabs",
      value: function _teardownNormalTabs() {
        // show Tabs Content
        this.$tabLinks.each(function (link) {
          if (!!link.hash) {
            var $currContent = $(M.escapeHash(link.hash));
            if ($currContent.length) {
              $currContent[0].style.display = '';
            }
          }
        });
      }

      /**
       * set tabs and tab width
       */

    }, {
      key: "_setTabsAndTabWidth",
      value: function _setTabsAndTabWidth() {
        this.tabsWidth = this.$el.width();
        this.tabWidth = Math.max(this.tabsWidth, this.el.scrollWidth) / this.$tabLinks.length;
      }

      /**
       * Finds right attribute for indicator based on active tab.
       * @param {jQuery} el
       */

    }, {
      key: "_calcRightPos",
      value: function _calcRightPos(el) {
        return Math.ceil(this.tabsWidth - el.position().left - el[0].getBoundingClientRect().width);
      }

      /**
       * Finds left attribute for indicator based on active tab.
       * @param {jQuery} el
       */

    }, {
      key: "_calcLeftPos",
      value: function _calcLeftPos(el) {
        return Math.floor(el.position().left);
      }

      /**
       * Animates Indicator to active tab.
       * @param {Number} prevIndex
       */

    }, {
      key: "_animateIndicator",
      value: function _animateIndicator(prevIndex) {
        var velOptions = {
          duration: this.options.duration,
          queue: false,
          easing: 'easeOutQuad'
        };
        var velOptionsLeft = void 0,
            velOptionsRight = void 0;

        if (this.index - prevIndex >= 0) {
          velOptionsLeft = $.extend({}, velOptions, { delay: 90 });
          velOptionsRight = velOptions;
        } else {
          velOptionsLeft = velOptions;
          velOptionsRight = $.extend({}, velOptions, { delay: 90 });
        }

        // Animate with velocity
        Vel(this._indicator, { left: this._calcLeftPos(this.$activeTabLink) }, velOptionsLeft);
        Vel(this._indicator, { right: this._calcRightPos(this.$activeTabLink) }, velOptionsRight);
      }

      /**
       * Select tab.
       * @param {String} tabId
       */

    }, {
      key: "select",
      value: function select(tabId) {
        var tab = this.$tabLinks.filter('[href="#' + tabId + '"]');
        if (tab.length) {
          tab.trigger('click');
        }
      }
    }], [{
      key: "init",
      value: function init($els, options) {
        var arr = [];
        $els.each(function () {
          arr.push(new Tabs(this, options));
        });
        return arr;
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Tabs;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Tabs;
  }();

  window.M.Tabs = Tabs;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Tabs, 'tabs', 'M_Tabs');
  }
})(cash, M.Vel);
;(function ($, Vel) {
  'use strict';

  var _defaults = {
    exitDelay: 200,
    enterDelay: 0,
    html: null,
    margin: 5,
    inDuration: 300,
    outDuration: 250,
    position: 'bottom',
    transitionMovement: 10
  };

  /**
   * @class
   *
   */

  var Tooltip = function () {
    /**
     * Construct Tooltip instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Tooltip(el, options) {
      _classCallCheck(this, Tooltip);

      // If exists, destroy and reinitialize
      if (!!el.M_Tooltip) {
        el.M_Tooltip.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_Tooltip = this;
      this.options = $.extend({}, Tooltip.defaults, options);

      this.isOpen = false;
      this.isHovered = false;
      this._appendTooltipEl();
      this._setupEventHandlers();
    }

    _createClass(Tooltip, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        $(this.tooltipEl).remove();
        this._removeEventHandlers();
        this.$el[0].M_Tooltip = undefined;
      }
    }, {
      key: "_appendTooltipEl",
      value: function _appendTooltipEl() {
        var tooltipEl = document.createElement('div');
        tooltipEl.classList.add('material-tooltip');
        this.tooltipEl = tooltipEl;

        var tooltipContentEl = document.createElement('div');
        tooltipContentEl.classList.add('tooltip-content');
        tooltipContentEl.innerHTML = this.options.html;
        tooltipEl.appendChild(tooltipContentEl);
        document.body.appendChild(tooltipEl);
      }
    }, {
      key: "_updateTooltipContent",
      value: function _updateTooltipContent() {
        this.tooltipEl.querySelector('.tooltip-content').innerHTML = this.options.html;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this.handleMouseEnterBound = this._handleMouseEnter.bind(this);
        this.handleMouseLeaveBound = this._handleMouseLeave.bind(this);
        this.$el[0].addEventListener('mouseenter', this.handleMouseEnterBound);
        this.$el[0].addEventListener('mouseleave', this.handleMouseLeaveBound);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.$el[0].removeEventListener('mouseenter', this.handleMouseEnterBound);
        this.$el[0].removeEventListener('mouseleave', this.handleMouseLeaveBound);
      }
    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }

        this.isOpen = true;
        // Update tooltip content with HTML attribute options
        this.options = $.extend({}, this.options, this._getAttributeOptions());
        this._updateTooltipContent();
        this._setEnterDelayTimeout();
      }
    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }

        this.isOpen = false;
        this._setExitDelayTimeout();
      }

      /**
        * Create timeout which delays when the tooltip closes
        */

    }, {
      key: "_setExitDelayTimeout",
      value: function _setExitDelayTimeout() {
        var _this18 = this;

        clearTimeout(this._exitDelayTimeout);

        this._exitDelayTimeout = setTimeout(function () {
          if (_this18.isHovered) {
            return;
          } else {
            _this18._animateOut();
          }
        }, this.options.exitDelay);
      }

      /**
       * Create timeout which delays when the toast closes
       */

    }, {
      key: "_setEnterDelayTimeout",
      value: function _setEnterDelayTimeout() {
        var _this19 = this;

        clearTimeout(this._enterDelayTimeout);

        this._enterDelayTimeout = setTimeout(function () {
          if (!_this19.isHovered) {
            return;
          } else {
            _this19._animateIn();
          }
        }, this.options.enterDelay);
      }
    }, {
      key: "_positionTooltip",
      value: function _positionTooltip() {
        var origin = this.$el[0],
            tooltip = this.tooltipEl,
            originHeight = origin.offsetHeight,
            originWidth = origin.offsetWidth,
            tooltipHeight = tooltip.offsetHeight,
            tooltipWidth = tooltip.offsetWidth,
            newCoordinates = void 0,
            margin = this.options.margin,
            targetTop = void 0,
            targetLeft = void 0;

        this.xMovement = 0, this.yMovement = 0;

        targetTop = origin.offsetTop;
        targetLeft = origin.offsetLeft;

        if (this.options.position === 'top') {
          targetTop += -tooltipHeight - margin;
          targetLeft += originWidth / 2 - tooltipWidth / 2;
          this.yMovement = -this.options.transitionMovement;
        } else if (this.options.position === 'right') {
          targetTop += originHeight / 2 - tooltipHeight / 2;
          targetLeft += originWidth + margin;
          this.xMovement = this.options.transitionMovement;
        } else if (this.options.position === 'left') {
          targetTop += originHeight / 2 - tooltipHeight / 2;
          targetLeft += -tooltipWidth - margin;
          this.xMovement = -this.options.transitionMovement;
        } else {
          targetTop += originHeight + margin;
          targetLeft += originWidth / 2 - tooltipWidth / 2;
          this.yMovement = this.options.transitionMovement;
        }

        newCoordinates = this._repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
        $(tooltip).css({
          top: newCoordinates.y + 'px',
          left: newCoordinates.x + 'px'
        });
      }
    }, {
      key: "_repositionWithinScreen",
      value: function _repositionWithinScreen(x, y, width, height) {
        var scrollLeft = M.getDocumentScrollLeft();
        var scrollTop = M.getDocumentScrollTop();
        var newX = x - scrollLeft;
        var newY = y - scrollTop;

        var bounding = {
          left: newX,
          top: newY,
          width: width,
          height: height
        };

        var offset = this.options.margin + this.options.transitionMovement;
        var edges = M.checkWithinContainer(document.body, bounding, offset);

        if (edges.left) {
          newX = offset;
        } else if (edges.right) {
          newX -= newX + width - window.innerWidth;
        }

        if (edges.top) {
          newY = offset;
        } else if (edges.bottom) {
          newY -= newY + height - window.innerHeight;
        }

        return { x: newX + scrollLeft, y: newY + scrollTop };
      }
    }, {
      key: "_animateIn",
      value: function _animateIn() {
        this._positionTooltip();
        this.tooltipEl.style.visibility = 'visible';
        Vel(this.tooltipEl, 'stop');
        Vel(this.tooltipEl, {
          opacity: 1,
          translateX: this.xMovement,
          translateY: this.yMovement
        }, {
          duration: this.options.inDuration,
          easing: 'easeOutCubic',
          queue: false
        });
      }
    }, {
      key: "_animateOut",
      value: function _animateOut() {
        Vel(this.tooltipEl, 'stop');
        Vel(this.tooltipEl, {
          opacity: 0,
          translateX: 0,
          translateY: 0
        }, {
          duration: this.options.outDuration,
          easing: 'easeOutCubic',
          queue: false
        });
      }
    }, {
      key: "_handleMouseEnter",
      value: function _handleMouseEnter() {
        this.isHovered = true;
        this.open();
      }
    }, {
      key: "_handleMouseLeave",
      value: function _handleMouseLeave() {
        this.isHovered = false;
        this.close();
      }
    }, {
      key: "_getAttributeOptions",
      value: function _getAttributeOptions() {
        var attributeOptions = {};
        var tooltipTextOption = this.$el[0].getAttribute('data-tooltip');
        var positionOption = this.$el[0].getAttribute('data-position');

        if (tooltipTextOption) {
          attributeOptions.html = tooltipTextOption;
        }

        if (positionOption) {
          attributeOptions.position = positionOption;
        }
        return attributeOptions;
      }
    }], [{
      key: "init",
      value: function init($els, options) {
        var arr = [];
        $els.each(function () {
          arr.push(new Tooltip(this, options));
        });
        return arr;
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Tooltip;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Tooltip;
  }();

  M.Tooltip = Tooltip;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Tooltip, 'tooltip', 'M_Tooltip');
  }
})(cash, M.Vel);
; /*!
  * Waves v0.6.4
  * http://fian.my.id/Waves
  *
  * Copyright 2014 Alfiana E. Sibuea and other contributors
  * Released under the MIT license
  * https://github.com/fians/Waves/blob/master/LICENSE
  */

;(function (window) {
  'use strict';

  var Waves = Waves || {};
  var $$ = document.querySelectorAll.bind(document);

  // Find exact position of element
  function isWindow(obj) {
    return obj !== null && obj === obj.window;
  }

  function getWindow(elem) {
    return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }

  function offset(elem) {
    var docElem,
        win,
        box = { top: 0, left: 0 },
        doc = elem && elem.ownerDocument;

    docElem = doc.documentElement;

    if (typeof elem.getBoundingClientRect !== typeof undefined) {
      box = elem.getBoundingClientRect();
    }
    win = getWindow(doc);
    return {
      top: box.top + win.pageYOffset - docElem.clientTop,
      left: box.left + win.pageXOffset - docElem.clientLeft
    };
  }

  function convertStyle(obj) {
    var style = '';

    for (var a in obj) {
      if (obj.hasOwnProperty(a)) {
        style += a + ':' + obj[a] + ';';
      }
    }

    return style;
  }

  var Effect = {

    // Effect delay
    duration: 750,

    show: function (e, element) {

      // Disable right click
      if (e.button === 2) {
        return false;
      }

      var el = element || this;

      // Create ripple
      var ripple = document.createElement('div');
      ripple.className = 'waves-ripple';
      el.appendChild(ripple);

      // Get click coordinate and element witdh
      var pos = offset(el);
      var relativeY = e.pageY - pos.top;
      var relativeX = e.pageX - pos.left;
      var scale = 'scale(' + el.clientWidth / 100 * 10 + ')';

      // Support for touch devices
      if ('touches' in e) {
        relativeY = e.touches[0].pageY - pos.top;
        relativeX = e.touches[0].pageX - pos.left;
      }

      // Attach data to element
      ripple.setAttribute('data-hold', Date.now());
      ripple.setAttribute('data-scale', scale);
      ripple.setAttribute('data-x', relativeX);
      ripple.setAttribute('data-y', relativeY);

      // Set ripple position
      var rippleStyle = {
        'top': relativeY + 'px',
        'left': relativeX + 'px'
      };

      ripple.className = ripple.className + ' waves-notransition';
      ripple.setAttribute('style', convertStyle(rippleStyle));
      ripple.className = ripple.className.replace('waves-notransition', '');

      // Scale the ripple
      rippleStyle['-webkit-transform'] = scale;
      rippleStyle['-moz-transform'] = scale;
      rippleStyle['-ms-transform'] = scale;
      rippleStyle['-o-transform'] = scale;
      rippleStyle.transform = scale;
      rippleStyle.opacity = '1';

      rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
      rippleStyle['-moz-transition-duration'] = Effect.duration + 'ms';
      rippleStyle['-o-transition-duration'] = Effect.duration + 'ms';
      rippleStyle['transition-duration'] = Effect.duration + 'ms';

      rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
      rippleStyle['-moz-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
      rippleStyle['-o-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
      rippleStyle['transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';

      ripple.setAttribute('style', convertStyle(rippleStyle));
    },

    hide: function (e) {
      TouchHandler.touchup(e);

      var el = this;
      var width = el.clientWidth * 1.4;

      // Get first ripple
      var ripple = null;
      var ripples = el.getElementsByClassName('waves-ripple');
      if (ripples.length > 0) {
        ripple = ripples[ripples.length - 1];
      } else {
        return false;
      }

      var relativeX = ripple.getAttribute('data-x');
      var relativeY = ripple.getAttribute('data-y');
      var scale = ripple.getAttribute('data-scale');

      // Get delay beetween mousedown and mouse leave
      var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
      var delay = 350 - diff;

      if (delay < 0) {
        delay = 0;
      }

      // Fade out ripple after delay
      setTimeout(function () {
        var style = {
          'top': relativeY + 'px',
          'left': relativeX + 'px',
          'opacity': '0',

          // Duration
          '-webkit-transition-duration': Effect.duration + 'ms',
          '-moz-transition-duration': Effect.duration + 'ms',
          '-o-transition-duration': Effect.duration + 'ms',
          'transition-duration': Effect.duration + 'ms',
          '-webkit-transform': scale,
          '-moz-transform': scale,
          '-ms-transform': scale,
          '-o-transform': scale,
          'transform': scale
        };

        ripple.setAttribute('style', convertStyle(style));

        setTimeout(function () {
          try {
            el.removeChild(ripple);
          } catch (e) {
            return false;
          }
        }, Effect.duration);
      }, delay);
    },

    // Little hack to make <input> can perform waves effect
    wrapInput: function (elements) {
      for (var a = 0; a < elements.length; a++) {
        var el = elements[a];

        if (el.tagName.toLowerCase() === 'input') {
          var parent = el.parentNode;

          // If input already have parent just pass through
          if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('waves-effect') !== -1) {
            continue;
          }

          // Put element class and style to the specified parent
          var wrapper = document.createElement('i');
          wrapper.className = el.className + ' waves-input-wrapper';

          var elementStyle = el.getAttribute('style');

          if (!elementStyle) {
            elementStyle = '';
          }

          wrapper.setAttribute('style', elementStyle);

          el.className = 'waves-button-input';
          el.removeAttribute('style');

          // Put element as child
          parent.replaceChild(wrapper, el);
          wrapper.appendChild(el);
        }
      }
    }
  };

  /**
   * Disable mousedown event for 500ms during and after touch
   */
  var TouchHandler = {
    /* uses an integer rather than bool so there's no issues with
     * needing to clear timeouts if another touch event occurred
     * within the 500ms. Cannot mouseup between touchstart and
     * touchend, nor in the 500ms after touchend. */
    touches: 0,
    allowEvent: function (e) {
      var allow = true;

      if (e.type === 'touchstart') {
        TouchHandler.touches += 1; //push
      } else if (e.type === 'touchend' || e.type === 'touchcancel') {
        setTimeout(function () {
          if (TouchHandler.touches > 0) {
            TouchHandler.touches -= 1; //pop after 500ms
          }
        }, 500);
      } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
        allow = false;
      }

      return allow;
    },
    touchup: function (e) {
      TouchHandler.allowEvent(e);
    }
  };

  /**
   * Delegated click handler for .waves-effect element.
   * returns null when .waves-effect element not in "click tree"
   */
  function getWavesEffectElement(e) {
    if (TouchHandler.allowEvent(e) === false) {
      return null;
    }

    var element = null;
    var target = e.target || e.srcElement;

    while (target.parentNode !== null) {
      if (!(target instanceof SVGElement) && target.className.indexOf('waves-effect') !== -1) {
        element = target;
        break;
      }
      target = target.parentNode;
    }
    return element;
  }

  /**
   * Bubble the click and show effect if .waves-effect elem was found
   */
  function showEffect(e) {
    var element = getWavesEffectElement(e);

    if (element !== null) {
      Effect.show(e, element);

      if ('ontouchstart' in window) {
        element.addEventListener('touchend', Effect.hide, false);
        element.addEventListener('touchcancel', Effect.hide, false);
      }

      element.addEventListener('mouseup', Effect.hide, false);
      element.addEventListener('mouseleave', Effect.hide, false);
      element.addEventListener('dragend', Effect.hide, false);
    }
  }

  Waves.displayEffect = function (options) {
    options = options || {};

    if ('duration' in options) {
      Effect.duration = options.duration;
    }

    //Wrap input inside <i> tag
    Effect.wrapInput($$('.waves-effect'));

    if ('ontouchstart' in window) {
      document.body.addEventListener('touchstart', showEffect, false);
    }

    document.body.addEventListener('mousedown', showEffect, false);
  };

  /**
   * Attach Waves to an input element (or any element which doesn't
   * bubble mouseup/mousedown events).
   *   Intended to be used with dynamically loaded forms/inputs, or
   * where the user doesn't want a delegated click handler.
   */
  Waves.attach = function (element) {
    //FUTURE: automatically add waves classes and allow users
    // to specify them with an options param? Eg. light/classic/button
    if (element.tagName.toLowerCase() === 'input') {
      Effect.wrapInput([element]);
      element = element.parentNode;
    }

    if ('ontouchstart' in window) {
      element.addEventListener('touchstart', showEffect, false);
    }

    element.addEventListener('mousedown', showEffect, false);
  };

  window.Waves = Waves;

  document.addEventListener('DOMContentLoaded', function () {
    Waves.displayEffect();
  }, false);
})(window);
;(function ($, Vel) {
  'use strict';

  var _defaults = {
    html: '',
    displayLength: 4000,
    inDuration: 300,
    outDuration: 375,
    classes: '',
    completeCallback: null,
    activationPercent: 0.8
  };

  var Toast = function () {
    function Toast(options) {
      _classCallCheck(this, Toast);

      /**
       * Options for the toast
       * @member Toast#options
       */
      this.options = $.extend({}, Toast.defaults, options);
      this.message = this.options.html;

      /**
       * Describes current pan state toast
       * @type {Boolean}
       */
      this.panning = false;

      /**
       * Time remaining until toast is removed
       */
      this.timeRemaining = this.options.displayLength;

      if (Toast._toasts.length === 0) {
        Toast._createContainer();
      }

      // Create new toast
      Toast._toasts.push(this);
      var toastElement = this._createToast();
      toastElement.M_Toast = this;
      this.el = toastElement;
      this._animateIn();
      this._setTimer();
    }

    _createClass(Toast, [{
      key: "_createToast",


      /**
       * Create toast and append it to toast container
       */
      value: function _createToast() {
        var toast = document.createElement('div');
        toast.classList.add('toast');

        // Add custom classes onto toast
        if (!!this.options.classes.length) {
          $(toast).addClass(this.options.classes);
        }

        // Set content
        if (typeof HTMLElement === 'object' ? this.message instanceof HTMLElement : this.message && typeof this.message === 'object' && this.message !== null && this.message.nodeType === 1 && typeof this.message.nodeName === 'string') {
          toast.appendChild(this.message);

          // Check if it is jQuery object
        } else if (!!this.message.jquery) {
          $(toast).append(this.message[0]);

          // Insert as html;
        } else {
          toast.innerHTML = this.message;
        }

        // Append toasft
        Toast._container.appendChild(toast);
        return toast;
      }

      /**
       * Animate in toast
       */

    }, {
      key: "_animateIn",
      value: function _animateIn() {
        // Animate toast in
        Vel(this.el, { top: 0, opacity: 1 }, {
          duration: 300,
          easing: 'easeOutCubic',
          queue: false
        });
      }

      /**
       * Create setInterval which automatically removes toast when timeRemaining >= 0
       * has been reached
       */

    }, {
      key: "_setTimer",
      value: function _setTimer() {
        var _this20 = this;

        if (this.timeRemaining !== Infinity) {
          this.counterInterval = setInterval(function () {
            // If toast is not being dragged, decrease its time remaining
            if (!_this20.panning) {
              _this20.timeRemaining -= 20;
            }

            // Animate toast out
            if (_this20.timeRemaining <= 0) {
              _this20.dismiss();
            }
          }, 20);
        }
      }

      /**
       * Dismiss toast with animation
       */

    }, {
      key: "dismiss",
      value: function dismiss() {
        var _this21 = this;

        window.clearInterval(this.counterInterval);
        var activationDistance = this.el.offsetWidth * this.options.activationPercent;

        if (this.wasSwiped) {
          this.el.style.transition = 'transform .05s, opacity .05s';
          this.el.style.transform = "translateX(" + activationDistance + "px)";
          this.el.style.opacity = 0;
        }

        Vel(this.el, { opacity: 0, marginTop: '-40px' }, {
          duration: this.options.outDuration,
          easing: 'easeOutExpo',
          queue: false,
          complete: function () {
            // Call the optional callback
            if (typeof _this21.options.completeCallback === 'function') {
              _this21.options.completeCallback();
            }
            // Remove toast from DOM
            _this21.el.parentNode.removeChild(_this21.el);
            Toast._toasts.splice(Toast._toasts.indexOf(_this21), 1);
            if (Toast._toasts.length === 0) {
              Toast._removeContainer();
            }
          }
        });
      }
    }], [{
      key: "getInstance",


      /**
       * Get Instance
       */
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Toast;
      }

      /**
       * Append toast container and add event handlers
       */

    }, {
      key: "_createContainer",
      value: function _createContainer() {
        var container = document.createElement('div');
        container.setAttribute('id', 'toast-container');

        // Add event handler
        container.addEventListener('touchstart', Toast._onDragStart);
        container.addEventListener('touchmove', Toast._onDragMove);
        container.addEventListener('touchend', Toast._onDragEnd);

        container.addEventListener('mousedown', Toast._onDragStart);
        document.addEventListener('mousemove', Toast._onDragMove);
        document.addEventListener('mouseup', Toast._onDragEnd);

        document.body.appendChild(container);
        Toast._container = container;
      }

      /**
       * Remove toast container and event handlers
       */

    }, {
      key: "_removeContainer",
      value: function _removeContainer() {
        // Add event handler
        document.removeEventListener('mousemove', Toast._onDragMove);
        document.removeEventListener('mouseup', Toast._onDragEnd);

        Toast._container.parentNode.removeChild(Toast._container);
        Toast._container = null;
      }

      /**
       * Begin drag handler
       * @param {Event} e
       */

    }, {
      key: "_onDragStart",
      value: function _onDragStart(e) {
        if (e.target && $(e.target).closest('.toast').length) {
          var $toast = $(e.target).closest('.toast');
          var toast = $toast[0].M_Toast;
          toast.panning = true;
          Toast._draggedToast = toast;
          toast.el.classList.add('panning');
          toast.el.style.transition = '';
          toast.startingXPos = Toast._xPos(e);
          toast.time = Date.now();
          toast.xPos = Toast._xPos(e);
        }
      }

      /**
       * Drag move handler
       * @param {Event} e
       */

    }, {
      key: "_onDragMove",
      value: function _onDragMove(e) {
        if (!!Toast._draggedToast) {
          e.preventDefault();
          var toast = Toast._draggedToast;
          toast.deltaX = Math.abs(toast.xPos - Toast._xPos(e));
          toast.xPos = Toast._xPos(e);
          toast.velocityX = toast.deltaX / (Date.now() - toast.time);
          toast.time = Date.now();

          var totalDeltaX = toast.xPos - toast.startingXPos;
          var activationDistance = toast.el.offsetWidth * toast.options.activationPercent;
          toast.el.style.transform = "translateX(" + totalDeltaX + "px)";
          toast.el.style.opacity = 1 - Math.abs(totalDeltaX / activationDistance);
        }
      }

      /**
       * End drag handler
       */

    }, {
      key: "_onDragEnd",
      value: function _onDragEnd() {
        if (!!Toast._draggedToast) {
          var toast = Toast._draggedToast;
          toast.panning = false;
          toast.el.classList.remove('panning');

          var totalDeltaX = toast.xPos - toast.startingXPos;
          var activationDistance = toast.el.offsetWidth * toast.options.activationPercent;
          var shouldBeDismissed = Math.abs(totalDeltaX) > activationDistance || toast.velocityX > 1;

          // Remove toast
          if (shouldBeDismissed) {
            toast.wasSwiped = true;
            toast.dismiss();

            // Animate toast back to original position
          } else {
            toast.el.style.transition = 'transform .2s, opacity .2s';
            toast.el.style.transform = '';
            toast.el.style.opacity = '';
          }
          Toast._draggedToast = null;
        }
      }

      /**
       * Get x position of mouse or touch event
       * @param {Event} e
       */

    }, {
      key: "_xPos",
      value: function _xPos(e) {
        if (e.targetTouches && e.targetTouches.length >= 1) {
          return e.targetTouches[0].clientX;
        }
        // mouse event
        return e.clientX;
      }

      /**
       * Remove all toasts
       */

    }, {
      key: "dismissAll",
      value: function dismissAll() {
        for (var toastIndex in Toast._toasts) {
          Toast._toasts[toastIndex].dismiss();
        }
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Toast;
  }();

  /**
   * @static
   * @memberof Toast
   * @type {Array.<Toast>}
   */


  Toast._toasts = [];

  /**
   * @static
   * @memberof Toast
   */
  Toast._container = null;

  /**
   * @static
   * @memberof Toast
   * @type {Toast}
   */
  Toast._draggedToast = null;

  M.Toast = Toast;
  M.toast = function (options) {
    return new Toast(options);
  };
})(cash, M.Vel);
;(function ($, Vel) {
  'use strict';

  var _defaults = {
    edge: 'left',
    draggable: true,
    inDuration: 250,
    outDuration: 200,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null
  };

  /**
   * @class
   */

  var Sidenav = function () {
    /**
     * Construct Sidenav instance and set up overlay
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Sidenav(el, options) {
      _classCallCheck(this, Sidenav);

      // If exists, destroy and reinitialize
      if (!!el.M_Sidenav) {
        el.M_Sidenav.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_Sidenav = this;
      this.id = this.$el.attr('id');

      /**
       * Options for the Sidenav
       * @member Sidenav#options
       * @prop {String} [edge='left'] - Side of screen on which Sidenav appears
       * @prop {Boolean} [draggable=true] - Allow swipe gestures to open/close Sidenav
       * @prop {Number} [inDuration=250] - Length in ms of enter transition
       * @prop {Number} [outDuration=200] - Length in ms of exit transition
       * @prop {Function} onOpenStart - Function called when sidenav starts entering
       * @prop {Function} onOpenEnd - Function called when sidenav finishes entering
       * @prop {Function} onCloseStart - Function called when sidenav starts exiting
       * @prop {Function} onCloseEnd - Function called when sidenav finishes exiting
       */
      this.options = $.extend({}, Sidenav.defaults, options);

      /**
       * Describes open/close state of Sidenav
       * @type {Boolean}
       */
      this.isOpen = false;

      /**
       * Describes if Sidenav is fixed
       * @type {Boolean}
       */
      this.isFixed = this.el.classList.contains('sidenav-fixed');

      /**
       * Describes if Sidenav is being draggeed
       * @type {Boolean}
       */
      this.isDragged = false;

      this._createOverlay();
      this._createDragTarget();
      this._setupEventHandlers();
      this._setupClasses();
      this._setupFixed();

      Sidenav._sidenavs.push(this);
    }

    _createClass(Sidenav, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this._overlay.parentNode.removeChild(this._overlay);
        this.dragTarget.parentNode.removeChild(this.dragTarget);
        this.el.M_Sidenav = undefined;

        var index = Sidenav._sidenavs.indexOf(this);
        if (index >= 0) {
          Sidenav._sidenavs.splice(index, 1);
        }
      }
    }, {
      key: "_createOverlay",
      value: function _createOverlay() {
        var overlay = document.createElement('div');
        this._closeBound = this.close.bind(this);
        overlay.classList.add('sidenav-overlay');

        overlay.addEventListener('click', this._closeBound);

        document.body.appendChild(overlay);
        this._overlay = overlay;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        if (Sidenav._sidenavs.length === 0) {
          document.body.addEventListener('click', this._handleTriggerClick);
        }

        this._handleDragTargetDragBound = this._handleDragTargetDrag.bind(this);
        this._handleDragTargetReleaseBound = this._handleDragTargetRelease.bind(this);
        this._handleCloseDragBound = this._handleCloseDrag.bind(this);
        this._handleCloseReleaseBound = this._handleCloseRelease.bind(this);
        this._handleCloseTriggerClickBound = this._handleCloseTriggerClick.bind(this);

        this.dragTarget.addEventListener('touchmove', this._handleDragTargetDragBound);
        this.dragTarget.addEventListener('touchend', this._handleDragTargetReleaseBound);
        this._overlay.addEventListener('touchmove', this._handleCloseDragBound);
        this._overlay.addEventListener('touchend', this._handleCloseReleaseBound);
        this.el.addEventListener('touchmove', this._handleCloseDragBound);
        this.el.addEventListener('touchend', this._handleCloseReleaseBound);
        this.el.addEventListener('click', this._handleCloseTriggerClickBound);

        // Add resize for side nav fixed
        if (this.isFixed) {
          this._handleWindowResizeBound = this._handleWindowResize.bind(this);
          window.addEventListener('resize', this._handleWindowResizeBound);
        }
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        if (Sidenav._sidenavs.length === 1) {
          document.body.removeEventListener('click', this._handleTriggerClick);
        }

        this.dragTarget.removeEventListener('touchmove', this._handleDragTargetDragBound);
        this.dragTarget.removeEventListener('touchend', this._handleDragTargetReleaseBound);
        this._overlay.removeEventListener('touchmove', this._handleCloseDragBound);
        this._overlay.removeEventListener('touchend', this._handleCloseReleaseBound);
        this.el.removeEventListener('touchmove', this._handleCloseDragBound);
        this.el.removeEventListener('touchend', this._handleCloseReleaseBound);
        this.el.removeEventListener('click', this._handleCloseTriggerClickBound);

        // Remove resize for side nav fixed
        if (this.isFixed) {
          window.removeEventListener('resize', this._handleWindowResizeBound);
        }
      }

      /**
       * Handle Trigger Click
       * @param {Event} e
       */

    }, {
      key: "_handleTriggerClick",
      value: function _handleTriggerClick(e) {
        var $trigger = $(e.target).closest('.sidenav-trigger');
        if (e.target && $trigger.length) {
          var sidenavId = M.getIdFromTrigger($trigger[0]);

          var sidenavInstance = document.getElementById(sidenavId).M_Sidenav;
          if (sidenavInstance) {
            sidenavInstance.open($trigger);
          }
          e.preventDefault();
        }
      }

      /**
       * Set variables needed at the beggining of drag
       * and stop any current Velocity transition.
       * @param {Event} e
       */

    }, {
      key: "_startDrag",
      value: function _startDrag(e) {
        var clientX = e.targetTouches[0].clientX;
        this.isDragged = true;
        this._startingXpos = clientX;
        this._xPos = this._startingXpos;
        this._time = Date.now();
        this._width = this.el.getBoundingClientRect().width;
        this._overlay.style.display = 'block';
        Vel(this.el, 'stop');
        Vel(this._overlay, 'stop');
      }

      /**
       * Set variables needed at each drag move update tick
       * @param {Event} e
       */

    }, {
      key: "_dragMoveUpdate",
      value: function _dragMoveUpdate(e) {
        var clientX = e.targetTouches[0].clientX;
        this.deltaX = Math.abs(this._xPos - clientX);
        this._xPos = clientX;
        this.velocityX = this.deltaX / (Date.now() - this._time);
        this._time = Date.now();
      }

      /**
       * Handles Dragging of Sidenav
       * @param {Event} e
       */

    }, {
      key: "_handleDragTargetDrag",
      value: function _handleDragTargetDrag(e) {
        // If not being dragged, set initial drag start variables
        if (!this.isDragged) {
          this._startDrag(e);
        }

        // Run touchmove updates
        this._dragMoveUpdate(e);

        // Calculate raw deltaX
        var totalDeltaX = this._xPos - this._startingXpos;

        // dragDirection is the attempted user drag direction
        var dragDirection = totalDeltaX > 0 ? 'right' : 'left';

        // Don't allow totalDeltaX to exceed Sidenav width or be dragged in the opposite direction
        totalDeltaX = Math.min(this._width, Math.abs(totalDeltaX));
        if (this.options.edge === dragDirection) {
          totalDeltaX = 0;
        }

        /**
         * transformX is the drag displacement
         * transformPrefix is the initial transform placement
         * Invert values if Sidenav is right edge
         */
        var transformX = totalDeltaX;
        var transformPrefix = 'translateX(-100%)';
        if (this.options.edge === 'right') {
          transformPrefix = 'translateX(100%)';
          transformX = -transformX;
        }

        // Calculate open/close percentage of sidenav, with open = 1 and close = 0
        this.percentOpen = Math.min(1, totalDeltaX / this._width);

        // Set transform and opacity styles
        this.el.style.transform = transformPrefix + " translateX(" + transformX + "px)";
        this._overlay.style.opacity = this.percentOpen;
      }

      /**
       * Handle Drag Target Release
       */

    }, {
      key: "_handleDragTargetRelease",
      value: function _handleDragTargetRelease() {
        if (this.isDragged) {
          if (this.percentOpen > .5) {
            this.open();
          } else {
            this._animateOut();
          }

          this.isDragged = false;
        }
      }

      /**
       * Handle Close Drag
       * @param {Event} e
       */

    }, {
      key: "_handleCloseDrag",
      value: function _handleCloseDrag(e) {
        if (this.isOpen) {

          // If not being dragged, set initial drag start variables
          if (!this.isDragged) {
            this._startDrag(e);
          }

          // Run touchmove updates
          this._dragMoveUpdate(e);

          // Calculate raw deltaX
          var totalDeltaX = this._xPos - this._startingXpos;

          // dragDirection is the attempted user drag direction
          var dragDirection = totalDeltaX > 0 ? 'right' : 'left';

          // Don't allow totalDeltaX to exceed Sidenav width or be dragged in the opposite direction
          totalDeltaX = Math.min(this._width, Math.abs(totalDeltaX));
          if (this.options.edge !== dragDirection) {
            totalDeltaX = 0;
          }

          var transformX = -totalDeltaX;
          if (this.options.edge === 'right') {
            transformX = -transformX;
          }

          // Calculate open/close percentage of sidenav, with open = 1 and close = 0
          this.percentOpen = Math.min(1, 1 - totalDeltaX / this._width);

          // Set transform and opacity styles
          this.el.style.transform = "translateX(" + transformX + "px)";
          this._overlay.style.opacity = this.percentOpen;
        }
      }

      /**
       * Handle Close Release
       */

    }, {
      key: "_handleCloseRelease",
      value: function _handleCloseRelease() {
        if (this.isOpen && this.isDragged) {
          if (this.percentOpen > .5) {
            this._animateIn();
          } else {
            this.close();
          }

          this.isDragged = false;
        }
      }

      /**
       * Handles closing of Sidenav when element with class .sidenav-close
       */

    }, {
      key: "_handleCloseTriggerClick",
      value: function _handleCloseTriggerClick(e) {
        var $closeTrigger = $(e.target).closest('.sidenav-close');
        if ($closeTrigger.length) {
          this.close();
        }
      }

      /**
       * Handle Window Resize
       */

    }, {
      key: "_handleWindowResize",
      value: function _handleWindowResize() {
        if (window.innerWidth > 992) {
          this.open();
        } else {
          this.close();
        }
      }
    }, {
      key: "_setupClasses",
      value: function _setupClasses() {
        if (this.options.edge === 'right') {
          this.el.classList.add('right-aligned');
          this.dragTarget.classList.add('right-aligned');
        }
      }
    }, {
      key: "_removeClasses",
      value: function _removeClasses() {
        this.el.classList.remove('right-aligned');
        this.dragTarget.classList.remove('right-aligned');
      }
    }, {
      key: "_setupFixed",
      value: function _setupFixed() {
        if (this.isFixed && window.innerWidth > 992) {
          this.open();
        }
      }
    }, {
      key: "_createDragTarget",
      value: function _createDragTarget() {
        var dragTarget = document.createElement('div');
        dragTarget.classList.add('drag-target');
        document.body.appendChild(dragTarget);
        this.dragTarget = dragTarget;
      }
    }, {
      key: "_preventBodyScrolling",
      value: function _preventBodyScrolling() {
        var body = document.body;
        body.style.overflow = 'hidden';
      }
    }, {
      key: "_enableBodyScrolling",
      value: function _enableBodyScrolling() {
        var body = document.body;
        body.style.overflow = '';
      }
    }, {
      key: "open",
      value: function open() {
        if (this.isOpen === true) {
          return;
        }

        this.isOpen = true;

        // Run onOpenStart callback
        if (typeof this.options.onOpenStart === 'function') {
          this.options.onOpenStart.call(this, this.el);
        }

        // Handle fixed Sidenav
        if (this.isFixed && window.innerWidth > 992) {
          Vel(this.el, 'stop');
          Vel(this.el, { translateX: 0 }, { duration: 0, queue: false });
          this._enableBodyScrolling();
          this._overlay.style.display = 'none';

          // Handle non-fixed Sidenav
        } else {
          this._preventBodyScrolling();

          if (!this.isDragged || this.percentOpen != 1) {
            this._animateIn();
          }
        }
      }
    }, {
      key: "close",
      value: function close() {
        if (this.isOpen === false) {
          return;
        }

        this.isOpen = false;

        // Run onCloseStart callback
        if (typeof this.options.onCloseStart === 'function') {
          this.options.onCloseStart.call(this, this.el);
        }

        // Handle fixed Sidenav
        if (this.isFixed && window.innerWidth > 992) {
          var transformX = this.options.edge === 'left' ? '-105%' : '105%';
          this.el.style.transform = "translateX(" + transformX + ")";

          // Handle non-fixed Sidenav
        } else {
          this._enableBodyScrolling();

          if (!this.isDragged || this.percentOpen != 0) {
            this._animateOut();
          } else {
            this._overlay.style.display = 'none';
          }
        }
      }
    }, {
      key: "_animateIn",
      value: function _animateIn() {
        this._animateSidenavIn();
        this._animateOverlayIn();
      }
    }, {
      key: "_animateSidenavIn",
      value: function _animateSidenavIn() {
        var _this22 = this;

        var slideOutPercent = this.options.edge === 'left' ? -1 : 1;
        if (this.isDragged) {
          slideOutPercent = this.options.edge === 'left' ? slideOutPercent + this.percentOpen : slideOutPercent - this.percentOpen;
        }

        Vel(this.el, 'stop');
        Vel(this.el, { 'translateX': [0, slideOutPercent * 100 + "%"] }, { duration: this.options.inDuration, queue: false, easing: 'easeOutQuad', complete: function () {
            // Run onOpenEnd callback
            if (typeof _this22.options.onOpenEnd === 'function') {
              _this22.options.onOpenEnd.call(_this22, _this22.el);
            }
          } });
      }
    }, {
      key: "_animateOverlayIn",
      value: function _animateOverlayIn() {
        var start = 0;
        if (this.isDragged) {
          start = this.percentOpen;
        } else {
          Vel.hook(this._overlay, 'display', 'block');
        }

        Vel(this._overlay, 'stop');
        Vel(this._overlay, { opacity: [1, start] }, { duration: this.options.inDuration, queue: false, easing: 'easeOutQuad' });
      }
    }, {
      key: "_animateOut",
      value: function _animateOut() {
        this._animateSidenavOut();
        this._animateOverlayOut();
      }
    }, {
      key: "_animateSidenavOut",
      value: function _animateSidenavOut() {
        var _this23 = this;

        var endPercent = this.options.edge === 'left' ? -1 : 1;
        var slideOutPercent = 0;
        if (this.isDragged) {
          slideOutPercent = this.options.edge === 'left' ? endPercent + this.percentOpen : endPercent - this.percentOpen;
        }

        Vel(this.el, 'stop');
        Vel(this.el, { 'translateX': [endPercent * 105 + "%", slideOutPercent * 100 + "%"] }, { duration: this.options.outDuration, queue: false, easing: 'easeOutQuad', complete: function () {
            // Run onOpenEnd callback
            if (typeof _this23.options.onCloseEnd === 'function') {
              _this23.options.onCloseEnd.call(_this23, _this23.el);
            }
          } });
      }
    }, {
      key: "_animateOverlayOut",
      value: function _animateOverlayOut() {
        Vel(this._overlay, 'stop');
        Vel(this._overlay, 'fadeOut', { duration: this.options.outDuration, queue: false, easing: 'easeOutQuad' });
      }
    }], [{
      key: "init",
      value: function init($els, options) {
        var arr = [];
        $els.each(function () {
          arr.push(new Sidenav(this, options));
        });
        return arr;
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Sidenav;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Sidenav;
  }();

  /**
   * @static
   * @memberof Sidenav
   * @type {Array.<Sidenav>}
   */


  Sidenav._sidenavs = [];

  window.M.Sidenav = Sidenav;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Sidenav, 'sidenav', 'M_Sidenav');
  }
})(cash, M.Vel);
;(function ($, Vel) {
  'use strict';

  var _defaults = {
    throttle: 100,
    scrollOffset: 200, // offset - 200 allows elements near bottom of page to scroll
    activeClass: 'active',
    getActiveElement: function (id) {
      return 'a[href="#' + id + '"]';
    }
  };

  /**
   * @class
   *
   */

  var ScrollSpy = function () {
    /**
     * Construct ScrollSpy instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function ScrollSpy(el, options) {
      _classCallCheck(this, ScrollSpy);

      // If exists, destroy and reinitialize
      if (!!el.M_ScrollSpy) {
        el.M_ScrollSpy.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_ScrollSpy = this;

      /**
       * Options for the modal
       * @member Modal#options
       * @prop {Number} [throttle=100] - Throttle of scroll handler
       * @prop {Number} [scrollOffset=200] - Offset for centering element when scrolled to
       * @prop {String} [activeClass='active'] - Class applied to active elements
       * @prop {Function} [getActiveElement] - Used to find active element
       */
      this.options = $.extend({}, ScrollSpy.defaults, options);

      // setup
      ScrollSpy._elements.push(this);
      ScrollSpy._count++;
      ScrollSpy._increment++;
      this.tickId = -1;
      this.id = ScrollSpy._increment;
      this._setupEventHandlers();
      this._handleWindowScroll();
    }

    _createClass(ScrollSpy, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        ScrollSpy._elements.splice(ScrollSpy._elements.indexOf(this), 1);
        ScrollSpy._elementsInView.splice(ScrollSpy._elementsInView.indexOf(this), 1);
        ScrollSpy._visibleElements.splice(ScrollSpy._visibleElements.indexOf(this.$el), 1);
        ScrollSpy._count--;
        this._removeEventHandlers();
        $(this.options.getActiveElement(this.$el.attr('id'))).removeClass(this.options.activeClass);
        this.el.M_ScrollSpy = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var throttledResize = M.throttle(this._handleWindowScroll, 200);
        this._handleThrottledResizeBound = throttledResize.bind(this);
        this._handleWindowScrollBound = this._handleWindowScroll.bind(this);
        if (ScrollSpy._count === 1) {
          window.addEventListener('scroll', this._handleWindowScrollBound);
          window.addEventListener('resize', this._handleThrottledResizeBound);
          document.body.addEventListener('click', this._handleTriggerClick);
        }
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        if (ScrollSpy._count === 0) {
          window.removeEventListener('scroll', this._handleWindowScrollBound);
          window.removeEventListener('resize', this._handleThrottledResizeBound);
          document.body.removeEventListener('click', this._handleTriggerClick);
        }
      }

      /**
       * Handle Trigger Click
       * @param {Event} e
       */

    }, {
      key: "_handleTriggerClick",
      value: function _handleTriggerClick(e) {
        var $trigger = $(e.target);
        for (var i = ScrollSpy._elements.length - 1; i >= 0; i--) {
          var scrollspy = ScrollSpy._elements[i];
          if ($trigger.is('a[href="#' + scrollspy.$el.attr('id') + '"]')) {
            e.preventDefault();
            var offset = scrollspy.$el.offset().top + 1;
            Vel(document.body, 'scroll', { duration: 400, offset: offset - scrollspy.options.scrollOffset, easing: 'easeOutCubic' });
            break;
          }
        }
      }

      /**
       * Handle Window Scroll
       */

    }, {
      key: "_handleWindowScroll",
      value: function _handleWindowScroll() {
        // unique tick id
        ScrollSpy._ticks++;

        // viewport rectangle
        var top = M.getDocumentScrollTop(),
            left = M.getDocumentScrollLeft(),
            right = left + window.innerWidth,
            bottom = top + window.innerHeight;

        // determine which elements are in view
        var intersections = ScrollSpy._findElements(top, right, bottom, left);
        for (var i = 0; i < intersections.length; i++) {
          var scrollspy = intersections[i];
          var lastTick = scrollspy.tickId;
          if (lastTick < 0) {
            // entered into view
            scrollspy._enter();
          }

          // update tick id
          scrollspy.tickId = ScrollSpy._ticks;
        }

        for (var _i = 0; _i < ScrollSpy._elementsInView.length; _i++) {
          var _scrollspy = ScrollSpy._elementsInView[_i];
          var _lastTick = _scrollspy.tickId;
          if (_lastTick >= 0 && _lastTick !== ScrollSpy._ticks) {
            // exited from view
            _scrollspy._exit();
            _scrollspy.tickId = -1;
          }
        }

        // remember elements in view for next tick
        ScrollSpy._elementsInView = intersections;
      }

      /**
       * Find elements that are within the boundary
       * @param {number} top
       * @param {number} right
       * @param {number} bottom
       * @param {number} left
       * @return {Array.<ScrollSpy>}   A collection of elements
       */

    }, {
      key: "_enter",
      value: function _enter() {
        ScrollSpy._visibleElements = ScrollSpy._visibleElements.filter(function (value) {
          return value.height() != 0;
        });

        if (ScrollSpy._visibleElements[0]) {
          $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr('id'))).removeClass(this.options.activeClass);
          if (ScrollSpy._visibleElements[0][0].M_ScrollSpy && this.id < ScrollSpy._visibleElements[0][0].M_ScrollSpy.id) {
            ScrollSpy._visibleElements.unshift(this.$el);
          } else {
            ScrollSpy._visibleElements.push(this.$el);
          }
        } else {
          ScrollSpy._visibleElements.push(this.$el);
        }

        $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr('id'))).addClass(this.options.activeClass);
      }
    }, {
      key: "_exit",
      value: function _exit() {
        var _this24 = this;

        ScrollSpy._visibleElements = ScrollSpy._visibleElements.filter(function (value) {
          return value.height() != 0;
        });

        if (ScrollSpy._visibleElements[0]) {
          $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr('id'))).removeClass(this.options.activeClass);

          ScrollSpy._visibleElements = ScrollSpy._visibleElements.filter(function (el) {
            return el.attr('id') != _this24.$el.attr('id');
          });
          if (ScrollSpy._visibleElements[0]) {
            // Check if empty
            $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr('id'))).addClass(this.options.activeClass);
          }
        }
      }
    }], [{
      key: "init",
      value: function init($els, options) {
        var arr = [];
        $els.each(function () {
          arr.push(new ScrollSpy(this, options));
        });
        return arr;
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_ScrollSpy;
      }
    }, {
      key: "_findElements",
      value: function _findElements(top, right, bottom, left) {
        var hits = [];
        for (var i = 0; i < ScrollSpy._elements.length; i++) {
          var scrollspy = ScrollSpy._elements[i];
          var currTop = top + scrollspy.options.scrollOffset || 200;

          if (scrollspy.$el.height() > 0) {
            var elTop = scrollspy.$el.offset().top,
                elLeft = scrollspy.$el.offset().left,
                elRight = elLeft + scrollspy.$el.width(),
                elBottom = elTop + scrollspy.$el.height();

            var isIntersect = !(elLeft > right || elRight < left || elTop > bottom || elBottom < currTop);

            if (isIntersect) {
              hits.push(scrollspy);
            }
          }
        }
        return hits;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return ScrollSpy;
  }();

  /**
   * @static
   * @memberof ScrollSpy
   * @type {Array.<ScrollSpy>}
   */


  ScrollSpy._elements = [];

  /**
   * @static
   * @memberof ScrollSpy
   * @type {Array.<ScrollSpy>}
   */
  ScrollSpy._elementsInView = [];

  /**
   * @static
   * @memberof ScrollSpy
   * @type {Array.<cash>}
   */
  ScrollSpy._visibleElements = [];

  /**
   * @static
   * @memberof ScrollSpy
   */
  ScrollSpy._count = 0;

  /**
   * @static
   * @memberof ScrollSpy
   */
  ScrollSpy._increment = 0;

  /**
   * @static
   * @memberof ScrollSpy
   */
  ScrollSpy._ticks = 0;

  M.ScrollSpy = ScrollSpy;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(ScrollSpy, 'scrollSpy', 'M_ScrollSpy');
  }
})(cash, M.Vel);
;(function ($) {
  'use strict';

  var _defaults = {
    data: {}, // Autocomplete data set
    limit: Infinity, // Limit of results the autocomplete shows
    onAutocomplete: null, // Callback for when autocompleted
    minLength: 1, // Min characters before autocomplete starts
    sortFunction: function (a, b, inputString) {
      // Sort function for sorting autocomplete results
      return a.indexOf(inputString) - b.indexOf(inputString);
    }
  };

  /**
   * @class
   *
   */

  var Autocomplete = function () {
    /**
     * Construct Autocomplete instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Autocomplete(el, options) {
      _classCallCheck(this, Autocomplete);

      // If exists, destroy and reinitialize
      if (!!el.M_Autocomplete) {
        el.M_Autocomplete.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_Autocomplete = this;

      /**
       * Options for the autocomplete
       * @member Autocomplete#options
       * @prop {Number} duration
       * @prop {Number} dist
       * @prop {number} shift
       * @prop {number} padding
       * @prop {Boolean} fullWidth
       * @prop {Boolean} indicators
       * @prop {Boolean} noWrap
       * @prop {Function} onCycleTo
       */
      this.options = $.extend({}, Autocomplete.defaults, options);

      // Setup
      this.isOpen = false;
      this.count = 0;
      this.activeIndex = -1;
      this.oldVal;
      this.$inputField = this.$el.closest('.input-field');
      this.$active = $();
      this._setupDropdown();

      this._setupEventHandlers();
    }

    _createClass(Autocomplete, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this._removeDropdown();
        this.el.M_Autocomplete = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleInputBlurBound = this._handleInputBlur.bind(this);
        this._handleInputKeyupAndFocusBound = this._handleInputKeyupAndFocus.bind(this);
        this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
        this._handleContainerMousedownAndTouchstartBound = this._handleContainerMousedownAndTouchstart.bind(this);

        this.el.addEventListener('blur', this._handleInputBlurBound);
        this.el.addEventListener('keyup', this._handleInputKeyupAndFocusBound);
        this.el.addEventListener('focus', this._handleInputKeyupAndFocusBound);
        this.el.addEventListener('keydown', this._handleInputKeydownBound);
        this.container.addEventListener('mousedown', this._handleContainerMousedownAndTouchstartBound);

        if (typeof window.ontouchstart !== 'undefined') {
          this.container.addEventListener('touchstart', this._handleContainerMousedownAndTouchstartBound);
        }
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('blur', this._handleInputBlurBound);
        this.el.removeEventListener('keyup', this._handleInputKeyupAndFocusBound);
        this.el.removeEventListener('focus', this._handleInputKeyupAndFocusBound);
        this.el.removeEventListener('keydown', this._handleInputKeydownBound);
        this.container.removeEventListener('mousedown', this._handleContainerMousedownAndTouchstartBound);

        if (typeof window.ontouchstart !== 'undefined') {
          this.container.removeEventListener('touchstart', this._handleContainerMousedownAndTouchstartBound);
        }
      }

      /**
       * Setup dropdown
       */

    }, {
      key: "_setupDropdown",
      value: function _setupDropdown() {
        this.container = document.createElement('ul');
        $(this.container).addClass('autocomplete-content dropdown-content');
        this.$inputField.append(this.container);
      }

      /**
       * Remove dropdown
       */

    }, {
      key: "_removeDropdown",
      value: function _removeDropdown() {
        this.container.parentNode.removeChild(this.container);
      }

      /**
       * Handle Input Blur
       */

    }, {
      key: "_handleInputBlur",
      value: function _handleInputBlur() {
        this._removeAutocomplete();
      }

      /**
       * Handle Input Keyup and Focus
       * @param {Event} e
       */

    }, {
      key: "_handleInputKeyupAndFocus",
      value: function _handleInputKeyupAndFocus(e) {
        if (e.type === 'keyup') {
          Autocomplete._keydown = false;
        }

        this.count = 0;
        var val = this.el.value.toLowerCase();

        // Don't capture enter or arrow key usage.
        if (e.keyCode === 13 || e.keyCode === 38 || e.keyCode === 40) {
          return;
        }

        // Check if the input isn't empty
        if (this.oldVal !== val) {
          this._removeAutocomplete();

          if (val.length >= this.options.minLength) {
            this.isOpen = true;
            this._renderDropdown(this.options.data, val);
          }
        }

        // Update oldVal
        this.oldVal = val;
      }

      /**
       * Handle Input Keydown
       * @param {Event} e
       */

    }, {
      key: "_handleInputKeydown",
      value: function _handleInputKeydown(e) {
        Autocomplete._keydown = true;

        // Arrow keys and enter key usage
        var keyCode = e.keyCode,
            liElement = void 0,
            numItems = $(this.container).children('li').length;

        // select element on Enter
        if (keyCode === 13 && this.activeIndex >= 0) {
          liElement = $(this.container).children('li').eq(this.activeIndex);
          if (liElement.length) {
            this.selectOption(liElement);
            e.preventDefault();
          }
          return;
        }

        // Capture up and down key
        if (keyCode === 38 || keyCode === 40) {
          e.preventDefault();

          if (keyCode === 38 && this.activeIndex > 0) {
            this.activeIndex--;
          }

          if (keyCode === 40 && this.activeIndex < numItems - 1) {
            this.activeIndex++;
          }

          this.$active.removeClass('active');
          if (this.activeIndex >= 0) {
            this.$active = $(this.container).children('li').eq(this.activeIndex);
            this.$active.addClass('active');
          }
        }
      }

      /**
       * Handle Container Mousedown and Touchstart
       * @param {Event} e
       */

    }, {
      key: "_handleContainerMousedownAndTouchstart",
      value: function _handleContainerMousedownAndTouchstart(e) {
        var $autocompleteOption = $(e.target).closest('li');
        this.selectOption($autocompleteOption);
      }

      /**
       * Highlight partial match
       */

    }, {
      key: "_highlight",
      value: function _highlight(string, $el) {
        var img = $el.find('img');
        var matchStart = $el.text().toLowerCase().indexOf("" + string.toLowerCase() + ""),
            matchEnd = matchStart + string.length - 1,
            beforeMatch = $el.text().slice(0, matchStart),
            matchText = $el.text().slice(matchStart, matchEnd + 1),
            afterMatch = $el.text().slice(matchEnd + 1);
        $el.html("<span>" + beforeMatch + "<span class='highlight'>" + matchText + "</span>" + afterMatch + "</span>");
        if (img.length) {
          $el.prepend(img);
        }
      }

      /**
       * Reset current element position
       */

    }, {
      key: "_resetCurrentElement",
      value: function _resetCurrentElement() {
        this.activeIndex = -1;
        this.$active.removeClass('active');
      }

      /**
       * Remove autocomplete elements
       */

    }, {
      key: "_removeAutocomplete",
      value: function _removeAutocomplete() {
        $(this.container).empty();
        this._resetCurrentElement();
        this.oldVal = null;
        this.isOpen = false;
      }

      /**
       * Select autocomplete option
       * @param {Element} el  Autocomplete option list item element
       */

    }, {
      key: "selectOption",
      value: function selectOption(el) {
        var text = el.text().trim();
        this.el.value = text;
        this.$el.trigger('change');
        this._removeAutocomplete();

        // Handle onAutocomplete callback.
        if (typeof this.options.onAutocomplete === 'function') {
          this.options.onAutocomplete.call(this, text);
        }
      }

      /**
       * Render dropdown content
       * @param {Object} data  data set
       * @param {String} val  current input value
       */

    }, {
      key: "_renderDropdown",
      value: function _renderDropdown(data, val) {
        var _this25 = this;

        this._removeAutocomplete();

        var matchingData = [];

        // Gather all matching data
        for (var key in data) {
          if (data.hasOwnProperty(key) && key.toLowerCase().indexOf(val) !== -1) {
            // Break if past limit
            if (this.count >= this.options.limit) {
              break;
            }

            var entry = {
              data: data[key],
              key: key
            };
            matchingData.push(entry);

            this.count++;
          }
        }

        // Sort
        var sortFunctionBound = function (a, b) {
          return _this25.options.sortFunction(a.key.toLowerCase(), b.key.toLowerCase(), val.toLowerCase());
        };
        matchingData.sort(sortFunctionBound);

        // Render
        for (var i = 0; i < matchingData.length; i++) {
          var _entry = matchingData[i];
          var $autocompleteOption = $('<li></li>');
          if (!!_entry.data) {
            $autocompleteOption.append('<img src="' + _entry.data + '" class="right circle"><span>' + _entry.key + '</span>');
          } else {
            $autocompleteOption.append('<span>' + _entry.key + '</span>');
          }

          $(this.container).append($autocompleteOption);
          this._highlight(val, $autocompleteOption);
        }
      }

      /**
       * Update Data
       * @param {Object} data
       */

    }, {
      key: "updateData",
      value: function updateData(data) {
        var val = this.el.value.toLowerCase();
        this.options.data = data;

        if (this.isOpen) {
          this._renderDropdown(data, val);
        }
      }
    }], [{
      key: "init",
      value: function init($els, options) {
        var arr = [];
        $els.each(function () {
          arr.push(new Autocomplete(this, options));
        });
        return arr;
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Autocomplete;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Autocomplete;
  }();

  /**
   * @static
   * @memberof Autocomplete
   */


  Autocomplete._keydown = false;

  M.Autocomplete = Autocomplete;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Autocomplete, 'autocomplete', 'M_Autocomplete');
  }
})(cash);
;(function ($) {
  // Function to update labels of text fields
  M.updateTextFields = function () {
    var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';
    $(input_selector).each(function (element, index) {
      var $this = $(this);
      if (element.value.length > 0 || $(element).is(':focus') || element.autofocus || $this.attr('placeholder') !== null) {
        $this.siblings('label').addClass('active');
      } else if (element.validity) {
        $this.siblings('label').toggleClass('active', element.validity.badInput === true);
      } else {
        $this.siblings('label').removeClass('active');
      }
    });
  };

  M.validate_field = function (object) {
    var hasLength = object.attr('data-length') !== null;
    var lenAttr = parseInt(object.attr('data-length'));
    var len = object[0].value.length;

    if (len === 0 && object[0].validity.badInput === false && !object.is(':required')) {
      if (object.hasClass('validate')) {
        object.removeClass('valid');
        object.removeClass('invalid');
      }
    } else {
      if (object.hasClass('validate')) {
        // Check for character counter attributes
        if (object.is(':valid') && hasLength && len <= lenAttr || object.is(':valid') && !hasLength) {
          object.removeClass('invalid');
          object.addClass('valid');
        } else {
          object.removeClass('valid');
          object.addClass('invalid');
        }
      }
    }
  };

  M.textareaAutoResize = function ($textarea) {
    // Textarea Auto Resize
    var hiddenDiv = $('.hiddendiv').first();
    if (!hiddenDiv.length) {
      hiddenDiv = $('<div class="hiddendiv common"></div>');
      $('body').append(hiddenDiv);
    }

    // Set font properties of hiddenDiv
    var fontFamily = $textarea.css('font-family');
    var fontSize = $textarea.css('font-size');
    var lineHeight = $textarea.css('line-height');
    var padding = $textarea.css('padding');

    if (fontSize) {
      hiddenDiv.css('font-size', fontSize);
    }
    if (fontFamily) {
      hiddenDiv.css('font-family', fontFamily);
    }
    if (lineHeight) {
      hiddenDiv.css('line-height', lineHeight);
    }
    if (padding) {
      hiddenDiv.css('padding', padding);
    }

    // Set original-height, if none
    if (!$textarea.data('original-height')) {
      $textarea.data('original-height', $textarea.height());
    }

    if ($textarea.attr('wrap') === 'off') {
      hiddenDiv.css('overflow-wrap', 'normal').css('white-space', 'pre');
    }

    hiddenDiv.text($textarea[0].value + '\n');
    var content = hiddenDiv.html().replace(/\n/g, '<br>');
    hiddenDiv.html(content);

    // When textarea is hidden, width goes crazy.
    // Approximate with half of window size

    if ($textarea.css('display') !== 'hidden') {
      hiddenDiv.css('width', $textarea.width() + 'px');
    } else {
      hiddenDiv.css('width', $(window).width() / 2 + 'px');
    }

    /**
     * Resize if the new height is greater than the
     * original height of the textarea
     */
    if ($textarea.data('original-height') <= hiddenDiv.innerHeight()) {
      $textarea.css('height', hiddenDiv.innerHeight() + 'px');
    } else if ($textarea[0].value.length < $textarea.data('previous-length')) {
      /**
       * In case the new height is less than original height, it
       * means the textarea has less text than before
       * So we set the height to the original one
       */
      $textarea.css('height', $textarea.data('original-height') + 'px');
    }
    $textarea.data('previous-length', $textarea[0].value.length);
  };

  $(document).ready(function () {
    // Text based inputs
    var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';

    // Add active if form auto complete
    $(document).on('change', input_selector, function () {
      if (this.value.length !== 0 || $(this).attr('placeholder') !== null) {
        $(this).siblings('label').addClass('active');
      }
      M.validate_field($(this));
    });

    // Add active if input element has been pre-populated on document ready
    $(document).ready(function () {
      M.updateTextFields();
    });

    // HTML DOM FORM RESET handling
    $(document).on('reset', function (e) {
      var formReset = $(e.target);
      if (formReset.is('form')) {
        formReset.find(input_selector).removeClass('valid').removeClass('invalid');
        formReset.find(input_selector).each(function (e) {
          if (this.value.length) {
            $(this).siblings('label').removeClass('active');
          }
        });

        // Reset select (after native reset)
        setTimeout(function () {
          formReset.find('select').each(function () {
            // check if initialized
            if (this.M_Select) {
              var reset_text = $(this).find('option[selected]').text();
              $(this).siblings('input.select-dropdown')[0].value = reset_text;
            }
          });
        }, 0);
      }
    });

    /**
     * Add active when element has focus
     * @param {Event} e
     */
    document.addEventListener('focus', function (e) {
      if ($(e.target).is(input_selector)) {
        $(e.target).siblings('label, .prefix').addClass('active');
      }
    }, true);

    /**
     * Remove active when element is blurred
     * @param {Event} e
     */
    document.addEventListener('blur', function (e) {
      var $inputElement = $(e.target);
      if ($inputElement.is(input_selector)) {
        var selector = ".prefix";

        if ($inputElement[0].value.length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') === null) {
          selector += ", label";
        }
        $inputElement.siblings(selector).removeClass('active');
        M.validate_field($inputElement);
      }
    }, true);

    // Radio and Checkbox focus class
    var radio_checkbox = 'input[type=radio], input[type=checkbox]';
    $(document).on('keyup', radio_checkbox, function (e) {
      // TAB, check if tabbing to radio or checkbox.
      if (e.which === M.keys.TAB) {
        $(this).addClass('tabbed');
        var $this = $(this);
        $this.one('blur', function (e) {
          $(this).removeClass('tabbed');
        });
        return;
      }
    });

    var text_area_selector = '.materialize-textarea';
    $(text_area_selector).each(function () {
      var $textarea = $(this);
      /**
       * Instead of resizing textarea on document load,
       * store the original height and the original length
       */
      $textarea.data('original-height', $textarea.height());
      $textarea.data('previous-length', this.value.length);
    });

    $(document).on('keyup', text_area_selector, function () {
      M.textareaAutoResize($(this));
    });
    $(document).on('keydown', text_area_selector, function () {
      M.textareaAutoResize($(this));
    });
    $(document).on('autoresize', text_area_selector, function () {
      M.textareaAutoResize($(this));
    });

    // File Input Path
    $(document).on('change', '.file-field input[type="file"]', function () {
      var file_field = $(this).closest('.file-field');
      var path_input = file_field.find('input.file-path');
      var files = $(this)[0].files;
      var file_names = [];
      for (var i = 0; i < files.length; i++) {
        file_names.push(files[i].name);
      }
      path_input[0].value = file_names.join(", ");
      path_input.trigger('change');
    });
  }); // End of $(document).ready
})(cash);
;(function ($, Vel) {
  'use strict';

  var _defaults = {
    indicators: true,
    height: 400,
    duration: 500,
    interval: 6000
  };

  /**
   * @class
   *
   */

  var Slider = function () {
    /**
     * Construct Slider instance and set up overlay
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Slider(el, options) {
      var _this26 = this;

      _classCallCheck(this, Slider);

      // If exists, destroy and reinitialize
      if (!!el.M_Slider) {
        el.M_Slider.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_Slider = this;

      /**
       * Options for the modal
       * @member Slider#options
       * @prop {Boolean} [indicators=true] - Show indicators
       * @prop {Number} [height=400] - height of slider
       * @prop {Number} [duration=500] - Length in ms of slide transition
       * @prop {Number} [interval=6000] - Length in ms of slide interval
       */
      this.options = $.extend({}, Slider.defaults, options);

      // setup
      this.$slider = this.$el.find('.slides');
      this.$slides = this.$slider.children('li');
      this.activeIndex = this.$slider.find('.active').index();
      if (this.activeIndex != -1) {
        this.$active = this.$slides.eq(this.activeIndex);
      }

      this._setSliderHeight();

      // Set initial positions of captions
      this.$slides.find('.caption').each(function (el) {
        _this26._animateCaptionIn(el, 0);
      });

      // Move img src into background-image
      this.$slides.find('img').each(function (el) {
        var placeholderBase64 = 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
        if ($(el).attr('src') !== placeholderBase64) {
          $(el).css('background-image', 'url("' + $(el).attr('src') + '")');
          $(el).attr('src', placeholderBase64);
        }
      });

      this._setupIndicators();

      // Show active slide
      if (this.$active) {
        this.$active.css('display', 'block');
      } else {
        this.$slides.first().addClass('active');
        Vel(this.$slides.first()[0], { opacity: 1 }, { duration: this.options.duration, queue: false, easing: 'easeOutQuad' });

        this.activeIndex = 0;
        this.$active = this.$slides.eq(this.activeIndex);

        // Update indicators
        if (this.options.indicators) {
          this.$indicators.eq(this.activeIndex).addClass('active');
        }
      }

      // Adjust height to current slide
      this.$active.find('img').each(function (el) {
        Vel(_this26.$active.find('.caption')[0], { opacity: 1, translateX: 0, translateY: 0 }, { duration: _this26.options.duration, queue: false, easing: 'easeOutQuad' });
      });

      this._setupEventHandlers();

      // auto scroll
      this.start();
    }

    _createClass(Slider, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this.pause();
        this._removeIndicators();
        this._removeEventHandlers();
        this.el.M_Slider = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var _this27 = this;

        this._handleIntervalBound = this._handleInterval.bind(this);
        this._handleIndicatorClickBound = this._handleIndicatorClick.bind(this);

        if (this.options.indicators) {
          this.$indicators.each(function (el) {
            el.addEventListener('click', _this27._handleIndicatorClickBound);
          });
        }
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        var _this28 = this;

        if (this.options.indicators) {
          this.$indicators.each(function (el) {
            el.removeEventListener('click', _this28._handleIndicatorClickBound);
          });
        }
      }

      /**
       * Handle indicator click
       * @param {Event} e
       */

    }, {
      key: "_handleIndicatorClick",
      value: function _handleIndicatorClick(e) {
        var currIndex = $(e.target).index();
        this.set(currIndex);
      }

      /**
       * Handle Interval
       */

    }, {
      key: "_handleInterval",
      value: function _handleInterval() {
        var newActiveIndex = this.$slider.find('.active').index();
        if (this.$slides.length === newActiveIndex + 1) newActiveIndex = 0; // loop to start
        else newActiveIndex += 1;

        this.set(newActiveIndex);
      }

      /**
       * Animate in caption
       * @param {Element} caption
       * @param {Number} duration
       */

    }, {
      key: "_animateCaptionIn",
      value: function _animateCaptionIn(caption, duration) {
        var velocityOptions = {
          opacity: 0
        };

        if ($(caption).hasClass('center-align')) {
          velocityOptions.translateY = -100;
        } else if ($(caption).hasClass('right-align')) {
          velocityOptions.translateX = 100;
        } else if ($(caption).hasClass('left-align')) {
          velocityOptions.translateX = -100;
        }

        Vel(caption, velocityOptions, { duration: duration, queue: false });
      }

      /**
       * Set height of slider
       */

    }, {
      key: "_setSliderHeight",
      value: function _setSliderHeight() {
        // If fullscreen, do nothing
        if (!this.$el.hasClass('fullscreen')) {
          if (this.options.indicators) {
            // Add height if indicators are present
            this.$el.css('height', this.options.height + 40 + 'px');
          } else {
            this.$el.css('height', this.options.height + 'px');
          }
          this.$slider.css('height', this.options.height + 'px');
        }
      }

      /**
       * Setup indicators
       */

    }, {
      key: "_setupIndicators",
      value: function _setupIndicators() {
        var _this29 = this;

        if (this.options.indicators) {
          this.$indicators = $('<ul class="indicators"></ul>');
          this.$slides.each(function (el, index) {
            var $indicator = $('<li class="indicator-item"></li>');
            _this29.$indicators.append($indicator[0]);
          });
          this.$el.append(this.$indicators[0]);
          this.$indicators = this.$indicators.children('li.indicator-item');
        }
      }

      /**
       * Remove indicators
       */

    }, {
      key: "_removeIndicators",
      value: function _removeIndicators() {
        this.$el.find('ul.indicators').remove();
      }

      /**
       * Cycle to nth item
       * @param {Number} index
       */

    }, {
      key: "set",
      value: function set(index) {
        var _this30 = this;

        // Wrap around indices.
        if (index >= this.$slides.length) index = 0;else if (index < 0) index = this.$slides.length - 1;

        // Only do if index changes
        if (this.activeIndex != index) {
          this.$active = this.$slides.eq(this.activeIndex);
          var $caption = this.$active.find('.caption');

          this.$active.removeClass('active');
          Vel(this.$active[0], { opacity: 0 }, { duration: this.options.duration, queue: false, easing: 'easeOutQuad',
            complete: function () {
              _this30.$slides.not('.active').each(function (el) {
                Vel(el, { opacity: 0, translateX: 0, translateY: 0 }, { duration: 0, queue: false });
              });
            }.bind(this)
          });

          this._animateCaptionIn($caption[0], this.options.duration);

          // Update indicators
          if (this.options.indicators) {
            this.$indicators.eq(this.activeIndex).removeClass('active');
            this.$indicators.eq(index).addClass('active');
          }

          Vel(this.$slides.eq(index)[0], { opacity: 1 }, { duration: this.options.duration, queue: false, easing: 'easeOutQuad' });
          Vel(this.$slides.eq(index).find('.caption')[0], { opacity: 1, translateX: 0, translateY: 0 }, { duration: this.options.duration, delay: this.options.duration, queue: false, easing: 'easeOutQuad' });

          this.$slides.eq(index).addClass('active');
          this.activeIndex = index;

          // Reset interval
          this.start();
        }
      }

      /**
       * Pause slider interval
       */

    }, {
      key: "pause",
      value: function pause() {
        clearInterval(this.interval);
      }

      /**
       * Start slider interval
       */

    }, {
      key: "start",
      value: function start() {
        clearInterval(this.interval);
        this.interval = setInterval(this._handleIntervalBound, this.options.duration + this.options.interval);
      }

      /**
       * Move to next slide
       */

    }, {
      key: "next",
      value: function next() {
        var newIndex = this.activeIndex + 1;

        // Wrap around indices.
        if (newIndex >= this.$slides.length) newIndex = 0;else if (newIndex < 0) newIndex = this.$slides.length - 1;

        this.set(newIndex);
      }

      /**
       * Move to previous slide
       */

    }, {
      key: "prev",
      value: function prev() {
        var newIndex = this.activeIndex - 1;

        // Wrap around indices.
        if (newIndex >= this.$slides.length) newIndex = 0;else if (newIndex < 0) newIndex = this.$slides.length - 1;

        this.set(newIndex);
      }
    }], [{
      key: "init",
      value: function init($els, options) {
        var arr = [];
        $els.each(function () {
          arr.push(new Slider(this, options));
        });
        return arr;
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Slider;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Slider;
  }();

  M.Slider = Slider;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Slider, 'slider', 'M_Slider');
  }
})(cash, M.Vel);
;(function ($, Vel) {
  $(document).on('click', '.card', function (e) {
    if ($(this).children('.card-reveal').length) {
      var $card = $(e.target).closest('.card');
      if ($card.data('initialOverflow') === undefined) {
        $card.data('initialOverflow', $card.css('overflow') === undefined ? '' : $card.css('overflow'));
      }
      var $cardReveal = $(this).find('.card-reveal');
      if ($(e.target).is($('.card-reveal .card-title')) || $(e.target).is($('.card-reveal .card-title i'))) {
        // Make Reveal animate down and display none
        Vel($cardReveal, { translateY: 0 }, {
          duration: 225,
          queue: false,
          easing: 'easeInOutQuad',
          complete: function () {
            $(this).css({ display: 'none' });
            $card.css('overflow', $card.data('initialOverflow'));
          }
        });
      } else if ($(e.target).is($('.card .activator')) || $(e.target).is($('.card .activator i'))) {
        $card.css('overflow', 'hidden');
        $cardReveal.css({ display: 'block' });
        Vel($cardReveal, 'stop');
        Vel($cardReveal, { translateY: '-100%' }, { duration: 300, queue: false, easing: 'easeInOutQuad' });
      }
    }
  });
})(cash, M.Vel);
;(function ($, Vel) {
  'use strict';

  var _defaults = {
    data: [],
    placeholder: '',
    secondaryPlaceholder: '',
    autocompleteOptions: {},
    limit: Infinity,
    onChipAdd: null,
    onChipSelect: null,
    onChipDelete: null
  };

  /**
   * @typedef {Object} chip
   * @property {String} tag  chip tag string
   * @property {String} [image]  chip avatar image string
   */

  /**
   * @class
   *
   */

  var Chips = function () {
    /**
     * Construct Chips instance and set up overlay
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Chips(el, options) {
      _classCallCheck(this, Chips);

      // If exists, destroy and reinitialize
      if (!!el.M_Chips) {
        el.M_Chips.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_Chips = this;

      /**
       * Options for the modal
       * @member Chips#options
       * @prop {Array} data
       * @prop {String} placeholder
       * @prop {String} secondaryPlaceholder
       * @prop {Object} autocompleteOptions
       */
      this.options = $.extend({}, Chips.defaults, options);

      this.$el.addClass('chips input-field');
      this.chipsData = [];
      this.$chips = $();
      this.$input = this.$el.find('input');
      this.$input.addClass('input');
      this.hasAutocomplete = Object.keys(this.options.autocompleteOptions).length > 0;

      // Set input id
      if (!this.$input.attr('id')) {
        this.$input.attr('id', M.guid());
      }

      // Render initial chips
      if (this.options.data.length) {
        this.chipsData = this.options.data;
        this._renderChips(this.chipsData);
      }

      // Setup autocomplete if needed
      if (this.hasAutocomplete) {
        this._setupAutocomplete();
      }

      this._setPlaceholder();
      this._setupLabel();
      this._setupEventHandlers();
    }

    _createClass(Chips, [{
      key: "getData",


      /**
       * Get Chips Data
       */
      value: function getData() {
        return this.chipsData;
      }

      /**
       * Teardown component
       */

    }, {
      key: "destroy",
      value: function destroy() {
        this._removeEventHandlers();
        this.$chips.remove();
        this.el.M_Chips = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleChipClickBound = this._handleChipClick.bind(this);
        this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
        this._handleInputFocusBound = this._handleInputFocus.bind(this);
        this._handleInputBlurBound = this._handleInputBlur.bind(this);

        this.el.addEventListener('click', this._handleChipClickBound);
        document.addEventListener('keydown', Chips._handleChipsKeydown);
        document.addEventListener('keyup', Chips._handleChipsKeyup);
        this.el.addEventListener('blur', Chips._handleChipsBlur, true);
        this.$input[0].addEventListener('focus', this._handleInputFocusBound);
        this.$input[0].addEventListener('blur', this._handleInputBlurBound);
        this.$input[0].addEventListener('keydown', this._handleInputKeydownBound);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('click', this._handleChipClickBound);
        document.removeEventListener('keydown', Chips._handleChipsKeydown);
        document.removeEventListener('keyup', Chips._handleChipsKeyup);
        this.el.removeEventListener('blur', Chips._handleChipsBlur, true);
        this.$input[0].removeEventListener('focus', this._handleInputFocusBound);
        this.$input[0].removeEventListener('blur', this._handleInputBlurBound);
        this.$input[0].removeEventListener('keydown', this._handleInputKeydownBound);
      }

      /**
       * Handle Chip Click
       * @param {Event} e
       */

    }, {
      key: "_handleChipClick",
      value: function _handleChipClick(e) {
        var $chip = $(e.target).closest('.chip');
        var clickedClose = $(e.target).is('.close');
        if ($chip.length) {
          var index = $chip.index();
          if (clickedClose) {
            // delete chip
            this.deleteChip(index);
            this.$input[0].focus();
          } else {
            // select chip
            this.selectChip(index);
          }

          // Default handle click to focus on input
        } else {
          this.$input[0].focus();
        }
      }

      /**
       * Handle Chips Keydown
       * @param {Event} e
       */

    }, {
      key: "_handleInputFocus",


      /**
       * Handle Input Focus
       */
      value: function _handleInputFocus() {
        this.$el.addClass('focus');
      }

      /**
       * Handle Input Blur
       */

    }, {
      key: "_handleInputBlur",
      value: function _handleInputBlur() {
        this.$el.removeClass('focus');
      }

      /**
       * Handle Input Keydown
       * @param {Event} e
       */

    }, {
      key: "_handleInputKeydown",
      value: function _handleInputKeydown(e) {
        Chips._keydown = true;

        // enter
        if (e.keyCode === 13) {
          // Override enter if autocompleting.
          if (this.hasAutocomplete && this.autocomplete && this.autocomplete.isOpen) {
            return;
          }

          e.preventDefault();
          this.addChip({ tag: this.$input[0].value });
          this.$input[0].value = '';

          // delete or left
        } else if ((e.keyCode === 8 || e.keyCode === 37) && this.$input[0].value === '' && this.chipsData.length) {
          e.preventDefault();
          this.selectChip(this.chipsData.length - 1);
        }
      }

      /**
       * Render Chip
       * @param {chip} chip
       * @return {Element}
       */

    }, {
      key: "_renderChip",
      value: function _renderChip(chip) {
        if (!chip.tag) {
          return;
        }

        var renderedChip = document.createElement('div');
        var closeIcon = document.createElement('i');
        renderedChip.classList.add('chip');
        renderedChip.textContent = chip.tag;
        renderedChip.setAttribute('tabindex', 0);
        $(closeIcon).addClass('material-icons close');
        closeIcon.textContent = 'close';

        // attach image if needed
        if (chip.image) {
          var img = document.createElement('img');
          img.setAttribute('src', chip.image);
          renderedChip.insertBefore(img, renderedChip.firstChild);
        }

        renderedChip.appendChild(closeIcon);
        return renderedChip;
      }

      /**
       * Render Chips
       */

    }, {
      key: "_renderChips",
      value: function _renderChips() {
        this.$chips.remove();
        for (var i = 0; i < this.chipsData.length; i++) {
          var chipEl = this._renderChip(this.chipsData[i]);
          this.$el.append(chipEl);
          this.$chips.add(chipEl);
        }

        // move input to end
        this.$el.append(this.$input);
      }

      /**
       * Setup Autocomplete
       */

    }, {
      key: "_setupAutocomplete",
      value: function _setupAutocomplete() {
        var _this31 = this;

        this.options.autocompleteOptions.onAutocomplete = function (val) {
          _this31.addChip({ tag: val });
          _this31.$input[0].value = '';
          _this31.$input[0].focus();
        };

        this.autocomplete = M.Autocomplete.init(this.$input, this.options.autocompleteOptions)[0];
      }

      /**
       * Setup Label
       */

    }, {
      key: "_setupLabel",
      value: function _setupLabel() {
        this.$label = this.$el.find('label');
        if (this.$label.length) {
          this.$label.setAttribute('for', this.$input.attr('id'));
        }
      }

      /**
       * Set placeholder
       */

    }, {
      key: "_setPlaceholder",
      value: function _setPlaceholder() {
        if (this.chipsData !== undefined && !this.chipsData.length && this.options.placeholder) {
          $(this.$input).prop('placeholder', this.options.placeholder);
        } else if ((this.chipsData === undefined || !!this.chipsData.length) && this.options.secondaryPlaceholder) {
          $(this.$input).prop('placeholder', this.options.secondaryPlaceholder);
        }
      }

      /**
       * Check if chip is valid
       * @param {chip} chip
       */

    }, {
      key: "_isValid",
      value: function _isValid(chip) {
        if (chip.hasOwnProperty('tag') && chip.tag !== '') {
          var exists = false;
          for (var i = 0; i < this.chipsData.length; i++) {
            if (this.chipsData[i].tag === chip.tag) {
              exists = true;
              break;
            }
          }
          return !exists;
        } else {
          return false;
        }
      }

      /**
       * Add chip
       * @param {chip} chip
       */

    }, {
      key: "addChip",
      value: function addChip(chip) {
        if (!this._isValid(chip) || this.chipsData.length >= this.options.limit) {
          return;
        }

        var renderedChip = this._renderChip(chip);
        this.$chips.add(renderedChip);
        this.chipsData.push(chip);
        $(this.$input).before(renderedChip);
        this._setPlaceholder();

        // fire chipAdd callback
        if (typeof this.options.onChipAdd === 'function') {
          this.options.onChipAdd.call(this, this.$el, renderedChip);
        }
      }

      /**
       * Delete chip
       * @param {Number} chip
       */

    }, {
      key: "deleteChip",
      value: function deleteChip(chipIndex) {
        // let chip = this.chips[chipIndex];
        this.$chips.eq(chipIndex).remove();
        this.$chips = this.$chips.filter(function (el) {
          return $(el).index() >= 0;
        });
        this.chipsData.splice(chipIndex, 1);
        this._setPlaceholder();

        // fire chipDelete callback
        if (typeof this.options.onChipDelete === 'function') {
          this.options.onChipDelete.call(this, this.$el, this.$chip);
        }
      }

      /**
       * Select chip
       * @param {Number} chip
       */

    }, {
      key: "selectChip",
      value: function selectChip(chipIndex) {
        var $chip = this.$chips.eq(chipIndex);
        this._selectedChip = $chip;
        $chip[0].focus();

        // fire chipSelect callback
        if (typeof this.options.onChipSelect === 'function') {
          this.options.onChipSelect.call(this, this.$el, this.$chip);
        }
      }

      /**
       * Deselect chip
       * @param {Number} chip
       */

    }, {
      key: "deselectChip",
      value: function deselectChip(chipIndex) {
        var $chip = this.$chips.eq(chipIndex);
        this._selectedChip = null;
      }
    }], [{
      key: "init",
      value: function init($els, options) {
        var arr = [];
        $els.each(function () {
          arr.push(new Chips(this, options));
        });
        return arr;
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Chips;
      }
    }, {
      key: "_handleChipsKeydown",
      value: function _handleChipsKeydown(e) {
        Chips._keydown = true;

        var $chips = $(e.target).closest('.chips');
        var chipsKeydown = e.target && $chips.length;

        // Don't handle keydown inputs on input and textarea
        if ($(e.target).is('input, textarea') || !chipsKeydown) {
          return;
        }

        var currChips = $chips[0].M_Chips;

        // backspace and delete
        if (e.keyCode === 8 || e.keyCode === 46) {
          e.preventDefault();

          var selectIndex = currChips.chipsData.length;
          if (currChips._selectedChip) {
            var index = currChips._selectedChip.index();
            currChips.deleteChip(index);
            currChips._selectedChip = null;
            selectIndex = index - 1;
          }

          if (currChips.chipsData.length) {
            currChips.selectChip(selectIndex);
          }

          // left arrow key
        } else if (e.keyCode === 37) {
          if (currChips._selectedChip) {
            var _selectIndex = currChips._selectedChip.index() - 1;
            if (_selectIndex < 0) {
              return;
            }
            currChips.selectChip(_selectIndex);
          }

          // right arrow key
        } else if (e.keyCode === 39) {
          if (currChips._selectedChip) {
            var _selectIndex2 = currChips._selectedChip.index() + 1;

            if (_selectIndex2 >= currChips.chipsData.length) {
              currChips.$input[0].focus();
            } else {
              currChips.selectChip(_selectIndex2);
            }
          }
        }
      }

      /**
       * Handle Chips Keyup
       * @param {Event} e
       */

    }, {
      key: "_handleChipsKeyup",
      value: function _handleChipsKeyup(e) {
        Chips._keydown = false;
      }

      /**
       * Handle Chips Blur
       * @param {Event} e
       */

    }, {
      key: "_handleChipsBlur",
      value: function _handleChipsBlur(e) {
        if (!Chips._keydown) {
          var $chips = $(e.target).closest('.chips');
          var currChips = $chips[0].M_Chips;

          currChips._selectedChip = null;
        }
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Chips;
  }();

  /**
   * @static
   * @memberof Chips
   */


  Chips._keydown = false;

  M.Chips = Chips;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Chips, 'chips', 'M_Chips');
  }

  $(document).ready(function () {
    // Handle removal of static chips.
    $(document.body).on('click', '.chip .close', function () {
      var $chips = $(this).closest('.chips');
      if ($chips.length && $chips[0].M_Chips) {
        return;
      }
      $(this).closest('.chip').remove();
    });
  });
})(cash);
;(function ($) {
  'use strict';

  var _defaults = {
    top: 0,
    bottom: Infinity,
    offset: 0
  };

  /**
   * @class
   *
   */

  var Pushpin = function () {
    /**
     * Construct Pushpin instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Pushpin(el, options) {
      _classCallCheck(this, Pushpin);

      // If exists, destroy and reinitialize
      if (!!el.M_Pushpin) {
        el.M_Pushpin.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_Pushpin = this;

      /**
       * Options for the modal
       * @member Pushpin#options
       */
      this.options = $.extend({}, Pushpin.defaults, options);

      this.originalOffset = this.el.offsetTop;
      Pushpin._pushpins.push(this);
      this._setupEventHandlers();
      this._updatePosition();
    }

    _createClass(Pushpin, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this.el.style.top = null;
        this._removePinClasses();
        this._removeEventHandlers();

        // Remove pushpin Inst
        var index = Pushpin._pushpins.indexOf(this);
        Pushpin._pushpins.splice(index, 1);
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        document.addEventListener('scroll', Pushpin._updateElements);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        document.removeEventListener('scroll', Pushpin._updateElements);
      }
    }, {
      key: "_updatePosition",
      value: function _updatePosition() {
        var scrolled = M.getDocumentScrollTop() + this.options.offset;

        if (this.options.top <= scrolled && this.options.bottom >= scrolled && !this.el.classList.contains('pinned')) {
          this._removePinClasses();

          this.el.style.top = this.options.offset + "px";
          this.el.classList.add('pinned');
        }

        // Add pin-top (when scrolled position is above top)
        if (scrolled < this.options.top && !this.el.classList.contains('pin-top')) {
          this._removePinClasses();
          this.el.style.top = 0;
          this.el.classList.add('pin-top');
        }

        // Add pin-bottom (when scrolled position is below bottom)
        if (scrolled > this.options.bottom && !this.el.classList.contains('pin-bottom')) {
          this._removePinClasses();
          this.el.classList.add('pin-bottom');
          this.el.style.top = this.options.bottom - this.originalOffset + "px";
        }
      }
    }, {
      key: "_removePinClasses",
      value: function _removePinClasses() {
        this.el.classList.remove('pin-top', 'pinned', 'pin-bottom');
      }
    }], [{
      key: "init",
      value: function init($els, options) {
        var arr = [];
        $els.each(function () {
          arr.push(new Pushpin(this, options));
        });
        return arr;
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Pushpin;
      }
    }, {
      key: "_updateElements",
      value: function _updateElements() {
        for (var elIndex in Pushpin._pushpins) {
          var pInstance = Pushpin._pushpins[elIndex];
          pInstance._updatePosition();
        }
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Pushpin;
  }();

  /**
   * @static
   * @memberof Pushpin
   */


  Pushpin._pushpins = [];

  M.Pushpin = Pushpin;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Pushpin, 'pushpin', 'M_Pushpin');
  }
})(cash);
;(function ($, Vel) {
  'use strict';

  var _defaults = {
    direction: 'top',
    hoverEnabled: true,
    toolbarEnabled: false
  };

  $.fn.reverse = [].reverse;

  /**
   * @class
   *
   */

  var FloatingActionButton = function () {
    /**
     * Construct FloatingActionButton instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function FloatingActionButton(el, options) {
      _classCallCheck(this, FloatingActionButton);

      // If exists, destroy and reinitialize
      if (!!el.M_FloatingActionButton) {
        el.M_FloatingActionButton.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_FloatingActionButton = this;

      /**
       * Options for the fab
       * @member FloatingActionButton#options
       * @prop {Boolean} [direction] - Direction fab menu opens
       * @prop {Boolean} [hoverEnabled=true] - Enable hover vs click
       * @prop {Boolean} [toolbarEnabled=false] - Enable toolbar transition
       */
      this.options = $.extend({}, FloatingActionButton.defaults, options);

      this.isOpen = false;
      this.$anchor = this.$el.children('a').first();
      this.$menu = this.$el.children('ul').first();
      this.$floatingBtns = this.$el.find('ul .btn-floating');
      this.$floatingBtnsReverse = this.$el.find('ul .btn-floating').reverse();
      if (this.options.direction === 'top') {
        this.$el.addClass('direction-top');
        this.offsetY = 40;
      } else if (this.options.direction === 'right') {
        this.$el.addClass('direction-right');
        this.offsetX = -40;
      } else if (this.options.direction === 'bottom') {
        this.$el.addClass('direction-bottom');
        this.offsetY = -40;
      } else {
        this.$el.addClass('direction-left');
        this.offsetX = 40;
      }
      this._setupEventHandlers();
    }

    _createClass(FloatingActionButton, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.M_FloatingActionButton = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleFABClickBound = this._handleFABClick.bind(this);
        this._handleOpenBound = this.open.bind(this);
        this._handleCloseBound = this.close.bind(this);

        if (this.options.hoverEnabled && !this.options.toolbarEnabled) {
          this.el.addEventListener('mouseenter', this._handleOpenBound);
          this.el.addEventListener('mouseleave', this._handleCloseBound);
        } else {
          this.el.addEventListener('click', this._handleFABClickBound);
        }
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        if (this.options.hoverEnabled && !this.options.toolbarEnabled) {
          this.el.removeEventListener('mouseenter', this._handleOpenBound);
          this.el.removeEventListener('mouseleave', this._handleCloseBound);
        } else {
          this.el.removeEventListener('click', this._handleFABClickBound);
        }
      }

      /**
       * Handle FAB Click
       */

    }, {
      key: "_handleFABClick",
      value: function _handleFABClick() {
        if (this.isOpen) {
          this.close();
        } else {
          this.open();
        }
      }

      /**
       * Handle Document Click
       * @param {Event} e
       */

    }, {
      key: "_handleDocumentClick",
      value: function _handleDocumentClick(e) {
        if (!$(e.target).closest(this.$menu).length) {
          this.close();
        }
      }

      /**
       * Open FAB
       */

    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }

        if (this.options.toolbarEnabled) {
          this._animateInToolbar();
        } else {
          this._animateInFAB();
        }
        this.isOpen = true;
      }

      /**
       * Close FAB
       */

    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }

        if (this.options.toolbarEnabled) {
          window.removeEventListener('scroll', this._handleCloseBound, true);
          document.body.removeEventListener('click', this._handleDocumentClickBound, true);
          this._animateOutToolbar();
        } else {
          this._animateOutFAB();
        }
        this.isOpen = false;
      }

      /**
       * Classic FAB Menu open
       */

    }, {
      key: "_animateInFAB",
      value: function _animateInFAB() {
        this.$el.addClass('active');
        Vel.hook(this.$floatingBtns, 'scaleX', 0.4);
        Vel.hook(this.$floatingBtns, 'scaleY', 0.4);
        Vel.hook(this.$floatingBtns, 'translateY', this.offsetY + 'px');
        Vel.hook(this.$floatingBtns, 'translateX', this.offsetX + 'px');

        var time = 0;
        this.$floatingBtnsReverse.each(function () {
          Vel(this, { opacity: "1", scaleX: 1, scaleY: 1, translateY: 0, translateX: 0 }, { duration: 80, delay: time });
          time += 40;
        });
      }

      /**
       * Classic FAB Menu close
       */

    }, {
      key: "_animateOutFAB",
      value: function _animateOutFAB() {
        this.$el.removeClass('active');
        Vel(this.$floatingBtns, 'stop');
        Vel(this.$floatingBtns, { opacity: "0", scaleX: .4, scaleY: .4, translateY: this.offsetY, translateX: this.offsetX }, { duration: 80 });
      }

      /**
       * Toolbar transition Menu open
       */

    }, {
      key: "_animateInToolbar",
      value: function _animateInToolbar() {
        var _this32 = this;

        var scaleFactor = void 0;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var btnRect = this.el.getBoundingClientRect();
        var backdrop = $('<div class="fab-backdrop"></div>');
        var fabColor = this.$anchor.css('background-color');
        this.$anchor.append(backdrop);

        this.offsetX = btnRect.left - windowWidth / 2 + btnRect.width / 2;
        this.offsetY = windowHeight - btnRect.bottom;
        scaleFactor = windowWidth / backdrop[0].clientWidth;
        this.btnBottom = btnRect.bottom;
        this.btnLeft = btnRect.left;
        this.btnWidth = btnRect.width;

        // Set initial state
        this.$el.addClass('active');
        this.$el.css({
          'text-align': 'center',
          width: '100%',
          bottom: 0,
          left: 0,
          transform: 'translateX(' + this.offsetX + 'px)',
          transition: 'none'
        });
        this.$anchor.css({
          transform: 'translateY(' + -this.offsetY + 'px)',
          transition: 'none'
        });
        backdrop.css({
          'background-color': fabColor
        });

        setTimeout(function () {
          _this32.$el.css({
            transform: '',
            transition: 'transform .2s cubic-bezier(0.550, 0.085, 0.680, 0.530), background-color 0s linear .2s'
          });
          _this32.$anchor.css({
            overflow: 'visible',
            transform: '',
            transition: 'transform .2s'
          });

          setTimeout(function () {
            _this32.$el.css({
              overflow: 'hidden',
              'background-color': fabColor
            });
            backdrop.css({
              transform: 'scale(' + scaleFactor + ')',
              transition: 'transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)'
            });
            _this32.$menu.children('li').children('a').css({
              opacity: 1
            });

            // Scroll to close.
            _this32._handleDocumentClickBound = _this32._handleDocumentClick.bind(_this32);
            window.addEventListener('scroll', _this32._handleCloseBound, true);
            document.body.addEventListener('click', _this32._handleDocumentClickBound, true);
          }, 100);
        }, 0);
      }

      /**
       * Toolbar transition Menu close
       */

    }, {
      key: "_animateOutToolbar",
      value: function _animateOutToolbar() {
        var _this33 = this;

        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var backdrop = this.$el.find('.fab-backdrop');
        var fabColor = anchor.css('background-color');

        this.offsetX = this.btnLeft - windowWidth / 2 + this.btnWidth / 2;
        this.offsetY = windowHeight - this.btnBottom;

        // Hide backdrop
        this.$el.removeClass('active');
        this.$el.css({
          'background-color': 'transparent',
          transition: 'none'
        });
        this.$anchor.css({
          transition: 'none'
        });
        backdrop.css({
          transform: 'scale(0)',
          'background-color': fabColor
        });
        this.$menu.children('li').children('a').css({
          opacity: ''
        });

        setTimeout(function () {
          backdrop.remove();

          // Set initial state.
          _this33.$el.css({
            'text-align': '',
            width: '',
            bottom: '',
            left: '',
            overflow: '',
            'background-color': '',
            transform: 'translate3d(' + -_this33.offsetX + 'px,0,0)'
          });
          _this33.$anchor.css({
            overflow: '',
            transform: 'translate3d(0,' + _this33.offsetY + 'px,0)'
          });

          setTimeout(function () {
            _this33.$el.css({
              transform: 'translate3d(0,0,0)',
              transition: 'transform .2s'
            });
            _this33.$anchor.css({
              transform: 'translate3d(0,0,0)',
              transition: 'transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)'
            });
          }, 20);
        }, 200);
      }
    }], [{
      key: "init",
      value: function init($els, options) {
        var arr = [];
        $els.each(function () {
          arr.push(new FloatingActionButton(this, options));
        });
        return arr;
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_FloatingActionButton;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return FloatingActionButton;
  }();

  M.FloatingActionButton = FloatingActionButton;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(FloatingActionButton, 'floatingActionButton', 'M_FloatingActionButton');
  }
})(cash, M.Vel);
;(function ($, Vel) {
  'use strict';

  var _defaults = {

    // the default output format for the input field value
    format: 'YYYY-MM-DD',

    // the toString function which gets passed a current date object and format
    // and returns a string
    toString: null,

    // Used to create date object from current input string
    parse: null,

    // The initial date to view when first opened
    defaultDate: null,

    // Make the `defaultDate` the initial selected value
    setDefaultDate: false,

    disableWeekends: false,

    disableDayFn: null,

    // First day of week (0: Sunday, 1: Monday etc)
    firstDay: 0,

    // The earliest date that can be selected
    minDate: null,
    // Thelatest date that can be selected
    maxDate: null,

    // Number of years either side, or array of upper/lower range
    yearRange: 10,

    // used internally (don't config outside)
    minYear: 0,
    maxYear: 9999,
    minMonth: undefined,
    maxMonth: undefined,

    startRange: null,
    endRange: null,

    isRTL: false,

    // Render the month after year in the calendar title
    showMonthAfterYear: false,

    // Render days of the calendar grid that fall in the next or previous month
    showDaysInNextAndPreviousMonths: false,

    // Specify a DOM element to render the calendar in
    container: null,

    // internationalization
    i18n: {
      clear: 'Clear',
      today: 'Today',
      done: 'Ok',
      previousMonth: '‹',
      nextMonth: '›',
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      weekdaysAbbrev: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    },

    // events array
    events: [],

    // callback function
    onSelect: null,
    onOpen: null,
    onClose: null,
    onDraw: null
  };

  /**
   * @class
   *
   */

  var Datepicker = function () {
    /**
     * Construct Datepicker instance and set up overlay
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Datepicker(el, options) {
      _classCallCheck(this, Datepicker);

      // If exists, destroy and reinitialize
      if (!!el.M_Datepicker) {
        el.M_Datepicker.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_Datepicker = this;

      this.options = $.extend({}, Datepicker.defaults, options);

      this.id = M.guid();

      this._setupVariables();
      this._insertHTMLIntoDOM();
      this._setupModal();

      this._setupEventHandlers();

      if (!this.options.defaultDate) {
        this.options.defaultDate = new Date(Date.parse(this.el.value));
        this.options.setDefaultDate = true;
      }

      var defDate = this.options.defaultDate;

      if (Datepicker._isDate(defDate)) {
        if (this.options.setDefaultDate) {
          this.setDate(defDate, true);
        } else {
          this.gotoDate(defDate);
        }
      } else {
        this.gotoDate(new Date());
      }

      /**
       * Describes open/close state of datepicker
       * @type {Boolean}
       */
      this.isOpen = false;
    }

    _createClass(Datepicker, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {}
    }, {
      key: "_insertHTMLIntoDOM",
      value: function _insertHTMLIntoDOM() {
        this.clearBtn.innerHTML = this.options.i18n.clear;
        this.todayBtn.innerHTML = this.options.i18n.today;
        this.doneBtn.innerHTML = this.options.i18n.done;

        var containerEl = document.querySelector(this.options.container);
        if (this.options.container && !!containerEl) {
          this.$modalEl.appendTo(containerEl);
        } else {
          this.$modalEl.insertBefore(this.el);
        }
      }
    }, {
      key: "_setupModal",
      value: function _setupModal() {
        var _this34 = this;

        this.modalEl.id = 'modal-' + this.id;
        this.modal = new M.Modal(this.modalEl, {
          complete: function () {
            _this34.isOpen = false;
          }
        });
      }
    }, {
      key: "toString",
      value: function toString(format) {
        format = format || this.options.format;
        if (!Datepicker._isDate(this.date)) {
          return '';
        }
        if (this.options.toString) {
          return this.options.toString(this.date, format);
        }
        return this.date.toDateString();
      }
    }, {
      key: "setDate",
      value: function setDate(date, preventOnSelect) {
        if (!date) {
          this.date = null;
          this._renderDateDisplay();
          return this.draw();
        }
        if (typeof date === 'string') {
          date = new Date(Date.parse(date));
        }
        if (!Datepicker._isDate(date)) {
          return;
        }

        var min = this.options.minDate,
            max = this.options.maxDate;

        if (Datepicker._isDate(min) && date < min) {
          date = min;
        } else if (Datepicker._isDate(max) && date > max) {
          date = max;
        }

        this.date = new Date(date.getTime());

        this._renderDateDisplay();

        Datepicker._setToStartOfDay(this.date);
        this.gotoDate(this.date);

        if (!preventOnSelect && typeof this.options.onSelect === 'function') {
          this.options.onSelect.call(this, this.getDate());
        }
      }
    }, {
      key: "setInputValue",
      value: function setInputValue() {
        this.el.value = this.toString();
        this.$el.trigger('change', { firedBy: this });
      }
    }, {
      key: "_renderDateDisplay",
      value: function _renderDateDisplay() {
        var displayDate = Datepicker._isDate(this.date) ? this.date : new Date();
        var i18n = this.options.i18n;
        var day = i18n.weekdaysShort[displayDate.getDay()];
        var month = i18n.monthsShort[displayDate.getMonth()];
        var date = displayDate.getDate();
        this.yearTextEl.innerHTML = displayDate.getFullYear();
        this.dateTextEl.innerHTML = day + ", " + month + " " + date;
      }

      /**
       * change view to a specific date
       */

    }, {
      key: "gotoDate",
      value: function gotoDate(date) {
        var newCalendar = true;

        if (!Datepicker._isDate(date)) {
          return;
        }

        if (this.calendars) {
          var firstVisibleDate = new Date(this.calendars[0].year, this.calendars[0].month, 1),
              lastVisibleDate = new Date(this.calendars[this.calendars.length - 1].year, this.calendars[this.calendars.length - 1].month, 1),
              visibleDate = date.getTime();
          // get the end of the month
          lastVisibleDate.setMonth(lastVisibleDate.getMonth() + 1);
          lastVisibleDate.setDate(lastVisibleDate.getDate() - 1);
          newCalendar = visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate;
        }

        if (newCalendar) {
          this.calendars = [{
            month: date.getMonth(),
            year: date.getFullYear()
          }];
          // if (this.options.mainCalendar === 'right') {
          //   this.calendars[0].month += 1 - this.options.numberOfMonths;
          // }
        }

        this.adjustCalendars();
      }
    }, {
      key: "adjustCalendars",
      value: function adjustCalendars() {
        this.calendars[0] = this.adjustCalendar(this.calendars[0]);
        // for (let c = 1; c < this.options.numberOfMonths; c++) {
        //   this.calendars[c] = this.adjustCalendar({
        //     month: this.calendars[0].month + c,
        //     year: this.calendars[0].year
        //   });
        // }
        this.draw();
      }
    }, {
      key: "adjustCalendar",
      value: function adjustCalendar(calendar) {
        if (calendar.month < 0) {
          calendar.year -= Math.ceil(Math.abs(calendar.month) / 12);
          calendar.month += 12;
        }
        if (calendar.month > 11) {
          calendar.year += Math.floor(Math.abs(calendar.month) / 12);
          calendar.month -= 12;
        }
        return calendar;
      }
    }, {
      key: "nextMonth",
      value: function nextMonth() {
        this.calendars[0].month++;
        this.adjustCalendars();
      }
    }, {
      key: "prevMonth",
      value: function prevMonth() {
        this.calendars[0].month--;
        this.adjustCalendars();
      }
    }, {
      key: "render",
      value: function render(year, month, randId) {
        var opts = this.options,
            now = new Date(),
            days = Datepicker._getDaysInMonth(year, month),
            before = new Date(year, month, 1).getDay(),
            data = [],
            row = [];
        Datepicker._setToStartOfDay(now);
        if (opts.firstDay > 0) {
          before -= opts.firstDay;
          if (before < 0) {
            before += 7;
          }
        }
        var previousMonth = month === 0 ? 11 : month - 1,
            nextMonth = month === 11 ? 0 : month + 1,
            yearOfPreviousMonth = month === 0 ? year - 1 : year,
            yearOfNextMonth = month === 11 ? year + 1 : year,
            daysInPreviousMonth = Datepicker._getDaysInMonth(yearOfPreviousMonth, previousMonth);
        var cells = days + before,
            after = cells;
        while (after > 7) {
          after -= 7;
        }
        cells += 7 - after;
        var isWeekSelected = false;
        for (var i = 0, r = 0; i < cells; i++) {
          var day = new Date(year, month, 1 + (i - before)),
              isSelected = Datepicker._isDate(this.date) ? Datepicker._compareDates(day, this.date) : false,
              isToday = Datepicker._compareDates(day, now),
              hasEvent = opts.events.indexOf(day.toDateString()) !== -1 ? true : false,
              isEmpty = i < before || i >= days + before,
              dayNumber = 1 + (i - before),
              monthNumber = month,
              yearNumber = year,
              isStartRange = opts.startRange && Datepicker._compareDates(opts.startRange, day),
              isEndRange = opts.endRange && Datepicker._compareDates(opts.endRange, day),
              isInRange = opts.startRange && opts.endRange && opts.startRange < day && day < opts.endRange,
              isDisabled = opts.minDate && day < opts.minDate || opts.maxDate && day > opts.maxDate || opts.disableWeekends && Datepicker._isWeekend(day) || opts.disableDayFn && opts.disableDayFn(day);

          if (isEmpty) {
            if (i < before) {
              dayNumber = daysInPreviousMonth + dayNumber;
              monthNumber = previousMonth;
              yearNumber = yearOfPreviousMonth;
            } else {
              dayNumber = dayNumber - days;
              monthNumber = nextMonth;
              yearNumber = yearOfNextMonth;
            }
          }

          var dayConfig = {
            day: dayNumber,
            month: monthNumber,
            year: yearNumber,
            hasEvent: hasEvent,
            isSelected: isSelected,
            isToday: isToday,
            isDisabled: isDisabled,
            isEmpty: isEmpty,
            isStartRange: isStartRange,
            isEndRange: isEndRange,
            isInRange: isInRange,
            showDaysInNextAndPreviousMonths: opts.showDaysInNextAndPreviousMonths
          };

          row.push(this.renderDay(dayConfig));

          if (++r === 7) {
            data.push(this.renderRow(row, opts.isRTL, isWeekSelected));
            row = [];
            r = 0;
            isWeekSelected = false;
          }
        }
        return this.renderTable(opts, data, randId);
      }
    }, {
      key: "renderDay",
      value: function renderDay(opts) {
        var arr = [];
        var ariaSelected = 'false';
        if (opts.isEmpty) {
          if (opts.showDaysInNextAndPreviousMonths) {
            arr.push('is-outside-current-month');
            arr.push('is-selection-disabled');
          } else {
            return '<td class="is-empty"></td>';
          }
        }
        if (opts.isDisabled) {
          arr.push('is-disabled');
        }

        if (opts.isToday) {
          arr.push('is-today');
        }
        if (opts.isSelected) {
          arr.push('is-selected');
          ariaSelected = 'true';
        }
        if (opts.hasEvent) {
          arr.push('has-event');
        }
        if (opts.isInRange) {
          arr.push('is-inrange');
        }
        if (opts.isStartRange) {
          arr.push('is-startrange');
        }
        if (opts.isEndRange) {
          arr.push('is-endrange');
        }
        return '<td data-day="' + opts.day + '" class="' + arr.join(' ') + '" aria-selected="' + ariaSelected + '">' + '<button class="datepicker-day-button" type="button" ' + 'data-pika-year="' + opts.year + '" data-pika-month="' + opts.month + '" data-pika-day="' + opts.day + '">' + opts.day + '</button>' + '</td>';
      }
    }, {
      key: "renderRow",
      value: function renderRow(days, isRTL, isRowSelected) {
        return '<tr class="pika-row' + (isRowSelected ? ' is-selected' : '') + '">' + (isRTL ? days.reverse() : days).join('') + '</tr>';
      }
    }, {
      key: "renderTable",
      value: function renderTable(opts, data, randId) {
        return '<div class="datepicker-table-wrapper"><table cellpadding="0" cellspacing="0" class="datepicker-table" role="grid" aria-labelledby="' + randId + '">' + this.renderHead(opts) + this.renderBody(data) + '</table></div>';
      }
    }, {
      key: "renderHead",
      value: function renderHead(opts) {
        var i = void 0,
            arr = [];
        for (i = 0; i < 7; i++) {
          arr.push('<th scope="col"><abbr title="' + this.renderDayName(opts, i) + '">' + this.renderDayName(opts, i, true) + '</abbr></th>');
        }
        return '<thead><tr>' + (opts.isRTL ? arr.reverse() : arr).join('') + '</tr></thead>';
      }
    }, {
      key: "renderBody",
      value: function renderBody(rows) {
        return '<tbody>' + rows.join('') + '</tbody>';
      }
    }, {
      key: "renderTitle",
      value: function renderTitle(instance, c, year, month, refYear, randId) {
        var i = void 0,
            j = void 0,
            arr = void 0,
            opts = this.options,
            isMinYear = year === opts.minYear,
            isMaxYear = year === opts.maxYear,
            html = '<div id="' + randId + '" class="datepicker-controls" role="heading" aria-live="assertive">',
            monthHtml = void 0,
            yearHtml = void 0,
            prev = true,
            next = true;

        for (arr = [], i = 0; i < 12; i++) {
          arr.push('<option value="' + (year === refYear ? i - c : 12 + i - c) + '"' + (i === month ? ' selected="selected"' : '') + (isMinYear && i < opts.minMonth || isMaxYear && i > opts.maxMonth ? 'disabled="disabled"' : '') + '>' + opts.i18n.months[i] + '</option>');
        }

        // monthHtml = '<div class="pika-label">' + opts.i18n.months[month] + '<select class="pika-select pika-select-month" tabindex="-1">' + arr.join('') + '</select></div>';
        monthHtml = '<select class="pika-select pika-select-month" tabindex="-1">' + arr.join('') + '</select>';

        if ($.isArray(opts.yearRange)) {
          i = opts.yearRange[0];
          j = opts.yearRange[1] + 1;
        } else {
          i = year - opts.yearRange;
          j = 1 + year + opts.yearRange;
        }

        for (arr = []; i < j && i <= opts.maxYear; i++) {
          if (i >= opts.minYear) {
            arr.push('<option value="' + i + '"' + (i === year ? ' selected="selected"' : '') + '>' + i + '</option>');
          }
        }
        // yearHtml = '<div class="pika-label">' + year + opts.yearSuffix + '<select class="pika-select pika-select-year" tabindex="-1">' + arr.join('') + '</select></div>';
        yearHtml = '<select class="pika-select pika-select-year" tabindex="-1">' + arr.join('') + '</select>';

        var leftArrow = '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/><path d="M0-.5h24v24H0z" fill="none"/></svg>';
        html += '<button class="month-prev' + (prev ? '' : ' is-disabled') + '" type="button">' + leftArrow + '</button>';

        html += '<div class="selects-container">';
        if (opts.showMonthAfterYear) {
          html += yearHtml + monthHtml;
        } else {
          html += monthHtml + yearHtml;
        }
        html += '</div>';

        if (isMinYear && (month === 0 || opts.minMonth >= month)) {
          prev = false;
        }

        if (isMaxYear && (month === 11 || opts.maxMonth <= month)) {
          next = false;
        }

        // if (c === (this.options.numberOfMonths - 1) ) {
        var rightArrow = '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/><path d="M0-.25h24v24H0z" fill="none"/></svg>';
        html += '<button class="month-next' + (next ? '' : ' is-disabled') + '" type="button">' + rightArrow + '</button>';
        // }

        return html += '</div>';
      }

      /**
       * refresh the HTML
       */

    }, {
      key: "draw",
      value: function draw(force) {
        if (!this.isOpen && !force) {
          return;
        }
        var opts = this.options,
            minYear = opts.minYear,
            maxYear = opts.maxYear,
            minMonth = opts.minMonth,
            maxMonth = opts.maxMonth,
            html = '',
            randId = void 0;

        if (this._y <= minYear) {
          this._y = minYear;
          if (!isNaN(minMonth) && this._m < minMonth) {
            this._m = minMonth;
          }
        }
        if (this._y >= maxYear) {
          this._y = maxYear;
          if (!isNaN(maxMonth) && this._m > maxMonth) {
            this._m = maxMonth;
          }
        }

        randId = 'pika-title-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 2);

        for (var c = 0; c < 1; c++) {
          this._renderDateDisplay();
          html += this.renderTitle(this, c, this.calendars[c].year, this.calendars[c].month, this.calendars[0].year, randId) + this.render(this.calendars[c].year, this.calendars[c].month, randId);
        }

        this.calendarEl.innerHTML = html;

        // Init Materialize Select
        new M.Select(this.calendarEl.querySelector('.pika-select-year'), { classes: 'select-year' });
        new M.Select(this.calendarEl.querySelector('.pika-select-month'), { classes: 'select-month' });

        if (typeof this.options.onDraw === 'function') {
          this.options.onDraw(this);
        }
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
        this._handleInputClickBound = this._handleInputClick.bind(this);
        this._handleInputChangeBound = this._handleInputChange.bind(this);
        this._handleCalendarClickBound = this._handleCalendarClick.bind(this);
        this._finishSelectionBound = this._finishSelection.bind(this);
        this._handleTodayClickBound = this._handleTodayClick.bind(this);
        this._handleClearClickBound = this._handleClearClick.bind(this);

        this.el.addEventListener('click', this._handleInputClickBound);
        this.el.addEventListener('keydown', this._handleInputKeydownBound);
        this.el.addEventListener('change', this._handleInputChangeBound);
        this.calendarEl.addEventListener('click', this._handleCalendarClickBound);
        this.doneBtn.addEventListener('click', this._finishSelectionBound);
        this.todayBtn.addEventListener('click', this._handleTodayClickBound);
        this.clearBtn.addEventListener('click', this._handleClearClickBound);
      }
    }, {
      key: "_setupVariables",
      value: function _setupVariables() {
        this.$modalEl = $(Datepicker._template);
        this.modalEl = this.$modalEl[0];

        this.calendarEl = this.modalEl.querySelector('.pika-single');

        this.yearTextEl = this.modalEl.querySelector('.year-text');
        this.dateTextEl = this.modalEl.querySelector('.date-text');
        this.clearBtn = this.modalEl.querySelector('.datepicker-clear');
        this.todayBtn = this.modalEl.querySelector('.datepicker-today');
        this.doneBtn = this.modalEl.querySelector('.datepicker-done');
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('click', this._handleInputClickBound);
        this.el.removeEventListener('keydown', this._handleInputKeydownBound);
        this.el.removeEventListener('change', this._handleInputChangeBound);
        this.calendarEl.removeEventListener('click', this._handleCalendarClickBound);
      }
    }, {
      key: "_handleInputClick",
      value: function _handleInputClick() {
        this.open();
      }
    }, {
      key: "_handleInputKeydown",
      value: function _handleInputKeydown(e) {
        if (e.which === M.keys.ENTER) {
          e.preventDefault();
          this.open();
        }
      }
    }, {
      key: "_handleCalendarClick",
      value: function _handleCalendarClick(e) {
        if (!this.isOpen) {
          return;
        }

        var $target = $(e.target);
        if (!$target.hasClass('is-disabled')) {
          if ($target.hasClass('datepicker-day-button') && !$target.hasClass('is-empty') && !$target.parent().hasClass('is-disabled')) {
            this.setDate(new Date(e.target.getAttribute('data-pika-year'), e.target.getAttribute('data-pika-month'), e.target.getAttribute('data-pika-day')));
          } else if ($target.closest('.month-prev').length) {
            this.prevMonth();
          } else if ($target.closest('.month-next').length) {
            this.nextMonth();
          }
        }
        // if (!$target.hasClass('pika-select')) {
        //   // if this is touch event prevent mouse events emulation
        //   // if (e.preventDefault) {
        //   //   e.preventDefault();
        //   // } else {
        //   //   e.returnValue = false;
        //   //   return false;
        //   // }
        // } else {
        //   this._c = true;
        // }
      }
    }, {
      key: "_handleTodayClick",
      value: function _handleTodayClick() {
        this.date = new Date();
        this.setInputValue();
        this.close();
      }
    }, {
      key: "_handleClearClick",
      value: function _handleClearClick() {
        this.date = null;
        this.setInputValue();
        this.close();
      }

      // _onChange(e) {
      //   e = e || window.event;
      //   let target = e.target || e.srcElement;
      //   if (!target) {
      //     return;
      //   }
      //   if (hasClass(target, 'pika-select-month')) {
      //     self.gotoMonth(target.value);
      //   }
      //   else if (hasClass(target, 'pika-select-year')) {
      //     self.gotoYear(target.value);
      //   }
      // }

      // _onKeyChange(e) {
      //   e = e || window.event;

      //   if (self.isVisible()) {

      //     switch(e.keyCode){
      //     case 13:
      //     case 27:
      //       if (opts.field) {
      //         opts.field.blur();
      //       }
      //       break;
      //     case 37:
      //       e.preventDefault();
      //       self.adjustDate('subtract', 1);
      //       break;
      //     case 38:
      //       self.adjustDate('subtract', 7);
      //       break;
      //     case 39:
      //       self.adjustDate('add', 1);
      //       break;
      //     case 40:
      //       self.adjustDate('add', 7);
      //       break;
      //     }
      //   }
      // }

    }, {
      key: "_handleInputChange",
      value: function _handleInputChange(e) {
        var date = void 0;

        // Prevent change event from being fired when triggered by the plugin
        if (e.firedBy === this) {
          return;
        }
        if (this.options.parse) {
          date = this.options.parse(this.el.value, this.options.format);
        } else {
          date = new Date(Date.parse(this.el.value));
        }

        if (Datepicker._isDate(date)) {
          this.setDate(date);
        }
        // if (!self._v) {
        //   self.show();
        // }
      }

      // _onInputBlur() {
      //   // IE allows pika div to gain focus; catch blur the input field
      //   let pEl = document.activeElement;
      //   do {
      //     if (hasClass(pEl, 'pika-single')) {
      //       return;
      //     }
      //   }
      //   while ((pEl = pEl.parentNode));

      //   if (!self._c) {
      //     self._b = sto(function() {
      //       self.hide();
      //     }, 50);
      //   }
      //   self._c = false;
      // }


    }, {
      key: "renderDayName",
      value: function renderDayName(opts, day, abbr) {
        day += opts.firstDay;
        while (day >= 7) {
          day -= 7;
        }
        return abbr ? opts.i18n.weekdaysAbbrev[day] : opts.i18n.weekdays[day];
      }

      /**
       * Set input value to the selected date and close Datepicker
       */

    }, {
      key: "_finishSelection",
      value: function _finishSelection() {
        this.setInputValue();
        this.close();
      }

      /**
       * Open Datepicker
       */

    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }

        this.isOpen = true;
        if (typeof this.options.onOpen === 'function') {
          this.options.onOpen.call(this);
        }
        this.draw();
        this.modal.open();
        return this;
      }

      /**
       * Close Datepicker
       */

    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }

        this.isOpen = false;
        if (typeof this.options.onClose === 'function') {
          this.options.onClose.call(this);
        }
        this.modal.close();
        return this;
      }
    }], [{
      key: "init",
      value: function init($els, options) {
        var arr = [];
        $els.each(function () {
          arr.push(new Datepicker(this, options));
        });
        return arr;
      }
    }, {
      key: "_isDate",
      value: function _isDate(obj) {
        return (/Date/.test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime())
        );
      }
    }, {
      key: "_isWeekend",
      value: function _isWeekend(date) {
        var day = date.getDay();
        return day === 0 || day === 6;
      }
    }, {
      key: "_setToStartOfDay",
      value: function _setToStartOfDay(date) {
        if (Datepicker._isDate(date)) date.setHours(0, 0, 0, 0);
      }
    }, {
      key: "_getDaysInMonth",
      value: function _getDaysInMonth(year, month) {
        return [31, Datepicker._isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
      }
    }, {
      key: "_isLeapYear",
      value: function _isLeapYear(year) {
        // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
      }
    }, {
      key: "_compareDates",
      value: function _compareDates(a, b) {
        // weak date comparison (use setToStartOfDay(date) to ensure correct result)
        return a.getTime() === b.getTime();
      }
    }, {
      key: "_setToStartOfDay",
      value: function _setToStartOfDay(date) {
        if (Datepicker._isDate(date)) date.setHours(0, 0, 0, 0);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Datepicker;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Datepicker;
  }();

  Datepicker._template = ['<div class= "modal datepicker-modal">', '<div class="modal-content datepicker-container">', '<div class="datepicker-date-display">', '<span class="year-text"></span>', '<span class="date-text"></span>', '</div>', '<div class="datepicker-calendar-container">', '<div class="pika-single"></div>', '<div class="datepicker-footer">', '<button class="btn-flat datepicker-clear waves-effect" type="button"></button>', '<div class="confirmation-btns">', '<button class="btn-flat datepicker-today waves-effect" type="button"></button>', '<button class="btn-flat datepicker-done waves-effect" type="button"></button>', '</div>', '</div>', '</div>', '</div>', '</div>'].join('');

  M.Datepicker = Datepicker;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Datepicker, 'datepicker', 'M_Datepicker');
  }
})(cash, M.Vel);
;(function ($, Vel) {
  'use strict';

  var _defaults = {
    dialRadius: 135,
    outerRadius: 105,
    innerRadius: 70,
    tickRadius: 20,
    duration: 350,
    container: null,
    defaultTime: 'now', // default time, 'now' or '13:14' e.g.
    fromnow: 0, // Millisecond offset from the defaultTime
    doneText: 'Ok', // done button text
    clearText: 'Clear',
    cancelText: 'Cancel',
    autoClose: false, // auto close when minute is selected
    twelveHour: true, // change to 12 hour AM/PM clock from 24 hour
    vibrate: true // vibrate the device when dragging clock hand
  };

  /**
   * @class
   *
   */

  var Timepicker = function () {
    function Timepicker(el, options) {
      _classCallCheck(this, Timepicker);

      // If exists, destroy and reinitialize
      if (!!el.M_Timepicker) {
        el.M_Timepicker.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_Timepicker = this;

      this.options = $.extend({}, Timepicker.defaults, options);

      this.id = M.guid();
      this._insertHTMLIntoDOM();
      this._setupModal();
      this._setupVariables();
      this._setupEventHandlers();

      this._clockSetup();
      this._pickerSetup();
    }

    _createClass(Timepicker, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.modal.destroy();
        $(this.modalEl).remove();
        this.el.M_Timepicker = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
        this._handleInputClickBound = this._handleInputClick.bind(this);
        this._handleClockClickStartBound = this._handleClockClickStart.bind(this);
        this._handleDocumentClickMoveBound = this._handleDocumentClickMove.bind(this);
        this._handleDocumentClickEndBound = this._handleDocumentClickEnd.bind(this);

        this.el.addEventListener('click', this._handleInputClickBound);
        this.el.addEventListener('keydown', this._handleInputKeydownBound);
        this.plate.addEventListener('mousedown', this._handleClockClickStartBound);
        this.plate.addEventListener('touchstart', this._handleClockClickStartBound);

        $(this.spanHours).on('click', this.showView.bind(this, 'hours'));
        $(this.spanMinutes).on('click', this.showView.bind(this, 'minutes'));
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('click', this._handleInputClickBound);
        this.el.removeEventListener('keydown', this._handleInputKeydownBound);
      }
    }, {
      key: "_handleInputClick",
      value: function _handleInputClick() {
        this.open();
      }
    }, {
      key: "_handleInputKeydown",
      value: function _handleInputKeydown(e) {
        if (e.which === M.keys.ENTER) {
          e.preventDefault();
          this.open();
        }
      }
    }, {
      key: "_handleClockClickStart",
      value: function _handleClockClickStart(e) {
        e.preventDefault();
        var clockPlateBR = this.plate.getBoundingClientRect();
        var offset = { x: clockPlateBR.left, y: clockPlateBR.top };

        this.x0 = offset.x + this.options.dialRadius;
        this.y0 = offset.y + this.options.dialRadius;
        this.moved = false;
        var clickPos = Timepicker._Pos(e);
        this.dx = clickPos.x - this.x0;
        this.dy = clickPos.y - this.y0;

        // Set clock hands
        this.setHand(this.dx, this.dy, false);

        // Mousemove on document
        document.addEventListener('mousemove', this._handleDocumentClickMoveBound);
        document.addEventListener('touchmove', this._handleDocumentClickMoveBound);

        // Mouseup on document
        document.addEventListener('mouseup', this._handleDocumentClickEndBound);
        document.addEventListener('touchend', this._handleDocumentClickEndBound);
      }
    }, {
      key: "_handleDocumentClickMove",
      value: function _handleDocumentClickMove(e) {
        e.preventDefault();
        var clickPos = Timepicker._Pos(e);
        var x = clickPos.x - this.x0;
        var y = clickPos.y - this.y0;
        this.moved = true;
        this.setHand(x, y, false, true);
      }
    }, {
      key: "_handleDocumentClickEnd",
      value: function _handleDocumentClickEnd(e) {
        e.preventDefault();
        document.removeEventListener('mouseup', this._handleDocumentClickEndBound);
        document.removeEventListener('touchend', this._handleDocumentClickEndBound);
        var clickPos = Timepicker._Pos(e);
        var x = clickPos.x - this.x0;
        var y = clickPos.y - this.y0;
        if (this.moved && x === this.dx && y === this.dy) {
          this.setHand(x, y);
        }

        if (this.currentView === 'hours') {
          this.showView('minutes', this.options.duration / 2);
        } else if (this.options.autoClose) {
          this.minutesView.addClass('timepicker-dial-out');
          setTimeout(function () {
            this.done();
          }, this.options.duration / 2);
        }

        // Unbind mousemove event
        document.removeEventListener('mousemove', this._handleDocumentClickMoveBound);
        document.removeEventListener('touchmove', this._handleDocumentClickMoveBound);
      }
    }, {
      key: "_insertHTMLIntoDOM",
      value: function _insertHTMLIntoDOM() {
        this.$modalEl = $(Timepicker._template);
        this.modalEl = this.$modalEl[0];
        this.modalEl.id = 'modal-' + this.id;

        // Append popover to input by default
        var containerEl = document.querySelector(this.options.container);
        if (this.options.container && !!containerEl) {
          this.$modalEl.appendTo(containerEl);
        } else {
          this.$modalEl.insertBefore(this.el);
        }
      }
    }, {
      key: "_setupModal",
      value: function _setupModal() {
        var _this35 = this;

        this.modal = new M.Modal(this.modalEl, {
          complete: function () {
            _this35.isOpen = false;
          }
        });
      }
    }, {
      key: "_setupVariables",
      value: function _setupVariables() {
        this.currentView = 'hours';
        this.vibrate = navigator.vibrate ? 'vibrate' : navigator.webkitVibrate ? 'webkitVibrate' : null;

        this._canvas = this.modalEl.querySelector('.timepicker-canvas');
        this.plate = this.modalEl.querySelector('.timepicker-plate');

        this.hoursView = this.modalEl.querySelector('.timepicker-hours');
        this.minutesView = this.modalEl.querySelector('.timepicker-minutes');
        this.spanHours = this.modalEl.querySelector('.timepicker-span-hours');
        this.spanMinutes = this.modalEl.querySelector('.timepicker-span-minutes');
        this.spanAmPm = this.modalEl.querySelector('.timepicker-span-am-pm');
        this.footer = this.modalEl.querySelector('.timepicker-footer');
        this.amOrPm = 'PM';
      }
    }, {
      key: "_pickerSetup",
      value: function _pickerSetup() {
        $('<button class="btn-flat timepicker-clear waves-effect" type="button" tabindex="' + (this.options.twelveHour ? '3' : '1') + '">' + this.options.clearText + '</button>').appendTo(this.footer).on('click', this.clear.bind(this));

        var confirmationBtnsContainer = $('<div class="confirmation-btns"></div>');
        $('<button class="btn-flat timepicker-close waves-effect" type="button" tabindex="' + (this.options.twelveHour ? '3' : '1') + '">' + this.options.cancelText + '</button>').appendTo(confirmationBtnsContainer).on('click', this.close.bind(this));
        $('<button class="btn-flat timepicker-close waves-effect" type="button" tabindex="' + (this.options.twelveHour ? '3' : '1') + '">' + this.options.doneText + '</button>').appendTo(confirmationBtnsContainer).on('click', this.done.bind(this));
        confirmationBtnsContainer.appendTo(this.footer);
      }
    }, {
      key: "_clockSetup",
      value: function _clockSetup() {
        if (this.options.twelveHour) {
          this.$amBtn = $('<div class="am-btn">AM</div>');
          this.$pmBtn = $('<div class="pm-btn">PM</div>');
          this.$amBtn.on('click', this._handleAmPmClick.bind(this)).appendTo(this.spanAmPm);
          this.$pmBtn.on('click', this._handleAmPmClick.bind(this)).appendTo(this.spanAmPm);
        }

        this._buildHoursView();
        this._buildMinutesView();
        this._buildSVGClock();
      }
    }, {
      key: "_buildSVGClock",
      value: function _buildSVGClock() {
        // Draw clock hands and others
        var dialRadius = this.options.dialRadius;
        var tickRadius = this.options.tickRadius;
        var diameter = dialRadius * 2;

        var svg = Timepicker._createSVGEl('svg');
        svg.setAttribute('class', 'timepicker-svg');
        svg.setAttribute('width', diameter);
        svg.setAttribute('height', diameter);
        var g = Timepicker._createSVGEl('g');
        g.setAttribute('transform', 'translate(' + dialRadius + ',' + dialRadius + ')');
        var bearing = Timepicker._createSVGEl('circle');
        bearing.setAttribute('class', 'timepicker-canvas-bearing');
        bearing.setAttribute('cx', 0);
        bearing.setAttribute('cy', 0);
        bearing.setAttribute('r', 4);
        var hand = Timepicker._createSVGEl('line');
        hand.setAttribute('x1', 0);
        hand.setAttribute('y1', 0);
        var bg = Timepicker._createSVGEl('circle');
        bg.setAttribute('class', 'timepicker-canvas-bg');
        bg.setAttribute('r', tickRadius);
        g.appendChild(hand);
        g.appendChild(bg);
        g.appendChild(bearing);
        svg.appendChild(g);
        this._canvas.appendChild(svg);

        this.hand = hand;
        this.bg = bg;
        this.bearing = bearing;
        this.g = g;
      }
    }, {
      key: "_buildHoursView",
      value: function _buildHoursView() {
        var $tick = $('<div class="timepicker-tick"></div>');
        // Hours view
        if (this.options.twelveHour) {
          for (var i = 1; i < 13; i += 1) {
            var tick = $tick.clone();
            var radian = i / 6 * Math.PI;
            var radius = this.options.outerRadius;
            tick.css({
              left: this.options.dialRadius + Math.sin(radian) * radius - this.options.tickRadius + 'px',
              top: this.options.dialRadius - Math.cos(radian) * radius - this.options.tickRadius + 'px'
            });
            tick.html(i === 0 ? '00' : i);
            this.hoursView.appendChild(tick[0]);
            // tick.on(mousedownEvent, mousedown);
          }
        } else {
          for (var _i2 = 0; _i2 < 24; _i2 += 1) {
            var _tick = $tick.clone();
            var _radian = _i2 / 6 * Math.PI;
            var inner = _i2 > 0 && _i2 < 13;
            var _radius = inner ? this.options.innerRadius : this.options.outerRadius;
            _tick.css({
              left: this.options.dialRadius + Math.sin(_radian) * _radius - this.options.tickRadius + 'px',
              top: this.options.dialRadius - Math.cos(_radian) * _radius - this.options.tickRadius + 'px'
            });
            _tick.html(_i2 === 0 ? '00' : _i2);
            this.hoursView.appendChild(_tick[0]);
            // tick.on(mousedownEvent, mousedown);
          }
        }
      }
    }, {
      key: "_buildMinutesView",
      value: function _buildMinutesView() {
        var $tick = $('<div class="timepicker-tick"></div>');
        // Minutes view
        for (var i = 0; i < 60; i += 5) {
          var tick = $tick.clone();
          var radian = i / 30 * Math.PI;
          tick.css({
            left: this.options.dialRadius + Math.sin(radian) * this.options.outerRadius - this.options.tickRadius + 'px',
            top: this.options.dialRadius - Math.cos(radian) * this.options.outerRadius - this.options.tickRadius + 'px'
          });
          tick.html(Timepicker._addLeadingZero(i));
          this.minutesView.appendChild(tick[0]);
        }
      }
    }, {
      key: "_handleAmPmClick",
      value: function _handleAmPmClick(e) {
        var $btnClicked = $(e.target);
        this.amOrPm = $btnClicked.hasClass('am-btn') ? 'AM' : 'PM';
        this._updateAmPmView();
      }
    }, {
      key: "_updateAmPmView",
      value: function _updateAmPmView() {
        this.$amBtn.toggleClass('text-primary', this.amOrPm === 'AM');
        this.$pmBtn.toggleClass('text-primary', this.amOrPm === 'PM');
      }
    }, {
      key: "_updateTimeFromInput",
      value: function _updateTimeFromInput() {
        // Get the time
        var value = ((this.el.value || this.options.defaultTime || '') + '').split(':');
        if (this.options.twelveHour && !(typeof value[1] === 'undefined')) {
          if (value[1].indexOf("AM") > 0) {
            this.amOrPm = 'AM';
          } else {
            this.amOrPm = 'PM';
          }
          value[1] = value[1].replace("AM", "").replace("PM", "");
        }
        if (value[0] === 'now') {
          var now = new Date(+new Date() + this.options.fromnow);
          value = [now.getHours(), now.getMinutes()];
          if (this.options.twelveHour) {
            this.amOrPm = value[0] >= 12 && value[0] < 24 ? 'PM' : 'AM';
          }
        }
        this.hours = +value[0] || 0;
        this.minutes = +value[1] || 0;
        this.spanHours.innerHTML = this.hours;
        this.spanMinutes.innerHTML = Timepicker._addLeadingZero(this.minutes);

        this._updateAmPmView();
      }
    }, {
      key: "showView",
      value: function showView(view, delay) {
        if (view === 'minutes' && $(this.hoursView).css("visibility") === "visible") {
          // raiseCallback(this.options.beforeHourSelect);
        }
        var isHours = view === 'hours',
            nextView = isHours ? this.hoursView : this.minutesView,
            hideView = isHours ? this.minutesView : this.hoursView;
        this.currentView = view;

        $(this.spanHours).toggleClass('text-primary', isHours);
        $(this.spanMinutes).toggleClass('text-primary', !isHours);

        // Transition view
        hideView.classList.add('timepicker-dial-out');
        $(nextView).css('visibility', 'visible').removeClass('timepicker-dial-out');

        // Reset clock hand
        this.resetClock(delay);

        // After transitions ended
        clearTimeout(this.toggleViewTimer);
        this.toggleViewTimer = setTimeout(function () {
          $(hideView).css('visibility', 'hidden');
        }, this.options.duration);
      }
    }, {
      key: "resetClock",
      value: function resetClock(delay) {
        var view = this.currentView,
            value = this[view],
            isHours = view === 'hours',
            unit = Math.PI / (isHours ? 6 : 30),
            radian = value * unit,
            radius = isHours && value > 0 && value < 13 ? this.options.innerRadius : this.options.outerRadius,
            x = Math.sin(radian) * radius,
            y = -Math.cos(radian) * radius,
            self = this;

        if (delay) {
          $(this.canvas).addClass('timepicker-canvas-out');
          setTimeout(function () {
            $(self.canvas).removeClass('timepicker-canvas-out');
            self.setHand(x, y);
          }, delay);
        } else {
          this.setHand(x, y);
        }
      }
    }, {
      key: "setHand",
      value: function setHand(x, y, roundBy5) {
        var _this36 = this;

        var radian = Math.atan2(x, -y),
            isHours = this.currentView === 'hours',
            unit = Math.PI / (isHours || roundBy5 ? 6 : 30),
            z = Math.sqrt(x * x + y * y),
            inner = isHours && z < (this.options.outerRadius + this.options.innerRadius) / 2,
            radius = inner ? this.options.innerRadius : this.options.outerRadius;

        if (this.options.twelveHour) {
          radius = this.options.outerRadius;
        }

        // Radian should in range [0, 2PI]
        if (radian < 0) {
          radian = Math.PI * 2 + radian;
        }

        // Get the round value
        var value = Math.round(radian / unit);

        // Get the round radian
        radian = value * unit;

        // Correct the hours or minutes
        if (this.options.twelveHour) {
          if (isHours) {
            if (value === 0) value = 12;
          } else {
            if (roundBy5) value *= 5;
            if (value === 60) value = 0;
          }
        } else {
          if (isHours) {
            if (value === 12) {
              value = 0;
            }
            value = inner ? value === 0 ? 12 : value : value === 0 ? 0 : value + 12;
          } else {
            if (roundBy5) {
              value *= 5;
            }
            if (value === 60) {
              value = 0;
            }
          }
        }

        // Once hours or minutes changed, vibrate the device
        if (this[this.currentView] !== value) {
          if (this.vibrate && this.options.vibrate) {
            // Do not vibrate too frequently
            if (!this.vibrateTimer) {
              navigator[this.vibrate](10);
              this.vibrateTimer = setTimeout(function () {
                _this36.vibrateTimer = null;
              }, 100);
            }
          }
        }

        this[this.currentView] = value;
        if (isHours) {
          this['spanHours'].innerHTML = value;
        } else {
          this['spanMinutes'].innerHTML = Timepicker._addLeadingZero(value);
        }

        // Set clock hand and others' position
        var cx1 = Math.sin(radian) * (radius - this.options.tickRadius),
            cy1 = -Math.cos(radian) * (radius - this.options.tickRadius),
            cx2 = Math.sin(radian) * radius,
            cy2 = -Math.cos(radian) * radius;
        this.hand.setAttribute('x2', cx1);
        this.hand.setAttribute('y2', cy1);
        this.bg.setAttribute('cx', cx2);
        this.bg.setAttribute('cy', cy2);
      }
    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }

        this.isOpen = true;
        this._updateTimeFromInput();
        this.showView('hours');
        this.modal.open();
      }
    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }

        this.isOpen = false;
        this.modal.close();
      }

      /**
       * Finish timepicker selection.
       */

    }, {
      key: "done",
      value: function done(e, clearValue) {
        // Set input value
        var last = this.el.value;
        var value = clearValue ? '' : Timepicker._addLeadingZero(this.hours) + ':' + Timepicker._addLeadingZero(this.minutes);
        this.time = value;
        if (!clearValue && this.options.twelveHour) {
          value = value + " " + this.amOrPm;
        }
        this.el.value = value;

        // Trigger change event
        if (value !== last) {
          this.$el.trigger('change');
        }

        this.close();
        this.el.focus();
      }
    }, {
      key: "clear",
      value: function clear() {
        this.done(null, true);
      }
    }], [{
      key: "init",
      value: function init($els, options) {
        var arr = [];
        $els.each(function () {
          arr.push(new Timepicker(this, options));
        });
        return arr;
      }
    }, {
      key: "_addLeadingZero",
      value: function _addLeadingZero(num) {
        return (num < 10 ? '0' : '') + num;
      }
    }, {
      key: "_createSVGEl",
      value: function _createSVGEl(name) {
        var svgNS = 'http://www.w3.org/2000/svg';
        return document.createElementNS(svgNS, name);
      }

      /**
       * @typedef {Object} Point
       * @property {number} x The X Coordinate
       * @property {number} y The Y Coordinate
       */

      /**
       * Get x position of mouse or touch event
       * @param {Event} e
       * @return {Point} x and y location
       */

    }, {
      key: "_Pos",
      value: function _Pos(e) {
        if (e.targetTouches && e.targetTouches.length >= 1) {
          return { x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY };
        }
        // mouse event
        return { x: e.clientX, y: e.clientY };
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Timepicker;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Timepicker;
  }();

  Timepicker._template = ['<div class= "modal timepicker-modal">', '<div class="modal-content timepicker-container">', '<div class="timepicker-digital-display">', '<div class="timepicker-text-container">', '<div class="timepicker-display-column">', '<span class="timepicker-span-hours text-primary"></span>', ':', '<span class="timepicker-span-minutes"></span>', '</div>', '<div class="timepicker-display-column timepicker-display-am-pm">', '<div class="timepicker-span-am-pm"></div>', '</div>', '</div>', '</div>', '<div class="timepicker-analog-display">', '<div class="timepicker-plate">', '<div class="timepicker-canvas"></div>', '<div class="timepicker-dial timepicker-hours"></div>', '<div class="timepicker-dial timepicker-minutes timepicker-dial-out"></div>', '</div>', '<div class="timepicker-footer"></div>', '</div>', '</div>', '</div>'].join('');

  M.Timepicker = Timepicker;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Timepicker, 'timepicker', 'M_Timepicker');
  }
})(cash, M.Vel);
;(function ($) {
  'use strict';

  var _defaults = {};

  /**
   * @class
   *
   */

  var CharacterCounter = function () {
    /**
     * Construct CharacterCounter instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function CharacterCounter(el, options) {
      _classCallCheck(this, CharacterCounter);

      // If exists, destroy and reinitialize
      if (!!el.M_CharacterCounter) {
        el.M_CharacterCounter.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_CharacterCounter = this;

      /**
       * Options for the character counter
       */
      this.options = $.extend({}, CharacterCounter.defaults, options);

      this.isInvalid = false;
      this.isValidLength = false;
      this._setupCounter();
      this._setupEventHandlers();
    }

    _createClass(CharacterCounter, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.CharacterCounter = undefined;
        this._removeCounter();
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleUpdateCounterBound = this.updateCounter.bind(this);

        this.el.addEventListener('focus', this._handleUpdateCounterBound, true);
        this.el.addEventListener('input', this._handleUpdateCounterBound, true);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('focus', this._handleUpdateCounterBound, true);
        this.el.removeEventListener('input', this._handleUpdateCounterBound, true);
      }

      /**
       * Setup counter element
       */

    }, {
      key: "_setupCounter",
      value: function _setupCounter() {
        this.counterEl = document.createElement('span');
        $(this.counterEl).addClass('character-counter').css({
          float: 'right',
          'font-size': '12px',
          height: 1
        });

        this.$el.parent().append(this.counterEl);
      }

      /**
       * Remove counter element
       */

    }, {
      key: "_removeCounter",
      value: function _removeCounter() {
        $(this.counterEl).remove();
      }

      /**
       * Update counter
       */

    }, {
      key: "updateCounter",
      value: function updateCounter() {
        var maxLength = +this.$el.attr('data-length'),
            actualLength = this.el.value.length;
        this.isValidLength = actualLength <= maxLength;
        var counterString = actualLength;

        if (maxLength) {
          counterString += '/' + maxLength;
          this._validateInput();
        }

        $(this.counterEl).html(counterString);
      }

      /**
       * Add validation classes
       */

    }, {
      key: "_validateInput",
      value: function _validateInput() {
        if (this.isValidLength && this.isInvalid) {
          this.isInvalid = false;
          this.$el.removeClass('invalid');
        } else if (!this.isValidLength && !this.isInvalid) {
          this.isInvalid = true;
          this.$el.removeClass('valid');
          this.$el.addClass('invalid');
        }
      }
    }], [{
      key: "init",
      value: function init($els, options) {
        var arr = [];
        $els.each(function () {
          arr.push(new CharacterCounter(this, options));
        });
        return arr;
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_CharacterCounter;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return CharacterCounter;
  }();

  M.CharacterCounter = CharacterCounter;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(CharacterCounter, 'characterCounter', 'M_CharacterCounter');
  }
})(cash);
;(function ($) {
  'use strict';

  var _defaults = {
    duration: 200, // ms
    dist: -100, // zoom scale TODO: make this more intuitive as an option
    shift: 0, // spacing for center image
    padding: 0, // Padding between non center items
    fullWidth: false, // Change to full width styles
    indicators: false, // Toggle indicators
    noWrap: false, // Don't wrap around and cycle through items.
    onCycleTo: null // Callback for when a new slide is cycled to.
  };

  /**
   * @class
   *
   */

  var Carousel = function () {
    /**
     * Construct Carousel instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Carousel(el, options) {
      var _this37 = this;

      _classCallCheck(this, Carousel);

      // If exists, destroy and reinitialize
      if (!!el.M_Carousel) {
        el.M_Carousel.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_Carousel = this;

      /**
       * Options for the carousel
       * @member Carousel#options
       * @prop {Number} duration
       * @prop {Number} dist
       * @prop {number} shift
       * @prop {number} padding
       * @prop {Boolean} fullWidth
       * @prop {Boolean} indicators
       * @prop {Boolean} noWrap
       * @prop {Function} onCycleTo
       */
      this.options = $.extend({}, Carousel.defaults, options);

      // Setup
      this.hasMultipleSlides = this.$el.find('.carousel-item').length > 1;
      this.showIndicators = this.options.indicators && this.hasMultipleSlides;
      this.noWrap = this.options.noWrap || !this.hasMultipleSlides;
      this.pressed = false;
      this.dragged = false;
      this.offset = this.target = 0;
      this.images = [];
      this.itemWidth = this.$el.find('.carousel-item').first().innerWidth();
      this.itemHeight = this.$el.find('.carousel-item').first().innerHeight();
      this.dim = this.itemWidth * 2 + this.options.padding || 1; // Make sure dim is non zero for divisions.
      this._autoScrollBound = this._autoScroll.bind(this);
      this._trackBound = this._track.bind(this);

      // Full Width carousel setup
      if (this.options.fullWidth) {
        this.options.dist = 0;
        this._setCarouselHeight();

        // Offset fixed items when indicators.
        if (this.showIndicators) {
          this.$el.find('.carousel-fixed-item').addClass('with-indicators');
        }
      }

      // Iterate through slides
      this.$indicators = $('<ul class="indicators"></ul>');
      this.$el.find('.carousel-item').each(function (el, i) {
        _this37.images.push(el);
        if (_this37.showIndicators) {
          var $indicator = $('<li class="indicator-item"></li>');

          // Add active to first by default.
          if (i === 0) {
            $indicator[0].classList.add('active');
          }

          _this37.$indicators.append($indicator);
        }
      });
      if (this.showIndicators) {
        this.$el.append(this.$indicators);
      }
      this.count = this.images.length;

      // Setup cross browser string
      this.xform = 'transform';
      ['webkit', 'Moz', 'O', 'ms'].every(function (prefix) {
        var e = prefix + 'Transform';
        if (typeof document.body.style[e] !== 'undefined') {
          _this37.xform = e;
          return false;
        }
        return true;
      });

      this._setupEventHandlers();
      this._scroll(this.offset);
    }

    _createClass(Carousel, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.M_Carousel = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var _this38 = this;

        this._handleCarouselTapBound = this._handleCarouselTap.bind(this);
        this._handleCarouselDragBound = this._handleCarouselDrag.bind(this);
        this._handleCarouselReleaseBound = this._handleCarouselRelease.bind(this);
        this._handleCarouselClickBound = this._handleCarouselClick.bind(this);

        if (typeof window.ontouchstart !== 'undefined') {
          this.el.addEventListener('touchstart', this._handleCarouselTapBound);
          this.el.addEventListener('touchmove', this._handleCarouselDragBound);
          this.el.addEventListener('touchend', this._handleCarouselReleaseBound);
        }

        this.el.addEventListener('mousedown', this._handleCarouselTapBound);
        this.el.addEventListener('mousemove', this._handleCarouselDragBound);
        this.el.addEventListener('mouseup', this._handleCarouselReleaseBound);
        this.el.addEventListener('mouseleave', this._handleCarouselReleaseBound);
        this.el.addEventListener('click', this._handleCarouselClickBound);

        if (this.showIndicators && this.$indicators) {
          this._handleIndicatorClickBound = this._handleIndicatorClick.bind(this);
          this.$indicators.find('.indicator-item').each(function (el, i) {
            el.addEventListener('click', _this38._handleIndicatorClickBound);
          });
        }

        // Resize
        var throttledResize = M.throttle(this._handleResize, 200);
        this._handleThrottledResizeBound = throttledResize.bind(this);

        window.addEventListener('resize', this._handleThrottledResizeBound);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        var _this39 = this;

        if (typeof window.ontouchstart !== 'undefined') {
          this.el.removeEventListener('touchstart', this._handleCarouselTapBound);
          this.el.removeEventListener('touchmove', this._handleCarouselDragBound);
          this.el.removeEventListener('touchend', this._handleCarouselReleaseBound);
        }
        this.el.removeEventListener('mousedown', this._handleCarouselTapBound);
        this.el.removeEventListener('mousemove', this._handleCarouselDragBound);
        this.el.removeEventListener('mouseup', this._handleCarouselReleaseBound);
        this.el.removeEventListener('mouseleave', this._handleCarouselReleaseBound);
        this.el.removeEventListener('click', this._handleCarouselClickBound);

        if (this.showIndicators && this.$indicators) {
          this.$indicators.find('.indicator-item').each(function (el, i) {
            el.removeEventListener('click', _this39._handleIndicatorClickBound);
          });
        }

        window.removeEventListener('resize', this._handleThrottledResizeBound);
      }

      /**
       * Handle Carousel Tap
       * @param {Event} e
       */

    }, {
      key: "_handleCarouselTap",
      value: function _handleCarouselTap(e) {
        // Fixes firefox draggable image bug
        if (e.type === 'mousedown' && $(e.target).is('img')) {
          e.preventDefault();
        }
        this.pressed = true;
        this.dragged = false;
        this.verticalDragged = false;
        this.reference = this._xpos(e);
        this.referenceY = this._ypos(e);

        this.velocity = this.amplitude = 0;
        this.frame = this.offset;
        this.timestamp = Date.now();
        clearInterval(this.ticker);
        this.ticker = setInterval(this._trackBound, 100);
      }

      /**
       * Handle Carousel Drag
       * @param {Event} e
       */

    }, {
      key: "_handleCarouselDrag",
      value: function _handleCarouselDrag(e) {
        var x = void 0,
            y = void 0,
            delta = void 0,
            deltaY = void 0;
        if (this.pressed) {
          x = this._xpos(e);
          y = this._ypos(e);
          delta = this.reference - x;
          deltaY = Math.abs(this.referenceY - y);
          if (deltaY < 30 && !this.verticalDragged) {
            // If vertical scrolling don't allow dragging.
            if (delta > 2 || delta < -2) {
              this.dragged = true;
              this.reference = x;
              this._scroll(this.offset + delta);
            }
          } else if (this.dragged) {
            // If dragging don't allow vertical scroll.
            e.preventDefault();
            e.stopPropagation();
            return false;
          } else {
            // Vertical scrolling.
            this.verticalDragged = true;
          }
        }

        if (this.dragged) {
          // If dragging don't allow vertical scroll.
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      }

      /**
       * Handle Carousel Release
       * @param {Event} e
       */

    }, {
      key: "_handleCarouselRelease",
      value: function _handleCarouselRelease(e) {
        if (this.pressed) {
          this.pressed = false;
        } else {
          return;
        }

        clearInterval(this.ticker);
        this.target = this.offset;
        if (this.velocity > 10 || this.velocity < -10) {
          this.amplitude = 0.9 * this.velocity;
          this.target = this.offset + this.amplitude;
        }
        this.target = Math.round(this.target / this.dim) * this.dim;

        // No wrap of items.
        if (this.noWrap) {
          if (this.target >= this.dim * (this.count - 1)) {
            this.target = this.dim * (this.count - 1);
          } else if (this.target < 0) {
            this.target = 0;
          }
        }
        this.amplitude = this.target - this.offset;
        this.timestamp = Date.now();
        requestAnimationFrame(this._autoScrollBound);

        if (this.dragged) {
          e.preventDefault();
          e.stopPropagation();
        }
        return false;
      }

      /**
       * Handle Carousel CLick
       * @param {Event} e
       */

    }, {
      key: "_handleCarouselClick",
      value: function _handleCarouselClick(e) {
        // Disable clicks if carousel was dragged.
        if (this.dragged) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        } else if (!this.options.fullWidth) {
          var clickedIndex = $(e.target).closest('.carousel-item').index();
          var diff = this._wrap(this.center) - clickedIndex;

          // Disable clicks if carousel was shifted by click
          if (diff !== 0) {
            e.preventDefault();
            e.stopPropagation();
          }
          this._cycleTo(clickedIndex);
        }
      }

      /**
       * Handle Indicator CLick
       * @param {Event} e
       */

    }, {
      key: "_handleIndicatorClick",
      value: function _handleIndicatorClick(e) {
        e.stopPropagation();

        var indicator = $(e.target).closest('.indicator-item');
        if (indicator.length) {
          this._cycleTo(indicator.index());
        }
      }

      /**
       * Handle Throttle Resize
       * @param {Event} e
       */

    }, {
      key: "_handleResize",
      value: function _handleResize(e) {
        if (this.options.fullWidth) {
          this.itemWidth = this.$el.find('.carousel-item').first().innerWidth();
          this.imageHeight = this.$el.find('.carousel-item.active').height();
          this.dim = this.itemWidth * 2 + this.options.padding;
          this.offset = this.center * 2 * this.itemWidth;
          this.target = this.offset;
          this._setCarouselHeight(true);
        } else {
          this._scroll();
        }
      }

      /**
       * Set carousel height based on first slide
       * @param {Booleam} imageOnly - true for image slides
       */

    }, {
      key: "_setCarouselHeight",
      value: function _setCarouselHeight(imageOnly) {
        var _this40 = this;

        var firstSlide = this.$el.find('.carousel-item.active').length ? this.$el.find('.carousel-item.active').first() : this.$el.find('.carousel-item').first();
        var firstImage = firstSlide.find('img').first();
        if (firstImage.length) {
          if (firstImage[0].complete) {
            // If image won't trigger the load event
            var imageHeight = firstImage.height();
            if (imageHeight > 0) {
              this.$el.css('height', imageHeight + 'px');
            } else {
              // If image still has no height, use the natural dimensions to calculate
              var naturalWidth = firstImage[0].naturalWidth;
              var naturalHeight = firstImage[0].naturalHeight;
              var adjustedHeight = this.$el.width() / naturalWidth * naturalHeight;
              this.$el.css('height', adjustedHeight + 'px');
            }
          } else {
            // Get height when image is loaded normally
            firstImage.one('load', function (el, i) {
              _this40.$el.css('height', el.offsetHeight + 'px');
            });
          }
        } else if (!imageOnly) {
          var slideHeight = firstSlide.height();
          this.$el.css('height', slideHeight + 'px');
        }
      }

      /**
       * Get x position from event
       * @param {Event} e
       */

    }, {
      key: "_xpos",
      value: function _xpos(e) {
        // touch event
        if (e.targetTouches && e.targetTouches.length >= 1) {
          return e.targetTouches[0].clientX;
        }

        // mouse event
        return e.clientX;
      }

      /**
       * Get y position from event
       * @param {Event} e
       */

    }, {
      key: "_ypos",
      value: function _ypos(e) {
        // touch event
        if (e.targetTouches && e.targetTouches.length >= 1) {
          return e.targetTouches[0].clientY;
        }

        // mouse event
        return e.clientY;
      }

      /**
       * Wrap index
       * @param {Number} x
       */

    }, {
      key: "_wrap",
      value: function _wrap(x) {
        return x >= this.count ? x % this.count : x < 0 ? this._wrap(this.count + x % this.count) : x;
      }

      /**
       * Tracks scrolling information
       */

    }, {
      key: "_track",
      value: function _track() {
        var now = void 0,
            elapsed = void 0,
            delta = void 0,
            v = void 0;

        now = Date.now();
        elapsed = now - this.timestamp;
        this.timestamp = now;
        delta = this.offset - this.frame;
        this.frame = this.offset;

        v = 1000 * delta / (1 + elapsed);
        this.velocity = 0.8 * v + 0.2 * this.velocity;
      }

      /**
       * Auto scrolls to nearest carousel item.
       */

    }, {
      key: "_autoScroll",
      value: function _autoScroll() {
        var elapsed = void 0,
            delta = void 0;

        if (this.amplitude) {
          elapsed = Date.now() - this.timestamp;
          delta = this.amplitude * Math.exp(-elapsed / this.options.duration);
          if (delta > 2 || delta < -2) {
            this._scroll(this.target - delta);
            requestAnimationFrame(this._autoScrollBound);
          } else {
            this._scroll(this.target);
          }
        }
      }

      /**
       * Scroll to target
       * @param {Number} x
       */

    }, {
      key: "_scroll",
      value: function _scroll(x) {
        var _this41 = this;

        // Track scrolling state
        if (!this.$el.hasClass('scrolling')) {
          this.el.classList.add('scrolling');
        }
        if (this.scrollingTimeout != null) {
          window.clearTimeout(this.scrollingTimeout);
        }
        this.scrollingTimeout = window.setTimeout(function () {
          _this41.$el.removeClass('scrolling');
        }, this.options.duration);

        // Start actual scroll
        var i = void 0,
            half = void 0,
            delta = void 0,
            dir = void 0,
            tween = void 0,
            el = void 0,
            alignment = void 0,
            zTranslation = void 0,
            tweenedOpacity = void 0;
        var lastCenter = this.center;

        this.offset = typeof x === 'number' ? x : this.offset;
        this.center = Math.floor((this.offset + this.dim / 2) / this.dim);
        delta = this.offset - this.center * this.dim;
        dir = delta < 0 ? 1 : -1;
        tween = -dir * delta * 2 / this.dim;
        half = this.count >> 1;

        if (!this.options.fullWidth) {
          alignment = 'translateX(' + (this.el.clientWidth - this.itemWidth) / 2 + 'px) ';
          alignment += 'translateY(' + (this.el.clientHeight - this.itemHeight) / 2 + 'px)';
        } else {
          alignment = 'translateX(0)';
        }

        // Set indicator active
        if (this.showIndicators) {
          var diff = this.center % this.count;
          var activeIndicator = this.$indicators.find('.indicator-item.active');
          if (activeIndicator.index() !== diff) {
            activeIndicator.removeClass('active');
            this.$indicators.find('.indicator-item').eq(diff)[0].classList.add('active');
          }
        }

        // center
        // Don't show wrapped items.
        if (!this.noWrap || this.center >= 0 && this.center < this.count) {
          el = this.images[this._wrap(this.center)];

          // Add active class to center item.
          if (!$(el).hasClass('active')) {
            this.$el.find('.carousel-item').removeClass('active');
            el.classList.add('active');
          }
          el.style[this.xform] = alignment + ' translateX(' + -delta / 2 + 'px)' + ' translateX(' + dir * this.options.shift * tween * i + 'px)' + ' translateZ(' + this.options.dist * tween + 'px)';
          el.style.zIndex = 0;
          if (this.options.fullWidth) {
            tweenedOpacity = 1;
          } else {
            tweenedOpacity = 1 - 0.2 * tween;
          }
          el.style.opacity = tweenedOpacity;
          el.style.visibility = 'visible';
        }

        for (i = 1; i <= half; ++i) {
          // right side
          if (this.options.fullWidth) {
            zTranslation = this.options.dist;
            tweenedOpacity = i === half && delta < 0 ? 1 - tween : 1;
          } else {
            zTranslation = this.options.dist * (i * 2 + tween * dir);
            tweenedOpacity = 1 - 0.2 * (i * 2 + tween * dir);
          }
          // Don't show wrapped items.
          if (!this.noWrap || this.center + i < this.count) {
            el = this.images[this._wrap(this.center + i)];
            el.style[this.xform] = alignment + ' translateX(' + (this.options.shift + (this.dim * i - delta) / 2) + 'px)' + ' translateZ(' + zTranslation + 'px)';
            el.style.zIndex = -i;
            el.style.opacity = tweenedOpacity;
            el.style.visibility = 'visible';
          }

          // left side
          if (this.options.fullWidth) {
            zTranslation = this.options.dist;
            tweenedOpacity = i === half && delta > 0 ? 1 - tween : 1;
          } else {
            zTranslation = this.options.dist * (i * 2 - tween * dir);
            tweenedOpacity = 1 - 0.2 * (i * 2 - tween * dir);
          }
          // Don't show wrapped items.
          if (!this.noWrap || this.center - i >= 0) {
            el = this.images[this._wrap(this.center - i)];
            el.style[this.xform] = alignment + ' translateX(' + (-this.options.shift + (-this.dim * i - delta) / 2) + 'px)' + ' translateZ(' + zTranslation + 'px)';
            el.style.zIndex = -i;
            el.style.opacity = tweenedOpacity;
            el.style.visibility = 'visible';
          }
        }

        // center
        // Don't show wrapped items.
        if (!this.noWrap || this.center >= 0 && this.center < this.count) {
          el = this.images[this._wrap(this.center)];
          el.style[this.xform] = alignment + ' translateX(' + -delta / 2 + 'px)' + ' translateX(' + dir * this.options.shift * tween + 'px)' + ' translateZ(' + this.options.dist * tween + 'px)';
          el.style.zIndex = 0;
          if (this.options.fullWidth) {
            tweenedOpacity = 1;
          } else {
            tweenedOpacity = 1 - 0.2 * tween;
          }
          el.style.opacity = tweenedOpacity;
          el.style.visibility = 'visible';
        }

        // onCycleTo callback
        var $currItem = this.$el.find('.carousel-item').eq(this._wrap(this.center));
        if (lastCenter !== this.center && typeof this.options.onCycleTo === "function") {
          this.options.onCycleTo.call(this, $currItem[0], this.dragged);
        }

        // One time callback
        if (typeof this.oneTimeCallback === "function") {
          this.oneTimeCallback.call(this, $currItem[0], this.dragged);
          this.oneTimeCallback = null;
        }
      }

      /**
       * Cycle to target
       * @param {Number} n
       * @param {Function} callback
       */

    }, {
      key: "_cycleTo",
      value: function _cycleTo(n, callback) {
        var diff = this.center % this.count - n;

        // Account for wraparound.
        if (!this.noWrap) {
          if (diff < 0) {
            if (Math.abs(diff + this.count) < Math.abs(diff)) {
              diff += this.count;
            }
          } else if (diff > 0) {
            if (Math.abs(diff - this.count) < diff) {
              diff -= this.count;
            }
          }
        }

        this.target = this.dim * Math.round(this.offset / this.dim);
        // Next
        if (diff < 0) {
          this.target += this.dim * Math.abs(diff);

          // Prev
        } else if (diff > 0) {
          this.target -= this.dim * diff;
        }

        // Set one time callback
        if (typeof callback === "function") {
          this.oneTimeCallback = callback;
        }

        // Scroll
        if (this.offset !== this.target) {
          this.amplitude = this.target - this.offset;
          this.timestamp = Date.now();
          requestAnimationFrame(this._autoScrollBound);
        }
      }

      /**
       * Cycle to next item
       * @param {Number} [n]
       */

    }, {
      key: "next",
      value: function next(n) {
        if (n === undefined || isNaN(n)) {
          n = 1;
        }

        var index = this.center + n;
        if (index > this.count || index < 0) {
          if (this.noWrap) {
            return;
          } else {
            index = this._wrap(index);
          }
        }
        this._cycleTo(index);
      }

      /**
       * Cycle to previous item
       * @param {Number} [n]
       */

    }, {
      key: "prev",
      value: function prev(n) {
        if (n === undefined || isNaN(n)) {
          n = 1;
        }

        var index = this.center - n;
        if (index > this.count || index < 0) {
          if (this.noWrap) {
            return;
          } else {
            index = this._wrap(index);
          }
        }

        this._cycleTo(index);
      }

      /**
       * Cycle to nth item
       * @param {Number} [n]
       * @param {Function} callback
       */

    }, {
      key: "set",
      value: function set(n, callback) {
        if (n === undefined || isNaN(n)) {
          n = 0;
        }

        if (n > this.count || n < 0) {
          if (this.noWrap) {
            return;
          } else {
            n = this._wrap(n);
          }
        }

        this._cycleTo(n, callback);
      }
    }], [{
      key: "init",
      value: function init($els, options) {
        var arr = [];
        $els.each(function () {
          arr.push(new Carousel(this, options));
        });
        return arr;
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Carousel;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Carousel;
  }();

  M.Carousel = Carousel;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Carousel, 'carousel', 'M_Carousel');
  }
})(cash);
;(function ($) {
  'use strict';

  var _defaults = {};

  /**
   * @class
   *
   */

  var FeatureDiscovery = function () {
    /**
     * Construct FeatureDiscovery instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function FeatureDiscovery(el, options) {
      _classCallCheck(this, FeatureDiscovery);

      // If exists, destroy and reinitialize
      if (!!el.M_FeatureDiscovery) {
        el.M_FeatureDiscovery.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_FeatureDiscovery = this;

      /**
       * Options for the select
       * @member FeatureDiscovery#options
       */
      this.options = $.extend({}, FeatureDiscovery.defaults, options);

      this.isOpen = false;

      // setup
      this.$origin = $('#' + this.$el.attr('data-target'));
      this._setup();

      this._calculatePositioning();
      this._setupEventHandlers();
    }

    _createClass(FeatureDiscovery, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.FeatureDiscovery = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleDocumentClickBound = this._handleDocumentClick.bind(this);
        this._handleTargetClickBound = this._handleTargetClick.bind(this);
        this._handleOriginClickBound = this._handleOriginClick.bind(this);

        this.el.addEventListener('click', this._handleTargetClickBound);
        this.originEl.addEventListener('click', this._handleOriginClickBound);

        // Resize
        var throttledResize = M.throttle(this._handleResize, 200);
        this._handleThrottledResizeBound = throttledResize.bind(this);

        window.addEventListener('resize', this._handleThrottledResizeBound);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('click', this._handleTargetClickBound);
        this.originEl.removeEventListener('click', this._handleOriginClickBound);
        window.removeEventListener('resize', this._handleThrottledResizeBound);
      }

      /**
       * Handle Target Click
       * @param {Event} e
       */

    }, {
      key: "_handleTargetClick",
      value: function _handleTargetClick(e) {
        this.open();
      }

      /**
       * Handle Origin Click
       * @param {Event} e
       */

    }, {
      key: "_handleOriginClick",
      value: function _handleOriginClick(e) {
        this.close();
      }

      /**
       * Handle Resize
       * @param {Event} e
       */

    }, {
      key: "_handleResize",
      value: function _handleResize(e) {
        this._calculatePositioning();
      }

      /**
       * Handle Resize
       * @param {Event} e
       */

    }, {
      key: "_handleDocumentClick",
      value: function _handleDocumentClick(e) {
        if (!$(e.target).closest('.tap-target-wrapper').length) {
          this.close();
          e.preventDefault();
          e.stopPropagation();
        }
      }

      /**
       * Setup feature discovery
       */

    }, {
      key: "_setup",
      value: function _setup() {
        // Creating tap target
        this.wrapper = this.$el.parent()[0];
        this.waveEl = $(this.wrapper).find('.tap-target-wave')[0];
        this.originEl = $(this.wrapper).find('.tap-target-origin')[0];
        this.contentEl = this.$el.find('.tap-target-content')[0];

        // Creating wrapper
        if (!$(this.wrapper).hasClass('.tap-target-wrapper')) {
          this.wrapper = document.createElement('div');
          this.wrapper.classList.add('tap-target-wrapper');
          this.$el.before($(this.wrapper));
          this.wrapper.append(this.el);
        }

        // Creating content
        if (!this.contentEl) {
          this.contentEl = document.createElement('div');
          this.contentEl.classList.add('tap-target-content');
          this.$el.append(this.contentEl);
        }

        // Creating foreground wave
        if (!this.waveEl) {
          this.waveEl = document.createElement('div');
          this.waveEl.classList.add('tap-target-wave');

          // Creating origin
          if (!this.originEl) {
            this.originEl = this.$origin.clone(true, true);
            this.originEl.addClass('tap-target-origin');
            this.originEl.removeAttr('id');
            this.originEl.removeAttr('style');
            this.originEl = this.originEl[0];
            this.waveEl.append(this.originEl);
          }

          this.wrapper.append(this.waveEl);
        }
      }

      /**
       * Calculate positioning
       */

    }, {
      key: "_calculatePositioning",
      value: function _calculatePositioning() {
        // Element or parent is fixed position?
        var isFixed = this.$origin.css('position') === 'fixed';
        if (!isFixed) {
          var parents = this.$origin.parents();
          for (var i = 0; i < parents.length; i++) {
            isFixed = $(parents[i]).css('position') == 'fixed';
            if (isFixed) {
              break;
            }
          }
        }

        // Calculating origin
        var originWidth = this.$origin.outerWidth();
        var originHeight = this.$origin.outerHeight();
        var originTop = isFixed ? this.$origin.offset().top - M.getDocumentScrollTop() : this.$origin.offset().top;
        var originLeft = isFixed ? this.$origin.offset().left - M.getDocumentScrollLeft() : this.$origin.offset().left;

        // Calculating screen
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var centerX = windowWidth / 2;
        var centerY = windowHeight / 2;
        var isLeft = originLeft <= centerX;
        var isRight = originLeft > centerX;
        var isTop = originTop <= centerY;
        var isBottom = originTop > centerY;
        var isCenterX = originLeft >= windowWidth * 0.25 && originLeft <= windowWidth * 0.75;

        // Calculating tap target
        var tapTargetWidth = this.$el.outerWidth();
        var tapTargetHeight = this.$el.outerHeight();
        var tapTargetTop = originTop + originHeight / 2 - tapTargetHeight / 2;
        var tapTargetLeft = originLeft + originWidth / 2 - tapTargetWidth / 2;
        var tapTargetPosition = isFixed ? 'fixed' : 'absolute';

        // Calculating content
        var tapTargetTextWidth = isCenterX ? tapTargetWidth : tapTargetWidth / 2 + originWidth;
        var tapTargetTextHeight = tapTargetHeight / 2;
        var tapTargetTextTop = isTop ? tapTargetHeight / 2 : 0;
        var tapTargetTextBottom = 0;
        var tapTargetTextLeft = isLeft && !isCenterX ? tapTargetWidth / 2 - originWidth : 0;
        var tapTargetTextRight = 0;
        var tapTargetTextPadding = originWidth;
        var tapTargetTextAlign = isBottom ? 'bottom' : 'top';

        // Calculating wave
        var tapTargetWaveWidth = originWidth > originHeight ? originWidth * 2 : originWidth * 2;
        var tapTargetWaveHeight = tapTargetWaveWidth;
        var tapTargetWaveTop = tapTargetHeight / 2 - tapTargetWaveHeight / 2;
        var tapTargetWaveLeft = tapTargetWidth / 2 - tapTargetWaveWidth / 2;

        // Setting tap target
        var tapTargetWrapperCssObj = {};
        tapTargetWrapperCssObj.top = isTop ? tapTargetTop + 'px' : '';
        tapTargetWrapperCssObj.right = isRight ? windowWidth - tapTargetLeft - tapTargetWidth + 'px' : '';
        tapTargetWrapperCssObj.bottom = isBottom ? windowHeight - tapTargetTop - tapTargetHeight + 'px' : '';
        tapTargetWrapperCssObj.left = isLeft ? tapTargetLeft + 'px' : '';
        tapTargetWrapperCssObj.position = tapTargetPosition;
        $(this.wrapper).css(tapTargetWrapperCssObj);

        // Setting content
        $(this.contentEl).css({
          width: tapTargetTextWidth + 'px',
          height: tapTargetTextHeight + 'px',
          top: tapTargetTextTop + 'px',
          right: tapTargetTextRight + 'px',
          bottom: tapTargetTextBottom + 'px',
          left: tapTargetTextLeft + 'px',
          padding: tapTargetTextPadding + 'px',
          verticalAlign: tapTargetTextAlign
        });

        // Setting wave
        $(this.waveEl).css({
          top: tapTargetWaveTop + 'px',
          left: tapTargetWaveLeft + 'px',
          width: tapTargetWaveWidth + 'px',
          height: tapTargetWaveHeight + 'px'
        });
      }

      /**
       * Open Feature Discovery
       */

    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }

        this.isOpen = true;
        this.wrapper.classList.add('open');

        document.body.addEventListener('click', this._handleDocumentClickBound, true);
      }

      /**
       * Close Feature Discovery
       */

    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }

        this.isOpen = false;
        this.wrapper.classList.remove('open');

        document.body.removeEventListener('click', this._handleDocumentClickBound, true);
      }
    }], [{
      key: "init",
      value: function init($els, options) {
        var arr = [];
        $els.each(function () {
          arr.push(new FeatureDiscovery(this, options));
        });
        return arr;
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_FeatureDiscovery;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return FeatureDiscovery;
  }();

  M.FeatureDiscovery = FeatureDiscovery;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(FeatureDiscovery, 'featureDiscovery', 'M_FeatureDiscovery');
  }
})(cash);
;(function ($) {
  'use strict';

  var _defaults = {
    classes: ''
  };

  /**
   * @class
   *
   */

  var Select = function () {
    /**
     * Construct Select instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Select(el, options) {
      _classCallCheck(this, Select);

      // If exists, destroy and reinitialize
      if (!!el.M_Select) {
        el.M_Select.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_Select = this;

      /**
       * Options for the select
       * @member Select#options
       */
      this.options = $.extend({}, Select.defaults, options);

      this.isMultiple = this.$el.prop('multiple');

      // Setup
      this.valuesSelected = [];
      this.$selectedOptions = $();
      this._setupDropdown();

      this._setupEventHandlers();
    }

    _createClass(Select, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this._removeDropdown();
        this.el.M_Select = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var _this42 = this;

        this._handleSelectChangeBound = this._handleSelectChange.bind(this);
        this._handleOptionClickBound = this._handleOptionClick.bind(this);
        this._handleInputClickBound = this._handleInputClick.bind(this);

        $(this.dropdownOptions).find('li:not(.optgroup)').each(function (el) {
          el.addEventListener('click', _this42._handleOptionClickBound);
        });
        this.el.addEventListener('change', this._handleSelectChangeBound);
        this.input.addEventListener('click', this._handleInputClickBound);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        var _this43 = this;

        $(this.dropdownOptions).find('li:not(.optgroup)').each(function (el) {
          el.removeEventListener('click', _this43._handleOptionClickBound);
        });
        this.el.removeEventListener('change', this._handleSelectChangeBound);
        this.input.removeEventListener('click', this._handleInputClickBound);
        this.input.removeEventListener('focus', this._handleInputFocusBound);
      }

      /**
       * Handle Select Change
       * @param {Event} e
       */

    }, {
      key: "_handleSelectChange",
      value: function _handleSelectChange(e) {
        this._setValueToInput();
      }

      /**
       * Handle Option Click
       * @param {Event} e
       */

    }, {
      key: "_handleOptionClick",
      value: function _handleOptionClick(e) {
        e.preventDefault();
        var option = $(e.target).closest('li')[0];
        var optionIndex = $(this.dropdownOptions).find('li:not(.optgroup)').index(option);
        if (!$(option).hasClass('disabled') && !$(option).hasClass('optgroup')) {
          var selected = true;

          if (this.isMultiple) {
            var checkbox = $(option).find('input[type="checkbox"]');
            checkbox.prop('checked', !checkbox.prop('checked'));
            selected = this._toggleEntryFromArray(optionIndex);
          } else {
            $(this.dropdownOptions).find('li').removeClass('active');
            $(option).toggleClass('active');
            this.input.value = option.textContent;
          }

          this._activateOption($(this.dropdownOptions), option);
          this.$el.find('option').eq(optionIndex).prop('selected', selected);
          this.$el.trigger('change');
        }

        e.stopPropagation();
      }

      /**
       * Handle Input Click
       */

    }, {
      key: "_handleInputClick",
      value: function _handleInputClick() {
        if (this.dropdown && this.dropdown.isOpen) {
          this._setValueToInput();
          this._setSelectedStates();
        }
      }

      /**
       * Setup dropdown
       */

    }, {
      key: "_setupDropdown",
      value: function _setupDropdown() {
        var _this44 = this;

        this.wrapper = document.createElement('div');
        this.wrapper.classList.add();
        $(this.wrapper).addClass('select-wrapper' + ' ' + this.options.classes);
        this.$el.before($(this.wrapper));
        this.wrapper.appendChild(this.el);

        if (this.el.disabled) {
          this.wrapper.classList.add('disabled');
        }

        // Create dropdown
        this.$selectOptions = this.$el.children('option, optgroup');
        this.dropdownOptions = document.createElement('ul');
        this.dropdownOptions.id = "select-options-" + M.guid();
        $(this.dropdownOptions).addClass('dropdown-content select-dropdown ' + (this.isMultiple ? 'multiple-select-dropdown' : ''));

        // Create dropdown structure.
        if (this.$selectOptions.length) {
          this.$selectOptions.each(function (el) {
            if ($(el).is('option')) {
              // Direct descendant option.
              var optionEl = void 0;
              if (_this44.isMultiple) {
                optionEl = _this44._appendOptionWithIcon(_this44.$el, el, 'multiple');
              } else {
                optionEl = _this44._appendOptionWithIcon(_this44.$el, el);
              }

              if ($(el).prop('selected')) {
                _this44.$selectedOptions.add(optionEl);
              }
            } else if ($(el).is('optgroup')) {
              // Optgroup.
              var selectOptions = $(el).children('option');
              $(_this44.dropdownOptions).append($('<li class="optgroup"><span>' + el.getAttribute('label') + '</span></li>')[0]);

              selectOptions.each(function (el) {
                var optionEl = _this44._appendOptionWithIcon(_this44.$el, el, 'optgroup-option');
                if ($(el).prop('selected')) {
                  _this44.$selectedOptions.add(optionEl);
                }
              });
            }
          });
        }

        this.$el.after(this.dropdownOptions);

        // Add input dropdown
        this.input = document.createElement('input');
        $(this.input).addClass('select-dropdown dropdown-trigger');
        this.input.setAttribute('type', 'text');
        this.input.setAttribute('readonly', 'true');
        this.input.setAttribute('data-target', this.dropdownOptions.id);
        if (this.el.disabled) {
          $(this.input).prop('disabled', 'true');
        }

        this.$el.before(this.input);
        this._setValueToInput();

        // Add caret
        var dropdownIcon = $('<svg class="caret" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
        this.$el.before(dropdownIcon[0]);

        // Initialize dropdown
        if (!this.el.disabled) {
          var dropdownOptions = {};
          if (this.isMultiple) {
            dropdownOptions.closeOnClick = false;
          }
          this.dropdown = new M.Dropdown(this.input, dropdownOptions);
        }

        // Add initial selections
        this._setSelectedStates();
      }

      /**
       * Remove dropdown
       */

    }, {
      key: "_removeDropdown",
      value: function _removeDropdown() {
        $(this.wrapper).find('.caret').remove();
        $(this.input).remove();
        $(this.dropdownOptions).remove();
        $(this.wrapper).before(this.$el);
        $(this.wrapper).remove();
      }

      /**
       * Setup dropdown
       * @param {Element} select  select element
       * @param {Element} option  option element from select
       * @param {String} type
       * @return {Element}  option element added
       */

    }, {
      key: "_appendOptionWithIcon",
      value: function _appendOptionWithIcon(select, option, type) {
        // Add disabled attr if disabled
        var disabledClass = option.disabled ? 'disabled ' : '';
        var optgroupClass = type === 'optgroup-option' ? 'optgroup-option ' : '';
        var multipleCheckbox = this.isMultiple ? "<label><input type=\"checkbox\"" + disabledClass + "\"/><span>" + option.innerHTML + "</span></label>" : option.innerHTML;
        var liEl = $('<li></li>');
        var spanEl = $('<span></span>');
        spanEl.html(multipleCheckbox);
        liEl.addClass(disabledClass + " " + optgroupClass);
        liEl.append(spanEl);

        // add icons
        var iconUrl = option.getAttribute('data-icon');
        var classes = option.getAttribute('class');
        if (!!iconUrl) {
          var imgEl = $('<img alt="" src="' + iconUrl + '">');
          liEl.prepend(imgEl);
        }

        // Check for multiple type.
        $(this.dropdownOptions).append(liEl[0]);
        return liEl[0];
      }

      /**
       * Toggle entry from option
       * @param {Number} entryIndex
       * @return {Boolean}  if entry was added or removed
       */

    }, {
      key: "_toggleEntryFromArray",
      value: function _toggleEntryFromArray(entryIndex) {
        var index = this.valuesSelected.indexOf(entryIndex),
            notAdded = index === -1;

        if (notAdded) {
          this.valuesSelected.push(entryIndex);
        } else {
          this.valuesSelected.splice(index, 1);
        }

        $(this.dropdownOptions).find('li:not(.optgroup)').eq(entryIndex).toggleClass('active');

        // use notAdded instead of true (to detect if the option is selected or not)
        this.$el.find('option').eq(entryIndex).prop('selected', notAdded);

        return notAdded;
      }

      /**
       * Set value to input
       */

    }, {
      key: "_setValueToInput",
      value: function _setValueToInput() {
        var value = '';
        var options = this.$el.find('option');

        options.each(function (el, i) {
          if ($(el).prop('selected')) {
            var text = $(el).text();
            value === '' ? value += text : value += ', ' + text;
          }
        });

        if (value === '') {
          var firstDisabled = this.$el.find('option:disabled').eq(0);
          if (firstDisabled.length) {
            value = firstDisabled.text();
          }
        }

        this.input.value = value;
      }

      /**
       * Set selected state of dropdown too match actual select element
       */

    }, {
      key: "_setSelectedStates",
      value: function _setSelectedStates() {
        var _this45 = this;

        this.valuesSelected = [];
        var $onlyOptions = $(this.dropdownOptions).find('li:not(.optgroup)');
        this.$el.find('option').each(function (el, i) {
          var option = $onlyOptions.eq(i);

          if ($(el).prop('selected')) {
            option.find('input[type="checkbox"]').prop("checked", true);
            _this45._activateOption($(_this45.dropdownOptions), option);
            _this45.valuesSelected.push(i);
          } else {
            option.find('input[type="checkbox"]').prop("checked", false);
            option.removeClass('selected');
          }
        });
      }

      /**
       * Make option as selected and scroll to selected position
       * @param {jQuery} collection  Select options jQuery element
       * @param {Element} newOption  element of the new option
       */

    }, {
      key: "_activateOption",
      value: function _activateOption(collection, newOption) {
        if (newOption) {
          if (!this.isMultiple) {
            collection.find('li.selected').removeClass('selected');
          }

          var option = $(newOption);
          option.addClass('selected');
        }
      }
    }], [{
      key: "init",
      value: function init($els, options) {
        var arr = [];
        $els.each(function () {
          if (!$(this).hasClass('browser-default')) {
            arr.push(new Select(this, options));
          }
        });
        return arr;
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Select;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Select;
  }();

  M.Select = Select;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Select, 'select', 'M_Select');
  }
})(cash);
;(function ($, Vel) {
  'use strict';

  var _defaults = {};

  /**
   * @class
   *
   */

  var Range = function () {
    /**
     * Construct Range instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Range(el, options) {
      _classCallCheck(this, Range);

      // If exists, destroy and reinitialize
      if (!!el.M_Range) {
        el.M_Range.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_Range = this;

      /**
       * Options for the range
       * @member Range#options
       */
      this.options = $.extend({}, Range.defaults, options);

      this._mousedown = false;

      // Setup
      this._setupThumb();

      this._setupEventHandlers();
    }

    _createClass(Range, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this._removeThumb();
        this.el.M_Range = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleRangeChangeBound = this._handleRangeChange.bind(this);
        this._handleRangeMousedownTouchstartBound = this._handleRangeMousedownTouchstart.bind(this);
        this._handleRangeInputMousemoveTouchmoveBound = this._handleRangeInputMousemoveTouchmove.bind(this);
        this._handleRangeMouseupTouchendBound = this._handleRangeMouseupTouchend.bind(this);
        this._handleRangeBlurMouseoutTouchleaveBound = this._handleRangeBlurMouseoutTouchleave.bind(this);

        this.el.addEventListener('change', this._handleRangeChangeBound);

        this.el.addEventListener('mousedown', this._handleRangeMousedownTouchstartBound);
        this.el.addEventListener('touchstart', this._handleRangeMousedownTouchstartBound);

        this.el.addEventListener('input', this._handleRangeInputMousemoveTouchmoveBound);
        this.el.addEventListener('mousemove', this._handleRangeInputMousemoveTouchmoveBound);
        this.el.addEventListener('touchmove', this._handleRangeInputMousemoveTouchmoveBound);

        this.el.addEventListener('mouseup', this._handleRangeMouseupTouchendBound);
        this.el.addEventListener('touchend', this._handleRangeMouseupTouchendBound);

        this.el.addEventListener('blur', this._handleRangeBlurMouseoutTouchleaveBound);
        this.el.addEventListener('mouseout', this._handleRangeBlurMouseoutTouchleaveBound);
        this.el.addEventListener('touchleave', this._handleRangeBlurMouseoutTouchleaveBound);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('change', this._handleRangeChangeBound);

        this.el.removeEventListener('mousedown', this._handleRangeMousedownTouchstartBound);
        this.el.removeEventListener('touchstart', this._handleRangeMousedownTouchstartBound);

        this.el.removeEventListener('input', this._handleRangeInputMousemoveTouchmoveBound);
        this.el.removeEventListener('mousemove', this._handleRangeInputMousemoveTouchmoveBound);
        this.el.removeEventListener('touchmove', this._handleRangeInputMousemoveTouchmoveBound);

        this.el.removeEventListener('mouseup', this._handleRangeMouseupTouchendBound);
        this.el.removeEventListener('touchend', this._handleRangeMouseupTouchendBound);

        this.el.removeEventListener('blur', this._handleRangeBlurMouseoutTouchleaveBound);
        this.el.removeEventListener('mouseout', this._handleRangeBlurMouseoutTouchleaveBound);
        this.el.removeEventListener('touchleave', this._handleRangeBlurMouseoutTouchleaveBound);
      }

      /**
       * Handle Range Change
       * @param {Event} e
       */

    }, {
      key: "_handleRangeChange",
      value: function _handleRangeChange() {
        $(this.value).html(this.$el.val());

        if (!$(this.thumb).hasClass('active')) {
          this._showRangeBubble();
        }

        var offsetLeft = this._calcRangeOffset();
        $(this.thumb).addClass('active').css('left', offsetLeft + 'px');
      }

      /**
       * Handle Range Mousedown and Touchstart
       * @param {Event} e
       */

    }, {
      key: "_handleRangeMousedownTouchstart",
      value: function _handleRangeMousedownTouchstart(e) {
        // Set indicator value
        $(this.value).html(this.$el.val());

        this._mousedown = true;
        this.$el.addClass('active');

        if (!$(this.thumb).hasClass('active')) {
          this._showRangeBubble();
        }

        if (e.type !== 'input') {
          var offsetLeft = this._calcRangeOffset();
          $(this.thumb).addClass('active').css('left', offsetLeft + 'px');
        }
      }

      /**
       * Handle Range Input, Mousemove and Touchmove
       */

    }, {
      key: "_handleRangeInputMousemoveTouchmove",
      value: function _handleRangeInputMousemoveTouchmove() {
        if (this._mousedown) {
          if (!$(this.thumb).hasClass('active')) {
            this._showRangeBubble();
          }

          var offsetLeft = this._calcRangeOffset();
          $(this.thumb).addClass('active').css('left', offsetLeft + 'px');
          $(this.value).html(this.$el.val());
        }
      }

      /**
       * Handle Range Mouseup and Touchend
       */

    }, {
      key: "_handleRangeMouseupTouchend",
      value: function _handleRangeMouseupTouchend() {
        this._mousedown = false;
        this.$el.removeClass('active');
      }

      /**
       * Handle Range Blur, Mouseout and Touchleave
       */

    }, {
      key: "_handleRangeBlurMouseoutTouchleave",
      value: function _handleRangeBlurMouseoutTouchleave() {
        if (!this._mousedown) {
          var paddingLeft = parseInt(this.$el.css('padding-left'));
          var marginLeft = 7 + paddingLeft + 'px';

          if ($(this.thumb).hasClass('active')) {
            Vel(this.thumb, 'stop');
            Vel(this.thumb, {
              height: '0px',
              width: '0px',
              top: '10px',
              marginLeft: marginLeft
            }, { duration: 100 });
          }
          $(this.thumb).removeClass('active');
        }
      }

      /**
       * Setup dropdown
       */

    }, {
      key: "_setupThumb",
      value: function _setupThumb() {
        this.thumb = document.createElement('span');
        this.value = document.createElement('span');
        $(this.thumb).addClass('thumb');
        $(this.value).addClass('value');
        $(this.thumb).append(this.value);
        this.$el.after(this.thumb);
      }

      /**
       * Remove dropdown
       */

    }, {
      key: "_removeThumb",
      value: function _removeThumb() {
        $(this.thumb).remove();
      }

      /**
       * morph thumb into bubble
       */

    }, {
      key: "_showRangeBubble",
      value: function _showRangeBubble() {
        var paddingLeft = parseInt($(this.thumb).parent().css('padding-left'));
        var marginLeft = -7 + paddingLeft + 'px'; // TODO: fix magic number?
        Vel(this.thumb, {
          height: "30px",
          width: "30px",
          top: "-30px",
          marginLeft: marginLeft
        }, { duration: 300, easing: 'easeOutExpo' });
      }

      /**
       * Calculate the offset of the thumb
       * @return {Number}  offset in pixels
       */

    }, {
      key: "_calcRangeOffset",
      value: function _calcRangeOffset() {
        var width = this.$el.width() - 15;
        var max = parseFloat(this.$el.attr('max'));
        var min = parseFloat(this.$el.attr('min'));
        var percent = (parseFloat(this.$el.val()) - min) / (max - min);
        return percent * width;
      }
    }], [{
      key: "init",
      value: function init($els, options) {
        var arr = [];
        $els.each(function () {
          if (!$(this).hasClass('browser-default')) {
            arr.push(new Range(this, options));
          }
        });
        return arr;
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Range;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Range;
  }();

  M.Range = Range;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Range, 'range', 'M_Range');
  }

  Range.init($('input[type=range'));
})(cash, M.Vel);


/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.2.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with computed style
	var valueIsBorderBox,
		styles = getStyles( elem ),
		val = curCSS( elem, name, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = isBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ name ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
	}

	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var doc, docElem, rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		doc = elem.ownerDocument;
		docElem = doc.documentElement;
		win = doc.defaultView;

		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( jQuery.isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );


/***/ })

/******/ });