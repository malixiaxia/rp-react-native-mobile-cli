module.exports = {
    presets: ["module:metro-react-native-babel-preset"],
    "plugins": [
        ["transform-inline-environment-variables",
            {
                "include": [
                    "NODE_ENV",
                    "REACT_APP_ENV"
                ]
            }
        ],
        [
            'module-resolver',
            {
                root: ['./src'],
                extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
                alias: {
                    '@': ['./src']
                }
            }
        ]
    ]
};

