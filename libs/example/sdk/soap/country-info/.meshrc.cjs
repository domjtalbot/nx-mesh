module.exports = {
  sources: [
    {
      name: 'CountryInfo',
      handler: {
        soap: {
          source:
            'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL',
        },
      },
    },
  ],
  serve: {
    browser: false,
  },
  documents: ['./src/graphql/**/*.*.graphql'],
};
