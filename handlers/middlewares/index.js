'use strict';

const millisecond = require('millisecond');
const { Composer } = require('telegraf');

const composer = new Composer();

const leaveUnmanagedHandler = require('./leaveUnmanaged');
const removeCommandsHandler = require('./removeCommands');
const kickBannedHandler = require('./kickBanned');
const syncStatusHandler = require('./syncStatus');
const antibotHandler = require('./antibot');
const addedToGroupHandler = require('./addedToGroup');

composer.on('new_chat_members', addedToGroupHandler);
composer.use(leaveUnmanagedHandler);
composer.use(removeCommandsHandler);
composer.use(kickBannedHandler);
composer.on('new_chat_members', syncStatusHandler);
composer.on('new_chat_members', antibotHandler);

module.exports = composer;
