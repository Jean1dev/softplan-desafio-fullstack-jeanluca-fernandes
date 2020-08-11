<h1 align="center">
    Desafio tecnico softplan: Backend
</h1>

## :rocket: Sobre
    Projeto contem 100% de cobertura nas classes que contem logica de negocio
    Projeto esta organizado em modulos de dominio onde em cada contem contem suas respectivas classes de @controller @services e @repositori


## :information_source: How To Use Command Line [ BACK-END ]

To clone and run this application, you'll need [Git](https://git-scm.com), [Java 1.8 +][Maven]

```bash
# Clone this repository
$ git clone https://github.com/Jean1dev/softplan-desafio-fullstack-jeanluca-fernandes.git

# Go into the backed
$ cd backend

# Build docker compose
$ docker-compose -f "backend/docker-compose.yml" up -d --build

# Altere Variavel de ambiente spring.data.mongodb.uri em src/main/java/resources/application.properties

# Run with docker
docker build --pull --rm -f "backend/Dockerfile" -t softplan "backend"

# instale as dependencias com o Maven
$ mvn package

# rode o projeto com sua IDE favorita ou utilizado o cli do java
$ java -jar $ARTIFACT_NAME
```

Made with 💜 by Jean and SpringBoot