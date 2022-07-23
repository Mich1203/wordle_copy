import { FC, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, ToastAndroid, View } from "react-native";

import * as Contacts from "expo-contacts";
import { Contact } from "../common/Contact";
import { Input } from "@rneui/themed";

export const Invite: FC = () => {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    ToastAndroid.show(status, ToastAndroid.LONG);
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.PHONE_NUMBERS],
      });
      const filteredContacts = data.filter((cont) => !!cont.phoneNumbers?.[0]);
      if (filteredContacts.length > 0) {
        setContacts(filteredContacts);
      }
    }
  };
  useEffect(() => {
    getContacts();
  }, []);

  const keyExtractor = (item: Contacts.Contact, idx: number) => {
    return item?.id?.toString() || idx.toString();
  };
  const renderItem = ({ item }: { item: Contacts.Contact }) => {
    return <Contact contact={item} />;
  };
  return (
    <View style={styles.container}>
      <Input
        leftIcon={{ name: "search", type: "font-awesome" }}
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search something..."
      />
      <FlatList
        data={contacts.filter(
          (contact) => !searchTerm || contact.name.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: "100%",
  },
  list: {
    flex: 1,
  },
});
