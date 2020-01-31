import * as Constants from "../helpers/constants"
import { Log, UserManager } from 'oidc-client';

const settings = {
    authority: Constants.stsAuthority,
    client_id: Constants.clientId,
    redirect_uri: `${Constants.clientRoot}signin-callback.html`,
    silent_redirect_uri: `${Constants.clientRoot}silent-renew.html`,
    post_logout_redirect_uri: `${Constants.clientRoot}`,
    response_type: 'code',
    scope: Constants.clientScope,
    automaticSilentRenew: true
};

Log.logger = console;
Log.level = Log.INFO;

let userManager = new UserManager(settings);

export default {
    getUser() {
        return userManager.getUser();
    },
    login() {
        return userManager.signinRedirect();
    },
    renewToken() {
        return userManager.signinSilent();
    },
    logout() {
        return userManager.signoutRedirect();
    }
}