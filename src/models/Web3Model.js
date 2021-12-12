import Metamask from "./Metamask";
import WalletConnect from "./WalletConnect";
import Web3 from 'web3';
import data from "../data.json";

class Web3Model {

    constructor() {
        this.metamask = new Metamask();
        this.walletConnect = new WalletConnect();
        this.provider = null;
        this.wallets = data.wallets;
        this.web3 = null;
        this.walletAddress = null;
        this.request = null;
    }

    async connect(walletName, rpc = null) {
        if(walletName === 'WalletConnect'){
            this.provider = this.walletConnect.init(rpc || data.rpc);
            this.walletAddress = await this.walletConnect.connect();
        } else if(walletName === 'Metamask') {
            this.provider = await this.metamask.init();
            this.walletAddress = await this.metamask.connect();
        }

        if(this.provider){
            this.web3 = new Web3(this.provider)
            this.request = this.provider.request
        }

        return this.walletAddress
    }
}

export default new Web3Model();
