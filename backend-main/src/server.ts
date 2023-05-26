import express, { Application, Request, Response } from 'express';
import { loadRoutes, RepositoryInterfaces } from './routing/helpers/load-routes';
import { sequelize, SequelizeInit } from './util/sequelize/sequelize-database';
import cookieParser = require('cookie-parser');
import * as dotenv from 'dotenv';
import { RegisterSequelize } from './repository/sequelize/register';
import { RegisterMysql } from './repository/mysql/register';
import { SequelizeSeeder } from './util/sequelize/sequelizeSeeder';
import { MysqlSeed } from './util/mysql/mysqlSeeder';
import { UploadSequelize } from './repository/sequelize/upload';
import { UserSequelize } from './repository/sequelize/session';
import { UserMysql } from './repository/mysql/session';
import { UploadMysql } from './repository/mysql/upload';
import { ContentMysql } from './repository/mysql/content';

dotenv.config();

// Server constants
export const APP: Application = express();
const PORT = 3000;

// Set APP headers
APP.use(function (_request: Request, response: Response, next) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

// Body parsing Middleware
APP.use(express.json());
APP.use(express.urlencoded({ extended: true }));
APP.use(cookieParser());

// Load routes

initRepository(APP, initRoutes());

export function initRepository(APP: express.Application, repo: RepositoryInterfaces) {
    loadRoutes(APP, repo);
}

// console.log(repositories);

APP.listen(PORT, (): void => {
    console.log(`Connected successfully on port ${PORT}`);
});

function initRoutes(): RepositoryInterfaces {
    let repository: RepositoryInterfaces = {} as RepositoryInterfaces;
    if (process.env!.DB_SELECT == 'SEQUELIZE') {
        runSequelize();
        repository.session = new UserSequelize();
        repository.register = new RegisterSequelize();
        repository.upload = new UploadSequelize();
    } else {
        runMysql();
        repository.session = new UserMysql();
        repository.register = new RegisterMysql();
        repository.upload = new UploadMysql();
        repository.content = new ContentMysql();
    }

    return repository;
}

function runSequelize(): void {
    // Initiate the database tables and relations
    let sequelDatabase: SequelizeInit = SequelizeInit.getInstance();
    sequelDatabase.initTables();
    sequelDatabase.initRelations();
    // Seed the database
    let seeder: SequelizeSeeder = new SequelizeSeeder();
    // seeder.seed();
    sequelize
        // .sync({ force: true })
        .sync()
        .catch((error: any) => {
            console.error(`Error occured: ${error.code}`);
        });
}

async function runMysql(): Promise<void> {
    let mysqlSeeder: MysqlSeed = new MysqlSeed();
    // mysqlSeeder.seed();
}
