import { Col, Row, Spin } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

function Loading({ isCentered, size }) {
    const spin = <Spin size={size} />
    return (
        <div>
            {isCentered ? (
                <Row justify="center" >
                    <Col span={2}>
                        {spin}
                    </Col>
                </Row>
            ) : { spin }}
        </div>
    );
}

Loading.defaultProps = {
    isCentered: true,
    size: 'large'
};
Loading.propTypes = {
    isCentered: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default Loading;