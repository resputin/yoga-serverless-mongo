const { MONGO_DB_URL, SESSION_SECRET } = process.env;

const CONFIG = {
  SESSION_SECRET,
  MONGO_DB_URL
};

module.exports = { ...CONFIG };
