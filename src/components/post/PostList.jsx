import React, { Component, PropTypes } from 'react';
import Post from './Post';

export default class PostList extends Component {
    render() {
        const {actions } = this.props;
        return (
            <ul>
                {this.props.posts.map((post, index) =>
                    <Post 
                        post={post}
                        key={index}
                        {...actions}
                    />
                )}
            </ul>
        );
    }
}

PostList.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    actions: PropTypes.object.isRequired
};