const { authJwt } = require("../middleware");
const critique = require("../controllers/critique.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/critique/add",
    [authJwt.verifyToken, authJwt.isTourist],
    critique.addCritique
  );

  app.put(
    "/critique/update",
    [authJwt.verifyToken, authJwt.isTourist],
    critique.updateCritique
  );

  app.delete(
    "/critique/delete",
    [authJwt.verifyToken, authJwt.isTourist],
    critique.removeCritique
  );
};
