'use strict';

/*

// DEFAULT PARAMETERS 

const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5
  //   numPassengers = numPassengers || 1;
  //   price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('H123', 2, 800);
createBooking('LH123', 5);
// leave a parameter at it's default
createBooking('LH123', undefined, 1000);

// HOW PASSING ARGUMENTS WORK VALUE VS. REFERENCE

const flight = 'LH234';
const hochmajer = {
  name: 'Ian Hochmajer',
  passport: 123456666,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr.' + passenger.name;

  if (passenger.passport === 123456666) {
    alert('Check in');
  } else {
    alert('Wrong passport');
  }
};

checkIn(flight, hochmajer);
// console.log(flight);
// console.log(hochmajer);

// Is the same as doing...
// const flightNum = flight;
// const passenger = hochmajer;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000);
};

newPassport(hochmajer);
checkIn(flight, hochmajer);

*/

////////////////////////////////////////////
// FUNCTIONS ACCEPTING CALLBACK FUNCTIONS //
////////////////////////////////////////////

/*
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...other] = str.split(' ');
  return [first.toUpperCase(), ...other].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

// JS uses callbacks all the time
const high5 = function () {
  console.log('👏');
};

document.body.addEventListener('click', high5);

['Jonas', 'Martha', 'Adam'].forEach(high5);

*/

///////////////////////////////////
// FUNCTIONS RETURNING FUNCTIONS //
///////////////////////////////////

/*
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');
//same as
greet('zdar')('pičo');

const greetX = greeting => name => console.log(`${greeting} ${name}`);
// greeterZdar = greetX('Zdar');
// greeterZdar('hochu!');
greetX('Zdar')('hochu!');
*/

////////////////////////////////
// the CALL and APPLY methods //
////////////////////////////////

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jan Majer');
lufthansa.book(634, 'John Smith');

const euroWings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;
// regular function call: "this" keyword is undefined
// does NOT work
// book(23, 'Sarah Williams');

// CALL METHOD - first argument manually sets "this" keyword
book.call(euroWings, 23, 'Sarah Williams');

book.call(lufthansa, 239, 'Mary Cooper');

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Dale Cooper');

// APPLY METHOD - same as "call" method, only takes argumens after "this" keyword in an array

const flighData = [583, 'Jim Morrison'];
book.apply(swiss, flighData);
book.apply(euroWings, [666, 'Nicky Devil']);

book.call(swiss, ...flighData);

console.log(swiss);
console.log(lufthansa);
console.log(euroWings);

/////////////////
// BIND METHOD //
/////////////////

const bookEW = book.bind(euroWings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(161, 'Evils Parsley');
console.log(euroWings);

// hardcoding parameters into binded function
const bookEW23 = book.bind(euroWings, 23);

bookEW23('Johnny Silverhand');
bookEW23('Martha Cooper');

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// nová specifická funkce odvozená od "addTax" funkce
const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));

/// challenge

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
// for RATE
const addVAT2 = addTaxRate(0.23);
// for VALUE
console.log(addVAT2(100));
console.log(addVAT2(23));

//////////////////////////////////////////////////////
// Immediately Invoked Function Expressions (IIFE) //
/////////////////////////////////////////////////////

(function () {
  console.log('This will never run again');
})();

(() => console.log('This will ALSO never run again'))();

//////////////
// CLOSURES //
//////////////

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);

// more closure examples

// Example 1
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);
// Re-assigning f function
h();
f();
console.dir(f);

// Example 2

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};
const perGroup = 1000;
boardPassengers(180, 3);
