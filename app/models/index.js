const Answer = require('./answer');
const Level = require('./level');
const Question = require('./question');
const Quiz = require('./quiz');
const Tag = require('./tag');
const User = require('./user');
const Role = require('./role');

// A question has multiple answers
Question.hasMany(Answer, {
  as: 'answers',
  foreignKey: 'question_id',
});

// Reciprocal: an answer is linked to a single question
Answer.belongsTo(Question, {
  as: 'question',
  foreignKey: 'question_id',
});

// A quiz has multiple questions
Quiz.hasMany(Question, {
  as: 'questions',
  foreignKey: 'quiz_id',
});

// Reciprocal: a question is linked to a single quiz
Question.belongsTo(Quiz, {
  as: 'quiz',
  foreignKey: 'quiz_id',
});

// A quiz has a single level
Quiz.belongsTo(Level, {
  as: 'level',
  foreignKey: 'level_id',
});

// A level can be linked to multiple quizzes
Level.hasMany(Quiz, {
  foreignKey: 'level_id',
});

// A quiz has a single tag
Quiz.belongsTo(Tag, {
  as: 'tag',
  foreignKey: 'tag_id',
});

// A tag can be linked to multiple quizzes
Tag.hasMany(Quiz, {
  as: 'quiz_list',
  foreignKey: 'tag_id',
});

// A user can create multiple quizzes
User.hasMany(Quiz, {
  as: 'user_quiz',
  foreignKey: 'user_id',
});

// A quiz is created by a single user
Quiz.belongsTo(User, {
  as: 'user',
  foreignKey: 'user_id',
});

// A user can take multiple quizzes
User.belongsToMany(Quiz, {
  as: 'quiz_played',
  through: 'play_quiz',
});

// A quiz can be played by multiple users
Quiz.belongsToMany(User, {
  as: 'players',
  through: 'play_quiz',
});

// A user can have a role
User.belongsTo(Role, {
  as: 'role_user',
  foreignKey: 'role_id',
});

// A role can be assigned to multiple users
Role.hasMany(User, {
  as: 'users_role',
  foreignKey: 'role_id',
});

module.exports = {
  Answer, Level, Question, Quiz, Tag, User, Role
};
