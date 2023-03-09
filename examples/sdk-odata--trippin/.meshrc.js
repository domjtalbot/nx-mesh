module.exports = {
  sources: [
    {
      name: 'Trippin',
      handler: {
        odata: {
          baseUrl:
            'https://services.odata.org/TripPinRESTierService/(S({env.NX__TRIPPIN__API_KEY}))/',
          batch: 'multipart',
          expandNavProps: true,
        },
      },
    },
  ],
  serve: {
    browser: false,
  },
  documents: ['./src/graphql/**/*.*.graphql'],
};
