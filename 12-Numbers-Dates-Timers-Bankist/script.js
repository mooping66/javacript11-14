'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'BTH',
  locale: 'th-TH', // pt-PT
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2021-02-20T14:43:26.374Z',
    '2021-02-22T18:49:59.371Z',
    '2021-02-23T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/************************************************************************ */
//* Functions
/************************************************************************ */
const formatMovementDate = function (date, locale) {
  //@@ Operations With Dates
  const calcDayPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDayPassed(new Date(), date);
  console.log(daysPassed);
  // 462
  // 428
  // 392
  // 328
  // 291
  // 272
  if (daysPassed === 0) {
    return 'Today';
  } else if (daysPassed === 1) {
    return 'Yesterday';
  } else if (daysPassed <= 7) {
    return `${daysPassed} days ago`;
  } else {
    // //@@ Adding Dates to "Bankist" App
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

//@@  Internationalizing Numbers (Intl)
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

//@@ Creating DOM Elements
//! Correct credentials? -> Yes, Display UI -> Display Movements
const displayMovements = function (acc, sort = false) {
  //* .textContent = 0
  containerMovements.innerHTML = '';

  //@@ Sorting Arrays
  //! User sorts movements -> Already sorted? -> Yes,Update UI
  const movSort = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movSort.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">
      ${i + 1} ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMov}</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
//  displayMovements(account1.movements); test
//  console.log(containerMovements.innerHTML); test
{
  /*<div class="movements__row">
      <div class="movements__type movements__type--deposit">8 deposit</div>
      <div class="movements__value">1300</div>
    </div>
    <div class="movements__row">
      <div class="movements__type movements__type--deposit">7 deposit</div>
      <div class="movements__value">79.97</div>
    </div>
    <div class="movements__row">
      <div class="movements__type movements__type--withdrawal">6 withdrawal</div>
      <div class="movements__value">-133.9</div>
    </div>
    <div class="movements__row">
      <div class="movements__type movements__type--withdrawal">5 withdrawal</div>
      <div class="movements__value">-642.21</div>
    </div>
    <div class="movements__row">
      <div class="movements__type movements__type--deposit">4 deposit</div>
      <div class="movements__value">25000</div>
    </div>
    <div class="movements__row">
      <div class="movements__type movements__type--withdrawal">3 withdrawal</div>
      <div class="movements__value">-306.5</div>
    </div>
    <div class="movements__row">
      <div class="movements__type movements__type--deposit">2 deposit</div>
      <div class="movements__value">455.23</div>
    </div>
    <div class="movements__row">
      <div class="movements__type movements__type--deposit">1 deposit</div>
      <div class="movements__value">200</div>
    </div>*/
}

//@@ The reduce Method
//! Correct credentials? -> Yes, Display UI -> Calculate Balance -> Display Balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};
//calcDisplayBalance(account1.movements); Test

//@@ The Magic of Chaining Methods
//! Correct credentials? -> Yes, Display UI -> Calculate Summary -> Display Summary
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      //* 2.4 + 5.4 + 36 + 15.6 = 59.4 + include 0.84
      // (5) [2.4, 5.462759999999999, 300, 0.9596399999999999, 15.6]
      // (5) [2.4, 5.462759999999999, 300, 0.9596399999999999, 15.6]
      // (5) [2.4, 5.462759999999999, 300, 0.9596399999999999, 15.6]
      // (5) [2.4, 5.462759999999999, 300, 0.9596399999999999, 15.6]
      // (5) [2.4, 5.462759999999999, 300, 0.9596399999999999, 15.6]
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};
//calcDisplaySummary(account1.movements); TEST

//@@ Computing Usernames
//! User Logs in
//* stw
// const createUserName = function (user) {
//   const userName = user
//     .toLowerCase()
//     .split(' ') //(3) ["steven", "thomas", "williams"]
//     .map(name => name[0]) //(3) ["s", "t", "w"]
//     .join(''); //stw
//   return userName;
// };
// console.log(createUserName('Steven Thomas Williams')); //stw
const createUserName = function (accts) {
  accts.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserName(accounts);
console.log(accounts);
//Array(2)
//0: {owner: "Jonas Schmedtmann", movements: Array(8), interestRate: 1.2, pin: 1111, movementsDates: Array(8), …}
//1: {owner: "Jessica Davis", movements: Array(8), interestRate: 1.5, pin: 2222, movementsDates: Array(8), …}

//@@ Implementing Login
//! User Logs in -> Correct credentials? -> Yes, Update Display UI and Welcome Massage

const updateUI = function (acc) {
  //* Display Movement
  displayMovements(acc);

  //* Display Balance
  calcDisplayBalance(acc);

  //* Display Summary
  calcDisplaySummary(acc);
};

//@@ Implementing a Countdown Timer
const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    //* In ech call, Print the remaining time to UI
    labelTimer.textContent = `${min}: ${sec}`;

    //* when 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    } else {
      //* Decrees 1s
      time--;
    }
  };

  //* Set time to 5 minutes
  let time = 60;

  //* Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};
