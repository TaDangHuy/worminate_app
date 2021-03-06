import React, { useEffect, useRef, useState } from "react";
import {
  Paper,
  Button,
  Container,
  Typography,
  Grid,
  Box,
  Stack,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Chip,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
  TextField,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link as Link2 } from "react-router-dom";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/system";

import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import $ from "jquery";
import Countdown from "./Countdown";
import axios from "axios";
import moment from "moment";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

function Token() {
  const [ICOState, setICOState] = useState({
    contracts: {},
    tokenPrice: "1000000000000000",
    tokensSold: 0,
    tokensAvailable: 10000000,
    admin: "",
    currentAccount: "",
    currentBalance: 0,
  });
  const [value, setValue] = useState(1);
  const [isConnected, setIsConnected] = useState(false);

  const [transactions, setTransactions] = useState([]);

  const ethereumButton = useRef(null);

  const ICO = {
    worTokenSaleContractAbi: [
      {
        inputs: [
          {
            internalType: "contract WorToken",
            name: "_tokenContract",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_tokenPrice",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "_totalAmountSold",
            type: "uint256",
          },
        ],
        name: "EndSale",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "_buyer",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "_amount",
            type: "uint256",
          },
        ],
        name: "Sell",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "_value",
            type: "uint256",
          },
        ],
        name: "Withdraw",
        type: "event",
      },
      {
        constant: true,
        inputs: [],
        name: "tokenContract",
        outputs: [
          {
            internalType: "contract WorToken",
            name: "",
            type: "address",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "tokenPrice",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "tokensSold",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            internalType: "uint256",
            name: "_numberOfTokens",
            type: "uint256",
          },
        ],
        name: "buyTokens",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function",
      },
      {
        constant: false,
        inputs: [],
        name: "endSale",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [],
        name: "withdraw",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    worTokenSaleContractAddr: "0x5380bbAf10f886D38c3b33E9B90d835599C44CD3",

    worTokenContractAbi: [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_initialSupply",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "_owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "_spender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "_value",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "_burner",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "_value",
            type: "uint256",
          },
        ],
        name: "Burn",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "_oldOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "_newOwner",
            type: "address",
          },
        ],
        name: "OwnerSet",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "_from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "_to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "_value",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        constant: true,
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "allowance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "standard",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "transferable",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "getOwner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            internalType: "address",
            name: "_newOwner",
            type: "address",
          },
        ],
        name: "changeOwner",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            internalType: "bool",
            name: "_choice",
            type: "bool",
          },
        ],
        name: "isTransferable",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            internalType: "address",
            name: "_to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_value",
            type: "uint256",
          },
        ],
        name: "transfer",
        outputs: [
          {
            internalType: "bool",
            name: "success",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            internalType: "address",
            name: "_spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_value",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [
          {
            internalType: "bool",
            name: "success",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            internalType: "address",
            name: "_from",
            type: "address",
          },
          {
            internalType: "address",
            name: "_to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_value",
            type: "uint256",
          },
        ],
        name: "transferFrom",
        outputs: [
          {
            internalType: "bool",
            name: "success",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            internalType: "uint256",
            name: "_value",
            type: "uint256",
          },
        ],
        name: "burn",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    worTokenContractAddr: "0x6DCb6b24459DF0f197203C1a7A9390CB39a6F718",

    init: function () {
      console.log("App initialized...");
      let web3 = new Web3(window.ethereum);
      const contractsTmp = {};
      contractsTmp.tokenSaleContract = new web3.eth.Contract(
        ICO.worTokenSaleContractAbi,
        ICO.worTokenSaleContractAddr
      );
      contractsTmp.worTokenContract = new web3.eth.Contract(
        ICO.worTokenContractAbi,
        ICO.worTokenContractAddr
      );
      contractsTmp.worTokenContract.methods
        .getOwner()
        .call()
        .then(function (owner) {
          setICOState((prev) => {
            // localStorage.setItem(
            //   "ICO",
            //   JSON.stringify({ ...prev, admin: owner })
            // );
            return { ...prev, admin: owner };
          });
          // dispatch(setAdmin(owner));
        });
      contractsTmp.tokenSaleContract.methods
        .tokenPrice()
        .call()
        .then(function (_tokenPrice) {
          setICOState((prev) => {
            // localStorage.setItem(
            //   "ICO",
            //   JSON.stringify({ ...prev, tokenPrice: _tokenPrice })
            // );
            return { ...prev, tokenPrice: _tokenPrice };
          });
          // dispatch(setTokenPrice(_tokenPrice));
          $(".token-price").html(
            web3.utils.fromWei(ICOState.tokenPrice, "ether")
          );
        });
      contractsTmp.tokenSaleContract.methods
        .tokensSold()
        .call()
        .then(function (_tokenSold) {
          // console.log(_tokenSold);
          // $(".tokens-sold").html(_tokenSold + " WOR");
          setICOState((prev) => {
            // localStorage.setItem(
            //   "ICO",
            //   JSON.stringify({ ...prev, tokensSold: _tokenSold })
            // );
            return { ...prev, tokensSold: _tokenSold };
          });
          // dispatch(setTokensSold(_tokenSold));
          $(".tokens-available").html(ICOState.tokensAvailable + " WOR");
        });

      setICOState((prev) => {
        // let obj = { ...prev, contracts: contractsTmp };
        // console.log(obj);
        // localStorage.setItem("ICO", JSON.stringify(obj));
        return { ...prev, contracts: contractsTmp };
      });
      // dispatch(setContracts(contractsTmp));
    },
  };
  const buyTokens = (event) => {
    var numberOfTokens = $("#numberOfTokens").val();
    console.log("Quantity: " + numberOfTokens);
    if (ICOState.currentAccount.length === 0) {
      event.preventDefault();
      alert("Please connect to MetaMask");
    } else {
      event.preventDefault();
      setOpenBackdrop(true);
      ICOState.contracts.tokenSaleContract.methods
        .buyTokens(numberOfTokens)
        .send({
          from: ICOState.currentAccount,
          value: numberOfTokens * ICOState.tokenPrice,
          gas: 500000,
        })
        .then((eve) => {
          console.log("Tokens bought...");
          console.log({ eve });
          // $(".wor-balance").html(numberOfTokens);
          ICOState.contracts.worTokenContract.methods
            .balanceOf(ICOState.currentAccount)
            .call()
            .then(function (_balance) {
              localStorage.setItem("user_balance", _balance);
              setICOState((prev) => {
                return { ...prev, currentBalance: _balance };
              });
              setTableParameters({
                transactionHash: eve.transactionHash,
                address: eve.from,
                age: "a few second ago",
                quantity: numberOfTokens,
              });
              setOpenSnackbar(true);
            });
        })
        .catch((eve) => {
          console.log("Error...");
        })
        .finally(() => {
          setOpenBackdrop(false);
        });
    }
  };
  // const basicPlan = (event) => {
  //   if (ICOState.currentAccount.length === 0) {
  //     event.preventDefault();
  //     alert("Please connect to MetaMask");
  //   } else {
  //     event.preventDefault();
  //     ICOState.contracts.worTokenContract.methods
  //       .transfer(ICOState.admin, 1)
  //       .send({
  //         from: ICOState.currentAccount,
  //       })
  //       .then((result) => {
  //         console.log("Successfully registered for basic plan");
  //         ICOState.contracts.worTokenContract.methods
  //           .balanceOf(ICOState.currentAccount)
  //           .call()
  //           .then(function (_balance) {
  //             localStorage.setItem("user_balance", _balance);
  //             setICOState((prev) => {
  //               // localStorage.setItem(
  //               //   "ICO",
  //               //   JSON.stringify({ ...prev, currentBalance: _balance })
  //               // );
  //               return { ...prev, currentBalance: _balance };
  //             });
  //             // dispatch(setCurrentBalance(_balance));
  //           });
  //       })
  //       .catch((error) => {
  //         console.log("Error...");
  //       });
  //   }
  // };
  // const plusPlan = (event) => {
  //   if (ICOState.currentAccount.length === 0) {
  //     event.preventDefault();
  //     alert("Please connect to MetaMask");
  //   } else {
  //     event.preventDefault();
  //     ICOState.contracts.worTokenContract.methods
  //       .transfer(ICOState.admin, 3)
  //       .send({
  //         from: ICOState.currentAccount,
  //       })
  //       .then((result) => {
  //         console.log("Successfully registered for plus plan");
  //         ICOState.contracts.worTokenContract.methods
  //           .balanceOf(ICOState.currentAccount)
  //           .call()
  //           .then(function (_balance) {
  //             localStorage.setItem("user_balance", _balance);
  //             setICOState((prev) => {
  //               // localStorage.setItem(
  //               //   "ICO",
  //               //   JSON.stringify({ ...prev, currentBalance: _balance })
  //               // );
  //               return { ...prev, currentBalance: _balance };
  //             });
  //             // dispatch(setCurrentBalance(_balance));
  //           });
  //       })
  //       .catch((error) => {
  //         console.log("Error...");
  //       });
  //   }
  // };

  // const visionaryPlan = (event) => {
  //   if (ICOState.currentAccount.length === 0) {
  //     event.preventDefault();
  //     alert("Please connect to MetaMask");
  //   } else {
  //     event.preventDefault();
  //     ICOState.contracts.worTokenContract.methods
  //       .transfer(ICOState.admin, 5)
  //       .send({
  //         from: ICOState.currentAccount,
  //       })
  //       .then((result) => {
  //         console.log("Successfully registered for visionary plan");
  //         ICOState.contracts.worTokenContract.methods
  //           .balanceOf(ICOState.currentAccount)
  //           .call()
  //           .then(function (_balance) {
  //             localStorage.setItem("user_balance", _balance);
  //             setICOState((prev) => {
  //               // localStorage.setItem(
  //               //   "ICO",
  //               //   JSON.stringify({ ...prev, currentBalance: _balance })
  //               // );
  //               return { ...prev, currentBalance: _balance };
  //             });
  //             // dispatch(setCurrentBalance(_balance));
  //           });
  //       })
  //       .catch((error) => {
  //         console.log("Error...");
  //       });
  //   }
  // };
  const [ETHtoUSDExchangeRate, setETHtoUSDExchangeRate] = useState(1);
  const [BTCtoUSDExchangeRate, setBTCtoUSDExchangeRate] = useState(1);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  useEffect(() => {
    ICO.init();
    axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      )
      .then((res) => setETHtoUSDExchangeRate(res.data.ethereum.usd))
      .catch((e) => console.log("ETH TO USD error"));

    axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      )
      .then((res) => setBTCtoUSDExchangeRate(res.data.bitcoin.usd))
      .catch((e) => console.log("BTC TO USD error"));

    axios
      .get(
        "https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=0x5380bbaf10f886d38c3b33e9b90d835599c44cd3&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=6YCB5E1U3ITRC6R4JVD9E918ZGEU19VTSP"
      )
      .then((response) => {
        if (response.data.status === "1") {
          let tmpTransactions = response.data.result.map((e) => ({
            hash: e.hash,
            address: e.from,
            age: moment.unix(e.timeStamp).fromNow(),
            quantity: e.value.slice(0, e.value.length - 15),
          }));
          setTransactions([...tmpTransactions]);
        }
      });
  }, []);
  useEffect(() => {
    if (transactions.length) {
      var provider = new Web3.providers.WebsocketProvider(
        "wss://rinkeby.infura.io/ws/v3/d08eb4809d32405fb077572d83aedd8f"
      );
      var web3Infura = new Web3(provider);
      var tokenSaleContractInfura = new web3Infura.eth.Contract(
        ICO.worTokenSaleContractAbi,
        ICO.worTokenSaleContractAddr
      );

      tokenSaleContractInfura.events.Sell(
        { filter: {}, fromBlock: "latest" },
        function (err, event) {
          if (err) {
            console.log(err);
          } else {
            console.log(event);
            let count = 0;
            const reGet = setInterval(() => {
              count += 1;
              console.log(count);
              axios
                .get(
                  "https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=0x5380bbaf10f886d38c3b33e9b90d835599c44cd3&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=6YCB5E1U3ITRC6R4JVD9E918ZGEU19VTSP"
                )
                .then((response) => {
                  console.log(response);
                  if (response.data.status === "1") {
                    let tmpTransactions = response.data.result.map((e) => ({
                      hash: e.hash,
                      address: e.from,
                      age: moment.unix(e.timeStamp).fromNow(),
                      quantity: e.value.slice(0, e.value.length - 15),
                    }));
                    console.log(transactions[0]);
                    console.log(tmpTransactions[0]);
                    if (
                      transactions[0] &&
                      transactions[0].hash !== tmpTransactions[0].hash
                    ) {
                      setTransactions([...tmpTransactions]);
                      clearInterval(reGet);
                    } else if (count === 10) {
                      clearInterval(reGet);
                    }
                  }
                });
            }, 20000);
          }
        }
      );
    }
  }, [transactions]);

  useEffect(() => {
    connectToWallet(ethereumButton);
  }, [ICOState.contracts]);

  async function connectToWallet(ethereumButton) {
    // Detect the MetaMask Ethereum provider
    const provider = await detectEthereumProvider();

    if (provider) {
      startApp(provider); // Initialize your app
    } else {
      console.log("Please install MetaMask!");
    }

    function startApp(provider) {
      // If the provider returned by detectEthereumProvider is not the same as
      // window.ethereum, something is overwriting it, perhaps another wallet.
      if (provider !== window.ethereum) {
        console.error("Do you have multiple wallets installed?");
      }
      // Access the decentralized web!
    }

    // Handle chain (network) and chainChanged (per EIP-1193)
    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    // Handle user accounts and accountsChanged (per EIP-1193)
    window.ethereum
      .request({ method: "eth_accounts" })
      .then(handleAccountsChanged)
      .catch((err) => {
        // Some unexpected error.
        // For backwards compatibility reasons, if no accounts are available,
        // eth_accounts will return an empty array.
        console.error(err);
      });

    // Note that this event is emitted on page load.
    // If the array of accounts is non-empty, you're already
    // connected.
    window.ethereum.on("accountsChanged", handleAccountsChanged);

    // For now, 'eth_accounts' will continue to always return an array
    function handleAccountsChanged(accounts) {
      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        console.log("Please connect to MetaMask.");
        // localStorage.removeItem("ICO");
        setICOState((prev) => {
          // localStorage.setItem(
          //   "ICO",
          //   JSON.stringify({
          //     ...prev,
          //     currentAccount: "",
          //     currentBalance: 0,
          //   })
          // );
          return {
            ...prev,
            currentAccount: "",
            currentBalance: 0,
          };
        });
        // dispatch(setCurrentBalance(0));
        // dispatch(setCurrentAccount(""));
        setIsConnected(false);
      } else if (accounts[0] !== ICOState.currentAccount) {
        setICOState((prev) => {
          // localStorage.setItem(
          //   "ICO",
          //   JSON.stringify({ ...prev, currentAccount: accounts[0] })
          // );
          return { ...prev, currentAccount: accounts[0] };
        });
        // dispatch(setCurrentAccount(accounts[0]));
        // $("#after-connected").show();
        // $("#intro-price").hide();
        // if (ICOState.currentAccount !== "") {
        if (accounts[0] !== "") {
          ICOState.contracts?.worTokenContract?.methods
            .balanceOf(accounts[0])
            .call()
            .then(function (_balance) {
              localStorage.setItem("user_balance", _balance);
              setICOState((prev) => {
                // localStorage.setItem(
                //   "ICO",
                //   JSON.stringify({ ...prev, currentBalance: _balance })
                // );
                return { ...prev, currentBalance: _balance };
              });
              // dispatch(setCurrentBalance(_balance));
            });
        }
        setIsConnected(true);
      }
    }

    ethereumButton.current.addEventListener("click", connect);

    function connect() {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(handleAccountsChanged)
        .catch((err) => {
          if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            console.log("Please connect to MetaMask.");
          } else {
            console.error(err);
          }
        });
    }

    window.ethereum.on("disconnect", () => {
      // $("#after-connected").hide();
      // $("#intro-price").show();
      localStorage.removeItem("user_balance");
    });

    // const tokenAddress = "0x6dcb6b24459df0f197203c1a7a9390cb39a6f718";
    // const tokenSymbol = "WOR";
    // const tokenDecimals = 0;
    // const tokenImage =
    //   "https://res.cloudinary.com/dzxazbuwe/image/upload/v1633839287/worminate/r84og4jih7evxa5uawr1.png";

    // try {
    //   // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    //   const wasAdded = await window.ethereum.request({
    //     method: "wallet_watchAsset",
    //     params: {
    //       type: "ERC20", // Initially only supports ERC20, but eventually more!
    //       options: {
    //         address: tokenAddress, // The address that the token is at.
    //         symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
    //         decimals: tokenDecimals, // The number of decimals in the token
    //         image: tokenImage, // A string url of the token logo
    //       },
    //     },
    //   });

    //   if (wasAdded) {
    //     console.log("Thanks for your interest!");
    //   } else {
    //     console.log("Your loss!");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }

  async function connectToAnotherAccount(ethereumButton) {
    setICOState((prev) => {
      // localStorage.setItem(
      //   "ICO",
      //   JSON.stringify({ ...prev, currentAccount: "" })
      // );
      return { ...prev, currentAccount: "" };
    });
    // dispatch(setCurrentAccount(""));

    const accounts = await window.ethereum
      .request({
        method: "wallet_requestPermissions",
        params: [
          {
            eth_accounts: {},
          },
        ],
      })
      .then(() =>
        window.ethereum.request({
          method: "eth_requestAccounts",
        })
      );

    setICOState((prev) => {
      // localStorage.setItem(
      //   "ICO",
      //   JSON.stringify({ ...prev, currentAccount: accounts[0] })
      // );
      return { ...prev, currentAccount: accounts[0] };
    });
    // dispatch(setCurrentAccount(accounts[0]));
  }

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [tableParameters, setTableParameters] = useState(undefined);

  return (
    <div>
      <Box sx={{ height: "100vh", boxSizing: "border-box" }}>
        <Box
          component="img"
          sx={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
            width: "100%",
            position: "absolute",
            filter: "opacity(90%)",
          }}
          src={require("../../assets/images/token/background2.jpg").default}
        />
        <Container sx={{ pt: 3, position: "relative" }}>
          <Box>
            <Link2 to="/" style={{ color: "inherit", textDecoration: "none" }}>
              <Stack direction="row" alignItems="center">
                <Box
                  component="img"
                  sx={{
                    height: 70,
                    width: 65,
                    marginRight: 1,
                    marginLeft: 1,
                    marginTop: -0.9,
                  }}
                  src={require("../../assets/images/logo.png").default}
                  alt="worminate-token"
                />
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ mr: "20px", color: "white" }}
                >
                  WORMINATE
                </Typography>
              </Stack>
            </Link2>
          </Box>
          <Box sx={{ marginTop: "170px" }}>
            <Grid container maxWidth="lg">
              <Grid item xs={8}>
                <Box sx={{ py: 7 }}>
                  <Typography
                    variant="h2"
                    sx={{
                      textTransform: "uppercase",
                      fontWeight: "800",
                      // color: "#454545",
                      color: "white",
                    }}
                  >
                    Worminate Token
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontSize: "30px", color: "white", mt: 2 }}
                  >
                    Worminate transforms access to blockchain technology and
                    enables it to be widely used in real economy
                  </Typography>
                  <Link
                    href="#main_part"
                    sx={{
                      textDecoration: "none",
                      color: "#e2c497",
                      "&:hover": { color: "white" },
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{
                        color: "#e2c497 ",
                        borderColor: "#e2c497",
                        width: 145,
                        height: 50,
                        mt: 5,
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: "#e2c497",
                          color: "white",
                        },
                      }}
                    >
                      Get started
                    </Button>
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  component="img"
                  sx={{
                    height: "425px",
                    width: "446px",
                    mt: -10,
                  }}
                  src={require("../../assets/images/token.png").default}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <div
        id="main_part"
        style={{
          width: "98.8vw",
          minHeight: "100vh",
          background: "#f5f8fb",
          boxSizing: "border-box",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            px: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textTransform: "uppercase",
              fontWeight: "800",
              color: "#454545",
              mb: 5,
            }}
          >
            WORMINATE TOKEN SALE
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={3.5}>
              <Box
                sx={{
                  p: 3,
                  pr: 15,
                  background: "linear-gradient(to right, #8e2de2, #4a00e0)",
                  color: "white",
                  minHeight: 220,
                }}
              >
                <ListItem sx={{ p: 0 }}>
                  <ListItemAvatar>
                    <Avatar
                      alt="Wor"
                      sx={{ width: "70px", height: "70px" }}
                      src={require("../../assets/images/token.png").default}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="h6"
                        sx={{
                          textTransform: "uppercase",
                          color: "#cfbd9e",
                          fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      >
                        Token Balance
                      </Typography>
                    }
                    secondary={
                      <Typography variant="h6">
                        <span className="wor-balance">
                          {ICOState.currentBalance}
                        </span>
                        {" WOR"}
                      </Typography>
                    }
                  />
                </ListItem>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    textTransform: "uppercase",
                    my: 2,
                    color: "#cfbd9e",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  Your contribution in
                </Typography>
                <Stack direction="row" justifyContent="space-between">
                  <Stack direction="column">
                    <Typography>
                      {Number.parseFloat(
                        parseInt(ICOState.currentBalance) *
                          parseFloat(ICOState.tokenPrice) *
                          Math.pow(10, -18) *
                          ETHtoUSDExchangeRate
                      ).toFixed(0)}
                    </Typography>
                    <Typography sx={{ textTransform: "uppercase" }}>
                      USD
                    </Typography>
                  </Stack>
                  <Stack direction="column">
                    <Typography>
                      {Number.parseFloat(
                        parseInt(ICOState.currentBalance) *
                          parseFloat(ICOState.tokenPrice) *
                          Math.pow(10, -18)
                      ).toFixed(3)}
                    </Typography>
                    <Typography sx={{ textTransform: "uppercase" }}>
                      ETH
                    </Typography>
                  </Stack>
                  <Stack direction="column">
                    <Typography>
                      {Number.parseFloat(
                        (parseInt(ICOState.currentBalance) *
                          parseFloat(ICOState.tokenPrice) *
                          Math.pow(10, -18) *
                          ETHtoUSDExchangeRate) /
                          BTCtoUSDExchangeRate
                      ).toFixed(3)}
                    </Typography>
                    <Typography sx={{ textTransform: "uppercase" }}>
                      BTC
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={3.5}>
              <Box
                sx={{
                  p: 3,
                  pr: 5,
                  background: "white",
                  textTransform: "uppercase",
                  minHeight: 220,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ textTransform: "capitalize", fontWeight: "bold" }}
                >
                  Exchange Rate
                </Typography>
                <div>
                  <Typography variant="h6" id="intro-price">
                    1 WOR = <span className="token-price"></span> ETH
                  </Typography>
                  <Typography variant="subtitle2">
                    {"1 USD = "}
                    {Number.parseFloat(1 / ETHtoUSDExchangeRate).toFixed(8)} ETH
                  </Typography>
                </div>
                <form
                  onSubmit={(event) => {
                    buyTokens(event);
                    return false;
                  }}
                  name="buyForm"
                >
                  <div className="form-group">
                    <Stack direction="row" alignItems="center">
                      {/* <input
                        type="number"
                        id="numberOfTokens"
                        name="number"
                        value={value}
                        min={1}
                        pattern="[0-9]"
                        onChange={(e) => setValue(e.target.value)}
                      /> */}
                      <TextField
                        id="numberOfTokens"
                        type="number"
                        name="number"
                        value={value}
                        min={1}
                        onChange={(e) => setValue(e.target.value)}
                        sx={{ p: 0 }}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ height: "60px", mt: "-4px" }}
                      >
                        Buy Tokens
                      </Button>
                    </Stack>
                  </div>
                </form>
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Box
                sx={{
                  p: 3,
                  background: "white",
                  minHeight: 220,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography
                    variant="h6"
                    component="span"
                    sx={{ fontWeight: "bold" }}
                  >
                    Your Account Status
                  </Typography>
                  {isConnected && <Chip label="CONNECTED" color="primary" />}
                  {!isConnected && <Chip label="UNCONNECTED" color="error" />}
                </Stack>
                <Button
                  variant="contained"
                  className="connectToMetaMask"
                  ref={ethereumButton}
                  onClick={() =>
                    connectToAnotherAccount(ethereumButton.current)
                  }
                  sx={{ width: 300 }}
                >
                  {isConnected
                    ? "Switch MetaMask Account"
                    : "Connect to MetaMask"}
                </Button>
                <div>
                  {ICOState.currentAccount && (
                    <>
                      <Typography variant="h5">Your account:</Typography>
                      <h4 className="showAccount">{ICOState.currentAccount}</h4>
                    </>
                  )}
                </div>
              </Box>
            </Grid>
            <Grid item xs={7}>
              <Box
                sx={{
                  p: 3,
                  minHeight: 220,
                  background: "white",
                }}
              >
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Tracsaction Hash</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transactions.length ? (
                        transactions.map((e, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <a
                                style={{ textDecoration: "none" }}
                                target="_blank"
                                href={`https://rinkeby.etherscan.io/tx/${e.hash}`}
                                rel="noreferrer"
                              >
                                {e.hash.substr(0, 19) + "..."}
                              </a>
                            </TableCell>
                            <TableCell>
                              <a
                                style={{ textDecoration: "none" }}
                                target="_blank"
                                href={`https://rinkeby.etherscan.io/address/${e.address}`}
                                rel="noreferrer"
                              >
                                {e.address.substr(0, 19) + "..."}
                              </a>
                            </TableCell>
                            <TableCell>{e.age}</TableCell>
                            <TableCell align="center">{e.quantity}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Box
                sx={{
                  p: 3,
                  background: "white",
                  textTransform: "uppercase",
                  minHeight: 220,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    mb: 1,
                  }}
                >
                  Token Sale Progress
                </Typography>
                <Stack direction="row" justifyContent="space-between">
                  <Stack>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "14px", fontWeight: "500" }}
                    >
                      Raised Amount
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "14px", fontWeight: "500" }}
                      className="tokens-sold"
                    >
                      {ICOState.tokensSold + " WOR"}
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "14px", fontWeight: "500" }}
                    >
                      Total Tokens
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "14px", fontWeight: "500" }}
                      className="tokens-available"
                    ></Typography>
                  </Stack>
                </Stack>
                <BorderLinearProgress
                  variant="determinate"
                  value={parseFloat(ICOState.tokensSold) / 100000} // thang 100
                  sx={{ width: "100%" }}
                />
                <Typography variant="h6" sx={{ mt: 2, fontSize: "18px" }}>
                  Sale end in
                </Typography>
                <Countdown />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
      <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openSnackbar}
        autoHideDuration={4000}
        message="Da bo theo doi"
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }

          setOpenSnackbar(false);
        }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {tableParameters && (
            <Table sx={{ minWidth: 650 }} aria-label="simple table2">
              <TableHead>
                <TableRow>
                  <TableCell>Transaction Hash</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {tableParameters.transactionHash}
                  </TableCell>
                  <TableCell align="right">{tableParameters.address}</TableCell>
                  <TableCell align="right">{tableParameters.age}</TableCell>
                  <TableCell align="right">
                    {tableParameters.quantity}
                  </TableCell>
                </TableRow> */}
                <TableRow>
                  <TableCell>
                    <a
                      style={{ textDecoration: "none" }}
                      target="_blank"
                      href={`https://rinkeby.etherscan.io/tx/${tableParameters.transactionHash}`}
                      rel="noreferrer"
                    >
                      {tableParameters.transactionHash.substr(0, 19) + "..."}
                    </a>
                  </TableCell>
                  <TableCell>
                    <a
                      style={{ textDecoration: "none" }}
                      target="_blank"
                      href={`https://rinkeby.etherscan.io/address/${tableParameters.address}`}
                      rel="noreferrer"
                    >
                      {tableParameters.address.substr(0, 19) + "..."}
                    </a>
                  </TableCell>
                  <TableCell>{tableParameters.age}</TableCell>
                  <TableCell align="center">
                    {tableParameters.quantity}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Token;
