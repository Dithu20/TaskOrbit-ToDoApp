// src/components/DashboardCharts.tsx
import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Dimensions, Animated } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Task } from "../types";

const screenWidth = Dimensions.get("window").width;

export default function DashboardCharts({ items }: { items: Task[] }) {
  const total = items.length;
  const completed = items.filter((i) => i.status === "completed").length;
  const active = items.filter((i) => i.status === "active").length;
  const archived = items.filter((i) => i.status === "archived").length;

  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

  const pieData =
    total === 0
      ? []
      : [
          active > 0 && {
            name: "Active",
            population: active,
            color: "#38bdf8", // cyan
            legendFontColor: "rgba(255,255,255,0.85)",
            legendFontSize: 12,
          },
          completed > 0 && {
            name: "Completed",
            population: completed,
            color: "#22c55e", // green
            legendFontColor: "rgba(255,255,255,0.85)",
            legendFontSize: 12,
          },
          archived > 0 && {
            name: "Archived",
            population: archived,
            color: "#f59e0b", // amber
            legendFontColor: "rgba(255,255,255,0.85)",
            legendFontSize: 12,
          },
        ].filter(Boolean) as any[];

  // Animated progress
  const progressAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: completionRate,
      duration: 700,
      useNativeDriver: false,
    }).start();
  }, [completionRate]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["50%", "100%"],
  });

  return (
    <View style={styles.container}>
      {/* Stats row */}
      <View style={styles.statsRow}>
        <StatBox label="Total" value={total} accent="#60a5fa" />
        <StatBox label="Completed" value={completed} accent="#34d399" />
        <StatBox label="Pending" value={active} accent="#f59e0b" />
      </View>

      {/* Progress card */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Completion</Text>
          <Text style={styles.progressPercent}>{completionRate}%</Text>
        </View>

        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
        </View>
        <Text style={styles.progressSub}>of {total} tasks completed</Text>
      </View>

      {/* Pie + Legend */}
      {pieData.length > 0 && (
        <View style={styles.pieRow}>
          <View style={styles.pieWrapper}>
            <PieChart
              data={pieData}
              width={Math.min(screenWidth * 0.9, 380)}
              height={160}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="10"
              center={[45, 0]}
              hasLegend={false}
            />
          </View>

          <View style={styles.legend}>
            {pieData.map((d, idx) => (
              <View key={d.name} style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: d.color }]} />
                <Text style={styles.legendText}>
                  {d.name} • {d.population}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

/* Stat box component */
const StatBox = ({ label, value, accent }: { label: string; value: number; accent: string }) => {
  return (
    <View style={styles.statBox}>
      <View style={[styles.statAccent, { backgroundColor: accent }]} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#06121a",
  backgroundGradientTo: "#06121a",
  color: (opacity = 1) => `rgba(255,255,255,${opacity})`,
  labelColor: (opacity = 1) => `rgba(203,213,225,${opacity})`,
  decimalPlaces: 0,
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  /* stats row */
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  statBox: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.04)",
  },
  statAccent: {
    position: "absolute",
    left: 12,
    top: 12,
    width: 8,
    height: 28,
    borderRadius: 6,
    opacity: 0.95,
    shadowColor: "#00FFF0",
  },
  statValue: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },
  statLabel: {
    color: "rgba(255,255,255,0.6)",
    marginTop: 6,
    fontSize: 11,
    letterSpacing: 0.6,
    fontWeight: "700",
  },

  /* progress */
  progressCard: {
    marginTop: 12,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.04)",
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  progressLabel: {
    color: "rgba(255,255,255,0.8)",
    fontWeight: "700",
  },
  progressPercent: {
    color: "#7dd3fc",
    fontWeight: "900",
    fontSize: 20,
  },
  progressTrack: {
    height: 10,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 12,
    marginTop: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#06b6d4",
    borderRadius: 12,
  },
  progressSub: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 12,
    marginTop: 8,
  },

  /* pie + legend */
  pieRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pieWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  legend: {
    width: 90,
    paddingLeft: 1,
    justifyContent: "center",
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 12,
  },
});
