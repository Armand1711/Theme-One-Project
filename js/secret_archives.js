/* Session-level reveal state: persists while the page is open so users can
   navigate back and forth without losing their unsealed intel, but resets on
   every fresh page load so every play-through starts fully redacted. */
const _sessionRevealed = new Map();

export function initSecretArchives(app, onBack, puzzleContext = null) {

  /* ─── Tab content definitions ─────────────────────────────── */
  const MS = (icon, opts = '') =>
    `<span class="material-symbols-outlined" style="font-variation-settings:${opts || "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 48"}">${icon}</span>`;

  const TABS = {

    /* ── 1. HISTORICAL RECORDS ──────────────────────────────── */
    historical: `
      <article class="archives-doc">
        <div class="archives-doc-header">
          <div>
            <span class="archives-doc-tag">ESTABLISHED 1886</span>
            <h2 class="archives-doc-title">The Foundation of the Union Masonic Temple</h2>
          </div>
          ${MS('auto_stories', "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 48")}
        </div>
        <div class="archives-doc-grid">
          <div class="archives-doc-body">
            <p class="archives-doc-quote">&ldquo;The cornerstone was laid upon the intersection of three national brotherhoods. No single nation could claim it &mdash; it belonged to all who subscribed.&rdquo;</p>
            <p class="archives-doc-text">Construction began in 1886 at 126&ndash;128 Dutoitspan Road, Kimberley. Seven Masonic lodges from English, Scottish, and Dutch constitutions pooled their debenture subscriptions to raise this Roman Corinthian structure. The building was consecrated on <strong>15 August 1889</strong> and declared a National Monument in 1990.</p>
            <p class="archives-doc-text" style="margin-top:10px">The double-storey facade features Roman Corinthian pilasters and a central arched entrance. The Great Hall served as the primary lodge room, with smaller chambers for each constituent lodge — a physical embodiment of unity beneath one roof.</p>
          </div>
          <div class="archives-doc-image-wrap">
            <div class="archives-real-img-frame">
              <img src="assets/PT-Masonic_Temple-1888.jpg" alt="The Union Masonic Temple, Kimberley, 1888" class="archives-real-img" />
              <div class="archives-img-caption">${MS('photo_camera')} Union Masonic Temple &mdash; Dutoitspan Road, c.&nbsp;1888</div>
            </div>
          </div>
        </div>
        <div class="archives-ornament">&mdash;&mdash; &#9670; &#9670; &mdash;&mdash;</div>
        <div class="archives-doc-action">
          <button class="archives-decode-btn archives-goto-puzzle" data-puzzle="1">Explore Enigma&nbsp;01 &rarr;</button>
        </div>
      </article>

      <div class="archives-bento">
        <article class="archives-doc archives-bento-main">
          <span class="archives-doc-tag">INTERNAL LOG &middot; 1886&ndash;1889</span>
          <h3 class="archives-doc-subtitle">Minutes of the Silent Assembly</h3>
          <p class="archives-doc-quote">&ldquo;Fourteen members were present from three constitutions. No words of English, Dutch, or Scots divided them. The symbols spoke for all.&rdquo;</p>
          <div class="archives-ornament">&mdash;&mdash; &#9670; &mdash;&mdash;</div>
          <p class="archives-doc-text">Lodge meeting records show the Worshipful Master opened each assembly in all three constitutional languages. The ritual calendar bridged English, Scottish, and Dutch traditions. Membership rolls record <strong>47 founding brethren</strong> across seven constituent lodges.</p>
        </article>
        <article class="archives-doc archives-bento-side">
          <span class="material-symbols-outlined archives-symbol-icon" style="font-variation-settings:'FILL' 0,'wght' 200,'GRAD' 0,'opsz' 48">architecture</span>
          <h3 class="archives-doc-subtitle" style="margin-bottom:12px">The Cipher</h3>
          <div class="archives-cipher-grid">
            <div class="archives-cipher-cell">${MS('explore')}<span>Compass</span></div>
            <div class="archives-cipher-cell">${MS('square_foot')}<span>Square</span></div>
            <div class="archives-cipher-cell">${MS('visibility')}<span>All-Seeing Eye</span></div>
            <div class="archives-cipher-cell">${MS('handshake')}<span>Brotherly Grip</span></div>
          </div>
          <span class="archives-doc-tag" style="margin-top:14px;display:block;text-align:center">Decoded in Enigma&nbsp;02</span>
        </article>
      </div>

      <article class="archives-doc">
        <div class="archives-doc-header">
          <div>
            <span class="archives-doc-tag">ARTIFACT &middot; KIMBERLEY 1899&ndash;1900</span>
            <h2 class="archives-doc-title">The Temple in the Siege of Kimberley</h2>
          </div>
          <span class="material-symbols-outlined archives-doc-icon" style="font-variation-settings:'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 48">military_tech</span>
        </div>
        <div class="archives-siege-layout">
          <div class="archives-siege-photo-col">
            <div class="archives-real-img-frame">
              <img src="assets/PT-Masonic_Temple-1900 hospital.jpg" alt="The Union Masonic Temple as fever hospital, 1899" class="archives-real-img" />
              <div class="archives-img-caption">Union Masonic Temple &mdash; Fever Hospital, Siege of Kimberley, Oct&nbsp;1899</div>
            </div>
          </div>
          <div class="archives-siege-body">
            <p class="archives-doc-quote">&ldquo;The bonds that sustained them were not written in law, but whispered in trust &mdash; forged in the shadows of Kimberley&rsquo;s past.&rdquo;</p>
            <p class="archives-doc-text">During the Siege of Kimberley (14&nbsp;Oct 1899&ndash;15&nbsp;Feb 1900), the Great Hall was commandeered as a fever hospital for British forces under Colonel Kekewich. The building that had bound a multicultural community became a refuge in war.</p>
            <p class="archives-doc-text" style="margin-top:10px">Cecil Rhodes &mdash; who had donated the building&rsquo;s stained glass window &mdash; was himself trapped in Kimberley during the siege. The temple&rsquo;s transformation from lodge to hospital reflected the upheaval of the Anglo-Boer War upon the diamond-fields community.</p>
          </div>
        </div>
        <div class="archives-ornament">&mdash;&mdash; &#9670; &#9670; &mdash;&mdash;</div>
      </article>

      <article class="archives-doc">
        <div class="archives-doc-header">
          <div>
            <span class="archives-doc-tag">ARCHIVE RECORD &middot; 1889</span>
            <h2 class="archives-doc-title">The Bonds of the Diamond Fields</h2>
          </div>
          <span class="material-symbols-outlined archives-doc-icon" style="font-variation-settings:'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 48">diamond</span>
        </div>
        <p class="archives-doc-quote">&ldquo;Opposite the synagogue, beside the market square &mdash; the temple stood at the crossroads of every faith, every nation, every fortune made in the dust of Kimberley.&rdquo;</p>
        <p class="archives-doc-text">The Union Masonic Temple occupied a geographic and social crossroads in Kimberley&rsquo;s centre. Diamond traders funded its debentures. The Dutch Reformed congregation was its neighbour. Cecil Rhodes contributed its stained glass window. This diverse web of patronage made the temple the silent hub of the colonial enclave.</p>
        <div class="archives-bonds-facts">
          <div class="archives-fact-item"><span class="archives-fact-num">7</span><span class="archives-fact-label">Founding Lodges</span></div>
          <div class="archives-fact-sep">◆</div>
          <div class="archives-fact-item"><span class="archives-fact-num">3</span><span class="archives-fact-label">Constitutions</span></div>
          <div class="archives-fact-sep">◆</div>
          <div class="archives-fact-item"><span class="archives-fact-num">1889</span><span class="archives-fact-label">Consecrated</span></div>
          <div class="archives-fact-sep">◆</div>
          <div class="archives-fact-item"><span class="archives-fact-num">1990</span><span class="archives-fact-label">National Monument</span></div>
        </div>
      </article>
    `,

    /* ── 2. ARCHITECTURAL PLANS ─────────────────────────────── */
    architectural: `
      <article class="archives-doc">
        <div class="archives-doc-header">
          <div>
            <span class="archives-doc-tag">DESIGN RECORD &middot; 1886</span>
            <h2 class="archives-doc-title">The Roman Corinthian Design</h2>
          </div>
          <span class="material-symbols-outlined archives-doc-icon" style="font-variation-settings:'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 48">architecture</span>
        </div>
        <p class="archives-doc-quote">&ldquo;The pilasters do not merely support the structure — they declare the purpose of those within. To build in the classical manner is to claim a lineage older than any nation present.&rdquo;</p>
        <div class="archives-arch-features">
          <div class="archives-arch-feature">
            <div class="archives-arch-feature-icon">${MS('corporate_fare')}</div>
            <div class="archives-arch-feature-body">
              <div class="archives-arch-feature-title">Roman Corinthian Facade</div>
              <div class="archives-arch-feature-text">Paired Corinthian pilasters flank the central entrance bay. The capitals feature acanthus leaf ornamentation consistent with classical lodge architecture of the 1880s British colonial tradition.</div>
            </div>
          </div>
          <div class="archives-arch-feature">
            <div class="archives-arch-feature-icon">${MS('stairs')}</div>
            <div class="archives-arch-feature-body">
              <div class="archives-arch-feature-title">Double-Storey Structure</div>
              <div class="archives-arch-feature-text">The ground floor housed administrative chambers and antechambers for candidate preparation. The upper floor contained the Great Hall &mdash; the principal lodge room used for formal degrees and assemblies.</div>
            </div>
          </div>
          <div class="archives-arch-feature">
            <div class="archives-arch-feature-icon">${MS('arch')}</div>
            <div class="archives-arch-feature-body">
              <div class="archives-arch-feature-title">Central Arched Entrance</div>
              <div class="archives-arch-feature-text">A semicircular arch frames the main entrance at 126&ndash;128 Dutoitspan Road. The keystone position carries decorative Masonic motifs &mdash; the compass and square &mdash; identifying the building&rsquo;s fraternal purpose to initiates.</div>
            </div>
          </div>
          <div class="archives-arch-feature">
            <div class="archives-arch-feature-icon">${MS('light')}</div>
            <div class="archives-arch-feature-body">
              <div class="archives-arch-feature-title">Stained Glass Windows</div>
              <div class="archives-arch-feature-text">Cecil Rhodes donated the building&rsquo;s principal stained glass window. The coloured glass casts geometric light patterns across the floor of the Great Hall during morning assemblies &mdash; a deliberate symbolic effect noted in lodge records.</div>
            </div>
          </div>
        </div>
        <div class="archives-ornament">&mdash;&mdash; &#9670; &#9670; &mdash;&mdash;</div>
      </article>

      <article class="archives-doc">
        <div class="archives-doc-header">
          <div>
            <span class="archives-doc-tag">CONSTRUCTION LOG &middot; 1886&ndash;1889</span>
            <h2 class="archives-doc-title">Timeline of Construction</h2>
          </div>
          <span class="material-symbols-outlined archives-doc-icon" style="font-variation-settings:'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 48">timeline</span>
        </div>
        <div class="archives-timeline">
          <div class="archives-timeline-item">
            <div class="archives-timeline-year">1886</div>
            <div class="archives-timeline-dot"></div>
            <div class="archives-timeline-body">
              <div class="archives-timeline-title">Foundation & Debentures</div>
              <div class="archives-timeline-text">Seven lodges from three constitutions subscribe debenture capital. Construction of the foundation begins on Dutoitspan Road. The site is chosen for its proximity to the market square and civic buildings.</div>
            </div>
          </div>
          <div class="archives-timeline-item">
            <div class="archives-timeline-year">1887</div>
            <div class="archives-timeline-dot"></div>
            <div class="archives-timeline-body">
              <div class="archives-timeline-title">Walls & Pilasters Raised</div>
              <div class="archives-timeline-text">The double-storey facade is completed. Corinthian pilasters are installed and the central arched entrance takes shape. Interior framing for the Great Hall begins on the upper floor.</div>
            </div>
          </div>
          <div class="archives-timeline-item">
            <div class="archives-timeline-year">1888</div>
            <div class="archives-timeline-dot"></div>
            <div class="archives-timeline-body">
              <div class="archives-timeline-title">Stained Glass & Fitments</div>
              <div class="archives-timeline-text">Cecil Rhodes donates the principal stained glass window. Interior fitments — altar, columns, lodge furnishings — are installed. The photograph of the building is taken, documenting the near-completed structure.</div>
            </div>
          </div>
          <div class="archives-timeline-item">
            <div class="archives-timeline-year">1889</div>
            <div class="archives-timeline-dot archives-timeline-dot--gold"></div>
            <div class="archives-timeline-body">
              <div class="archives-timeline-title">Consecration — 15 August</div>
              <div class="archives-timeline-text">The Union Masonic Temple is formally consecrated on 15 August 1889. Representatives from all seven founding lodges attend. The building is dedicated to the brotherhood of man under the great Architect of the Universe.</div>
            </div>
          </div>
          <div class="archives-timeline-item">
            <div class="archives-timeline-year">1899</div>
            <div class="archives-timeline-dot archives-timeline-dot--red"></div>
            <div class="archives-timeline-body">
              <div class="archives-timeline-title">The Siege — Great Hall Commandeered</div>
              <div class="archives-timeline-text">The Siege of Kimberley begins on 14 October. The Great Hall is commandeered as a fever hospital for British forces. Lodge activities are suspended for the duration of the 124-day siege.</div>
            </div>
          </div>
          <div class="archives-timeline-item">
            <div class="archives-timeline-year">1990</div>
            <div class="archives-timeline-dot archives-timeline-dot--gold"></div>
            <div class="archives-timeline-body">
              <div class="archives-timeline-title">Declared National Monument</div>
              <div class="archives-timeline-text">The South African Heritage Resources Agency declares the Union Masonic Temple a National Monument. The building remains standing on Dutoitspan Road, Kimberley — one of the finest surviving examples of colonial Masonic architecture in South Africa.</div>
            </div>
          </div>
        </div>
      </article>

      <article class="archives-doc">
        <div class="archives-doc-header">
          <div>
            <span class="archives-doc-tag">FLOOR PLAN &middot; UPPER STOREY</span>
            <h2 class="archives-doc-title">The Great Hall &amp; Chamber Layout</h2>
          </div>
          <span class="material-symbols-outlined archives-doc-icon" style="font-variation-settings:'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 48">floor</span>
        </div>
        <p class="archives-doc-quote">&ldquo;The lodge room is oriented east to west — as the sun travels. The Worshipful Master sits in the east, where the sun rises. Light is not incidental; it is the very purpose of the room.&rdquo;</p>
        <div class="archives-real-img-frame" style="margin:20px 0">
          <img src="assets/Floor plan masonic.jpg" alt="Original floor plan of the Union Masonic Temple" class="archives-real-img" />
          <div class="archives-img-caption">Original floor plan &mdash; Union Masonic Temple, Kimberley (upper storey)</div>
        </div>
        <div class="archives-ornament">&mdash;&mdash; &#9670; &mdash;&mdash;</div>
        <p class="archives-doc-text" style="font-size:0.8rem;text-align:center">The floor plan is based on lodge records. Exact dimensions are not preserved in surviving documents.</p>
      </article>
    `,

    /* ── 3. LODGE MINUTES ───────────────────────────────────── */
    minutes: `
      <article class="archives-doc">
        <div class="archives-doc-header">
          <div>
            <span class="archives-doc-tag">REGISTER &middot; 1886</span>
            <h2 class="archives-doc-title">The Seven Founding Lodges</h2>
          </div>
          <span class="material-symbols-outlined archives-doc-icon" style="font-variation-settings:'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 48">groups</span>
        </div>
        <p class="archives-doc-quote">&ldquo;They came from different lands and answered to different Grand Lodges — yet within these walls, the only rank that mattered was the degree of one&rsquo;s sincerity.&rdquo;</p>
        <div class="archives-lodge-table">
          <div class="archives-lodge-table-head">
            <span>Lodge</span><span>Constitution</span><span>Origin</span><span>Members</span>
          </div>
          <div class="archives-lodge-row">
            <span class="archives-lodge-name">Kimberley Lodge&nbsp;No.&nbsp;2637</span>
            <span class="archives-lodge-const archives-const-en">English</span>
            <span>England</span><span>18</span>
          </div>
          <div class="archives-lodge-row">
            <span class="archives-lodge-name">Griqualand West Lodge&nbsp;No.&nbsp;2138</span>
            <span class="archives-lodge-const archives-const-en">English</span>
            <span>England</span><span>12</span>
          </div>
          <div class="archives-lodge-row">
            <span class="archives-lodge-name">Caledonian Lodge&nbsp;No.&nbsp;611</span>
            <span class="archives-lodge-const archives-const-sc">Scottish</span>
            <span>Scotland</span><span>9</span>
          </div>
          <div class="archives-lodge-row">
            <span class="archives-lodge-name">De Beers Lodge&nbsp;No.&nbsp;714</span>
            <span class="archives-lodge-const archives-const-sc">Scottish</span>
            <span>Scotland</span><span>11</span>
          </div>
          <div class="archives-lodge-row">
            <span class="archives-lodge-name">De Goede Hoop Lodge&nbsp;No.&nbsp;4</span>
            <span class="archives-lodge-const archives-const-du">Dutch</span>
            <span>Netherlands</span><span>8</span>
          </div>
          <div class="archives-lodge-row">
            <span class="archives-lodge-name">Noord&nbsp;Kaapland Lodge&nbsp;No.&nbsp;7</span>
            <span class="archives-lodge-const archives-const-du">Dutch</span>
            <span>Netherlands</span><span>10</span>
          </div>
          <div class="archives-lodge-row archives-lodge-row--last">
            <span class="archives-lodge-name">Athole Lodge&nbsp;No.&nbsp;401</span>
            <span class="archives-lodge-const archives-const-sc">Scottish</span>
            <span>Scotland</span><span>7</span>
          </div>
        </div>
        <div class="archives-ornament">&mdash;&mdash; &#9670; &#9670; &mdash;&mdash;</div>
        <div class="archives-doc-action">
          <button class="archives-decode-btn archives-goto-puzzle" data-puzzle="3">Explore the Bond Network &rarr;</button>
        </div>
      </article>

      <article class="archives-doc">
        <div class="archives-doc-header">
          <div>
            <span class="archives-doc-tag">RITUAL LOG &middot; 1887</span>
            <h2 class="archives-doc-title">The Three Degrees of Initiation</h2>
          </div>
          <span class="material-symbols-outlined archives-doc-icon" style="font-variation-settings:'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 48">menu_book</span>
        </div>
        <p class="archives-doc-quote">&ldquo;The Entered Apprentice is taught to subdue his passions. The Fellow Craft, to improve himself. The Master Mason, to remember what is to come.&rdquo;</p>
        <div class="archives-degrees">
          <div class="archives-degree-card">
            <div class="archives-degree-num">I</div>
            <div class="archives-degree-body">
              <div class="archives-degree-title">Entered Apprentice</div>
              <div class="archives-degree-text">The first degree. The candidate is hoodwinked and led through darkness before receiving the light of the lodge. He is taught the signs and words of an Apprentice and charged to honour the four cardinal virtues: Temperance, Fortitude, Prudence, and Justice.</div>
            </div>
          </div>
          <div class="archives-degree-card">
            <div class="archives-degree-num">II</div>
            <div class="archives-degree-body">
              <div class="archives-degree-title">Fellow Craft</div>
              <div class="archives-degree-text">The second degree advances the Mason through the winding staircase of knowledge — the seven liberal arts and sciences. At the Union Masonic Temple, this degree was conferred in the Great Hall with all seven lodges invited to witness, underscoring its significance to the shared community.</div>
            </div>
          </div>
          <div class="archives-degree-card">
            <div class="archives-degree-num">III</div>
            <div class="archives-degree-body">
              <div class="archives-degree-title">Master Mason</div>
              <div class="archives-degree-text">The third and highest degree of the Craft. The candidate enacts the legend of Hiram Abiff &mdash; the architect of Solomon&rsquo;s Temple who died rather than reveal the Master&rsquo;s secrets. Lodge records note that all 47 founding brethren held this degree before the consecration of 1889.</div>
            </div>
          </div>
        </div>
        <div class="archives-ornament">&mdash;&mdash; &#9670; &mdash;&mdash;</div>
      </article>

      <article class="archives-doc">
        <div class="archives-doc-header">
          <div>
            <span class="archives-doc-tag">MEMBERSHIP RECORD &middot; 1889</span>
            <h2 class="archives-doc-title">Notable Members &amp; Patrons</h2>
          </div>
          <span class="material-symbols-outlined archives-doc-icon" style="font-variation-settings:'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 48">person_pin</span>
        </div>
        <div class="archives-members-grid">
          <div class="archives-member-card">
            <div class="archives-member-icon">${MS('diamond')}</div>
            <div class="archives-member-name">Cecil John Rhodes</div>
            <div class="archives-member-role">Diamond Magnate &middot; Cape Prime Minister</div>
            <div class="archives-member-note">Donated the principal stained glass window to the temple. Rhodes was a Freemason, having been initiated in 1877 at the Apollo University Lodge, Oxford. His connection to the temple underscores the deep entanglement of Masonic and imperial interests in Kimberley.</div>
          </div>
          <div class="archives-member-card">
            <div class="archives-member-icon">${MS('gavel')}</div>
            <div class="archives-member-name">Worshipful Masters</div>
            <div class="archives-member-role">Seven Lodges &middot; Annual Rotation</div>
            <div class="archives-member-note">Each constituent lodge elected its own Worshipful Master annually. During joint assemblies, precedence rotated by seniority of warrant. Records show the chair was held by English, Scottish, and Dutch Masters in roughly equal measure across the temple&rsquo;s first decade.</div>
          </div>
          <div class="archives-member-card">
            <div class="archives-member-icon">${MS('account_balance')}</div>
            <div class="archives-member-name">Diamond Traders</div>
            <div class="archives-member-role">De Beers &amp; Independent Merchants</div>
            <div class="archives-member-note">Debenture subscription lists name merchants from across the Cape Colony and Europe. The lodge provided a neutral space for business relationships to be forged — a function well understood by its patrons who navigated the fractious world of the Kimberley diamond market.</div>
          </div>
        </div>
        <div class="archives-ornament">&mdash;&mdash; &#9670; &#9670; &mdash;&mdash;</div>
      </article>
    `,

    /* ── 4. PHOTOGRAPHS ─────────────────────────────────────── */
    photographs: `
      <article class="archives-doc">
        <div class="archives-doc-header">
          <div>
            <span class="archives-doc-tag">PHOTOGRAPH &middot; c.&nbsp;1888</span>
            <h2 class="archives-doc-title">The Temple — Dutoitspan Road</h2>
          </div>
          <span class="material-symbols-outlined archives-doc-icon" style="font-variation-settings:'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 48">photo_camera</span>
        </div>
        <div class="archives-photo-hero">
          <div class="archives-real-img-frame archives-real-img-frame--large">
            <img src="assets/PT-Masonic_Temple-1888.jpg" alt="The Union Masonic Temple, Kimberley, 1888" class="archives-real-img archives-real-img--large" />
            <div class="archives-img-caption">${MS('photo_camera')} Union Masonic Temple &mdash; 126&ndash;128 Dutoitspan Road, Kimberley, c.&nbsp;1888 &middot; Wet-plate collodion photograph</div>
          </div>
        </div>
        <p class="archives-doc-text" style="margin-top:16px">This photograph documents the Union Masonic Temple shortly before its consecration on 15 August 1889. The image was taken using the wet-plate collodion process, the dominant photographic technique of the 1880s, which required the photographer to coat, expose, and develop the glass plate within minutes &mdash; a demanding process in the dry heat of the Kimberley diamond fields.</p>
        <p class="archives-doc-text" style="margin-top:10px">The facade shows the completed Roman Corinthian pilasters and the central arched entrance. Construction scaffolding has been removed. The street in front appears unpaved, consistent with Dutoitspan Road&rsquo;s condition in the late 1880s. Note the neighbouring structures visible at the edges &mdash; evidence of the dense commercial district that surrounded the temple.</p>
        <div class="archives-ornament">&mdash;&mdash; &#9670; &#9670; &mdash;&mdash;</div>
      </article>

      <article class="archives-doc">
        <div class="archives-doc-header">
          <div>
            <span class="archives-doc-tag">PHOTOGRAPH COLLECTION &middot; 1886&ndash;1900</span>
            <h2 class="archives-doc-title">The Visual Archive</h2>
          </div>
          <span class="material-symbols-outlined archives-doc-icon" style="font-variation-settings:'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 48">photo_library</span>
        </div>
        <p class="archives-doc-text" style="margin-bottom:20px">Additional records from the period. Many original photographs were lost during the Siege of Kimberley or through the deterioration of glass plates kept in the temple&rsquo;s archive room. The following records survive in description only.</p>
        <div class="archives-photo-grid">
          <div class="archives-photo-card">
            <div class="archives-real-img-frame archives-photo-img-frame">
              <img src="assets/PT-Masonic_Temple-1888-Interior-02.jpg" alt="Interior of the Great Hall, Union Masonic Temple" class="archives-real-img" />
            </div>
            <div class="archives-photo-card-body">
              <div class="archives-photo-card-title">The Great Hall Interior</div>
              <div class="archives-photo-card-text">Interior view of the principal lodge room, upper floor. Shows the altar, the three columns, and the Worshipful Master&rsquo;s chair positioned in the east. Stained glass visible at upper right. Recorded in the 1889 consecration programme as &ldquo;a room fit for the labours of Solomon&rsquo;s craftsmen.&rdquo;</div>
              <span class="archives-doc-tag" style="margin-top:8px;display:inline-block">Record: Plate 7, 1889</span>
            </div>
          </div>
          <div class="archives-photo-card">
            <div class="archives-photo-placeholder">
              <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 0,'wght' 200,'GRAD' 0,'opsz' 48;font-size:2.5rem;color:rgba(201,162,39,0.3)">light</span>
              <span class="archives-photo-plate-label">Plate&nbsp;lost c.&nbsp;1899</span>
            </div>
            <div class="archives-photo-card-body">
              <div class="archives-photo-card-title">The Rhodes Stained Glass Window</div>
              <div class="archives-photo-card-text">Close-up photograph of the stained glass window donated by Cecil John Rhodes. The design incorporates geometric Masonic motifs &mdash; the compass, the square, and the all-seeing eye &mdash; within a traditional Victorian leaded-glass format. The window was relocated during the 1899 siege.</div>
              <span class="archives-doc-tag" style="margin-top:8px;display:inline-block">Record: Plate 12, 1890</span>
            </div>
          </div>
          <div class="archives-photo-card">
            <div class="archives-photo-placeholder">
              <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 0,'wght' 200,'GRAD' 0,'opsz' 48;font-size:2.5rem;color:rgba(201,162,39,0.3)">groups</span>
              <span class="archives-photo-plate-label">Plate&nbsp;surviving</span>
            </div>
            <div class="archives-photo-card-body">
              <div class="archives-photo-card-title">Consecration Assembly, 1889</div>
              <div class="archives-photo-card-text">Group portrait of lodge members assembled on the steps of the temple for the consecration ceremony on 15 August 1889. Representatives from all seven founding lodges are present. The Worshipful Masters of each lodge stand in the front row. Forty-seven brethren are identified by name in the programme.</div>
              <span class="archives-doc-tag" style="margin-top:8px;display:inline-block">Record: Plate 3, 1889</span>
            </div>
          </div>
          <div class="archives-photo-card">
            <div class="archives-real-img-frame archives-photo-img-frame">
              <img src="assets/PT-Masonic_Temple-1900 hospital.jpg" alt="The Union Masonic Temple as Fever Hospital, 1899" class="archives-real-img" />
            </div>
            <div class="archives-photo-card-body">
              <div class="archives-photo-card-title">The Fever Hospital, 1899</div>
              <div class="archives-photo-card-text">Photograph taken during the Siege of Kimberley showing the Great Hall converted to a military fever hospital. Lodge furniture replaced by camp beds. British soldiers are visible. The photograph was confiscated by the military censor and the original plate was never returned to the lodge.</div>
              <span class="archives-doc-tag" style="margin-top:8px;display:inline-block">Record: Plate 31, Oct 1899</span>
            </div>
          </div>
        </div>
      </article>

      <article class="archives-doc">
        <div class="archives-doc-header">
          <div>
            <span class="archives-doc-tag">CONTEXT &middot; 1880s KIMBERLEY</span>
            <h2 class="archives-doc-title">Kimberley in the Diamond Age</h2>
          </div>
          <span class="material-symbols-outlined archives-doc-icon" style="font-variation-settings:'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 48">location_city</span>
        </div>
        <p class="archives-doc-quote">&ldquo;No other town in the southern hemisphere grew so fast, or drew so many nations to one place, as Kimberley in the years of the diamond rush.&rdquo;</p>
        <p class="archives-doc-text">By the mid-1880s, Kimberley was one of the most cosmopolitan cities in southern Africa. The discovery of diamonds in 1871 had drawn tens of thousands of fortune-seekers from Britain, the Netherlands, Germany, France, and further afield. The town that grew around the Big Hole had a market square, a synagogue, a Dutch Reformed church, a Catholic mission, and &mdash; at 126&ndash;128 Dutoitspan Road &mdash; a Masonic temple that all three major national brotherhoods called home.</p>
        <div class="archives-kimberley-facts">
          <div class="archives-kfact">
            <span class="archives-kfact-icon">${MS('people')}</span>
            <div><strong>~30,000</strong><br/>population by 1886</div>
          </div>
          <div class="archives-kfact">
            <span class="archives-kfact-icon">${MS('diamond')}</span>
            <div><strong>The Big Hole</strong><br/>deepest hand-dug excavation on Earth</div>
          </div>
          <div class="archives-kfact">
            <span class="archives-kfact-icon">${MS('public')}</span>
            <div><strong>20+ nationalities</strong><br/>present in the diamond fields</div>
          </div>
          <div class="archives-kfact">
            <span class="archives-kfact-icon">${MS('electric_bolt')}</span>
            <div><strong>First electric street lights</strong><br/>in the southern hemisphere, 1882</div>
          </div>
        </div>
        <div class="archives-ornament">&mdash;&mdash; &#9670; &mdash;&mdash;</div>
      </article>
    `
  };

  /* ─── Intelligence dossiers per puzzle context ─────────────────── */
  const INTEL_DOSSIERS = {
    1: {
      tab: 'historical',
      total: 4,
      html: `
        <article class="archives-doc arc-intel-dossier" id="arc-intel-dossier">
          <div class="arc-intel-header">
            <div class="arc-intel-stamp-row">
              <span class="arc-intel-stamp">&#9670; CLASSIFIED &#9670;</span>
              <span class="arc-intel-clearance">ENIGMA I &mdash; PHOTOGRAPHIC INTELLIGENCE</span>
            </div>
            <h3 class="arc-intel-title">Unsealing the Sanctuary</h3>
            <p class="arc-intel-sub">Four intelligence fragments are sealed below. Unseal each one — use the reasoning inside to guide how you reassemble the photograph.</p>
          </div>
          <div class="arc-intel-body">
            <p class="arc-intel-line">The photograph was taken at <span class="arc-redacted">126&ndash;128 Dutoitspan Road, Kimberley, circa 1888 &mdash; one year before the formal consecration. The building is symmetrical. Study the whole composition before placing any fragment.</span></p>
            <p class="arc-intel-line">The facade reads across in <span class="arc-redacted">three vertical sections &mdash; a left flank, a central bay, and a right flank. The central bay is dominated by the grand arched entrance. The flanks are mirror images of each other &mdash; but look carefully, the details are not identical.</span></p>
            <p class="arc-intel-line">The upper fragments are defined by <span class="arc-redacted">what appears at their very top edge &mdash; the crowning of the structure. Look for the pilaster capitals, the decorative pediment, and where the roofline meets the sky. These pieces show the building from mid-height upward.</span></p>
            <p class="arc-intel-line">The lower fragments are anchored by <span class="arc-redacted">what appears at their bottom edge &mdash; where the building meets the street. Look for entrance steps, horizontal stonework courses, and the base of the pilasters. These pieces show the building from mid-height downward to the ground.</span></p>
          </div>
          <div class="arc-intel-progress" id="arc-intel-progress">
            <div class="arc-intel-bar"><div class="arc-intel-fill" id="arc-intel-fill" style="width:0%"></div></div>
            <span class="arc-intel-count" id="arc-intel-count">0 of 4 intelligence items unsealed</span>
          </div>
        </article>
      `
    },
    2: {
      tab: 'historical',
      total: 4,
      html: `
        <article class="archives-doc arc-intel-dossier" id="arc-intel-dossier">
          <div class="arc-intel-header">
            <div class="arc-intel-stamp-row">
              <span class="arc-intel-stamp">&#9670; CLASSIFIED &#9670;</span>
              <span class="arc-intel-clearance">ENIGMA II &mdash; CIPHER INTELLIGENCE</span>
            </div>
            <h3 class="arc-intel-title">Decoding the Symbols</h3>
            <p class="arc-intel-sub">Four sealed clues below. Each one describes the logic behind a symbol and its meaning &mdash; unseal them, reason through each, and make the match yourself.</p>
          </div>
          <div class="arc-intel-body">
            <p class="arc-intel-line">The tile showing <strong>clasped hands</strong>: <span class="arc-redacted">At initiation, the candidate was hoodwinked &mdash; blindfolded and led through darkness. He could only identify a brother by a secret physical grip passed between two men without a word. No ceremony. No light. Just a pledge made in darkness. Consider what kind of bond that gesture represents.</span></p>
            <p class="arc-intel-line">The tile showing a <strong>linked chain</strong>: <span class="arc-redacted">Each brother is a link. The chain holds only as long as every member holds &mdash; break one and the whole weakens. Lodge teaching held that mutual dependence was not weakness but strength. Ask yourself: what does a structure where every member depends on every other ultimately build for those within it?</span></p>
            <p class="arc-intel-line">The tile showing an <strong>arched bridge</strong>: <span class="arc-redacted">The bridge derives from Solomon&rsquo;s Temple &mdash; a passage built to connect two otherwise separated spaces. In Kimberley, men from three nations used this symbol for their shared hall on Dutoitspan Road. Consider what a bridge makes possible between two worlds that would otherwise remain apart.</span></p>
            <p class="arc-intel-line">The tile showing a <strong>lit candle</strong>: <span class="arc-redacted">The candle was never allowed to go out between meetings &mdash; carried from one Worshipful Master to the next, from one generation to the next, without interruption. Think about what something that cannot be extinguished and is passed forward indefinitely ultimately becomes.</span></p>
          </div>
          <div class="arc-intel-progress" id="arc-intel-progress">
            <div class="arc-intel-bar"><div class="arc-intel-fill" id="arc-intel-fill" style="width:0%"></div></div>
            <span class="arc-intel-count" id="arc-intel-count">0 of 4 clues unsealed</span>
          </div>
        </article>
      `
    },
    3: {
      tab: 'minutes',
      total: 6,
      html: `
        <article class="archives-doc arc-intel-dossier" id="arc-intel-dossier">
          <div class="arc-intel-header">
            <div class="arc-intel-stamp-row">
              <span class="arc-intel-stamp">&#9670; CLASSIFIED &#9670;</span>
              <span class="arc-intel-clearance">ENIGMA III &mdash; BOND NETWORK INTELLIGENCE</span>
            </div>
            <h3 class="arc-intel-title">The Hidden Network</h3>
            <p class="arc-intel-sub">Six sealed fragments of evidence below. Each one describes a real historical relationship &mdash; unseal it, follow the reasoning, and draw the connection yourself.</p>
          </div>
          <div class="arc-intel-body">
            <p class="arc-intel-line">Bond I &mdash; <span class="arc-redacted">The temple was built on debenture capital. The lodges that signed the founding charter earliest and subscribed the most were the ones most institutionally bound to the temple itself. The English lodges were the primary subscribers &mdash; follow the money to find who is connected to the centre.</span></p>
            <p class="arc-intel-line">Bond II &mdash; <span class="arc-redacted">One lodge had followed the diamond rush south from Cape Colony, carrying their Scottish constitution with them. They signed the founding charter alongside the English lodges &mdash; making them co-owners from the very beginning. Their name sits beside the temple&rsquo;s on the foundation documents. Look for who arrived at the same table as the building itself.</span></p>
            <p class="arc-intel-line">Bond III &mdash; <span class="arc-redacted">The largest single debenture contribution did not come from the English or Scottish lodges. It came from the Dutch brethren, who were the temple&rsquo;s principal creditors &mdash; not merely its tenants. Without their capital, the building could not have been sustained. The centre and its largest financial backer are inseparable.</span></p>
            <p class="arc-intel-line">Bond IV &mdash; <span class="arc-redacted">Kimberley&rsquo;s diamond market and its English lodges were not separate worlds. Membership rolls and De Beers shareholder registers carry many of the same names. Commerce and the craft moved together in this town. Find where the merchants and the English brethren share the same ledger page.</span></p>
            <p class="arc-intel-line">Bond V &mdash; <span class="arc-redacted">Debenture lists from the temple&rsquo;s construction fund show two groups of merchants subscribing side by side. The market square did not enforce the same borders as the Grand Lodges. Wealth crossed the lines that language maintained. Find the two merchant communities that shared the same subscription list.</span></p>
            <p class="arc-intel-line">Bond VI &mdash; <span class="arc-redacted">Lodge records predating 1886 show two brotherhoods already sharing ceremonial occasions before the temple was built. Their alliance is the oldest documented connection in the network &mdash; it existed before the building that housed them all. Look for the pair that were already bound to each other before the others arrived.</span></p>
          </div>
          <div class="arc-intel-progress" id="arc-intel-progress">
            <div class="arc-intel-bar"><div class="arc-intel-fill" id="arc-intel-fill" style="width:0%"></div></div>
            <span class="arc-intel-count" id="arc-intel-count">0 of 6 bonds unsealed</span>
          </div>
        </article>
      `
    }
  };

  const dossierDef  = puzzleContext ? INTEL_DOSSIERS[puzzleContext.step] : null;
  const startTab    = dossierDef ? dossierDef.tab : 'historical';
  const totalIntel  = dossierDef ? dossierDef.total : 0;
  const stepKey     = puzzleContext ? puzzleContext.step : null;
  if (stepKey !== null && !_sessionRevealed.has(stepKey)) _sessionRevealed.set(stepKey, new Set());
  const revealed    = stepKey !== null ? _sessionRevealed.get(stepKey) : new Set();

  /* ─── Shell HTML ────────────────────────────────────────────── */
  const bannerHtml = puzzleContext ? `
    <div class="arc-puzzle-banner" id="arc-puzzle-banner">
      <div class="apb-label">You have read the research. Ready when you are.</div>
      <button class="apb-start-btn" id="apb-start-btn">${puzzleContext.label} &rarr;</button>
    </div>
  ` : '';

  const html = `
    <div id="screen-archives"${puzzleContext ? ' class="has-banner"' : ''}>
      <div class="archives-vignette"></div>

      <header class="archives-header">
        <button class="archives-back-btn" id="archives-back-btn">
          <span class="material-symbols-outlined" style="font-size:18px;line-height:1;vertical-align:middle">arrow_back</span>
          The Lodge
        </button>
        <div class="archives-title-center"><h1>Secret Archives</h1></div>
        <div class="lodge-hearts">
          <span class="material-symbols-outlined">favorite</span>
          <span class="material-symbols-outlined">favorite</span>
          <span class="material-symbols-outlined">favorite</span>
        </div>
      </header>

      <!-- Mobile tab strip -->
      <div class="archives-mobile-tabs">
        <button class="archives-mobile-tab${startTab === 'historical' ? ' archives-mobile-tab--active' : ''}" data-tab="historical">
          <span class="material-symbols-outlined">history_edu</span>History
        </button>
        <button class="archives-mobile-tab${startTab === 'architectural' ? ' archives-mobile-tab--active' : ''}" data-tab="architectural">
          <span class="material-symbols-outlined">architecture</span>Plans
        </button>
        <button class="archives-mobile-tab${startTab === 'minutes' ? ' archives-mobile-tab--active' : ''}" data-tab="minutes">
          <span class="material-symbols-outlined">group</span>Minutes
        </button>
        <button class="archives-mobile-tab${startTab === 'photographs' ? ' archives-mobile-tab--active' : ''}" data-tab="photographs">
          <span class="material-symbols-outlined">photo_library</span>Photos
        </button>
      </div>

      <div class="archives-layout">

        <!-- Sidebar -->
        <aside class="archives-sidebar">
          <div class="archives-profile">
            <div class="archives-profile-avatar">
              <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1,'wght' 300,'GRAD' 0,'opsz' 48;font-size:1.8rem;line-height:1">person</span>
            </div>
            <div>
              <div class="archives-profile-name">The Archivist</div>
              <div class="archives-profile-rank">Grand Lodge Keeper</div>
            </div>
          </div>

          <nav class="archives-nav">
            <div class="archives-nav-label">&#9670; Sections</div>
            <ul class="archives-nav-list" id="archives-nav-list">
              <li ${startTab === 'historical' ? 'class="archives-nav-active"' : ''} data-tab="historical">
                <span class="material-symbols-outlined">history_edu</span>Historical Records
              </li>
              <li ${startTab === 'architectural' ? 'class="archives-nav-active"' : ''} data-tab="architectural">
                <span class="material-symbols-outlined">architecture</span>Architectural Plans
              </li>
              <li ${startTab === 'minutes' ? 'class="archives-nav-active"' : ''} data-tab="minutes">
                <span class="material-symbols-outlined">group</span>Lodge Minutes
              </li>
              <li ${startTab === 'photographs' ? 'class="archives-nav-active"' : ''} data-tab="photographs">
                <span class="material-symbols-outlined">photo_library</span>Photographs
              </li>
            </ul>
          </nav>

          <div class="archives-sidebar-categories">
            <div class="archives-nav-label">&#9670; Categories</div>
            <ul class="archives-cat-list">
              <li data-tab="historical"><span class="archives-cat-dot"></span>Historical Records</li>
              <li data-tab="architectural"><span class="archives-cat-dot"></span>Architectural Blueprints</li>
              <li data-tab="minutes"><span class="archives-cat-dot"></span>Lodge Minutes</li>
              <li data-tab="photographs"><span class="archives-cat-dot"></span>Historical Photographs</li>
            </ul>
          </div>
        </aside>

        <!-- Main content (swapped on tab change) -->
        <main class="archives-main" id="archives-main-content">
          ${TABS[startTab]}
        </main>
      </div>
      ${bannerHtml}
    </div>
  `;

  app.innerHTML = html;
  window.scrollTo(0, 0);

  /* ─── Puzzle context banner button ──────────────────────────── */
  if (puzzleContext) {
    document.getElementById('apb-start-btn')?.addEventListener('click', () => {
      gsap.to('#screen-archives', {
        opacity: 0, duration: 0.35, ease: 'power2.in',
        onComplete: () => typeof puzzleContext.onStart === 'function' && puzzleContext.onStart(revealed.size >= totalIntel)
      });
    });
  }

  /* ─── Tab switching ─────────────────────────────────────────── */
  let currentTab = startTab;

  function switchTab(tab) {
    if (tab === currentTab) return;
    currentTab = tab;

    const main = document.getElementById('archives-main-content');

    // Update sidebar nav active
    document.querySelectorAll('#archives-nav-list li').forEach(li => {
      li.classList.toggle('archives-nav-active', li.dataset.tab === tab);
    });

    // Update mobile tabs active
    document.querySelectorAll('.archives-mobile-tab').forEach(btn => {
      btn.classList.toggle('archives-mobile-tab--active', btn.dataset.tab === tab);
    });

    // Animate out → swap → animate in
    gsap.to(main, {
      opacity: 0, y: 12, duration: 0.22, ease: 'power2.in',
      onComplete: () => {
        main.innerHTML = TABS[tab];
        window.scrollTo(0, 0);
        wireButtons();
        injectDossier(tab);
        gsap.fromTo(main,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.38, ease: 'power2.out' }
        );
        gsap.fromTo(main.querySelectorAll('.archives-doc, .archives-bento'),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.09, delay: 0.1 }
        );
      }
    });
  }

  /* ─── Button wiring (called after each tab swap) ─────────────── */
  function wireButtons() {
    document.querySelectorAll('.archives-goto-puzzle').forEach(btn => {
      const btnPuzzle = parseInt(btn.dataset.puzzle);
      const isThisPuzzle = puzzleContext && puzzleContext.step === btnPuzzle;
      // Update button text when in context mode for matching puzzle
      if (isThisPuzzle) btn.textContent = puzzleContext.label + ' →';
      btn.addEventListener('click', () => {
        const targetFn = isThisPuzzle ? puzzleContext.onStart : onBack;
        gsap.to('#screen-archives', {
          opacity: 0, duration: 0.35, ease: 'power2.in',
          onComplete: () => {
            if (typeof targetFn !== 'function') return;
            isThisPuzzle ? targetFn(revealed.size >= totalIntel) : targetFn();
          }
        });
      });
    });
  }

  /* ─── Sidebar nav clicks ──────────────────────────────────────── */
  document.getElementById('archives-nav-list').addEventListener('click', e => {
    const li = e.target.closest('li[data-tab]');
    if (li) switchTab(li.dataset.tab);
  });

  /* ─── Mobile tab strip clicks ─────────────────────────────────── */
  document.querySelectorAll('.archives-mobile-tab').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  /* ─── Categories list clicks ──────────────────────────────────── */
  document.querySelectorAll('.archives-cat-list li[data-tab]').forEach(li => {
    li.addEventListener('click', () => switchTab(li.dataset.tab));
  });

  /* ─── Back button ─────────────────────────────────────────────── */
  document.getElementById('archives-back-btn').addEventListener('click', () => {
    gsap.to('#screen-archives', {
      opacity: 0, duration: 0.4, ease: 'power2.in',
      onComplete: () => typeof onBack === 'function' && onBack()
    });
  });

  /* ─── Wire initial tab buttons ─────────────────────────────────── */
  wireButtons();
  injectDossier(startTab);

  /* ─── Intelligence dossier injection ──────────────────────────── */
  function injectDossier(tab) {
    if (!dossierDef || tab !== dossierDef.tab) return;
    const main = document.getElementById('archives-main-content');
    if (!main || main.querySelector('#arc-intel-dossier')) return;
    main.insertAdjacentHTML('afterbegin', dossierDef.html);
    wireDossier();
    gsap.fromTo('#arc-intel-dossier',
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }

  function wireDossier() {
    const spans = document.querySelectorAll('#arc-intel-dossier .arc-redacted');
    spans.forEach((span, idx) => {
      const isRevealed = revealed.has(idx);

      // Wrap the real text in an inner span so we can hide/show it via
      // visibility (guaranteed to work regardless of CSS cascade or stacking).
      const inner = document.createElement('span');
      inner.className = 'arc-text-inner';
      inner.innerHTML = span.innerHTML;
      inner.style.visibility = isRevealed ? 'visible' : 'hidden';
      span.innerHTML = '';
      span.appendChild(inner);

      if (isRevealed) {
        span.classList.remove('arc-redacted');
        span.classList.add('arc-redacted--revealed');
      } else {
        span.addEventListener('click', () => {
          revealed.add(idx);
          inner.style.visibility = 'visible';
          span.classList.remove('arc-redacted');
          span.classList.add('arc-redacted--revealed');
          gsap.fromTo(span,
            { opacity: 0, filter: 'blur(8px)' },
            { opacity: 1, filter: 'blur(0px)', duration: 0.55, ease: 'power2.out' }
          );
          updateIntelCount();
          if (revealed.size >= totalIntel) onAllRevealed();
        });
      }
    });
    updateIntelCount();
  }

  function updateIntelCount() {
    const fill  = document.getElementById('arc-intel-fill');
    const count = document.getElementById('arc-intel-count');
    const n     = Math.min(revealed.size, totalIntel);
    if (fill)  fill.style.width = totalIntel > 0 ? `${(n / totalIntel) * 100}%` : '0%';
    if (count) {
      const label = dossierDef && dossierDef.tab === 'minutes' ? 'bonds' : 'items';
      count.textContent = n >= totalIntel
        ? `All ${totalIntel} ${label} unsealed — intel gathered`
        : `${n} of ${totalIntel} ${label} unsealed`;
      if (n >= totalIntel) count.classList.add('arc-intel-count--done');
    }
  }

  function onAllRevealed() {
    const banner = document.getElementById('arc-puzzle-banner');
    const btn    = document.getElementById('apb-start-btn');
    if (banner) banner.classList.add('arc-puzzle-banner--ready');
    if (btn) {
      gsap.to(btn, {
        boxShadow: '0 0 24px rgba(201,162,39,0.7), 0 0 48px rgba(201,162,39,0.3)',
        duration: 1, repeat: -1, yoyo: true, ease: 'power2.inOut'
      });
    }
  }

  /* ─── Entrance animation ──────────────────────────────────────── */
  try {
    gsap.fromTo('.archives-header',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
    gsap.fromTo('.archives-mobile-tabs',
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.1 }
    );
    gsap.fromTo('.archives-sidebar',
      { opacity: 0, x: -24 },
      { opacity: 1, x: 0, duration: 0.55, ease: 'power2.out', delay: 0.1 }
    );
    gsap.fromTo('.archives-doc, .archives-bento',
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1, delay: 0.25 }
    );
  } catch (e) {}
}
