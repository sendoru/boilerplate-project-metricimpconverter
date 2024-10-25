const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

const relativeValues = {
  'gal': 3.78541,
  'L': 1,
  'lbs': 0.453592,
  'kg': 1,
  'mi': 1.60934,
  'km': 1
};

suite('Unit Tests', () => {
  // convertHandler should correctly read a whole number input.
  test('Whole number input', () => {
    assert.equal(convertHandler.getNum('3mi'), 3);
  });

  // convertHandler should correctly read a decimal number input.
  test('Decimal number input', () => {
    assert.approximately(convertHandler.getNum('3.3mi'), 3.3, 1e-4);
  });

  // convertHandler should correctly read a fractional input.
  test('Fractional number input', () => {
    assert.approximately(convertHandler.getNum('3/8mi'), 0.375, 1e-4);
  });

  // convertHandler should correctly read a fractional input with a decimal.
  test('Fractional number input', () => {
    assert.approximately(convertHandler.getNum('1.5/4mi'), 0.375, 1e-4);
  });

  // convertHandler should correctly return an error on a double - fraction(i.e. 3 / 2 / 3).
  test('Fractional number input', () => {
    assert.isNotOk(convertHandler.getNum('3/8/8mi'));
  });

  // convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.
  test('No numerical input', () => {
    assert.equal(convertHandler.getNum('mi'), 1);
  });

  // convertHandler should correctly read each valid input unit.
  test('Valid input unit', () => {
    const units = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    for (let unit of units) {
      assert.equal(convertHandler.getUnit(`3${unit}`), unit);
    }
  });

  // convertHandler should correctly return an error for an invalid input unit.
  test('Invalid input unit', () => {
    assert.isNotOk(convertHandler.getUnit('3mTE'));
  });

  // convertHandler should return the correct return unit for each valid input unit.
  test('Return unit', () => {
    const convertTable = {
      'gal': 'L',
      'L': 'gal',
      'lbs': 'kg',
      'kg': 'lbs',
      'mi': 'km',
      'km': 'mi'
    };
    for (let [input, output] of Object.entries(convertTable)) {
      assert.equal(convertHandler.getReturnUnit(input), output);
    }
  });

  // convertHandler should correctly return the spelled - out string unit for each valid input unit.
  test('Spell out unit', () => {
    const unitFullNames = {
      'gal': 'gallon',
      'L': 'liter',
      'lbs': 'pound',
      'kg': 'kilogram',
      'mi': 'mile',
      'km': 'kilometer'
    };
    for (let [input, output] of Object.entries(unitFullNames)) {
      assert.equal(convertHandler.spellOutUnit(input), output);
    }
  });

  // convertHandler should correctly convert gal to L.
  test('Convert gal to L', () => {
    assert.approximately(convertHandler.convert(1, 'gal'), relativeValues['gal'], 1e-6);
  });
  // convertHandler should correctly convert L to gal.
  test('Convert L to gal', () => {
    assert.approximately(convertHandler.convert(1, 'L'), 1 / relativeValues['gal'], 1e-4);
  });
  // convertHandler should correctly convert mi to km.
  test('Convert mi to km', () => {
    assert.approximately(convertHandler.convert(1, 'mi'), relativeValues['mi'], 1e-4);
  });
  // convertHandler should correctly convert km to mi.
  test('Convert km to mi', () => {
    assert.approximately(convertHandler.convert(1, 'km'), 1 / relativeValues['mi'], 1e-4);
  });
  // convertHandler should correctly convert lbs to kg.
  test('Convert lbs to kg', () => {
    assert.approximately(convertHandler.convert(1, 'lbs'), relativeValues['lbs'], 1e-4);
  });
  // convertHandler should correctly convert kg to lbs.
  test('Convert kg to lbs', () => {
    assert.approximately(convertHandler.convert(1, 'kg'), 1 / relativeValues['lbs'], 1e-4);
  });
});