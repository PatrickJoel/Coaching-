# Ton équipe IA : 6 départements, 24 agents

Un kit de Just Use AI. Gratuit, à utiliser et à adapter librement.

## Ce qu'il y a dedans

| Dossier | Contenu |
|---|---|
| `pour-l-app-claude/` | 7 fichiers `.zip`, un par skill, à importer dans l'app Claude (web ou bureau) |
| `pour-claude-code/` | Le dossier prêt à ouvrir dans Claude Code : skills, `CLAUDE.md`, données d'exemple |

## Option 1 · Dans l'app Claude (le plus simple)

1. Dans Claude, ouvre **Paramètres > Capacités** (*Settings > Capabilities* en anglais) et active **l'exécution de code et la création de fichiers** (*Code execution and file creation*). En Team ou Enterprise, c'est le propriétaire de l'organisation qui l'active, et il peut aussi déployer les skills pour toute l'équipe.
2. Va dans **Personnaliser > Skills** (*Customize > Skills*), clique sur **+**, puis **Créer un skill** et **Importer un skill** (*Create skill*, *Upload a skill*).
3. Importe les 7 fichiers `.zip` de `pour-l-app-claude/`, un par un. Commence par `equipe-orchestrateur.zip` et les départements qui te servent.
4. Ouvre une conversation, joins ton fichier (export de factures, liste de leads…) et demande, par exemple : « Prépare les relances de mes factures en retard ».

Les noms des menus peuvent changer : la page d'aide d'Anthropic « Using Skills in Claude » fait foi.

## Option 2 · Dans Claude Code

1. Ouvre le dossier `pour-claude-code/equipe-ia/` dans Claude Code (application de bureau ou terminal).
2. Dépose tes exports dans `mes-fichiers/`.
3. Demande : « Prépare mon lundi ». Les livrables arrivent dans `livrables/`.

Pour essayer sans tes données, demande : « Essaie avec les exemples : prépare les relances de factures ».

## Les règles de l'équipe

Les agents préparent, un humain décide. Rien n'est envoyé, publié ni payé. Aucun chiffre n'est inventé : ce qui manque est marqué `[à compléter]`. Aucune décision n'est prise sur une personne (pas de tri de CV, pas de notation de salarié).

## Adapter l'équipe

Chaque skill est un fichier texte (`SKILL.md`) et quelques modèles dans `references/`. Change un barème, un seuil ou un ton directement dans le fichier, puis réimporte le `.zip` dans l'app.
