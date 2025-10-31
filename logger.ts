// utils/logger.ts
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import fs from 'fs';
import path from 'path';
import { pageFixture } from './setup/pageFixture.ts';

const logDir = 'logs';

// Ensure log directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({ message, timestamp }) => {
  pageFixture.report += `[${timestamp}] ${message}\n`;   
  return `[${timestamp}] ${message}`;
});

const dailyRotateTransport = new DailyRotateFile({
  filename: path.join(logDir, 'Log-TS-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxSize: '20m',
  maxFiles: '14d', // keep logs for 14 days
});

const logger = createLogger({
  level: 'info',
  format: combine(
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    new transports.Console(),
    dailyRotateTransport
  ]
});

export default logger;