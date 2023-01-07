import React, {useEffect, useState} from 'react';
import BenchService from "@/services/Bench/BenchService";
import BenchesTable from "@/components/pages/Benches/BenchesTable";

const TheBenches = () => {
    const [benches, setBenches] = useState([{}])

    const getBenches = async (): Promise<void> => {
        // const [error, data] = await BenchService.getAll()
        //
        // if (!error && data) {
        //     setBenches(data)
        // }
        console.log(123)
    }

    useEffect(() => {
        getBenches()
    }, [])


    return (
            <BenchesTable benches={benches} />
    );
};

export default TheBenches