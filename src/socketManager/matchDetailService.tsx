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
  sessionResult: (callback: any) => {
    socket.on("sessionResult", callback);
  },
  sessionResultUnDeclare: (callback: any) => {
    socket.on("sessionResultUnDeclare", callback);
  },
  sessionResultUnDeclareOff: (callback: any) => {
    socket.off("sessionResultUnDeclareOff", callback);
  },
  sessionResultOff: (callback: any) => {
    socket.off("sessionResult", callback);
  },
  getMatchRatesOff: (matchId: any, callback: any) => {
    thirdParty.off(`liveData${matchId}`, callback);
  },
  matchResultDeclaredOff: (callback: any) => {
    socket.off("matchResult", callback);
  },
  matchResultUnDeclaredOff: (callback: any) => {
    socket.off("matchResultUnDeclare", callback);
  },
  matchDeleteBetOff: (callback: any) => {
    socket.off("matchDeleteBet", callback);
  },
  sessionDeleteBetOff: (callback: any) => {
    socket.off("sessionDeleteBet", callback);
  },
  matchAddedOff: (callback: any) => {
    socket.off("addMatch", callback);
  },
  updateUserBalanceOff: (callback: any) => {
    socket.off("updateUserBalance", callback);
  },
  userSessionBetPlacedOff: (callback: any) => {
    socket.off("userSessionBetPlaced", callback);
  },
  userMatchBetPlacedOff: (callback: any) => {
    socket.off("userMatchBetPlaced", callback);
  },
};
