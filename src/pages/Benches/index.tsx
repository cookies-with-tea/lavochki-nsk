import React, {useEffect, useState} from 'react';
import benchesApi from "@/services/Benches";
import BenchesTable from "@/components/pages/Benches/BenchesTable";

const TheBenches = () => {
    const [benches, setBenches] = useState([{}])

    const getBenches = async (): Promise<void> => {
        const [error, data] = await benchesApi.getAll()

        if (!error && data) {
            setBenches(data)
        }
    }

    useEffect(() => {
        getBenches()
    }, [])


    return (
            <BenchesTable benches={benches} />
    );
};

export default TheBenches