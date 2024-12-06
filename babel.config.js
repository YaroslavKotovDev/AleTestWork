module.exports = {
    presets: [
        'next/babel',
        '@babel/preset-typescript',
        ['@babel/preset-react', { runtime: 'automatic' }],
    ],
    // plugins: [
    //     ['babel-plugin-root-import', {
    //         "rootPathSuffix": "src",
    //         "rootPathPrefix": "@"
    //     }]
    // ],
    // ignore: ['node_modules'],
};
