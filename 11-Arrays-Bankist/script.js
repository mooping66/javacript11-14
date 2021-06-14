'use strict';
//@@ PROJECT: "Bankist" App
//* Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

//* Elements
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

//@@ Creating DOM Elements
//! Correct credentials? -> Yes, Display UI -> Display Movements
const displayMovements = function (movements, sort = false) {
  //* .textContent = 0
  containerMovements.innerHTML = '';

  //@@ Sorting Arrays
  //! User sorts movements -> Already sorted? -> Yes,Update UI
  const movSort = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movSort.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">
      ${i + 1} ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
//displayMovements(account1.movements); test

// console.log(containerMovements.innerHTML); test
{
  /* <div class="movements__row">
      <div class="movements__type movements__type--deposit">8 deposit</div>
      <div class="movements__value">1300</div>
    </div>
    <div class="movements__row">
      <div class="movements__type movements__type--deposit">7 deposit</div>
      <div class="movements__value">70</div>
    </div>
    <div class="movements__row">
      <div class="movements__type movements__type--withdrawal">6 withdrawal</div>
      <div class="movements__value">-130</div>
    </div>
    <div class="movements__row">
      <div class="movements__type movements__type--withdrawal">5 withdrawal</div>
      <div class="movements__value">-650</div>
    </div>
    <div class="movements__row">
      <div class="movements__type movements__type--deposit">4 deposit</div>
      <div class="movements__value">3000</div>
    </div>
    <div class="movements__row">
      <div class="movements__type movements__type--withdrawal">3 withdrawal</div>
      <div class="movements__value">-400</div>
    </div>
    <div class="movements__row">
      <div class="movements__type movements__type--deposit">2 deposit</div>
      <div class="movements__value">450</div>
    </div>
    <div class="movements__row">
      <div class="movements__type movements__type--deposit">1 deposit</div>
      <div class="movements__value">200</div>
    </div> */
}

//@@ The reduce Method
//! Correct credentials? -> Yes, Display UI -> Calculate Balance -> Display Balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};
//calcDisplayBalance(account1.movements); Test

//@@ The Magic of Chaining Methods
//! Correct credentials? -> Yes, Display UI -> Calculate Summary -> Display Summary
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      //* 2.4 + 5.4 + 36 + 15.6 = 59.4 + include 0.84
      //(5) [2.4, 5.4, 36, 0.84, 15.6]
      //(5) [2.4, 5.4, 36, 0.84, 15.6]
      //(5) [2.4, 5.4, 36, 0.84, 15.6]
      //(5) [2.4, 5.4, 36, 0.84, 15.6]
      //(5) [2.4, 5.4, 36, 0.84, 15.6]
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};
//calcDisplaySummary(account1.movements); Test

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
//(4) [{…}, {…}, {…}, {…}]
//0: {owner: "Jonas Schmedtmann", movements: Array(8), interestRate: 1.2, pin: 1111, userName: "js"}
//1: {owner: "Jessica Davis", movements: Array(8), interestRate: 1.5, pin: 2222, userName: "jd"}
//2: {owner: "Steven Thomas Williams", movements: Array(8), interestRate: 0.7, pin: 3333, userName: "stw"}
//3: {owner: "Sarah Smith", movements: Array(5), interestRate: 1, pin: 4444, userName: "ss"}

//@@ Implementing Login
//! User Logs in -> Correct credentials? -> Yes, Update Display UI and Welcome Massage

const updateUI = function (acc) {
  //* Display Movement
  displayMovements(acc.movements);

  //* Display Balance
  calcDisplayBalance(acc);

  //* Display Summary
  calcDisplaySummary(acc);
};

//* Event handler
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  //* Prevent form from Submitting
  e.preventDefault();
  console.log('LOGIN'); //LOGIN

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);
  //(input stw){owner: "Steven Thomas Williams", movements: Array(8), interestRate: 0.7, pin: 3333, userName: "stw"}

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('LOGIN');
    //{owner: "Steven Thomas Williams", movements: Array(8), interestRate: 0.7, pin: 3333, userName: "stw"}
    //LOGIN

    //* Display UI and Massage
    //! DON'T forget get out /* opacity: 0; CSS*/
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //* Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //* Update UI
    updateUI(currentAccount);
  } else {
  }
});

