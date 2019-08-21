import React from "react";
import { Col, Row } from "antd";

export function PageHeader({ title, actions }) {
    return (
        <Row>
            <Col span={16}>
                <h1 className="mb-0">{title}</h1>
            </Col>
            <Col className="text-right" span={8}>
                {actions}
            </Col>
        </Row>
    );
}
