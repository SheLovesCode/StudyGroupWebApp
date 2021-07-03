# Node.js Coding Style Guide
* Reference: https://github.com/felixge/node-style-guide
* Reference: https://www.perfomatix.com/nodejs-coding-standards-and-best-practices-node-js-development-company/

## Introduction

Below are the Node.js coding style guidelines used throughout the project for Group-012

---

# Project Structure Practices

## Project Structure:

The project needs to make sure that the structure is not clustered by partitioning dependencies 
in their respective folders (components) and code base.

The structure for the project is as follows:
- _test_ folder:
	- contains only test files such as `.spec.js files` or `.test.js files`
- documentation folder:
	- containing important documentations such as the coding `style` and `review` guide, the 
	  projects `Sprints`, `the User Story Map` and the `ADR` for the project.
- public folder:
	- contains the `.css` files
- utils folder:
	- contains external resources such as `.jpg` files used.
- src folder:
	- contains the `.js` files
- views folder:
	- contains the `.html` or `.ejs` files

## Separate Express app.js file and server.js file:

Avoid putting the server side (Network side) of the project with the app side (API) in one entire file. Rather split them
into different files for better structure.

## Environment variables

A good structure makes sure that all security information is hidden from source code. In order to do such
the use of environment variables are very much recommended. The use of .env are highly recommmended.

---
# Error Handling Practices

## Use Async-Await for error handling

When handling errors, use reputable libraries or the `asyn-await` function. They enable the use of the functionality,
try and catch which assist to avoid callbacks. Below a format is provided.

```js

Code Example - using async/await to catch errors

async function executeAsyncTask () {

  try {

    const valueA = await functionA();

    const valueB = await functionB(valueA);

    const valueC = await functionC(valueB);

    return await functionD(valueC);

  }

  catch(err) {

    logger.error(err);

  }

}

```

# Coding Style Practices

## Formatting
* use editorconfig.org to enforce the formatting settings in your editor
* `2 Spaces for indentation`


## Newlines
* Use UNIX-style newlines (\n), and a newline character as the last character of a file.

* No trailing whitespace

* Use Semicolons

* 80 characters per line

* Use single quotes

*Right:*

```js
var foo = 'bar';
```

*Wrong:*

```js
var foo = "bar";
```

## Opening braces go on the same line
* Your opening braces go on the same line as the statement.

*Right:*

```js
if (true) {
  console.log('winning');
}
```

*Wrong:*

```js
if (true)
{
  console.log('losing');
}
```
## Declare one variable per var statement

*Right:*

```js
var keys   = ['foo', 'bar'];
var values = [23, 42];

var object = {};
while (keys.length) {
  var key = keys.pop();
  object[key] = values.pop();
}
```

*Wrong:*

```js
var keys = ['foo', 'bar'],
    values = [23, 42],
    object = {},
    key;

while (keys.length) {
  key = keys.pop();
  object[key] = values.pop();
}
```

## Naming Conventions
* Use lowerCamelCase for variables, properties and function names

*Right:*

```js
var adminUser = db.query('SELECT * FROM users ...');
```

*Wrong:*

```js
var admin_user = db.query('SELECT * FROM users ...');
```

## Conditionals
* Use the === operator

*Right:*

```js
var a = 0;
if (a !== '') {
  console.log('winning');
}
```
*Wrong:*

```js
var a = 0;
if (a == '') {
  console.log('losing');
}
```
## Use UpperCamelCase for class names
Class names should be capitalized using UpperCamelCase.

*Right:*

```js
function BankAccount() {
}
```

*Wrong:*

```js
function bank_Account() {
}
```

## Variables
### Object / Array creation
* Use trailing commas and put short declarations on a single line. Only quote keys when your interpreter complains:


*Right:*

```js
var a = ['hello', 'world'];
var b = {
  good: 'code',
  'is generally': 'pretty',
};
```

*Wrong:*

```js
var a = [
  'hello', 'world'
];
var b = {"good": 'code'
        , is generally: 'pretty'
        };
```

## Use multi-line ternary operator
* The ternary operator should not be used on a single line. Split it up into multiple lines instead.

