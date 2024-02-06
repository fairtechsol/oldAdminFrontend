export interface InputInterface {
  id?: string;
  title?: string;
  value?: any;
  containerStyle?: any;
  required?: boolean;
  placeholder?: string;
  titleStyle?: any;
  inputStyle?: any;
  inputContainerStyle?: any;
  inputProps?: any;
  type?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  img?: any;
  img1?: any;
  imgstyle?: any;
  onBlur?: any;
  place?: number;
  error?: any;
  max?: number;
  min?: number;
  okButtonRef?: string;
  onChange?: (value: any) => void;
  name?: string;
}

export interface LoaderInterface {
  text?: string;
  height?: string;
  width?: string;
}

export interface PaginationInterface {
  getListOfUser?: (value: any) => void;
  currentLimit?: any;
  currentPage: number;
  pages: string | number;
  setCurrentPage: (value: any) => void;
  className?: any;
}
