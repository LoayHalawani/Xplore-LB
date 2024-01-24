const { authJwt } = require("../middleware");
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/user/signup",
    [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRoleExisted],
    controller.signup
  );

  app.post("/user/signin", controller.signin);

  app.get("/user/check", [authJwt.verifyToken], controller.getAccountInfo);

  app.put("/user/update", [authJwt.verifyToken], controller.updateAccount);

  app.delete("/user/delete", [authJwt.verifyToken], controller.deleteAccount);
};
