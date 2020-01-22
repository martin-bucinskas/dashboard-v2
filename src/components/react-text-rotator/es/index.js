var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Transition } from "react-transition-group";
import transitions from "./transitions";

var interval = void 0;
var timeout = void 0;
var enteredTimeout = void 0;
var global_content = [];

function TextRotator(_ref) {
  global_content = _ref.content;

  var content = _ref.content,
      time = _ref.time,
      startDelay = _ref.startDelay,
      transitionTime = _ref.transitionTime;

  var indexRef = useRef(0);

  var _useState = useState(false),
      entered = _useState[0],
      setEntered = _useState[1];

  var _ref2 = content[indexRef.current] || {},
      className = _ref2.className,
      _ref2$animation = _ref2.animation,
      animation = _ref2$animation === undefined ? "fade" : _ref2$animation,
      text = _ref2.text;

  var styles = transitions({ duration: transitionTime });

  useEffect(function () {
    timeout = setTimeout(function () {
      next();
      interval = setInterval(next, time);
    }, startDelay);

    return function () {
      return clearTimeout(timeout) && clearInterval(interval) && clearTimeout(enteredTimeout);
    };
  }, []);

  function next() {
    var total = global_content.length || 0;
    indexRef.current = indexRef.current + 1 < total ? indexRef.current + 1 : 0;
    setEntered(true);
    enteredTimeout = setTimeout(function () {
      return setEntered(false);
    }, time - transitionTime);
  }

  if (!text) return React.createElement("span", null);

  return React.createElement(
    Transition,
    { "in": entered, timeout: transitionTime },
    function (state) {
      return React.createElement(
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
  time: PropTypes.number,
  startDelay: PropTypes.number,
  transitionTime: PropTypes.number,
  content: PropTypes.arrayOf(PropTypes.object).isRequired
} : {};

TextRotator.defaultProps = {
  time: 2500,
  startDelay: 250,
  transitionTime: 500
};

export default TextRotator;
