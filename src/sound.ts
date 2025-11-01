import { exec } from "child_process";
import { join } from "path";

function buildPlayCommand(filePath: string): string | undefined {
  if (process.platform === "darwin") {
    return `afplay ${JSON.stringify(filePath)}`;
  }

  if (process.platform === "win32") {
    // Use Windows Media Player COM object for synchronous playback of mp3 assets.
    const escapedPath = filePath.replace(/'/g, "''");
    const scriptLines = [
      "$player = $null",
      "try {",
      `$path = (Resolve-Path -LiteralPath '${escapedPath}').Path`,
      "$player = New-Object -ComObject WMPlayer.OCX",
      "$player.controls.stop()",
      "$player.URL = $path",
      "$player.controls.play()",
      "$deadline = (Get-Date).AddSeconds(30)",
      "while ((Get-Date) -lt $deadline) {",
      "  $state = $player.playState",
      "  if ($state -eq 1 -or $state -eq 8 -or $state -eq 10) { break }",
      "  Start-Sleep -Milliseconds 100",
      "}",
      "} finally {",
      "if ($player) {",
      "  $player.close()",
      "  [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($player)",
      "}",
      "}",
    ];
    const script = scriptLines.join("\n");
    const encodedScript = Buffer.from(script, "utf16le").toString("base64");
    return `powershell -NoProfile -EncodedCommand ${encodedScript}`;
  }

  return undefined;
}

export function playSound(fileName: "todo.mp3" | "daily.mp3"): Promise<void> {
  return new Promise((resolve, reject) => {
    const filePath = join(__dirname, `./assets/${fileName}`);
    const command = buildPlayCommand(filePath);
    if (!command) {
      resolve();
      return;
    }

    exec(command, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
