import express from "express";

const PORT = process.env.PORT || 8080;

const app = express();

app.get("/", async (_, res) => {
  res.send({ message: "Hello, world!" });
});

app.get("/get.php", async (_, res) => {
  const response = await fetch("http://sharing.gotdns.ch:8091/thapcam.php");
  const data = await response.text();

  res.type("text/plain").send("#EXTM3U\n" + data);
});

app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

export default app;
