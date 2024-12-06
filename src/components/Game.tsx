"use client";

import { CustomButton } from "./";
import { GameProps } from "@src/types";

const Game = ({ board, difficulty }: GameProps) => (
  <div className="my-10">
    {board.map(function (d) {
      return (
        <li>
          {d.map((r) => (
            <span>{r}</span>
          ))}
        </li>
      );
    })}
  </div>
);

export default Game;
