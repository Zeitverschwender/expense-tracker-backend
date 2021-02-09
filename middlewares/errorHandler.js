module.exports = (exception, req, res,next) => {
  const status = exception.status;
  const message = exception.message;
  res.status(status).json({
    status,
    message,
  });
};
