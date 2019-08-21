import React from "react";
import { Form, Input, Button, InputNumber, Row, Col } from 'antd';

const { Item } = Form;
const { TextArea } = Input;

export function ItemFormComponent({ form, item = {}, onDone, onError, create, update }) {
    const submit = e => {
        e.preventDefault();
        form.validateFields(async (err, values) => {
           if (err) {
               onError('Check your data and try later...');
               return;
           }

           // Images list
           values.images = values.images.split(',');

           try {
               const { data } = item.id
                   ? await update(values)
                   : await create(values);

               onDone(data);
           } catch (e) {
               onError(e.message)
           }
        });
    };

    form.getFieldDecorator('id', { initialValue: item.id });

    return (
        <Form onSubmit={submit}>
            <Item label="Name">
                {form.getFieldDecorator('name', { rules: [{ required: true }], initialValue: item.name })(
                    <Input type="text" />
                )}
            </Item>

            <Row gutter={16}>
                <Col span={12}>
                    <Item label="Price">
                        {form.getFieldDecorator('price', { rules: [{ required: true }], initialValue: item.price })(
                            <InputNumber style={{ width: "100%" }} min={1} />
                        )}
                    </Item>
                </Col>
                <Col span={12}>
                    <Item label="Image">
                        {form.getFieldDecorator('thumb', { rules: [{ required: true }], initialValue: item.thumb })(
                            <Input type="url" />
                        )}
                    </Item>
                </Col>
            </Row>

            <Item label="Images (urls)">
                {form.getFieldDecorator('images', { rules: [{ required: true }], initialValue: _.join(item.images, ',') })(
                    <TextArea />
                )}
            </Item>

            <div className="text-right">
                <Button type="primary" htmlType="submit">Save</Button>
            </div>
        </Form>
    );
}

export const ItemForm = Form.create()(ItemFormComponent);
