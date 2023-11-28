
import { KeycloakService } from "keycloak-angular";
import { ConfigService } from "../services/config/config.service";
import { Observable, defer, from, mergeMap } from "rxjs";

export function initializeKeycloak(
  keycloak: KeycloakService, configService: ConfigService
  ) {
    return () => {
      keycloak.init({
        config: {
          url: configService.config.KeycloakUrl,
          realm: "Covint",
          clientId: "covint-auth"
        },
        initOptions: {
          checkLoginIframe: false,
          onLoad: "check-sso"
        },
        loadUserProfileAtStartUp: true
      });
    }
}

export function initializeApp(keycloakService: KeycloakService, configService: ConfigService): () => Observable<void> {
  return () => defer(() => {
    // Call initConfig and switch to the Observable it returns
    return from(initConfig(configService)()).pipe(
      // After initConfig is complete, run initializeKeycloak
      mergeMap(() => {
        initializeKeycloak(keycloakService, configService)();
        return new Observable<void>(observer => {
          // Assuming initializeKeycloak doesn't return an Observable, you can complete the observer immediately
          observer.complete();
        });
      })
    );
  });
}


function initConfig(config: ConfigService): () => Observable<void> {
  return () => config.load();
}