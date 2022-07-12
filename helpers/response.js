const { handleErrors } = require("./index");

const success = (res, responseStatus, data) => {
  const status = parseInt(responseStatus, process.env.BASE_10)
  return res.status(status).json(data);
};

const fail = (res, responseStatus, error) => {
  const status = parseInt(responseStatus, process.env.BASE_10)
  return res.status(status).json({ error: handleErrors(error) });
};

module.exports = {
  success,
  fail,
};
