// DESTRUCTURING AN OBJECT
// =======================

// const person ={
// //  name : 'Nicolas',
//   age: 34,
//  // occupation: 'Blogger',
//   location: {
//     city: 'Madrid',
//     temp: 14
//   }
// }

// // default value and default value + variable renaming
// const {name = 'Anonymous',occupation: job = 'unknown job',age} = person;

// // variable renaming
// const {city,temp : temperature} = person.location;

// console.log(`${name} is ${age} and works as ${job}.`);
// console.log(`La temperatura en ${city} es de ${temperature}`);

// const book = {
//   title : 'Divergente',
//   author: 'Veronica Roth',
//   publisher: {
//     name: 'Vaya mierda Libros'
//   }
// }

// const {name : publisherName = 'Autoedición'} = book.publisher;

// console.log(publisherName);

// DESTRUCTURING AN ARRAY 
// =======================
const address = ['Calle Zurita 9','Madrid','Comunidad de Madrid',28012];

const [,city,state = 'Algun estado'] = address;

console.log(`You are in ${city}, ${state}`);

const item = ['Coffee (hot)','2.50','3','3.500'];
const [name,,mediumprice] = item;
console.log(`a medium ${name} costs ${mediumprice}`);


// DESTRUCTURING A FUNCTION AND ITS ARGUMENTS
// ==========================================
const add = ( { a, b } ) => {
  return a + b 
}
console.log('add',add({ a:4, b:23 }));