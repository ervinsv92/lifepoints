import "../styles.css";
import { useState, useEffect } from "react";
import { games, save, get } from "../services/config.js";
import { useParams } from "react-router-dom";

export default function GameScreen() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    const gameStorage = get(id);
    console.log(gameStorage);
    if (gameStorage != null) {
      setGame(JSON.parse(gameStorage));
    } else {
      setGame({
        game: games.find((x) => x.id == id),
        players: [],
      });
    }
  }, []);

  const addPlayer = () => {
    if (playerName.trim() == "") {
      alert("Debe ingresar un nombre");
      return;
    }

    const temp = game.players.findIndex((x) => x.name == playerName);

    if (temp <= -1) {
      let gameTemp = { ...game };

      gameTemp.players.push({
        name: playerName,
        lifePoints: gameTemp.game.lifePoints,
      });

      setGame(gameTemp);
      setPlayerName("");
      save(gameTemp);
    } else {
      setPlayerName("");
    }
  };

  const resetLifePoints = () => {
    const temp = { ...game };
    temp.players.forEach((player) => {
      player.lifePoints = game.game.lifePoints;
    });
    setGame(temp);
    save(temp);
  };

  const resetGame = () => {
    const temp = { ...game };
    temp.players = [];
    setGame(temp);
    save(temp);
  };

  const changeLifePoints = (playerName, operator) => {
    const temp = { ...game };
    const player = temp.players.find((x) => x.name == playerName);

    switch (operator) {
      case "+":
        player.lifePoints = player.lifePoints + game.game.quantity;
        break;
      case "-":
        player.lifePoints = player.lifePoints - game.game.quantity;
        break;
    }

    setGame(temp);
    save(temp);
  };

  return (
    <div className="App">
      <h1>{game?.game?.name || ""}</h1>
      <div className="row mt-2">
        <div className="col-xxl-12">
          <a href="/" className="btn btn-outline-warning">
            Inicio
          </a>
          <button className="btn btn-outline-primary" onClick={resetGame}>
            Limpiar Juego
          </button>
          <button className="btn btn-outline-primary" onClick={resetLifePoints}>
            Reiniciar Vidas
          </button>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-xxl-10">
          <label htmlFor="">Nombre Jugador</label>
          <input
            type="text"
            className="form-control"
            value={playerName}
            onChange={(e) => {
              setPlayerName(e.target.value);
            }}
            list="playerNames"
          />
          <datalist id="playerNames">
            {game?.players &&
              game?.players?.map((player) => (
                <option key={player.name} value={player.name}></option>
              ))}
          </datalist>
        </div>
        <div className="col-xxl-2">
          <button className="btn btn-primary" onClick={addPlayer}>
            Agregar
          </button>
        </div>
      </div>

      <div className="list-group">
        {game?.players.map((player) => (
          <div
            key={player?.name}
            className="list-group-item list-group-item-action d-flex justify-content-between"
          >
            <div className="d-flex align-items-center player-name">
              <span>{player?.name}</span>
            </div>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-danger"
                onClick={() => changeLifePoints(player.name, "-")}
              >
                -
              </button>
              <span className="life-points">{player.lifePoints}</span>
              <button
                className="btn btn-success"
                onClick={() => changeLifePoints(player.name, "+")}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
