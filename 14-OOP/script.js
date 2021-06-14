'use strict';
/*
//@@ Constructor Functions and the new Operator
//* 1. New {} is create
//* 2. function is called, this = {}
//* 3. {} linked to prototype
//* 4. function automatically return {}

//* 1. New {} is create
const Person = function (firstName, birthYear) {
  console.log(this); //Person {}
  //* 2. function is called, this = {}
  //* Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  //* Never to this
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};
//* 3. {} linked to prototype
const mooping = new Person('Mooping', 1988);
console.log(mooping); //person {firstName: "Mooping", birthYear: 1988}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);
//Person {firstName: "Matilda", birthYear: 2017}
//Person {firstName: "Jack", birthYear: 1975}

console.log(mooping instanceof Person); //true

//@@ Static Methods
Person.hey = function () {
  console.log('Hey there 🖐🏻'); //Hey there 🖐🏻
  console.log(this);
  // ƒ (firstName, birthYear) {
  //   console.log(this); //Person {}
  //   //* 2. function is called, this = {}
  //   //* Instance properties
  //   this.firstName = firstName;
  //   this.birthYear = birthYear;
  //
  //   //* Never to …
};
Person.hey();

//@@  Prototypes
console.log(Person.prototype); //{constructor: ƒ}
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
mooping.calcAge(); //49
matilda.calcAge(); //20

console.log(mooping.__proto__); //{calcAge: ƒ, constructor: ƒ}
console.log(mooping.__proto__ === Person.prototype); //true

console.log(Person.prototype.isPrototypeOf(mooping)); //true
console.log(Person.prototype.isPrototypeOf(matilda)); //true
console.log(Person.prototype.isPrototypeOf(Person)); //false

//* .prototypeOfLinkedObject
Person.prototype.species = 'Homo Sapiens';
console.log(mooping.species, matilda.species); //Homo Sapiens Homo Sapiens

console.log(mooping.hasOwnProperty('firstName')); //true
console.log(mooping.hasOwnProperty('species')); //first

//@@ Prototypal Inheritance on Built-In Objects
console.log(mooping.__proto__);
//{species: "Homo Sapiens", calcAge: ƒ, constructor: ƒ}

//* Object.prototype (top of prototype chain)
console.log(mooping.__proto__.__proto__);
//{constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
console.log(mooping.__proto__.__proto__.__proto__);
//null

console.dir(Person.prototype.constructor); //ƒ Person(firstName, birthYear)

const arr = [3, 6, 6, 5, 6, 9, 9];
console.log(arr.__proto__);
//[constructor: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, find: ƒ, …]
console.log(arr.__proto__ === Array.prototype);
//true

console.log(arr.__proto__.__proto__);
//{constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}

Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique()); //(4) [3, 6, 5, 9]

const h1 = document.querySelector('h1');
console.dir(x => x + 1); //anonymous()
*/
/**
 * * Coding Challenge #1
 * TODO Your tasks:
 * todo 1. Use a constructor function to implement a 'Car'. A car has a 'make' and a 'speed' property. The 'speed' property is the current speed of the car in km/h
 * todo 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console
 * todo 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console
 * todo 4. Create 2 'Car' objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them
 * ! Test data :
 * ! Data car 1: 'BMW' going at 120 km/h
 * ! Data car 2: 'Mercedes' going at 95 km/h
 **/
//todo 1
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
//todo 2
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed}`);
};

//todo 3
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed}`);
};
const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

