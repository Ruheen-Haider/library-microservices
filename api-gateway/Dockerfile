#  Stage 1 — Build
FROM maven:3.9.9-eclipse-temurin-17 AS build

WORKDIR /app

# Copy everything
COPY . .

# Build JAR
RUN mvn clean package -DskipTests

#  Stage 2 — Runtime
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy only jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Run application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]