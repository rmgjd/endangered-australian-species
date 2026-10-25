# Data and design methods

## Question and audience

This visual story is for a general Australian audience. It asks how nationally recognised extinction risk varies among animal groups and places, what monitored populations show, and how national conservation priorities relate to the available evidence. The presentation follows a four-part reading path: the list, the map, the trend and the response.

## Data sources

1. **Australian Government Department of Climate Change, Energy, the Environment and Water (DCCEEW).** [Threatened Species State Lists](https://data.gov.au/data/dataset/ae652011-f39e-4c6c-91b8-1dc2d2dfee8f), CSV extracted 28 August 2026, published under Creative Commons Attribution 3.0 Australia. Each row is one listed taxon entry and includes a scientific name, national EPBC status, class and indicative state occurrence flags.
2. **Threatened Species Index (TSX), TERN Australia and partners.** [2025 Trend Summary](https://tsx.org.au/wp-content/uploads/2025/11/Threatened_Species_Index_2025_Trend_Summary_20251125.pdf), especially pp. 4–9. The 2025 report summarises monitoring data through 2022. Group declines since 1985 and bird trends by jurisdiction since 2000 were transcribed from the report. The TSX uses monitored threatened and near-threatened taxa; its sample is not the EPBC list.
3. **Australian Bureau of Statistics.** [ASGS 2026 generalized state and territory boundaries](https://geo.abs.gov.au/arcgis/rest/services/ASGS2026/STE/MapServer/1), retrieved 14 October 2026. Boundaries were simplified for web delivery and the eight states and internal territories, including Tasmania were retained. External territories and Antarctica are omitted from the map geometry.
4. **DCCEEW.** [Threatened Species Action Plan priority places GIS layer](https://gis.environment.gov.au/gispub/rest/services/evv/Threatened_Species_Priority_Places/MapServer/0), published 2022, retrieved 14 October 2026. The twenty displayed dots use the centroid of each place's largest polygon, so they represent approximate location, not exact boundaries or area.

## Filtering and calculations

- The listing CSV contains 2,222 entries, of which 700 are Animalia. The main analysis includes the **625** Animalia entries currently listed as Vulnerable, Endangered or Critically Endangered. It excludes 67 Extinct, one Extinct in the Wild and seven Conservation Dependent fauna entries. The CSV contains unique listed SPRAT taxon identifiers for the included entries.
- Taxonomic classes were combined into six readable groups. Fish includes Actinopterygii, Chondrichthyes, Cephalaspidomorphi and Sarcopterygii. Invertebrates includes the remaining animal classes outside birds, mammals, reptiles, amphibians and fish. These are editorial groupings for general readers, not formal taxonomic ranks.
- A state count is the number of included entries with a `Yes` flag for that jurisdiction. One entry can be counted in multiple states. The values are **indicative occurrence**, not a survey of individuals or a state-specific listing status.
- The mosaic uses widths proportional to each group's share of 625, and within each group the stacked heights are proportional to its three status counts. Each rectangle therefore has area proportional to its count.
- The treemap uses a squarified partition of the national total into six animal-group children. Rectangle areas equal each group's count divided by 625; labels show the count and percentage. A second partition suits the narrower phone aspect ratio. Rectangle and text layers explicitly share coordinate domains, and the layout has been checked for overlaps, full coverage and proportional area. Positions have no geographic meaning.
- The UpSet chart shows only the twelve most common exact combinations of the eight state flags. `External only` means none of those eight flags is `Yes`; it does not mean the species has no Australian occurrence.
- TSX values are **relative abundance changes**, not estimated population sizes. The 1985 group comparisons are from four monitored animal groups; state bird estimates compare 2000 with 2022. NSW and ACT have one combined TSX estimate and are coloured alike.
- The unit chart shows that TSX holds data for 49 of the Action Plan's 110 national priority species, including plants. Each square is one priority species. Coverage is not a conservation outcome.
- The three species examples are qualitative summaries of the current DCCEEW Action Plan profiles for the [Maugean skate](https://www.dcceew.gov.au/environment/biodiversity/threatened/action-plan/maugean-skate), [orange-bellied parrot](https://www.dcceew.gov.au/environment/biodiversity/threatened/action-plan/orange-bellied-parrot) and [northern hairy-nosed wombat](https://www.dcceew.gov.au/environment/biodiversity/threatened/action-plan/northern-hairy-nosed-wombat). They illustrate distinct challenges; they are not a numerical ranking of the most endangered species.
- The orange-bellied parrot flow map uses the DCCEEW profile's published seasonal geography: summer breeding in south-west Tasmania, migration via King Island and winter habitat in coastal Victoria and South Australia. It is a qualitative origin–destination map. Coordinates are editorial approximate regional anchors, and connecting lines show no measured flight geometry, distance, individual movements or bird quantities. Constant-width arrows indicate direction. The season selector reverses those regional connections. The southeast basemap is a rectangular geographic clip of the same ABS state geometry, not a new boundaries dataset. The evidence and coordinate method are recorded in `data/parrot_seasonal_connections.json`; chart data are embedded as named datasets in its specification.
- The bivariate proportional-symbol map uses circle area for total flagged entries and colour for `critical / count × 100`, rounded to one decimal place. Both quantities refer to the same EPBC sample. It is one map idiom, not two separate charts.

## Visual design rules drawn from the course notes

- **Layout:** The compact introduction starts at top left. Four chapters follow a top-to-bottom reading path. A ranking with a reading note, paired status charts, a treemap spread, an annotated map, and a monitoring feature vary the composition within shared columns and sight-lines. The two smaller maps have equal plotting dimensions and aligned captions, annotations and source notes. Whitespace separates topics. Source: *FIT2179 Course Notes 9 Layout*, pp. 2–6.
- **Typography:** A short display headline establishes hierarchy; body text uses readable sentence case and moderate line length. Chart notes are visually secondary but remain legible. Source: *FIT2179 Course Notes 11 Typography*, especially pp. 2, 10–12.
- **Colour:** A small palette is reused consistently. Red indicates greater extinction concern or larger monitored decline, while muted green supports structure and place context. Ordered values change mainly in lightness; no rainbow or red-versus-green categorical scale is used. Source: *FIT2179 Course Notes 8 Colour*, pp. 5–10.
- **Maps:** The choropleth colours a *percentage change*, not a raw count; it uses an Australian Albers equal-area conic projection centred on 134°E, with standard parallels 18°S and 36°S. The Map Projections notes distinguish regional conic projections from Equal Earth, which is intended for world maps. The separate proportional-symbol map uses circle **area** for state-attached counts. A dot map uses one constant-size mark per priority place. Source: *FIT2179 Course Notes Choropleth*, pp. 2–4; *Proportional Symbol Maps*, pp. 2–5; *Dot Maps*, pp. 2–3; *Map Projections*, pp. 2–5.
- **Storytelling:** Each chart title states the reader task or finding. Chart-order badges have been removed. Direct counts, state percentages and endpoint labels accompany annotations about specific findings. Callouts distinguish listing, occurrence, decline and monitoring coverage. Minimal gridlines and borders reduce clutter. Source: *FIT3179 Course Notes 7 Storytelling with Data*, pp. 2–4; *FIT2179 Course Notes 6 Data-ink Ratio and Chartjunk*.

## Chart register

| No. | Idiom | Measure | Why it is here |
|---|---|---|---|
| 01 | Bar chart | EPBC entries by group | Most precise group count comparison |
| 02 | Heatmap | EPBC group × status counts | Reveals the severity pattern |
| 03 | Mosaic | EPBC group × status counts | Compares group size and status mix together |
| 04 | Treemap | EPBC entries by group | Whole-to-part reading |
| 05 | Choropleth map | TSX monitored bird decline by jurisdiction | Shows geographic variation in a rate |
| 06 | Proportional-symbol map | EPBC indicative state counts | Shows quantity associated with a state without filling large areas by raw counts |
| 07 | Dot map | 20 national priority places | Locates the action plan's place focus |
| 08 | UpSet intersection chart | Exact combinations of EPBC state flags | Shows shared occurrence across jurisdictions |
| 09 | Lollipop chart | TSX group relative-abundance declines | Highlights the monitoring sample's differences |
| 10 | Unit chart | 49 of 110 priority species monitored by TSX | Makes the evidence gap tangible |
| 11 | Grouped bar chart | EPBC bird and mammal state flags | Supports direct within-state comparison |
| 12 | Qualitative origin–destination flow map | Published seasonal habitat connections of the orange-bellied parrot | Explains why recovery requires linked breeding, stopover and winter habitats |

The brief counts small multiples as one chart. There are twelve separate charts, including four different map idioms: choropleth, proportional symbols, dot map and origin–destination flow map. Counting the bar, lollipop and grouped-bar charts conservatively as basic leaves nine advanced idioms: heatmap, mosaic, treemap, those four map idioms, UpSet and unit chart. The two seasons in the flow map are one chart; the two encodings on the symbol map are one idiom. The HD rubric asks for at least eight advanced idioms across more than ten charts, with at least three map idioms. Numerical coverage alone does not establish an HD grade: effectiveness and explanation remain subject to tutor assessment.

## Rendering checks

Seasonal flow arrowheads use the projected endpoints of the same straight segments drawn by the line layer. Their centres sit 78% along each segment, and their rotation is calculated from its screen coordinates. The calculation updates with the projection, viewport and selected season. A compass bearing in geographic coordinates is not used as a screen rotation.

Chart widths are recalculated when the viewport changes. The intersection chart reserves space for its axes, and the 22-by-5 unit grid uses equal cell widths and heights. The mosaic has direct group labels and its complete status legend. The treemap labels counts and shares, with compact labels and an alternate partition at narrow widths. The two adjacent maps use the same Australian geographic frame: 18 priority-place dots are projected with the state geometry, while Christmas Island and Norfolk Islands appear in an explicitly labelled schematic inset. Inset positions do not represent longitude, latitude or distance. All 20 places retain tooltips. JavaScript, CSS and chart specifications have release identifiers to avoid retaining older files after deployment.

Explanatory annotations combine direct labels, enclosures, geographic leaders and contextual notes. The bird share is written inside its bar; a heatmap cell is framed; the critical share sits within the mosaic; matching dashed outlines connect the two equal treemap areas. Map callouts connect screen positions to projected locations without adding distant coordinates to the geographic fit. The MacDonnell Ranges label sits beside its outlined dot, avoiding a long connector across other places. The reptile pilot caveat sits beside its endpoint, and the grouped bars label each group's maximum directly. A season-dependent note accompanies the flow map. At narrow widths, the shared NSW/ACT and seasonal notes move below the map to avoid Tasmania and its labels.

Outside the diagrams, large statistics, a comparison rule, an inset interpretation and a shaded pilot caveat provide different reading levels. Colour is used selectively; short neutral labels replace repeated red paragraphs above every diagram. These choices follow the supplied storytelling notes' use of salient features, enclosures and visual hierarchy. The two symbol-map legends have a 44px gap on wide charts; below 480px they stack vertically with a 22px gap. `scripts/enhance_annotations.py` generates the chart annotations after the base specifications, and the flow map retains its corrected projection-aware arrowheads.

## Rebuild

The source CSV, GIS files and TSX report are stored outside the public site in `../data/raw/`. Run `../scripts/prepare_data.py` and then `../scripts/build_specs.py` from the repository workspace. This also runs `build_chart_bundle.py`, which packages the specifications and their processed data into `chart-bundle.js`. The browser loads that generated script so charts also work when the HTML is opened directly from disk, where `fetch()` of local JSON is blocked. Responsive rendering uses a fresh copy of each bundled specification. The separate JSON files remain available for inspection and hosted fallback loading. After editing JSON directly, rerun `../scripts/build_chart_bundle.py`. An internet connection is still needed for the Vega libraries on jsDelivr. No numbers or locations are randomly generated. The unit-chart squares represent documented aggregate counts; they do not identify individual species.

## Limits to keep visible

The EPBC list measures legal status and indicative distribution, not the true number of all threatened animals. Some species remain undescribed or unlisted. TSX results cover contributing monitored taxa and can be affected by spatial, taxonomic and temporal gaps. A decline in average monitored relative abundance cannot be attributed to a specific threat or recovery program from these charts. The 2025 TSX report calls its reptile index a pilot.



## Spacing refinement — 25 October 2026

The heatmap's emphasis rectangle is inset by 4px on each edge, with a 2px stroke, so it does not cover either axis. The opening and geography sections use tighter heading and chart gaps. The choropleth has a more compact column and a 390px maximum plot height. The monitoring coverage graphic and its 44.5% explanation share a desktop row, while narrow screens retain a single column. Unit cells remain square and all 110 units are retained.

The South Australia callout now follows a nearby projected anchor in western inland SA, away from the central state label. A short bent connector stops beside the two-line note with a clear gap, rather than crossing its text. Its position is recalculated with the map projection and capped within the plotting height on narrow screens. The note identifies the largest decline among the displayed monitored samples; the values and geographic boundaries are unchanged.
