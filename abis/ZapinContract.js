export default [
    {
        "type": "constructor",
        "stateMutability": "nonpayable",
        "inputs": []
    }, {
        "type": "event",
        "name": "OwnershipTransferred",
        "inputs": [{
            "type": "address",
            "name": "previousOwner",
            "internalType": "address",
            "indexed": true
        }, {
            "type": "address",
            "name": "newOwner",
            "internalType": "address",
            "indexed": true
        }],
        "anonymous": false
    }, {
        "type": "event",
        "name": "zapIn",
        "inputs": [{
            "type": "address",
            "name": "sender",
            "internalType": "address",
            "indexed": false
        }, {
            "type": "address",
            "name": "pool",
            "internalType": "address",
            "indexed": false
        }, {
            "type": "uint256",
            "name": "tokensRec",
            "internalType": "uint256",
            "indexed": false
        }],
        "anonymous": false
    }, {
        "type": "function",
        "stateMutability": "payable",
        "outputs": [{
            "type": "uint256",
            "name": "",
            "internalType": "uint256"
        }],
        "name": "ZapIn",
        "inputs": [{
            "type": "address",
            "name": "_FromTokenContractAddress",
            "internalType": "address"
        }, {
            "type": "address",
            "name": "_bondDepository",
            "internalType": "contract ITimeBondDepository"
        }, {
            "type": "uint256",
            "name": "_amount",
            "internalType": "uint256"
        }, {
            "type": "uint256",
            "name": "_minReturnTokens",
            "internalType": "uint256"
        }, {
            "type": "address",
            "name": "_swapTarget",
            "internalType": "address"
        }, {
            "type": "bytes",
            "name": "swapData",
            "internalType": "bytes"
        }, {
            "type": "uint256",
            "name": "_bondMaxPrice",
            "internalType": "uint256"
        }, {
            "type": "address",
            "name": "_to",
            "internalType": "address"
        }]
    }, {
        "type": "function",
        "stateMutability": "payable",
        "outputs": [{
            "type": "uint256",
            "name": "",
            "internalType": "uint256"
        }],
        "name": "ZapInLp",
        "inputs": [{
            "type": "address",
            "name": "_FromTokenContractAddress",
            "internalType": "address"
        }, {
            "type": "address",
            "name": "_bondDepository",
            "internalType": "contract ITimeBondDepository"
        }, {
            "type": "uint256",
            "name": "_amount",
            "internalType": "uint256"
        }, {
            "type": "uint256",
            "name": "_minPoolTokens",
            "internalType": "uint256"
        }, {
            "type": "address",
            "name": "_swapTarget",
            "internalType": "address"
        }, {
            "type": "bytes",
            "name": "swapData",
            "internalType": "bytes"
        }, {
            "type": "bool",
            "name": "transferResidual",
            "internalType": "bool"
        }, {
            "type": "uint256",
            "name": "_bondMaxPrice",
            "internalType": "uint256"
        }, {
            "type": "address",
            "name": "_to",
            "internalType": "address"
        }]
    }, {
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": [],
        "name": "addPairAddress",
        "inputs": [{
            "type": "address",
            "name": "bondDepository",
            "internalType": "address"
        }, {
            "type": "address",
            "name": "pair",
            "internalType": "address"
        }]
    }, {
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": [],
        "name": "addReserveAddress",
        "inputs": [{
            "type": "address",
            "name": "bondDepository",
            "internalType": "address"
        }, {
            "type": "address",
            "name": "reserve",
            "internalType": "address"
        }]
    }, {
        "type": "function",
        "stateMutability": "view",
        "outputs": [{
            "type": "address",
            "name": "",
            "internalType": "address"
        }],
        "name": "allowedPairs",
        "inputs": [{
            "type": "address",
            "name": "",
            "internalType": "contract ITimeBondDepository"
        }]
    }, {
        "type": "function",
        "stateMutability": "view",
        "outputs": [{
            "type": "address",
            "name": "",
            "internalType": "address"
        }],
        "name": "allowedReserves",
        "inputs": [{
            "type": "address",
            "name": "",
            "internalType": "contract ITimeBondDepository"
        }]
    }, {
        "type": "function",
        "stateMutability": "view",
        "outputs": [{
            "type": "bool",
            "name": "",
            "internalType": "bool"
        }],
        "name": "approvedTargets",
        "inputs": [{
            "type": "address",
            "name": "",
            "internalType": "address"
        }]
    }, {
        "type": "function",
        "stateMutability": "view",
        "outputs": [{
            "type": "address",
            "name": "",
            "internalType": "address"
        }],
        "name": "owner",
        "inputs": []
    }, {
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": [],
        "name": "removePairAddress",
        "inputs": [{
            "type": "address",
            "name": "bondDepository",
            "internalType": "address"
        }]
    }, {
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": [],
        "name": "removeReserveAddress",
        "inputs": [{
            "type": "address",
            "name": "bondDepository",
            "internalType": "address"
        }]
    }, {
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": [],
        "name": "renounceOwnership",
        "inputs": []
    }, {
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": [],
        "name": "setApprovedTargets",
        "inputs": [{
            "type": "address[]",
            "name": "targets",
            "internalType": "address[]"
        }, {
            "type": "bool[]",
            "name": "isApproved",
            "internalType": "bool[]"
        }]
    }, {
        "type": "function",
        "stateMutability": "view",
        "outputs": [{
            "type": "bool",
            "name": "",
            "internalType": "bool"
        }],
        "name": "stopped",
        "inputs": []
    }, {
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": [],
        "name": "toggleContractActive",
        "inputs": []
    }, {
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": [],
        "name": "transferOwnership",
        "inputs": [{
            "type": "address",
            "name": "newOwner",
            "internalType": "address"
        }]
    }, {
        "type": "receive",
        "stateMutability": "payable"
    }
]