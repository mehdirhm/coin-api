import { FC, useEffect, useState } from 'react';
import styles from '../../Styles/SearchList.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import { useTheme } from '../../contexts/ThemeContext';
import { v4 as uuidv4 } from 'uuid';

const SearchList: FC = (): JSX.Element => {
    interface Coin {
        id: string;
        symbol: string;
        name: string;
        image: string;
        current_price: number;
        market_cap: number;
        market_cap_rank: number;
        fully_diluted_valuation: number;
        total_volume: number;
        high_24h: number;
        low_24h: number;
        price_change_24h: number;
        price_change_percentage_24h: number;
        market_cap_change_24h: number;
        market_cap_change_percentage_24h: number;
        circulating_supply: number;
        total_supply: number;
        max_supply: number;
        ath: number;
        ath_change_percentage: number;
        ath_date: string;
        atl: number;
        atl_change_percentage: number;
        atl_date: number;
        roi: null;
        last_updated: string;
        }
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Coin[]>([])
    const [status, setStatus] = useState(false)
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const { theme} = useTheme();

    const handleSearch = (event:any) => {

        event.preventDefault();
        setSearchTerm(event.target.value);
      
        const filteredCoins = searchResults?.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
      
    );
    if(event.target.value === ''){
        setStatus(!status)

        
    }
   else{  
    setSearchResults(filteredCoins)
     }
   


    }

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        // Move to the previous item when pressing the up arrow key
        setSelectedItemIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : searchResults.length - 1
        );
      } else if (event.key === 'ArrowDown') {
        // Move to the next item when pressing the down arrow key
        setSelectedItemIndex((prevIndex) =>
          prevIndex < searchResults.length - 1 ? prevIndex + 1 : 0
        );
      }
    };

    useEffect(() => {
      window.addEventListener('keydown', handleKeyPress);
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }, [searchResults]);

    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
        
            const exactMatch = searchResults?.find((coin) =>
            coin.name.toLowerCase() === searchTerm.toLowerCase()
          );
    
          if (exactMatch) {
            setSearchResults([exactMatch]);   
            updateLocalStorage([exactMatch]);     
          } else {
            setSearchResults([]); 
          }
          setSearchTerm('')
        //   setStatus(!status)
        }
      };

 
      const MAX_LOCAL_STORAGE_ITEMS = 3;

