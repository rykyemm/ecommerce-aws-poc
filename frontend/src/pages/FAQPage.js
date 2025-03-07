import React from 'react';
import { Container, Accordion } from 'react-bootstrap';

const FAQPage = () => {
  return (
    <Container>
      <h1 className="page-title">FAQ - Déploiement sur AWS Elastic Beanstalk</h1>
      
      <Accordion defaultActiveKey="0" className="mb-5">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Qu'est-ce qu'AWS Elastic Beanstalk?</Accordion.Header>
          <Accordion.Body>
            AWS Elastic Beanstalk est un service qui simplifie le déploiement et la gestion d'applications web. Il gère automatiquement le déploiement, le provisionnement de capacité, l'équilibrage de charge, la mise à l'échelle automatique et la surveillance de l'état de santé de votre application.
          </Accordion.Body>
        </Accordion.Item>
        
        <Accordion.Item eventKey="1">
          <Accordion.Header>Comment préparer l'application pour AWS Elastic Beanstalk?</Accordion.Header>
          <Accordion.Body>
            <p>Pour préparer cette application e-commerce pour AWS Elastic Beanstalk :</p>
            <ol>
              <li>Assurez-vous que tous les fichiers sont correctement structurés dans votre projet</li>
              <li>Vérifiez que les fichiers <code>.ebextensions</code> sont présents et configurés</li>
              <li>Créez un package de déploiement en compressant tous les fichiers du projet</li>
              <li>Configurez les variables d'environnement pour la connexion à la base de données</li>
            </ol>
          </Accordion.Body>
        </Accordion.Item>
        
        <Accordion.Item eventKey="2">
          <Accordion.Header>Comment déployer l'application sur AWS Elastic Beanstalk?</Accordion.Header>
          <Accordion.Body>
            <p>Pour déployer cette application e-commerce sur AWS Elastic Beanstalk :</p>
            <ol>
              <li>Installez et configurez l'AWS CLI sur votre machine locale</li>
              <li>Initialisez votre application Elastic Beanstalk avec <code>eb init</code></li>
              <li>Créez un environnement avec <code>eb create</code></li>
              <li>Déployez les mises à jour avec <code>eb deploy</code></li>
            </ol>
            <p>Exemple de commandes :</p>
            <pre>
{`# Initialisation de l'application
eb init

# Création d'un environnement
eb create my-env-name

# Déploiement des mises à jour
eb deploy`}
            </pre>
          </Accordion.Body>
        </Accordion.Item>
        
        <Accordion.Item eventKey="3">
          <Accordion.Header>Comment configurer la base de données RDS avec Elastic Beanstalk?</Accordion.Header>
          <Accordion.Body>
            <p>La base de données RDS est configurée automatiquement grâce au fichier <code>.ebextensions/02_database.config</code>. Ce fichier contient les ressources CloudFormation qui créent une instance RDS MySQL et configurent les groupes de sécurité appropriés.</p>
            <p>Les paramètres de connexion à la base de données sont automatiquement injectés comme variables d'environnement dans l'application :</p>
            <ul>
              <li><code>RDS_HOSTNAME</code> : L'adresse du serveur de base de données</li>
              <li><code>RDS_DB_NAME</code> : Le nom de la base de données</li>
              <li><code>RDS_USERNAME</code> : Le nom d'utilisateur</li>
              <li><code>RDS_PASSWORD</code> : Le mot de passe</li>
            </ul>
            <p>Ces variables sont utilisées dans le fichier <code>backend/config/database.php</code> pour établir la connexion.</p>
          </Accordion.Body>
        </Accordion.Item>
        
        <Accordion.Item eventKey="4">
          <Accordion.Header>Comment surveiller et gérer l'application sur Elastic Beanstalk?</Accordion.Header>
          <Accordion.Body>
            <p>AWS Elastic Beanstalk fournit plusieurs outils pour surveiller et gérer votre application :</p>
            <ul>
              <li>Console AWS : Accédez à la console Elastic Beanstalk pour visualiser les journaux, surveiller l'état de santé et gérer l'environnement</li>
              <li>CLI EB : Utilisez des commandes comme <code>eb logs</code>, <code>eb health</code>, et <code>eb status</code> pour surveiller votre application</li>
              <li>CloudWatch : Configurez des alertes pour être notifié en cas de problèmes</li>
            </ul>
            <p>Vous pouvez également configurer la mise à l'échelle automatique pour gérer les pics de trafic en modifiant la configuration dans la console Elastic Beanstalk.</p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default FAQPage; 