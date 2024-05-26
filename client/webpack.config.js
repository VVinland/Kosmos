import path, { dirname } from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FilemanagerWebpackPlugin from 'filemanager-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
    mode: 'development',
    entry: path.join(__dirname, 'src', 'index.tsx'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'index[contenthash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: ["postcss-preset-env"]
                        }
                    }
                }, 'sass-loader']
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', 'jsx', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html'),
            filename: 'index.html'
        }),
        new FilemanagerWebpackPlugin({
            events: {
                onStart: {
                    delete: ['build']
                }
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'style[contenthash:8].css'
        })
    ],
    devServer: {
        watchFiles: path.join(__dirname, 'src'),
        port: 3000,
        open: true,
        hot: true,
        liveReload: true,
        historyApiFallback: true
    }
}

