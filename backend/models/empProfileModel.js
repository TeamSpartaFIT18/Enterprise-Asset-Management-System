import mongoose from 'mongoose'
const Schema = mongoose.Schema

// Create Schema
const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    // Field of technician - Computer Hardware / Network / CCTV
    status: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
    },
    address: {
      type: String,
    },
    bio: {
      type: String,
    },
    skills: {
      type: [String],
    },
    experience: [
      {
        title: {
          type: String,
          required: true,
        },
        company: {
          type: String,
          required: true,
        },
        location: {
          type: String,
        },
        fromDate: {
          type: Date,
          required: true,
        },
        toDate: {
          type: Date,
        },
        description: {
          type: String,
        },
      },
    ],
    social: {
      youtube: {
        type: String,
      },
      twitter: {
        type: String,
      },
      facebook: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      instagram: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
)

const EmpProfile = mongoose.model('profile', ProfileSchema)

export default EmpProfile
