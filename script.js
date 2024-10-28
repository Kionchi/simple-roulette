const button = document.getElementById('submit');
const redValue = document.getElementById('betRed');
const blackValue = document.getElementById('betBlack');
const greenValue = document.getElementById('betGreen');

let wallet = 100;

function updateWalletDisplay() {
    document.getElementById("wallet").textContent = "Your chip amount is: " + wallet;
}

updateWalletDisplay();

button.addEventListener('click', function(event) {
    event.preventDefault();

    let betRed = parseInt(redValue.value) || 0;
    let betBlack = parseInt(blackValue.value) || 0;
    let betGreen = parseInt(greenValue.value) || 0;

    if (betRed <= 0 && betBlack <= 0 && betGreen <= 0) {
        alert("Please enter a valid bet amount for at least one color");
        return;
    }

    let totalBet = betRed + betBlack + betGreen;
    if (totalBet > wallet) {
        alert("You don't have enough money to place the bets.");
        return;
    }

    wallet -= totalBet;

    let ruletteResult = Math.floor(Math.random() * 41);

    if (ruletteResult >= 1 && ruletteResult <= 20) { 
        wallet += betRed * 2;
        alert("Red wins! Your new wallet balance: " + wallet);
    } else if (ruletteResult >= 21 && ruletteResult <= 38) { 
        wallet += betBlack * 2;
        alert("Black wins! Your new wallet balance: " + wallet);
    } else if (ruletteResult >= 39 && ruletteResult <= 40) { 
        wallet += betGreen * 14; 
        alert("Green wins! Big win! Your new wallet balance: " + wallet);
    } else { 
        alert("Casino wins, sorry for your loss :( Your new balance: " + wallet);
    }

    updateWalletDisplay();

    if (wallet <= 0) {
        alert("You are flushed! Game over :)");
        button.disabled = true; 
    }
});
