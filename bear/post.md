<!-- The post as Markdown; the interactive pieces are HTML blocks, each wrapped in its own <div class="cfbsched"> so the
     blog's scoped CSS applies whatever the Markdown renderer does with open tags. Paste the whole file into a Bear post.
     Keep a blank line before and after every HTML block, never indent one, and leave the ids alone
     (sel-season, sel-team, picker-hint, slate-*, draw-table, moved-*, pair-table, pair-note, svg-actual, svg-calendar, graph-*,
     sel-pairs-season, pairs-*). -->

<div class="cfbsched">
<p class="lede">Every FBS program schedules its own non-conference games, for itself. What happens if the sport schedules them centrally, to learn as much as it can about how its conferences compare, and what does that cost the people who schedule today?</p>
</div>

## The problem the schedule is asked to solve

A rating system can only compare two teams through the games that connect them. Draw the season as a graph, teams as nodes and games as edges, and conference play fills in each league's own cluster densely while the non-conference games are the only bridges between clusters. Those bridges are the whole basis for any claim that the SEC is stronger than the Big 12, or that a 10–2 Group of Five champion belongs in the playoff over a 9–3 power team.

Today nobody is responsible for those bridges. A power program buys home games against weaker opponents; a Group of Five program sells them; an athletic director schedules for wins, gate receipts and travel budgets, which is a perfectly reasonable thing for an athletic director to do. The result is a graph that has become better stitched inside each tier since 2004 and more thinly connected across the power/Group of Five seam, which is the one division a selection committee most needs to see across.

The yardstick used here makes that precise. For a least-squares margin rating, the variance of its estimate of the gap between two conferences' average strengths depends only on the schedule graph. With the documented 16-point noise of a game margin, **16 times the square root of that variance is the standard error, in points, of what the schedule lets a rating say about conference A versus conference B.** On the real schedule that number averages about four points over all conference pairs. It is the number a designed schedule has to shrink.

## How the design works

The matchups a school did not choose for connectivity's sake are left as they were: every conference pairing, every independent's slate, every protected rivalry (a pair that met in seven of the previous ten seasons) at its real week and real host. What the design takes is **the dates and the remaining non-conference games**. The calendar is reserved in three parts:

- **Weeks 1 to 4** hold the early cross-conference games, with conference play allowed to start alongside them.
- **The week before rivalry weekend is the Swiss week.** Every team plays one cross-conference opponent of similar strength, *paired in season* on the ratings the games to that point support, with the nearer of two equal peers preferred. Nobody knows in August who they play that week.
- **Rivalry weekend** stays the last full week of the season, untouched.

Each conference team gets twelve games minus its league games, never more than four of them in the design: a nine-game league plays two early games and the Swiss game, an eight-game league three and the Swiss game, and a seven-game league keeps an FCS opponent for its twelfth game. Otherwise the FCS buy game is gone, replaced by an FBS opponent, and the working assumption is that those programs are made whole for it, a cost this study does not price. Conference games may move so that the reserved weeks can be kept: a dating programme shifts them as little as it can (at most four weeks, except where a team can reach the early weeks no other way) under bye rules read off the real schedule's habits, no two byes within four weeks, none before week 3, and a penalty for idling in weeks 1–2 or on rivalry weekend, both of which a few teams a season cannot avoid.

A simulated-annealing search chooses the early games, scoring every candidate on the gap standard error plus four costs, each a ratio to the real schedule's: miles per game, how unevenly non-conference difficulty falls across the teams of a conference, the television audience each game can expect, and the power-versus-Group of Five gap. The audience comes from a separate model of thirteen seasons of measured telecasts, which estimates how much audience each program brings to the same time slot and opponent; a game's expected audience is the product of its two programs' draws, and the design must match the real schedule's average. The weights were tuned by Bayesian optimisation on three seasons from 2015 to 2019 and applied to every season from 2004 to 2025; the seasons after 2020, and 2025 itself, were never used to choose anything. Hosts are assigned so that every team hosts half of its new games.

<div class="cfbsched">
<figure class="breakout">
<img alt="Six network diagrams: the real 2014, 2019 and 2024 schedules in the top row and the designed calendar below, teams coloured by conference, conference games in teal and non-conference games in black." src="https://bwingert89.github.io/cfbschedules/networks.png"/>
<figcaption>Three seasons as graphs, the real schedule above and the designed calendar below. Each dot is a team, coloured by power conference with every Group of Five team in grey; teal edges are conference games and black edges are the cross-conference bridges. Layouts are spring embeddings from the same seed, so a difference in shape is the schedule. The designed seasons have about 50 more bridges, and more of them cross between the power conferences and the Group of Five.</figcaption>
</figure>
</div>

## What changes, season by season

The table reads across each season. The gap standard error is the mean over all conference pairs; the tier gap is power against Group of Five; miles are campus to campus over the whole non-conference slate; the difficulty spread is the average within-conference standard deviation of a team's summed opponent SP+, which measures how unevenly a league's members are loaded.

