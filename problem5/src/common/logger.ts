import { RequestContext } from "./RequestContext";

/**
 * ANSI color codes for console logs
 */
const LogColors = {
    info: '\x1b[32m', // Green
    error: '\x1b[31m', // Red
    warn: '\x1b[33m', // Yellow
    debug: '\x1b[34m', // Blue
    reset: '\x1b[0m', // Reset color
};

type LogLevel = 'info' | 'error' | 'warn' | 'debug';

/**
 * Simple Logger Utility with Request ID support and colored log levels.
 */
export const logger = {
    log: (level: LogLevel, message: string, meta?: any) => {
        const requestId = RequestContext.get('requestId') || 'N/A';
        const timestamp = new Date().toISOString();
        const metaString = meta ? `\n ${JSON.stringify(meta)}` : '';

        const color = LogColors[level] || LogColors.reset;

        console.log(
            `${color}[${timestamp}] [Request ID: ${requestId}] [${level.toUpperCase()}]:${LogColors.reset} ${message}${metaString}`
        );
    },

    info: (message: string, meta?: any) => logger.log('info', message, meta),
    error: (message: string, meta?: any) => logger.log('error', message, meta),
    warn: (message: string, meta?: any) => logger.log('warn', message, meta),
    debug: (message: string, meta?: any) => logger.log('debug', message, meta),
};
