const apiResponse = {
  sendSuccess: (res, { message = "Successfull response", code = 200, data }) =>
    res.status(code).send({
      success: true,
      message,
      data,
    }),
  sendUnauthorized: (res, { message = "Unauthorized", code = 401, data }) =>
    res.status(code).send({
      success: false,
      message,
      data,
    }),
  sendBadRequest: (res, { message = "Bad Request", code = 400, data }) =>
    res.status(code).send({
      success: false,
      message,
      data,
    }),
  sendNotFound: (res, { message = "Not Found", code = 404, data }) =>
    res.status(code).send({
      success: false,
      message,
      data,
    }),
  sendUnexpected: (res, { message = "Unexpected error", code = 500, data }) =>
    res.status(code).send({
      success: false,
      message,
      data,
    }),
};

module.exports = {
  apiResponse,
};
