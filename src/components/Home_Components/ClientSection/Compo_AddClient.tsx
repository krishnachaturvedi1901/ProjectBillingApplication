import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useDispatch } from "react-redux"; // Assuming you're using Redux
import { addNewClientAction } from "../../../states/redux/ClientStates/addClientSlice";
import { AppDispatch } from "../../../states/redux/store";
import {
  CityInfoType,
  ClientType,
  CountryInfoType,
  StateInfoType,
} from "../../../types/types";
import SelectCountryStateCity from "./Compo_CountrySelect";
import { Alert, Typography } from "@mui/material";

export default function CompoAddClient({
  open,
  handleClickOpen,
  handleClose,
  user,
}: {
  open: boolean;
  handleClickOpen: () => void;
  handleClose: () => void;
  user: string;
}) {
  const [selectedCountry, setSelectedCountry] = useState<CountryInfoType>(
    {} as CountryInfoType
  );
  const [selectedState, setSelectedState] = useState<StateInfoType>(
    {} as StateInfoType
  );
  const [selectedCity, setSelectedCity] = useState<CityInfoType>(
    {} as CityInfoType
  );
  const [incompleteError, setIncompleteError] = useState("");
  const [formError, setFormError] = useState("");

  console.log("country", selectedCountry.name);
  const dispatch = useDispatch<AppDispatch>();
  const [clientData, setClientData] = useState<ClientType>({
    clientName: "",
    email: "",
    contactNo: "",
    pancardNo: "",
    gistin: "",
    conversionRate: 80,
    address: {
      street: "",
      city: selectedCountry.name,
      state: selectedState.name,
      country: selectedCity.name,
      postalCode: "",
    },
    user: user,
  });
  console.log("ClientData", clientData);

  React.useEffect(() => {
    setClientData({
      ...clientData,
      address: {
        ...clientData.address,
        country: selectedCountry.name,
        state: selectedState.name,
        city: selectedCity.name,
      },
      user: user,
    });
  }, [selectedCountry, selectedState, selectedCity]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "gistin" || name === "pancardNo") {
      console.log("Inside handle change", name, value);
      setClientData({
        ...clientData,
        [name]: value.toLocaleUpperCase(),
      });
    } else {
      setClientData({
        ...clientData,
        [name]: value,
      });
    }
    setFormError("");
    setIncompleteError("");
  };

  function areAllFieldsFilled(obj: any) {
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        if (!areAllFieldsFilled(obj[key])) {
          return false;
        }
      } else {
        if (obj[key] === "" || obj[key] === undefined) {
          return false;
        }
      }
    }
    return true;
  }

  function areEntriesValid(obj: any) {
    if (obj.contactNo.length !== 10) {
      setFormError("Contactno. must be of 10 digit only.");
      return false;
    } else if (obj.gistin.length !== 15) {
      setFormError("Gstin must be of 15 digit only.");
      return false;
    } else if (obj.pancardNo.length !== 10) {
      setFormError("Pancard must be of 10 digit only.");
      return false;
    } else if (obj.email) {
      const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      !pattern.test(obj.email)
        ? setFormError("Invalid email address*")
        : setFormError("");
      return pattern.test(obj.email);
    }
    setFormError("");
    return true;
  }

  const handleSubmit = () => {
    if (areAllFieldsFilled(clientData) && areEntriesValid(clientData)) {
      dispatch(addNewClientAction(clientData));
      handleClose();
    } else {
      setIncompleteError("Incomplete fields");
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "darkorchid",
          ":hover": {
            backgroundColor: "#7f05bc",
          },
        }}
        onClick={handleClickOpen}
      >
        Add Client
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Client</DialogTitle>;
        {formError.length > 0 ? (
          <Alert severity="error"> {formError}</Alert>
        ) : incompleteError.length > 0 ? (
          <Alert severity="error"> {incompleteError}</Alert>
        ) : null}
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="clientName"
            label="Client Name"
            type="text"
            fullWidth
            variant="standard"
            name="clientName"
            value={clientData.clientName}
            onChange={(e) => handleChange(e)}
            required
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            name="email"
            value={clientData.email}
            onChange={(e) => handleChange(e)}
            required
          />
          <TextField
            margin="dense"
            id="contactNo"
            label="Contact Number"
            type="number"
            fullWidth
            variant="standard"
            name="contactNo"
            value={clientData.contactNo}
            onChange={(e) => handleChange(e)}
            required
            inputProps={{
              pattern: "[0-9]{10}",
              title: "Please enter valid mobile number",
            }}
          />
          <TextField
            margin="dense"
            id="pancardNo"
            label="Pancard Number"
            type="text"
            fullWidth
            variant="standard"
            name="pancardNo"
            value={clientData.pancardNo}
            onChange={(e) => handleChange(e)}
            required
          />
          <TextField
            margin="dense"
            id="gistin"
            label="GSTIN"
            type="text"
            fullWidth
            variant="standard"
            name="gistin"
            value={clientData.gistin}
            onChange={(e) => handleChange(e)}
            required
          />
          <TextField
            margin="dense"
            id="conversionRate"
            label="Conversion Rate"
            type="number"
            fullWidth
            variant="standard"
            name="conversionRate"
            value={clientData.conversionRate}
            onChange={(e) => handleChange(e)}
            required
          />
          <TextField
            margin="dense"
            id="street"
            label="Street Address"
            type="text"
            fullWidth
            variant="standard"
            name="street"
            value={clientData.address.street}
            onChange={(e) => {
              setClientData({
                ...clientData,
                address: { ...clientData.address, street: e.target.value },
              });
            }}
            required
          />
          <Typography className="text-xs opacity-70">Select Region</Typography>
          <SelectCountryStateCity
            selectedCountry={selectedCountry}
            selectedState={selectedState}
            selectedCity={selectedCity}
            setSelectedCountry={setSelectedCountry}
            setSelectedState={setSelectedState}
            setSelectedCity={setSelectedCity}
          />
          <TextField
            margin="dense"
            id="postalCode"
            label="Postal Code"
            type="text"
            fullWidth
            variant="standard"
            name="postalCode"
            value={clientData.address.postalCode}
            onChange={(e) => {
              setClientData({
                ...clientData,
                address: { ...clientData.address, postalCode: e.target.value },
              });
            }}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Client</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
