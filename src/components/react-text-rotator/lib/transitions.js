"use strict";

exports.__esModule = true;

exports.default = function (_ref) {
  var duration = _ref.duration;
  return {
    "fade-default": {
      transition: "opacity " + duration + "ms ease-in",
      opacity: 0
    },

    "fade-entering": {
      opacity: 0
    },

    "fade-entered": {
      opacity: 1
    },

    "fade-exiting": {
      opacity: 0
    },

    "fade-exited": {
      opacity: 0
    }
  };
};

module.exports = exports["default"];