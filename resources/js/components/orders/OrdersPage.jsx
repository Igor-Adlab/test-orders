import React from "react";
import _ from "lodash";
import { Button, Modal, Tag, Form } from 'antd';

import {DEFAULT_STATE} from "../../utils/usePageState";
import {useFeaturePage} from "../../utils/useFeaturePage";

import {DataView} from "../DataView";
import {OrderForm} from "./OrderForm";
import {PageHeader} from "../PageHeader";
import {OrdersFilter} from "./OrdersFilter";

export function OrdersPageComponent({match, form}) {
    const [state, actions, config] = useFeaturePage({
        create(data) {
            return window.axios.post('/api/orders', data);
        },
        load(params = DEFAULT_STATE.params, q) {
            return window.axios.get(`/api/orders?${q}`)
        },
        update(data) {
            return window.axios.patch(`/api/orders/${data.id}`, data);
        },
        remove(id) {
            return window.axios.delete(`/api/orders/${id}`)
                .then(() => actions.reload())
                .catch((e) => actions.error(e.message));
        },
    });

    return (
        <div>
            <PageHeader
                title="Orders"
                actions={[
                    <Button key="new-customer" type="primary" onClick={actions.form.bind(null, {})} icon="plus">
                        {'New Order'}
                    </Button>,
                ]}
            />

            <br/>
            <OrdersFilter filter={actions.filter} />
            <br/>

            <DataView
                state={state}
                config={config}
                editable={false}
                actions={actions}
                columns={[
                    {
                        title: 'Customer',
                        dataIndex: 'customer.name',
                        className: 'content-column text-center'
                    },
                    {
                        title: 'Items', dataIndex: 'ordered',
                        render: (ordered) => _.map(ordered, position =>
                            <Tag>{`${position.qty} x ${_.get(position, 'item.name')}`}</Tag>)
                    },
                    {
                        title: 'Total', dataIndex: 'total', className: 'content-column', render: (price) => `$${price}`
                    },
                    {
                        title: 'To pay',
                        dataIndex: 'calculated',
                        className: 'content-column',
                        render: (price) => `$${price}`
                    },
                ]}
            />

            <Modal
                width={800}
                destroyOnClose
                footer={false}
                visible={state.form.show}
                onCancel={actions.form.bind(null, false)}
            >
                <OrderForm
                    create={config.create}
                    update={config.update}
                    onDone={config.refresh}
                    onError={actions.error}
                    order={state.form.entity}
                />
            </Modal>
        </div>
    );
}

export const OrdersPage = Form.create()(OrdersPageComponent);
