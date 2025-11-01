import { Keyboard } from "@raycast/api";

export const primaryActionModifier: Keyboard.KeyModifier =
  process.platform === "darwin" ? "cmd" : "ctrl";

