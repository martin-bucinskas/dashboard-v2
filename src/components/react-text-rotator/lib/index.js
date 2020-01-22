"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTransitionGroup = require("react-transition-group");

var _transitions = require("./transitions");

var _transitions2 = _interopRequireDefault(_transitions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var interval = void 0;
var timeout = void 0;
var enteredTimeout = void 0;

function TextRotator(_ref) {
  var content = _ref.content,
      time = _ref.time,
      startDelay = _ref.startDelay,
      transitionTime = _ref.transitionTime;

  var indexRef = (0, _react.useRef)(0);

  var _useState = (0, _react.useState)(false),
      entered = _useState[0],
      setEntered = _useState[1];

  var _ref2 = content[indexRef.current] || {},
      className = _ref2.className,
      _ref2$animation = _ref2.animation,
      animation = _ref2$animation === undefined ? "fade" : _ref2$animation,
      text = _ref2.text;

  var styles = (0, _transitions2.default)({ duration: transitionTime });

  (0, _react.useEffect)(function () {
    timeout = setTimeout(function () {
      next();
      interval = setInterval(next, time);
    }, startDelay);

    return function () {
      return clearTimeout(timeout) && clearInterval(interval) && clearTimeout(enteredTimeout);
    };
  }, []);

  function next() {
    var total = content.length || 0;
    indexRef.current = content[indexRef.current + 1] ? indexRef.current + 1 : 0;
    setEntered(true);
    enteredTimeout = setTimeout(function () {
      return setEntered(false);
    }, time - transitionTime);
  }

  if (!text) return _react2.default.createElement("span", null);

  return _react2.default.createElement(
    _reactTransitionGroup.Transition,
    { "in": entered, timeout: transitionTime },
    function (state) {
      return _react2.default.createElement(
        "span",
        {
          key: indexRef,
          className: className,
          style: _extends({}, styles[animation + "-default"], styles[animation + "-" + state])
        },
        text
      );
    }
  );
}

TextRotator.propTypes = process.env.NODE_ENV !== "production" ? {
  time: _propTypes2.default.number,
  startDelay: _propTypes2.default.number,
  transitionTime: _propTypes2.default.number,
  content: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired
} : {};

TextRotator.defaultProps = {
  time: 2500,
  startDelay: 250,
  transitionTime: 500
};

exports.default = TextRotator;
module.exports = exports["default"];