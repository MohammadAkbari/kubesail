import axios from 'axios';
import * as Constants from "../helpers/constants"
import authService from './AuthService';

function _callApi(token) {
    const headers = {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
    };

    return axios.get(Constants.apiRoot, { headers });
}

function _postBook(token, book) {
    const headers = {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
    };

    return axios.post(Constants.apiRoot, book, { headers });
}

export default {

    callApi() {
        return authService.getUser()
            .then(user => {
            if (user && user.access_token) {
                return _callApi(user.access_token)
                    .catch(error => {
                            if (error.response.status === 401) {
                                return authService.renewToken().then(renewedUser => {
                                    return _callApi(renewedUser.access_token);
                                });
                            }
                        throw error;
                    });
            } else if (user) {
                return authService.renewToken().then(renewedUser => {
                    return _callApi(renewedUser.access_token);
                });
            } else {
                throw new Error('user is not logged in');
            }
        });
    },
    postBook(book) {
        return authService.getUser().then(user => {
            if (user && user.access_token) {
                return _postBook(user.access_token, book).catch(error => {
                    if (error.response.status === 401) {
                        return authService.renewToken()
                            .then(renewedUser => {
                                return _postBook(renewedUser.access_token, book);
                            });
                    }
                    throw error;
                });
            } else if (user) {
                return authService.renewToken()
                    .then(renewedUser => {
                        return _postBook(renewedUser.access_token, book);
                    });
            } else {
                throw new Error('user is not logged in');
            }
        });
    }
}