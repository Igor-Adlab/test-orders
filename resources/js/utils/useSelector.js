import {useEffect, useState} from "react";

export function useSelector({ fetch }) {
    const [ state, setState ] = useState({ loading: false, search: null, data: [] });

    useEffect(() => {
        async function load() {
            setState({ fetched: false, loading: true, data: [] });

            const { data } = await fetch(state.search);

            setState({ loading: false, data, fetched: true });
        }

        load();
    }, [ state.search ]);

    function search(search) {
        setState(Object.assign({}, state, { search }))
    }

    return [ state, { search } ];
}
