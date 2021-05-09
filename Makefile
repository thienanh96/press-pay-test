build:
	docker build -t presspay-test .

push:
	docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}
	docker tag presspay-test ${DOCKERHUB_USERNAME}/presspay-test
	docker push ${DOCKERHUB_USERNAME}/presspay-test
run:
	docker run -p 3000:3000 -d thienanh96/presspay-test