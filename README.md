# cfbschedules

The data and page behind *A Designed Non-Conference Schedule*: what a centrally designed FBS
non-conference schedule with a reserved Swiss week would look like, for every season 2004-2025
(2020 excluded), with an interactive team-by-team view.

Served by GitHub Pages at https://bwingert89.github.io/cfbschedules/

## Files

| file | what it is |
|---|---|
| `index.html` | the whole page, standalone: the write-up, the three-season overview figure, the season/team selector, the two crest graphs and the slate tables |
| `slates.json` | every team-season: actual and designed non-conference slates, the in-season Swiss-week draw shares, the conference gap rows, league games moved (5.5 MB) |
| `pairs.json` | non-conference games between each pair of conferences, per season, real schedule and calendar |
| `graphs.json` | node positions (spring layout from a spectral start) and edge lists for the real schedule and the calendar, per season |
| `logos/<id>.png` | team crests, 64 px, keyed by CollegeFootballData team id |
| `networks.png` | the static overview of 2014, 2019 and 2024, real schedule above and calendar below |
| `bear/post.html` | the page body for a Bear Blog post |
| `bear/style.css` | the page's CSS scoped under `.cfbsched`, for Bear's custom CSS |
| `bear/footer.js` | the script for Bear's footer directive; it loads the data from this site and is inert on other pages |

## How the numbers were made

The design is the `cfbgraph.schedule` package of a private project: every conference game as played
(dates free to move), independents and protected rivalries pinned, two or three early cross-conference
games in weeks 1-4 chosen by simulated annealing on the variance of the between-conference strength
gap plus travel, difficulty-fairness, interest and tier costs, and a Swiss week before rivalry weekend
paired in season on recovered ratings. Weights tuned by Gaussian-process expected improvement on 2015,
2017 and 2019 only. Ratings are season-final SP+; games and coordinates from CollegeFootballData.

The files here are outputs. Regenerating them needs the private project (`scripts/scratch/schedule_page/`
there: `design_store.py`, `layouts.py`, `slates_from_store.py`, `build_page.py`, `page.js`).

## Notes

Team crests are the schools' marks, used here to identify teams in a non-commercial analysis.
