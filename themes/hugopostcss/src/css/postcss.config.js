module.exports = ({
    file,
    options,
    env
}) => ({
    plugins: {
        'postcss-import': {
            root: file.dirname
        },
        "postcss-cssnext": {
            browsers: ["last 2 versions", "> 5%"],
            features: {
                autoprefixer: false
            }
        },
        'autoprefixer': env == 'production' ? options.autoprefixer : true,
        'cssnano': env === 'production' ? options.cssnano : false
    }
})