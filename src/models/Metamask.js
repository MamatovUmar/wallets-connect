
import detectEthereumProvider from '@metamask/detect-provider'

export default class Metamask{

    constructor() {
        this.provider = null
    }

    /**
     * Create Metamask Provider
     * @returns {Promise<null>} - provider
     */
    async init() {
        this.provider = await detectEthereumProvider()
        return this.provider
    }

    /**
     * Connecting to MetaMask
     * @returns {Promise<*>} - return user address
     */
    async connect() {
        const accounts = await this.provider.request({ method: 'eth_requestAccounts' });
        return accounts[0];
    }

    isConnected() {
        return this.provider ? this.provider.isConnected() : false
    }

}
