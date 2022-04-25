import React from "react"
import Nav  from "./components/Nav"
import data from "./data"
import Container from "./components/Container"
import Web3 from "web3";
import eccomerceContract from "./contracts/Ecommerce_mob.json"
import Userdetails from "./components/Userdetails";
import Details from "./components/Details";
export default function App(){
  const [currAccount,setCurrAccount] = React.useState(null)
  const [instance,setInstance] = React.useState();
  const owner = "0xE3B30A7533173fBE769756927563401Eef61e73A";
  const [isCreated,setIsCreated] = React.useState(true);
  const [isPlaced,setIsPlaced] = React.useState(false);
  const [name,setName] = React.useState("");
  const connect = async () => {
    try{
      const web3 = await new Web3(window.ethereum)
      await window.ethereum.enable()
      const accounts = await web3.eth.getAccounts()
      const id = await web3.eth.net.getId()
      const deployedNetwork = eccomerceContract.networks[id];
      setInstance(new web3.eth.Contract(eccomerceContract.abi,deployedNetwork && deployedNetwork.address))
    
      setCurrAccount(accounts[0])
    }
    catch(err){
        alert(err)
    }
  }
  if(currAccount!=null){
      instance.methods.users(currAccount).call().then(data =>{
        if(!data.isCreated){
          setIsCreated(false)
        }
        else{
          setName(data.name)
        }
      })
  }
  
  
  const [msg,setMsg] = React.useState("");
  const buy = async () =>{
    if(currAccount!=null){
    await instance.methods.buyProduct
    (100).send({from:currAccount,value:100}).then(data => {
      if(data.status){
        setIsPlaced(true);
      }
      else{
        alert("Not Placed")
      }
    })
  }
  else{
    alert("Connect Wallet")
  }
  }
  function setPlaced(){
    console.log("hii")
    setIsPlaced(false)
  }
  const companys = data.map(ele =>{
      return (
        <Container data = {ele} buy = {buy} isPlaced={isPlaced} setPlaced={setPlaced}/>
      )
  })
  console.log(currAccount)
  const [details,setDetails] = React.useState({
    name:"",
    email : "",
    address:""
  })

  const registerUser = async () => {
    await instance.methods.createAccount(details.name,details.email,details.address).send({from:currAccount}).then(data => {
      if(data.status){
        setIsCreated(true)
      }
    })
  }
  
  return (
    <div>
    {
      !isCreated ?
      <div>
        <Userdetails setDetails={setDetails} registerUser={registerUser}/>
      </div>
      :
      <div>
        <Nav handleClick = {connect} account={currAccount} isOwner={currAccount==owner ? true:false} name={name}/>
        {companys}
      </div>
    }
    </div>
  )
}