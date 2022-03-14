"use strict";
const account1 = {
  owner: "chizoba Ukaoha",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale:  "en-US", // de-DE
};
const account2 = {
  owner: "Stanly Ibe",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "pt-PT",
};
const account3 = {
  owner: "Grace Johnson",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  Dates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};
const account4 = {
  owner: "Aka Favor",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  Dates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};
const accounts = [account1, account2, account3, account4];

const bankContainer = document.querySelector(".bank");
const containerMovements = document.querySelector(".movements");

const welcome = document.querySelector(".login-p");
const labelDate = document.querySelector(".date");
const labelValue = document.querySelector(".balance__value");
const summayValIn = document.querySelector(".summary__value--in");
const summayValOut = document.querySelector(".summary__value--out");
const summayValInterest = document.querySelector(".summary__value--interest");
const Labeltimer = document.querySelector(".timer");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const formatDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "yestarday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    /*const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; */
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const displayMovement = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);

    const displayDate = formatDate(date, acc.locale);

    const html = `           
<div class="movements__row">
  <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
  <div class="movements__date">${displayDate}</div>
  <div class="movements__value">${mov.toFixed(2)}💲</div>
</div>
`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// displayMovement(account1.movements);
console.log(containerMovements.innerHTML);

// using reduce method
const calDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(
    (accumulator, mov) => accumulator + mov,
    0
  );
  labelValue.textContent = `${acc.balance.toFixed(2)}💲`;
};
// calDisplayBalance(account1.movements);

const displaySummary = function (acc) {
  const income = acc.movements
    .filter((mov) => mov > 0)
    .reduce((accumulator, mov) => accumulator + mov, 0);
  summayValIn.textContent = `${income.toFixed(2)}💲`;

  const outCome = acc.movements
    .filter((mov) => mov < 0)
    .reduce((accumulator, mov) => accumulator + mov, 0);
  summayValOut.textContent = `${Math.abs(outCome.toFixed(2))}💲`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((init, i, arr) => {
      return init >= 1;
    })
    .reduce((accumulator, init) => accumulator + init, 0);
  summayValInterest.textContent = `${interest.toFixed(2)}💲`;
};
// displaySummary(account1.movements);

const computeUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map(function (names) {
        return names[0];
      })
      .join("");
  });
};
computeUserName(accounts);
console.log(accounts);

// uddate UI
const updateUI = function (acc) {
  displayMovement(acc);
  calDisplayBalance(acc);
  displaySummary(acc);
};

const setLogOutTimer = function () {
  let time = 120;
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const secondss = String(Math.trunc(time % 60)).padStart(2, 0);

    // print the remaining call to ui in each call
    Labeltimer.textContent = `${min}:${secondss}`;
    // decrease time
    time--;
    // log out timer when zero
    if (time === 0) {
      clearInterval(timer);
      welcome.textContent = "Login to get started";
      bankContainer.style.opacity = 0;
    }
  };

  // call timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

// login function
let currentAccount, timer;

/* Always logged in
currentAccount = account1;
updateUI(currentAccount);
bankContainer.style.opacity = 100;
*/

// experimenting API
const now = new Date();
const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "long",
  year: "numeric",
  weekday: "long",
};
labelDate.textContent = new Intl.DateTimeFormat("en-US", options).format(now);

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  // console.log('loging');
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    welcome.textContent = `Welcome back ${currentAccount.owner.split(" ")[0]}`;
    bankContainer.style.opacity = 100;

    // create current date and time
  
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    if (timer) clearInterval(timer);
    timer = setLogOutTimer();

    updateUI(currentAccount);
  }
});

// transfer function
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  // console.log("login");

  const amount = Number(inputTransferAmount.value);
  const reciverAccc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  console.log(amount, reciverAccc);
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    reciverAccc &&
    currentAccount.balance >= amount &&
    reciverAccc?.username !== currentAccount.username
  ) {
    console.log("transfer valid");
    currentAccount.movements.push(-amount);
    reciverAccc.movements.push(amount);

    // add transfer
    currentAccount.movementsDates.push(new Date().toISOString());
    reciverAccc.movementsDates.push(new Date().toISOString());

    // updating the ui
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer) 
    timer = setLogOutTimer();
  }
});

// close function
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  // console.log("delete");

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const indexAcc = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(indexAcc);
    accounts.splice(indexAcc, 1);
    welcome.textContent = "Login to get started";

    bankContainer.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = " ";
});

// loan function
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("loan");
  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some((mov) => mov >= amount / 10))
    setTimeout(function () {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUI(currentAccount);

      // Reset timer
    clearInterval(timer) 
    timer = setLogOutTimer();
    }, 2500);

  inputLoanAmount.value = "";
});
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovement(currentAccount.acc, !sorted);
  sorted = !sorted;
});
labelValue.addEventListener("click", function () {
  [...document.querySelectorAll(".movements__row")].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = "red";
    if (i % 3 === 0) row.style.backgroundColor = "blue";
  });
});
