import {useState} from "react";

export function useModal(initial = { visible: false, data: null }) {
    const [ state, setState ] = useState(initial);

    function open(data) {
        setState({ visible: true, data });
    }

    function close() {
        setState({ visible: false, data: null });
    }

    return [ state, { open, close } ];
}
