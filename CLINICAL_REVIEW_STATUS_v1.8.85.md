# Clinical Atlas 360 v1.8.85 — Source audit and review status

**Status: Clinical review build, NOT approved for production medical use.**

## Verified correction

- Vitamin D testing: reconstructed all branches from the original single-page PDF flowchart image, including the non-pregnant adult gate, symptoms/proximal weakness, age, BMI, diet, medications, medical conditions and autoimmune diseases.
- NICE PH56 and Saudi Choosing Wisely were compared separately; differences between source-specific criteria and broader clinical recommendations are explicitly disclosed.
- The source flowchart and the external guidance are **not interchangeable**.

## Remaining review queue

The remaining 27 topics have **not** completed full original-PDF visual comparison, numerical verification or guideline cross-checking. They are labeled accordingly in the Atlas.

| ID | Topic | Source pages | Review status |
|---|---|---:|---|
| g1 | Abnormal Uterine Bleeding | 7 | Source text provisionally organized; full clinical and diagram review pending |
| g2 | Severe Asthma – Biologic Therapy | 7 | Source text provisionally organized; full clinical and diagram review pending |
| g3 | Chronic Migraine – Botulinum Toxin | 4 | Source text provisionally organized; full clinical and diagram review pending |
| g4 | Dyslipidemia – Chronic Disease Management | 2 | Source text provisionally organized; full clinical and diagram review pending |
| g5 | Diabetes Mellitus – Chronic Disease Management | 4 | Source text provisionally organized; full clinical and diagram review pending |
| g6 | Hypertension – Chronic Disease Management | 3 | Source text provisionally organized; full clinical and diagram review pending |
| g7 | Thyroid Disorders – Chronic Disease Management | 3 | Source text provisionally organized; full clinical and diagram review pending |
| g8 | Carpal Tunnel Syndrome (CTS) | 4 | Source text provisionally organized; full clinical and diagram review pending |
| g9 | Celiac Disease – Diagnosis and Follow-up | 3 | Source text provisionally organized; full clinical and diagram review pending |
| g10 | Cervical Spine MRI – Clinical Indications | 2 | Source text provisionally organized; full clinical and diagram review pending |
| g11 | DKA and HHS – Admission and Discharge | 2 | Source text provisionally organized; full clinical and diagram review pending |
| g12 | Deep Vein Thrombosis (DVT) | 3 | Source text provisionally organized; full clinical and diagram review pending |
| g13 | Diabetes – Screening | 3 | Source text provisionally organized; full clinical and diagram review pending |
| g14 | Dyslipidemia – Advanced Lipid-Lowering Therapy | 12 | Source text provisionally organized; full clinical and diagram review pending |
| g15 | Ganglion Cyst – Management | 2 | Source text provisionally organized; full clinical and diagram review pending |
| g16 | Lumbar Spine MRI – Low Back Pain | 5 | Source text provisionally organized; full clinical and diagram review pending |
| g17 | Hemorrhoids – Management | 3 | Source text provisionally organized; full clinical and diagram review pending |
| g18 | Chronic Inflammatory Demyelinating Polyneuropathy – IVIG | 5 | Source text provisionally organized; full clinical and diagram review pending |
| g19 | Guillain-Barré Syndrome (GBS) – IVIG | 4 | Previously structured; pending full independent verification |
| g20 | Myasthenia Gravis – IVIG | 5 | Source text provisionally organized; full clinical and diagram review pending |
| g21 | Inflammatory Bowel Disease – Biologic Therapy | 5 | Source text provisionally organized; full clinical and diagram review pending |
| g22 | Nerve Conduction Studies and Electromyography | 7 | Source text provisionally organized; full clinical and diagram review pending |
| g23 | Omega-3 and Icosapent Ethyl – Prescribing Indications | 5 | Source text provisionally organized; full clinical and diagram review pending |
| g24 | Precocious Puberty | 7 | Source text provisionally organized; full clinical and diagram review pending |
| g25 | Rheumatoid Arthritis – Diagnostic Testing | 4 | Source text provisionally organized; full clinical and diagram review pending |
| g26 | Rheumatoid Arthritis – Treatment Monitoring | 5 | Source text provisionally organized; full clinical and diagram review pending |
| g27 | Skin and Soft Tissue Infections | 4 | Source text provisionally organized; full clinical and diagram review pending |
| g28 | Vitamin D – Testing Indications | 1 | Flowchart reconstructed from source image; external comparison documented |

## Deployment safety

- Keep v1.8.83 deployed until all 28 topics are verified and tested.
- Do not commit or push this review build to the public clinical site.
- The older source text remains visible with prominent warning banners for review, not clinical use.
## Preliminary source-document visual-risk inventory

Automated triage only; drawing-heavy pages are candidates for manual diagram/table inspection, **not** evidence of clinical correctness.

| Uploaded PDF | Pages | YES/NO tokens | Drawing-heavy pages |
|---|---:|---:|---:|
| Abnormal Utrine Bleeding Guidelines(3).pdf | 7 | 2 | 2 |
| Asthma Biologic Guidelines(2).pdf | 7 | 8 | 3 |
| Botox in Migraine Indications(2).pdf | 4 | 2 | 1 |
| CDM - DLP(2).pdf | 2 | 1 | 2 |
| CDM - DM(2).pdf | 4 | 0 | 2 |
| CDM - HTN(2).pdf | 3 | 0 | 2 |
| CDM - Thyroid Disorders(2).pdf | 3 | 1 | 3 |
| CTS guidelines(3).pdf | 4 | 5 | 1 |
| Celiac disease Dx approach and frequency of follow up investigations(2).pdf | 3 | 0 | 2 |
| Cervical MRI - common clinical indicationsdocx(2).pdf | 2 | 1 | 1 |
| Cervical MRI - common clinical indicationsdocx[1].pdf | 2 | 1 | 1 |
| DKA & HHS - Admission & discharge criteria(1).pdf | 2 | 1 | 0 |
| DVT protocol for adult(1).pdf | 3 | 13 | 3 |
| Diabetes Screening(1).pdf | 3 | 1 | 1 |
| Dyslipidemia Biologic Guidelines(2).pdf | 12 | 8 | 7 |
| Ganglion Cyst(1).pdf | 2 | 2 | 0 |
| Guidelines For Lumbosacral Low back pain MRI(1).pdf | 5 | 0 | 1 |
| Hemorrhoids Managment(1).pdf | 3 | 0 | 0 |
| IVIG in CIDP (CHI) - Guideline(1).pdf | 5 | 6 | 0 |
| IVIG in Guillain-Barre Syndrome (CHI) - Guideline(2).pdf | 4 | 5 | 0 |
| IVIG in Myasthenia Gravis (CHI) - Guideline(2).pdf | 5 | 4 | 2 |
| Inflammatory Bowel Disease (IBD) - Clinical Indications for Biologics(1).pdf | 5 | 4 | 1 |
| NCS & EMG(2).pdf | 7 | 8 | 0 |
| Omega-3 Supplementation Indications Guideline(2).pdf | 5 | 1 | 2 |
| Precocious Puberty(3).pdf | 7 | 11 | 3 |
| Rheumatoid Arthritis (RA) - Diagnostic Testing(2).pdf | 4 | 5 | 1 |
| Rheumatoid Arthritis (RA) - Laboratory Monitoring of Therapy(2).pdf | 5 | 6 | 1 |
| Skin and soft tissue Infection(2).pdf | 4 | 0 | 0 |
| Vitamin D Testing Decision Guide(3).pdf | 1 | 18 | 1 |
