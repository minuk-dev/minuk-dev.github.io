---
layout  : wiki
title   : winston
date    : 2020-04-07 20:32:24 +0900
lastmod : 2022-03-15 02:34:17 +0900
tags    : [js, winston, log]
parent  : Javascript
---

```js
import * as config from "config";
    import { Logger, LoggerInstance, LoggerOptions, transports } from "winston";
    require("winston-daily-rotate-file");

    const defaultLevel = process.env.LOG_LEVEL;

    // We might want to do something on rotation?
    // rotateTransport.on("rotate", (oldFailename, newFilename) => {
    //     // do something fun
    // });

    const options: LoggerOptions = {
        exitOnError: false,
        level: defaultLevel,
        transports: [
            new transports.DailyRotateFile({
                name: "info",
                filename: config.logging.default,
                datePattern: "YYYY-MM-DD-HH",
                zippedArchive: true,
                maxSize: "20m",
                maxFiles: "14d",
                showLevel: true,
                timestamp: true,
                level: "info", // info and below to rotate
            }),
            new transports.DailyRotateFile({
                name: "error",
                filename: config.logging.error,
                datePattern: "YYYY-MM-DD-HH",
                zippedArchive: true,
                maxSize: "20m",
                maxFiles: "14d",
                showLevel: true,
                timestamp: true,
                level: "error", // error and below to rotate
            }),
            new transports.DailyRotateFile({
                name: "silly",
                filename: config.logging.silly,
                datePattern: "YYYY-MM-DD-HH",
                zippedArchive: true,
                maxSize: "20m",
                maxFiles: "1d",
                showLevel: true,
                timestamp: true,
                level: "silly", // error and below to rotate
            }),
        ],
    };

    const logger: LoggerInstance = new Logger(options);

    if (process.env.NODE_ENV === "develop") {
        logger.add(transports.Console, {
            colorize: true,
            showLevel: true,
            timestamp: true,
            level: "debug", // debug and below to console
        });
    }

    export { logger };
```
