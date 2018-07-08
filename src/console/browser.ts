import { LogEntry, LogType } from "../entry";

export class BrowserConsole {
    private lastScope = "";
    private groupOpen = false;
    private groupCloseTimer: number;
    private pendingGroupEntry: LogEntry | null = null;
    private allowGrouping = false;
    constructor() {}

    log(entry: LogEntry): void {
        if (!this.allowGrouping) {
            this.send(entry, true);
            return;
        }

        if (this.groupOpen) {
            const scopeChanged = this.lastScope !== entry.scope;
            if (!scopeChanged) {
                this.send(entry, false);
                return;
            } else {
                // close group
                console.groupEnd();
                this.groupOpen = false;
            }
        }

        if (this.pendingGroupEntry) {
            if (this.pendingGroupEntry.scope === entry.scope) {
                // open new group
                let templates: string[] = [];
                let values: any[] = [];
                templates.push("%c%s%c");
                values.push("color: #aaa;");
                values.push(entry.scope);
                values.push("color: black;");

                console.group(templates.join(""), ...values);
                this.groupOpen = true;
                // this.scheduleGroupClose();

                // flush pending within group
                this.send(this.pendingGroupEntry, false);
                this.send(entry, false);

                this.pendingGroupEntry = null;
                return;
            } else {
                // flush pending as single
                this.send(this.pendingGroupEntry, true);
                this.pendingGroupEntry = null;
            }
        }

        this.pendingGroupEntry = entry;
        setTimeout(() => {
            // flush pending as single
            if (this.pendingGroupEntry) {
                this.send(this.pendingGroupEntry, true);
                this.pendingGroupEntry = null;
            }
        }, 100);
    }

    private send(entry: LogEntry, includeScope: boolean) {
        const scopeChanged = this.lastScope !== entry.scope;
        this.lastScope = entry.scope;

        let templates: string[] = [];
        let values: any[] = [];

        const { messageValues, messageStrings } = entry;

        const { color, label, bodyColor } = getPrintInfo(entry.type);

        templates.push("%c%s%c ");
        values.push(`background-color: ${color}; color:white;`);
        values.push(`${label}`);
        values.push(`color: #000;text-decoration:none;`);

        if (includeScope) {
            templates.push("%c%s%c");
            values.push("color: #aaa;");
            values.push(`[${entry.scope}] `);
            values.push("color: black;");
        }

        templates.push("%c");
        values.push(`color: #888;`);

        messageStrings.forEach((string, index) => {
            templates.push(string);

            if (index >= messageValues.length) return;

            const value = messageValues[index];
            if (typeof value === "string") {
                templates.push("%s");
            } else if (typeof value === "number") {
                templates.push("%f");
            } else {
                templates.push("%O");
            }

            values.push(value);
        });

        if (entry.type === LogType.ERROR) {
            console.error(templates.join(""), ...values);
        } else if (entry.type === LogType.WARN) {
            console.warn(templates.join(""), ...values);
        } else if (entry.type === LogType.DEBUG) {
            console.debug(templates.join(""), ...values);
        } else if (entry.type === LogType.INFO) {
            console.info(templates.join(""), ...values);
        } else {
            console.log(templates.join(""), ...values);
        }
    }

    private scheduleGroupClose() {
        if (this.groupCloseTimer) {
            clearTimeout(this.groupCloseTimer);
        }

        setTimeout(() => {
            if (!this.groupOpen) return;
            this.groupOpen = false;
            console.groupEnd();
        }, 5000);
    }
}

function getPrintInfo(type: LogType) {
    switch (type) {
        case LogType.WARN:
            return { color: "#f80", label: " W ", bodyColor: "#000" };
        case LogType.ERROR:
            return { color: "#f22", label: " E ", bodyColor: "#000" };
        case LogType.SUCCESS:
            return { color: "#0a5", label: " ✔ ︎", bodyColor: "#000" };
        case LogType.INFO:
            return { color: "#aaa", label: " I ", bodyColor: "#000" };
        case LogType.DEBUG:
            return { color: "#ddd", label: " D ", bodyColor: "#aaa" };
        default:
            return { color: "#000", label: "   ", bodyColor: "#000" };
    }
}
