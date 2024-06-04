#!/bin/bash

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null
then
    echo "Node.js não está instalado. Por favor, instale-o para continuar."
    exit
fi

# Verificar se o npm está instalado
if ! command -v npm &> /dev/null
then
    echo "npm não está instalado. Por favor, instale-o para continuar."
    exit
fi

# Instalar dependências do projeto
echo "Instalando dependências do projeto..."
npm install

# Construir o projeto
echo "Construindo o projeto..."
npm run build

# Servir o projeto em produção
echo "Servindo o projeto..."
npm run serve
