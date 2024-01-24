const { authJwt } = require("../middleware");
const site = require("../controllers/site.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/site/check",
    [authJwt.verifyToken, authJwt.isManager],
    site.getSite
  );

  app.post("/site/add", [authJwt.verifyToken, authJwt.isManager], site.addSite);

  app.put(
    "/site/update",
    [authJwt.verifyToken, authJwt.isManager],
    site.updateSite
  );

  app.delete(
    "/site/delete",
    [authJwt.verifyToken, authJwt.isManager],
    site.deleteSite
  );

  app.get(
    "/site/all",
    [authJwt.verifyToken, authJwt.isTourist],
    site.getAllSites
  );

  app.post("/bookmark/add", [authJwt.verifyToken], controller.addBookmark);

  app.delete(
    "/bookmarks/delete/:id",
    [authJwt.verifyToken],
    controller.removeBookmark
  );

  app.get("/bookmarks/all", [authJwt.verifyToken], controller.listBookmarks);
};
