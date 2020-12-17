import { Component } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './sso.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private oauth: OAuthService) {
    this.configSigleSignIn();
  }
  configSigleSignIn() {
    this.oauth.configure(authCodeFlowConfig);
    this.oauth.tokenValidationHandler = new JwksValidationHandler();
    this.oauth.loadDiscoveryDocumentAndTryLogin();
  }
  login() {
    this.oauth.initImplicitFlow();
  }
  logout() {
    this.oauth.logOut();
  }

  get token(){
    let claim: any = this.oauth.getIdentityClaims();
    return claim ? claim : null;
  }
}
