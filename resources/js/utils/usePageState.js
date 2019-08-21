import qs from 'qs';
import _ from "lodash";
import { useEffect, useReducer } from "react";

export const DEFAULT_STATE = {
    data: null,
    error: null,
    loading: false,
    selected: false,
    params: { page: 1 },
};

export const PAGE_ACTIONS = {
    SET_DATA: 'SET_DATA',
    SET_ERROR: 'SET_ERROR',
    SET_PARAMS: 'SET_PARAMS',
    SET_LOADING: 'SET_LOADING',
    SET_SELECTED: 'SET_SELECTED',
};

export function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        } else {
            return state
        }
    }
}

function createPageActions(dispatch, state) {
    return ({
        setResponse: (data) => dispatch({ type: PAGE_ACTIONS.SET_DATA, data }),
        setError: (error) => dispatch({ type: PAGE_ACTIONS.SET_ERROR, error }),
        setParams: (params) => dispatch({ type: PAGE_ACTIONS.SET_PARAMS, params }),
        setLoading: (loading) => dispatch({ type: PAGE_ACTIONS.SET_LOADING, loading }),
        setSelected: (selected) => dispatch({ type: PAGE_ACTIONS.SET_SELECTED, selected }),
    });
}

function createPageState(state) {
    return _.pick(state, ['loading', 'data', 'error', 'params', 'selected']);
}

export function usePageState(initial, config) {
    const reducer = createReducer(DEFAULT_STATE, {
        [PAGE_ACTIONS.SET_DATA]: (state, { data }) => _.assign({}, state, { data }),
        [PAGE_ACTIONS.SET_ERROR]: (state, { error }) => _.assign({}, state, { error }),
        [PAGE_ACTIONS.SET_PARAMS]: (state, { params }) => _.assign({}, state, { params }),
        [PAGE_ACTIONS.SET_LOADING]: (state, { loading }) => _.assign({}, state, { loading }),
        [PAGE_ACTIONS.SET_SELECTED]: (state, { selected }) => _.assign({}, state, { selected }),
    });

    const [ state, dispatch ] = useReducer(reducer, _.assign(DEFAULT_STATE, initial));

    const actions = createPageActions(dispatch);
    const params = _.merge(DEFAULT_STATE.params, state.params);

    const q = qs.stringify(_.pick(state.params, [ 'r', 'filters', 'page' ]));

    useEffect(() => {
        async function load() {
            actions.setLoading(true);
            try {
                const { data } = await config.load(state.params, q);
                actions.setResponse(data);
            } catch(e) {
                actions.setError({ message: e.message });
            }
            actions.setLoading(false);
        }

        load();
    }, [params.page, q]);

    return [ createPageState(state), actions, config ];
}