<div class="cfbsched">
<div class="tablewrap breakout">
<table>
<thead><tr><th></th><th class="num">2014 actual</th><th class="num">2014 calendar</th><th class="num">2019 actual</th><th class="num">2019 calendar</th><th class="num">2024 actual</th><th class="num">2024 calendar</th></tr></thead>
<tbody>
<tr><td>cross-conference FBS games</td><td class="num">208</td><td class="num better">261</td><td class="num">209</td><td class="num better">261</td><td class="num">212</td><td class="num better">265</td></tr>
<tr><td>gap standard error, mean over pairs (pts)</td><td class="num">3.89</td><td class="num better">3.50</td><td class="num">3.97</td><td class="num better">3.63</td><td class="num">3.67</td><td class="num better">3.26</td></tr>
<tr><td>power-vs-G5 gap standard error (pts)</td><td class="num">1.56</td><td class="num better">1.28</td><td class="num">1.61</td><td class="num better">1.28</td><td class="num">1.66</td><td class="num better">1.27</td></tr>
<tr><td>games between two top-25 teams</td><td class="num">6</td><td class="num better">13</td><td class="num">6</td><td class="num better">15</td><td class="num">9</td><td class="num better">15</td></tr>
<tr><td>non-conference miles, total</td><td class="num">157k</td><td class="num better">129k</td><td class="num">152k</td><td class="num better">139k</td><td class="num">136k</td><td class="num better">118k</td></tr>
<tr><td>heaviest single team's away miles</td><td class="num">7.2k</td><td class="num better">5.2k</td><td class="num">4.1k</td><td class="num better">4.0k</td><td class="num">6.7k</td><td class="num better">5.3k</td></tr>
<tr><td>within-conference difficulty spread (SP+ pts)</td><td class="num">19.4</td><td class="num better">11.0</td><td class="num">21.5</td><td class="num better">10.6</td><td class="num">19.0</td><td class="num better">8.7</td></tr>
<tr><td>power team hosts the cross-tier game</td><td class="num">75%</td><td class="num">50%</td><td class="num">79%</td><td class="num">53%</td><td class="num">76%</td><td class="num">50%</td></tr>
</tbody>
</table>
</div>
</div>

And what the calendar itself costs. Every designed game has a week; the as-played version of this design, which had to fit its games into whatever free weeks the real calendar left, stranded a dozen games a season.

<div class="cfbsched">
<div class="tablewrap breakout">
<table>
<thead><tr><th>season</th><th class="num">Swiss week</th><th class="num">Swiss games</th><th class="num">SP+ gap (final-SP+ pairing)</th><th class="num">miles each</th><th class="num">league games moved</th><th class="num">weeks each</th><th class="num">byes in wks 1–2</th><th class="num">rivalry-weekend byes</th><th class="num">off-a-bye opponents per team</th><th>relaxation</th></tr></thead>
<tbody><tr><td>2014</td><td class="num">13</td><td class="num">61</td><td class="num">2.2</td><td class="num">645</td><td class="num">228 of 499 (46%)</td><td class="num">1.9</td><td class="num">1</td><td class="num">5</td><td class="num">2.1</td><td>none</td></tr><tr><td>2019</td><td class="num">13</td><td class="num">60</td><td class="num">2.3</td><td class="num">556</td><td class="num">230 of 515 (45%)</td><td class="num">1.8</td><td class="num">0</td><td class="num">1</td><td class="num">2.1</td><td>none</td></tr><tr><td>2024</td><td class="num">13</td><td class="num">63</td><td class="num">2.6</td><td class="num">563</td><td class="num">262 of 530 (49%)</td><td class="num">1.8</td><td class="num">3</td><td class="num">6</td><td class="num">2.1</td><td>none</td></tr></tbody>
</table>
</div>
</div>

