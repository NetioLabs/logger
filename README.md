## Usage

```javascript
const { Logger } = require("@netio/logger");

const logger = new Logger("foo.bar");
logger.info`Hello World!`;
```

## Terminal

![Screenshot of log results in the terminal](docs/example1-terminal.png?raw=true)

## Browser

![Screenshot of log results in Chrome's console](docs/example1-browser.png?raw=true)

## API

```javascript
logger.debug`Debug`;
logger.info`Info`;
logger.success`Success`;
logger.warn`Warn`;
logger.error`Error`;
```

![Screenshot of log results in the terminal](docs/example-levels.png?raw=true)
