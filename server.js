const http = require("http");
const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const {
  sendCategorise,
  sendProducts,
  sendProductOne,
  createLike,
  deleteLike,
} = require("./apis/products");

const { createUser, sendUser, updateUserPassword } = require("./apis/users");

const app = express();
app.use(express.json());

// GET
app.get("/", (req, res) => res.json({ message: "/ endpoint" }));
app.get("/products/categories", sendCategorise);
app.get("/products", sendProducts);
app.get("/products/2", sendProductOne);
app.get("/users", sendUser);

// POST
app.post("/users/signup", createUser);
app.post("/products/likes", createLike);

// PUT
app.put("/users", updateUserPassword);

// DELETE
app.delete("/products/likes", deleteLike);

const server = http.createServer(app);

const start = async () => {
  try {
    server.listen(8000, () => {
      console.log("server is listening on PORT 8000");
    });
  } catch (err) {
    await prisma.$disconnect();
  }
};

start();
