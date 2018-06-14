require('dotenv').config();
const client = require('./src/js/plugins/contentful');

module.exports = {
    srcDir: 'src/js',
    /*
    ** Headers of the page
    */
    head: {
        title: '{{ name }}',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '{{escape description }}' }
        ]
    },
    /*
    ** Customize the progress bar color
    */
    loading: { color: '#3B8070' },
    /*
    ** Build configuration
    */
    build: {
        /*
        ** Run ESLint on save
        */
        extend (config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                });
            }
        }
    },
    plugins: ['~/plugins/contentful'],
    modules: ['@nuxtjs/dotenv'],
    generate: {
        dir: 'public',
        routes() {
            return client.getEntries({
                content_type: 'blogPost'
            })
                .then((response) => {
                    return response.items.map(entry => {
                        return {
                            route: entry.fields.slug,
                            payload: entry
                        };
                    });
                });
        }
    }
};
