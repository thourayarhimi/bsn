#Build stage
FROM maven:3.8.7-openjdk-18 AS build
WORKDIR /build
COPY pom.xml .
#RUN mvn dependency:go-offline
RUN mvn -B -q -e -DskipTests dependency:resolve dependency:resolve-plugins
COPY src ./src
RUN mvn clean package -DskipTests

#RUNTIME STAGE
FROM amazoncorretto:17
ARG PROFILE=dev
ARG APP_VERSION=1.0.4
WORKDIR /app
#COPY --from=build /target/book-network-*.jar /app/
COPY --from=build /build/target/book-network-*.jar /app/
EXPOSE 8088

#postgres-sql-bsn
ENV DB_URL=jdbc:postgresql://postgres-sql-bsn:5432/book_social_network12
ENV DB_USERNAME=postgres
ENV DB_PASSWORD=rhimi
ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}
CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL} -Dspring.datasource.username=${DB_USERNAME} -Dspring.datasource.password=${DB_PASSWORD} book-network-${JAR_VERSION}.jar