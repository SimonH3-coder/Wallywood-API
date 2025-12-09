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
  cartlines: {
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
    price: "number",
    createdAt: "date",
    updatedAt: "date",
  },
  // Her kommer næste model
  userRatings: {
    id: "number",
    userId: "number",
    posterId: "number",
    numStars: "number",
    createdAt: "date",
  },
  // Her kommer næste model
  genres: {
    id: "number",
    title: "string",
    slug: "string",
    created: "date",
    updated: "date",
  },
  // Her kommer næste model
  genrePosterRels: {
    id: "number",
    genreId: "number",
    posterId: "number",
  },
};
