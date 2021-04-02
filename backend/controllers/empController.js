import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import EmpProfile from '../models/empProfileModel.js'

// Get current emp profile , private
// GET -> /api/emp-profiles/me
const getMyProfile = asyncHandler(async (req, res) => {
	try {
		const profile = await EmpProfile.findOne({
			user: req.user._id,
		})

		if (!profile) {
			res.status(400)
			throw new Error('There is no profile for this employee')
		}

		res.json(profile)
	} catch (error) {
		res.status(500)
		throw new Error('Server Error')
	}
})

// Create or Update Employee Profile , Private
// POST -> /api/emp-profiles
const createEmpProfile = asyncHandler(async (req, res) => {
	// Get fields
	const profileFields = {}
	profileFields.user = req.user._id
	if (req.body.status) profileFields.status = req.body.status
	if (req.body.address) profileFields.address = req.body.address
	if (req.body.bio) profileFields.bio = req.body.bio
	//Skills - Spilt into array
	if (typeof req.body.skills !== 'undefined') {
		profileFields.skills = req.body.skills.split(',').map(skill => skill.trim())
	}

	// Social object
	profileFields.social = {}
	if (req.body.youtube) profileFields.social.youtube = req.body.youtube
	if (req.body.twitter) profileFields.social.twitter = req.body.twitter
	if (req.body.facebook) profileFields.social.facebook = req.body.facebook
	if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
	if (req.body.instagram) profileFields.social.instagram = req.body.instagram

	try {
		let profile = await EmpProfile.findOne({ user: req.user._id })

		if (profile) {
			// Update
			profile = await EmpProfile.findOneAndUpdate(
				{ user: req.user._id },
				{ $set: profileFields },
				{ new: true }
			)

			return res.json(profile)
		}

		// Create
		profile = new EmpProfile(profileFields)

		await profile.save()
		res.json(profile)
	} catch (err) {
		res.status(500)
		throw new Error('Server error')
	}
})

// Get Profile by user ID , Public
// GET api/emp-profiles/:user_id
const getEmpProfile = asyncHandler(async (req, res) => {
	try {
		const profile = await EmpProfile.findOne({
			user: req.params.id,
		})

		if (!profile) {
			res.status(400)
			throw new Error('Profile not found')
		}

		res.json(profile)
	} catch (error) {
		if (error.kind == 'ObjectId') {
			res.status(400)
			throw new Error('Profile not found')
		}
		res.status(500)
		throw new Error('Server error')
	}
})

// Add experience to profile , Private
// POST api/profile/experience
const addExperience = asyncHandler(async (req, res) => {
	try {
		const profile = await EmpProfile.findOne({ user: req.user.id })

		const newExp = {
			title: req.body.title,
			company: req.body.company,
			location: req.body.location,
			from: req.body.from,
			to: req.body.to,
			current: req.body.current,
			description: req.body.description,
		}
		// Add to exp array
		profile.experience.unshift(newExp)

		await profile.save()

		res.json(profile)
	} catch (error) {
		res.status(500)
		throw new Error('Server Error')
	}
})

export { getMyProfile, createEmpProfile, getEmpProfile, addExperience }
