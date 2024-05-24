import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import GameSelectorScreen from "../pages/GameSelectorScreen";
import GameScreen from "../pages/GameScreen";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameSelectorScreen />} />
        <Route path="/game/:id" element={<GameScreen />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
