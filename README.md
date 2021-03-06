# Cali
[![Build Status](https://travis-ci.org/jedirandy/cali.svg?branch=master)](https://travis-ci.org/jedirandy/cali)
[![dependencies](https://david-dm.org/jedirandy/cali.svg)](https://david-dm.org/jedirandy/cali)
[![npm module](https://badge.fury.io/js/cali.svg)](https://www.npmjs.org/package/cali)
[![codecov.io](https://codecov.io/github/jedirandy/cali/coverage.svg?branch=master)](https://codecov.io/github/jedirandy/cali?branch=master)

A JS utility library in FP style

## Installation
```npm install cali```

## Usage
the library can be imported by AMD, CommonJS or ES6 loaders, or as the global variable 'cali'

```js
// ES6
import * as cali from 'cali';
// CommonJS
var cali = require('cali');
```

## API

### Functions

#### Curry

takes a function and returns a function that's automatically curried
```js
let curriedSum = curry((a,b,c) => a + b + c);
curriedSum(1)(2)(3) === 6; // true
```

#### Identity

takes a value and returns it
```js
let obj = {};
identity(obj) === obj; // true
```

#### Compose

composes functions, executes each sequentially starting from the right most function

```js
compose(a => a * 2, a => a + 1)(5) === 12
```

#### Map

maps over a collection, automatically curried

```js
map(a => a * 2)([1,2,3]) // [2,4,6]
```

### Functors, Applicative, Monads

#### Functor

general functor
```js
let functor = new Functor(1);
functor.fmap(a => a * 2) // Functor(2)
```

function functor
```js
let functor = new Functor(a => a + 1);
let f = functor.fmap(a => a * 2) // f is equivalent to 'compose(a => a + 1, a => a * 2)'
f(2) === (2 + 1) * 2
```

#### Applicative

applicative functor
```js
let applicative = new Applicative(a => a + 1);
applicative.ap(new Applicative(2)) // Applicative(3)
```

#### Maybe

a container may have a value or nothing
```js
Just(2).bind(x => Just(2 * x)) // Just(4)
Just(2).bind(x => Nothing).bind(x => Just(x)) // Nothing
```
