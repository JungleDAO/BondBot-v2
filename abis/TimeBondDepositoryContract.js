export default [
        {
            "type": "constructor",
            "stateMutability": "nonpayable",
            "inputs": [
                {
                    "type": "address",
                    "name": "_Time",
                    "internalType": "address"
                },
                {
                    "type": "address",
                    "name": "_principle",
                    "internalType": "address"
                },
                {
                    "type": "address",
                    "name": "_treasury",
                    "internalType": "address"
                },
                {
                    "type": "address",
                    "name": "_DAO",
                    "internalType": "address"
                },
                {
                    "type": "address",
                    "name": "_bondCalculator",
                    "internalType": "address"
                }
            ]
        },
        {
            "type": "event",
            "name": "BondCreated",
            "inputs": [
                {
                    "type": "uint256",
                    "name": "deposit",
                    "internalType": "uint256",
                    "indexed": false
                },
                {
                    "type": "uint256",
                    "name": "payout",
                    "internalType": "uint256",
                    "indexed": true
                },
                {
                    "type": "uint256",
                    "name": "expires",
                    "internalType": "uint256",
                    "indexed": true
                },
                {
                    "type": "uint256",
                    "name": "priceInUSD",
                    "internalType": "uint256",
                    "indexed": true
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "BondPriceChanged",
            "inputs": [
                {
                    "type": "uint256",
                    "name": "priceInUSD",
                    "internalType": "uint256",
                    "indexed": true
                },
                {
                    "type": "uint256",
                    "name": "internalPrice",
                    "internalType": "uint256",
                    "indexed": true
                },
                {
                    "type": "uint256",
                    "name": "debtRatio",
                    "internalType": "uint256",
                    "indexed": true
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "BondRedeemed",
            "inputs": [
                {
                    "type": "address",
                    "name": "recipient",
                    "internalType": "address",
                    "indexed": true
                },
                {
                    "type": "uint256",
                    "name": "payout",
                    "internalType": "uint256",
                    "indexed": false
                },
                {
                    "type": "uint256",
                    "name": "remaining",
                    "internalType": "uint256",
                    "indexed": false
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "ControlVariableAdjustment",
            "inputs": [
                {
                    "type": "uint256",
                    "name": "initialBCV",
                    "internalType": "uint256",
                    "indexed": false
                },
                {
                    "type": "uint256",
                    "name": "newBCV",
                    "internalType": "uint256",
                    "indexed": false
                },
                {
                    "type": "uint256",
                    "name": "adjustment",
                    "internalType": "uint256",
                    "indexed": false
                },
                {
                    "type": "bool",
                    "name": "addition",
                    "internalType": "bool",
                    "indexed": false
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "OwnershipPulled",
            "inputs": [
                {
                    "type": "address",
                    "name": "previousOwner",
                    "internalType": "address",
                    "indexed": true
                },
                {
                    "type": "address",
                    "name": "newOwner",
                    "internalType": "address",
                    "indexed": true
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "OwnershipPushed",
            "inputs": [
                {
                    "type": "address",
                    "name": "previousOwner",
                    "internalType": "address",
                    "indexed": true
                },
                {
                    "type": "address",
                    "name": "newOwner",
                    "internalType": "address",
                    "indexed": true
                }
            ],
            "anonymous": false
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "address",
                    "name": "",
                    "internalType": "address"
                }
            ],
            "name": "DAO",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "address",
                    "name": "",
                    "internalType": "address"
                }
            ],
            "name": "Time",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "bool",
                    "name": "add",
                    "internalType": "bool"
                },
                {
                    "type": "uint256",
                    "name": "rate",
                    "internalType": "uint256"
                },
                {
                    "type": "uint256",
                    "name": "target",
                    "internalType": "uint256"
                },
                {
                    "type": "uint32",
                    "name": "buffer",
                    "internalType": "uint32"
                },
                {
                    "type": "uint32",
                    "name": "lastTime",
                    "internalType": "uint32"
                }
            ],
            "name": "adjustment",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "address",
                    "name": "",
                    "internalType": "address"
                }
            ],
            "name": "bondCalculator",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint256",
                    "name": "payout",
                    "internalType": "uint256"
                },
                {
                    "type": "uint256",
                    "name": "pricePaid",
                    "internalType": "uint256"
                },
                {
                    "type": "uint32",
                    "name": "lastTime",
                    "internalType": "uint32"
                },
                {
                    "type": "uint32",
                    "name": "vesting",
                    "internalType": "uint32"
                }
            ],
            "name": "bondInfo",
            "inputs": [
                {
                    "type": "address",
                    "name": "",
                    "internalType": "address"
                }
            ]
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint256",
                    "name": "price_",
                    "internalType": "uint256"
                }
            ],
            "name": "bondPrice",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint256",
                    "name": "price_",
                    "internalType": "uint256"
                }
            ],
            "name": "bondPriceInUSD",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint256",
                    "name": "",
                    "internalType": "uint256"
                }
            ],
            "name": "currentDebt",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint256",
                    "name": "decay_",
                    "internalType": "uint256"
                }
            ],
            "name": "debtDecay",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint256",
                    "name": "debtRatio_",
                    "internalType": "uint256"
                }
            ],
            "name": "debtRatio",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "outputs": [
                {
                    "type": "uint256",
                    "name": "",
                    "internalType": "uint256"
                }
            ],
            "name": "deposit",
            "inputs": [
                {
                    "type": "uint256",
                    "name": "_amount",
                    "internalType": "uint256"
                },
                {
                    "type": "uint256",
                    "name": "_maxPrice",
                    "internalType": "uint256"
                },
                {
                    "type": "address",
                    "name": "_depositor",
                    "internalType": "address"
                }
            ]
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "outputs": [],
            "name": "initializeBondTerms",
            "inputs": [
                {
                    "type": "uint256",
                    "name": "_controlVariable",
                    "internalType": "uint256"
                },
                {
                    "type": "uint256",
                    "name": "_minimumPrice",
                    "internalType": "uint256"
                },
                {
                    "type": "uint256",
                    "name": "_maxPayout",
                    "internalType": "uint256"
                },
                {
                    "type": "uint256",
                    "name": "_fee",
                    "internalType": "uint256"
                },
                {
                    "type": "uint256",
                    "name": "_maxDebt",
                    "internalType": "uint256"
                },
                {
                    "type": "uint256",
                    "name": "_initialDebt",
                    "internalType": "uint256"
                },
                {
                    "type": "uint32",
                    "name": "_vestingTerm",
                    "internalType": "uint32"
                }
            ]
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "bool",
                    "name": "",
                    "internalType": "bool"
                }
            ],
            "name": "isLiquidityBond",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint32",
                    "name": "",
                    "internalType": "uint32"
                }
            ],
            "name": "lastDecay",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint256",
                    "name": "",
                    "internalType": "uint256"
                }
            ],
            "name": "maxPayout",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint256",
                    "name": "",
                    "internalType": "uint256"
                }
            ],
            "name": "payoutFor",
            "inputs": [
                {
                    "type": "uint256",
                    "name": "_value",
                    "internalType": "uint256"
                }
            ]
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint256",
                    "name": "pendingPayout_",
                    "internalType": "uint256"
                }
            ],
            "name": "pendingPayoutFor",
            "inputs": [
                {
                    "type": "address",
                    "name": "_depositor",
                    "internalType": "address"
                }
            ]
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint256",
                    "name": "percentVested_",
                    "internalType": "uint256"
                }
            ],
            "name": "percentVestedFor",
            "inputs": [
                {
                    "type": "address",
                    "name": "_depositor",
                    "internalType": "address"
                }
            ]
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "address",
                    "name": "",
                    "internalType": "address"
                }
            ],
            "name": "policy",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "address",
                    "name": "",
                    "internalType": "address"
                }
            ],
            "name": "principle",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "outputs": [],
            "name": "pullManagement",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "outputs": [],
            "name": "pushManagement",
            "inputs": [
                {
                    "type": "address",
                    "name": "newOwner_",
                    "internalType": "address"
                }
            ]
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "outputs": [
                {
                    "type": "bool",
                    "name": "",
                    "internalType": "bool"
                }
            ],
            "name": "recoverLostToken",
            "inputs": [
                {
                    "type": "address",
                    "name": "_token",
                    "internalType": "address"
                }
            ]
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "outputs": [
                {
                    "type": "uint256",
                    "name": "",
                    "internalType": "uint256"
                }
            ],
            "name": "redeem",
            "inputs": [
                {
                    "type": "address",
                    "name": "_recipient",
                    "internalType": "address"
                },
                {
                    "type": "bool",
                    "name": "_stake",
                    "internalType": "bool"
                }
            ]
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "outputs": [],
            "name": "renounceManagement",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "outputs": [],
            "name": "setAdjustment",
            "inputs": [
                {
                    "type": "bool",
                    "name": "_addition",
                    "internalType": "bool"
                },
                {
                    "type": "uint256",
                    "name": "_increment",
                    "internalType": "uint256"
                },
                {
                    "type": "uint256",
                    "name": "_target",
                    "internalType": "uint256"
                },
                {
                    "type": "uint32",
                    "name": "_buffer",
                    "internalType": "uint32"
                }
            ]
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "outputs": [],
            "name": "setBondTerms",
            "inputs": [
                {
                    "type": "uint8",
                    "name": "_parameter",
                    "internalType": "enum TimeBondDepository.PARAMETER"
                },
                {
                    "type": "uint256",
                    "name": "_input",
                    "internalType": "uint256"
                }
            ]
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "outputs": [],
            "name": "setStaking",
            "inputs": [
                {
                    "type": "address",
                    "name": "_staking",
                    "internalType": "address"
                },
                {
                    "type": "bool",
                    "name": "_helper",
                    "internalType": "bool"
                }
            ]
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "address",
                    "name": "",
                    "internalType": "address"
                }
            ],
            "name": "staking",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "address",
                    "name": "",
                    "internalType": "address"
                }
            ],
            "name": "stakingHelper",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint256",
                    "name": "",
                    "internalType": "uint256"
                }
            ],
            "name": "standardizedDebtRatio",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint256",
                    "name": "controlVariable",
                    "internalType": "uint256"
                },
                {
                    "type": "uint256",
                    "name": "minimumPrice",
                    "internalType": "uint256"
                },
                {
                    "type": "uint256",
                    "name": "maxPayout",
                    "internalType": "uint256"
                },
                {
                    "type": "uint256",
                    "name": "fee",
                    "internalType": "uint256"
                },
                {
                    "type": "uint256",
                    "name": "maxDebt",
                    "internalType": "uint256"
                },
                {
                    "type": "uint32",
                    "name": "vestingTerm",
                    "internalType": "uint32"
                }
            ],
            "name": "terms",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint256",
                    "name": "",
                    "internalType": "uint256"
                }
            ],
            "name": "totalDebt",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "address",
                    "name": "",
                    "internalType": "address"
                }
            ],
            "name": "treasury",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "bool",
                    "name": "",
                    "internalType": "bool"
                }
            ],
            "name": "useHelper",
            "inputs": []
        }
    ]