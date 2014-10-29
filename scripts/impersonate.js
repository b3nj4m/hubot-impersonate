//Description:
//  balls
//
//Configuration:
//  HUBOT_IMPERSONATE_MODE=mode - one of 'train', 'train_respond', 'respond'. (default 'train')
//  HUBOT_IMPERSONATE_MARKOV_ORDER=order - the order of the markov chain. (default 3)
//
//Commands:
//  hubot impersonate <user> - impersonate <user> until told otherwise.
//  hubot stop impersonating - stop impersonating a user
//
//Author:
//  b3nj4m

var Markov = require('markov-respond');

var ORDER = process.env.HUBOT_IMPERSONATE_MARKOV_ORDER ? parseInt(process.env.HUBOT_IMPERSONATE_MARKOV_ORDER) : 3;
var MODE = process.env.HUBOT_IMPERSONATE_MODE && _.contains(['train', 'train_respond', 'respond'], process.env.HUBOT_IMPERSONATE_MODE) ? process.env.HUBOT_IMPERSONATE_MODE : 'train';

var impersonating = false;

function shouldTrain() {
  return _.contains(['train', 'train_respond'], MODE);
}

function shouldRespond() {
  return _.contains(['respond', 'train_respond'], MODE) && impersonating;
}

function serialize(data) {
  try {
    string = JSON.stringify(data);
  }
  catch (err) {
    //emit error?
  }

  return string;
}

function deserialize(string) {
  try {
    data = JSON.parse(string);
  }
  catch (err) {
    //emit error?
  }

  return data;
}

function robotStore(robot, key, data) {
  return robot.brain.set(key, serialize(data));
}

function robotRetrieve(robot, key) {
  return deserialize(robot.brain.get(key));
}

function start(robot) {
  var store = robotStore.bind(this, robot);
  var retrieve = robotRetrieve.bind(this, robot);

  var markov = new Markov(ORDER);

  var hubotMessageRegex = new RegExp('^[@]?(' + robot.name + ')' + (robot.alias ? '|(' + robot.alias + ')' : '') + '[:,]?\\s', 'i');

  robot.respond(/impersonate (\w*)/i, function(msg) {
    if (shouldRespond()) {
      var username = msg.match[1];
      var text = msg.message.text;

      var users = robot.brain.usersForFuzzyName(username);

      if (users && users.length > 0) {
        var user = users[0];
        impersonating = user.id;
        msg.send('impersonating ' + user.name);
      }
      else {
        msg.send("I don't know any " + username + ".");
      }
    }
  });

  robot.respond(/stop impersonating/i, function(msg) {
    if (shouldRespond()) {
      if (impersonating) {
        var user = robot.brain.userFromId(impersonating);
        impersonating = false;
        msg.send('stopped impersonating ' + user.name);
      }
      else {
        msg.send('Wat.');
      }
    }
  });

  robot.hear(/.*/, function(msg) {
    var text = msg.message.text;

    if (!hubotMessageRegex.test(text)) {
      if (shouldTrain()) {
        var userId = msg.user.id;
        var data = retrieve('impersonateMarkov-' + userId) || {};

        markov.import(data);
        markov.train(text);
        store('impersonateMarkov-' + userId, markov.export());
      }

      if (shouldRespond()) {
        data = retrieve('impersonateMarkov-' + impersonating) || {};
        markov.import(data);
        msg.send(markov.respond(text));
      }
    }
  });
}

module.exports = function(robot) {
  var loaded = function() {
    start(robot);
  };

  if (_.isEmpty(robot.brain.data) || _.isEmpty(robot.brain.data._private)) {
    robot.brain.once('loaded', loaded);
  }
  else {
    loaded();
  }
};
