module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define(
    "Site",
    {
      siteId: {
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      location: {
        type: DataTypes.ENUM(
          "Beirut",
          "Akkar",
          "North",
          "Mt. Lebanon",
          "South",
          "Baalbek-Hermel",
          "Beqaa",
          "Nabatieh"
        ),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(
          "Historical",
          "Natural",
          "Retail",
          "Industrial",
          "Academic",
          "Residential",
          "Athletics",
          "Entertainment",
          "Religious",
          "Medical",
          "Government",
          "Artistic",
          "Culinary",
          "Transportation",
          "Cultural"
        ),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  Site.associate = (models) => {
    Site.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    Site.belongsToMany(models.User, {
      through: models.Bookmark,
      as: "bookmarkedByUsers",
    });
  };

  return Site;
};
