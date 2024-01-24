module.exports = (sequelize, Sequelize) => {
  const Bookmark = sequelize.define("bookmark", {
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    siteId: {
      type: Sequelize.INTEGER,
      references: {
        model: "sites",
        key: "id",
      },
    },
  });

  return Bookmark;
};
