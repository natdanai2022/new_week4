
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { NFTCard } from "./nftCard";
import PaginationBar from "./Pagination";
const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPage, setNextPage] = useState("");
  const [startToken, setStartToken] = useState(1);
  const [pageSize, setPageSize] = useState(4);


  async function fetchNFTs() {
    setIsLoading(true);
    let nfts;
    console.log("fetching nfts");
    const api_key = "lmsojVdyGh8B3152-q-bDPtiaC_Ce1rq";
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;
    var requestOptions = {
      method: "GET",
    };

    if (!collection.length) {
      const fetchURL = `${baseURL}?owner=${wallet}&pageKey=${nextPage}&pageSize=${pageSize}`;

      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    } else {
      console.log("fetching nfts for collection owned by address");
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}&pageKey=${nextPage}&pageSize=${pageSize}`;
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    }

    console.log(nfts);
    setIsLoading(false);
    if (nfts) {
      console.log("nfts:", nfts);
      setNFTs(nfts.ownedNfts);
      if (nfts.pageKey) {
        setNextPage(nfts.pageKey);
      }
    }
  }

  async function fetchNFTsForCollection(startToken = "", pageIndex = 0) {
    console.log("for collection");
    if (collection.length) {
      var requestOptions = {
        method: "GET",
      };
      const api_key = "lmsojVdyGh8B3152-q-bDPtiaC_Ce1rq";
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}&startToken=${startToken}&limit=${pageSize}`;
      const nfts = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      );
      if (nfts) {
        console.log("NFTs in collection:", nfts);
        setNFTs(nfts.nfts);
      }
      setStartToken(startToken + pageSize);
    }
  };

  return (
    <div className="bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-green-400 to-indigo-900 h-screen w-screen">
      <center><img src="https://sv1.img.in.th/eCzzX.png" alt="mosutk logo" style={{ width: '300px', height: '300px' }} /></center>
      <div className="bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-green-400 to-indigo-900 flex flex-col items-center justify-center py-8 gap-y-3">

        <div className="flex flex-col w-full justify-center items-center gap-y-2">

          <label><input onChange={(e) => { setFetchForCollection(e.target.checked) }} type={"checkbox"}></input><a className='text-zinc-50	'> Fetching for a collection </a></label>

          <input disabled={fetchForCollection} className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-grey-800 focus:outline-purple-300 disabled:outline-none disabled:bg-transparent disabled:text-opacity-0" onChange={(e) => { setWalletAddress(e.target.value) }} value={wallet} type={"text"} placeholder="Add Wallet Address!"></input>

          <input className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-grey-800 focus:outline-purple-300 disabled:bg-slate-50 disabled:text-grey-50" onChange={(e) => { setCollectionAddress(e.target.value) }} value={collection} type={"text"} placeholder="Add Collection Address!"></input>


          <button class={"shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white hover:font-bold py-2 px-4 rounded"} onClick={
            () => {
              if (fetchForCollection) {
                fetchNFTsForCollection();
              }
              else {
                fetchNFTs();
              }
            }
          }>Load NFTs !!</button>
          {(nextPage != "" || startToken > 1) && (
            <button
            
              className={
                "disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5 font-medium rounded"
              }
              onClick={() => {
                if (fetchForCollection) {
                  fetchNFTsForCollection();
                } else {
                  fetchNFTs();
                }
              }}
            >
              Next Page {">>>>"}
            </button>
          )}
          {isLoading && <p className="text-gray-400">Loading...</p>}
        </div>
        <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-3 justify-center' style={{ width: '1000px', }} >
          {NFTs.length &&
            NFTs.map((nft, i) => {
              return <NFTCard nft={nft} key={i}></NFTCard>;
            })}
        </div>

      </div>
    </div>
  )
}

export default Home