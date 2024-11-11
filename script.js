const rouletteCheckbox = document.getElementById("compsoul-roulette-checkbox");
const redValue = document.getElementById("betRed");
const blackValue = document.getElementById("betBlack");
const greenValue = document.getElementById("betGreen");
const resultMessage = document.getElementById("resultMessage");

let wallet = 100;
let spinControler = 0;
const red = [
  3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37,
];
const black = [
  2, 4, 6, 8, 10, 12, 14, 16, 18, 22, 24, 27, 28, 30, 32, 34, 36, 38,
];

function updateWalletDisplay() {
  document.getElementById("wallet").textContent =
    "Your chip amount is: " + wallet;
}

updateWalletDisplay();

// Funkcja wyświetlająca wiadomość z opóźnieniem 5,5 sekundy
function displayResultMessage(message) {
  setTimeout(() => {
    resultMessage.textContent = message;
    resultMessage.style.display = "block";
    setTimeout(() => (resultMessage.style.display = "none"), 5000);
  }, 500);
}

function generateList() {
  const values = [
    "0",
    "2",
    "14",
    "35",
    "23",
    "4",
    "16",
    "33",
    "21",
    "6",
    "18",
    "31",
    "19",
    "8",
    "12",
    "29",
    "25",
    "10",
    "27",
    "00",
    "1",
    "13",
    "36",
    "24",
    "3",
    "15",
    "34",
    "22",
    "5",
    "17",
    "32",
    "20",
    "7",
    "11",
    "30",
    "26",
    "9",
    "28",
  ];
  values.forEach((element) => {
    const x = document.createElement("li");
    x.className = "roulette-item";
    x.appendChild(document.createTextNode(element));
    document.getElementsByClassName("roulette-list")[0].appendChild(x);
  });
}

generateList();

rouletteCheckbox.addEventListener("change", function (event) {
  if (!rouletteCheckbox.checked) return; // Jeśli odznaczono, nie rób nic

  const roulette = document.querySelector(".compsoul-roulette .roulette-list");
  if (!roulette) {
    console.error(
      "Element '.compsoul-roulette .roulette-list' nie został znaleziony."
    );
    return;
  }

  // Pobieramy wartości zakładów
  let betRed = parseInt(redValue.value) || 0;
  let betBlack = parseInt(blackValue.value) || 0;
  let betGreen = parseInt(greenValue.value) || 0;

  // Walidacja zakładów
  if (betRed <= 0 && betBlack <= 0 && betGreen <= 0) {
    displayResultMessage(
      "Please enter a valid bet amount for at least one color"
    );
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

  wallet -= totalBet;

  let rouletteResult = Math.floor(Math.random() * 40);

  // zrobić co drugą inkrementację, żeby  + -> - i się kręci w drugą mańke cyk

  if (spinControler % 2 == 0) {
    let angle = -((360 / 38) * (rouletteResult - 1) + 810); // Oblicza docelowy kąt obrotu
    roulette.style.transform = "rotate(" + angle + "deg)"; // Ustawia transformację z odpowiednim kątem
    console.log(rouletteResult);
    console.log(angle);
    console.log(spinControler);
    spinControler += 1;
  } else {
    let angle = -((360 / 38) * (rouletteResult - 1) - 630); // Oblicza docelowy kąt obrotu
    roulette.style.transform = "rotate(" + angle + "deg)"; // Ustawia transformację z odpowiednim kątem
    console.log(rouletteResult);
    console.log(angle);
    console.log(spinControler);
    spinControler += 1;
    console.log(spinControler);
  }

  // Opóźnione wyświetlenie wyniku gry
  setTimeout(() => {
    if (red.includes(rouletteResult)) {
      console.log(red.includes(rouletteResult));
      wallet += betRed * 2;
      displayResultMessage(" Red wins! Your new wallet balance: " + wallet);
    } else if (rouletteResult == 20 || rouletteResult == 0) {
      wallet += betGreen * 14;
      displayResultMessage(
        " Green wins! Big win! Your new wallet balance: " + wallet
      );
    } else {
      wallet += betBlack * 2;
      displayResultMessage(" Black wins! Your new wallet balance: " + wallet);
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
