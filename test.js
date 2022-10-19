// with property
function Animal(name, age, isMammal) {
    this.name = name;
    this.age = age;
    this.isMammal = isMammal;
}

function Rabbit() {
    this.eating = function() {
        return `${this.name} sedang makan!`;
    }
}

Rabbit.prototype = new Animal("rabbit", 110, true);

function Eagle() {
    this.flying = function() {
        return `${this.name} sedang terbang!`;
    }
}

Eagle.prototype = new Animal("Eagle", 20, false);

/////////////

class Animal {
    constructor(name, age, isMammal) {
        this.name = name;
        this.age = age;
        this.isMammal = isMammal;
    }
}

class Rabbit extends Animal {
    constructor(name, age) {
        super(name, age, true);
    }

    isEat() {
        return `${this.name} sedang makan!`;
    }
}

class Eagle extends Animal {
    constructor(name, age) {
        super(name, age, false);
    }

    isFly() {
        return `${this.name} sedang terbang!`;
    }
}

const myRabbit = new Rabbit("Labi", 2);
const myEagle = new Eagle("Elo", 4);

console.log(myRabbit.isEat());
console.log(myEagle.isFly());

//////////////
const names = ['Harry', 'Ron', 'Jeff', 'Thomas'];

const arrayMap = (arr, action) => {
  const loopTrough = (arr, action, newArray = [], index = 0) => {
    const item = arr[index];
    if(!item) return newArray;
    return loopTrough(arr, action, [...newArray, action(arr[index])], index + 1);
  }

  return loopTrough(arr, action);
}


const newNames = arrayMap(names, (name) => `${name}!` );

console.log({
    names,
    newNames,
});

/**
 * output:
 * {
 *   names: [ 'Harry', 'Ron', 'Jeff', 'Thomas' ],
 *   newNames: [ 'Harry!', 'Ron!', 'Jeff!', 'Thomas!' ]
 * }
 */

///////////////////

const books = [
    { title: 'The Da Vinci Code', author: 'Dan Brown', sales: 5094805 },
    { title: 'The Ghost', author: 'Robert Harris', sales: 807311 },
    { title: 'White Teeth', author: 'Zadie Smith', sales: 815586 },
    { title: 'Fifty Shades of Grey', author: 'E. L. James', sales: 3758936 },
    { title: 'Jamie\'s Italy', author: 'Jamie Oliver', sales: 906968 },
    { title: 'I Can Make You Thin', author: 'Paul McKenna', sales: 905086 },
    { title: 'Harry Potter and the Deathly Hallows', author: 'J.K Rowling', sales: 4475152 },
  ];
  
const greatAuthors = (books.filter((value) => value.sales > 1000000))
                    .map((data) => `${data.author} adalah penulis buku ${data.title} yang sangat hebat!`);
    
//////////////////////////
try {
	let user = JSON.parse(json);
	// jika variable tidak terisi key yang diinginkan
	if(!user.name) {
		throw new SyntaxError("'name' is required.");
	}
} catch(error) {

	if (error instanceof SyntaxError) {
		console.log(`JSON Error: ${error.message}`);
	} else if (error instanceof ReferenceError) {
		console.log(error.message);
     } else {
		console.log(error.message);
	}

} 
// TODO 1
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

// TODO 2
function validateNumberInput(a, b, c) {
    if(typeof a != 'number') {
        throw new ValidationError(`Argumen pertama harus number`);
    } else if(typeof b != 'number') {
        throw new ValidationError(`Argumen kedua harus number`);
    } else if(typeof c != 'number') {
        throw new ValidationError(`Argumen ketiga harus number`);
    }
}


const detectTriangle = (a, b, c) => {
    // TODO 3
    try {
        validateNumberInput(a,b,c);

        if (a === b && b === c) {
        return 'Segitiga sama sisi';
        }
    
        if (a === b || a === c || b === c) {
        return 'Segitiga sama kaki';
        }
    
        return 'Segitiga sembarang';
    } catch(error) {
        return error.message;
    }
  };
  

//   class NetworkError extends Error {
//     constructor(message) {
//       super(message);
//       this.name = 'NetworkError';
//     }
//   }
  
//   // TODO: 1
//   const fetchingUserFromInternet = (isOffline) => {
//     // setTimeout(() => {
//     //   if (isOffline) {
//     //     callback(new NetworkError('Gagal mendapatkan data dari internet'), null);
//     //   }
//     //   callback(null, { name: 'John', age: 18 });
//     // }, 500);

