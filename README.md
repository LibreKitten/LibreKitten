# LibreKitten - Blocks not just for the browser; say hello to the server!
LibreKitten is an **alpha-quality** block-based visual programming language based on TurboWarp, that allows you to program more than just the browser; you can program the server. You can reach the clouds with LibreKitten!

This is the source code for LibreKitten. If you want to try out LibreKitten, go to [https://librekitten.org/](https://librekitten.org/).

If you want to try out a build with the newest commits (at the cost of stablility and breaking changes), go to [https://canary.librekitten.org/](https://canary.librekitten.org/).

If you want to contribute, [please read the For Contributors page](https://librekitten.org/for-contributors.html) on our website. Also, we prefer you [contribute on our Codeberg repository](https://codeberg.org/LibreKitten/LibreKitten/).

## Why does LibreKitten exist?
Scratch is made for a novice userbase. This means it doesn't cater to the more advanced users of Scratch who like the simple block-based interface of Scratch and the easy to use primitive blocks, but want more advanced features.

For this audience, we have made a new block-based visual programming language called LibreKitten. It is a fork of TurboWarp, which itself was forked off Scratch.

LibreKitten was created with the intention of containing more advanced features and accept contributions written by the community, while still being for all ages.

## License
The licenses for the packages are in the individual packages (mainly GPL-3.0-only and MPL-2.0); however, the files that are *not* in any package, are under CC0.

## How do I run the server?
*Note: The server has not been tested on Windows and may not work properly on there. You may want to run the server in Windows Subsystem for Linux if you must use Windows.*

There are two ways to run the server: downloading the build and running it, or running from the source code. You probably want to do the first.

### First way:
1. Install Node.js, if you haven't already.
2. Download the latest file, that has a name that looks like "(version)-cli.tar.gz", from the Releases tab, and unzip it.
3. In the terminal, run `/path/to/the/unzipped/folder/librekitten.js serve /path/to/your/Project.lb 8080`.
### Second way:
1. Clone LibreKitten using git and enter it in the terminal.
2. Install Node.js and pnpm, if you haven't already.
3. Run `pnpm install` in the terminal.
4. Run `node /path/to/LibreKitten/packages/vm/src/server/cli.js serve /path/to/your/Project.lb 8080` in the terminal.
### Third way (if you use Arch Linux):
1. Install the unofficial `librekitten-cli-bin` AUR package using your favourite helper.
```bash
paru -S librekitten-cli-bin
# or:
yay -S librekitten-cli-bin
```
2. Run `librekitten serve /path/to/your/Project.lb 8080` in the terminal.