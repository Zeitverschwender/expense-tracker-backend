module.exports = (exception, req, res,next) => {
  const status = exception.status || 500;
  const message = exception.message;
  res.status(status).json({
    status,
    message,
  });
};
