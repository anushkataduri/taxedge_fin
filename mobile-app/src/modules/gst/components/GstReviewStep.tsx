import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors } from "../../../shared/theme";
import { GstBusinessFormData } from "./GstBusinessStep";

interface GstReviewStepProps {
  businessData: GstBusinessFormData;
  onEditStep: (stepIndex: number) => void;
  declared: boolean;
  onToggleDeclaration: () => void;
}

export const GstReviewStep: React.FC<GstReviewStepProps> = ({
  businessData,
  onEditStep,
  declared,
  onToggleDeclaration,
}) => {
  return (
    <View style={styles.container}>
      {/* 1. Business Details Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Business Details</Text>
          <TouchableOpacity onPress={() => onEditStep(0)} activeOpacity={0.7}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}>Business / Trade Name</Text>
          <Text style={styles.value}>
            {businessData.businessName || "—"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Business Type</Text>
          <Text style={styles.value}>{businessData.businessType || "—"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Nature of Business</Text>
          <Text style={styles.value}>{businessData.natureOfBusiness || "Trader"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Business Address</Text>
          <Text style={styles.value}>
            {businessData.businessAddress || "—"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Address Proof</Text>
          <Text style={styles.value}>{businessData.addressProofType || "—"}</Text>
        </View>
      </View>

      {/* 2. Bank Details Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Bank Details</Text>
          <TouchableOpacity onPress={() => onEditStep(0)} activeOpacity={0.7}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}>Account No.</Text>
          <Text style={styles.value}>
            {businessData.bankAccountNumber || "—"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>IFSC Code</Text>
          <Text style={styles.value}>{businessData.ifscCode || "—"}</Text>
        </View>
      </View>

      {/* 3. Documents Summary Card with Progress Bar */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Documents</Text>
          <TouchableOpacity onPress={() => onEditStep(1)} activeOpacity={0.7}>
            <Text style={styles.docCountText}>Uploaded</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.docProgressBar}>
          <View style={styles.docProgressFill} />
        </View>
      </View>

      {/* 4. Declaration Checkbox Card */}
      <TouchableOpacity
        style={styles.declarationCard}
        activeOpacity={0.8}
        onPress={onToggleDeclaration}
      >
        <View style={[styles.checkbox, declared && styles.checkboxActive]}>
          {declared && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
        </View>
        <Text style={styles.declarationText}>
          I hereby declare that the information provided is true and accurate to the best of my knowledge. I authorise TaxEdge Fin Solutions to file this application on my behalf.
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    gap: 14,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EEF2F6",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 14.5,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  editText: {
    fontSize: 13,
    fontWeight: "700",
    color: BrandColors.PRIMARY_ORANGE,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  docCountText: {
    fontSize: 13,
    fontWeight: "700",
    color: BrandColors.PRIMARY_ORANGE,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    color: "#64748B",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  value: {
    fontSize: 13,
    fontWeight: "600",
    color: BrandColors.TEXT_PRIMARY,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  docProgressBar: {
    height: 5,
    backgroundColor: "#F1F5F9",
    borderRadius: 3,
    marginTop: 12,
    overflow: "hidden",
  },
  docProgressFill: {
    width: "45%",
    height: "100%",
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    borderRadius: 3,
  },
  declarationCard: {
    flexDirection: "row",
    backgroundColor: "#FEF0E6",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#FFD8BF",
    gap: 12,
    alignItems: "flex-start",
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "#94A3B8",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  checkboxActive: {
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    borderColor: BrandColors.PRIMARY_ORANGE,
  },
  declarationText: {
    flex: 1,
    fontSize: 12,
    color: "#9A3412",
    lineHeight: 18,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
});
