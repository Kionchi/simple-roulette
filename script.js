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
        setTimeout(() => resultMessage.style.display = "none", 5000); 
    }, 500); 
}

rouletteCheckbox.addEventListener('change', function(event) {
    if (!rouletteCheckbox.checked) return; // Jeśli odznaczono, nie rób nic

    const roulette = document.querySelector(".compsoul-roulette .roulette-list");
    if (!roulette) {
        console.error("Element '.compsoul-roulette .roulette-list' nie został znaleziony.");
        return;
    }

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
    let rouletteResult = Math.floor(Math.random() * 40); // Losuje wartość od 0 do 39
    
    // zrobić co drugą inkrementację, żeby  + -> - i się kręci w drugą mańke cyk

    let angle = -(((360 / 40) * (rouletteResult -1) )  + 810); // Oblicza docelowy kąt obrotu
    roulette.style.transform = "rotate(" + angle + "deg)"; // Ustawia transformację z odpowiednim kątem
    console.log(rouletteResult)
    console.log(angle)    

    // Opóźnione wyświetlenie wyniku gry
    setTimeout(() => {
        if (rouletteResult >= 1 && rouletteResult <= 20) { 
            wallet += betRed * 2;
            displayResultMessage(rouletteResult + " Red wins! Your new wallet balance: " + wallet);
        } else if (rouletteResult >= 21 && rouletteResult <= 38) { 
            wallet += betBlack * 2;
            displayResultMessage(rouletteResult + " Black wins! Your new wallet balance: " + wallet);
        } else if (rouletteResult >= 39) { 
            wallet += betGreen * 14; 
            displayResultMessage(rouletteResult + " Green wins! Big win! Your new wallet balance: " + wallet);
        } else { 
            displayResultMessage("Casino wins, sorry for your loss :( Your new balance: " + wallet);
        }

        // Wyświetlanie wylosowanej wartości
        resultMessage.textContent += ` (The result was: ${rouletteResult})`;
        updateWalletDisplay();

        // Sprawdzenie, czy portfel jest pusty
        if (wallet <= 0) {
            displayResultMessage("You are flushed! Game over :)");
            rouletteCheckbox.disabled = true; // Blokuje checkbox
        }
    }, 5500); 

    // Odznacza checkbox po 5 sekundach
    setTimeout(() => {
        rouletteCheckbox.checked = false;
    }, 5000);
});
