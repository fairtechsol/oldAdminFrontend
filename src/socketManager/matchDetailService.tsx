import { socket, thirdParty } from ".";
let currSocket: any = [];

export const matchSocketService = {
  joinMatchRoom: (matchId: any, roleName: any) => {
    socket?.emit("matchRoom", {
      id: matchId,
    });

    thirdParty.emit("initCricketData", {
      matchId: matchId,
      roleName: roleName,
    });
    currSocket.push(
      setInterval(() => {
        thirdParty.emit("initCricketData", {
          matchId: matchId,
          roleName: roleName,
        });
      }, 120000)
    );
  },
  leaveAllRooms: () => {
    for (let item of currSocket) {
      clearInterval(item);
    }
    currSocket = [];
    socket?.emit("leaveAll");
  },
  leaveMatchRoom: (matchId: any) => {
    for (let item of currSocket) {
      clearInterval(item);
    }
    currSocket = [];
    thirdParty?.emit("disconnectCricketData", {
      matchId: matchId,
    });
  },
  getMatchRates: (matchId: string, callback: any) => {
    thirdParty?.on(`liveData${matchId}`, callback);
  },
  matchResultDeclared: (callback: any) => {
    socket?.on("matchResult", callback);
  },
  matchResultUnDeclared: (callback: any) => {
    socket?.on("matchResultUnDeclare", callback);
  },
  declaredMatchResultAllUser: (callback: any) => {
    socket?.on("matchResultDeclareAllUser", callback);
  },
  unDeclaredMatchResultAllUser: (callback: any) => {
    socket?.on("matchResultUnDeclareAllUser", callback);
  },
  matchDeleteBet: (callback: any) => {
    socket?.on("matchDeleteBet", callback);
  },
  sessionDeleteBet: (callback: any) => {
    socket?.on("sessionDeleteBet", callback);
  },
  matchAdded: (callback: any) => {
    socket?.on("addMatch", callback);
  },
  updateUserBalance: (callback: any) => {
    socket?.on("updateUserBalance", callback);
  },
  userBalanceUpdate: (callback: any) => {
    socket?.on("userBalanceUpdate", callback);
  },
  userSessionBetPlaced: (callback: any) => {
    socket?.on("userSessionBetPlaced", callback);
  },
  userMatchBetPlaced: (callback: any) => {
    socket?.on("userMatchBetPlaced", callback);
  },
  sessionResult: (callback: any) => {
    socket?.on("sessionResult", callback);
  },
  sessionResultUnDeclare: (callback: any) => {
    socket?.on("sessionResultUnDeclare", callback);
  },
  updateDeleteReason: (callback: any) => {
    socket?.on("updateDeleteReason", callback);
  },
  sessionResultUnDeclareOff: () => {
    socket?.off("sessionResultUnDeclareOff");
  },
  sessionResultOff: () => {
    socket?.off("sessionResult");
  },
  getMatchRatesOff: (matchId: any) => {
    for (let item of currSocket) {
      clearInterval(item);
    }
    currSocket = [];
    thirdParty.off(`liveData${matchId}`);
  },
  matchResultDeclaredOff: () => {
    socket?.off("matchResult");
  },
  matchResultUnDeclaredOff: () => {
    socket?.off("matchResultUnDeclare");
  },
  declaredMatchResultAllUserOff: () => {
    socket?.off("matchResultDeclareAllUser");
  },
  unDeclaredMatchResultAllUserOff: () => {
    socket?.off("matchResultUnDeclareAllUser");
  },
  matchDeleteBetOff: () => {
    socket?.off("matchDeleteBet");
  },
  sessionDeleteBetOff: () => {
    socket?.off("sessionDeleteBet");
  },
  matchAddedOff: () => {
    socket?.off("addMatch");
  },
  updateUserBalanceOff: () => {
    socket?.off("updateUserBalance");
  },
  userSessionBetPlacedOff: () => {
    socket?.off("userSessionBetPlaced");
  },
  userMatchBetPlacedOff: () => {
    socket?.off("userMatchBetPlaced");
  },
  updateDeleteReasonOff: () => {
    socket?.off("updateDeleteReason");
  },
};
