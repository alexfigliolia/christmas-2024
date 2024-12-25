import BGLarge from "Images/background.webp";
import BGSmall from "Images/background-small.webp";
import { Card } from "State/Card";

export class Preloader {
  public static preload() {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        Card.initialize();
        resolve();
      };
      img.onerror = reject;
      if (window.innerWidth <= 670) {
        img.src = BGSmall;
      } else {
        img.src = BGLarge;
      }
    });
  }
}
