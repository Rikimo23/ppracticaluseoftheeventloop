//PartOne: Stack Overflow
//Declare a global counter variable.
let counter = 0;

//Create a simple function that increments the variable, and then calls itself recursively.
function increment(){
    counter++;
    return increment()
}


//Surround the initial function call in a try/catch block.
try{
    increment()
}catch(e) {  //log the error and the value of the counter variable.
    console.log(`Error: ${e}`)
    console.log(`The value of the counter is ${counter}`)
}


// //PART TWO: Trampolines
 let nestedArray = [[1,5],[4,[5],6],[7,8,[9]]];


 //Recursive function that completely flattens an array of nested arrays, regardless of how deeply nested the arrays are.
const flatArray = (arr) => {
    let newArr = [];
    
    for(let i = 0; i < arr.length; i++ ){
        if(Array.isArray(arr[i])){
            newArr.push(...flatArray(arr[i]))
        }
        else{
            newArr.push(arr[i])
        }
    }
    return newArr;
}

console.log(flatArray(nestedArray))

//Function that takes two parameters the nested array and an empty array
const flatArrTwo = (arr, result = []) =>{
   
    //Check if the element in the array is a number or string
    if( typeof arr === 'number' || typeof arr === 'string'){ 
        return result.push(arr)

    }else{  //If it is an array it uses a for loop to iterate for each element.
        
        for(let i = 0; i< arr.length; i++){
            //If is an array, it recursively call the function
            if(Array.isArray(arr[i])){
            
                flatArrTwo(arr[i], result)
            
            }else{
                //Push elements that are not arrays
                result.push(arr[i])
            }
        }
    }

    //Return a new array
    return result;
}

// Trampoline the function flatArr
const trampoline = (f, ...args) => {
    let result = f(...args);
    while (typeof result === "function") {
      result = result();
    }
    return result;
  }

console.log(trampoline(flatArrTwo, nestedArray))


//PART THREE: Deferred Execution
/*Create a simple HTML element to hold text. Cache this HTML element into a JavaScript variable.
Once complete, use the alert() method to alert the user that the calculation is finished*/

//Target a html element and store it into a variable
let holdNum = document.querySelector(".primeNumDiv");

//Function to check wether a number is prime or not
const isPrime = (num) =>{

    if(num <= 1) return false;
    
    if(num >= 2){
        
        for(let i = 2; i < num; i++){
            
            if(num%i === 0){
                
                return false;
                
            }
        }l
    }
    return true;
}

// //Write a function that takes a parameter n and adds a list of all prime numbers between one and n to your HTML element.
const addPrimeNumbers = (n, count = 1, sum = 0) =>{

    //Base case to stop recursion and show an alert with the sum of all prime numbers
    if( count > n){
        window.alert(`Calculation is finished. The sum of all prime number is ${sum}`)
        return;
    }

    //If it is a prime number, add a h1 with the prime number into a div in the html file
    if(isPrime(count)){
        sum = sum + count;
        holdNum.innerHTML += `<h1>${count} </h1> <br/>`
    }


    //Defer execution and avoid blocking the main thread. It also pass down as parameters n, the counter and the sum
    setTimeout(()=> addPrimeNumbers(n, count + 1, sum),0)


}

//Declare n and set to 1000
let n = 1000;

//Call the funtion addPrimeNumbers
addPrimeNumbers(n);