import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import { Form, InputNumber, Row, Col, Spin, Button, Card, Divider } from 'antd';

import {CalculatedItem} from "./CalculatedItem";
import { ItemSelector } from "../items/ItemSelector";

const { Item } = Form;

export function OrderItem(props) {
    const { value, onChange, onRemove, readonly = false } = props;
    const [ state, setState ] = useState({ info: false, loading: false });

    function change(field) {
        return val => {
            if (onChange) {
                onChange(Object.assign(value, { [field]: val }));
            }
        };
    }

    async function fetch(qty) {
        if (!value || !value.item_id || !qty) {
            return { };
        }

        return window.axios.get(`/api/items/${value.item_id}/discount?qty=${qty}`)
    }

    useEffect(() => {
        async function load() {
            setState({ loading: true, info: null });

            await fetch(value.qty)
                .then(({ data }) => data)
                .then(info => {
                    setState({ info, loading: false });
                    change('group_discount_id')(_.get(info, 'discount.id'));
                })
                .catch(e => console.log(e));
        }

        load();
    }, [ value.item_id, value.qty ]);

    return (
        <div>
            <Spin spinning={state.loading}>
                <Row className="order-item m-0" gutter={16}>
                    <Col className="item-selector" span={6}>
                        <Item className="mb-0" label="Item">
                            <ItemSelector disabled={readonly} readonly={readonly} value={value.item_id} onChange={change(`item_id`)} />
                        </Item>
                    </Col>
                    <Col className="qty-selector" span={6}>
                        <Item className="mb-0" label="Qty">
                            <InputNumber disabled={readonly} readonly={readonly} value={value.qty} onChange={change(`qty`)} />
                        </Item>
                    </Col>
                    <Col className="calculated-item" span={6}>
                        <CalculatedItem disabled={readonly} info={state.info} qty={value.qty || 0} />
                    </Col>
                </Row>
            </Spin>
            {props.delete ? (
                <div>
                    <div className="float-right">
                        <Button type="link" onClick={onRemove} className="remove-btn">Delete</Button>
                    </div>
                    <Divider className="thin-divider" />
                </div>
            ) : null}
        </div>
    );
}