<div class="cfbsched">
<div class="pairs breakout" id="pairs">
<div class="picker">
<label>season <select id="sel-pairs-season"><option value="2025">2025</option><option selected="" value="2024">2024</option><option value="2023">2023</option><option value="2022">2022</option><option value="2021">2021</option><option value="2019">2019</option><option value="2018">2018</option><option value="2017">2017</option><option value="2016">2016</option><option value="2015">2015</option><option value="2014">2014</option><option value="2013">2013</option><option value="2012">2012</option><option value="2011">2011</option><option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option><option value="2006">2006</option><option value="2005">2005</option><option value="2004">2004</option></select></label>
<span class="hint">Who plays whom: non-conference games between each pair of conferences, the real schedule and the calendar on one colour scale. Power conferences sit above and left of the line; the diagonal shows each league's own games in grey and is left out of the scale; games against independents are not counted.</span>
</div>
<div class="pair">
<div><h3 id="pairs-title-a">2024, the real schedule: 160 games between conferences</h3><div class="tablewrap" id="pairs-actual"><table class="heat"><thead><tr><th></th><th class="">ACC</th><th class="">Big 12</th><th class="">Big Ten</th><th class="seam-r">SEC</th><th class="">American</th><th class="">C-USA</th><th class="">MAC</th><th class="">MWC</th><th class="">Sun Belt</th></tr></thead><tbody><tr><th class="">ACC</th><td class="diag">69</td><td class="heat" style="background:rgba(63,94,122,0.36)">5</td><td class="heat" style="background:rgba(63,94,122,0.36)">5</td><td class="heat hot seam-r" style="background:rgba(63,94,122,0.79)">11</td><td class="heat" style="background:rgba(63,94,122,0.21)">3</td><td class="heat" style="background:rgba(63,94,122,0.29)">4</td><td class="heat" style="background:rgba(63,94,122,0.29)">4</td><td class="heat" style="background:rgba(63,94,122,0.29)">4</td><td class="heat" style="background:rgba(63,94,122,0.50)">7</td></tr><tr><th class="">Big 12</th><td class="heat" style="background:rgba(63,94,122,0.36)">5</td><td class="diag">75</td><td class="heat" style="background:rgba(63,94,122,0.29)">4</td><td class="heat seam-r" style="background:rgba(63,94,122,0.29)">4</td><td class="heat" style="background:rgba(63,94,122,0.29)">4</td><td class="heat" style="background:rgba(63,94,122,0.07)">1</td><td class="heat" style="background:rgba(63,94,122,0.07)">1</td><td class="heat" style="background:rgba(63,94,122,0.57)">8</td><td class="heat" style="background:rgba(63,94,122,0.14)">2</td></tr><tr><th class="">Big Ten</th><td class="heat" style="background:rgba(63,94,122,0.36)">5</td><td class="heat" style="background:rgba(63,94,122,0.29)">4</td><td class="diag">82</td><td class="heat seam-r" style="background:rgba(63,94,122,0.29)">4</td><td class="heat" style="background:rgba(63,94,122,0.14)">2</td><td class="heat" style="background:rgba(63,94,122,0.14)">2</td><td class="heat hot" style="background:rgba(63,94,122,0.64)">9</td><td class="heat" style="background:rgba(63,94,122,0.43)">6</td><td class="heat" style="background:rgba(63,94,122,0.21)">3</td></tr><tr><th class="seam-b">SEC</th><td class="heat hot seam-b" style="background:rgba(63,94,122,0.79)">11</td><td class="heat seam-b" style="background:rgba(63,94,122,0.29)">4</td><td class="heat seam-b" style="background:rgba(63,94,122,0.29)">4</td><td class="diag seam-r seam-b">65</td><td class="heat seam-b" style="background:rgba(63,94,122,0.36)">5</td><td class="heat seam-b" style="background:rgba(63,94,122,0.36)">5</td><td class="heat seam-b" style="background:rgba(63,94,122,0.50)">7</td><td class="heat seam-b" style="background:rgba(63,94,122,0.14)">2</td><td class="heat seam-b" style="background:rgba(63,94,122,0.50)">7</td></tr><tr><th class="">American</th><td class="heat" style="background:rgba(63,94,122,0.21)">3</td><td class="heat" style="background:rgba(63,94,122,0.29)">4</td><td class="heat" style="background:rgba(63,94,122,0.14)">2</td><td class="heat seam-r" style="background:rgba(63,94,122,0.36)">5</td><td class="diag">58</td><td class="heat" style="background:rgba(63,94,122,0.43)">6</td><td class="heat zero">·</td><td class="heat" style="background:rgba(63,94,122,0.29)">4</td><td class="heat hot" style="background:rgba(63,94,122,0.79)">11</td></tr><tr><th class="">C-USA</th><td class="heat" style="background:rgba(63,94,122,0.29)">4</td><td class="heat" style="background:rgba(63,94,122,0.07)">1</td><td class="heat" style="background:rgba(63,94,122,0.14)">2</td><td class="heat seam-r" style="background:rgba(63,94,122,0.36)">5</td><td class="heat" style="background:rgba(63,94,122,0.43)">6</td><td class="diag">41</td><td class="heat" style="background:rgba(63,94,122,0.21)">3</td><td class="heat" style="background:rgba(63,94,122,0.36)">5</td><td class="heat" style="background:rgba(63,94,122,0.29)">4</td></tr><tr><th class="">MAC</th><td class="heat" style="background:rgba(63,94,122,0.29)">4</td><td class="heat" style="background:rgba(63,94,122,0.07)">1</td><td class="heat hot" style="background:rgba(63,94,122,0.64)">9</td><td class="heat seam-r" style="background:rgba(63,94,122,0.50)">7</td><td class="heat zero">·</td><td class="heat" style="background:rgba(63,94,122,0.21)">3</td><td class="diag">49</td><td class="heat" style="background:rgba(63,94,122,0.07)">1</td><td class="heat" style="background:rgba(63,94,122,0.29)">4</td></tr><tr><th class="">MWC</th><td class="heat" style="background:rgba(63,94,122,0.29)">4</td><td class="heat" style="background:rgba(63,94,122,0.57)">8</td><td class="heat" style="background:rgba(63,94,122,0.43)">6</td><td class="heat seam-r" style="background:rgba(63,94,122,0.14)">2</td><td class="heat" style="background:rgba(63,94,122,0.29)">4</td><td class="heat" style="background:rgba(63,94,122,0.36)">5</td><td class="heat" style="background:rgba(63,94,122,0.07)">1</td><td class="diag">43</td><td class="heat" style="background:rgba(63,94,122,0.21)">3</td></tr><tr><th class="">Sun Belt</th><td class="heat" style="background:rgba(63,94,122,0.50)">7</td><td class="heat" style="background:rgba(63,94,122,0.14)">2</td><td class="heat" style="background:rgba(63,94,122,0.21)">3</td><td class="heat seam-r" style="background:rgba(63,94,122,0.50)">7</td><td class="heat hot" style="background:rgba(63,94,122,0.79)">11</td><td class="heat" style="background:rgba(63,94,122,0.29)">4</td><td class="heat" style="background:rgba(63,94,122,0.29)">4</td><td class="heat" style="background:rgba(63,94,122,0.21)">3</td><td class="diag">57</td></tr></tbody></table></div></div>
<div><h3 id="pairs-title-k">2024, the designed calendar: 213 games between conferences</h3><div class="tablewrap" id="pairs-calendar"><table class="heat"><thead><tr><th></th><th class="">ACC</th><th class="">Big 12</th><th class="">Big Ten</th><th class="seam-r">SEC</th><th class="">American</th><th class="">C-USA</th><th class="">MAC</th><th class="">MWC</th><th class="">Sun Belt</th></tr></thead><tbody><tr><th class="">ACC</th><td class="diag">69</td><td class="heat" style="background:rgba(63,94,122,0.07)">1</td><td class="heat" style="background:rgba(63,94,122,0.29)">4</td><td class="heat hot seam-r" style="background:rgba(63,94,122,0.71)">10</td><td class="heat hot" style="background:rgba(63,94,122,0.79)">11</td><td class="heat" style="background:rgba(63,94,122,0.43)">6</td><td class="heat hot" style="background:rgba(63,94,122,0.64)">9</td><td class="heat" style="background:rgba(63,94,122,0.36)">5</td><td class="heat hot" style="background:rgba(63,94,122,0.93)">13</td></tr><tr><th class="">Big 12</th><td class="heat" style="background:rgba(63,94,122,0.07)">1</td><td class="diag">75</td><td class="heat" style="background:rgba(63,94,122,0.36)">5</td><td class="heat seam-r" style="background:rgba(63,94,122,0.21)">3</td><td class="heat" style="background:rgba(63,94,122,0.57)">8</td><td class="heat" style="background:rgba(63,94,122,0.50)">7</td><td class="heat" style="background:rgba(63,94,122,0.36)">5</td><td class="heat" style="background:rgba(63,94,122,0.57)">8</td><td class="heat" style="background:rgba(63,94,122,0.43)">6</td></tr><tr><th class="">Big Ten</th><td class="heat" style="background:rgba(63,94,122,0.29)">4</td><td class="heat" style="background:rgba(63,94,122,0.36)">5</td><td class="diag">82</td><td class="heat seam-r" style="background:rgba(63,94,122,0.57)">8</td><td class="heat" style="background:rgba(63,94,122,0.29)">4</td><td class="heat" style="background:rgba(63,94,122,0.14)">2</td><td class="heat hot" style="background:rgba(63,94,122,0.86)">12</td><td class="heat" style="background:rgba(63,94,122,0.57)">8</td><td class="heat" style="background:rgba(63,94,122,0.36)">5</td></tr><tr><th class="seam-b">SEC</th><td class="heat hot seam-b" style="background:rgba(63,94,122,0.71)">10</td><td class="heat seam-b" style="background:rgba(63,94,122,0.21)">3</td><td class="heat seam-b" style="background:rgba(63,94,122,0.57)">8</td><td class="diag seam-r seam-b">65</td><td class="heat hot seam-b" style="background:rgba(63,94,122,0.79)">11</td><td class="heat seam-b" style="background:rgba(63,94,122,0.50)">7</td><td class="heat seam-b" style="background:rgba(63,94,122,0.36)">5</td><td class="heat seam-b" style="background:rgba(63,94,122,0.14)">2</td><td class="heat hot seam-b" style="background:rgba(63,94,122,1.00)">14</td></tr><tr><th class="">American</th><td class="heat hot" style="background:rgba(63,94,122,0.79)">11</td><td class="heat" style="background:rgba(63,94,122,0.57)">8</td><td class="heat" style="background:rgba(63,94,122,0.29)">4</td><td class="heat hot seam-r" style="background:rgba(63,94,122,0.79)">11</td><td class="diag">58</td><td class="heat" style="background:rgba(63,94,122,0.36)">5</td><td class="heat" style="background:rgba(63,94,122,0.07)">1</td><td class="heat" style="background:rgba(63,94,122,0.21)">3</td><td class="heat" style="background:rgba(63,94,122,0.50)">7</td></tr><tr><th class="">C-USA</th><td class="heat" style="background:rgba(63,94,122,0.43)">6</td><td class="heat" style="background:rgba(63,94,122,0.50)">7</td><td class="heat" style="background:rgba(63,94,122,0.14)">2</td><td class="heat seam-r" style="background:rgba(63,94,122,0.50)">7</td><td class="heat" style="background:rgba(63,94,122,0.36)">5</td><td class="diag">41</td><td class="heat" style="background:rgba(63,94,122,0.21)">3</td><td class="heat" style="background:rgba(63,94,122,0.29)">4</td><td class="heat" style="background:rgba(63,94,122,0.36)">5</td></tr><tr><th class="">MAC</th><td class="heat hot" style="background:rgba(63,94,122,0.64)">9</td><td class="heat" style="background:rgba(63,94,122,0.36)">5</td><td class="heat hot" style="background:rgba(63,94,122,0.86)">12</td><td class="heat seam-r" style="background:rgba(63,94,122,0.36)">5</td><td class="heat" style="background:rgba(63,94,122,0.07)">1</td><td class="heat" style="background:rgba(63,94,122,0.21)">3</td><td class="diag">49</td><td class="heat" style="background:rgba(63,94,122,0.14)">2</td><td class="heat" style="background:rgba(63,94,122,0.21)">3</td></tr><tr><th class="">MWC</th><td class="heat" style="background:rgba(63,94,122,0.36)">5</td><td class="heat" style="background:rgba(63,94,122,0.57)">8</td><td class="heat" style="background:rgba(63,94,122,0.57)">8</td><td class="heat seam-r" style="background:rgba(63,94,122,0.14)">2</td><td class="heat" style="background:rgba(63,94,122,0.21)">3</td><td class="heat" style="background:rgba(63,94,122,0.29)">4</td><td class="heat" style="background:rgba(63,94,122,0.14)">2</td><td class="diag">43</td><td class="heat" style="background:rgba(63,94,122,0.07)">1</td></tr><tr><th class="">Sun Belt</th><td class="heat hot" style="background:rgba(63,94,122,0.93)">13</td><td class="heat" style="background:rgba(63,94,122,0.43)">6</td><td class="heat" style="background:rgba(63,94,122,0.36)">5</td><td class="heat hot seam-r" style="background:rgba(63,94,122,1.00)">14</td><td class="heat" style="background:rgba(63,94,122,0.50)">7</td><td class="heat" style="background:rgba(63,94,122,0.36)">5</td><td class="heat" style="background:rgba(63,94,122,0.21)">3</td><td class="heat" style="background:rgba(63,94,122,0.07)">1</td><td class="diag">57</td></tr></tbody></table></div></div>
</div>
<p class="legend" id="pairs-note">In 2024 the real schedule leaves 1 conference pair without a game and the calendar 0; the calendar adds 53 games between conferences.</p>
</div>
</div>

