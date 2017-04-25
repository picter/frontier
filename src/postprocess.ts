const callFieldMapping = {
  CALL_OPEN_DATE: 'submissionStartDate',
  CALL_CLOSE_DATE: 'submissionEndDate',
};

const apertureCallData = require('../mocks/request-aperture.json');

export default result =>
  Object.keys(callFieldMapping).forEach(key => {
    const callField = callFieldMapping[key];
    const value = apertureCallData[callField];
    result = result.replace(`%${key}%`, value);
  });
