// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/** 
* ERC721Sample
*/
contract Erc721_sample is ERC721,ReentrancyGuard{
    using Counters for Counters.Counter;
    using Strings for uint256;
    // event IssuedMemberToken(address indexed sender, uint256 id);
    // event BurnedMemberToken(address indexed sender, uint256 id);

    address public owner;
    uint256 public priceWei;
    uint256 public salesAmount;
    bool public onSale;
    string public baseURI;

    Counters.Counter private _tokenIdTracker;

    /** 
    * constructor
    */
    constructor(string memory name,string memory symbol,uint256 _priceWei, string memory _baseURI) ERC721(name,symbol) {
        owner = msg.sender;
        priceWei = _priceWei;
        onSale = false;
        baseURI = _baseURI;
    }

    modifier onlyOwner(){
        require(owner == msg.sender);
        _;
    }

    /** 
    * トークンを販売する
    */
    function buy() public payable {
        require(onSale,"now not on sale.");
        require(msg.value==priceWei,"invalid transfering value.");
        _safeMint(msg.sender,_tokenIdTracker.current());
        _tokenIdTracker.increment();
        salesAmount += msg.value;
    }

    /** 
    * トークンセールの開始・終了を制御する
    */
    function controlTokenSale(bool _onSale) public onlyOwner {
        onSale = _onSale;
    }

    /**
    * tokenURIを返す
    */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString())) : "";
    }

    /** 
    * 収益を送信する
    */
    function withdraw() public onlyOwner {
        payable(owner).transfer(salesAmount);
        salesAmount = 0;
    }

}

