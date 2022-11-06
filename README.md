# eslint-config-ts-standard-next

## 🔖 Description
Eslint config with standard-typescript (+other plugins) and extra opinionated configs applying best practices and focused on declarative code

# 📖 Summary
> Linting and best practices rules for:
> - JavaScript and JSX
> - TypeScript and TSX
> - TSDoc
> - React and react hooks
> - NextJS
> - Accessibility (JSX a11y)
> - Package.json convention
> - JSON files
> - YAML
> - Markdown


# 🔥 Features
The final package published is the [eslint-config-ts-standard-next](packages/full-setup/README.md) but in this monorepo you can find the dependencies separated in the following packages:
- [eslint-config-base](packages/base/): 
  - standard config
  - json plugin for _*.json, *.jsonc and *.json5_
  - yml plugin for _*.yml and *.yaml_
  - package.json formatter + keys sorter
  - markdown plugin _*.md_
  - Additional opinionated rules like array formatting, import order and format, es6 conventions,...
- [eslint-config-typescript](packages/typescript/):
  - eslint-config-base
  - standard-with-typescript config
  - typescript-eslint/recommended config
  - TSDoc plugin to keep comments as the convention says
  - several additional opinionated rules like naming convention, enforce "import type" for types, ...
- [eslint-config-next](packages/next/):
  - eslint-config-typescript which has all the bullets mentioned before
  - eslint-config-next for next related rules + react + react-hooks + jsx a11y for accessibility
  - Switch on some react rules to enforce consistency


---


## 🤓 Happy Code

> Created with Typescript! ⚡ and latin music 🎺🎵

### This README.md file has been written keeping in mind

- [GitHub Markdown](https://guides.github.com/features/mastering-markdown/)
- [Emoji Cheat Sheet](https://www.webfx.com/tools/emoji-cheat-sheet/)
