import { Application } from 'express';

import { SessionRoute } from '../routes/session';
import { RegisterRoute } from '../routes/register';
import { ContentRoute } from '../routes/content';

import { UserInterface } from '../../repository/interfaces/user-interface';
import { RegisterInterface } from '../../repository/interfaces/register-interface';
import { ContentInterface } from '../../repository/interfaces/content-interface';

import { default as contact } from '../routes/contact';
import { default as editAccount } from '../routes/edit-account';
import { default as account } from '../routes/account';
import { default as follow } from '../routes/follow';
import { RegisterService } from '../../services/register';
import { UploadRoute } from '../routes/upload';
import { UploadService } from '../../services/upload';
import { UploadInterface } from '../../repository/interfaces/upload-interface';
import { SessionService } from '../../services/session';

export interface RepositoryInterfaces {
    session: UserInterface;
    register: RegisterInterface;
    upload: UploadInterface;
    content: ContentInterface;
}

export function loadRoutes(app: Application, repositories: RepositoryInterfaces) {
    app.use('/session', new SessionRoute(new SessionService(repositories.session)).getRouter());
    app.use('/register', new RegisterRoute(new RegisterService(repositories.register)).getRouter());
    app.use('/posts', new ContentRoute(repositories.content).getRouter());
    app.use('/upload', new UploadRoute(new UploadService(repositories.upload)).getRouter());
    app.use('/contact', contact);
    app.use('/edit-account', editAccount);
    app.use('/account', account);
    app.use('/follow', follow);
}
