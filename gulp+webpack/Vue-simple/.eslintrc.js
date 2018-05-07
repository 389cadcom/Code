module.exports = {
    env: {
        browser: true,
        node: true,
        commonjs: true,
        es6: true
    },
    extends: 'eslint:recommended',
    parserOptions: {
        sourceType: 'module',
        parser: 'babel-eslint'
    },
    plugins: ['vue'],
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'windows'],
        quotes: ['error', 'single'],
        semi: ['error', 'never']
    },
    /* globals: {
        __dirname: true
    } */
}
