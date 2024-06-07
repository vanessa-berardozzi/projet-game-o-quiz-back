# MLD

user : (id, role, email, icon, last_name, first_name, password, score, quiz_done)

tag: (id, name, picture)

level : (id, name, color)

question: (id, description, point, #quiz(id) )

quiz: (id, title, picture, #level(id), #tag(id))

answer: (id, description, isValid,  #question(id))

play_quiz : (user(id), quiz(id), points, date)
