import {
  Box,
  Grid,
  Typography,
  Button,
  Rating,
  CssBaseline,
  Paper,
  Skeleton,
  Container,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Backdrop,
} from "@mui/material";

import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";

import React, { useState } from "react";
import Header from "../../components/Header";
import {
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Footer from "../../components/Footer";
import { useGetPostQuery } from "../../api/posts";
import { useEffect } from "react";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import Add from "@mui/icons-material/Add";
import { PersonAddAlt1, PersonRemoveAlt1 } from "@mui/icons-material";

import Heart from "react-animated-heart";
import { Link } from "react-router-dom";
import Map from "../../components/Map";

import Create_Edit_Post from "../Create_Edit_Post";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import PostCard from "../../components/PostCard";
import { BiDollar } from "react-icons/bi";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { FaMapMarkedAlt } from "react-icons/fa";
import Menu from "./Menu";

import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import $ from "jquery";
import SnackbarCustom from "../../components/SnackbarCustom";

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
    message: "Post was pushed successfully. Thank you",
  },
  error: {
    severity: "error",
    message: "Oops! Something went wrong!",
  },
};

function Detail() {
  const history = useHistory();
  let { url } = useRouteMatch();
  let { idPost } = useParams();
  const [status, setStatus] = useState(true);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [rating, setRating] = useState(null);
  const token = localStorage.getItem("token");
  const [comment, setComment] = useState("");
  const [newRating, setNewRating] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const [state, setState] = useState(0);
  const [reviewId, setReviewId] = useState("");
  const [reviewsScore, setReviewsScore] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [delLoading, setDelLoading] = useState(false);

  const { data, isLoading } = useGetPostQuery(`posts/${idPost}`);
  const images = data?.post.images.length
    ? data.post.images
    : [{ path: "https://www.viet247.net/images/noimage_food_viet247.jpg" }];
  let price;
  // const [authorId, setAuthorId] = useState("");
  if (data) price = Math.floor(data.post.price * 100) / 100;

  useEffect(() => {
    // if (data && data.post.images.length > 0) {
    //   setImage(data.post.images[0].path);
    // }
    if (data) {
      axios({
        method: "GET",
        url: `/user`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }).then((response) => {
        response.data.user.favoritesProduct.forEach((post) => {
          if (post._id === data.post._id) setIsHeartClicked(true);
        });
        response.data.user.manageFollowers.follow.forEach((user) => {
          if (user._id === data.post.author._id) setFollowing(true);
        });
      });

      data.post.reviews.forEach((review) => {
        if (review.author._id === localStorage.getItem("_id")) {
          setReviewed(true);
          setRating(review.rating);
          setComment(review.body);
          setReviewId(review._id);
        }
      });
      setReviewsScore(data.post.reviewsScore);
      setStatus(data.post.status);
    }
    //eslint-disable-next-line
  }, [data]);

  const [open, setOpen] = useState(false);
  const handleClickOpen = (value) => {
    if (value === 1) setState(1);
    else if (value === 2) setState(2);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openPromotionDialog, setOpenPromotionDialog] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);

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
                url: `/posts/${data.post._id}/promotion`,
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
                url: `/posts/${data.post._id}/promotion`,
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
                url: `/posts/${data.post._id}/promotion`,
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

    window.ethereum.on("disconnect", () => {
      localStorage.removeItem("user_balance");
    });
  }

  useEffect(() => {
    ICO.init();
  }, []);

  useEffect(() => {
    connectToWallet();
  }, [ICOState.contracts]);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarprops, setSnackbarProps] = React.useState({});

  return (
    <>
      <Switch>
        <Route path={`${url}/edit`}>
          {/* <Route path={`${url}/edit`} component={Create_Edit_Post}> */}
          <Create_Edit_Post post={data?.post} />
        </Route>
        <Route exact path={`${url}`}>
          <Box sx={{ backgroundColor: "#f5f8fb" }}>
            <CssBaseline />
            <Header />
            <Container maxWidth="lg">
              <Paper
                sx={{
                  mt: 4.5,
                  mb: 5,
                  ml: 1.5,
                  px: 2,
                  pt: 3,
                  pb: 3,
                  borderRadius: 3,
                }}
                elevation={4}
              >
                <Grid container>
                  <Grid item xs={1}>
                    <Box sx={{ mt: -0.3 }}>
                      <IconButton onClick={history.goBack}>
                        <ArrowBackIos
                          sx={{
                            ":hover": {
                              color: "primary.main",
                            },
                          }}
                        />
                      </IconButton>
                    </Box>
                  </Grid>
                  <Grid item xs={11} sx={{ ml: -4.4, pb: 2.2 }}>
                    <Grid container>
                      <Grid item xs={8}>
                        {isLoading ? (
                          <Skeleton
                            variant="text"
                            width="600px"
                            height="50px"
                            sx={{ mb: 0.5, ml: 0.2, mt: -1 }}
                          />
                        ) : (
                          <Grid container>
                            <Grid item xs={9}>
                              <Typography
                                variant="h4"
                                sx={{ mb: 0.5, ml: 0.2, mt: 0.2 }}
                              >
                                {data.post.title}
                              </Typography>
                            </Grid>
                            <Grid item>
                              {data.post.author._id ===
                                localStorage.getItem("_id") && (
                                <>
                                  {data.post.promotionalPlan > 0 && (
                                    <Button
                                      sx={{ mb: 0.5, ml: -14, mr: 2, mt: 0.1 }}
                                      variant="outlined"
                                      disableRipple
                                      disableElevation
                                      disableFocusRipple
                                      color="info"
                                    >
                                      {data.post.promotionalPlan === 1
                                        ? "Basic"
                                        : data.post.promotionalPlan === 2
                                        ? "Plus"
                                        : "Visionary"}
                                    </Button>
                                  )}
                                  {status ? (
                                    <Button
                                      sx={{
                                        mb: 0.5,
                                        ml: 0,
                                        mt: 0.1,
                                        width: "90px",
                                      }}
                                      variant="outlined"
                                      disableRipple
                                      disableElevation
                                      disableFocusRipple
                                    >
                                      For sale
                                    </Button>
                                  ) : (
                                    <Button
                                      sx={{ mb: 0.5, ml: 0.8, mt: 0.1 }}
                                      variant="outlined"
                                      disableRipple
                                      disableElevation
                                      disableFocusRipple
                                      color="error"
                                    >
                                      Sold
                                    </Button>
                                  )}
                                </>
                              )}
                            </Grid>
                          </Grid>
                        )}
                        {isLoading ? (
                          <Skeleton
                            variant="text"
                            width="165px"
                            height="50px"
                            sx={{ mb: 1, mt: -1 }}
                          />
                        ) : (
                          <>
                            <Box sx={{ ml: -0.3 }}>
                              <Rating
                                value={reviewsScore}
                                readOnly
                                size="large"
                              />
                            </Box>
                          </>
                        )}
                      </Grid>
                      <Grid item xs={3} sx={{ mt: 0.3, ml: -0.5 }}>
                        <Typography
                          variant="body1"
                          sx={{
                            color: "rgb(170,183,199)",
                            fontSize: 22,
                          }}
                        >
                          Price
                        </Typography>
                        {isLoading ? (
                          <Skeleton
                            variant="text"
                            width="200px"
                            height="50px"
                          />
                        ) : (
                          <>
                            {" "}
                            <BiDollar
                              size={26}
                              color="#3b8767"
                              style={{
                                margin: "0px -3px 9px -6px",
                              }}
                            />
                            <Typography
                              variant="h4"
                              color="primary"
                              noWrap
                              sx={{
                                fontWeight: 580,
                                display: "inline",
                              }}
                            >
                              {price}
                            </Typography>
                          </>
                        )}
                      </Grid>
                      {/* <Grid item xs={2} sx={{ mt: 0.3 }}> */}
                      {token &&
                        localStorage.getItem("isAdmin") === "false" &&
                        !isLoading &&
                        localStorage.getItem("_id") !==
                          data.post.author._id && (
                          // <Box
                          //   sx={{
                          //     position: "absolute",
                          //     top: "14.6%",
                          //     left: "81.1%",
                          //   }}
                          // >
                          <Grid item xs={1} sx={{ pl: 2 }}>
                            <div
                              style={{
                                marginTop: -33,
                                marginLeft: -35,
                              }}
                            >
                              <Heart
                                isClick={isHeartClicked}
                                onClick={() => {
                                  const id = data.post._id;
                                  if (isHeartClicked) {
                                    axios({
                                      method: "DELETE",
                                      url: `posts/favorite`,
                                      headers: {
                                        Authorization: `Bearer ${token}`,
                                      },
                                      data: {
                                        id,
                                      },
                                    })
                                      .then((response) => {
                                        setSnackbarProps({
                                          severity: "success",
                                          message:
                                            "Deleted from favorite posts",
                                        });
                                        setOpenSnackbar(true);
                                      })
                                      .catch((err) => {
                                        setSnackbarProps({
                                          severity: "error",
                                          message:
                                            "Failed to delete from favorite posts",
                                        });
                                        setOpenSnackbar(true);
                                      });
                                  } else {
                                    axios({
                                      method: "POST",
                                      url: `posts/favorite`,
                                      headers: {
                                        Authorization: `Bearer ${token}`,
                                      },
                                      data: {
                                        id,
                                      },
                                    })
                                      .then((response) => {
                                        setSnackbarProps({
                                          severity: "success",
                                          message: "Saved to favorite posts",
                                        });
                                        setOpenSnackbar(true);
                                      })
                                      .catch((err) => {
                                        setSnackbarProps({
                                          severity: "error",
                                          message:
                                            "Failed to save to favorite posts",
                                        });
                                        setOpenSnackbar(true);
                                      });
                                  }
                                  setIsHeartClicked(!isHeartClicked);
                                }}
                              />
                            </div>
                          </Grid>
                        )}
                      {!isLoading &&
                        localStorage.getItem("_id") ===
                          data.post.author._id && (
                          <Grid item xs={1} sx={{ pl: 2 }}>
                            <Menu
                              status={status}
                              setStatus={setStatus}
                              idPost={idPost}
                              token={token}
                              url={url}
                              setOpenPromotionDialog={setOpenPromotionDialog}
                              promotionalPlan={data.post.promotionalPlan}
                            />
                          </Grid>
                        )}
                      {!isLoading &&
                        localStorage.getItem("isAdmin") === "true" && (
                          <>
                            <Grid item xs={1} sx={{ mt: -0.5, pl: 1 }}>
                              <IconButton size="large">
                                <Delete
                                  fontSize="inherit"
                                  sx={{
                                    ":hover": {
                                      color: "primary.main",
                                    },
                                  }}
                                  onClick={() => {
                                    setOpenDialog(true);
                                  }}
                                />
                              </IconButton>
                            </Grid>
                            <Dialog open={openDialog} sx={{ borderRadius: 3 }}>
                              <DialogTitle>
                                <Typography variant="h4" sx={{}}>
                                  Delete post
                                </Typography>
                              </DialogTitle>
                              <DialogContent>
                                <Typography variant="subtitle1" sx={{}}>
                                  Do you really want to delete this post?
                                </Typography>
                              </DialogContent>
                              <DialogActions>
                                {delLoading ? (
                                  <Box sx={{ px: 3, mt: 1 }}>
                                    <CircularProgress size={20} />
                                  </Box>
                                ) : (
                                  <>
                                    <Button
                                      onClick={() => {
                                        setOpenDialog(false);
                                      }}
                                    >
                                      No
                                    </Button>
                                    <Button
                                      onClick={() => {
                                        setDelLoading(true);
                                        axios({
                                          method: "DELETE",
                                          url: `admin/posts`,
                                          headers: {
                                            Authorization: `Bearer ${token}`,
                                          },
                                          data: { id: idPost },
                                        }).then((response) => {
                                          history.goBack();
                                        });
                                      }}
                                    >
                                      Yes
                                    </Button>
                                  </>
                                )}
                              </DialogActions>
                            </Dialog>
                          </>
                        )}
                    </Grid>
                  </Grid>
                  <Grid item xs={8}>
                    {isLoading ? (
                      <Box
                        sx={{
                          ml: 7,
                          mt: -1,
                          width: 300,
                        }}
                      >
                        <Skeleton
                          variant="retangular"
                          height="388px"
                          width="600px"
                          style={{ borderRadius: 6 }}
                        />
                      </Box>
                    ) : (
                      <Box sx={{ ml: 6, mt: -1 }}>
                        <SimpleReactLightbox>
                          <SRLWrapper>
                            {images.length > 1 ? (
                              <Splide
                                options={{
                                  width: 610,
                                  height: 400,
                                  perPage: 1,
                                  pagination: false,
                                  // focus: "center",
                                }}
                              >
                                {images.map((image, i) => (
                                  <SplideSlide>
                                    {" "}
                                    <Box
                                      sx={{
                                        width: 600,
                                        height: 388,
                                        ml: 0.7,
                                        mr: 1.8,
                                        borderRadius: 3,
                                        objectFit: "cover",
                                        boxShadow:
                                          "0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1.5px 5px 0 rgba(0, 0, 0, 0.19)",
                                      }}
                                      component="img"
                                      src={image.path}
                                      alt=""
                                      // onClick={() => setImage(image.path)}
                                    />
                                  </SplideSlide>
                                ))}
                              </Splide>
                            ) : (
                              <Box
                                sx={{
                                  width: 600,
                                  height: 388,
                                  ml: 0.7,
                                  mr: 1.8,
                                  borderRadius: 3,
                                  objectFit: "cover",
                                  boxShadow:
                                    "0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1.5px 5px 0 rgba(0, 0, 0, 0.19)",
                                }}
                                component="img"
                                src={images[0].path}
                                alt=""
                              />
                            )}
                          </SRLWrapper>
                        </SimpleReactLightbox>
                      </Box>
                    )}
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container>
                      <Grid item>
                        {isLoading ? (
                          <Box
                            sx={{
                              pb: 0.5,
                              position: "relative",
                              top: "-0.6%",
                              left: "3%",
                              width: 460,
                              borderRadius: 3,
                            }}
                          >
                            <Skeleton
                              variant="retangular"
                              width="315px"
                              height="285px"
                              sx={{ ml: -3.1, mt: -0.4 }}
                            />
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              mt: -1,
                              ml: -1.3,
                              width: 350,
                            }}
                          >
                            <Map
                              posts={[data.post]}
                              location={data.post.geometry.coordinates}
                              height="300px"
                              zoom={12.5}
                            />
                          </Box>
                        )}
                      </Grid>
                      <Grid item sx={{ mt: 1.3 }}>
                        <Grid container>
                          <Grid item xs={4}>
                            <Box sx={{ mt: 0.75, ml: -1.2 }}>
                              {" "}
                              <Typography
                                variant="body1"
                                sx={{
                                  color: "rgb(170,183,199)",
                                  fontSize: 24,
                                }}
                              >
                                Location
                              </Typography>
                            </Box>
                          </Grid>
                          {!isLoading && (
                            <Grid item xs={8}>
                              <Box>
                                <a
                                  href={`https://www.google.com/maps/search/${data.post.location}/${data.post.geometry.coordinates[1]},${data.post.geometry.coordinates[0]}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    textDecoration: "none",
                                    color: "white",
                                  }}
                                >
                                  <Button
                                    startIcon={<FaMapMarkedAlt />}
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    sx={{ mt: 1, ml: 8 }}
                                  >
                                    Google map
                                  </Button>
                                  {/* <Button
                                    startIcon={}
                                    variant="contained"
                                    size="small"
                                  >
                                    Google map
                                  </Button> */}
                                </a>
                              </Box>
                            </Grid>
                          )}
                          {isLoading ? (
                            <Skeleton
                              variant="text"
                              width="200px"
                              height="40px"
                              sx={{ ml: -1.3 }}
                            />
                          ) : (
                            <Typography
                              sx={{ mt: 1, ml: -1.2, fontSize: "17px" }}
                            >
                              {data.post.location}{" "}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={7} sx={{ ml: 12.3, mb: 3, mt: 1 }}>
                    {isLoading ? (
                      <Skeleton
                        variant="retangular"
                        width="500px"
                        height="75px"
                        sx={{ ml: 0.5, mt: 1.5 }}
                      />
                    ) : (
                      <>
                        <SimpleReactLightbox>
                          <SRLWrapper>
                            <Splide
                              options={{
                                width: 500,
                                height: 80,
                                perPage: 5,
                                pagination: false,
                                focus: "center",
                              }}
                            >
                              {images.map((image, i) => (
                                <SplideSlide>
                                  {" "}
                                  <Box
                                    sx={{
                                      width: 75,
                                      height: 75,
                                      ml: 1.6,
                                      mr: 1,
                                      borderRadius: 3,
                                      objectFit: "cover",
                                      boxShadow:
                                        "0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1.5px 5px 0 rgba(0, 0, 0, 0.19)",
                                    }}
                                    component="img"
                                    src={image.path}
                                    alt=""
                                    // onClick={() => setImage(image.path)}
                                  />
                                </SplideSlide>
                              ))}
                            </Splide>
                          </SRLWrapper>
                        </SimpleReactLightbox>
                      </>
                    )}
                  </Grid>

                  <Grid item sx={{ mt: 1.5, ml: -2 }}>
                    <Typography
                      variant="body1"
                      sx={{ color: "rgb(170,183,199)", fontSize: 24 }}
                    >
                      Category
                    </Typography>
                    {isLoading ? (
                      <Skeleton variant="text" width="200px" height="40px" />
                    ) : (
                      <Typography sx={{ mt: 0.7, fontSize: "17px" }}>
                        {data.post.category.name}
                      </Typography>
                    )}
                  </Grid>

                  <Grid item xs={12} sx={{ mt: 2, ml: 7 }}>
                    <Typography
                      variant="body1"
                      sx={{ color: "rgb(170,183,199)", fontSize: 22 }}
                    >
                      Author
                    </Typography>
                    {isLoading ? (
                      <Skeleton variant="text" width="200px" height="40px" />
                    ) : (
                      <Grid container sx={{ mt: 1 }}>
                        <Grid item>
                          {" "}
                          <Link
                            to={`/profile/${data.post.author._id}`}
                            style={{ textDecoration: "none" }}
                          >
                            {" "}
                            <IconButton>
                              {" "}
                              <Avatar
                                src={data.post.author.image.path}
                                sx={{ display: "flex", ml: -0.8 }}
                              />
                            </IconButton>
                          </Link>
                        </Grid>
                        <Grid item sx={{ mt: 1.8, ml: 1 }}>
                          <Typography variant="subtitle1">
                            {data.post.author.fullName}
                          </Typography>
                        </Grid>
                        <Grid item sx={{ ml: 2, mt: 0.4 }}>
                          {token &&
                            localStorage.getItem("isAdmin") === "false" &&
                            data.post.author._id !==
                              localStorage.getItem("_id") &&
                            (following ? (
                              <Button
                                startIcon={
                                  <PersonRemoveAlt1 sx={{ mb: 0.5 }} />
                                }
                                variant="outlined"
                                color="error"
                                size="small"
                                sx={{ mt: 1 }}
                                onClick={() => {
                                  axios({
                                    method: "DELETE",
                                    url: "/user/followers",
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                    data: { userId: data.post.author._id },
                                  })
                                    .then(() => {
                                      setFollowing(false);
                                      setSnackbarProps({
                                        severity: "success",
                                        message: "Unfollowed user successfully",
                                      });
                                      setOpenSnackbar(true);
                                    })
                                    .catch(() => {
                                      setSnackbarProps({
                                        severity: "error",
                                        message: "Failed to unfollow user",
                                      });
                                      setOpenSnackbar(true);
                                    });
                                }}
                              >
                                Unfollow
                              </Button>
                            ) : (
                              <Button
                                startIcon={<PersonAddAlt1 sx={{ mb: 0.5 }} />}
                                variant="outlined"
                                color="primary"
                                size="small"
                                sx={{ mt: 1 }}
                                onClick={() => {
                                  axios({
                                    method: "POST",
                                    url: "/user/followers",
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                    data: { userId: data.post.author._id },
                                  })
                                    .then(() => {
                                      setFollowing(true);
                                      setSnackbarProps({
                                        severity: "success",
                                        message: "Followed user successfully",
                                      });
                                      setOpenSnackbar(true);
                                    })
                                    .catch(() => {
                                      setSnackbarProps({
                                        severity: "error",
                                        message: "Failed to follow user",
                                      });
                                      setOpenSnackbar(true);
                                    });
                                }}
                              >
                                Follow
                              </Button>
                            ))}
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={12} sx={{ mx: 7, mt: 3 }}>
                    <Grid container spacing={2}></Grid>

                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgb(170,183,199)",
                        mt: 2,
                        mb: 1,

                        fontSize: 20,
                      }}
                    >
                      Description
                    </Typography>
                    {isLoading ? (
                      <Skeleton
                        variant="retangular"
                        width="990px"
                        height="300px"
                      />
                    ) : (
                      data.post.description
                        .split("\n")
                        .map((line) => (
                          <Typography sx={{ width: 990 }}>{line}</Typography>
                        ))
                    )}
                  </Grid>
                </Grid>
              </Paper>
              <Paper
                sx={{
                  mt: 2.5,
                  mb: 5,
                  ml: 1.5,
                  px: 2,
                  pt: 3,

                  borderRadius: 3,
                }}
                elevation={4}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 1, ml: 7.2, display: "inline" }}
                >
                  Reviews
                </Typography>

                {loading && (
                  <Box sx={{ px: 3, mt: 1 }} component="span">
                    <CircularProgress size={20} />
                  </Box>
                )}

                {token &&
                  localStorage.getItem("isAdmin") === "false" &&
                  !isLoading &&
                  !reviewed &&
                  !loading && (
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={handleClickOpen}
                      sx={{ ml: 3, mt: -1.3 }}
                    >
                      <Add sx={{}} />
                    </IconButton>
                  )}
                {!isLoading && !reviewed && data.post.reviews.length === 0 && (
                  <Typography variant="body1" sx={{ mt: 3, mb: -3, ml: 7.25 }}>
                    No Reviews
                  </Typography>
                )}

                <Dialog
                  open={open}
                  onClose={handleClose}
                  sx={{ borderRadius: 3 }}
                >
                  <DialogTitle>
                    {state === 0 ? "Add " : state === 1 ? "Edit " : "Delete "} a
                    review
                  </DialogTitle>
                  <DialogContent>
                    <Typography variant="subtitle1" sx={{}}>
                      Rating
                    </Typography>
                    <Rating
                      sx={{ ml: -0.3 }}
                      value={newRating}
                      readOnly={state === 2 ? true : false}
                      onChange={(event, newValue) => setNewRating(newValue)}
                    />
                    <Typography variant="subtitle1" sx={{}}>
                      Comment
                    </Typography>
                    <TextField
                      sx={{ width: 500 }}
                      autoFocus
                      margin="dense"
                      fullWidth
                      multiline
                      rows={8}
                      // maxRows={8}
                      placeholder=""
                      value={newComment}
                      disabled={state === 2 ? true : false}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    {loading ? (
                      <Box sx={{ px: 3, mt: 1 }}>
                        <CircularProgress size={20} />
                      </Box>
                    ) : (
                      <>
                        <Button onClick={handleClose}>Cancel</Button>
                        {!reviewed && (
                          <Button
                            onClick={() => {
                              handleClose();
                              setLoading(true);
                              axios({
                                method: "POST",
                                url: `posts/${idPost}/reviews`,
                                headers: { Authorization: `Bearer ${token}` },
                                data: {
                                  review: {
                                    body: newComment,
                                    rating: newRating,
                                  },
                                },
                              })
                                .then(({ data }) => {
                                  setLoading(false);
                                  setRating(newRating);
                                  setComment(newComment);
                                  setReviewId(data.id);
                                  setReviewsScore(data.reviewsScore);
                                  setReviewed(true);
                                  setSnackbarProps({
                                    severity: "success",
                                    message: "Added review successfully",
                                  });
                                  setOpenSnackbar(true);
                                })
                                .catch((err) => {
                                  setLoading(false);
                                  setSnackbarProps({
                                    severity: "error",
                                    message: "Failed to add review",
                                  });
                                  setOpenSnackbar(true);
                                });
                            }}
                          >
                            Add
                          </Button>
                        )}
                        {reviewed && state === 1 && (
                          <Button
                            onClick={() => {
                              handleClose();
                              setLoading(true);
                              axios({
                                method: "PUT",
                                url: `posts/${idPost}/reviews/${reviewId}`,
                                headers: { Authorization: `Bearer ${token}` },
                                data: {
                                  review: {
                                    body: newComment,
                                    rating: newRating,
                                  },
                                },
                              })
                                .then(({ data }) => {
                                  setState(0);
                                  setLoading(false);
                                  setRating(newRating);
                                  setComment(newComment);

                                  setReviewsScore(data.reviewsScore);
                                  setSnackbarProps({
                                    severity: "success",
                                    message: "Edited review successfully",
                                  });
                                  setOpenSnackbar(true);
                                })
                                .catch((err) => {
                                  setLoading(false);
                                  setSnackbarProps({
                                    severity: "error",
                                    message: "Failed to edit review",
                                  });
                                  setOpenSnackbar(true);
                                });
                            }}
                          >
                            Edit
                          </Button>
                        )}
                        {reviewed && state === 2 && (
                          <Button
                            onClick={() => {
                              handleClose();
                              setLoading(true);
                              axios({
                                method: "DELETE",
                                url: `posts/${idPost}/reviews/${reviewId}`,
                                headers: { Authorization: `Bearer ${token}` },
                                data: {
                                  review: {},
                                },
                              })
                                .then(({ data }) => {
                                  setState(0);
                                  setLoading(false);
                                  setNewRating(null);
                                  setNewComment("");
                                  setReviewsScore(data.reviewsScore);
                                  setReviewed(false);
                                  setSnackbarProps({
                                    severity: "success",
                                    message: "Deleted review successfully",
                                  });
                                  setOpenSnackbar(true);
                                })
                                .catch((err) => {
                                  setLoading(false);
                                  setSnackbarProps({
                                    severity: "error",
                                    message: "Failed to delete review",
                                  });
                                  setOpenSnackbar(true);
                                });
                            }}
                          >
                            Delete
                          </Button>
                        )}
                      </>
                    )}
                  </DialogActions>
                </Dialog>
                {isLoading ? (
                  <Box sx={{ ml: 7, mt: 3, mb: 1 }}>
                    {" "}
                    <Skeleton
                      variant="retangular"
                      width="990px"
                      height="300px"
                    />
                  </Box>
                ) : (
                  <Box sx={{ pb: 5, mx: 6, mt: 2.5 }}>
                    {reviewed && (
                      <Paper
                        elevation={3}
                        sx={{
                          borderRadius: 3,
                          width: "100%",
                          p: 2,
                          pb: 0.5,
                          mb: 3,
                        }}
                      >
                        <Grid container spacing={0}>
                          <Grid item sx={{ ml: 1.5 }}>
                            <Stack>
                              <IconButton sx={{ mt: -0.7 }}>
                                <Avatar src={localStorage.getItem("avatar")} />
                              </IconButton>
                            </Stack>
                          </Grid>
                          <Grid item xs={10}>
                            <Box sx={{}}>
                              {" "}
                              <Typography
                                variant="subtitle1"
                                sx={{ mb: 1, ml: 0.7, mt: 1.1 }}
                              >
                                {localStorage.getItem("UserName")}
                              </Typography>
                              <Rating
                                readOnly
                                size="small"
                                value={rating}
                                sx={{ mb: 1, ml: 0.5 }}
                              />
                              <Typography
                                variant="body1"
                                sx={{ mb: 1, ml: 0.8 }}
                              >
                                {comment}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item display="flex" justifyContent="right">
                            {" "}
                            <Stack spacing={0} sx={{ mt: 0 }} direction="row">
                              <IconButton sx={{ height: 45 }}>
                                <Edit
                                  color="primary"
                                  onClick={() => {
                                    setNewRating(rating);
                                    setNewComment(comment);
                                    setState(1);
                                    setOpen(true);
                                  }}
                                />
                              </IconButton>
                              <IconButton sx={{ height: 45 }}>
                                <Delete
                                  color="primary"
                                  onClick={() => {
                                    setNewRating(rating);
                                    setNewComment(comment);
                                    setState(2);
                                    setOpen(true);
                                  }}
                                />
                              </IconButton>
                            </Stack>
                          </Grid>
                        </Grid>
                      </Paper>
                    )}
                    {data.post.reviews.map(
                      (review, i) =>
                        review.author._id !== localStorage.getItem("_id") && (
                          <Paper
                            elevation={3}
                            sx={{
                              borderRadius: 3,
                              width: "100%",
                              px: 2,
                              pt: 2.5,
                              pb: 0.5,
                              mb: 3,
                            }}
                          >
                            <Grid container spacing={0}>
                              <Grid item sx={{ ml: 1.5 }}>
                                <Stack>
                                  <Link
                                    to={`/profile/${review.author._id}`}
                                    style={{ textDecoration: "none" }}
                                  >
                                    {" "}
                                    <IconButton sx={{ mt: -0.7 }}>
                                      <Avatar src={review.author.image.path} />
                                    </IconButton>
                                  </Link>
                                </Stack>
                              </Grid>
                              <Grid item xs={10}>
                                <Box sx={{}}>
                                  {" "}
                                  <Typography
                                    variant="subtitle1"
                                    sx={{ mb: 1, ml: 0.7, mt: 1.1 }}
                                  >
                                    {review.author.fullName}
                                  </Typography>
                                  <Rating
                                    readOnly
                                    size="small"
                                    value={review.rating}
                                    sx={{ mb: 1, ml: 0.5 }}
                                  />
                                  <Typography
                                    variant="body1"
                                    sx={{ mb: 1, ml: 0.8 }}
                                  >
                                    {review.body}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Paper>
                        )
                    )}
                  </Box>
                )}
              </Paper>
              <Paper
                sx={{
                  mt: 2.5,
                  mb: 5,
                  ml: 1.5,
                  px: 2,
                  pt: 3,

                  borderRadius: 3,
                }}
                elevation={4}
              >
                <Typography variant="h6" sx={{ mb: 1, ml: 7.6 }}>
                  Related Posts
                </Typography>
                {isLoading ? (
                  <Box sx={{ ml: 7, mt: 3, mb: 1 }}>
                    {" "}
                    <Skeleton
                      variant="retangular"
                      width="990px"
                      height="300px"
                    />
                  </Box>
                ) : !isLoading && data.relatedPost.length === 0 ? (
                  <Typography
                    variant="body1"
                    sx={{ pb: 4.6, ml: 7.5, mt: 2.5 }}
                  >
                    No Related Posts
                  </Typography>
                ) : (
                  <Box sx={{ pb: 5, mx: 6, mt: 2.5 }}>
                    <Splide
                      options={{
                        height: 333,
                        width: 1000,
                        perPage: 4,
                        pagination: false,
                        // focus: "center",
                      }}
                    >
                      {data.relatedPost.map((post, i) => (
                        <SplideSlide>
                          <Box sx={{ ml: 1.5, mr: 4 }}>
                            <PostCard key={i} post={post} />
                          </Box>
                        </SplideSlide>
                      ))}
                    </Splide>{" "}
                  </Box>
                )}
              </Paper>
            </Container>
            <Footer />
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
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
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
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
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
          </Box>
        </Route>
      </Switch>
    </>
  );
}

export default Detail;
