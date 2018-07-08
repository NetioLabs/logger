export interface LogEntry {
    scope: string;
    type: LogType;
    messageStrings: string[];
    messageValues: any[];
}

export enum LogType {
    SUCCESS = "success",
    DEBUG = "debug",
    INFO = "info",
    WARN = "warn",
    ERROR = "error"
}
