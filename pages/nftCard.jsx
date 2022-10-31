import Swal from 'sweetalert2'

export const NFTCard = ({ nft }) => {
   
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
    return (
        <div className="w-1/4 flex flex-col ">
        <div className="rounded-md">
            <img className="object-cover h-128 w-full rounded-t-md" src={nft.media[0].gateway} ></img>
        </div>
        <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
        <button className={" text-white bg-blue-400 "} onClick={Description}>Description</button>
        <button className={" text-white bg-red-400 "} onClick={tokenId}>Token ID</button>
        <button className={" text-white bg-green-400 "} onClick={contract}>contract</button>
        </div>

    </div>
    )
}