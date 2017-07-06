// ## stats

// Load accessor.
var value = require( './accessor.js' );
// Load percentile.
var percentile = require( './stats-percentile.js' );


// ### fiveNumSummary
/**
 *
 * Returns the [five number summary](https://en.wikipedia.org/wiki/Five-number_summary) from the `sortedData`.
 *
 * @param {array} sortedData — sorted in ascending order of value.
 * @param {(string|number|function)} [accessor=undefined] — Useful when each element of
 * `sortedData` is an object or an array instead of number. If it is an object
 * then it should be the key (string) to access the value; or if it is an array
 * then it should be the index (number) to access the value; or it should be a function
 * that extracts the value from the element passed to it.
 * @returns {number} — 5-number summary consisting of `min`, `q1`, `median`, `q3`,
 * `max` along with `iqr`, `range`, and `size`.
 * @example
 * fiveNumSummary( [ 1, 1, 2, 2, 3, 3, 4, 4 ] );
 * // returns {
 * //   min: 1, q1: 1.25, q2: 2.5, q3: 3.75, max: 4,
 * //   iqr: 2.5, range: 3, size: 8
 * // }
*/
var fiveNumSummary = function ( sortedData, accessor ) {
  var q1 = percentile( sortedData, 0.25, accessor );
  var median = percentile( sortedData, 0.50, accessor );
  var q3 = percentile( sortedData, 0.75, accessor );
  var min = value( sortedData[ 0 ], accessor );
  var size = sortedData.length;
  var max = value( sortedData[ size - 1 ], accessor );

  return ( {
    min: min,
    q1: q1,
    median: median,
    q3: q3,
    max: max,
    iqr: ( q3 - q1 ),
    range: ( max - min ),
    size: size
  } );
}; // fiveNumSummary()

module.exports = fiveNumSummary;