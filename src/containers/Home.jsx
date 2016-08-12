import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { DatePicker } from 'antd';
import '../styles/antd.min.css';
import '../styles/antd.page.css';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleClick(){
        let userId = window.localStorage.getItem('userId')
        console.log(userId);

        var d = new Date();
        d.setTime(d.getTime()+(30*24*60*60*1000));
        var expires = "expires="+d.toGMTString();
        document.cookie="username=makai;" + expires;
        var x = document.cookie;
        console.log(x);
    }

    render() {
        return (
            <div>
            <h1>Home</h1>
            <Link to="/">Home</Link>,
                <Link to="/posts">Posts</Link>,
                <Link to="/post/add">PostAdd</Link>,
                <hr />
                <DatePicker />
            <button onClick={this.handleClick.bind(this)}>获取window.localStorage.getItem('userId')</button>
            </div>
            );
    }
}
export default Home;