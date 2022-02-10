import {
  IconButton,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Backdrop,
  CircularProgress,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Chip,
  Box,
  Avatar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { BiDollar } from "react-icons/bi";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import SellIcon from "@mui/icons-material/Sell";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import $ from "jquery";
import SnackbarCustom from "../../../components/SnackbarCustom";

function createData(a, b, c, d) {
  return { a, b, c, d };
}

const rows = [
  createData("1st Month Management Cost", 100, 300, 500),
  createData("Following Month", 300, 700, 900),
  createData("Delivery Time frame", 1, 3, 5),
  createData("Certificate", "No", "Yes", "Yes"),
];

const snackbarProps = {
  success: {
    severity: "success",
    message: "Push Post successfully. Thank you",
  },
  error: {
    severity: "error",
    message: "Opps! Something went wrong!!",
  },
};

function PostCard({
  post,
  id,
  type,
  setRecentPostsProp,
  setSoldPostsProp,
  setPostsProp,
}) {
  const [openPromotionDialog, setOpenPromotionDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const price = Math.floor(post.price * 100) / 100;
  // const [promptionalPlan, setPromptionalPlan] = useState(post?.promptionalPlan);

  // useEffect(() => {
  //   setPromptionalPlan(post?.promptionalPlan);
  // }, [post.promptionalPlan]);

  const [ICOState, setICOState] = useState({
    contracts: {},
    tokenPrice: "1000000000000000",
    tokensSold: 0,
    tokensAvailable: 10000000,
    admin: "",
    currentAccount: "",
    currentBalance: 0,
  });

  const [isConnected, setIsConnected] = useState(false);

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
            return { ...prev, admin: owner };
          });
        });
      contractsTmp.tokenSaleContract.methods
        .tokenPrice()
        .call()
        .then(function (_tokenPrice) {
          setICOState((prev) => {
            return { ...prev, tokenPrice: _tokenPrice };
          });
          $(".token-price").html(
            web3.utils.fromWei(ICOState.tokenPrice, "ether")
          );
        });
      contractsTmp.tokenSaleContract.methods
        .tokensSold()
        .call()
        .then(function (_tokenSold) {
          setICOState((prev) => {
            return { ...prev, tokensSold: _tokenSold };
          });
        });

      setICOState((prev) => {
        return { ...prev, contracts: contractsTmp };
      });
    },
  };

  const basicPlan = (event) => {
    if (ICOState.currentAccount.length === 0) {
      event.preventDefault();
      alert("Please connect to MetaMask");
    } else {
      event.preventDefault();
      setOpenBackdrop(true);
      ICOState.contracts.worTokenContract.methods
        .transfer(ICOState.admin, 1)
        .send({
          from: ICOState.currentAccount,
        })
        .then((result) => {
          console.log("Successfully registered for basic plan");
          ICOState.contracts.worTokenContract.methods
            .balanceOf(ICOState.currentAccount)
            .call()
            .then(function (_balance) {
              axios({
                method: "POST",
                url: `/posts/${post["_id"]}/promotion`,
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                data: { promotion: 1 },
              })
                .then((res) => {
                  setICOState((prev) => {
                    return { ...prev, currentBalance: _balance };
                  });
                  setSnackbarProps(snackbarProps.success);
                })
                .catch((error) => {
                  setSnackbarProps(snackbarProps.error);
                });
            });
        })
        .catch((error) => {
          setSnackbarProps(snackbarProps.error);
        })
        .finally(() => {
          setOpenPromotionDialog(false);
          setOpenBackdrop(false);
          setOpenSnackbar(true);
        });
    }
  };

  const handleBasicPlan = (event) => {
    if (isConnected) {
      basicPlan(event);
    } else {
      alert("Please connect to MetaMask");
    }
  };

  const plusPlan = (event) => {
    if (ICOState.currentAccount.length === 0) {
      event.preventDefault();
      alert("Please connect to MetaMask");
    } else {
      event.preventDefault();
      setOpenBackdrop(true);
      ICOState.contracts.worTokenContract.methods
        .transfer(ICOState.admin, 3)
        .send({
          from: ICOState.currentAccount,
        })
        .then((result) => {
          console.log("Successfully registered for plus plan");
          ICOState.contracts.worTokenContract.methods
            .balanceOf(ICOState.currentAccount)
            .call()
            .then(function (_balance) {
              axios({
                method: "POST",
                url: `/posts/${post["_id"]}/promotion`,
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                data: { promotion: 2 },
              })
                .then((res) => {
                  setICOState((prev) => {
                    return { ...prev, currentBalance: _balance };
                  });
                  setSnackbarProps(snackbarProps.success);
                })
                .catch((error) => {
                  setSnackbarProps(snackbarProps.error);
                });
            });
        })
        .catch((error) => {
          setSnackbarProps(snackbarProps.error);
        })
        .finally(() => {
          setOpenPromotionDialog(false);
          setOpenBackdrop(false);
          setOpenSnackbar(true);
        });
    }
  };

  const handlePlusPlan = (event) => {
    if (isConnected) {
      plusPlan(event);
    } else {
      alert("Please connect to MetaMask");
    }
  };

  const visionaryPlan = (event) => {
    if (ICOState.currentAccount.length === 0) {
      event.preventDefault();
      alert("Please connect to MetaMask");
    } else {
      event.preventDefault();
      setOpenBackdrop(true);
      ICOState.contracts.worTokenContract.methods
        .transfer(ICOState.admin, 5)
        .send({
          from: ICOState.currentAccount,
        })
        .then((result) => {
          console.log("Successfully registered for visionary plan");
          ICOState.contracts.worTokenContract.methods
            .balanceOf(ICOState.currentAccount)
            .call()
            .then(function (_balance) {
              axios({
                method: "POST",
                url: `/posts/${post["_id"]}/promotion`,
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                data: { promotion: "3" },
              })
                .then((res) => {
                  setICOState((prev) => {
                    return { ...prev, currentBalance: _balance };
                  });
                  setSnackbarProps(snackbarProps.success);
                })
                .catch((error) => {
                  setSnackbarProps(snackbarProps.error);
                });
            });
        })
        .catch((error) => {
          setSnackbarProps(snackbarProps.error);
        })
        .finally(() => {
          setOpenPromotionDialog(false);
          setOpenBackdrop(false);
          setOpenSnackbar(true);
        });
    }
  };

  const handleVisionaryPlan = (event) => {
    if (isConnected) {
      visionaryPlan(event);
    } else {
      alert("Please connect to MetaMask");
    }
  };

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
          return {
            ...prev,
            currentAccount: "",
            currentBalance: 0,
          };
        });
        setIsConnected(false);
      } else if (accounts[0] !== ICOState.currentAccount) {
        setICOState((prev) => {
          return { ...prev, currentAccount: accounts[0] };
        });
        if (accounts[0] !== "") {
          ICOState.contracts?.worTokenContract?.methods
            .balanceOf(accounts[0])
            .call()
            .then(function (_balance) {
              localStorage.setItem("user_balance", _balance);
              setICOState((prev) => {
                return { ...prev, currentBalance: _balance };
              });
            });
        }
        setIsConnected(true);
      }
    }

    // ethereumButton.current.addEventListener("click", connect);

    // function connect() {
    //   window.ethereum
    //     .request({ method: "eth_requestAccounts" })
    //     .then(handleAccountsChanged)
    //     .catch((err) => {
    //       if (err.code === 4001) {
    //         // EIP-1193 userRejectedRequest error
    //         // If this happens, the user rejected the connection request.
    //         console.log("Please connect to MetaMask.");
    //       } else {
    //         console.error(err);
    //       }
    //     });
    // }

    window.ethereum.on("disconnect", () => {
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

  useEffect(() => {
    if (type === "recent") {
      ICO.init();
    }
  }, []);

  useEffect(() => {
    if (type === "recent") {
      connectToWallet();
    }
  }, [ICOState.contracts]);

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarprops, setSnackbarProps] = React.useState({});

  return (
    <>
      <Card sx={{ maxWidth: 305, minHeight: 350 }} elevation={4}>
        <a
          href={`/posts/${post["_id"]}`}
          style={{
            textDecoration: "none",
            "&:hover": {
              backgroundColor: "#f5f8fb",
            },
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: 304, height: 160 }}
            image={
              post.images.length > 0
                ? post.images[0].path
                : "https://onlinecrm.vn/media/default.jpg"
            }
            alt="post image"
          />
          <CardContent sx={{ height: 114 }}>
            <Stack
              direction="row"
              alignItems={"center"}
              justifyContent="space-between"
            >
              <Typography
                variant="subtitle1"
                color="text.secondary"
                fontWeight="700"
              >
                {`Post #${id + 1}`}
              </Typography>
              <Box>
                <BiDollar
                  size={23}
                  color="#3b8767"
                  style={{ margin: "0px -3px 6.5px -4px" }}
                />
                <Typography
                  sx={{
                    fontSize: "20px",
                    display: "inline",
                    maxWidth: "30px",
                  }}
                  variant="subtitle1"
                  color="primary"
                  noWrap
                >
                  {post.price
                    ? `${parseFloat(price)}`
                    : post.price === 0
                    ? "0"
                    : "?"}
                </Typography>
              </Box>
            </Stack>
            <Typography variant="h6" color="textPrimary" noWrap>
              {post.title}
            </Typography>

            <Typography
              variant="subtitle1"
              paragraph
              color="text.secondary"
              noWrap
            >
              {post.description}
            </Typography>
          </CardContent>
        </a>
        <CardActions>
          {type !== "favorite" && type !== "all" && (
            <SpeedDial
              ariaLabel="SpeedDial menu"
              icon={<SpeedDialIcon />}
              direction="right"
              // onClose={handleClose}
              // onOpen={handleOpen}
              // open={open}
            >
              {type === "recent" && (
                <SpeedDialAction
                  key={1}
                  icon={
                    <IconButton
                      color="primary"
                      variant="outlined"
                      component={Link}
                      to={`/posts/${post["_id"]}/edit`}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#f5f8fb",
                          color: "primary",
                        },
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  }
                  tooltipTitle={"Edit"}
                  TooltipClasses={{ marginLeft: "-16px" }}
                />
              )}
              {type === "recent" && (
                <SpeedDialAction
                  key={2}
                  icon={
                    <IconButton
                      color="primary"
                      // variant="outlined"
                      sx={{ "&:hover": { backgroundColor: "#f5f8fb" } }}
                      onClick={() => {
                        axios({
                          method: "POST",
                          url: `/posts/${post["_id"]}/sale`,
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                              "token"
                            )}`,
                          },
                          data: {
                            sale: "false",
                          },
                        })
                          .then((res) => {
                            setRecentPostsProp((oldRecent) => [
                              ...oldRecent.filter((e) => e !== post),
                            ]);
                            setSoldPostsProp((oldSold) => [...oldSold, post]);
                          })
                          .catch((err) => console.log(err));
                      }}
                    >
                      <DoneIcon />
                    </IconButton>
                  }
                  tooltipTitle={"Mark as sold"}
                />
              )}
              {type === "recent" && (
                <SpeedDialAction
                  key={3}
                  icon={
                    <IconButton
                      color="primary"
                      sx={{ "&:hover": { backgroundColor: "#f5f8fb" } }}
                      onClick={() => {
                        setOpenDialog(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                  tooltipTitle={"Delete post"}
                />
              )}
              {type === "recent" && (
                <SpeedDialAction
                  key={4}
                  icon={
                    <Button
                      onClick={() => setOpenPromotionDialog(true)}
                      color="primary"
                      sx={{ "&:hover": { backgroundColor: "#f5f8fb" } }}
                      disabled={post?.promotionalPlan}
                    >
                      {post?.promotionalPlan ? (
                        post.promotionalPlan === 1 ? (
                          <Avatar sx={{ bgcolor: "orange" }}>B</Avatar>
                        ) : post.promotionalPlan === 2 ? (
                          <Avatar sx={{ bgcolor: "orange" }}>P</Avatar>
                        ) : post.promotionalPlan === 3 ? (
                          <Avatar sx={{ bgcolor: "orange" }}>V</Avatar>
                        ) : (
                          ""
                        )
                      ) : (
                        <LocalAtmIcon />
                      )}
                    </Button>
                  }
                  tooltipTitle={
                    post?.promotionalPlan
                      ? post.promotionalPlan === 1
                        ? "Basic Plan"
                        : post.promotionalPlan === 2
                        ? "Plus Plan"
                        : post.promotionalPlan === 3
                        ? "Visionary Plan"
                        : ""
                      : "Push Post"
                  }
                />
              )}
              {type === "sold" && (
                <SpeedDialAction
                  key={5}
                  icon={
                    <IconButton
                      color="primary"
                      sx={{ "&:hover": { backgroundColor: "#f5f8fb" } }}
                      onClick={() => {
                        axios({
                          method: "POST",
                          url: `/posts/${post["_id"]}/sale`,
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                              "token"
                            )}`,
                          },
                          data: {
                            sale: "true",
                          },
                        })
                          .then((res) => {
                            setSoldPostsProp((oldSold) => [
                              ...oldSold.filter((e) => e !== post),
                            ]);
                            setRecentPostsProp((oldRecent) => [
                              ...oldRecent,
                              post,
                            ]);
                          })
                          .catch((err) => console.log(err));
                      }}
                    >
                      <SellIcon />
                    </IconButton>
                  }
                  tooltipTitle={"Mark as for sale"}
                />
              )}
            </SpeedDial>
          )}
          {type === "all" && (
            <Chip
              size="medium"
              label={post.status ? "Recent" : "Sold"}
              color={post.status ? "primary" : "error"}
              sx={{ mt: 2 }}
            />
          )}
        </CardActions>
      </Card>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete this post?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once you delete it you will not be able to recover the post!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>No</Button>
          <Button
            onClick={() => {
              setOpenBackdrop(true);
              axios({
                method: "DELETE",
                url: `/posts/${post["_id"]}`,
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })
                .then((res) => {
                  setPostsProp((oldPosts) => [
                    ...oldPosts.filter((e) => e !== post),
                  ]);
                  setOpenBackdrop(false);
                })
                .catch((err) => {
                  alert(err);
                  setOpenBackdrop(false);
                });
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openPromotionDialog}
        onClose={() => setOpenPromotionDialog(false)}
        aria-labelledby="alert-promotion-title"
        aria-describedby="alert-promotion-description"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="alert-promotion-title">
          <Typography
            align="center"
            sx={{ fontSize: "28px", fontWeight: "bold" }}
          >
            Promotional Plans
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>COMPARE ALL PLANS</TableCell>
                  <TableCell align="center">BASIC</TableCell>
                  <TableCell align="center">PLUS</TableCell>
                  <TableCell align="center">VISIONARY</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.a}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.a}
                    </TableCell>
                    <TableCell align="center">{row.b}</TableCell>
                    <TableCell align="center">{row.c}</TableCell>
                    <TableCell align="center">{row.d}</TableCell>
                  </TableRow>
                ))}
                <TableRow
                  key="action"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {""}
                  </TableCell>
                  <TableCell align="center">
                    <Button onClick={handleBasicPlan}>Buy</Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button onClick={handlePlusPlan}>Buy</Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button onClick={handleVisionaryPlan}>Buy</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
      <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <SnackbarCustom
        openSnackbarProp={openSnackbar}
        setOpenSnackbarProp={(value) => {
          setOpenSnackbar(value);
        }}
        snackbarprops={snackbarprops}
      />
    </>
  );
}

export default PostCard;
