# Addons

Most Addons and translations are from the [Scratch Addons browser extension](https://scratchaddons.com/).
TurboWarp applies some patches on top of the original source files. These patches are maintained in https://github.com/TurboWarp/addons.

Blockly Dev Tools is from https://github.com/ZXMushroom63/ScratchAddons/ under the [GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.en.html).

entry.js exports a function that begins running addons.

pull.js is a magical script that automatically pulls code from GitHub, parses it with regex, applies some more automated patches, and copies everything to the proper folders.

Directory structure:

 - addons - the addons (managed by pull.js)
 - addons-l10n - addon translations used at runtime (managed by pull.js)
 - addons-l10n-settings - addon translations used by the settings page (managed by pull.js)
 - libraries - libraries used by addons (managed by pull.js)
 - generated - additional generated files (managed by pull.js)
 - settings - the settings page and its translations
