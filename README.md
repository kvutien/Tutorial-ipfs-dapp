# Full stack blockchain IPFS and React tutorial
## In this tutorial we'll store a file in IFPS and its hash on Ropsten, starting from Create React App boilerplate.

*(Written in May 2021)*

This project is the simplest possible example of a Full Stack dApp using blockchain + IPFS + React. A kind of blockchain IPFS "_Hello World_" but Full Stack. This dApp takes a file of your choice, uploads it on IPFS, stores the IPFS hash of this file in a Ethereum smart contract residing on the testnet Ropsten.

It started from [this tutorial](https://www.freecodecamp.org/news/hands-on-get-started-with-infura-and-ipfs-on-ethereum-b63635142af0/) and modified it to correct some mistakes and compatible with the latest versions of React, Bootstrap, IPFS, Remix and nodeJS packages.

It is part of a series of articles intended to convince you, IT people working for humanitarians, that blockchain programming is not so daunting and can lower your operating costs while bringing a lot of benefits. Join us in project *[Machu Picchu](https://kvutien-yes.medium.com/machu-picchu-how-the-blockchain-can-help-persons-in-need-8396820d13d1)*.

This demo was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). We added progressively packages to make it run. To use it, simply follow the setup instructions below. To reproduce the coding yourself, follow the tutorial (in progress).

## Setup
The setup instructions use the console utility (`Terminal.app`) from MacOS. The setup instructions are the same if you use Linux Ubuntu. 

Under Windows, it is strongly recommended to run a [VirtualBox](https://www.virtualbox.org/wiki/Downloads) for Windows and install a Ubuntu Virtual Machine inside it. Here is a YouTube video of 4 minutes, that can guide you through this double installation process: https://youtu.be/8mns5yqMfZk.
### Overall environment setup, using MacOS
This setup is an improvement of your configuration and serves many purposes, not only this "_HelloWorld_" demo.
* Install [Brew](https://brew.sh/)
* Install nodeJS via brew: `brew install node@14.17.0`  (this version of nodeJS is the last long term stable support)
* Install a browser that is compatible with Metamask, like Chrome or Firefox. Chrome has better debugging tools.
  * If you use MacOS, Chrome is available from [here](https://support.google.com/chrome/answer/95346?)
  * If you use Ubuntu, download and install as below
``` bash
        $ wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
        $ sudo apt install ./google-chrome-stable_current_amd64.deb
```
* Install Metamask extension for your browser and feed one account with some ETH on testnet Ropsten. Select this account.
  * [video guide to install Metamask:](https://youtu.be/WAStJtjYI_c) 
  * [faucet to request test ETH fo Ropsten:](https://faucet.metamask.io/)
### Setup this specific dApp, using MacOS
* Clone this repository
``` bash
$ git clone https://github.com/kvutien/ipfs-dapp.git
    Cloning into 'ipfs-dapp'...
    remote: Enumerating objects: 35, done.
    remote: Counting objects: 100% (35/35), done.
    remote: Compressing objects: 100% (31/31), done.
    remote: Total 35 (delta 4), reused 35 (delta 4), pack-reused 0
    Receiving objects: 100% (35/35), 770.87 KiB | 4.21 MiB/s, done.
    Resolving deltas: 100% (4/4), done.
$ cd ipfs-dapp
```
* install the dependencies
``` bash
$ npm install
    ...
    found 566 vulnerabilities (1 low, 565 high)
    run `npm audit fix` to fix them, or `npm audit` for details
$
```
* disregard the warnings. Run the demo by typing
``` bash
$ npm start
```
* your browser will open a new tab and display

![screenshot](./screenshot.png)

* make sure that your browser has a Metamask extension, that Metamask is using the tesnet Ropsten with an account that has some ETH. Else the transaction will be refused and you have to refresh the screen to reload the dApp.
* **hint**: if you leave the default Metamask gas price of 1 gwei, the storage transaction will take some time on Ropsten to be included in a mined block, specially during peak hours because even if Ropsten is a test net, its logic reproduces the logic of the main net and favors transactions with high gas price. Wait for the spinner to stop pulsing before using button 3.
  
## What's next?
This dApp was created using `create-react-dapp`, the generic tool provided by the React team to make a bare-bones React application, on which we manually added the `web3` package to make blockchain transactions and the `ipfs` package to use IPFS.

To be complete, you'll have soon a tutorial text to guide you through the pieces of code and get acquainted to blockchain programming and IPFS. In addition, it will also guide you to put your dApp in production on a public web server like Netlify.

It is becoming easy to be a production Full Stack blockchain programmer. Stay tuned.