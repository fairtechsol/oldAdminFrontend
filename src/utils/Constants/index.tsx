import {
  AmarAkbarAnthony,
  AndarBahar2,
  Baccarat,
  BallByBall,
  BollywoodCasino,
  CasinoMeter,
  CasinoQueen,
  CasinoWar,
  Cricket,
  CriketMatch2020,
  DragonTiger20,
  Five5,
  Football,
  GreyHound,
  HorseRacing,
  InstantWorli,
  Lucky7A,
  MAC88,
  Poker,
  Politics,
  Race2020,
  SuperOver,
  TeenPatti1Day,
  Teenpatti20,
  Tennis,
  Thirty2CardsA,
  WorliMatka,
} from "../../assets";

export const ApiConstants = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    OLD_PASSWORD: "/user/check/oldPassword",
  },
  USER: {
    BALANCEUPDATE: "/balance/update",
    CHANGEPASSWORD: "/user/changePassword",
    LIST: "/user/list",
    BALANCE: "/user/balance",
    EXPERTLIST: "/expert/list",
    ADDFGADMIN: "/user/add",
    COMMISSION_SETTLEMENT: "/balance/settle/commission",
    ALREADY_EXIST: "/user/exist",
    ALREADY_SEARCHLIST: "/user/searchlist",
    ADDURLADMIN: "/superadmin/add",
    UPDATEURLADMIN: "/superadmin/updateUser",
    ADDEXPERT: "/expert/add",
    UPDATEEXPERT: "/expert/update",
    UPDATE: "/user/updateUser",
    PROFILE: "/user/profile",
    MARQUEE: "/expert/notification",
    LOCKUNLOCK: "/user/lockUnlockUser",
    CREDITREFERRENCE: "/user/update/creditreferrence",
    EXPOSURELIMIT: "/user/update/exposurelimit",
    CHILD_PROFIT_LOSS: "",
    COMMISSION_MATCH: "/user/commissionMatch",
    COMMISSION_BET_PLACED: "/user/commissionBetPlaced",
    MATCH_WISE_PROFITLOSS: "user/total/matchWise/profitLoss",
    TOTAL_PROFITLOSS: "user/totalProfitLoss",
    TOTAL_BET_PROFITLOSS: "user/total/bet/profitLoss",
    TOTAL_SESSION_PROFITLOSS: "user/total/session/profitLoss",
    TOTAL_BALANCE: "user/child/totalBalance",
    RUN_AMOUNT: "bet/session/profitLoss",
    PROFIT_LOSS: "/user/profitLossData",
    DELETE: "user/delete",
    USER_MATCH_LOCK: "/user/oldUserMatchLock",
    USER_MATCH_LOCK_ALL_CHILD: "/user/getMatchLockAllChild",
    USER_DETAIL_FOR_PARENT: "/user/getUserDetailsForParent",
    USER_CHECK_CHILD_DEACTIVATE: "/user/checkChildDeactivate",
    USER_WISE_EVENTWISE_EXPOSURE: "/match/eventWise/exposure",
  },
  SUPERADMIN: {
    ADD: "/superadmin/add",
    UPDATE_USER: "/superadmin/updateUser",
    CHANGE_PASSWORD: "/superadmin/changePassword",
    LOCK_UNLOCK_USER: "/superadmin/lockUnlockUser",
    EXPOSURE_LIMIT: "/superadmin/update/exposurelimit",
    CREDIT_REFERRENCE: "/superadmin/update/creditreferrence",
    UPDATE_BALANCE: "/superadmin/update/balance",
    USER_PROFIT_LOSS: "/superadmin/user/profitLossData",
  },
  WALLET: {
    BALANCEUPDATE: "wallet/update/balance",
    CREDITREFERRENCE: "wallet/update/creditreference",
    EXPOSURELIMIT: "wallet/update/exposurelimit",
    LOCKUNLOCK: "/user/lockUnlockUser",
    CHANGEPASSWORD: "/user/changePassword",
    REPORTS: {
      GETACCOUNTSTATEMENT: "/transaction/get",
      CURRENT_BETS: "/bet",
    },
  },
  EXPERT: {
    CHANGE_PASSWORD: "/expert/password",
    LOCK_UNLOCK: "/expert/lockUnlockExpert",
    COMPETITIONLIST: "/expert/match/competitionList/",
    COMPETITIONDATES: "/expert/match/competition/dates/",
    COMPETITIONMATCHES: "/expert/match/competition/getMatch/",
  },
  INPLAY: {
    MATCHLIST: "match/list",
  },
  MATCH: {
    GET: "match",
    BETDELETE: "/bet/deleteMultipleBet",
    GET_BETS: "/bet",
    TOTAL_PROFIT_LOSS: "/bet/profitLoss",
    DOMAIN_PROFIT_LOSS: "/user/total/domain/profitLoss",
    BET_PROFIT_LOSS: "/user/total/bet/profitLoss",
    SESSION_PROFIT_LOSS: "/user/total/session/profitLoss",
    GET_MATCH_MARKET_ANALYSIS: "/match/marketAnalysis",
    MARKET_MATCH_LIST_CRICKET:
      import.meta.env.VITE_THIRD_PARTY_BASE_URL + `/sportsList?type=cricket`,
    MARKET_MATCH_LIST_FOOTBALL:
      import.meta.env.VITE_THIRD_PARTY_BASE_URL + `/sportsList?type=football`,
    MARKET_MATCH_LIST_TENNIS:
      import.meta.env.VITE_THIRD_PARTY_BASE_URL + `/sportsList?type=tennis`,
  },
  CARD: {
    GET_TOTAL_PROFIT_LOSS: "/virtual/total/profitLoss",
    GET_GAME_WISE_PROFIT_LOSS: "/virtual/total/gameWise/profitLoss",
    GET_TOTAL_BET_PROFIT_LOSS: "/virtual/total/bet/profitLoss",
    GET_USERWISE_PROFIT_LOSS: "/virtual/userwise/profitLoss",
  },
};

