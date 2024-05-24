const games = [
  {
    id: "magicnormal",
    name: "Magic Normal",
    lifePoints: 20,
    quantity: 1,
  },
  {
    id: "magiccommander",
    name: "Magic Commander",
    lifePoints: 40,
    quantity: 1,
  },
  {
    id: "yugitcg",
    name: "Yugi TCG",
    lifePoints: 8000,
    quantity: 100,
  },
  {
    id: "yugispeedduel",
    name: "Yugi Speed Duel",
    lifePoints: 4000,
    quantity: 100,
  },
];

const save = (id, game) => {
  localStorage.setItem(id, JSON.stringify(game));
};

const get = (id) => {
  const temp = localStorage.getItem(id);
  if (temp != null) {
    return JSON.parse(temp);
  } else {
    return null;
  }
};

export { games, save, get };