//@@  some and every
//! User Request loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  //! Any deposit > 10% of request? -> Yes,
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //* Add movement
    //! Any deposit > 10% of request? -> Yes, Add positive movement to current user
    currentAccount.movements.push(amount);

    //* Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

//@@ Implementing Transfers
//! User transfers money
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  console.log(amount, receiverAcc);
  //100
  //{owner: "Jessica Davis", movements: Array(8), interestRate: 1.5, pin: 2222, userName: "jd"}

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    console.log('Transfer valid');

    //* Doing the transfer
    //! Add negative movement to current user
    currentAccount.movements.push(-amount);
    //! Add positive movement to current user
    receiverAcc.movements.push(amount);

    //* Update UI
    updateUI(currentAccount);
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
    Number(inputClosePin.value) === currentAccount.pin
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
  displayMovements(currentAccount.movements, !sorted);
  //! User sorts movements -> Already sorted? -> NO, Sort movement -> Display movement
  sorted = !sorted;
});
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;
/*
//@@ Simple Array Methods
//* SLICE
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2)); //(3) ["c", "d", "e"]
console.log(arr.slice(2, 4)); //(2) ["c", "d"]
console.log(arr.slice(-2)); //(2) ["d", "e"]
console.log(arr.slice(-1)); //["e"]
console.log(arr.slice(1, -2)); //(2) ["b", "c"]
console.log(arr.slice()); //(5) ["a", "b", "c", "d", "e"]
console.log([...arr]); //(5) ["a", "b", "c", "d", "e"]

//* SPLICE
//console.log(arr.splice(2)); //(3) ["c", "d", "e"]

arr.splice(-1);
console.log(arr); //(4) ["a", "b", "c", "d"]
arr.splice(1, 2);
console.log(arr); //(2) ["a", "d"]

//* REVERSE
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); //(5) ["f", "g", "h", "i", "j"]
console.log(arr2); //(5) ["f", "g", "h", "i", "j"]

//* CONCAT
const letters = arr.concat(arr2);
console.log(letters); //(10) ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
console.log([...arr, ...arr2]); ///(10) ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]

//* JOIN
console.log(letters.join(' - ')); //a - b - c - d - e - f - g - h - i - j

//@@ Looping Arrays: forEach
//for (const movement of movements) {}
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1} You deposited ${movement}`);
  } else {
    // Math.abs ทำให้ค่าที่ติด (-) ทำเครื่องหมาย (-) หายไป
    console.log(`Movement ${i + 1} You withdrew ${Math.abs(movement)}`);
  }
}
// Movement 1 You deposited 200
// Movement 2 You deposited 450
// Movement 3 You withdrew 400
// Movement 4 You deposited 3000
// Movement 5 You withdrew 650
// Movement 6 You withdrew 130
// Movement 7 You deposited 70
// Movement 8 You deposited 1300

console.log('---FOREACH---');
movements.forEach(function (movement, i, arr) {
  if (movement > 0) {
    console.log(`Movement ${i + 1} You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1} You withdrew ${Math.abs(movement)}`);
  }
});
//---FOREACH---
// Movement 1 You deposited 200
// Movement 2 You deposited 450
// Movement 3 You withdrew 400
// Movement 4 You deposited 3000
// Movement 5 You withdrew 650
// Movement 6 You withdrew 130
// Movement 7 You deposited 70
// Movement 8 You deposited 1300
//* 0:Function(200)
//* 1:function(450)
//* 2:function(400)
//* ...

//@@ forEach With Maps and Sets
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
// USD: United States dollar
// EUR: Euro
// GBP: Pound sterling

//* Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique); //Set(3) {"USD", "GBP", "EUR"}

currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
// USD: USD
// GBP: GBP
// EUR: EUR
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});
// USD: USD
// GBP: GBP
// EUR: EUR
*/
/**
 * * Coding Challenge #1
 * ? Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each).
 * ? For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.
 * TODO Your tasks: Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:
 * todo 1. Julia found out that the owners of the first and the last two dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
 * todo 2. Create an array with both Julia's (corrected) and Kate's data
 * todo 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
 * todo 4. Run the function for both test datasets
 * ! Test data for bonus:
 * ! Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
 * ! Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
 * ! Hints:
 * ! Use tools from all lectures in this section so far 😉
 **/
