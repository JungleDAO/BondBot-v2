export default [
        {
            "type": "constructor",
            "stateMutability": "nonpayable",
            "inputs": []
        },
        {
            "type": "event",
            "name": "Approval",
            "inputs": [
                {
                    "type": "address",
                    "name": "owner",
                    "internalType": "address",
                    "indexed": true
                },
                {
                    "type": "address",
                    "name": "spender",
                    "internalType": "address",
                    "indexed": true
                },
                {
                    "type": "uint256",
                    "name": "value",
                    "internalType": "uint256",
                    "indexed": false
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "Burn",
            "inputs": [
                {
                    "type": "address",
                    "name": "sender",
                    "internalType": "address",
                    "indexed": true
                },
                {
                    "type": "uint256",
                    "name": "amount0",
                    "internalType": "uint256",
                    "indexed": false
                },
                {
                    "type": "uint256",
                    "name": "amount1",
                    "internalType": "uint256",
                    "indexed": false
                },
                {
                    "type": "address",
                    "name": "to",
                    "internalType": "address",
                    "indexed": true
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "Mint",
            "inputs": [
                {
                    "type": "address",
                    "name": "sender",
                    "internalType": "address",
                    "indexed": true
                },
                {
                    "type": "uint256",
                    "name": "amount0",
                    "internalType": "uint256",
                    "indexed": false
                },
                {
                    "type": "uint256",
                    "name": "amount1",
                    "internalType": "uint256",
                    "indexed": false
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "Swap",
            "inputs": [
                {
                    "type": "address",
                    "name": "sender",
                    "internalType": "address",
                    "indexed": true
                },
                {
                    "type": "uint256",
                    "name": "amount0In",
                    "internalType": "uint256",
                    "indexed": false
                },
                {
                    "type": "uint256",
                    "name": "amount1In",
                    "internalType": "uint256",
                    "indexed": false
                },
                {
                    "type": "uint256",
                    "name": "amount0Out",
                    "internalType": "uint256",
                    "indexed": false
                },
                {
                    "type": "uint256",
                    "name": "amount1Out",
                    "internalType": "uint256",
                    "indexed": false
                },
                {
                    "type": "address",
                    "name": "to",
                    "internalType": "address",
                    "indexed": true
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "Sync",
            "inputs": [
                {
                    "type": "uint112",
                    "name": "reserve0",
                    "internalType": "uint112",
                    "indexed": false
                },
                {
                    "type": "uint112",
                    "name": "reserve1",
                    "internalType": "uint112",
                    "indexed": false
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "Transfer",
            "inputs": [
                {
                    "type": "address",
                    "name": "from",
                    "internalType": "address",
                    "indexed": true
                },
                {
                    "type": "address",
                    "name": "to",
                    "internalType": "address",
                    "indexed": true
                },
                {
                    "type": "uint256",
                    "name": "value",
                    "internalType": "uint256",
                    "indexed": false
                }
            ],
            "anonymous": false
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "bytes32",
                    "name": "",
                    "internalType": "bytes32"
                }
            ],
            "name": "DOMAIN_SEPARATOR",
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
            "name": "MINIMUM_LIQUIDITY",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "bytes32",
                    "name": "",
                    "internalType": "bytes32"
                }
            ],
            "name": "PERMIT_TYPEHASH",
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
            "name": "allowance",
            "inputs": [
                {
                    "type": "address",
                    "name": "",
                    "internalType": "address"
                },
                {
                    "type": "address",
                    "name": "",
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
            "name": "approve",
            "inputs": [
                {
                    "type": "address",
                    "name": "spender",
                    "internalType": "address"
                },
                {
                    "type": "uint256",
                    "name": "value",
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
                    "name": "",
                    "internalType": "uint256"
                }
            ],
            "name": "balanceOf",
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
            "stateMutability": "nonpayable",
            "outputs": [
                {
                    "type": "uint256",
                    "name": "amount0",
                    "internalType": "uint256"
                },
                {
                    "type": "uint256",
                    "name": "amount1",
                    "internalType": "uint256"
                }
            ],
            "name": "burn",
            "inputs": [
                {
                    "type": "address",
                    "name": "to",
                    "internalType": "address"
                }
            ]
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint8",
                    "name": "",
                    "internalType": "uint8"
                }
            ],
            "name": "decimals",
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
            "name": "factory",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint112",
                    "name": "_reserve0",
                    "internalType": "uint112"
                },
                {
                    "type": "uint112",
                    "name": "_reserve1",
                    "internalType": "uint112"
                },
                {
                    "type": "uint32",
                    "name": "_blockTimestampLast",
                    "internalType": "uint32"
                }
            ],
            "name": "getReserves",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "outputs": [],
            "name": "initialize",
            "inputs": [
                {
                    "type": "address",
                    "name": "_token0",
                    "internalType": "address"
                },
                {
                    "type": "address",
                    "name": "_token1",
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
                    "name": "",
                    "internalType": "uint256"
                }
            ],
            "name": "kLast",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "outputs": [
                {
                    "type": "uint256",
                    "name": "liquidity",
                    "internalType": "uint256"
                }
            ],
            "name": "mint",
            "inputs": [
                {
                    "type": "address",
                    "name": "to",
                    "internalType": "address"
                }
            ]
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "string",
                    "name": "",
                    "internalType": "string"
                }
            ],
            "name": "name",
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
            "name": "nonces",
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
            "stateMutability": "nonpayable",
            "outputs": [],
            "name": "permit",
            "inputs": [
                {
                    "type": "address",
                    "name": "owner",
                    "internalType": "address"
                },
                {
                    "type": "address",
                    "name": "spender",
                    "internalType": "address"
                },
                {
                    "type": "uint256",
                    "name": "value",
                    "internalType": "uint256"
                },
                {
                    "type": "uint256",
                    "name": "deadline",
                    "internalType": "uint256"
                },
                {
                    "type": "uint8",
                    "name": "v",
                    "internalType": "uint8"
                },
                {
                    "type": "bytes32",
                    "name": "r",
                    "internalType": "bytes32"
                },
                {
                    "type": "bytes32",
                    "name": "s",
                    "internalType": "bytes32"
                }
            ]
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
            "name": "price0CumulativeLast",
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
            "name": "price1CumulativeLast",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "outputs": [],
            "name": "skim",
            "inputs": [
                {
                    "type": "address",
                    "name": "to",
                    "internalType": "address"
                }
            ]
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "outputs": [],
            "name": "swap",
            "inputs": [
                {
                    "type": "uint256",
                    "name": "amount0Out",
                    "internalType": "uint256"
                },
                {
                    "type": "uint256",
                    "name": "amount1Out",
                    "internalType": "uint256"
                },
                {
                    "type": "address",
                    "name": "to",
                    "internalType": "address"
                },
                {
                    "type": "bytes",
                    "name": "data",
                    "internalType": "bytes"
                }
            ]
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "string",
                    "name": "",
                    "internalType": "string"
                }
            ],
            "name": "symbol",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "outputs": [],
            "name": "sync",
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
            "name": "token0",
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
            "name": "token1",
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
            "name": "totalSupply",
            "inputs": []
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
            "name": "transfer",
            "inputs": [
                {
                    "type": "address",
                    "name": "to",
                    "internalType": "address"
                },
                {
                    "type": "uint256",
                    "name": "value",
                    "internalType": "uint256"
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
            "name": "transferFrom",
            "inputs": [
                {
                    "type": "address",
                    "name": "from",
                    "internalType": "address"
                },
                {
                    "type": "address",
                    "name": "to",
                    "internalType": "address"
                },
                {
                    "type": "uint256",
                    "name": "value",
                    "internalType": "uint256"
                }
            ]
        }
    ]