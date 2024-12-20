const JWT = process.env.NODE_ENV === "test" ? "test" : process.env.JWT_SECRET;
const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/

export { JWT, datePattern };