import React, { useEffect, useRef, useState } from "react";
import {
  Paper,
  Button,
  Container,
  Typography,
  Grid,
  Box,
  Stack,
  Link,
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
} from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/system";

import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import $ from "jquery";
import Countdown from "./Countdown";
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

  contracts: {},
  tokenPrice: 1000000000000000,
  tokensSold: 0,
  tokensAvailable: 10000000,
  admin: "",
  currentAccount: "",
  currentBalance: 0,

  init: function () {
    console.log("App initialized...");
    // let web3 = new Web3('http://localhost:8545');
    let web3 = new Web3(window.ethereum);
    ICO.contracts.tokenSaleContract = new web3.eth.Contract(
      ICO.worTokenSaleContractAbi,
      ICO.worTokenSaleContractAddr
    );
    ICO.contracts.worTokenContract = new web3.eth.Contract(
      ICO.worTokenContractAbi,
      ICO.worTokenContractAddr
    );

    ICO.contracts.worTokenContract.methods
      .getOwner()
      .call()
      .then(function (owner) {
        console.log("Admin: " + owner);
        ICO.admin = owner;
      });

    ICO.contracts.tokenSaleContract.methods
      .tokenPrice()
      .call()
      .then(function (_tokenPrice) {
        ICO.tokenPrice = _tokenPrice;
        $(".token-price").html(web3.utils.fromWei(ICO.tokenPrice, "ether"));
      });

    ICO.contracts.tokenSaleContract.methods
      .tokensSold()
      .call()
      .then(function (_tokenSold) {
        // console.log(_tokenSold);
        $(".tokens-sold").html(_tokenSold + " WOR");
        $(".tokens-available").html(ICO.tokensAvailable + " WOR");
      });
  },

  buyTokens: function (event) {
    // $('#content').hide();
    // $('#loader').show();
    var numberOfTokens = $("#numberOfTokens").val();
    // var numberOfTokens = value;
    console.log("Quantity: " + numberOfTokens);
    // event.preventDefault();
    if (ICO.currentAccount.length === 0) {
      event.preventDefault();
      alert("Please connect to MetaMask");
    } else {
      event.preventDefault();
      ICO.contracts.tokenSaleContract.methods
        .buyTokens(numberOfTokens)
        .send({
          from: ICO.currentAccount,
          value: numberOfTokens * ICO.tokenPrice,
          gas: 500000,
        })
        .then((eve) => {
          console.log("Tokens bought...");
          // $(".wor-balance").html(numberOfTokens);
          ICO.contracts.worTokenContract.methods
            .balanceOf(ICO.currentAccount)
            .call()
            .then(function (_balance) {
              localStorage.setItem("user_balance", _balance);
              console.log(_balance);
              // setBalance(_balance);
              // $(".wor-balance").html(_balance);
            });
        })
        .catch((eve) => {
          console.log("Error...");
        });
    }
  },

  basicPlan: function (event) {
    if (ICO.currentAccount.length === 0) {
      event.preventDefault();
      alert("Please connect to MetaMask");
    } else {
      event.preventDefault();
      ICO.contracts.worTokenContract.methods
        .transfer(ICO.admin, 1)
        .send({
          from: ICO.currentAccount,
        })
        .then((result) => {
          console.log("Successfully registered for basic plan");
          ICO.contracts.worTokenContract.methods
            .balanceOf(ICO.currentAccount)
            .call()
            .then(function (_balance) {
              localStorage.setItem("user_balance", _balance);
              // setBalance(_balance);
              // $(".wor-balance").html(_balance);
            });
        })
        .catch((error) => {
          console.log("Error...");
        });
    }
  },

  plusPlan: function (event) {
    if (ICO.currentAccount.length === 0) {
      event.preventDefault();
      alert("Please connect to MetaMask");
    } else {
      event.preventDefault();
      ICO.contracts.worTokenContract.methods
        .transfer(ICO.admin, 3)
        .send({
          from: ICO.currentAccount,
        })
        .then((result) => {
          console.log("Successfully registered for plus plan");
          ICO.contracts.worTokenContract.methods
            .balanceOf(ICO.currentAccount)
            .call()
            .then(function (_balance) {
              localStorage.setItem("user_balance", _balance);
              // setBalance(_balance);
              // $(".wor-balance").html(_balance);
            });
        })
        .catch((error) => {
          console.log("Error...");
        });
    }
  },

  visionaryPlan: function (event) {
    if (ICO.currentAccount.length === 0) {
      event.preventDefault();
      alert("Please connect to MetaMask");
    } else {
      event.preventDefault();
      ICO.contracts.worTokenContract.methods
        .transfer(ICO.admin, 5)
        .send({
          from: ICO.currentAccount,
        })
        .then((result) => {
          console.log("Successfully registered for visionary plan");
          ICO.contracts.worTokenContract.methods
            .balanceOf(ICO.currentAccount)
            .call()
            .then(function (_balance) {
              localStorage.setItem("user_balance", _balance);
              // setBalance(_balance);
              // $(".wor-balance").html(_balance);
            });
        })
        .catch((error) => {
          console.log("Error...");
        });
    }
  },
};

