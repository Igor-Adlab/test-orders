import React from "react";
import { Button, Modal, Tag } from 'antd';

import {DEFAULT_STATE} from "../../utils/usePageState";
import {useFeaturePage} from "../../utils/useFeaturePage";

import {ItemForm} from "./ItemForm";
import {DataView} from "../DataView";
import {PageHeader} from "../PageHeader";
import {ItemDiscounts} from "./ItemDiscounts";

export function ItemsPage({ match }) {
    const [state, actions, config] = useFeaturePage({
        create(data) {
            return window.axios.post('/api/items', data);
        },
        load(params = DEFAULT_STATE.params, q) {
            return window.axios.get(`/api/items?${q}`)
        },
        update(data) {
            return window.axios.patch(`/api/items/${data.id}`, data);
        },
        remove(id) {
            return window.axios.delete(`/api/items/${id}`)
                .then(() => actions.reload())
                .catch((e) => actions.error(e.message));
        },
    });

    return (
        <div>
            <PageHeader
                title="Items"
                actions={[
                    <Button key="new-customer" type="primary" onClick={actions.form.bind(null, {})} icon="plus">
                        {'New Item'}
                    </Button>,
                ]}
            />

            <br/>

            <DataView
                state={state}
                config={config}
                actions={actions}
                columns={[
                    {
                        title: 'Image',
                        dataIndex: 'thumb',
                        className: 'content-column text-center',
                        render: (src, record) => <img style={{height: 50}} alt={record.name} src={src}/>
                    },
                    {
                        title: 'Name', dataIndex: 'name', render: (name, record) => (
                            <div>
                                <div>
                                    <strong>{name}</strong>
                                </div>
                                <ItemDiscounts item={record} page={actions} />
                            </div>
                        )
                    },
                    {title: 'Price', dataIndex: 'price', className: 'content-column', render: (price) => `$${price}`},
                ]}
            />

            <Modal
                destroyOnClose
                footer={false}
                visible={state.form.show}
                onCancel={actions.form.bind(null, false)}
            >
                <ItemForm
                    create={config.create}
                    update={config.update}
                    onDone={config.refresh}
                    onError={actions.error}
                    item={state.form.entity}
                />
            </Modal>
        </div>
    );
}
