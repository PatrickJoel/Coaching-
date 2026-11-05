#!/usr/bin/env python3
"""Envoie les emails 1 validés (adresses vérifiées) via l'API Brevo.

Usage :
  BREVO_API_KEY=... python3 scripts/envoi_brevo.py <dossier-livrable>            # aperçu, n'envoie rien
  BREVO_API_KEY=... python3 scripts/envoi_brevo.py <dossier-livrable> --envoyer  # envoie
L'expéditeur est l'adresse ops@ vérifiée dans Brevo (lue via /v3/senders).
Chaque envoi est consigné dans <dossier>/envois-brevo.md.
"""
import json, os, re, sys, urllib.request, datetime

API = "https://api.brevo.com/v3"
NOM_EXPEDITEUR = "Patrick Taranto"

def appel(methode, chemin, corps=None):
    req = urllib.request.Request(API + chemin, method=methode,
        data=json.dumps(corps).encode() if corps else None,
        headers={"api-key": os.environ["BREVO_API_KEY"], "accept": "application/json",
                 "content-type": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read() or b"{}")

def lire_emails(chemin):
    blocs = re.split(r"^### ", open(chemin, encoding="utf-8").read(), flags=re.M)[1:]
    out = []
    for b in blocs:
        compte = b.splitlines()[0].replace(" — email 1", "").strip()
        m = re.search(r"^Destinataire : (.+?) \(([^,\s)]+@[^,\s)]+), ([^)]*)\)", b, re.M)
        if not m or not m.group(3).startswith("vérifié"):
            continue  # pas d'adresse, probable, générique : non envoyé
        objet = re.search(r"^Objet : (.+)$", b, re.M).group(1).strip()
        corps = b.split("\nObjet : ", 1)[1].split("\n", 1)[1]
        corps = corps.split("\nSource :")[0].strip()
        out.append(dict(compte=compte, nom=m.group(1).strip(), email=m.group(2), objet=objet, corps=corps))
    return out

def main():
    dossier = sys.argv[1]
    envoyer = "--envoyer" in sys.argv
    senders = appel("GET", "/senders").get("senders", [])
    ops = [s for s in senders if s["email"].lower().startswith("ops@") and s.get("active")]
    if len(ops) != 1:
        sys.exit(f"Expéditeur ops@ actif introuvable ou ambigu dans Brevo : {[s['email'] for s in senders]}")
    expediteur = {"name": NOM_EXPEDITEUR, "email": ops[0]["email"]}
    messages = lire_emails(os.path.join(dossier, "emails.md"))
    print(f"Expéditeur : {expediteur['email']} — {len(messages)} emails")
    journal = os.path.join(dossier, "envois-brevo.md")
    for msg in messages:
        print(f"- {msg['compte']} → {msg['email']} | {msg['objet']}")
        if not envoyer:
            continue
        r = appel("POST", "/smtp/email", {
            "sender": expediteur, "replyTo": expediteur,
            "to": [{"email": msg["email"], "name": msg["nom"]}],
            "subject": msg["objet"], "textContent": msg["corps"],
            "tags": ["prospection-cabinets-lyon"]})
        ligne = f"| {datetime.datetime.now():%Y-%m-%d %H:%M} | {msg['compte']} | {msg['email']} | {r.get('messageId','ERREUR')} |\n"
        with open(journal, "a", encoding="utf-8") as f:
            f.write(ligne)
    if not envoyer:
        print("Aperçu seulement. Ajoute --envoyer pour envoyer.")

if __name__ == "__main__":
    main()
