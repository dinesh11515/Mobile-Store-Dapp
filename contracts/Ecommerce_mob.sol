// SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

contract Ecommerce_mob{
    address payable public owner;
    uint id=0;
    constructor(){
        owner = payable(msg.sender);
    }
    
    struct user{
        string name;
        string email;
        string deliveryAddress;
        bool isCreated;
    }

    struct product{
        string productId;
        string productName;
        uint price;
        bool isActive;
    }

    struct orders{
        string productId;
        string orderStatus;
        uint purchaseId;
    }

    mapping (string => product) public products;
    mapping (address => user) public users;
    mapping (address => orders[]) public userOrders;
    mapping (uint => address) public orderBy;

    function createProduct(string memory _productId,string memory _productName,uint _price) public{
        require(msg.sender == owner);
        product memory pro = product(_productId,_productName,_price,true);
        products[_productId] = pro;
    }
    function withdraw() public{
        require(msg.sender==owner);
        owner.transfer(address(this).balance);
    }
    function createAccount(string memory _name,string memory _email,string memory _deliveryAddress) public {
        require(!users[msg.sender].isCreated);
        users[msg.sender].name = _name;
        users[msg.sender].email = _email;
        users[msg.sender].deliveryAddress = _deliveryAddress;
        users[msg.sender].isCreated = true;
    }

    function changeDetails(string memory _name,string memory _email,string memory _deliveryAddress) public {
        require(users[msg.sender].isCreated);
        users[msg.sender].name = _name;
        users[msg.sender].email = _email;
        users[msg.sender].deliveryAddress = _deliveryAddress;
        users[msg.sender].isCreated = true;
    }

    function get() public view returns(bool){
        return users[msg.sender].isCreated;
    }
    function buyProduct(uint price) public payable{
        // require(users[msg.sender].isCreated);
        require(msg.value == price);
        id++;
        orderBy[id]=msg.sender;
    } 
    function cancelOrder(uint _purchaseId) public{
        require (orderBy[_purchaseId]==msg.sender);
        orders[] storage temp = userOrders[msg.sender];
        uint len = temp.length;
        for(uint i=0;i<len;i++){
            if(temp[i].purchaseId==_purchaseId){
                delete temp[i];
            }
        }
        userOrders[msg.sender]=temp;
    }

}