
import { KeycloakService } from "keycloak-angular";
import { ConfigService } from "../services/config/config.service";

export function initializeKeycloak(
  keycloak: KeycloakService, configService: ConfigService
  ) {
    return () =>
      keycloak.init({
        config: {
          url: configService.config.KeycloakUrl,
          realm: "Covint",
          clientId: "covint-auth"
        },
        initOptions: {
          checkLoginIframe: false
        },
      });
}