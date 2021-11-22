const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passport = require("passport");
require("dotenv").config();

const noUser = { id: "", name: "" };
const authenticationOptions = {
    scope: ["profile"]
};

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.json("you're not authenticated");
    } else {
        next();
    }
};

router.get("/me", async (req, res) => {
    return res.send("I'm hooked!");
});

router.get("/user", authCheck, async (req, res) => {
    return res.json(req.user || noUser);
});

// auth login with google
router.get("/google", passport.authenticate("google", authenticationOptions));

// auth logout
router.get("/logout", function (req, res) {
    req.logOut();
    return res.json(noUser);
});

// redirect
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    return res.redirect(`${process.env.domain}`);
});

module.exports = router;
