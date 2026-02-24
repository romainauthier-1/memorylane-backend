const mongoose = require("mongoose");

const connectionString = process.env.CONNECTION_STRING;

mongoose.set("strictQuery", true);

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("🗄 -- 🖥 Database connected ✅ "))
  .catch((error) => console.error(error));

module.exports = connectionString;

// const mongoose = require("mongoose");

// const connectionString =
//   "mongodb+srv://dankysten:l41pPY3U9tfCccRI@cluster0.d0p7dam.mongodb.net/**NOM.DATABASE**";

// mongoose.set("strictQuery", true);

// mongoose
//   .connect(connectionString, { connectTimeoutMS: 2000 })
//   .then(() => console.log("ðŸ—„ --- ðŸ–¥ Database connected âœ… "))
//   .catch((error) => console.error(error));

// module.exports = connectionString;
