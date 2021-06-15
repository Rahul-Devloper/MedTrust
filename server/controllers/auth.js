exports.testRoute = async (req, res, next) => {
  // res.send({success: true });
  console.log("Middle");
  next();
};
