import express from "express";

const PORT = process.env.PORT || 8080;
const URLS = [
  "http://sharing.gotdns.ch:8091/thapcam.php",
  "http://sharing.gotdns.ch:8091/gavang.php",
];

let cache = [];

const app = express();

app.get("/", async (_, res) => {
  res.send({ message: "Hello, world!" });
});

URLS.forEach((url, index) => {
  async function start() {
    try {
      const response = await fetch(url);
      cache[index] = await response.text();
    } catch (error) {
      console.error(error);
    }
  }

  setInterval(start, 30000);

  app.get(`/${index}/get.php`, async (_, res) => {
    res.type("text/plain").send("#EXTM3U\n" + cache[index]);
  });
});

app.listen(PORT);

export default app;
