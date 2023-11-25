export const printLog = (message?: any, ...optionalParams: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(message, optionalParams)
  }
}
