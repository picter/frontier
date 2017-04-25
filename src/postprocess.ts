const formatDate = raw => {
  return new Date(raw);
};


const get = (obj: Object, key: string) =>
  key.split('.').reduce((prev, keyPart) =>
    prev[keyPart],
  obj);

const callFieldMapping = {
  CALL_OPEN_DATE: {
    key: 'submissionStartDate',
    process: formatDate,
  },
  CALL_CLOSE_DATE: {
    key: 'submissionEndDate',
    process: formatDate,
  },
  ORGANISATION_SLOGAN: {
    key: 'description.en',
  },
};

const apertureCallData = require('../mocks/request-aperture.json');

export default page => {
  let result = page;

  Object.keys(callFieldMapping).map(key => {
    const callField = callFieldMapping[key];
    const value = get(apertureCallData, callField.key);
    const process = callField.process || (a => a);
    result = result.replace(`%${key}%`, process(value));
  });

  return result;
};
