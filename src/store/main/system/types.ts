/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SystemState {
  usersTotalCount: number;
  usersList: any[];
  departmentTotalCount: number;
  departmentList: any[];
  roleTotalCount: number;
  roleList: any[];
  menuList: any[];
  categoryTotalCount: number;
  categoryList: any[];
  goodsTotalCount: number;
  goodsList: any[];
  storyTotalCount: number;
  storyList: any[];
}

export interface PagePayload {
  pageName: string;
  // pageUrl: string
  queryInfo: any;
  id?: number;
}
