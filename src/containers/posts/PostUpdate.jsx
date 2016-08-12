import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {reduxForm, getValues} from 'redux-form';
import _ from 'underscore';

import * as nodeActions from '../../actions/nodeActions';

function loadActiveNode(props) {
  props.getActiveNode('posts', props.nodeId);
}

class PostUpdate extends Component {

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

      componentWillMount() {
        loadActiveNode(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.nodeId !== this.props.nodeId) {
          loadActiveNode(nextProps);
      }
  }

  render() {
    const {fields: {text, price}, activeNode, updateNode, onSubmit} = this.props;
    return (
        <div>
        Post编辑

        <div>
        <label>First Name</label>
        <input type="text" placeholder="text" {..._.pick(text, this.InputProps)}/>
        </div>
        <div>
        <label>Last Name</label>
        <input type="text" placeholder="price" {..._.pick(price, this.InputProps)}/>
        </div>
        <button onClick={this.handeClick.bind(this)}>Click</button>
        </div>
        );
    }

    handeClick(){
        this.props.updateNode('posts', {id:this.props.activeNode.id,text:this.props.formValue.text.value})
    }
};

PostUpdate.propTypes = {
    nodeId:PropTypes.string.isRequired,
    getActiveNode: PropTypes.func.isRequired,
    activeNode: PropTypes.object,
    updateNode: PropTypes.func.isRequired
};

PostUpdate = reduxForm({ 
  form: 'nodeUpdate',                        
  fields: ['text', 'price']
})(PostUpdate);

function mapStateToProps(state, ownProps) {
  const nodeId = ownProps.params.nodeId
  return { 
    nodeId,
    activeNode: state.node.activeNode,
    initialValues:{
        text:state.node.activeNode.text
    },
    formValue:state.form.nodeUpdate
};
}


export default connect(mapStateToProps, 
dispatch => bindActionCreators(nodeActions, dispatch)
)(PostUpdate);