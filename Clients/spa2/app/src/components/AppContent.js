import React, { Component } from 'react';
import toastr from 'toastr';
import apiService from '../services/ApiService';
import authService from '../services/AuthService';
import AuthContent from './AuthContent';
import Buttons from './Buttons';

export default class AppContent extends Component {
    constructor(props) {
        super(props);
        this.state = { user: {}, api: {} };
        this.shouldCancel = false;
    }

    componentDidMount() {
        authService.getUser();
    }

    componentWillUnmount() {
        this.shouldCancel = true;
    }

    login = () => {
        authService.login();
    };

    callApi = () => {
        apiService
            .callApi()
            .then(data => {
                this.setState({ api: data.data });
                toastr.success('Api return successfully data, check in section - Api response');
            })
            .catch(error => {
                toastr.error(error);
            });
    };

    renewToken = () => {
        authService
            .renewToken()
            .then(user => {
                toastr.success('Token has been sucessfully renewed. :-)');
                authService.getUser();
            })
            .catch(error => {
                toastr.error(error);
            });
    };

    logout = () => {
        authService.logout();
    };

    getUser = () => {
        authService.getUser().then(user => {
            if (user) {
                toastr.success('User has been successfully loaded from store.');
            } else {
                toastr.info('You are not logged in.');
            }

            if (!this.shouldCancel) {
                this.setState({ user });
            }
        });
    };

    render() {
        return (
            <>
                <Buttons
                    login={this.login}
                    logout={this.logout}
                    renewToken={this.renewToken}
                    getUser={this.getUser}
                    callApi={this.callApi}
                />

                <AuthContent api={this.state.api} user={this.state.user} />

                <div>v 1.2</div>
            </>
        );
    }
}