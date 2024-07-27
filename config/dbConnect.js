const mongoose = require("mongoose");
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);

    console.log("DB Connected Successfully ");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
dbConnect();
