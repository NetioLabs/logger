## Overview

Simple logger for the browser and node.

```javascript
const { Logger } = require("@netio/logger");

const logger = new Logger("foo.bar");
logger.info`Hello World!`;
```

## Example output

<img width="478" src="docs/example1-terminal.png?raw=true" alt="Screenshot of log results in the terminal">

<p />

<img width="478" src="docs/example1-browser.png?raw=true" alt="Screenshot of log results in Chrome's developer console">

## API

```javascript
logger.debug`Debug`;
logger.info`Info`;
logger.success`Success`;
logger.warn`Warn`;
logger.error`Error`;
```

<img width="281" src="docs/example-levels.png?raw=true" alt="Screenshot of log results in the terminal">
