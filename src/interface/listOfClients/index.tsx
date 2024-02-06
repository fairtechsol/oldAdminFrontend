export interface AccountListInterface {
  creditsum: string;
  balancesum: string;
  profitsum: string;
  percent_profit_loss: string;
  totalcomission: string;
  exposuresum: string;
  availablebalancesum: string;
  exposurelimit: string;
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
}

export interface AccountListRowInterface {
  key?: number;
  callProfile?: boolean;
  showOptions?: boolean;
  showUserDetails?: boolean;
  showCReport?: boolean;
  containerStyle?: any;
  profit?: boolean;
  fContainerStyle?: any;
  fTextStyle?: any;
  element?: any;
  getListOfUser?: (value: any) => void;
  show?: boolean;
}

export interface RowModalComponent {
  selected?: number | null;
  setSelected?: (value: any) => void;
  backgroundColor?: string;
}
