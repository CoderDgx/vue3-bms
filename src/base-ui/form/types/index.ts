/* eslint-disable @typescript-eslint/no-explicit-any */
interface SelectOption {
  label: string;
  value: any;
}

type ItemType = "input" | "password" | "select" | "datepicker";

export interface FormItem {
  field: string;
  type: ItemType;
  label: string;
  placeHolder?: string;
  rules?: any[];
  options?: SelectOption[];
  otherOption?: any;
  defaultValue?: any;
  isHidden?: boolean;
}

export interface FormTypes {
  title?: string;
  formItems?: FormItem[];
  labelWidth?: string;
  itemStyle: any;
  colLayout?: any;
}
