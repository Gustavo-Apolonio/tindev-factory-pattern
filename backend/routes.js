import cors from "cors";

import DevController from "./src/controllers/DevController.js";
import LikeController from "./src/controllers/LikeController.js";

function serverConfig(express, app) {
  app.use(cors());
  app.use(express.json());
}

export default function Routes(express, app) {
  serverConfig(express, app);

  app.use("/dev", DevController);
  app.use("/dev", LikeController);
}
