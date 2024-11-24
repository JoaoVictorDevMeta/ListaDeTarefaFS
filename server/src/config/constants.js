const JWT = process.env.NODE_ENV === "test" ? "test" : process.env.JWT_SECRET;

export { JWT };