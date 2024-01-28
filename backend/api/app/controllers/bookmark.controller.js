const db = require("../models");
const User = db.user;
const Site = db.site;
const Bookmark = db.bookmark;

exports.addBookmark = async (req, res) => {
  try {
    const userId = req.userId;
    const siteId = req.body.siteId;
    const site = await Site.findByPk(siteId);
    if (!site) {
      return res.status(404).send({ message: "Site not found." });
    }
    await Bookmark.create({
      userId: userId,
      siteId: siteId,
    });
    return res.status(201).send({ message: "Bookmark added successfully." });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.removeBookmark = async (req, res) => {
  try {
    const userId = req.userId;
    const bookmarkId = req.body.bookmarkId;
    const bookmark = await Bookmark.findByPk(bookmarkId);
    if (!bookmark) {
      return res.status(404).send({ message: "Bookmark not found." });
    }
    await Bookmark.destroy({
      where: {
        userId: userId,
        bookmarkId: bookmarkId,
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
            attributes: [],
          },
        },
      ],
    });

    if (userWithBookmarks) {
      return res.status(200).send(userWithBookmarks.bookmarkedSites);
    } else {
      return res.status(404).send({ message: "User not found." });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