/************************************************************************ */
//* Event handler
/************************************************************************ */
let currentAccount, timer;

//* FAKE ALWAYS LOGGED IN on TEST
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  //* Prevent form from Submitting
  e.preventDefault();
  console.log('LOGIN'); //LOGIN

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);
  //(input ){owner: "Jonas Schmedtmann", movements: Array(8), interestRate: 1.2, pin: 1111, movementsDates: Array(8), …}

  if (currentAccount?.pin === +inputLoginPin.value) {
    console.log('LOGIN');
    //{owner: "Jonas Schmedtmann", movements: Array(8), interestRate: 1.2, pin: 1111, movementsDates: Array(8), …}
    //LOGIN

    //* Display UI and Massage
    //! DON'T forget get out /* opacity: 0; CSS*/
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //@@ Internationalizing Dates (Intl)
    //* Experimenting API
    //* Create current date and time
    const now = new Date();
    // //labelDate.textContent = now; //long DATE
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    //* day/month/year
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: '2-digit',
      weekday: 'short',
    };
    // const locale = navigator.language;
    // console.log(locale); //th-TH
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    //* Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //* Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    //* Update UI
    updateUI(currentAccount);
  } else {
  }
});

//@@  some and every
//! User Request loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  //! Any deposit > 10% of request? -> Yes,
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //@@ Timers: setTimeout and setInterval
    setTimeout(function () {
      //* Add movement
      //! Any deposit > 10% of request? -> Yes, Add positive movement to current user
      currentAccount.movements.push(amount);

      //* Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      //* Update UI
      updateUI(currentAccount);

      //* Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

//@@ Implementing Transfers
//! User transfers money
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  console.log(amount, receiverAcc);
  // 100
  // {owner: "Jessica Davis", movements: Array(8), interestRate: 1.5, pin: 2222, movementsDates: Array(8), …}
  // currency: "USD"
  // interestRate: 1.5
  // locale: "en-US"
  // movements: (9) [5000, 3400, -150, -790, -3210, -1000, 8500, -30, 100]
  // movementsDates: (8) ["2019-11-01T13:15:33.035Z", "2019-11-30T09:48:16.867Z", "2019-12-25T06:04:23.907Z", "2020-01-25T14:18:46.235Z", "2020-02-05T16:33:06.386Z", "2020-04-10T14:43:26.374Z", "2020-06-25T18:49:59.371Z", "2020-07-26T12:01:20.894Z"]
  // owner: "Jessica Davis"
  // pin: 2222
  // userName: "jd"

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    setTimeout(function () {
      console.log('Transfer valid');

      //* Doing the transfer
      //! Add negative movement to current user
      currentAccount.movements.push(-amount);
      //! Add positive movement to current user
      receiverAcc.movements.push(amount);

      //* Add transfer date
      currentAccount.movementsDates.push(new Date().toISOString());
      receiverAcc.movementsDates.push(new Date().toISOString());

      //* Update UI
      updateUI(currentAccount);

      //* Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
});

//@@ The findIndex Method
//! User close account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('Delete');

  //! Correct credentials? -> Yes,
  if (
    inputCloseUsername.value === currentAccount.userName &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );
    console.log(index); //(delete js) 0
    //.indexOf(23)

    //! Correct credentials? -> Yes, Delete user from data
    //* Delete account
    accounts.splice(index, 1);

    //! Correct credentials? -> Yes, Delete user from data -> Login user out (Hide UI)
    //* Hide UI
    containerApp.style.opacity = 0;
  }
  //! Logout times expires
  inputCloseUsername.value = inputClosePin.value = '';
});

//! User sorts movements -> Already sorted? -> Yes,Update UI
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  //displayMovements(currentAccount.movements, !sorted);
  displayMovements(currentAccount, !sorted);
  //! User sorts movements -> Already sorted? -> NO, Sort movement -> Display movement
  sorted = !sorted;
});
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
/////////////////////////////////////////////////

