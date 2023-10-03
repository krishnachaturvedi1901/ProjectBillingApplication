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

export default function Compo_AddClient({
  open,
  handleClickOpen,
  handleClose,
  user,
}: {
  open: boolean;
  handleClickOpen: () => void;
  handleClose: () => void;
  user: number;
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
  console.log(selectedCountry, selectedState, selectedCity);
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
    sameState: false,
    user: user,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientData({
      ...clientData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (clientData.address.state === "Madhya Pradesh") {
      clientData.sameState = true;
    }
    if (Object.values(clientData).every((val) => val !== "")) {
      dispatch(addNewClientAction(clientData));
      handleClose();
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Client
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Client</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="clientName"
            label="Client Name"
            type="text"
            fullWidth
            variant="standard"
            value={clientData.clientName}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={clientData.email}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            id="contactNo"
            label="Contact Number"
            type="text"
            fullWidth
            variant="standard"
            value={clientData.contactNo}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            id="pancardNo"
            label="Pancard Number"
            type="text"
            fullWidth
            variant="standard"
            value={clientData.pancardNo}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            id="gistin"
            label="GSTIN"
            type="text"
            fullWidth
            variant="standard"
            value={clientData.gistin}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            id="conversionRate"
            label="Conversion Rate"
            type="number"
            fullWidth
            variant="standard"
            value={clientData.conversionRate}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            id="street"
            label="Street Address"
            type="text"
            fullWidth
            variant="standard"
            value={clientData.address.street}
            onChange={(e) => {
              setClientData({
                ...clientData,
                address: { ...clientData.address, street: e.target.value },
              });
            }}
            required
          />
          <SelectCountryStateCity
            selectedCountry={selectedCountry}
            selectedState={selectedState}
            selectedCity={selectedCity}
            setSelectedCountry={setSelectedCountry}
            setSelectedState={setSelectedState}
            setSelectedCity={setSelectedCity}
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
