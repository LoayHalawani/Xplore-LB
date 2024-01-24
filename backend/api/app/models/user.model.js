module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    gender: {
      type: Sequelize.ENUM("Male", "Female"),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    profileImage: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    dateOfBirth: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  return User;
};
