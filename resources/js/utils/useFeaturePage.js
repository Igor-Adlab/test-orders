import _ from "lodash";
import { message } from 'antd';
import { DEFAULT_STATE, usePageState } from "./usePageState";

function createFeatureConfig(state = DEFAULT_STATE, actions, config) {
    return _.assign(config, {
        refresh: () => { actions.form(false); actions.reload(); },
    });
}

function createFeatureActions(state = DEFAULT_STATE, actions) {
    return _.assign(actions, {
        error: (msg) => message.error(msg),
        form: (entity) => actions.setSelected(entity),
        reload: () => actions.setParams(_.merge({}, (state.params || {}), { r: Math.random() })),
        paginate: (page, pageSize) => actions.setParams(_.merge({}, (state.params || {}), { page, per_page: pageSize })),
        filter: {
            reset: () => actions.setParams(_.assign({}, (state.params || {}), { filters: [] })),
            apply: (filters = []) => actions.setParams(_.assign({}, (state.params || {}), { filters, r: Math.random() })),
        },
    });
}

function createFeatureState(state = DEFAULT_STATE) {
    return _.merge(state, {
        form: {
            show: !!state.selected,
            entity: state.selected,
            is_new: _.isEmpty(state.selected),
        },
        list: _.get(state.data, 'data', []),
        pagination: {
            total: _.get(state.data, 'total', 0),
            pageSize: _.get(state.data, 'per_page', 1),
            current: _.get(state.data, 'current_page', 1),
        },
    });
}

export function useFeaturePage(config) {
    const [ state, actions, ...rest ] = usePageState({}, config);

    const newState = createFeatureState(state);
    const newActions = createFeatureActions(newState, actions);
    const newConfig = createFeatureConfig(newState, newActions, config);

    return [ newState, newActions, newConfig, ...rest ];
}