//todo 4
bmw.accelerate(); //BMW is going at 130
bmw.accelerate(); //BMW is going at 140
bmw.brake(); //BMW is going at 135
bmw.accelerate(); //BMW is going at 145
/*
//@@ ES6 Classes
//* Class expression
// const PersonCl = class {};

//* class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  //* Instance method
  //* Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  greet() {
    console.log(`Hey ${this.firstName}`);
  }
  get age() {
    return 2037 - this.birthYear;
  }
  //* Set a property that already exists
  set fullName(name) {
    console.log(name);
    //Jessica Davis
    //Walter white
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name!`);
    }
  }
  get fullName() {
    return this._fullName;
  }
  //* Static method
  static hey() {
    console.log('Hey there 🖐🏻');
    console.log(this);
  }
}
const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
//PersonCl {_fullName: "Jessica Davis", birthYear: 1996}
jessica.calcAge(); //41
console.log(jessica.age);

console.log(jessica.__proto__ === PersonCl.prototype); //true

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
jessica.greet(); //Hey Jessica

//* 1. Classes are NOT hoisted
//* 2. Class are first-class citizes
//* 3. classes are executed in strict mode

const walter = new PersonCl('Walter white', 1965);

PersonCl.hey();
// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }
//   //* Instance method
//   //* Methods will be added to .prototype property
//   calcAge() …

//@@ Setters and Getters
const account = {
  owner: 'Mooping',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(mov) {
    this.movements.push(mov);
  },
};
console.log(account.latest); //300

account.latest = 50;
console.log(account.movements); //(5) [200, 530, 120, 300, 50]

//@@Object.create
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
// {}
// birthYear: 2002;
// name: 'Steven';
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge(); //35

console.log(steven.__proto__); //{calcAge: ƒ, init: ƒ}
console.log(steven.__proto__ === PersonProto); //true

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge(); //58
*/
/**
 * * Coding Challenge #2
 * TODO Your tasks:
 * todo 1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
 * todo 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6)
 * todo 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6)
 * todo 4. Create a new car and experiment with the 'accelerate' and 'brake' methods, and with the getter and setter.
 * ! Test data :
 * ! Data car 1: 'Ford' going at 120 km/h
 **/
//todo 1
// class CarCl {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }
//   accelerate() {
//     this.speed += 10;
//     console.log(`${this.make} is going at ${this.speed}`);
//   }
//   brake() {
//     this.speed -= 5;
//     console.log(`${this.make} is going at ${this.speed}`);
//   }
//   //todo 2
//   get speedUS() {
//     return this.speed / 1.6;
//   }
//   //todo 3
//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
// }
// const ford = new CarCl('Ford', 120);
// console.log(ford.speedUS); //75
//
// //todo 4
// ford.accelerate(); //Ford is going at 130
// ford.accelerate(); //Ford is going at 140
// ford.brake(); //Ford is going at 135
// ford.speedUS = 50;
// console.log(ford); //CarCl {make: "Ford", speed: 80}
/*
//@@ Inheritance Between "Classes": Constructor Functions
const Person = function (firstName, birthYear) {
  console.log(this);
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};
//* Linking prototype
// Student.prototype = Object.create(Person.prototype);
Student.prototype = Person.prototype;

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);
//Student {firstName: "Mike", birthYear: 2020, course: "Computer Science"}
mike.introduce();
//My name is Mike and I study Computer Science
mike.calcAge(); //17

console.log(mike.__proto__);
//{calcAge: ƒ, introduce: ƒ, constructor:}
console.log(mike.__proto__.__proto__);
//{constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}

console.log(mike instanceof Student); //true
console.log(mike instanceof Person); //true //false (311,322)
console.log(mike instanceof Object); //true

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);
//ƒ Person(firstName, birthYear)
*/
/**
 * * Coding Challenge #3
 * TODO Your tasks:
 * todo 1. Use a constructor function to implement an Electric Car (called 'EV') as a child "class" of 'Car'. Besides a make and current speed, the 'EV' also has the current battery charge in % ('charge' property)
 * todo 2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo'
 * todo 3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%'
 * todo 4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! Hint: Review the definiton of polymorphism 😉
 * ! Test data :
 * ! Data car 1: 'Tesla' going at 120 km/h, with a charge of 23%
 **/
// Challenge #1
// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };
//
// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} is going at ${this.speed}`);
// };
//
// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} is going at ${this.speed}`);
// };
//todo 2
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
//* Link the prototype
EV.prototype = Object.create(Car.prototype);

//todo 2
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

