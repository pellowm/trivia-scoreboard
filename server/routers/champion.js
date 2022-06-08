const express = require("express");
const mongoose = require('mongoose');
const { Champion } = require("../models/champion");

const router = express.Router();

router.get("/", async (req, res) => {
    const allChampions = await Champion.find();
    res.status(200).json(allChampions);
});

router.get("/:id", async (req, res) => {
    const foundChampion = await Champion.findById(req.params.id);
    res.status(200).json(foundChampion);
});

router.post("/", async (req, res, next) => {
    try {
        const newChampion = await Champion.create(req.body);
        res.status(201).json(newChampion);
    }
    catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            res.status(400).json({Error: e.message});
            return;
        }
        next(e);
    }
});

router.patch("/:id", async (req, res, next) => {
    try {
        const updatedChampion = await Champion.findByIdAndUpdate(req.params.id, { name: "new postman champ" }, {runValidators: true });
        res.json(updatedChampion.createChampion);
    }
    catch (e){
        if (e instanceof mongoose.Error.ValidationError) {
            res.status(400).json({Error: e.message});
            return;
        }
        next(e);
    }
});

router.delete("/:id", async (req, res) => {
    await Champion.findByIdAndDelete(req.params.id);
    console.log("deleted Champion", req.params.id);
    res.status(204).end();
});

module.exports = router;
