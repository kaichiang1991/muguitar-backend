import { NextFunction, Request, Response } from 'express'

export interface IExpressCallback {
  (req: Request, res: Response, next?: NextFunction): void
}

export interface IResponseData {
  code: eErrorCode
  data: any
}

export enum eErrorCode {
  success = 0,
  fail = -1, // 統一的錯誤

  // 個別的錯誤
  deleteNoOne = -2,
  notFound = -3,
  userIdentifyFail = -4,
}
