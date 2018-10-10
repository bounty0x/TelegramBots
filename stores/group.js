const Datastore = require('nedb-promise');

const Group = new Datastore({
	autoload: true,
	filename: 'data/Group.db',
});

Group.ensureIndex({
	fieldName: 'id',
	unique: true,
});

const addGroup = group =>
	Group.update({ id: group.id }, group, { upsert: true });

const hideGroup = ({ id }) =>
	Group.update({ id }, { $set: { link: '' } });

const updateGroup = group =>
	Group.update({ id: group.id }, { $set: group });

const listGroups = () =>
	Group.find({});

const listVisibleGroups = () =>
	Group.cfind({ $not: { link: '' } }).sort({ title: 1 }).exec();

const managesGroup = group =>
	Group.findOne(group);

const removeGroup = ({ id }) =>
	Group.remove({ id });

module.exports = {
	addGroup,
	hideGroup,
	listGroups,
	listVisibleGroups,
	managesGroup,
	removeGroup,
	updateGroup,
};
