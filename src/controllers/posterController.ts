import { Request, Response } from "express";
import { prisma } from "../prisma.js";

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.poster.findMany();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch posters" });
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
    const data = await prisma.poster.findUnique({
      where: { id },
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch poster" });
  }
};

/** * Method Create Record
 * @param req
 * @param res
 * @returns Object
 */

export const createRecord = async (req: Request, res: Response) => {
  const { name, slug, description, image, price, width, height, stock, createdAt, updatedAt } = req.body;

  if (!name || !slug || !description || !image || !price || !width || !height || !stock || !createdAt || !updatedAt) {
    return res.status(400).json({ error: "All data is required" });
  }
  try {
    const data = await prisma.poster.create({
      data: {
        name,
        slug,
        description,
        image,
        width: Number(width),
        height: Number(height),
        price: Number(price),
        stock: Number(stock),
        createdAt: new Date(createdAt),
        updatedAt: new Date(updatedAt),
      },
    });
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create poster" });
  }
};

/** * Method Update Record
 * @param req
 * @param res
 * @returns Object
 */

export const updateRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id); // sikker at id er et tal
  const { name, slug, description, image, price, createdAt, updatedAt } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Id is missing" });
  }
  if (!name || !slug || !description || !image || !price || !createdAt || !updatedAt) {
    return res.status(400).json({ error: "All data is required" });
  }
  try {
    const data = await prisma.poster.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        image,
        price: Number(price),
        createdAt: new Date(createdAt),
        updatedAt: new Date(updatedAt),
      },
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update poster" });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "Id is missing" });
  }
  try {
    await prisma.poster.delete({
      where: { id },
    });
    res.status(200).json({ message: "Poster nr. ${id} er slette" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kunne ikke slette poster" });
  }
};
