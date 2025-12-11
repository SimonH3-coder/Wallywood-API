export const fieldTypes: Record<string, Record<string, "string" | "number" | "boolean" | "date">> = {
  user: {
    id: "number",
    firstname: "string",
    lastname: "string",
    email: "string",
    password: "string",
    role: "string",
    isActive: "boolean",
  },
  // Her kommer næste model
  cartline: {
    id: "number",
    userId: "number",
    posterId: "number",
    quantity: "number",
    createdAt: "date",
  },
  // Her kommer næste model
  poster: {
    id: "number",
    name: "string",
    slug: "string",
    description: "string",
    image: "string",
    width: "number",
    height: "number",
    stock: "number",
    price: "number",
    createdAt: "date",
    updatedAt: "date",
  },
  // Her kommer næste model
  userRating: {
    id: "number",
    userId: "number",
    posterId: "number",
    numStars: "number",
    createdAt: "date",
  },
  // Her kommer næste model
  genre: {
    id: "number",
    title: "string",
    slug: "string",
    createdAt: "date",
    updatedAt: "date",
  },
  // Her kommer næste model
  genrePosterRel: {
    id: "number",
    genreId: "number",
    posterId: "number",
  },
};
