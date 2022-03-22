import { Router, Request, Response } from "express";
import QuestionController from "../controllers/QuestionController";
import RoomController from "../controllers/RoomController";

const router = Router();

router
  .route("/room")
  .get((request: Request, response: Response) =>
    RoomController.get(request, response)
  )
  .post((request: Request, response: Response) =>
    RoomController.create(request, response)
  )
  .put((request: Request, response: Response) =>
    RoomController.put(request, response)
  )
  .delete((request: Request, response: Response) =>
    RoomController.delete(request, response)
  );

router
  .route("/room/:roomGuid")
  .post((request: Request, response: Response) =>
    RoomController.open(request, response)
  );

router
  .route("/question")
  .get((request: Request, response: Response) =>
    QuestionController.get(request, response)
  )
  .post((request: Request, response: Response) =>
    QuestionController.post(request, response)
  )
  .put((request: Request, response: Response) =>
    QuestionController.put(request, response)
  )
  .delete((request: Request, response: Response) =>
    QuestionController.delete(request, response)
  );

export default router;
