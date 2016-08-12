import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

export default class Post extends Component {
    render() {
    	const {post, deleteNode } = this.props;
        return (
            <li>
            <Link to={`/post/id/${post.id}`}>
            <span>{post.text}</span>
            </Link>
            <button onClick={() => deleteNode('posts',post) }>
            x
            </button>

            <Link to={`/post/update/${post.id}`}>
                <span>编辑</span>
            </Link>

            </li>
            );
    }

}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    deleteNode: PropTypes.func
};