const updateLocalStorage = (newResults: Coin[]) => {
  const searchTermKey = searchTerm;
  const savedResults = localStorage.getItem(searchTermKey);

  const currentTime:number = Date.now() ; 
  // console.log(currentTime)// Get the current timestamp

  if (savedResults) {
    const previousResults: { data: Coin[]; timestamp: number }[] = JSON.parse(savedResults);

    // Combine previousResults and newResults with timestamps
    const updatedResults: { data: Coin[]; timestamp: number }[] = [
      { data: newResults, timestamp: currentTime   },
      ...previousResults,
    ];
    // console.log(updatedResults[0].timestamp)
    // Sort the results based on the timestamp in descending order
    updatedResults.sort((a, b) => b.timestamp - a.timestamp);

    // Limit the number of items to MAX_LOCAL_STORAGE_ITEMS
    const limitedResults = updatedResults.slice(0, MAX_LOCAL_STORAGE_ITEMS);

    // Save the updated results
    localStorage.setItem(searchTermKey, JSON.stringify(limitedResults));
  } else {
    // If no previous results, save the new results directly with a timestamp
    const resultsWithTimestamp = { data: newResults, timestamp: currentTime };
    localStorage.setItem(searchTermKey.toLowerCase(), JSON.stringify([resultsWithTimestamp]));
  }

  // Object.values(localStorage).map((key) => console.log(JSON.parse(key)[0].data[0].name))

  // Get all the keys and their timestamps in local storage
  const allKeysWithTimestamp = Object.values(localStorage).map((key) => ({
    key: JSON.parse(key)[0].data[0].name.toLowerCase() ,
    timestamp: JSON.parse(key)[0].timestamp,
  }));
  // console.log(allKeysWithTimestamp)

  // Sort keys by timestamp in ascending order
  allKeysWithTimestamp.sort((a, b) => a.timestamp - b.timestamp);
  console.log(allKeysWithTimestamp)


  // If the number of keys exceeds the limit, remove the oldest search result
  if (allKeysWithTimestamp.length > MAX_LOCAL_STORAGE_ITEMS) {
    const oldestKey = allKeysWithTimestamp[0].key;
    console.log(oldestKey)
    console.log(localStorage)
    localStorage.removeItem(oldestKey);
  }
};

      
      
      

      
    

     useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&page=1&sparkline=false&locale=en',);
            setSearchResults(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [status]);



    return (
        <div style={{
          backgroundColor: theme === 'light' ? '#e3c1fef4' : '#282727',
        }} className='flex flex-col w-[100vw] min-h-[100vh]    items-center'>
            <Header backColor='#e3c1fef4' color='#d7af00'/>
            <div className={`${styles.header} flex flex-col justify-center items-center gap-2`}>
              <div>
                <span className='text-[48px]'>
                  Search Coin
                </span>
              </div>

              <div>
                <span>
                  Get information from Here
                </span>
              </div>

            </div>
            <ul className='flex gap-8 flex-col mt-12 items-center justify-between  text-black' style={{
                direction: 'ltr',
            }}>
                <div className='flex justify-center text-[22px] text-[#ffffff]'>
                    <h1 style={{
                      color: theme === 'light' ? '#490085' : '#ffffff'
                    }}>Cryptocurrency Prices by Market Cap</h1>
                </div>

    <input placeholder='Serach' style={{
      backgroundColor: theme === 'light' ? '#e3c1fef4' : '#282727',
      color: theme === 'light' ? '#370061' : '#ffffff'
    }} onChange={handleSearch} onKeyDown={handleEnter} className=' flex sm  justify-center  w-[1440px]  border bg-[#323232] text-[#ffffff] p-2 rounded sm:max-w-[390px]' type="text" name="" value={searchTerm} id="" />
<li className='flex p-2 w-[1440px] sm:w-[390px] bg-[#ffc928]  flex-row items-center gap-52'>
                     <div   className='flex flex-row gap-2 w-[180px] sm:w-[100px] '>
                    
                       <span style={{
                      color: theme === 'light' ? '#490085' : '#ffffff'
                    }}
                     className='text-[#ffffff]' >Coin</span>
                        

                    </div>


                    <div className=' flex justify-center w-[300px] sm:w-[80px]'>
                    <span style={{
                      color: theme === 'light' ? '#490085' : '#ffffff'
                    }} className='text-[#ffffff]'>Price</span>

                    </div>

                    <div  className='flex sm:hidden justify-center  w-[200px]'>
                    <span style={{
                      color: theme === 'light' ? '#490085' : '#ffffff'
                    }} className='text-[#ffffff]'>24h Changes</span>


                    </div>


                    <div className='flex sm:hidden justify-center  w-[130px]'>
                    <span style={{
                      color: theme === 'light' ? '#490085' : '#ffffff'
                    }} className='text-[#ffffff]'>Market Cap</span>

                    </div>
                    
                    
                    
                    
                   
                    
                </li>


            {searchResults?.map((coin, index) => (
                <div key={uuidv4()} className='flex -mt-4 flex-col gap-2'>

                
                <li onClick={() => setSelectedItemIndex(index)}  onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setSelectedItemIndex(index);
              }
            }}
            role='button'
            tabIndex={0}            className={`flex flex-row items-center gap-52 ${index === selectedItemIndex ? 'bg-[#ffb812fa] rounded' : ''}`}>
                  <Link to={`/search/${coin.id}`}>
                  <div  className='flex flex-row gap-2 w-[180px] sm:w-[100px]'>
                    <img src={coin.image} width="50px" height="50px" alt="" />
                        <div className='flex w-[80px] flex-col' style={{
                            direction: 'ltr',
                        }}>
                        <h6 style={{
                      color: theme === 'light' ? '#490085' : '#ffffff'
                    }} className='text-[#ffffff]'>{coin.symbol.toUpperCase()}</h6>
                        <span style={{
                      color: theme === 'light' ? '#490085' : '#ffffff'
                    }} className='text-[13px] text-[#ffffffff]'>{coin.name}</span>

                        </div>
                       
                        

                    </div>
                  </Link>
                     


                    <div className='flex text-[#ffffff] justify-center w-[300px] sm:w-[80px]'>
                    <span style={{
                      color: theme === 'light' ? '#490085' : '#ffffff'
                    }}>${coin.current_price}</span>

                    </div>

                    <div className=' w-[200px] sm:hidden flex justify-center'>
                    <span style={{
                      color: coin.price_change_24h < 0 ? '#e80101':'#0f980a'
                    }}>{coin.price_change_24h}%</span>


                    </div>


                    <div className=' w-[130px] sm:hidden  text-[#ffffff] flex justify-center'>
                    <span style={{
                      color: theme === 'light' ? '#490085' : '#ffffff'
                    }}>${coin.market_cap}</span>

                    </div>
                    
                    
                    
                    
                   
                    
                </li>
                <hr />
                </div>

            ))}

            </ul>
            
            
            

        </div>
    )
}
export default SearchList;