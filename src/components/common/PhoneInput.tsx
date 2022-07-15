import React, { FC, useEffect, useRef, useState } from "react";
import emojiFlags from "emoji-flags";
import { TouchableNativeFeedback, View, Text } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { ICountry } from "../../interfaces/general";
import { useGetCountriesQuery } from "../../services/util";
import { Input } from "@rneui/themed";

export interface IPhoneInputProps {
  onCountryChange(countryAlpha2Code: string): void;
  countryValue: string;
  onPhoneChange(phone: string): void;
  phoneValue: string;
}

export const PhoneInput: FC<IPhoneInputProps> = ({
  phoneValue,
  onPhoneChange,
  countryValue,
  onCountryChange,
}) => {
  const countrySelectorRef = useRef<ModalSelector>(null);
  const [selectedCountry, setSelectedCountry] = useState<ICountry>();
  const { data: countries = [] } = useGetCountriesQuery();

  useEffect(() => {
    if (selectedCountry) {
      onCountryChange(selectedCountry.alpha2Code);
      handlePhoneChange(phoneValue);
    }
  }, [selectedCountry]);

  useEffect(() => {
    setSelectedCountry(
      countries.find((country) => country.alpha2Code === countryValue)
    );
  }, [countryValue, countries]);

  const handlePhoneChange = (value: string) => {
    const callingCode = selectedCountry?.callingCodes[0];
    callingCode &&
      (value = `+${callingCode} ${value.slice(value.indexOf(" ") + 1)}`);
    if (new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\ss\./0-9]*$/g).test(value))
      onPhoneChange(value);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <ModalSelector
        style={{ width: "20%", marginBottom: 15 }}
        data={countries
          .filter((country) => country.callingCodes.length)
          .map((country) => ({
            key: country.alpha2Code,
            label: `${emojiFlags.countryCode(country.alpha2Code)?.emoji} ${
              country.name
            } +${country.callingCodes[0]}`,
          }))}
        initValue={selectedCountry?.alpha2Code}
        onChange={(value) =>
          setSelectedCountry(
            countries.find(
              ({ alpha2Code }) => alpha2Code === value.key.toString()
            )
          )
        }
        ref={countrySelectorRef}
        customSelector={
          <TouchableNativeFeedback
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={countrySelectorRef.current?.open}
          >
            <Text style={{ textAlign: "center", fontSize: 30 }}>
              {selectedCountry
                ? emojiFlags.countryCode(selectedCountry.alpha2Code).emoji
                : "country"}
            </Text>
          </TouchableNativeFeedback>
        }
      />

      <View style={{ flexGrow: 1 }}>
        <Input
          value={phoneValue}
          onChangeText={handlePhoneChange}
          placeholder="Phone number *"
          leftIcon={{ type: "font-awesome", name: "phone" }}
          containerStyle={{ marginBottom: 0 }}
        />
      </View>
    </View>
  );
};
