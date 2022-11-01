"use strict";

require("reflect-metadata");
require("dotenv/config");
var _express = _interopRequireDefault(require("express"));
require("express-async-errors");
var _cors = _interopRequireDefault(require("cors"));
var _celebrate = require("celebrate");
var _routes = _interopRequireDefault(require("./routes/routes"));
var _AppError = _interopRequireDefault(require("../errors/AppError"));
require("../typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// pra ele passar a usar aquela classe de erros ao invés do server só dar console e n falar nada

const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(_routes.default);
app.use((0, _celebrate.errors)()); //se o celebrate der erro, vem por aqui

///Middleware de erros
app.use((error, request, response, next) => {
  if (error instanceof _AppError.default) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error - ',
    error
  });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('		--⭐--		');
  console.log('🚀 Server started on port ' + PORT + '  🚀🤑');
  console.log('		--⭐--		');
});