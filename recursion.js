// Print 5 to 0

// const printDown = (num)=> {

//     if(num < 0){
//         return 
//     };

//     console.log(num);
    

//     printDown(num - 1)
// };


// printDown(5);


////////////////////////////////////////////////////////////////////////////////

// Reverse a String

const reverseString = (text)=> {
    let revStr = [];
    let cursor = 0;

    if(cursor === text.length - 1){
        return revStr.join("")
    };

    revStr.push(text[cursor])

    cursor++

    return reverseString(text)
}

console.log(reverseString("tanuj"));
