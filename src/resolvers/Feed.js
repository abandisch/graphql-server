/* Feed resolver */

const links = (root, args, context, info) => context.db.query.links({
  where: { id_in: root.linkIds }
}, info)

module.exports = { links }
