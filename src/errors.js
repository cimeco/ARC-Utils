const HTTP_STATUS_CODES = {
  INTERNAL_SERVER_ERROR: 500,
  NOT_FOUND: 404,
  REDIRECT: 301
};

class BaseError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class ServerError extends BaseError {
  constructor(message = 'Undefined error') {
    super(message, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
  }
}

class NotFoundError extends BaseError {
  constructor(message = '404 Not found') {
    super(message, HTTP_STATUS_CODES.NOT_FOUND);
  }
}

class RedirectError extends BaseError {
  constructor(location, message = '302 Redirect') {
    super(message, HTTP_STATUS_CODES.REDIRECT);
    this.location = location;
  }
}

export { ServerError, NotFoundError, RedirectError };
