

  
    // function getCookie(name) {
    //     let value = `; ${document.cookie}`;
    //     let parts = value.split(`; ${name}=`);
    //     if (parts.length === 2) return parts.pop().split(';').shift();
    // }

    // function setCookie(name, value, days) {
    //     let expires = "";
    //     if (days) {
    //         let date = new Date();
    //         date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    //         expires = "; expires=" + date.toUTCString();
    //     }
    //     document.cookie = name + "=" + (value || "") + expires + "; path=/";
    // }

    // function ageVerification() {
    //     if (getCookie("ageVerified") !== "true") {
    //         let ageConfirmed = confirm("You must be 18 or older to enter. Are you 18 or older?");
    //         if (ageConfirmed) {
    //             setCookie("ageVerified", "true", 30); 
    //         } else {
    //             alert("You must be 18 or older to enter this site.");
    //             document.body.innerHTML = "Access denied.";
    //         }
    //     }
    // }

    // ageVerification();
    const button = document.getElementById('submit');
    const redValue = document.getElementById('betRed');
    let wallet = 100;
    
    function updateWalletDisplay() {
        document.getElementById("wallet").textContent = "Your chip amount is: " + wallet;
    }
    
    updateWalletDisplay();
    
    button.addEventListener('click', function(event) {
        event.preventDefault();
    
        let betAmount = parseInt(redValue.value);
    
        if (isNaN(betAmount) || betAmount <= 0) {
            alert("Please enter a valid bet amount");
            return;
        }
    
        if (betAmount > wallet) {
            alert("You don't have enough money to place the bet.");
            return;
        }
    
        let ruletteResult = Math.floor(Math.random() * 41);
    
        if (ruletteResult <= 20 && ruletteResult >= 1) {
            wallet += betAmount; 
            alert("You've won! Your new wallet balance: " + wallet);
        } else {
            wallet -= betAmount;
            alert("Casino wins, sorry for your loss :( Your new balance: " + wallet);
        }
    
        updateWalletDisplay();
    
        if (wallet <= 0) {
            alert("You are flushed! Game over :)");
            button.disabled = true; 
        }
    });
    