const checkDogs = function (dogsJulia, DogsKate) {
  //todo 1
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  // console.log(dogsJuliaCorrected); //(2) [5, 2]
  // console.log(dogsJulia.slice(1, 3)); //(2) [5, 2]
  //todo 2
  const dogs = dogsJuliaCorrected.concat(DogsKate);
  console.log(dogs);
  //(7) [5, 2, 4, 1, 15, 8, 3]
  //(7) [16, 6, 10, 5, 6, 1, 4]
  //todo 3
  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
//Dog number 1 is an adult, and is 5 years old
//Dog number 2 is still a puppy 🐶
//Dog number 3 is an adult, and is 4 years old
//Dog number 4 is still a puppy 🐶
//Dog number 5 is an adult, and is 15 years old
//Dog number 6 is an adult, and is 8 years old
//Dog number 7 is an adult, and is 3 years old
//todo 4
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
//Dog number 1 is an adult, and is 16 years old
//Dog number 2 is an adult, and is 6 years old
//Dog number 3 is an adult, and is 10 years old
//Dog number 4 is an adult, and is 5 years old
//Dog number 5 is an adult, and is 6 years old
//Dog number 6 is still a puppy 🐶
//Dog number 7 is an adult, and is 4 years old
/*
//@@ The map Method
//const eurToUsd = 1.1;

// const movementsUSD1 = movements.map(function (mov) {
//   return mov * eurToUsd;
//   // return 23; test
// });
// console.log(movements);
// //(8) [200, 450, -400, 3000, -650, -130, 70, 1300]
// console.log(movementsUSD1);
// //(8) [220.00000000000003, 495.00000000000006, -440.00000000000006, 3300.0000000000005, -715.0000000000001, -143, 77, 1430.0000000000002]
// //(8) [23, 23, 23, 23, 23, 23, 23, 23]

const movementsUSD = movements.map(mov => mov * eurToUsd);
console.log(movements);
//(8) [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(movementsUSD);
//(8) [220.00000000000003, 495.00000000000006, -440.00000000000006, 3300.0000000000005, -715.0000000000001, -143, 77, 1430.0000000000002]

const movementsUsdFor = [];
for (const mov of movements) {
  movementsUsdFor.push(mov * eurToUsd);
  console.log(movementsUsdFor);
  //[220.00000000000003]
  //(2) [220.00000000000003, 495.00000000000006]
  //(3) [220.00000000000003, 495.00000000000006, -440.00000000000006]
  //(4) [220.00000000000003, 495.00000000000006, -440.00000000000006, 3300.0000000000005]
  //(5) [220.00000000000003, 495.00000000000006, -440.00000000000006, 3300.0000000000005, -715.0000000000001]
  //(6) [220.00000000000003, 495.00000000000006, -440.00000000000006, 3300.0000000000005, -715.0000000000001, -143]
  //(7) [220.00000000000003, 495.00000000000006, -440.00000000000006, 3300.0000000000005, -715.0000000000001, -143, 77]
  //(8) [220.00000000000003, 495.00000000000006, -440.00000000000006, 3300.0000000000005, -715.0000000000001, -143, 77, 1430.0000000000002]
}

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1} You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
  //  {
  //   if (mov > 0) {
  //     return `Movement ${i + 1} You deposited ${mov}`;
  //   } else {
  //     return `Movement ${i + 1} You withdrew ${Math.abs(mov)}`;
  //   }
  // }
);
console.log(movementsDescriptions);
//(8) ["Movement 1 You deposited 200", "Movement 2 You deposited 450", "Movement 3 You withdrew 400", "Movement 4 You deposited 3000", "Movement 5 You withdrew 650", "Movement 6 You withdrew 130", "Movement 7 You deposited 70", "Movement 8 You deposited 1300"]

//@@ The filter Method
const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
});
console.log(movements); //(8) [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(deposits); //(5) [200, 450, 3000, 70, 1300]

const depositsFor = [];
for (const mov of movements)
  if (mov > 0) {
    depositsFor.push(mov);
  }
console.log(depositsFor); //(5) [200, 450, 3000, 70, 1300]

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals); //(3) [-400, -650, -130]

//@@ The reduce Method
console.log(movements); //(8) [200, 450, -400, 3000, -650, -130, 70, 1300]

//* accumulator -> SNOWBALL
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   // Iteration 0: 0
//   // Iteration 1: 200
//   // Iteration 2: 650
//   // Iteration 3: 250
//   // Iteration 4: 3250
//   // Iteration 5: 2600
//   // Iteration 6: 2470
//   // Iteration 7: 2540
//   return acc + cur;
// }, 0);
// console.log(balance); //3840

const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance); //3840

let balance2 = 0;
for (const mov of movements) {
  balance2 += mov;
  console.log(balance2);
  //200
  //650
  //250
  //3250
  //2600
  //2470
  //2540
  //3840
}
//* Maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements[0]);
console.log(max); //3000
*/
/**
 * * Coding Challenge #2
 * ? Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
 * TODO Your tasks: Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
 * todo 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4
 * todo 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
 * todo 3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
 * todo 4. Run the function for both test datasets
 * ! Test data for bonus:
 * ! Data 1: [5, 2, 4, 1, 15, 8, 3]
 * ! Data 2: [16, 6, 10, 5, 6, 1, 4]
 **/
const calcAverageHumanAge = function (ages) {
  //todo 1
  const humanAges = ages.map(dogAge =>
    dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4
  );
  console.log(humanAges);
  //(7) [36, 4, 32, 2, 76, 48, 28]
  //(7) [80, 40, 56, 36, 40, 2, 32]
  //todo 2
  const adults = humanAges.filter(dogAge => dogAge >= 18);
  console.log(humanAges);
  //(7) [36, 4, 32, 2, 76, 48, 28]
  //(7) [80, 40, 56, 36, 40, 2, 32]
  console.log(adults);
  //(5) [36, 32, 76, 48, 28]
  //(6) [80, 40, 56, 36, 40, 32]
  //todo 3
  //* 2 and 3. (2 + 3) / 2 = 2.5 === 2 / 2 + 3 / 2 = 2.5
  // const average =
  //   adults.reduce((acc, dogAge) => acc + dogAge, 0) / adults.length;
  const average = adults.reduce(
    (acc, dogAge, i, arr) => acc + dogAge / arr.length,
    0
  );

  return average;
};
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2); //44 47.333333333333336
/* 
//@@ The Magic of Chaining Methods
console.log(movements); //(8) [200, 450, -400, 3000, -650, -130, 70, 1300]
//* PIPELINE
const totalDepositUSD1 = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositUSD1); //5522.000000000001

const totalDepositUSD2 = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    console.log(arr);
    //(5) [200, 450, 3000, 70, 1300]
    //(5) [200, 450, 3000, 70, 1300]
    //(5) [200, 450, 3000, 70, 1300]
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositUSD2); //5522.000000000001
*/
/**
 * * Coding Challenge #3
 * ? Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time as an arrow function, and using chaining!
 * ! Test data for bonus:
 * ! Data 1: [5, 2, 4, 1, 15, 8, 3]
 * ! Data 2: [16, 6, 10, 5, 6, 1, 4]
 **/
