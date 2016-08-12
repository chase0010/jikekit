import React, { findDOMNode, Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import _ from 'underscore';


export default class UpdatePost extends Component {

    constructor(props) {
        super(props);
        this.InputProps = [
          // HTML attributes
          "placeholder",
          "type",
          "value",
          // Event listeners
          "onBlur",
          "onChange",
          "onFocus",
        ];

        this.state = {

        };
    }


    render() {
        const {post} = this.props;
        const {fields: {text, price}, handleSubmit} = this.props;

        return (
            <div>
                <hr />
                 <form onSubmit={handleSubmit}>
                  <div>
                    <label>First Name</label>
                    <input type="text" placeholder="text" {..._.pick(text, this.InputProps)}/>
                  </div>
                  <div>
                    <label>Last Name</label>
                    <input type="text" placeholder="price" {..._.pick(price, this.InputProps)}/>
                  </div>
                  <button type="submit">Submit</button>
                </form>

            </div>
        );
    }

    handleSubmit(e) {
        this.props.onSubmit({text: 'hello'});
    }
    handleClick(e) {
        const text = this.refs.input.value.trim();
        console.log(text);
    }
}

UpdatePost.propTypes = {
   textLabel: PropTypes.string,
   submitLabel: PropTypes.string.isRequired,
};


UpdatePost = reduxForm({ 
  form: 'postUpdate',                        
  fields: ['text', 'price'],
  initialValues:{
    text:this.props.post.text
  }
})(UpdatePost);


export default UpdatePost;