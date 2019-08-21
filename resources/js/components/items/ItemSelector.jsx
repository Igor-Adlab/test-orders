import _ from 'lodash';
import React from 'react';
import { Select } from 'antd';

import { useSelector } from "../../utils/useSelector";

const { Option } = Select;

export function ItemSelector({ readonly, extended = false, multiple = false, value, onChange }) {
    async function fetch(q = '') {
        return window.axios.get(`/api/items/select?q=${q}`);
    }

    const [ selector, actions ] = useSelector({ fetch });

    return (
        <Select disabled={readonly} mode={multiple ? "multiple" : null} showSearch loading={selector.loading} style={{ width: '100%' }} filterOption={false} value={value} onChange={onChange} onSearch={actions.search}>
            {_.map(selector.data, item => (
                <Option key={item.id} value={!extended ? item.id : item}>{item.name}</Option>
            ))}
        </Select>
    );
}