## Why this beats everyone for themselves

**It measures the sport better, above all across the power/Group of Five line, and the gain comes from one weekend.** The mean gap standard error falls by about a third of a point (4.0 to 3.7 pooled over the seasons) and the power-versus-Group of Five standard error, the one the real schedule had been losing for twenty years, by more than a quarter (1.60 to 1.31). Simulating seasons from each schedule and recovering ratings the way a system would, with last season's SP+ as the prior and the real schedule keeping its FCS game as an observation against an opponent of known average strength, the calendar's error on the tier gap is lower than the real schedule's at the end of every period: 1.6 against 1.9 points in 2021 to 2024 and 0.8 against 1.2 in 2025. On the gaps between individual conferences the margin is smaller: 2.87 against 2.98 points in 2021 to 2024, and level in 2025 (2.28 against 2.29). Through week 12 the real schedule is as good or better, because an FCS game is an early observation too. The Swiss week is the difference: in one weekend the conference-gap error drops from 3.25 to 2.88 points, because fifty-eight games between teams the season has shown to be peers, across conference lines, land all at once. Pairing on noisy mid-season ratings turns out to beat pairing on the truth, since the noise sends more of those games across the power/Group of Five line.

**It doubles the marquee games.** The real schedule produces about seven games a season between two season-final top-25 teams outside conference play. The calendar produces fourteen, most of them in the Swiss week, and those are games nobody could have bought in advance because nobody knew in August who would be a peer in November. The rest come from the early weeks, where matching the real schedule's television audience pulls neighbouring brand programs into games with each other.

