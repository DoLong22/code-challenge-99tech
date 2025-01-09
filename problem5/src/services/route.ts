import express from 'express';
import fs from 'fs';
import path from 'path';
import { logger } from '../common/logger';

const loadRouters = (resourcesPath: string) => {
    const routerMgr = express.Router();
    const folders = fs.readdirSync(resourcesPath, { withFileTypes: true });
    folders.forEach((folder) => {
        if (folder.isDirectory()) {
            const folderPath = path.join(resourcesPath, folder.name);
            const routerFiles = fs.readdirSync(folderPath).filter((file) => file.endsWith('.router.ts') || file.endsWith('.router.js'));
            routerFiles.forEach((file) => {
                const routerPath = path.join(folderPath, file);
                const router = require(routerPath).default; // Assuming each router exports `default`
                const routePrefix = `/${folder.name}`;
                logger.info(`Loading routes from /${folder.name}`);
                routerMgr.use(routePrefix, router);
            });
        }
    });
    return routerMgr
};
export default loadRouters