// LECTURES
/*
//@@ Converting and Checking Numbers
console.log(23 === 23.0); //true

//* Base 10 - 0 to 9
//* 1 / 10 = 0.1
//* 3 / 10 = 3.33333333
//* Binary base 2 - 0 1
console.log(0.1 + 0.2); //0.30000000000000004
console.log(0.1 + 0.2 === 0.3); //false

//* Conversion Conversion การแปลง
console.log(Number('23')); //23
console.log(+'23'); //23

//* Parsing การแยกวิเคราะห์
console.log(Number.parseInt('30px', 10)); //30
console.log(Number.parseInt('e23', 10)); //NaN

console.log(Number.parseInt(' 2.5rem ')); //2
console.log(Number.parseFloat(' 2.5rem ')); //2.5

//console.log(parseFloat(' 2.5rem ')); //2.5

//* Check if value is NaN ตรวจสอบว่าค่าเป็น NaN หรือไม่
console.log(Number.isNaN(20)); //false
console.log(Number.isNaN('20')); //false
console.log(Number.isNaN(+'20X')); //true
console.log(Number.isNaN(23 / 0)); //false

//* Checking if value is number ตรวจสอบว่าค่าเป็นตัวเลขหรือไม่
console.log(Number.isFinite(20)); //true
console.log(Number.isFinite('20')); //false
console.log(Number.isFinite(+'20X')); //false
console.log(Number.isFinite(23 / 0)); //false

console.log(Number.isInteger(23)); //true
console.log(Number.isInteger(23.0)); //true
console.log(Number.isInteger('23')); //false
console.log(Number.isInteger(23 / 0)); //false

//@@ Math and Rounding
console.log(Math.sqrt(25)); //5
console.log(25 ** (1 / 2)); //5
console.log(8 ** (1 / 3)); //2

console.log(Math.max(5, 18, 23, 11, 2)); //23
console.log(Math.max(5, 18, '23', 11, 2)); //23
console.log(Math.max(5, 18, '23px', 11, 2)); //Nan

console.log(Math.min(5, 18, 23, 11, 2)); //2

console.log(Math.PI * Number.parseFloat('10px') ** 2); //314.1592653589793;

console.log(Math.trunc(Math.random() * 6) + 1); //random number 1-6

//* 0...1 -> 0...(max - min) -> min...max
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
console.log(randomInt(10, 20));

//* Rounding integers การปัดเศษจำนวนเต็ม
console.log(Math.trunc(23.3)); //23
console.log(Math.round(23.3)); //23
console.log(Math.round(23.9)); //24

console.log(Math.ceil(23.3)); //24
console.log(Math.ceil(23.9)); //24
console.log(Math.ceil('23.9')); //24

console.log(Math.floor(23.3)); //23
console.log(Math.floor(23.9)); //23

console.log(Math.trunc(23.3)); //23

console.log(Math.trunc(-23.3)); //-23
console.log(Math.floor(-23.3)); //-24

//* Rounding decimals การปัดเศษทศนิยม
console.log((2.7).toFixed(0)); //3 (string)
console.log((2.7).toFixed(3)); //2.700 (string)
console.log((2.345).toFixed(2)); //2.35 (string)
console.log(+(2.345).toFixed(2)); //2.35

//@@ The Remainder Operator
console.log(5 % 2); //1
console.log(5 / 2); //2.5 , 5= 2 * 2 + 1

console.log(8 % 3); //2
console.log(8 / 3); //2.6666666666666665 , 8 = 2 * 3 + 2

console.log(6 % 2); //0
console.log(6 / 2); //3

console.log(7 % 2); //1
console.log(7 / 2); //3.3

const isEven = n => n % 2 === 0;
console.log(isEven(8)); //true
console.log(isEven(23)); //false
console.log(isEven(514)); //true

//* Nth
labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) {
      //* 0, 2, 4, 6,...
      row.style.backgroundColor = 'pink';
    } else if (i % 3 === 0) {
      //* 0, 3, 6, 9,...
      row.style.backgroundColor = 'lightblue';
    }
  });
});

//@@ Working with BigInt
console.log(2 ** 53 - 1); //9007199254740991
console.log(Number.MAX_SAFE_INTEGER); //9007199254740991
console.log(2 ** 53 + 1); //9007199254740992
console.log(2 ** 53 + 2); //9007199254740994
console.log(2 ** 53 + 3); //9007199254740996
console.log(2 ** 53 + 4); //9007199254740996

console.log(465948539692859283643604347612735476598405610567); //4.6594853969285926e+47
console.log(465948539692859283643604347612735476598405610567n); //465948539692859283643604347612735476598405610567n
console.log(BigInt(4659485)); //4659485n

//* Operations
console.log(10000n + 10000n); //20000n
console.log(37847013471649617643749124n * 10000000n); //378470134716496176437491240000000n
//console.log(Math.sqrt(16n)); error

const huge = 231237817238179379n;
const num = 23;
console.log(huge * BigInt(num)); //5318469796478125717n

//* Exceptions การยกเว้น
console.log(20n > 15); //true
console.log(20n === 20); //false
console.log(typeof 20n); //bigint
console.log(20n == 20); // true
console.log(20n == '20'); // true

console.log(huge + ' is REALLY big!!!'); //231237817238179379 is REALLY big!!!

//* Divisions
console.log(10n / 3n); //3n
console.log(10 / 3); //3.3333333333333335

//@@ Creating Dates
//* Create a date สร้างวันที่
const now = new Date();
console.log(now); //Tue Feb 23 2021 14:52:11 GMT+0700 (Indochina Time)

console.log(new Date('Feb 23 2021 14:52:11')); //Tue Feb 23 2021 14:52:11 GMT+0700 (Indochina Time)
console.log(new Date('December 24, 2016')); //Sat Dec 24 2016 00:00:00 GMT+0700 (Indochina Time)
console.log(new Date(account1.movementsDates[0])); //Tue Nov 19 2019 04:31:17 GMT+0700 (Indochina Time)

console.log(new Date(2037, 10, 19, 15, 23, 5)); //Thu Nov 19 2037 15:23:05 GMT+0700 (Indochina Time)
console.log(new Date(2037, 10, 31)); //Tue Dec 01 2037 00:00:00 GMT+0700 (Indochina Time)

console.log(new Date(0)); //hu Jan 01 1970 07:00:00 GMT+0700 (Indochina Time)
console.log(new Date(3 * 24 * 60 * 60 * 1000)); //Sun Jan 04 1970 07:00:00 GMT+0700 (Indochina Time)

//* Working with dates การทำงานกับวันที่
const future = new Date(2037, 10, 19, 15, 23);
console.log(future); //Thu Nov 19 2037 15:23:00 GMT+0700 (Indochina Time)
console.log(future.getFullYear()); //2037
console.log(future.getMonth()); //10
console.log(future.getDate()); //19
console.log(future.getDay()); //4
console.log(future.getHours()); //15
console.log(future.getMinutes()); //23
console.log(future.getSeconds()); //0
console.log(future.toISOString()); //2037-11-19T08:23:00.000Z
console.log(future.getTime()); //2142231780000

console.log(new Date(2142256980000)); //Thu Nov 19 2037 22:23:00 GMT+0700 (Indochina Time)

console.log(Date.now()); //1614067523666

future.setFullYear(2040);
console.log(future); //Mon Nov 19 2040 15:23:00 GMT+0700 (Indochina Time)

//@@ Operations With Dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(Number(+future)); //2142231780000

const calcDayPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDayPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
console.log(days1); //10

//@@  Internationalizing Numbers (Intl)
const num = 38888790.23;
const options = {
  // style: 'unit',
  // style: 'percent',
  // unit: 'mile-per-hour',
  style: 'currency',
  unit: 'celsius',
  currency: 'EUR',
  // useGrouping: false,
};
console.log('US: ', new Intl.NumberFormat('en-US', options).format(num));
//US:  €38,888,790.23
console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num));
//Germany:  38.888.790,23 €
console.log('Syria: ', new Intl.NumberFormat('ar-SY', options).format(num));
//Syria:  ٣٨٬٨٨٨٬٧٩٠٫٢٣ €
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num)
);
//th-TH €38,888,790.23

//@@ Timers: setTimeout and setInterval
//* setTimeout ตั้งค่าหมดเวลา
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`),
  3000,
  ...ingredients
);
console.log('Waiting...');
//Waiting...
//Here is your pizza with olives and spinach 🍕
if (ingredients.includes('spinach')) {
  clearTimeout(pizzaTimer);
}
//Waiting...

//* setInterval ตั้งค่าช่วงเวลา
setInterval(function () {
  const now = new Date();
  console.log(now);
}, 5000);
//* update time every 5 sec = 5000
*/
