const express = require("express");
const costs = require("./src/DB/costs/all-costs.json");
const app = express();

const PORT = process.env.PORT || 3002;
// console.log(costs);

app.use(express.json());
app.use(express.urlencoded());

app.get("/costs", function(req, res) {
  if (req.query.category) {
    // console.log(req.query.category);
    // console.log(costs);
    let filtredCosts = costs.filter(cost =>
      cost.categories.some(costCat => costCat === req.query.category)
    );
    if (filtredCosts.length >= 1) {
      res.send({ status: "success", product: filtredCosts });
    } else console.log(filtredCosts);
    res.send({ status: "no products", product: filtredCosts });
  } else res.send(costs);
});
// app.get("/costs", function(req, res) {
//   res.send(costs);
// });

app.get("/costs/:id", function(req, res) {
  let oneCosts = costs.find(costs => {
    return costs.id === Number(req.params.id);
  });
  res.status(200).send({ status: "success", product: oneCosts });
});

app.use(function(req, res, next) {
  let err = new Error("not found");
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send("error");
});
app.listen(PORT, () => {
  console.log("server is running on " + PORT);
});
