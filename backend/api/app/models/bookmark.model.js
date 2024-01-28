module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define(
    "Bookmark",
    {
      bookmarkId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "userId",
        },
      },
      siteId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "sites",
          key: "siteId",
        },
      },
    },
    {
      timestamps: false,
    }
  );

  Bookmark.associate = (models) => {
    Bookmark.belongsTo(models.User, {
      foreignKey: "userId",
      as: "userBookmark",
    });
    Bookmark.belongsTo(models.Site, {
      foreignKey: "siteId",
      as: "siteBookmark",
    });
  };

  return Bookmark;
};
