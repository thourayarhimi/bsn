FROM quay.io/keycloak/keycloak:24.0.2

# Admin user
ENV KEYCLOAK_ADMIN=admin
ENV KEYCLOAK_ADMIN_PASSWORD=admin

# Enable HTTP for dev
ENV KC_HTTP_ENABLED=true
ENV KC_HOSTNAME_STRICT=false
ENV KC_HOSTNAME_STRICT_HTTPS=false

# Keycloak DB config
ENV KC_DB=postgres
ENV KC_DB_URL=jdbc:postgresql://postgres-keycloak:5432/keycloak
ENV KC_DB_USERNAME=postgres
ENV KC_DB_PASSWORD=rhimi

# Copy realm
#COPY Docker/keyclock/bsn-realm.json /opt/keycloak/data/import/

# Start Keycloak and import realm automatically
CMD ["start-dev"]
