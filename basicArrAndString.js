// Binary Search
// const binarySearch = (array, target)=> {
//     if(!array || array.length === 0 || !target){
//         return -1
//     }

//     let start = 0;
//     let end = array.length - 1;

//     while (start <= end){
//         let mid = Math.floor((start + end) / 2);

//         if(target === array[mid]){
//             return mid
//         }else if(target < array[mid]){
//             end = mid - 1
//         }else{
//             start = mid + 1
//         }
//     };

//     return -1
// }


// const index = binarySearch([1, 2, 3, 4, 5, 6, 7, 8], 5);

// if(index === -1){
//     console.log("Target not found")
// }else{
//     console.log("Target found", index)
// }

/////////////////////////////////////////////////////////////////////////////////////////

// Linear Search
// function linearSearch(array, target) {
//     // Check for empty array or invalid input
//     if (array.length === 0 || target === null) {
//         return -1;
//     }

//     // Loop through each element of the array
//     for (let i = 0; i < array.length; i++) {
//         // Check if the current element is the target
//         if (array[i] === target) {
//             return i; // Return the index if found
//         }
//     }

//     // Target not found
//     return -1;
// }

// // Example usage
// const numbers = [2, 4, 1, 7, 3];
// const target = 7;
// const index = linearSearch(numbers, target);

// if (index !== -1) {
//     console.log(`Target found at index: ${index}`);
// } else {
//     console.log(`Target not found in the array`);
// }

//////////////////////////////////////////////////////////////////////////////////////////////////

// Normal Sorting using sort() method
// 1.
// const numbers = [5, 2, 8, 1, 4];

// const sortedNumbers = Array.from(numbers).sort();
// console.log(numbers); // Output: [5, 2, 8, 1, 4] (original remains unchanged)
// console.log(sortedNumbers); // Output: [1, 2, 4, 5, 8]

// 2.
// const numbers = [5, 2, 8, 1, 4];

// // Default sorting (ascending order)
// numbers.sort();
// console.log(numbers); // Output: [1, 2, 4, 5, 8]

// // Sorting in descending order with a comparison function
// function compareDescending(a, b) {
//   return b - a; // Sort by subtracting to get descending order
// }

// numbers.sort(compareDescending);
// console.log(numbers); // Output: [8, 5, 4, 2, 1]

////////////////////////////////////////////////////////////////////////////////////

// Check if a number is Prime

// function isPrimeNaive(num) {
//     if (num <= 1) return false; // 1 or less are not prime
//     if (num <= 3) return true; // 2 and 3 are prime

//     // Iterate through potential divisors (up to the square root)
//     for (let i = 2; i * i <= num; i++) {
//         if (num % i === 0) {
//             return false; // Divisible by a number, not prime
//         }
//     }

//     return true; // No divisors found, prime
// }

// // Example usage
// const number = 11;
// if (isPrimeNaive(number)) {
//     console.log(`${number} is a prime number`);
// } else {
//     console.log(`${number} is not a prime number`);
// }

///////////////////////////////////////////////////////////////////////////////////////////////

// Find smallest number in an array
// 1. 
// function findSmallest(array) {
//     // Check for empty array or invalid input
//     if (array.length === 0) {
//         return null; // Handle empty array
//     }

//     // Initialize smallestNumber with the first element
//     let smallestNumber = array[0];

//     // Loop through the array
//     for (let i = 1; i < array.length; i++) {
//         // Update smallestNumber if a smaller element is found
//         if (array[i] < smallestNumber) {
//             smallestNumber = array[i];
//         }
//     }

//     return smallestNumber;
// }

// // Example usage
// const numbers = [5, 2, 8, 1, 4];
// const smallest = findSmallest(numbers);
// console.log(`Smallest number: ${smallest}`); // Output: Smallest number: 1

// 2.
// function findSmallestUsingMin(array) {
//     // Check for empty array or invalid input (same as above)
//     if (array.length === 0) {
//         return null;
//     }

//     // Use Math.min with spread operator
//     const smallest = Math.min(...array);
//     return smallest;
// }

///////////////////////////////////////////////////////////////////////////////////////

// Reverse an Array
// 1. 
// const reverse = (arr)=> {
//     return [...arr].reverse()
// };

// console.log(reverse([1,2,3,4]))

// 2. 
// const reverse = (arr)=> {
//     let reversedArr = [];
//     for(let i = 0; i<arr.length; i++){
//         reversedArr.unshift(arr[i])
//     };

//     return reversedArr
// };

