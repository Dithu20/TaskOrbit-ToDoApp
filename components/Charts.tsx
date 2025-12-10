
// src/components/DashboardCharts.tsx

import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Task } from "../types";

const screenWidth = Dimensions.get("window").width;

export const DashboardCharts = ({ items }: { items: Task[] }) => {
  const total = items.length;
  const completed = items.filter(i => i.status === "completed").length;
  const active = items.filter(i => {
      return i.status === "active";
  }).length;
  const archived = items.filter(i => i.status === "archived").length;

  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

  const pieData =
    total === 0
      ? []
      : [
          active > 0 && {
            name: "Active",
            population: active,
            color: "#3b82f6",
            legendFontColor: "#cbd5e1",
            legendFontSize: 12,
          },
          completed > 0 && {
            name: "Completed",
            population: completed,
            color: "#22c55e",
            legendFontColor: "#cbd5e1",
            legendFontSize: 12,
          },
          archived > 0 && {
            name: "Archived",
            population: archived,
            color: "#f59e0b",
            legendFontColor: "#cbd5e1",
            legendFontSize: 12,
          },
        ].filter(Boolean) as any[];

  return (
    <View style={styles.container}>
      {/* --- Stats Row --- */}
      <View style={styles.statsRow}>
        <StatBox label="TOTAL" value={total} color="#3b82f6" />
        <StatBox label="DONE" value={completed} color="#22c55e" />
        <StatBox label="PENDING" value={active} color="#f59e0b" />
      </View>

      {/* --- Progress Bar --- */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progress</Text>
          <Text style={styles.progressValue}>{completionRate}%</Text>
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${completionRate}%` },
            ]}
          />
        </View>
      </View>

      {/* --- PIE CHART --- */}
      {pieData.length > 0 && (
        <View style={styles.pieCard}>
          <PieChart
            data={pieData}
            width={screenWidth * 0.9}
            height={180}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            center={[0, 0]}
            absolute
          />
        </View>
      )}
    </View>
  );
};

const StatBox = ({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) => (
  <View style={styles.statBox}>
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const chartConfig = {
  color: (opacity = 1) => `rgba(255,255,255,${opacity})`,
  labelColor: () => "#cbd5e1",
  backgroundGradientFrom: "#0f172a",
  backgroundGradientTo: "#0f172a",
  decimalPlaces: 0,
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 12,
  },

  /* --- Stats Row --- */
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statBox: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: "rgba(255,255,255,0.04)",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  statValue: {
    fontSize: 22,
    fontWeight: "800",
  },

  statLabel: {
    fontSize: 10,
    marginTop: 4,
    color: "#94a3b8",
    letterSpacing: 1,
  },

  /* --- Progress Card --- */
  progressCard: {
    marginTop: 16,
    backgroundColor: "rgba(255,255,255,0.04)",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  progressLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#94a3b8",
  },

  progressValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#38bdf8",
  },

  progressTrack: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 10,
    marginTop: 10,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#38bdf8",
    borderRadius: 10,
  },

  /* --- Pie Card --- */
  pieCard: {
    marginTop: 16,
    backgroundColor: "rgba(255,255,255,0.04)",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
});

export default DashboardCharts;