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
  // plugins: [
  //   {
  //     snapshot: {
  //       if: "process.env.NODE_ENV != 'production'",
  //       apply: [
  //         'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso',
  //       ],
  //       outputDir: '__snapshots__',
  //     },
  //   },
  // ],
  serve: {
    browser: false,
  },
  documents: ['./src/graphql/**/*.*.graphql'],
};
