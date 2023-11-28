import { ethers } from 'ethers';
import logo from '../assets/logo.png'
import config from '../config.json';

const Navigation = ({ account, setAccount ,chainId }) => {

    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account);
    }

    //fetch current account and balance from metamask when changed 
     window.ethereum.on('accountsChanged' , () =>{
     connectHandler()
  }) 

      window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })
     

     const networkHandler = async (e) =>{
    try{await window.ethereum.request({
      method : 'wallet_switchEthereumChain',
      params : [{chainId : e.target.value}] 
    })
      
      }catch (error) {
      console.error("An error occurred:", error);
    }
  }

 



    return (
        <nav>
            <div className='nav__brand'>
            <img src={logo} className = "logo" alt="logo"></img>
                <h1>Elephant minter </h1>
                 <h2>AI NFT Generator</h2>
                
         </div>


            {account ? (
                <button
                    type="button"
                    className='nav__connect'
                >
                    {account.slice(0, 6) + '...' + account.slice(38, 42)}
                </button>
            ) : (
                <button
                    type="button"
                    className='nav__connect'
                    onClick={connectHandler}
                >
                    Connect
                </button>
            )}
            {chainId && (
               <select name ="networks" id ="networks" value= {config[chainId] ? `0x${chainId.toString(16)}` : `0`} onChange={networkHandler}> 
               <option value= "0" disabled > Select Network </option>
               <option value= "0x7A69" > Localhost</option>
               <option value="0xaa36a7">Sepolia</option>
        </select>
    )}
        </nav>
    );
}

export default Navigation;
