module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "roles",
          key: "roleId",
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      gender: {
        type: DataTypes.ENUM("Male", "Female"),
        allowNull: false,
      },
      profileImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  User.associate = (models) => {
    User.belongsTo(models.Role, { foreignKey: "roleId", as: "role" });
    User.belongsToMany(models.Site, {
      through: models.Bookmark,
      as: "bookmarkedSites",
    });
  };

  return User;
};
