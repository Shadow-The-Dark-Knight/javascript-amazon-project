import {formatCurrency} from '../scripts/utils/money.js';

console.log('test sutie: format currency');

console.log('convert cents into dollars');

if (formatCurrency(2095) === '20.95') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('works with 0')

if(formatCurrency(0) === '0.00') {
  console.log('passed');
} else {
  console.log('failed');
}

// 2 test case not situations
// basic test case: to see if code is working
// Edge cases = test with values with tricky cases
// groups of related test is called test suite

console.log('rounds up to the nearest cent');

if(formatCurrency(2000.5) === '20.01') {
  console.log('passed');
} else {
  console.log('failed');
}