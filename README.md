# toolbase.dev

## Setup

Requires:
* Angular CLI
* .NET 6.0 SDK

Install dependencies: 
```
dotnet restore
cd ClientApp
npm install
```

Start the project using `dotnet run` then navigate to `https://localhost:7210`

### Plugins

Code style is enforced with the following VSCode extensions and dev dependencies:

* **TS, SCSS, HTML, JSON**
    * eslint
        * @typescript-eslint
        * @typescript-eslint/eslint-plugin
        * tsdoc
        * jsdoc
    * prettier
    * eslint-prettier
    * editorconfig
* **C#**
    * StyleCop
    * CSharpier

Dev dependencies will be install with the commands in Setup.
The VSCode extensions will be recommended automatically via
`.vscode/extensions.json`