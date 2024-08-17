// 1. FIND THE LARGEST SUB ARRAY IN AN ARRAY OF NUMBERS

// arr = [1, 5, -2, 6, 3, -1, 6, 3, 6, -1, 4, 2, -5, 121]
// [1, 5] => 6
// [6, 3] => 9
// [6, 3, 6] => 15
// [4, 2] => 6
// [121] => 121

const arr = [1, 5, -2, 6, 3, -1, 6, 3, 6, -1, 4, 2, -5, 121]; // 14

const func = (arr)=>{
    let mapobj = {};
    let sum = 0;
    let subArr = [];

    for(let ind = 0; ind <= arr.length; ind++){
        
        if(arr[ind] > 0){
            sum += arr[ind];
            subArr.push(arr[ind]);
        }else if(arr[ind] < 0 || ind === arr.length){
            
            mapobj[subArr] = sum;
            sum = 0;
            subArr.length = 0
        }
    }

    const keyArr = Object.keys(mapobj);
    const valArr = Object.values(mapobj);
    
    const maxSum = Math.max(...valArr);
    const subAr = keyArr.find((key)=> mapobj[key] === maxSum);
    
    return {maxSum, subArr: subAr.split(",")}
    
}

console.log(func(arr));

//##################################################################################################################

// 2. 