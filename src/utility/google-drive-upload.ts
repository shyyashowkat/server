import { google } from "googleapis";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config()
const oauth2Client = new google.auth.OAuth2({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI
}
);
console.log({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    rt: process.env.REFRESH_TOKEN
});

oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});

export async function uploadFile(file: any) {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: file.originalname,
                mimeType: file.mimeType,
                parents: ['1IT_CxfsgTixncDWAV2a2V1-Ba49xh8V-']
            },
            media: {
                mimeType: file.mimetype,
                body: fs.createReadStream('/home/showkatahmad/Downloads/download.jpeg'),
            },
        });
        if (response.data?.id) {
            await setFilePermission(response.data.id as string, 'reader', 'anyone');
            return `https://drive.google.com/uc?id=${response.data.id}`
        } else {
            return '';
        }
    } catch (error) {
        return ('Refresh token has been expired');
    }
    finally {
        fs.unlinkSync('/home/showkatahmad/Downloads/download.jpeg')
    }
}
async function setFilePermission(fileId: string, role: string, type: string) {
    return await drive.permissions.create({
        fileId: fileId,
        requestBody: {
            role: role,
            type: type,
        },
    });
}
