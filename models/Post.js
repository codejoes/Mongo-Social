const { Schema, model, Types } = require('mongoose');

const moment = require('moment');

const commentSchema = new Schema (
    {
        commentId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        commentBody: {
            type: String,
            required: true,
            maxlength: 360,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timeCreated => moment(timeCreated).format('MMM DD, YYYY [at] hh:mm a'),
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    },
);

const postSchema = new Schema (
    {
        postText: {
            type: String,
            required: true,
            minlength: 4,
            maxlength: 360,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timeCreated => moment(timeCreated).format('MMM DD, YYYY [at] hh:mm a'),
        },
        username: {
            type: String,
            required: true,
        },
        comments: [commentSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

postSchema.virtual('commentCount').get(function () {
    return this.comments.length;
});

const Post = model('Post', postSchema);

module.exports = Post;