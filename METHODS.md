# Data and design methods

## Question and audience

This visual story is for a general Australian audience. It asks how nationally recognised extinction risk varies among animal groups and places, what monitored populations show, and how national conservation priorities relate to the available evidence. The presentation follows a four-part reading path: the list, the map, the trend and the response.

## Data sources

1. **Australian Government Department of Climate Change, Energy, the Environment and Water (DCCEEW).** [Threatened Species State Lists](https://data.gov.au/data/dataset/ae652011-f39e-4c6c-91b8-1dc2d2dfee8f), CSV extracted 28 August 2026, published under Creative Commons Attribution 3.0 Australia. Each row is one listed taxon entry and includes a scientific name, national EPBC status, class and indicative state occurrence flags.
2. **Threatened Species Index (TSX), University of Queensland and partners.** [2025 Trend Summary](https://tsx.org.au/wp-content/uploads/2025/11/Threatened_Species_Index_2025_Trend_Summary_20251125.pdf), especially pp. 4–9. The 2025 report summarises monitoring data through 2022. Group declines since 1985 and bird trends by jurisdiction since 2000 were transcribed from the report. The TSX uses monitored threatened and near-threatened taxa; its sample is not the EPBC list.
3. **Australian Bureau of Statistics.** [ASGS 2026 generalized state and territory boundaries](https://geo.abs.gov.au/arcgis/rest/services/ASGS2026/STE/MapServer/1), retrieved 14 October 2026. Boundaries were simplified for web delivery and the eight mainland states/territories were retained. External territories and Antarctica are omitted from the map geometry.
4. **DCCEEW.** [Threatened Species Action Plan priority places GIS layer](https://gis.environment.gov.au/gispub/rest/services/evv/Threatened_Species_Priority_Places/MapServer/0), published 2022, retrieved 14 October 2026. The twenty displayed dots use the centroid of each place's largest polygon, so they represent approximate location, not exact boundaries or area.

## Filtering and calculations

- The listing CSV contains 2,222 entries, of which 700 are Animalia. The main analysis includes the **625** Animalia entries currently listed as Vulnerable, Endangered or Critically Endangered. It excludes 67 Extinct, one Extinct in the Wild and seven Conservation Dependent fauna entries. The CSV contains unique listed SPRAT taxon identifiers for the included entries.
- Taxonomic classes were combined into six readable groups. Fish includes Actinopterygii, Chondrichthyes, Cephalaspidomorphi and Sarcopterygii. Invertebrates includes the remaining animal classes outside birds, mammals, reptiles, amphibians and fish. These are editorial groupings for general readers, not formal taxonomic ranks.
- A state count is the number of included entries with a `Yes` flag for that jurisdiction. One entry can be counted in multiple states. The values are **indicative occurrence**, not a survey of individuals or a state-specific listing status.
- The mosaic uses widths proportional to each group's share of 625, and within each group the stacked heights are proportional to its three status counts. Each rectangle therefore has area proportional to its count.
- The treemap uses rectangles whose areas are proportional to group entry counts. Their positions have no geographic meaning.
- The UpSet chart shows only the twelve most common exact combinations of the eight state flags. `External only` means none of those eight flags is `Yes`; it does not mean the species has no Australian occurrence.
- TSX values are **relative abundance changes**, not estimated population sizes. The 1985 group comparisons are from four monitored animal groups; state bird estimates compare 2000 with 2022. NSW and ACT have one combined TSX estimate and are coloured alike.
- The unit chart shows that TSX holds data for 49 of the Action Plan's 110 national priority species, including plants. Each square is one priority species. Coverage is not a conservation outcome.
- The three species examples are qualitative summaries of the current DCCEEW Action Plan profiles for the [Maugean skate](https://www.dcceew.gov.au/environment/biodiversity/threatened/action-plan/priority-fish/maugean-skate), [orange-bellied parrot](https://www.dcceew.gov.au/environment/biodiversity/threatened/action-plan/priority-birds/orange-bellied-parrot) and [northern hairy-nosed wombat](https://www.dcceew.gov.au/environment/biodiversity/threatened/action-plan/northern-hairy-nosed-wombat). They illustrate distinct challenges; they are not a numerical ranking of the most endangered species.

## Visual design rules drawn from the course notes

- **Layout:** The title starts at top left. Four chapters follow a top-to-bottom reading path. Shared card edges and equal columns create sight-lines; whitespace separates topics. The large map occupies the visual centre of the geography chapter. Source: *FIT2179 Course Notes 9 Layout*, pp. 2–6.
- **Typography:** A short display headline establishes hierarchy; body text uses readable sentence case and moderate line length. Chart notes are visually secondary but remain legible. Source: *FIT2179 Course Notes 11 Typography*, especially pp. 2, 10–12.
- **Colour:** A small palette is reused consistently. Red indicates greater extinction concern or larger monitored decline, while muted green supports structure and place context. Ordered values change mainly in lightness; no rainbow or red-versus-green categorical scale is used. Source: *FIT2179 Course Notes 8 Colour*, pp. 5–10.
- **Maps:** The choropleth colours a *percentage change*, not a raw count; it uses an equal-area projection. The separate proportional-symbol map uses circle **area** for state-attached counts. A dot map uses one constant-size mark per priority place. Source: *FIT2179 Course Notes Choropleth*, pp. 2–4; *Proportional Symbol Maps*, pp. 2–5; *Dot Maps*, pp. 2–3; *Map Projections*, pp. 2–5.
- **Storytelling:** Each chart title states the reader task or finding. Notes explain what the measure means and what it cannot establish. Minimal gridlines and borders reduce clutter. Source: *FIT3179 Course Notes 7 Storytelling with Data*, pp. 2–4; *FIT2179 Course Notes 6 Data-ink Ratio and Chartjunk*.

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

The brief counts small multiples as one chart. These eleven are separate charts. Heatmap, mosaic, treemap, three map idioms, UpSet and unit chart are eight distinct advanced idioms under the brief's definition of advanced as other than its listed basic idioms. Idiom classification and effectiveness remain subject to tutor assessment.

## Rebuild

The source CSV, GIS files and TSX report are stored outside the public site in `../data/raw/`. Run `../scripts/prepare_data.py` and then `../scripts/build_specs.py` from the repository workspace. The public page serves only compact processed JSON and human-readable Vega-Lite specifications. No numbers or locations are randomly generated. The unit-chart squares represent documented aggregate counts; they do not identify individual species.

## Limits to keep visible

The EPBC list measures legal status and indicative distribution, not the true number of all threatened animals. Some species remain undescribed or unlisted. TSX results cover contributing monitored taxa and can be affected by spatial, taxonomic and temporal gaps. A decline in average monitored relative abundance cannot be attributed to a specific threat or recovery program from these charts. The 2025 TSX report calls its reptile index a pilot.