//todo 3
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}`
  );
};

const tesla = new EV('Tesla', 120, 23);
//todo 4
tesla.chargeBattery(90);
console.log(tesla);
//EV {make: "Tesla", speed: 120, charge: 90}
tesla.brake();
//Tesla is going at 115
tesla.accelerate();
//Tesla is going at 135 km/h, with a charge of 89
//Tesla is going at 125 (375)
/*
//@@Inheritance Between "Classes": ES6 Classes
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  //* Instance method
  //* Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  greet() {
    console.log(`Hey ${this.firstName}`);
  }
  get age() {
    return 2037 - this.birthYear;
  }
  //* Set a property that already exists
  set fullName(name) {
    console.log(name);
    //Jessica Davis
    //Walter white
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name!`);
    }
  }
  get fullName() {
    return this._fullName;
  }
  //* Static method
  static hey() {
    console.log('Hey there 🖐🏻');
    console.log(this);
  }
}
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    //* Alway needs to happen first
    super(fullName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }
  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student i feel more like ${
        2037 - this.birthYear + 10
      } `
    );
  }
}
// const martha = new StudentCl('Martha Jones', 2012); //Martha Jones
const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce(); //My name is Martha Jones and I study Computer Science
martha.calcAge(); //I'm 25 years old, but as a student i feel more like 35

//@@  Inheritance Between "Classes": Object.create
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};
const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);

StudentProto.init = function (firstname, birthYear, course) {
  PersonProto.init.call(this, firstname, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce(); //My name is Jay and I study Computer Science
jay.calcAge(); //27

//@@ Another Class Example
//@@ Encapsulation: Protected Properties and Methods
//@@ Encapsulation: Private Class Fields and Methods
//* 1.Public fields
//* 2.Private fields
//* 3.Public methods
//* 4.Private methods
//* (there is also the static version)
class Account {
  //* 1.Public fields (instances)
  locale = navigator.language;

  //*  2.Private fields (instances)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    (this.owner = owner),
      (this.currency = currency),
      //* Protected property
      (this.#pin = pin),
      //   (this._movements = []);
      // this.locale = navigator.language;

      console.log(`Thanks for opening an account, ${owner}`);
    //Thanks for opening an account, Jonas
  }
  //* 3.Public methods
  //* Public interface
  getMovements() {
    return this.#movements;
  }
  deposit(val) {
    this.#movements.push(val);
    return this;
  }
  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLone(val) {
    // if (this.#approveLone(val))
    if (this._approveLone(val)) {
      this.deposit(val);
      console.log('Lone Approved'); //Lone Approved
      return this;
    }
  }
  //* (there is also the static version)
  static helper() {
    console.log('Helper');
  }
  //* 4.Private methods
  // #approveLone(val)
  _approveLone(val) {
    return true;
  }
}
const acc1 = new Account('Jonas', 'EUR', 1111, []);

// acc1._movements.push(250);
// acc1._movements.push(-140);
// acc1.approveLone(1000);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLone(1000);
console.log(acc1.getMovements()); //(3) [250, -140, 1000]

console.log(acc1); //Account {owner: "Jonas", currency: "EUR", pin: 1111, movements: Array(2), locale: "th-TH"}

// console.log(acc1.#movements); error
// console.log(acc1.#pin); error
// console.log(acc1.#approveLone(100)); error
console.log(acc1._approveLone(100)); //true

Account.helper(); //Helper

//@@ Chaining Methods
//* Chaining
acc1.deposit(300).deposit(500).withdraw(35).requestLone(25000).withdraw(4000);
//Lone Approved
console.log(acc1.getMovements()); //(8) [250, -140, 1000, 300, 500, -35, 25000, -4000])
*/
/**
 * * Coding Challenge #3
 * TODO Your tasks:
 * todo 1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
 * todo 2. Make the 'charge' property private
 * todo 3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. Then experiment with chaining!
 * ! Test data :
 * ! Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%
 **/
//todo 1
// Challenge #2
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    //todo 3
    return this;
  }
  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}
// Challenge #3
class EVCl extends CarCl {
  //todo 2
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}
const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian); //EVCl {make: "Rivian", speed: 120, #charge: 23}
// console.log(rivian.#charge); error
rivian
  .accelerate() //Rivian is going at 140 km/h, with a charge of 22
  .accelerate() //Rivian is going at 160 km/h, with a charge of 21
  .accelerate() //Rivian is going at 180 km/h, with a charge of 20
  .brake() //Rivian is going at 175 km/h
  .chargeBattery(50)
  .accelerate(); //Rivian is going at 195 km/h, with a charge of 49
console.log(rivian.speedUS); //121.875
