import { Request, Response } from "express";
import { prisma } from "../prisma.js";

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.cartlines.findMany();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

/**
 * Method Get Record
 * @param req
 * @param res
 * @returns Object
 */

export const getRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "Id is missing" });
  }

  try {
    const data = await prisma.cartlines.findUnique({
      where: { id },
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};
/** * Method Create Record
 * @param req
 * @param res
 * @returns Object
 */

export const createRecord = async (req: Request, res: Response) => {
  const { userId, posterId, quantity, createdAt } = req.body;

  if (!userId || !posterId || !quantity || !createdAt) {
    return res.status(400).json({ error: "All data is required" });
  }
  try {
    const data = await prisma.cartlines.create({
      data: {
        userId: Number(userId),
        posterId: Number(posterId),
        quantity: Number(quantity),
        createdAt: new Date(createdAt),
      },
    });
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Somthing went wrong" });
  }
};
/** * Method Update Record
 * @param req
 * @param res
 * @returns Object
 */

export const updateRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id); // Sikrer at id er et tal
  const { userId, posterId, quantity, createdAt } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Id skal have en gyldig værdi" });
  }

  if (!userId || !posterId || !quantity || !createdAt) {
    return res.status(400).json({ error: "Alle felter skal udfyldes" });
  }

  try {
    const data = await prisma.cartlines.update({
      where: { id },
      data: {
        userId: Number(userId),
        posterId: Number(posterId),
        quantity: Number(quantity),
        createdAt: new Date(createdAt),
      },
    });
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Noget gik galt i serveren" });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "Id er savnet" });
  }
};
