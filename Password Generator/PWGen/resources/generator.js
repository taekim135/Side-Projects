// Receive form from user
// criteria & generate pw


const letters = ['a','b','c','d','e','f','g','h',
    'i','j','k','l','m','n','o','p','q','r','s','t'
    ,'u','v','w','x','y','z']

const numbers = ['0','1','2','3','4','5','6','7','8','9']
const specials = ['@','#','$','&','%','!','?']


document.addEventListener("DOMContentLoaded", () => {
    const formReceived = document.querySelector("form");
    
    // listen for a sbumit event, then run processForm u=function
    formReceived.addEventListener("submit", processForm);

    function processForm(event){

        // prevents page reload/reset - else the pw generated will be lost
        event.preventDefault();

        // collect data from form
        var size = document.getElementById("length").value;
        var sL = document.getElementById("small").checked;
        var capL = document.getElementById("capital").checked;
        var num = document.getElementById("numbers").checked;
        var special = document.getElementById("special").checked;

        // if (!sL && !capL && !num && !special){
        //     console.log("Nothing selected");

        // }

        var newPW = generatePW(size, sL, capL, num, special);
        document.getElementById("result").placeholder = newPW;
        
    };

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
