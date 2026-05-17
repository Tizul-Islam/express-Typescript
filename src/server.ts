import app from "./app";
import config from "./config";
import { iniDB } from "./db";

const main = async () => iniDB();
app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`);
});

main();