**It travels less than reality.** About 12% fewer non-conference miles over the whole slate (129,000 against 146,000 a season), even though the Swiss games fly, about 650 miles each. The early games stay regional (a Big Ten team playing a Mid-American school a few hundred miles away is as informative an edge as a flight across the country, because a mismatch is as informative as a toss-up on the margin scale), and the single heaviest travel burden on any one team falls by a fifth.

**It keeps the games people want.** Rivalries are untouched by construction. The last week of the season is still rivalry weekend. The difficulty a league's members face is about half as uneven as today's.

> The costs are real and there are three: the power team hosts about half of the cross-tier games instead of three quarters, four in ten conference games move, by about two weeks, and the conference pairs are covered less evenly than today.

The first is the price of an honest tier gap. When the power team hosts every cross-tier game, "the power team is better" and "the home team gets a few points" are the same regression direction and a rating cannot separate them; balanced hosting is what makes the design's tier advantage real rather than analytic. It also means roughly one home game in four across the non-conference slate given back to Group of Five programs that currently sell it. The second is the price of reserving a week in November for everyone at once: a conference's own schedule has to flex around it, and a handful of teams a season idle in week 1 or on rivalry weekend when their league's arithmetic leaves no other way.

The third is what matching the television audience costs. The real non-conference slate is built to put brands on television, and a design held to the same expected audience gets there with regional games between big programs. Those games bridge the tiers well but leave some conference pairs unconnected: the calendar covers 87% of conference pairs against the real schedule's 90%. An earlier version of this design used team strength as a stand-in for audience, a bar that is easier to clear; it covered 97% of pairs and beat the real schedule on conference gaps by a tenth of a point more, at more miles and with fewer marquee games.

