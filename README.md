# Visual Studio Code Font Switcher

I built this font switcher to improve upon the string based font selection that VSCode has which is prone to simple mistakes such as misspelling.
It loads the list of installed fonts on your OS and displays them through a grid, where you can filter through the fonts with a search bar.
Right now I have it built with Electron so that it can load fonts from the OS, but I am currently working on porting the current codebase to a VSCode extension codebase.

It uses React to organize the UI into components, and Tailwind CSS to style them.

## Building & Running

1. **Clone the repository**
   ```bash
   git clone https://github.com/m-chen-dev/vscode-font-switcher
   cd vscode-font-switcher
   ```
3. **Install React, Electron, Tailwind CSS + other dependencies**
   ```bash 
   npm install
   ``` 
4. **Launch the React dev server and open the Electron preview**
   ```bash
   npm run electron:dev
   ```

## Preview
<p align="center">
  <img width="600" height="560" alt="Electron font list preview" src="https://github.com/user-attachments/assets/11d571a0-9ddb-4ce8-a426-5f9076cea1cf" />
</p>