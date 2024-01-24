module.exports = (sequelize, Sequelize) => {
  const Site = sequelize.define("site", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    location: {
      type: Sequelize.ENUM(
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
      validate: {
        notEmpty: true,
      },
    },
    type: {
      type: Sequelize.ENUM(
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
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  return Site;
};
