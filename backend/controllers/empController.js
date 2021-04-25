import asyncHandler from 'express-async-handler';

import EmpProfile from '../models/empProfileModel.js';

// Get current emp profile , private
// GET -> /api/emp-profiles/me
const getMyProfile = asyncHandler(async (req, res) => {
  const profile = await EmpProfile.findOne({
    user: req.user._id,
  }).populate('User', ['name', 'email']);

  if (!profile) {
    res.status(400);
    throw new Error('There is no profile for this employee');
  }

  res.json(profile);
});

// Create or Update Employee Profile , Private
// POST -> /api/emp-profiles
const createEmpProfile = asyncHandler(async (req, res) => {
  // Get fields
  const profileFields = {};
  profileFields.user = req.user._id;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.address) profileFields.address = req.body.address;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.contact) profileFields.contact = req.body.contact;
  //Skills - Spilt into array
  if (typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills
      .split(',')
      .map((skill) => skill.trim());
  }

  // Social object
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  let profile = await EmpProfile.findOne({ user: req.user._id });

  if (profile) {
    // Update
    profile = await EmpProfile.findOneAndUpdate(
      { user: req.user._id },
      { $set: profileFields },
      { new: true }
    );

    return res.json(profile);
  }

  // Create
  profile = new EmpProfile(profileFields);

  await profile.save();
  res.json(profile);
});

// Get Profile by user ID , admin
// GET api/emp-profiles/:user_id
const getEmpProfile = asyncHandler(async (req, res) => {
  const profile = await EmpProfile.findOne({
    user: req.params.id,
  });

  if (!profile) {
    res.status(400);
    throw new Error('Profile not found');
  }

  res.json(profile);
});

// Add experience to profile , Private
// POST api/profile/experience
const addExperience = asyncHandler(async (req, res) => {
  const profile = await EmpProfile.findOne({ user: req.user.id });

  const newExp = {
    title: req.body.title,
    company: req.body.company,
    location: req.body.location,
    fromDate: req.body.fromDate,
    toDate: req.body.toDate,
    description: req.body.description,
  };
  // Add to exp array
  profile.experience.unshift(newExp);

  await profile.save();

  res.json(profile);
});

export { getMyProfile, createEmpProfile, getEmpProfile, addExperience };
