const mongoose = require('mongoose')

const bookmarkSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Bookmark title required'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Bookmark', bookmarkSchema)
