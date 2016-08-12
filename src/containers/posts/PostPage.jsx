import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link} from 'react-router';

import * as nodeActions from '../../actions/nodeActions';

function loadActiveNode(props) {
  props.getActiveNode('posts', props.nodeId);
}

class PostPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
        loadActiveNode(this.props);
    }

    componentWillReceiveProps(nextProps) {
    if (nextProps.nodeId !== this.props.nodeId) {
      loadActiveNode(nextProps);
    }
  }

    render() {
        let renderPost = (this.props.activeNode) ? this.renderHaveNode() : this.renderNotHaveNode();
        return (
            <div>
            {renderPost}
            </div>
            );
        }
        renderHaveNode() {
            const {activeNode} = this.props;
            return (
            <div>
            {activeNode.text}
            </div>
            );
        }

        renderNotHaveNode() {
            return (
            <p>
                未找到页面
            </p>
            );
        }

    }




    PostPage.propTypes = {
        nodeId:PropTypes.string.isRequired,
        getActiveNode: PropTypes.func.isRequired,
        activeNode: PropTypes.object,
    }

    function mapStateToProps(state, ownProps) {
      const nodeId = ownProps.params.nodeId
      return { 
        nodeId,
        activeNode: state.node.activeNode
    };
}

export default connect(mapStateToProps, 
dispatch => bindActionCreators(nodeActions, dispatch)
)(PostPage);