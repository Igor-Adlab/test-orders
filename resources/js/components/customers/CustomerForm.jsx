import React from "react";
import { Form, Input, Button, message } from 'antd';

const { Item } = Form;
const { TextArea } = Input;

export function CustomerFormComponent({ form, customer = {}, onDone, onError, create, update }) {
    const submit = e => {
        e.preventDefault();
        form.validateFields(async (err, values) => {
           if (err) {
               onError('Check your data and try later...');
               return;
           }

           try {
               const { data } = customer.id
                   ? await update(values)
                   : await create(values);

               onDone(data);
           } catch (e) {
               onError(e.message)
           }
        });
    };

    form.getFieldDecorator('id', { initialValue: customer.id });

    return (
        <Form onSubmit={submit}>
            <Item label="Name">
                {form.getFieldDecorator('name', { rules: [{ required: true }], initialValue: customer.name })(
                    <Input type="text" />
                )}
            </Item>
            <Item label="Shipping Address">
                {form.getFieldDecorator('shipping_address', { rules: [{ required: true }], initialValue: customer.shipping_address })(
                    <TextArea />
                )}
            </Item>
            <div className="text-right">
                <Button type="primary" htmlType="submit">Save</Button>
            </div>
        </Form>
    );
}

export const CustomerForm = Form.create()(CustomerFormComponent);