export const sessionBettingType = {
  session: "session",
  fancy1: "fancy1",
  overByOver: "overByover",
  ballByBall: "ballByBall",
  oddEven: "oddEven",
  cricketCasino: "cricketCasino",
};

export const Constants = {
  wallet: "wallet",
  oldAdmin: "/admin/",
  pageLimit: 15,
  AdminAuthPaths: {
    root: "/admin",
    login: "login",
    changePassword: "change_password",
  },
  AdminMainPaths: {
    root: "/admin",
    listOfClients: "list_of_clients",
    match: "match",
    liveMarket: "live_market",
    liveMarketMatches: "live_market/matches",
    addAccount: "add_account",
    editAccount: "edit_account",
    marketAnalysis: "market_analysis",
    marketAnalysisMatches: "market_analysis/matches",
    multipleMatch: "market_analysis/multiple_Match",
    reports: "reports",
    walletSettings: "walletSettings",
    myAccount: "my-account",
    changePassword: "change-password",
    matchList: "matchList/:type",
    matchListMatches: "matchList/:type/:id",
  },
  AdminReportsPaths: {
    profitLoss: "/admin/reports/profit_loss",
    profitLossCards: "/admin/reports/profit_loss_cards",
    accountStatement: "/admin/reports/account_statement",
    currentBet: "/admin/reports/current_bet",
    generalReport: "/admin/reports/general_report",
  },
  pageCount: 10,
  listOfClientCountLimit: 15,

  // customPageLimit: 10,
  // customTimeOut: 300000,// 5 mint in mili seconds user ideal 5 mint after that logout
  // customTimer: 30000,// 30 sec in mili seconds remainint timer start and show message  Your session will expire in 30 second
  // sessionExpireTime: 30 // 30 sec,

  customPageLimit: 15,
  customTimeOut: 1000 * 60 * 60, // 5 mint in mili seconds user ideal 5 mint after that logout
  customTimer: 1000 * 60 * 5, // 30 sec in mili seconds remainint timer start and show message  Your session will expire in 30 second
  sessionExpireTime: 60 * 5, // 30 sec
  apiBasePath: "https://devbetfairapi.fairgame.club",
  thirdParty: "https://devserviceapi.fairgame.club",
  expertPath: "https://devexpertapi.fairgame.club",
  apiBasePathLive: "https://betfairapi.fairgame7.com",
  thirdPartyLive: "https://serviceapi.fairgame7.com",
  expertPathLive: "https://expertapi.fairgame7.com",
  localPath: "http://localhost:5000",
  localPathThird: "http://localhost:3200",
  localPathExpert: "http://localhost:6060",
  WEBSOCKET: "websocket",
  POLLING: "polling",
  PRODUCTION: "production",
  randomeNumber: "JiskaPataNaLageG",
  publicNumber: `U2FsdGVkX1+7Lz0LzD8AsrBoHiQrViZiWhIWBqYuL4dgfGXwUbjJndfELn+Usn4xpSEl8s1RoIqzSS/EHUfPLYK/iq/6V0lKQpDaaK52maKES7/cOdFiuXYTVTGu+/HajYeHTly+Xgn1egPHG1NcK9wP6U3vTUDEkHaB2C4hNejgB/JPzdDD8pp60kc+VzCrkbxbRM2oiR4iEtCRQPac4vz0SdQFaSPaG1gexmBFdu/w5ZMSPoPxuSM2rSA0UvmYobUoP5VkQbkIlL1fZhlwOmJ2bm5AHUyfzfHU1njCgwYhB6eJswzg0Qr8lu2cstCaB6zmxeXmdYF41o157foAyeXgBT/TRYt4nwFQ4WuKngLRPPjM6/LD/sY9sZBFv58i`,
  privateNumber: `U2FsdGVkX19PB0k7pc6tsaolSzWPHY2kgJvHhevrMQ7JuPxXzoTJ/RVKBD6yBUt3xnPx4Nu+beP2YSbQ5GvSxw0ZJRzPMDNp1UOtOPzl5afvOf2wbvZLzhHSkW/qUmERYHLa7b24YLZDY0nIjS6PRLxc22qlRavxSa0/LCRGN0tWmTneiwD6aCgYPkD6YyzpL7qhBPCPSzCJ4CG05wknMfhg6kZSfNEYssJy3moQdlNTjr/6H923TMHCyE5GNfXeLgEYFdA2xxfbRiDJNvm9oJeDyhOiKOqM5kw7GceZQ4pHbtd4snOkfrMjVCY+ogpkXGpauvyTO+dJrqb2rDJ2OZlfHgXhCbWXlyq6CPFmmwqly5ZtJMDyOLhUZ/yJ2z4e/vLJYFuEcOFk4BQrpmnsAiVsCZyV9WGZER5mR11Wri0kWBw0Nya/mbGljAYWJzB8PcpUvZcwa3/Zoh6WgYzoSeAKWP8ftQvcHOQIa7XrFUWWYGH9DpHFJ4f2TnLb+azIMeFkdLXRTO0wETkf3G1H8uSND7B95tHn4L77wcXe5lHTguj4vFHs3dy+o+sqRKqilB6et/ehikfinAh6aBg2isbVnnp5BFzvfwwPKEMb1bKfMpFB3xg9ip8qsVKN6t3Igx5ur8E6ZQ/GpQ4IBUqFc/gkj3cA4v+inA/x/J4Al3RB2kw5V3Jm0Nq9cDf7pUY9AGOoTWZz+TOGKXCrctWBRolCLBmJRKMBGcPCZd7WgCTU3dMzqb4MB8e86QBVNQO8rAr1Nb4IQIcohAthGaFScD0VmWv1/omL0GxIvFY+tNl0IT9OK0rF9pAM+LjuCzP56MeMpEQx+K5LR8sUQtN9QXcHaQfmkBv8ThPmQGkyRKM7t6Pimf9j1niiUp3HArtIFCKFTzYpPEXHc0LeAYLr7TQ06zlLuQLsOcHsIim/0aNAjyXVUFcVvNX673sKA6wvaAMLdJOAzea54U+MVOgeP1t2WTJGjr7TiUKm8SWxVy0OhxRKyjFtJPGktUCYA/4h0oNtVb1atSBBGfcbtt6RubdtQzGfYGjjJHSc329dS17AgoCdlyu1FllcJ3MqGya6LySxBN29Jh9qM9N5Qw3cnvvkkhG/f0yj44Vcna3MjxS4gobAFa5jZacxQ8w0xGRkjETfN/22Kt7qUZnKwQ5f21iMeTDXDtNwN/Pld866Z9GVBQKekM6J9AhR0kWVZJQJ`,
};

