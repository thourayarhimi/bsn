package com.pfe.booknetwork.keycloak;

import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class KeycloakUserService {

    private final Keycloak keycloak;

    @Value("${keycloak.realm}")
    private String realm;

    public KeycloakUserService(
            @Value("${keycloak.auth-server-url}") String authServerUrl

    ) {

            this.keycloak = KeycloakBuilder.builder()
                    .serverUrl(authServerUrl)
                    .realm("master")              // ← always master for admin
                    .clientId("admin-cli")        // ← default client, always exists
                    .username("admin")            // ← your KEYCLOAK_ADMIN
                    .password("admin")            // ← your KEYCLOAK_ADMIN_PASSWORD
                    .grantType(OAuth2Constants.PASSWORD)
                    .build();

    }

    public String getUserFullName(String userId) {
        try {
            UserRepresentation user = keycloak.realm(realm)
                    .users()
                    .get(userId)
                    .toRepresentation();
            return user.getFirstName() + " " + user.getLastName();
        } catch (Exception e) {
            return "Unknown User";
        }
    }
}