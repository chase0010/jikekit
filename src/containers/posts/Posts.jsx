import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as nodeActions from '../../actions/nodeActions';

import PostList from '../../components/post/PostList';

function loadNodes(props) {
  props.getNodes('posts');
}

class Posts extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillMount() {
    loadNodes(this.props)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.posts.length !== this.props.posts.length) {
      loadNodes(nextProps)
    }
  }

  render() {
    const {posts, deleteNode} = this.props;
    const actions = { 
      deleteNode: deleteNode
    };
    return (
      <div>
      <PostList posts={posts} actions={actions} />
      </div>
      );
  }
}

Posts.propTypes = {
  posts: PropTypes.array,
  deleteNode: PropTypes.func.isRequired,
  getNodes:PropTypes.func.isRequired
}

export default connect(

  state => ({
    posts: state.node.posts
  }), 
  dispatch => bindActionCreators(nodeActions, dispatch)
  )(Posts);