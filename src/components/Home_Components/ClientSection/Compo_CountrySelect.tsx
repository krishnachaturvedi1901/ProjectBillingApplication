// import { getCode, getName } from "country-list";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import {
  CityInfoType,
  CountryInfoType,
  StateInfoType,
} from "../../../types/types";

export default function SelectCountryStateCity({
  selectedCountry,
  selectedState,
  selectedCity,
  setSelectedCountry,
  setSelectedState,
  setSelectedCity,
}: {
  selectedCountry: CountryInfoType;
  selectedState: StateInfoType;
  selectedCity: CityInfoType;
  setSelectedCountry: Dispatch<SetStateAction<CountryInfoType>>;
  setSelectedState: Dispatch<SetStateAction<StateInfoType>>;
  setSelectedCity: Dispatch<SetStateAction<CityInfoType>>;
}) {
  useEffect(() => {
    console.log(selectedCountry);
    console.log(selectedCountry?.isoCode);
    console.log(State?.getStatesOfCountry(selectedCountry?.isoCode));
  }, [selectedCountry]);
  return (
    <div className="App">
      <Select
        options={Country.getAllCountries()}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        value={selectedCountry}
        onChange={(item) => {
          setSelectedCountry(item);
        }}
      />
      <Select
        options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        value={selectedState}
        onChange={(item) => {
          setSelectedState(item);
        }}
      />
      <Select
        options={City.getCitiesOfState(
          selectedState?.countryCode,
          selectedState?.isoCode
        )}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        value={selectedCity}
        onChange={(item) => {
          setSelectedCity(item);
        }}
      />
    </div>
  );
}
