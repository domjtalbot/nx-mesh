module.exports = {
  sources: [
    {
      name: 'Weatherbit',
      handler: {
        newOpenapi: {
          baseUrl: 'http://api.weatherbit.io/v2.0/',
          oasFilePath: 'https://www.weatherbit.io/static/swagger.json',
        },
      },
    },
  ],
  serve: {
    browser: false,
  },
  documents: ['./src/graphql/**/*.*.graphql'],
};