function Token() {
  const [value, setValue] = useState(1);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem("transactions")) || []
  );
  // console.log(transactions.length);

  const ethereumButton = useRef(null);

  useEffect(() => {
    ICO.init();
    connectToWallet(ethereumButton);

    var provider = new Web3.providers.WebsocketProvider(
      "wss://rinkeby.infura.io/ws/v3/d08eb4809d32405fb077572d83aedd8f"
    );
    var web3Infura = new Web3(provider);
    var tokenSaleContractInfura = new web3Infura.eth.Contract(
      ICO.worTokenSaleContractAbi,
      ICO.worTokenSaleContractAddr
    );
    // console.log(tokenSaleContractInfura)
    tokenSaleContractInfura.events.Sell(
      { filter: {}, fromBlock: "latest" },
      function (err, event) {
        if (err) {
          console.log(err);
        } else {
          console.log(event);
          setTransactions((prev) => {
            if (prev.length > 10) {
              localStorage.setItem(
                "transactions",
                JSON.stringify(
                  [
                    ...prev,
                    {
                      address: event.returnValues[0],
                      quantity: event.returnValues[1],
                    },
                  ].slice(1)
                )
              );
              return [
                ...prev,
                {
                  address: event.returnValues[0],
                  quantity: event.returnValues[1],
                },
              ].slice(1);
            } else {
              localStorage.setItem(
                "transactions",
                JSON.stringify([
                  ...prev,
                  {
                    address: event.returnValues[0],
                    quantity: event.returnValues[1],
                  },
                ])
              );
              return [
                ...prev,
                {
                  address: event.returnValues[0],
                  quantity: event.returnValues[1],
                },
              ];
            }
          });
          //   $("#tableList").append(
          //     `
          //   <tr className="rowTable">
          //     <td>` +
          //       event.returnValues[0] +
          //       `</td>
          //     <td>` +
          //       event.returnValues[1] +
          //       `</td>
          //   </tr>
          // `
          //   );
        }
      }
    );
  }, []);

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
        localStorage.removeItem("user_balance");
        setAccount("");
        setBalance(0);
        setIsConnected(false);
      } else if (accounts[0] !== ICO.currentAccount) {
        ICO.currentAccount = accounts[0];
        // console.log("In func: " + ICO.currentAccount)
        // document.querySelector(".showAccount").innerHTML = ICO.currentAccount;
        setAccount(ICO.currentAccount);
        setIsConnected(true);
        // console.log(ICO.currentAccount);
        // $("#after-connected").show();
        // $("#intro-price").hide();
        if (ICO.currentAccount !== "") {
          ICO.contracts.worTokenContract.methods
            .balanceOf(ICO.currentAccount)
            .call()
            .then(function (_balance) {
              // console.log(_balance)
              // currentBalance = _balance.toNumber();
              localStorage.setItem("user_balance", _balance);
              setBalance(_balance);
            });
        }
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
    ICO.currentAccount = "";

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

    // console.log(accounts[0])
    ICO.currentAccount = accounts[0];
  }

  return (
    <div>
      <Paper sx={{ height: "100vh" }}>
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
          src={require("../../assets/images/token/background.jpg").default}
        />
        <Container sx={{ pt: 3, position: "relative" }}>
          <Box>
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
              <Typography variant="h5" component="div" sx={{ mr: "20px" }}>
                WORMINATE
              </Typography>
            </Stack>
          </Box>
          <Box sx={{ marginTop: "170px" }}>
            <Grid container maxWidth="lg">
              <Grid item xs={8}>
                <Box sx={{ py: 7 }}>
                  <Typography
                    variant="h3"
                    sx={{
                      textTransform: "uppercase",
                      fontWeight: "800",
                      color: "#454545",
                    }}
                  >
                    Buy Btc, eth & bhc
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontSize: "40px", color: "#4d4a47" }}
                  >
                    Bitcoin is an invovate payment netword and a new kind of
                    money
                  </Typography>
                  <Link href="#main_part" sx={{ textDecoration: "none" }}>
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
                  src={require("../../assets/images/token/bitcoin.png").default}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Paper>
      <div id="main_part"></div>
      <div
        style={{
          width: "100vw",
          minHeight: "100vh",
          background: "#f5f8fb",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
            WORMINATE TOKENS SALE
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <Box
                sx={{
                  p: 3,
                  pr: 20,
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
                      src={require("../../assets/images/logo.png").default}
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
                        <span className="wor-balance">{balance}</span> WOR
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
                  <Typography sx={{ textTransform: "uppercase" }}>
                    USD
                  </Typography>
                  <Typography sx={{ textTransform: "uppercase" }}>
                    ETH
                  </Typography>
                  <Typography sx={{ textTransform: "uppercase" }}>
                    BTC
                  </Typography>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  p: 3,
                  pr: 20,
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
                  Demo Stage 4
                </Typography>
                <div>
                  <Typography variant="h6" id="intro-price">
                    1 WOR = <span className="token-price"></span> ETH
                  </Typography>
                  <Typography variant="subtitle2">
                    1 USD = 0.00002536 ETH
                  </Typography>
                </div>
                <form
                  onSubmit={(event) => {
                    ICO.buyTokens(event);
                    return false;
                  }}
                  name="buyForm"
                >
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="number"
                        id="numberOfTokens"
                        name="number"
                        value={value}
                        min={1}
                        pattern="[0-9]"
                        onChange={(e) => setValue(e.target.value)}
                      />
                      <span className="input-group-btn">
                        <button
                          className="btn btn-primary btn-lg"
                          type="submit"
                        >
                          Buy Tokens
                        </button>
                      </span>
                    </div>
                  </div>
                </form>
              </Box>
            </Grid>
            <Grid item xs={4}>
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
                  {isConnected && <Chip label="CONNECTED" color="secondary" />}
                  {!isConnected && <Chip label="INCONNECTED" color="error" />}
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
                  Connect to MetaMask
                </Button>
                <div>
                  {account && (
                    <>
                      <Typography variant="h5">Your account:</Typography>
                      <h4 className="showAccount">{account}</h4>
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
                        <TableCell>Address</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transactions.length ? (
                        transactions
                          .slice()
                          .reverse()
                          .map((e, index) => (
                            <TableRow key={index}>
                              <TableCell>{e.address}</TableCell>
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
                    ></Typography>
                  </Stack>
                  <Stack>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "14px", fontWeight: "500" }}
                    >
                      Total Token
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
                  value={balance / 10000000}
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
    </div>
  );
}

export default Token;
