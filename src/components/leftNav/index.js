
import React, { useEffect, useState } from 'react';
import '@less/left-nav.less';
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import { setMenuCollapsed } from '@store/action';
import MenuConfig from "@config/menuConfig.json"

const { SubMenu, Item } = Menu;

function LeftNav(props) {
    const { setMenuCollapsed, globalReducer, location } = props;

    let pathname = location.pathname;

    let openkey = `/${pathname.split("/")[1]}`;
    let [openKeys, setOpenKeys] = useState([openkey]);

    const changeCollapsed = () => {
        setMenuCollapsed(!globalReducer.isCollapsed);
        setOpenKeys([])
    }

    const createMenuItem = obj => {
        const { key, icon, title, children } = obj;
        return (
            children && children.length > 0 ?
                <SubMenu key={key}
                    popupClassName="left-nav-popup"
                    title={
                        <span>
                            <Icon type={icon} />
                            <span>{title}</span>
                        </span>
                    }
                >
                    {
                        children.map(child => createMenuItem(child))
                    }
                </SubMenu>
                :
                <Item key={key}>
                    <Link to={key} replace>
                        {
                            icon && icon !== "" ? <Icon type={icon} /> : null
                        }
                        <span>{title}</span>
                    </Link>
                </Item>
        )
    }

    function createMenuContent(){
        return (
            MenuConfig.map(item => {
                return createMenuItem(item)
            })
        )
    }

    const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        setOpenKeys([latestOpenKey])
    };


    useEffect(() => {

        return () => {

        }
    }, [])

    return (
        <div className="left-nav">

            <Icon onClick={changeCollapsed} className="left-nav-close" type={!globalReducer.isCollapsed ? "left" : "right"} />

            <div className="left-nav-title">
                <i className="logo-icon"></i>
                React MS
            </div>

            <div className="left-nav-menu-box">
                <Menu
                    mode="inline" theme="dark"
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    selectedKeys={[pathname]}
                    defaultOpenKeys={[openkey]}
                >
                    {
                        createMenuContent()
                    }
                </Menu>
            </div>
        </div>
    )
}

export default connect((state, props) => Object.assign({}, props, state), {
    setMenuCollapsed
})(withRouter(LeftNav));
