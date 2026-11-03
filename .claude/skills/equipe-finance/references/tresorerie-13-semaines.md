# Gabarit de prévision de trésorerie sur 13 semaines

| Semaine | Début | Solde de début | Encaissements | Décaissements | Solde de fin | Sous le seuil ? |
|---|---|---|---|---|---|---|
| S1 | [lundi] | [solde actuel] | [factures dont l'échéance tombe cette semaine] | [dépenses prévues] | = début + entrées − sorties | oui / non |
| … | | = solde de fin de la semaine précédente | | | | |
| S13 | | | | | | |

## Règles

- Le solde de départ vient du relevé bancaire le plus récent ; écris la date du relevé.
- Un encaissement est placé à la semaine de son échéance. Scénario prudent : décalé de 4 semaines.
- Les dépenses récurrentes sont placées à leur date habituelle, lue sur les relevés passés.
- Une dépense sans montant connu reste en `[à compléter]` et n'entre pas dans le calcul : signale-la.
- Le seuil d'alerte est celui que donne l'utilisateur. Sans seuil, demande-le.
