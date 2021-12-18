# wallets-connect

Wallets:
 - Metamask
 - WalletConnect

## Setup
```bash
yarn add wallets-connect
```

### in plugin eth.js

```javascript
import Web3Model from "wallets-connect";

export default {
    async install(Vue){
        Vue.prototype.$eth = Web3Model;
    }
}
```

### in main.js
```javascript
...

import WalletsConnect from './plugins/eth';
Vue.use(WalletsConnect);

...

```

## Usage

### After install in components will be available global object $eth

```
$eth.wallets    -  List of available wallets
$eth.connect()  -  Method for connect wallet. Return wallet address
$eth.request()  -  Provider methods
$eth.provider   -  Provider object
```

### Connection
```vue
<!--in template-->
<div
    v-for="(wallet, i) of $eth.wallets" :key="i"
    @click="connect(wallet)"
>
  <img :src="wallet.icon" :alt="wallet.name">
  {{ wallet.name }}
</div>
```

```js
/**
 connect method takes 2 arguments:
   - wallet name (Required)
   - rpc (Optional. Only for WalletConnect)
 */
async connect(wallet){
    const walletAddress = await this.$eth.connect(wallet.name)
    console.log(walletAddress, this.$eth)
}
```

### RPC URL Mapping
The RPC URL mapping should indexed by chainId and it requires at least one value.
Default value:
```json
"rpc": {
    "1": "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    "3": "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    "4": "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    "5": "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    "42": "https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    "56": "https://bsc-dataseed.binance.org/",
    "97": "https://data-seed-prebsc-1-s1.binance.org:8545/"
}
```

### Request methods
```js
interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

// Send JSON RPC requests
const result = await this.$eth.request(payload: RequestArguments);
```


### Send transaction

```js
async sendTransaction(){
    const tx = {
        from: "0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3", // Required
        to: "0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359", // Required (for non contract deployments)
        data: "0x", // Required
        gasPrice: "0x02540be400", // Optional
        gasLimit: "0x9c40", // Optional
        value: "0x00", // Optional
        nonce: "0x0114", // Optional
    };
    
    const hash = await this.$eth.request({
        method: 'eth_sendTransaction',
        params: [tx],
    });
}
```

### Events 
```js
// Subscribe to accounts change
$eth.provider.on("accountsChanged", (accounts: string[]) => {
  console.log(accounts);
});

// Subscribe to chainId change
$eth.provider.on("chainChanged", (chainId: number) => {
  console.log(chainId);
});

// Subscribe to session connection
$eth.provider.on("connect", () => {
  console.log("connect");
});

// Subscribe to session disconnection
$eth.provider.on("disconnect", (code: number, reason: string) => {
  console.log(code, reason);
});
```
