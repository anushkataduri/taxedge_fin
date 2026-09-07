import { authStorage } from "./authStorage";
import { authApi } from "./authApi";
import type { DevUser, RegistrationData, AuthResult } from "../types/auth.types";

export interface RegisterParams extends Partial<RegistrationData> {
  mobileNumber?: string;
  name: string;
  passcode?: string;
}

export const authService = {
  findUserByMobile: (m: string) => authStorage.getUserByMobile(m),
  isUserRegistered: (m: string) => Boolean(authStorage.getUserByMobile(m)?.passcode),

  async sendOtp(mobileNumber: string): Promise<{ success: boolean; message?: string }> {
    const clean = mobileNumber.replace(/\D/g, "");
    const res = await authApi.sendOtp(clean);
    return res;
  },

  async verifyOtp(mobileNumber: string, otp: string): Promise<{ success: boolean; isExistingUser: boolean; user?: DevUser }> {
    const clean = mobileNumber.replace(/\D/g, "");
    await authApi.verifyOtp(clean, otp);
    const existing = authStorage.getUserByMobile(clean);
    const isExisting = Boolean(existing && existing.passcode);
    return {
      success: otp.length === 6,
      isExistingUser: isExisting,
      user: existing || undefined,
    };
  },

  async checkUser(mobileNumber: string): Promise<{ exists: boolean; user?: DevUser }> {
    const clean = mobileNumber.replace(/\D/g, "");
    const existing = authStorage.getUserByMobile(clean);
    return { exists: Boolean(existing && existing.passcode), user: existing || undefined };
  },

  async registerUser(params: RegisterParams, autoLogin = false): Promise<AuthResult> {
    const mobile = (params.mobileNumber || "").replace(/\D/g, "");
    if (mobile.length !== 10) return { success: false, error: "Please enter a valid 10-digit mobile number" };
    if (!params.name?.trim()) return { success: false, error: "Full name is required" };

    const passcode = params.passcode ? params.passcode.replace(/\D/g, "") : "";

    const user: DevUser = {
      mobileNumber: mobile,
      passcode,
      name: params.name.trim(),
      email: params.email?.trim() || `${mobile}@taxedge.in`,
      customerType: params.customerType || "Individual",
      dob: params.dob?.trim() || "",
      pan: params.pan?.trim().toUpperCase() || "",
      aadhaar: params.aadhaar?.trim() || "",
      address: params.address?.trim() || "",
      avatarUri: params.avatarUri || null,
      registrationCompleted: Boolean(passcode),
      createdAt: new Date().toISOString(),
      customerId: `CUST-2026-${mobile.slice(-5) || "00001"}`,
    };

    authStorage.saveUser(user);

    try {
      await authApi.register({ ...user, mobileNumber: mobile });
    } catch {}

    if (autoLogin && passcode) {
      authStorage.saveSession({
        isLoggedIn: true,
        activeMobile: mobile,
        lastLoginAt: new Date().toISOString(),
      });
    }

    return { success: true, user };
  },

  async createPasscode(mobileNumber: string, passcode: string): Promise<AuthResult> {
    const clean = mobileNumber.replace(/\D/g, "");
    const pass = passcode.replace(/\D/g, "");
    if (clean.length !== 10) return { success: false, error: "Invalid mobile number" };
    if (pass.length !== 6) return { success: false, error: "Passcode must be exactly 6 digits" };

    let user = authStorage.getUserByMobile(clean);
    if (!user) {
      user = {
        customerId: `CUST-2026-${clean.slice(-5)}`,
        mobileNumber: clean,
        name: "Valued Client",
        email: `${clean}@taxedge.in`,
        customerType: "Individual",
      };
    }

    user.passcode = pass;
    user.registrationCompleted = true;
    authStorage.saveUser(user);

    try {
      await authApi.createPasscode(clean, pass);
    } catch {}

    authStorage.saveSession({
      isLoggedIn: true,
      activeMobile: clean,
      lastLoginAt: new Date().toISOString(),
    });

    return { success: true, user };
  },

  async loginWithPasscode(m: string, p: string): Promise<AuthResult> {
    const clean = (m || "").replace(/\D/g, "");
    const pass = (p || "").replace(/\D/g, "");
    if (clean.length !== 10) return { success: false, error: "Please enter a valid 10-digit mobile number" };
    if (pass.length !== 6) return { success: false, error: "Passcode must be exactly 6 numeric digits" };

    const user = authStorage.getUserByMobile(clean);
    if (!user) return { success: false, error: "Mobile number not found. Please register." };
    if (user.passcode !== pass) return { success: false, error: "Incorrect passcode. Please try again." };

    authStorage.saveSession({
      isLoggedIn: true,
      activeMobile: clean,
      lastLoginAt: new Date().toISOString(),
    });
    return { success: true, user };
  },

  async forgotPasscode(mobileNumber: string): Promise<{ success: boolean; message?: string }> {
    const clean = mobileNumber.replace(/\D/g, "");
    return authApi.forgotPasscode(clean);
  },

  async resetPasscode(mobileNumber: string, newPasscode: string, otp: string): Promise<AuthResult> {
    const clean = mobileNumber.replace(/\D/g, "");
    const pass = newPasscode.replace(/\D/g, "");
    if (pass.length !== 6) return { success: false, error: "Passcode must be 6 numeric digits" };

    const user = authStorage.getUserByMobile(clean);
    if (!user) return { success: false, error: "Account not found for this mobile number" };

    user.passcode = pass;
    authStorage.saveUser(user);

    try {
      await authApi.resetPasscode(clean, pass, otp);
    } catch {}

    authStorage.saveSession({
      isLoggedIn: true,
      activeMobile: clean,
      lastLoginAt: new Date().toISOString(),
    });

    return { success: true, user };
  },

  login: (m: string, p: string) => authService.loginWithPasscode(m, p),
  logout: () => authStorage.clearSession(),
  isAuthenticated: () => Boolean(authStorage.getSession().isLoggedIn && authStorage.getSession().activeMobile),
  getActiveMobile: () => authStorage.getSession().activeMobile,
  getCurrentUser: (): DevUser | null => {
    const session = authStorage.getSession();
    return session.activeMobile ? authStorage.getUserByMobile(session.activeMobile) : null;
  },
  setAvatar: (uri: string | null) => {
    const u = authService.getCurrentUser();
    if (u) {
      u.avatarUri = uri;
      authStorage.saveUser(u);
    }
  },
  resetAccount: () => authStorage.clearAllAuthData(),
};

// Aliased for seamless backwards-compatibility
export const devAuthService = authService;
export default authService;
