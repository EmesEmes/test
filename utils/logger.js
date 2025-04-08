import winston from 'winston'

const logFormat = winston.format.printf(({level, message, timestamp}) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`
})

const customLevels = {
  error: 0,
  warning: 1,
  info: 2,
  degub: 3
}

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss"}),
    logFormat
  ),
  levels: customLevels,
  transports: [
    new winston.transports.Console({
      level: "debug"
    })
  ]
})

export default logger