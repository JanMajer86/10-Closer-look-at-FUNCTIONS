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
