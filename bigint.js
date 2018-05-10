function BigInt(value) {
  var BASE = 10;
  this.value = parseValue(value);

  this.toString = function convertArrayToString() {
    var numString = '';

    for (var i = this.value.length - 1; i >= 0; i--) {
      numString += this.value[i];
    }

    return numString;
  };

  this.add = function (addend) {
    var a = this.value;
    var b = parseValue(addend);
    var largerArray = a.length >= b.length ? a : b;
    var smallerArray = largerArray === a ? b : a;

    for (var i = 0; i < largerArray.length; i++) {
      if (typeof smallerArray[i] !== 'undefined') largerArray[i] += smallerArray[i];
      if (largerArray[i] >= BASE) {
        largerArray[i + 1] = ++largerArray[i + 1] || 1;
        largerArray[i] -= BASE;
      }
    }
    this.value = largerArray;

    return this;
  };

  function parseValue(value) {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      var result = [];
      value.split('').forEach(function (digit) {
        result.unshift(parseInt(digit, 10));
      });

      return result;
    }

    throw new Error('Value must be an array or a string.');
  }

  return this;
}
