import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link,browserHistory } from 'react-router';

var urlencode = require('urlencode2');

import * as nodeActions from '../actions/nodeActions';

import '../styles/base.less';

import AsyncBar from '../components/AsyncBar';



class App extends Component {

    componentWillMount() {
       console.log("URL",document.location.href)
    }

    handleClick(){
        console.log('hello');
        let aaa = document.location.href;
        //window.location.href="http://www.baidu.com?comeForm=" + aaa; 
        //browserHistory.push('/post/add');
        console.log(urlencode(aaa));
    }
    render() {

        const {isWorking, error,code} = this.props;
        return (
            <div>
                <AsyncBar isWorking={isWorking} error={error} />
                <hr />
                <h1>CODE: {code}</h1>
                <h2 onClick={this.handleClick.bind(this)}>Hello</h2>
                <hr />
            	{this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    isWorking: PropTypes.bool,
    error: PropTypes.any
};

 function mapStateToProps(state, ownProps) {
      const code = ownProps.location.query.code;
      return { 
       isWorking: state.node.isWorking,
        error: state.node.error,
        code:code
    };
}


export default connect(mapStateToProps, 
  dispatch => bindActionCreators(nodeActions, dispatch)
  )(App);