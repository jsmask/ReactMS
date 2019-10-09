import React from 'react';
import '@less/header.less'
import { connect } from 'react-redux';
import { setLogout } from "@store/action"
import { withRouter } from 'react-router-dom'

import { Modal } from 'antd'

function HeaderNav(props) {

    const { userReducer, history, setLogout } = props;

    const onLogout = () => {
         Modal.confirm({
            title: 'Do you want to log out?',
            centered:true,
            onOk() {
                history.replace("/login");
                setLogout();
            }
        });
    }

    return (
        <div className="header-nav">
            <h6>
                欢迎<span>{userReducer.info.username}</span>
                <button onClick={onLogout}>退出</button>
            </h6>
        </div>
    )
}

export default connect((state, props) => Object.assign({}, props, state), {
    setLogout
})(withRouter(HeaderNav));
