import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as nodeActions from '../../actions/nodeActions';

import AddPost from '../../components/post/AddPost';

class PostAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const {addNode} = this.props;
        return (
            <div>
                PostAdd
                <AddPost
                onSubmit={addNode} 
                textLabel='请输入标题' 
                submitLabel='新增'
                />
            </div>
        );
    }
};

PostAdd.propTypes = {
    addNode: PropTypes.func.isRequired
};

export default connect(
  state => ({
}), 
  dispatch => bindActionCreators(nodeActions, dispatch)
  )(PostAdd);