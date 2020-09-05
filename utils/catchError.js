module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => {
      const errOb = {
        ...error,
        message: error.message || 'error',
        statusCode: error.statusCode || 500,
      };
      res.status(errOb.statusCode).send(errOb);
    });
  };
};
