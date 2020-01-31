import * as React from 'react';
import JsonTreeViewer from './JsonTreeViewer';
import { ApiService } from '../services/ApiService';

export interface IAuthContentProps {
  api: any;
  user: any;
}

export default class AuthContent extends React.Component<IAuthContentProps, any> {

  private apiService: ApiService;

  constructor(props: any) {
    super(props);
    this.apiService = new ApiService();

    this.state = {
      api: []
    };
  };

  public shouldExpandNode = (keyPath: Array<string | number>, data: [any] | {}, level: number) => {
    return true;
  };

  public componentDidMount() {

    this.loadBooks();
  }

  public loadBooks(){
    this.apiService
      .callApi()
      .then((data: any) => {
        this.setState({ api: data.data });
        toastr.success('Api return successfully data, check in section - Api response');
      })
      .catch((error: any) => {
        toastr.error(error);
      });
  }

  public handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = (this.refs['name'] as any as HTMLInputElement).value.trim();
    console.warn('Book: ', name);

    this.apiService
      .postBook({name: name})
      .then((data: any) => {

        this.loadBooks();
      })
      .catch((error: any) => {
        toastr.error(error);
      });
  }

  public render() {

    let handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const name = (this.refs['name'] as any as HTMLInputElement).value.trim();
  
    this.apiService
      .postBook({name: name})
      .then((data: any) => {

        this.loadBooks();
      })
      .catch((error: any) => {
        toastr.error(error);
      });
    }

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
          <form onSubmit={handleSubmit} noValidate={true}>
            Name: <input type="text" className="form-control" placeholder="Name" ref="name"/>
            Need Authorize: <input type="checkbox" ref="needAuthorize"/>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>sss
          </form>
        </div>
      </div>
    );
  }
}
