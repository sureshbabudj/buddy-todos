import path from "path";
import { Configuration } from "webpack";
import * as webpackDevServer from "webpack-dev-server";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HTMLWebpackPlugin from "html-webpack-plugin";
import { merge } from "webpack-merge";

// Common configuration
const commonConfig: Configuration = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
    },
  },
  externals: {
    "react-native-sqlite-storage": "react-native-sqlite-storage",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "public" }],
    }),
    new HTMLWebpackPlugin({
      template: "./src/index.html", //source
      filename: "index.html", //destination
    }),
  ],
};

// Development configuration
const devConfig: Configuration = {
  mode: "development",
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
    compress: true,
    port: 9000,
  },
};

// Production configuration
const prodConfig: Configuration = {
  mode: "production",
  // Add any production-specific plugins or settings here
};

// Export the merged configuration
const config: Configuration = merge(
  commonConfig,
  process.env.NODE_ENV === "production" ? prodConfig : devConfig
);

export default config;
