import { cookieService } from "@src/services/cookieService";
import { socketio } from "@src/services/socketioService";
import axiosService from "@src/services/axiosService";
import { BoardDTO } from "@src/types";

class GameService {
  initGame(room: number) {
    const accessToken = cookieService.getCookie("accessToken");
    socketio.emit("init_game", { room, accessToken });

    socketio.on("board", (data) => {
      const boardDTO: BoardDTO = {
        message: data.message,
        board: data.board,
        solvedBoard: data.solvedBoard,
      } as BoardDTO;

      return boardDTO;
    });
  }

  async getBoard(difficulty: string) {
    // Difficulty feature will be added
    const response = await axiosService.get(
      "/api/game/board?difficulty=" + difficulty
    );

    const boardDTO: BoardDTO = {
      message: response.data.message,
      board: response.data.board,
      solvedBoard: response.data.solvedBoard,
    } as BoardDTO;

    return boardDTO;
  }

  async finishGame(gameId: number) {
    const response = await axiosService.delete(
      "/api/game/quick?gameId=" + gameId
    );
    // bu yalnız quick game için

    // gameId li olan diğer mod için de buraya ayrı request gelmeli
  }
}

export const gameService = new GameService();
