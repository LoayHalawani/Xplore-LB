const db = require("../models");
const User = db.user;
const Site = db.site;
const Critique = db.critique;

exports.addCritique = async (req, res) => {
  try {
    const userId = req.userId;
    const siteId = req.body.siteId;
    const site = await Site.findByPk(siteId);
    if (!site) {
      return res.status(404).send({ message: "Site not found." });
    }
    const existingCritique = await Critique.findOne({
      where: {
        userId: userId,
        siteId: siteId,
      },
    });
    if (existingCritique) {
      return res.status(409).send({ message: "A critique already exists." });
    }
    await Critique.create({
      userId: userId,
      siteId: siteId,
      rating: req.body.rating,
      comment: req.body.comment,
    });
    return res.status(201).send({ message: "Critique added successfully." });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.updateCritique = (req, res) => {
  const userId = req.userId;
  Critique.update(req.body, {
    where: { userId: userId, siteId: req.body.siteId },
  })
    .then((num) => {
      if (num >= 1) {
        res.status(200).send({ message: "Critique updated successfully." });
      } else {
        res.status(404).send({ message: "Critique not found." });
      }
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
};

exports.removeCritique = async (req, res) => {
  try {
    const userId = req.userId;
    const critiqueId = req.body.critiqueId;
    const critique = await Critique.findByPk(critiqueId);
    if (!critique) {
      return res.status(404).send({ message: "Critique not found." });
    }
    await Critique.destroy({
      where: {
        userId: userId,
        critiqueId: critiqueId,
      },
    });
    return res.status(200).send({ message: "Critique removed successfully." });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
