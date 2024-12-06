"use client";

import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CustomButton } from "@src/components";
import { useEffect, useState } from "react";
import { gameService } from "@src/services/gameService";
import Game from "@src/components/Game";
import { BoardDTO } from "@src/types";
import { Input } from "@nextui-org/input";
import { Row } from "reactstrap";
import { input } from "@nextui-org/react";

export default function Offline() {
  const [isReady, setIsReady] = useState(false);
  const [isNote, setIsNote] = useState(false);
  const initialBoard: string[][] = Array.from({ length: 9 }, () => Array(9));
  const initialSolvedBoard: string[][] = Array.from({ length: 9 }, () =>
    Array(9)
  );
  const [realBoard, setRealBoard] = useState(initialBoard);
  const [board, setBoard] = useState(initialBoard);
  const [solvedBoard, setSolvedBoard] = useState(initialSolvedBoard);
  const [rights, setRights] = useState(3);
  const [mode, setMode] = useState("");
  const [numberAmounts, setNumberAmounts] = useState([
    9, 9, 9, 9, 9, 9, 9, 9, 9,
  ]);
  // const initialNumberArray: number[] = [9, 9, 9, 9, 9, 9, 9, 9, 9];
  // new Array(9)
  const [isIphone, setIsIphone] = useState(false);

  useEffect(() => {
    countNumbers();
  }, []);

  const getBoard = async (difficulty: string) => {
    const boardDTO: BoardDTO = await gameService.getBoard(difficulty);

    const copyRealBoard = boardDTO.board!.map((row) => [...row]);

    setRealBoard(copyRealBoard);

    const boardMapped = mapSpecial(boardDTO.board!);
    const solvedBoardMapped = mapSpecial(boardDTO.solvedBoard!);

    setBoard(boardMapped);
    setSolvedBoard(solvedBoardMapped);

    setIsReady(true);

    countNumbers(boardDTO.board, -1);
  };

  const mapSpecial = (array: string[][]) => {
    const copyBoard = array.map((row) => [...row]);
    const copyBoard2 = array.map((row) => [...row]);

    for (let l = 0; l < 3; l++) {
      for (let k = 0; k < 3; k++) {
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            copyBoard[l * 3 + k][i * 3 + j] = copyBoard2[3 * l + i][3 * k + j];
          }
        }
      }
    }

    return copyBoard;
  };

  const handleInputChange = (
    row: number,
    col: number,
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newBoard = [...board];

    const inputElement = document.getElementById(
      `${row}-${col}`
    ) as HTMLInputElement;

    if (solvedBoard[row][col] !== value) {
      if (rights > 0) {
        setRights(rights - 1);
      }

      const oldValue = newBoard[row][col];

      newBoard[row][col] = value;
      setBoard(newBoard);

      if (inputElement) {
        inputElement.style.color = "rgb(239 68 68)";
      }

      setTimeout(() => {
        if (inputElement) {
          inputElement.style.color = "rgb(31 41 55)";
        }

        const revertedBoard = board.map((row) => [...row]);
        revertedBoard[row][col] = oldValue;
        setBoard(revertedBoard);
      }, 1000);

      if (rights === 1) {
        toast.error("Game over, you lose. Page will be reload");

        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    } else {
      // paintLoadedBoxes(row, col, value);

      newBoard[row][col] = value;
      setBoard(newBoard);

      if (inputElement) {
        inputElement.blur();
        inputElement.style.color = "rgb(99 102 241)";
      }

      window.scrollTo({ top: 0, behavior: "smooth" });

      countNumbers(board, parseInt(value));

      setTimeout(() => {
        if (inputElement) {
          inputElement.style.color = "rgb(31 41 55)";
        }
      }, 1000);

      if (newBoard.toString() === solvedBoard.toString()) {
        toast.success("You won, congratulations!, Page will be reload");

        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    }
  };

  const handleInputClick = (row: number, col: number, cell: string) => {
    paintLoadedBoxes(row, col, cell);
  };

  const paintLoadedBoxes = (row: number, col: number, cell: string) => {
    revertTable();

    if (cell !== "0") {
      var realRowInit;
      var realColInit;

      for (let l = 0; l < 3; l++) {
        for (let k = 0; k < 3; k++) {
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              if (l * 3 + k === row && i * 3 + j === col) {
                realRowInit = 3 * l + i;
                realColInit = 3 * k + j;
              }
              // copyBoard[l * 3 + k][i * 3 + j] = copyBoard2[3 * l + i][3 * k + j];
            }
          }
        }
      }

      for (let h = 0; h < 9; h++) {
        const inputElement2 = document.getElementById(
          `${row}-${h}`
        ) as HTMLInputElement;

        if (inputElement2) {
          // rgb(0 232 240)
          // rgb(226 232 240)
          // rgb(203 213 225)
          inputElement2.style.backgroundColor = "rgb(203 213 225)";
        }
      }

      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (board[i][j] === cell) {
            const inputElement = document.getElementById(
              `${i}-${j}`
            ) as HTMLInputElement;

            if (inputElement) {
              // rgb(0 232 240)
              inputElement.style.backgroundColor = "rgb(59 252 255)";
            }
          }
        }
      }

      var realRow;
      var realCol;

      for (let l = 0; l < 3; l++) {
        for (let k = 0; k < 3; k++) {
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              if (l * 3 + k === row && i * 3 + j === col) {
                realRow = 3 * l + i;
                realCol = 3 * k + j;
              }
              // copyBoard[l * 3 + k][i * 3 + j] = copyBoard2[3 * l + i][3 * k + j];
            }
          }
        }
      }

      // console.log(row, col);
      // console.log("Indexes in grid");

      // console.log(realBoard);
      // console.log("Board that comes from backend");

      // console.log(board);
      // console.log("Board array");

      // console.log(realRow, realCol);
      // console.log("Indexes in board array");

      for (let h = 0; h < 9; h++) {
        var realRow2;
        var realCol2;

        for (let l = 0; l < 3; l++) {
          for (let k = 0; k < 3; k++) {
            for (let i = 0; i < 3; i++) {
              for (let j = 0; j < 3; j++) {
                if (3 * l + i === realRow && 3 * k + j === h) {
                  realRow2 = l * 3 + k;
                  realCol2 = i * 3 + j;
                }
                // copyBoard[l * 3 + k][i * 3 + j] = copyBoard2[3 * l + i][3 * k + j];
              }
            }
          }
        }

        // console.log(realRow2, realCol2);

        const inputElement = document.getElementById(
          `${realRow2}-${realCol2}`
        ) as HTMLInputElement;

        if (inputElement) {
          inputElement.style.backgroundColor = "rgb(203 213 225)";
        }
      }

      for (let h = 0; h < 9; h++) {
        var realRow3;
        var realCol3;

        for (let l = 0; l < 3; l++) {
          for (let k = 0; k < 3; k++) {
            for (let i = 0; i < 3; i++) {
              for (let j = 0; j < 3; j++) {
                if (3 * l + i === h && 3 * k + j === realCol) {
                  realRow3 = l * 3 + k;
                  realCol3 = i * 3 + j;
                }
                // copyBoard[l * 3 + k][i * 3 + j] = copyBoard2[3 * l + i][3 * k + j];
              }
            }
          }
        }

        // console.log(realRow3, realCol3);

        const inputElement = document.getElementById(
          `${realRow3}-${realCol3}`
        ) as HTMLInputElement;

        if (inputElement) {
          inputElement.style.backgroundColor = "rgb(203 213 225)";
        }
      }
    }
  };

  const revertTable = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const inputElement = document.getElementById(
          `${i}-${j}`
        ) as HTMLInputElement;

        if (inputElement) {
          inputElement.style.backgroundColor = "rgb(226 232 240)";
        }
      }
    }
  };

  const inputValue = (cell: string) => {
    const cellValue = parseInt(cell);
    if (cellValue === 0) {
      return "";
    } else {
      return cell;
    }
  };

  const countNumbers = (array?: string[][], value?: number) => {
    const sandboxArray = [...numberAmounts];

    if (value === -1) {
      for (let n = 1; n <= 9; n++) {
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (array && n === parseInt(array[i][j])) {
              sandboxArray[n - 1] = sandboxArray[n - 1] - 1;
            }
          }
        }
      }
    } else {
      sandboxArray[value! - 1] = sandboxArray[value! - 1] - 1;
    }

    setNumberAmounts(sandboxArray);
  };

  const handleEasy = () => {
    setRights(5);
    setMode("Easy");
    getBoard("20");
  };

  const handleMedium = () => {
    setRights(4);
    setMode("Medium");
    getBoard("35");
  };

  const handleHard = () => {
    setRights(3);
    setMode("Hard");
    getBoard("50");
  };

  useEffect(() => {
    const userAgent = typeof window !== "undefined" ? navigator.userAgent : "";
    if (/iPhone/.test(userAgent)) {
      setIsIphone(true);
    }
  }, []);

  return (
    <div className="pt-14 flex justify-center bg mb-12">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        theme="light"
        pauseOnFocusLoss
        draggable
        transition={Slide}
        pauseOnHover
      />
      <div>
        {!isReady && (
          <>
            <h1 className="my-2 flex justify-center text-3xl font-bold">
              Choose difficulty
            </h1>
            <div className="flex justify-center">
              <CustomButton
                title="Easy"
                containerStyles="my-2 py-3 px-6 bg-primary-blue-hover text-white rounded-full hover:bg-slight-blue"
                handleClick={handleEasy}
              />
            </div>
            <div className="flex justify-center">
              <CustomButton
                title="Medium"
                containerStyles="mb-2 py-3 px-6 bg-primary-blue text-white rounded-full hover:bg-primary-blue-hover"
                handleClick={handleMedium}
              />
            </div>
            <div className="flex justify-center">
              <CustomButton
                title="Hard"
                containerStyles="mb-80 py-3 px-6 bg-intense-blue text-white rounded-full hover:bg-primary-blue"
                handleClick={handleHard}
              />
            </div>
          </>
        )}
        {isReady && (
          <div>
            <div className="mt-1 flex justify-center text-3xl font-bold">
              {mode}
            </div>
            <h1 className="mt-1 mb-2   flex justify-center">
              <div>
                <strong>{rights}</strong> Fail Rights Left
              </div>
            </h1>
          </div>
        )}
        {isReady && (
          <div className="grid grid-cols-3 mx-1">
            {board.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-3 border-2 border-indigo-500 rounded-md mx-0.7 my-0.7 p-1"
              >
                {row.map((cell, colIndex) => (
                  <input
                    key={`${rowIndex}-${colIndex}`}
                    id={`${rowIndex}-${colIndex}`}
                    className={`xl:text-3xl 2xl:py-3 xl:py-2.5 xl:px-3 text-3xl lg:py-0 px-1 remove-arrow bg-slate-200 text-center text-gray-800 rounded-lg hover:bg-slate-100 border border-indigo-400 ${
                      isIphone ? "py-0" : "py-0.5"
                    }`}
                    step="1"
                    min="1"
                    max="9"
                    type="number"
                    value={inputValue(cell)}
                    onChange={(event) =>
                      handleInputChange(
                        rowIndex,
                        colIndex,
                        event.target.value,
                        event
                      )
                    }
                    onClick={() => {
                      handleInputClick(rowIndex, colIndex, cell);
                    }}
                    readOnly={cell !== "0"}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
        {isReady && (
          <div className="flex justify-center space-x-2">
            {Array.from({ length: 9 }, (_, index) => (
              <div key={index} className="flex flex-col items-center">
                <h1 className="mt-1 mx-3 text-2xl font-bold">{index + 1}</h1>
                <h1>{numberAmounts[index]}</h1>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
