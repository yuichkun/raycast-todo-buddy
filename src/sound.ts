import { join } from "path";
import { play as playAudio } from "sound-play";

export async function playSound(fileName: "todo.mp3" | "daily.mp3"): Promise<void> {
  const filePath = join(__dirname, `./assets/${fileName}`);
  await playAudio(filePath, 1);
}
