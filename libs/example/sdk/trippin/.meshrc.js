module.exports = {
  sources: [
    {
      name: 'TripPin',
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
  sdk: {
    generateOperations: {
      selectionSetDepth: 6,
    },
  },
};
