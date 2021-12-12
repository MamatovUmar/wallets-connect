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
    }

    async connect(walletName, rpc = null) {
        let walletAddress = null;
        let web3 = null;

        if(walletName === 'WalletConnect'){
            this.provider = this.walletConnect.init(rpc || data.rpc);
            walletAddress = await this.walletConnect.connect();
        } else if(walletName === 'Metamask') {
            this.provider = await this.metamask.init();
            walletAddress = await this.metamask.connect();
        }

        if(this.provider){
            web3 = new Web3(this.provider)
        }

        return {
            provider: this.provider,
            account: walletAddress,
            web3
        }
    }
}

export default new Web3Model();
