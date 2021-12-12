import WalletConnectProvider from '@walletconnect/web3-provider'

export default class WalletConnect {

    constructor() {
        this.provider = null
    }

    /**
     * Create WalletConnect Provider
     * @param rpc - The RPC URL mapping should indexed by chainId and it requires at least one value.
     * @returns {Promise<null>} - provider
     */
    init(rpc) {
        this.provider = new WalletConnectProvider({ rpc })
        return this.provider
    }

    /**
     * Enable session (triggers QR Code modal)
     * @returns {Promise<*>} - return user address
     */
    async connect(){
        const accounts = await this.provider.enable();
        return accounts[0]
    }

    isConnected() {
        return this.provider ? this.provider.isWalletConnect : false
    }
}