## What the fourth game is worth

The design does two things at once: it rearranges the non-conference games the sport already plays, and it replaces each team's FCS game with a fourth FBS opponent. To see what the second is worth on its own, the calendar was designed a second time with **each team's real FCS games kept**, reserved out of its slots, so that the designed slate has exactly as many FBS non-conference games as the real one. The three schedules are then scored the same way, with the real schedule and the FCS-kept design playing their FCS games against an opponent of known average strength (the level the real FBS-versus-FCS margins imply, about 26 points below an average FBS team, with the spread of FCS strength added to the noise).

<div class="cfbsched">
<div class="tablewrap breakout">
<table><thead><tr><th></th><th class="num">FBS non-conference games</th><th class="num">FCS games</th><th class="num">gap SE, from the graph (pts)</th><th class="num">tier gap SE (pts)</th><th class="num">recovered gap error, end of season (pts)</th><th class="num">the same, 2021–24 only</th><th class="num">recovered tier-gap error (pts)</th><th class="num">non-conference miles</th><th class="num">power team hosts</th></tr></thead><tbody><tr><td>the real schedule</td><td class="num">207</td><td class="num">101</td><td class="num">4.00</td><td class="num">1.60</td><td class="num">2.84</td><td class="num">3.00</td><td class="num">1.78</td><td class="num">146k</td><td class="num">76%</td></tr><tr><td>design, FCS game kept</td><td class="num">210</td><td class="num">101</td><td class="num">4.07</td><td class="num">1.52</td><td class="num">2.78</td><td class="num">2.89</td><td class="num">1.53</td><td class="num better">110k</td><td class="num">53%</td></tr><tr><td>design, FCS game replaced</td><td class="num">253</td><td class="num">0</td><td class="num better">3.67</td><td class="num better">1.31</td><td class="num better">2.76</td><td class="num">2.85</td><td class="num better">1.50</td><td class="num">129k</td><td class="num">51%</td></tr></tbody></table>
</div>
</div>