//     return new Promise((resolve, reject) => {
//         if(isOffline) {
//             reject(new NetworkError('Gagal mendapatkan data dari internet'));
//         }
//         resolve({ name: 'John', age: 18 });
//     })
//   };
  
  
//   // TODO: 2
//   const gettingUserName = () => {
//     // fetchingUserFromInternet((error, user) => {
//     //   if (error) {
//     //     return error.message;
//     //   }
//     //   return user.name;
//     // }, false);
//     fetchingUserFromInternet(false)
//         .then((error, user) => {
//             if (error) {
//                 return error.message;
//             }
//             return user.name;
//         });
//   };

  
  
  class NetworkError extends Error {
    constructor(message) {
      super(message);
      this.name = 'NetworkError';
    }
  }
  
   // TODO: 1
    const fetchingUserFromInternet = (isOffline) => {
      return new Promise((resolve, reject) => {
         setTimeout(()=> {
            if (isOffline) {
              reject(new NetworkError('Gagal mendapatkan data dari internet'));
            } 
              resolve({name: 'John', age: 18});
            }, 500);
      })
    };
    
    
    // TODO: 2
    const gettingUserName = () => {
      fetchingUserFromInternet(false)
          .then((user) => {
              return user.name;
          })
          .catch((error) => {
                return error.message;
          });
    };
  
    async function gettingUserName(isOffline) {
        try {
          const user = await fetchingUserFromInternet(false); 
          return user.name;
        } catch (error) {  
          return error.message;
        }
      }


let firstName = "Izal";
let lastNAME = "Aqua";
let age = 23;
let isMarried = true;

if (score <= 60) {
  score = "Anda mendapatkan nilai E.";
} else if(score > 60 && score < 70) {
  score =  "Anda mendapatkan nilai D.";
} else if(score > 70 && score < 80) { 
  score = "Anda mendapatkan nilai C.";
} else if(score > 80 && score < 90) {
  score = "Anda mendapatkan nilai B.";
} else {
  score = "Selamat! Anda mendapatkan nilai A";
}

if (score >= 90) {
  score = "Selamat! Anda mendapatkan nilai A";
} else if(score > 80 && score <= 89) {
  score = "Anda mendapatkan nilai B.";
} else if(score > 70 && score <= 79) {
  score = "Anda mendapatkan nilai C.";
} else if(score > 60 && score <= 69) {
  score = "Anda mendapatkan nilai D.";
} else if(score <= 60) {
  score = "Anda mendapatkan nilai E.";
}


const restaurant = {
  name: "Izal",
  city: "Yogyakarta",
  "favorite drink": "vanilla",
  "favorite food": "Martabak",
  "isVegan": false,
};

let name = restaurant.name;
let favoriteDrink = restaurant["favorite drink"]


let promise = new Promise(function(resolve, reject) {
	setTimeout(function() {
		resolve('Promise resolved')
	}, 4000);
});


async function asynFunc() {
	let result = await promise;
	console.log(result);	
	console.log('hello');
}

asyncFunc();


async function myFunction() {
	return "Hello";
};

myFunction().then(
	function(value) {myDisplayer(value)};
);	

// the keyword await make javascript wait until that promise settles and return its result.

// here's an example with a promise that revolves in 1 second

async function f() {
	let promise = new Promise((resolve, reject) => {
		setTimeout(() => resolve("Done!"), 1000);
	});

	let result = await promise;

alert(result);
}
const a = [];
for(let i = 2; i < 100; i+=2) a.push(i);

function minimal(a, b) {
  return a >= b ? a : b;
}

function power(a, b) {
  return a**b;
}
let promise = new Promise(function(resolve, reject) {
	setTimeout(function() {
		resolve('Promise resolved')
	}, 4000);
});


async function asynFunc() {
	let result = await promise;
	console.log(result);	
	console.log('hello');
}

asyncFunc();


async function myFunction() {
	return "Hello";
};

myFunction().then(
	function(value) {myDisplayer(value)};
);	

// the keyword await make javascript wait until that promise settles and return its result.

// here's an example with a promise that revolves in 1 second

async function f() {
	let promise = new Promise((resolve, reject) => {
		setTimeout(() => resolve("Done!"), 1000);
	});

	let result = await promise;

alert(result);
}