# Étape 1 : build de l'app (multi-stage build)
FROM node:20-alpine AS builder

# Crée le dossier de l'app
WORKDIR /app

# Copie les fichiers
COPY package*.json ./
RUN npm install

# Copie le reste de l'app
COPY . .

# Build pour prod
RUN npm run build

# Étape 2 : serveur nginx pour servir le build
FROM nginx:alpine

# Copie le build dans nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Si CRA (Create React App), le build sera dans /app/build :
# COPY --from=builder /app/build /usr/share/nginx/html

# Copie une config nginx custom (optionnel)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose le port 80
EXPOSE 80

# Lancer nginx
CMD ["nginx", "-g", "daemon off;"]
