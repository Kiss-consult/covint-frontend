
import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(
  keycloak: KeycloakService
  ) {
    return () =>
      keycloak.init({
        config: {
          url: 'http://localhost:8084',
          realm: 'Covint',
          clientId: 'covint-auth'
        },
        initOptions: {
          checkLoginIframe: false
        },
      });
}