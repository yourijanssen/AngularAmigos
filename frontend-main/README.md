# Angular Amigo's SDG Webapp Frontend

To initialize the repository on your machine, run the following command in the root folder:
```sh
npm install
```

To run the application, simply run the following command:
```sh
npm start
```

## Usefull command line promts
npm install -g @angular/cli
ng serve
ng generate component component-name
ng generate service service-name

## Folder Structure

We are using Angular for this project. Within the "app" directory there are a few subdirectories. Components, Models & Services. I think it is clear what will be stored in those directories.
---

## Communication
In the "models" directory, you'll find "communication.ts". Within this file there is a generic class called JSend. By adding this class to our responses as json, we ensure that we use one standard way of communication. To become more familiar with JSend, please check the [JSend Documentation](https://github.com/omniti-labs/jsend)