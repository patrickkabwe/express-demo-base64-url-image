import express, { Response, Request } from "express";
import { converBase64ToImage } from "convert-base64-to-image";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/upload", (req: Request, res: Response): Response => {
  const { image } = req.body;
  if (!image) return res.status(400).send("Image is required");

  const imageName = `${Date.now()}.png`;
  const imagePath = `./images/${imageName}`;

  converBase64ToImage(image, imagePath);
  return res.json({ imageName, imagePath });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
