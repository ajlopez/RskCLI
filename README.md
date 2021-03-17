# RSK Command Line Interface

This a command line tool to interact with RSK and Ethereum
nodes. You can:

- query blocks, transactions, transaction receipts
- send transactions like transfer, contract deploys, contract
invocation
- query contract state
- estimate gas for transaction
- query accounts state

A local configuration file `rskcli.json` is created to be used
in the sequence of command invocation.

## Install

Using `npm`:

```
npm install rskclitools -g
```

This command install the tool globally, adding them to the execution
path. The tool is invoked with the name `rskcli`.

## Commands

All the commands starts with `rskcli`.

### Query Info

It returns the status of a blockchain node:

```
rskcli info <host>
```

Example, using RSK mainnet:

```
> rskcli info https://public-node.rsk.co:443

host https://public-node.rsk.co:443
block number 3164289
chain id 0x1e
network version 30
client version RskJ/2.2.0/Linux/Java1.8/PAPYRUS-dev
date/time 2021-03-07T13:48:14.425Z
```

(notice that an explicit port should be specified 
when using `https`)

If no host is specified, it uses the host from the last `sethost` command.

You can use alias names instead of explicit entrypoint:

- `ganache`, `truffle`, `hardhat` are equivalent to `http://localhost:8545`
- `local`, `regtest` are equivalent to `http://localhost:4444`
- `testnet` is equivalent to `https://public-node.testnet.rsk.co:443`
- `mainnet` is equivalent to `https://public-node.rsk.co:443`


### Set Host

Set the node JSON RPC entrypoint to use in the commands:

```
rskcli sethost <host>
```

Examples:
```
rskcli sethost http://localhost:8545
rskcli sethost http://localhost:4444
rskcli sethost https://public-node.testnet.rsk.co:443
rskcli sethost https://public-node.rsk.co:443
```

They are the usual connections for `ganache`/`truffle`/`hardhat` nodes, RSK `regtest`, RSK `testnet`
and RSK `mainnet`. You also can use an Infura or Ethereum node.

The info is saved into the local `rskcli.json` file, to be used
in the subsequent commands.

This command should be execute BEFORE other commands (except `rskcli info` that
takes the host information from the command line)

You can use alias names instead of explicit entrypoint:

- `ganache`, `truffle`, `hardhat` are equivalent to `http://localhost:8545`
- `local`, `regtest` are equivalent to `http://localhost:4444`
- `testnet` is equivalent to `https://public-node.testnet.rsk.co:443`
- `mainnet` is equivalent to `https://public-node.rsk.co:443`

### List Host Accounts

Some nodes have a list of activated account, ie `ganache` and RSK `regtest`.
You can list their addresses with:

```
rskcli haccounts
```

Example:
```
> rskcli haccounts

0x224a143ed6b080493f7c09f51b8c17b058d0427c
0xba6c074888635320dafe913405a52177bbabc39b
0x845caad64d3f438b232417e32e79848e81a3b42f
0xe56cafd3876e995d45912bff38e2a3f3f155768a
0x7592628e13afbe1977afd67c2c389d517d3a0f42
0x72911753d68829063d5cebdffc310c7fcf993cb7
0x101cbd4149d7f2bde5a34b6f125297ff38a7dcf1
0x1ee2b46391b95a92fc141406be2eef4b45e2cfad
0xee552d41682d2a94a4559e5671cb26e3dcca703b
0xb46ac24c04ab99c24bafff440ce069bbb98117b7
```


### Set Account

To set an account with name:

```
rskcli setaccount <name> <ordinal>
rskcli setaccount <name> <address>
rskcli setaccount <name> <privatekey>
```

Example, this command set `root` account using the first
host account (number 0):

```
rskcli setaccount root 0
```

Then you can use the name of the account instead of his
address. You can use it as the sender account (signer)
in transfer, deploy and invoke operation, because usually
the host accounts can sign transactions inside the node.

If you already knows the address of an account and you
want to manage it under a name:

```
rskcli setaccount alice 0x0142d73c968ad62dcd477bdc2f74aa0608195231
```

You cannot use this account as the sender in an operation
because the tool does not know the private key.

If you controls an account knowing its private key:

```
rskcli setaccount alice 0x...privatekey...
```
Now, you can use the symbolic name `alice` to sign
transactions, if the account has enough funds.

### New Account

Create a new account with symbolic name:

```
rskcli newaccount <name>
```

Examples:
```
rskcli newaccount root
rskcli newaccount alice
rskcli newaccount bob
rskcli newaccount charlie
```

A valid random private key is generated, and then, their associated
public key and address are derived. 

Once the account is generated, you can use the name
instead of the address in any of this tool commands.

Also, having the private key, the tool commands `transfer`,
`deploy` and `invoke` can be used to generate transactions
signed locally, without intervention from the running node.

Take into account that that information is saved in the local `rskcli.json` file,
so it is recommended not share this file, ie, not
include it into a public repository.

In case the current folder is in a public repository
add the following line to `.gitignore` file:

```
rskcli*.json
```

This line avoid the save of `rskcli.json` file and
other ones that can be generated with `rskcli putconf`
command.

### Get Account Balance

### Get Account Transaction Count

### Get Account Code

### Set Instance

### Transfer

### Deploy a Contract

### Invoke a Contract

### Call a Contract

### Estimate Gas for Transaction

### Retrieve Block

### Retrieve Transaction

### Retrieve Transaction Receipt

### Save Configuration

### Restore Configuration

## Options

Many of the above commands accepts options:

- '-d', '--dec'
- '-g', '--gas' '<number>'
- '-gp', '--gasPrice' '<number>'
- '-l', '--log'
- '-q', '--quick'
- '-v', '--value' '<number>'

## Configuration File

There is a file in the current directory, `rskcli.json`
that contains information generated by the execution of commands.

Usually it contains:

- Host information
- Account information
- Instance information
- Pending transactions information
- Non-default options for gas, gas price, and value

Example:

TBD

Notice that when you create a new account or setup one providing
the private key, the private key information is stored in this file.
Then, it is recommended NOT TO BE included in any source repository.

Add this line to your `.gitignore`.

```
rskcli*.json
```

The `*` is needed to avoid the commitment of configuration copies,
used by the `putconf` and `getconf` commands.

## Versions

- 0.0.1 First commands: haccounts, sethost, setaccount, newaccount,
transfer, deploy, invoke, call, estimate, 
code, info, block, transaction,  receipts, nonce

## References

- [GetBlock](https://developers.rsk.co/solutions/getblock/)

## To Do

- pending command
- wait command
- Commands description
- Tutorial- Save and restore configuration
- .gitignore notice or update
- help command
- setnetwork command
- no of time waiting receipts as option
- peers command
- estimate transfer
- setgas, setgasprice commands
- JSON format in outpus as flag
- silence flag
- host flag

## References

- [A guide to creating a NodeJS command-line package](https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e)

## License

MIT

