import React, { Component } from 'react';
import toastr from 'toastr';
import JsonTreeViewer from './JsonTreeViewer';
import apiService from '../services/ApiService';

export default class AuthContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            api: []
        };
    };

    shouldExpandNode = (keyPath, data, level) => {
        return true;
    };

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks() {
        apiService
            .callApi()
            .then((data) => {
                this.setState({ api: data.data });
                toastr.success('Api return successfully data, check in section - Api response');
            })
            .catch((error) => {
                toastr.error(error);
            });
    }

    handleSubmit(e) {
        e.preventDefault();

        const form = e.target.form;

        this.apiService
            .postBook({ name: form.name.value, needAuthorize: form.needAuthorize.value })
            .then((data) => {
                this.loadBooks();
            })
            .catch((error) => {
                toastr.error(error);
            });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <JsonTreeViewer data={this.props.user} title="User Profile" shouldExpandNode={this.shouldExpandNode} />
                </div>
                <div className="col-md-6">
                    <JsonTreeViewer data={this.props.api} title="Api Response" shouldExpandNode={this.shouldExpandNode} />
                </div>
                <div className="col-md-6">
                    <JsonTreeViewer data={this.state.api} title="Api Load" shouldExpandNode={this.shouldExpandNode} />
                </div>
                <div className="col-md-6">
                    <form onSubmit={this.handleSubmit} noValidate={true}>
                        Name:
                        <input type="text" className="form-control" name="name" />
                        Need Authorize:
                        <input type="checkbox" name="needAuthorize" />
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}