import _ from "lodash";
import React from "react";
import {Form, Button, Icon} from 'antd';

import {CustomerSelector} from "../customers/CustomerSelector";
import {OrderItem} from "./OrderItem";

const {Item} = Form;

let id = 0;

export function OrderFormComponent({ form, order = {}, onDone, onError, create, update }) {
    const submit = e => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (err) {
                onError('Check your data and try later...');
                return;
            }

            if(!values.item || !values.item.item_id || !values.item.qty) {
                onError('Select item');
                return;
            }

            // Add item to list
            values.items = [values.item];

            const response = order.id
                ? update(values) // TODO
                : create(values);

            response
                .then(({ data }) => onDone(data))
                .catch(err => onError(e.message));
        });
    };


    form.getFieldDecorator('id', { initialValue: order.id });

    return (
        <Form onSubmit={submit}>
            <Item label="Customer">
                {form.getFieldDecorator('customer_id', {rules: [{required: true}], initialValue: order.customer_id})(
                    <CustomerSelector />
                )}
            </Item>

            {!order.id ? (
                <Item>
                    {form.getFieldDecorator(`item`, {
                        initialValue: {},
                    })(<OrderItem delete={false} />)}
                </Item>
            ) : _.map(order.ordered, ordered => (
                <Item>
                    {form.getFieldDecorator(`item`, {
                        initialValue: ordered,
                    })(<OrderItem readonly delete={false} />)}
                </Item>
            ))}

            <div className="text-right">
                {!order.id
                    ? (<Button type="primary" htmlType="submit">Save</Button>)
                    : (<Button type="default" onClick={onDone}>Close</Button>)
                }
            </div>
        </Form>
    );
}

export const OrderForm = Form.create()(OrderFormComponent);
