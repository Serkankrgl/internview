FROM node:14

# Gerekli paketleri yükle
RUN apt-get update && \
    apt-get install -y python3 python3-pip  && \
    rm -rf /var/lib/apt/lists/*

# Çalışma dizinini ayarla
WORKDIR /app/collaborativeide

# Bağımlılıkları kopyala
COPY package.json package-lock.json /app/collaborativeide/
RUN npm install

# Kodu kopyala
COPY . /app/collaborativeide

# Uygulamayı başlat
CMD ["npm", "run", "dev"]
