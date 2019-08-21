import qs from 'qs';
import React from "react";
import {Table, Button, Modal, Popconfirm} from 'antd';

import {DEFAULT_STATE} from "../../utils/usePageState";
import {useFeaturePage} from "../../utils/useFeaturePage";

import {PageHeader} from "../PageHeader";
import {CustomerForm} from './CustomerForm';
import {DataView} from "../DataView";

export function CustomersPage({ match }) {
    const [state, actions, config] = useFeaturePage({
        create(data) {
            return window.axios.post('/api/customers', data);
        },
        load(params = DEFAULT_STATE.params, q) {
            return window.axios.get(`/api/customers?${q}`)
        },
        update(data) {
            return window.axios.patch(`/api/customers/${data.id}`, data);
        },
        remove(id) {
            return window.axios.delete(`/api/customers/${id}`)
                .then(() => actions.reload())
                .catch((e) => actions.error(e.message));
        },
    });

    return (
        <div>
            <PageHeader
                title="Customers"
                actions={[
                    <Button key="new-customer" type="primary" onClick={actions.form.bind(null, {})} icon="plus">
                        {'New Customer'}
                    </Button>,
                ]}
            />

            <br/>

            <DataView
                state={state}
                config={config}
                actions={actions}
                columns={[
                    { title: 'Name', dataIndex: 'name' },
                    { title: 'Shipping Address', dataIndex: 'shipping_address' },
                ]}
            />

            <Modal
                destroyOnClose
                footer={false}
                visible={state.form.show}
                onCancel={actions.form.bind(null, false)}
            >
                <CustomerForm
                    create={config.create}
                    update={config.update}
                    onDone={config.refresh}
                    onError={actions.error}
                    customer={state.form.entity}
                />
            </Modal>
        </div>
    );
}
