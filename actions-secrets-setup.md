# Configuration des Secrets pour GitHub Actions

Pour que le workflow CI/CD fonctionne correctement, vous devez configurer les secrets suivants dans les paramètres de votre dépôt GitHub.

## Accès à GitHub Actions Secrets

1. Sur GitHub, naviguez vers votre dépôt `ecommerce-aws-poc`
2. Cliquez sur **Settings** (dans l'onglet du dépôt)
3. Dans le menu de gauche, cliquez sur **Secrets and variables** > **Actions**
4. Cliquez sur **New repository secret** pour chaque secret que vous devez ajouter

## Secrets Requis

### AWS Credentials

| Secret Name | Description | Exemple |
|-------------|-------------|---------|
| `AWS_ACCESS_KEY_ID` | Clé d'accès AWS IAM | `AKIAIOSFODNN7EXAMPLE` |
| `AWS_SECRET_ACCESS_KEY` | Clé secrète AWS IAM | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `AWS_REGION` | Région AWS où se trouvent vos ressources | `us-east-1` |
| `AWS_S3_BUCKET` | Nom du bucket S3 pour le déploiement | `my-deployment-bucket` |

## Création des Ressources AWS Nécessaires

### 1. Créer un utilisateur IAM avec les permissions adéquates

1. Connectez-vous à la console AWS et accédez au service IAM
2. Créez un nouvel utilisateur avec accès programmatique
3. Attachez les politiques suivantes:
   - `AmazonS3FullAccess` (ou une politique plus restrictive si vous préférez)

Exemple de politique IAM personnalisée (recommandé):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::my-deployment-bucket/*",
                "arn:aws:s3:::my-deployment-bucket"
            ]
        }
    ]
}
```

### 2. Créer un Bucket S3

1. Accédez au service S3 dans la console AWS
2. Créez un nouveau bucket (par exemple `my-deployment-bucket`)
3. Configurez les permissions appropriées (bloqué au public sauf si nécessaire)
4. Créez des dossiers: `/deployments` et `/deployments/metadata`

## Vérification

Après avoir configuré tous les secrets, vous pouvez déclencher manuellement le workflow pour tester qu'il fonctionne correctement:

1. Dans votre dépôt GitHub, allez dans l'onglet **Actions**
2. Sélectionnez le workflow "CI/CD Pipeline for E-commerce POC"
3. Cliquez sur **Run workflow** > **Run workflow**

Si tout est correctement configuré, vous devriez voir le package de déploiement dans votre bucket S3 après l'exécution du workflow. 