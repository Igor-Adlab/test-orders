import React from "react";
import moment from "moment";
import { Form, Button, DatePicker, Row, Col } from "antd";
import {CustomerSelector} from "../customers/CustomerSelector";

const { Item } = Form;
const { RangePicker } = DatePicker;

export function OrdersFilterComponent({ form, filter }) {
    function reset() {
        filter.reset();
        form.resetFields();
    }

    function submit(e) {
        e.preventDefault();
        form.validateFields((err, values) => {
            const filters = [];

            if (values.customer) {
                filters.push({ field: 'customer_id', sign: '=', value: values.customer });
            }

            if (values.range) {
                const [ from, to ] = values.range;

                if (to) {
                    filters.push({ field: 'created_at', sign: '<=', value: moment(to).format() });
                }

                if (from) {
                    filters.push({ field: 'created_at', sign: '>=', value: moment(from).format() });
                }
            }

            filter.apply(filters);
        });
    }

    return (
        <Form onSubmit={submit}>
            <Row className="orders-filter" gutter={16}>
                <Col span={8}>
                    <Item className="mb-0" label="Customer">
                        {form.getFieldDecorator('customer', {})(
                            <CustomerSelector />
                        )}
                    </Item>
                </Col>
                <Col span={8}>
                    <Item className="mb-0" label="Date range">
                        {form.getFieldDecorator('range', {})(
                            <RangePicker />
                        )}
                    </Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={8}>
                    <Button htmlType="submit" type="primary">Apply</Button>
                    {' '}
                    <Button onClick={reset} type="default">Reset</Button>
                </Col>
            </Row>
        </Form>
    );
}

export const OrdersFilter = Form.create()(OrdersFilterComponent);
