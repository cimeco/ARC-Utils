const ServerError = (message = "Undefined error") => {
  const err = new Error(message);
  err.statusCode = 500;
  return err;
};

const NotFoundError = (message = "404 Not found") => {
  const err = new Error(message);
  err.statusCode = 404;
  return err;
};

const RedirectError = (location, message = "302 Redirect") => {
  const err = new Error(message);
  err.statusCode = 301;
  err.location = location;
  return err;
};

export { ServerError, NotFoundError, RedirectError };
