const { validationResult } = require('express-validator');

// Collects express-validator results and returns them in the shape the auth
// hooks expect: `{ errors: [ { param, msg } ] }`.
const validatorMiddleware = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array().map((e) => ({ param: e.path, msg: e.msg }));
    return res.status(400).json({
      status: 'fail',
      message: errors[0].msg,
      errors,
    });
  }
  next();
};

module.exports = validatorMiddleware;
