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

### Query Info

### Set Host

### List Host Accounts

### Set Account

### New Account

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

## References

- [A guide to creating a NodeJS command-line package](https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e)

## License

MIT

