package com.pfe.booknetwork.keycloak;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class KeycloakUserService {

    private final Keycloak keycloak;

    @Value("${keycloak.realm}")
    private String realm;

    public KeycloakUserService(
            @Value("${keycloak.auth-server-url}") String authServerUrl,
            @Value("${keycloak.admin-client-id}") String clientId,
            @Value("${keycloak.admin-client-secret}") String clientSecret
    ) {
        this.keycloak = Keycloak.getInstance(
                authServerUrl,
                "master",        // always master realm for admin API
                clientId,
                clientSecret,
                "master"
        );
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