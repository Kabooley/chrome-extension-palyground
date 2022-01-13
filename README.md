# 私を読んで

## About this directory

ここは chrome extension の動作確認用のディレクトリである

## 環境

-   Webpack
-   Node.js
-   TypeScript

## 環境開発手順

```bash
npm init
# May omit.
git init
git add .
git commit -m "npm init"

# install TypeScript
npm i -D typescript
touch tsconfig.json
vi tsconfig.json
# ... edit json file

# install React
npm i -D react

#webpack
npm i -D webpack
npm i -D webpack-cli
touch webpack.config.js
# ...edit webpack.config.js

# webpack.config.jsでのoutputで指定された出力先
mkdir dist/
# webpack.config.jsでのentryで指定された入力先
mkdir src/

# install plugins
npm i -D copy-webapck-plugin
npm i -D html-webapck-plugin

```

tsconfig.json

```JSON
{
    "compilerOptions": {
        "jsx": "react",
        "module": "es6",
        "target": "es6",
        "moduleResolution": "node",
        "esModuleInterop": true,
    },
    "inlcude": ["src/**/*.ts", "src/**/*.tsx"],
    "exclude": ["node_modules"]
}
```

webpack.config.js

```JavaScript
const path = require("path");
// plugins
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: {
    //   src/以下のファイルを指定する
    // プロパティ名が出力のファイルの名前になる
    // 一例
    popup: path.resolve("src/popup/popup.tsx"),
    options: path.resolve("src/options/options.tsx"),
    background: path.resolve("src/background/background.ts"),
    contentScript: path.resolve("src/contentScript/contentScript.ts"),
    controller: path.resolve("src/contentScript/controller.ts"),
    captureSubtitle: path.resolve("src/contentScript/captureSubtitle.ts"),
  },
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.tsx?$/,
        exclude: /node_modules/,
      },
      {
        use: ["style-loader", "css-loader"],
        test: /\.css$/i,
      },
      {
        type: "asset/resource",
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
        {
      patterns: [
          from: path.resolve("src/static"),
          to: path.resolve("dist"),
        },
      ],
    }),
    // htmlファイルを出力させる
    ...getHtmlPlugins(["popup", "options"]),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
};

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HtmlPlugin({
        title: "React Extension",
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  );
}

```