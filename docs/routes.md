# Routes required for the API, from router.js

| route             |  GET   | POST  | PATCH | DELETE |
| ------------------|:------:|:-----:|:-----:|:------:|
| /quiz             |   ✅   |   ✅   |   ❌   |   ❌    |
| /quiz/:id         |   ✅   |   ❌   |   ✅   |   ✅    |
| /signup           |   ❌   |   ✅   |   ❌   |   ❌    |
| /login            |   ❌   |   ✅   |   ❌   |   ❌    |
| /logout           |   ❌   |   ❌   |   ❌   |   ✅    |
| /delete           |   ❌   |   ❌   |   ❌   |   ✅    |
| /pseudo           |   ❌   |   ❌   |   ✅   |   ❌    |
| /randomquiz       |   ✅   |   ❌   |   ❌   |   ❌    |
| /popularQuiz      |   ✅   |   ❌   |   ❌   |   ❌    |
| /lastquiz         |   ✅   |   ❌   |   ❌   |   ❌    |
| /answer/:id       |   ✅   |   ✅   |   ❌   |   ❌    |
| /score            |   ❌   |   ❌   |   ✅   |   ❌    |
| /tag              |   ✅   |   ❌   |   ❌   |   ❌    |
| /tag/:id          |   ✅   |   ❌   |   ❌   |   ❌    |
