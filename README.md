# LibreKitten Monorepo
This is the source code of LibreKitten. If you want to try out LibreKitten, go to [https://librekitten.org/](https://librekitten.org/).
## License
The licenses for the packages are in the individual packages, the non-package files are under CC0.

# About LibreKitten
## What is LibreKitten?
LibreKitten is an alpha-quality block-based visual programming language based on TurboWarp. The primary feature is being able to function as a web server, but it is also an experimentation ground to push the limits of block-based languages.

## Why does LibreKitten exist?

Scratch is made for a novice userbase. This means it doesn't cater to the more advanced users of Scratch who like the simple block-based interface of Scratch and the easy to use primitive blocks, but want more advanced features.

For this audience, we have made a new block-based visual programming language called LibreKitten. It is a fork of TurboWarp, which itself was forked off Scratch.

LibreKitten was created with the intention of containing more advanced features and accept contributions written by the community, while still being for all ages.

# How do I run the server?
*Currently, there are no server builds. We're planning on building them soon. For now, you can clone the source code to try it out.*
- Clone the repository and enter it in the terminal.
- Install Node.js and pnpm (if you haven't already.)
- Run `pnpm install --shamefully-hoist` in the terminal.
- Run `node /path/to/LibreKitten/packages/vm/src/cli/server.js /path/to/Project.lb` in the terminal.