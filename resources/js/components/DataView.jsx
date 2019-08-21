import _ from "lodash";
import React from "react";
import moment from "moment";
import { Table, Button, Popconfirm } from 'antd';

export function DataView({ columns = [], buttons = [], config, editable = true, actions, state }) {
    return (
        <Table
            // bordered
            rowKey="id"
            columns={columns.concat([
                {
                    title: 'Created',
                    dataIndex: 'created_at',
                    className: 'content-column',
                    render: (timestamp) => moment(timestamp).format('L LT'),
                },
                {
                    title: 'Actions',
                    className: 'column-actions',
                    render: (record) => (
                        <div className="text-right">
                            {
                                <Button key="edit" size="small" type="default"
                                     onClick={actions.form.bind(null, record)}>{editable ? 'Edit' : 'View'}</Button>
                            }
                            {' '}
                            <Popconfirm key="remove" onConfirm={config.remove.bind(null, record.id)} title="Are you sure？" okText="Yes" cancelText="No">
                                <Button size="small" type="danger">Delete</Button>
                            </Popconfirm>
                            {' '}
                            {_.map(buttons, (action, key) => (
                                <span style={{ marginRight: '7px' }} key={key}>
                                    {action(record)}
                                </span>
                            ))}
                        </div>
                    ),
                },
            ])}
            pagination={{
                ...state.pagination,
                onChange: actions.paginate,
            }}
            loading={state.loading}
            dataSource={state.list}
        />
    );
}
