const handleErrors = function (error) {
  if (error?.errors) {
    const errors = {};
    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
    });
    return errors;
  }
  if (error) return error;
  return process.env.SERVER_ERROR_MSG;
};

const getObjectWithFields = function (object, fields) {
  const newObject = {};
  fields.map((field) => {
    if (object[field]) newObject[field] = object[field];
  });
  return newObject;
};

const updateDocumentWithFields = function (
  Document,
  object,
  fields,
  updateType
) {
  fields.map((field) => {
    if (updateType === process.env.DOCUMENT_PARTIAL_UPDATE) {
      if (object[field]) {
        Document[field] = object[field];
      }
    } else {
      Document[field] = object[field];
    }
  });
  return Document;
};

module.exports = {
  handleErrors,
  getObjectWithFields,
  updateDocumentWithFields,
};
