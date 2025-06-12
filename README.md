# beauty-cms

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
# Beauty CMS - Base de données

Ce document décrit la structure complète de la base de données **beauty_cms** utilisée pour la plateforme de gestion et réservation d'instituts de beauté.

---

## Tables et dictionnaire de données

Chaque table est décrite avec ses champs, types et une brève description pour faciliter la compréhension et la maintenance.

---

Table users
Champ	Type	Description
id	INT	Identifiant unique (clé primaire)
uid	VARCHAR(128)	Identifiant unique externe
email	VARCHAR(255)	Email unique
password_hash	VARCHAR(255)	Hash du mot de passe
display_name	VARCHAR(255)	Nom affiché
role	ENUM	Rôle de l'utilisateur (client, owner, admin, operator)
avatar_url	VARCHAR(500)	URL de l'avatar
phone	VARCHAR(20)	Numéro de téléphone
email_verified	BOOLEAN	Email vérifié ou non (false par défaut)
created_at	TIMESTAMP	Date de création
updated_at	TIMESTAMP	Date de dernière mise à jour

Table sites
Champ	Type	Description
id	INT	Identifiant unique
owner_id	INT	Référence à l’utilisateur propriétaire (users.id)
name	VARCHAR(255)	Nom de l’institut
slug	VARCHAR(255)	URL personnalisée unique
tagline	VARCHAR(500)	Slogan ou accroche
description	TEXT	Description détaillée
phone	VARCHAR(20)	Numéro de téléphone
email	VARCHAR(255)	Email de contact
logo_url	VARCHAR(500)	URL du logo
theme	VARCHAR(50)	Thème visuel (défaut : ‘elegant’)
primary_color	VARCHAR(7)	Couleur principale (hexadécimal)
secondary_color	VARCHAR(7)	Couleur secondaire (hexadécimal)
published	BOOLEAN	Publication active ou non
booking_type	ENUM	Type de réservation (integrated, external)
external_booking_url	VARCHAR(500)	URL pour réservation externe
booking_new_tab	BOOLEAN	Ouvre réservation externe dans un nouvel onglet
slot_duration	INT	Durée d’un créneau en minutes (défaut 30)
break_time	INT	Pause entre créneaux en minutes (défaut 15)
created_at	TIMESTAMP	Date de création
updated_at	TIMESTAMP	Date de dernière mise à jour

Table addresses
Champ	Type	Description
id	INT	Identifiant unique
site_id	INT	Référence à l’institut (sites.id)
street	VARCHAR(255)	Adresse (rue)
postal_code	VARCHAR(10)	Code postal
city	VARCHAR(100)	Ville
country	VARCHAR(100)	Pays (défaut ‘France’)
latitude	DECIMAL(10,8)	Latitude GPS
longitude	DECIMAL(11,8)	Longitude GPS

Table opening_hours
Champ	Type	Description
id	INT	Identifiant unique
site_id	INT	Référence à l’institut (sites.id)
day_of_week	TINYINT	Jour de la semaine (0=Dimanche,...,6=Samedi)
open_time	TIME	Heure d’ouverture
close_time	TIME	Heure de fermeture
is_closed	BOOLEAN	Fermé ce jour (false par défaut)

Table service_categories
Champ	Type	Description
id	INT	Identifiant unique
name	VARCHAR(100)	Nom de la catégorie
slug	VARCHAR(100)	URL personnalisée unique
description	TEXT	Description
icon	VARCHAR(100)	Icône associée
created_at	TIMESTAMP	Date de création

Table services
Champ	Type	Description
id	INT	Identifiant unique
site_id	INT	Référence à l’institut (sites.id)
category_id	INT	Référence à la catégorie (service_categories.id)
name	VARCHAR(255)	Nom du service
description	TEXT	Description détaillée
price	DECIMAL(10,2)	Prix
duration	INT	Durée en minutes
color	VARCHAR(7)	Couleur personnalisée (hexadécimal)
is_active	BOOLEAN	Service actif ou non (true par défaut)
sort_order	INT	Ordre d’affichage
created_at	TIMESTAMP	Date de création
updated_at	TIMESTAMP	Date de mise à jour

Table team_members
Champ	Type	Description
id	INT	Identifiant unique
site_id	INT	Référence à l’institut (sites.id)
name	VARCHAR(255)	Nom du membre d’équipe
position	VARCHAR(255)	Poste/fonction
bio	TEXT	Biographie
photo_url	VARCHAR(500)	URL de la photo
email	VARCHAR(255)	Email
phone	VARCHAR(20)	Téléphone
specialties	JSON	Liste des spécialités
is_active	BOOLEAN	Actif ou non (true par défaut)
sort_order	INT	Ordre d’affichage
created_at	TIMESTAMP	Date de création
updated_at	TIMESTAMP	Date de mise à jour

Table gallery_images
Champ	Type	Description
id	INT	Identifiant unique
site_id	INT	Référence à l’institut (sites.id)
title	VARCHAR(255)	Titre de l’image
description	TEXT	Description
image_url	VARCHAR(500)	URL de l’image
alt_text	VARCHAR(255)	Texte alternatif
sort_order	INT	Ordre d’affichage
is_active	BOOLEAN	Image active (true par défaut)
created_at	TIMESTAMP	Date de création