*Right:*

```js
var foo = (a === b)
  ? 1
  : 2;
```

*Wrong:*

```js
var foo = (a === b) ? 1 : 2;
```

## Use descriptive conditions

*Right:*
```js
var isValidPassword = password.length >= 4 && /^(?=.*\d).{4,}$/.test(password);

if (isValidPassword) {
  console.log('winning');
}
```

*Wrong:*
```j
if (password.length >= 4 && /^(?=.*\d).{4,}$/.test(password)) {
  console.log('losing');
}
```
## Name your closures

*Right:*

```js
req.on('end', function onEnd() {
  console.log('winning');
});
```

*Wrong:*

```js
req.on('end', function() {
  console.log('losing');
});
```

### Method chaining
*One method per line should be used to chain methods.

*Right:*

```js
User
  .findOne({ name: 'foo' })
  .populate('bar')
  .exec(function(err, user) {
    return true;
  });
```

*Wrong:*

```js
User
.findOne({ name: 'foo' })
.populate('bar')
.exec(function(err, user) {
  return true;
});

User.findOne({ name: 'foo' })
  .populate('bar')
  .exec(function(err, user) {
    return true;
  });

User.findOne({ name: 'foo' }).populate('bar')
.exec(function(err, user) {
  return true;
});

User.findOne({ name: 'foo' }).populate('bar')
  .exec(function(err, user) {
    return true;
  });
```


## Comments
* Use slashes for comments

*Right:*

```js
// 'ID_SOMETHING=VALUE' -> ['ID_SOMETHING=VALUE', 'SOMETHING', 'VALUE']
var matches = item.match(/ID_([^\n]+)=([^\n]+)/));

// This function has a nasty side effect where a failure to increment a
// redis counter used for statistics will cause an exception. This needs
// to be fixed in a later iteration.
function loadUser(id, cb) {
  // ...
}

var isSessionValid = (session.expires < Date.now());
if (isSessionValid) {
  // ...
}
```

*Wrong:*

```js
// Execute a regex
var matches = item.match(/ID_([^\n]+)=([^\n]+)/);

// Usage: loadUser(5, function() { ... })
function loadUser(id, cb) {
  // ...
}

// Check if the session is valid
var isSessionValid = (session.expires < Date.now());
// If the session is valid
if (isSessionValid) {
  // ...
}
```
---
# Testing Practices

The mininmum requirement with regards to testing is to at least have API (component) testing.

## Test structure

Test must be structured using the AAA pattern (Arrange, Act, Assert).



*Right:*

```js
describe.skip('Customer classifier', () => {

    test('When customer spent more than 500$, classify as premium', () => {

        //Arrange

        const customerToClassify = {spent:505, joined: new Date(), id:1}

        const DBStub = sinon.stub(dataAccess, "getCustomer")

            .reply({id:1, classification: 'regular'});

        //Act

        const receivedClassification = customerClassifier.classifyCustomer(customerToClassify);

        //Assert

        expect(receivedClassification).toMatch('premium');

    });

});
```

*Wrong:*

```js
test('Should be classified as premium', () => {

        const customerToClassify = {spent:505, joined: new Date(), id:1}

        const DBStub = sinon.stub(dataAccess, "getCustomer")

            .reply({id:1, classification: 'regular'});

        const receivedClassification = customerClassifier.classifyCustomer(customerToClassify);

        expect(receivedClassification).toMatch('premium');

    });
```

## Test must be tagged

Each test must have been completed for each sprint and different conditions/scenarios.
for example: IO test when commits are done.

## Test must be done using coverage tools

Test coverage tools are beneficial as the help automate CI/CD integration. They assist
identifying testing errors and mismatches (Previous working tests not working with the new implementations done
within the project). It also provides deployment protection as it prevents the production build of failing/failed
implementations. 

---

# Production Practices

## Get your frontend assets out of Node

For front end development do not use tools such as (CDN,nginx,S3) as they provide static 
files which are detrimental the Node performance.

## Set NODE_ENV

To prevent important security information or detail from being leaked use environment
variables where possible.