export const serviceUrl = import.meta.env.VITE_BASE_URL;

export const baseUrls = {
  socket: import.meta.env.VITE_BASE_URL,
  thirdParty: import.meta.env.VITE_THIRD_PARTY_BASE_URL,
  expertSocket: import.meta.env.VITE_EXPERT_BASE_URL,
};

export const matchBettingType = {
  matchOdd: "matchOdd",
  bookmaker: "bookmaker",
  bookmaker2: "bookmaker2",
  quickbookmaker1: "quickbookmaker1",
  quickbookmaker2: "quickbookmaker2",
  quickbookmaker3: "quickbookmaker3",
  tiedMatch1: "tiedMatch1",
  tiedMatch2: "tiedMatch2",
  tiedMatch3: "tiedMatch3",
  completeMatch: "completeMatch",
  completeMatch1: "completeMatch1",
  completeManual: "completeManual",
  setWinner1: "setWinner1",
  setWinner2: "setWinner2",
  other: "other",
  ...Array.from({ length: 20 }, (_, index: any) => index).reduce(
    (prev, curr) => {
      prev[`overUnder${curr}.5`] = `overUnder${curr}.5`;
      return prev;
    },
    {}
  ),
  ...Array.from({ length: 20 }, (_, index: any) => index).reduce(
    (prev, curr) => {
      prev[`firstHalfGoal${curr}.5`] = `firstHalfGoal${curr}.5`;
      return prev;
    },
    {}
  ),
  halfTime: "halfTime",
};

