import React from "react";
import { AuthenticationScreen } from "../../modules/authentication/screens/AuthenticationScreen";

export default function PasscodeRoute() {
  return <AuthenticationScreen initialFlowState="PASSCODE_LOGIN" />;
}
