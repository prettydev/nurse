import { Grid, Layout } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Colors } from '../util/Colors';
const { Content, Sider } = Layout;
const { useBreakpoint } = Grid;
export const SIDEBAR_WIDTH = 320;

const ResponsiveLayout = ({ sidebar, main }) => {
  const screens = useBreakpoint();
  const mobile = !screens.lg;

  const siderStyle = mobile ? {} : {
    overflowY: 'auto',
    height: '100vh',
    position: 'fixed',
    left: 0,
  };

  return (
    <Layout id="main-container">
      <Sider
        style={siderStyle}
        breakpoint="lg"
        collapsedWidth="0"
        theme="light"
        width={SIDEBAR_WIDTH}
        onBreakpoint={broken => {
        }}
        onCollapse={(collapsed, type) => {
        }}
        zeroWidthTriggerStyle={{ top: 11, paddingLeft: 15, fontSize: '16pt', background: Colors.Header }}
        className="sider-mt sider-shadow sider-gradient">
        {sidebar}
      </Sider>
      <Layout
          className="content-mt"
          style={screens.lg ? { marginLeft: SIDEBAR_WIDTH, height: '100vh' } : { height: '100vh' }}
      >
        <Content>
          {main}
        </Content>
      </Layout>
    </Layout>
  )
};

ResponsiveLayout.propTypes = {
  sidebar: PropTypes.element.isRequired,
  main: PropTypes.element.isRequired,
};

export default ResponsiveLayout;
