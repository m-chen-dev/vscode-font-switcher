# Visual Studio Code Font Switcher

I built this font switcher to improve upon the string based font selection that VSCode has which is prone to simple mistakes such as misspelling.
It loads the list of installed fonts on your OS and displays them through a grid, where you can filter through the fonts with a search bar.
Right now I have it built with Electron so that it can load fonts from the OS, but I am currently working on porting the current codebase to a VSCode extension codebase.

It uses React to organize the UI into components, and Tailwind CSS to style them.

# Building & Running

1. Clone the repository
   ```bash
   git clone https://github.com/m-chen-dev/vscode-font-switcher
   cd vscode-font-switcher
   ```
3. Run `npm install` to install React, Electron, Tailwind CSS + other dependencies
4. Execute this command: `npm run electron:dev` to launch the React dev server and open the Electron preview
