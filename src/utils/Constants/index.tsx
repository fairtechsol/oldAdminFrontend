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
    USER_MATCH_LOCK: "/user/userMatchLock",
    USER_MATCH_LOCK_ALL_CHILD: "/user/getMatchLockAllChild",
    USER_DETAIL_FOR_PARENT: "/user/getUserDetailsForParent",
    USER_CHECK_CHILD_DEACTIVATE: "/user/checkChildDeactivate",
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
  },
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
  },
  AdminReportsPaths: {
    profitLoss: "/admin/reports/profit_loss",
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
};

// export const baseUrls = {
//   socket:
//     process.env.NODE_ENV === Constants.PRODUCTION
//       ? Constants.apiBasePath
//       : Constants.localPath,
//   thirdParty:
//     process.env.NODE_ENV === Constants.PRODUCTION
//       ? Constants.thirdParty
//       : Constants.localPathThird,
//   expertSocket:
//     process.env.NODE_ENV === Constants.PRODUCTION
//       ? Constants.expertPath
//       : Constants.localPathExpert,
// };

export const baseUrls = {
  socket:
    process.env.NODE_ENV === Constants.PRODUCTION
      ? Constants.apiBasePathLive
      : Constants.localPath,
  thirdParty:
    process.env.NODE_ENV === Constants.PRODUCTION
      ? Constants.thirdPartyLive
      : Constants.localPathThird,
  expertSocket:
    process.env.NODE_ENV === Constants.PRODUCTION
      ? Constants.expertPathLive
      : Constants.localPathExpert,
};
