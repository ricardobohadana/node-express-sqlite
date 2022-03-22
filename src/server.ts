import { env } from "process";
import { app } from "./app";

app.listen(env.PORT || 3001, () =>
  console.log(`The server is running on port ${env.PORT || 3001}`)
);
