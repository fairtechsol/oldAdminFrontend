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
};
