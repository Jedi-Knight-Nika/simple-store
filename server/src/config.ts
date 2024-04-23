import 'dotenv/config';

export default {
  STAGE: process.env.STAGE || 'dev',
  PORT: process.env.PORT || 3000,
  API_VERSION: process.env.API_VERSION || "v1",
  OPEN_API: {
    DESCRIPTION: process.env.OPEN_API_DESCRIPTION || 'Open API description',
    TITLE: process.env.OPEN_API_TITLE || 'Open API title',
    VERSION: process.env.OPEN_API_VERSION || '1.0.0',
  },
};
