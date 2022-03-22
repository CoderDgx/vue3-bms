/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "../../index";

export function getPageList(pageUrl: string, queryInfo: any) {
  return request.post({
    url: pageUrl,
    data: queryInfo,
  });
}

export function deletePageData(pageUrl: string) {
  return request.delete({
    url: pageUrl,
  });
}
