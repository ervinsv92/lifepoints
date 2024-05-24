import "../styles.css";
import { games } from "../services/config.js";

export default function GameSelector() {
  return (
    <div className="App">
      <h1>Selecciona el juego</h1>

      <div class="list-group">
        {games.map((game) => (
          <a
            href={`/game/${game.id}`}
            class="list-group-item list-group-item-action"
          >
            {game.name}
          </a>
        ))}
      </div>
    </div>
  );
}
