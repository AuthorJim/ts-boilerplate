const fs = require("fs-extra");

const { resolve } = require("./utils");

if (process.env.NODE_ENV === "production") {
  fs.emptyDirSync(resolve("dist"));
}
