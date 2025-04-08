export interface AccountListInterface {
  creditsum: string;
  balancesum: string;
  profitsum: string;
  percent_profit_loss: string;
  totalcomission: string;
  exposuresum: string;
  availablebalancesum: string;
  exposurelimit: string;
  currentPage: number;
}

export interface AccountListDataInterface {
  id: number;
  userName: string;
  credit_refer: string;
  balance: string;
  userBal: any;
  profit_loss: string | number;
  percent_profit_loss: string;
  totalCommissions: string;
  roleName: string;
  exposure: string;
  available_balance: string;
  bet_blocked: boolean;
  all_blocked: boolean;
  exposure_limit: string;
  role: string;
  currentPage: number;
}

export interface AccountListRowInterface {
  key: number;
  containerStyle: any;
  profit: boolean;
  fContainerStyle: any;
  fTextStyle: any;
  element: any;
  currentPage: number;
}

export interface RowModalComponent {
  selected?: number | null;
  setSelected?: (value: any) => void;
  backgroundColor?: string;
}
