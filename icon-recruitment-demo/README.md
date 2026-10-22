# ICON Recruitment — public-safe demo careers page

This folder hosts a **fictional demonstration** careers page on GitHub Pages. It is a sales/presentation surface, **not** an authorized candidate-intake environment.

## Present structure

- `index.html`, `styles.css`, `app.js`: static careers listing, job details, and a click-through four-stage **simulation** of candidate intake, private CV receipt and storage, AI-assisted screening, and recruiter-controlled decisions. No form submission, personal data collection, CV upload, authentication token, or Supabase credentials are present.
- `jobs.json`: explicitly fictional sample roles with `DEMO-PRJ-*` identifiers. These do not map to real vacancy IDs.
- `published-jobs.json`: separate sanitized, explicitly authorized HR-demo-publication feed. Only `DEMO-VAC-*` identifiers appear. The n8n workflow `ICON Recruitment — Public-Safe Demo Vacancy Publisher` refreshes this file, reads back the deployed page and acknowledges only verified demo publication state.
- `branding.json`: optional presentation-only branding profile. Changing this file does **not** change the n8n publisher or the database. Sample ICON values preserve the current look.

## Presentation branding (client-style mockups)

Edit `branding.json` in this folder:

```json
{
  "mode": "demonstration",
  "companyName": "ICON",
  "productLabel": "RECRUITMENT",
  "browserTitle": "Careers Demo | ICON Recruitment",
  "logoPath": null,
  "theme": {
    "primary": "#149eec",
    "primaryHover": "#0c86d5",
    "deep": "#071c2f"
  }
}
```

`companyName`, `productLabel`, and `browserTitle` are display text only. Colors must be six-character hex values. To substitute a client-style logo, add the approved artwork to `icon-recruitment-demo/assets/` as a **PNG, WebP, or SVG** with a simple file name (e.g., `client-logo.png`) and set `logoPath` to `assets/client-logo.png`. The script rejects external logo URLs, arbitrary paths and CSS fragments. The underlying page remains clearly labeled **DEMO**, regardless of branding.

Do not use a prospective client's brand externally without permission. A client-branded sales demo should remain clearly labeled as illustrative until an actual contract and deployment.

## Application preview versus real secure CV intake

The Apply preview is intentionally **non-collecting**. It walks through the actual ICON Recruitment architecture but does **not** call Tally, n8n or Supabase. Do not replace it with a direct Tally link for fictional `DEMO-PRJ-*` or `DEMO-VAC-*` positions.

The real candidate pipeline uses the **242-node** `Recruitment Solution - Secure CV Storage` workflow, supported by the 26-node receipt-recovery and 3-node sanitized-error-handler workflows. Its signed Tally intake, immutable durable receipt, private CV verification, replay protections, screening and duplicate constraints must be retained. The old 25-node intake export is **obsolete**.

**Separate future commercial cutover (not done here):**

1. Identify the actual client careers hosting/publishing platform and obtain client authorization.
2. Establish a reviewed, audited publisher that uses the client's approved Open vacancies; the demonstration publisher intentionally requires **Draft** and must never be treated as production publication.
3. Carry the verified `vacancies.id` through each real application link to the published Tally hidden field. The secure intake upgrade must be applied **in place** on the existing main n8n workflow, and the submitted ID validated by Supabase for the correct client and Open status. Do not generate an application merely from a `DEMO-*` public ID.
4. Validate an end-to-end synthetic application and its recovery handling before directing real candidates there.
5. Move or rebrand the static careers presentation after the client contract; migrate presentation assets and theme, not the fictional demo feed or its authorization semantics.

The GitHub-hosted demo site and its publisher can stay available for sales even after client implementations exist.

## Demo publishing caveat

As of 22 October 2026, `published-jobs.json` contains an **empty** jobs array, and the synthetic sample data in `jobs.json` remains visible. Approval or queueing of new demo publications is a business action, not an automatic consequence of editing this folder.
