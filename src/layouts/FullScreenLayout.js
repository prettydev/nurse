import { Layout } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import './FullScreenLayout.scss';
const { Content, Footer } = Layout;


const FullScreenLayout = ({ children }) => (
    <Layout id="main-container">
        <Content>
            {children}
        </Content>
    </Layout>
);

FullScreenLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.array,
    ]).isRequired,
};

export default FullScreenLayout;
