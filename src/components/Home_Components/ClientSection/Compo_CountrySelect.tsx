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
  const countriesArr: CountryInfoType[] = Country.getAllCountries().map(
    (country) => ({
      name: country.name,
      isoCode: country.isoCode,
      flag: country.flag,
      phonecode: country.phonecode,
      currency: country.currency,
      latitude: country.latitude,
      longitude: country.longitude,
    })
  );
  const statesArr: StateInfoType[] = State?.getStatesOfCountry(
    selectedCountry?.isoCode
  ).map((state) => ({
    name: state.name,
    isoCode: state.isoCode,
    countryCode: state.countryCode,
  }));
  const citiesArr: CityInfoType[] = City.getCitiesOfState(
    selectedState?.countryCode,
    selectedState?.isoCode
  ).map((city) => ({
    name: city.name,
    countryCode: city.countryCode,
    stateCode: city.stateCode,
  }));

  return (
    <div className="my-2 flex flex-col gap-3">
      <Select
        options={countriesArr}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        value={selectedCountry}
        onChange={(item) => {
          if (item) {
            setSelectedCountry(item);
          }
        }}
      />
      <Select
        options={statesArr}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        value={selectedState}
        onChange={(item) => {
          if (item) {
            setSelectedState(item);
          }
        }}
      />
      <Select
        options={citiesArr}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        value={selectedCity}
        onChange={(item) => {
          if (item) setSelectedCity(item);
        }}
      />
    </div>
  );
}
