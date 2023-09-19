// export interface BaseResponse<TResponse> {
//     isSuccessful: number;
//     failureMessage: string;
//     response: TResponse;
//   }
  

  export interface BaseResponse {
    isSuccessful: boolean;
    failureMessage?: string;
    response?: any;
  }
  