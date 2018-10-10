// Bot
const { replyOptions } = require('../../bot/options');

const { admin } = require('../../stores/user');
const { addGroup } = require('../../stores/group');
const { master } = require('../../config');

const addedToGroupHandler = async (ctx, next) => {
	const msg = ctx.message;
	const isMaster = ctx.from.id === Number(master)
		|| ctx.from.username
		&& ctx.from.username.toLowerCase()
		=== String(master).replace('@', '').toLowerCase();

	const wasAdded = msg.new_chat_members.some(user =>
		user.username === ctx.me);
	if (wasAdded && isMaster) {
		await admin(ctx.from);
		const link = ctx.chat.username
			? `t.me/${ctx.chat.username}`
			: await ctx.exportChatInviteLink().catch(() => '');
		if (!link) {
			// eslint-disable-next-line function-paren-newline
			await ctx.replyWithHTML(
				'⚠️ <b>Failed to export chat invite link.</b>\n'
				+ 'Group won\'t be visible in /groups list.\n'
				+ '\n'
				+ 'If this isn\'t your intention, '
				+ 'make sure I am permitted to export chat invite link, '
				+ 'and then run /showgroup.');
		}
		const { id, title, type } = ctx.chat;
		await addGroup({ id, link, title, type });
		ctx.reply(
			'🛠 <b>Ok, I\'ll help you manage this group from now.</b>',
			replyOptions
		);
	}

	return next();
};

module.exports = addedToGroupHandler;
