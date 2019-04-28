function newCommentSubscribe(parent, args, context, info) {
    return context.prisma.$subscribe.comment({ mutation_in: ['CREATED'] }).node()
}

const newComment = {
    subscribe: newCommentSubscribe,
    resolve: payload => {
        return payload
    },
}

module.exports = {
    newComment,
}