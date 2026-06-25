# Stage 1 — Build
FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /app
COPY . .

ENV SPRING_PROFILES_ACTIVE=docker

RUN mvn clean package -DskipTests -Dmaven.test.skip=true

# Stage 2 — Runtime
FROM eclipse-temurin:21-jdk-jammy

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "/app/app.jar"]