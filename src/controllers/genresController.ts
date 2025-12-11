import { Request, Response } from "express";
import { prisma } from "../prisma.js";

/**
 * Method Get Records
 * @param req
 * @param res
 * @returns Array
 */

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.genre.findMany();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch genrelist" });
  }
};

/**
 * Method Get Record
 * @param req
 * @param res
 * @returns Object
 */

export const getRecord = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  if (!slug) {
    return res.status(400).json({ error: "Slug is missing" });
  }

  try {
    const data = await prisma.genre.findFirst({
      where: { slug },
      select: {
        title: true,
        slug: true,
        posters: {
          select: {
            poster: {
              select: {
                id: true,
                name: true,
                slug: true,
                image: true,
                price: true,
                stock: true,
              },
            },
          },
        },
      },
    });

    const result = {
      ...data,
      posters: data?.posters.map((rel) => rel.poster),
    };

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch genre" });
  }
};
/** * Method Create Record
 * @param req
 * @param res
 * @returns Object
 */

export const createRecord = async (req: Request, res: Response) => {
  const { title, slug } = req.body;

  if (!title || !slug) {
    return res.status(400).json({ error: "All data is required" });
  }
  try {
    const data = await prisma.genre.create({
      data: {
        title,
        slug,
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
  const { title, slug } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Id skal have en gyldig værdi" });
  }

  if (!title || !slug) {
    return res.status(400).json({ error: "Alle felter skal udfyldes" });
  }

  try {
    const data = await prisma.genre.update({
      where: { id },
      data: {
        title,
        slug,
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
  try {
    await prisma.genre.delete({
      where: { id },
    });
    res.status(200).json({ message: "genre nr. ${id} er slette" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kunne ikke slet genre" });
  }
};
