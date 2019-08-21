import React from "react";
import { Link } from "react-router-dom";
import {Layout as AntdLayout, Menu} from 'antd';

const { Content, Header, Footer } = AntdLayout;

export function Layout({ children }) {
    return (
        <AntdLayout className="application-layout">
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1">
                        <Link to="/items">Items</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/orders">Orders</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/customers">Customers</Link>
                    </Menu.Item>
                </Menu>
            </Header>
                <Content className="application-content" style={{ width: 960, margin: '15px auto 0 auto', overflowY: 'auto', background: '#fff', padding: '15px' }}>
                    {children}
                </Content>
            <Footer>
                <div className="text-center">&copy; 2019</div>
            </Footer>
        </AntdLayout>
    );
}
