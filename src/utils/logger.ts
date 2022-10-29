class Logger {
  public info = (args: string | object) => {
    return console.info(args)
  }

  public warning = (args: string | object) => {
    return console.warn(args)
  }

  public debug = (args: string | object) => {
    return console.debug(args)
  }

  public error = (args: string | object) => {
    return console.error(args)
  }
}

export const logger = new Logger()
