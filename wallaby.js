module.exports = function (wallaby) {
    return {
        files: [
            'src/scripts/**/*.js',
            '!src/scripts/main.js',
        ],

        env: {
            type: 'node'
        },

        compilers: {
            '**/*.js': wallaby.compilers.babel()
        }
    };
};