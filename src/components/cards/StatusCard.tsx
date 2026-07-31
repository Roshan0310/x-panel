import { Colors } from "@/theme/color";
import { Status } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

const STAT_CONFIG: Record<
  number,
  { icon: keyof typeof Ionicons.glyphMap; color: string; change: string }
> = {
  1: {
    icon: "cart-outline",
    color: Colors.primary,
    change: "+12.5%",
  },
  2: {
    icon: "cash-outline",
    color: Colors.statGreen,
    change: "+8.2%",
  },
  3: {
    icon: "receipt-outline",
    color: Colors.statOrange,
    change: "+15.3%",
  },
  4: {
    icon: "people-outline",
    color: Colors.statBlue,
    change: "+10.1%",
  },
};

interface StatCardProps {
  stat: Status;
}

const StatusCard = ({ stat }: StatCardProps) => {
  const config = STAT_CONFIG[stat.id];

  return (
    <View style={styles.card}>
      <View style={styles.icon}>
        <Ionicons name={config.icon} size={18} color={config.color} />
      </View>

      <Text style={styles.title}>{stat.title}</Text>

      <Text style={styles.value}>
        {stat.id <= 2 ? "$" : ""}
        {Number(stat.value).toLocaleString()}
      </Text>

      <View style={{ flexDirection: "row", gap: 4 }}>
        <Text style={styles.changeText}>{config.change}</Text>
        <Text style={styles.changeTextWord}>from last month</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    margin: 6,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },

  icon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#EEF4FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 4,
  },

  value: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  changeText: {
    fontSize: 13,
    fontWeight: "500",
    color: Colors.statGreen,
  },
  changeTextWord: {
    fontSize: 13,
    fontWeight: "500",
    color: Colors.textSecondary,
  },
});

export default StatusCard;
