1. Description du projet
Un système décentralisé de gestion des erreurs médicales et de la réputation des hôpitaux via la blockchain. Il permet aux patients de contester des erreurs, aux auditeurs de les valider, et aux hôpitaux de voir leur réputation évoluer en conséquence.

2. Fonctionnalités principales
Enregistrement des hôpitaux
Suspension automatique si > 5 erreurs validées
Mise à jour du score de réputation
Historique des erreurs et des scores
Gestion des patients et contestation des erreurs
Audits par les auditeurs avec impact sur la réputation
Suivi de la réputation dans le temps

3. Architecture des Smart Contracts
ManagerHopital.sol

PatientManager.sol

AuditeurManager.sol

ReputationTracker.sol

4. Technologies utilisées
Solidity
Hardhat
Node.js
Ethers.js


5. Déploiement et test
Réseau : Hardhat local ou testnet Sepolia

Outils : npx hardhat test pour les tests unitaires

5 tests principaux : ajout hôpital, suspension, contestation, audit, réputation

6. Instructions d'installation
npx hardhat compile \n
npx hardhat test \n
npx hardhat node \n
npx hardhat run scripts/deploy.js --network localhost

