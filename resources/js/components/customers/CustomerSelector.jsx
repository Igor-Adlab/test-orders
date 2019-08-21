import _ from 'lodash';
import React from 'react';
import { Select } from 'antd';

import { useSelector } from "../../utils/useSelector";

const { Option } = Select;

export function CustomerSelector({ value, onChange }) {
    async function fetch(q = '') {
        return window.axios.get(`/api/customers/select?q=${q}`);
    }

    const [ selector, actions ] = useSelector({ fetch });

    return (
        <Select showSearch loading={selector.loading} style={{ width: '100%' }} filterOption={false} value={value} onChange={onChange} onSearch={actions.search}>
            {_.map(selector.data, customer => (
                <Option key={customer.id} value={customer.id}>{customer.name}</Option>
            ))}
        </Select>
    );
}
