"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAuthenticated;
var _auth = _interopRequireDefault(require("../../../config/auth"));
var _AppError = _interopRequireDefault(require("../../errors/AppError"));
var _jsonwebtoken = require("jsonwebtoken");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function isAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new _AppError.default('JWT Token is missing');
  }
  const [, token] = authHeader.split(' ');
  try {
    const decodeToken = (0, _jsonwebtoken.verify)(token, _auth.default.jwt.secret);
    const {
      user_code,
      email
    } = decodeToken;
    request.user = {
      user_code,
      email
    };
    return next();
  } catch {
    throw new _AppError.default('Invalid JWT token');
  }
}