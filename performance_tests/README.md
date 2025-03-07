# Tests de Performance avec Apache JMeter

Ce répertoire contient les tests de performance pour l'application e-commerce, utilisant Apache JMeter comme outil de test de charge.

## Prérequis

- [Apache JMeter](https://jmeter.apache.org/download_jmeter.cgi) (version 5.4+ recommandée)
- Java Runtime Environment (JRE) version 8 ou supérieure
- Au moins 4GB de RAM disponible pour les tests de charge

## Installation de JMeter

1. Téléchargez la dernière version de JMeter depuis le [site officiel](https://jmeter.apache.org/download_jmeter.cgi)
2. Extrayez l'archive dans un dossier de votre choix
3. Ajoutez le dossier `bin` de JMeter à votre PATH système
4. Vérifiez l'installation en exécutant : `jmeter -v`

## Structure des Tests

Le plan de test (`performance_tests.jmx`) comprend :

### 1. Test de Charge Standard

- 50 utilisateurs virtuels simultanés
- Montée en charge progressive sur 60 secondes
- Durée totale : 5 minutes (300 secondes)
- 10 itérations par utilisateur

### 2. Endpoints Testés

- `GET /api/product` - Liste des produits
- `GET /api/product/{id}` - Détail d'un produit
- `GET /api/product/search/phone` - Recherche de produits

## Configuration

### Variables Globales

- `HOST` : Hôte cible (défaut: localhost)
- `PORT` : Port du serveur (défaut: 8000)
- `PATH` : Chemin de base de l'API (défaut: /backend/api)

## Exécution des Tests

### Via l'Interface Graphique

1. Démarrez JMeter :
   ```bash
   jmeter
   ```
2. Ouvrez le fichier `performance_tests.jmx`
3. Ajustez les variables si nécessaire
4. Cliquez sur le bouton "Start" (triangle vert)

### En Ligne de Commande

```bash
# Test simple
jmeter -n -t performance_tests.jmx -l results.jtl

# Test avec rapport HTML
jmeter -n -t performance_tests.jmx -l results.jtl -e -o ./report
```

### Options Importantes

- `-n` : Mode non-GUI
- `-t` : Fichier de test (.jmx)
- `-l` : Fichier de résultats (.jtl)
- `-e` : Génération de rapport HTML
- `-o` : Dossier de sortie du rapport
- `-J[prop] [val]` : Définir une propriété

## Analyse des Résultats

### Métriques Clés

- Temps de réponse moyen
- 90ème percentile
- Taux d'erreur
- Débit (requêtes/seconde)

### Visualisation

1. Dans JMeter, ajoutez un "Summary Report" listener
2. Chargez le fichier results.jtl
3. Analysez les graphiques et statistiques

### Seuils de Performance

- Temps de réponse moyen < 500ms
- 95ème percentile < 1000ms
- Taux d'erreur < 1%
- Débit > 100 requêtes/seconde

## Intégration CI/CD

Le fichier de test est compatible avec l'intégration continue. Exemple avec GitHub Actions :

```yaml
jobs:
  performance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install JMeter
        run: |
          wget https://downloads.apache.org/jmeter/binaries/apache-jmeter-5.4.3.tgz
          tar -xf apache-jmeter-5.4.3.tgz
      - name: Run Performance Tests
        run: |
          ./apache-jmeter-5.4.3/bin/jmeter -n -t performance_tests.jmx -l results.jtl
      - name: Generate Report
        run: |
          ./apache-jmeter-5.4.3/bin/jmeter -g results.jtl -o report
      - name: Archive Results
        uses: actions/upload-artifact@v2
        with:
          name: performance-report
          path: report
```

## Dépannage

### Problèmes Courants

1. **Erreur "Too many open files"**

   - Augmentez la limite de fichiers ouverts :

   ```bash
   ulimit -n 65535
   ```
2. **Erreur de mémoire**

   - Augmentez la mémoire JMeter :

   ```bash
   export JVM_ARGS="-Xms1g -Xmx4g"
   ```
3. **Timeouts fréquents**

   - Ajustez les timeouts dans les "HTTP Request Defaults"
   - Vérifiez la connectivité réseau

### Logs

- Consultez `jmeter.log` pour les erreurs détaillées
- Activez le mode debug avec `-L DEBUG`

## Maintenance

### Bonnes Pratiques

1. Gardez les tests à jour avec l'API
2. Documentez les changements dans les tests
3. Vérifiez régulièrement les seuils de performance
4. Nettoyez les fichiers de résultats après les tests

### Mises à Jour

1. Mettez à jour JMeter régulièrement
2. Vérifiez la compatibilité des plugins
3. Maintenez les données de test à jour
