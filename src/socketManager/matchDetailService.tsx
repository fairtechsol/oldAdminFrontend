import { socket, thirdParty } from ".";

export const matchSocketService = {
  joinMatchRoom: (matchId: any, roleName: any) => {
    socket.emit("matchRoom", {
      id: matchId,
    });

    thirdParty.emit("initCricketData", {
      matchId: matchId,
      roleName: roleName,
    });
  },
  leaveAllRooms: () => {
    socket.emit("leaveAll");
  },
  leaveMatchRoom: (matchId: any) => {
    thirdParty.emit("disconnectCricketData", {
      matchId: matchId,
    });
  },
  getMatchRates: (matchId: string, callback: any) => {
    thirdParty.on(`liveData${matchId}`, callback);
  },
  matchResultDeclared: (callback: any) => {
    socket.on("matchResult", callback);
  },
  matchResultUnDeclared: (callback: any) => {
    socket.on("matchResultUnDeclare", callback);
  },
  matchDeleteBet: (callback: any) => {
    socket.on("matchDeleteBet", callback);
  },
  sessionDeleteBet: (callback: any) => {
    socket.on("sessionDeleteBet", callback);
  },
  matchAdded: (callback: any) => {
    socket.on("addMatch", callback);
  },
  updateUserBalance: (callback: any) => {
    socket.on("updateUserBalance", callback);
  },
  userBalanceUpdate: (callback: any) => {
    socket.on("userBalanceUpdate", callback);
  },
  userSessionBetPlaced: (callback: any) => {
    socket.on("userSessionBetPlaced", callback);
  },
  userMatchBetPlaced: (callback: any) => {
    socket.on("userMatchBetPlaced", callback);
  },
};
