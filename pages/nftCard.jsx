import Swal from 'sweetalert2'
import { ReactPaginate } from "react-paginate";
import { useState } from "react";
export const NFTCard = ({nft})=>{
    const [isHovering, setIsHovering] = useState(false);

 
    function Description(e) {
      e.preventDefault();
      Swal.fire({
          title:nft.title,
          text: nft.description,
          imageUrl: nft.media[0].gateway,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
      })
      //console.log('You clicked submit.'+nft.title);
    }
    function tokenId(e) {
      e.preventDefault();
      Swal.fire({
          title:'tokenId',
          text: nft.id.tokenId,
          imageUrl: nft.media[0].gateway,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
      })
      //console.log('You clicked submit.'+nft.title);
    }
    function contract(e) {
      e.preventDefault();
      Swal.fire({
          title:'contract',
          text: nft.contract.address,
          imageUrl: nft.media[0].gateway,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
      })
      //console.log('You clicked submit.'+nft.title);
    }
    return(
        <div className="w-1/3 flex flex-col transition duration-500 hover:scale-110 border-2 border-black border-r-3">
            <div className="rounded-md">
                <img className="object-cover h-128 w-full rounded-t-md" src={nft.media[0].gateway}/>
            </div>
            <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
                <div className="mr-3 ">
                <h2 className="text-xl text-black">
                   <b> Name: </b>{nft.title}
                </h2>
                      <center>
                      <button className={"cursor-pointer shadow bg-green-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white hover:font-bold py-2 px-4 rounded"} onClick={Description}>Description</button>
                      <button className={"cursor-pointer shadow bg-yellow-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white hover:font-bold py-2 px-4 rounded"} onClick={tokenId}>Token ID</button>
                      <button className={"cursor-pointer shadow bg-orange-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white hover:font-bold py-2 px-4 rounded"}onClick={contract}>contract</button>
                      </center>
                </div>
            </div>
        </div>
    );
}