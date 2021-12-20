const express = require("express");
const router = express.Router();
const auth = require("../../middleWare/auth");
const { check, validationResult } = require("express-validator");

// Models
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route  GET api/profile/me
// @des    get current user
// @access Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.body.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/profile
// @des    create or update a user profile
// @access Private

router.post(
  "/",
  [
    auth,
    [
      check("status", "status is required").not().isEmpty(),
      check("skills", "skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Build profile object
    const profileFildes = {};

    profileFildes.user = req.user.id;

    if (company) profileFildes.company = company;
    if (website) profileFildes.website = website;
    if (location) profileFildes.location = location;
    if (bio) profileFildes.bio = bio;
    if (status) profileFildes.status = status;
    if (githubusername) profileFildes.githubusername = githubusername;
    if (skills) {
      profileFildes.skills = skills.split(",").map((skill) => {
        skill.trim();
      });
    }

    // Build Social object
    const socials = profileFildes.socials;
    socials = {};

    if (youtube) socials.youtube = youtube;
    if (twitter) socials.twitter = twitter;
    if (facebook) socials.facebook = facebook;
    if (linkedin) socials.linkedin = linkedin;
    if (instagram) socials.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.body.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.body.id },
          { $set: profileFildes },
          { new: true }
        );

        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFildes);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error.");
    }
  }
);

module.exports = router;
