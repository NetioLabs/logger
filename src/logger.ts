import { BrowserConsole } from "./console/browser";
import { TerminalConsole } from "./console/terminal";
import { LogType } from "./entry";

declare const BROWSER_ENV: boolean | undefined;

const logConsole =
    (typeof BROWSER_ENV !== "undefined" && BROWSER_ENV) || typeof window !== "undefined"
        ? new BrowserConsole()
        : new TerminalConsole();

export class Logger {
    private scope: string;

    constructor(scope: string = "") {
        this.scope = scope;
    }

    success(...values: any[]) {
        this.log_(LogType.SUCCESS, values);
    }

    info(...values: any[]) {
        this.log_(LogType.INFO, values);
    }

    debug(...values: any[]) {
        this.log_(LogType.DEBUG, values);
    }

    warn(...values: any[]) {
        this.log_(LogType.WARN, values);
    }

    error(...values: any[]) {
        this.log_(LogType.ERROR, values);
    }

    private log_(type: LogType, values: any[]) {
        if (process.env.NODE_ENV && process.env.NODE_ENV !== "development") return;
        let messageStrings: string[] = [];
        let messageValues: any[] = [];
        if (Array.isArray(values[0]) && values[0].raw) {
            messageStrings = values[0];
            messageValues = values.slice(1);
        } else {
            messageStrings = Array(values.length).fill(" ");
            messageStrings[0] = "";
            messageValues = values;
        }

        const entry = {
            scope: this.scope,
            type,
            messageStrings,
            messageValues
        };

        logConsole.log(entry);
    }
}
