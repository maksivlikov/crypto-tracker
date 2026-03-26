import React, { useState } from 'react'
import { fetchCryptos } from '../api/coinGecko'
import { useEffect } from 'react'
import CryptoCard from '../components/CryptoCard'

const Home = () => {

    const [cryptoList, setCryptoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    
    useEffect(() => {
        fetchCryptoData();
    }, [])


    const fetchCryptoData = async () => {

        try {
            const data = await fetchCryptos();
            setCryptoList(data);
            console.log(data);
        } catch (e) {
            console.error("Error: ", e);
        } finally {
            setIsLoading(false);
        }
        
    }
    return (
        <div className='app'>

            <div className='controls'>
                <div className='filter-group'></div>
                <div className='view-toggle'></div>
            </div>

            {isLoading? (
            <div className='loading'>
                <div className='spinner' />
                <p> Loading crypto data </p>
            </div>
            ) : (
            <div>
                {cryptoList.map((crypto, key) => (
                    <CryptoCard crypto={crypto} key={key} />
                ))}
            </div> 
            )}
        </div>
    )
}

export default Home