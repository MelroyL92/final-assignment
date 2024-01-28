import {useEffect} from "react";

const useAbortController = () => {
    useEffect(() => {
        const controller = new AbortController();

        return () => {
            controller.abort();
        };
    }, []);
};

export default useAbortController;