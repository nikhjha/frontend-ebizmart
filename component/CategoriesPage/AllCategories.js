import Image from "next/image";
import React, { useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";

import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Switch,
  Button,
  IconButton,
  Input,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import DeleteDialogBox from "./DeleteDialogBox";
//
import { baseURL } from "../../libs/axiosClient";
import getFetch from "../../libs/axiosClient";
import { AuthContext } from "../../context/AuthProvider";

//Icons
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/DoneAllTwoTone";
import RevertIcon from "@mui/icons-material/NotInterestedOutlined";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const CustomTableCell = ({ row, name, isEditMode }) => {
  const [value, setValue] = useState(row[name]);
  return (
    <TableCell align="center">
      {isEditMode ? (
        <Input
          value={value}
          name={name}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};

const CustomToggle = ({ row, isEditMode }) => {
  const [isActive, setActive] = useState(row.isActive);

  return (
    <StyledTableCell align="center">
      {isEditMode ? (
        <>
          <input name="isActive" type="hidden" value={isActive}></input>
          <Switch
            checked={isActive}
            onChange={(e) => {
              setActive(e.target.checked);
            }}
          ></Switch>
        </>
      ) : (
        <Switch checked={row.isActive} disabled />
      )}
    </StyledTableCell>
  );
};

const CustomLogo = ({ row, isEditMode }) => {
  const img =
    row.logo.split("/")[0] === "uploads" ? `${baseURL}/${row.logo}` : row.logo
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);
  return (
    <StyledTableCell align="center">
      {isEditMode ? (
        <>
          <label>
            <Input
              sx={{ display: "none" }}
              accept="image/*"
              id="contained-button-file"
              type="file"
              name="logo"
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
            <Button variant="contained" component="span">
              Add Logo
            </Button>
            <div>
              {imageUrl && selectedImage && (
                <Box mt={2} textAlign="center">
                  <Image
                    src={imageUrl}
                    alt={selectedImage.name}
                    width={40}
                    height={40}
                  ></Image>
                </Box>
              )}
            </div>
          </label>
          <input type="hidden" name="url" value={imageUrl} />
        </>
      ) : (
        <Image src={img} alt="shop" width={40} height={40}></Image>
      )}
    </StyledTableCell>
  );
};

export default function AllCategories({ rows,setRows }) {
  // console.log(categories)
  const { user } = useContext(AuthContext)
  const [editing, setEditing] = useState(-1)

  const onToggleEditMode = (id) => {
    if (editing === id) {
      setEditing(-1);
      return;
    }
    setEditing(id);
  };

  const onSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = {
      name: formData.get("name"),
      logo: formData.get("logo"),
      isActive: formData.get("isActive"),
    };
    const url = formData.get("url");
    const newFormData = new FormData();
    newFormData.set("name", value.name);
    if (url !== "") {
      newFormData.set("logo", value.logo);
    }
    newFormData.set("isActive", value.isActive);
    if (user) {
      const res = await getFetch().patch(`/categories/${editing}`, newFormData);
      console.log(res);
    }
    const imageUrl = url !== "" ? { logo: url } : {};
    console.log(value, url);
    setRows([
      ...rows.map((row) => {
        if (row._id === editing) {
          return {
            ...row,
            name: value.name,
            ...imageUrl,
            isActive: value.isActive === "true",
          };
        }
        return row;
      }),
    ]);
    onToggleEditMode(editing);
  };

  const onRevert = (id) => {
    onToggleEditMode(id);
  };

  return (
    <div>
      <Box boxShadow={8}>
        <Box component="form" noValidation onSubmit={onSave}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">
                    Category Name
                  </StyledTableCell>
                  <StyledTableCell align="center">IsActive</StyledTableCell>
                  <StyledTableCell align="center">
                    Category Logo
                  </StyledTableCell>
                  <StyledTableCell align="center">Edit</StyledTableCell>
                  <StyledTableCell align="center">Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow
                    key={row._id}
                    sx={{
                      backgroundColor: row.isActive
                        ? "white"
                        : "rgba(255,20,147,0.2)",
                      ":hover": {
                        backgroundColor: row.isActive
                          ? "white"
                          : "rgba(255,20,147,0.2)",
                      },
                    }}
                  >
                    <CustomTableCell
                      {...{
                        row,
                        name: "name",
                        isEditMode: editing === row._id,
                      }}
                    ></CustomTableCell>
                    <CustomToggle row={row} isEditMode={editing === row._id} />
                    <CustomLogo row={row} isEditMode={editing === row._id} />
                    <StyledTableCell align="center">
                      {row._id === editing ? (
                        <>
                          <IconButton aria-label="done" type="submit">
                            <DoneIcon
                              style={{
                                color: "rgb(220, 50, 38)",
                                cursor: "pointer",
                              }}
                            />
                          </IconButton>

                          <IconButton
                            aria-label="revert"
                            onClick={() => onRevert(row._id)}
                          >
                            <RevertIcon
                              style={{
                                color: "rgb(220, 50, 38)",
                                cursor: "pointer",
                              }}
                            />
                          </IconButton>
                        </>
                      ) : (
                        <IconButton
                          aria-label="delete"
                          onClick={(e) => {
                            e.preventDefault();
                            onRevert(row._id);
                          }}
                        >
                          <EditIcon
                            style={{
                              color: "rgb(220, 50, 38)",
                              cursor: "pointer",
                            }}
                          />
                        </IconButton>
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <DeleteDialogBox id={row._id} setRows={setRows} />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </div>
  );
}
