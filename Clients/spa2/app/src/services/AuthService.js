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

let manager = new UserManager(settings);

export default {
    getUser() {
        return manager.getUser();
    },
    login() {
        return manager.signinRedirect();
    },
    renewToken() {
        return manager.signinSilent();
    },
    logout() {
        return manager.signoutRedirect();
    }
}