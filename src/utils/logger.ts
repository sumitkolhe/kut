export class Logger {
  public info = (args: string) => {
    return console.info(args)
  }

  public warning = (args: string) => {
    return console.warn(args)
  }

  public debug = (args: string) => {
    return console.debug(args)
  }

  public error = (args: string) => {
    return console.error(args)
  }
}