// console.log(reverse([1,2,3,4]))

// 3. 
// const numbers = [1, 2, 3, 4, 5];
// numbers.reverse();
// console.log(numbers);

// 4. 
// function reverseArray(array) {
//     // Loop through half of the array
//     for (let i = 0; i < Math.floor(array.length / 2); i++) {
//         // Swap elements using destructuring assignment
//         [array[i], array[array.length - 1 - i]] = [array[array.length - 1 - i], array[i]];
//     }
//     return array;
// }

// // Example usage
// const numbers = [1, 2, 3, 4, 5];
// const reversed = reverseArray(numbers);
// console.log(reversed); // Output: [5, 4, 3, 2, 1]


//////////////////////////////////////////////////////////////////////////////////////////////////

// Find the duplicates in the array
// 1. Using hash map
// function findDuplicatesUsingObject(arr) {
//     const duplicates = {};

//     for (let i = 0; i < arr.length; i++) {
//         if (duplicates[arr[i]]) {
//             duplicates[arr[i]]++;
//         } else {
//             duplicates[arr[i]] = 1;
//         }
//     }

//     const duplicateNumbers = [];
//     for (const key in duplicates) {
//         if (duplicates[key] > 1) {
//             duplicateNumbers.push(key);
//         }
//     }

//     return duplicateNumbers;
// }

// const numbers = [1, 2, 3, 4, 2, 7, 8, 1, 8];
// const duplicateNumbers = findDuplicatesUsingObject(numbers);
// console.log(duplicateNumbers); // Output: [1, 2, 8]

// 2. Using set
// function findDuplicatesUsingSet(arr) {
//     const duplicates = new Set();

//     for (let i = 0; i < arr.length; i++) {
//         if (duplicates.has(arr[i])) {
//             duplicates.add(arr[i]); // Add again to show duplicates (optional)
//         } else {
//             duplicates.add(arr[i]);
//         }
//     }

//     // Convert Set to array for easier output (optional)
//     return Array.from(duplicates);
// }

// const numbers = [1, 2, 3, 4, 2, 7, 8, 1, 8];
// const duplicateNumbers = findDuplicatesUsingSet(numbers);
// console.log(duplicateNumbers); // Output: [1, 2, 8] (only unique duplicates are shown once)


//////////////////////////////////////////////////////////////////////////////////////////////////

// Find the missing numbers. arr1 has some numbers which are not present in arr2, find them

// const findMinssing = (arr1, arr2)=> {
//     let missing = []
//     for (let i = 0; i < arr1.length - 1; i++){
//         if(!arr2.includes(arr1[i])){
//             missing.push(arr1[i])
//         }
//     }

//     return missing
// };

// const x = findMinssing([1,2,3,4], [1,3,4,5]);

// console.log(x);



//////////////////////////////////////////////////////////////////////////////////////////////////

// Bubble Sort

// const arr = [4,1,2,5,3]

// function bubbleSort(arr) {

//     for (var i = 0; i < arr.length; i++) {

//         // Last i elements are already in place  
//         for (var j = 0; j < (arr.length - i - 1); j++) {

//             // console.log(j);
            

//             // Checking if the item at present iteration 
//             // is greater than the next iteration
//             if (arr[j] > arr[j + 1]) {

//                 // If the condition is true
//                 // then swap them
//                 var temp = arr[j]
//                 arr[j] = arr[j + 1]
//                 arr[j + 1] = temp
//             }

//             // console.log(arr);
            
//         }

//         console.log(arr);
        
//     }

//     // Print the sorted array
//     // console.log(arr);
// }

// const sortedArr = bubbleSort(arr)

// Optimized way

// function bubbleSort(array) {
//     const arrayLength = array.length;
//     let isSwapped;

//     for (let i = 0; i < arrayLength; i++) {
//         isSwapped = false;

//         for (let j = 0; j < arrayLength - i - 1; j++) {
//             if (array[j] > array[j + 1]) {
//                 // Swap elements
//                 [array[j], array[j + 1]] = [array[j + 1], array[j]];
//                 isSwapped = true;
//             }
//         }

//         // If no two elements were swapped in the inner loop, array is sorted
//         if (!isSwapped) 
//             break;
//     }

//     return array;
// }

// // Test the function
// const sortedArray = bubbleSort([45, 23, 3, 5346, 5, 356, 243, 35]);
// console.log("Sorted Array:");
// console.log(sortedArray);

/////////////////////////////////////////////////////////////////////////////////////////////////
