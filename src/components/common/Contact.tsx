import React, { FC } from "react";
import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import { Contact as IContact } from "expo-contacts";
import { Button } from "@rneui/themed";
import * as SMS from "expo-sms";
import { useAppSelector } from "../../hooks/store";
import { selectUser } from "../../store/auth";

export interface IContactProps {
  contact: IContact;
}

export const Contact: FC<IContactProps> = React.memo(
  ({ contact }) => {
    const user = useAppSelector(selectUser);
    const handleInviteContact = (number?: string) => async () => {
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable && number) {
        SMS.sendSMSAsync(
          number,
          `${user?.name} has invited you to download Wordle!`
        );
      } else {
        ToastAndroid.show("SMS is not available", ToastAndroid.LONG);
      }
    };
    return (
      <View style={styles.contactCon}>
        <View style={styles.imgCon}>
          <View style={styles.placeholder}>
            <Text style={styles.txt}>{contact?.name[0]}</Text>
          </View>
        </View>
        <View style={styles.contactDat}>
          <Text style={styles.name}>{contact?.name}</Text>
          <Text style={styles.phoneNumber}>
            {contact.phoneNumbers?.[0]?.number}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Invite"
            onPress={handleInviteContact(contact.phoneNumbers?.[0]?.number)}
          />
        </View>
      </View>
    );
  },
  (prev, next) => prev.contact.id === next.contact.id
);
const styles = StyleSheet.create({
  contactCon: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#d9d9d9",
  },
  imgCon: {},
  placeholder: {
    width: 55,
    height: 55,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "#d9d9d9",
    alignItems: "center",
    justifyContent: "center",
  },
  contactDat: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 5,
  },
  txt: {
    fontSize: 18,
  },
  name: {
    fontSize: 16,
  },
  phoneNumber: {
    color: "#888",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
