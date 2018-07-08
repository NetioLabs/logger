## Usage

```javascript
const { Logger } = require("@netio/logger");

const logger = new Logger("foo.bar");
logger.info`Hello World!`;
```

## Example output

<div style="display:flex">
  <div style="margin:6px;">
    <img src="docs/example1-terminal.png?raw=true" alt="Screenshot of log results in the terminal">
  </div>
  <div style="margin:6px;">
    <img src="docs/example1-browser.png?raw=true" alt="Screenshot of log results in Chrome's developer console">
  </div>
</div>

## API

```javascript
logger.debug`Debug`;
logger.info`Info`;
logger.success`Success`;
logger.warn`Warn`;
logger.error`Error`;
```

![Screenshot of log results in the terminal](docs/example-levels.png?raw=true)
