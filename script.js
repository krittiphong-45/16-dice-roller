// variable dice roller
const diceDisplay = document.getElementById("diceDisplay");
const rollButton = document.getElementById("rollButton");
const historyList = document.getElementById("historyList");
const noHistoryMessage = document.getElementById("noHistoryMessage");

// variable players
const listPlayers = document.getElementById("listPlayers");
const addButton = document.getElementById("addButton");
const Player = document.getElementById("Player");
const historyPlayers = document.getElementById("HistoryPlayers");
const playerForm = document.getElementById("playerFrom");

//data of namesplayers
const namePlayers = [];
const lengthName = 10;

//function add nameplayer
function addPlayer(event) {
  event.preventDefault();
  const username = Player.value.trim();
  if (username) {
    const newUser = {
      id: namePlayers.length + 1,
      name: username
    };
    if (newUser.id < 11) {
      namePlayers.push(newUser);
      renderPlayers();
    }
    Player.value = '';
    Player.focus();
  } else {
    alert("กรุณาใส่ชื่อผู้เล่น");
  }
}

function renderPlayers() {
  if (historyPlayers) historyPlayers.remove();
  const listItem = document.createElement('div');
  listItem.className =
    "flex items-center justify-between py-2 border-b border-gray-200 text-gray-700"
  namePlayers.forEach(player => {
    listItem.innerHTML = `<span class="font-medium">${player.id}</span><span class="font-medium">${player.name}</span>`;
    listPlayers.appendChild(listItem);
  });
}

// Information about the dice face
const dotPositions = {
  1: [
    { cx: 50, cy: 50 }
  ],
  2: [
    { cx: 25, cy: 25 },
    { cx: 75, cy: 75 }
  ],
  3: [
    { cx: 25, cy: 25 },
    { cx: 50, cy: 50 },
    { cx: 75, cy: 75 }
  ],
  4: [
    { cx: 25, cy: 25 },
    { cx: 75, cy: 25 },
    { cx: 25, cy: 75 },
    { cx: 75, cy: 75 }
  ],
  5: [
    { cx: 25, cy: 25 },
    { cx: 75, cy: 25 },
    { cx: 50, cy: 50 },
    { cx: 25, cy: 75 },
    { cx: 75, cy: 75 }
  ],
  6: [
    { cx: 25, cy: 25 },
    { cx: 75, cy: 25 },
    { cx: 25, cy: 50 },
    { cx: 75, cy: 50 },
    { cx: 25, cy: 75 },
    { cx: 75, cy: 75 }
  ],
}

// function can have parameters i.e. "value" in below function
//possible arguments 1, 2, 3, 4, 5, 6

function createDiceSvG(value) {
  const dots = dotPositions[value] || dotPositions[1];
  const circles = dots
    .map(
      (d) =>
        `<circle cx="${d.cx}" cy="${d.cy}" r="10" fill="#4ade80" ></circle>`
    )
    .join("");
  return `
    <svg viewbox="0 0 100 100" class"w-full h-full">
      <rect width="100" height="100" rx="15" ry="15" fill="#333"></rect>
      ${circles}
    </svg>
    `;
}

function addRollToHistory(result) {
  if (noHistoryMessage) noHistoryMessage.remove();
  const item = document.createElement("div");
  item.className =
    "flex items-center justify-between py-2 border-b border-gray-200 text-gray-700"
  const now = new Date()

  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  item.innerHTML = `<span class="font-medium">Roll: ${result}</span><span class="text-gray-500 text-sm">${time}</span>`
  historyList.prepend(item);
  if (historyList.children.length > 10) historyList.lastChild.remove();
}

function rollDice() {
  rollButton.disabled = true;
  diceDisplay.classList.add("animate-shake");
  let count = 0;

  const interval = setInterval(() => {
    const temp = Math.floor(Math.random() * 6) + 1;
    diceDisplay.innerHTML = createDiceSvG(temp);
    if (++count >= 10) {
      clearInterval(interval);
      const final = Math.floor(Math.random() * 6) + 1;
      diceDisplay.innerHTML = createDiceSvG(final);
      diceDisplay.classList.remove("animate-shake");
      rollButton.disabled = false;
      addRollToHistory(final);
    }
  }, 100);
}

// we have
//
playerForm.addEventListener("submit", addPlayer);

rollButton.addEventListener("click", rollDice);

diceDisplay.innerHTML = createDiceSvG(1);

