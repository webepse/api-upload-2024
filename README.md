# Install

- symfony new react-symfony-upload --webapp
- cd nomDuDossier
- composer require --dev orm-fixtures
- composer require encore
- composer require api 
- npm install
- npm install @babel/preset-react --save-dev
- npm install react
- npm install react-dom
- npm install react-router-dom
- npm install axios 

- modifier le .env pour la base de données 

## base de données 
### Product 
- name / string / 255 / no
- image / string / 255 / no 
- description / text / no
- price / float / no 

## etapes 
### etape 1 
- php bin/console make:controller UploadProductController
- php bin/console make:controller AppController 
- modifier entity Product pour l'API
### etape 2 
- modifier webpack.config.js pour activer les presets de React
- modifier le fichier base.html.twig
- modifier le fichier app/index.html.twig