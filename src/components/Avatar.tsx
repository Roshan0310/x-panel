import { Image, StyleSheet } from "react-native";

interface AvatarProps {
  uri?: string;
  size?: number;
  bgColor?: string;
}

const Avatar = ({ uri, size = 44 }: AvatarProps) => {
  const radius = size / 2;

  return (
    <Image
      source={{ uri }}
      style={[
        styles.image,
        { width: size, height: size, borderRadius: radius },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
  },
});

export default Avatar;
