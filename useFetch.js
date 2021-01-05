import { useEffect, useRef, useState } from "react";

export const useFetch = (url) => {
    const [state, setstate] = useState({
        data: null,
        loading: true,
        error: null,
    });

    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {

        setstate({
            loading: true,
            error: null,
            data: null,
        });

        fetch(url).then(resp => resp.json()).then(data => {

            if (isMounted.current)
            {
                setstate({
                    loading: false,
                    error: null,
                    data,
                });
            }            
        })
        .catch(() => {
            setstate({
                loading: false,
                error: 'no se pudo cargar la info',
                data: null,
            });
        });
    }, [url]);

    return state;
};
