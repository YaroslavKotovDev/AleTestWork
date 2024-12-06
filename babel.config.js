module.exports = {
    // presets: [
    //     ['@babel/preset-env'],
    //     '@babel/preset-typescript',
    // ],
    "presets": [
        ["@babel/env", {"modules": false}],
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    "plugins": [
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-syntax-import-meta",
        ["@babel/plugin-proposal-class-properties", {"loose": false}],
        ["babel-plugin-root-import", {
            "rootPathSuffix": "src",
            "rootPathPrefix": "@"
        }]
    ]
};