<div class="cfbsched">
<figure class="breakout">
<img alt="Three line charts by season comparing the real schedule, the design that keeps the FCS game and the design that replaces it: the analytic conference-gap standard error, the recovered conference-gap error and the recovered tier-gap error." src="https://bwingert89.github.io/cfbschedules/fourth_game.png"/>
<figcaption>By season: the conference-gap standard error computed from the schedule graph alone, and the errors a simulated rating actually recovers at the end of the season (last season's ratings as the prior, FCS games counted where a schedule has them). The fourth game moves the first panel a great deal and the other two very little.</figcaption>
</figure>
</div>

**Two yardsticks, and they disagree.** The first column is the standard error from the graph alone, the number the optimiser minimises. An FCS game is an edge to a team outside the FBS graph, so it contributes nothing there, and replacing it looks like pure gain: with the FCS game kept, the design is slightly worse than the real schedule on this yardstick (4.07 against 4.00), so all of the design's 0.33-point gain comes from the fourth game. The recovered error is what a rating system sees, and it learns from the FCS game: an observation against an opponent of known level, at a little more noise than an FBS game, is worth about nine-tenths as much. On that yardstick the fourth game is worth 0.02 of the design's 0.08 points pooled over 2004 to 2025.

**The rules do the measuring.** With the same FBS games as reality, the FCS-kept design cuts the error on the power-versus-Group of Five gap from 1.78 to 1.53 points, recovers conference gaps a little better in three of four periods (it falls behind in 2025), and travels 110k miles against 146k. It covers fewer conference pairs than reality (86% against 90%); the fourth game is what restores coverage, and it spends part of the travel saving to do it. So the honest claim is not that a fourth FBS game measures the sport better. It is that the reserved-week calendar, with the Swiss week, balanced hosting and a regional early block, measures the tier gap clearly better than the status quo with the games the sport already plays, and the gaps between conferences a little better in most seasons. Trading the FCS game for an FBS one buys connectivity on paper and marquee games in practice, not much precision, which turns the FCS game from a cost of the design into a choice: the programs that depend on that revenue can keep it, and most of the gain can be kept too.

## One team's slate

<div class="cfbsched">
<div class="picker">
<label>season <select id="sel-season"><option value="2024">2024</option></select></label>
<label>team <select id="sel-team"><option value="Ohio State">Ohio State</option></select></label>
<span class="hint" id="picker-hint">Pick any FBS team in any season from 2004 to 2025 (2020 excluded); the tables below follow the selection. The text in this paragraph describes Ohio State, 2024.</span>
</div>
</div>

Ohio State's real 2024 non-conference schedule was the modern power template: Akron, Western Michigan, Marshall, all at home, two of them Mid-American opponents ranked outside the top 100 by season-final SP+. Under the calendar its early games are Pittsburgh (away, week 1) and Eastern Michigan (home, week 2), one a regional power opponent and one a Group of Five school, and then it plays the Swiss week. On season-final ratings the Swiss opponent is Ole Miss (away, 529 miles). Paired in season across a hundred simulated seasons, the draw is an SEC opponent 94% of the time.

<div class="cfbsched">
<h3 id="slate-title">Ohio State, 2024 · Big Ten · season-final SP+ +31.2</h3>
</div>

<div class="cfbsched">
<div class="pair breakout">
<div>
<h3>Actual</h3>
<div class="tablewrap" id="slate-actual"><table>
<thead><tr><th>week</th><th>opponent</th><th>conference</th><th class="num">SP+</th><th class="num">rank</th><th>venue</th><th class="num">miles</th></tr></thead>
<tbody><tr><td>1</td><td>Akron</td><td>Mid-American</td><td class="num">−17.9</td><td class="num">123</td><td>home</td><td class="num">0</td></tr><tr><td>2</td><td>Western Michigan</td><td>Mid-American</td><td class="num">−10.2</td><td class="num">105</td><td>home</td><td class="num">0</td></tr><tr><td>4</td><td>Marshall</td><td>Sun Belt</td><td class="num">3.1</td><td class="num">58</td><td>home</td><td class="num">0</td></tr></tbody>
</table></div>
</div>
<div>
<h3>Calendar</h3>
<div class="tablewrap" id="slate-calendar"><table>
<thead><tr><th>week</th><th>opponent</th><th>conference</th><th class="num">SP+</th><th class="num">rank</th><th>venue</th><th class="num">miles</th></tr></thead>
<tbody><tr><td>1</td><td>Pittsburgh</td><td>ACC</td><td class="num">4.9</td><td class="num">51</td><td>away</td><td class="num">161</td></tr><tr><td>2</td><td>Eastern Michigan</td><td>Mid-American</td><td class="num">−13.3</td><td class="num">114</td><td>home</td><td class="num">0</td></tr><tr><td>13 (Swiss week)</td><td>Ole Miss</td><td>SEC</td><td class="num">27.9</td><td class="num">2</td><td>away</td><td class="num">529</td></tr></tbody>
</table></div>
</div>
</div>
</div>

<div class="cfbsched">
<div class="pair breakout">
<div>
<h3>The Swiss-week draw, paired in season</h3>
<div class="tablewrap" id="draw-table"><table>
<thead><tr><th>opponent</th><th>conference</th><th class="num">SP+</th><th class="num">share of seasons</th></tr></thead>
<tbody><tr><td>Ole Miss</td><td>SEC</td><td class="num">27.9</td><td class="num">42%</td></tr><tr><td>Tennessee</td><td>SEC</td><td class="num">22.0</td><td class="num">20%</td></tr><tr><td>Alabama</td><td>SEC</td><td class="num">25.0</td><td class="num">18%</td></tr><tr><td>Texas</td><td>SEC</td><td class="num">24.1</td><td class="num">13%</td></tr><tr><td>Miami</td><td>ACC</td><td class="num">21.6</td><td class="num">3%</td></tr></tbody>
</table></div>
</div>
<div>
<h3 id="moved-title">What moved for Ohio State</h3>
<p id="moved-note">6 of its 9 conference games change weeks so that week 13 is clear; the Big Ten finale stays on rivalry weekend. Every other team in the league flexes the same way, which is what the "conference games moved" column above counts.</p>
</div>
</div>
</div>

<div class="cfbsched">
<div class="graphs breakout" id="graphs">
<div class="panel"><h3 id="graph-season-a">the real schedule</h3><svg id="svg-actual" viewbox="0 0 1000 850"></svg></div>
<div class="panel"><h3 id="graph-season-k">the designed calendar</h3><svg id="svg-calendar" viewbox="0 0 1000 850"></svg></div>
<div class="tip" id="graph-tip"></div>
<p class="legend">The selected team's non-conference games are red, its Swiss-week game blue and those opponents named; its conference games are the solid teal edges and its league rivals the brighter crests. Faded teal edges are everyone else's conference games, faded grey their non-conference games. Hover any crest to see that team's games; click it to select it. Layouts are spring embeddings from the same seed, so a difference in shape is the schedule.</p>
</div>
</div>

Why does one team's new slate improve how its whole league compares with the SEC? Because a team's games are information for everyone, not only for the two teams playing. Every cross-conference game is a bridge, and the precision of any conference comparison depends on how many bridges there are and how they are spread, through every path in the graph. A team's own games are a small part of that; what improves its row is the whole redesigned season around it. The standard error of the selected team's conference against each other conference, on the real schedule and the calendar:

<div class="cfbsched">
<div class="tablewrap breakout" id="pair-table">
<table>
<thead><tr><th>Big Ten against</th><th class="num">ACC</th><th class="num">SEC</th><th class="num">Big 12</th><th class="num">American</th><th class="num">Conf. USA</th><th class="num">Mid-American</th><th class="num">Mountain West</th><th class="num">Sun Belt</th></tr></thead>
<tbody>
<tr><td>actual, standard error (pts)</td><td class="num">3.35</td><td class="num">3.44</td><td class="num">3.88</td><td class="num">3.69</td><td class="num">3.89</td><td class="num">3.50</td><td class="num">3.52</td><td class="num">3.59</td></tr>
<tr><td>calendar, standard error (pts)</td><td class="num better">3.00</td><td class="num better">2.99</td><td class="num better">3.28</td><td class="num better">3.18</td><td class="num better">3.46</td><td class="num better">3.02</td><td class="num better">3.30</td><td class="num better">3.16</td></tr>
</tbody>
</table>
</div>
</div>

<div class="cfbsched">
<p id="pair-note">Every pair improves, by 0.2 to 0.6 points, and Ohio State's own rating is pinned down more tightly too (its standard error falls from 5.0 to 4.9 points). The team gives up two home games and a week of certainty about its November, and the league it belongs to becomes something the rest of the sport can measure.</p>
</div>

## What this does not claim

- **The FCS game is a choice, not a cost.** The main design replaces it and prices the replacement at zero; the control above keeps it and shows that most of the gain survives. In the recovery comparison every schedule that has FCS games plays them, against one FCS opponent per season at the strength the real margins imply. An earlier version of this page scored the real schedule on its FBS games alone and overstated the design's margin by about a quarter of a point.
- **The calendar is a 2%-gap solution with a time limit**, not an optimum, and five seasons before 2013, with seven-, eight- and nine-game leagues side by side, needed conference games to move further than four weeks or the bye window cut to two.
- **The Swiss pairing's rating band (4 points) is a choice, not tuned**, as is the rule that two equal peers are split by distance.
- **Difficulty and the top-25 count use season-final SP+**, which no scheduler has in advance. The recovery study and the Swiss draw use only what a scheduler would have: last season's ratings and the games played so far.
- **Fan interest is a model of television audiences**, fit on 4,614 measured telecasts from 2013 to 2025 (Sports Media Watch's weekly ratings, matched to games). One table of program draws serves every season, so 2004 to 2012 are scheduled on today's brands, and the table includes 2021 to 2025 audiences, the seasons otherwise held out. Only telecasts with a Nielsen figure are in it, which leaves out most streaming-only and conference-network games.
- **A rating with a strong zero-centred prior cannot see any of this.** Shrinking every team toward the average erases most of the between-tier information any schedule carries. The gains above are for a rating that starts from last season, as real ones do.

---

*Data: CollegeFootballData games 2004–2025, season-final SP+, campus coordinates, closing spreads. Method: least-squares gap variance from the Laplacian pseudo-inverse; simulated annealing over 2-opt and 3-rotation moves for the early games; the Swiss week paired in season by nearest cross-conference peer within a band; conference games re-dated by integer programme under bye rules; hosts by integer programme; weights tuned by Gaussian-process expected improvement on 2015, 2017 and 2019; fan interest from a penalised fixed-effects model of log viewers per telecast (`cfbgraph.viewership`); recovery simulated with 200 replicate seasons at 16 points of margin noise (60 for the in-season Swiss variant). Code in `cfbgraph.schedule`; the full record with every table is `notebooks/schedule_optimizer.ipynb`, section 7.*
