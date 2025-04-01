#!/bin/bash

# Chemin vers JMeter
JMETER_HOME="/usr/share/jmeter"
JMETER="$JMETER_HOME/bin/jmeter"

# Chemin vers le plan de test
TEST_PLAN="plan.jmx"

# Chemin vers le fichier de configuration
PROPERTIES_FILE="jmeter.properties"

# Exécuter JMeter avec la configuration personnalisée
"$JMETER" -n -t "$TEST_PLAN" -p "$PROPERTIES_FILE" -l results.jtl -e -o report 