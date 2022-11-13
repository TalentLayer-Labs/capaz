# Meet Capaz a ETHLisbon 2022 Hackerthon submission!

## ETH Lisbon: Capaz Modules

While attending ETH Lisbon, part of the TalentLayer team built Capaz: a decentralized escrow tool that has three sub-modules that each represent improvements on basic escrow contracts. 

Check out the [Capaz deck](https://app.pitch.com/app/presentation/84110ff5-e8d6-424f-b817-38984d495159/16356fee-892e-41b6-b8ad-c66e5417cd43). 

Check out the [Capaz Github repo](https://github.com/capaz-crypto).

### Escrow Yield

Right now, in all escrow payment systems, money sits in the contract, it’s just locked in there, not doing anything. By having this capital locked up, it’s stagnant and not generating benefit for either sender or recipient. In the traditional market, many large platforms that custody funds for users invest those funds dynamically to generate yield - but, they only ever do this for the benefit of the platform, not the users. 

The “Escrow Yield” module of Capaz lets users to benefit from optionally generating conservative yield off of money in escrow. This deploys the capital that would otherwise be stagnant. 

This will be added as an optional feature for TalentLayer escrow that can be configured by platforms and opted into by users. 

### Escrow Segregation

Today's crypto escrow contracts store user's funds together. This is a huge honey pot for hackers. If having centralized escrow paints a target on our smart contract, what if we decentralized the honey pot?

“Escrow Segregation” as a part of Capaz creates proxy contracts that hold users funds; one separate proxy for each job created. In addition to solving security threats, this also allows for better scalability (not relying on just one contract) and better upgradability (because you can have multiple versions of contracts active at the same time). 

This will serve as the Beta (improved) version of TalentLayer Escrow transitioning us from the mono-contract model to the proxy model. 

### Escrow Tokenization

Earners have to wait until escrow is released to access their funds. This is another capital inefficiency. If web 2 workers can take loans against future pay checks, why can't we do that with future crypto payments? 

The “Escrow Tokenization” module of Capaz lets users tokenize their job as an NFT. The NFT confers access to the money released from escrow (like an access pass). If the user sells the NFT on an open marketplace, the eventual buyer would be able to claim the funds when they are claimable from the escrow. 
