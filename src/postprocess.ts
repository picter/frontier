const formatDate = date => date;

const callFieldMapping = {
  CALL_OPEN_DATE: {
    key: 'submissionStartDate',
    process: formatDate,
  },
  CALL_CLOSE_DATE: {
    key: 'submissionEndDate',
    process: formatDate,
  },
};

const apertureCallData = require('../mocks/request-aperture.json');

export default result =>
  Object.keys(callFieldMapping).forEach(key => {
    const callField = callFieldMapping[key];
    const value = apertureCallData[callField];
    const process = callField.process || (a => a);
    result = result.replace(`%${key}%`, process(value));
  });
