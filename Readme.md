## Nightwatch custom commands and assertions

These are some useful commands that integrate with the nightwatch-html-reporter:
* takeScreenshot
* logMessage

### How do you use these commands?

You can install it using npm:

```
npm install @rpii/nightwatch-custom-commands --save-dev

```json
const ciCommands = require('@rpii/nightwatch-custom-commands');
module.exports = {

    "test_workers": false,
    "src_folders": ["tests"],
    "globals_path": "globals/globals.js",
    "custom_commands_path": [ciCommands.commandPath],
```

Now you should be able to use these commands when you call `nightwatch --test`.

-
