

import { useState, useEffect } from 'react';
import { NFTCard } from "./nftCard";
import PaginationBar from "./Pagination";
const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [nfts, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageKeys, setPageKeys] = useState([""]);
  const API_KEY = "XwECHjdJT_Nlpkwhy29S1DaE6Pa6n0Ab";


  async function fetchNFTs() {
    let NFTs;
    console.log("Fetching NFTs...");

    const apiKey = API_KEY;
    const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTs/`;

    if (!collection.length) {
      var requestOptions = {
        method: 'GET'
      };

      const fetchURL = `${baseURL}?owner=${wallet}`;
      NFTs = await fetch(fetchURL, requestOptions).then(data => data.json());
    } else {
      console.log("Fetching Nfts from collection that are owned by the given address...");

      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      NFTs = await fetch(fetchURL, requestOptions).then(data => data.json());
    }

    if (NFTs) {
      console.log("Nfts owned: ", NFTs);
      const animals = [];

   
      if(NFTs.ownedNfts.length > 10){
       
        for(var i=0;i<NFTs.ownedNfts.length;i++){
            if(i%5==0){
              animals.push(NFTs.ownedNfts[i]);
            }
        }
        console.log(animals);
      }
      setNFTs(NFTs.ownedNfts);
    }
  }

  async function fetchNFTsForCollection(startToken = "", pageIndex = 0) {

    if (collection.length) {
      var requestOptions = {
        method: 'GET'
      };
      const apiKey = "XwECHjdJT_Nlpkwhy29S1DaE6Pa6n0Ab";

      const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}&startToken=${startToken}`;
      const NFTs = await fetch(fetchURL, requestOptions).then(data => data.json());

      if (NFTs) {
        if (NFTs.nextToken) {
          setPageKeys((prevKeys) => {
            const newKeys = [...prevKeys];
            newKeys[pageIndex + 1] = NFTs.nextToken;

            return newKeys;
          });
        }
        setNFTs(NFTs.nfts);
      }
    }
  }
  const onClickPage = (e, pageIndex) => {
    if (currentPage === pageIndex) return;

    try {
      fetchNFTsForCollection(pageKeys[pageIndex], pageIndex);
      setCurrentPage(pageIndex);
    } catch (error) {
      console.log(error);
    }
  };
  function nextxxx(e) {
    e.preventDefault();
    
    console.log('You clicked submit.'+nfts[0].description);
  }

  return (
    <div className="bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-green-400 to-indigo-900 h-screen w-screen">
      <center><img src="https://sv1.img.in.th/eCzzX.png" alt="mosutk logo" style={{ width: '300px', height: '300px' }} /></center>
      <div className="bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-green-400 to-indigo-900 flex flex-col items-center justify-center py-8 gap-y-3">

        <div className="flex flex-col w-full justify-center items-center gap-y-2">

          <label><input onChange={(e) => { setFetchForCollection(e.target.checked) }} type={"checkbox"}></input><a className='text-zinc-50	'> Fetching for a collection </a></label>

          <input disabled={fetchForCollection} className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-grey-800 focus:outline-purple-300 disabled:outline-none disabled:bg-transparent disabled:text-opacity-0" onChange={(e) => { setWalletAddress(e.target.value) }} value={wallet} type={"text"} placeholder="Add Wallet Address!"></input>

          <input className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-grey-800 focus:outline-purple-300 disabled:bg-slate-50 disabled:text-grey-50" onChange={(e) => { setCollectionAddress(e.target.value) }} value={collection} type={"text"} placeholder="Add Collection Address!"></input>


          <button className={"shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white hover:font-bold py-2 px-4 rounded"} onClick={
            () => {
              if (fetchForCollection) {
                fetchNFTsForCollection();
              }
              else {
                fetchNFTs();
              }
            }
          }>Load NFTs !!</button>

        </div>
        <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-3 justify-center' style={{ width: '1000px', }} >
          {console.log("pageKeys" + pageKeys)} {

   <button onClick={nextxxx} className={"shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white hover:font-bold py-2 px-4 rounded"} 
  >{">>>>>>>>>>"}</button>
            
            
          }
        </div>  
        <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-3 justify-center' style={{ width: '1000px', }} >
          {console.log("pageKeys" + pageKeys)} {

            nfts.length && nfts.map(nft => {
              return (
                <NFTCard nft={nft} ></NFTCard>
              );
            })
          }
        </div>
        {pageKeys.length > 1 && (
          <PaginationBar
            currentPage={currentPage}
            pageKeys={pageKeys}
            onClickPage={onClickPage}
            className="border-t"
          />
        )}
      </div>
    </div>
  )
}

export default Home