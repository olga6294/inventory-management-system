import "express-async-errors";
import config from "./common/configuration"
import { MongoDB } from "./mongodb/mongodb";
import { app } from "./app";

MongoDB.connect(config.DB_URL)
  .then(() => app.listen(config.PORT, () => console.log(`Listening on PORT: ${config.PORT}`)))
  .catch((error) => console.log("Cannot connect to the database", error));
