# Vue.js 3 Preloader

Vue.js 3 Preloader with 2x different themes.

# Preview
Preloading with percentage:
![Preloading with percentage](https://i.ibb.co/bRbHRB0/ezgif-com-optimize.gif)

Preloading spinner:
![Preloading with spinner](https://i.ibb.co/wRT8P1c/ezgif-com-optimize-1.gif)

## Project Setup

Coming soon - NPM package `npm install @richardev/vue-preloader@latest`
```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

# Usage
```ts
import { VuePreloader } from 'vue-preloader';
```

```vue
  <vue-preloader @loading="show = true" @loaded="show = false" :overflow="true" theme="spinner" />
```
