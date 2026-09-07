import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors } from "../../../shared/theme";
import { GstValidators } from "../utils/gstValidators";
import { GstStepIndicator } from "../components/GstStepIndicator";
import { GstBusinessStep, GstBusinessFormData } from "../components/GstBusinessStep";
import { GstDocumentUploadStep } from "../components/GstDocumentUploadStep";
import { GstReviewStep } from "../components/GstReviewStep";
import { GstApplicationStatusStep } from "../components/GstApplicationStatusStep";
import { styles } from "./GstRegistrationScreen.styles";

const STEPS = ["Business", "Documents", "Review", "Submit"];

export const GstRegistrationScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [screenIndex, setScreenIndex] = useState(0);
  const [declared, setDeclared] = useState(true);

  const [businessData, setBusinessData] = useState<GstBusinessFormData>({
    businessName: "",
    businessType: "",
    natureOfBusiness: "",
    businessAddress: "",
    bankAccountNumber: "",
    ifscCode: "",
    addressProofType: "Rental Agreement",
  });

  const [businessErrors, setBusinessErrors] = useState<Record<string, string>>({});

  const getScreenTitle = () => {
    switch (screenIndex) {
      case 0: return "GST Registration";
      case 1: return "Upload Documents";
      case 2: return "Review Application";
      default: return "Application Status";
    }
  };

  const getButtonText = () => {
    switch (screenIndex) {
      case 0: return "Continue to Documents";
      case 1: return "Continue to Review";
      case 2: return "Submit Application";
      default: return "";
    }
  };

  const validateBusinessDetails = (): boolean => {
    const errs = GstValidators.validateBusinessForm(businessData as unknown as Record<string, string>);
    setBusinessErrors(errs);
    if (Object.keys(errs).length > 0) {
      Alert.alert("Incomplete Details", "Please fill all required business and bank fields correctly to continue.");
      return false;
    }
    return true;
  };

  const handleBack = () => {
    if (screenIndex > 0 && screenIndex < 4) {
      setScreenIndex((prev) => prev - 1);
    } else {
      router.back();
    }
  };

  const handleContinue = () => {
    if (screenIndex === 0) {
      if (!validateBusinessDetails()) return;
    } else if (screenIndex === 2 && !declared) {
      Alert.alert("Declaration Required", "Please accept the declaration to submit your application.");
      return;
    }

    if (screenIndex < 4) {
      setScreenIndex((prev) => prev + 1);
    }
  };

  return (
    <View style={styles.root}>
      {/* Top Header Bar */}
      <View style={[styles.headerBar, { paddingTop: Math.max(insets.top, 12) + 6 }]}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleBack}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={20} color={BrandColors.TEXT_PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{getScreenTitle()}</Text>
        <View style={styles.placeholderBox} />
      </View>

      {/* 4-Step Indicator */}
      {screenIndex < 3 && (
        <GstStepIndicator
          steps={STEPS}
          currentStep={screenIndex}
        />
      )}

      {/* Main Scroll Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          screenIndex === 3 && { paddingBottom: 24 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={true}
        overScrollMode="always"
        nestedScrollEnabled={true}
      >
        {screenIndex === 0 && (
          <GstBusinessStep
            data={businessData}
            errors={businessErrors}
            onChange={(fields) => {
              setBusinessData((prev) => ({ ...prev, ...fields }));
              setBusinessErrors((prev) => {
                const next = { ...prev };
                Object.keys(fields).forEach((k) => delete next[k]);
                return next;
              });
            }}
          />
        )}

        {screenIndex === 1 && <GstDocumentUploadStep />}

        {screenIndex === 2 && (
          <GstReviewStep
            businessData={businessData}
            onEditStep={(stepIdx) => {
              if (stepIdx === 0) setScreenIndex(0);
              if (stepIdx === 1) setScreenIndex(1);
            }}
            declared={declared}
            onToggleDeclaration={() => setDeclared((prev) => !prev)}
          />
        )}

        {screenIndex === 3 && <GstApplicationStatusStep />}

        {/* Action Button */}
        {screenIndex < 3 && (
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleContinue}
              style={styles.submitBtn}
            >
              <Text style={styles.submitBtnText}>{getButtonText()}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default GstRegistrationScreen;
