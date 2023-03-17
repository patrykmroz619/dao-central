import winston from "winston";

export const deployLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss Z" }),
    winston.format.printf(
      (info) =>
        `${info.timestamp} ${info.level}: ${info.message}` +
        (info.splat !== undefined ? `${info.splat}` : " ")
    )
  ),
  defaultMeta: { service: "deploy" },
  transports: [new winston.transports.File({ filename: "deploy-logs.log" })],
});

deployLogger.add(
  new winston.transports.Console({
    format: winston.format.printf(
      (info) =>
        `${info.timestamp} ${info.level}: ${info.message}` +
        (info.splat !== undefined ? `${info.splat}` : " ")
    ),
  })
);
