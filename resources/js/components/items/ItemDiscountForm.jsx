import React from "react";
import { Form, Input, InputNumber, Row, Col, Button, Popconfirm, Select } from 'antd';

const { Item } = Form;
const { Option } = Select;

export function ItemDiscountFormComponent({ form, item, discount = {}, onSaved, onError }) {
    form.getFieldDecorator('id', { initialValue: discount.id });
    form.getFieldDecorator('item_id', { rules: [{ required: true }], initialValue: item.id });

    const values = form.getFieldsValue();

    function create(data) {
        return window.axios.post('/api/discounts', data);
    }

    function remove() {
        return window.axios.delete(`/api/discounts/${discount.id}`)
            .then(({ data }) => onSaved(data))
            .catch(e => onError(e.message));
    }

    function update(data) {
        return window.axios.patch(`/api/discounts/${data.id}`, data);
    }

    const submit = e => {
        e.preventDefault();
        form.validateFields(async (err, values) => {
            if(err) {
                onError('Check your data!');
                return;
            }

            try {
                const { data } = await discount.id
                    ? update(values)
                    : create(values);

                onSaved(data);
            } catch (e) {
                onError(e.message);
            }
        });
    };

    return (
        <Form onSubmit={submit}>
            <Item label="Short description">
                {form.getFieldDecorator('name', { rules: [{ required: true }], initialValue: discount.name })(
                    <Input type="text" />
                )}
            </Item>

            <Row gutter={16}>
                <Col span={12}>
                    <Item label="Min Value">
                        {form.getFieldDecorator('min_quantity', { rules: [{ required: true }], initialValue: discount.min_quantity })(
                            <InputNumber className="application-input-number" min={1} />
                        )}
                    </Item>
                </Col>
                <Col span={12}>
                    <Item label="Min Value">
                        {form.getFieldDecorator('max_quantity', { rules: [{ required: true }], initialValue: discount.max_quantity })(
                            <InputNumber className="application-input-number" min={values + 1} />
                        )}
                    </Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Item label="Type">
                        {form.getFieldDecorator('type', { rules: [{ required: true }], initialValue: discount.type })(
                            <Select>
                                <Option value="price">$$$</Option>
                                <Option value="percent">Percent</Option>
                            </Select>
                        )}
                    </Item>
                </Col>
                <Col span={12}>
                    <Item label="Discount Value">
                        {form.getFieldDecorator('value', { rules: [{ required: true }], initialValue: parseFloat(discount.value || 0) })(
                            <InputNumber className="application-input-number" min={1} />
                        )}
                    </Item>
                </Col>
            </Row>

            <div className="text-right">
                {discount.id ? (
                    <span>
                        <Popconfirm title="Are you sure?" onConfirm={remove}>
                            <Button type="danger" htmlType="button" icon="delete">Remove</Button>
                        </Popconfirm>
                        {' '}
                    </span>
                ) : null}
                <Button type="primary" htmlType="submit">Submit</Button>
            </div>
        </Form>
    );
}

export const ItemDiscountForm = Form.create()(ItemDiscountFormComponent);
