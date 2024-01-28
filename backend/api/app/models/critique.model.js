module.exports = (sequelize, DataTypes) => {
  const Critique = sequelize.define("Critique", {
    critiqueId: {
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
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Critique.associate = (models) => {
    Critique.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    Critique.belongsTo(models.Site, { foreignKey: "siteId", as: "site" });
  };

  return Critique;
};
