Build project:

`make build`

Push docker image to DockerHub

`make push`

Run docker image after pulling

`make run`

Run locally

`npm install && npm run start`

Test on cloud server (AWS EC2):

- Search movies by title : GET http://54.169.230.111/api/movies?title={someTitle}
- Gte single movie by ID: GET http://54.169.230.111/api/movies/{ID}
