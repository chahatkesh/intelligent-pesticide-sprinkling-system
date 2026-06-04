# Documentation

Project documentation for the **Intelligent Pesticide Sprinkling System** (Minor Project Phase-II, NIT Jalandhar).

## Structure

| Folder       | Contents                                                            |
| ------------ | ------------------------------------------------------------------- |
| `reports/`   | LaTeX sources (`.tex`) and the poster planning notes                |
| `pdf/`       | Compiled, ready-to-read PDF outputs                                 |
| `images/`    | Shared figures used by the reports, poster, and the root `README`   |

## Documents

| Document          | Source                          | PDF                        |
| ----------------- | ------------------------------- | -------------------------- |
| Project Report    | `reports/report.tex`            | `pdf/report.pdf`           |
| Project Diary     | `reports/diary_report.tex`      | `pdf/diary_report.pdf`     |
| A0 Poster         | `reports/poster.tex`            | `pdf/poster.pdf`           |
| Poster Planning   | `reports/Poster_Planning.md`    | —                          |

## Building the LaTeX sources

The `.tex` files resolve figures via `\graphicspath{{../images/}{./}}`, so compile
them from inside the `reports/` directory:

```bash
cd docs/reports
pdflatex report.tex
pdflatex diary_report.tex
pdflatex poster.tex      # requires the beamerposter package
```

> Note: `poster.tex` references `nitj.png`, which is not currently committed. Add the
> institute logo to `docs/images/nitj.png` (or update the `\includegraphics` path) before
> recompiling the poster.