Table clients
Champ	Type	Description
id	INT	Identifiant unique
user_id	INT	Référence à l’utilisateur (users.id)
first_name	VARCHAR(100)	Prénom
last_name	VARCHAR(100)	Nom
email	VARCHAR(255)	Email
phone	VARCHAR(20)	Téléphone
birth_date	DATE	Date de naissance
gender	ENUM	Genre (M, F, Other)
notes	TEXT	Notes diverses
created_at	TIMESTAMP	Date de création
updated_at	TIMESTAMP	Date de mise à jour

Table bookings
Champ	Type	Description
id	INT	Identifiant unique
site_id	INT	Référence à l’institut (sites.id)
client_id	INT	Référence au client (clients.id)
service_id	INT	Référence au service (services.id)
team_member_id	INT	Référence au membre d’équipe (team_members.id)
booking_date	DATE	Date de la réservation
start_time	TIME	Heure de début
end_time	TIME	Heure de fin
status	ENUM	Statut (pending, confirmed, cancelled, completed, no_show)
total_price	DECIMAL(10,2)	Prix total
deposit_amount	DECIMAL(10,2)	Montant de l’acompte
deposit_paid	BOOLEAN	Acompte payé (false par défaut)
notes	TEXT	Notes associées
cancellation_reason	TEXT	Raison d’annulation
cancelled_at	TIMESTAMP NULL	Date d’annulation
created_at	TIMESTAMP	Date de création
updated_at	TIMESTAMP	Date de mise à jour

Table payments
Champ	Type	Description
id	INT	Identifiant unique
booking_id	INT	Référence à la réservation (bookings.id)
amount	DECIMAL(10,2)	Montant du paiement
payment_method	ENUM	Méthode de paiement (card, paypal, cash, transfer, other)
payment_status	ENUM	Statut du paiement (pending, completed, failed, refunded)
transaction_id	VARCHAR(255)	Identifiant de transaction
gateway	VARCHAR(50)	Passerelle de paiement (stripe, paypal, etc.)
gateway_response	JSON	Réponse détaillée de la passerelle
processed_at	TIMESTAMP NULL	Date de traitement
created_at	TIMESTAMP	Date de création

Table availability_exceptions
Champ	Type	Description
id	INT	Identifiant unique
site_id	INT	Référence à l’institut (sites.id)
team_member_id	INT	Référence au membre d’équipe (team_members.id)
exception_date	DATE	Date de l’exception
exception_type	ENUM	Type d’exception (closed, special_hours, unavailable)
start_time	TIME	Heure de début (optionnelle)
end_time	TIME	Heure de fin (optionnelle)
reason	VARCHAR(255)	Raison de l’exception
created_at	TIMESTAMP	Date de création

Table reviews
Champ	Type	Description
id	INT	Identifiant unique
site_id	INT	Référence à l’institut (sites.id)
client_id	INT	Référence au client (clients.id)
booking_id	INT	Référence à la réservation (bookings.id)
rating	TINYINT	Note (1 à 5)
title	VARCHAR(255)	Titre de l’avis
comment	TEXT	Commentaire
is_verified	BOOLEAN	Avis vérifié ou non (false par défaut)
is_published	BOOLEAN	Avis publié ou non (true par défaut)
response	TEXT	Réponse du propriétaire
responded_at	TIMESTAMP NULL	Date de réponse
created_at	TIMESTAMP	Date de création

Table notifications
Champ	Type	Description
id	INT	Identifiant unique
user_id	INT	Référence à l’utilisateur (users.id)
type	VARCHAR(50)	Type de notification
title	VARCHAR(255)	Titre
message	TEXT	Message
data	JSON	Données additionnelles
is_read	BOOLEAN	Lu ou non (false par défaut)
created_at	TIMESTAMP	Date de création

Table user_sessions
Champ	Type	Description
id	INT	Identifiant unique
user_id	INT	Référence à l’utilisateur (users.id)
token_hash	VARCHAR(255)	Hash du token JWT
device_info	VARCHAR(255)	Informations sur l’appareil
ip_address	VARCHAR(45)	Adresse IP
expires_at	TIMESTAMP	Date d’expiration du token
created_at	TIMESTAMP	Date de création

Insertion des catégories de services par défaut
Nom	Slug	Description	Icône
Coiffure	coiffure	Services de coiffure et styling	scissors
Soins du visage	soins-visage	Soins esthétiques du visage	face
Soins du corps	soins-corps	Massages et soins corporels	body
Manucure/Pédicure	manucure-pedicure	Soins des mains et des pieds	hand
Épilation	epilation	Services d’épilation	laser
Maquillage	maquillage	Maquillage et beauté	makeup
Wellness	wellness	Bien-être et relaxation	spa



## Instructions

- Base MySQL en UTF8MB4, collate utf8mb4_unicode_ci.
- Relations entre tables respectent l’intégrité référentielle avec clés étrangères.
- Index optimisés pour les recherches fréquentes.
- Enumérations utilisées pour garantir la validité des données sur certains champs.

---

## Conclusion

Cette base de données est pensée pour être extensible et robuste, avec une vision claire sur la gestion des instituts, des services, des réservations et des interactions clients. La structure est conçue pour faciliter la maintenance et l’ajout futur de fonctionnalités.

---

## Auteur

RICDEV – Développeur Web & Mobile

---

*Prêt à propulser Beauty CMS vers l'avenir avec une architecture solide !*