const calcAverageHumanAgeRewrite = ages =>
  ages
    .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .filter(dogAge => dogAge >= 18)
    .reduce((acc, dogAge, i, arr) => acc + dogAge / arr.length, 0); //adults.length
const avgRewrite1 = calcAverageHumanAgeRewrite([5, 2, 4, 1, 15, 8, 3]);
const avgRewrite2 = calcAverageHumanAgeRewrite([16, 6, 10, 5, 6, 1, 4]);
console.log(avgRewrite1, avgRewrite2); //44 47.333333333333336
/* 
//@@ The find Method
console.log(movements); //(8) [200, 450, -400, 3000, -650, -130, 70, 1300])

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal); //-400
console.log(accounts);
//(4) [{…}, {…}, {…}, {…}]
//0: {owner: "Jonas Schmedtmann", movements: Array(8), interestRate: 1.2, pin: 1111, userName: "js"}
//1: {owner: "Jessica Davis", movements: Array(8), interestRate: 1.5, pin: 2222, userName: "jd"}
//2: {owner: "Steven Thomas Williams", movements: Array(8), interestRate: 0.7, pin: 3333, userName: "stw"}
//3: {owner: "Sarah Smith", movements: Array(5), interestRate: 1, pin: 4444, userName
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
//{owner: "Jessica Davis", movements: Array(8), interestRate: 1.5, pin: 2222, userName: "jd"}

//@@ some and every
console.log(movements); //(8) [200, 450, -400, 3000, -650, -130, 70, 1300]

//* EQUALITY
console.log(movements.includes(-130)); //true

//* CONDITION
console.log(movements.some(mov => mov === -130)); //true

const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits); //true

//* EVERY
console.log(movements.every(mov => mov > 0)); //false
console.log(account4.movements.every(mov => mov > 0)); //true

//* Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit)); //true
console.log(movements.every(deposit)); //false
console.log(movements.filter(deposit)); //(5) [200, 450, 3000, 70, 1300]

//@@ flat and flatMap
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); //(8) [1, 2, 3, 4, 5, 6, 7, 8]

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(1)); //(6) [Array(2), 3, 4, Array(2), 7, 8]
console.log(arrDeep.flat(2)); //(8) [1, 2, 3, 4, 5, 6, 7, 8]
//* Flat ex1
// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// //(4) [Array(8), Array(8), Array(8), Array(5)]
// //0: (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
// //1: (8) [5000, 3400, -150, -790, -3210, -1000, 8500, -30]
// //2: (8) [200, -200, 340, -300, -20, 50, 400, -460]
// //3: (5) [430, 1000, 700, 50, 90]
//
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// //(29) [200, 450, -400, 3000, -650, -130, 70, 1300, 5000, 3400, -150, -790, -3210, -1000, 8500, -30, 200, -200, 340, -300, -20, 50, 400, -460, 430, 1000, 700, 50, 90]
//
// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance); //17840

//* Flat ex2
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance); //17840

//* flatMap
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance2); //17840

//@@ Sorting Arrays
//* Strings
const owners = ['Mooping', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); //(4) ["Adam", "Martha", "Mooping", "Zach"]
console.log(owners); //(4) ["Adam", "Martha", "Mooping", "Zach"]

//* Numbers
console.log(movements); //(8) [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(movements.sort()); //(8) [-130, -400, -650, 1300, 200, 3000, 450, 70]

//* return < 0, A, B (keep order)
//* return > 0, B, A (switch order)

//* Ascending
// movements.sort((a, b) => {
//   if (a > b) {
//     return 1;
//   } else if (a < b) {
//     return -1;
//   }
// });
movements.sort((a, b) => a - b);
console.log(movements); //(8) [-650, -400, -130, 70, 200, 450, 1300, 3000]

//* Descending
// movements.sort((a, b) => {
//   if (a > b) {
//     return -1;
//   } else if (a < b) {
//     return 1;
//   }
// });
movements.sort((a, b) => b - a);
console.log(movements); //(8) [3000, 1300, 450, 200, 70, -130, -400, -650]

//@@ More Ways of Creating and Filling Arrays
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7)); //(7) [1, 2, 3, 4, 5, 6, 7]

//* Empty array + fill method
const x = new Array(7);
console.log(x); //(7) [empty × 7]
console.log(x.map(() => 5)); //(7) [empty × 7]

// x.fill(1); //(7) [1, 1, 1, 1, 1, 1, 1]
// x.fill(1, 3); //(7) [empty × 3, 1, 1, 1, 1]
x.fill(1, 3, 5); //(7) [empty × 3, 1, 1, empty × 2]
console.log(x);

arr.fill(23, 4, 6);
console.log(arr); //(7) [1, 2, 3, 4, 23, 23, 7]

//* Array.form
const y = Array.from({ length: 7 }, () => 1);
console.log(y); //(7) [1, 1, 1, 1, 1, 1, 1]

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z); //(7) [1, 2, 3, 4, 5, 6, 7]

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI); //(8) [1300, 70, -130, -650, 3000, -400, 450, 200]

  const movementsUI2 = [...document.querySelectorAll('.momovements__value')];
});

//@@Array Methods Practice
//(4) [Array(8), Array(8), Array(8), Array(5)]
//0: (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
//1: (8) [5000, 3400, -150, -790, -3210, -1000, 8500, -30]
//2: (8) [200, -200, 340, -300, -20, 50, 400, -460]
//3: (5) [430, 1000, 700, 50, 90]
//! 1.
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);
console.log(bankDepositSum); //25180

//! 2.
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;
console.log(accounts.flatMap(acc => acc.movements).filter(mov => mov >= 1000));
//(6) [3000, 1300, 5000, 3400, 8500, 1000]

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  //.reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
console.log(numDeposits1000); //6

//* Prefixed ++ operator
let a = 10;
console.log(a++); //10
console.log(a); //11
console.log(++a); //12

//! 3.
const { deposit, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposit += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposit' : 'withdrawals'] += cur;
      return sums;
    },
    { deposit: 0, withdrawals: 0 }
  );
console.log(deposit, withdrawals); //25180 -7340

//! 4.
//* this is a nice title -> This Is n Nice TiTle
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};
console.log(convertTitleCase('this is a nice title'));
//This Is a Nice Title
console.log(convertTitleCase('this is a nice LONG title but not too long'));
//This Is a Nice Long Title but Not Too Long
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
//and Here Is Another Title with an Example
*/
/**
 * * Coding Challenge #4
 * ? Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
 * ? Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
 * ? Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).
 * TODO Your tasks:
 * todo 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do not create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
 * todo 2. Find Sarah's dog and log to the console whether it's eating too much or too little.
 * ! Hint: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
 * todo 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
 * todo 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
 * todo 5. Log to the console whether there is any dog eating exactly the amount of food that is recommended (just true or false)
 * todo 6. Log to the console whether there is any dog eating an okay amount of food (just true or false)
 * todo 7. Create an array containing the dogs that are eating an okay amount of food (try to reuse the condition used in 6.)
 * todo 8. Create a shallow copy of the 'dogs' array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects 😉)
 * ! Hints:
 * ! Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
 * ! Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion
 **/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