export const gameConstants = {
  cricket: "cricket",
  football: "football",
  tennis: "tennis",
  horseRacing: "horseRacing",
  greyHound: "greyHound",
  politics: "politics",
};

export const cardGamesTypeConstants: any = {
  dragonTiger20: "dt20",
  andarBahar2: "abj",
  teen20: "teen20",
  card32: "card32",
  lucky7: "lucky7",
  dt202: "dt202",
  dtl20: "dtl20",
  dt6: "dt6",
  lucky7eu: "lucky7eu",
  teen: "teen",
  teen9: "teen9",
  teen8: "teen8",
  poker: "poker",
  poker20: "poker20",
  poker6: "poker6",
  baccarat: "baccarat",
  baccarat2: "baccarat2",
  card32B: "card32eu",
  ab20: "ab20",
  "3cardj": "3cardj",
  war: "war",
  worli2: "worli2",
  superover: "superover",
  cmatch20: "cmatch20",
  aaa: "aaa",
  btable: "btable",
  race20: "race20",
  cricketv3: "cricketv3",
  ballbyball: "ballbyball",
  cmeter: "cmeter",
  queen: "queen",
  worli: "worli",
  mac88: "MAC88",
};

export const gameIconConstants = {
  [gameConstants.cricket]: Cricket,
  [gameConstants.football]: Football,
  [gameConstants.tennis]: Tennis,
  [gameConstants.horseRacing]: HorseRacing,
  [gameConstants.greyHound]: GreyHound,
  [gameConstants.politics]: Politics,
  [cardGamesTypeConstants.dragonTiger20]: DragonTiger20,
  [cardGamesTypeConstants.dt202]: DragonTiger20,
  [cardGamesTypeConstants.dtl20]: DragonTiger20,
  [cardGamesTypeConstants.dt6]: DragonTiger20,
  [cardGamesTypeConstants.andarBahar2]: AndarBahar2,
  [cardGamesTypeConstants.teen20]: Teenpatti20,
  [cardGamesTypeConstants.card32]: Thirty2CardsA,
  [cardGamesTypeConstants.lucky7]: Lucky7A,
  [cardGamesTypeConstants.lucky7eu]: Lucky7A,
  [cardGamesTypeConstants.teen]: TeenPatti1Day,
  [cardGamesTypeConstants.ab20]: AndarBahar2,
  [cardGamesTypeConstants.teen8]: Teenpatti20,
  [cardGamesTypeConstants.superover]: SuperOver,
  [cardGamesTypeConstants.race20]: Race2020,
  [cardGamesTypeConstants.cricketv3]: Five5,
  [cardGamesTypeConstants.card32B]: Thirty2CardsA,
  [cardGamesTypeConstants.war]: CasinoWar,
  [cardGamesTypeConstants.poker]: Poker,
  [cardGamesTypeConstants.poker6]: Poker,
  [cardGamesTypeConstants.poker20]: Poker,
  [cardGamesTypeConstants.teen9]: Teenpatti20,
  [cardGamesTypeConstants.cmatch20]: CriketMatch2020,
  [cardGamesTypeConstants.aaa]: AmarAkbarAnthony,
  [cardGamesTypeConstants.btable]: BollywoodCasino,
  [cardGamesTypeConstants.worli2]: InstantWorli,
  [cardGamesTypeConstants["3cardj"]]: Race2020,
  [cardGamesTypeConstants.baccarat]: Baccarat,
  [cardGamesTypeConstants.baccarat2]: Baccarat,
  [cardGamesTypeConstants.ballbyball]: BallByBall,
  [cardGamesTypeConstants.cmeter]: CasinoMeter,
  [cardGamesTypeConstants.queen]: CasinoQueen,
  [cardGamesTypeConstants.worli]: WorliMatka,
  [cardGamesTypeConstants.mac88]: MAC88,
};

