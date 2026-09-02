import fs from 'fs';
import path from 'path';

export const authFile = path.join(__dirname, '../playwright/.auth/user.json');
const authDir = path.dirname(authFile);

if (!fs.existsSync(authDir)) {
  fs.mkdirSync(authDir, { recursive: true });
}

if (!fs.existsSync(authFile)) {
  fs.writeFileSync(
    authFile,
    JSON.stringify({ cookies: [], origins: [] }, null, 2),
  );
}