import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Stack,
  Button,
  Chip,
  Card,
  CardMedia,
  Box,
  IconButton,
  Dialog,
  Typography,
} from "@mui/material";
import getFetch, { baseURL } from "../../../libs/axiosClient";
import ConfirmModal from "./../ConfirmModal";
import { AuthContext } from "../../../context/AuthProvider";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Close,
  Delete,
} from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { inputTypes } from "../../../constant/constant";
import { grey } from "@mui/material/colors";
import Image from "next/image";
import { motion, useMotionTemplate, useSpring } from "framer-motion";

const ImageAdder = ({ setLocalFiles, multiple, size, change, limit }) => {
  const getBase64 = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }, []);
  const sx =
    size === "small"
      ? { width: 250, height: 200, flex: "0 0 250px" }
      : {
          width: 300,
          height: 250,
        };
  const inputRef = useRef();
  const addFiles = async (files) => {
    const images = [];
    change();
    for (const file of [...files]) {
      const name = file.name;
      const src = await getBase64(file);
      images.push({ name, src });
    }
    if (images.length > limit) {
      return;
    }
    setLocalFiles({ files, images });
  };
  return (
    <Box
      sx={{
        ...sx,
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "2px dashed red",
        gap: "0.2rem",
        borderRadius: "1.2rem",
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        addFiles(e.dataTransfer.files);
      }}
    >
      <Image
        alt="drag and drop"
        src="/drag-and-drop-512.webp"
        width={60}
        height={60}
      />
      <Typography variant="body1" color={grey["500"]}>
        DRAG AND DROP
      </Typography>
      <Typography variant="body1" color={grey["500"]}>
        OR
      </Typography>
      <Button
        variant="outlined"
        sx={{ width: "75%" }}
        onClick={() => {
          inputRef.current.click();
        }}
      >
        Browse
      </Button>
      <input
        type="file"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={(e) => {
          addFiles(e.target.files);
        }}
        multiple={!!multiple}
      />
    </Box>
  );
};

const UploadedFileUI = ({
  deleteRoute,
  inputName,
  files,
  setFiles,
  selected,
  setSelected,
}) => {
  const x = useSpring(0, { stiffness: 300, damping: 50 });
  const xPercentage = useMotionTemplate`translateX(${x}%)`;
  const [confirmModal, setConfirmModal] = useState(false);
  const { user } = useContext(AuthContext);
  const setX = (newX) => {
    x.set(newX < 0 ? 0 : newX * -100);
    setSelected(newX < 0 ? null : newX);
  };
  const deleteSelectedImg = () => {
    if (files[selected]) {
      setConfirmModal(true);
    }
  };
  const deleteRemoteImg = async () => {
    if (user && deleteRoute) {
      const res = await getFetch().delete(deleteRoute, {
        data: {
          filename: files[selected].origin,
        },
      });
      console.log(res);
      const prevSelect = selected;
      const newLength = files.length - 1;
      setX(newLength < 0 ? -1 : prevSelect === 0 ? 0 : prevSelect - 1);
      setFiles((files) => [
        ...files.filter((_, index) => index !== prevSelect),
      ]);
    }
  };
  return (
    <Box>
      {selected !== null && files.length > 0 && (
        <Box sx={{ px: 1, backgroundColor: grey["900"], my: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", py: 1 }}>
            <Typography
              variant="subtitle1"
              color={grey["500"]}
              sx={{ mr: "auto" }}
            >
              {files[selected].name}
            </Typography>
            <IconButton onClick={deleteSelectedImg}>
              <Delete color={grey["500"]} />
            </IconButton>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "60vh",
              display: "flex",
              overflow: "hidden",
              py: 2,
              position: "relative",
            }}
          >
            {files.map((file, index) => (
              <Box
                key={`picture_${inputName}_${index}`}
                sx={{
                  position: "relative",
                  height: "100%",
                  width: "100%",
                  flex: "0 0 100%",
                }}
                component={motion.div}
                style={{ transform: xPercentage }}
              >
                <Image
                  alt={file.name}
                  src={file.src}
                  layout="fill"
                  objectFit="contain"
                />
              </Box>
            ))}
            <Box
              sx={{
                position: "absolute",
                height: "100%",
                top: 0,
                left: 0,
                display: "flex",
                alignItems: "center",
                p: 1,
              }}
            >
              <IconButton
                onClick={() => {
                  if (selected === 0) {
                    return;
                  }
                  setX(selected - 1);
                }}
              >
                <ArrowBackIos color="white" />
              </IconButton>
            </Box>
            <Box
              sx={{
                position: "absolute",
                height: "100%",
                top: 0,
                right: 0,
                display: "flex",
                alignItems: "center",
                p: 1,
              }}
            >
              <IconButton
                onClick={() => {
                  if (selected + 1 === files.length) {
                    return;
                  }
                  setX(selected + 1);
                }}
              >
                <ArrowForwardIos color="white" />
              </IconButton>
            </Box>
          </Box>
          <ConfirmModal
            open={confirmModal}
            setOpen={setConfirmModal}
            title="Delete Image"
            content={`You are about to delete a image uploaded. Are you sure, you want to delete ${files[selected].name}`}
            onConfirm={deleteRemoteImg}
          />
        </Box>
      )}
    </Box>
  );
};

