import "dotenv/config";

export default {
  STAGE: process.env.STAGE || "dev",
  PORT: process.env.PORT || 3000,
  API_VERSION: process.env.API_VERSION || "v1",
  OPEN_API: {
    DESCRIPTION: process.env.OPEN_API_DESCRIPTION || "Simple Store docs",
    TITLE: process.env.OPEN_API_TITLE || "Simple Store",
    VERSION: process.env.OPEN_API_VERSION || "1.0.0",
  },
  STORE_BASE_URL: process.env.STORE_BASE_URL || "https://app.ecwid.com/api/v3",
};
