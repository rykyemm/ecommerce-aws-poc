#!/bin/bash

# Script pour lancer les tests de performance avec différentes configurations

set -e

# Répertoire du script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Charger les configurations depuis le fichier config.json
if ! command -v jq &> /dev/null; then
    echo "jq est requis pour analyser le fichier config.json. Installez-le avec 'apt-get install jq' ou 'brew install jq'"
    exit 1
fi

# Fonction d'aide
function show_help {
    echo "Usage: $0 [options]"
    echo ""
    echo "Options:"
    echo "  -e, --environment ENV     Environnement à tester (local, development, staging, production)"
    echo "  -s, --scenario SCENARIO   Scénario à exécuter (standard_load, spike_test, stress_test)"
    echo "  -o, --output FORMAT       Format de sortie (json, influxdb, csv)"
    echo "  -h, --help                Afficher cette aide"
    echo ""
    echo "Exemple:"
    echo "  $0 --environment staging --scenario spike_test --output json"
    exit 0
}

# Valeurs par défaut
ENVIRONMENT="local"
SCENARIO="standard_load"
OUTPUT=""

# Analyser les arguments
while [[ $# -gt 0 ]]; do
    case "$1" in
        -e|--environment)
            ENVIRONMENT="$2"
            shift 2
            ;;
        -s|--scenario)
            SCENARIO="$2"
            shift 2
            ;;
        -o|--output)
            OUTPUT="$2"
            shift 2
            ;;
        -h|--help)
            show_help
            ;;
        *)
            echo "Option non reconnue: $1"
            show_help
            ;;
    esac
done

# Vérifier que l'environnement est valide
if ! jq -e ".environments.\"$ENVIRONMENT\"" config.json > /dev/null 2>&1; then
    echo "Environnement '$ENVIRONMENT' non trouvé dans config.json"
    echo "Environnements disponibles:"
    jq -r '.environments | keys[]' config.json
    exit 1
fi

# Vérifier que le scénario est valide
if ! jq -e ".scenarios.\"$SCENARIO\"" config.json > /dev/null 2>&1; then
    echo "Scénario '$SCENARIO' non trouvé dans config.json"
    echo "Scénarios disponibles:"
    jq -r '.scenarios | keys[]' config.json
    exit 1
fi

# Extraire l'URL de l'API pour l'environnement
API_URL=$(jq -r ".environments.\"$ENVIRONMENT\".api_url" config.json)
echo "URL de l'API: $API_URL"

# Construire la commande
CMD="k6 run"

# Ajouter les options de sortie si spécifiées
if [ -n "$OUTPUT" ]; then
    case "$OUTPUT" in
        json)
            TIMESTAMP=$(date +%Y%m%d_%H%M%S)
            OUTPUT_FILE="results_${ENVIRONMENT}_${SCENARIO}_${TIMESTAMP}.json"
            CMD="$CMD --out json=$OUTPUT_FILE"
            ;;
        influxdb)
            CMD="$CMD --out influxdb=http://localhost:8086/k6"
            ;;
        csv)
            TIMESTAMP=$(date +%Y%m%d_%H%M%S)
            OUTPUT_FILE="results_${ENVIRONMENT}_${SCENARIO}_${TIMESTAMP}.csv"
            CMD="$CMD --out csv=$OUTPUT_FILE"
            ;;
        *)
            echo "Format de sortie non reconnu: $OUTPUT"
            echo "Formats disponibles: json, influxdb, csv"
            exit 1
            ;;
    esac
fi

# Ajouter les variables d'environnement
CMD="$CMD -e API_URL=$API_URL -e SCENARIO=$SCENARIO"

# Ajouter le script de test
CMD="$CMD load-test.js"

# Afficher et exécuter la commande
echo "Exécution de la commande: $CMD"
eval "$CMD"

# Si un fichier de sortie a été créé, afficher son emplacement
if [ -n "$OUTPUT_FILE" ] && [ -f "$OUTPUT_FILE" ]; then
    echo "Résultats sauvegardés dans: $OUTPUT_FILE"
fi

echo "Tests terminés!" 