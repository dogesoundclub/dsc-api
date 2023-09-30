const fs = require("fs");
fs.readFile("mates.json", "utf8", (err, data) => {
  if (err) throw err;
  const mates = JSON.parse(data);
  for (const [id, mate] of mates.entries()) {
    fs.writeFileSync(`./docs/mate/${id}`, JSON.stringify(mate));
    console.log(`Wrote ${id}`);
  }
});
console.log("Done");
