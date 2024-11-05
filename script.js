const rouletteCheckbox = document.getElementById('compsoul-roulette-checkbox');
const redValue = document.getElementById('betRed');
const blackValue = document.getElementById('betBlack');
const greenValue = document.getElementById('betGreen');
const resultMessage = document.getElementById('resultMessage');

let wallet = 100;

function updateWalletDisplay() {
    document.getElementById("wallet").textContent = "Your chip amount is: " + wallet;
}

updateWalletDisplay();

// Funkcja wyświetlająca wiadomość z opóźnieniem 5,5 sekundy
function displayResultMessage(message) {
    setTimeout(() => {
        resultMessage.textContent = message;
        resultMessage.style.display = "block";
        setTimeout(() => resultMessage.style.display = "none", 5000); // Ukrywa komunikat po dodatkowych 5 sekundach
    }, 500); // Opóźnia wyświetlenie wiadomości o 5,5 sekundy
}

rouletteCheckbox.addEventListener('change', function(event) {
    if (!rouletteCheckbox.checked) return; // Jeśli odznaczono, nie rób nic

    // Pobieramy wartości zakładów
    let betRed = parseInt(redValue.value) || 0;
    let betBlack = parseInt(blackValue.value) || 0;
    let betGreen = parseInt(greenValue.value) || 0;

    // Walidacja zakładów
    if (betRed <= 0 && betBlack <= 0 && betGreen <= 0) {
        displayResultMessage("Please enter a valid bet amount for at least one color");
        rouletteCheckbox.checked = false; // Odznacz checkbox
        return;
    }

    // Walidacja środków w portfelu
    let totalBet = betRed + betBlack + betGreen;
    if (totalBet > wallet) {
        displayResultMessage("You don't have enough money to place the bets.");
        rouletteCheckbox.checked = false; // Odznacz checkbox
        return;
    }

    // Odejmuje zakład z portfela
    wallet -= totalBet;

    // Symulacja wyniku ruletki
    let ruletteResult = Math.floor(Math.random() * 40); // Losuje wartość od 0 do 39

    // Opóźnione wyświetlenie wyniku gry
    setTimeout(() => {
        if (ruletteResult >= 1 && ruletteResult <= 20) { 
            wallet += betRed * 2;
            displayResultMessage("Red wins! Your new wallet balance: " + wallet);
        } else if (ruletteResult >= 21 && ruletteResult <= 38) { 
            wallet += betBlack * 2;
            displayResultMessage("Black wins! Your new wallet balance: " + wallet);
        } else if (ruletteResult >= 39) { 
            wallet += betGreen * 14; 
            displayResultMessage("Green wins! Big win! Your new wallet balance: " + wallet);
        } else { 
            displayResultMessage("Casino wins, sorry for your loss :( Your new balance: " + wallet);
        }

        // Wyświetlanie wylosowanej wartości
        resultMessage.textContent += ` (The result was: ${ruletteResult})`;
        updateWalletDisplay();

        // Sprawdzenie, czy portfel jest pusty
        if (wallet <= 0) {
            displayResultMessage("You are flushed! Game over :)");
            rouletteCheckbox.disabled = true; // Blokuje checkbox
        }
    }, 5500); // Wynik wyświetlany po 5,5 sekundy

    // Odznacza checkbox po 5 sekundach
    setTimeout(() => {
        rouletteCheckbox.checked = false;
    }, 5000);
});
