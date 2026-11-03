# Relances clients au 3 novembre 2026

**Date du calcul :** 03/11/2026
**Source :** `exemples/factures.csv` (données fictives de l'entreprise d'exemple Lumen Pro). Ce livrable est un essai : aucune donnée réelle n'a été utilisée.
**Barème :** `references/bareme-relances.md` (1 à 15 jours : rappel ; 16 à 45 jours : relance ; plus de 45 jours : dernière relance).

## Tableau des retards, trié par montant

| Client | Factures | Total dû TTC | Retard maximal | Niveau |
|---|---|---|---|---|
| Gamma Entrepôts | F-2026-087 (7 250,00 €, échéance 19/09/2026) | 7 250,00 € | 45 jours | 2 · Relance |
| Zêta Immobilier | F-2026-095 (3 600,00 €, échéance 25/10/2026) | 3 600,00 € | 9 jours | 1 · Rappel |
| Bêta Bureaux | F-2026-084 (1 860,00 €, échéance 01/09/2026) ; F-2026-091 (540,00 €, échéance 10/10/2026) | 2 400,00 € | 63 jours | 3 · Dernière relance |
| Alpha Logistique | F-2026-097 (1 740,00 €, échéance 31/10/2026) | 1 740,00 € | 3 jours | 1 · Rappel |
| Delta Conseil | F-2026-090 (960,00 €, échéance 05/10/2026) | 960,00 € | 29 jours | 2 · Relance |

**Total des sommes en retard : 15 950,00 € TTC**, 6 factures, 5 clients.

Non relancées car pas encore échues : F-2026-099 (Êta Industrie, 5 100,00 €, échéance 07/11/2026) et F-2026-100 (Gamma Entrepôts, 1 320,00 €, échéance 11/11/2026). Gamma Entrepôts aura donc une seconde facture échue la semaine prochaine.

## Brouillons d'emails

### 1. Gamma Entrepôts · niveau 2

**À :** ap@gamma-entrepots.example
**Objet :** Facture F-2026-087 en attente de règlement

Bonjour,

Sauf erreur de notre part, la facture F-2026-087 d'un montant de 7 250,00 € TTC, arrivée à échéance le 19 septembre 2026, n'a pas encore été réglée.

Pourriez-vous nous indiquer la date à laquelle le paiement sera effectué ? Si un étalement vous facilite les choses, nous pouvons en convenir ensemble.

Vous trouverez la facture en pièce jointe. Le règlement peut se faire par [moyen de paiement à compléter].

Bien cordialement,
[Signature à compléter]

### 2. Zêta Immobilier · niveau 1

**À :** gestion@zeta-immo.example
**Objet :** Facture F-2026-095 : petit rappel

Bonjour,

Il s'agit sans doute d'un simple oubli : la facture F-2026-095 d'un montant de 3 600,00 € TTC est arrivée à échéance le 25 octobre 2026.

Vous la trouverez en pièce jointe. Le règlement peut se faire par [moyen de paiement à compléter].

Si le paiement est déjà parti, merci de ne pas tenir compte de ce message.

Bien cordialement,
[Signature à compléter]

### 3. Bêta Bureaux · niveau 3 (à faire valider par le dirigeant avant tout envoi)

**À :** factures@beta-bureaux.example
**Objet :** Factures en retard : dernière relance avant transmission

Bonjour,

Malgré nos précédents messages, les factures suivantes restent impayées à ce jour :

- F-2026-084 : 1 860,00 € TTC, échéance au 1er septembre 2026
- F-2026-091 : 540,00 € TTC, échéance au 10 octobre 2026

Soit un total de 2 400,00 € TTC.

Nous vous remercions de procéder au règlement ou de nous indiquer une date de paiement ferme sous huit jours. À défaut, nous serons contraints de transmettre le dossier.

Les factures sont jointes à ce message. Le règlement peut se faire par [moyen de paiement à compléter].

Bien cordialement,
[Signature à compléter]

### 4. Alpha Logistique · niveau 1

**À :** compta@alpha-logistique.example
**Objet :** Facture F-2026-097 : petit rappel

Bonjour,

Il s'agit sans doute d'un simple oubli : la facture F-2026-097 d'un montant de 1 740,00 € TTC est arrivée à échéance le 31 octobre 2026.

Vous la trouverez en pièce jointe. Le règlement peut se faire par [moyen de paiement à compléter].

Si le paiement est déjà parti, merci de ne pas tenir compte de ce message.

Bien cordialement,
[Signature à compléter]

### 5. Delta Conseil · niveau 2

**À :** admin@delta-conseil.example
**Objet :** Facture F-2026-090 en attente de règlement

Bonjour,

Sauf erreur de notre part, la facture F-2026-090 d'un montant de 960,00 € TTC, arrivée à échéance le 5 octobre 2026, n'a pas encore été réglée.

Pourriez-vous nous indiquer la date à laquelle le paiement sera effectué ? Si un étalement vous facilite les choses, nous pouvons en convenir ensemble.

Vous trouverez la facture en pièce jointe. Le règlement peut se faire par [moyen de paiement à compléter].

Bien cordialement,
[Signature à compléter]

## À vérifier avant usage

- Données d'exemple : remplacer `exemples/factures.csv` par le vrai export dans `mes-fichiers/` avant tout usage réel.
- Vérifier qu'aucun paiement n'est arrivé depuis l'export (rapprochement bancaire).
- Bêta Bureaux : le niveau 3 suppose des relances antérieures. Confirmer qu'elles ont bien été envoyées ; sinon, repasser au niveau 2. Le dirigeant valide ce message avant envoi.
- Gamma Entrepôts : 45 jours de retard, limite haute du niveau 2. Il bascule au niveau 3 demain.
- Pénalités de retard et indemnité de 40 € : non mentionnées. À ajouter seulement si elles figurent sur vos factures ou conditions générales.
- Champs `[à compléter]` : moyen de paiement (IBAN ou lien), signature.
- Joindre les factures en PDF à chaque email.
- Aucun email n'a été envoyé.
