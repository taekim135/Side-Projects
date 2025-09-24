/* 
This file processes the user's input by evaluating each category.
Based on those input values, password is generated
User input received via a form submisison
*/


/* 
Chars/num/symbols for creating password
*/
const letters = ['a','b','c','d','e','f','g','h',
    'i','j','k','l','m','n','o','p','q','r','s','t'
    ,'u','v','w','x','y','z']

const numbers = ['0','1','2','3','4','5','6','7','8','9']
const specials = ['@','#','$','&','%','!','?']


document.addEventListener("DOMContentLoaded", () => {
    const formReceived = document.querySelector("form");
    
    // listen for a submit event, then run processForm function
    formReceived.addEventListener("submit", processForm);

    /* 
    Collect data/input from the form, create pw, return to user
    */
    function processForm(event){

        // prevents page reload/reset - else the pw generated will be lost
        event.preventDefault();

        // store each category into var
        var size = document.getElementById("length").value;
        var sL = document.getElementById("small").checked;
        var capL = document.getElementById("capital").checked;
        var num = document.getElementById("numbers").checked;
        var special = document.getElementById("special").checked;

        var newPW = generatePW(size, sL, capL, num, special);

        document.getElementById("result").placeholder = newPW;
    };

    /* 
    Actual method to generate pw
    all data/input into parameters
    */
    const generatePW = (size, sL, capL, num, special) => {
        var passWord = "";

        while (size > 0){
            // small letters selected
            if (sL){
                let letter = Math.floor(Math.random() * letters.length);
                passWord += letters[letter];
                size --;
            }

            // numbers selected
            if (num){
                let number = Math.floor(Math.random() * numbers.length);
                passWord += numbers[number];
                size --;
            }

            // capital letters selected
            if (capL){
                let cap = Math.floor(Math.random() * letters.length);
                passWord += letters[cap].toUpperCase();
                size --;
            }

            // special char selected
            if (special){
                let specialChar = Math.floor(Math.random() * specials.length);
                passWord += specials[specialChar];
                size --;
            }
        };


        // shuffle the candidate characters to randomize the arrangement
        /* 
            NOT SHUFFLING -> Fix needed
        */
        let currIndex = passWord.length - 1;

        while (currIndex >= 0){
            let newIndex = Math.floor(Math.random() * passWord.length);

            let temp = passWord[currIndex];
            passWord[currIndex] = passWord[newIndex];
            passWord[newIndex] = temp;

            currIndex --;
        }

        return passWord;

    };

});
