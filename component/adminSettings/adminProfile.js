import React, { useEffect, useState, useRef, useContext } from "react";
import {
  Box,
  Stack,
  Container,
  Paper,
  Button,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import {
  inputTypes,
  formContentType,
  requestType,
  user as userConst,
} from "../../constant/constant";
import InputHelper from "../utility/InputHelper";
import useForm from "../../hooks/useForm";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import ConfirmModal from "../utility/ConfirmModal";
import { LoadingButton } from "@mui/lab";
import getFetch from "../../libs/axiosClient";
import { UserDataContext } from "../../context/UserDataProvider";
import { AuthContext } from "../../context/AuthProvider";

const DeleteAccountPopup = ({ open, setOpen, phone }) => {
  const [loading, setLoading] = useState(true);
  const [otp, setOtp] = useState("");
  const hash = useRef();
  const { user } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    const sendRequest = async () => {
      console.log(phone);
      const res = await getFetch().post("/sendOTP", { phone: "+91" + phone });
      console.log(res);
      hash.current = res.data.hash;
      setLoading(false);
    };
    if (open && !!phone) {
      setLoading(true);
      sendRequest();
    }
  }, [open, phone]);
  const handleClose = () => {
    setLoading(false);
    setOpen(false);
  };
  const handleSubmit = async () => {
    if (!loading && hash.current) {
      try {
        const res = await getFetch().delete(`/admin/${user.id}`, {
          data: {
            otp: otp,
            hash: hash.current,
            phone: "+91" + phone,
          },
        });
        router.push("/admin/login");
      } catch (e) {
        console.log(e.response);
      }
      handleClose();
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>OTP verification</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the otp send to your number
        </DialogContentText>
        <TextField
          label={"OTP"}
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value);
          }}
          sx={{ my: 2 }}
          fullWidth
        />
      </DialogContent>
      <DialogActions sx={{ gap: 1.5, mr: 2 }}>
        <Button onClick={handleClose} variant="contained" sx={{ p: 1, px: 2 }}>
          Back
        </Button>
        <LoadingButton
          loading={loading}
          onClick={() => {
            handleSubmit();
          }}
          autoFocus
          variant="contained"
          sx={{ p: 1, px: 2 }}
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

const AdminProfile = () => {
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [deletePanel, setDeletePanel] = React.useState(false);

  const verified = useProtectedRoute(userConst.admin);
  const { user } = React.useContext(AuthContext);
  const { data, reload } = React.useContext(UserDataContext);
  const inputs = [
    {
      inputName: "first_name",
      title: "First Name",
      type: inputTypes.textfeild,
      options: {
        // required: true,
      },
    },
    {
      inputName: "last_name",
      title: "Last Name",
      type: inputTypes.textfeild,
    },
    {
      inputName: "email",
      title: "Email",
      type: inputTypes.textfeild,
      options: {
        disabled: true,
      },
    },
    {
      inputName: "phone",
      title: "Phone",
      type: inputTypes.textfeild,
      options: {
        disabled: true,
      },
    },
  ];

  const [info, setInfo] = React.useState({});
  const { handleSubmission, previousData } = useForm({
    // initialValues : products[0] ,
    initialValues: data ? data : {},
    postTo: `/admin/${user?.id}`,
    type: requestType.patch,
    contentType: formContentType.urlencoded,
    validate: (data) => {
      console.log(data);
      // if (data.name === "") {
      //   setInfo({ msg: "Please enter category name", error: true })
      // }
      return { error: false };
    },
    error: (msg) => {
      console.log(msg);
      //setInfo(msg)
    },
    afterSubmission: (res) => {
      console.log(res);
      setInfo({ msg: "Admin info updated!!!" });
      reload();
      // router.push("/admin/category");
    },
  });

  return (
    <Box>
      {verified && (
        <Container sx={{ pb: "4rem" }}>
          <Box sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    setConfirmDelete(true);
                  }}
                >
                  Delete account
                </Button>
                <ConfirmModal
                  open={confirmDelete}
                  setOpen={setConfirmDelete}
                  onConfirm={() => {
                    setDeletePanel(true);
                  }}
                  title={"Delete"}
                  content="You are about to delete your account. Are you sure about that?"
                />
              </Box>
              <DeleteAccountPopup
                open={deletePanel}
                setOpen={setDeletePanel}
                phone={data?.phone}
              />
              {info?.msg && (
                <Alert severity={info.error ? "error" : "success"}>
                  {info.msg}
                </Alert>
              )}
              <Paper
                component="form"
                elevation={3}
                onSubmit={handleSubmission}
                noValidate
                sx={{ p: 2, pl: 0 }}
              >
                <Stack spacing={2}>
                  {inputs.map((input, index) => (
                    <InputHelper
                      key={`form-input-${index}`}
                      previousData={previousData}
                      title={input.title}
                      inputName={input.inputName}
                      index={index}
                      type={input.type}
                      options={input.options}
                      nestedOption={input.nestedOption}
                    />
                  ))}
                </Stack>
                <Button
                  variant="contained"
                  sx={{
                    position: "relative",
                    right: "-50%",
                    transform: "translateX(-50%)",
                    px: 8,
                    my: 5,
                  }}
                  type="submit"
                >
                  Edit
                </Button>
              </Paper>
            </Stack>
          </Box>
        </Container>
      )}
    </Box>
  );
};
export default AdminProfile;
