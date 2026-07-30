import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const UserDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View>
      <Text>UserDetails</Text>
    </View>
  );
};

export default UserDetails;
