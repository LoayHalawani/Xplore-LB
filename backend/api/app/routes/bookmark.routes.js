const { authJwt } = require("../middleware");
const bookmark = require("../controllers/bookmark.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/bookmark/add",
    [authJwt.verifyToken, authJwt.isTourist],
    bookmark.addBookmark
  );

  app.get(
    "/bookmark/all",
    [authJwt.verifyToken, authJwt.isTourist],
    bookmark.listBookmarks
  );

  app.delete(
    "/bookmark/remove",
    [authJwt.verifyToken, authJwt.isTourist],
    bookmark.removeBookmark
  );
};
