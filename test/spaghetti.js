const SpaghettiCoin = artifacts.require('./SpaghettiCoin.sol')
const SpaghettiSale = artifacts.require('./SpaghettiSale.sol')

contract('SpaghettiCoin', function(accounts) {

    // 1 eth => 5 token
    // 1 token costs 0.2 eth

    const totalTokens = 100*10**18                                  // 100 of totalTokens
    const rate        = 5                                           // Multiplier 1 ether gives you back 5 token
    const amountToBuy = web3.toWei(1, 'ether')                      // Buy 1 ether so expecting 5 token
    const wallet      = accounts[0]                                 // Where funds and token are stored
    const purchaser   = accounts[1]                                 // Purchaser wallet
    const purchaser2  = accounts[2]                                 // Another purchaser wallet
    const openingTime = web3.eth.getBlock('latest').timestamp       // Starts immediately
    const closingTime = openingTime + 86400 * 20                    // Ends after 20 days

    console.log(`\nWallet: ${wallet}\nPurchaser: ${purchaser}\nPurchaser2: ${purchaser2}`)

    const expectEvent = (res, eventName) => {
        const ev = _.find(res.logs, {event: eventName})
        expect(ev).to.not.be.undefined
        return ev
    }

    beforeEach(async() => {
        // Deploy of the Token Contract
        coin = await SpaghettiCoin.new(totalTokens, {from: wallet})
        // Deploy of the Sale Contract
        sale = await SpaghettiSale.new(
            coin.address,
            wallet,
            openingTime,
            closingTime,
            rate,
            totalTokens,
            {from: wallet}
        )
        // Allowing the Sale contract to spend the Wallet tokens
        approveWallet = await coin.approve(
            sale.address, 
            totalTokens,
            {from: wallet}
        )
    })

    describe('Coin properties stuff: ', async () => {
        it('should have SPAGHETTI COIN as name', async () => {
            const name = await coin.name()
            expect(name).to.equal('SPAGHETTI COIN');
        })
        it('should have totalTokens totalSupply', async () => {
            const totalSupply_ = await coin.totalSupply()
            expect(totalSupply_.toString(10)).to.deep.equal(totalTokens.toString(10));
        })
        it('should have totalSupply as Wallet balances', async () => {
            const walletBalances = await coin.balanceOf(wallet)
            expect(walletBalances.toString(10)).to.deep.equal(totalTokens.toString(10));
        })
    })
    
    describe('Sale properties stuff: ', async () => {
        it('should have Wallet address as wallet', async () => {
            const walletSetted = await sale.wallet()
            expect(walletSetted).to.deep.equal(wallet);
        })
        it('should have the coin address as token setted', async () => {
            const tokenSetted = await sale.token()
            expect(tokenSetted).to.deep.equal(coin.address);
        })
        it('should have totalTokens setted cool', async () => {
            const totalT = await sale.totalTokens()
            expect(totalT.toString(10)).to.deep.equal(totalTokens.toString(10));
        })
        it('should have remainingTokens setted cool', async () => {
            const remainingTokens = await sale.remainingTokens()
            expect(remainingTokens.toString(10)).to.deep.equal(totalTokens.toString(10));
        })
        it('should emit an Approval event', async () => {
            const ev = expectEvent(approveWallet, 'Approval')
            expect(ev.args.owner).to.equal(wallet)
            expect(ev.args.spender).to.equal(sale.address)
            expect(ev.args.value.toString(10)).to.equal(totalTokens.toString(10))
        })
        it('should see sale contract allowed to move all tokens', async () => {
            const allowance = await coin.allowance(wallet, sale.address)
            expect(allowance.toString(10)).to.deep.equal(totalTokens.toString(10));
        })
        it('should see wallet token balances equal to total tokens', async () => {
            const balanceOf = await coin.balanceOf(wallet)
            expect(balanceOf.toString(10)).to.deep.equal(totalTokens.toString(10));
        })
        it(`should purchase ${web3.fromWei(amountToBuy, 'ether')} ETH 
                and increase purchaser tokens to ${web3.fromWei(amountToBuy, 'ether')*rate}`,
                async () => {
                    const purchase = await sale.sendTransaction({from: purchaser, value: amountToBuy})
                    const balanceOf = await coin.balanceOf(purchaser)
                    expect(web3.fromWei(amountToBuy, 'ether')*rate).to.equal(parseInt(web3.fromWei(balanceOf.toString(10), 'ether')));

            }
        )
    })
})