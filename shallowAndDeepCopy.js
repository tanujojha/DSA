// 1. Shallow Copy with Spread Operator (Simple Case)

// The spread operator only does a shallow copy. That means it will copy properties at the top level, but nested objects or arrays will still be references to the original ones. This can lead to mutations in nested objects unless you explicitly handle them.

// Here's an example with a shallow copy:

// const x = {
//     name: "Tom",
//     address: { street: "123 Main St", city: "Springfield" }
// };
  
// // Shallow copy using spread operator
// const y = { ...x, name: "Dick" };

// console.log(x.name); // "Tom" (unchanged)
// console.log(y.name); // "Dick" (updated)

// console.log(x.address === y.address); // true, because the nested `address` is still a reference to the same object

// // If we mutate the nested `address` in `y`, it will also affect `x`
// y.address.street = "456 Elm St";

// console.log(x.address.street); // "456 Elm St" (mutated because it's the same object reference)
// console.log(y.address.street); // "456 Elm St" (mutated)


// 2. Deep Copy with JSON.parse() and JSON.stringify()

// To make sure that nested objects are copied and don't retain references, you can perform a deep copy. A simple way is by using JSON.parse() and JSON.stringify(), but this approach has limitations (it doesn't handle non-serializable values like undefined, functions, or Date objects properly).
// const x = {
//     name: "Tom",
//     address: { street: "123 Main St", city: "Springfield" }
// };
  
// // Deep copy using JSON.parse() and JSON.stringify()
// const y = JSON.parse(JSON.stringify(x));

// y.name = "Dick";
// y.address.street = "456 Elm St";

// console.log(x.name); // "Tom" (unchanged)
// console.log(y.name); // "Dick" (updated)

// console.log(x.address.street); // "123 Main St" (unchanged)
// console.log(y.address.street); // "456 Elm St" (updated)

// 3. Manual Deep Copy

// If you want more control and want to avoid the limitations of JSON.parse() / JSON.stringify(), you can implement a manual deep copy using recursion.
  
// const x = {
//     name: "Tom",
//     address: { street: "123 Main St", city: "Springfield" }
// };
  
// // Manual deep copy function
// function deepCopy(obj) {
// if (obj === null || typeof obj !== "object") {
//     return obj; // Return primitive value as-is
// }

// // Create a new object or array
// const newObj = Array.isArray(obj) ? [] : {};

// // Recursively copy properties
// for (let key in obj) {
//     if (obj.hasOwnProperty(key)) {
//     newObj[key] = deepCopy(obj[key]); // Recursively copy nested objects
//     }
// }

// return newObj;
// }

// // Perform deep copy
// const y = deepCopy(x);

// y.name = "Dick";
// y.address.street = "456 Elm St";

// console.log(x.name); // "Tom" (unchanged)
// console.log(y.name); // "Dick" (updated)

// console.log(x.address.street); // "123 Main St" (unchanged)
// console.log(y.address.street); // "456 Elm St" (updated)
  