import express from "express";
import Link from "../models/link.js"

const linkController = express.Router();

const createLink = async (req, res) => {
  try {
    const { link } = req.body;

    if (!link) {
      return res.status(400).send({ message: "Field is required" });
    }
    const links = await new Link({
      link
    });

    const data = await links.save();

    res.status(200).send({ message: "Video created successfully", data });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const getAllLinks = async (req, res) => {
  try {
    const getAllLinks = await Link.find({});

    if (getAllLinks.length === 0) {
      return res.status(400).send({ message: "NO data to show" });
    }
    if (getAllLinks) {
      return res.status(200).send({ message: "All links are", getAllLinks });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const updateLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { link, linkName } = req.body;
    const updateLink = await Link.findByIdAndUpdate(
      id,
      { linkName, link },
      { new: true }
    );

    if (updateLink === null) {
      return res.status(400).send({ message: "No data to aaaa" });
    }
    if (updateLink) {
      return res.status(200).send({ message: "Link is updated", updateLink });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const deleteLink = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteLink = await Link.findByIdAndDelete(id);

    if (deleteLink === null) {
      return res.status(400).send({ message: "No data to delete" });
    }
    if (deleteLink) {
      return res.status(200).send({ message: "Link deleted" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export default {
  createLink,
  getAllLinks,
  updateLink,
  deleteLink,
  linkController,
};
