import { Request, Response } from "express";
import Database from "../db/config";
import { randomUUID } from "crypto";
import { RoomModel, RoomModelNoPwd } from "../models/RoomModel";
import QuestionController from "./QuestionController";

class RoomController {
  static get(request: Request, response: Response): void {}

  static async open(request: Request, response: Response) {
    const roomGuid = request.params.roomGuid;
    const { password } = request.body;

    if (!password || !roomGuid) return response.sendStatus(400);

    const db = await Database();

    const room = await db.get<RoomModelNoPwd>(
      `SELECT id, code, name FROM room WHERE id='${roomGuid}' AND password='${password}'`
    );

    if (!room) return response.sendStatus(401);

    const questions = await QuestionController.getByRoomId(room.id);

    return response.status(200).json({
      ...room,
      questions: questions,
    });
  }

  // create new room
  static async create(request: Request, response: Response) {
    const db = await Database();
    const { name, password } = request.body;

    // if name or password are not set
    if (!name || !password) return response.sendStatus(400);

    let isRoom = true;

    while (isRoom) {
      const guid = randomUUID();

      const roomIds: Array<string> = await db.all("SELECT id FROM room");

      const idIsNotUnique = roomIds.some((roomId) => roomId === guid);

      isRoom = idIsNotUnique;

      if (!idIsNotUnique) {
        const code = Math.random().toString().substring(2, 6);

        await db.run(`
          INSERT INTO room (id, code, name, password)
          values ("${guid}", ${code}, "${name}", "${password}")
        `);

        response.status(201).json({
          id: guid,
          code: code,
          name: name,
        });
      }
    }

    await db.close();
  }

  static put(request: Request, response: Response): void {}
  static delete(request: Request, response: Response): void {}
}

export default RoomController;