const AddFileUI = (props) => {
  const localFilesList = props.localFiles.images;
  return (
    <Box sx={{ width: "100%", overflow: "auto" }}>
      <Box sx={{ display: "flex", py: 2, gap: 2 }}>
        <ImageAdder {...props} size="small" />
        {localFilesList.map((localFile, index) => (
          <Card
            key={`new_image_${index}`}
            sx={{ flex: "0 0 360px", objectFit: "contain" }}
          >
            <CardMedia
              component="img"
              image={localFile.src}
              alt={localFile.name}
              height="200"
            />
          </Card>
        ))}
      </Box>
      {localFilesList.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button
            variant="contained"
            onClick={() => {
              props.handleClose();
            }}
          >
            Done
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              props.reset();
              props.setLocalFiles({ files: null, images: [] });
            }}
          >
            Clear
          </Button>
        </Box>
      )}
    </Box>
  );
};

const PictureInventory = ({
  inputName,
  options,
  fullScreen,
  handleClose,
  localFiles,
  setLocalFiles,
  change,
  reset,
  files,
  selected,
  setFiles,
  setSelected,
}) => {
  const deleteRoute = options?.deleteRoute;
  const { label, multiple } = options;
  const limit = !!options.multiple ? (!!options.limit ? options.limit : 5) : 1;
  const width = !fullScreen
    ? {
        width: 1200,
      }
    : {};
  return (
    <Box sx={{ ...width, p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Typography variant="h4" color={grey["500"]} sx={{ mr: "auto" }}>
          {label}
        </Typography>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </Box>
      <UploadedFileUI
        deleteRoute={deleteRoute}
        files={files}
        setFiles={setFiles}
        inputName={inputName}
        selected={selected}
        setSelected={setSelected}
        localFiles={localFiles}
        setLocalFiles={setLocalFiles}
        multiple={multiple}
        change={change}
      />
      <AddFileUI
        localFiles={localFiles}
        setLocalFiles={setLocalFiles}
        files={files}
        multiple={multiple}
        inputName={inputName}
        selected={selected}
        handleClose={handleClose}
        change={change}
        reset={reset}
        limit={limit}
      />
    </Box>
  );
};

export default function MediaHelper(props) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const changed = useRef(false);
  const [nameprops, setNameProps] = useState({});
  const change = () => {
    if (changed.current) return;
    changed.current = true;
    setNameProps({ name: props.inputName });
  };
  const reset = () => {
    console.log("came");
    changed.current = false;
    setNameProps({});
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [localFiles, setLocalFiles] = useState({ files: null, images: [] });
  const fileref = useRef();
  const multiple = props.options?.multiple;
  useEffect(() => {
    if (!localFiles.files) {
      return;
    }
    fileref.current.file = null;
    fileref.current.files = null;
    fileref.current.files = localFiles.files;
  }, [localFiles.files, multiple]);
  const prevData = props.previousData(props.inputName);
  const [files, setFiles] = useState([]);
  const [selected, setSelected] = useState(null);
  const getPrevData = useCallback(async (data) => {
    if (!data) {
      return [];
    }
    let prevData = [];
    for (let file of data) {
      if (!file) {
        continue;
      }
      const filePath = file.split("/");
      prevData.push({
        name: filePath[filePath.length - 1],
        src: `${baseURL}/${file}`,
        origin: file,
      });
    }
    return prevData;
  }, []);
  useEffect(() => {
    const fetch = async () => {
      const oldData =
        Array.isArray(prevData) || prevData === undefined
          ? prevData
          : [prevData];
      const newData = await getPrevData(oldData);
      setFiles(newData);
      setSelected(newData.length === 0 ? null : 0);
      // reset();
    };
    fetch();
  }, [prevData, getPrevData]);
  return (
    <Box sx={{ width: "100%" }}>
      <Button variant="contained" onClick={handleClickOpen} fullWidth>
        Media
      </Button>
      <input
        type="file"
        ref={fileref}
        {...nameprops}
        multiple={!!multiple}
        style={{ display: "none" }}
      />
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        maxWidth="lg"
      >
        {props.type === inputTypes.picturefeild && (
          <PictureInventory
            {...props}
            fullScreen={fullScreen}
            handleClose={handleClose}
            localFiles={localFiles}
            setLocalFiles={setLocalFiles}
            change={change}
            reset={reset}
            files={files}
            selected={selected}
            setSelected={setSelected}
            setFiles={setFiles}
          />
        )}
      </Dialog>
    </Box>
  );
}
