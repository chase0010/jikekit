import React, { findDOMNode, Component, PropTypes } from 'react';

export default class AddPost extends Component {
    render() {
        return (
            <div>
                <input type='text' ref='input' placeholder={this.props.textLabel} autoFocus='true'   />
                <button onClick={this.handleSubmit.bind(this)}>
                    {this.props.submitLabel}
                </button>
            </div>
        );
    }

    handleSubmit(e) {
        const text = this.refs.input.value.trim();
        this.props.onSubmit('posts',{text: text});
        this.refs.input.value = '';
    }
}

AddPost.propTypes = {
   onSubmit: PropTypes.func.isRequired,
   textLabel: PropTypes.string,
   submitLabel: PropTypes.string.isRequired,
};