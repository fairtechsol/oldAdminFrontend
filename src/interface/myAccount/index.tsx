export interface BalanceDetails {
  userCreditReference: string;
  totalMasterBalance: string;
  availableBalance: string;
  downLevelOccupyBalance: string;
  upperLevelBalance: string;
  availableBalanceWithProfitLoss: string;
  downLevelCreditReference: string;
  downLevelProfitLoss: string;
  profitLoss: string;
}

export interface DataShowInterface {
  title?: string;
  value?: string | any;
  value2?: string | number;
  value3?: string | number;
  containerStyle?: any;
  valueContainerStyle?: any;
}
