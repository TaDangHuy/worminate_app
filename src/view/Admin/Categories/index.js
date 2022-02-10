import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import SnackbarCustom from "../../../components/SnackbarCustom";

function Categories() {
  const token = localStorage.getItem("token");
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(0);
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarprops, setSnackbarProps] = useState({});

  useEffect(() => {
    axios({
      method: "GET",
      url: `posts/new`,
      headers: { Authorization: `Bearer ${token}` },
      data: {},
    }).then(({ data }) => {
      setCategories(data.category);
    });
    //eslint-disable-next-line
  }, []);

  const addCategory = (id, name) => {
    setCategories([...categories, { _id: id, name: name }]);
  };

  const editCategory = (id, name) => {
    setCategories([
      ...categories.filter((category) => category._id !== id),
      { _id: id, name: name },
    ]);
  };

  return (
    <Container sx={{ pl: 10 }}>
      {categories.length !== 0 && (
        <Paper elevation={4} sx={{ width: "fit-content", mt: 5, mb: 2, ml: 1 }}>
          <Button
            color="primary"
            variant="contained"
            startIcon={<Add sx={{ mb: 0.2 }} />}
            sx={{ px: 2, py: 1.3 }}
            onClick={() => {
              setState(0);
              setCategory("");
              setOpenDialog(true);
            }}
          >
            Add new category
          </Button>{" "}
        </Paper>
      )}

      {categories.map((category) => {
        return (
          <Paper
            elevation={4}
            sx={{ width: "fit-content", m: 1, display: "inline-block" }}
          >
            {" "}
            <Button
              sx={{
                px: 2,
                py: 1.3,
                textTransform: "none",
              }}
              onClick={() => {
                setState(1);
                setCategory(category.name);
                setCategoryId(category._id);
                setOpenDialog(true);
              }}
            >
              <Typography
                color="#111"
                sx={{
                  ":hover": {
                    color: "primary.main",
                  },
                }}
              >
                {category.name}
              </Typography>{" "}
            </Button>{" "}
          </Paper>
        );
      })}
      {categories.length === 0 ? (
        <Box sx={{ height: "52.65vh" }} />
      ) : (
        <Box sx={{ height: "22.8vh" }} />
      )}
      <Dialog open={openDialog} sx={{ borderRadius: 3 }}>
        <DialogTitle>{state === 0 ? "Add new " : "Edit "} category</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ width: 500 }}
            autoFocus
            margin="dense"
            fullWidth
            multiline
            rows={1}
            placeholder=""
            value={category}
            disabled={loading ? true : false}
            onChange={(e) => setCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          {loading ? (
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
                Cancel
              </Button>
              {state === 0 ? (
                <Button
                  onClick={() => {
                    setLoading(true);
                    axios({
                      method: "POST",
                      url: `admin/categories`,
                      headers: { Authorization: `Bearer ${token}` },
                      data: { name: category },
                    })
                      .then((response) => {
                        addCategory(response.data._id, category);
                        setLoading(false);
                        setOpenDialog(false);
                        setSnackbarProps({
                          severity: "success",
                          message: "New category was added successfully",
                        });
                        setOpenSnackbar(true);
                      })
                      .catch((error) => {
                        setLoading(false);
                        setOpenDialog(false);
                        setSnackbarProps({
                          severity: "error",
                          message: "Can not add this category",
                        });
                        setOpenSnackbar(true);
                      });
                  }}
                >
                  Add
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setLoading(true);
                    axios({
                      method: "PUT",
                      url: `admin/categories/${categoryId}`,
                      headers: { Authorization: `Bearer ${token}` },
                      data: { name: category },
                    })
                      .then((response) => {
                        editCategory(categoryId, category);
                        setLoading(false);
                        setOpenDialog(false);
                        setSnackbarProps({
                          severity: "success",
                          message: "This category was edited successfully",
                        });
                        setOpenSnackbar(true);
                      })
                      .catch((error) => {
                        setLoading(false);
                        setOpenDialog(false);
                        setSnackbarProps({
                          severity: "error",
                          message: "Can not edit this category",
                        });
                        setOpenSnackbar(true);
                      });
                  }}
                >
                  Edit
                </Button>
              )}
            </>
          )}
        </DialogActions>
      </Dialog>
      <SnackbarCustom
        openSnackbarProp={openSnackbar}
        setOpenSnackbarProp={(value) => {
          setOpenSnackbar(value);
        }}
        snackbarprops={snackbarprops}
      />
    </Container>
  );
}

export default Categories;
