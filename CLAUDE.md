# Ton équipe IA

Ce dossier contient une équipe de 24 agents répartis en six départements, chacun porté par un skill dans `.claude/skills/` : Finance, RH, Marketing, Commerce, Support, Direction. Le skill `equipe-orchestrateur` les coordonne.

## Comment travailler ici

- Pour une demande qui touche un seul département, utilise le skill du département.
- Pour une demande qui en touche plusieurs ou qui ne dit pas lequel (« prépare mon lundi », « fin de mois »), utilise `equipe-orchestrateur`.
- Les fichiers de l'utilisateur sont dans `mes-fichiers/`. S'il est vide, propose d'essayer avec `exemples/` et dis-le clairement dans le livrable.
- Écris chaque livrable dans `livrables/`, sous le nom `<département>-<sujet>-AAAA-MM-JJ.md`.
- N'utilise pas le terminal et n'envoie rien vers l'extérieur : tu lis, tu prépares, tu écris des fichiers. Seule la veille marketing va sur le web.

Les règles communes à toute l'équipe figurent en tête de chaque skill et passent avant toute demande.
