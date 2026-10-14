import fs from "fs/promises";
import path from "path";
import Asset from "../models/Asset.js";

const contentTypes: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
};

const assetFiles = [
  ["profile-photo", "server/uploads/images/1783319781440-WhatsApp Image 2026-06-26 at 10.27.30 AM.jpeg"],
  ["uploaded-10th-1", "server/uploads/images/1782235851925-10th.jpg"],
  ["uploaded-10th-2", "server/uploads/images/1782236472615-10th.jpg"],
  ["uploaded-10th-3", "server/uploads/images/1782237482296-10th.jpg"],
  ["resume", "client/public/resume.pdf"],
  ["resume-older-1", "server/uploads/resumes/1782235163764-FRENITA FERNANDES.Resume.pdf"],
  ["resume-older-2", "server/uploads/resumes/1782302635441-FRENITA FERNANDES.Resume.pdf"],
  ["resume-latest", "server/uploads/resumes/1782302681214-FRENITA FERNANDES.Resume.pdf"],
  ["certificate-artificial-intelligence", "client/public/certificates/artificial-intelligence-1.png"],
  ["certificate-privacy-security", "client/public/certificates/privacy-security-1.png"],
  ["certificate-python-basic", "client/public/certificates/python-basic-1.png"],
  ["project-eye-disease", "client/public/projects/eye-disease-detection.png"],
  ["project-internship", "client/public/projects/internship-document-upload.png"],
  ["project-portfolio", "client/public/projects/portfolio-management.png"],
  ["project-sales-crm", "client/public/projects/sales-crm.png"],
  ["logo-aloysius", "client/public/logos/aloysius.png"],
  ["logo-alvas", "client/public/logos/alvas.png"],
  ["logo-cognifyz", "client/public/logos/cognifyz.png"],
  ["logo-rdl", "client/public/logos/rdl.png"],
  ["logo-theresa", "client/public/logos/theresa.png"],
  ["logo-vani", "client/public/logos/vani.png"],
] as const;

const seedAssets = async () => {
  for (const [key, relativePath] of assetFiles) {
    const filePath = path.resolve(process.cwd(), "..", relativePath);
    const data = await fs.readFile(filePath);
    const extension = path.extname(filePath).toLowerCase();

    await Asset.updateOne(
      { key },
      {
        $setOnInsert: {
          key,
          fileName: path.basename(filePath),
          contentType: contentTypes[extension] || "application/octet-stream",
          data,
        },
      },
      { upsert: true },
    );
  }

  console.log("Portfolio media saved to MongoDB");
};

export default seedAssets;
