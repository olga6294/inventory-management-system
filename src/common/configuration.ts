import * as dotenvflow from "dotenv-flow";

try {
  dotenvflow.config();
} catch (error) {
  console.log("Cannot process .env file", error);
}

const configuration: {[key in string]: any} = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL
}

function checkConfiguration(config: {[key in string]: any}) {
  Object.keys(config).forEach(key => {
    if (config[key] === undefined)
      throw new Error(`Missing environment variable: ${key}`);
  })

  return config;
}

export default checkConfiguration(configuration);
