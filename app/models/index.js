const Answer = require('./answer');
const Level = require('./level');
const Question = require('./question');
const Quiz = require('./quiz');
const Tag = require('./tag');
const User = require('./user');
const Role = require('./role');

// une question a plusieurs réponses

Question.hasMany(Answer, {

  as: 'answers',
  foreignKey: 'question_id',
});

// réciproque : une réponse est lié à une seule question
Answer.belongsTo(Question, {
  as: 'question',
  foreignKey: 'question_id',
});

// un quiz a plusieurs questions
Quiz.hasMany(Question, {
  as: 'questions',
  foreignKey: 'quiz_id',
});

// réciproque : une question est lié à un seul quiz
Question.belongsTo(Quiz, {
  as: 'quiz',
  foreignKey: 'quiz_id',
});

// un quiz a un seul niveau
Quiz.belongsTo(Level, {
  as: 'level',
  foreignKey: 'level_id',
});

// un niveau a plusieurs quiz
Level.hasMany(Quiz, {
  foreignKey: 'level_id',
});

// un quiz a une seule catégorie
Quiz.belongsTo(Tag, {
  as: 'tag',
  foreignKey: 'tag_id',
});

// Une catégorie peut-être liée à plusieurs quiz
Tag.hasMany(Quiz, {
  as: 'quiz_list',
  foreignKey: 'tag_id',
});

// un user peut créer plusieurs quiz
User.hasMany(Quiz, {
  as: 'user_quiz',
  foreignKey: 'user_id',
});

// un quiz est créé par un seul user
Quiz.belongsTo(User, {
  as: 'user',
  foreignKey: 'user_id',
});

// un user peut effectuer plusieurs quiz

User.belongsToMany(Quiz, {
  as: 'quiz_played',
  through: 'play_quiz',
});

// un quiz peut être joué par plusieurs users
Quiz.belongsToMany(User, {
  as: 'players',
  through: 'play_quiz',
});

//un user peut avoir un role
User.belongsTo(Role, {
  as: 'role_user',
  foreignKey: 'role_id',
});

// un role peut être attribué à plusieurs users
Role.hasMany(User, {
  as: 'users_role',
  foreignKey: 'role_id',
});


module.exports = {
  Answer, Level, Question, Quiz, Tag, User, Role
};
