const express = require("express");
const app = express();

app.use(express.json());

let users = [];

app.use((req, res, next) => {
  console.log(new Date().toLocaleString());
  console.log(req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Server Running", time: new Date() });
});

app.get("/users", (req, res) => {
  res.json({ message: "All users", time: new Date(), data: users });
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.json({ message: "Missing data", time: new Date() });
  }

  if (users.find((u) => u.email === email)) {
    return res.json({ message: "Email exists", time: new Date() });
  }

  const user = { id: Date.now().toString(), name, email };
  users.push(user);

  res.json({ message: "User added", time: new Date(), data: user });
});

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === req.params.id);

  if (!user) {
    return res.json({ message: "User not found", time: new Date() });
  }

  res.json({ message: "User found", time: new Date(), data: user });
});