//todo 1
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);
//(4) [{…}, {…}, {…}, {…}]
//0: {weight: 22, curFood: 250, owners: Array(2), recFood: 284}
//1: {weight: 8, curFood: 200, owners: Array(1), recFood: 133}
//2: {weight: 13, curFood: 275, owners: Array(2), recFood: 191}
//3: {weight: 32, curFood: 340, owners: Array(1), recFood: 376}
//todo 2
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
//{weight: 13, curFood: 275, owners: Array(2), recFood: 191}
console.log(
  `Sarah's dog is eating ${
    dogSarah.curFood > dogSarah.recFood ? 'mush' : 'little'
  }`
);
//Sarah's dog is eating mush
//todo 3
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
//.flat();
console.log(ownersEatTooMuch);
//(3) ["Matilda", "Sarah", "John"]

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);
//(3) ["Alice", "Bob", "Michael"]
//todo 4
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
//Matilda and Sarah and John's dogs eat too much!
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);
//Alice and Bob and Michael's dogs eat too little!
//todo 5
console.log(dogs.some(dog => dog.curFood === dog.recFood));
//false
//todo 6
// console.log(
//   dogs.some(
//     dog => dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1
//   )
// );
const checkEatingOkay = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;
console.log(dogs.some(checkEatingOkay));
//true
//todo 7
console.log(dogs.filter(checkEatingOkay));
//[{…}]
// 0:
// curFood: 340
// owners: ["Michael"]
// recFood: 376
// weight: 32
// __proto__: Object
//todo 8
//* sort it by recommended food portion in an ascending order [1, 2, 3]
const dogsSorts = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorts);
//(4) [{…}, {…}, {…}, {…}]
// 0:
// curFood: 200
// owners: ["Matilda"]
// recFood: 133
// weight: 8
// __proto__: Object
// 1:
// curFood: 275
// owners: (2) ["Sarah", "John"]
// recFood: 191
// weight: 13
// __proto__: Object
// 2:
// curFood: 250
// owners: (2) ["Alice", "Bob"]
// recFood: 284
// weight: 22
// __proto__: Object
// 3:
// curFood: 340
// owners: ["Michael"]
// recFood: 376
// weight: 32
// __proto__: Object
