# exo7_bibliotech

## Description
Ce projet est une application web simple pour gérer une bibliothèque de livres. Elle permet d'ajouter, de rechercher, de filtrer, de modifier et de supprimer des livres.

## Prérequis
- Docker
- Docker Compose

## Installation et exécution

## Étape 1 : Cloner le dépôt
Clonez ce dépôt sur votre machine locale :

git clone https://github.com/votre-utilisateur/exo7_bibliotech.git
cd exo7_bibliotech
## Étape 2 : Construire les images Docker
Construisez les images Docker en utilisant Docker Compose :
- docker-compose build

## Étape 3 : Démarrer les conteneurs
Démarrez les conteneurs en utilisant Docker Compose :
- docker-compose up -d

## Étape 4 : Accéder à l'application
Ouvrez votre navigateur web et accédez à l'application à l'adresse suivante :
- http://localhost:8080

### Utilisation
## Ajouter un livre : 
Cliquez sur "Add a Book" pour ouvrir le formulaire d'ajout de livre. Remplissez les champs et cliquez sur "Add Book".

## Rechercher un livre : 
Utilisez la barre de recherche pour rechercher des livres par titre ou auteur.
Filtrer les livres : Utilisez le menu déroulant pour filtrer les livres par titre ou auteur.

## Modifier un livre : 
Cliquez sur le bouton "Edit" à côté du livre que vous souhaitez modifier.

## Supprimer un livre : 
Cliquez sur le bouton "Delete" à côté du livre que vous souhaitez supprimer.

## Arrêter les conteneurs
Pour arrêter les conteneurs, utilisez la commande suivante :
- docker-compose down