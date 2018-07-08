import { LogEntry, LogType } from "../entry";

export class TerminalConsole {
    private lastScope = "";

    log(entry: LogEntry): void {
        const templates: string[] = [];
        const values: any[] = [];

        const typeInfo = getTypeInfo(entry.type);
        if (typeInfo.label) {
            templates.push(typeInfo.label + " ");
        }

        const printScope = this.lastScope !== entry.scope;
        this.lastScope = entry.scope;

        if (printScope) {
            templates.push("\x1b[2m\x1b[4m%s\x1b[0m \x1b[0m\n    ");
            values.push(entry.scope);
        }

        const { messageValues, messageStrings } = entry;
        messageStrings.forEach((string, index) => {
            templates.push(string);

            if (index >= messageValues.length) return;

            const value = messageValues[index];
            if (typeof value === "string") {
                templates.push("%s");
            } else {
                templates.push("%O");
            }

            values.push(value);
        });

        templates.push("\x1b[0m");

        console.log(templates.join(""), ...values);
    }
}

function getTypeInfo(type: LogType) {
    switch (type) {
        case LogType.WARN:
            return { label: "\x1b[33m ▵ \x1b[0m" };
        case LogType.ERROR:
            return { label: "\x1b[31m✖︎  \x1b[4merror\x1b[0m    " };
        case LogType.SUCCESS:
            return { label: "\x1b[32m ✔︎ \x1b[0m" };
        case LogType.INFO:
            return { label: "\x1b[02m I \x1b[0m" };
        case LogType.DEBUG:
            return { label: "\x1b[02m D \x1b[0m" };
        default:
            return { label: "    " };
    }
}
