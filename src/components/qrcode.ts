import QRCode from "qrcode";

export async function drawQRCode(
  canvas: HTMLCanvasElement,
  content: string
): Promise<void> {
  await QRCode.toCanvas(canvas, content, {
    width: 96,
    margin: 1,
    color: {
      dark: "#16171b",
      light: "#e9e6de",
    },
  });
}
