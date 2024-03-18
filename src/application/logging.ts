import winston from "winston";

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
}

const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
};

winston.addColors(colors)
export const logger = winston.createLogger({
    levels: logLevels,
    level: "debug",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({})
    ]
})