import { randomUUID } from "crypto";
import { Request, Response } from "express";
import Database from "../db/config";
import QuestionModel from "../models/QuestionModel";
import { RoomModel } from "../models/RoomModel";

class QuestionController {
  static async getByRoomId(roomId: string) {
    const db = await Database();
    const questions = await db.all<QuestionModel[]>(`
      SELECT * FROM question WHERE roomId='${roomId}'
    `);

    return questions;
  }

  static get(request: Request, response: Response): void {}

  static async post(request: Request, response: Response) {
    const { title, content, roomId } = request.body;

    if (!title || !content || !roomId) return response.sendStatus(400);

    const db = await Database();

    // check if roomId exists
    const room: RoomModel | undefined = await db.get<RoomModel>(
      `SELECT * FROM room WHERE id="${roomId}"`
    );

    if (!room) return response.sendStatus(400);

    const questionGuid = randomUUID();

    await db.exec(`
      INSERT INTO question (id, title, content, roomId, isRead)
      VALUES ("${questionGuid}", "${title}", "${content}", "${roomId}", 0)
    `);

    return response.sendStatus(201);
  }

  static put(request: Request, response: Response): void {}
  static delete(request: Request, response: Response): void {}
}

export default QuestionController;
