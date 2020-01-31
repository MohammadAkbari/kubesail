import * as R from 'ramda';
import * as React from 'react';
import JSONTree from 'react-json-tree';

export default class JsonTreeViewer extends React.Component {

    renderJsonData() {
        return R.not(R.isEmpty(this.props.data)) && R.not(R.isNil(this.props.data)) ? (
            <>
                <h1>{this.props.title}</h1>
                <JSONTree data={this.props.data} theme="bright" shouldExpandNode={this.props.shouldExpandNode} />
            </>
        ) : null;
    }

    render() {
        return this.renderJsonData();
    }
}