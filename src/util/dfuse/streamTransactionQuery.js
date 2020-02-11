const streamTransactionQuery = `
     subscription($hash: String!){
      transactionLifecycle(hash: $hash){
        previousState
        currentState
        transitionName
        transition{
          __typename

        ... on TrxTransitionInit {
            transaction {
            ...TransactionFragment
            }
            blockHeader {
            ...BlockHeaderFragment
            }
            trace {
            ...TransactionTraceFragment
            }
            confirmations
            replacedById
          }

        ...on TrxTransitionPooled {
            transaction {
            ...TransactionFragment
            }
          }

        ...on TrxTransitionMined {
            blockHeader {
            ...BlockHeaderFragment
            }
            trace {
            ...TransactionTraceFragment
            }
            confirmations
          }

        ...on TrxTransitionForked {
            transaction {
            ...TransactionFragment
            }
          }

        ...on TrxTransitionConfirmed {
            confirmations
          }

        ...on TrxTransitionReplaced {
            replacedById
          }

        }
      }
    }

    fragment TransactionFragment on Transaction {
      hash
      from
      to
      nonce
      gasPrice
      gasLimit
      value
      inputData
      signature {
        v
        s
        r
      }
    }

    fragment TransactionTraceFragment on TransactionTrace {
      hash
      from
      to
      nonce
      gasPrice
      gasLimit
      value
      inputData
      signature {
        v
        s
        r
      }
      cumulativeGasUsed
      publicKey
      index
      create
      outcome
    }

    fragment BlockHeaderFragment on BlockHeader {
      parentHash
      unclesHash
      coinbase
      stateRoot
      transactionsRoot
      receiptRoot
      logsBloom
      difficulty
      number
      gasLimit
      gasUsed
      timestamp
      extraData
      mixHash
      nonce
      hash
    }`;

export default streamTransactionQuery;
