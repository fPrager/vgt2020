import Head from 'next/head';
import React, { useState } from 'react';
import Link from 'next/link';

import { Menu, Layout, Divider } from 'antd';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  TrophyOutlined,
} from '@ant-design/icons';

import MockData from '../mock/data.json';
import GameIcon from '../components/GameIcon';

import '../styles/antd.less';

const { Sider, Content } = Layout;

const MyApp = ({ Component, pageProps }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/fonts/Heavitas.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>
      <div className="vignette" />
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['score']}>
            <div className="logo" />
            <Divider />
            <Menu.Item key="score" icon={<TrophyOutlined />}>
              <Link href="/">Scoreboard</Link>
            </Menu.Item>
            <Divider />
            {
            MockData.games.map((game) => (
              <Menu.Item key={game.id} icon={<GameIcon gameId={game.id} />}>
                <Link href={`/game/${game.id}`}>{game.title}</Link>
              </Menu.Item>
            ))
          }
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <div className="opener">
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </div>
          <Content
            className="site-layout-background content"
          >
            <Component {...pageProps} />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MyApp;
