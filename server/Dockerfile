#ulitiliser une image de base
FROM node:18-alpine

#definir le dossier de travail
WORKDIR /app

# copier kes fishiers du projet
COPY package.json  package-lock.json ./
RUN npm install --only=production

# copier le reste des fichiers
COPY . .

#EXPOSER KE PORT UTLISE PAE L'API
EXPOSE 3000

#DEMARER L'API
CMD [ "node", "server.js" ]