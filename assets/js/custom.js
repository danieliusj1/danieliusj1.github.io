// Skriptinio programavimo 11 laboratorinis darbas
// Forma, validacija, telefono formatavimas, vidurkio skaiciavimas ir popup pranesimas

document.addEventListener("DOMContentLoaded", function () {

  // randam visus formos laukus
  const form = document.getElementById("contact-form");
  if (!form) return;

  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const addressInput = document.getElementById("address");
  const q1Input = document.getElementById("q1");
  const q2Input = document.getElementById("q2");
  const q3Input = document.getElementById("q3");
  const submitButton = document.getElementById("contact-submit");
  const resultsContainer = document.getElementById("contact-results");

  // popup pranesimas
  const successPopup = createSuccessPopup();

  // laukeliu validumo busena
  const fieldState = {
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    address: false,
    q1: false,
    q2: false,
    q3: false,
  };

  // grazina klaidos zyme po laukeliu
  function getErrorElement(inputEl) {
    return form.querySelector('[data-error-for="' + inputEl.id + '"]');
  }

  // rodom klaida
  function showError(inputEl, message) {
    const errorEl = getErrorElement(inputEl);
    if (errorEl) errorEl.textContent = message;
    inputEl.classList.add("is-invalid");
  }

  // paslepiam klaida
  function clearError(inputEl) {
    const errorEl = getErrorElement(inputEl);
    if (errorEl) errorEl.textContent = "";
    inputEl.classList.remove("is-invalid");
  }

  // submit mygtukas aktyvuojamas tik jei visi laukai validus
  function updateSubmitState() {
    const allValid = Object.values(fieldState).every(Boolean);
    submitButton.disabled = !allValid;
  }

  // vardas
  function validateFirstName() {
    const value = firstNameInput.value.trim();
    if (!value) {
      showError(firstNameInput, "Sis laukas yra privalomas.");
      fieldState.firstName = false;
    } else {
      const regex = /^[A-Za-z -]+$/;
      if (!regex.test(value)) {
        showError(firstNameInput, "Vardas turi buti sudarytas tik is raidziu.");
        fieldState.firstName = false;
      } else {
        clearError(firstNameInput);
        fieldState.firstName = true;
      }
    }
    updateSubmitState();
  }

  // pavarde
  function validateLastName() {
    const value = lastNameInput.value.trim();
    if (!value) {
      showError(lastNameInput, "Sis laukas yra privalomas.");
      fieldState.lastName = false;
    } else {
      const regex = /^[A-Za-z -]+$/;
      if (!regex.test(value)) {
        showError(lastNameInput, "Pavarde turi buti sudaryta tik is raidziu.");
        fieldState.lastName = false;
      } else {
        clearError(lastNameInput);
        fieldState.lastName = true;
      }
    }
    updateSubmitState();
  }

  // el. pastas
  function validateEmail() {
    const value = emailInput.value.trim();
    if (!value) {
      showError(emailInput, "Sis laukas yra privalomas.");
      fieldState.email = false;
    } else {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(value)) {
        showError(emailInput, "Iveskite teisinga el. pasta.");
        fieldState.email = false;
      } else {
        clearError(emailInput);
        fieldState.email = true;
      }
    }
    updateSubmitState();
  }

  // telefono numerio formatavimas
  function formatPhone(rawValue) {
    let digits = rawValue.replace(/\D/g, "");
    if (digits.length > 11) digits = digits.slice(0, 11);

    if (digits.length === 0) return "";
    if (digits.length <= 3) return "+" + digits;
    if (digits.length <= 6) return "+" + digits.slice(0, 3) + " " + digits.slice(3);

    return (
      "+" +
      digits.slice(0, 3) +
      " " +
      digits.slice(3, 6) +
      " " +
      digits.slice(6)
    );
  }

  // telefono validacija
  function validatePhone() {
    const raw = phoneInput.value;
    const digits = raw.replace(/\D/g, "");

    if (!digits) {
      showError(phoneInput, "Sis laukas yra privalomas.");
      fieldState.phone = false;
    } else if (digits.length !== 11 || !digits.startsWith("370") || digits[3] !== "6") {
      showError(phoneInput, "Numeris turi buti +370 6xx xxxxx.");
      fieldState.phone = false;
    } else {
      clearError(phoneInput);
      fieldState.phone = true;
    }

    updateSubmitState();
  }

  function phoneInputHandler() {
    phoneInput.value = formatPhone(phoneInput.value);
    validatePhone();
  }

  // adresas
  function validateAddress() {
    const value = addressInput.value.trim();
    if (!value) {
      showError(addressInput, "Sis laukas yra privalomas.");
      fieldState.address = false;
    } else {
      clearError(addressInput);
      fieldState.address = true;
    }
    updateSubmitState();
  }

  // klausimai 1-10
  function validateQuestion(inputEl, key) {
    const raw = inputEl.value.trim();
    const num = Number(raw);

    if (!raw) {
      showError(inputEl, "Iveskite skaiciu.");
      fieldState[key] = false;
    } else if (isNaN(num) || num < 1 || num > 10) {
      showError(inputEl, "Leistina reiksme 1 - 10.");
      fieldState[key] = false;
    } else {
      clearError(inputEl);
      fieldState[key] = true;
    }

    updateSubmitState();
  }

  // eventai (realaus laiko validacija)
  firstNameInput.addEventListener("input", validateFirstName);
  lastNameInput.addEventListener("input", validateLastName);
  emailInput.addEventListener("input", validateEmail);
  phoneInput.addEventListener("input", phoneInputHandler);
  addressInput.addEventListener("input", validateAddress);

  q1Input.addEventListener("input", () => validateQuestion(q1Input, "q1"));
  q2Input.addEventListener("input", () => validateQuestion(q2Input, "q2"));
  q3Input.addEventListener("input", () => validateQuestion(q3Input, "q3"));

  // pradzioje patikrinam viska
  validateFirstName();
  validateLastName();
  validateEmail();
  phoneInputHandler();
  validateAddress();
  validateQuestion(q1Input, "q1");
  validateQuestion(q2Input, "q2");
  validateQuestion(q3Input, "q3");

  // formos pateikimas
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // dar karta tikrinam
    validateFirstName();
    validateLastName();
    validateEmail();
    phoneInputHandler();
    validateAddress();
    validateQuestion(q1Input, "q1");
    validateQuestion(q2Input, "q2");
    validateQuestion(q3Input, "q3");

    if (!Object.values(fieldState).every(Boolean)) return;

    // surenkam duomenis
    const first = firstNameInput.value.trim();
    const last = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const address = addressInput.value.trim();
    const q1 = Number(q1Input.value.trim());
    const q2 = Number(q2Input.value.trim());
    const q3 = Number(q3Input.value.trim());
    const avg = ((q1 + q2 + q3) / 3).toFixed(2);

    // JS objektas
    const dataObj = {
      firstName: first,
      lastName: last,
      email: email,
      phone: phone,
      address: address,
      questions: {
        q1: q1,
        q2: q2,
        q3: q3,
        average: Number(avg),
      },
    };

    console.log("Pateikti duomenys:", dataObj);

    // rezultatu isvedimas i HTML
    resultsContainer.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title mb-3">Pateikti duomenys</h5>
          <p><strong>Vardas:</strong> ${first}</p>
          <p><strong>Pavarde:</strong> ${last}</p>
          <p><strong>El. pastas:</strong> ${email}</p>
          <p><strong>Telefonas:</strong> ${phone}</p>
          <p><strong>Adresas:</strong> ${address}</p>
          <hr>
          <p><strong>Klausimas 1:</strong> ${q1}</p>
          <p><strong>Klausimas 2:</strong> ${q2}</p>
          <p><strong>Klausimas 3:</strong> ${q3}</p>
          <p><strong>Vidurkis:</strong> ${avg}</p>
        </div>
      </div>
    `;

    showSuccessPopup(successPopup);
  });

  // --------------------------
  //  PAPILDOMA UZDUOTIS:
  //  POPUP PRANESIMAS
  // --------------------------

  function createSuccessPopup() {
    const popup = document.createElement("div");
    popup.id = "contact-popup";
    popup.textContent = "Duomenys pateikti sekmingai!";

    popup.style.position = "fixed";
    popup.style.right = "1.5rem";
    popup.style.bottom = "1.5rem";
    popup.style.padding = "1rem 1.25rem";
    popup.style.backgroundColor = "rgba(22, 163, 74, 0.95)";
    popup.style.color = "#ffffff";
    popup.style.borderRadius = "0.75rem";
    popup.style.boxShadow = "0 10px 30px rgba(0,0,0,0.25)";
    popup.style.fontSize = "0.95rem";
    popup.style.zIndex = "9999";
    popup.style.opacity = "0";
    popup.style.transition = "opacity 0.3s ease";
    popup.style.pointerEvents = "none";

    document.body.appendChild(popup);
    return popup;
  }

  function showSuccessPopup(popup) {
    popup.style.opacity = "1";
    popup.style.pointerEvents = "auto";

    setTimeout(() => {
      popup.style.opacity = "0";
      popup.style.pointerEvents = "none";
    }, 3000);
  }

  // --------------------------
  // 12 LABORATORINIS DARBAS
  // ATMINTIES KORTELIU ZAIDIMAS (FLIP CARD MEMORY)
  // --------------------------

  // Randame zaidimo elementus HTML puslapyje
  const difficultySelect = document.getElementById("game-difficulty");
  const startButton = document.getElementById("game-start");
  const resetButton = document.getElementById("game-reset");
  const boardElement = document.getElementById("game-board");
  const movesElement = document.getElementById("game-moves");
  const matchesElement = document.getElementById("game-matches");
  const messageElement = document.getElementById("game-message");
  const timerElement = document.getElementById("game-timer");
  const bestEasyElement = document.getElementById("best-easy");
  const bestHardElement = document.getElementById("best-hard");

  // Jei zaidimo sekcijos nera HTML, zaidimo logikos nevykdome
  if (
    difficultySelect &&
    startButton &&
    resetButton &&
    boardElement &&
    movesElement &&
    matchesElement &&
    messageElement &&
    timerElement &&
    bestEasyElement &&
    bestHardElement
  ) {
    // Pagrindiniai kintamieji
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let movesCount = 0;
    let matchesCount = 0;
    let totalPairs = 0;
    let currentDifficulty = "easy";

    // Laikmatis
    let timerInterval = null;
    let secondsElapsed = 0;

    // Karteliu turinys (12 unikaliu simboliu)
    const baseSymbols = [
      "💡",
      "⚡",
      "🎧",
      "🚗",
      "📚",
      "🧠",
      "🌍",
      "💻",
      "📱",
      "🎮",
      "🎵",
      "🚀",
    ];

    // --------------------------
    // PAGALBINES FUNKCIJOS
    // --------------------------

    // Paleidziam laikmati is naujo
    function startTimer() {
      stopTimer();
      secondsElapsed = 0;
      updateTimerUI();
      timerInterval = setInterval(function () {
        secondsElapsed += 1;
        updateTimerUI();
      }, 1000);
    }

    function stopTimer() {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
    }

    function updateTimerUI() {
      timerElement.textContent = secondsElapsed.toString();
    }

    // Naudojam localStorage geriausiam rezultatui issaugoti
    function getBestKey(difficulty) {
      return difficulty === "hard" ? "memoryBestHardMoves" : "memoryBestEasyMoves";
    }

    function loadBestScores() {
      const bestEasy = localStorage.getItem("memoryBestEasyMoves");
      const bestHard = localStorage.getItem("memoryBestHardMoves");

      bestEasyElement.textContent = bestEasy ? bestEasy : "-";
      bestHardElement.textContent = bestHard ? bestHard : "-";
    }

    function saveBestScoreIfNeeded() {
      const key = getBestKey(currentDifficulty);
      const previous = localStorage.getItem(key);
      const current = movesCount;

      // Jei nera rezultato arba dabartinis geresnis (mazesnis eimu skaicius)
      if (!previous || current < Number(previous)) {
        localStorage.setItem(key, String(current));
        loadBestScores();
      }
    }

    // Sukuriam korteliu poru masyva pagal sunkuma
    function createDeck() {
      // easy: 4x3 = 12 korteliu = 6 poru
      // hard: 6x4 = 24 korteles = 12 poru
      let pairCount = currentDifficulty === "hard" ? 12 : 6;

      const symbols = baseSymbols.slice(0, pairCount);
      const deck = [];

      symbols.forEach(function (symbol) {
        deck.push({ symbol: symbol });
        deck.push({ symbol: symbol });
      });

      // sumaisome korteles (Fisher-Yates algoritmas)
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
      }

      totalPairs = pairCount;
      return deck;
    }

    // I HTML sugeneruojam korteliu lenta
    function renderBoard(deck) {
      boardElement.innerHTML = "";

      // Nustatom stulpeliu skaiciu pagal sunkuma
      const columns = currentDifficulty === "hard" ? 6 : 4;
      boardElement.style.display = "grid";
      boardElement.style.gridTemplateColumns = "repeat(" + columns + ", minmax(60px, 1fr))";
      boardElement.style.gap = "0.75rem";

      deck.forEach(function (cardData, index) {
        const card = document.createElement("button");
        card.className = "memory-card";
        card.type = "button";
        card.setAttribute("data-symbol", cardData.symbol);
        card.setAttribute("aria-label", "Zaidimo kortele");

        card.innerHTML = `
          <span class="card-inner">
            <span class="card-front"></span>
            <span class="card-back">${cardData.symbol}</span>
          </span>
        `;

        card.addEventListener("click", function () {
          handleCardClick(card);
        });

        boardElement.appendChild(card);
      });
    }

    function resetStats() {
      movesCount = 0;
      matchesCount = 0;
      movesElement.textContent = "0";
      matchesElement.textContent = "0";
      messageElement.textContent = "";
    }

    function prepareNewGame() {
      resetStats();
      firstCard = null;
      secondCard = null;
      lockBoard = false;

      const deck = createDeck();
      renderBoard(deck);
    }

    function setDifficultyFromSelect() {
      const value = difficultySelect.value === "hard" ? "hard" : "easy";
      currentDifficulty = value;
    }

    // Vieno zaidimo paleidimas
    function startGame() {
      setDifficultyFromSelect();
      prepareNewGame();
      startTimer();
    }

    function resetGame() {
      setDifficultyFromSelect();
      prepareNewGame();
      startTimer();
    }

    // Korteles paspaudimo logika
    function handleCardClick(cardEl) {
      if (lockBoard) return;
      if (cardEl.classList.contains("flipped") || cardEl.classList.contains("matched")) {
        return;
      }

      // Pirma kortele
      if (!firstCard) {
        firstCard = cardEl;
        cardEl.classList.add("flipped");
        return;
      }

      // Antra kortele
      secondCard = cardEl;
      cardEl.classList.add("flipped");
      movesCount += 1;
      movesElement.textContent = movesCount.toString();
      lockBoard = true;

      const firstSymbol = firstCard.getAttribute("data-symbol");
      const secondSymbol = secondCard.getAttribute("data-symbol");

      if (firstSymbol === secondSymbol) {
        // sutapimas
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchesCount += 1;
        matchesElement.textContent = matchesCount.toString();
        resetSelection();
        checkWin();
      } else {
        // nesutapo - po 1s apverciam atgal
        setTimeout(function () {
          if (firstCard) firstCard.classList.remove("flipped");
          if (secondCard) secondCard.classList.remove("flipped");
          resetSelection();
        }, 1000);
      }
    }

    function resetSelection() {
      firstCard = null;
      secondCard = null;
      lockBoard = false;
    }

    function checkWin() {
      if (matchesCount === totalPairs) {
        messageElement.textContent = "Laimėjote!";
        stopTimer();
        saveBestScoreIfNeeded();
      }
    }

    // --------------------------
    // EVENTAI
    // --------------------------

    // Pakeitus sunkumo lygi - tik paruosiam naujai, bet zaidimas pilnai startuoja paspaudus "Start"
    difficultySelect.addEventListener("change", function () {
      setDifficultyFromSelect();
      prepareNewGame();
      // Laikmatis neprasideda kol nepaspaustas "Start" mygtukas
      stopTimer();
      secondsElapsed = 0;
      updateTimerUI();
    });

    startButton.addEventListener("click", function () {
      startGame();
    });

    resetButton.addEventListener("click", function () {
      resetGame();
    });

    // Inicialiai uzkraunam geriausius rezultatus ir paruosiam lenta (pagal pradine reiksme select'e)
    loadBestScores();
    setDifficultyFromSelect();
    prepareNewGame();
    stopTimer();
    secondsElapsed = 0;
    updateTimerUI();
  }
});