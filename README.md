# bicha
Links
- Remplacer les liens média ../media/ par /media

## EmailJS public key (build)
- Variable supportée: `EMAILJS_PUBLIC_KEY`
- Si la variable est définie au build, elle est injectée dans `dist/index.html`.
- Sinon, la clé par défaut du projet est utilisée.

Exemple:
```bash
EMAILJS_PUBLIC_KEY=pk_xxxxx yarn minify:html
```
