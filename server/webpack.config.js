import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import FileManagerPlugin from 'filemanager-webpack-plugin';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
    mode: 'development',
    entry: path.join(__dirname, 'src'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index[contenthash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    devServer: {
        watchFiles: path.join(__dirname, 'src'),
        port: 8000,
        open: false,
        hot: true,
        liveReload: true
    },
    plugins: [
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: ['dist']
                }
            }
        })
    ]
}