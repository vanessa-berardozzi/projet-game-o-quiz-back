# MLD

user : (id, role, email, icon, last_name, first_name, password, score, quiz_done)

tag: (id, name, picture)

level : (id, name, color)

question: (id, description, point, #quiz(id) )

quiz: (id, title, picture, #level(id), #tag(id))

answer: (id, description, isValid,  #question(id))

play_quiz : (user(id), quiz(id), points, date)


Role d'un MLD dans une base de donneés :


- Il permet de définir les tables et les relations entre les tables
  - Les tables sont les entités
  - Les relations sont les liens entre les entités
