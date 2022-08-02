module.exports = {
  sources: [
    {
      name: 'JavaScript Wiki',
      handler: {
        openapi: {
          source:
            'https://api.apis.guru/v2/specs/wikimedia.org/1.0.0/swagger.yaml',
        },
      },
    },
  ],
  serve: {
    browser: false,
  },
};
