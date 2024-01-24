const db = require("../models");
const User = db.user;
const Site = db.site;
const Bookmark = db.bookmark;

exports.addBookmark = async (req, res) => {
  try {
    const { userId, siteId } = req.body;
    const bookmark = await Bookmark.create({
      userId: userId,
      siteId: siteId,
    });
    return res
      .status(201)
      .send({ message: "Bookmark added successfully.", bookmark });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.removeBookmark = async (req, res) => {
  try {
    const { userId, siteId } = req.body;
    const result = await Bookmark.destroy({
      where: {
        userId: userId,
        siteId: siteId,
      },
    });
    return res.status(200).send({ message: "Bookmark removed successfully." });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.listBookmarks = async (req, res) => {
  try {
    const userId = req.userId;
    const userWithBookmarks = await User.findByPk(userId, {
      include: [
        {
          model: Site,
          as: "bookmarkedSites",
          attributes: ["name", "location", "type", "description", "image"],
          through: {
            attributes: [], // This ensures that the join table is not included in the response
          },
        },
      ],
    });

    return res.status(200).send(userWithBookmarks.bookmarkedSites);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
