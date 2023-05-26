/**
 * @author Lars Brinker
 */

import { Sequelize } from 'sequelize';
import { Dialect, DataTypes } from 'sequelize';
import * as dotenv from 'dotenv';
import { Test } from '../../repository/sequelize/models/test';
import { User, initUser } from '../../repository/sequelize/models/user';
import { Upload, initUpload } from '../../repository/sequelize/models/upload';
import { Achievement, initAchievement } from '../../repository/sequelize/models/achievement';
import { initSession, Session } from '../../repository/sequelize/models/session';
import { initSDG, SDG } from '../../repository/sequelize/models/sdg';
import { Comment, initComment } from '../../repository/sequelize/models/comment';
import { initSubjectArea, SubjectArea } from '../../repository/sequelize/models/subjectarea';
import { initContact } from '../../repository/sequelize/models/contact';
import { initContentTag, ContentTag } from '../../repository/sequelize/models/content-tag';
import { Follow, initFollow } from '../../repository/sequelize/models/follow';

dotenv.config();

const DB_NAME: string = process.env.DB_NAME!;
const DB_USER: string = process.env.DB_USER!;
const DB_PASSWORD: string = process.env.DB_PASSWORD!;

export const sequelize: Sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: 'mysql',
    host: 'localhost',
    timezone: '+02:00',
    logging: false,
});

// Add models to sequelize instance
Test.init(
    {
        message: {
            type: DataTypes.STRING,
        },
    },
    { sequelize }
);

export class SequelizeInit {
    private static instance: SequelizeInit | null = null;

    public static getInstance(): SequelizeInit {
        if (SequelizeInit.instance === null) {
            SequelizeInit.instance = new SequelizeInit();
        }
        return SequelizeInit.instance;
    }

    public initTables(): void {
        initUser();
        initUpload();
        initAchievement();
        initSession();
        initSDG();
        initContentTag();
        initComment();
        initSubjectArea();
        initContact();
        initFollow();
    }

    public initRelations(): void {
        User.hasMany(Upload, {
            sourceKey: 'id',
            foreignKey: 'userID',
            as: 'content',
        });
        // One to one
        User.hasOne(Session, {
            foreignKey: {
                name: 'userID',
            },
        });
        Session.belongsTo(User, {
            foreignKey: {
                name: 'userID',
            },
        });

        // Many to many
        const User_Achievement = sequelize.define('User_Achievement', {}, { timestamps: false });
        User.belongsToMany(Achievement, { through: User_Achievement });
        Achievement.belongsToMany(User, { through: User_Achievement });

        // Many to many
        Upload.belongsToMany(User, { through: 'Content_Likes' });
        User.belongsToMany(Upload, { through: 'Content_Likes' });

        // Many to many
        const User_SDG = sequelize.define('User_SDG', {}, { timestamps: false });
        SDG.belongsToMany(User, { through: User_SDG });
        User.belongsToMany(SDG, { through: User_SDG });

        // One to many
        User.hasOne(Comment, { foreignKey: 'UserId' });
        Comment.belongsTo(User, { foreignKey: 'UserId' });
        // Follow.belongsTo(User, { foreignKey: 'UserId' });
        User.hasMany(Follow, { foreignKey: 'userID' });
        User.hasMany(Follow, { foreignKey: 'followsUserID' });
        Follow.belongsTo(User, { foreignKey: 'userID' });
        Follow.belongsTo(User, { foreignKey: 'followsUserID' });

        // Many to many
        SDG.belongsToMany(Upload, { through: ContentTag, sourceKey: 'id', foreignKey: 'tagID' });
        Upload.belongsToMany(SDG, { through: ContentTag, sourceKey: 'id', foreignKey: 'id' });

        // One to one User now automatically gets a SubjectAreaID added.
        SubjectArea.hasOne(User);
        User.belongsTo(SubjectArea);

        SubjectArea.hasOne(ContentTag);
        ContentTag.belongsTo(SubjectArea);
    }
}
