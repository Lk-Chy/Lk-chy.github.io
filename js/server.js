const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors()); // Allow requests from browser
app.use(express.json()); // Parse JSON body

let bills = [];

app.post("/api/bills", (req, res) => {
  const bill = req.body;
  console.log("✅ Received bill:", bill);
  bills.push(bill);
  res.status(200).json({ message: "Bill stored", bill });
});

app.get("/api/bills", (req, res) => {
  res.json(bills);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


//for this part i took help from youtube as i was having problem with backend