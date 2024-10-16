# ビルド方法

## `npm run dev`

developmentモードでビルドするフロントエンド用サーバを起動します、
<br>http://localhost:5173 でページにブラウザからアクセス可能で、ファイル編集でページが更新されます。
<br>(localhostではなく他のPCからアクセスしたい場合は`npx vite --host`で起動します)

## `npm run build`

productionモードでビルドして`dist`ディレクトリに公開用のファイルが保存されます。
<br>(型チェックなどビルドエラーの場合はファイルが保存されません、ビルドだけ実行する場合は`npx vite build`で可能です)

---

**以降はREADMEのデフォルト内容**

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list