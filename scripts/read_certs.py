import pypdf, os

folder = r"c:/Users/S4C/Desktop/AI/Finished/PortfolioUpdated/portfolio/public/Certification"

for fname in ["AWS-AI-PRACTITIONER-COURSE.pdf", "AWS-Becoming-Machine-learning-engineer.pdf"]:
    path = os.path.join(folder, fname)
    print(f"\n==== {fname} ====", flush=True)
    try:
        reader = pypdf.PdfReader(path, strict=False)
        text = ""
        for i, page in enumerate(reader.pages[:3]):
            try:
                t = page.extract_text()
                if t:
                    text += t + "\n"
            except Exception as pe:
                text += f"[page {i} err]\n"
        print(text[:800].strip(), flush=True)
    except Exception as e:
        print(f"ERROR: {e}", flush=True)

