# RYZE Digital Stylelint Rules

## Install

```bash
npm i @ryze-digital/stylelint-config-website --save-dev
```

## Usage

Add the following to your `stylelint.config.js`:

```js
import config from '@ryze-digital/stylelint-config-website';

export default config;
```

## Add custom rules for your project

If you want to disable (for example) the limitation of nesting depth for your whole project, you have to change the
content of your `stylelint.config.js` to the following:

```js
export default {
    extends: '@ryze-digital/stylelint-config-website',
    rules: {
        'max-nesting-depth': null
    }
};
```