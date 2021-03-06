const contentful = require('contentful');
require('dotenv').config();

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
    generate: {
        dir: 'public',
        routes: function () {
            const client = contentful.createClient({
                // This is the space ID. A space is like a project folder in Contentful terms
                space: process.env.CTF_SPACE_ID,
                // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
                accessToken: process.env.CTF_CDA_ACCESS_TOKEN
            });
            return client.getEntries({
                content_type: 'blogPost'
            }).then((response) => {
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
