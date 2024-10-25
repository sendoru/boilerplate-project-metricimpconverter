const unitRegex = /gal|lbs|l|kg|mi|km/i;
const unitFullNames = {
  'gal': 'gallon',
  'l': 'liter',
  'lbs': 'pound',
  'kg': 'kilogram',
  'mi': 'mile',
  'km': 'kilometer'
};

const convertTable = {
  'gal': 'l',
  'l': 'gal',
  'lbs': 'kg',
  'kg': 'lbs',
  'mi': 'km',
  'km': 'mi'
};

const relativeValues = {
  'gal': 3.78541,
  'l': 1,
  'lbs': 0.453592,
  'kg': 1,
  'mi': 1.60934,
  'km': 1
};


function ConvertHandler() {

  this.getNum = function (input) {
    let result;
    let match = input.match(/[a-z]/i);
    if (match) {
      let index = match.index;
      result = input.slice(0, index);
      if (result.length === 0) {
        return 1;
      }
    } else {
      result = input;
    }
    const slashCount = result.split('/').length - 1;
    if (slashCount > 1) {
      return undefined;
    }
    const slashIndex = result.indexOf('/');
    if (slashIndex != -1) {
      return Number(result.slice(0, slashIndex)) / Number(result.slice(slashIndex + 1));
    }
    return Number(result);
  };

  this.getUnit = function (input) {
    let result;
    let match = input.toLowerCase().match(unitRegex);
    if (match && match.length == 1 && input.toLowerCase().endsWith(match[0])) {
      result = match[0];
    }
    if (result == 'l') {
      result = 'L';
    }
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result = convertTable[initUnit.toLowerCase()];
    if (result == 'l') {
      result = 'L';
    }
    return result;
  };

  this.spellOutUnit = function (unit) {
    return unitFullNames[unit.toLowerCase()];
  };

  this.convert = function (initNum, initUnit) {
    initUnit = initUnit.toLowerCase();
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    const returnUnit = this.getReturnUnit(initUnit).toLowerCase();
    if (returnUnit) {
      result = initNum * relativeValues[initUnit] / relativeValues[returnUnit];
    }

    result = Math.round(result * 100000) / 100000;
    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const fullInitUnit = this.spellOutUnit(initUnit);
    const fullReturnUnit = this.spellOutUnit(returnUnit);
    let result = `${initNum} ${fullInitUnit}s converts to ${returnNum} ${fullReturnUnit}s`;

    return result;
  };

}

module.exports = ConvertHandler;