export const profitLossDataForMatchConstants = {
  [matchBettingType.matchOdd]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.bookmaker]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.bookmaker2]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.quickbookmaker1]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.quickbookmaker2]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.quickbookmaker3]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.tiedMatch1]: {
    A: "yesRateTie",
    B: "noRateTie",
  },
  [matchBettingType.tiedMatch2]: {
    A: "yesRateTie",
    B: "noRateTie",
  },
  [matchBettingType.tiedMatch3]: {
    A: "yesRateTie",
    B: "noRateTie",
  },
  [matchBettingType.completeMatch]: {
    A: "yesRateComplete",
    B: "noRateComplete",
  },
  [matchBettingType.completeMatch1]: {
    A: "yesRateComplete",
    B: "noRateComplete",
  },
  [matchBettingType.completeManual]: {
    A: "yesRateComplete",
    B: "noRateComplete",
  },
  [matchBettingType.other]: {
    A: "userTeamARateOther",
    B: "userTeamBRateOther",
    C: "userTeamCRateOther",
  },
  ...Array.from({ length: 20 }, (_, index) => index).reduce(
    (prev: any, curr) => {
      prev[`overUnder${curr}.5`] = {
        A: `yesRateUnderOver${curr}.5`,
        B: `noRateUnderOver${curr}.5`,
      };
      return prev;
    },
    {}
  ),
  ...Array.from({ length: 20 }, (_, index) => index).reduce(
    (prev: any, curr) => {
      prev[`firstHalfGoal${curr}.5`] = {
        A: `yesRateFirstHalfGoal${curr}.5`,
        B: `noRateFirstHalfGoal${curr}.5`,
      };
      return prev;
    },
    {}
  ),
  [matchBettingType.halfTime]: {
    A: "userTeamARateHalfTime",
    B: "userTeamBRateHalfTime",
    C: "userTeamCRateHalfTime",
  },

  ...Array.from({ length: 20 }, (_, index) => index).reduce(
    (prev: any, curr) => {
      prev[`setWinner${curr}`] = {
        A: `userTeamARateSetWinner${curr}`,
        B: `userTeamBRateSetWinner${curr}`,
        C: `userTeamCRateSetWinner${curr}`,
      };
      return prev;
    },
    {}
  ),
};

export const marketApiConst: { [key: string]: string } = {
  cricket: ApiConstants.MATCH.MARKET_MATCH_LIST_CRICKET,
  football: ApiConstants.MATCH.MARKET_MATCH_LIST_FOOTBALL,
  tennis: ApiConstants.MATCH.MARKET_MATCH_LIST_TENNIS,
};
