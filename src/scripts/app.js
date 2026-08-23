    const ROWS = 6;
    const COLS = 7;
    const FLEET_SIZE = 6;
    const FLEET_DEFAULT_SETUPS = {
      5: { 2: 2, 3: 1, 4: 0, 5: 0 },
      6: { 2: 2, 3: 2, 4: 1, 5: 0 },
      7: { 2: 3, 3: 2, 4: 1, 5: 1 }
    };
    const FLEET_SHIP_LIMITS = { 2: 5, 3: 3, 4: 3, 5: 2 };
    const FLEET_SHIP_DESIGNS = {
      2: "patrol",
      3: "destroyer",
      4: "cruiser",
      5: "flagship"
    };
    const EMPTY = "";
    const SUB = "sub";
    const DOM = "dom";
    const SPECTATOR = "spectator";
    const WHEEL_LIMIT_WINDOW_MS = 15 * 60 * 1000;
    const WHEEL_SPIN_LIMIT = 8;
    const WHEEL_POWER_LIMIT = 2;
    const WHEEL_NUDGE_LIMIT = 4;
    const WHEEL_THRONE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
    const WHEEL_THRONE_SPIN_LIMIT = 5;
    const WHEEL_THRONE_FREE_SPIN = "free";
    const OBEDIENCE_GRID_SIZE = 9;
    const OBEDIENCE_MIN_ORDER = 3;
    const OBEDIENCE_MAX_PRESSURE = 5;
    const OBEDIENCE_STARTING_FOCUS = 2;
    const OBEDIENCE_TILES = [
      { id: "kneel", label: "Kneel", icon: "K", tone: "pink" },
      { id: "beg", label: "Beg", icon: "B", tone: "gold" },
      { id: "praise", label: "Praise", icon: "P", tone: "rose" },
      { id: "pay", label: "Pay", icon: "$", tone: "green" },
      { id: "obey", label: "Obey", icon: "O", tone: "gold" },
      { id: "edge", label: "Edge", icon: "E", tone: "pink" },
      { id: "wait", label: "Wait", icon: "W", tone: "blue" },
      { id: "thank", label: "Thank", icon: "T", tone: "rose" },
      { id: "worship", label: "Worship", icon: "W", tone: "gold" }
    ];
    const OBEDIENCE_TWISTS = {
      clean: { label: "Clean", detail: "No twist." },
      blind: { label: "Blind", detail: "Labels hide during repeat." },
      shuffle: { label: "Shuffle", detail: "Tiles rearrange for the sub." },
      cruel: { label: "Cruel", detail: "Mistakes pay extra." },
      greedy: { label: "Greedy", detail: "Higher pressure payout." }
    };
    const WHEEL_RISK_MODES = {
      normal: {
        label: "Normal",
        cost: 5,
        bonus: 0,
        extraMinus: 0,
        prizeValue: 25,
        prizeBlankRadius: 1,
        slots: [[1, 8], [2, 7], [5, 5], [10, 3], [-5, 5], [-10, 2]],
        blessMap: { 1: 2, 2: 5, 5: 10, 10: 25, 25: 50 },
        greedyPrize: 60,
        greedyBlank: 30
      },
      risky: {
        label: "Risky",
        cost: 8,
        bonus: 5,
        extraMinus: 2,
        prizeValue: 25,
        prizeBlankRadius: 1,
        slots: [[1, 6], [2, 7], [5, 5], [10, 3], [-5, 7], [-10, 2]],
        blessMap: { 1: 2, 2: 5, 5: 10, 10: 25, 25: 50 },
        greedyPrize: 70,
        greedyBlank: 35
      },
      ruthless: {
        label: "Ruthless",
        cost: 15,
        bonus: 10,
        extraMinus: 4,
        prizeValue: 50,
        prizeBlankRadius: 2,
        slots: [[5, 7], [10, 8], [-5, 9], [-10, 2]],
        blessMap: { 5: 10, 10: 50, 50: 100 },
        greedyPrize: 110,
        greedyBlank: 50
      }
    };
    const TRAIL_LENGTH = 60;
    const TRAIL_FINISH = TRAIL_LENGTH - 1;
    const TRAIL_SLIDES = [
      { from: 30, to: 19 },
      { from: 48, to: 38 }
    ];

    const state = {
      screen: "lobby",
      roles: {
        one: null,
        two: null
      },
      names: {
        dom: "",
        sub: ""
      },
      settings: {
        activeTab: "dom",
        activeGameTab: "main",
        activeSideTab: "chat",
        sideOpen: false,
        domAdvantageMode: "dom",
        subDefaultBet: 10,
        subBetControl: "editable",
        subLinkWarningMode: "auto",
        distractionUrl: "",
        distractionMode: "background-both",
        distractionDuration: 15,
        distractionPopupPlacement: "random",
        distractionUntil: 0,
        distractionBackgroundUrl: "",
        distractionBackgroundMode: "background-both",
        distractionOverlayUrl: "",
        distractionOverlayUntil: 0,
        distractionOverlayX: 50,
        distractionOverlayY: 18,
        distractionOverlays: [],
        distractionGallery: [],
        galleryPanelOpen: {},
        goonerGallerySource: "peekstr",
        goonerGalleryCategory: "goonerbait",
        goonerGallerySubreddits: [],
        redditeryAutoPopup: false,
        redditeryAutoPopupSource: "booru",
        redditeryAutoPopupCategory: "goonerbait",
        redditeryAutoPopupSubreddits: [],
        redditeryAutoPopupDuration: 15,
        redditeryAutoPopupInterval: 30,
        redditeryRapidFire: false,
        autoPopupDomPreview: false,
        booruDateFilter: "all",
        booruAutoPopupFullVideos: false,
        leaveNotice: null,
        linkRequest: null,
        sessionMode: "throne",
        sessionModePrompted: true,
        startingPlayerMode: "random",
        reclaimPowersAlways: false,
        throneReclaimPerks: false,
        throneAmount: 5,
        throneAmountConfirmed: false,
        throneUrl: "",
        domTriggerEffect: null,
        focusTax: null,
        paymentDemand: null,
        normalThroneRequest: null,
        pendingThroneDemand: null,
        throneExtensionStatus: null,
        brattyWelcomeSeen: false,
        queenPowerMode: "tiered",
        queenPowerUsers: "dom",
        domSeePressureBanners: false,
        domSeePressureText: false,
        domSeePressurePulse: false,
        pressureViewPromptSeen: false
      },
      pendingWager: null,
      normalReplayPrompt: null,
      online: {
        room: null,
        seat: null,
        rev: 0,
        applying: false,
        polling: false,
        inviteUrl: "",
        playerNames: {
          one: "",
          two: ""
        },
        roleChoices: {
          one: null,
          two: null
        },
        ready: {
          one: false,
          two: false
        },
        seats: {
          one: false,
          two: false
        },
        seatSecrets: {
          one: "",
          two: ""
        },
        spectators: {}
      },
      currentGame: "tributeFour",
      board: createBoard(),
      turn: SUB,
      active: false,
      mode: "normal",
      pot: 0,
      domVault: 0,
      lockedTribute: 0,
      tiltLevel: 0,
      blockedColumns: [],
      skipAvailable: false,
      skipArmed: false,
      reclaimPassAvailable: false,
      lockColumnAvailable: false,
      lockColumnMode: false,
      lockedColumn: null,
      pressureDropAvailable: false,
      pressureDropArmed: false,
      pressureDropColumn: null,
      domOpened: false,
      winningCells: [],
      fleet: createFleetState(),
      twentyOne: createTwentyOneState(),
      higherLower: createHigherLowerState(),
      crazyEights: createCrazyEightsState(),
      doubleSolitaire: createDoubleSolitaireState(),
      ticTacToe: createTicTacToeState(),
      dice: createDiceState(),
      wheel: createWheelState(),
      trail: createTrailState(),
      obedience: createObedienceState(),
      checkers: createCheckersState(),
      reversi: createReversiState(),
      chess: createChessState(),
      solitaire: createSolitaireState(),
      memoryMatch: createMemoryMatchState(),
      brainDrainSnap: createBrainDrainSnapState(),
      lossPressure: createLossPressureState(),
      chat: [],
      ledger: []
    };

    const els = {
      lobbyScreen: document.getElementById("lobbyScreen"),
      setupScreen: document.getElementById("setupScreen"),
      gameSelectScreen: document.getElementById("gameSelectScreen"),
      gameScreen: document.getElementById("gameScreen"),
      solitaireScreen: document.getElementById("solitaireScreen"),
      solitaireCard: document.getElementById("solitaireCard"),
      solitaireStatus: document.getElementById("solitaireStatus"),
      solitaireStock: document.getElementById("solitaireStock"),
      solitaireWaste: document.getElementById("solitaireWaste"),
      solitaireTableau: document.getElementById("solitaireTableau"),
      solitaireTable: document.getElementById("solitaireTable"),
      solitaireCardPreview: document.getElementById("solitaireCardPreview"),
      memoryMatchScreen: document.getElementById("memoryMatchScreen"),
      memoryMatchCard: document.getElementById("memoryMatchCard"),
      memoryMatchStatus: document.getElementById("memoryMatchStatus"),
      memoryMatchTable: document.getElementById("memoryMatchTable"),
      memoryMatchGrid: document.getElementById("memoryMatchGrid"),
      memoryMatchReveal: document.getElementById("memoryMatchReveal"),
      memoryMatchRevealImage: document.getElementById("memoryMatchRevealImage"),
      memoryMatchMoves: document.getElementById("memoryMatchMoves"),
      memoryMatchMatches: document.getElementById("memoryMatchMatches"),
      memoryMatchSizeControls: document.getElementById("memoryMatchSizeControls"),
      memoryMatchNewImagesBtn: document.getElementById("memoryMatchNewImagesBtn"),
      memoryMatchRestartBtn: document.getElementById("memoryMatchRestartBtn"),
      memoryMatchBackBtn: document.getElementById("memoryMatchBackBtn"),
      brainDrainSnapScreen: document.getElementById("brainDrainSnapScreen"),
      brainDrainSnapCard: document.getElementById("brainDrainSnapCard"),
      brainDrainSnapStatus: document.getElementById("brainDrainSnapStatus"),
      brainDrainSnapTable: document.getElementById("brainDrainSnapTable"),
      brainDrainSnapScore: document.getElementById("brainDrainSnapScore"),
      brainDrainSnapStreak: document.getElementById("brainDrainSnapStreak"),
      brainDrainSnapIq: document.getElementById("brainDrainSnapIq"),
      brainDrainSnapTimerBar: document.getElementById("brainDrainSnapTimerBar"),
      brainDrainSnapCardView: document.getElementById("brainDrainSnapCardView"),
      brainDrainSnapNextBtn: document.getElementById("brainDrainSnapNextBtn"),
      brainDrainSnapSnapBtn: document.getElementById("brainDrainSnapSnapBtn"),
      brainDrainSnapNewBtn: document.getElementById("brainDrainSnapNewBtn"),
      brainDrainSnapBackBtn: document.getElementById("brainDrainSnapBackBtn"),
      brainDrainSnapHint: document.getElementById("brainDrainSnapHint"),
      pieceLossSpiral: document.getElementById("pieceLossSpiral"),
      pieceLossPulse: document.getElementById("pieceLossPulse"),
      pieceLossMessage: document.getElementById("pieceLossMessage"),
      chessCaptureBanner: document.getElementById("chessCaptureBanner"),
      newSolitaireBtn: document.getElementById("newSolitaireBtn"),
      solitaireUndoBtn: document.getElementById("solitaireUndoBtn"),
      solitaireBackBtn: document.getElementById("solitaireBackBtn"),
      soloRedditeryPanel: document.getElementById("soloRedditeryPanel"),
      soloGoonerGalleryCategory: document.getElementById("soloGoonerGalleryCategory"),
      soloRedditeryAutoPopupToggle: document.getElementById("soloRedditeryAutoPopupToggle"),
      soloRedditeryAutoPopupSource: document.getElementById("soloRedditeryAutoPopupSource"),
      soloRedditeryAutoPopupCategoryRow: document.getElementById("soloRedditeryAutoPopupCategoryRow"),
      soloRedditeryAutoPopupCategory: document.getElementById("soloRedditeryAutoPopupCategory"),
      soloRedditerySourcePicker: document.getElementById("soloRedditerySourcePicker"),
      soloBooruAutoPopupTagRow: document.getElementById("soloBooruAutoPopupTagRow"),
      soloBooruAutoPopupVideoRow: document.getElementById("soloBooruAutoPopupVideoRow"),
      soloBooruDateFilterRow: document.getElementById("soloBooruDateFilterRow"),
      soloBooruDateFilter: document.getElementById("soloBooruDateFilter"),
      soloDanbooruTagInput: document.getElementById("soloDanbooruTagInput"),
      soloDanbooruSuggestions: document.getElementById("soloDanbooruSuggestions"),
      soloDanbooruIncludeVideos: document.getElementById("soloDanbooruIncludeVideos"),
      soloDanbooruUnmuteVideos: document.getElementById("soloDanbooruUnmuteVideos"),
      soloDanbooruFullVideos: document.getElementById("soloDanbooruFullVideos"),
      soloRedditeryAutoPopupDuration: document.getElementById("soloRedditeryAutoPopupDuration"),
      soloRedditeryAutoPopupInterval: document.getElementById("soloRedditeryAutoPopupInterval"),
      soloRedditeryAutoPopupStatus: document.getElementById("soloRedditeryAutoPopupStatus"),
      distractionBackdrop: document.getElementById("distractionBackdrop"),
      distractionOverlay: document.getElementById("distractionOverlay"),
      domTriggerOverlay: document.getElementById("domTriggerOverlay"),
      domTriggerCard: document.getElementById("domTriggerCard"),
      domTriggerKicker: document.getElementById("domTriggerKicker"),
      domTriggerTitle: document.getElementById("domTriggerTitle"),
      domTriggerText: document.getElementById("domTriggerText"),
      domTriggerTimer: document.getElementById("domTriggerTimer"),
      throneKissSplash: document.getElementById("throneKissSplash"),
      checkersQueenSplash: document.getElementById("checkersQueenSplash"),
      checkersQueenSplashText: document.getElementById("checkersQueenSplashText"),
      outcomeSplash: document.getElementById("outcomeSplash"),
      outcomeSplashCard: document.getElementById("outcomeSplashCard"),
      outcomeKicker: document.getElementById("outcomeKicker"),
      outcomeTitle: document.getElementById("outcomeTitle"),
      outcomeDetail: document.getElementById("outcomeDetail"),
      normalReplayModal: document.getElementById("normalReplayModal"),
      normalReplayText: document.getElementById("normalReplayText"),
      normalReplayBtn: document.getElementById("normalReplayBtn"),
      normalFleetNewRulesBtn: document.getElementById("normalFleetNewRulesBtn"),
      normalChangeBetBtn: document.getElementById("normalChangeBetBtn"),
      playerOneName: document.getElementById("playerOneName"),
      playerTwoName: document.getElementById("playerTwoName"),
      continueSetupBtn: document.getElementById("continueSetupBtn"),
      confirmPlayersBtn: document.getElementById("confirmPlayersBtn"),
      setupMessage: document.getElementById("setupMessage"),
      setupRoomPanel: document.getElementById("setupRoomPanel"),
      setupSettingsPanel: document.getElementById("setupSettingsPanel"),
      setupDefaultBetRow: document.getElementById("setupDefaultBetRow"),
      setupDefaultBetInput: document.getElementById("setupDefaultBetInput"),
      setupThroneAmountRow: document.getElementById("setupThroneAmountRow"),
      setupThroneAmountInput: document.getElementById("setupThroneAmountInput"),
      setupStartingPlayerMode: document.getElementById("setupStartingPlayerMode"),
      setupDomAdvantageAlwaysInput: document.getElementById("setupDomAdvantageAlwaysInput"),
      setupDomAdvantageModeRow: document.getElementById("setupDomAdvantageModeRow"),
      setupDomAdvantageMode: document.getElementById("setupDomAdvantageMode"),
      setupSubLinkWarningRow: document.getElementById("setupSubLinkWarningRow"),
      setupSubLinkWarningMode: document.getElementById("setupSubLinkWarningMode"),
      setupThroneUrlInput: document.getElementById("setupThroneUrlInput"),
      setupThroneExtensionStatus: document.getElementById("setupThroneExtensionStatus"),
      setupThroneExtensionDownloadLink: document.getElementById("setupThroneExtensionDownloadLink"),
      setupSessionModeButtons: document.querySelectorAll("[data-setup-session-mode]"),
      setupRoomStatus: document.getElementById("setupRoomStatus"),
      setupRoomCodeDisplay: document.getElementById("setupRoomCodeDisplay"),
      setupShareLink: document.getElementById("setupShareLink"),
      copySetupInviteBtn: document.getElementById("copySetupInviteBtn"),
      localSetupGrid: document.getElementById("localSetupGrid"),
      localSetupActions: document.getElementById("localSetupActions"),
      copyInviteBtn: document.getElementById("copyInviteBtn"),
      playerSummary: document.getElementById("playerSummary"),
      menuBankLabel: document.getElementById("menuBankLabel"),
      menuDomBank: document.getElementById("menuDomBank"),
      chooserStatus: document.getElementById("chooserStatus"),
      menuRulesTitle: document.getElementById("menuRulesTitle"),
      menuRulesPrimaryTitle: document.getElementById("menuRulesPrimaryTitle"),
      menuRulesPrimaryText: document.getElementById("menuRulesPrimaryText"),
      menuRulesSecondaryTitle: document.getElementById("menuRulesSecondaryTitle"),
      menuRulesSecondaryText: document.getElementById("menuRulesSecondaryText"),
      menuRulesTertiaryText: document.getElementById("menuRulesTertiaryText"),
      menuRulesFinalText: document.getElementById("menuRulesFinalText"),
      settingsTabs: document.querySelectorAll(".settings-tab"),
      gameSelectTabs: document.querySelectorAll(".game-select-tab"),
      throneExtensionDownloadLink: document.getElementById("throneExtensionDownloadLink"),
      throneAmountControl: document.getElementById("throneAmountControl"),
      throneAmountInput: document.getElementById("throneAmountInput"),
      throneReclaimPerksToggle: document.getElementById("throneReclaimPerksToggle"),
      throneReclaimPerksInput: document.getElementById("throneReclaimPerksInput"),
      mainGamesGrid: document.getElementById("mainGamesGrid"),
      miniGamesGrid: document.getElementById("miniGamesGrid"),
      testingGamesGrid: document.getElementById("testingGamesGrid"),
      boardGamesGrid: document.getElementById("boardGamesGrid"),
      domSettingsPane: document.getElementById("domSettingsPane"),
      subSettingsPane: document.getElementById("subSettingsPane"),
      domToolsPane: document.getElementById("domToolsPane"),
      domAdvantageMode: document.getElementById("domAdvantageMode"),
      domSeePressureBanners: document.getElementById("domSeePressureBanners"),
      domSeePressureText: document.getElementById("domSeePressureText"),
      domSeePressurePulse: document.getElementById("domSeePressurePulse"),
      clearPopupsBtn: document.getElementById("clearPopupsBtn"),
      domSubBetControl: document.getElementById("domSubBetControl"),
      subDefaultBetInput: document.getElementById("subDefaultBetInput"),
      subLinkWarningMode: document.getElementById("subLinkWarningMode"),
      domLinkUrlInput: document.getElementById("domLinkUrlInput") || document.getElementById("sideDomLinkInput"),
      sendDomLinkBtn: document.getElementById("sendDomLinkBtn"),
      domLinkStatus: document.getElementById("domLinkStatus") || document.getElementById("sideDomLinkStatus"),
      sidePopout: document.getElementById("sidePopout"),
      sidePanelTitle: document.getElementById("sidePanelTitle"),
      sideToggleBtn: document.getElementById("sideToggleBtn"),
      sideRestoreTabs: document.querySelectorAll(".side-restore-tab"),
      sideTabs: document.querySelectorAll(".side-tab"),
      sideToolsTab: document.getElementById("sideToolsTab"),
      sideChatPane: document.getElementById("sideChatPane"),
      sideLedgerPane: document.getElementById("sideLedgerPane"),
      sideLedgerSummary: document.getElementById("sideLedgerSummary"),
      sideLedgerEntries: document.getElementById("sideLedgerEntries"),
      resetBankModal: document.getElementById("resetBankModal"),
      resetBankText: document.getElementById("resetBankText"),
      cancelResetBankBtn: document.getElementById("cancelResetBankBtn"),
      confirmResetBankBtn: document.getElementById("confirmResetBankBtn"),
      brattyWelcomeModal: document.getElementById("brattyWelcomeModal"),
      brattyWelcomeText: document.getElementById("brattyWelcomeText"),
      declineBrattyWelcomeBtn: document.getElementById("declineBrattyWelcomeBtn"),
      acceptBrattyWelcomeBtn: document.getElementById("acceptBrattyWelcomeBtn"),
      pressureViewPromptModal: document.getElementById("pressureViewPromptModal"),
      promptPressureBanners: document.getElementById("promptPressureBanners"),
      promptPressureText: document.getElementById("promptPressureText"),
      promptPressurePulse: document.getElementById("promptPressurePulse"),
      savePressurePromptBtn: document.getElementById("savePressurePromptBtn"),
      sideSettingsPane: document.getElementById("sideSettingsPane"),
      sideToolsPane: document.getElementById("sideToolsPane"),
      sideGalleryPane: document.getElementById("sideGalleryPane"),
      chatMessages: document.getElementById("chatMessages"),
      chatInput: document.getElementById("chatInput"),
      sendChatBtn: document.getElementById("sendChatBtn"),
      sideDomLinkInput: document.getElementById("sideDomLinkInput"),
      sideSendDomLinkBtn: document.getElementById("sideSendDomLinkBtn"),
      sideDomLinkStatus: document.getElementById("sideDomLinkStatus"),
      domTriggerPanel: document.getElementById("domTriggerPanel"),
      domTriggerStatus: document.getElementById("domTriggerStatus"),
      sideDistractionInput: document.getElementById("sideDistractionInput"),
      sideDistractionMode: document.getElementById("sideDistractionMode"),
      sideDistractionDuration: document.getElementById("sideDistractionDuration"),
      sideDistractionDurationRow: document.getElementById("sideDistractionDurationRow"),
      uploadDistractionBtn: document.getElementById("uploadDistractionBtn"),
      distractionFileInput: document.getElementById("distractionFileInput"),
      postDistractionBtn: document.getElementById("postDistractionBtn"),
      clearDistractionBtn: document.getElementById("clearDistractionBtn"),
      booruLoadButtons: document.querySelectorAll("[data-booru-source]"),
      booruGallery: document.getElementById("booruGallery"),
      danbooruGalleryCategory: document.getElementById("danbooruGalleryCategory"),
      danbooruDateFilter: document.getElementById("danbooruDateFilter"),
      danbooruLoadBtn: document.getElementById("danbooruLoadBtn"),
      danbooruNextBtn: document.getElementById("danbooruNextBtn"),
      danbooruTagInput: document.getElementById("danbooruTagInput"),
      danbooruIncludeVideos: document.getElementById("danbooruIncludeVideos"),
      danbooruUnmuteVideos: document.getElementById("danbooruUnmuteVideos"),
      danbooruFullVideos: document.getElementById("danbooruFullVideos"),
      danbooruSuggestions: document.getElementById("danbooruSuggestions"),
      danbooruGalleryStatus: document.getElementById("danbooruGalleryStatus"),
      danbooruGallery: document.getElementById("danbooruGallery"),
      redditeryRandomBtn: document.getElementById("redditeryRandomBtn"),
      goonerGalleryTopBtn: document.getElementById("goonerGalleryTopBtn"),
      goonerGallerySource: document.getElementById("goonerGallerySource"),
      goonerGalleryCategory: document.getElementById("goonerGalleryCategory"),
      goonerGallerySelectionSummary: document.getElementById("goonerGallerySelectionSummary"),
      customRedditPageInput: document.getElementById("customRedditPageInput"),
      addCustomRedditPageBtn: document.getElementById("addCustomRedditPageBtn"),
      customRedditSuggestions: document.getElementById("customRedditSuggestions"),
      customRedditPageStatus: document.getElementById("customRedditPageStatus"),
      goonerGallerySourcePicker: document.getElementById("goonerGallerySourcePicker"),
      galleryCollapsePanels: document.querySelectorAll("[data-gallery-panel]"),
      redditeryAutoPopupToggle: document.getElementById("redditeryAutoPopupToggle"),
      redditeryRapidFireToggle: document.getElementById("redditeryRapidFireToggle"),
      redditeryAutoPopupSource: document.getElementById("redditeryAutoPopupSource"),
      redditeryAutoPopupCategoryRow: document.getElementById("redditeryAutoPopupCategoryRow"),
      redditeryAutoPopupCategory: document.getElementById("redditeryAutoPopupCategory"),
      redditeryAutoPopupSourcePicker: document.getElementById("redditeryAutoPopupSourcePicker"),
      booruAutoPopupTagRow: document.getElementById("booruAutoPopupTagRow"),
      autoDanbooruTagInput: document.getElementById("autoDanbooruTagInput"),
      autoDanbooruSuggestions: document.getElementById("autoDanbooruSuggestions"),
      booruAutoPopupVideoRow: document.getElementById("booruAutoPopupVideoRow"),
      autoDanbooruIncludeVideos: document.getElementById("autoDanbooruIncludeVideos"),
      autoDanbooruUnmuteVideos: document.getElementById("autoDanbooruUnmuteVideos"),
      booruDateFilterRow: document.getElementById("booruDateFilterRow"),
      booruDateFilter: document.getElementById("booruDateFilter"),
      redditeryAutoPopupDuration: document.getElementById("redditeryAutoPopupDuration"),
      redditeryAutoPopupInterval: document.getElementById("redditeryAutoPopupInterval"),
      redditeryAutoPopupStatus: document.getElementById("redditeryAutoPopupStatus"),
      autoPopupDomPreviewRow: document.getElementById("autoPopupDomPreviewRow"),
      autoPopupDomPreviewInput: document.getElementById("autoPopupDomPreviewInput"),
      autoPopupPreview: document.getElementById("autoPopupPreview"),
      autoPopupPreviewModal: document.getElementById("autoPopupPreviewModal"),
      autoPopupPreviewModalMedia: document.getElementById("autoPopupPreviewModalMedia"),
      autoPopupPreviewModalText: document.getElementById("autoPopupPreviewModalText"),
      closeAutoPopupPreviewBtn: document.getElementById("closeAutoPopupPreviewBtn"),
      clearAutoPopupPreviewBtn: document.getElementById("clearAutoPopupPreviewBtn"),
      saveAutoPopupPreviewBtn: document.getElementById("saveAutoPopupPreviewBtn"),
      downloadAutoPopupPreviewBtn: document.getElementById("downloadAutoPopupPreviewBtn"),
      redditeryGallery: document.getElementById("redditeryGallery"),
      savedDistractionGallerySection: document.getElementById("savedDistractionGallerySection"),
      savedVideoGallerySection: document.getElementById("savedVideoGallerySection"),
      distractionGallery: document.getElementById("distractionGallery"),
      distractionVideoGallery: document.getElementById("distractionVideoGallery"),
      sideDistractionStatus: document.getElementById("sideDistractionStatus"),
      distractionChoiceModal: document.getElementById("distractionChoiceModal"),
      distractionChoicePreview: document.getElementById("distractionChoicePreview"),
      distractionChoiceText: document.getElementById("distractionChoiceText"),
      cancelDistractionChoiceBtn: document.getElementById("cancelDistractionChoiceBtn"),
      saveDistractionChoiceBtn: document.getElementById("saveDistractionChoiceBtn"),
      distractionChoiceDuration: document.getElementById("distractionChoiceDuration"),
      subWallpaperDistractionChoiceBtn: document.getElementById("subWallpaperDistractionChoiceBtn"),
      bothWallpaperDistractionChoiceBtn: document.getElementById("bothWallpaperDistractionChoiceBtn"),
      popupDistractionChoiceBtn: document.getElementById("popupDistractionChoiceBtn"),
      videoDistractionChoiceModal: document.getElementById("videoDistractionChoiceModal"),
      videoDistractionChoicePreview: document.getElementById("videoDistractionChoicePreview"),
      videoDistractionChoiceText: document.getElementById("videoDistractionChoiceText"),
      videoDistractionChoiceLength: document.getElementById("videoDistractionChoiceLength"),
      videoLoopTimeRow: document.getElementById("videoLoopTimeRow"),
      videoLoopCountRow: document.getElementById("videoLoopCountRow"),
      videoLoopConfirmActions: document.getElementById("videoLoopConfirmActions"),
      videoDistractionChoiceDuration: document.getElementById("videoDistractionChoiceDuration"),
      videoDistractionChoiceLoopCount: document.getElementById("videoDistractionChoiceLoopCount"),
      cancelVideoDistractionChoiceBtn: document.getElementById("cancelVideoDistractionChoiceBtn"),
      saveVideoDistractionChoiceBtn: document.getElementById("saveVideoDistractionChoiceBtn"),
      subWallpaperVideoDistractionChoiceBtn: document.getElementById("subWallpaperVideoDistractionChoiceBtn"),
      bothWallpaperVideoDistractionChoiceBtn: document.getElementById("bothWallpaperVideoDistractionChoiceBtn"),
      playFullVideoDistractionChoiceBtn: document.getElementById("playFullVideoDistractionChoiceBtn"),
      loopTimedVideoDistractionChoiceBtn: document.getElementById("loopTimedVideoDistractionChoiceBtn"),
      loopCountVideoDistractionChoiceBtn: document.getElementById("loopCountVideoDistractionChoiceBtn"),
      confirmLoopTimedVideoDistractionChoiceBtn: document.getElementById("confirmLoopTimedVideoDistractionChoiceBtn"),
      confirmLoopCountVideoDistractionChoiceBtn: document.getElementById("confirmLoopCountVideoDistractionChoiceBtn"),
      queenPowerMode: document.getElementById("queenPowerMode"),
      queenPowerUsers: document.getElementById("queenPowerUsers"),
      queenPowerModeRow: document.getElementById("queenPowerModeRow"),
      queenPowerUsersRow: document.getElementById("queenPowerUsersRow"),
      tributeFourCard: document.getElementById("tributeFourCard"),
      tributeFleetCard: document.getElementById("tributeFleetCard"),
      tributeTwentyOneCard: document.getElementById("tributeTwentyOneCard"),
      higherLowerCard: document.getElementById("higherLowerCard"),
      tributeCrazyEightsCard: document.getElementById("tributeCrazyEightsCard"),
      doubleSolitaireCard: document.getElementById("doubleSolitaireCard"),
      tributeTicTacToeCard: document.getElementById("tributeTicTacToeCard"),
      tributeWheelCard: document.getElementById("tributeWheelCard"),
      obedienceOrdersCard: document.getElementById("obedienceOrdersCard"),
      tributeTrailCard: document.getElementById("tributeTrailCard"),
      tributeCheckersCard: document.getElementById("tributeCheckersCard"),
      tributeReversiCard: document.getElementById("tributeReversiCard"),
      tributeChessCard: document.getElementById("tributeChessCard"),
      createRoomBtn: document.getElementById("createRoomBtn"),
      onlineStatus: document.getElementById("onlineStatus"),
      roomCodeDisplay: document.getElementById("roomCodeDisplay"),
      shareLinks: document.getElementById("shareLinks"),
      inviteShareLink: document.getElementById("inviteShareLink"),
      lobbyNameInput: document.getElementById("lobbyNameInput"),
      confirmLobbyNameBtn: document.getElementById("confirmLobbyNameBtn"),
      joinRoomCodeInput: document.getElementById("joinRoomCodeInput"),
      joinRoomBtn: document.getElementById("joinRoomBtn"),
      localTestingPanel: document.getElementById("localTestingPanel"),
      playLocalBtn: document.getElementById("playLocalBtn"),
      soloGamesBtn: document.getElementById("soloGamesBtn"),
      lobbyPlayerList: document.getElementById("lobbyPlayerList"),
      lobbyReadyBtn: document.getElementById("lobbyReadyBtn"),
      roleModal: document.getElementById("roleModal"),
      roleModalText: document.getElementById("roleModalText"),
      chooseDomBtn: document.getElementById("chooseDomBtn"),
      chooseSubBtn: document.getElementById("chooseSubBtn"),
      sessionModeModal: document.getElementById("sessionModeModal"),
      sessionModeText: document.getElementById("sessionModeText"),
      sessionBankModeBtn: document.getElementById("sessionBankModeBtn"),
      sessionThroneModeBtn: document.getElementById("sessionThroneModeBtn"),
      sessionThroneUrlRow: document.getElementById("sessionThroneUrlRow"),
      sessionThroneUrlInput: document.getElementById("sessionThroneUrlInput"),
      sessionThroneStatus: document.getElementById("sessionThroneStatus"),
      sessionThroneActions: document.getElementById("sessionThroneActions"),
      sessionThroneBackBtn: document.getElementById("sessionThroneBackBtn"),
      sessionThroneSaveBtn: document.getElementById("sessionThroneSaveBtn"),
      subLinkModal: document.getElementById("subLinkModal"),
      subLinkModalText: document.getElementById("subLinkModalText"),
      openSubLinkBtn: document.getElementById("openSubLinkBtn"),
      declineSubLinkBtn: document.getElementById("declineSubLinkBtn"),
      throneAmountConfirmModal: document.getElementById("throneAmountConfirmModal"),
      throneAmountConfirmText: document.getElementById("throneAmountConfirmText"),
      throneAmountConfirmInput: document.getElementById("throneAmountConfirmInput"),
      cancelThroneAmountConfirmBtn: document.getElementById("cancelThroneAmountConfirmBtn"),
      confirmThroneAmountBtn: document.getElementById("confirmThroneAmountBtn"),
      wagerModal: document.getElementById("wagerModal"),
      wagerModalTitle: document.getElementById("wagerModalTitle"),
      wagerModalBody: document.getElementById("wagerModalBody"),
      wagerModalActions: document.getElementById("wagerModalActions"),
      wagerEmojiDock: document.getElementById("wagerEmojiDock"),
      blackjackSettingsModal: document.getElementById("blackjackSettingsModal"),
      blackjackSettingsText: document.getElementById("blackjackSettingsText"),
      blackjackSettingsConfirmBtn: document.getElementById("blackjackSettingsConfirmBtn"),
      chessSettingsModal: document.getElementById("chessSettingsModal"),
      turnTimerSettingsTitle: document.getElementById("turnTimerSettingsTitle"),
      chessSettingsText: document.getElementById("chessSettingsText"),
      chessCustomTimerRow: document.getElementById("chessCustomTimerRow"),
      chessCustomTimerInput: document.getElementById("chessCustomTimerInput"),
      chessSettingsConfirmBtn: document.getElementById("chessSettingsConfirmBtn"),
      reversiHintToggleRow: document.getElementById("reversiHintToggleRow"),
      reversiHintToggle: document.getElementById("reversiHintToggle"),
      higherLowerMercyModal: document.getElementById("higherLowerMercyModal"),
      higherLowerMercyText: document.getElementById("higherLowerMercyText"),
      higherLowerMercyCollectBtn: document.getElementById("higherLowerMercyCollectBtn"),
      higherLowerMercyDenyBtn: document.getElementById("higherLowerMercyDenyBtn"),
      higherLowerMercyPunishBtn: document.getElementById("higherLowerMercyPunishBtn"),
      checkersQueenModal: document.getElementById("checkersQueenModal"),
      checkersQueenTitle: document.getElementById("checkersQueenTitle"),
      checkersQueenText: document.getElementById("checkersQueenText"),
      checkersQueenActions: document.getElementById("checkersQueenActions"),
      checkersQueenYesBtn: document.getElementById("checkersQueenYesBtn"),
      checkersQueenNoBtn: document.getElementById("checkersQueenNoBtn"),
      rulesBtn: document.getElementById("rulesBtn"),
      rulesModal: document.getElementById("rulesModal"),
      rulesModalTitle: document.getElementById("rulesModalTitle"),
      closeRulesBtn: document.getElementById("closeRulesBtn"),
      tributeFourPowerModal: document.getElementById("tributeFourPowerModal"),
      powerModalTitle: document.getElementById("powerModalTitle"),
      tributeFourPowerOptions: document.getElementById("tributeFourPowerOptions"),
      tributeFourPowerDetail: document.getElementById("tributeFourPowerDetail"),
      tributeFourPowerBackBtn: document.getElementById("tributeFourPowerBackBtn"),
      tributeFourPowerUseBtn: document.getElementById("tributeFourPowerUseBtn"),
      trailCardModal: document.getElementById("trailCardModal"),
      trailCardReveal: document.getElementById("trailCardReveal"),
      trailCardDeck: document.getElementById("trailCardDeck"),
      trailCardTitle: document.getElementById("trailCardTitle"),
      trailCardText: document.getElementById("trailCardText"),
      trailCardAction: document.getElementById("trailCardAction"),
      trailShopModal: document.getElementById("trailShopModal"),
      trailShopTitle: document.getElementById("trailShopTitle"),
      trailShopText: document.getElementById("trailShopText"),
      trailShopOptions: document.getElementById("trailShopOptions"),
      trailTransferPicker: document.getElementById("trailTransferPicker"),
      trailTransferSlider: document.getElementById("trailTransferSlider"),
      trailTransferValue: document.getElementById("trailTransferValue"),
      trailShopWaitBtn: document.getElementById("trailShopWaitBtn"),
      trailShopStartBtn: document.getElementById("trailShopStartBtn"),
      trailShopEndBtn: document.getElementById("trailShopEndBtn"),
      leaveRoomButtons: document.querySelectorAll(".leave-room-btn"),
      leaveNoticeModal: document.getElementById("leaveNoticeModal"),
      leaveNoticeText: document.getElementById("leaveNoticeText"),
      leaveNoticeShareLinks: document.getElementById("leaveNoticeShareLinks"),
      leaveNoticeInviteLink: document.getElementById("leaveNoticeInviteLink"),
      copyLeaveInviteBtn: document.getElementById("copyLeaveInviteBtn"),
      leaveNoticeCopyStatus: document.getElementById("leaveNoticeCopyStatus"),
      hideLeaveNoticeBtn: document.getElementById("hideLeaveNoticeBtn"),
      takePlayerOneBtn: document.getElementById("takePlayerOneBtn"),
      takePlayerTwoBtn: document.getElementById("takePlayerTwoBtn"),
      returnLobbyNoticeBtn: document.getElementById("returnLobbyNoticeBtn"),
      gameTitle: document.getElementById("gameTitle"),
      gameSubtitle: document.getElementById("gameSubtitle"),
      cashLedgerPanel: document.getElementById("cashLedgerPanel"),
      trailBankPill: document.getElementById("trailBankPill"),
      trailBankAmount: document.getElementById("trailBankAmount"),
      trailSpendingAmount: document.getElementById("trailSpendingAmount"),
      trailMoneyFlights: document.getElementById("trailMoneyFlights"),
      board: document.getElementById("board"),
      turnText: document.getElementById("turnText"),
      turnDomBankPill: document.getElementById("turnDomBankPill"),
      turnDomBank: document.getElementById("turnDomBank"),
      turnOwedPill: document.getElementById("turnOwedPill"),
      turnOwedLabel: document.getElementById("turnOwedLabel"),
      turnOwed: document.getElementById("turnOwed"),
      chessSubClock: document.getElementById("chessSubClock"),
      chessDomClock: document.getElementById("chessDomClock"),
      modeLabel: document.getElementById("modeLabel"),
      potLabel: document.getElementById("potLabel"),
      pot: document.getElementById("pot"),
      domVault: document.getElementById("domVault"),
      lockedTribute: document.getElementById("lockedTribute"),
      tiltStatus: document.getElementById("tiltStatus"),
      wheelPowerPanel: document.getElementById("wheelPowerPanel"),
      betInput: document.getElementById("betInput"),
      normalBtn: document.getElementById("normalBtn"),
      reclaimBtn: document.getElementById("reclaimBtn"),
      resetBtn: document.getElementById("resetBtn"),
      hitBtn: document.getElementById("hitBtn"),
      queenRepositionBtn: document.getElementById("queenRepositionBtn"),
      queenShieldBtn: document.getElementById("queenShieldBtn"),
      chessSkipBtn: document.getElementById("chessSkipBtn"),
      passBtn: document.getElementById("passBtn"),
      queenStanceSelect: document.getElementById("queenStanceSelect"),
      queenChargeText: document.getElementById("queenChargeText"),
      backToMenuBtn: document.getElementById("backToMenuBtn"),
      rulesTabs: document.getElementById("rulesTabs"),
      rulesTabButtons: document.querySelectorAll(".rules-tab"),
      ruleList: document.getElementById("ruleList"),
      log: document.getElementById("log")
    };
    let activeRulesTab = "normal";
    let selectedTributeFourPower = "lock";
    let selectedFleetPower = "scan";
    let selectedChessPower = "stance:none";
    let selectedCheckersPower = "crownPull";
    let selectedTwentyOnePower = "pushLuck";
    let localDoubleSolitaireViewed = null;
    let localFleetView = null;
    let localFleetViewTurn = null;
    let localFleetHoldUntil = 0;
    let pendingThroneAmountGame = null;
    let pendingThroneAmountOpener = null;
    let localBooruGalleryItems = [];
    let localBooruGalleryLoading = false;
    let localDanbooruGalleryItems = [];
    let localDanbooruGalleryLoading = false;
    let localDanbooruPage = 1;
    let localDanbooruCategory = "feet";
    let localDanbooruCustomTag = "";
    let localDanbooruSuggestions = [];
    let localDanbooruSuggesting = false;
    let localDanbooruSuggestTimer = null;
    let localDanbooruIncludeVideos = false;
    let localDanbooruUnmuteVideos = false;
    let localDanbooruAutoPopupItems = [];
    let localDanbooruAutoPopupPage = 0;
    let localDanbooruAutoPopupKey = "";
    let localDanbooruAutoPopupRecentUrls = [];
    let localRedditeryGalleryItems = [];
    let localRedditeryGalleryLoading = false;
    let localRedditeryCooldownUntil = 0;
    let localRedditeryCooldownTimer = null;
    let localRedditeryPage = -1;
    let localRedditeryAfter = "";
    let localRedditeryActiveSubreddit = "";
    let localRedditeryGalleryCursors = {};
    let localRedditeryGalleryEnded = {};
    let localRedditeryGalleryRecentUrls = [];
    let localCustomGoonerRedditPages = [];
    let localBrattyGalleryPrefsLoaded = false;
    let localBrattyGalleryPrefsSaving = false;
    let localRedditeryReachedEnd = false;
    let localRedditeryAutoPopupItems = [];
    let localRedditeryAutoPopupAfter = "";
    let localRedditeryAutoPopupCursors = {};
    let localRedditeryAutoPopupSubreddit = "";
    let localRedditeryAutoPopupNextAt = 0;
    let localRedditeryAutoPopupLoading = false;
    let localRedditeryAutoPopupRecentUrls = [];
    let localMemoryMatchAfter = "";
    let localMemoryMatchSubreddit = "";
    let localMemoryMatchRecentUrls = [];
    let localBrainDrainSnapPools = {};
    let localBrainDrainSnapAfter = {};
    let brainDrainSnapTimerId = null;
    let localAutoPopupPreview = null;
    const localSubDistractions = {
      distractionUrl: "",
      distractionMode: "overlay-sub",
      distractionDuration: 15,
      distractionPopupPlacement: "random",
      distractionUntil: 0,
      distractionBackgroundUrl: "",
      distractionBackgroundMode: "background-sub",
      distractionBackgroundMediaType: "",
      distractionBackgroundMuted: true,
      distractionOverlayUrl: "",
      distractionOverlayUntil: 0,
      distractionOverlayX: 50,
      distractionOverlayY: 52,
      distractionOverlays: [],
      distractionGallery: [],
      redditeryAutoPopup: false,
      redditeryAutoPopupSource: "booru",
      redditeryAutoPopupCategory: "goonerbait",
      redditeryAutoPopupSubreddits: [],
      redditeryAutoPopupDuration: 15,
      redditeryAutoPopupInterval: 30,
      galleryPanelOpen: {},
      autoPopupDomPreview: false,
      booruAutoPopupFullVideos: false,
      booruDateFilter: "all"
    };
    let pendingDistractionChoiceUrl = "";
    let pendingDistractionChoiceMedia = null;
    const distractionImageSizeCache = new Map();
    let renderedDistractionOverlaySignature = "";
    const THRONE_EXTENSION_REQUEST = "TRIBUTE_ARCADE_THRONE_STATUS_REQUEST";
    const THRONE_EXTENSION_RESPONSE = "TRIBUTE_ARCADE_THRONE_STATUS";
    const THRONE_EXTENSION_FOCUS_CHECKOUT = "TRIBUTE_ARCADE_FOCUS_THRONE_CHECKOUT";
    let throneExtensionStatus = {
      installed: false,
      ready: false,
      hasSavedCard: false,
      payButtonCount: 0,
      enabled: false,
      countdownActive: false,
      countdownSeconds: 0,
      message: "Waiting for extension status.",
      updatedAt: 0
    };

    function createBoard() {
      return Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY));
    }

    function createTicTacToeBoard() {
      return Array.from({ length: 3 }, () => Array(3).fill(EMPTY));
    }

    function createTicTacToeState() {
      return {
        format: "bo3",
        target: 2,
        maxBoards: 3,
        scores: {
          sub: 0,
          dom: 0,
          draws: 0
        },
        boardNumber: 1,
        matchActive: false,
        pendingNextBoard: false,
        lastBoardWinner: null
      };
    }

    const TIC_TAC_TOE_FORMATS = [
      { id: "first1", label: "First to 1", target: 1, maxBoards: 1 },
      { id: "bo3", label: "Best of 3", target: 2, maxBoards: 3 },
      { id: "bo5", label: "Best of 5", target: 3, maxBoards: 5 },
      { id: "first3", label: "First to 3", target: 3, maxBoards: 0 },
      { id: "first5", label: "First to 5", target: 5, maxBoards: 0 }
    ];

    function ticTacToeFormatById(id) {
      return TIC_TAC_TOE_FORMATS.find((format) => format.id === id) || TIC_TAC_TOE_FORMATS[1];
    }

    function ticTacToeFormatOptions() {
      return isThroneSession()
        ? TIC_TAC_TOE_FORMATS.filter((format) => format.id !== "first1")
        : TIC_TAC_TOE_FORMATS;
    }

    function currentTicTacToeFormat() {
      const options = ticTacToeFormatOptions();
      return options.find((format) => format.id === (state.ticTacToe && state.ticTacToe.format)) || options[0];
    }

    function normalizeTicTacToeState(value) {
      const base = createTicTacToeState();
      const format = ticTacToeFormatById(value && value.format);
      return {
        ...base,
        ...(value || {}),
        format: format.id,
        target: format.target,
        maxBoards: format.maxBoards,
        scores: {
          sub: Math.max(0, Number(value && value.scores ? value.scores.sub : 0) || 0),
          dom: Math.max(0, Number(value && value.scores ? value.scores.dom : 0) || 0),
          draws: Math.max(0, Number(value && value.scores ? value.scores.draws : 0) || 0)
        },
        boardNumber: Math.max(1, Number(value && value.boardNumber) || 1),
        matchActive: Boolean(value && value.matchActive),
        pendingNextBoard: Boolean(value && value.pendingNextBoard),
        lastBoardWinner: value && (value.lastBoardWinner === SUB || value.lastBoardWinner === DOM || value.lastBoardWinner === "draw") ? value.lastBoardWinner : null
      };
    }

    function createCheckersState() {
      return {
        board: Array.from({ length: 8 }, (_, row) => Array.from({ length: 8 }, (_, col) => {
          if ((row + col) % 2 === 0) return null;
          if (row < 3) return { role: DOM, king: false };
          if (row > 4) return { role: SUB, king: false };
          return null;
        })),
        setupPending: false,
        pendingStarter: SUB,
        pendingIntro: "",
        timerMode: "none",
        timerTarget: "both",
        customTimerMinutes: 10,
        timers: {
          sub: 0,
          dom: 0
        },
        timerLastTick: 0,
        selected: null,
        legalMoves: [],
        mustContinue: false,
        frozen: null,
        powerMode: "",
        pinned: null,
        marked: null,
        hungryCrown: 0,
        tollArmed: 0,
        queenSetup: null,
        queenDrainBoost: false,
        queenSplashMessage: "",
        queenSplashUntil: 0,
        captureBanner: null,
        recentCaptureBanners: [],
        powerUses: {
          crownPull: 3,
          marked: 3,
          pinned: 3,
          hungryCrown: 3,
          tributeToll: 3,
          takeover: 3
        },
        lockMode: false,
        lockAvailable: false,
        claims: 0,
        queenDrainTotal: 0
      };
    }

    function createDiceState() {
      return {
        dice: {
          sub: [],
          dom: []
        },
        bid: null,
        revealed: false,
        outcome: ""
      };
    }

    function normalizeFleetSize(size) {
      const value = Number(size);
      return value === 5 || value === 7 ? value : 6;
    }

    function defaultFleetShipCounts(size = FLEET_SIZE) {
      return { ...(FLEET_DEFAULT_SETUPS[normalizeFleetSize(size)] || FLEET_DEFAULT_SETUPS[FLEET_SIZE]) };
    }

    function normalizeFleetShipCounts(counts = {}, size = FLEET_SIZE) {
      const normalized = {};
      Object.keys(FLEET_SHIP_LIMITS).forEach((shipSize) => {
        const fallback = defaultFleetShipCounts(size)[shipSize] || 0;
        const value = Number(counts[shipSize]);
        normalized[shipSize] = Math.max(0, Math.min(FLEET_SHIP_LIMITS[shipSize], Number.isFinite(value) ? Math.round(value) : fallback));
      });
      return normalized;
    }

    function createFleetGrid(size = FLEET_SIZE) {
      const gridSize = normalizeFleetSize(size);
      return Array.from({ length: gridSize }, () => Array(gridSize).fill(false));
    }

    function createShotGrid(size = FLEET_SIZE) {
      const gridSize = normalizeFleetSize(size);
      return Array.from({ length: gridSize }, () => Array(gridSize).fill(EMPTY));
    }

    function createFleetState(size = FLEET_SIZE, shipCounts = defaultFleetShipCounts(size)) {
      const gridSize = normalizeFleetSize(size);
      const counts = normalizeFleetShipCounts(shipCounts, gridSize);
      return {
        size: gridSize,
        shipCounts: counts,
        setupPending: false,
        setupStarter: SUB,
        placementPending: false,
        placementDecisionPending: false,
        placementStarter: SUB,
        placementQueue: [],
        placementReuse: {
          dom: null,
          sub: null
        },
        placementReady: {
          dom: false,
          sub: false
        },
        placement: {
          dom: { orientation: "horizontal", replacingId: null },
          sub: { orientation: "horizontal", replacingId: null }
        },
        boards: {
          dom: createFleetGrid(gridSize),
          sub: createFleetGrid(gridSize)
        },
        ships: {
          dom: [],
          sub: []
        },
        shots: {
          dom: createShotGrid(gridSize),
          sub: createShotGrid(gridSize)
        },
        scanAvailable: false,
        scanReveals: [],
        modifiers: [],
        doubleTapAvailable: false,
        commandFog: null,
        noisyWaters: null,
        priorityIntel: null,
        shotResolving: null
      };
    }

    function normalizeFleetState(fleet = state.fleet) {
      const size = normalizeFleetSize(fleet && fleet.size);
      const base = createFleetState(size, fleet && fleet.shipCounts);
      const next = {
        ...base,
        ...(fleet || {}),
        size,
        shipCounts: normalizeFleetShipCounts(fleet && fleet.shipCounts, size),
        placement: {
          dom: { orientation: "horizontal", replacingId: null, ...((fleet && fleet.placement && fleet.placement.dom) || {}) },
          sub: { orientation: "horizontal", replacingId: null, ...((fleet && fleet.placement && fleet.placement.sub) || {}) }
        },
        placementReuse: {
          dom: null,
          sub: null,
          ...((fleet && fleet.placementReuse) || {})
        },
        placementReady: {
          dom: false,
          sub: false,
          ...((fleet && fleet.placementReady) || {})
        },
        placementQueue: Array.isArray(fleet && fleet.placementQueue) ? fleet.placementQueue : [],
        boards: {
          dom: (fleet && fleet.boards && fleet.boards.dom) || base.boards.dom,
          sub: (fleet && fleet.boards && fleet.boards.sub) || base.boards.sub
        },
        ships: {
          dom: (fleet && fleet.ships && Array.isArray(fleet.ships.dom)) ? fleet.ships.dom : [],
          sub: (fleet && fleet.ships && Array.isArray(fleet.ships.sub)) ? fleet.ships.sub : []
        },
        shots: {
          dom: (fleet && fleet.shots && fleet.shots.dom) || base.shots.dom,
          sub: (fleet && fleet.shots && fleet.shots.sub) || base.shots.sub
        }
      };
      state.fleet = next;
      return next;
    }

    function createTwentyOneState() {
      return {
        deck: [],
        hands: {
          dom: [],
          sub: []
        },
        setupPending: false,
        settings: {
          rounds: "single",
          powers: "on"
        },
        marks: {
          dom: 0,
          sub: 0
        },
        targetMarks: 1,
        nextHandPending: false,
        stood: false,
        dealerTurn: false,
        pushLuckPending: false,
        pushLuckQueued: false,
        pushLuckAvailable: false,
        revealDom: false,
        softSaveAvailable: false,
        outcome: ""
      };
    }

    const BLACKJACK_ROUND_FORMATS = [
      { id: "single", label: "1 Round", target: 1 },
      { id: "bo3", label: "Best of 3", target: 2 },
      { id: "bo5", label: "Best of 5", target: 3 },
      { id: "first3", label: "First to 3", target: 3 },
      { id: "first5", label: "First to 5", target: 5 }
    ];

    function blackjackRoundFormat(id) {
      return BLACKJACK_ROUND_FORMATS.find((format) => format.id === id) || BLACKJACK_ROUND_FORMATS[0];
    }

    function createWheelState() {
      return {
        slices: createWheelSlices(),
        angle: 0,
        spinning: false,
        unlocked: false,
        spinStartedAt: 0,
        spinDuration: 0,
        startAngle: 0,
        targetAngle: 0,
        resultIndex: null,
        result: null,
        riskMode: "normal",
        blessActive: false,
        greedyDom: false,
        nudgeUsed: false,
        finalPayout: null,
        finalBankDelta: null,
        resultNotes: [],
        limitWindowStartedAt: Date.now(),
        spinsUsed: 0,
        blessUses: 0,
        greedyUses: 0,
        nudgeUses: 0
      };
    }

    function createWheelSlices(mode = "normal") {
      const prizeIndex = Math.floor(Math.random() * 36);
      return createWheelSlicesWithPrizeIndex(prizeIndex, mode);
    }

    function createWheelSlicesWithPrizeIndex(prizeIndex, mode = "normal") {
      const riskMode = wheelRiskModeInfo(mode);
      const values = wheelRiskModeSlots(riskMode);
      for (let i = values.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [values[i], values[j]] = [values[j], values[i]];
      }
      const oppositePrizeIndex = (prizeIndex + 18) % 36;
      const slices = Array(36).fill(null);
      [prizeIndex, oppositePrizeIndex].forEach((center) => {
        slices[center] = riskMode.prizeValue;
        for (let offset = 1; offset <= Number(riskMode.prizeBlankRadius || 1); offset += 1) {
          slices[(center + 36 - offset) % 36] = 0;
          slices[(center + offset) % 36] = 0;
        }
      });
      let valueIndex = 0;
      for (let i = 0; i < slices.length; i += 1) {
        if (slices[i] === null) {
          slices[i] = values[valueIndex] ?? 0;
          valueIndex += 1;
        }
      }
      return slices;
    }

    function createThroneWheelSlices() {
      const values = [
        ...Array(1).fill(100),
        ...Array(2).fill(50),
        ...Array(4).fill(25),
        ...Array(6).fill(10),
        ...Array(10).fill(5),
        ...Array(5).fill(WHEEL_THRONE_FREE_SPIN),
        ...Array(8).fill(0)
      ];
      for (let i = values.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [values[i], values[j]] = [values[j], values[i]];
      }
      return values;
    }

    function createCurrentWheelSlices() {
      return isThroneSession() ? createThroneWheelSlices() : createWheelSlices(state.wheel && state.wheel.riskMode);
    }

    function wheelRiskModeSlots(riskMode = wheelRiskModeInfo()) {
      return (riskMode.slots || []).flatMap(([value, count]) => Array(Math.max(0, Number(count || 0))).fill(value));
    }

    function createTrailSpaces() {
      const spaces = Array.from({ length: TRAIL_LENGTH }, () => "plain");
      spaces[0] = "start";
      spaces[TRAIL_FINISH] = "finish";
      TRAIL_SLIDES.forEach((slide) => spaces[slide.from] = "slide");
      const types = [
        ...Array(15).fill("player-card"),
        ...Array(15).fill("fate-card"),
        ...Array(18).fill("cash"),
        ...Array(8).fill("plain")
      ];
      for (let i = types.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [types[i], types[j]] = [types[j], types[i]];
      }
      let typeIndex = 0;
      for (let index = 1; index < TRAIL_FINISH; index += 1) {
        if (spaces[index] === "plain") {
          spaces[index] = types[typeIndex];
          typeIndex += 1;
        }
      }
      return spaces;
    }

    function createTrailCashValues(spaces) {
      const values = spaces.map(() => null);
      const cashIndexes = spaces
        .map((type, index) => ({ type, index }))
        .filter((space) => space.type === "cash")
        .map((space) => space.index)
        .sort((a, b) => a - b);
      cashIndexes.forEach((index, rank) => {
        const progress = cashIndexes.length <= 1 ? 1 : rank / (cashIndexes.length - 1);
        const base = 1 + Math.floor(progress * 4.99);
        const jitter = Math.random() < 0.28 ? (Math.random() < 0.5 ? -1 : 1) : 0;
        values[index] = Math.max(1, Math.min(5, base + jitter));
      });
      return values;
    }

    function createTrailState() {
      const spaces = createTrailSpaces();
      return {
        spaces,
        positions: {
          sub: 0,
          dom: 0
        },
        dieSides: {
          sub: 6,
          dom: 6
        },
        skip: {
          sub: false,
          dom: false
        },
        cashDoubled: [],
        cashMultipliers: {},
        cashSelection: null,
        trailSelection: null,
        trapSnare: null,
        bankClaims: {},
        slidesSubOnly: false,
        extraSlides: [],
        cardMoneyMultiplier: 1,
        forcedPanelActivation: false,
        pendingPanelActivation: {
          sub: null,
          dom: null
        },
        trapCashTurns: 0,
        trapCashGrace: false,
        trapCashValues: {},
        cardDrawCounts: {
          dom: {},
          sub: {},
          fate: {}
        },
        spendingMoney: 0,
        tributeBank: 0,
        transferPercent: 50,
        setupPending: true,
        tributeTransferred: false,
        shoppingMode: false,
        finishChoicePending: false,
        endChoicePending: false,
        victorySplashUntil: 0,
        pendingShopSubCard: null,
        cashValues: createTrailCashValues(spaces),
        lastRoll: null,
        rollPreview: null,
        rollPreviewDice: null,
        rollAnimationUntil: 0,
        moving: false,
        movingPlayer: null,
        lastPlayerCard: null,
        lastFateCard: null,
        revealedCard: null,
        cardCollapsed: false,
        pendingCardActivation: null,
        winner: null
      };
    }

    function createObedienceState() {
      return {
        phase: "idle",
        order: [],
        input: [],
        round: 0,
        successes: 0,
        mistakes: 0,
        tributePaid: 0,
        pressure: 1,
        focus: OBEDIENCE_STARTING_FOCUS,
        twist: "clean",
        pendingTwist: "clean",
        layout: [],
        revealedIndex: null,
        streakLabel: "Unproven",
        message: "Dom picks an order on the grid."
      };
    }

    function createReversiBoard() {
      const board = Array.from({ length: 8 }, () => Array(8).fill(EMPTY));
      board[3][3] = DOM;
      board[3][4] = SUB;
      board[4][3] = SUB;
      board[4][4] = DOM;
      return board;
    }

    function createReversiState() {
      return {
        board: createReversiBoard(),
        setupPending: false,
        pendingStarter: SUB,
        pendingIntro: "",
        timerMode: "none",
        timerTarget: "both",
        customTimerMinutes: 10,
        timers: {
          sub: 0,
          dom: 0
        },
        timerLastTick: 0,
        showNumberHints: true,
        passes: 0,
        lastMove: null,
        winner: null,
        lockedDisc: null,
        commandAvailable: false,
        commandWindow: false,
        commandMode: false,
        commandRefreshUsed: false
      };
    }

    function createHigherLowerState() {
      return {
        deck: [],
        currentCard: null,
        lastCard: null,
        queuedTargetStreak: 15,
        targetStreak: 15,
        baseTribute: 0,
        wrongStreak: 0,
        wrongPenalty: 1,
        pendingOwed: 0,
        totalWrongs: 0,
        powerCharges: 0,
        lastPowerMilestone: 0,
        powerMenuOpen: false,
        hideNextCard: false,
        hideCurrentCard: false,
        suitCallPending: false,
        pulseActive: false,
        pulseStartedAt: 0,
        pulseAdded: 0,
        giveUpDraftAmount: 5,
        giveUpOffer: null,
        fateMessage: "",
        mercyPending: false,
        mercyBonus: 0,
        streak: 0,
        bestStreak: 0,
        result: "",
        winner: null
      };
    }

    function createChessState() {
      return {
        fen: "start",
        colors: {
          w: SUB,
          b: DOM
        },
        selected: null,
        legalMoves: [],
        setupPending: false,
        pendingColors: null,
        pendingIntro: "",
        timerMode: "none",
        timerTarget: "both",
        customTimerMinutes: 10,
        timers: {
          sub: 0,
          dom: 0
        },
        timerLastTick: 0,
        freezeAvailable: false,
        freezeMode: false,
        freezeSquare: null,
        freezeTurnsRemaining: 0,
        skipAvailable: false,
        skipQueued: false,
        commandAvailable: false,
        commandQueued: false,
        commandMode: false,
        repositionMode: false,
        repositionUsed: false,
        postDomPowerWindow: false,
        queenShield: false,
        queenStance: "none",
        queenTriggerUsed: false,
        captureBanner: null,
        capturePulse: null,
        captureMessage: null,
        recentCaptureBanners: [],
        recentCaptureMessages: [],
        subPiecesLostToDom: 0,
        charges: 0,
        outcome: ""
      };
    }

    function normalizeChessState(chess) {
      const base = createChessState();
      const merged = {
        ...base,
        ...(chess || {})
      };
      if (typeof merged.charges === "object") {
        merged.charges = Number(merged.charges.freeze || 0)
          + Number(merged.charges.skip || 0)
          + Number(merged.charges.command || 0);
      } else {
        merged.charges = Number(merged.charges || 0);
      }
      return merged;
    }

    function money(value) {
      return `$${value.toLocaleString()}`;
    }

    function labelFor(player) {
      return player === DOM ? state.names.dom : state.names.sub;
    }

    function normalizedNameKey(value) {
      return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    }

    const BRATTY_THEME_ASSETS = {
      avatar: "assets/bratty/bratty_avatar.jpg"
    };

    function possibleDomNameKeys() {
      const names = [state.names.dom];
      if (state.online && state.online.room) {
        ["one", "two"].forEach((seat) => {
          if (state.online.roleChoices && state.online.roleChoices[seat] === DOM) {
            names.push(state.online.playerNames && state.online.playerNames[seat]);
          }
        });
      }
      return names.map(normalizedNameKey).filter(Boolean);
    }

    function activeNameEasterEgg() {
      const domNames = possibleDomNameKeys();
      if (domNames.some((name) => ["bb", "bratty", "brattybitch", "brattybitch123", "brattybitchx"].includes(name))) {
        return {
          id: "brattyBb",
          commandTitle: "BB Command Center",
          paymentLabel: "BB's throne",
          paymentPlaceholder: "https://throne.com/brattyb_itch",
          defaultThroneUrl: "https://throne.com/brattyb_itch"
        };
      }
      return null;
    }

    function randomStarter() {
      return Math.random() < 0.5 ? SUB : DOM;
    }

    function startingPlayerMode() {
      return state.settings.startingPlayerMode === DOM || state.settings.startingPlayerMode === SUB
        ? state.settings.startingPlayerMode
        : "random";
    }

    function chooseStartingPlayer() {
      const mode = startingPlayerMode();
      return mode === "random" ? randomStarter() : mode;
    }

    function escapeHtml(value) {
      return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    function applyDefaultBet() {
      els.betInput.value = normalizeBuyIn(isThroneSession() ? currentThroneAmount() : state.settings.subDefaultBet);
    }

    function currentRoomId() {
      const roomParam = new URLSearchParams(window.location.search).get("room");
      return String(state.online.room || roomParam || "").toUpperCase();
    }

    function seatClaimKey(room = currentRoomId()) {
      return `tribute-seat-claim:${String(room || "").toUpperCase()}`;
    }

    function seatClaimCookieName(room = currentRoomId()) {
      return `tributeSeat_${String(room || "").toUpperCase().replace(/[^A-Z0-9]/g, "")}`;
    }

    function newSeatSecret() {
      if (window.crypto && typeof window.crypto.randomUUID === "function") {
        return window.crypto.randomUUID();
      }
      return `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
    }

    function readSeatClaim(room = currentRoomId()) {
      const code = String(room || "").toUpperCase();
      if (!code) return null;
      try {
        const stored = window.localStorage.getItem(seatClaimKey(code));
        if (stored) {
          const claim = JSON.parse(stored);
          if ((claim.seat === "one" || claim.seat === "two" || claim.seat === SPECTATOR) && claim.secret) return claim;
        }
      } catch (error) {
        // Ignore malformed local claims and fall back to the cookie copy.
      }
      const cookieName = `${seatClaimCookieName(code)}=`;
      const cookie = document.cookie.split("; ").find((part) => part.startsWith(cookieName));
      if (!cookie) return null;
      try {
        const claim = JSON.parse(decodeURIComponent(cookie.slice(cookieName.length)));
        if ((claim.seat === "one" || claim.seat === "two" || claim.seat === SPECTATOR) && claim.secret) return claim;
      } catch (error) {
        return null;
      }
      return null;
    }

    function writeSeatClaim(seat, room = currentRoomId(), secret = null) {
      const code = String(room || "").toUpperCase();
      if (!code || (seat !== "one" && seat !== "two" && seat !== SPECTATOR)) return null;
      const claim = { room: code, seat, secret: secret || newSeatSecret(), at: Date.now() };
      const encoded = encodeURIComponent(JSON.stringify(claim));
      try {
        window.localStorage.setItem(seatClaimKey(code), JSON.stringify(claim));
      } catch (error) {
        // Cookie fallback below still gives the browser a reconnect token.
      }
      document.cookie = `${seatClaimCookieName(code)}=${encoded}; max-age=2592000; path=/; samesite=lax`;
      return claim;
    }

    function clearSeatClaim(room = currentRoomId()) {
      const code = String(room || "").toUpperCase();
      if (!code) return;
      try {
        window.localStorage.removeItem(seatClaimKey(code));
      } catch (error) {
        // Cookie cleanup below is enough if localStorage is unavailable.
      }
      document.cookie = `${seatClaimCookieName(code)}=; max-age=0; path=/; samesite=lax`;
    }

    function localSeat() {
      if (!state.online.room) return null;
      const claim = readSeatClaim();
      if (claim && claim.seat === SPECTATOR) return claim.seat;
      if (claim && (claim.seat === "one" || claim.seat === "two")) {
        if (!seatIsOwned(claim.seat) || seatClaimMatches(claim, claim.seat)) return claim.seat;
      }
      if (state.online.room && (state.online.seat === "one" || state.online.seat === "two")) {
        if (!claim || !seatClaimMatches(claim, state.online.seat)) return null;
      }
      return state.online.seat;
    }

    function rememberSeat(seat, room = currentRoomId(), secret = null) {
      state.online.seat = seat;
      if ((seat === "one" || seat === "two") && secret) {
        state.online.seats = state.online.seats || { one: false, two: false };
        state.online.seatSecrets = state.online.seatSecrets || { one: "", two: "" };
        state.online.seats[seat] = true;
        state.online.seatSecrets[seat] = secret;
      }
      return writeSeatClaim(seat, room, secret);
    }

    function seatIsOwned(seat) {
      return Boolean(state.online.seatSecrets && state.online.seatSecrets[seat]);
    }

    function seatClaimMatches(claim, seat) {
      return Boolean(
        claim
        && claim.seat === seat
        && state.online.seatSecrets
        && state.online.seatSecrets[seat]
        && state.online.seatSecrets[seat] === claim.secret
      );
    }

    function localOnlineRole() {
      const seat = localSeat();
      if (seat === SPECTATOR) return SPECTATOR;
      return seat ? state.roles[seat] : null;
    }

    function sessionMode() {
      return state.settings.sessionMode === "bank" ? "bank" : "throne";
    }

    function isThroneSession() {
      return sessionMode() === "throne";
    }

    function currentThroneAmount() {
      return normalizeBuyIn(Number(state.settings.throneAmount || 5));
    }

    function throneExtensionInstalledForLocalSub() {
      if (state.online.room && localOnlineRole() !== SUB) return true;
      const remote = state.settings.throneExtensionStatus || {};
      const fresh = Date.now() - Number(remote.updatedAt || 0) < 30000;
      return Boolean(throneExtensionStatus.installed || (fresh && remote.installed));
    }

    function reclaimPerksActive() {
      return state.mode === "reclaim" || Boolean(state.settings.reclaimPowersAlways) || (isThroneSession() && state.settings.throneReclaimPerks);
    }

    function sessionModeControlsAllowed() {
      const seat = localSeat();
      if (seat === SPECTATOR) return false;
      if (state.online.room && state.screen === "setup") {
        const setupChoice = seat ? state.online.roleChoices[seat] : null;
        return !setupChoice || setupChoice === DOM;
      }
      const role = localOnlineRole();
      if (role === SPECTATOR) return false;
      return !state.online.room || role === DOM;
    }

    function setupThroneExtensionText() {
      if (!state.online.room) return "Throne helper status appears here in online rooms.";
      const remote = state.settings.throneExtensionStatus || {};
      const fresh = Date.now() - Number(remote.updatedAt || 0) < 30000;
      const seat = localSeat();
      const setupRole = state.screen === "setup" && seat ? state.online.roleChoices[seat] : null;
      const localRole = setupRole || localOnlineRole();
      const localFresh = Date.now() - Number(throneExtensionStatus.updatedAt || 0) < 30000;
      const localInstalled = localRole === SUB && localFresh && throneExtensionStatus.installed;
      const installed = Boolean(localInstalled || (fresh && remote.installed));
      const ready = Boolean((localRole === SUB && localFresh && throneExtensionStatus.ready) || (fresh && remote.ready));
      if (!installed) return `No Throne helper detected from ${state.names.sub || "the sub"} yet.`;
      return ready ? "Sub helper detected. Checkout is ready." : "Sub helper detected. Checkout is not ready yet.";
    }

    function renderSetupSettings() {
      if (!els.setupSettingsPanel) return;
      const canEdit = sessionModeControlsAllowed();
      const isThrone = isThroneSession();
      const seat = localSeat();
      const setupRole = state.screen === "setup" && seat ? state.online.roleChoices[seat] : null;
      const role = setupRole || localOnlineRole();
      const canEditSubLinkMode = !state.online.room ? true : role === SUB;
      els.setupSessionModeButtons.forEach((button) => {
        const mode = button.dataset.setupSessionMode || "bank";
        button.classList.toggle("active", sessionMode() === mode);
        button.disabled = !canEdit;
      });
      if (els.setupDefaultBetRow) els.setupDefaultBetRow.classList.toggle("hidden", isThrone);
      if (els.setupThroneAmountRow) els.setupThroneAmountRow.classList.toggle("hidden", !isThrone);
      if (els.setupDefaultBetInput) {
        els.setupDefaultBetInput.value = state.settings.subDefaultBet;
        els.setupDefaultBetInput.disabled = !canEdit;
      }
      if (els.setupThroneAmountInput) {
        els.setupThroneAmountInput.value = currentThroneAmount();
        els.setupThroneAmountInput.disabled = !canEdit;
      }
      if (els.setupStartingPlayerMode) {
        els.setupStartingPlayerMode.value = startingPlayerMode();
        els.setupStartingPlayerMode.disabled = !canEdit;
      }
      if (els.setupDomAdvantageAlwaysInput) {
        els.setupDomAdvantageAlwaysInput.checked = Boolean(state.settings.reclaimPowersAlways);
        els.setupDomAdvantageAlwaysInput.disabled = !canEdit;
      }
      if (els.setupDomAdvantageModeRow) {
        els.setupDomAdvantageModeRow.classList.toggle("hidden", !state.settings.reclaimPowersAlways);
      }
      if (els.setupDomAdvantageMode) {
        els.setupDomAdvantageMode.value = state.settings.domAdvantageMode === "both" ? "both" : "dom";
        els.setupDomAdvantageMode.disabled = !canEdit || !state.settings.reclaimPowersAlways;
      }
      if (els.setupSubLinkWarningRow) els.setupSubLinkWarningRow.classList.toggle("hidden", !canEditSubLinkMode);
      if (els.setupSubLinkWarningMode) {
        els.setupSubLinkWarningMode.value = state.settings.subLinkWarningMode || "auto";
        els.setupSubLinkWarningMode.disabled = !canEditSubLinkMode;
      }
      if (els.setupThroneUrlInput && document.activeElement !== els.setupThroneUrlInput) {
        const easterEgg = activeNameEasterEgg();
        const defaultThroneUrl = easterEgg && easterEgg.defaultThroneUrl ? normalizeDomLink(easterEgg.defaultThroneUrl) : "";
        els.setupThroneUrlInput.value = state.settings.throneUrl || defaultThroneUrl || "";
      }
      if (els.setupThroneUrlInput) els.setupThroneUrlInput.disabled = !canEdit;
      if (els.setupThroneExtensionStatus) {
        els.setupThroneExtensionStatus.textContent = setupThroneExtensionText();
        els.setupThroneExtensionStatus.classList.toggle("hidden", !isThrone && !state.online.room);
      }
      if (els.setupThroneExtensionDownloadLink) {
        const seat = localSeat();
        const setupRole = state.screen === "setup" && seat ? state.online.roleChoices[seat] : null;
        const role = setupRole || localOnlineRole();
        const localFresh = Date.now() - Number(throneExtensionStatus.updatedAt || 0) < 30000;
        const localInstalled = localFresh && throneExtensionStatus.installed;
        const showDownload = isThrone && (!state.online.room || role === SUB) && !localInstalled;
        els.setupThroneExtensionDownloadLink.classList.toggle("hidden", !showDownload);
      }
    }

    function maybePromptSessionMode() {
      return;
    }

    function renderSessionModeModal(step = null) {
      if (!els.sessionModeModal) return;
      const isUrlStep = step === "url" || els.sessionModeModal.dataset.step === "url";
      const easterEgg = activeNameEasterEgg();
      const defaultThroneUrl = easterEgg && easterEgg.defaultThroneUrl ? normalizeDomLink(easterEgg.defaultThroneUrl) : "";
      els.sessionModeModal.dataset.step = isUrlStep ? "url" : "choice";
      els.sessionModeText.textContent = isUrlStep
        ? (defaultThroneUrl
          ? `${state.names.dom || "Dom"} has a saved Throne URL. Confirm it for this Throne session.`
          : "Paste the Throne URL for this session. Sub losses will automatically open the prepared Throne page.")
        : `${state.names.dom || "Dom"}, choose how losses should work this session.`;
      els.sessionThroneUrlRow.classList.toggle("hidden", !isUrlStep);
      els.sessionThroneStatus.classList.toggle("hidden", !isUrlStep);
      els.sessionThroneActions.classList.toggle("hidden", !isUrlStep);
      els.sessionBankModeBtn.classList.toggle("hidden", isUrlStep);
      els.sessionThroneModeBtn.classList.toggle("hidden", isUrlStep);
      if (isUrlStep && document.activeElement !== els.sessionThroneUrlInput) {
        els.sessionThroneUrlInput.value = state.settings.throneUrl || defaultThroneUrl || "";
      }
      if (els.sessionThroneSaveBtn) {
        els.sessionThroneSaveBtn.textContent = defaultThroneUrl ? "Confirm Throne Game" : "Start Throne Game";
      }
      const remote = state.settings.throneExtensionStatus || {};
      const fresh = Date.now() - Number(remote.updatedAt || 0) < 30000;
      const localReady = (!state.online.room || localOnlineRole() === SUB) && throneExtensionStatus.installed;
      const installed = Boolean((fresh && remote.installed) || localReady);
      const ready = Boolean((fresh && remote.ready) || ((!state.online.room || localOnlineRole() === SUB) && throneExtensionStatus.ready));
      els.sessionThroneStatus.textContent = installed
        ? (ready ? `${state.names.sub || "Sub"} has the extension and checkout is ready.` : `${state.names.sub || "Sub"} has the extension, but checkout is not ready yet.`)
        : `No extension signal from ${state.names.sub || "the sub"} yet. They may need to install or refresh it.`;
    }

    function openSessionModeModal(step = "choice") {
      if (!els.sessionModeModal || !sessionModeControlsAllowed()) return;
      renderSessionModeModal(step);
      els.sessionModeModal.classList.remove("hidden");
    }

    function closeSessionModeModal() {
      if (els.sessionModeModal) els.sessionModeModal.classList.add("hidden");
    }

    function renderThroneAmountConfirmModal() {
      if (!els.throneAmountConfirmModal || els.throneAmountConfirmModal.classList.contains("hidden")) return;
      const amount = currentThroneAmount();
      if (els.throneAmountConfirmText) {
        els.throneAmountConfirmText.textContent = `${state.names.dom || "Dom"}, the current Throne amount is ${money(amount)}. Use this for the first game?`;
      }
      if (els.throneAmountConfirmInput && document.activeElement !== els.throneAmountConfirmInput) {
        els.throneAmountConfirmInput.value = amount;
      }
    }

    function shouldConfirmThroneAmountBeforeGame() {
      return state.screen === "select"
        && isThroneSession()
        && sessionModeControlsAllowed()
        && !state.settings.throneAmountConfirmed;
    }

    function openThroneAmountConfirmModal(gameKey, opener) {
      if (!els.throneAmountConfirmModal) return false;
      pendingThroneAmountGame = gameKey || null;
      pendingThroneAmountOpener = typeof opener === "function" ? opener : null;
      els.throneAmountConfirmModal.classList.remove("hidden");
      renderThroneAmountConfirmModal();
      if (els.throneAmountConfirmInput) {
        els.throneAmountConfirmInput.value = currentThroneAmount();
        els.throneAmountConfirmInput.focus();
        els.throneAmountConfirmInput.select();
      }
      return true;
    }

    function closeThroneAmountConfirmModal() {
      pendingThroneAmountGame = null;
      pendingThroneAmountOpener = null;
      if (els.throneAmountConfirmModal) els.throneAmountConfirmModal.classList.add("hidden");
    }

    function confirmThroneAmountAndStart() {
      if (!pendingThroneAmountGame) {
        closeThroneAmountConfirmModal();
        return;
      }
      if (state.online.room && localOnlineRole() !== DOM) return;
      const opener = pendingThroneAmountOpener;
      const amount = normalizeBuyIn(Number(els.throneAmountConfirmInput && els.throneAmountConfirmInput.value || currentThroneAmount()));
      pendingThroneAmountGame = null;
      pendingThroneAmountOpener = null;
      if (els.throneAmountConfirmModal) els.throneAmountConfirmModal.classList.add("hidden");
      updateSettings({ throneAmount: amount, throneAmountConfirmed: true });
      if (opener) opener();
    }

    function chooseBankSessionMode() {
      if (!sessionModeControlsAllowed()) return;
      updateSettings({
        sessionMode: "bank",
        sessionModePrompted: true,
        normalThroneRequest: null,
        pendingThroneDemand: null
      });
      closeSessionModeModal();
      addLog(`<strong>Regular bank game selected.</strong> Sub losses add to ${state.names.dom}'s bank.`);
    }

    function chooseThroneSessionMode() {
      if (!sessionModeControlsAllowed()) return;
      renderSessionModeModal("url");
      requestThroneExtensionStatus();
    }

    function saveThroneSessionMode() {
      if (!sessionModeControlsAllowed()) return;
      const easterEgg = activeNameEasterEgg();
      const defaultThroneUrl = easterEgg && easterEgg.defaultThroneUrl ? easterEgg.defaultThroneUrl : "";
      const url = normalizeDomLink((els.sessionThroneUrlInput && els.sessionThroneUrlInput.value) || defaultThroneUrl);
      if (!url) {
        els.sessionThroneStatus.textContent = "Enter a valid Throne URL first.";
        if (els.sessionThroneUrlInput) els.sessionThroneUrlInput.focus();
        return;
      }
      updateSettings({
        sessionMode: "throne",
        sessionModePrompted: true,
        throneUrl: url,
        normalThroneRequest: null,
        pendingThroneDemand: null
      });
      closeSessionModeModal();
      addLog(`<strong>Throne game selected.</strong> Sub losses automatically open the prepared Throne page.`);
    }

    function domAdvantagesEnabled() {
      return state.settings.domAdvantageMode !== "off";
    }

    function domAdvantageControlsAllowed(role) {
      if (!domAdvantagesEnabled()) return false;
      if (role === SPECTATOR) return false;
      if (!role) return true;
      return state.settings.domAdvantageMode === "both" || role === DOM;
    }

    function queenPowerControlsAllowed(role) {
      if (role === SPECTATOR) return false;
      if (!role) return true;
      return state.settings.queenPowerUsers === "both" || role === DOM;
    }

    function setScreen(screen) {
      state.screen = screen;
      if (screen !== "game") clearThroneKissSplash();
      if (screen !== "solitaire") hideSolitaireCardPreview();
      els.setupScreen.classList.toggle("hidden", screen !== "setup");
      els.lobbyScreen.classList.toggle("hidden", screen !== "lobby");
      els.gameSelectScreen.classList.toggle("hidden", screen !== "select");
      els.gameScreen.classList.toggle("hidden", screen !== "game");
      if (els.solitaireScreen) els.solitaireScreen.classList.toggle("hidden", screen !== "solitaire");
      if (els.memoryMatchScreen) els.memoryMatchScreen.classList.toggle("hidden", screen !== "memoryMatch");
      if (els.brainDrainSnapScreen) els.brainDrainSnapScreen.classList.toggle("hidden", screen !== "brainDrainSnap");
      renderControlGlow();
      renderMenu();
    }

    function setRole(player, role) {
      if (localSeat() === SPECTATOR) return;
      if (localSeat() && localSeat() !== player) return;
      const other = player === "one" ? "two" : "one";
      state.roles[player] = role;
      state.roles[other] = role === DOM ? SUB : DOM;
      renderRoles();
      renderSetupSettings();
      publishState();
    }

    function renderRoles() {
      document.querySelectorAll(".role-btn").forEach((button) => {
        const player = button.dataset.player;
        if (!player) return;
        button.classList.toggle("active", state.roles[player] === button.dataset.role);
        button.disabled = Boolean(localSeat() && localSeat() !== player);
      });
      const seat = localSeat();
      const isOnlinePlayer = seat === "one" || seat === "two";
      const ownOnlineRole = isOnlinePlayer ? state.online.roleChoices[seat] : null;
      document.querySelectorAll("[data-online-role-choice]").forEach((button) => {
        const role = button.dataset.onlineRoleChoice;
        button.classList.toggle("active", ownOnlineRole === role);
        button.disabled = !state.online.room || !isOnlinePlayer;
      });
      els.playerOneName.disabled = Boolean(localSeat() && localSeat() !== "one");
      els.playerTwoName.disabled = Boolean(localSeat() && localSeat() !== "two");
    }

    function confirmPlayers() {
      const oneName = els.playerOneName.value.trim();
      const twoName = els.playerTwoName.value.trim();
      if (!oneName || !twoName) {
        addSetupWarning("Both players need a name.");
        return;
      }
      if (!state.roles.one || !state.roles.two) {
        addSetupWarning("Both players need roles.");
        return;
      }

      state.names[state.roles.one] = oneName;
      state.names[state.roles.two] = twoName;
      els.setupMessage.textContent = "";
      els.playerSummary.textContent = `${state.names.dom} is the dom. ${state.names.sub} is the sub.`;
      setScreen("select");
      render();
      publishState();
    }

    function addSetupWarning(message) {
      els.setupMessage.textContent = message;
    }

    function continueToSetup() {
      setScreen("setup");
      publishState();
    }

    function playLocally() {
      state.online.room = null;
      state.online.seat = null;
      state.online.rev = 0;
      state.online.playerNames = { one: "", two: "" };
      state.online.roleChoices = { one: null, two: null };
      state.online.ready = { one: false, two: false };
      state.online.seats = { one: false, two: false };
      state.online.seatSecrets = { one: "", two: "" };
      state.online.spectators = {};
      state.settings.leaveNotice = null;
      state.settings.throneAmountConfirmed = false;
      state.roles = { one: DOM, two: SUB };
      state.names = { dom: "dom", sub: "sub" };
      els.playerOneName.value = "dom";
      els.playerTwoName.value = "sub";
      els.setupMessage.textContent = "";
      clearLocalRoomUrl();
      setScreen("setup");
      renderRoles();
      updateOnlineUi();
    }

    function openSoloGamesMenu() {
      resetLocalOnlineState();
      state.settings.activeGameTab = "solo";
      state.currentGame = "solitaire";
      clearLocalRoomUrl();
      setScreen("select");
      renderMenu();
      renderSidePanel();
    }

    function clearLocalRoomUrl() {
      const url = new URL(window.location.href);
      url.searchParams.delete("room");
      url.searchParams.delete("seat");
      window.history.replaceState({}, "", url.toString());
    }

    function resetLocalOnlineState() {
      const room = currentRoomId();
      clearSeatClaim(room);
      state.online.room = null;
      state.online.seat = null;
      state.online.rev = 0;
      state.online.inviteUrl = "";
      state.online.playerNames = { one: "", two: "" };
      state.online.roleChoices = { one: null, two: null };
      state.online.ready = { one: false, two: false };
      state.online.seats = { one: false, two: false };
      state.online.seatSecrets = { one: "", two: "" };
      state.online.spectators = {};
      state.settings.throneAmountConfirmed = false;
      clearLocalRoomUrl();
      updateOnlineUi();
    }

    function leaveNoticeKey(id = state.settings.leaveNotice && state.settings.leaveNotice.id) {
      return `tribute-leave-notice:${state.online.room || "local"}:${id || "none"}`;
    }

    async function leaveOnlineRoom() {
      const room = state.online.room;
      const seat = localSeat();
      if (!room || !seat) {
        setScreen("lobby");
        render();
        return;
      }
      if (seat === SPECTATOR) {
        const claim = readSeatClaim();
        if (claim && claim.secret && state.online.spectators && state.online.spectators[claim.secret]) {
          delete state.online.spectators[claim.secret];
          await publishOnlineLobbyChange((lobby) => {
            delete lobby.spectators[claim.secret];
          });
        }
        resetLocalOnlineState();
        setScreen("lobby");
        render();
        return;
      }

      const leavingName = state.online.playerNames[seat]
        || (state.roles[seat] === DOM ? state.names.dom : state.names.sub)
        || "The other player";
      state.settings.leaveNotice = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        seat,
        name: leavingName,
        at: Date.now()
      };
      state.online.seats[seat] = false;
      state.online.seatSecrets[seat] = "";
      state.online.playerNames[seat] = "";
      state.online.roleChoices[seat] = null;
      state.online.ready = state.online.ready || { one: false, two: false };
      state.online.ready[seat] = false;
      state.active = false;
      const claim = readSeatClaim(room);
      try {
        const response = await fetch("/api/leave", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            room,
            seat,
            secret: claim ? claim.secret : "",
            leaveNotice: state.settings.leaveNotice
          })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Leave failed");
        state.online.rev = data.rev;
      } catch (error) {
        els.onlineStatus.textContent = `Leave sync paused: ${error.message}`;
      }

      resetLocalOnlineState();
      els.lobbyNameInput.value = "";
      els.setupMessage.textContent = "";
      setScreen("lobby");
      renderRoles();
      render();
    }

    function renderLeaveRoomButtons() {
      const show = Boolean(state.online.room);
      els.leaveRoomButtons.forEach((button) => button.classList.toggle("hidden", !show));
    }

    function renderLeaveNotice() {
      const notice = state.settings.leaveNotice;
      const seat = localSeat();
      const availableSeats = ["one", "two"].filter((playerSeat) => state.online.seats[playerSeat] === false);
      const canTakeSeat = Boolean(state.online.room && seat === SPECTATOR && availableSeats.length);
      const shouldShow = Boolean((state.online.room && notice && notice.id && notice.seat !== seat) || canTakeSeat);
      if (!shouldShow || (!canTakeSeat && window.localStorage.getItem(leaveNoticeKey(notice && notice.id)) === "hidden")) {
        els.takePlayerOneBtn.classList.add("hidden");
        els.takePlayerTwoBtn.classList.add("hidden");
        els.returnLobbyNoticeBtn.classList.remove("hidden");
        if (els.leaveNoticeCopyStatus) els.leaveNoticeCopyStatus.textContent = "";
        els.leaveNoticeModal.classList.add("hidden");
        return;
      }
      state.online.inviteUrl = roomUrl();
      els.takePlayerOneBtn.classList.toggle("hidden", !(seat === SPECTATOR && availableSeats.includes("one")));
      els.takePlayerTwoBtn.classList.toggle("hidden", !(seat === SPECTATOR && availableSeats.includes("two")));
      els.returnLobbyNoticeBtn.classList.toggle("hidden", seat === SPECTATOR && canTakeSeat);
      els.leaveNoticeText.textContent = canTakeSeat
        ? `${notice && notice.name ? `${notice.name} left the room. ` : ""}A player seat is open. Send the invite link if you want them to rejoin.`
        : `${notice.name || "The other player"} left the room. You are alone in the room. Send them this invite link to bring them back.`;
      if (els.leaveNoticeInviteLink) {
        els.leaveNoticeInviteLink.textContent = state.online.inviteUrl
          ? `Invite link: ${state.online.inviteUrl}`
          : "Invite link unavailable.";
      }
      if (els.leaveNoticeShareLinks) els.leaveNoticeShareLinks.classList.toggle("hidden", !state.online.inviteUrl);
      els.leaveNoticeModal.classList.remove("hidden");
    }

    function hideLeaveNotice() {
      const notice = state.settings.leaveNotice;
      if (notice && notice.id) {
        window.localStorage.setItem(leaveNoticeKey(notice.id), "hidden");
      }
      els.leaveNoticeModal.classList.add("hidden");
    }

    async function takeAvailableSeat(seat) {
      if (localSeat() !== SPECTATOR || (seat !== "one" && seat !== "two") || state.online.seats[seat]) return;
      const spectatorClaim = readSeatClaim();
      if (spectatorClaim && spectatorClaim.secret && state.online.spectators) {
        delete state.online.spectators[spectatorClaim.secret];
      }
      await claimOnlineSeat(seat);
      if (localSeat() !== SPECTATOR) {
        els.lobbyNameInput.value = "";
        els.leaveNoticeModal.classList.add("hidden");
        setScreen("setup");
        updateOnlineUi();
      }
    }

    function returnToLobbyFromLeaveNotice() {
      hideLeaveNotice();
      state.active = false;
      setScreen("lobby");
      render();
      publishState();
    }

    function renderLobby() {
      const local = localSeat();
      const rows = ["one", "two"].map((seat) => {
        const label = seat === "one" ? "Player One" : "Player Two";
        const you = seat === local ? " (You)" : "";
        const name = state.online.playerNames[seat] ? escapeHtml(state.online.playerNames[seat]) : "Waiting";
        const role = state.online.roleChoices[seat] ? state.online.roleChoices[seat].toUpperCase() : "No role";
        const ready = state.online.ready && state.online.ready[seat] ? "Ready" : "Not ready";
        return `<div class="player-row ${seat === local ? "you" : ""}"><span>${label}${you}: ${name}</span><strong>${role} · ${ready}</strong></div>`;
      });
      const spectatorNames = Object.values(state.online.spectators || {}).filter(Boolean);
      if (spectatorNames.length) {
        rows.push(`<div class="player-row"><span>Spectators: ${spectatorNames.map(escapeHtml).join(", ")}</span><strong>Watching</strong></div>`);
      }
      els.lobbyPlayerList.innerHTML = rows.join("");

      const seat = localSeat();
      const bothNamed = Boolean(state.online.playerNames.one && state.online.playerNames.two);
      const isPlayerSeat = seat === "one" || seat === "two";
      const ownRole = isPlayerSeat ? state.online.roleChoices[seat] : null;
      const bothRoles = Boolean(state.online.roleChoices.one && state.online.roleChoices.two);
      const roleConflict = bothRoles && state.online.roleChoices.one === state.online.roleChoices.two;
      const ownCanReady = isPlayerSeat && Boolean(state.online.playerNames[seat]) && Boolean(ownRole) && !roleConflict;
      const ownReady = isPlayerSeat && Boolean(state.online.ready && state.online.ready[seat]);
      if (els.lobbyReadyBtn) {
        els.lobbyReadyBtn.classList.toggle("hidden", !isPlayerSeat);
        els.lobbyReadyBtn.disabled = !ownCanReady;
        els.lobbyReadyBtn.textContent = ownReady ? "Ready ✓" : "Ready Up";
      }
      els.roleModal.classList.add("hidden");
      if (roleConflict && isPlayerSeat) {
        els.setupRoomStatus.textContent = "Both players chose the same role. Choose again.";
      }

      const bothReady = Boolean(state.online.ready && state.online.ready.one && state.online.ready.two);
      if (state.online.room && bothNamed && bothRoles && !roleConflict && bothReady && state.screen === "setup") {
        applyOnlineRoles();
        setScreen("select");
        publishState();
      }
    }

    function applyOnlineRoles() {
      state.roles.one = state.online.roleChoices.one;
      state.roles.two = state.online.roleChoices.two;
      const oneName = state.online.playerNames.one;
      const twoName = state.online.playerNames.two;
      state.names = {
        dom: state.roles.one === DOM ? oneName : twoName,
        sub: state.roles.one === SUB ? oneName : twoName
      };
      els.playerSummary.textContent = `${state.names.dom} is the dom. ${state.names.sub} is the sub.`;
    }

    function confirmLobbyName() {
      const seat = localSeat();
      const name = els.lobbyNameInput.value.trim();
      if (!seat) {
        els.onlineStatus.textContent = "Join or host a room first.";
        if (els.setupRoomStatus) els.setupRoomStatus.textContent = "Join or host a room first.";
        return;
      }
      if (seat === SPECTATOR) {
        if (!name) {
          els.onlineStatus.textContent = "Choose a name first.";
          if (els.setupRoomStatus) els.setupRoomStatus.textContent = "Choose a name first.";
          return;
        }
        const claim = readSeatClaim();
        if (!claim || !claim.secret) {
          els.onlineStatus.textContent = "Rejoin the room to claim a spectator name.";
          if (els.setupRoomStatus) els.setupRoomStatus.textContent = "Rejoin the room to claim a spectator name.";
          return;
        }
        state.online.spectators = {
          ...(state.online.spectators || {}),
          [claim.secret]: name
        };
        els.onlineStatus.textContent = `Room ${state.online.room}. You are Spectator.`;
        renderLobby();
        publishOnlineLobbyChange((lobby) => {
          lobby.spectators[claim.secret] = name;
        });
        return;
      }
      if (!name) {
        els.onlineStatus.textContent = "Pick a name first.";
        if (els.setupRoomStatus) els.setupRoomStatus.textContent = "Pick a name first.";
        return;
      }
      if (!state.online.room) {
        els.onlineStatus.textContent = "Host a game first, or open an invite link.";
        if (els.setupRoomStatus) els.setupRoomStatus.textContent = "Host a game first, or open an invite link.";
        return;
      }
      state.online.playerNames[seat] = name;
      state.online.seats[seat] = true;
      state.online.ready = { ...(state.online.ready || { one: false, two: false }), [seat]: false };
      const claim = readSeatClaim();
      if (claim && state.online.seatSecrets && !state.online.seatSecrets[seat]) {
        state.online.seatSecrets[seat] = claim.secret;
      }
      updateOnlineUi();
      publishOnlineLobbyChange((lobby) => {
        lobby.playerNames[seat] = name;
        lobby.seats[seat] = true;
        lobby.ready[seat] = false;
        if (claim && claim.secret && !lobby.seatSecrets[seat]) lobby.seatSecrets[seat] = claim.secret;
      });
    }

    function chooseOnlineRole(role) {
      const seat = localSeat();
      if (!seat || seat === SPECTATOR) return;
      state.online.roleChoices[seat] = role;
      state.online.ready = { ...(state.online.ready || { one: false, two: false }), [seat]: false };
      renderRoles();
      renderLobby();
      renderSetupSettings();
      publishOnlineLobbyChange((lobby) => {
        lobby.roleChoices[seat] = role;
        lobby.ready[seat] = false;
      });
    }

    function toggleLobbyReady() {
      const seat = localSeat();
      if (seat !== "one" && seat !== "two") return;
      const hasName = Boolean(state.online.playerNames[seat]);
      const hasRole = Boolean(state.online.roleChoices[seat]);
      const roleConflict = state.online.roleChoices.one && state.online.roleChoices.two && state.online.roleChoices.one === state.online.roleChoices.two;
      if (!hasName || !hasRole || roleConflict) return;
      const ready = !(state.online.ready && state.online.ready[seat]);
      state.online.ready = { ...(state.online.ready || { one: false, two: false }), [seat]: ready };
      renderLobby();
      publishOnlineLobbyChange((lobby) => {
        lobby.ready[seat] = ready;
      });
    }

    function openTributeFour() {
      if (state.screen === "select" && localOnlineRole() && localOnlineRole() !== DOM) return;
      state.pendingWager = null;
      state.currentGame = "tributeFour";
      setScreen("game");
      resetLossPressure();
      resetTributeFourBoard();
      applyDefaultBet();
      els.log.innerHTML = "";
      addLog(`<strong>${state.names.dom}</strong> controls the bank. <strong>${state.names.sub}</strong> makes the first normal bet.`);
      if (startThroneRoundOnOpen()) return;
      render();
      publishState();
    }

    function openTributeFleet() {
      if (state.screen === "select" && localOnlineRole() && localOnlineRole() !== DOM) return;
      state.pendingWager = null;
      state.currentGame = "tributeFleet";
      setScreen("game");
      resetLossPressure();
      resetTributeFleetBoard();
      applyDefaultBet();
      els.log.innerHTML = "";
      addLog(`<strong>${state.names.dom}</strong> controls the bank. <strong>${state.names.sub}</strong> makes the first fleet bet.`);
      if (startThroneRoundOnOpen()) return;
      render();
      publishState();
    }

    function openTributeTwentyOne() {
      if (state.screen === "select" && localOnlineRole() && localOnlineRole() !== DOM) return;
      state.pendingWager = null;
      state.currentGame = "tributeTwentyOne";
      setScreen("game");
      resetLossPressure();
      resetTributeTwentyOneBoard();
      applyDefaultBet();
      els.log.innerHTML = "";
      addLog(`<strong>${state.names.dom}</strong> holds the table. <strong>${state.names.sub}</strong> buys into the first hand.`);
      if (startThroneRoundOnOpen()) return;
      render();
      publishState();
    }

    function openHigherLower() {
      if (state.screen === "select" && localOnlineRole() && localOnlineRole() !== DOM) return;
      state.pendingWager = null;
      state.currentGame = "higherLower";
      setScreen("game");
      resetLossPressure();
      resetHigherLowerBoard();
      applyDefaultBet();
      els.log.innerHTML = "";
      addLog(`<strong>Higher / Lower opened.</strong> ${state.names.dom} sets the cash-out streak, then ${state.names.sub} has to survive the card calls.`);
      render();
      publishState();
    }

    function openTributeCrazyEights() {
      if (state.screen === "select" && localOnlineRole() && localOnlineRole() !== DOM) return;
      state.pendingWager = null;
      state.currentGame = "tributeCrazyEights";
      setScreen("game");
      resetLossPressure();
      resetCrazyEightsBoard();
      applyDefaultBet();
      els.log.innerHTML = "";
      addLog(`<strong>Tribute 8s opened.</strong> ${state.names.sub} buys in, then both players race to empty their hand.`);
      if (startThroneRoundOnOpen()) return;
      render();
      publishState();
    }

    function openDoubleSolitaire() {
      if (state.screen === "select" && localOnlineRole() && localOnlineRole() !== DOM) return;
      state.pendingWager = null;
      state.currentGame = "doubleSolitaire";
      setScreen("game");
      resetLossPressure();
      resetDoubleSolitaireBoard();
      applyDefaultBet();
      els.log.innerHTML = "";
      addLog(`<strong>Solitaire Duel opened.</strong> ${state.names.sub} buys in, then both players race their own Klondike board.`);
      if (startThroneRoundOnOpen()) return;
      render();
      publishState();
    }

    function openTributeTicTacToe() {
      if (state.screen === "select" && localOnlineRole() && localOnlineRole() !== DOM) return;
      state.pendingWager = null;
      state.currentGame = "tributeTicTacToe";
      setScreen("game");
      resetLossPressure();
      resetTributeTicTacToeBoard();
      applyDefaultBet();
      els.log.innerHTML = "";
      addLog(`<strong>${state.names.dom}</strong> marks O. <strong>${state.names.sub}</strong> marks X.`);
      render();
      publishState();
    }

    function openWheelSpin() {
      if (state.screen === "select" && localOnlineRole() && localOnlineRole() !== DOM) return;
      state.pendingWager = null;
      state.currentGame = "wheelSpin";
      setScreen("game");
      resetLossPressure();
      resetWheelSpinBoard();
      els.log.innerHTML = "";
      addLog(isThroneSession()
        ? `<strong>Throne Wheel opened.</strong> ${state.names.dom} has 5 spins per hour. Cash spaces open ${state.names.sub}'s Throne page for that amount, + free spin keeps the count, and blanks do nothing.`
        : `<strong>Wheel Spin opened.</strong> ${state.names.sub} can spin after ${state.names.dom} unlocks the wheel. Cash spaces pay ${state.names.dom}'s bank, minus spaces drain it, and blanks spare the spin.`);
      render();
      publishState();
    }

    function openObedienceOrders() {
      if (state.screen === "select" && localOnlineRole() && localOnlineRole() !== DOM) return;
      state.pendingWager = null;
      state.currentGame = "obedienceOrders";
      setScreen("game");
      resetLossPressure();
      resetObedienceOrdersBoard();
      els.log.innerHTML = "";
      addLog(`<strong>Obedience Orders opened.</strong> ${state.names.dom} leads the duel. ${state.names.sub} survives by repeating her command tiles.`);
      render();
      publishState();
    }

    function openTributeReversi() {
      if (state.screen === "select" && localOnlineRole() && localOnlineRole() !== DOM) return;
      state.pendingWager = null;
      state.currentGame = "tributeReversi";
      setScreen("game");
      resetLossPressure();
      resetTributeReversiBoard();
      applyDefaultBet();
      els.log.innerHTML = "";
      addLog(`<strong>Reversi opened.</strong> The lobby starting-player setting decides who plays dark and moves first.`);
      if (startThroneRoundOnOpen()) return;
      render();
      publishState();
    }

    function openTributeTrail() {
      if (state.screen === "select" && localOnlineRole() && localOnlineRole() !== DOM) return;
      state.pendingWager = null;
      state.currentGame = "tributeTrail";
      setScreen("game");
      resetLossPressure();
      resetTributeTrailBoard();
      els.log.innerHTML = "";
      addLog(`<strong>Tribute Trail opened.</strong> ${state.names.dom} chooses the Trail Tribute transfer before the first roll.`);
      render();
      publishState();
    }

    function openTributeChess() {
      if (state.screen === "select" && localOnlineRole() && localOnlineRole() !== DOM) return;
      state.pendingWager = null;
      state.currentGame = "tributeChess";
      setScreen("game");
      resetLossPressure();
      resetTributeChessBoard();
      applyDefaultBet();
      els.log.innerHTML = "";
      addLog(`<strong>${state.names.dom}</strong> claims the board. <strong>${state.names.sub}</strong> buys into the first game.`);
      if (startThroneRoundOnOpen()) return;
      render();
      publishState();
    }

    function openTributeCheckers() {
      if (state.screen === "select" && localOnlineRole() && localOnlineRole() !== DOM) return;
      state.pendingWager = null;
      state.currentGame = "tributeCheckers";
      setScreen("game");
      resetLossPressure();
      resetTributeCheckersBoard();
      applyDefaultBet();
      els.log.innerHTML = "";
      addLog(`<strong>${state.names.dom}</strong> claims the dark squares. <strong>${state.names.sub}</strong> buys into the first checkers game.`);
      if (startThroneRoundOnOpen()) return;
      render();
      publishState();
    }

    function openSolitaire() {
      state.currentGame = "solitaire";
      dealSolitaire();
      setScreen("solitaire");
      renderSolitaire();
    }

    function openMemoryMatch() {
      state.currentGame = "memoryMatch";
      setScreen("memoryMatch");
      startMemoryMatch({ newImages: true });
    }

    function openBrainDrainSnap() {
      state.currentGame = "brainDrainSnap";
      setScreen("brainDrainSnap");
      startBrainDrainSnap();
    }

    function backToMenuFromSolo() {
      stopBrainDrainSnapTimer();
      setScreen("select");
      renderMenu();
    }

    function backToMenu() {
      const role = localOnlineRole();
      if (state.online.room && role !== DOM) return;
      state.active = false;
      state.pendingWager = null;
      state.pot = 0;
      setScreen("select");
      render();
      publishState();
    }

    function testingGamesUnlocked() {
      if (!state.online.room) return true;
      const names = [
        state.online.playerNames.one,
        state.online.playerNames.two,
        ...Object.values(state.online.spectators || {})
      ];
      return names.some((name) => String(name || "").trim().toLowerCase() === "testing");
    }

    function renderMenuRules() {
      if (!els.menuRulesTitle) return;
      if (isThroneSession()) {
        els.menuRulesTitle.textContent = "Throne Rules";
        els.menuRulesPrimaryTitle.textContent = "Throne Amount";
        els.menuRulesPrimaryText.textContent = `The Throne amount is set here on Game Select and stays at ${money(currentThroneAmount())} until ${state.names.dom || "the dom"} changes it. Games no longer ask for a bet amount in Throne mode.`;
        els.menuRulesSecondaryTitle.textContent = "Throne Losses";
        els.menuRulesSecondaryText.textContent = `If ${state.names.sub || "the sub"} loses a Throne game, Tribute Arcade opens the saved Throne page with the nearest $5 tribute amount already attached.`;
        els.menuRulesTertiaryText.textContent = "Throne mode requires the sub to play on a PC browser with the Throne helper extension installed. Mobile browsers cannot run the helper.";
        els.menuRulesFinalText.textContent = state.settings.throneReclaimPerks
          ? "Reclaim win perks are enabled for the dom in Throne games, but the game still stays in Throne mode instead of starting bank reclaim matches. After a loss, the sub returns to the game and clicks the kiss splash to reset the table."
          : "Reclaim matches are hidden in Throne mode. The dom can optionally enable reclaim win perks from the Game Select toggle. After a loss, the sub returns to the game and clicks the kiss splash to reset the table.";
        return;
      }
      els.menuRulesTitle.textContent = "Bet Rules";
      els.menuRulesPrimaryTitle.textContent = "Standard Bets";
      els.menuRulesPrimaryText.textContent = "The submissive player must place a bet to start a game. If the submissive player wins, the dominant player's bank remains unchanged. If the submissive player loses, the bet amount is added to the total debt owed to the dominant player once all games are complete.";
      els.menuRulesSecondaryTitle.textContent = "Reclaims";
      els.menuRulesSecondaryText.textContent = "Reclaims are high-risk bets that allow the submissive player to recover outstanding debt owed to the dominant player. However, reclaim rounds heavily favor the dominant player and are significantly harder to win.";
      els.menuRulesTertiaryText.textContent = "Each failed reclaim further increases the dominant player's advantage in future reclaim rounds, causing the odds to become progressively more difficult for the submissive player.";
      els.menuRulesFinalText.textContent = "If the submissive player loses a reclaim round, the total amount owed to the dominant player is doubled.";
    }

    function renderMenu() {
      els.menuBankLabel.textContent = `${state.names.dom}'s bank`;
      els.menuDomBank.textContent = money(state.domVault);
      updateOnlineUi();
      const localRole = localOnlineRole();
      const domPickBlocked = Boolean(state.online.room && localRole && localRole !== DOM);
      els.tributeFourCard.disabled = domPickBlocked;
      els.tributeFleetCard.disabled = domPickBlocked;
      els.tributeTwentyOneCard.disabled = domPickBlocked;
      if (els.higherLowerCard) els.higherLowerCard.disabled = domPickBlocked;
      if (els.memoryMatchCard) els.memoryMatchCard.disabled = false;
      if (els.tributeCrazyEightsCard) els.tributeCrazyEightsCard.disabled = domPickBlocked;
      if (els.doubleSolitaireCard) els.doubleSolitaireCard.disabled = domPickBlocked;
      els.tributeTicTacToeCard.disabled = domPickBlocked;
      els.tributeWheelCard.disabled = domPickBlocked;
      if (els.obedienceOrdersCard) els.obedienceOrdersCard.disabled = domPickBlocked;
      els.tributeTrailCard.disabled = domPickBlocked;
      els.tributeCheckersCard.disabled = domPickBlocked;
      if (els.tributeReversiCard) els.tributeReversiCard.disabled = domPickBlocked;
      els.tributeChessCard.disabled = domPickBlocked;
      els.chooserStatus.textContent = domPickBlocked
        ? `${state.names.dom} picks the next game.`
        : `${state.names.dom || "Dom"} picks the next game.`;
      if (els.throneExtensionDownloadLink) {
        const localRole = localOnlineRole();
        const showDownload = isThroneSession()
          && (!state.online.room || localRole === SUB)
          && !throneExtensionInstalledForLocalSub();
        els.throneExtensionDownloadLink.classList.toggle("hidden", !showDownload);
      }
      if (els.throneAmountControl) {
        const showAmount = isThroneSession();
        els.throneAmountControl.classList.toggle("hidden", !showAmount);
        els.throneAmountControl.classList.toggle("read-only", showAmount && !sessionModeControlsAllowed());
      }
      if (els.throneAmountInput) {
        els.throneAmountInput.value = currentThroneAmount();
        els.throneAmountInput.disabled = !sessionModeControlsAllowed();
      }
      if (els.throneReclaimPerksToggle) {
        const showToggle = isThroneSession() && sessionModeControlsAllowed();
        els.throneReclaimPerksToggle.classList.toggle("hidden", !showToggle);
      }
      if (els.throneReclaimPerksInput) {
        els.throneReclaimPerksInput.checked = Boolean(state.settings.throneReclaimPerks);
        els.throneReclaimPerksInput.disabled = !sessionModeControlsAllowed();
      }
      renderMenuRules();
      renderSettings();
      renderGameSelectTabs();
      renderControlGlow();
      maybePromptSessionMode();
    }

    function renderGameSelectTabs() {
      const tabAliases = {
        main: "board",
        mini: "cards",
        table: "board",
        casino: "cards",
        testing: "wip",
        misc: "wip",
        control: "chance"
      };
      const requestedTab = tabAliases[state.settings.activeGameTab] || state.settings.activeGameTab;
      const soloGameIds = ["solitaire", "memoryMatch"];
      const soloMenuOpen = state.screen === "select" && soloGameIds.includes(state.currentGame);
      const allowedTabs = soloMenuOpen
        ? ["solo"]
        : ["board", "cards", "chance", "wip", "all"];
      const tab = allowedTabs.includes(requestedTab) ? requestedTab : allowedTabs[0];
      state.settings.activeGameTab = tab;
      els.gameSelectTabs.forEach((button) => {
        button.classList.toggle("hidden", soloMenuOpen || button.dataset.gameTab === "solo");
        button.classList.toggle("active", !soloMenuOpen && button.dataset.gameTab === tab);
      });
      updateRedditeryAutoPopupStatus();
      els.mainGamesGrid.classList.remove("hidden");
      els.miniGamesGrid.classList.add("hidden");
      els.testingGamesGrid.classList.add("hidden");
      const showHiddenGames = testingGamesUnlocked();
      document.querySelectorAll(".game-card[data-game-categories]").forEach((card) => {
        if (card.dataset.gameHidden === "true" && !showHiddenGames) {
          card.classList.add("hidden");
          return;
        }
        const categories = (card.dataset.gameCategories || "").split(/\s+/);
        card.classList.toggle("hidden", !categories.includes(tab));
      });
    }

    function pipPositions(count) {
      const x1 = 330;
      const x2 = 670;
      const cx = 500;
      const rows = [270, 430, 590, 750, 910];
      if (count === 1) return [{ x: cx, y: 590 }];
      if (count === 2) return [{ x: cx, y: 300 }, { x: cx, y: 880 }];
      if (count === 3) return [{ x: cx, y: 280 }, { x: cx, y: 590 }, { x: cx, y: 900 }];
      if (count === 4) return [{ x: x1, y: 310 }, { x: x2, y: 310 }, { x: x1, y: 870 }, { x: x2, y: 870 }];
      if (count === 5) return [{ x: x1, y: 300 }, { x: x2, y: 300 }, { x: cx, y: 590 }, { x: x1, y: 880 }, { x: x2, y: 880 }];
      if (count === 6) return [{ x: x1, y: 280 }, { x: x2, y: 280 }, { x: x1, y: 590 }, { x: x2, y: 590 }, { x: x1, y: 900 }, { x: x2, y: 900 }];
      if (count === 7) return [{ x: x1, y: 260 }, { x: x2, y: 260 }, { x: cx, y: 430 }, { x: x1, y: 590 }, { x: x2, y: 590 }, { x: x1, y: 900 }, { x: x2, y: 900 }];
      if (count === 8) return [{ x: x1, y: 250 }, { x: x2, y: 250 }, { x: cx, y: 405 }, { x: x1, y: 560 }, { x: x2, y: 560 }, { x: cx, y: 715 }, { x: x1, y: 900 }, { x: x2, y: 900 }];
      if (count === 9) return [{ x: x1, y: 250 }, { x: x2, y: 250 }, { x: x1, y: 430 }, { x: x2, y: 430 }, { x: cx, y: 590 }, { x: x1, y: 750 }, { x: x2, y: 750 }, { x: x1, y: 930 }, { x: x2, y: 930 }];
      return [{ x: x1, y: 240 }, { x: x2, y: 240 }, { x: cx, y: 360 }, { x: x1, y: 480 }, { x: x2, y: 480 }, { x: x1, y: 700 }, { x: x2, y: 700 }, { x: cx, y: 820 }, { x: x1, y: 940 }, { x: x2, y: 940 }];
    }

    function roundRectPath(ctx, x, y, width, height, radius) {
      const r = Math.min(radius, width / 2, height / 2);
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + width - r, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + r);
      ctx.lineTo(x + width, y + height - r);
      ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
      ctx.lineTo(x + r, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    }

    function renderControlGlow() {
      const controller = state.screen === "game"
        ? (state.active ? state.turn : SUB)
        : DOM;
      const brattyThemeActive = Boolean(activeNameEasterEgg());
      document.body.classList.toggle("control-dom", controller === DOM);
      document.body.classList.toggle("control-sub", controller === SUB);
      document.body.classList.toggle("bratty-theme", brattyThemeActive);
      if (brattyThemeActive) {
        document.body.style.setProperty("--bratty-avatar-image", `url("${BRATTY_THEME_ASSETS.avatar}")`);
      } else {
        document.body.style.removeProperty("--bratty-avatar-image");
      }
    }

    function sideSettingsAllowed() {
      const role = localOnlineRole();
      return !state.online.room || !role || role === DOM || role === SUB;
    }

    function subSettingsControlsAllowed() {
      const role = localOnlineRole();
      return !state.online.room || !role || role === SUB;
    }

    function domTriggerControlsAllowed() {
      const role = localOnlineRole();
      return !state.online.room || role === DOM;
    }

    function subTriggerEffectsVisible() {
      const role = localOnlineRole();
      return !state.online.room || !role || role === SUB;
    }

    function domTriggerDefinition(type) {
      const domName = state.names.dom || "Dom";
      const subName = state.names.sub || "sub";
      const map = {
        distract: { tone: "distract", title: "Distract", text: `${domName} wants your eyes off balance.`, duration: 6500 },
        praise: { tone: "praise", title: "Good Sub", text: `${domName} approves. Keep earning it.`, duration: 5200 },
        humiliate: { tone: "humiliate", title: "Pathetic Focus", text: `Try not to fold for ${domName}.`, duration: 5600 },
        freeze: { tone: "freeze", title: "Freeze", text: `${subName}, stop and wait for her signal.`, duration: 6500 },
        focus: { tone: "focus", title: "Focus", text: `Eyes on the board. Move clean.`, duration: 5200 },
        timer: { tone: "timer", title: "Edge Timer", text: `${domName} put you on a timer.`, duration: 15000, timer: true }
      };
      return map[type] || map.focus;
    }

    function focusTaxPenalty() {
      if (isThroneSession()) return 5;
      return state.mode === "reclaim" ? 2 : 1;
    }

    function focusTaxMaxUses() {
      return state.mode === "reclaim" ? 3 : 2;
    }

    function focusTaxUses() {
      return Number((state.settings.focusTax && state.settings.focusTax.uses) || 0);
    }

    function focusTaxActive() {
      const tax = state.settings.focusTax;
      return Boolean(tax && tax.active && Number(tax.expiresAt || 0) > Date.now());
    }

    function setToggleButtonState(button, active) {
      if (!button) return;
      button.classList.toggle("active", Boolean(active));
      button.setAttribute("aria-pressed", active ? "true" : "false");
    }

    function toggleButtonActive(button) {
      return Boolean(button && button.getAttribute("aria-pressed") === "true");
    }

    function togglePressureSetting(key, button) {
      const next = !Boolean(state.settings[key]);
      setToggleButtonState(button, next);
      updateSettings({ [key]: next });
    }

    function renderSettings() {
      const role = localOnlineRole();
      const showDomSettings = !state.online.room || !role || role === DOM;
      const showSubSettings = !state.online.room || !role || role === SUB;
      if (els.domSettingsPane) els.domSettingsPane.classList.toggle("hidden", !showDomSettings);
      if (els.subSettingsPane) els.subSettingsPane.classList.toggle("hidden", !showSubSettings);
      if (els.domAdvantageMode) els.domAdvantageMode.value = state.settings.domAdvantageMode;
      setToggleButtonState(els.domSeePressureBanners, state.settings.domSeePressureBanners);
      setToggleButtonState(els.domSeePressureText, state.settings.domSeePressureText);
      setToggleButtonState(els.domSeePressurePulse, state.settings.domSeePressurePulse);
      if (els.domSubBetControl) els.domSubBetControl.value = state.settings.subBetControl === "locked" ? "locked" : "editable";
      if (els.subDefaultBetInput) els.subDefaultBetInput.value = state.settings.subDefaultBet;
      if (els.subLinkWarningMode) els.subLinkWarningMode.value = state.settings.subLinkWarningMode || "auto";
      if (els.sendDomLinkBtn) els.sendDomLinkBtn.disabled = !domLinkControlsAllowed();
      const showQueenSettings = state.currentGame === "tributeChess";
      if (els.queenPowerModeRow) els.queenPowerModeRow.classList.toggle("hidden", !showQueenSettings);
      if (els.queenPowerUsersRow) els.queenPowerUsersRow.classList.toggle("hidden", !showQueenSettings);
      if (els.queenPowerMode) els.queenPowerMode.value = state.settings.queenPowerMode;
      if (els.queenPowerUsers) els.queenPowerUsers.value = state.settings.queenPowerUsers;
      renderSetupSettings();
      renderDomTriggerPanel();
    }

    function renderDomTriggerPanel() {
      if (!els.domTriggerPanel) return;
      const canUse = domTriggerControlsAllowed();
      const activeTax = focusTaxActive();
      const uses = focusTaxUses();
      const maxUses = focusTaxMaxUses();
      const canTax = canUse && state.screen === "game" && state.active && state.turn === SUB && !activeTax && uses < maxUses;
      els.domTriggerPanel.querySelectorAll("[data-dom-trigger]").forEach((button) => {
        const action = button.dataset.domTrigger;
        button.disabled = !canUse || (action === "focus-tax" && !canTax);
      });
      if (els.domTriggerStatus) {
        if (!canUse) {
          els.domTriggerStatus.textContent = "Only the dom can use triggers.";
        } else if (activeTax) {
          const seconds = Math.max(0, Math.ceil((Number(state.settings.focusTax.expiresAt || 0) - Date.now()) / 1000));
          els.domTriggerStatus.textContent = `Focus Tax active: ${seconds}s left.`;
        } else {
          els.domTriggerStatus.textContent = `Focus Tax ${uses}/${maxUses} used. Trigger a sub-side flash any time.`;
        }
      }
    }

    function triggerDomEffect(type) {
      if (!domTriggerControlsAllowed()) return;
      if (type === "focus-tax") {
        startFocusTax();
        return;
      }
      const def = domTriggerDefinition(type);
      state.settings.domTriggerEffect = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        type,
        tone: def.tone,
        title: def.title,
        text: def.text,
        timer: Boolean(def.timer),
        createdAt: Date.now(),
        until: Date.now() + def.duration
      };
      addLog(`<strong>${state.names.dom || "Dom"} triggers ${escapeHtml(def.title)}.</strong>`);
      render();
      publishState();
    }

    function startFocusTax() {
      if (!domTriggerControlsAllowed()) return;
      if (state.screen !== "game" || !state.active || state.turn !== SUB || focusTaxActive()) return;
      const uses = focusTaxUses();
      const maxUses = focusTaxMaxUses();
      if (uses >= maxUses) return;
      const penalty = focusTaxPenalty();
      state.settings.focusTax = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        active: true,
        uses: uses + 1,
        expiresAt: Date.now() + 10000,
        penalty,
        mode: state.mode,
        game: state.currentGame,
        createdAt: Date.now()
      };
      state.settings.domTriggerEffect = {
        id: state.settings.focusTax.id,
        type: "focus-tax",
        tone: "tax",
        title: "Focus Tax",
        text: `${state.names.sub || "Sub"} has 10 seconds to act.`,
        timer: true,
        createdAt: Date.now(),
        until: state.settings.focusTax.expiresAt
      };
      addLog(`<strong>Focus Tax armed.</strong> ${state.names.sub || "Sub"} has 10 seconds to make a move.`);
      render();
      publishState();
    }

    function resolveFocusTaxSuccess() {
      const tax = state.settings.focusTax;
      if (!tax || !tax.active) return;
      state.settings.focusTax = { ...tax, active: false, resolvedAt: Date.now(), result: "cleared" };
      state.settings.domTriggerEffect = {
        id: `${tax.id}-cleared`,
        type: "focus-tax-clear",
        tone: "focus",
        title: "Tax Cleared",
        text: `${state.names.sub || "Sub"} moved in time.`,
        timer: false,
        createdAt: Date.now(),
        until: Date.now() + 2800
      };
    }

    function createLossPressureState() {
      return {
        count: 0,
        captureBanner: null,
        capturePulse: null,
        captureMessage: null,
        recentCaptureBanners: [],
        recentCaptureMessages: []
      };
    }

    function skipSubTurnForFocusTax() {
      if (!state.active || state.turn !== SUB) return false;
      if (state.currentGame === "tributeTrail") {
        passTrailTurn(DOM);
        return true;
      }
      if (state.currentGame === "tributeCheckers") {
        passCheckersTurn();
        return true;
      }
      if (state.currentGame === "obedienceOrders" && state.obedience) {
        state.obedience.phase = "building";
        state.obedience.input = [];
        state.obedience.revealedIndex = null;
        state.obedience.message = `${state.names.sub || "Sub"} lost focus. ${state.names.dom || "Dom"} takes control.`;
        state.active = false;
        state.turn = DOM;
        return true;
      }
      if (state.currentGame === "tributeTwentyOne" && state.twentyOne) {
        state.twentyOne.stood = true;
        state.turn = DOM;
        state.twentyOne.dealerTurn = true;
        return true;
      }
      if (state.currentGame === "tributeChess") {
        setChessFenTurn(colorForChessRole(DOM));
        state.turn = DOM;
        state.chess.selected = null;
        state.chess.legalMoves = [];
        state.chess.postDomPowerWindow = false;
        return true;
      }
      state.turn = DOM;
      return true;
    }

    function resolveFocusTaxTimeout() {
      const tax = state.settings.focusTax;
      if (!tax || !tax.active || Number(tax.expiresAt || 0) > Date.now()) return false;
      if (state.online.room && localOnlineRole() !== DOM) return false;
      const penalty = Number(tax.penalty || focusTaxPenalty());
      let throneSkip = false;
      if (isThroneSession()) {
        throneSkip = skipSubTurnForFocusTax();
        addLog(`<strong>Focus Tax failed.</strong> ${state.names.sub || "Sub"} timed out; ${throneSkip ? `${state.names.dom || "Dom"} takes the turn.` : "no Throne amount was added."}`);
      } else {
        const before = state.domVault;
        state.domVault += penalty;
        state.lockedTribute = state.domVault;
        recordLedgerEvent({
          type: "tribute",
          label: "Focus Tax",
          detail: `${state.names.sub || "Sub"} timed out under ${state.names.dom || "the dom"}'s Focus Tax.`,
          delta: state.domVault - before,
          before,
          after: state.domVault
        });
        addLog(`<strong>Focus Tax collected.</strong> ${money(penalty)} added to ${state.names.dom || "the dom"}'s bank.`);
      }
      state.settings.focusTax = { ...tax, active: false, resolvedAt: Date.now(), result: "taxed" };
      state.settings.domTriggerEffect = {
        id: `${tax.id}-taxed`,
        type: "focus-tax-taxed",
        tone: "tax",
        title: isThroneSession() ? "Turn Skipped" : "Focus Tax Collected",
        text: isThroneSession()
          ? `${state.names.dom || "Dom"} takes control.`
          : `${state.names.dom || "Dom"} collects +${money(penalty)}.`,
        timer: false,
        createdAt: Date.now(),
        until: Date.now() + 3600
      };
      render();
      publishState();
      return true;
    }

    function renderDomTriggerOverlay() {
      if (!els.domTriggerOverlay) return;
      const effect = state.settings.domTriggerEffect;
      const show = Boolean(effect && Number(effect.until || 0) > Date.now() && subTriggerEffectsVisible());
      els.domTriggerOverlay.classList.toggle("hidden", !show);
      document.body.classList.toggle("trigger-distracted", show && (effect.tone === "distract" || effect.tone === "tax"));
      if (!show) return;
      els.domTriggerCard.className = `dom-trigger-card ${effect.tone || "focus"}`;
      els.domTriggerKicker.textContent = effect.type === "focus-tax" ? "Focus Tax" : "Dom Trigger";
      els.domTriggerTitle.textContent = effect.title || "Focus";
      els.domTriggerText.textContent = effect.text || "";
      if (effect.timer) {
        const seconds = Math.max(0, Math.ceil((Number(effect.until || 0) - Date.now()) / 1000));
        els.domTriggerTimer.textContent = seconds;
        els.domTriggerTimer.classList.remove("hidden");
      } else {
        els.domTriggerTimer.classList.add("hidden");
      }
    }

    function updateSettings(changes) {
      const nextChanges = { ...(changes || {}) };
      const amountChanged = Object.prototype.hasOwnProperty.call(nextChanges, "throneAmount")
        && normalizeBuyIn(Number(nextChanges.throneAmount || 5)) !== currentThroneAmount();
      const modeChanged = Object.prototype.hasOwnProperty.call(nextChanges, "sessionMode")
        && (nextChanges.sessionMode === "bank" ? "bank" : "throne") !== sessionMode();
      const urlChanged = Object.prototype.hasOwnProperty.call(nextChanges, "throneUrl")
        && String(nextChanges.throneUrl || "") !== String(state.settings.throneUrl || "");
      if ((amountChanged || modeChanged || urlChanged) && !Object.prototype.hasOwnProperty.call(nextChanges, "throneAmountConfirmed")) {
        nextChanges.throneAmountConfirmed = false;
      }
      state.settings = {
        ...state.settings,
        ...nextChanges
      };
      state.settings.subDefaultBet = normalizeBuyIn(Number(state.settings.subDefaultBet));
      state.settings.throneAmount = normalizeBuyIn(Number(state.settings.throneAmount || 5));
      state.settings.subBetControl = state.settings.subBetControl === "locked" ? "locked" : "editable";
      state.settings.subLinkWarningMode = state.settings.subLinkWarningMode === "warn" ? "warn" : "auto";
      state.settings.distractionPopupPlacement = "random";
      state.settings.sessionMode = state.settings.sessionMode === "bank" ? "bank" : "throne";
      state.settings.startingPlayerMode = state.settings.startingPlayerMode === DOM || state.settings.startingPlayerMode === SUB ? state.settings.startingPlayerMode : "random";
      state.settings.domAdvantageMode = state.settings.domAdvantageMode === "both" ? "both" : (state.settings.domAdvantageMode === "off" ? "off" : "dom");
      state.settings.goonerGallerySource = "peekstr";
      state.settings.goonerGalleryCategory = GOONER_GALLERY_CATEGORIES[String(state.settings.goonerGalleryCategory || "").toLowerCase()]
        ? String(state.settings.goonerGalleryCategory || "").toLowerCase()
        : "captions";
      state.settings.goonerGallerySubreddits = normalizeRedditPageSelection(state.settings.goonerGallerySubreddits);
      state.settings.galleryPanelOpen = normalizeGalleryPanelOpen(state.settings.galleryPanelOpen);
      state.settings.redditeryAutoPopupSource = state.settings.redditeryAutoPopupSource === "reddit" ? "reddit" : "booru";
      state.settings.redditeryAutoPopupCategory = GOONER_GALLERY_CATEGORIES[String(state.settings.redditeryAutoPopupCategory || "").toLowerCase()]
        ? String(state.settings.redditeryAutoPopupCategory || "").toLowerCase()
        : "captions";
      state.settings.redditeryAutoPopupSubreddits = normalizeRedditPageSelection(state.settings.redditeryAutoPopupSubreddits);
      state.settings.redditeryRapidFire = Boolean(state.settings.redditeryRapidFire);
      state.settings.booruDateFilter = normalizeBooruDateFilter(state.settings.booruDateFilter);
      state.settings.booruAutoPopupFullVideos = Boolean(state.settings.booruAutoPopupFullVideos);
      state.settings.reclaimPowersAlways = Boolean(state.settings.reclaimPowersAlways);
      state.settings.throneAmountConfirmed = Boolean(state.settings.throneAmountConfirmed);
      state.settings.domSeePressureBanners = Boolean(state.settings.domSeePressureBanners);
      state.settings.domSeePressureText = Boolean(state.settings.domSeePressureText);
      state.settings.domSeePressurePulse = Boolean(state.settings.domSeePressurePulse);
      state.settings.pressureViewPromptSeen = Boolean(state.settings.pressureViewPromptSeen);
      if (!state.active) applyDefaultBet();
      renderSettings();
      renderGameSelectTabs();
      renderText();
      renderMenu();
      renderSidePanel();
      const bbGalleryPrefKeys = new Set([
        "goonerGalleryCategory",
        "goonerGallerySubreddits",
        "redditeryAutoPopupSource",
        "redditeryAutoPopupCategory",
        "redditeryAutoPopupSubreddits",
        "redditeryAutoPopupDuration",
        "redditeryAutoPopupInterval",
        "booruDateFilter",
        "booruAutoPopupFullVideos"
      ]);
      if (Object.keys(nextChanges).some((key) => bbGalleryPrefKeys.has(key))) saveBrattyLocalGalleryPrefs();
      publishSettingsState();
    }

    function normalizeDomLink(value) {
      const raw = String(value || "").trim();
      if (!raw) return "";
      const withProtocol = /^[a-z][a-z\d+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;
      try {
        const url = new URL(withProtocol);
        if (url.protocol !== "http:" && url.protocol !== "https:") return "";
        return url.toString();
      } catch (error) {
        return "";
      }
    }

    function roundThroneTributeAmount(amount) {
      const value = Number(amount || 0);
      if (!Number.isFinite(value)) return 5;
      return Math.max(5, Math.round(value / 5) * 5);
    }

    function throneUrlWithTributeAmount(url, amount) {
      const normalized = normalizeDomLink(url);
      if (!normalized) return "";
      try {
        const next = new URL(normalized);
        next.hash = `tribute=${roundThroneTributeAmount(amount)}`;
        return next.toString();
      } catch (error) {
        return normalized;
      }
    }

    function normalizeDistractionSource(value) {
      const raw = String(value || "").trim();
      if (!raw) return "";
      if (/^data:image\/(?:png|jpe?g|gif|webp|bmp);base64,/i.test(raw)) return raw;
      return normalizeDomLink(raw);
    }

    function isVideoDistractionSource(value) {
      return /^https?:\/\/.+\.(?:mp4|webm)(?:[?#].*)?$/i.test(String(value || ""));
    }

    function mediaTypeForDistraction(url, fallback = "") {
      if (fallback === "video" || isVideoDistractionSource(url)) return "video";
      return "image";
    }

    function currentDomLinkInputValue() {
      if (document.activeElement === els.sideDomLinkInput) return els.sideDomLinkInput.value;
      if (document.activeElement === els.domLinkUrlInput) return els.domLinkUrlInput.value;
      return (els.sideDomLinkInput && els.sideDomLinkInput.value) || (els.domLinkUrlInput && els.domLinkUrlInput.value) || "";
    }

    function setSideDomLinkStatus(message = "") {
      if (!els.sideDomLinkStatus) return;
      els.sideDomLinkStatus.textContent = message;
      els.sideDomLinkStatus.classList.toggle("hidden", !message);
    }

    function sendDomLinkRequest() {
      const role = localOnlineRole();
      if (state.online.room && role !== DOM) return;
      const url = normalizeDomLink(currentDomLinkInputValue());
      if (!url) {
        if (els.domLinkStatus) els.domLinkStatus.textContent = "Enter a valid http or https link.";
        setSideDomLinkStatus("Enter a valid http or https link.");
        return;
      }
      state.settings.linkRequest = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        url
      };
      if (els.domLinkStatus) els.domLinkStatus.textContent = "Link request sent.";
      setSideDomLinkStatus("Link request sent.");
      renderSettings();
      renderSidePanel();
      publishSettingsState();
    }

    function domLinkControlsAllowed() {
      const role = localOnlineRole();
      return !state.online.room || role === DOM;
    }

    function subGalleryPrivateMode() {
      return Boolean(state.online.room && localOnlineRole() === SUB);
    }

    function galleryControlsAllowed() {
      return domLinkControlsAllowed() || subGalleryPrivateMode();
    }

    function galleryEffectSettings() {
      return subGalleryPrivateMode() ? localSubDistractions : state.settings;
    }

    function galleryEffectIsSharedDom() {
      return !subGalleryPrivateMode();
    }

    function localSubAutoPopupActive() {
      return subGalleryPrivateMode() && !state.settings.redditeryAutoPopup && !state.settings.redditeryRapidFire && Boolean(localSubDistractions.redditeryAutoPopup);
    }

    function sharedAutoPopupActive() {
      return Boolean(state.settings.redditeryAutoPopup || state.settings.redditeryRapidFire);
    }

    function autoPopupSettings() {
      if (sharedAutoPopupActive()) return state.settings;
      return localSubAutoPopupActive() ? localSubDistractions : state.settings;
    }

    function paymentControlsAllowed() {
      const role = localOnlineRole();
      if (state.online.room) return role === DOM;
      return Boolean(state.names.dom);
    }

    function recordLedgerEvent({ type = "event", label = "Ledger Update", detail = "", delta = 0, before = state.domVault, after = state.domVault } = {}) {
      const amount = Number(delta || 0);
      const entry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        at: Date.now(),
        game: currentGameLabel(),
        type,
        label,
        detail,
        delta: amount,
        before: Number(before || 0),
        after: Number(after || 0)
      };
      state.ledger = [...(state.ledger || []), entry].slice(-120);
    }

    function ledgerTotals() {
      return (state.ledger || []).reduce((totals, entry) => {
        const delta = Number(entry.delta || 0);
        if (delta > 0) totals.paid += delta;
        if (delta < 0) totals.drained += Math.abs(delta);
        if (entry.type === "cost") totals.costs += Math.abs(delta);
        if (entry.type === "reclaim") totals.reclaimed += Math.abs(delta);
        totals.biggest = Math.max(totals.biggest, Math.abs(delta));
        return totals;
      }, { paid: 0, drained: 0, costs: 0, reclaimed: 0, biggest: 0 });
    }

    function renderLedgerPanel() {
      if (!els.sideLedgerSummary || !els.sideLedgerEntries) return;
      const totals = ledgerTotals();
      const easterEgg = activeNameEasterEgg();
      const canUsePaymentControls = paymentControlsAllowed();
      const throneUrl = state.settings.throneUrl || (easterEgg && easterEgg.defaultThroneUrl) || "";
      const throneLabel = throneUrl ? escapeHtml(throneUrl) : "No throne URL saved.";
      const paymentLabel = easterEgg ? easterEgg.paymentLabel : "Payment throne";
      const paymentPlaceholder = easterEgg ? easterEgg.paymentPlaceholder : "https://example.com/pay";
      const pendingThroneDemand = state.settings.pendingThroneDemand;
      const normalThroneRequest = state.settings.normalThroneRequest;
      const syncedExtension = state.settings.throneExtensionStatus || {};
      const syncedExtensionFresh = Date.now() - Number(syncedExtension.updatedAt || 0) < 30000;
      const subExtensionInstalled = Boolean((syncedExtensionFresh && syncedExtension.installed) || (!state.online.room && throneExtensionStatus.installed));
      const roundedBankTribute = roundThroneTributeAmount(state.domVault);
      const sessionCard = isThroneSession()
        ? `
          <div class="command-card wide throne-session-card">
            <span>Session type</span>
            <strong>Throne Game</strong>
            <p>${pendingThroneDemand
              ? `${escapeHtml(state.names.sub || "Sub")} lost ${escapeHtml(pendingThroneDemand.game || "the game")}; Tribute Arcade is sending ${money(roundThroneTributeAmount(pendingThroneDemand.amount))} to the Throne extension.`
              : "Normal sub losses automatically open the prepared Throne page for the sub."}</p>
          </div>
        `
        : `
          <div class="command-card wide">
            <span>Session type</span>
            <strong>Regular Bank Game</strong>
          </div>
        `;
      const showExtensionCard = !state.online.room || localOnlineRole() === SUB;
      const extensionFresh = Date.now() - Number(throneExtensionStatus.updatedAt || 0) < 15000;
      const extensionStateText = !throneExtensionStatus.installed || !extensionFresh
        ? "Extension not detected."
        : (throneExtensionStatus.ready ? "Saved-card checkout ready." : "Checkout not ready.");
      const extensionButton = `<button class="primary" data-ledger-action="review-throne-checkout" ${throneExtensionStatus.ready ? "" : "disabled"}>Review and confirm on Throne</button>`;
      const extensionCard = showExtensionCard ? `
        <div class="command-card wide throne-extension-card ${throneExtensionStatus.ready ? "ready" : ""}">
          <span>Throne extension</span>
          <strong>${escapeHtml(extensionStateText)}</strong>
          <p>${escapeHtml(throneExtensionStatus.message || "Waiting for extension status.")}</p>
          ${throneExtensionStatus.countdownActive ? `<div class="throne-extension-countdown">${Number(throneExtensionStatus.countdownSeconds || 0)}</div>` : ""}
          <div class="payment-actions">
            ${extensionButton}
            <button data-ledger-action="refresh-throne-extension">Refresh</button>
          </div>
        </div>
      ` : "";
      const normalRequestCard = normalThroneRequest ? `
        <div class="command-card wide throne-normal-request-card">
          <span>Payment request</span>
          <strong>${escapeHtml(normalThroneRequest.requestedBy || state.names.dom || "Dom")} demands ${money(roundThroneTributeAmount(normalThroneRequest.rounded || normalThroneRequest.amount))}</strong>
          <p>${escapeHtml(state.names.dom || "Dom")} is asking to run the Throne helper using the current bank value. ${money(normalThroneRequest.amount || 0)} rounds to ${money(roundThroneTributeAmount(normalThroneRequest.rounded || normalThroneRequest.amount))}.</p>
          ${normalThroneRequestSubAllowed()
            ? `<div class="payment-actions">
                <button class="primary" data-ledger-action="accept-normal-throne">Yes, open Throne</button>
                <button data-ledger-action="deny-normal-throne">No</button>
              </div>`
            : `<span class="payment-lock">Waiting for ${escapeHtml(state.names.sub || "the sub")} to approve or deny.</span>`}
        </div>
      ` : "";
      const throneControls = canUsePaymentControls
        ? (throneUrl
          ? `
            <div class="payment-actions">
              <button data-ledger-action="change-throne">Change URL</button>
              ${isThroneSession() ? "" : `<button class="primary" data-ledger-action="demand-payment" ${subExtensionInstalled && state.domVault > 0 && !normalThroneRequest ? "" : "disabled"}>Demand Payment</button>`}
            </div>
            ${!isThroneSession() ? `<p class="payment-note">${money(state.domVault)} bank rounds to ${money(roundedBankTribute)} for Throne. ${subExtensionInstalled ? "The sub will get a yes/no approval box." : "Waiting for the sub's Throne helper extension to be detected."}</p>` : ""}
          `
          : `
            <label class="field-label payment-url-field">
              Throne / payment URL
              <input id="ledgerThroneUrlInput" type="url" placeholder="${escapeHtml(paymentPlaceholder)}">
            </label>
            <div class="payment-actions">
              <button class="primary" data-ledger-action="save-throne">Save URL</button>
            </div>
          `)
        : `<span class="payment-lock">Only ${escapeHtml(state.names.dom || "the dom")} can edit payment controls.</span>`;
      els.sideLedgerSummary.innerHTML = `
        <div class="command-card wide ledger-bank-card">
          <span>Dom bank</span>
          <strong>${money(state.domVault)}</strong>
          <p>Net ${money(Math.max(0, totals.paid - totals.drained))} · Biggest ${money(totals.biggest)}</p>
        </div>
        ${sessionCard}
        <div class="command-card wide payment-card">
          <span>${escapeHtml(paymentLabel)}</span>
          <strong>${throneLabel}</strong>
          ${throneControls}
        </div>
        ${normalRequestCard}
        ${extensionCard}
        ${canUsePaymentControls ? `<button class="danger-button ledger-reset-bank" data-ledger-action="reset-bank">Reset Bank</button>` : ""}
        <div class="ledger-stats">
          <span>Paid ${money(totals.paid)}</span>
          <span>Drained ${money(totals.drained)}</span>
          <span>Costs ${money(totals.costs)}</span>
          <span>Biggest ${money(totals.biggest)}</span>
        </div>
      `;
      els.sideLedgerEntries.innerHTML = (state.ledger || []).slice(-80).reverse().map((entry) => {
        const delta = Number(entry.delta || 0);
        const deltaClass = delta < 0 ? "loss" : (delta > 0 ? "gain" : "flat");
        const deltaText = delta === 0 ? "$0" : `${delta > 0 ? "+" : "-"}${money(Math.abs(delta))}`;
        return `
          <div class="ledger-entry ${deltaClass}">
            <div>
              <strong>${escapeHtml(entry.label || "Ledger Update")}</strong>
              <span>${escapeHtml(entry.detail || entry.game || "")}</span>
            </div>
            <div class="ledger-entry-money">
              <strong>${deltaText}</strong>
              <span>${money(entry.before)} -> ${money(entry.after)}</span>
            </div>
          </div>
        `;
      }).join("") || `<div class="ledger-entry flat"><div><strong>No ledger entries yet.</strong><span>Money changes will appear here as receipts.</span></div><div class="ledger-entry-money"><strong>$0</strong><span>${money(state.domVault)}</span></div></div>`;
    }

    function handleLedgerAction(action) {
      if (action === "refresh-throne-extension") {
        requestThroneExtensionStatus();
        return;
      }
      if (action === "review-throne-checkout") {
        focusThroneCheckoutForReview();
        return;
      }
      if (action === "accept-normal-throne") {
        acceptNormalThroneRequest();
        return;
      }
      if (action === "deny-normal-throne") {
        denyNormalThroneRequest();
        return;
      }
      if (!paymentControlsAllowed()) return;
      if (action === "save-throne") {
        const input = document.getElementById("ledgerThroneUrlInput");
        const url = normalizeDomLink(input && input.value);
        if (!url) {
          if (input) input.focus();
          return;
        }
        updateSettings({ throneUrl: url });
        return;
      }
      if (action === "change-throne") {
        updateSettings({ throneUrl: "" });
        return;
      }
      if (action === "demand-payment") {
        if (isThroneSession()) return;
        requestNormalThronePayment();
        return;
      }
      if (action === "clear-throne-demand") {
        updateSettings({ pendingThroneDemand: null });
        return;
      }
      if (action === "reset-bank") {
        openResetBankModal();
      }
    }

    function requestNormalThronePayment() {
      if (isThroneSession() || !paymentControlsAllowed()) return false;
      const easterEgg = activeNameEasterEgg();
      const baseUrl = normalizeDomLink(state.settings.throneUrl || (easterEgg && easterEgg.defaultThroneUrl));
      const amount = Math.max(0, Number(state.domVault || 0));
      if (!baseUrl || amount <= 0) return false;
      const rounded = roundThroneTributeAmount(amount);
      state.settings.normalThroneRequest = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        amount,
        rounded,
        url: baseUrl,
        requestedBy: state.names.dom || "Dom",
        createdAt: Date.now()
      };
      addLog(`<strong>${state.names.dom || "Dom"} requests payment.</strong> ${state.names.sub || "Sub"} must approve a ${money(rounded)} Throne tribute based on the ${money(amount)} bank.`);
      renderSidePanel();
      publishState();
      return true;
    }

    function normalThroneRequestSubAllowed() {
      const role = localOnlineRole();
      return !state.online.room || role === SUB;
    }

    function acceptNormalThroneRequest() {
      const request = state.settings.normalThroneRequest;
      if (!request || !request.id || !normalThroneRequestSubAllowed()) return;
      const baseUrl = normalizeDomLink(request.url || state.settings.throneUrl);
      const rounded = roundThroneTributeAmount(request.rounded || request.amount || state.domVault);
      if (!baseUrl || rounded <= 0) {
        updateSettings({ normalThroneRequest: null });
        return;
      }
      state.settings.paymentDemand = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        url: throneUrlWithTributeAmount(baseUrl, rounded),
        tributeAmount: rounded,
        reason: "normal-bank-request",
        automatic: false
      };
      state.settings.normalThroneRequest = null;
      addLog(`<strong>${state.names.sub || "Sub"} accepts.</strong> Opening a ${money(rounded)} Throne tribute from ${state.names.dom || "the dom"}'s bank request.`);
      renderSidePanel();
      processPaymentDemand();
      publishState();
    }

    function denyNormalThroneRequest() {
      const request = state.settings.normalThroneRequest;
      if (!request || !request.id || !normalThroneRequestSubAllowed()) return;
      state.settings.normalThroneRequest = null;
      addLog(`<strong>${state.names.sub || "Sub"} declines.</strong> The normal-mode Throne payment request was denied.`);
      renderSidePanel();
      publishState();
    }

    function demandPayment({ automatic = false } = {}) {
      if (!automatic && !paymentControlsAllowed()) return;
      const easterEgg = activeNameEasterEgg();
      const pendingDemand = state.settings.pendingThroneDemand;
      const baseUrl = normalizeDomLink(state.settings.throneUrl || (easterEgg && easterEgg.defaultThroneUrl));
      const url = pendingDemand
        ? throneUrlWithTributeAmount(baseUrl, pendingDemand.amount)
        : baseUrl;
      if (!url) return false;
      state.settings.paymentDemand = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        url,
        tributeAmount: pendingDemand ? roundThroneTributeAmount(pendingDemand.amount) : 0,
        reason: pendingDemand ? "throne-game-loss" : "manual-demand",
        automatic
      };
      state.settings.pendingThroneDemand = null;
      addLog(automatic
        ? `<strong>${state.names.sub || "Sub"} loses.</strong> The Throne page opens automatically.`
        : `<strong>${state.names.dom || "Dom"} demands payment.</strong> The throne URL has been sent to ${state.names.sub || "the sub"}.`);
      renderSidePanel();
      processPaymentDemand();
      publishState();
      return true;
    }

    function paymentDemandKey() {
      const claim = readSeatClaim();
      const seat = claim && claim.seat === SPECTATOR ? claim.secret : (localSeat() || "local");
      return `tribute-payment-demand:${state.online.room || "local"}:${seat}`;
    }

    function processPaymentDemand() {
      const demand = state.settings.paymentDemand;
      if (!demand || !demand.id || !demand.url) return;
      const role = localOnlineRole();
      if (state.online.room && role !== SUB) return;
      const key = paymentDemandKey();
      if (window.localStorage.getItem(key) === demand.id) return;
      window.localStorage.setItem(key, demand.id);
      const opened = window.open(demand.url, "_blank", "noopener");
      if (demand.reason === "throne-game-loss") {
        showThroneKissSplash();
        return;
      }
      if (!opened) {
        showSubLinkModal(demand, "Payment was demanded, but your browser blocked the automatic window.");
      }
    }

    function requestThroneExtensionStatus() {
      if (state.online.room && localOnlineRole() !== SUB) return;
      window.postMessage({
        source: "tribute-arcade",
        type: THRONE_EXTENSION_REQUEST,
        requestId: `${Date.now()}-${Math.random().toString(36).slice(2)}`
      }, window.location.origin);
    }

    function updateThroneExtensionStatus(detail = {}) {
      throneExtensionStatus = {
        ...throneExtensionStatus,
        installed: true,
        ready: Boolean(detail.ready),
        hasSavedCard: Boolean(detail.hasSavedCard),
        payButtonCount: Number(detail.payButtonCount || 0),
        enabled: Boolean(detail.enabled),
        countdownActive: Boolean(detail.countdownActive),
        countdownSeconds: Number(detail.countdownSeconds || 0),
        message: detail.message || (detail.ready
          ? "Saved-card checkout is ready on Throne."
          : "Extension found, but saved-card checkout is not ready."),
        updatedAt: Date.now()
      };
      if (localOnlineRole() === SUB) {
        const previous = state.settings.throneExtensionStatus || {};
        const synced = {
          installed: true,
          ready: throneExtensionStatus.ready,
          hasSavedCard: throneExtensionStatus.hasSavedCard,
          enabled: throneExtensionStatus.enabled,
          updatedAt: throneExtensionStatus.updatedAt
        };
        state.settings.throneExtensionStatus = synced;
        const changed = previous.ready !== synced.ready
          || previous.installed !== synced.installed
          || previous.enabled !== synced.enabled
          || Date.now() - Number(previous.updatedAt || 0) > 30000;
        if (changed) publishSettingsState();
      }
      if (els.sessionModeModal && !els.sessionModeModal.classList.contains("hidden")) renderSessionModeModal();
      renderSetupSettings();
      renderSidePanel();
    }

    function handleThroneExtensionMessage(event) {
      if (event.source !== window || event.origin !== window.location.origin) return;
      const data = event.data || {};
      if (data.source !== "throne-snacks-auto-click" || data.type !== THRONE_EXTENSION_RESPONSE) return;
      updateThroneExtensionStatus(data.status || data);
    }

    function focusThroneCheckoutForReview() {
      if ((state.online.room && localOnlineRole() !== SUB) || !throneExtensionStatus.ready) return;
      window.postMessage({
        source: "tribute-arcade",
        type: THRONE_EXTENSION_FOCUS_CHECKOUT
      }, window.location.origin);
      throneExtensionStatus = {
        ...throneExtensionStatus,
        message: "Opening Throne checkout for manual review. Confirm payment in the extension popup."
      };
      renderSidePanel();
      setTimeout(requestThroneExtensionStatus, 700);
    }

    function openResetBankModal() {
      if (!paymentControlsAllowed()) return;
      els.resetBankText.textContent = `Reset ${state.names.dom || "the dom"}'s bank from ${money(state.domVault)} to $0?`;
      els.resetBankModal.classList.remove("hidden");
    }

    function closeResetBankModal() {
      els.resetBankModal.classList.add("hidden");
    }

    function confirmResetBank() {
      if (!paymentControlsAllowed()) return;
      const before = state.domVault;
      state.domVault = 0;
      state.lockedTribute = 0;
      recordLedgerEvent({
        type: "reset",
        label: "Bank Reset",
        detail: `${state.names.dom || "Dom"} reset the bank.`,
        delta: -before,
        before,
        after: state.domVault
      });
      addLog(`<strong>${state.names.dom || "Dom"} resets the bank.</strong> The ledger drops from ${money(before)} to $0.`);
      closeResetBankModal();
      render();
      publishState();
    }

    function brattyWelcomeAllowed() {
      const easterEgg = activeNameEasterEgg();
      if (!easterEgg || easterEgg.id !== "brattyBb") return false;
      if (state.screen !== "select") return false;
      if (state.settings.brattyWelcomeSeen) return false;
      if (state.online.room && localOnlineRole() !== DOM) return false;
      return Boolean(state.names.dom);
    }

    function renderBrattyWelcomeModal() {
      if (!els.brattyWelcomeModal) return;
      const show = brattyWelcomeAllowed();
      els.brattyWelcomeModal.classList.toggle("hidden", !show);
      if (show) {
        const throneMode = isThroneSession();
        if (els.brattyWelcomeText) {
          els.brattyWelcomeText.textContent = throneMode
            ? `${state.names.dom} has entered like a goddess. Bratty mode is ready, her Throne is already set, and the arcade is grateful she came to play. Would she like a small gift as thanks for playing?`
            : `${state.names.dom} has entered like a goddess. The arcade knows she deserves tribute before the first move. Start her bank with $15 and begin at reclaim level 1?`;
        }
        if (els.declineBrattyWelcomeBtn) els.declineBrattyWelcomeBtn.textContent = throneMode ? "No Thanks" : "No";
        if (els.acceptBrattyWelcomeBtn) {
          els.acceptBrattyWelcomeBtn.classList.remove("hidden");
          els.acceptBrattyWelcomeBtn.textContent = throneMode ? "Send Gift" : "Yes";
        }
      }
    }

    function declineBrattyWelcome() {
      state.settings.brattyWelcomeSeen = true;
      if (els.brattyWelcomeModal) els.brattyWelcomeModal.classList.add("hidden");
      render();
      publishState();
    }

    function acceptBrattyWelcome() {
      if (!brattyWelcomeAllowed()) return;
      if (isThroneSession()) {
        sendBrattyWelcomeGift();
        return;
      }
      const before = state.domVault;
      state.domVault += 15;
      state.lockedTribute = state.domVault;
      state.tiltLevel = Math.max(1, Number(state.tiltLevel || 0));
      state.settings.brattyWelcomeSeen = true;
      recordLedgerEvent({
        type: "tribute",
        label: "Goddess Tribute",
        detail: `${state.names.dom || "Bratty"} accepted her deserved starting tribute.`,
        delta: state.domVault - before,
        before,
        after: state.domVault
      });
      addLog(`<strong>Goddess tribute accepted.</strong> ${state.names.dom || "Bratty"} starts with ${money(15)} in her bank and reclaim level 1.`);
      if (els.brattyWelcomeModal) els.brattyWelcomeModal.classList.add("hidden");
      render();
      publishState();
    }

    function pressureViewPromptAllowed() {
      if (!els.pressureViewPromptModal) return false;
      if (state.settings.pressureViewPromptSeen) return false;
      if (state.screen !== "game") return false;
      if (!pressureEligibleGame(state.currentGame)) return false;
      if (state.online.room && localOnlineRole() !== DOM) return false;
      return true;
    }

    function renderPressureViewPromptModal() {
      if (!els.pressureViewPromptModal) return;
      const show = pressureViewPromptAllowed();
      els.pressureViewPromptModal.classList.toggle("hidden", !show);
      if (!show) return;
      setToggleButtonState(els.promptPressureBanners, state.settings.domSeePressureBanners);
      setToggleButtonState(els.promptPressureText, state.settings.domSeePressureText);
      setToggleButtonState(els.promptPressurePulse, state.settings.domSeePressurePulse);
    }

    function savePressureViewPrompt() {
      updateSettings({
        pressureViewPromptSeen: true,
        domSeePressureBanners: toggleButtonActive(els.promptPressureBanners),
        domSeePressureText: toggleButtonActive(els.promptPressureText),
        domSeePressurePulse: toggleButtonActive(els.promptPressurePulse)
      });
      if (els.pressureViewPromptModal) els.pressureViewPromptModal.classList.add("hidden");
    }

    const GALLERY_PANEL_KEYS = new Set(["postImage", "randomPopups", "booru", "reddit", "savedImages", "savedVideos"]);

    function normalizeGalleryPanelOpen(value) {
      const source = value && typeof value === "object" && !Array.isArray(value) ? value : {};
      const normalized = {};
      Object.entries(source).forEach(([key, open]) => {
        if (GALLERY_PANEL_KEYS.has(key)) normalized[key] = Boolean(open);
      });
      return normalized;
    }

    function galleryPanelStateHas(key) {
      return Object.prototype.hasOwnProperty.call(normalizeGalleryPanelOpen(state.settings.galleryPanelOpen), key);
    }

    function syncGalleryPanelOpenState() {
      const panelState = normalizeGalleryPanelOpen(state.settings.galleryPanelOpen);
      els.galleryCollapsePanels.forEach((panel) => {
        const key = panel.dataset.galleryPanel || "";
        if (!GALLERY_PANEL_KEYS.has(key) || !Object.prototype.hasOwnProperty.call(panelState, key)) return;
        panel.dataset.syncingOpen = "true";
        panel.open = Boolean(panelState[key]);
        window.setTimeout(() => {
          delete panel.dataset.syncingOpen;
        }, 0);
      });
    }

    function rememberGalleryPanelOpen(panel) {
      const key = panel && panel.dataset.galleryPanel || "";
      if (!GALLERY_PANEL_KEYS.has(key) || panel.dataset.syncingOpen === "true") return;
      updateSettings({
        galleryPanelOpen: {
          ...normalizeGalleryPanelOpen(state.settings.galleryPanelOpen),
          [key]: Boolean(panel.open)
        }
      });
    }

    function renderSidePanel() {
      const soloGameIds = ["solitaire", "memoryMatch"];
      const soloMode = soloGameIds.includes(state.screen);
      const inGame = state.screen === "game";
      const inGameSelect = state.screen === "select";
      const soloContext = soloMode || (inGameSelect && soloGameIds.includes(state.currentGame));
      if (!soloContext && !inGame && !inGameSelect) {
        els.sidePopout.classList.add("hidden");
        els.sideRestoreTabs.forEach((button) => button.classList.add("hidden"));
        renderDistractionBackground();
        return;
      }
      els.sidePopout.classList.remove("hidden");
      const canOpenSettings = !soloContext && sideSettingsAllowed();
      const canOpenTools = !soloContext && domLinkControlsAllowed();
      const canOpenGallery = galleryControlsAllowed();
      const canOpenUtility = canOpenSettings || canOpenTools;
      const canUseDomSettings = !soloContext && domLinkControlsAllowed();
      const canUseSubSettings = !soloContext && subSettingsControlsAllowed();
      const canUseGallery = galleryControlsAllowed();
      const canOpenLedger = !soloContext && (inGame || inGameSelect);
      syncGalleryPanelOpenState();
      const wasSoloGalleryOnly = els.sidePopout.classList.contains("solo-gallery-only");
      if (soloContext) {
        if (!wasSoloGalleryOnly) state.settings.sideOpen = false;
        state.settings.activeSideTab = "gallery";
      }
      if (state.settings.normalThroneRequest && normalThroneRequestSubAllowed() && canOpenLedger) {
        state.settings.activeSideTab = "ledger";
        state.settings.sideOpen = true;
      }
      if (state.settings.activeSideTab === "settings") state.settings.activeSideTab = "tools";
      if (!canOpenLedger && state.settings.activeSideTab === "ledger") state.settings.activeSideTab = "chat";
      if (!canOpenGallery && state.settings.activeSideTab === "gallery") state.settings.activeSideTab = "chat";
      if (!canOpenUtility && state.settings.activeSideTab === "tools") {
        state.settings.activeSideTab = "chat";
      }
      const activeTab = state.settings.activeSideTab || "chat";
      const panelOpen = state.settings.sideOpen !== false;
      if (panelOpen && activeTab === "chat") markChatSeen();
      const easterEgg = activeNameEasterEgg();
      els.sidePanelTitle.textContent = activeTab === "ledger"
        ? (easterEgg ? easterEgg.commandTitle : "Command Center")
        : activeTab === "gallery"
          ? "Gallery"
        : activeTab === "tools"
          ? "Tools & Settings"
        : (state.online.room ? `Room ${state.online.room}` : "Room");
      els.sidePopout.classList.toggle("closed", !panelOpen);
      els.sidePopout.classList.toggle("solo-gallery-only", soloContext);
      els.sideRestoreTabs.forEach((button) => {
        const tab = button.dataset.openSideTab || "chat";
        const visible = (!soloContext || tab === "gallery")
          && (tab !== "ledger" || canOpenLedger)
          && (tab !== "gallery" || canOpenGallery)
          && (tab !== "tools" || canOpenUtility);
        button.classList.toggle("hidden", !visible);
        button.classList.toggle("solo-gallery-restore", soloContext && tab === "gallery");
        button.classList.toggle("active-restore", panelOpen && tab === activeTab);
        button.classList.toggle("unread", tab === "chat" && hasUnreadChat());
      });
      els.sideToggleBtn.textContent = "Hide";
      els.sideToggleBtn.title = "Collapse panel";
      els.sideTabs.forEach((button) => {
        const tab = button.dataset.sideTab || "chat";
        const visible = (!soloContext || tab === "gallery")
          && (tab !== "ledger" || canOpenLedger)
          && (tab !== "gallery" || canOpenGallery)
          && (tab !== "tools" || canOpenUtility);
        button.classList.toggle("hidden", !visible);
        button.classList.toggle("active", tab === activeTab);
        button.classList.toggle("unread", tab === "chat" && hasUnreadChat());
      });
      els.sideChatPane.classList.toggle("hidden", activeTab !== "chat");
      els.sideLedgerPane.classList.toggle("hidden", activeTab !== "ledger");
      els.sideToolsPane.classList.toggle("hidden", !((activeTab === "tools" && canOpenUtility) || (activeTab === "gallery" && canOpenGallery)));
      els.sideSettingsPane.classList.toggle("hidden", activeTab !== "tools" || !canOpenSettings);
      if (els.domToolsPane) els.domToolsPane.classList.toggle("hidden", activeTab !== "tools" || !canOpenTools);
      if (els.sideGalleryPane) els.sideGalleryPane.classList.toggle("hidden", activeTab !== "gallery" || !canOpenGallery);
      renderLedgerPanel();
      els.chatMessages.innerHTML = (state.chat || []).slice(-80).reverse().map((message) => `
        <div class="chat-message">
          <strong>${escapeHtml(message.sender || "Player")}</strong>
          <span>${escapeHtml(message.text)}</span>
        </div>
      `).join("") || `<div class="chat-message"><span>Chat is empty.</span></div>`;
      if (document.activeElement !== els.sideDomLinkInput) {
        els.sideDomLinkInput.value = els.sideDomLinkInput.value || "";
      }
      els.sideSendDomLinkBtn.disabled = !canUseDomSettings;
      els.sideDomLinkInput.disabled = !canUseDomSettings;
      els.sideDistractionInput.disabled = !canUseGallery;
      if (els.uploadDistractionBtn) els.uploadDistractionBtn.disabled = !canUseGallery;
      if (els.postDistractionBtn) els.postDistractionBtn.disabled = !canUseGallery;
      if (els.goonerGallerySource) {
        if (document.activeElement !== els.goonerGallerySource) {
          els.goonerGallerySource.value = state.settings.goonerGallerySource || "peekstr";
        }
        els.goonerGallerySource.disabled = !canUseGallery;
      }
      syncGoonerGalleryCategoryControls();
      if (els.clearDistractionBtn) els.clearDistractionBtn.disabled = !canUseDomSettings || !hasDistraction();
      if (els.domAdvantageMode) els.domAdvantageMode.disabled = !canUseDomSettings;
      if (els.domSeePressureBanners) els.domSeePressureBanners.disabled = !canUseDomSettings;
      if (els.domSeePressureText) els.domSeePressureText.disabled = !canUseDomSettings;
      if (els.domSeePressurePulse) els.domSeePressurePulse.disabled = !canUseDomSettings;
      if (els.clearPopupsBtn) els.clearPopupsBtn.disabled = !canUseDomSettings || !hasDistractionPopups();
      if (els.domSubBetControl) els.domSubBetControl.disabled = !canUseDomSettings;
      if (els.queenPowerMode) els.queenPowerMode.disabled = !canUseDomSettings;
      if (els.queenPowerUsers) els.queenPowerUsers.disabled = !canUseDomSettings;
      if (els.subDefaultBetInput) els.subDefaultBetInput.disabled = !canUseSubSettings;
      if (els.subLinkWarningMode) els.subLinkWarningMode.disabled = !canUseSubSettings;
      els.chatInput.disabled = false;
      els.sendChatBtn.disabled = false;
      els.chatInput.placeholder = "Send a message";
      const galleryTarget = galleryEffectSettings();
      if (document.activeElement !== els.sideDistractionInput) {
        const selectedMode = galleryTarget.distractionMode || "background-both";
        els.sideDistractionInput.value = selectedMode === "overlay-sub"
          ? (galleryTarget.distractionOverlayUrl || "")
          : (galleryTarget.distractionBackgroundUrl || galleryTarget.distractionUrl || "");
      }
      if (els.sideDistractionMode) els.sideDistractionMode.value = galleryTarget.distractionMode || "overlay-sub";
      if (els.sideDistractionDuration) els.sideDistractionDuration.value = normalizeDistractionDuration(galleryTarget.distractionDuration);
      if (els.booruLoadButtons) {
        els.booruLoadButtons.forEach((button) => {
          button.disabled = !canUseGallery || localBooruGalleryLoading;
        });
      }
      if (els.danbooruGalleryCategory && document.activeElement !== els.danbooruGalleryCategory) {
        els.danbooruGalleryCategory.value = localDanbooruCategory || "feet";
      }
      if (els.danbooruGalleryCategory) els.danbooruGalleryCategory.disabled = !canUseGallery || localDanbooruGalleryLoading;
      [els.danbooruDateFilter, els.booruDateFilter, els.soloBooruDateFilter].forEach((select) => {
        if (!select) return;
        if (document.activeElement !== select) select.value = normalizeBooruDateFilter(galleryEffectSettings().booruDateFilter || state.settings.booruDateFilter);
      });
      if (els.danbooruDateFilter) els.danbooruDateFilter.disabled = !canUseGallery || localDanbooruGalleryLoading;
      if (els.booruDateFilter) els.booruDateFilter.disabled = !canUseGallery || localDanbooruGalleryLoading;
      if (els.soloBooruDateFilter) els.soloBooruDateFilter.disabled = !soloAutoPopupControlsAllowed() || autoPopupSourceKey() !== "booru" || localDanbooruGalleryLoading;
      if (els.danbooruTagInput) els.danbooruTagInput.disabled = !canUseGallery || localDanbooruGalleryLoading || localDanbooruSuggesting;
      syncDanbooruVideoToggleButtons(canUseGallery);
      if (els.autoPopupDomPreviewInput) {
        els.autoPopupDomPreviewInput.classList.toggle("hidden", !domLinkControlsAllowed());
        els.autoPopupDomPreviewInput.classList.toggle("active", Boolean(state.settings.autoPopupDomPreview));
        els.autoPopupDomPreviewInput.setAttribute("aria-pressed", state.settings.autoPopupDomPreview ? "true" : "false");
        els.autoPopupDomPreviewInput.textContent = state.settings.autoPopupDomPreview ? "Hide Dom Preview" : "Show Dom Preview";
        els.autoPopupDomPreviewInput.disabled = !domLinkControlsAllowed();
      }
      if (els.danbooruLoadBtn) els.danbooruLoadBtn.disabled = !canUseGallery || localDanbooruGalleryLoading;
      if (els.danbooruNextBtn) els.danbooruNextBtn.disabled = !canUseGallery || localDanbooruGalleryLoading || !localDanbooruGalleryItems.length;
      updateRedditeryRandomButton();
      updateRedditeryAutoPopupStatus();
      renderBooruGallery();
      renderDanbooruGallery();
      renderDanbooruSuggestions();
      renderRedditeryGallery();
      renderDistractionGallery();
      renderDistractionBackground();
      renderAutoPopupPreview();
    }

    function chatSeenKey() {
      const claim = readSeatClaim();
      const seat = claim && claim.seat === SPECTATOR ? claim.secret : (localSeat() || "local");
      return `tribute-chat-seen:${state.online.room || "local"}:${seat}`;
    }

    function latestChatId() {
      const messages = state.chat || [];
      return messages.length ? messages[messages.length - 1].id : "";
    }

    function markChatSeen() {
      const id = latestChatId();
      if (id) window.localStorage.setItem(chatSeenKey(), id);
    }

    function hasUnreadChat() {
      const id = latestChatId();
      return Boolean(id && window.localStorage.getItem(chatSeenKey()) !== id);
    }

    function playChatDing() {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const context = new AudioContext();
        const now = context.currentTime;
        const gain = context.createGain();
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.12, now + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
        gain.connect(context.destination);
        [740, 988].forEach((frequency, index) => {
          const oscillator = context.createOscillator();
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(frequency, now + index * 0.055);
          oscillator.connect(gain);
          oscillator.start(now + index * 0.055);
          oscillator.stop(now + index * 0.055 + 0.18);
        });
      } catch (error) {
        // Browser autoplay rules may block sound until the page has been interacted with.
      }
    }

    function setSideTab(tab) {
      if (tab === "settings") tab = "tools";
      if (tab === "ledger" && state.screen !== "game" && state.screen !== "select") return;
      if (tab === "gallery" && !galleryControlsAllowed()) return;
      if (tab === "tools" && !sideSettingsAllowed() && !domLinkControlsAllowed()) return;
      if (state.settings.sideOpen !== false && state.settings.activeSideTab === tab) {
        state.settings.sideOpen = false;
        renderSidePanel();
        return;
      }
      state.settings.activeSideTab = tab;
      state.settings.sideOpen = true;
      if (tab === "chat") markChatSeen();
      renderSidePanel();
    }

    function openSidePanel(tab = state.settings.activeSideTab || "chat") {
      if (tab === "settings") tab = "tools";
      if (tab === "ledger" && state.screen !== "game" && state.screen !== "select") return;
      if (tab === "gallery" && !galleryControlsAllowed()) return;
      if (tab === "tools" && !sideSettingsAllowed() && !domLinkControlsAllowed()) return;
      if (state.settings.sideOpen !== false && state.settings.activeSideTab === tab) {
        state.settings.sideOpen = false;
        renderSidePanel();
        return;
      }
      state.settings.activeSideTab = tab;
      state.settings.sideOpen = true;
      if (tab === "chat") markChatSeen();
      renderSidePanel();
    }

    function toggleSidePanel() {
      state.settings.sideOpen = state.settings.sideOpen === false;
      if (state.settings.sideOpen !== false && state.settings.activeSideTab === "chat") markChatSeen();
      renderSidePanel();
    }

    function sideTabIsOpen(tab) {
      if (tab === "settings") tab = "tools";
      return state.settings.sideOpen !== false && state.settings.activeSideTab === tab;
    }

    function chatSenderLabel() {
      const role = localOnlineRole();
      if (role === DOM) return state.names.dom || "Dom";
      if (role === SUB) return state.names.sub || "Sub";
      if (role === SPECTATOR) {
        const claim = readSeatClaim();
        return (claim && state.online.spectators && state.online.spectators[claim.secret]) || "Spectator";
      }
      return "Table";
    }

    function sendChatMessage() {
      const text = els.chatInput.value.trim();
      if (!text) return;
      if (localOnlineRole() === SPECTATOR) {
        const claim = readSeatClaim();
        if (!claim || !state.online.spectators || !state.online.spectators[claim.secret]) {
          els.onlineStatus.textContent = "Choose a spectator name before chatting.";
          setScreen("lobby");
          renderLobby();
          return;
        }
      }
      const message = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        sender: chatSenderLabel(),
        text,
        at: Date.now()
      };
      state.chat = [
        ...(state.chat || []),
        message
      ].slice(-100);
      window.localStorage.setItem(chatSeenKey(), message.id);
      els.chatInput.value = "";
      renderSidePanel();
      publishChatMessage(message);
    }

    function addDistractionOverlay(url, duration = normalizeDistractionDuration(state.settings.distractionDuration), options = {}) {
      const normalized = normalizeDistractionSource(url);
      if (!normalized) return false;
      const target = options.targetSettings || galleryEffectSettings();
      const mediaType = mediaTypeForDistraction(normalized, options.mediaType);
      const placement = normalizePopupPlacement(options.placement || popupPlacement());
      const existingOverlays = activeDistractionOverlays(target);
      const randomAnchor = randomPopupAnchor(placement, existingOverlays);
      const requestedDuration = options.playFull
        ? normalizeFullVideoDuration(options.fullDuration || duration)
        : options.loopCount
          ? normalizeFullVideoDuration(options.fullDuration || 1800)
        : normalizeDistractionDuration(duration);
      const overlayUntil = Date.now() + requestedDuration * 1000;
      target.distractionOverlays = [
        ...existingOverlays,
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          url: normalized,
          mediaType,
          muted: mediaType === "video" ? options.muted !== false : true,
          loop: mediaType === "video" ? options.loop !== false : true,
          loopCount: mediaType === "video" && options.loopCount ? normalizeVideoLoopCount(options.loopCount) : 0,
          playFull: mediaType === "video" ? Boolean(options.playFull) : false,
          placement,
          anchorX: randomAnchor.x,
          anchorY: randomAnchor.y,
          until: overlayUntil,
          jitterX: 0,
          jitterY: 0
        }
      ].slice(-3);
      target.distractionUrl = "";
      target.distractionOverlayUrl = normalized;
      target.distractionOverlayUntil = overlayUntil;
      target.distractionOverlayX = 50;
      target.distractionOverlayY = 52;
      target.distractionUntil = overlayUntil;
      return true;
    }

    function addAutoDistractionOverlay(url, options = {}) {
      const normalized = normalizeDistractionSource(url);
      if (!normalized) return false;
      const target = options.targetSettings || autoPopupSettings();
      const mediaType = mediaTypeForDistraction(normalized, options.mediaType);
      const rapidFire = Boolean(options.rapidFire);
      const duration = rapidFire ? 16 : normalizeDistractionDuration(target.redditeryAutoPopupDuration);
      const wantsFullVideo = mediaType === "video" && options.autoFullVideo;
      const placement = normalizePopupPlacement(options.placement || popupPlacement());
      const existingOverlays = activeDistractionOverlays(target, rapidFire ? 14 : 3);
      const randomAnchor = randomPopupAnchor(placement, existingOverlays);
      const overlayUntil = Date.now() + (wantsFullVideo ? normalizeFullVideoDuration(options.fullDuration || 1800) : duration) * 1000;
      const sizeScale = rapidFire ? Math.round((1 + Math.random() * 0.2) * 100) / 100 : 1;
      const overlay = {
        id: `auto-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        url: normalized,
        mediaType,
        muted: mediaType === "video" ? options.muted !== false : true,
        loop: mediaType === "video" && wantsFullVideo ? false : true,
        autoFullVideo: wantsFullVideo,
        minDuration: duration,
        rapidFire,
        placement,
        anchorX: randomAnchor.x,
        anchorY: randomAnchor.y,
        sizeScale,
        until: overlayUntil,
        jitterX: 0,
        jitterY: 0
      };
      target.distractionOverlays = rapidFire
        ? [...existingOverlays.filter((item) => item && item.rapidFire), overlay].slice(-14)
        : [overlay];
      target.distractionUrl = "";
      target.distractionOverlayUrl = normalized;
      target.distractionOverlayUntil = overlayUntil;
      target.distractionOverlayX = 50;
      target.distractionOverlayY = 52;
      target.distractionUntil = overlayUntil;
      return true;
    }

    function postDistraction() {
      if (!galleryControlsAllowed()) return;
      const target = galleryEffectSettings();
      const sharedPost = galleryEffectIsSharedDom();
      const url = normalizeDistractionSource(els.sideDistractionInput.value);
      if (!url) {
        els.sideDistractionStatus.textContent = "Enter a valid image/GIF link, or drop/paste a PNG, JPG, GIF, WebP, or BMP.";
        return;
      }
      if (!pendingDistractionChoiceUrl) {
        openDistractionChoice(url, `How should this ${mediaTypeForDistraction(url)} appear?`);
        return;
      }
      target.distractionMode = els.sideDistractionMode && els.sideDistractionMode.value || "overlay-sub";
      target.distractionDuration = normalizeDistractionDuration(els.sideDistractionDuration && els.sideDistractionDuration.value);
      const pendingMediaType = mediaTypeForDistraction(url, pendingDistractionChoiceMedia && pendingDistractionChoiceMedia.mediaType);
      if (target.distractionMode === "overlay-sub" || pendingMediaType === "video") {
        addDistractionOverlay(url, target.distractionDuration, { ...(pendingDistractionChoiceMedia || {}), targetSettings: target });
        els.sideDistractionStatus.textContent = sharedPost
          ? `Overlay posted for ${target.distractionDuration} seconds.`
          : `Private overlay posted for ${target.distractionDuration} seconds.`;
      } else {
        target.distractionUrl = "";
        target.distractionBackgroundUrl = url;
        target.distractionBackgroundMode = sharedPost ? target.distractionMode : "background-sub";
        target.distractionBackgroundMediaType = "image";
        target.distractionBackgroundMuted = true;
        target.distractionUntil = 0;
        els.sideDistractionStatus.textContent = sharedPost ? "Background posted." : "Private background posted.";
      }
      rememberDistractionImage(url, { ...(pendingDistractionChoiceMedia || {}), targetSettings: target });
      renderSidePanel();
      renderDistractionBackground();
      if (sharedPost) publishSettingsState();
    }

    function openDistractionChoice(url, message = "How should this image appear?", media = {}) {
      if (!galleryControlsAllowed()) return;
      const normalized = normalizeDistractionSource(url);
      if (!normalized || !els.distractionChoiceModal) return;
      const mediaType = mediaTypeForDistraction(normalized, media.mediaType);
      if (mediaType === "video") {
        openVideoDistractionChoice(normalized, message || "How should this video play?", media);
        return;
      }
      pendingDistractionChoiceUrl = normalized;
      pendingDistractionChoiceMedia = {
        mediaType,
        previewUrl: normalizeDistractionSource(media.previewUrl || ""),
        muted: true
      };
      if (els.distractionChoiceText) els.distractionChoiceText.textContent = message;
      if (els.distractionChoicePreview) {
        els.distractionChoicePreview.innerHTML = `<img src="${escapeHtml(normalized)}" alt="">`;
      }
      if (els.distractionChoiceDuration && document.activeElement !== els.distractionChoiceDuration) {
        els.distractionChoiceDuration.value = normalizeDistractionDuration(state.settings.distractionDuration);
      }
      els.distractionChoiceModal.classList.remove("hidden");
    }

    function closeDistractionChoice() {
      pendingDistractionChoiceUrl = "";
      pendingDistractionChoiceMedia = null;
      if (els.distractionChoicePreview) els.distractionChoicePreview.innerHTML = "";
      [els.subWallpaperDistractionChoiceBtn, els.bothWallpaperDistractionChoiceBtn].forEach((button) => {
        if (button) button.disabled = false;
      });
      if (els.distractionChoiceModal) els.distractionChoiceModal.classList.add("hidden");
    }

    function openVideoDistractionChoice(url, message = "How should this video play?", media = {}) {
      if (!galleryControlsAllowed()) return;
      const normalized = normalizeDistractionSource(url);
      if (!normalized || !els.videoDistractionChoiceModal) return;
      pendingDistractionChoiceUrl = normalized;
      pendingDistractionChoiceMedia = {
        mediaType: "video",
        previewUrl: normalizeDistractionSource(media.previewUrl || ""),
        muted: media.muted !== false
      };
      if (els.videoDistractionChoiceText) els.videoDistractionChoiceText.textContent = message;
      if (els.videoDistractionChoiceLength) els.videoDistractionChoiceLength.textContent = "Video length: loading...";
      if (els.videoDistractionChoicePreview) {
        els.videoDistractionChoicePreview.innerHTML = `<video src="${escapeHtml(normalized)}" ${pendingDistractionChoiceMedia.muted ? "muted" : ""} autoplay loop controls playsinline poster="${escapeHtml(pendingDistractionChoiceMedia.previewUrl || "")}"></video>`;
        const previewVideo = els.videoDistractionChoicePreview.querySelector("video");
        if (previewVideo && els.videoDistractionChoiceLength) {
          const updateLength = () => {
            const duration = formatMediaDuration(previewVideo.duration);
            els.videoDistractionChoiceLength.textContent = duration
              ? `Video length: ${duration}`
              : "Video length: unavailable";
          };
          if (Number.isFinite(previewVideo.duration) && previewVideo.duration > 0) updateLength();
          else {
            previewVideo.addEventListener("loadedmetadata", updateLength, { once: true });
            previewVideo.addEventListener("error", () => {
              if (els.videoDistractionChoiceLength) els.videoDistractionChoiceLength.textContent = "Video length: unavailable";
            }, { once: true });
          }
        }
      }
      if (els.videoDistractionChoiceDuration && document.activeElement !== els.videoDistractionChoiceDuration) {
        els.videoDistractionChoiceDuration.value = normalizeDistractionDuration(state.settings.distractionDuration);
      }
      if (els.videoDistractionChoiceLoopCount && document.activeElement !== els.videoDistractionChoiceLoopCount) {
        els.videoDistractionChoiceLoopCount.value = normalizeVideoLoopCount(els.videoDistractionChoiceLoopCount.value || 3);
      }
      setVideoLoopChoiceMode("");
      els.videoDistractionChoiceModal.classList.remove("hidden");
    }

    function closeVideoDistractionChoice() {
      pendingDistractionChoiceUrl = "";
      pendingDistractionChoiceMedia = null;
      if (els.videoDistractionChoicePreview) els.videoDistractionChoicePreview.innerHTML = "";
      if (els.videoDistractionChoiceLength) els.videoDistractionChoiceLength.textContent = "Video length: loading...";
      setVideoLoopChoiceMode("");
      if (els.videoDistractionChoiceModal) els.videoDistractionChoiceModal.classList.add("hidden");
    }

    function setVideoLoopChoiceMode(mode = "") {
      const timeMode = mode === "time";
      const countMode = mode === "count";
      if (els.videoLoopTimeRow) els.videoLoopTimeRow.classList.toggle("hidden", !timeMode);
      if (els.videoLoopCountRow) els.videoLoopCountRow.classList.toggle("hidden", !countMode);
      if (els.videoLoopConfirmActions) els.videoLoopConfirmActions.classList.toggle("hidden", !timeMode && !countMode);
      if (els.confirmLoopTimedVideoDistractionChoiceBtn) els.confirmLoopTimedVideoDistractionChoiceBtn.classList.toggle("hidden", !timeMode);
      if (els.confirmLoopCountVideoDistractionChoiceBtn) els.confirmLoopCountVideoDistractionChoiceBtn.classList.toggle("hidden", !countMode);
      if (els.loopTimedVideoDistractionChoiceBtn) els.loopTimedVideoDistractionChoiceBtn.classList.toggle("active", timeMode);
      if (els.loopCountVideoDistractionChoiceBtn) els.loopCountVideoDistractionChoiceBtn.classList.toggle("active", countMode);
    }

    function imageDownloadName(url) {
      try {
        const parsed = new URL(url);
        const clean = decodeURIComponent(parsed.pathname.split("/").filter(Boolean).pop() || "tribute-image");
        return /\.[a-z0-9]{2,5}$/i.test(clean) ? clean : `${clean}.png`;
      } catch (error) {
        return "tribute-image.png";
      }
    }

    function triggerImageDownload(href, filename) {
      const link = document.createElement("a");
      link.href = href;
      link.download = filename || "tribute-image.png";
      link.rel = "noopener";
      document.body.appendChild(link);
      link.click();
      link.remove();
    }

    async function downloadDistractionSource(url) {
      const normalized = normalizeDistractionSource(url);
      if (!normalized) return false;
      const filename = imageDownloadName(normalized);
      try {
        const response = await fetch(normalized, { mode: "cors" });
        if (!response.ok) throw new Error(`Image returned ${response.status}.`);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        triggerImageDownload(objectUrl, filename);
        window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1200);
      } catch (error) {
        triggerImageDownload(normalized, filename);
      }
      return true;
    }

    async function saveChosenDistractionImage() {
      const url = normalizeDistractionSource(pendingDistractionChoiceUrl);
      if (!url) return;
      await downloadDistractionSource(url);
    }

    function postChosenDistraction(mode) {
      const url = normalizeDistractionSource(pendingDistractionChoiceUrl);
      if (!url) {
        closeDistractionChoice();
        return;
      }
      els.sideDistractionInput.value = url;
      if (els.sideDistractionMode) els.sideDistractionMode.value = mode || "overlay-sub";
      if (els.distractionChoiceDuration) {
        const duration = normalizeDistractionDuration(els.distractionChoiceDuration.value);
        if (els.sideDistractionDuration) els.sideDistractionDuration.value = duration;
        galleryEffectSettings().distractionDuration = duration;
      }
      postDistraction();
      closeDistractionChoice();
    }

    function postChosenVideoDistraction(mode) {
      const url = normalizeDistractionSource(pendingDistractionChoiceUrl);
      if (!url) {
        closeVideoDistractionChoice();
        return;
      }
      const target = galleryEffectSettings();
      const sharedPost = galleryEffectIsSharedDom();
      const media = {
        ...(pendingDistractionChoiceMedia || {}),
        mediaType: "video"
      };
      const isFullVideo = mode === "full";
      const isWallpaper = mode === "background-sub" || mode === "background-both";
      const isLoopCount = mode === "loop-count";
      const duration = isFullVideo
        ? normalizeFullVideoDuration(600)
        : normalizeDistractionDuration(els.videoDistractionChoiceDuration && els.videoDistractionChoiceDuration.value);
      const loopCount = normalizeVideoLoopCount(els.videoDistractionChoiceLoopCount && els.videoDistractionChoiceLoopCount.value);
      if (!isFullVideo && !isWallpaper) {
        target.distractionDuration = duration;
        if (els.sideDistractionDuration) els.sideDistractionDuration.value = duration;
      }
      if (isWallpaper) {
        target.distractionUrl = "";
        target.distractionBackgroundUrl = url;
        target.distractionBackgroundMode = sharedPost ? mode : "background-sub";
        target.distractionBackgroundMediaType = "video";
        target.distractionBackgroundMuted = true;
        target.distractionUntil = 0;
        if (els.sideDistractionInput) els.sideDistractionInput.value = url;
        if (els.sideDistractionStatus) {
          els.sideDistractionStatus.textContent = sharedPost
            ? (mode === "background-sub"
              ? "Muted experimental video wallpaper posted for the sub."
              : "Muted experimental video wallpaper posted for both players.")
            : "Private muted video wallpaper posted.";
        }
        rememberDistractionImage(url, { ...media, targetSettings: target });
        renderSidePanel();
        renderDistractionBackground();
        if (sharedPost) publishSettingsState();
        closeVideoDistractionChoice();
        return;
      }
      if (addDistractionOverlay(url, duration, {
        ...media,
        targetSettings: target,
        loop: !isFullVideo && !isLoopCount,
        loopCount: isLoopCount ? loopCount : 0,
        playFull: isFullVideo,
        fullDuration: isLoopCount ? normalizeFullVideoDuration(1800) : (isFullVideo ? duration : undefined)
      })) {
        if (els.sideDistractionInput) els.sideDistractionInput.value = url;
        if (els.sideDistractionStatus) {
          els.sideDistractionStatus.textContent = isFullVideo
            ? "Video posted until it finishes."
            : isLoopCount
              ? `Video posted for ${loopCount} loop${loopCount === 1 ? "" : "s"}.`
            : `Video loop posted for ${duration} seconds.`;
        }
        rememberDistractionImage(url, { ...media, targetSettings: target });
        renderSidePanel();
        renderDistractionBackground();
        if (sharedPost) publishSettingsState();
      }
      closeVideoDistractionChoice();
    }

    function imageFileFromItems(items) {
      return Array.from(items || [])
        .map((item) => item.kind === "file" ? item.getAsFile() : item)
        .find((file) => file && /^image\/(?:png|jpe?g|gif|webp|bmp)$/i.test(file.type));
    }

    function dataUrlBytes(dataUrl) {
      const base64 = String(dataUrl || "").split(",")[1] || "";
      return Math.ceil(base64.length * 0.75);
    }

    function readFileAsDataUrl(file) {
      return new Promise((resolve, reject) => {
        if (file && typeof file.arrayBuffer === "function") {
          file.arrayBuffer()
            .then((buffer) => {
              const reader = new FileReader();
              reader.addEventListener("load", () => resolve(reader.result));
              reader.addEventListener("error", () => reject(reader.error || new Error("Could not read file")));
              reader.readAsDataURL(new Blob([buffer], { type: file.type || "application/octet-stream" }));
            })
            .catch(() => {
              const reader = new FileReader();
              reader.addEventListener("load", () => resolve(reader.result));
              reader.addEventListener("error", () => reject(reader.error || new Error("Could not read file")));
              reader.readAsDataURL(file);
            });
          return;
        }
        const reader = new FileReader();
        reader.addEventListener("load", () => resolve(reader.result));
        reader.addEventListener("error", () => reject(reader.error || new Error("Could not read file")));
        reader.readAsDataURL(file);
      });
    }

    function loadImageFromFile(file) {
      return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const image = new Image();
        image.addEventListener("load", () => {
          URL.revokeObjectURL(url);
          resolve(image);
        });
        image.addEventListener("error", () => {
          URL.revokeObjectURL(url);
          reject(new Error("Could not load image"));
        });
        image.src = url;
      });
    }

    function drawCompressedImage(image, maxDimension, mimeType, quality) {
      const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth || image.width, image.naturalHeight || image.height));
      const width = Math.max(1, Math.round((image.naturalWidth || image.width) * scale));
      const height = Math.max(1, Math.round((image.naturalHeight || image.height) * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);
      return canvas.toDataURL(mimeType, quality);
    }

    async function compressImageFile(file) {
      const targetBytes = 800_000;
      const originalMaxBytes = 900_000;
      if (/^image\/gif$/i.test(file.type)) {
        if (file.size > originalMaxBytes) {
          throw new Error("Large GIFs cannot be safely compressed without losing animation. Try a smaller GIF or a PNG/JPG/WebP.");
        }
        return { dataUrl: await readFileAsDataUrl(file), compressed: false };
      }
      if (file.size <= originalMaxBytes) {
        return { dataUrl: await readFileAsDataUrl(file), compressed: false };
      }
      const image = await loadImageFromFile(file);
      const mimeType = "image/webp";
      const dimensions = [1400, 1200, 960, 760, 620];
      const qualities = [0.78, 0.68, 0.58, 0.48, 0.38];
      let best = "";
      for (const dimension of dimensions) {
        for (const quality of qualities) {
          const dataUrl = drawCompressedImage(image, dimension, mimeType, quality);
          if (!best || dataUrlBytes(dataUrl) < dataUrlBytes(best)) best = dataUrl;
          if (dataUrlBytes(dataUrl) <= targetBytes) {
            return { dataUrl, compressed: true, bytes: dataUrlBytes(dataUrl) };
          }
        }
      }
      if (best && dataUrlBytes(best) <= 1_100_000) {
        return { dataUrl: best, compressed: true, bytes: dataUrlBytes(best) };
      }
      throw new Error("That image is still too large after compression. Try cropping it or using a smaller file.");
    }

    async function uploadDistractionImageToHost(result, file) {
      const response = await fetch("/api/upload-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dataUrl: result.dataUrl,
          name: file && file.name ? file.name : "tribute-upload.webp"
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !normalizeDistractionSource(data.url)) {
        throw new Error(data.error || "Image host upload failed.");
      }
      return data.url;
    }

    async function useLocalDistractionFile(file) {
      if (!galleryControlsAllowed() || !file) return;
      const target = galleryEffectSettings();
      els.sideDistractionStatus.textContent = file.size > 2_000_000
        ? "Compressing image for upload..."
        : "Loading local image...";
      try {
        const result = await compressImageFile(file);
        els.sideDistractionStatus.textContent = "Uploading image to Catbox...";
        try {
          const hostedUrl = await uploadDistractionImageToHost(result, file);
          els.sideDistractionInput.value = hostedUrl;
          rememberDistractionImage(hostedUrl, { targetSettings: target });
          renderDistractionGallery();
          openDistractionChoice(hostedUrl, "Image uploaded. How should it appear?");
          els.sideDistractionStatus.textContent = subGalleryPrivateMode()
            ? "Image uploaded and saved to your private gallery."
            : "Image uploaded and saved to the gallery.";
        } catch (uploadError) {
          els.sideDistractionInput.value = result.dataUrl;
          rememberDistractionImage(result.dataUrl, { targetSettings: target });
          renderDistractionGallery();
          openDistractionChoice(result.dataUrl, "Image loaded locally. How should it appear?");
          const uploadMessage = String(uploadError && uploadError.message || "Catbox upload failed.");
          els.sideDistractionStatus.textContent = `Catbox upload failed: ${uploadMessage} Using local fallback.`;
        }
      } catch (error) {
        const message = String(error && error.message || "");
        els.sideDistractionStatus.textContent = /read|permission|requested file/i.test(message)
          ? "Could not read that image. On mobile, try opening it in Photos first so it downloads locally, then choose it again."
          : (message || "Could not read that image.");
      }
    }

    function handleDistractionPaste(event) {
      const file = imageFileFromItems(event.clipboardData && event.clipboardData.items);
      if (!file) return;
      event.preventDefault();
      useLocalDistractionFile(file);
    }

    function handleDistractionDrop(event) {
      event.preventDefault();
      els.sideDistractionInput.classList.remove("drop-ready");
      const file = imageFileFromItems(event.dataTransfer && event.dataTransfer.files);
      if (!file) {
        els.sideDistractionStatus.textContent = "Drop a PNG, JPG, GIF, WebP, or BMP image.";
        return;
      }
      useLocalDistractionFile(file);
    }

    function clearDistraction() {
      if (!domLinkControlsAllowed()) return;
      state.settings.distractionUrl = "";
      state.settings.distractionUntil = 0;
      state.settings.distractionBackgroundUrl = "";
      state.settings.distractionBackgroundMediaType = "";
      state.settings.distractionBackgroundMuted = true;
      state.settings.distractionOverlayUrl = "";
      state.settings.distractionOverlayUntil = 0;
      state.settings.distractionOverlayX = 50;
      state.settings.distractionOverlayY = 52;
      state.settings.distractionOverlays = [];
      els.sideDistractionInput.value = "";
      els.sideDistractionStatus.textContent = "Distraction cleared.";
      renderSidePanel();
      publishSettingsState();
    }

    function clearDistractionPopups() {
      if (!domLinkControlsAllowed()) return;
      state.settings.distractionOverlayUrl = "";
      state.settings.distractionOverlayUntil = 0;
      state.settings.distractionOverlayX = 50;
      state.settings.distractionOverlayY = 52;
      state.settings.distractionOverlays = [];
      if (els.sideDistractionStatus) els.sideDistractionStatus.textContent = "Popups cleared.";
      renderDistractionBackground();
      renderSidePanel();
      publishSettingsState();
    }

    function hasDistraction() {
      return Boolean(
        state.settings.distractionUrl
        || state.settings.distractionBackgroundUrl
        || state.settings.distractionOverlayUrl
        || activeDistractionOverlays().length
      );
    }

    function hasDistractionPopups() {
      return Boolean(
        state.settings.distractionOverlayUrl
        || activeDistractionOverlays().length
      );
    }

    function normalizeDistractionDuration(value) {
      const seconds = Math.round(Number(value));
      if (!Number.isFinite(seconds)) return 15;
      return Math.min(60, Math.max(1, seconds));
    }

    function normalizeFullVideoDuration(value) {
      const seconds = Math.round(Number(value));
      if (!Number.isFinite(seconds)) return 600;
      return Math.min(1800, Math.max(10, seconds));
    }

    function normalizeVideoLoopCount(value) {
      const count = Math.round(Number(value));
      if (!Number.isFinite(count)) return 3;
      return Math.min(20, Math.max(1, count));
    }

    function formatMediaDuration(value) {
      const seconds = Math.floor(Number(value || 0));
      if (!Number.isFinite(seconds) || seconds <= 0) return "";
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainder = seconds % 60;
      return hours
        ? `${hours}:${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`
        : `${minutes}:${String(remainder).padStart(2, "0")}`;
    }

    function normalizeAutoPopupInterval(value) {
      const seconds = Math.round(Number(value));
      if (!Number.isFinite(seconds)) return 30;
      return Math.min(600, Math.max(15, seconds));
    }

    function normalizePopupPlacement() {
      return "random";
    }

    function popupPlacement() {
      return "random";
    }

    function normalizeBooruDateFilter(value) {
      const key = String(value || "all").toLowerCase();
      return ["all", "12m", "10m", "8m", "6m", "4m", "3m", "1m"].includes(key) ? key : "all";
    }

    function booruDateFilterLabel(value = state.settings.booruDateFilter) {
      const labels = {
        all: "all time",
        "12m": "last 12 months",
        "10m": "last 10 months",
        "8m": "last 8 months",
        "6m": "last 6 months",
        "4m": "last 4 months",
        "3m": "last 3 months",
        "1m": "last 1 month"
      };
      return labels[normalizeBooruDateFilter(value)] || labels.all;
    }

    function distractionGalleryItems() {
      const sharedItems = Array.isArray(state.settings.distractionGallery)
        ? state.settings.distractionGallery.filter((item) => item && normalizeDistractionSource(item.url))
        : [];
      const localItems = subGalleryPrivateMode() && Array.isArray(localSubDistractions.distractionGallery)
        ? localSubDistractions.distractionGallery.filter((item) => item && normalizeDistractionSource(item.url))
        : [];
      return [...sharedItems, ...localItems].slice(-10).reverse();
    }

    function savedDistractionItemById(id) {
      const items = [
        ...(Array.isArray(state.settings.distractionGallery) ? state.settings.distractionGallery : []),
        ...(subGalleryPrivateMode() && Array.isArray(localSubDistractions.distractionGallery) ? localSubDistractions.distractionGallery : [])
      ];
      return items.find((item) => item && item.id === id && normalizeDistractionSource(item.url));
    }

    function rememberDistractionImage(url, media = {}) {
      const normalized = normalizeDistractionSource(url);
      if (!normalized) return;
      const target = media.targetSettings || galleryEffectSettings();
      const isInlineUpload = normalized.startsWith("data:");
      const mediaType = mediaTypeForDistraction(normalized, media.mediaType);
      const previewUrl = normalizeDistractionSource(media.previewUrl || "");
      const existing = Array.isArray(target.distractionGallery) ? target.distractionGallery : [];
      const inlineKept = existing
        .filter((item) => item && String(item.url || "").startsWith("data:") && item.url !== normalized)
        .slice(-2);
      const nonInlineKept = existing
        .filter((item) => item && item.url !== normalized && !String(item.url || "").startsWith("data:"));
      const next = [
        ...(isInlineUpload ? nonInlineKept.concat(inlineKept) : existing.filter((item) => item && item.url !== normalized)),
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          url: normalized,
          mediaType,
          previewUrl,
          source: String(media.source || "").toLowerCase(),
          sourceLabel: media.sourceLabel || "",
          savedAt: Date.now()
        }
      ];
      target.distractionGallery = next.slice(-6);
    }

    function renderDistractionGallery() {
      if (!els.distractionGallery && !els.distractionVideoGallery) return;
      const items = distractionGalleryItems();
      const imageItems = items.filter((item) => mediaTypeForDistraction(item.url, item.mediaType) !== "video");
      const videoItems = items.filter((item) => mediaTypeForDistraction(item.url, item.mediaType) === "video");
      if (els.savedDistractionGallerySection && imageItems.length && !galleryPanelStateHas("savedImages")) {
        els.savedDistractionGallerySection.open = true;
      }
      if (els.savedVideoGallerySection && videoItems.length && !galleryPanelStateHas("savedVideos")) {
        els.savedVideoGallerySection.open = true;
      }
      const selectedUrl = normalizeDistractionSource(els.sideDistractionInput.value);
      const renderSavedItems = (savedItems, label) => savedItems.map((item, index) => {
        const mediaType = mediaTypeForDistraction(item.url, item.mediaType);
        const thumbUrl = normalizeDistractionSource(item.previewUrl || item.url);
        return `
        <button type="button" class="distraction-thumb ${selectedUrl && selectedUrl === normalizeDistractionSource(item.url) ? "selected" : ""}" data-distraction-gallery-id="${escapeHtml(item.id || "")}" ${galleryControlsAllowed() ? "" : "disabled"} title="Select ${mediaType}">
          <img src="${escapeHtml(thumbUrl)}" alt="Saved ${label} ${index + 1}" loading="lazy">
          ${mediaType === "video" ? "<span class=\"media-pill\">Video</span>" : ""}
        </button>
      `;
      }).join("");
      if (els.distractionGallery) {
        els.distractionGallery.classList.toggle("hidden", !imageItems.length);
        els.distractionGallery.innerHTML = renderSavedItems(imageItems, "image");
      }
      if (els.distractionVideoGallery) {
        els.distractionVideoGallery.classList.toggle("hidden", !videoItems.length);
        els.distractionVideoGallery.innerHTML = renderSavedItems(videoItems, "video");
      }
    }

    function renderAutoPopupPreview() {
      if (!els.autoPopupPreview) return;
      const canShow = domLinkControlsAllowed()
        && Boolean(state.settings.autoPopupDomPreview)
        && localAutoPopupPreview
        && normalizeDistractionSource(localAutoPopupPreview.url);
      els.autoPopupPreview.classList.toggle("hidden", !canShow);
      if (!canShow) {
        els.autoPopupPreview.innerHTML = "";
        return;
      }
      const url = normalizeDistractionSource(localAutoPopupPreview.url);
      const mediaType = mediaTypeForDistraction(url, localAutoPopupPreview.mediaType);
      const thumbUrl = normalizeDistractionSource(localAutoPopupPreview.previewUrl || url);
      els.autoPopupPreview.innerHTML = mediaType === "video"
        ? `<video src="${escapeHtml(url)}" muted autoplay loop playsinline poster="${escapeHtml(thumbUrl)}"></video><span>Auto</span>`
        : `<img src="${escapeHtml(thumbUrl)}" alt=""><span>Auto</span>`;
    }

    function showAutoPopupPreview(item, media = {}) {
      if (!domLinkControlsAllowed() || !state.settings.autoPopupDomPreview) return;
      const url = normalizeDistractionSource(item && item.url);
      if (!url) return;
      const sourceSubreddit = String(item.subreddit || item.source || "").toLowerCase();
      const sourceLabel = goonerPageLabelForSubreddit(sourceSubreddit)
        || item.sourceLabel
        || (autoPopupSourceKey() === "reddit" ? redditSelectionLabel("auto") : "Booru search");
      localAutoPopupPreview = {
        url,
        mediaType: mediaTypeForDistraction(url, media.mediaType || item.mediaType),
        previewUrl: normalizeDistractionSource(item.previewUrl || media.previewUrl || ""),
        source: sourceSubreddit,
        sourceLabel,
        savedAt: Date.now()
      };
      renderAutoPopupPreview();
    }

    function openAutoPopupPreviewModal() {
      if (!localAutoPopupPreview || !normalizeDistractionSource(localAutoPopupPreview.url) || !els.autoPopupPreviewModal) return;
      const url = normalizeDistractionSource(localAutoPopupPreview.url);
      const mediaType = mediaTypeForDistraction(url, localAutoPopupPreview.mediaType);
      const previewUrl = normalizeDistractionSource(localAutoPopupPreview.previewUrl || "");
      if (els.autoPopupPreviewModalMedia) {
        els.autoPopupPreviewModalMedia.innerHTML = mediaType === "video"
          ? `<video src="${escapeHtml(url)}" muted autoplay loop controls playsinline poster="${escapeHtml(previewUrl)}"></video>`
          : `<img src="${escapeHtml(url)}" alt="">`;
      }
      if (els.autoPopupPreviewModalText) {
        const source = localAutoPopupPreview.sourceLabel || "";
        els.autoPopupPreviewModalText.textContent = source
          ? `From ${source}. This preview is only on your screen. Hiding it will not remove the sub popup.`
          : "This preview is only on your screen. Hiding it will not remove the sub popup.";
      }
      els.autoPopupPreviewModal.classList.remove("hidden");
    }

    function closeAutoPopupPreviewModal() {
      if (els.autoPopupPreviewModalMedia) els.autoPopupPreviewModalMedia.innerHTML = "";
      if (els.autoPopupPreviewModal) els.autoPopupPreviewModal.classList.add("hidden");
    }

    function clearAutoPopupPreview() {
      localAutoPopupPreview = null;
      if (domLinkControlsAllowed() && state.settings.autoPopupDomPreview) {
        updateSettings({ autoPopupDomPreview: false });
      }
      closeAutoPopupPreviewModal();
      renderAutoPopupPreview();
    }

    function saveAutoPopupPreview() {
      if (!localAutoPopupPreview || !normalizeDistractionSource(localAutoPopupPreview.url)) return;
      rememberDistractionImage(localAutoPopupPreview.url, { ...localAutoPopupPreview, targetSettings: state.settings });
      renderDistractionGallery();
      closeAutoPopupPreviewModal();
      if (els.sideDistractionStatus) els.sideDistractionStatus.textContent = "Auto popup preview saved.";
    }

    async function downloadAutoPopupPreview() {
      if (!localAutoPopupPreview || !normalizeDistractionSource(localAutoPopupPreview.url)) return;
      await downloadDistractionSource(localAutoPopupPreview.url);
      if (els.sideDistractionStatus) els.sideDistractionStatus.textContent = "Auto popup preview download started.";
    }

    function renderBooruGallery() {
      if (!els.booruGallery) return;
      els.booruGallery.classList.toggle("hidden", !localBooruGalleryItems.length);
      const selectedUrl = normalizeDistractionSource(els.sideDistractionInput.value);
      els.booruGallery.innerHTML = localBooruGalleryItems.map((item, index) => {
        const url = normalizeDistractionSource(item.url);
        const previewUrl = normalizeDistractionSource(item.previewUrl || item.url);
        return `
          <button type="button" class="distraction-thumb booru-thumb ${selectedUrl && selectedUrl === url ? "selected" : ""}" data-booru-gallery-index="${index}" ${galleryControlsAllowed() ? "" : "disabled"} title="Score ${Number(item.score || 0)}">
            <img src="${escapeHtml(previewUrl)}" alt="Booru result ${index + 1}" loading="lazy">
          </button>
        `;
      }).join("");
    }

    function danbooruCategoryLabel(category = localDanbooruCategory) {
      const labels = {
        feet: "Feet",
        boobs: "Boobs",
        butt: "Butt",
        armpits: "Armpits",
        femboys: "Femboys"
      };
      return labels[String(category || "").toLowerCase()] || "Feet";
    }

    function soloAutoPopupControlsAllowed() {
      return (state.screen === "select" && ["solitaire", "memoryMatch"].includes(state.currentGame))
        || ["solitaire", "memoryMatch"].includes(state.screen);
    }

    function syncDanbooruVideoToggleButtons(canUseDomSettings = domLinkControlsAllowed()) {
      const settings = autoPopupSettings();
      const pairs = [
        [els.danbooruIncludeVideos, canUseDomSettings],
        [els.autoDanbooruIncludeVideos, canUseDomSettings],
        [els.soloDanbooruIncludeVideos, soloAutoPopupControlsAllowed()]
      ];
      pairs.forEach(([button, canUse]) => {
        if (!button) return;
        button.disabled = !canUse || localDanbooruGalleryLoading;
        button.classList.toggle("active", localDanbooruIncludeVideos);
        button.setAttribute("aria-pressed", localDanbooruIncludeVideos ? "true" : "false");
      });
      [
        [els.danbooruUnmuteVideos, canUseDomSettings],
        [els.autoDanbooruUnmuteVideos, canUseDomSettings],
        [els.soloDanbooruUnmuteVideos, soloAutoPopupControlsAllowed()]
      ].forEach(([button, canUse]) => {
        if (!button) return;
        button.disabled = !canUse || localDanbooruGalleryLoading || !localDanbooruIncludeVideos;
        button.classList.toggle("active", localDanbooruUnmuteVideos);
        button.setAttribute("aria-pressed", localDanbooruUnmuteVideos ? "true" : "false");
      });
      [
        [els.danbooruFullVideos, canUseDomSettings],
        [els.soloDanbooruFullVideos, soloAutoPopupControlsAllowed()]
      ].forEach(([button, canUse]) => {
        if (!button) return;
        button.disabled = !canUse || localDanbooruGalleryLoading || !localDanbooruIncludeVideos;
        button.classList.toggle("active", Boolean(settings.booruAutoPopupFullVideos));
        button.setAttribute("aria-pressed", settings.booruAutoPopupFullVideos ? "true" : "false");
      });
    }

    function setDanbooruIncludeVideos(enabled) {
      localDanbooruIncludeVideos = Boolean(enabled);
      if (!localDanbooruIncludeVideos) localDanbooruUnmuteVideos = false;
      if (!localDanbooruIncludeVideos && state.settings.booruAutoPopupFullVideos) updateSettings({ booruAutoPopupFullVideos: false });
      resetAutoPopupFeedCursors();
      syncDanbooruVideoToggleButtons();
      if (els.danbooruGalleryStatus) {
        els.danbooruGalleryStatus.textContent = localDanbooruIncludeVideos
          ? "Videos enabled for Booru results."
          : "Videos disabled for Booru results.";
      }
      if (localDanbooruCustomTag && !localDanbooruGalleryLoading) {
        loadDanbooruGallery({ tag: localDanbooruCustomTag, next: false });
      }
      saveBrattyLocalGalleryPrefs();
    }

    function setBooruAutoPopupFullVideos(enabled) {
      if (subGalleryPrivateMode() && !sharedAutoPopupActive()) {
        localSubDistractions.booruAutoPopupFullVideos = Boolean(enabled) && localDanbooruIncludeVideos;
        syncDanbooruVideoToggleButtons();
        updateRedditeryAutoPopupStatus();
        return;
      }
      updateSettings({ booruAutoPopupFullVideos: Boolean(enabled) && localDanbooruIncludeVideos });
      syncDanbooruVideoToggleButtons();
      updateRedditeryAutoPopupStatus();
    }

    function setAutoPopupDomPreview(enabled) {
      if (!domLinkControlsAllowed()) return;
      updateSettings({ autoPopupDomPreview: Boolean(enabled) });
      renderAutoPopupPreview();
    }

    function setDanbooruUnmuteVideos(enabled) {
      if (!localDanbooruIncludeVideos) return;
      localDanbooruUnmuteVideos = Boolean(enabled);
      syncDanbooruVideoToggleButtons();
      if (els.danbooruGalleryStatus) {
        els.danbooruGalleryStatus.textContent = localDanbooruUnmuteVideos
          ? "Video popups will try to play with audio when the browser allows it."
          : "Video popups will play muted.";
      }
      saveBrattyLocalGalleryPrefs();
    }

    function setBooruDateFilter(value) {
      const next = normalizeBooruDateFilter(value);
      const target = subGalleryPrivateMode() ? localSubDistractions : state.settings;
      if (next === normalizeBooruDateFilter(target.booruDateFilter)) return;
      if (target === state.settings) updateSettings({ booruDateFilter: next });
      else target.booruDateFilter = next;
      resetAutoPopupFeedCursors();
      localDanbooruPage = 1;
      localDanbooruGalleryItems = [];
      renderDanbooruGallery();
      updateRedditeryAutoPopupStatus();
      if (els.danbooruGalleryStatus) {
        els.danbooruGalleryStatus.textContent = `Booru upload date set to ${booruDateFilterLabel(next)}.`;
      }
      if (galleryControlsAllowed() && !localDanbooruGalleryLoading) {
        const tag = String((document.activeElement === els.danbooruTagInput ? els.danbooruTagInput.value : "") || (els.danbooruTagInput && els.danbooruTagInput.value) || localDanbooruCustomTag || "").trim();
        loadDanbooruGallery({ tag, next: false });
      }
      if (sharedAutoPopupActive() || localSubAutoPopupActive()) scheduleNextRedditeryAutoPopup();
    }

    function renderDanbooruGallery() {
      if (!els.danbooruGallery) return;
      els.danbooruGallery.classList.toggle("hidden", !localDanbooruGalleryItems.length);
      const selectedUrl = normalizeDistractionSource(els.sideDistractionInput.value);
      els.danbooruGallery.innerHTML = localDanbooruGalleryItems.map((item, index) => {
        const url = normalizeDistractionSource(item.url);
        const previewUrl = normalizeDistractionSource(item.previewUrl || item.url);
        const mediaType = mediaTypeForDistraction(url, item.mediaType);
        return `
          <button type="button" class="distraction-thumb booru-thumb ${selectedUrl && selectedUrl === url ? "selected" : ""}" data-danbooru-gallery-index="${index}" ${galleryControlsAllowed() ? "" : "disabled"} title="${escapeHtml(item.tags || `Danbooru score ${Number(item.score || 0)}`)}">
            <img src="${escapeHtml(previewUrl)}" alt="Booru result ${index + 1}" loading="lazy">
            ${mediaType === "video" ? "<span class=\"media-pill\">Video</span>" : ""}
          </button>
        `;
      }).join("");
    }

    function formatDanbooruCount(count = 0) {
      const value = Number(count || 0);
      if (!Number.isFinite(value) || value <= 0) return "";
      if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(value >= 10_000_000 ? 0 : 1)}m`;
      if (value >= 1_000) return `${Math.round(value / 1_000)}k`;
      return String(value);
    }

    function renderDanbooruSuggestionList(container, visible = true) {
      if (!container) return;
      const hasSuggestions = Array.isArray(localDanbooruSuggestions) && localDanbooruSuggestions.length;
      container.classList.toggle("hidden", !visible || !hasSuggestions);
      container.innerHTML = visible && hasSuggestions
        ? localDanbooruSuggestions.map((item, index) => {
          const label = item.label || item.value || "tag";
          const count = formatDanbooruCount(item.postCount);
          return `
            <button type="button" data-danbooru-suggestion-index="${index}" title="${escapeHtml(item.value)}">
              <span>${escapeHtml(label)}</span>
              ${count ? `<small>${escapeHtml(count)}</small>` : ""}
            </button>
          `;
        }).join("")
        : "";
    }

    function renderDanbooruSuggestions() {
      renderDanbooruSuggestionList(els.danbooruSuggestions, true);
      renderDanbooruSuggestionList(
        els.autoDanbooruSuggestions,
        domLinkControlsAllowed() && autoPopupSourceKey() === "booru"
      );
      renderDanbooruSuggestionList(
        els.soloDanbooruSuggestions,
        soloAutoPopupControlsAllowed() && autoPopupSourceKey() === "booru"
      );
    }

    function renderRedditeryGallery() {
      if (!els.redditeryGallery) return;
      els.redditeryGallery.classList.toggle("hidden", !localRedditeryGalleryItems.length);
      const selectedUrl = normalizeDistractionSource(els.sideDistractionInput.value);
      els.redditeryGallery.innerHTML = localRedditeryGalleryItems.map((item, index) => {
        const url = normalizeDistractionSource(item.url);
        const previewUrl = normalizeDistractionSource(item.previewUrl || item.url);
        const sourceLabel = goonerGallerySourceLabel(item.source);
        return `
          <button type="button" class="distraction-thumb booru-thumb ${selectedUrl && selectedUrl === url ? "selected" : ""}" data-redditery-gallery-index="${index}" ${galleryControlsAllowed() ? "" : "disabled"} title="${escapeHtml(item.title || `${sourceLabel} image`)}">
            <img src="${escapeHtml(previewUrl)}" alt="${escapeHtml(sourceLabel)} result ${index + 1}" loading="lazy">
          </button>
        `;
      }).join("");
    }

    function goonerGallerySource() {
      return "peekstr";
    }

    const GOONER_REDDIT_PAGES = [
      { subreddit: "gooninghentai", label: "Gooning Hentai", categories: ["captions", "goonerbait"] },
      { subreddit: "jerkbudshentai", label: "Jerkbuds Hentai", category: "goonerbait" },
      { subreddit: "hentailimitless", label: "Hentai Limitless", category: "goonerbait" },
      { subreddit: "cringegoontards", label: "Cringe Goon Tards", category: "goonerbait" },
      { subreddit: "hentaiigooning", label: "Hentaii Gooning", category: "goonerbait" },
      { subreddit: "hentaicensore", label: "Hentai Censore", categories: ["censor", "goonerbait"] },
      { subreddit: "femboyhentai", label: "Femboy Hentai", category: "femboys" },
      { subreddit: "furrygoonpit", label: "Furry Goon Pit", category: "furry" },
      { subreddit: "bootyhentai", label: "Booty Hentai", category: "butt" },
      { subreddit: "animebooty", label: "Anime Booty", category: "butt" },
      { subreddit: "buttfangs", label: "Butt Fangs", category: "butt" },
      { subreddit: "hentai_bnwo", label: "Hentai BNWO", category: "bnwo" },
      { subreddit: "hentaibnwohaven", label: "BNWO Haven", category: "bnwo" },
      { subreddit: "besthentaifeet", label: "Best Hentai Feet", category: "feet" },
      { subreddit: "animefeet", label: "Anime Feet", category: "feet" },
      { subreddit: "hentaifeetlover", label: "Hentai Feet Lover", category: "feet" },
      { subreddit: "oppaihentai", label: "Oppai Hentai", category: "boobs" },
      { subreddit: "biganimetiddies", label: "Big Anime Tiddies", category: "boobs" },
      { subreddit: "underoppai", label: "Under Oppai", category: "boobs" },
      { subreddit: "sideoppai", label: "Side Oppai", category: "boobs" },
      { subreddit: "overoppai", label: "Over Oppai", category: "boobs" },
      { subreddit: "animearmpits", label: "Anime Armpits", category: "armpits" }
    ];

    const GOONER_GALLERY_CATEGORIES = {
      captions: { label: "Captions", subreddits: redditSubredditsForCategory("captions") },
      goonerbait: { label: "Gooner Bait", subreddits: redditSubredditsForCategory("goonerbait") },
      censor: { label: "Censor", subreddits: redditSubredditsForCategory("censor") },
      femboys: { label: "Femboys", subreddits: redditSubredditsForCategory("femboys") },
      furry: { label: "Furry", subreddits: redditSubredditsForCategory("furry") },
      butt: { label: "Butt", subreddits: redditSubredditsForCategory("butt") },
      bnwo: { label: "BNWO", subreddits: redditSubredditsForCategory("bnwo") },
      feet: { label: "Feet", subreddits: redditSubredditsForCategory("feet") },
      boobs: { label: "Boobs", subreddits: redditSubredditsForCategory("boobs") },
      armpits: { label: "Armpits", subreddits: redditSubredditsForCategory("armpits") }
    };

    GOONER_GALLERY_CATEGORIES.mixed = {
      label: "Mixed",
      subreddits: [...new Set(Object.values(GOONER_GALLERY_CATEGORIES).flatMap((category) => category.subreddits))]
    };

    function redditPageCategories(page = {}) {
      const rawCategories = Array.isArray(page.categories) ? page.categories : [page.category];
      return rawCategories
        .map((category) => String(category || "").toLowerCase().trim())
        .filter(Boolean);
    }

    function goonerRedditPages() {
      const seen = new Set();
      return [...localCustomGoonerRedditPages, ...GOONER_REDDIT_PAGES].filter((page) => {
        const subreddit = String(page && page.subreddit || "").toLowerCase();
        if (!subreddit || seen.has(subreddit)) return false;
        seen.add(subreddit);
        return true;
      });
    }

    function redditSubredditsForCategory(categoryKey = "captions") {
      return goonerRedditPages()
        .filter((page) => redditPageCategories(page).includes(categoryKey))
        .map((page) => page.subreddit);
    }

    function normalizeRedditPageSelection(value) {
      const allowed = new Set(goonerRedditPages().map((page) => page.subreddit));
      const raw = Array.isArray(value) ? value : [];
      return [...new Set(raw
        .map((subreddit) => String(subreddit || "").toLowerCase().trim())
        .filter((subreddit) => allowed.has(subreddit)))];
    }

    function categorySubreddits(categoryKey = "captions") {
      const category = GOONER_GALLERY_CATEGORIES[categoryKey] || GOONER_GALLERY_CATEGORIES.captions;
      return category.subreddits.length ? [...category.subreddits] : [...GOONER_GALLERY_CATEGORIES.captions.subreddits];
    }

    function redditSelectionForScope(scope = "gallery") {
      const isAuto = scope === "auto";
      const autoSettings = autoPopupSettings();
      const stored = normalizeRedditPageSelection(isAuto ? autoSettings.redditeryAutoPopupSubreddits : state.settings.goonerGallerySubreddits);
      if (stored.length) return stored;
      return [];
    }

    function redditSelectionLabel(scope = "gallery") {
      const selected = redditSelectionForScope(scope);
      const pageBySubreddit = new Map(goonerRedditPages().map((page) => [page.subreddit, page]));
      if (!selected.length) return "No Reddit pages";
      if (selected.length === 1) return pageBySubreddit.get(selected[0])?.label || goonerGalleryCategoryLabel();
      return `${selected.length} Reddit pages`;
    }

    function goonerGalleryCategoryKey() {
      const key = String(state.settings.goonerGalleryCategory || "captions").toLowerCase();
      return GOONER_GALLERY_CATEGORIES[key] ? key : "captions";
    }

    function autoPopupSourceKey() {
      const settings = autoPopupSettings();
      return settings.redditeryAutoPopupSource === "booru" ? "booru" : "reddit";
    }

    function autoPopupRedditCategoryKey() {
      const settings = autoPopupSettings();
      const key = String(settings.redditeryAutoPopupCategory || state.settings.goonerGalleryCategory || "captions").toLowerCase();
      return GOONER_GALLERY_CATEGORIES[key] ? key : "captions";
    }

    function goonerGalleryCategoryLabel(key = goonerGalleryCategoryKey()) {
      return (GOONER_GALLERY_CATEGORIES[key] || GOONER_GALLERY_CATEGORIES.captions).label;
    }

    function pickGoonerSubreddit(previous = "", categoryKey = goonerGalleryCategoryKey(), pool = null) {
      const selectedPool = normalizeRedditPageSelection(pool);
      const subreddits = selectedPool.length ? selectedPool : categorySubreddits(categoryKey);
      if (previous && subreddits.includes(previous)) return previous;
      return subreddits[Math.floor(Math.random() * subreddits.length)] || "gooninghentai";
    }

    function goonerCategoryForSubreddit(subreddit = "") {
      const normalized = String(subreddit || "").toLowerCase();
      const match = Object.entries(GOONER_GALLERY_CATEGORIES)
        .filter(([key]) => key !== "mixed")
        .find(([, category]) => category.subreddits.includes(normalized));
      return match ? match[0] : "captions";
    }

    function goonerPageLabelForSubreddit(subreddit = "") {
      const normalized = String(subreddit || "").toLowerCase();
      return goonerRedditPages().find((page) => page.subreddit === normalized)?.label || "";
    }

    function labelForCustomSubreddit(subreddit = "") {
      return `r/${String(subreddit || "").replace(/_/g, " ")}`;
    }

    function parseCustomRedditSubreddit(value = "") {
      const raw = String(value || "").trim();
      if (!raw) return "";
      const match = raw.match(/(?:^|[/.])r\/([a-z0-9_]{2,32})(?:[/?#]|$)/i);
      const bare = raw.replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/^old\./i, "");
      const subreddit = match
        ? match[1]
        : bare.replace(/^reddit\.com\/r\//i, "").replace(/^peekstr\.com\/r\//i, "").replace(/^r\//i, "").split(/[/?#]/)[0];
      return String(subreddit || "").toLowerCase().replace(/[^a-z0-9_]+/g, "").slice(0, 32);
    }

    function compactRedditName(value = "") {
      return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
    }

    function compactCount(value = 0) {
      const number = Number(value || 0);
      if (!Number.isFinite(number) || number <= 0) return "";
      if (number >= 1000000) return `${(number / 1000000).toFixed(number >= 10000000 ? 0 : 1).replace(/\.0$/, "")}m`;
      if (number >= 1000) return `${(number / 1000).toFixed(number >= 10000 ? 0 : 1).replace(/\.0$/, "")}k`;
      return String(Math.round(number));
    }

    function redditNameDistance(a = "", b = "") {
      const left = compactRedditName(a);
      const right = compactRedditName(b);
      if (!left || !right) return 99;
      const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
      for (let i = 1; i <= left.length; i += 1) {
        const current = [i];
        for (let j = 1; j <= right.length; j += 1) {
          const cost = left[i - 1] === right[j - 1] ? 0 : 1;
          current[j] = Math.min(current[j - 1] + 1, previous[j] + 1, previous[j - 1] + cost);
        }
        previous.splice(0, previous.length, ...current);
      }
      return previous[right.length];
    }

    function knownRedditPageSuggestions(query = "") {
      const normalized = parseCustomRedditSubreddit(query);
      if (!normalized) return [];
      const maxDistance = Math.max(3, Math.floor(normalized.length / 3));
      return goonerRedditPages()
        .map((page) => ({
          subreddit: page.subreddit,
          label: page.label,
          score: Math.min(redditNameDistance(normalized, page.subreddit), redditNameDistance(normalized, page.label))
        }))
        .filter((page) => page.score <= maxDistance)
        .sort((a, b) => a.score - b.score || a.label.localeCompare(b.label))
        .slice(0, 4);
    }

    function dedupeRedditSuggestions(items = []) {
      const seen = new Set();
      return items
        .map((item) => {
          const subreddit = parseCustomRedditSubreddit(item && item.subreddit);
          if (!subreddit || seen.has(subreddit)) return null;
          seen.add(subreddit);
          return {
            subreddit,
            label: String(item && item.label || labelForCustomSubreddit(subreddit)).replace(/\s+/g, " ").trim().slice(0, 48),
            members: Number(item && item.members || 0) || 0
          };
        })
        .filter(Boolean)
        .slice(0, 6);
    }

    function renderCustomRedditSuggestions(items = []) {
      if (!els.customRedditSuggestions) return;
      const suggestions = dedupeRedditSuggestions(items);
      els.customRedditSuggestions.classList.toggle("hidden", !suggestions.length);
      els.customRedditSuggestions.innerHTML = suggestions.map((item) => {
        const members = item.members > 0 ? `<small>${compactCount(item.members)} members</small>` : "";
        return `
          <button type="button" class="reddit-suggestion-chip" data-custom-reddit-suggestion="${escapeHtml(item.subreddit)}">
            <span>${escapeHtml(item.label)}</span>
            ${members}
          </button>
        `;
      }).join("");
    }

    async function fetchCustomRedditSuggestions(subreddit = "") {
      const normalized = parseCustomRedditSubreddit(subreddit);
      const known = knownRedditPageSuggestions(normalized);
      if (!normalized) return known;
      try {
        const params = new URLSearchParams({ query: normalized, limit: "6" });
        const response = await fetch(`/api/reddit-subreddit-suggestions?${params.toString()}`);
        const data = await response.json().catch(() => ({}));
        if (!response.ok) return known;
        return dedupeRedditSuggestions([...(Array.isArray(data.items) ? data.items : []), ...known]);
      } catch (error) {
        return known;
      }
    }

    function brattyLocalGalleryPrefsKey() {
      return "tribute-arcade:bratty-bb:local-gallery-prefs:v1";
    }

    function brattyLocalGalleryPrefsAllowed() {
      const easterEgg = activeNameEasterEgg();
      if (!easterEgg || easterEgg.id !== "brattyBb") return false;
      const localKnownSubNames = new Set(["musk", "musky", "dusk", "dusky"]);
      const seat = localSeat();
      const setupRole = state.online.room && seat && state.online.roleChoices ? state.online.roleChoices[seat] : null;
      const role = setupRole || localOnlineRole();
      if (state.online.room) {
        if (role === SUB) return true;
        const localName = seat && state.online.playerNames ? state.online.playerNames[seat] : "";
        return localKnownSubNames.has(normalizedNameKey(localName));
      }
      return localKnownSubNames.has(normalizedNameKey(state.names.sub));
    }

    function serializeBrattyLocalGalleryPrefs() {
      return {
        customPages: localCustomGoonerRedditPages.map((page) => ({
          subreddit: page.subreddit,
          label: page.label
        })),
        goonerGalleryCategory: state.settings.goonerGalleryCategory,
        goonerGallerySubreddits: normalizeRedditPageSelection(state.settings.goonerGallerySubreddits),
        redditeryAutoPopupSource: state.settings.redditeryAutoPopupSource,
        redditeryAutoPopupCategory: state.settings.redditeryAutoPopupCategory,
        redditeryAutoPopupSubreddits: normalizeRedditPageSelection(state.settings.redditeryAutoPopupSubreddits),
        redditeryAutoPopupDuration: normalizeDistractionDuration(state.settings.redditeryAutoPopupDuration),
        redditeryAutoPopupInterval: normalizeAutoPopupInterval(state.settings.redditeryAutoPopupInterval),
        booruDateFilter: normalizeBooruDateFilter(state.settings.booruDateFilter),
        booruAutoPopupFullVideos: Boolean(state.settings.booruAutoPopupFullVideos),
        danbooruCustomTag: String(localDanbooruCustomTag || ""),
        danbooruIncludeVideos: Boolean(localDanbooruIncludeVideos),
        danbooruUnmuteVideos: Boolean(localDanbooruUnmuteVideos)
      };
    }

    function saveBrattyLocalGalleryPrefs() {
      if (localBrattyGalleryPrefsSaving || !brattyLocalGalleryPrefsAllowed()) return;
      try {
        window.localStorage.setItem(brattyLocalGalleryPrefsKey(), JSON.stringify(serializeBrattyLocalGalleryPrefs()));
      } catch (error) {
        // Browser storage can be disabled; the app still works without persistence.
      }
    }

    function loadBrattyLocalGalleryPrefs() {
      if (localBrattyGalleryPrefsLoaded || !brattyLocalGalleryPrefsAllowed()) return;
      localBrattyGalleryPrefsLoaded = true;
      let parsed = null;
      try {
        parsed = JSON.parse(window.localStorage.getItem(brattyLocalGalleryPrefsKey()) || "null");
      } catch (error) {
        parsed = null;
      }
      if (!parsed || typeof parsed !== "object") return;
      localBrattyGalleryPrefsSaving = true;
      const customPages = Array.isArray(parsed.customPages) ? parsed.customPages : [];
      localCustomGoonerRedditPages = customPages
        .map((page) => {
          const subreddit = parseCustomRedditSubreddit(page && (page.subreddit || page.url || page.label));
          if (!subreddit) return null;
          return {
            subreddit,
            label: String(page && page.label || labelForCustomSubreddit(subreddit)).slice(0, 48),
            category: "custom",
            custom: true
          };
        })
        .filter(Boolean);
      state.settings.goonerGalleryCategory = GOONER_GALLERY_CATEGORIES[String(parsed.goonerGalleryCategory || "").toLowerCase()]
        ? String(parsed.goonerGalleryCategory || "").toLowerCase()
        : state.settings.goonerGalleryCategory;
      state.settings.goonerGallerySubreddits = normalizeRedditPageSelection(parsed.goonerGallerySubreddits);
      state.settings.redditeryAutoPopupSource = parsed.redditeryAutoPopupSource === "reddit" ? "reddit" : "booru";
      state.settings.redditeryAutoPopupCategory = GOONER_GALLERY_CATEGORIES[String(parsed.redditeryAutoPopupCategory || "").toLowerCase()]
        ? String(parsed.redditeryAutoPopupCategory || "").toLowerCase()
        : state.settings.redditeryAutoPopupCategory;
      state.settings.redditeryAutoPopupSubreddits = normalizeRedditPageSelection(parsed.redditeryAutoPopupSubreddits);
      state.settings.redditeryAutoPopupDuration = normalizeDistractionDuration(parsed.redditeryAutoPopupDuration);
      state.settings.redditeryAutoPopupInterval = normalizeAutoPopupInterval(parsed.redditeryAutoPopupInterval);
      state.settings.booruDateFilter = normalizeBooruDateFilter(parsed.booruDateFilter);
      state.settings.booruAutoPopupFullVideos = Boolean(parsed.booruAutoPopupFullVideos);
      localDanbooruCustomTag = String(parsed.danbooruCustomTag || "").trim();
      localDanbooruIncludeVideos = Boolean(parsed.danbooruIncludeVideos);
      localDanbooruUnmuteVideos = Boolean(parsed.danbooruUnmuteVideos);
      localBrattyGalleryPrefsSaving = false;
      resetGoonerFeedCursors();
      resetAutoPopupFeedCursors();
    }

    async function validateCustomRedditPage(subreddit = "") {
      const normalized = parseCustomRedditSubreddit(subreddit);
      if (!normalized) return false;
      const params = new URLSearchParams({
        source: "peekstr",
        subreddit: normalized,
        limit: "4",
        page: "0",
        window: "1",
        nonce: String(Date.now())
      });
      const response = await fetch(`/api/redditery-gallery?${params.toString()}`);
      const data = await response.json().catch(() => ({}));
      if (!response.ok) return false;
      return Array.isArray(data.items) && data.items.some((item) => item && normalizeDistractionSource(item.url));
    }

    async function addCustomGoonerRedditPage() {
      if (!galleryControlsAllowed()) return;
      const subreddit = parseCustomRedditSubreddit(els.customRedditPageInput && els.customRedditPageInput.value);
      if (!subreddit || subreddit.length < 2) {
        if (els.customRedditPageStatus) els.customRedditPageStatus.textContent = "Paste a Reddit or Peekstr /r/name URL first.";
        return;
      }
      const existingPages = goonerRedditPages();
      const existing = existingPages.find((page) => page.subreddit === subreddit);
      renderCustomRedditSuggestions([]);
      if (!existing) {
        if (els.addCustomRedditPageBtn) els.addCustomRedditPageBtn.disabled = true;
        if (els.customRedditPageStatus) els.customRedditPageStatus.textContent = `Checking r/${subreddit}...`;
        let valid = false;
        try {
          valid = await validateCustomRedditPage(subreddit);
        } catch (error) {
          valid = false;
        } finally {
          if (els.addCustomRedditPageBtn) els.addCustomRedditPageBtn.disabled = !galleryControlsAllowed();
        }
        if (!valid) {
          if (els.customRedditPageStatus) els.customRedditPageStatus.textContent = `Couldn't find usable images from r/${subreddit}. Looking for similar pages...`;
          const suggestions = await fetchCustomRedditSuggestions(subreddit);
          renderCustomRedditSuggestions(suggestions);
          if (els.customRedditPageStatus) {
            els.customRedditPageStatus.textContent = suggestions.length
              ? `Couldn't add r/${subreddit}. Try one of these instead.`
              : `Couldn't find usable images from r/${subreddit}. It was not added.`;
          }
          return;
        }
        localCustomGoonerRedditPages = [
          { subreddit, label: labelForCustomSubreddit(subreddit), category: "custom", custom: true },
          ...localCustomGoonerRedditPages.filter((page) => page.subreddit !== subreddit)
        ];
      }
      updateSettings({
        goonerGallerySubreddits: normalizeRedditPageSelection([
          subreddit,
          ...redditSelectionForScope("gallery")
        ])
      });
      resetGoonerFeedCursors();
      if (els.customRedditPageInput) els.customRedditPageInput.value = "";
      renderCustomRedditSuggestions([]);
      renderRedditeryGallery();
      syncGoonerGalleryCategoryControls();
      updateRedditeryRandomButton();
      updateRedditeryAutoPopupStatus();
      if (els.customRedditPageStatus) {
        els.customRedditPageStatus.textContent = `${existing ? existing.label : labelForCustomSubreddit(subreddit)} added to this session.`;
      }
      if (els.sideDistractionStatus) {
        els.sideDistractionStatus.textContent = `${redditSelectionLabel("gallery")} selected. Press Show Results to load images.`;
      }
    }

    function removeCustomGoonerRedditPage(subreddit = "") {
      if (!galleryControlsAllowed()) return;
      const normalized = String(subreddit || "").toLowerCase();
      const page = localCustomGoonerRedditPages.find((item) => item.subreddit === normalized);
      if (!page) return;
      localCustomGoonerRedditPages = localCustomGoonerRedditPages.filter((item) => item.subreddit !== normalized);
      updateSettings({
        goonerGallerySubreddits: redditSelectionForScope("gallery").filter((item) => item !== normalized)
      });
      resetGoonerFeedCursors();
      renderRedditeryGallery();
      syncGoonerGalleryCategoryControls();
      updateRedditeryRandomButton();
      updateRedditeryAutoPopupStatus();
      if (els.customRedditPageStatus) els.customRedditPageStatus.textContent = `${page.label} removed.`;
      if (els.sideDistractionStatus) {
        els.sideDistractionStatus.textContent = `${redditSelectionLabel("gallery")} selected. Press Show Results to load images.`;
      }
    }

    function randomSnapCategoryKey(previous = "", repeatChance = 0.36) {
      const categories = Object.keys(GOONER_GALLERY_CATEGORIES).filter((key) => key !== "mixed");
      if (previous && categories.includes(previous) && Math.random() < repeatChance) return previous;
      const choices = previous ? categories.filter((key) => key !== previous) : categories;
      return choices[Math.floor(Math.random() * choices.length)] || "captions";
    }

    function resetGoonerFeedCursors() {
      localRedditeryPage = -1;
      localRedditeryAfter = "";
      localRedditeryActiveSubreddit = "";
      localRedditeryGalleryCursors = {};
      localRedditeryGalleryEnded = {};
      localRedditeryGalleryRecentUrls = [];
      localRedditeryReachedEnd = false;
      localRedditeryGalleryItems = [];
      resetAutoPopupFeedCursors();
      localMemoryMatchAfter = "";
      localMemoryMatchSubreddit = "";
      localMemoryMatchRecentUrls = [];
      localBrainDrainSnapPools = {};
      localBrainDrainSnapAfter = {};
    }

    function resetAutoPopupFeedCursors() {
      localRedditeryAutoPopupItems = [];
      localRedditeryAutoPopupAfter = "";
      localRedditeryAutoPopupCursors = {};
      localRedditeryAutoPopupSubreddit = "";
      localRedditeryAutoPopupRecentUrls = [];
      localDanbooruAutoPopupItems = [];
      localDanbooruAutoPopupPage = 0;
      localDanbooruAutoPopupKey = "";
      localDanbooruAutoPopupRecentUrls = [];
    }

    function setGoonerGalleryCategory(value) {
      const category = GOONER_GALLERY_CATEGORIES[String(value || "").toLowerCase()] ? String(value || "").toLowerCase() : "captions";
      if (category === goonerGalleryCategoryKey()) return;
      updateSettings({
        goonerGalleryCategory: category,
        goonerGallerySubreddits: categorySubreddits(category)
      });
      resetGoonerFeedCursors();
      if (localRedditeryCooldownTimer) {
        window.clearInterval(localRedditeryCooldownTimer);
        localRedditeryCooldownTimer = null;
      }
      localRedditeryCooldownUntil = 0;
      renderRedditeryGallery();
      updateRedditeryRandomButton();
      updateRedditeryAutoPopupStatus();
      if (els.sideDistractionStatus) {
        els.sideDistractionStatus.textContent = `${goonerGalleryCategoryLabel(category)} selected. Press Show Results to load images.`;
      }
    }

    function renderRedditPagePicker(container, scope = "gallery") {
      if (!container) return;
      const previousScrollTop = container.scrollTop;
      const isAuto = scope === "auto";
      const selected = new Set(redditSelectionForScope(isAuto ? "auto" : "gallery"));
      const disabled = isAuto
        ? (!redditeryAutoPopupControlAllowed() || autoPopupSourceKey() !== "reddit")
        : !galleryControlsAllowed();
      const categoryKey = isAuto ? autoPopupRedditCategoryKey() : goonerGalleryCategoryKey();
      const signature = JSON.stringify({
        scope,
        categoryKey,
        disabled,
        custom: localCustomGoonerRedditPages.map((page) => page.subreddit),
        selected: [...selected].sort()
      });
      if (container.dataset.renderSignature === signature) {
        container.classList.toggle("disabled", disabled);
        return;
      }
      container.dataset.renderSignature = signature;
      container.innerHTML = goonerRedditPages().map((page) => {
        const checked = selected.has(page.subreddit) ? " checked" : "";
        const disabledAttr = disabled ? " disabled" : "";
        const pageCategories = redditPageCategories(page);
        const categoryLabel = page.custom
          ? "Custom"
          : pageCategories.map((category) => goonerGalleryCategoryLabel(category)).join(" / ");
        const presetClass = categoryKey === "mixed" || pageCategories.includes(categoryKey) ? " in-preset" : "";
        const customClass = page.custom ? " custom" : "";
        const removeButton = page.custom && scope === "gallery"
          ? `<button type="button" class="reddit-page-remove" data-remove-custom-reddit-page="${escapeHtml(page.subreddit)}"${disabledAttr} title="Remove ${escapeHtml(page.label)}">Remove</button>`
          : "";
        return `
          <label class="reddit-page-option${presetClass}${customClass}">
            <input type="checkbox" data-reddit-page-scope="${scope}" value="${escapeHtml(page.subreddit)}"${checked}${disabledAttr}>
            <span>
              <strong>${escapeHtml(page.label)}</strong>
              <small>${escapeHtml(categoryLabel)}</small>
            </span>
            ${removeButton}
          </label>
        `;
      }).join("");
      container.classList.toggle("disabled", disabled);
      container.scrollTop = previousScrollTop;
      window.requestAnimationFrame(() => {
        container.scrollTop = previousScrollTop;
      });
    }

    function syncRedditPagePickers() {
      renderRedditPagePicker(els.goonerGallerySourcePicker, "gallery");
      renderRedditPagePicker(els.redditeryAutoPopupSourcePicker, "auto");
      renderRedditPagePicker(els.soloRedditerySourcePicker, "auto");
    }

    function handleRedditPagePickerChange(event, scope = "gallery") {
      const input = event.target.closest("input[data-reddit-page-scope]");
      if (!input) return;
      const container = input.closest(".reddit-page-picker");
      if (!container) return;
      const selected = [...container.querySelectorAll("input[data-reddit-page-scope]:checked")]
        .map((item) => item.value);
      if (scope === "auto") {
        resetAutoPopupFeedCursors();
        if (subGalleryPrivateMode() && container === els.redditeryAutoPopupSourcePicker && !sharedAutoPopupActive()) {
          localSubDistractions.redditeryAutoPopupSubreddits = normalizeRedditPageSelection(selected);
          if (localSubDistractions.redditeryAutoPopup) scheduleNextRedditeryAutoPopup();
          else updateRedditeryAutoPopupStatus();
          return;
        }
        updateSettings({ redditeryAutoPopupSubreddits: normalizeRedditPageSelection(selected) });
        if (sharedAutoPopupActive()) scheduleNextRedditeryAutoPopup();
        else updateRedditeryAutoPopupStatus();
        return;
      }
      updateSettings({ goonerGallerySubreddits: normalizeRedditPageSelection(selected) });
      resetGoonerFeedCursors();
      renderRedditeryGallery();
      updateRedditeryRandomButton();
      updateRedditeryAutoPopupStatus();
      if (els.sideDistractionStatus) {
        els.sideDistractionStatus.textContent = `${redditSelectionLabel("gallery")} selected. Press Show Results to load images.`;
      }
    }

    function syncGoonerGalleryCategoryControls() {
      loadBrattyLocalGalleryPrefs();
      [els.goonerGalleryCategory, els.soloGoonerGalleryCategory].forEach((select) => {
        if (!select || document.activeElement === select) return;
        select.value = goonerGalleryCategoryKey();
      });
      if (els.goonerGalleryCategory) els.goonerGalleryCategory.disabled = !galleryControlsAllowed();
      if (els.soloGoonerGalleryCategory) {
        const soloAllowed = (state.screen === "select" && ["solitaire", "memoryMatch"].includes(state.currentGame)) || ["solitaire", "memoryMatch"].includes(state.screen);
        els.soloGoonerGalleryCategory.disabled = !soloAllowed;
      }
      const gallerySelection = redditSelectionForScope("gallery");
      if (els.goonerGallerySelectionSummary) {
        els.goonerGallerySelectionSummary.textContent = gallerySelection.length
          ? `${gallerySelection.length} page${gallerySelection.length === 1 ? "" : "s"} selected`
          : "No pages selected";
      }
      if (els.customRedditPageInput) els.customRedditPageInput.disabled = !galleryControlsAllowed();
      if (els.addCustomRedditPageBtn) els.addCustomRedditPageBtn.disabled = !galleryControlsAllowed();
      syncRedditPagePickers();
    }

    function syncAutoPopupSourceControls() {
      const source = autoPopupSourceKey();
      const category = autoPopupRedditCategoryKey();
      const domAllowed = domLinkControlsAllowed();
      const sideAutoAllowed = galleryControlsAllowed() && !(subGalleryPrivateMode() && state.settings.redditeryAutoPopup);
      const soloAllowed = soloAutoPopupControlsAllowed();
      [els.redditeryAutoPopupSource, els.soloRedditeryAutoPopupSource].forEach((select) => {
        if (!select || document.activeElement === select) return;
        select.value = source;
      });
      [els.redditeryAutoPopupCategory, els.soloRedditeryAutoPopupCategory].forEach((select) => {
        if (!select || document.activeElement === select) return;
        select.value = category;
      });
      if (els.redditeryAutoPopupSource) els.redditeryAutoPopupSource.disabled = !sideAutoAllowed;
      if (els.redditeryAutoPopupCategory) els.redditeryAutoPopupCategory.disabled = !sideAutoAllowed || source !== "reddit";
      if (els.redditeryAutoPopupCategoryRow) els.redditeryAutoPopupCategoryRow.classList.toggle("hidden", source !== "reddit");
      if (els.redditeryAutoPopupSourcePicker) els.redditeryAutoPopupSourcePicker.classList.toggle("hidden", source !== "reddit");
      if (els.booruAutoPopupTagRow) els.booruAutoPopupTagRow.classList.toggle("hidden", source !== "booru");
      if (els.autoDanbooruTagInput) {
        els.autoDanbooruTagInput.disabled = !sideAutoAllowed || source !== "booru";
        if (document.activeElement !== els.autoDanbooruTagInput) {
          els.autoDanbooruTagInput.value = localDanbooruCustomTag || "";
        }
      }
      if (els.autoDanbooruSuggestions && source !== "booru") {
        els.autoDanbooruSuggestions.classList.add("hidden");
        els.autoDanbooruSuggestions.innerHTML = "";
      }
      if (els.booruAutoPopupVideoRow) els.booruAutoPopupVideoRow.classList.toggle("hidden", source !== "booru");
      if (els.booruDateFilterRow) els.booruDateFilterRow.classList.toggle("hidden", source !== "booru");
      if (els.soloRedditeryAutoPopupSource) els.soloRedditeryAutoPopupSource.disabled = !soloAllowed;
      if (els.soloRedditeryAutoPopupCategory) els.soloRedditeryAutoPopupCategory.disabled = !soloAllowed || source !== "reddit";
      if (els.soloRedditeryAutoPopupCategoryRow) els.soloRedditeryAutoPopupCategoryRow.classList.toggle("hidden", source !== "reddit");
      if (els.soloRedditerySourcePicker) els.soloRedditerySourcePicker.classList.toggle("hidden", source !== "reddit");
      if (els.soloBooruAutoPopupTagRow) els.soloBooruAutoPopupTagRow.classList.toggle("hidden", source !== "booru");
      if (els.soloBooruAutoPopupVideoRow) els.soloBooruAutoPopupVideoRow.classList.toggle("hidden", source !== "booru");
      if (els.soloBooruDateFilterRow) els.soloBooruDateFilterRow.classList.toggle("hidden", source !== "booru");
      if (els.soloDanbooruSuggestions && source !== "booru") {
        els.soloDanbooruSuggestions.classList.add("hidden");
        els.soloDanbooruSuggestions.innerHTML = "";
      }
      if (els.soloDanbooruTagInput) {
        els.soloDanbooruTagInput.disabled = !soloAllowed || source !== "booru";
        if (document.activeElement !== els.soloDanbooruTagInput) {
          els.soloDanbooruTagInput.value = localDanbooruCustomTag || "";
        }
      }
      syncRedditPagePickers();
    }

    function goonerGallerySourceLabel(source = goonerGallerySource()) {
      const sourceLabel = source === "redditery" ? "Redditery" : "Peekstr";
      return `${redditSelectionLabel("gallery")} ${sourceLabel}`;
    }

    function shuffledGalleryItems(items) {
      const list = Array.isArray(items) ? items.slice() : [];
      for (let index = list.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [list[index], list[swapIndex]] = [list[swapIndex], list[index]];
      }
      return list;
    }

    async function loadBooruGallery(source = "gelbooru") {
      if (!galleryControlsAllowed() || localBooruGalleryLoading) return;
      const safeSource = source === "hgoon" ? "hgoon" : "gelbooru";
      localBooruGalleryLoading = true;
      if (els.booruLoadButtons) els.booruLoadButtons.forEach((button) => button.disabled = true);
      els.sideDistractionStatus.textContent = `Loading ${safeSource === "hgoon" ? "Hgoon" : "Gelbooru"} test gallery...`;
      try {
        const response = await fetch(`/api/booru-gallery?source=${encodeURIComponent(safeSource)}&tags=feet%20sort%3Ascore&limit=16`);
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || "Booru gallery failed.");
        localBooruGalleryItems = Array.isArray(data.items)
          ? data.items.filter((item) => item && normalizeDistractionSource(item.url)).slice(0, 16)
          : [];
        els.sideDistractionStatus.textContent = localBooruGalleryItems.length
          ? `Loaded ${localBooruGalleryItems.length} ${safeSource === "hgoon" ? "Hgoon" : "Gelbooru"} result${localBooruGalleryItems.length === 1 ? "" : "s"}. Pick one, then choose display mode and Post.`
          : `No usable ${safeSource === "hgoon" ? "Hgoon" : "Gelbooru"} image URLs came back for feet sort:score.`;
      } catch (error) {
        localBooruGalleryItems = [];
        els.sideDistractionStatus.textContent = String(error && error.message || "Booru gallery failed.");
      } finally {
        localBooruGalleryLoading = false;
        if (els.booruLoadButtons) {
          els.booruLoadButtons.forEach((button) => {
            button.disabled = !galleryControlsAllowed();
          });
        }
        renderBooruGallery();
      }
    }

    async function loadDanbooruGallery(options = {}) {
      if (!galleryControlsAllowed() || localDanbooruGalleryLoading) return;
      const selectedCategory = String(els.danbooruGalleryCategory && els.danbooruGalleryCategory.value || localDanbooruCategory || "feet").toLowerCase();
      const customTag = String(options.tag || (options.next ? localDanbooruCustomTag : "") || "").trim();
      const nextPage = options.next ? localDanbooruPage + 1 : 1;
      localDanbooruGalleryLoading = true;
      localDanbooruCategory = selectedCategory;
      localDanbooruCustomTag = customTag;
      localDanbooruPage = nextPage;
      if (els.danbooruLoadBtn) els.danbooruLoadBtn.disabled = true;
      if (els.danbooruNextBtn) els.danbooruNextBtn.disabled = true;
      if (els.danbooruGalleryStatus) {
        els.danbooruGalleryStatus.textContent = customTag
          ? `Loading Booru tag ${customTag} page ${nextPage}...`
          : `Loading ${danbooruCategoryLabel(selectedCategory)} Booru page ${nextPage}...`;
      }
      try {
        const params = new URLSearchParams({
          category: selectedCategory,
          page: String(nextPage),
          limit: "18",
          nonce: String(Date.now())
        });
        if (customTag) params.set("tag", customTag);
        if (localDanbooruIncludeVideos) params.set("includeVideos", "true");
        params.set("dateFilter", normalizeBooruDateFilter(galleryEffectSettings().booruDateFilter || state.settings.booruDateFilter));
        const response = await fetch(`/api/danbooru-gallery?${params.toString()}`);
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || "Booru gallery failed.");
        localDanbooruGalleryItems = Array.isArray(data.items)
          ? data.items.filter((item) => item && normalizeDistractionSource(item.url)).slice(0, 18)
          : [];
        if (els.danbooruGalleryStatus) {
          els.danbooruGalleryStatus.textContent = localDanbooruGalleryItems.length
            ? `Loaded ${localDanbooruGalleryItems.length} Booru result${localDanbooruGalleryItems.length === 1 ? "" : "s"} for ${data.tags || danbooruCategoryLabel(selectedCategory)} (${booruDateFilterLabel(data.dateFilter)}).`
            : `No usable Booru images came back for ${data.tags || danbooruCategoryLabel(selectedCategory)} (${booruDateFilterLabel(data.dateFilter)}).`;
        }
      } catch (error) {
        localDanbooruGalleryItems = [];
        if (els.danbooruGalleryStatus) els.danbooruGalleryStatus.textContent = String(error && error.message || "Booru gallery failed.");
      } finally {
        localDanbooruGalleryLoading = false;
        const canUse = galleryControlsAllowed();
        if (els.danbooruLoadBtn) els.danbooruLoadBtn.disabled = !canUse;
        if (els.danbooruNextBtn) els.danbooruNextBtn.disabled = !canUse;
        renderDanbooruGallery();
      }
    }

    async function loadDanbooruSuggestions(query) {
      const normalized = String(query || "").trim();
      const canSuggest = galleryControlsAllowed() || soloAutoPopupControlsAllowed();
      if (!canSuggest || normalized.length < 2) {
        localDanbooruSuggestions = [];
        renderDanbooruSuggestions();
        return;
      }
      localDanbooruSuggesting = true;
      if (els.danbooruGalleryStatus) els.danbooruGalleryStatus.textContent = `Finding Booru tags for ${normalized}...`;
      try {
        const params = new URLSearchParams({ query: normalized, limit: "10", nonce: String(Date.now()) });
        const response = await fetch(`/api/danbooru-autocomplete?${params.toString()}`);
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || "Booru suggestions failed.");
        localDanbooruSuggestions = Array.isArray(data.items) ? data.items : [];
        if (els.danbooruGalleryStatus) {
          els.danbooruGalleryStatus.textContent = localDanbooruSuggestions.length
            ? `Pick a Booru tag for ${normalized}.`
            : `No Booru tag suggestions found for ${normalized}.`;
        }
      } catch (error) {
        localDanbooruSuggestions = [];
        if (els.danbooruGalleryStatus) els.danbooruGalleryStatus.textContent = String(error && error.message || "Booru suggestions failed.");
      } finally {
        localDanbooruSuggesting = false;
        renderDanbooruSuggestions();
      }
    }

    function queueDanbooruSuggestions(input = els.danbooruTagInput) {
      if (localDanbooruSuggestTimer) window.clearTimeout(localDanbooruSuggestTimer);
      localDanbooruSuggestTimer = window.setTimeout(() => {
        loadDanbooruSuggestions(input && input.value);
      }, 280);
    }

    function selectDanbooruSuggestion(index, target = "gallery") {
      const item = localDanbooruSuggestions[Number(index)];
      const tag = item && String(item.value || "").trim();
      if (!tag) return;
      if (els.danbooruTagInput) els.danbooruTagInput.value = tag;
      if (els.autoDanbooruTagInput) els.autoDanbooruTagInput.value = tag;
      if (els.soloDanbooruTagInput) els.soloDanbooruTagInput.value = tag;
      localDanbooruCustomTag = tag;
      localDanbooruSuggestions = [];
      renderDanbooruSuggestions();
      resetAutoPopupFeedCursors();
      saveBrattyLocalGalleryPrefs();
      if (target === "solo" || target === "auto") {
        updateRedditeryAutoPopupStatus();
        if (sharedAutoPopupActive()) scheduleNextRedditeryAutoPopup();
        return;
      }
      loadDanbooruGallery({ tag, next: false });
    }

    function selectDanbooruGalleryImage(index) {
      if (!galleryControlsAllowed()) return;
      const item = localDanbooruGalleryItems[Number(index)];
      const url = item && normalizeDistractionSource(item.url);
      if (!url) return;
      const media = {
        mediaType: mediaTypeForDistraction(url, item.mediaType),
        previewUrl: normalizeDistractionSource(item.previewUrl || ""),
        muted: !localDanbooruUnmuteVideos
      };
      els.sideDistractionInput.value = url;
      rememberDistractionImage(url, { ...media, targetSettings: galleryEffectSettings() });
      if (els.sideDistractionStatus) els.sideDistractionStatus.textContent = `Booru ${media.mediaType} selected and saved.`;
      openDistractionChoice(url, `How should this Booru ${media.mediaType} appear?`, media);
      renderDanbooruGallery();
      renderDistractionGallery();
    }

    function selectBooruGalleryImage(index) {
      if (!galleryControlsAllowed()) return;
      const item = localBooruGalleryItems[Number(index)];
      const url = item && normalizeDistractionSource(item.url);
      if (!url) return;
      els.sideDistractionInput.value = url;
      els.sideDistractionStatus.textContent = "Booru image selected. Choose display mode, then Post.";
      renderBooruGallery();
    }

    async function loadRandomRedditeryImage() {
      if (!galleryControlsAllowed() || localRedditeryGalleryLoading) return;
      localRedditeryGalleryLoading = true;
      updateRedditeryRandomButton();
      els.sideDistractionStatus.textContent = `Loading recent ${goonerGallerySourceLabel()} images...`;
      try {
        const items = await fetchRedditeryGalleryResults();
        if (!items.length) return;
        els.sideDistractionStatus.textContent = `Loaded ${items.length} ${goonerGallerySourceLabel()} image${items.length === 1 ? "" : "s"}. Pick one to choose how it appears.`;
      } catch (error) {
        localRedditeryGalleryItems = [];
        els.sideDistractionStatus.textContent = String(error && error.message || `${goonerGallerySourceLabel()} gallery failed.`);
      } finally {
        localRedditeryGalleryLoading = false;
        updateRedditeryRandomButton();
        renderRedditeryGallery();
      }
    }

    function interleaveGalleryBatches(batches, limit = 24) {
      const queues = shuffledGalleryItems(batches.filter((batch) => Array.isArray(batch) && batch.length).map((batch) => [...batch]));
      const mixed = [];
      while (queues.length && mixed.length < limit) {
        for (let index = queues.length - 1; index >= 0 && mixed.length < limit; index -= 1) {
          const queue = queues[index];
          const next = queue.shift();
          if (next) mixed.push(next);
          if (!queue.length) queues.splice(index, 1);
        }
      }
      return shuffledGalleryItems(mixed).slice(0, limit);
    }

    async function fetchRedditeryGalleryResults() {
      const source = goonerGallerySource();
      const subredditPool = redditSelectionForScope("gallery");
      if (!subredditPool.length) {
        if (els.sideDistractionStatus) els.sideDistractionStatus.textContent = "Pick at least one Reddit page first.";
        localRedditeryGalleryItems = [];
        renderRedditeryGallery();
        return [];
      }
      const nextPage = Math.min(30, Math.max(0, localRedditeryPage + 1));
      const perPageLimit = Math.max(4, Math.min(12, Math.ceil(24 / Math.max(1, subredditPool.length))));
      const activePool = subredditPool.filter((subreddit) => !localRedditeryGalleryEnded[subreddit]);
      if (!activePool.length) {
        localRedditeryReachedEnd = true;
        updateRedditeryRandomButton();
        if (els.sideDistractionStatus) els.sideDistractionStatus.textContent = "No more Reddit results found for the selected pages.";
        return [];
      }
      const recent = new Set(localRedditeryGalleryRecentUrls);
      const batches = await Promise.all(activePool.map(async (subreddit) => {
        const after = String(localRedditeryGalleryCursors[subreddit] || "");
        const params = new URLSearchParams({
          source,
          subreddit,
          limit: String(perPageLimit),
          page: String(after ? 0 : nextPage),
          window: source === "peekstr" ? "4" : "1",
          nonce: String(Date.now())
        });
        if (after) params.set("after", after);
        const response = await fetch(`/api/redditery-gallery?${params.toString()}`);
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          localRedditeryGalleryEnded[subreddit] = true;
          return [];
        }
        localRedditeryGalleryCursors[subreddit] = String(data.after || "");
        if (!data.after) localRedditeryGalleryEnded[subreddit] = true;
        const items = Array.isArray(data.items)
          ? shuffledGalleryItems(data.items
            .filter((item) => item && normalizeDistractionSource(item.url))
            .map((item) => ({
              ...item,
              subreddit: String(item.subreddit || subreddit || "").toLowerCase(),
              source: String(item.source || item.subreddit || subreddit || "").toLowerCase(),
              sourceLabel: goonerPageLabelForSubreddit(item.subreddit || subreddit)
            }))
            .filter((item) => !recent.has(normalizeDistractionSource(item.url)))).slice(0, perPageLimit)
          : [];
        return items;
      }));
      const items = interleaveGalleryBatches(batches, 24);
      if (!items.length) {
        localRedditeryReachedEnd = activePool.every((subreddit) => localRedditeryGalleryEnded[subreddit]);
        localRedditeryGalleryItems = [];
        renderRedditeryGallery();
        if (els.sideDistractionStatus) {
          els.sideDistractionStatus.textContent = localRedditeryReachedEnd
            ? "No more Reddit results found for the selected pages."
            : `${goonerGallerySourceLabel(source)} returned no new usable images. Press ${localRedditeryPage >= 0 ? "Load More" : "Show Results"} again to keep searching.`;
        }
        return [];
      }
      localRedditeryPage = nextPage;
      localRedditeryAfter = "";
      localRedditeryActiveSubreddit = "";
      localRedditeryReachedEnd = subredditPool.every((subreddit) => localRedditeryGalleryEnded[subreddit]);
      localRedditeryGalleryItems = items;
      localRedditeryGalleryRecentUrls = [
        ...items.map((item) => normalizeDistractionSource(item.url)).filter(Boolean),
        ...localRedditeryGalleryRecentUrls
      ].filter((url, index, urls) => urls.indexOf(url) === index).slice(0, 160);
      renderRedditeryGallery();
      return items;
    }

    async function fetchRedditeryItems(updateGallery = false, options = {}) {
      const source = goonerGallerySource();
      const auto = Boolean(options && options.auto);
      const categoryKey = options && options.category ? String(options.category).toLowerCase() : goonerGalleryCategoryKey();
      const subredditPool = auto ? redditSelectionForScope("auto") : redditSelectionForScope("gallery");
      if (!subredditPool.length) {
        if (els.sideDistractionStatus) els.sideDistractionStatus.textContent = "Pick at least one Reddit page first.";
        return [];
      }
      const forcedSubreddit = normalizeRedditPageSelection([options && options.subreddit]).find((subreddit) => subredditPool.includes(subreddit)) || "";
      const activeSubreddit = auto
        ? (forcedSubreddit || pickGoonerSubreddit(localRedditeryAutoPopupSubreddit, categoryKey, subredditPool))
        : pickGoonerSubreddit(localRedditeryActiveSubreddit, categoryKey, subredditPool);
      const hasAutoCursor = auto && Object.prototype.hasOwnProperty.call(localRedditeryAutoPopupCursors, activeSubreddit);
      const after = auto
        ? String(hasAutoCursor ? localRedditeryAutoPopupCursors[activeSubreddit] : localRedditeryAutoPopupAfter || "")
        : localRedditeryAfter;
      const nextPage = after ? 0 : Math.min(30, Math.max(0, localRedditeryPage + 1));
      const limit = Math.max(1, Math.min(24, Number(options && options.limit) || (updateGallery ? 24 : 18)));
      const params = new URLSearchParams({
        source,
        subreddit: activeSubreddit,
        limit: String(limit),
        page: String(nextPage),
        window: source === "peekstr" ? (auto ? "2" : "4") : "1",
        nonce: String(Date.now())
      });
      if (after) params.set("after", after);
      const response = await fetch(`/api/redditery-gallery?${params.toString()}`);
      const data = await response.json().catch(() => ({}));
      if (!response.ok && source === "redditery") {
        localRedditeryPage = -1;
        localRedditeryAfter = "";
        localRedditeryReachedEnd = false;
        localRedditeryAutoPopupAfter = "";
        localRedditeryAutoPopupCursors = {};
        localRedditeryAutoPopupItems = [];
        updateSettings({ goonerGallerySource: "peekstr" });
        if (els.goonerGallerySource) els.goonerGallerySource.value = "peekstr";
        if (els.sideDistractionStatus) {
          els.sideDistractionStatus.textContent = "Redditery could not load, so the gallery switched to Peekstr.";
        }
        return fetchRedditeryItems(updateGallery, options);
      }
      if (!response.ok) throw new Error(data.error || `${goonerGallerySourceLabel(source)} gallery failed.`);
      const items = Array.isArray(data.items)
        ? shuffledGalleryItems(data.items
          .filter((item) => item && normalizeDistractionSource(item.url))
          .map((item) => ({
            ...item,
            subreddit: String(item.subreddit || activeSubreddit || "").toLowerCase(),
            source: String(item.source || item.subreddit || activeSubreddit || "").toLowerCase(),
            sourceLabel: goonerPageLabelForSubreddit(item.subreddit || activeSubreddit)
          }))).slice(0, limit)
        : [];
      if (!items.length) {
        if (!auto) localRedditeryReachedEnd = true;
        if (els.sideDistractionStatus) els.sideDistractionStatus.textContent = `${goonerGallerySourceLabel(source)} returned no usable recent images.`;
        return [];
      }
      if (auto) {
        localRedditeryAutoPopupAfter = String(data.after || "");
        localRedditeryAutoPopupCursors[activeSubreddit] = String(data.after || "");
        localRedditeryAutoPopupSubreddit = activeSubreddit;
      } else {
        localRedditeryPage = after ? localRedditeryPage + 1 : (Number.isFinite(Number(data.page)) ? Number(data.page) : nextPage);
        localRedditeryAfter = String(data.after || "");
        localRedditeryActiveSubreddit = activeSubreddit;
        localRedditeryReachedEnd = !localRedditeryAfter;
      }
      if (updateGallery) {
        localRedditeryGalleryItems = items;
        renderRedditeryGallery();
      }
      return items;
    }

    function resetGoonerGalleryToTop() {
      if (!galleryControlsAllowed() || localRedditeryGalleryLoading) return;
      resetGoonerFeedCursors();
      localRedditeryCooldownUntil = 0;
      if (localRedditeryCooldownTimer) {
        window.clearInterval(localRedditeryCooldownTimer);
        localRedditeryCooldownTimer = null;
      }
      renderRedditeryGallery();
      updateRedditeryRandomButton();
      if (els.sideDistractionStatus) {
        els.sideDistractionStatus.textContent = "Reddit gallery reset to the newest images. Press Show Results to load from the top.";
      }
    }

    async function fetchRandomRedditeryItem(updateGallery = false) {
      const items = await fetchRedditeryItems(updateGallery);
      if (!items.length) return null;
      return items[Math.floor(Math.random() * items.length)];
    }

    async function takeNextRedditeryAutoPopupItem() {
      if (!localRedditeryAutoPopupItems.length) {
        const recent = new Set(localRedditeryAutoPopupRecentUrls);
        const category = autoPopupRedditCategoryKey();
        const subredditPool = shuffledGalleryItems(redditSelectionForScope("auto"));
        let freshItems = [];
        for (const subreddit of subredditPool) {
          if (freshItems.length >= 18) break;
          const batch = await fetchRedditeryItems(false, { auto: true, category, subreddit, limit: 6 });
          const unseen = batch.filter((item) => !recent.has(normalizeDistractionSource(item.url)));
          freshItems = shuffledGalleryItems([...freshItems, ...unseen]);
        }
        for (let attempt = 0; attempt < 3 && freshItems.length < 8; attempt += 1) {
          const batch = await fetchRedditeryItems(false, { auto: true, category, limit: 8 });
          const unseen = batch.filter((item) => !recent.has(normalizeDistractionSource(item.url)));
          freshItems = shuffledGalleryItems([...freshItems, ...unseen]);
        }
        localRedditeryAutoPopupItems = freshItems.length ? freshItems : await fetchRedditeryItems(false, { auto: true, category, limit: 12 });
      }
      if (!localRedditeryAutoPopupItems.length) return null;
      const index = Math.floor(Math.random() * localRedditeryAutoPopupItems.length);
      const [item] = localRedditeryAutoPopupItems.splice(index, 1);
      const url = item && normalizeDistractionSource(item.url);
      if (url) {
        localRedditeryAutoPopupRecentUrls = [
          url,
          ...localRedditeryAutoPopupRecentUrls.filter((recentUrl) => recentUrl !== url)
        ].slice(0, 48);
      }
      return item || null;
    }

    async function takeNextRapidFirePopupItem() {
      for (let attempt = 0; attempt < 6; attempt += 1) {
        const item = await takeNextAutoPopupItem();
        const url = item && normalizeDistractionSource(item.url);
        if (url && mediaTypeForDistraction(url, item.mediaType) !== "video") return item;
      }
      return null;
    }

    function currentBooruAutoPopupSearch() {
      const soloTag = String(els.soloDanbooruTagInput && els.soloDanbooruTagInput.value || "").trim();
      const autoTag = String(els.autoDanbooruTagInput && els.autoDanbooruTagInput.value || "").trim();
      const inputTag = soloAutoPopupControlsAllowed() && autoPopupSourceKey() === "booru"
        ? soloTag
        : autoTag || String(els.danbooruTagInput && els.danbooruTagInput.value || "").trim();
      const tag = inputTag || localDanbooruCustomTag || "";
      const category = String(localDanbooruCategory || (els.danbooruGalleryCategory && els.danbooruGalleryCategory.value) || "feet").toLowerCase();
      const dateFilter = normalizeBooruDateFilter(autoPopupSettings().booruDateFilter || state.settings.booruDateFilter);
      const videos = localDanbooruIncludeVideos ? "videos" : "images";
      const key = `${tag ? `tag:${tag}` : `category:${category}`}|date:${dateFilter}|${videos}`;
      return { tag, category, dateFilter, key };
    }

    async function fetchBooruAutoPopupItems() {
      const search = currentBooruAutoPopupSearch();
      if (localDanbooruAutoPopupKey !== search.key) {
        localDanbooruAutoPopupItems = [];
        localDanbooruAutoPopupPage = 0;
        localDanbooruAutoPopupRecentUrls = [];
        localDanbooruAutoPopupKey = search.key;
      }
      const page = Math.min(30, localDanbooruAutoPopupPage + 1);
      const params = new URLSearchParams({
        category: search.category,
        page: String(page),
        limit: "18",
        nonce: String(Date.now())
      });
      if (search.tag) params.set("tag", search.tag);
      if (localDanbooruIncludeVideos) params.set("includeVideos", "true");
      params.set("dateFilter", search.dateFilter);
      const response = await fetch(`/api/danbooru-gallery?${params.toString()}`);
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Booru auto popup failed.");
      localDanbooruAutoPopupPage = page;
      return Array.isArray(data.items)
        ? shuffledGalleryItems(data.items.filter((item) => item && normalizeDistractionSource(item.url))).slice(0, 18)
        : [];
    }

    async function takeNextBooruAutoPopupItem() {
      if (!localDanbooruAutoPopupItems.length) {
        const recent = new Set(localDanbooruAutoPopupRecentUrls);
        let freshItems = [];
        for (let attempt = 0; attempt < 4 && freshItems.length < 8; attempt += 1) {
          const batch = await fetchBooruAutoPopupItems();
          const unseen = batch.filter((item) => !recent.has(normalizeDistractionSource(item.url)));
          freshItems = shuffledGalleryItems([...freshItems, ...unseen]);
        }
        localDanbooruAutoPopupItems = freshItems.length ? freshItems : await fetchBooruAutoPopupItems();
      }
      if (!localDanbooruAutoPopupItems.length) return null;
      const index = Math.floor(Math.random() * localDanbooruAutoPopupItems.length);
      const [item] = localDanbooruAutoPopupItems.splice(index, 1);
      const url = item && normalizeDistractionSource(item.url);
      if (url) {
        localDanbooruAutoPopupRecentUrls = [
          url,
          ...localDanbooruAutoPopupRecentUrls.filter((recentUrl) => recentUrl !== url)
        ].slice(0, 48);
      }
      return item || null;
    }

    async function takeNextAutoPopupItem() {
      return autoPopupSourceKey() === "booru"
        ? takeNextBooruAutoPopupItem()
        : takeNextRedditeryAutoPopupItem();
    }

    function startRedditeryCooldown() {
      localRedditeryCooldownUntil = Date.now() + 60_000;
      updateRedditeryRandomButton();
      if (localRedditeryCooldownTimer) window.clearInterval(localRedditeryCooldownTimer);
      localRedditeryCooldownTimer = window.setInterval(() => {
        updateRedditeryRandomButton();
        if (Date.now() >= localRedditeryCooldownUntil) {
          window.clearInterval(localRedditeryCooldownTimer);
          localRedditeryCooldownTimer = null;
        }
      }, 1000);
    }

    function updateRedditeryRandomButton() {
      if (!els.redditeryRandomBtn) return;
      if (localRedditeryGalleryLoading) {
        els.redditeryRandomBtn.textContent = "Loading...";
        els.redditeryRandomBtn.disabled = true;
        if (els.goonerGalleryTopBtn) els.goonerGalleryTopBtn.disabled = true;
        return;
      }
      els.redditeryRandomBtn.textContent = localRedditeryReachedEnd
        ? "No More Found"
        : (localRedditeryPage >= 0 ? "Load More" : "Show Results");
      els.redditeryRandomBtn.disabled = !galleryControlsAllowed() || localRedditeryReachedEnd;
      if (els.goonerGalleryTopBtn) els.goonerGalleryTopBtn.disabled = !galleryControlsAllowed() || localRedditeryGalleryLoading || localRedditeryPage <= 0;
    }

    function scheduleNextRedditeryAutoPopup() {
      const intervalSeconds = state.settings.redditeryRapidFire ? 1 : normalizeAutoPopupInterval(autoPopupSettings().redditeryAutoPopupInterval);
      localRedditeryAutoPopupNextAt = Date.now() + intervalSeconds * 1000;
      updateRedditeryAutoPopupStatus();
    }

    function activeAutoFullVideoOverlay() {
      const source = localSubAutoPopupActive() && !activeDistractionOverlays(state.settings).length ? localSubDistractions : state.settings;
      return activeDistractionOverlays(source).find((overlay) => overlay && overlay.autoFullVideo && (overlay.mediaType === "video" || isVideoDistractionSource(overlay.url))) || null;
    }

    function redditeryAutoPopupControlAllowed() {
      const soloScreens = ["solitaire", "memoryMatch"];
      const soloMenuOpen = state.screen === "select" && ["solitaire", "memoryMatch"].includes(state.currentGame);
      return domLinkControlsAllowed() || subGalleryPrivateMode() || soloMenuOpen || soloScreens.includes(state.screen);
    }

    function redditeryAutoPopupAllowed() {
      return domLinkControlsAllowed() || subGalleryPrivateMode() || ["solitaire", "memoryMatch"].includes(state.screen);
    }

    function setRedditeryAutoPopupEnabled(enabled) {
      if (subGalleryPrivateMode() && !state.settings.redditeryAutoPopup) {
        localSubDistractions.redditeryAutoPopup = Boolean(enabled);
        if (enabled) scheduleNextRedditeryAutoPopup();
        else localRedditeryAutoPopupNextAt = 0;
        updateRedditeryAutoPopupStatus();
        renderSidePanel();
        return;
      }
      updateSettings({ redditeryAutoPopup: Boolean(enabled) });
      if (enabled) scheduleNextRedditeryAutoPopup();
      else localRedditeryAutoPopupNextAt = 0;
      updateRedditeryAutoPopupStatus();
    }

    function setRedditeryRapidFireEnabled(enabled) {
      if (!domLinkControlsAllowed()) return;
      const next = Boolean(enabled);
      const changes = { redditeryRapidFire: next };
      if (!next) {
        changes.distractionOverlays = activeDistractionOverlays(state.settings, 14).filter((overlay) => overlay && !overlay.rapidFire);
      }
      updateSettings(changes);
      localRedditeryAutoPopupNextAt = next ? Date.now() : 0;
      localRedditeryAutoPopupLoading = false;
      renderDistractionBackground();
      renderPieceLossSpiral();
      updateRedditeryAutoPopupStatus();
    }

    function updateRedditeryAutoPopupStatus() {
      const rapidFire = Boolean(state.settings.redditeryRapidFire);
      const autoEnabled = Boolean(state.settings.redditeryAutoPopup || localSubAutoPopupActive());
      const enabled = Boolean(autoEnabled || rapidFire);
      const allowed = redditeryAutoPopupControlAllowed();
      const settings = autoPopupSettings();
      syncGoonerGalleryCategoryControls();
      syncAutoPopupSourceControls();
      [
        [els.redditeryAutoPopupToggle, galleryControlsAllowed() && !(subGalleryPrivateMode() && state.settings.redditeryAutoPopup)],
        [els.soloRedditeryAutoPopupToggle, (state.screen === "select" && ["solitaire", "memoryMatch"].includes(state.currentGame)) || ["solitaire", "memoryMatch"].includes(state.screen)]
      ].forEach(([toggle, canUse]) => {
        if (!toggle) return;
        toggle.disabled = !canUse;
        toggle.classList.toggle("active", autoEnabled);
        toggle.setAttribute("aria-pressed", autoEnabled ? "true" : "false");
      });
      if (els.redditeryRapidFireToggle) {
        els.redditeryRapidFireToggle.disabled = !domLinkControlsAllowed();
        els.redditeryRapidFireToggle.classList.toggle("active", rapidFire);
        els.redditeryRapidFireToggle.setAttribute("aria-pressed", rapidFire ? "true" : "false");
      }
      [els.redditeryAutoPopupDuration, els.soloRedditeryAutoPopupDuration].forEach((input) => {
        if (input && document.activeElement !== input) input.value = normalizeDistractionDuration(settings.redditeryAutoPopupDuration);
      });
      [els.redditeryAutoPopupInterval, els.soloRedditeryAutoPopupInterval].forEach((input) => {
        if (input && document.activeElement !== input) input.value = normalizeAutoPopupInterval(settings.redditeryAutoPopupInterval);
      });
      const statusEls = [els.redditeryAutoPopupStatus, els.soloRedditeryAutoPopupStatus].filter(Boolean);
      if (!statusEls.length) return;
      let statusText = "";
      if (!enabled) {
        statusText = ["solitaire", "memoryMatch"].includes(state.screen)
          ? "Off. When enabled, a random gallery image pops up on the selected timer."
          : state.screen === "select" && ["solitaire", "memoryMatch"].includes(state.currentGame)
            ? "Off. When enabled, a random gallery image pops up during solo games."
          : "Off. When enabled, a random gallery image pops up for the sub on the selected timer.";
        statusEls.forEach((status) => { status.textContent = statusText; });
        return;
      }
      if (!allowed) {
        statusEls.forEach((status) => { status.textContent = "Unavailable here."; });
        return;
      }
      if (localRedditeryAutoPopupLoading) {
        statusEls.forEach((status) => { status.textContent = "Loading the next auto popup..."; });
        return;
      }
      if (autoPopupSourceKey() === "reddit" && !redditSelectionForScope("auto").length) {
        statusEls.forEach((status) => {
          status.textContent = enabled
            ? "On. Pick at least one Reddit page before random popups can run."
            : "Pick at least one Reddit page.";
        });
        return;
      }
      const blockingVideo = activeAutoFullVideoOverlay();
      if (!localRedditeryAutoPopupNextAt) scheduleNextRedditeryAutoPopup();
      const seconds = Math.max(0, Math.ceil((localRedditeryAutoPopupNextAt - Date.now()) / 1000));
      const minutes = Math.floor(seconds / 60);
      const remainder = seconds % 60;
      const duration = normalizeDistractionDuration(settings.redditeryAutoPopupDuration);
      if (blockingVideo && seconds <= 0) {
        const remaining = Math.max(0, Math.ceil((Number(blockingVideo.until || 0) - Date.now()) / 1000));
        statusEls.forEach((status) => {
          status.textContent = `Timer ready. Waiting for the full video to finish before the next popup.${remaining ? ` About ${formatMediaDuration(remaining)} left.` : ""}`;
        });
        return;
      }
      const sourceLabel = autoPopupSourceKey() === "booru"
        ? `Booru search, ${booruDateFilterLabel()}`
        : `${redditSelectionLabel("auto")} Reddit`;
      if (rapidFire) {
        const rapidCount = activeDistractionOverlays(state.settings, 14).filter((overlay) => overlay && overlay.rapidFire).length;
        statusEls.forEach((status) => {
          status.textContent = `Rapid fire on. ${sourceLabel}. New image every second, max 14 on screen. Showing ${rapidCount}/14.`;
        });
        return;
      }
      const videoNote = autoPopupSourceKey() === "booru" && localDanbooruIncludeVideos && settings.booruAutoPopupFullVideos
        ? " Videos can play full length."
        : "";
      statusText = `On. ${sourceLabel}. Next popup in ${minutes}:${String(remainder).padStart(2, "0")}. Shows for ${duration}s.${videoNote}${blockingVideo ? " Current video keeps playing if the timer reaches 0." : ""}`;
      statusEls.forEach((status) => { status.textContent = statusText; });
    }

    async function resolveRedditeryAutoPopup() {
      const rapidFire = Boolean(state.settings.redditeryRapidFire);
      if ((!state.settings.redditeryAutoPopup && !localSubAutoPopupActive() && !rapidFire) || !redditeryAutoPopupAllowed()) {
        localRedditeryAutoPopupNextAt = 0;
        localRedditeryAutoPopupLoading = false;
        updateRedditeryAutoPopupStatus();
        return;
      }
      if (autoPopupSourceKey() === "reddit" && !redditSelectionForScope("auto").length) {
        localRedditeryAutoPopupNextAt = 0;
        localRedditeryAutoPopupLoading = false;
        updateRedditeryAutoPopupStatus();
        return;
      }
      if (!rapidFire && activeAutoFullVideoOverlay()) {
        if (!localRedditeryAutoPopupNextAt) scheduleNextRedditeryAutoPopup();
        updateRedditeryAutoPopupStatus();
        return;
      }
      if (!localRedditeryAutoPopupNextAt) scheduleNextRedditeryAutoPopup();
      updateRedditeryAutoPopupStatus();
      if (localRedditeryAutoPopupLoading || Date.now() < localRedditeryAutoPopupNextAt) return;
      localRedditeryAutoPopupLoading = true;
      updateRedditeryAutoPopupStatus();
      let postedBlockingFullVideo = false;
      try {
        const settings = autoPopupSettings();
        const item = rapidFire ? await takeNextRapidFirePopupItem() : await takeNextAutoPopupItem();
        const url = item && normalizeDistractionSource(item.url);
        const media = {
          mediaType: item && mediaTypeForDistraction(url, item.mediaType),
          muted: !(autoPopupSourceKey() === "booru" && localDanbooruUnmuteVideos),
          autoFullVideo: !rapidFire && autoPopupSourceKey() === "booru" && localDanbooruIncludeVideos && Boolean(settings.booruAutoPopupFullVideos),
          targetSettings: settings,
          rapidFire,
          placement: "random"
        };
        if (url && addAutoDistractionOverlay(url, media)) {
          postedBlockingFullVideo = media.mediaType === "video" && media.autoFullVideo;
          renderDistractionBackground();
          if (settings === state.settings) showAutoPopupPreview(item, media);
          if (els.sideDistractionStatus) els.sideDistractionStatus.textContent = "Auto gallery popup posted.";
        }
      } catch (error) {
        const message = String(error && error.message || "Auto gallery popup failed.");
        if (els.redditeryAutoPopupStatus) els.redditeryAutoPopupStatus.textContent = message;
        if (els.soloRedditeryAutoPopupStatus) els.soloRedditeryAutoPopupStatus.textContent = message;
      } finally {
        localRedditeryAutoPopupLoading = false;
        if (postedBlockingFullVideo) {
          scheduleNextRedditeryAutoPopup();
        } else {
          scheduleNextRedditeryAutoPopup();
        }
        renderSidePanel();
      }
    }

    function selectRedditeryGalleryImage(index, fromRandom = false) {
      if (!galleryControlsAllowed()) return;
      const item = localRedditeryGalleryItems[Number(index)];
      const url = item && normalizeDistractionSource(item.url);
      if (!url) return;
      rememberDistractionImage(url, { targetSettings: galleryEffectSettings() });
      els.sideDistractionStatus.textContent = fromRandom
        ? (subGalleryPrivateMode() ? "Random gallery image selected and saved privately." : "Random gallery image selected and saved.")
        : (subGalleryPrivateMode() ? "Gallery image selected and saved privately." : "Gallery image selected and saved.");
      openDistractionChoice(url, "How should this gallery image appear?");
      renderRedditeryGallery();
      renderDistractionGallery();
    }

    function selectDistractionFromGallery(id) {
      if (!galleryControlsAllowed()) return;
      const item = savedDistractionItemById(id);
      if (!item) return;
      openDistractionChoice(item.url, `How should this saved ${mediaTypeForDistraction(item.url, item.mediaType)} appear?`, item);
      els.sideDistractionStatus.textContent = mediaTypeForDistraction(item.url, item.mediaType) === "video"
        ? "Saved video selected."
        : "Saved image selected.";
      renderDistractionGallery();
    }

    function activeDistractionOverlays(source = state.settings, maxItems = 3) {
      const now = Date.now();
      const list = Array.isArray(source.distractionOverlays) ? source.distractionOverlays : [];
      const active = list
        .filter((item) => item && normalizeDistractionSource(item.url) && Number(item.until || 0) > now)
        .slice(-Math.max(1, Number(maxItems || 3)));
      const oldUrl = normalizeDistractionSource(source.distractionOverlayUrl || (source.distractionMode === "overlay-sub" ? source.distractionUrl : ""));
      const oldUntil = Number(source.distractionOverlayUntil || source.distractionUntil || 0);
      if (!active.length && oldUrl && oldUntil > now) {
        active.push({
          id: "legacy-overlay",
          url: oldUrl,
          until: oldUntil,
          jitterX: 0,
          jitterY: 0
        });
      }
      return active;
    }

    function removeDistractionOverlayById(id) {
      if (!id) return;
      const sharedList = Array.isArray(state.settings.distractionOverlays) ? state.settings.distractionOverlays : [];
      const localList = Array.isArray(localSubDistractions.distractionOverlays) ? localSubDistractions.distractionOverlays : [];
      const target = sharedList.some((item) => item && item.id === id) ? state.settings : localSubDistractions;
      const list = target === state.settings ? sharedList : localList;
      const removedAutoFullVideo = list.some((item) => item && item.id === id && item.autoFullVideo && (item.mediaType === "video" || isVideoDistractionSource(item.url)));
      const next = list.filter((item) => item && item.id !== id);
      if (next.length === list.length) return;
      target.distractionOverlays = next;
      if (target.distractionOverlayUrl && !next.length) {
        target.distractionOverlayUrl = "";
        target.distractionOverlayUntil = 0;
      }
      renderDistractionBackground();
      if (removedAutoFullVideo && state.settings.redditeryAutoPopup && redditeryAutoPopupAllowed() && !activeAutoFullVideoOverlay()) {
        updateRedditeryAutoPopupStatus();
      }
      if (target === state.settings && domLinkControlsAllowed()) publishSettingsState();
    }

    function randomPopupAnchor(placement = popupPlacement(), existing = []) {
      if (normalizePopupPlacement(placement) !== "random") return { x: 50, y: 52 };
      const existingAnchors = (Array.isArray(existing) ? existing : [])
        .filter((overlay) => normalizePopupPlacement(overlay && overlay.placement) === "random")
        .map((overlay) => ({
          x: Number(overlay.anchorX || 50),
          y: Number(overlay.anchorY || 52)
        }));
      let best = null;
      let bestDistance = -1;
      for (let attempt = 0; attempt < 24; attempt += 1) {
        const candidate = {
          x: Math.round((18 + Math.random() * 64) * 10) / 10,
          y: Math.round((18 + Math.random() * 64) * 10) / 10
        };
        const nearest = existingAnchors.length
          ? Math.min(...existingAnchors.map((anchor) => Math.hypot(candidate.x - anchor.x, candidate.y - anchor.y)))
          : 100;
        if (nearest > bestDistance) {
          best = candidate;
          bestDistance = nearest;
        }
        if (nearest >= 36) return candidate;
      }
      return best || { x: 50, y: 52 };
    }

    function overlaySlot(index, count) {
      const slots = {
        1: [{ x: 50, y: 52 }],
        2: [{ x: 31, y: 52 }, { x: 69, y: 52 }],
        3: [{ x: 21, y: 52 }, { x: 50, y: 50 }, { x: 79, y: 52 }]
      };
      return (slots[Math.min(3, Math.max(1, count))] || slots[1])[index] || slots[1][0];
    }

    function clampOverlayTopLeftPx(valuePercent, boxPx, viewportPx, marginPx = 14) {
      const viewport = Math.max(1, Number(viewportPx || 1));
      const box = Math.max(1, Math.min(Number(boxPx || 1), viewport - marginPx * 2));
      const raw = viewport * (Number(valuePercent || 50) / 100) - box / 2;
      const min = marginPx;
      const max = viewport - marginPx - box;
      return Math.round(Math.min(max, Math.max(min, raw)));
    }

    function visualViewportSize() {
      const viewport = window.visualViewport;
      return {
        width: Math.max(1, Math.floor((viewport && viewport.width) || window.innerWidth || document.documentElement.clientWidth || 1280)),
        height: Math.max(1, Math.floor((viewport && viewport.height) || window.innerHeight || document.documentElement.clientHeight || 720))
      };
    }

    function rememberDistractionImageSize(url, width, height) {
      const normalized = normalizeDistractionSource(url);
      const naturalWidth = Number(width || 0);
      const naturalHeight = Number(height || 0);
      if (!normalized || naturalWidth <= 0 || naturalHeight <= 0) return;
      const previous = distractionImageSizeCache.get(normalized);
      if (previous && previous.width === naturalWidth && previous.height === naturalHeight) return;
      distractionImageSizeCache.set(normalized, { width: naturalWidth, height: naturalHeight });
      window.setTimeout(renderDistractionBackground, 0);
    }

    function rememberDistractionVideoSize(video) {
      const url = normalizeDistractionSource(video && video.dataset && (video.dataset.distractionOverlayVideo || video.dataset.distractionBackgroundVideo));
      const width = Number(video && video.videoWidth || 0);
      const height = Number(video && video.videoHeight || 0);
      rememberDistractionImageSize(url, width, height);
    }

    function ensureDistractionImageSize(url) {
      const normalized = normalizeDistractionSource(url);
      if (!normalized || distractionImageSizeCache.has(normalized)) return;
      const image = new Image();
      image.onload = () => rememberDistractionImageSize(normalized, image.naturalWidth, image.naturalHeight);
      image.src = normalized;
    }

    function overlayBoxSizePx(overlay, count, viewportWidth, viewportHeight) {
      const sizingCount = normalizePopupPlacement(overlay && overlay.placement) === "random" ? 1 : count;
      if (overlay && overlay.rapidFire) {
        const margin = 10;
        const sizeScale = Math.max(1, Math.min(1.2, Number(overlay.sizeScale || 1)));
        const maxWidth = Math.max(1, Math.min(viewportWidth - margin * 2, 230 * sizeScale, viewportWidth * 0.22 * sizeScale));
        const maxHeight = Math.max(1, Math.min(viewportHeight - margin * 2, 280 * sizeScale, viewportHeight * 0.32 * sizeScale));
        const size = distractionImageSizeCache.get(normalizeDistractionSource(overlay && overlay.url));
        if (size && size.width && size.height) {
          const ratio = size.width / size.height;
          const maxRatio = maxWidth / maxHeight;
          if (ratio >= maxRatio) {
            return {
              width: Math.round(maxWidth),
              height: Math.round(Math.max(1, maxWidth / ratio))
            };
          }
          return {
            width: Math.round(Math.max(1, maxHeight * ratio)),
            height: Math.round(maxHeight)
          };
        }
        return {
          width: Math.round(maxWidth),
          height: Math.round(maxHeight)
        };
      }
      const margin = sizingCount === 1 ? 24 : 18;
      const maxWidth = Math.max(1, Math.min(viewportWidth - margin * 2, sizingCount === 1 ? 860 : (sizingCount === 2 ? 540 : 390), viewportWidth * (sizingCount === 1 ? 0.82 : (sizingCount === 2 ? 0.42 : 0.29))));
      const maxHeight = Math.max(1, Math.min(viewportHeight - margin * 2, sizingCount === 1 ? 760 : (sizingCount === 2 ? 560 : 420), viewportHeight * (sizingCount === 1 ? 0.86 : (sizingCount === 2 ? 0.68 : 0.54))));
      const size = distractionImageSizeCache.get(normalizeDistractionSource(overlay && overlay.url));
      if (overlay && overlay.mediaType === "video") {
        const videoMaxHeight = Math.max(1, Math.min(maxHeight, viewportHeight - margin * 2 - 18));
        const videoMaxWidth = Math.max(1, Math.min(maxWidth, viewportWidth - margin * 2));
        const videoRatio = size && size.width && size.height ? size.width / size.height : 16 / 9;
        let width = videoMaxWidth;
        let height = width / videoRatio;
        if (height > videoMaxHeight) {
          height = videoMaxHeight;
          width = height * videoRatio;
        }
        return {
          width: Math.round(width),
          height: Math.round(height)
        };
      }
      if (!size || !size.width || !size.height) {
        return {
          width: Math.round(Math.min(maxWidth, viewportWidth * (sizingCount === 1 ? 0.72 : (sizingCount === 2 ? 0.38 : 0.26)))),
          height: Math.round(Math.min(maxHeight, viewportHeight * (sizingCount === 1 ? 0.64 : (sizingCount === 2 ? 0.54 : 0.46))))
        };
      }
      const ratio = size.width / size.height;
      const maxRatio = maxWidth / maxHeight;
      if (ratio >= maxRatio) {
        return {
          width: Math.round(maxWidth),
          height: Math.round(Math.max(1, maxWidth / ratio))
        };
      }
      return {
        width: Math.round(Math.max(1, maxHeight * ratio)),
        height: Math.round(maxHeight)
      };
    }

    function shouldShowSubOnlyMedia() {
      if (!state.online.room) return true;
      const role = localOnlineRole();
      return role === SUB || role === SPECTATOR;
    }

    function safeCssUrl(url) {
      return `url("${String(url || "").replace(/"/g, "%22")}")`;
    }

    function renderDistractionVideoBackground(url, muted = true) {
      if (!els.distractionBackdrop) return;
      const normalized = normalizeDistractionSource(url);
      const existing = els.distractionBackdrop.querySelector("[data-distraction-background-video]");
      if (!normalized) {
        if (existing) existing.remove();
        return;
      }
      if (existing && existing.dataset.distractionBackgroundVideo === normalized) {
        existing.muted = muted !== false;
        if (existing.videoWidth && existing.videoHeight) rememberDistractionVideoSize(existing);
        return;
      }
      els.distractionBackdrop.innerHTML = `<video src="${escapeHtml(normalized)}" ${muted !== false ? "muted" : ""} autoplay loop playsinline data-distraction-background-video="${escapeHtml(normalized)}"></video>`;
      const video = els.distractionBackdrop.querySelector("[data-distraction-background-video]");
      if (video) {
        const updateSize = () => rememberDistractionVideoSize(video);
        if (video.videoWidth && video.videoHeight) updateSize();
        else video.addEventListener("loadedmetadata", updateSize, { once: true });
      }
    }

    function distractionOverlaySignature(overlays, viewport) {
      return overlays.map((overlay, index) => {
        const slot = overlaySlot(index, overlays.length);
        const box = overlayBoxSizePx(overlay, overlays.length, viewport.width, viewport.height);
        return [
          overlay.id || "",
          normalizeDistractionSource(overlay.url),
          overlay.mediaType || "",
          overlay.muted === false ? "audio" : "muted",
          overlay.loop === false ? "once" : "loop",
          Number(overlay.loopCount || 0),
          normalizePopupPlacement(overlay.placement),
          Number(overlay.anchorX || 0),
          Number(overlay.anchorY || 0),
          Number(overlay.until || 0),
          Number(overlay.jitterX || 0),
          Number(overlay.jitterY || 0),
          Math.round(slot.x * 10) / 10,
          Math.round(slot.y * 10) / 10,
          box.width,
          box.height
        ].join("|");
      }).join(";");
    }

    function bindDistractionOverlayMediaEvents(media) {
      if (!media) return;
      if (media.dataset.distractionOverlayUrl && !media.dataset.sizeBound) {
        const updateSize = () => rememberDistractionImageSize(media.dataset.distractionOverlayUrl, media.naturalWidth, media.naturalHeight);
        if (media.complete && media.naturalWidth && media.naturalHeight) updateSize();
        else media.addEventListener("load", updateSize, { once: true });
        media.dataset.sizeBound = "true";
      }
      if (media.dataset.distractionOverlayVideo && !media.dataset.sizeBound) {
        const updateSize = () => {
          rememberDistractionVideoSize(media);
          adjustAutoFullVideoOverlay(media);
        };
        if (media.videoWidth && media.videoHeight) updateSize();
        else media.addEventListener("loadedmetadata", updateSize, { once: true });
        media.dataset.sizeBound = "true";
      }
      if (media.dataset.distractionOverlayVideo && media.dataset.distractionOverlayLoop === "false" && !media.dataset.endedBound) {
        media.addEventListener("ended", () => {
          const loopTarget = normalizeVideoLoopCount(media.dataset.distractionOverlayLoopCount || 0);
          if (Number(media.dataset.distractionOverlayLoopCount || 0) > 0) {
            const played = Math.max(1, Number(media.dataset.distractionOverlayLoopsPlayed || 0) + 1);
            media.dataset.distractionOverlayLoopsPlayed = String(played);
            if (played < loopTarget) {
              try {
                media.currentTime = 0;
                const playPromise = media.play();
                if (playPromise && typeof playPromise.catch === "function") playPromise.catch(() => {});
              } catch (error) {
                removeDistractionOverlayById(media.dataset.distractionOverlayId);
              }
              return;
            }
          }
          removeDistractionOverlayById(media.dataset.distractionOverlayId);
        });
        media.dataset.endedBound = "true";
      }
    }

    function adjustAutoFullVideoOverlay(media) {
      if (!media || media.dataset.distractionOverlayAutoFull !== "true") return;
      const overlayId = media.dataset.distractionOverlayId || "";
      const duration = Number(media.duration || 0);
      if (!overlayId || !Number.isFinite(duration) || duration <= 0 || media.dataset.autoFullAdjusted === "true") return;
      const source = activeDistractionOverlays(state.settings).some((overlay) => overlay && overlay.id === overlayId)
        ? state.settings
        : localSubDistractions;
      const minDuration = normalizeDistractionDuration(media.dataset.distractionOverlayMinDuration || source.redditeryAutoPopupDuration || state.settings.redditeryAutoPopupDuration);
      const now = Date.now();
      const shouldLoopForTimer = duration < minDuration;
      const nextOverlays = activeDistractionOverlays(source).map((overlay) => {
        if (!overlay || overlay.id !== overlayId) return overlay;
        return {
          ...overlay,
          loop: shouldLoopForTimer,
          until: now + (shouldLoopForTimer ? minDuration : duration) * 1000
        };
      });
      source.distractionOverlays = nextOverlays;
      media.loop = shouldLoopForTimer;
      media.dataset.distractionOverlayLoop = shouldLoopForTimer ? "true" : "false";
      media.dataset.autoFullAdjusted = "true";
      window.setTimeout(renderDistractionBackground, 0);
    }

    function updateDistractionOverlayNode(node, overlay, index, count, viewport) {
      const normalizedUrl = normalizeDistractionSource(overlay && overlay.url);
      const placement = normalizePopupPlacement(overlay && overlay.placement);
      const slot = placement === "random"
        ? { x: Number(overlay.anchorX || 50), y: Number(overlay.anchorY || 52) }
        : overlaySlot(index, count);
      const jitterX = Number(overlay.jitterX || 0);
      const jitterY = Number(overlay.jitterY || 0);
      ensureDistractionImageSize(normalizedUrl);
      const box = overlayBoxSizePx(overlay, count, viewport.width, viewport.height);
      const x = clampOverlayTopLeftPx(slot.x + jitterX, box.width, viewport.width);
      const y = clampOverlayTopLeftPx(slot.y + jitterY, box.height, viewport.height);
      node.style.setProperty("--distraction-overlay-left", `${x}px`);
      node.style.setProperty("--distraction-overlay-top", `${y}px`);
      node.style.setProperty("--distraction-overlay-width", `${box.width}px`);
      node.style.setProperty("--distraction-overlay-height", `${box.height}px`);
      node.classList.toggle("rapid-fire", Boolean(overlay && overlay.rapidFire));

      const isVideo = overlay.mediaType === "video" || isVideoDistractionSource(normalizedUrl);
      const existing = node.firstElementChild;
      const existingUrl = existing && (existing.dataset.distractionOverlayVideo || existing.dataset.distractionOverlayUrl);
      const needsMedia = !existing
        || existingUrl !== normalizedUrl
        || (isVideo && existing.tagName !== "VIDEO")
        || (!isVideo && existing.tagName !== "IMG");
      if (needsMedia) {
        const media = document.createElement(isVideo ? "video" : "img");
        if (isVideo) {
          media.src = normalizedUrl;
          media.autoplay = true;
          media.loop = overlay.loop !== false;
          media.muted = overlay.muted !== false;
          media.playsInline = true;
          media.controls = true;
          media.dataset.distractionOverlayVideo = normalizedUrl;
          media.dataset.distractionOverlayId = overlay.id || "";
          media.dataset.distractionOverlayLoop = overlay.loop === false ? "false" : "true";
          media.dataset.distractionOverlayLoopCount = overlay.loopCount ? String(normalizeVideoLoopCount(overlay.loopCount)) : "0";
          media.dataset.distractionOverlayLoopsPlayed = "0";
          media.dataset.distractionOverlayAutoFull = overlay.autoFullVideo ? "true" : "false";
          media.dataset.distractionOverlayMinDuration = overlay.minDuration ? String(normalizeDistractionDuration(overlay.minDuration)) : "";
        } else {
          media.src = normalizedUrl;
          media.alt = "";
          media.loading = "eager";
          media.dataset.distractionOverlayUrl = normalizedUrl;
        }
        node.replaceChildren(media);
        bindDistractionOverlayMediaEvents(media);
        return;
      }
      if (isVideo) {
        existing.loop = overlay.loop !== false;
        existing.muted = overlay.muted !== false;
        existing.dataset.distractionOverlayId = overlay.id || "";
        existing.dataset.distractionOverlayLoop = overlay.loop === false ? "false" : "true";
        existing.dataset.distractionOverlayLoopCount = overlay.loopCount ? String(normalizeVideoLoopCount(overlay.loopCount)) : "0";
        existing.dataset.distractionOverlayAutoFull = overlay.autoFullVideo ? "true" : "false";
        existing.dataset.distractionOverlayMinDuration = overlay.minDuration ? String(normalizeDistractionDuration(overlay.minDuration)) : "";
      }
      bindDistractionOverlayMediaEvents(existing);
    }

    function renderDistractionBackground() {
      const sharedOldUrl = state.settings.distractionUrl || "";
      const sharedOldMode = state.settings.distractionMode || "background-both";
      const sharedBackgroundUrl = state.settings.distractionBackgroundUrl || (sharedOldMode === "overlay-sub" ? "" : sharedOldUrl);
      const sharedBackgroundMode = state.settings.distractionBackgroundMode || (sharedOldMode === "background-sub" ? "background-sub" : "background-both");
      const sharedBackgroundVisible = Boolean(sharedBackgroundUrl)
        && (sharedBackgroundMode === "background-both" || (sharedBackgroundMode === "background-sub" && shouldShowSubOnlyMedia()));
      const localOldUrl = localSubDistractions.distractionUrl || "";
      const localOldMode = localSubDistractions.distractionMode || "background-sub";
      const localBackgroundUrl = localSubDistractions.distractionBackgroundUrl || (localOldMode === "overlay-sub" ? "" : localOldUrl);
      const localBackgroundVisible = subGalleryPrivateMode() && !sharedBackgroundVisible && Boolean(localBackgroundUrl) && shouldShowSubOnlyMedia();
      const backgroundUrl = sharedBackgroundVisible ? sharedBackgroundUrl : (localBackgroundVisible ? localBackgroundUrl : "");
      const backgroundMediaType = mediaTypeForDistraction(
        backgroundUrl,
        sharedBackgroundVisible ? state.settings.distractionBackgroundMediaType : localSubDistractions.distractionBackgroundMediaType
      );
      const backgroundIsVideo = backgroundMediaType === "video";
      const sharedOverlayCap = Array.isArray(state.settings.distractionOverlays) && state.settings.distractionOverlays.some((overlay) => overlay && overlay.rapidFire) ? 14 : 3;
      const localOverlayCap = Array.isArray(localSubDistractions.distractionOverlays) && localSubDistractions.distractionOverlays.some((overlay) => overlay && overlay.rapidFire) ? 14 : 3;
      const sharedOverlays = activeDistractionOverlays(state.settings, sharedOverlayCap);
      const localOverlays = subGalleryPrivateMode() && !sharedOverlays.length ? activeDistractionOverlays(localSubDistractions, localOverlayCap) : [];
      const overlays = sharedOverlays.length ? sharedOverlays : localOverlays;
      const showBackground = Boolean(backgroundUrl);
      const showOverlay = overlays.length > 0 && shouldShowSubOnlyMedia();
      els.distractionBackdrop.classList.toggle("active", showBackground);
      els.distractionBackdrop.classList.toggle("video-active", showBackground && backgroundIsVideo);
      els.distractionBackdrop.style.backgroundImage = showBackground && !backgroundIsVideo ? safeCssUrl(backgroundUrl) : "";
      renderDistractionVideoBackground(showBackground && backgroundIsVideo ? backgroundUrl : "", true);
      els.distractionOverlay.classList.toggle("active", showOverlay);
      const viewport = visualViewportSize();
      if (!showOverlay) {
        els.distractionOverlay.replaceChildren();
        renderedDistractionOverlaySignature = "";
      } else {
        const activeIds = new Set(overlays.map((overlay, index) => overlay.id || `overlay-${index}`));
        els.distractionOverlay.querySelectorAll("[data-distraction-overlay-item-id]").forEach((node) => {
          if (!activeIds.has(node.dataset.distractionOverlayItemId || "")) node.remove();
        });
        overlays.forEach((overlay, index) => {
          const id = overlay.id || `overlay-${index}`;
          let node = els.distractionOverlay.querySelector(`[data-distraction-overlay-item-id="${CSS.escape(id)}"]`);
          if (!node) {
            node = document.createElement("div");
            node.className = "distraction-overlay-item";
            node.dataset.distractionOverlayItemId = id;
          }
          updateDistractionOverlayNode(node, overlay, index, overlays.length, viewport);
          els.distractionOverlay.appendChild(node);
        });
        renderedDistractionOverlaySignature = distractionOverlaySignature(overlays, viewport);
      }
      if (showOverlay) {
        const overlayRemaining = Math.max(0, Math.min(...overlays.map((overlay) => Number(overlay.until || 0))) - Date.now());
        window.clearTimeout(renderDistractionBackground.timer);
        renderDistractionBackground.timer = window.setTimeout(renderDistractionBackground, overlayRemaining + 80);
      }
      renderPieceLossSpiral();
    }

    function currentLinkRequestKey() {
      return `tribute-link-request:${state.online.room || "local"}`;
    }

    function markSubLinkRequestHandled(request) {
      if (!request || !request.id) return;
      window.localStorage.setItem(currentLinkRequestKey(), request.id);
      els.subLinkModal.classList.add("hidden");
    }

    function showSubLinkModal(request, note = "") {
      els.subLinkModal.dataset.requestId = request.id;
      els.subLinkModal.dataset.url = request.url;
      els.subLinkModalText.textContent = `${state.names.dom || "Dom"} wants to open this link: ${request.url}${note ? ` ${note}` : ""}`;
      els.subLinkModal.classList.remove("hidden");
    }

    function openSubLinkRequest() {
      const request = {
        id: els.subLinkModal.dataset.requestId,
        url: els.subLinkModal.dataset.url
      };
      if (!request.id || !request.url) return;
      markSubLinkRequestHandled(request);
      const opened = window.open(request.url, "_blank", "noopener");
      if (!opened) {
        window.alert(`Your browser blocked the new window. Allow popups for this site, then ask ${state.names.dom || "the dom"} to send it again.`);
      }
    }

    function declineSubLinkRequest() {
      const request = {
        id: els.subLinkModal.dataset.requestId,
        url: els.subLinkModal.dataset.url
      };
      markSubLinkRequestHandled(request);
    }

    function processSubLinkRequest() {
      const request = state.settings.linkRequest;
      if (!request || !request.id || !request.url) return;
      const role = localOnlineRole();
      if (role !== SUB && role !== SPECTATOR) return;
      const key = currentLinkRequestKey();
      if (window.localStorage.getItem(key) === request.id) return;
      if (state.settings.subLinkWarningMode === "auto") {
        const opened = window.open(request.url, "_blank", "noopener");
        if (opened) {
          markSubLinkRequestHandled(request);
          return;
        }
        showSubLinkModal(request, "Your browser blocked the automatic window.");
        return;
      }
      showSubLinkModal(request);
    }

    function openRulesModal() {
      renderRules();
      els.rulesModal.classList.remove("hidden");
    }

    function closeRulesModal() {
      els.rulesModal.classList.add("hidden");
    }

    function addLog(html) {
      const entry = document.createElement("div");
      entry.className = "entry";
      entry.innerHTML = html;
      els.log.prepend(entry);
    }

    let outcomeSplashTimer = null;
    let throneKissSplashTimer = null;
    let throneKissFadeWhenFocused = false;

    function showOutcomeSplash({ tone = "gold", kicker = "Result", title = "Tribute Updated", detail = "" } = {}) {
      if (!els.outcomeSplash) return;
      window.clearTimeout(outcomeSplashTimer);
      els.outcomeSplashCard.className = `outcome-splash-card ${tone}`;
      els.outcomeKicker.textContent = kicker;
      els.outcomeTitle.textContent = title;
      els.outcomeDetail.textContent = detail;
      els.outcomeSplash.classList.remove("hidden");
      window.requestAnimationFrame(() => els.outcomeSplash.classList.add("active"));
      outcomeSplashTimer = window.setTimeout(hideOutcomeSplash, 2100);
    }

    function hideOutcomeSplash() {
      if (!els.outcomeSplash) return;
      els.outcomeSplash.classList.remove("active");
      window.clearTimeout(outcomeSplashTimer);
      outcomeSplashTimer = window.setTimeout(() => {
        els.outcomeSplash.classList.add("hidden");
      }, 240);
    }

    function showThroneKissSplash() {
      if (!els.throneKissSplash) return;
      window.clearTimeout(throneKissSplashTimer);
      els.throneKissSplash.classList.remove("hidden");
      window.requestAnimationFrame(() => els.throneKissSplash.classList.add("active"));
    }

    function hideThroneKissSplash() {
      if (!els.throneKissSplash) return;
      window.clearTimeout(throneKissSplashTimer);
      els.throneKissSplash.classList.remove("active");
      throneKissSplashTimer = window.setTimeout(() => {
        els.throneKissSplash.classList.add("hidden");
      }, 260);
    }

    function clearThroneKissSplash() {
      if (!els.throneKissSplash) return;
      throneKissFadeWhenFocused = false;
      window.clearTimeout(throneKissSplashTimer);
      els.throneKissSplash.classList.remove("active");
      els.throneKissSplash.classList.add("hidden");
    }

    function throneKissSplashActive() {
      return Boolean(els.throneKissSplash && els.throneKissSplash.classList.contains("active"));
    }

    function tributeArcadeIsFocused() {
      return document.visibilityState === "visible" && document.hasFocus();
    }

    function fadeThroneKissSplashWhenFocused() {
      if (!throneKissSplashActive()) {
        throneKissFadeWhenFocused = false;
        return;
      }
      if (!tributeArcadeIsFocused()) {
        throneKissFadeWhenFocused = true;
        return;
      }
      throneKissFadeWhenFocused = false;
      hideThroneKissSplash();
    }

    function settleDeferredThroneKissFade() {
      if (!throneKissFadeWhenFocused) return;
      fadeThroneKissSplashWhenFocused();
    }

    function reconcileThroneKissSplash() {
      if (!throneKissSplashActive()) return;
      if (state.screen !== "game") {
        clearThroneKissSplash();
        return;
      }
      if (state.active) fadeThroneKissSplashWhenFocused();
    }

    function snapshotState() {
      return {
        screen: state.screen,
        roles: state.roles,
        names: state.names,
        settings: state.settings,
        pendingWager: state.pendingWager,
        currentGame: state.currentGame,
        board: state.board,
        turn: state.turn,
        active: state.active,
        mode: state.mode,
        pot: state.pot,
        domVault: state.domVault,
        lockedTribute: state.lockedTribute,
        tiltLevel: state.tiltLevel,
        blockedColumns: state.blockedColumns,
        skipAvailable: state.skipAvailable,
        skipArmed: state.skipArmed,
        reclaimPassAvailable: state.reclaimPassAvailable,
        lockColumnAvailable: state.lockColumnAvailable,
        lockColumnMode: state.lockColumnMode,
        lockedColumn: state.lockedColumn,
        pressureDropAvailable: state.pressureDropAvailable,
        pressureDropArmed: state.pressureDropArmed,
        pressureDropColumn: state.pressureDropColumn,
        domOpened: state.domOpened,
        winningCells: state.winningCells,
        fleet: state.fleet,
        twentyOne: state.twentyOne,
        higherLower: state.higherLower,
        crazyEights: state.crazyEights,
        doubleSolitaire: state.doubleSolitaire,
        ticTacToe: state.ticTacToe,
        dice: state.dice,
        wheel: state.wheel,
        trail: state.trail,
        obedience: state.obedience,
        checkers: state.checkers,
        reversi: state.reversi,
        chess: state.chess,
        lossPressure: state.lossPressure,
        chat: state.chat,
        ledger: state.ledger,
        onlineLobby: {
          seats: state.online.seats,
          seatSecrets: state.online.seatSecrets,
          playerNames: state.online.playerNames,
          roleChoices: state.online.roleChoices,
          ready: state.online.ready,
          spectators: state.online.spectators
        },
        logHtml: els.log.innerHTML
      };
    }

    function applySnapshot(snapshot) {
      if (!snapshot) return;
      state.online.applying = true;
      const previousChatId = latestChatId();
      const localSideOpen = state.settings.sideOpen;
      const localActiveSideTab = state.settings.activeSideTab;
      const localGalleryPanelOpen = state.settings.galleryPanelOpen;
      state.screen = snapshot.screen || state.screen;
      state.roles = snapshot.roles || state.roles;
      state.names = snapshot.names || state.names;
      state.settings = {
        ...state.settings,
        ...(snapshot.settings || {})
      };
      state.settings.sessionMode = state.settings.sessionMode === "bank" ? "bank" : "throne";
      state.settings.subLinkWarningMode = state.settings.subLinkWarningMode === "warn" ? "warn" : "auto";
      state.settings.subBetControl = state.settings.subBetControl === "locked" ? "locked" : "editable";
      state.settings.distractionPopupPlacement = "random";
      state.settings.startingPlayerMode = state.settings.startingPlayerMode === DOM || state.settings.startingPlayerMode === SUB ? state.settings.startingPlayerMode : "random";
      state.settings.domSeePressureBanners = Boolean(state.settings.domSeePressureBanners);
      state.settings.domSeePressureText = Boolean(state.settings.domSeePressureText);
      state.settings.domSeePressurePulse = Boolean(state.settings.domSeePressurePulse);
      state.settings.pressureViewPromptSeen = Boolean(state.settings.pressureViewPromptSeen);
      state.settings.galleryPanelOpen = normalizeGalleryPanelOpen(localGalleryPanelOpen);
      state.settings.sideOpen = localSideOpen;
      state.settings.activeSideTab = localActiveSideTab;
      state.pendingWager = snapshot.pendingWager || null;
      state.currentGame = snapshot.currentGame || state.currentGame;
      state.board = snapshot.board || state.board;
      state.turn = snapshot.turn || state.turn;
      state.active = Boolean(snapshot.active);
      state.mode = snapshot.mode || state.mode;
      state.pot = Number(snapshot.pot || 0);
      state.domVault = Number(snapshot.domVault || 0);
      state.lockedTribute = Number(snapshot.lockedTribute || state.domVault);
      state.tiltLevel = Number(snapshot.tiltLevel || 0);
      state.blockedColumns = snapshot.blockedColumns || [];
      state.skipAvailable = Boolean(snapshot.skipAvailable);
      state.skipArmed = Boolean(snapshot.skipArmed);
      state.reclaimPassAvailable = Boolean(snapshot.reclaimPassAvailable);
      state.lockColumnAvailable = Boolean(snapshot.lockColumnAvailable);
      state.lockColumnMode = Boolean(snapshot.lockColumnMode);
      state.lockedColumn = Number.isInteger(snapshot.lockedColumn) ? snapshot.lockedColumn : null;
      state.pressureDropAvailable = Boolean(snapshot.pressureDropAvailable);
      state.pressureDropArmed = Boolean(snapshot.pressureDropArmed);
      state.pressureDropColumn = Number.isInteger(snapshot.pressureDropColumn) ? snapshot.pressureDropColumn : null;
      state.domOpened = Boolean(snapshot.domOpened);
      state.winningCells = snapshot.winningCells || [];
      state.fleet = snapshot.fleet || state.fleet;
      normalizeFleetState();
      state.twentyOne = snapshot.twentyOne || state.twentyOne;
      state.higherLower = snapshot.higherLower || state.higherLower;
      state.crazyEights = snapshot.crazyEights || state.crazyEights;
      state.doubleSolitaire = snapshot.doubleSolitaire || state.doubleSolitaire;
      state.ticTacToe = normalizeTicTacToeState(snapshot.ticTacToe || state.ticTacToe);
      state.dice = snapshot.dice || state.dice;
      state.wheel = snapshot.wheel || state.wheel;
      state.trail = snapshot.trail || state.trail;
      state.obedience = snapshot.obedience || state.obedience;
      state.checkers = snapshot.checkers || state.checkers;
      state.reversi = snapshot.reversi || state.reversi;
      normalizeTrailState();
      state.chess = normalizeChessState(snapshot.chess || state.chess);
      state.lossPressure = {
        ...createLossPressureState(),
        ...(snapshot.lossPressure || {})
      };
      state.chat = Array.isArray(snapshot.chat) ? snapshot.chat.slice(-100) : state.chat;
      const newestMessage = (state.chat || [])[Math.max(0, (state.chat || []).length - 1)];
      if (newestMessage
        && newestMessage.id
        && newestMessage.id !== previousChatId
        && newestMessage.id !== lastChatDingId
        && newestMessage.sender !== chatSenderLabel()) {
        lastChatDingId = newestMessage.id;
        playChatDing();
      }
      state.ledger = Array.isArray(snapshot.ledger) ? snapshot.ledger.slice(-120) : state.ledger;
      if (snapshot.onlineLobby && snapshot.onlineLobby.seats) {
        state.online.seats = snapshot.onlineLobby.seats;
        state.online.seatSecrets = snapshot.onlineLobby.seatSecrets || { one: "", two: "" };
        state.online.playerNames = snapshot.onlineLobby.playerNames || state.online.playerNames;
        state.online.roleChoices = snapshot.onlineLobby.roleChoices || state.online.roleChoices;
        state.online.ready = snapshot.onlineLobby.ready || state.online.ready || { one: false, two: false };
        state.online.spectators = snapshot.onlineLobby.spectators || state.online.spectators || {};
      }
      state.online.applying = false;
      els.log.innerHTML = snapshot.logHtml || "";
      els.playerSummary.textContent = `${state.names.dom} is the dom. ${state.names.sub} is the sub.`;
      setScreen(state.screen);
      renderRoles();
      processSubLinkRequest();
      processPaymentDemand();
      if (processApprovedWager()) return;
      render();
      reconcileThroneKissSplash();
    }

    async function createOnlineRoom() {
      try {
        state.online.seat = "one";
        state.online.seats.one = true;
        state.online.seats.two = false;
        state.online.seatSecrets = { one: newSeatSecret(), two: "" };
        state.online.ready = { one: false, two: false };
        state.online.spectators = {};
        state.settings.leaveNotice = null;
        state.settings.throneAmountConfirmed = false;
        setScreen("setup");
        renderRoles();
        const response = await fetch("/api/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ snapshot: snapshotState() })
        });
        const room = await response.json();
        if (!response.ok) throw new Error(room.error || "Could not create room");
        state.online.room = room.id;
        state.online.rev = room.rev;
        rememberSeat("one", room.id, state.online.seatSecrets.one);
        setLocalRoomUrl();
        updateOnlineUi();
        startPolling();
        publishState();
      } catch (error) {
        setScreen("lobby");
        els.onlineStatus.textContent = "Server is not running. Start outputs/start_multiplayer_server.bat, then press Host again.";
      }
    }

    function roomUrl() {
      const url = new URL(window.location.href);
      url.searchParams.set("room", state.online.room);
      url.searchParams.delete("seat");
      return url.toString();
    }

    function setLocalRoomUrl() {
      if (!state.online.room) return;
      const url = new URL(window.location.href);
      url.searchParams.set("room", state.online.room);
      url.searchParams.delete("seat");
      window.history.replaceState({}, "", url.toString());
    }

    function updateOnlineUi() {
      if (!state.online.room) {
        els.onlineStatus.textContent = "Offline local game.";
        els.roomCodeDisplay.classList.add("hidden");
        els.shareLinks.classList.add("hidden");
        els.setupRoomPanel.classList.add("hidden");
        if (els.setupRoomCodeDisplay) els.setupRoomCodeDisplay.classList.add("hidden");
        if (els.localSetupGrid) els.localSetupGrid.classList.remove("hidden");
        if (els.localSetupActions) els.localSetupActions.classList.remove("hidden");
        els.localTestingPanel.classList.remove("hidden");
        renderSetupSettings();
        return;
      }
      els.localTestingPanel.classList.add("hidden");
      if (els.localSetupGrid) els.localSetupGrid.classList.add("hidden");
      if (els.localSetupActions) els.localSetupActions.classList.add("hidden");
      const seat = localSeat() || state.online.seat || "one";
      const seatName = seat === SPECTATOR ? "Spectator" : (seat === "two" ? "Player Two" : "Player One");
      const claim = readSeatClaim();
      const spectatorName = seat === SPECTATOR && claim && state.online.spectators
        ? state.online.spectators[claim.secret]
        : "";
      els.onlineStatus.textContent = `Room ${state.online.room}. You are ${seatName}.`;
      els.roomCodeDisplay.textContent = `Room code: ${state.online.room}`;
      els.roomCodeDisplay.classList.remove("hidden");
      els.shareLinks.classList.remove("hidden");
      state.online.inviteUrl = roomUrl();
      if (els.inviteShareLink) els.inviteShareLink.textContent = `Invite link: ${state.online.inviteUrl}`;
      els.setupRoomPanel.classList.remove("hidden");
      if (els.setupRoomCodeDisplay) {
        els.setupRoomCodeDisplay.textContent = `Room code: ${state.online.room}`;
        els.setupRoomCodeDisplay.classList.remove("hidden");
      }
      els.setupRoomStatus.textContent = state.online.seats.one && state.online.seats.two
        ? (seat === SPECTATOR && !spectatorName ? "Choose a spectator name to join the room chat." : "Both players are in the lobby.")
        : "Waiting for the other player.";
      els.setupShareLink.textContent = `Invite link: ${state.online.inviteUrl}`;
      renderRoles();
      renderLobby();
      renderSetupSettings();
    }

    async function copyInviteLink(statusEl = els.setupRoomStatus) {
      if (!state.online.inviteUrl) return;
      try {
        await navigator.clipboard.writeText(state.online.inviteUrl);
        if (statusEl) statusEl.textContent = "Invite link copied.";
      } catch (error) {
        if (statusEl) statusEl.textContent = "Copy failed. Select the invite link and copy it manually.";
      }
    }

    function trailCardId(card) {
      if (!card) return "";
      return card.id || `${card.deck || ""}:${card.player || ""}:${card.title || ""}:${card.source ?? ""}:${card.effectKey || ""}:${card.amount || 0}`;
    }

    function mergeLatestSnapshotWithLocalAction(latestSnapshot, localSnapshot) {
      const latest = latestSnapshot || {};
      const local = localSnapshot || snapshotState();
      const localSeatValue = localSeat();
      const localRole = localSeatValue === SPECTATOR
        ? SPECTATOR
        : (localSeatValue
          ? ((local.roles && local.roles[localSeatValue])
            || (local.onlineLobby && local.onlineLobby.roleChoices && local.onlineLobby.roleChoices[localSeatValue])
            || localOnlineRole())
          : localOnlineRole());
      const staleLocalGameSelection = Boolean(
        state.online.room
        && localRole
        && localRole !== DOM
        && latest.screen === "game"
        && (!local.screen || local.screen !== "game" || local.currentGame !== latest.currentGame)
      );
      const latestTrail = latest.trail || null;
      const localTrail = local.trail || null;
      const latestPendingCard = Boolean(latestTrail && latestTrail.pendingCardActivation);
      const localPendingCard = Boolean(localTrail && localTrail.pendingCardActivation);
      const localActivatesLatestCard = Boolean(
        latestPendingCard
        && localTrail
        && !localPendingCard
        && localTrail.revealedCard
        && latestTrail.revealedCard
        && trailCardId(localTrail.revealedCard) === trailCardId(latestTrail.revealedCard)
        && localTrail.revealedCard.activated
      );
      const trail = latestPendingCard && !localPendingCard && !localActivatesLatestCard
        ? latestTrail
        : (localTrail || latestTrail);
      const merged = {
        ...latest,
        ...local,
        settings: {
          ...(latest.settings || {}),
          ...(local.settings || {})
        },
        chat: Array.isArray(latest.chat) && latest.chat.length > (Array.isArray(local.chat) ? local.chat.length : 0)
          ? latest.chat
          : local.chat,
        trail,
        onlineLobby: latest.onlineLobby || local.onlineLobby
      };
      if (staleLocalGameSelection) {
        Object.assign(merged, {
          screen: latest.screen,
          pendingWager: latest.pendingWager,
          currentGame: latest.currentGame,
          board: latest.board,
          turn: latest.turn,
          active: latest.active,
          mode: latest.mode,
          pot: latest.pot,
          domVault: latest.domVault,
          lockedTribute: latest.lockedTribute,
          tiltLevel: latest.tiltLevel,
          blockedColumns: latest.blockedColumns,
          skipAvailable: latest.skipAvailable,
          skipArmed: latest.skipArmed,
          reclaimPassAvailable: latest.reclaimPassAvailable,
          lockColumnAvailable: latest.lockColumnAvailable,
          lockColumnMode: latest.lockColumnMode,
          lockedColumn: latest.lockedColumn,
          pressureDropAvailable: latest.pressureDropAvailable,
          pressureDropArmed: latest.pressureDropArmed,
          pressureDropColumn: latest.pressureDropColumn,
          domOpened: latest.domOpened,
          winningCells: latest.winningCells,
          fleet: latest.fleet,
          twentyOne: latest.twentyOne,
          higherLower: latest.higherLower,
          crazyEights: latest.crazyEights,
          doubleSolitaire: latest.doubleSolitaire,
          ticTacToe: latest.ticTacToe,
          dice: latest.dice,
          wheel: latest.wheel,
          trail: latest.trail,
          obedience: latest.obedience,
          checkers: latest.checkers,
          reversi: latest.reversi,
          chess: latest.chess,
          ledger: latest.ledger,
          logHtml: latest.logHtml
        });
      }
      return merged;
    }

    async function publishState(retry = true, localSnapshot = null) {
      if (!state.online.room || state.online.applying) return;
      const snapshot = localSnapshot || snapshotState();
      try {
        const response = await fetch("/api/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            room: state.online.room,
            baseRev: state.online.rev,
            snapshot
          })
        });
        const data = await response.json();
        if (response.status === 409) {
          state.online.rev = data.rev;
          if (retry) {
            const merged = mergeLatestSnapshotWithLocalAction(data.snapshot, snapshot);
            const retryResponse = await fetch("/api/sync", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                room: state.online.room,
                baseRev: data.rev,
                snapshot: merged
              })
            });
            const retryData = await retryResponse.json();
            if (retryResponse.status === 409) {
              state.online.rev = retryData.rev;
              applySnapshot(retryData.snapshot);
              return;
            }
            if (!retryResponse.ok) throw new Error(retryData.error || "Sync failed");
            state.online.rev = retryData.rev;
            applySnapshot(merged);
            return;
          }
          applySnapshot(data.snapshot);
          return;
        }
        if (!response.ok) throw new Error(data.error || "Sync failed");
        state.online.rev = data.rev;
      } catch (error) {
        els.onlineStatus.textContent = `Sync paused: ${error.message}`;
      }
    }

    function snapshotLobby(snapshot) {
      const lobby = snapshot.onlineLobby || {};
      return {
        seats: { one: false, two: false, ...(lobby.seats || {}) },
        seatSecrets: { one: "", two: "", ...(lobby.seatSecrets || {}) },
        playerNames: { one: "", two: "", ...(lobby.playerNames || {}) },
        roleChoices: { one: null, two: null, ...(lobby.roleChoices || {}) },
        ready: { one: false, two: false, ...(lobby.ready || {}) },
        spectators: { ...(lobby.spectators || {}) }
      };
    }

    async function publishMergedSnapshot(mergeSnapshot, retry = true) {
      if (!state.online.room || state.online.applying) return;
      try {
        const currentResponse = await fetch(`/api/state?room=${encodeURIComponent(state.online.room)}`);
        const current = await currentResponse.json();
        if (!currentResponse.ok) throw new Error(current.error || "Room unavailable");
        const mergedSnapshot = mergeSnapshot(current.snapshot || snapshotState());
        const syncResponse = await fetch("/api/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            room: state.online.room,
            baseRev: current.rev,
            snapshot: mergedSnapshot
          })
        });
        const synced = await syncResponse.json();
        if (syncResponse.status === 409) {
          state.online.rev = synced.rev;
          applySnapshot(synced.snapshot);
          if (retry) await publishMergedSnapshot(mergeSnapshot, false);
          return;
        }
        if (!syncResponse.ok) throw new Error(synced.error || "Sync failed");
        state.online.rev = synced.rev;
        applySnapshot(synced.snapshot);
      } catch (error) {
        els.onlineStatus.textContent = `Sync paused: ${error.message}`;
      }
    }

    async function publishOnlineLobbyChange(changeLobby) {
      await publishMergedSnapshot((snapshot) => {
        const next = { ...snapshot };
        const lobby = snapshotLobby(next);
        changeLobby(lobby);
        next.onlineLobby = lobby;
        return next;
      });
    }

    async function publishChatMessage(message) {
      await publishMergedSnapshot((snapshot) => {
        const messages = Array.isArray(snapshot.chat) ? snapshot.chat.slice(-99) : [];
        if (!messages.some((existing) => existing.id === message.id)) messages.push(message);
        return {
          ...snapshot,
          chat: messages.slice(-100)
        };
      });
    }

    async function publishSettingsState(retry = true) {
      if (!state.online.room || state.online.applying) return;
      const localSettings = { ...state.settings };
      try {
        const currentResponse = await fetch(`/api/state?room=${encodeURIComponent(state.online.room)}`);
        const current = await currentResponse.json();
        if (!currentResponse.ok) throw new Error(current.error || "Room unavailable");
        const mergedSnapshot = {
          ...(current.snapshot || snapshotState()),
          settings: {
            ...((current.snapshot && current.snapshot.settings) || {}),
            ...localSettings
          }
        };
        const syncResponse = await fetch("/api/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            room: state.online.room,
            baseRev: current.rev,
            snapshot: mergedSnapshot
          })
        });
        const synced = await syncResponse.json();
        if (syncResponse.status === 409) {
          state.online.rev = synced.rev;
          applySnapshot(synced.snapshot);
          state.settings = {
            ...state.settings,
            ...localSettings
          };
          renderSettings();
          renderSidePanel();
          if (retry) await publishSettingsState(false);
          return;
        }
        if (!syncResponse.ok) throw new Error(synced.error || "Sync failed");
        state.online.rev = synced.rev;
      } catch (error) {
        els.onlineStatus.textContent = `Sync paused: ${error.message}`;
      }
    }

    async function pollState() {
      if (!state.online.room) return;
      try {
        const response = await fetch(`/api/state?room=${encodeURIComponent(state.online.room)}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Room unavailable");
        if (data.rev > state.online.rev) {
          if (localTrailSyncBusy()) {
            updateOnlineUi();
            return;
          }
          state.online.rev = data.rev;
          applySnapshot(data.snapshot);
        }
        updateOnlineUi();
      } catch (error) {
        els.onlineStatus.textContent = `Disconnected: ${error.message}`;
      }
    }

    function localTrailSyncBusy() {
      if (state.screen !== "game" || state.currentGame !== "tributeTrail" || !state.trail) return false;
      const localRole = localOnlineRole();
      if (!localRole) return false;
      const rolling = Boolean(state.trail.rollAnimationUntil && Date.now() < state.trail.rollAnimationUntil && state.trail.lastRoll && state.trail.lastRoll.player === localRole);
      const moving = Boolean(state.trail.moving && state.trail.movingPlayer === localRole);
      const pendingOwnCard = Boolean(state.trail.pendingCardActivation && state.trail.pendingCardActivation.player === localRole);
      return rolling || moving || pendingOwnCard;
    }

    function startPolling() {
      if (state.online.polling) return;
      state.online.polling = true;
      window.setInterval(pollState, 900);
    }

    async function claimOnlineSeat(preferredSeat = null) {
      if (!state.online.room) return null;
      const savedClaim = readSeatClaim(state.online.room);
      const response = await fetch("/api/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room: state.online.room,
          preferredSeat,
          savedSeat: savedClaim ? savedClaim.seat : null,
          secret: savedClaim ? savedClaim.secret : null
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not claim a seat");
      state.online.rev = data.rev;
      applySnapshot(data.snapshot);
      state.online.room = data.id || state.online.room;
      const claim = data.claim || {};
      rememberSeat(claim.seat || SPECTATOR, state.online.room, claim.secret);
      setLocalRoomUrl();
      updateOnlineUi();
      return claim;
    }

    async function joinOnlineRoom(room) {
      if (!room) return;
      const roomCode = room.toUpperCase();
      state.online.room = roomCode;
      const response = await fetch(`/api/state?room=${encodeURIComponent(state.online.room)}`);
      const data = await response.json();
      if (!response.ok) {
        state.online.room = null;
        els.onlineStatus.textContent = data.error || "Room unavailable.";
        return;
      }
      state.online.rev = data.rev;
      applySnapshot(data.snapshot);
      state.online.room = roomCode;
      state.online.seatSecrets = state.online.seatSecrets || { one: "", two: "" };
      await claimOnlineSeat();
      startPolling();
      if (state.screen !== "game" && state.screen !== "select") {
        setScreen("setup");
      }
      updateOnlineUi();
    }

    async function joinRoomFromInput() {
      const code = els.joinRoomCodeInput.value.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
      if (!code) {
        els.onlineStatus.textContent = "Enter a room code first.";
        return;
      }
      await joinOnlineRoom(code);
    }

    async function joinOnlineRoomFromUrl() {
      const params = new URLSearchParams(window.location.search);
      const room = params.get("room");
      if (!room) return;
      await joinOnlineRoom(room);
    }

    let wagerStartBypass = false;
    let processedWagerStartId = "";
    let lastChatDingId = "";

    function wagerLabel(type) {
      if (type !== "reclaim" && isThroneSession()) return "Throne Amount";
      return type === "reclaim" ? "Reclaim" : "Standard Bet";
    }

    function pendingWagerAllowedForRole() {
      const role = localOnlineRole();
      return !state.online.room || !role || role === DOM || role === SUB;
    }

    function wagerResultLines(pending = state.pendingWager) {
      const amount = normalizeBuyIn(Number(pending && pending.amount));
      if (pending && pending.type === "reclaim") {
        return [
          `Current balance: ${money(state.domVault)}`,
          `Dom win: balance becomes ${money(state.domVault + amount)}`,
          `Dom loss: balance becomes ${money(0)}`
        ];
      }
      const lines = [
        isThroneSession() ? "Throne game: normal sub losses automatically open the prepared Throne page." : `Current balance: ${money(state.domVault)}`,
        isThroneSession() ? `${state.names.sub || "Sub"} loss: opens a ${money(roundThroneTributeAmount(amount))} Throne tribute for ${state.names.dom}` : `Dom win: gains ${money(amount)} and balance becomes ${money(state.domVault + amount)}`,
        `Dom loss: balance remains ${money(state.domVault)}`
      ];
      return lines;
    }

    function betSetupGameActive() {
      if (state.screen !== "game") return false;
      if (state.active || state.pendingWager) return false;
      if (!usesRoundFlow()) return false;
      if (state.currentGame === "higherLower") return false;
      return state.currentGame !== "wheelSpin"
        && state.currentGame !== "tributeTrail"
        && state.currentGame !== "obedienceOrders";
    }

    function betSetupAllowedForRole() {
      const role = localOnlineRole();
      return !state.online.room || !role || role === SUB;
    }

    function pregameBetAmount() {
      if (isThroneSession()) return currentThroneAmount();
      if (state.settings.subBetControl === "locked") return normalizeBuyIn(Number(state.settings.subDefaultBet));
      return normalizeBuyIn(Number(els.betInput.value || state.settings.subDefaultBet));
    }

    function updatePregameBetAmount(delta) {
      if (!betSetupGameActive() || !betSetupAllowedForRole()) return;
      if (isThroneSession() || state.settings.subBetControl === "locked") return;
      const amount = normalizeBuyIn(Number(els.betInput.value || state.settings.subDefaultBet) + delta);
      els.betInput.value = amount;
      renderWagerApproval();
    }

    function setPregameBetAmountFromInput(value) {
      if (!betSetupGameActive() || !betSetupAllowedForRole()) return;
      if (isThroneSession() || state.settings.subBetControl === "locked") return;
      els.betInput.value = normalizeBuyIn(Number(value || state.settings.subDefaultBet));
      renderWagerApproval();
    }

    function startPregameNormalBet() {
      if (!betSetupGameActive() || !betSetupAllowedForRole()) return;
      const amountInput = els.wagerModal.querySelector('input[data-wager-action="pregame-set"]');
      if (amountInput && !isThroneSession() && state.settings.subBetControl !== "locked") els.betInput.value = normalizeBuyIn(Number(amountInput.value || state.settings.subDefaultBet));
      els.betInput.value = pregameBetAmount();
      startNormalMatch();
    }

    function startPregameReclaimBet() {
      if (!betSetupGameActive() || !betSetupAllowedForRole() || isThroneSession() || state.domVault <= 0) return;
      startReclaimMatch();
    }

    function startThroneRoundOnOpen() {
      if (!isThroneSession()) return false;
      wagerStartBypass = true;
      try {
        startNormalMatch();
      } finally {
        wagerStartBypass = false;
      }
      return true;
    }

    function requestWagerApproval(type) {
      if (wagerStartBypass) return true;
      if (!usesRoundFlow()) return true;
      if (type !== "reclaim" && isThroneSession()) return true;
      if (localOnlineRole() && localOnlineRole() !== SUB) return false;
      if (state.active || state.pendingWager) return false;
      if (type === "reclaim" && isThroneSession()) {
        addLog(`<strong class="danger">Reclaim is bank-only.</strong> Switch to a regular bank game to use reclaim.`);
        return false;
      }
      if (type === "reclaim" && state.domVault <= 0) {
        addLog(`<strong class="danger">No banked cash.</strong> ${state.names.sub} has to lose a normal game first to unlock reclaim.`);
        return false;
      }
      const amount = type === "reclaim"
        ? normalizeBuyIn(state.domVault)
        : isThroneSession()
          ? currentThroneAmount()
        : normalizeBuyIn(Number(els.betInput.value));
      els.betInput.value = amount;
      state.pendingWager = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        type,
        game: state.currentGame,
        amount,
        originalAmount: amount,
        status: "review",
        direction: "",
        emojis: [],
        requestedAt: Date.now()
      };
      renderWagerApproval();
      publishState();
      return false;
    }

    function requestHigherLowerRun(targetStreak) {
      if (!higherLowerDomControlsAllowed()) return false;
      if (state.active || state.pendingWager) return false;
      const target = higherLowerTarget(targetStreak);
      state.higherLower = {
        ...createHigherLowerState(),
        ...(state.higherLower || {}),
        queuedTargetStreak: target
      };
      startHigherLowerNormalMatch();
      return true;
    }

    const ROUND_FLOW_GAMES = new Set([
      "tributeFour",
      "tributeFleet",
      "tributeChess",
      "tributeCheckers",
      "tributeReversi",
      "tributeTwentyOne",
      "tributeCrazyEights",
      "doubleSolitaire",
      "tributeTicTacToe"
    ]);

    function usesRoundFlow(game = state.currentGame) {
      return ROUND_FLOW_GAMES.has(game);
    }

    function prepareRound(type, emptyLabel = "game") {
      if (!wagerStartBypass && localOnlineRole() && localOnlineRole() !== SUB) return null;
      if (type === "reclaim" && isThroneSession()) {
        addLog(`<strong class="danger">Reclaim is bank-only.</strong> Switch to a regular bank game to use reclaim.`);
        return null;
      }
      if (type === "reclaim" && state.domVault <= 0) {
        addLog(`<strong class="danger">No banked cash.</strong> ${state.names.sub} has to lose a normal ${emptyLabel} first to unlock reclaim.`);
        return null;
      }
      const amount = type === "reclaim"
        ? normalizeBuyIn(state.domVault)
        : isThroneSession()
          ? currentThroneAmount()
        : normalizeBuyIn(Number(els.betInput.value));
      els.betInput.value = amount;
      state.pot = amount;
      state.mode = type;
      state.winningCells = [];
      state.normalReplayPrompt = null;
      state.settings.focusTax = { active: false, uses: 0 };
      state.lossPressure = createLossPressureState();
      return amount;
    }

    function finishRoundStart(logHtml, shouldRender = true) {
      if (logHtml) addLog(logHtml);
      if (shouldRender || isThroneSession()) render();
      publishState();
    }

    function sendBrattyWelcomeGift() {
      const easterEgg = activeNameEasterEgg();
      const baseUrl = normalizeDomLink(state.settings.throneUrl || (easterEgg && easterEgg.defaultThroneUrl));
      state.settings.brattyWelcomeSeen = true;
      if (!baseUrl) {
        addLog(`<strong class="danger">Gift blocked.</strong> No Throne URL is saved for ${state.names.dom || "Bratty"}.`);
        if (els.brattyWelcomeModal) els.brattyWelcomeModal.classList.add("hidden");
        render();
        publishState();
        return;
      }
      state.settings.paymentDemand = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        url: throneUrlWithTributeAmount(baseUrl, 5),
        tributeAmount: roundThroneTributeAmount(5),
        reason: "bratty-welcome-gift",
        automatic: true
      };
      addLog(`<strong>Small gift sent.</strong> ${state.names.dom || "Bratty"} gets a little thank-you for playing.`);
      if (els.brattyWelcomeModal) els.brattyWelcomeModal.classList.add("hidden");
      renderSidePanel();
      processPaymentDemand();
      render();
      publishState();
    }

    function normalRoundAmountIntro(amount) {
      return isThroneSession()
        ? `<strong>Throne amount:</strong> ${money(amount)} is set from Game Select. If ${state.names.sub} loses, the nearest $5 Throne gift opens automatically.`
        : `<strong>Normal bet:</strong> ${state.names.sub} puts up ${money(amount)}.`;
    }

    function settleRoundBank(winner) {
      const amount = state.pot;
      if (winner === SUB) {
        if (state.mode === "reclaim") {
          const before = state.domVault;
          state.domVault = Math.max(0, state.domVault - amount);
          state.lockedTribute = 0;
          state.tiltLevel = Math.max(0, state.tiltLevel - 1);
          recordLedgerEvent({
            type: "reclaim",
            label: "Reclaim Won",
            detail: `${state.names.sub} pulls tribute out of ${state.names.dom}'s bank.`,
            delta: state.domVault - before,
            before,
            after: state.domVault
          });
          const result = { outcome: "subReclaim", amount };
          showRoundOutcomeSplash(result);
          queueBankReplayPrompt(result);
          return result;
        }
        const result = { outcome: "subNormal", amount: 0 };
        showRoundOutcomeSplash(result);
        queueBankReplayPrompt(result);
        return result;
      }
      if (winner === DOM) {
        triggerSubRoundLossPressure(3);
        if (state.mode !== "reclaim" && isThroneSession()) {
          const before = state.domVault;
          state.settings.pendingThroneDemand = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            game: currentGameLabel(),
            amount,
            createdAt: Date.now()
          };
          recordLedgerEvent({
            type: "demand",
            label: "Throne Page Opened",
            detail: `${state.names.sub} loses ${currentGameLabel()}. The Throne page opens automatically.`,
            delta: 0,
            before,
            after: state.domVault
          });
          demandPayment({ automatic: true });
          const result = { outcome: "domThrone", amount };
          showRoundOutcomeSplash(result);
          queueBankReplayPrompt(result);
          return result;
        }
        const before = state.domVault;
        state.domVault += amount;
        state.lockedTribute = state.domVault;
        recordLedgerEvent({
          type: state.mode === "reclaim" ? "denied" : "tribute",
          label: state.mode === "reclaim" ? "Reclaim Denied" : "Tribute Paid",
          detail: `${state.names.dom} wins ${currentGameLabel()}.`,
          delta: state.domVault - before,
          before,
          after: state.domVault
        });
        if (state.mode === "reclaim") {
          state.tiltLevel += 1;
          const result = { outcome: "domReclaim", amount };
          showRoundOutcomeSplash(result);
          queueBankReplayPrompt(result);
          return result;
        }
        const result = { outcome: "domNormal", amount };
        showRoundOutcomeSplash(result);
        queueBankReplayPrompt(result);
        return result;
      }
      const result = { outcome: "draw", amount: 0 };
      showRoundOutcomeSplash(result);
      queueBankReplayPrompt(result);
      return result;
    }

    function queueBankReplayPrompt(result) {
      if (!result) return;
      if (state.mode !== "normal" && state.mode !== "reclaim") return;
      state.normalReplayPrompt = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        game: state.currentGame,
        mode: state.mode,
        amount: normalizeBuyIn(state.pot || els.betInput.value || 0),
        outcome: result.outcome,
        winner: result.outcome.startsWith("dom") ? DOM : (result.outcome.startsWith("sub") ? SUB : null),
        createdAt: Date.now()
      };
    }

    function showRoundOutcomeSplash(result) {
      if (!result) return;
      if (result.outcome === "domNormal") {
        showOutcomeSplash({
          tone: "dom",
          kicker: "Tribute Accepted",
          title: `Dom Profit +${money(result.amount)}`,
          detail: `${state.names.dom}'s bank claims the stake.`
        });
      } else if (result.outcome === "domThrone") {
        showOutcomeSplash({
          tone: "dom",
          kicker: "Throne Opened",
          title: `${state.names.dom} gets paid`,
          detail: `${state.names.sub}'s Throne page opens for ${money(roundThroneTributeAmount(result.amount))}.`
        });
      } else if (result.outcome === "domReclaim") {
        showOutcomeSplash({
          tone: "danger",
          kicker: "Reclaim Denied",
          title: `${state.names.dom} Holds Control`,
          detail: `${money(result.amount)} is added to the bank.`
        });
      } else if (result.outcome === "subReclaim") {
        showOutcomeSplash({
          tone: "sub",
          kicker: "Reclaim Won",
          title: `${state.names.sub} Takes It Back`,
          detail: `${money(result.amount)} leaves ${state.names.dom}'s bank.`
        });
      } else if (result.outcome === "subNormal") {
        showOutcomeSplash({
          tone: "sub",
          kicker: "Sub Escaped",
          title: "No Tribute Paid",
          detail: `${state.names.dom}'s bank stays unchanged.`
        });
      } else {
        showOutcomeSplash({
          tone: "gold",
          kicker: "Push",
          title: "Stake Returned",
          detail: "No tribute changes hands."
        });
      }
    }

    function normalReplayControlsAllowed() {
      const role = localOnlineRole();
      if (role === SPECTATOR) return false;
      if (state.normalReplayPrompt && state.normalReplayPrompt.game === "tributeFleet") return !state.online.room || !role || role === DOM;
      if (isThroneSession()) return !state.online.room || role === DOM || role === SUB;
      return !state.online.room || role === SUB;
    }

    function renderNormalReplayModal() {
      if (!els.normalReplayModal) return;
      const prompt = state.normalReplayPrompt;
      const show = Boolean(prompt && state.screen === "game" && normalReplayControlsAllowed());
      els.normalReplayModal.classList.toggle("hidden", !show);
      if (!show) {
        if (els.normalFleetNewRulesBtn) els.normalFleetNewRulesBtn.classList.add("hidden");
        if (els.normalReplayBtn) els.normalReplayBtn.textContent = "Replay";
        return;
      }
      const isReclaim = prompt.mode === "reclaim";
      const canReplay = !isReclaim || state.domVault > 0;
      const winnerText = prompt.winner
        ? `${labelFor(prompt.winner)} won.`
        : "Draw.";
      const isFleet = prompt.game === "tributeFleet";
      const changeLabel = prompt.game === "higherLower"
        ? "run"
        : (isThroneSession() ? "game select" : "bet");
      if (isFleet) {
        els.normalReplayText.textContent = `${winnerText} Choose the next Fleet match.`;
      } else if (isThroneSession()) {
        els.normalReplayText.textContent = `${winnerText} Replay or go back to Game Select?`;
      } else {
        els.normalReplayText.textContent = canReplay
          ? `${winnerText} Replay or change ${changeLabel}?`
          : `${winnerText} Bank reclaimed. Change ${changeLabel}?`;
      }
      els.normalReplayBtn.disabled = !canReplay;
      els.normalReplayBtn.textContent = isFleet ? "Current Rules" : "Replay";
      if (els.normalFleetNewRulesBtn) {
        els.normalFleetNewRulesBtn.classList.toggle("hidden", !isFleet);
        els.normalFleetNewRulesBtn.disabled = !isFleet || !canReplay;
      }
      els.normalChangeBetBtn.textContent = prompt.game === "higherLower"
        ? "Change Run"
        : (isFleet ? "Game List" : (isThroneSession() ? "Game Select" : `Change ${changeLabel[0].toUpperCase()}${changeLabel.slice(1)}`));
      els.normalChangeBetBtn.disabled = false;
    }

    function replayNormalRound() {
      const prompt = state.normalReplayPrompt;
      if (!prompt || !normalReplayControlsAllowed()) return;
      if (prompt.game === "tributeFleet") {
        restartFleetWithCurrentRules(prompt);
        return;
      }
      const replayMode = prompt.mode === "reclaim" ? "reclaim" : "normal";
      if (replayMode === "reclaim" && state.domVault <= 0) return;
      state.normalReplayPrompt = null;
      hideOutcomeSplash();
      if (isThroneSession()) fadeThroneKissSplashWhenFocused();
      els.betInput.value = normalizeBuyIn(prompt.amount || state.pot || els.betInput.value || 0);
      wagerStartBypass = true;
      try {
        if (replayMode === "reclaim") {
          startReclaimMatch();
        } else {
          startNormalMatch();
        }
      } finally {
        wagerStartBypass = false;
      }
      render();
      publishState();
    }

    function changeNormalRoundBet() {
      if (!state.normalReplayPrompt || !normalReplayControlsAllowed()) return;
      if (state.normalReplayPrompt.game === "tributeFleet") {
        state.normalReplayPrompt = null;
        hideOutcomeSplash();
        clearThroneKissSplash();
        backToMenu();
        return;
      }
      state.normalReplayPrompt = null;
      hideOutcomeSplash();
      if (isThroneSession() && (!state.online.room || localOnlineRole() === DOM)) {
        clearThroneKissSplash();
        backToMenu();
        return;
      }
      resetCurrentGameToAmountChoice(state.currentGame === "higherLower"
        ? `<strong>Ready for the next Higher / Lower run.</strong>`
        : `<strong>Ready for the next bet.</strong>`);
    }

    function restartFleetWithNewRules() {
      const prompt = state.normalReplayPrompt;
      if (!prompt || prompt.game !== "tributeFleet" || !normalReplayControlsAllowed()) return;
      const replayMode = prompt.mode === "reclaim" ? "reclaim" : "normal";
      if (replayMode === "reclaim" && state.domVault <= 0) return;
      state.normalReplayPrompt = null;
      hideOutcomeSplash();
      if (isThroneSession()) fadeThroneKissSplashWhenFocused();
      els.betInput.value = normalizeBuyIn(prompt.amount || state.pot || els.betInput.value || 0);
      wagerStartBypass = true;
      try {
        if (replayMode === "reclaim") startReclaimMatch();
        else startNormalMatch();
      } finally {
        wagerStartBypass = false;
      }
      render();
      publishState();
    }

    function updatePendingWager(changes, publish = true) {
      if (!state.pendingWager) return;
      state.pendingWager = {
        ...state.pendingWager,
        ...changes,
        updatedAt: Date.now()
      };
      renderWagerApproval();
      renderControls();
      if (publish) publishState();
    }

    function denyPendingWager() {
      if (!state.pendingWager) return;
      state.pendingWager = null;
      renderWagerApproval();
      renderControls();
      publishState();
    }

    function requestWagerAdjustment() {
      if (!state.pendingWager || state.pendingWager.type !== "normal") return;
      updatePendingWager({ status: "adjust", direction: "" });
    }

    function adjustPendingWagerAmount(delta) {
      if (!state.pendingWager || state.pendingWager.type !== "normal") return;
      if (localOnlineRole() && localOnlineRole() !== SUB) return;
      const amount = normalizeBuyIn(Number(state.pendingWager.amount || 1) + delta);
      els.betInput.value = amount;
      updatePendingWager({ amount, status: "adjust", denialMessage: "" });
    }

    function askDomToApproveAdjustedWager() {
      if (!state.pendingWager || state.pendingWager.type !== "normal") return;
      if (localOnlineRole() && localOnlineRole() !== SUB) return;
      updatePendingWager({ status: "adjust-review", denialMessage: "" });
    }

    function rejectAdjustedWager() {
      if (!state.pendingWager || state.pendingWager.type !== "normal") return;
      if (state.online.room && localOnlineRole() !== DOM) return;
      const lines = [
        "That number looks a little poor. Raise it.",
        "That little offer barely deserves my attention.",
        "Too small. Try again properly.",
        "Cute. Now make it worth approving.",
        "Come back with something less embarrassing.",
        "You call that a bet?",
        "Raise it before I get bored.",
        "I said impress me, not embarrass yourself.",
        "Raise it until it stops looking desperate.",
        "Still too light. Add more.",
        "Your goddess is waiting. Do better.",
        "Small and pathetic, just like that thing between your legs."
      ];
      updatePendingWager({
        status: "adjust",
        denialMessage: lines[Math.floor(Math.random() * lines.length)]
      });
    }

    function sendWagerEmoji(emoji) {
      if (!state.pendingWager || state.pendingWager.status !== "adjust") return;
      if (state.online.room && localOnlineRole() !== DOM) return;
      const allowed = ["😤", "🥱", "😘", "🥵"];
      if (!allowed.includes(emoji)) return;
      const emojis = [
        ...((state.pendingWager.emojis || []).slice(-17)),
        { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, emoji, at: Date.now() }
      ];
      updatePendingWager({ emojis });
    }

    function approvePendingWager() {
      const pending = state.pendingWager;
      if (!pending) return;
      if (state.online.room && localOnlineRole() !== DOM) return;
      if (!state.online.room) {
        startApprovedWager(pending);
        return;
      }
      const approvedPending = {
        ...pending,
        status: "approved",
        approvedStartId: `${pending.id}-start`,
        approvedAt: Date.now()
      };
      updatePendingWager(approvedPending);
      startApprovedWager(approvedPending);
    }

    function startApprovedWager(pending) {
      if (!pending || processedWagerStartId === pending.approvedStartId) return false;
      processedWagerStartId = pending.approvedStartId || pending.id;
      state.pendingWager = null;
      els.betInput.value = normalizeBuyIn(Number(pending.amount));
      wagerStartBypass = true;
      try {
        if (pending.type === "reclaim") {
          startReclaimMatch();
        } else {
          startNormalMatch();
        }
      } finally {
        wagerStartBypass = false;
      }
      render();
      publishState();
      return true;
    }

    function processApprovedWager() {
      const pending = state.pendingWager;
      if (!pending || pending.status !== "approved" || !pending.approvedStartId) return false;
      if (state.online.room && localOnlineRole() !== SUB) return false;
      return startApprovedWager(pending);
    }

    function handleWagerAction(action, button) {
      if (action === "pregame-normal") startPregameNormalBet();
      if (action === "pregame-reclaim") startPregameReclaimBet();
      if (action === "pregame-adjust") updatePregameBetAmount(Number(button.dataset.delta || 0));
      if (action === "pregame-set") setPregameBetAmountFromInput(button.value);
      if (action === "approve") approvePendingWager();
      if (action === "deny") denyPendingWager();
      if (action === "adjust-request") requestWagerAdjustment();
      if (action === "back-review") updatePendingWager({ status: "review", direction: "" });
      if (action === "ask-approval") askDomToApproveAdjustedWager();
      if (action === "reject-adjust") rejectAdjustedWager();
      if (action === "adjust") adjustPendingWagerAmount(Number(button.dataset.delta || 0));
      if (action === "emoji") sendWagerEmoji(button.dataset.emoji || "");
    }

    function bindWagerActionButtons() {
      els.wagerModal.querySelectorAll("[data-wager-action]").forEach((button) => {
        if (button.tagName === "INPUT") {
          button.onchange = (event) => {
            handleWagerAction(button.dataset.wagerAction, button);
          };
          button.onkeydown = (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleWagerAction(button.dataset.wagerAction, button);
            }
          };
          return;
        }
        button.onclick = (event) => {
          event.preventDefault();
          event.stopPropagation();
          handleWagerAction(button.dataset.wagerAction, button);
        };
      });
    }

    function renderWagerApproval() {
      const pending = state.pendingWager;
      const role = localOnlineRole();
      const showPregameBet = !isThroneSession() && !pending && betSetupGameActive() && betSetupAllowedForRole();
      const show = showPregameBet || Boolean(pending && pendingWagerAllowedForRole());
      els.wagerModal.classList.toggle("hidden", !show);
      if (!show) {
        els.wagerModalBody.innerHTML = "";
        els.wagerModalActions.innerHTML = "";
        els.wagerEmojiDock.innerHTML = "";
        els.wagerEmojiDock.className = "wager-emoji-dock hidden";
        return;
      }
      if (showPregameBet) {
        const amount = pregameBetAmount();
        const reclaimAvailable = !isThroneSession() && state.domVault > 0;
        const amountLocked = isThroneSession() || state.settings.subBetControl === "locked";
        const roleName = escapeHtml(state.names.sub || "Sub");
        els.wagerModalTitle.textContent = isThroneSession() ? "Choose Tribute Amount" : "Place The Bet";
        els.wagerEmojiDock.innerHTML = "";
        els.wagerEmojiDock.className = "wager-emoji-dock hidden";
        els.wagerModalBody.innerHTML = `
          <p class="chooser-line">${roleName} starts ${escapeHtml(currentGameLabel())} by setting the stake before the table opens.</p>
          <div class="wager-adjust-row">
            <button data-wager-action="pregame-adjust" data-delta="-10"${amountLocked ? " disabled" : ""}>&lt;-10</button>
            <button data-wager-action="pregame-adjust" data-delta="-5"${amountLocked ? " disabled" : ""}>&lt;-5</button>
            <button data-wager-action="pregame-adjust" data-delta="-1"${amountLocked ? " disabled" : ""}>&lt;-1</button>
            <label class="wager-amount-input">
              <span>${isThroneSession() ? "Throne" : "Bet"}</span>
              <input type="number" min="1" step="1" value="${amount}" data-wager-action="pregame-set"${amountLocked ? " disabled" : ""}>
            </label>
            <button data-wager-action="pregame-adjust" data-delta="1"${amountLocked ? " disabled" : ""}>+1&gt;</button>
            <button data-wager-action="pregame-adjust" data-delta="5"${amountLocked ? " disabled" : ""}>+5&gt;</button>
            <button data-wager-action="pregame-adjust" data-delta="10"${amountLocked ? " disabled" : ""}>+10&gt;</button>
          </div>
          <div class="ledger-stats wager-ledger-preview">
            <span>Current pot <strong>${money(isThroneSession() ? roundThroneTributeAmount(amount) : amount)}</strong></span>
            <span>Dom bank <strong>${money(state.domVault)}</strong></span>
            <span>Cash to reclaim <strong>${money(state.domVault)}</strong></span>
            <span>${isThroneSession() ? "Mode" : "Bet control"} <strong>${isThroneSession() ? "Throne" : (state.settings.subBetControl === "locked" ? "Default only" : "Editable")}</strong></span>
          </div>
        `;
        els.wagerModalActions.innerHTML = `
          <button class="primary" data-wager-action="pregame-normal">${isThroneSession() ? "Start" : "Start Bet"}</button>
          ${reclaimAvailable ? `<button data-wager-action="pregame-reclaim">Reclaim ${money(state.domVault)}</button>` : ""}
        `;
        bindWagerActionButtons();
        return;
      }
      const isDomView = !state.online.room || !role || role === DOM;
      const isSubView = state.online.room && role === SUB;
      const lines = wagerResultLines(pending);
      els.wagerModalTitle.textContent = isDomView ? "Decide Their Fate" : "Awaiting Decision";

      if (pending.status === "adjust" || pending.status === "adjust-review") {
        const arrowDisabled = isDomView ? " disabled" : "";
        const waitingApproval = pending.status === "adjust-review";
        const amountWord = pending.type !== "reclaim" && isThroneSession() ? "Amount" : "Bet";
        els.wagerModalTitle.textContent = isDomView ? `Adjust The ${amountWord}` : `Change The ${amountWord}`;
        els.wagerModalBody.innerHTML = `
          <p class="chooser-line">${isDomView
            ? (waitingApproval ? `${escapeHtml(state.names.sub || "Sub")} wants approval.` : `Watch the new ${amountWord.toLowerCase()} live.`)
            : (waitingApproval ? "Waiting for approval." : `${escapeHtml(state.names.dom || "Dom")} wants the ${amountWord.toLowerCase()} changed.`)}</p>
          ${(!isDomView && pending.denialMessage) ? `<p class="chooser-line danger">${escapeHtml(pending.denialMessage)}</p>` : ""}
          <div class="wager-adjust-row">
            <button data-wager-action="adjust" data-delta="-10"${arrowDisabled}>&lt;-10</button>
            <button data-wager-action="adjust" data-delta="-5"${arrowDisabled}>&lt;-5</button>
            <button data-wager-action="adjust" data-delta="-1"${arrowDisabled}>&lt;-1</button>
            <div class="wager-amount">${money(pending.amount)}</div>
            <button data-wager-action="adjust" data-delta="1"${arrowDisabled}>+1&gt;</button>
            <button data-wager-action="adjust" data-delta="5"${arrowDisabled}>+5&gt;</button>
            <button data-wager-action="adjust" data-delta="10"${arrowDisabled}>+10&gt;</button>
          </div>
        `;
        if (isDomView) {
          els.wagerModalActions.innerHTML = waitingApproval
            ? `<button class="primary" data-wager-action="approve">Approve</button><button class="danger-button" data-wager-action="reject-adjust">Deny</button>`
            : `<button data-wager-action="back-review">Back</button>`;
        } else {
          els.wagerModalActions.innerHTML = waitingApproval
            ? ""
            : `<button class="primary" data-wager-action="ask-approval">Ask To Approve</button>`;
        }
        if (isDomView) {
          els.wagerEmojiDock.className = "wager-emoji-dock";
          els.wagerEmojiDock.innerHTML = ["😤", "🥱", "😘", "🥵"]
            .map((emoji) => `<button class="wager-emoji-btn" data-wager-action="emoji" data-emoji="${emoji}">${emoji}</button>`)
            .join("");
        } else {
          const now = Date.now();
          const floatEmojis = (pending.emojis || [])
            .filter((item) => now - Number(item.at || String(item.id || "").split("-")[0] || 0) < 2400)
            .slice(-18);
          els.wagerEmojiDock.className = floatEmojis.length ? "wager-float-field" : "wager-float-field hidden";
          els.wagerEmojiDock.innerHTML = floatEmojis.map((item, index) => {
            const x = ((index % 6) - 2.5) * 72 + (Math.floor(index / 6) * 24);
            const age = now - Number(item.at || String(item.id || "").split("-")[0] || now);
            const delay = Math.max(-2200, -age);
            return `<span class="wager-emoji-pop" style="--x:${x}px; animation-delay:${delay}ms">${escapeHtml(item.emoji)}</span>`;
          }).join("");
        }
        bindWagerActionButtons();
        return;
      }

      els.wagerEmojiDock.innerHTML = "";
      els.wagerEmojiDock.className = "wager-emoji-dock hidden";

      if (isSubView) {
        els.wagerModalBody.innerHTML = `
          <p class="chooser-line">${escapeHtml(state.names.dom || "Dom")} is deciding your fate.</p>
          <p class="chooser-line">${escapeHtml(wagerLabel(pending.type))}: ${money(pending.amount)}</p>
        `;
        els.wagerModalActions.innerHTML = "";
        bindWagerActionButtons();
        return;
      }

      const adjustmentNote = pending.status === "adjust"
        ? `<p class="chooser-line">${escapeHtml(state.names.sub || "Sub")} is adjusting the ${pending.type !== "reclaim" && isThroneSession() ? "amount" : "bet"}. Current offer: ${money(pending.amount)}</p>`
        : "";
      const pendingLabel = wagerLabel(pending.type);
      const pickedLine = pending.type !== "reclaim" && isThroneSession()
        ? `${escapeHtml(state.names.sub || "Sub")} picked the Throne payment amount for ${escapeHtml(currentGameLabel())}.`
        : `${escapeHtml(state.names.sub || "Sub")} picked ${escapeHtml(pendingLabel)} for ${escapeHtml(currentGameLabel())}.`;
      els.wagerModalBody.innerHTML = `
        <p class="chooser-line">${pickedLine}</p>
        <p class="chooser-line">${escapeHtml(pendingLabel)}: ${money(pending.amount)}</p>
        ${adjustmentNote}
        ${lines.map((line) => `<p class="chooser-line">${escapeHtml(line)}</p>`).join("")}
      `;
      if (pending.status === "adjust") {
        els.wagerModalActions.innerHTML = `
          <button class="primary" data-wager-action="approve">Confirm</button>
          <button data-wager-action="back-review">Back</button>
        `;
      } else {
        const adjustButtons = pending.type === "normal" && pending.game !== "higherLower"
          ? `<button data-wager-action="adjust-request">Raise / Lower</button>`
          : "";
        els.wagerModalActions.innerHTML = `
          <button class="primary" data-wager-action="approve">Approve</button>
          <button class="danger-button" data-wager-action="deny">Deny</button>
          ${adjustButtons}
        `;
      }
      bindWagerActionButtons();
    }

    function startNormalMatch() {
      if (!wagerStartBypass && !requestWagerApproval("normal")) return;
      if (state.currentGame === "tributeChess") {
        startChessNormalMatch();
        return;
      }
      if (state.currentGame === "tributeCheckers") {
        startCheckersNormalMatch();
        return;
      }
      if (state.currentGame === "tributeReversi") {
        startReversiNormalMatch();
        return;
      }
      if (state.currentGame === "tributeTwentyOne") {
        startTwentyOneNormalMatch();
        return;
      }
      if (state.currentGame === "higherLower") {
        startHigherLowerNormalMatch();
        return;
      }
      if (state.currentGame === "tributeCrazyEights") {
        startCrazyEightsNormalMatch();
        return;
      }
      if (state.currentGame === "doubleSolitaire") {
        startDoubleSolitaireNormalMatch();
        return;
      }
      if (state.currentGame === "tributeTicTacToe") {
        startTicTacToeNormalMatch();
        return;
      }
      if (state.currentGame === "wheelSpin") {
        startWheelSpinNormalMatch();
        return;
      }
      if (state.currentGame === "tributeFleet") {
        startFleetNormalMatch();
        return;
      }
      const bet = prepareRound("normal");
      if (bet === null) return;
      state.blockedColumns = [];
      state.skipAvailable = false;
      state.skipArmed = false;
      state.reclaimPassAvailable = false;
      state.lockColumnAvailable = false;
      state.lockColumnMode = false;
      state.lockedColumn = null;
      state.pressureDropAvailable = false;
      state.pressureDropArmed = false;
      state.pressureDropColumn = null;
      const starter = chooseStartingPlayer();
      preserveTiltLevel(() => resetMatch(starter));
      finishRoundStart(`${normalRoundAmountIntro(bet)} ${labelFor(starter)} starts.`, false);
    }

    function startReclaimMatch() {
      if (!wagerStartBypass && !requestWagerApproval("reclaim")) return;
      if (state.currentGame === "tributeChess") {
        startChessReclaimMatch();
        return;
      }
      if (state.currentGame === "tributeCheckers") {
        startCheckersReclaimMatch();
        return;
      }
      if (state.currentGame === "tributeReversi") {
        startReversiReclaimMatch();
        return;
      }
      if (state.currentGame === "tributeTwentyOne") {
        startTwentyOneReclaimMatch();
        return;
      }
      if (state.currentGame === "higherLower") {
        return;
      }
      if (state.currentGame === "tributeCrazyEights") {
        startCrazyEightsReclaimMatch();
        return;
      }
      if (state.currentGame === "doubleSolitaire") {
        startDoubleSolitaireReclaimMatch();
        return;
      }
      if (state.currentGame === "tributeTicTacToe") {
        startTicTacToeReclaimMatch();
        return;
      }
      if (state.currentGame === "wheelSpin") {
        startWheelSpinReclaimMatch();
        return;
      }
      if (state.currentGame === "tributeFleet") {
        startFleetReclaimMatch();
        return;
      }
      const pot = prepareRound("reclaim", "match");
      if (pot === null) return;
      resetMatch(DOM);
      state.reclaimPassAvailable = false;
      state.skipAvailable = false;
      state.skipArmed = false;
      state.lockColumnAvailable = tributeFourLockAvailable();
      state.lockColumnMode = false;
      state.lockedColumn = null;
      state.pressureDropAvailable = tributeFourPressureAvailable();
      state.pressureDropArmed = false;
      state.pressureDropColumn = null;
      state.domOpened = true;
      finishRoundStart(`<strong>Reclaim match:</strong> ${state.names.sub} is trying to win back ${money(pot)} from ${state.names.dom}'s bank. Tilt level ${state.tiltLevel}.`, false);
    }

    function resetMatch(firstTurn) {
      state.board = createBoard();
      state.turn = firstTurn;
      state.active = true;
      state.winningCells = [];
      state.reclaimPassAvailable = false;
      state.skipAvailable = false;
      state.skipArmed = false;
      state.lockColumnAvailable = reclaimPerksActive() && tributeFourLockAvailable();
      state.lockColumnMode = false;
      state.lockedColumn = null;
      state.pressureDropAvailable = reclaimPerksActive() && tributeFourPressureAvailable();
      state.pressureDropArmed = false;
      state.pressureDropColumn = null;
      state.domOpened = reclaimPerksActive();
      state.blockedColumns = [];
      render();
    }

    function normalizeBuyIn(value) {
      if (!Number.isFinite(value)) return Math.max(1, Math.round(state.settings.subDefaultBet || 10));
      return Math.max(1, Math.round(value));
    }

    function resetObedienceOrdersBoard() {
      state.obedience = createObedienceState();
      state.obedience.message = `${state.names.dom || "Dom"} picks an order on the grid.`;
      state.active = false;
      state.mode = "normal";
      state.pot = 0;
      state.turn = DOM;
      state.winningCells = [];
    }

    function obedienceControlsAllowed(player) {
      const role = localOnlineRole();
      return !role || role === player;
    }

    function ensureObedienceOrder() {
      if (!state.obedience) state.obedience = createObedienceState();
      if (!Array.isArray(state.obedience.order)) {
        state.obedience.order = Array.isArray(state.obedience.sequence) ? [...state.obedience.sequence] : [];
      }
      if (!Array.isArray(state.obedience.input)) state.obedience.input = [];
      if (!Array.isArray(state.obedience.layout)) state.obedience.layout = [];
      if (!Number.isFinite(Number(state.obedience.pressure))) state.obedience.pressure = 1;
      state.obedience.pressure = Math.max(1, Math.min(OBEDIENCE_MAX_PRESSURE, Math.round(Number(state.obedience.pressure || 1))));
      if (!Number.isFinite(Number(state.obedience.focus))) state.obedience.focus = OBEDIENCE_STARTING_FOCUS;
      state.obedience.focus = Math.max(0, Math.round(Number(state.obedience.focus || 0)));
      if (!state.obedience.twist || !OBEDIENCE_TWISTS[state.obedience.twist]) state.obedience.twist = "clean";
      if (!state.obedience.pendingTwist || !OBEDIENCE_TWISTS[state.obedience.pendingTwist]) state.obedience.pendingTwist = "clean";
      if (!state.obedience.streakLabel) state.obedience.streakLabel = obedienceStreakLabel(Number(state.obedience.successes || 0));
      return state.obedience;
    }

    function obedienceCellLabel(index) {
      const cell = Number(index);
      return OBEDIENCE_TILES[cell] ? OBEDIENCE_TILES[cell].label : "?";
    }

    function obedienceTile(index) {
      const cell = Number(index);
      return OBEDIENCE_TILES[cell] || OBEDIENCE_TILES[0];
    }

    function obedienceStreakLabel(successes) {
      if (successes >= 5) return "Perfect";
      if (successes >= 4) return "Locked In";
      if (successes >= 3) return "Trained";
      if (successes >= 2) return "Compliant";
      if (successes >= 1) return "Focused";
      return "Unproven";
    }

    function obediencePressurePayout() {
      const obedience = ensureObedienceOrder();
      const pressure = Math.max(1, Math.min(OBEDIENCE_MAX_PRESSURE, Number(obedience.pressure || 1)));
      const twistBonus = obedience.twist === "greedy" ? 3 : (obedience.twist === "cruel" ? 2 : 0);
      return Math.max(1, (pressure * 2) + Math.max(0, (obedience.order || []).length - OBEDIENCE_MIN_ORDER) + Number(obedience.mistakes || 0) + twistBonus);
    }

    function obedienceLayoutForTwist(twist) {
      const base = Array.from({ length: OBEDIENCE_GRID_SIZE }, (_, index) => index);
      if (twist !== "shuffle") return base;
      return [4, 0, 8, 2, 6, 1, 7, 3, 5];
    }

    function setObedienceGridCell(index) {
      const obedience = ensureObedienceOrder();
      if (!obedienceControlsAllowed(DOM) || (obedience.phase !== "idle" && obedience.phase !== "building")) return;
      const cell = Number(index);
      if (!Number.isInteger(cell) || cell < 0 || cell >= OBEDIENCE_GRID_SIZE) return;
      obedience.phase = "building";
      obedience.order = [...obedience.order, cell];
      obedience.input = [];
      obedience.revealedIndex = null;
      obedience.round = obedience.order.length;
      obedience.message = `${state.names.dom || "Dom"} picked ${obedience.order.length} command tile${obedience.order.length === 1 ? "" : "s"}.`;
      state.active = false;
      state.turn = DOM;
      render();
      publishState();
    }

    function undoObedienceOrder() {
      const obedience = ensureObedienceOrder();
      if (!obedienceControlsAllowed(DOM) || obedience.phase === "recall" || !obedience.order.length) return;
      obedience.order = obedience.order.slice(0, -1);
      obedience.input = [];
      obedience.revealedIndex = null;
      obedience.round = obedience.order.length;
      obedience.phase = obedience.order.length ? "building" : "idle";
      obedience.message = obedience.order.length
        ? `${state.names.dom || "Dom"} removed the last tile.`
        : `${state.names.dom || "Dom"} picks an order on the grid.`;
      render();
      publishState();
    }

    function clearObedienceOrder() {
      const obedience = ensureObedienceOrder();
      if (!obedienceControlsAllowed(DOM) || obedience.phase === "recall") return;
      obedience.order = [];
      obedience.input = [];
      obedience.revealedIndex = null;
      obedience.round = 0;
      obedience.phase = "idle";
      obedience.message = `${state.names.dom || "Dom"} cleared the grid order.`;
      state.active = false;
      state.turn = DOM;
      render();
      publishState();
    }

    function sendObedienceOrder() {
      const obedience = ensureObedienceOrder();
      if (!obedienceControlsAllowed(DOM) || obedience.phase === "recall") return;
      if (obedience.order.length < OBEDIENCE_MIN_ORDER) {
        obedience.message = `Pick at least ${OBEDIENCE_MIN_ORDER} tiles before sending the order.`;
        render();
        publishState();
        return;
      }
      obedience.input = [];
      obedience.revealedIndex = null;
      obedience.phase = "recall";
      obedience.round = obedience.order.length;
      obedience.twist = obedience.pendingTwist || "clean";
      obedience.layout = obedienceLayoutForTwist(obedience.twist);
      obedience.message = `${state.names.sub || "Sub"} repeats the hidden ${OBEDIENCE_TWISTS[obedience.twist].label.toLowerCase()} order.`;
      state.active = true;
      state.turn = SUB;
      addLog(`<strong>${state.names.dom || "Dom"} sends an order.</strong> ${state.names.sub || "Sub"} must repeat ${obedience.order.length} tiles at pressure ${obedience.pressure}.`);
      render();
      publishState();
    }

    function obedienceMistakeAmount() {
      return obediencePressurePayout();
    }

    function spendObedienceFocus() {
      const obedience = ensureObedienceOrder();
      if (obedience.phase !== "recall" || !obedienceControlsAllowed(SUB) || obedience.focus <= 0) return;
      const nextIndex = obedience.input.length;
      if (nextIndex >= obedience.order.length) return;
      obedience.focus -= 1;
      obedience.revealedIndex = nextIndex;
      obedience.message = `Focus spent. Next tile revealed: ${obedienceCellLabel(obedience.order[nextIndex])}.`;
      render();
      publishState();
    }

    function setObedienceTwist(twist) {
      const obedience = ensureObedienceOrder();
      if (!obedienceControlsAllowed(DOM) || obedience.phase === "recall" || !OBEDIENCE_TWISTS[twist]) return;
      obedience.pendingTwist = twist;
      obedience.message = `${OBEDIENCE_TWISTS[twist].label} twist selected.`;
      render();
      publishState();
    }

    function pressObedienceOrder() {
      const obedience = ensureObedienceOrder();
      if (!obedienceControlsAllowed(DOM) || obedience.phase !== "complete") return;
      obedience.phase = "building";
      obedience.input = [];
      obedience.revealedIndex = null;
      obedience.pressure = Math.min(OBEDIENCE_MAX_PRESSURE, Number(obedience.pressure || 1) + 1);
      obedience.message = `${state.names.dom || "Dom"} pressed the advantage. Add another tile or send again at pressure ${obedience.pressure}.`;
      render();
      publishState();
    }

    function cashOutObedienceOrder() {
      const obedience = ensureObedienceOrder();
      if (!obedienceControlsAllowed(DOM) || obedience.phase !== "complete") return;
      obedience.phase = "cashed";
      obedience.message = `${state.names.dom || "Dom"} ended the order at ${obedience.streakLabel}.`;
      showOutcomeSplash({
        tone: "sub",
        kicker: "Order Ended",
        title: obedience.streakLabel,
        detail: `${money(obedience.tributePaid || 0)} paid across the duel.`
      });
      render();
      publishState();
    }

    function repeatObedienceGridCell(index) {
      const obedience = ensureObedienceOrder();
      if (!obedience || obedience.phase !== "recall" || !obedienceControlsAllowed(SUB)) return;
      const cell = Number(index);
      if (!Number.isInteger(cell) || cell < 0 || cell >= OBEDIENCE_GRID_SIZE) return;
      resolveFocusTaxSuccess();
      const expected = obedience.order[obedience.input.length];
      if (cell !== expected) {
        const before = state.domVault;
        const tribute = obedienceMistakeAmount();
        state.domVault += tribute;
        state.lockedTribute = state.domVault;
        obedience.mistakes += 1;
        obedience.tributePaid += tribute;
        obedience.input = [];
        obedience.revealedIndex = null;
        obedience.phase = "building";
        obedience.message = `Wrong tile. ${money(tribute)} tribute paid. ${state.names.dom || "Dom"} can resend or adjust the order.`;
        state.active = false;
        state.turn = DOM;
        recordLedgerEvent({
          type: "obedience",
          label: "Obedience Mistake",
          detail: `${state.names.sub || "Sub"} missed ${obedienceCellLabel(expected)} at pressure ${obedience.pressure}.`,
          delta: tribute,
          before,
          after: state.domVault
        });
        showOutcomeSplash({
          tone: "dom",
          kicker: "Order Failed",
          title: `${money(tribute)} Tribute`,
          detail: `${obedienceCellLabel(cell)} was not the order.`
        });
        addLog(`<strong>Order failed.</strong> ${state.names.sub || "Sub"} pays ${money(tribute)} to ${state.names.dom || "Dom"}.`);
        render();
        publishState();
        return;
      }
      obedience.input = [...obedience.input, cell];
      if (obedience.input.length < obedience.order.length) {
        obedience.revealedIndex = null;
        obedience.message = `${obedience.input.length}/${obedience.order.length} tiles copied.`;
        render();
        publishState();
        return;
      }
      obedience.successes += 1;
      obedience.input = [];
      obedience.revealedIndex = null;
      obedience.phase = "complete";
      obedience.streakLabel = obedienceStreakLabel(Number(obedience.successes || 0));
      obedience.message = `${state.names.sub || "Sub"} copied ${obedience.order.length} tiles. ${state.names.dom || "Dom"} can press, twist, or cash out.`;
      state.active = false;
      state.turn = DOM;
      showOutcomeSplash({
        tone: "sub",
        kicker: "Orders Complete",
        title: obedience.streakLabel,
        detail: `${money(obedience.tributePaid || 0)} paid in mistakes.`
      });
      addLog(`<strong>Order repeated.</strong> ${state.names.sub || "Sub"} copied ${obedience.order.length} tiles at pressure ${obedience.pressure}.`);
      render();
      publishState();
    }

    function handleObedienceBoardClick(event) {
      if (state.currentGame !== "obedienceOrders") return;
      const actionButton = event.target.closest("[data-obedience-action]");
      if (actionButton) {
        const action = actionButton.dataset.obedienceAction;
        if (action === "send") sendObedienceOrder();
        if (action === "undo") undoObedienceOrder();
        if (action === "clear") clearObedienceOrder();
        if (action === "focus") spendObedienceFocus();
        if (action === "press") pressObedienceOrder();
        if (action === "cashout") cashOutObedienceOrder();
        if (action === "reset") {
          resetObedienceOrdersBoard();
          addLog(`<strong>Obedience Orders reset.</strong> ${state.names.dom || "Dom"} can build a new grid order.`);
          render();
          publishState();
        }
        return;
      }
      const twistButton = event.target.closest("[data-obedience-twist]");
      if (twistButton) {
        setObedienceTwist(twistButton.dataset.obedienceTwist);
        return;
      }
      const cellButton = event.target.closest("[data-obedience-cell]");
      if (!cellButton) return;
      if (state.obedience && state.obedience.phase === "recall") {
        repeatObedienceGridCell(cellButton.dataset.obedienceCell);
      } else {
        setObedienceGridCell(cellButton.dataset.obedienceCell);
      }
    }

    const REVERSI_DIRECTIONS = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];

    function resetTributeReversiBoard() {
      state.reversi = createReversiState();
      state.active = false;
      state.mode = "normal";
      state.pot = 0;
      state.turn = SUB;
      state.winningCells = [];
    }

    function startReversiNormalMatch() {
      const bet = prepareRound("normal", "reversi match");
      if (bet === null) return;
      const starter = chooseStartingPlayer();
      startReversiSetup(starter, `${normalRoundAmountIntro(bet)} ${labelFor(starter)} plays dark and moves first.`);
      finishRoundStart(`${normalRoundAmountIntro(bet)} ${state.names.dom} chooses the Reversi settings.`, false);
    }

    function startReversiReclaimMatch() {
      const pot = prepareRound("reclaim", "reversi match");
      if (pot === null) return;
      startReversiSetup(DOM, `<strong>Reclaim edge:</strong> ${state.names.dom} plays first as light. Tier ${state.tiltLevel} advantages stack.`);
      finishRoundStart(`<strong>Reclaim match:</strong> ${state.names.sub} is trying to win back ${money(pot)} on the Reversi board. ${state.names.dom} chooses the Reversi settings.`, false);
    }

    function startReversiSetup(starter, intro) {
      state.reversi = createReversiState();
      state.reversi.commandAvailable = reversiTierActive(5);
      state.reversi.setupPending = true;
      state.reversi.pendingStarter = starter;
      state.reversi.pendingIntro = intro;
      state.reversi.timerMode = "none";
      state.reversi.timerTarget = "both";
      state.reversi.customTimerMinutes = 10;
      state.turn = DOM;
      state.active = true;
      render();
    }

    function reversiBoard() {
      if (!state.reversi || !Array.isArray(state.reversi.board)) state.reversi = createReversiState();
      return state.reversi.board;
    }

    function reversiInBounds(row, col) {
      return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    function reversiOpponent(player) {
      return player === DOM ? SUB : DOM;
    }

    function reversiTierActive(tier) {
      return state.currentGame === "tributeReversi"
        && reclaimPerksActive()
        && domAdvantagesEnabled()
        && Number(state.tiltLevel || 0) >= tier;
    }

    function brattyReversiTrainingNumbers() {
      const easterEgg = activeNameEasterEgg();
      return Boolean(easterEgg && easterEgg.id === "brattyBb" && Number(state.tiltLevel || 0) <= 1);
    }

    function reversiCanSeeFlipNumbers(viewer = localOnlineRole()) {
      if (state.reversi && state.reversi.showNumberHints === false) return false;
      if (!reclaimPerksActive() || !domAdvantagesEnabled()) return true;
      if (Number(state.tiltLevel || 0) <= 0) return true;
      if (brattyReversiTrainingNumbers()) return true;
      return !viewer || viewer === DOM;
    }

    function reversiCanSeePriorityWarnings(viewer = localOnlineRole()) {
      return reversiTierActive(2) && (!viewer || viewer === DOM);
    }

    function reversiIsCorner(row, col) {
      return (row === 0 || row === 7) && (col === 0 || col === 7);
    }

    function reversiIsEdge(row, col) {
      return row === 0 || row === 7 || col === 0 || col === 7;
    }

    function reversiLockedMatches(row, col) {
      const locked = state.reversi && state.reversi.lockedDisc;
      return Boolean(locked && locked.row === row && locked.col === col);
    }

    function reversiFlipsForMove(row, col, player, board = reversiBoard()) {
      if (!reversiInBounds(row, col) || board[row][col]) return [];
      const opponent = reversiOpponent(player);
      const flips = [];
      REVERSI_DIRECTIONS.forEach(([dr, dc]) => {
        const line = [];
        let blockedByLock = false;
        let r = row + dr;
        let c = col + dc;
        while (reversiInBounds(r, c) && board[r][c] === opponent) {
          if (reversiLockedMatches(r, c)) {
            blockedByLock = true;
            break;
          }
          line.push([r, c]);
          r += dr;
          c += dc;
        }
        if (!blockedByLock && line.length && reversiInBounds(r, c) && board[r][c] === player) {
          flips.push(...line);
        }
      });
      return flips;
    }

    function reversiLegalMoves(player, board = reversiBoard()) {
      const moves = [];
      for (let row = 0; row < 8; row += 1) {
        for (let col = 0; col < 8; col += 1) {
          const flips = reversiFlipsForMove(row, col, player, board);
          if (flips.length) moves.push({ row, col, flips });
        }
      }
      return moves;
    }

    function reversiScore(board = reversiBoard()) {
      let sub = 0;
      let dom = 0;
      for (let row = 0; row < 8; row += 1) {
        for (let col = 0; col < 8; col += 1) {
          if (board[row][col] === SUB) sub += 1;
          if (board[row][col] === DOM) dom += 1;
        }
      }
      return { sub, dom };
    }

    function playReversiMove(row, col) {
      if (state.currentGame !== "tributeReversi" || !state.active) return;
      if (state.reversi && state.reversi.setupPending) return;
      const commanded = Boolean(state.reversi && state.reversi.commandMode && state.turn === SUB);
      if (state.reversi && state.reversi.commandWindow && !commanded) return;
      if (localOnlineRole() && localOnlineRole() !== state.turn && !(commanded && localOnlineRole() === DOM)) return;
      const board = reversiBoard();
      const player = state.turn;
      const flips = reversiFlipsForMove(row, col, player, board);
      if (!flips.length) return;
      board[row][col] = player;
      flips.forEach(([r, c]) => {
        board[r][c] = player;
      });
      if (player === SUB && !commanded) resolveFocusTaxSuccess();
      state.reversi.lastMove = { row, col, player, flips };
      state.reversi.passes = 0;
      if (player === SUB) {
        state.reversi.lockedDisc = null;
      }
      if (commanded) {
        state.reversi.commandMode = false;
        state.reversi.commandWindow = false;
        state.reversi.commandAvailable = false;
        addLog(`<strong>Command Move.</strong> ${state.names.dom} chooses ${state.names.sub}'s Reversi move.`);
        if (flips.length <= 1) {
          addReversiTribute(2, "Command Tax", `${state.names.dom} commands a low-flip move.`);
        }
      }
      addLog(`<strong>${labelFor(player)} places a disc.</strong> ${flips.length} ${flips.length === 1 ? "disc flips" : "discs flip"}.`);
      if (player === DOM) {
        triggerSubLossPressure({
          weight: Math.max(1, Math.min(3, Math.ceil(flips.length / 3))),
          message: true,
          messageThreshold: 5,
          strengthBoost: flips.length >= 5 ? 0.1 : 0,
          source: "reversi-flip"
        });
        applyReversiDomFlipTiers(row, col, flips);
      }
      advanceReversiTurn();
    }

    function addReversiTribute(amount, label, detail) {
      const delta = Math.max(0, Math.round(Number(amount || 0)));
      if (!delta) return;
      const before = state.domVault;
      state.domVault += delta;
      state.lockedTribute = state.domVault;
      recordLedgerEvent({
        type: "reversi",
        label,
        detail,
        delta: state.domVault - before,
        before,
        after: state.domVault
      });
      addLog(`<strong>${label}.</strong> ${money(delta)} moves into ${state.names.dom}'s bank.`);
    }

    function applyReversiDomFlipTiers(row, col, flips) {
      if (!state.active || !reclaimPerksActive() || !domAdvantagesEnabled()) return;
      if (reversiTierActive(3) && flips.length >= 3) {
        const amount = reversiTierActive(6)
          ? (flips.length >= 5 ? 4 : 2)
          : (flips.length >= 5 ? 2 : 1);
        addReversiTribute(amount, "Tribute Flip", `${state.names.dom} flips ${flips.length} discs in Reversi.`);
      }
      if (reversiTierActive(4) && flips.length >= 4) {
        const [lockRow, lockCol] = flips[0];
        state.reversi.lockedDisc = { row: lockRow, col: lockCol };
        addLog(`<strong>Locked Disc.</strong> One flipped ${state.names.dom} disc cannot be flipped back on ${state.names.sub}'s next move.`);
      }
      if (reversiTierActive(6) && reversiIsCorner(row, col) && !state.reversi.commandRefreshUsed) {
        state.reversi.commandAvailable = true;
        state.reversi.commandRefreshUsed = true;
        addLog(`<strong>Corner Control.</strong> Command Move refreshes once for taking a corner.`);
      }
    }

    function advanceReversiTurn() {
      const next = reversiOpponent(state.turn);
      const nextMoves = reversiLegalMoves(next);
      const currentMoves = reversiLegalMoves(state.turn);
      state.reversi.commandWindow = false;
      if (!nextMoves.length && !currentMoves.length) {
        endReversiMatch();
        return;
      }
      if (!nextMoves.length) {
        state.reversi.passes += 1;
        addLog(`<strong>${labelFor(next)} has no legal move.</strong> Turn stays with ${labelFor(state.turn)}.`);
      } else {
        state.turn = next;
        if (shouldOpenReversiCommandWindow(next, nextMoves)) {
          state.reversi.commandWindow = true;
          addLog(`<strong>Command window.</strong> ${state.names.dom} may command this Reversi move or let ${state.names.sub} move.`);
        }
      }
      render();
      publishState();
    }

    function shouldOpenReversiCommandWindow(next, nextMoves) {
      return next === SUB
        && reversiTierActive(5)
        && state.reversi
        && state.reversi.commandAvailable
        && !state.reversi.commandMode
        && nextMoves.length > 0;
    }

    function endReversiMatch(forcedWinner = null, forcedReason = "") {
      const score = reversiScore();
      const winner = forcedWinner || (score.sub > score.dom ? SUB : (score.dom > score.sub ? DOM : (reversiTierActive(5) ? DOM : null)));
      state.reversi.winner = winner;
      state.active = false;
      const result = settleRoundBank(winner);
      const scoreText = forcedReason ? `${forcedReason} ${state.names.sub} ${score.sub}, ${state.names.dom} ${score.dom}.` : `${state.names.sub} ${score.sub}, ${state.names.dom} ${score.dom}.`;
      if (result.outcome === "subReclaim") {
        addLog(`<strong>${state.names.sub} wins Reversi reclaim.</strong> ${scoreText} ${money(result.amount)} is taken back from ${state.names.dom}'s bank.`);
      } else if (result.outcome === "subNormal") {
        addLog(`<strong>${state.names.sub} wins Reversi.</strong> ${scoreText} Nothing enters ${state.names.dom}'s bank.`);
      } else if (result.outcome === "domReclaim") {
        addLog(`<strong>${state.names.dom} wins Reversi reclaim.</strong> ${scoreText} ${money(result.amount)} is added to her bank.`);
      } else if (result.outcome === "domNormal") {
        addLog(`<strong>${state.names.dom} wins Reversi.</strong> ${scoreText} ${money(result.amount)} moves into her bank.`);
      } else if (result.outcome === "domThrone") {
        addLog(`<strong>${state.names.sub} loses Reversi.</strong> ${scoreText} The Throne page opens automatically.`);
      } else {
        addLog(`<strong>Reversi draw.</strong> ${scoreText} The pot is returned.`);
      }
      state.pot = 0;
      render();
      publishState();
    }

    function canUseReversiCommandMove() {
      return state.currentGame === "tributeReversi"
        && state.active
        && reclaimPerksActive()
        && reversiTierActive(5)
        && state.turn === SUB
        && state.reversi
        && state.reversi.commandAvailable
        && state.reversi.commandWindow
        && !state.reversi.commandMode
        && domAdvantageControlsAllowed(localOnlineRole())
        && reversiLegalMoves(SUB).length > 0;
    }

    function armReversiCommandMove() {
      if (!canUseReversiCommandMove()) return;
      state.reversi.commandMode = true;
      state.reversi.commandWindow = false;
      addLog(`<strong>Command Move armed.</strong> ${state.names.dom} chooses ${state.names.sub}'s legal Reversi move.`);
      render();
      publishState();
    }

    function declineReversiCommandMove() {
      if (state.currentGame !== "tributeReversi" || !state.active || !state.reversi || !state.reversi.commandWindow) return;
      if (!domAdvantageControlsAllowed(localOnlineRole())) return;
      state.reversi.commandWindow = false;
      addLog(`<strong>Command passed.</strong> ${state.names.dom} lets ${state.names.sub} choose the Reversi move.`);
      render();
      publishState();
    }

    function preserveTiltLevel(action) {
      const tilt = state.tiltLevel;
      action();
      state.tiltLevel = tilt;
    }

    function blockedColumnCount() {
      if (!reclaimPerksActive() || !domAdvantagesEnabled()) return 0;
      if (state.tiltLevel >= 5) return 1;
      if (state.tiltLevel === 1) return 1;
      return 0;
    }

    function tributeFourLockAvailable() {
      if (!reclaimPerksActive() || !domAdvantagesEnabled()) return false;
      return state.tiltLevel === 2 || state.tiltLevel >= 4;
    }

    function tributeFourPressureAvailable() {
      if (!reclaimPerksActive() || !domAdvantagesEnabled()) return false;
      return state.tiltLevel === 3 || state.tiltLevel >= 4;
    }

    function chooseBlockedColumns() {
      const count = blockedColumnCount();
      const open = [];
      for (let col = 0; col < COLS; col += 1) {
        if (lowestOpenRow(col) >= 0) open.push(col);
      }
      const blocked = [];
      while (blocked.length < count && open.length > 0) {
        const index = Math.floor(Math.random() * open.length);
        blocked.push(open.splice(index, 1)[0]);
      }
      state.blockedColumns = blocked;
    }

    function isColumnBlockedForSub(col) {
      return reclaimPerksActive() && state.turn === SUB && (
        state.blockedColumns.includes(col)
        || state.lockedColumn === col
        || state.pressureDropColumn === col
      );
    }

    function tiltDescription() {
      if (!domAdvantagesEnabled()) return "dom advantages are disabled.";
      if (state.tiltLevel >= 5) return "one random sub column is blocked each sub turn, and the dom gets one Lock Column and one Pressure Drop.";
      if (state.tiltLevel >= 4) return "the dom gets one Lock Column and one Pressure Drop.";
      if (state.tiltLevel === 3) return "the dom gets one Pressure Drop.";
      if (state.tiltLevel === 2) return "the dom gets one Lock Column.";
      if (state.tiltLevel === 1) return "one random sub column is blocked each sub turn.";
      return "the dom starts and wins ties.";
    }

    function setTurn(nextTurn) {
      state.turn = nextTurn;
      if (reclaimPerksActive() && state.turn === SUB) {
        chooseBlockedColumns();
      } else {
        state.blockedColumns = [];
      }
    }

    function dropToken(col) {
      if (!state.active) return;
      if (localOnlineRole() && localOnlineRole() !== state.turn) return;
      if (state.currentGame === "tributeFour" && state.turn === DOM && state.lockColumnMode) {
        if (lowestOpenRow(col) < 0) return;
        state.lockedColumn = col;
        state.lockColumnAvailable = false;
        state.lockColumnMode = false;
        addLog(`<strong>Lock Column.</strong> ${state.names.dom} locks column ${col + 1}; ${state.names.sub} cannot use it on the next turn.`);
        render();
        publishState();
        return;
      }
      if (isColumnBlockedForSub(col)) return;
      const row = lowestOpenRow(col);
      if (row < 0) return;

      const movingPlayer = state.turn;
      state.board[row][col] = movingPlayer;
      if (movingPlayer === SUB) resolveFocusTaxSuccess();
      const result = evaluateBoard(row, col);

      if (result.winner) {
        endMatch(result.winner, result.cells);
        return;
      }

      if (isBoardFull()) {
        endMatch(reclaimPerksActive() ? DOM : "draw", []);
        return;
      }

      if (reclaimPerksActive() && movingPlayer === SUB) {
        const hadLock = state.lockedColumn !== null;
        const hadPressureColumn = state.pressureDropColumn !== null;
        const pressureColumn = state.pressureDropArmed ? col : null;
        state.lockedColumn = null;
        if (hadPressureColumn) state.pressureDropColumn = null;
        if (pressureColumn !== null) {
          state.pressureDropColumn = pressureColumn;
          state.pressureDropArmed = false;
          state.pressureDropAvailable = false;
          addLog(`<strong>Pressure Drop.</strong> ${state.names.sub} used column ${col + 1}; that column is forbidden on their next turn.`);
        } else if (hadLock) {
          addLog(`<strong>Lock released.</strong> ${state.names.sub}'s next turn is no longer locked.`);
        }
      }
      setTurn(state.turn === SUB ? DOM : SUB);
      render();
      publishState();
    }

    function lowestOpenRow(col) {
      for (let row = ROWS - 1; row >= 0; row -= 1) {
        if (!state.board[row][col]) return row;
      }
      return -1;
    }

    function evaluateBoard(row, col) {
      const player = state.board[row][col];
      const directions = [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, -1]
      ];

      for (const [dr, dc] of directions) {
        const cells = [[row, col]];
        cells.push(...collect(row, col, dr, dc, player));
        cells.push(...collect(row, col, -dr, -dc, player));
        if (cells.length >= 4) {
          return { winner: player, cells: cells.slice(0, 4) };
        }
      }

      return { winner: null, cells: [] };
    }

    function collect(row, col, dr, dc, player) {
      const cells = [];
      let r = row + dr;
      let c = col + dc;
      while (r >= 0 && r < ROWS && c >= 0 && c < COLS && state.board[r][c] === player) {
        cells.push([r, c]);
        r += dr;
        c += dc;
      }
      return cells;
    }

    function isBoardFull() {
      return state.board[0].every(Boolean);
    }

    function endMatch(winner, cells) {
      state.active = false;
      state.winningCells = cells;

      const result = settleRoundBank(winner);
      if (result.outcome === "subReclaim") {
        addLog(`<strong>${state.names.sub} wins reclaim.</strong> ${money(result.amount)} is taken back from ${state.names.dom}'s bank.`);
      } else if (result.outcome === "subNormal") {
        addLog(`<strong>${state.names.sub} wins.</strong> Nothing enters ${state.names.dom}'s bank.`);
      } else if (result.outcome === "domReclaim") {
        addLog(`<strong>${state.names.dom} wins reclaim.</strong> ${money(result.amount)} is added to her bank. She now has ${money(state.domVault)}.`);
      } else if (result.outcome === "domNormal") {
        addLog(`<strong>${state.names.dom} wins.</strong> ${money(result.amount)} moves into her bank and becomes reclaimable cash.`);
      } else if (result.outcome === "domThrone") {
        addLog(`<strong>${state.names.sub} loses.</strong> The Throne page opens automatically.`);
      } else {
        addLog(`<strong>Draw.</strong> The pot is returned.`);
      }

      state.pot = 0;
      render();
      publishState();
    }

    function domPass() {
      if (state.currentGame === "tributeTrail") {
        rollTrailDie();
        return;
      }
      if (state.currentGame === "tributeChess") {
        openChessPowerModal();
        return;
      }
      if (state.currentGame === "tributeCheckers") {
        openCheckersPowerModal();
        return;
      }
      if (state.currentGame === "tributeTwentyOne") {
        const role = localOnlineRole();
        if ((role === DOM || !role) && canOpenTwentyOnePowerModal()) {
          openTwentyOnePowerModal();
          return;
        }
        standTwentyOne();
        return;
      }
      if (state.currentGame === "tributeFleet") {
        openFleetPowerModal();
        return;
      }
      if (state.currentGame === "tributeReversi") {
        armReversiCommandMove();
        return;
      }
      if (state.currentGame === "tributeFour") {
        openTributeFourPowerModal();
        return;
      }
    }

    function tributeFourPowerInfo(type) {
      if (type === "pressure") {
        const unlocked = tributeFourPressureAvailable();
        const available = state.pressureDropAvailable && !state.pressureDropArmed;
        return {
          label: "Pressure Drop",
          available,
          status: available ? "Ready" : (unlocked ? "0 remaining" : "Not unlocked"),
          detail: `<strong>Pressure Drop.</strong> Arm it before ${state.names.sub} moves. Whatever column ${state.names.sub} chooses becomes forbidden on ${state.names.sub}'s following turn.`,
          uses: unlocked ? `${available ? 1 : 0} remaining / 1 total this reclaim` : "0 available at this tilt"
        };
      }
      const unlocked = tributeFourLockAvailable();
      const available = state.lockColumnAvailable && !state.lockColumnMode;
      return {
        label: "Lock Column",
        available,
        status: available ? "Ready" : (unlocked ? "0 remaining" : "Not unlocked"),
        detail: `<strong>Lock Column.</strong> Use it, then click one open column on the board. ${state.names.sub} cannot drop into that column on their next turn.`,
        uses: unlocked ? `${available ? 1 : 0} remaining / 1 total this reclaim` : "0 available at this tilt"
      };
    }

    function canOpenTributeFourPowerModal() {
      if (!state.active || !reclaimPerksActive() || state.turn !== DOM) return;
      if (!domAdvantageControlsAllowed(localOnlineRole())) return;
      if (state.lockColumnMode) return false;
      return state.lockColumnAvailable || (state.pressureDropAvailable && !state.pressureDropArmed);
    }

    function openTributeFourPowerModal() {
      if (!canOpenTributeFourPowerModal()) return;
      if (!tributeFourPowerInfo(selectedTributeFourPower).available) {
        selectedTributeFourPower = state.lockColumnAvailable ? "lock" : "pressure";
      }
      renderTributeFourPowerModal();
      els.tributeFourPowerModal.classList.remove("hidden");
    }

    function closeTributeFourPowerModal() {
      els.tributeFourPowerModal.classList.add("hidden");
      resetChessClockTick();
    }

    function renderTributeFourPowerModal() {
      els.powerModalTitle.textContent = "Tribute Four Powers";
      const powers = [
        { type: "lock", ...tributeFourPowerInfo("lock") },
        { type: "pressure", ...tributeFourPowerInfo("pressure") }
      ];
      els.tributeFourPowerOptions.innerHTML = powers.map((power) => `
        <button data-tribute-four-power="${power.type}" class="${selectedTributeFourPower === power.type ? "active" : ""}">
          <strong>${power.label}</strong><br>
          <span>${power.status}</span>
        </button>
      `).join("");
      const selected = powers.find((power) => power.type === selectedTributeFourPower) || powers[0];
      els.tributeFourPowerDetail.innerHTML = `${selected.detail}<br><br><strong>Uses:</strong> ${selected.uses}.`;
      els.tributeFourPowerUseBtn.textContent = "Use";
      els.tributeFourPowerUseBtn.disabled = !selected.available;
    }

    function useTributeFourPower() {
      if (!canOpenTributeFourPowerModal()) return;
      if (selectedTributeFourPower === "lock" && state.lockColumnAvailable) {
        state.lockColumnAvailable = false;
        state.lockColumnMode = true;
        addLog(`<strong>Lock Column ready.</strong> ${state.names.dom} may click a column to block it for ${state.names.sub}'s next turn.`);
      } else if (selectedTributeFourPower === "pressure" && state.pressureDropAvailable && !state.pressureDropArmed) {
        state.pressureDropAvailable = false;
        state.pressureDropArmed = true;
        addLog(`<strong>Pressure Drop armed.</strong> After ${state.names.sub} moves, that column will be forbidden on their following turn.`);
      } else {
        renderTributeFourPowerModal();
        return;
      }
      closeTributeFourPowerModal();
      render();
      publishState();
    }

    function fleetPowerInfo(type) {
      if (type === "scan") {
        const unlocked = reclaimPerksActive() && domAdvantagesEnabled() && state.tiltLevel >= 1;
        const available = state.fleet.scanAvailable && state.active && state.turn === DOM;
        return {
          label: "Scan",
          available,
          status: available ? "Ready" : (unlocked ? "0 remaining" : "Not unlocked"),
          detail: `<strong>Scan.</strong> ${state.names.dom} marks one hidden ${state.names.sub} ship segment that has not already been hit.`,
          uses: unlocked ? `${available ? 1 : 0} remaining / 1 total this reclaim` : "0 available at this tilt"
        };
      }
      return {
        label: fleetModifierLabel(type),
        available: false,
        status: state.fleet.modifiers.includes(type) ? "Active" : "Inactive",
        detail: `<strong>${fleetModifierLabel(type)}.</strong> ${fleetModifierDescription(type)}`,
        uses: "passive modifier"
      };
    }

    function fleetPowerTypes() {
      return ["scan", "doubleTap", "commandFog", "counterfire", "noisyWaters", "priorityIntel"];
    }

    function canOpenFleetPowerModal() {
      if (state.currentGame !== "tributeFleet" || !reclaimPerksActive()) return false;
      if (!domAdvantageControlsAllowed(localOnlineRole())) return false;
      return state.active || (state.fleet.modifiers || []).length > 0 || state.tiltLevel >= 1;
    }

    function openFleetPowerModal() {
      if (!canOpenFleetPowerModal()) return;
      if (!fleetPowerInfo(selectedFleetPower).available && selectedFleetPower === "scan" && !state.fleet.scanAvailable) {
        selectedFleetPower = (state.fleet.modifiers && state.fleet.modifiers[0]) || "scan";
      }
      renderFleetPowerModal();
      els.tributeFourPowerModal.classList.remove("hidden");
    }

    function renderFleetPowerModal() {
      els.powerModalTitle.textContent = "Tribute Fleet Powers";
      const powers = fleetPowerTypes().map((type) => ({ type, ...fleetPowerInfo(type) }));
      els.tributeFourPowerOptions.innerHTML = powers.map((power) => `
        <button data-fleet-power="${power.type}" class="${selectedFleetPower === power.type ? "active" : ""}">
          <strong>${power.label}</strong><br>
          <span>${power.status}</span>
        </button>
      `).join("");
      const selected = powers.find((power) => power.type === selectedFleetPower) || powers[0];
      els.tributeFourPowerDetail.innerHTML = `${selected.detail}<br><br><strong>Uses:</strong> ${selected.uses}.`;
      els.tributeFourPowerUseBtn.textContent = "Use";
      els.tributeFourPowerUseBtn.disabled = selectedFleetPower !== "scan" || !selected.available;
    }

    function useFleetPower() {
      if (selectedFleetPower !== "scan" || !fleetPowerInfo("scan").available) {
        renderFleetPowerModal();
        return;
      }
      closeTributeFourPowerModal();
      fleetScan();
    }

    function chessPowerInfo(type) {
      if (type.startsWith("stance:")) {
        const stance = type.split(":")[1] || "none";
        const game = chessEngine();
        const canSet = Boolean(game && state.active && chessQueenStancesActive()
          && queenPowerControlsAllowed(localOnlineRole())
          && roleForChessColor(game.turn()) === DOM
          && !state.chess.freezeMode && !state.chess.commandMode);
        return {
          label: `Stance: ${stanceLabel(stance)}`,
          available: canSet,
          status: state.chess.queenStance === stance ? "Selected" : (canSet ? "Ready" : "Unavailable"),
          detail: `<strong>${stanceLabel(stance)} stance.</strong> ${{
            none: "The queen has no stance effect and earns no stance charges.",
            gaze: `When ${state.names.sub} moves an affected piece through the dom queen's line of sight, ${state.names.dom} gains 1 charge.`,
            tithe: `When ${state.names.dom}'s queen captures an affected piece, ${state.names.dom} gains 1 charge.`,
            leash: `Affected ${state.names.sub} pieces next to the dom queen are leashed. At the end of ${state.names.sub}'s turn, ${state.names.dom} gains 1 charge for each leashed unit.`
          }[stance]}`,
          uses: "can be changed on the dom's turn"
        };
      }
      const cost = queenPowerCost(type);
      const ready = canUseQueenPowerType(type);
      const descriptions = {
        reposition: `After moving, ${state.names.dom} can spend 1 charge to move her queen to one adjacent empty square. Reposition cannot capture.`,
        freeze: `On ${state.names.dom}'s turn, she can spend 1 charge and choose one ${state.names.sub} piece. That piece is frozen for the next two ${state.names.sub} turns.`,
        shield: `${state.names.dom}'s queen cannot be captured by pawns until ${state.names.dom}'s next turn.`,
        skip: `${state.names.dom} queues Skip on her turn. The next ${state.names.sub} turn is skipped, letting ${state.names.dom} move again.`,
        command: `${state.names.dom} queues Command Move on her turn. On the next ${state.names.sub} turn, ${state.names.dom} moves one legal ${state.names.sub} piece instead.`
      };
      return {
        label: chargeLabel(type),
        available: ready,
        status: ready ? "Ready" : `${state.chess.charges || 0}/${cost} charges`,
        detail: `<strong>${chargeLabel(type)}.</strong> ${descriptions[type]}`,
        uses: `costs ${cost} ${cost === 1 ? "charge" : "charges"}`
      };
    }

    function chessPowerTypes() {
      const stances = ["stance:none", "stance:gaze", "stance:tithe", "stance:leash"];
      return [...stances, "reposition", "freeze", "shield", "skip", "command"];
    }

    function canOpenChessPowerModal() {
      return state.currentGame === "tributeChess" && chessQueenStancesActive() && queenPowerControlsAllowed(localOnlineRole());
    }

    function openChessPowerModal() {
      if (!canOpenChessPowerModal()) return;
      syncChessClock();
      renderChessPowerModal();
      els.tributeFourPowerModal.classList.remove("hidden");
      resetChessClockTick();
    }

    function renderChessPowerModal() {
      els.powerModalTitle.textContent = "Tribute Chess Powers";
      const powers = chessPowerTypes().map((type) => ({ type, ...chessPowerInfo(type) }));
      els.tributeFourPowerOptions.innerHTML = powers.map((power) => `
        <button data-chess-power="${power.type}" class="${selectedChessPower === power.type ? "active" : ""}">
          <strong>${power.label}</strong><br>
          <span>${power.status}</span>
        </button>
      `).join("");
      const selected = powers.find((power) => power.type === selectedChessPower) || powers[0];
      const affected = queenAffectedLabel() || "no pieces";
      els.tributeFourPowerDetail.innerHTML = `${selected.detail}<br><br><strong>Uses:</strong> ${selected.uses}.<br><strong>Charges:</strong> ${state.chess.charges || 0}. <strong>Affected:</strong> ${affected}.`;
      els.tributeFourPowerUseBtn.textContent = "Use";
      els.tributeFourPowerUseBtn.disabled = !selected.available;
    }

    function useChessPower() {
      if (selectedChessPower.startsWith("stance:")) {
        const stance = selectedChessPower.split(":")[1] || "none";
        if (!chessPowerInfo(selectedChessPower).available) {
          renderChessPowerModal();
          return;
        }
        setQueenStance(stance);
        closeTributeFourPowerModal();
        return;
      }
      if (!canUseQueenPowerType(selectedChessPower)) {
        renderChessPowerModal();
        return;
      }
      closeTributeFourPowerModal();
      activateQueenPower(selectedChessPower);
    }

    function checkersPowerDefinitions() {
      return {
        crownPull: {
          label: "Crown Pull",
          tier: 0,
          detail: `${state.names.dom} chooses a ${state.names.sub} piece diagonally near one of her queens. If there is an empty diagonal square between them, the piece is pulled one step closer. No captures or crowning.`
        },
        marked: {
          label: "Marked",
          tier: 1,
          detail: `${state.names.dom} marks one ${state.names.sub} piece. If she captures it later, she gains +2 Claim and drains ${money(2)}.`
        },
        pinned: {
          label: "Pinned",
          tier: 2,
          detail: `${state.names.dom} pins one ${state.names.sub} piece. On its next turn, that piece can only move if it is making a capture.`
        },
        hungryCrown: {
          label: "Hungry Crown",
          tier: 3,
          detail: `The next ${state.names.dom} queen capture drains an extra ${money(2)} into her bank.`
        },
        tributeToll: {
          label: "Tribute Toll",
          tier: 4,
          detail: `Arms a toll for the next ${state.names.sub} move. If that move ends next to a ${state.names.dom} queen, ${money(1)} drains into ${state.names.dom}'s bank.`
        },
        takeover: {
          label: "Takeover",
          tier: 5,
          detail: `${state.names.dom} chooses a ${state.names.sub} piece adjacent to one of her queens and converts it into a dom piece. Kings cannot be taken over.`
        }
      };
    }

    function checkersPowerTypes() {
      return ["crownPull", "marked", "pinned", "hungryCrown", "tributeToll", "takeover"];
    }

    function checkersPowerUnlocked(type) {
      const definition = checkersPowerDefinitions()[type];
      return Boolean(definition && reclaimPerksActive() && domAdvantagesEnabled() && state.tiltLevel >= definition.tier);
    }

    function checkersPowerInfo(type) {
      const definition = checkersPowerDefinitions()[type] || checkersPowerDefinitions().crownPull;
      const uses = Number(state.checkers && state.checkers.powerUses && state.checkers.powerUses[type] || 0);
      const unlocked = checkersPowerUnlocked(type);
      const available = Boolean(state.active && state.turn === DOM && unlocked && uses > 0);
      return {
        ...definition,
        available,
        uses,
        status: available ? `${uses} remaining` : (unlocked ? "0 remaining" : `Unlocks at Tilt ${definition.tier}`)
      };
    }

    function canOpenCheckersPowerModal() {
      if (state.currentGame !== "tributeCheckers" || !reclaimPerksActive()) return false;
      if (!domAdvantageControlsAllowed(localOnlineRole())) return false;
      return checkersPowerTypes().some((type) => checkersPowerInfo(type).available || checkersPowerUnlocked(type));
    }

    function openCheckersPowerModal() {
      if (!canOpenCheckersPowerModal()) return;
      if (!checkersPowerInfo(selectedCheckersPower).available) {
        selectedCheckersPower = checkersPowerTypes().find((type) => checkersPowerInfo(type).available) || "crownPull";
      }
      renderCheckersPowerModal();
      els.tributeFourPowerModal.classList.remove("hidden");
    }

    function renderCheckersPowerModal() {
      els.powerModalTitle.textContent = "Tribute Checkers Powers";
      const powers = checkersPowerTypes().map((type) => ({ type, ...checkersPowerInfo(type) }));
      els.tributeFourPowerOptions.innerHTML = powers.map((power) => `
        <button data-checkers-power="${power.type}" class="${selectedCheckersPower === power.type ? "active" : ""}">
          <strong>${power.label}</strong><br>
          <span>${power.status}</span>
        </button>
      `).join("");
      const selected = powers.find((power) => power.type === selectedCheckersPower) || powers[0];
      els.tributeFourPowerDetail.innerHTML = `${selected.detail}<br><br><strong>Uses:</strong> ${selected.uses}.`;
      els.tributeFourPowerUseBtn.textContent = "Use";
      els.tributeFourPowerUseBtn.disabled = !selected.available;
    }

    function spendCheckersPower(type) {
      if (!state.checkers.powerUses) state.checkers.powerUses = createCheckersState().powerUses;
      state.checkers.powerUses[type] = Math.max(0, Number(state.checkers.powerUses[type] || 0) - 1);
    }

    function useCheckersPower() {
      const info = checkersPowerInfo(selectedCheckersPower);
      if (!info.available) {
        renderCheckersPowerModal();
        return;
      }
      if (selectedCheckersPower === "hungryCrown") {
        spendCheckersPower("hungryCrown");
        state.checkers.hungryCrown = Number(state.checkers.hungryCrown || 0) + 1;
        closeTributeFourPowerModal();
        addLog(`<strong>Hungry Crown armed.</strong> ${state.names.dom}'s next queen capture drains extra cash.`);
        render();
        publishState();
        return;
      }
      if (selectedCheckersPower === "tributeToll") {
        spendCheckersPower("tributeToll");
        state.checkers.tollArmed = Number(state.checkers.tollArmed || 0) + 1;
        closeTributeFourPowerModal();
        addLog(`<strong>Tribute Toll armed.</strong> If ${state.names.sub}'s next move ends beside a queen, cash drains.`);
        render();
        publishState();
        return;
      }
      state.checkers.powerMode = selectedCheckersPower;
      state.checkers.selected = null;
      state.checkers.legalMoves = [];
      closeTributeFourPowerModal();
      addLog(`<strong>${info.label} armed.</strong> ${state.names.dom} chooses a ${state.names.sub} piece.`);
      render();
      publishState();
    }

    function twentyOnePowerInfo(type) {
      const reclaim = reclaimPerksActive() && domAdvantagesEnabled() && blackjackPowersEnabled();
      const info = {
        peek: {
          label: "Peek",
          unlocked: reclaim && state.tiltLevel >= 1,
          available: reclaim && state.tiltLevel >= 1,
          detail: `<strong>Peek.</strong> ${state.names.dom} can see her hidden dealer card during reclaim.`,
          uses: "passive while active"
        },
        softSave: {
          label: "Soft Save",
          unlocked: reclaim && state.tiltLevel >= 2,
          available: Boolean(state.twentyOne.softSaveAvailable),
          detail: `<strong>Soft Save.</strong> Once per reclaim, a ${state.names.dom} bust from 22 to 24 is treated as 21.`,
          uses: reclaim && state.tiltLevel >= 2 ? `${state.twentyOne.softSaveAvailable ? 1 : 0} remaining / 1 total this reclaim` : "0 available at this tilt"
        },
        pushLuck: {
          label: "Push Your Luck",
          unlocked: reclaim && state.tiltLevel >= 3,
          available: reclaim && state.tiltLevel >= 3 && Boolean(state.twentyOne.pushLuckAvailable),
          detail: `<strong>Push Your Luck.</strong> ${state.names.dom} may queue this while ${state.names.sub} is deciding. If ${state.names.sub} stands, it forces one extra ${state.names.sub} card. If ${state.names.sub} busts, ${state.names.dom} wins. If ${state.names.sub} survives, ${state.names.dom} immediately takes one kickback card before playing her dealer hand.`,
          uses: reclaim && state.tiltLevel >= 3
            ? (state.twentyOne.pushLuckQueued ? "queued for this hand" : (state.twentyOne.pushLuckAvailable ? "1 remaining / 1 total this hand" : "already decided this hand"))
            : "0 available at this tilt"
        },
        dealerLock: {
          label: "Dealer Lock",
          unlocked: reclaim && state.tiltLevel >= 4,
          available: reclaim && state.tiltLevel >= 4,
          detail: `<strong>Dealer Lock.</strong> ${state.names.dom} can stand on 16 or higher during her dealer turn.`,
          uses: "passive while active"
        },
        houseSweep: {
          label: "House Sweep",
          unlocked: reclaim && state.tiltLevel >= 5,
          available: reclaim && state.tiltLevel >= 5,
          detail: `<strong>House Sweep.</strong> In reclaim, ${state.names.sub} must beat ${state.names.dom} by at least 2. Close wins go to ${state.names.dom}.`,
          uses: "passive while active"
        }
      }[type];
      const queued = type === "pushLuck" && state.twentyOne.pushLuckQueued;
      return {
        ...info,
        status: queued ? "Queued" : (info.available ? "Ready" : (info.unlocked ? "0 remaining" : "Not unlocked"))
      };
    }

    function twentyOnePowerTypes() {
      return ["peek", "softSave", "pushLuck", "dealerLock", "houseSweep"];
    }

    function canOpenTwentyOnePowerModal() {
      if (state.currentGame !== "tributeTwentyOne" || !reclaimPerksActive()) return false;
      if (!state.active || state.twentyOne.setupPending || state.twentyOne.nextHandPending) return false;
      if (!domAdvantageControlsAllowed(localOnlineRole())) return false;
      return domAdvantagesEnabled() && blackjackPowersEnabled() && state.tiltLevel >= 1;
    }

    function canQueueTwentyOnePushLuck() {
      return canOfferTwentyOnePushLuck()
        && state.turn === SUB
        && !state.twentyOne.pushLuckPending
        && !state.twentyOne.dealerTurn
        && !state.twentyOne.pushLuckQueued;
    }

    function canUseTwentyOnePushLuckNow() {
      return canOfferTwentyOnePushLuck()
        && state.turn === DOM
        && state.twentyOne.pushLuckPending;
    }

    function openTwentyOnePowerModal() {
      if (!canOpenTwentyOnePowerModal()) return;
      renderTwentyOnePowerModal();
      els.tributeFourPowerModal.classList.remove("hidden");
    }

    function renderTwentyOnePowerModal() {
      els.powerModalTitle.textContent = "Tribute Blackjack Powers";
      const powers = twentyOnePowerTypes().map((type) => ({ type, ...twentyOnePowerInfo(type) }));
      els.tributeFourPowerOptions.innerHTML = powers.map((power) => `
        <button data-twenty-one-power="${power.type}" class="${selectedTwentyOnePower === power.type ? "active" : ""}">
          <strong>${power.label}</strong><br>
          <span>${power.status}</span>
        </button>
      `).join("");
      const selected = powers.find((power) => power.type === selectedTwentyOnePower) || powers[0];
      els.tributeFourPowerDetail.innerHTML = `${selected.detail}<br><br><strong>Uses:</strong> ${selected.uses}.`;
      const canUseSelected = selected.type === "pushLuck"
        && selected.available
        && (canQueueTwentyOnePushLuck() || canUseTwentyOnePushLuckNow());
      els.tributeFourPowerUseBtn.disabled = !canUseSelected;
      els.tributeFourPowerUseBtn.textContent = selected.type === "pushLuck"
        ? (state.twentyOne.pushLuckQueued ? "Queued" : (canUseTwentyOnePushLuckNow() ? "Force Draw" : "Queue"))
        : "Use";
    }

    function useTwentyOnePower() {
      if (selectedTwentyOnePower === "pushLuck" && canUseTwentyOnePushLuckNow()) {
        closeTributeFourPowerModal();
        pushTwentyOneLuck();
        return;
      }
      if (selectedTwentyOnePower === "pushLuck" && canQueueTwentyOnePushLuck()) {
        state.twentyOne.pushLuckQueued = true;
        closeTributeFourPowerModal();
        addLog(`<strong>Push Your Luck queued.</strong> If ${state.names.sub} stands, ${state.names.dom} forces one more card.`);
        render();
        publishState();
        return;
      }
      renderTwentyOnePowerModal();
    }

    function useCurrentPowerModalSelection() {
      if (state.currentGame === "tributeFleet") {
        useFleetPower();
      } else if (state.currentGame === "tributeChess") {
        useChessPower();
      } else if (state.currentGame === "tributeCheckers") {
        useCheckersPower();
      } else if (state.currentGame === "tributeTwentyOne") {
        useTwentyOnePower();
      } else {
        useTributeFourPower();
      }
    }

    function resetTributeTrailBoard() {
      state.turn = Math.random() < 0.5 ? SUB : DOM;
      state.active = false;
      state.mode = "normal";
      state.pot = 0;
      state.ticTacToe = normalizeTicTacToeState(state.ticTacToe);
      state.ticTacToe.scores = { sub: 0, dom: 0, draws: 0 };
      state.ticTacToe.boardNumber = 1;
      state.ticTacToe.matchActive = false;
      state.ticTacToe.pendingNextBoard = false;
      state.ticTacToe.lastBoardWinner = null;
      state.lockedTribute = state.domVault;
      state.winningCells = [];
      state.trail = createTrailState();
    }

    function startTributeTrailRace() {
      if (!state.trail || !state.trail.setupPending || !trailShoppingControlsAllowed()) return;
      state.trail.transferPercent = Math.max(0, Math.min(100, Number(state.trail.transferPercent || 0)));
      state.trail.setupPending = false;
      state.active = true;
      addLog(`<strong>Trail Tribute set.</strong> ${state.names.dom} will move ${state.trail.transferPercent}% of Trail Tribute into her bank when the game ends.`);
      render();
      publishState();
    }

    function updateTrailTransferPercent(value) {
      if (!state.trail || !state.trail.setupPending || !trailShoppingControlsAllowed()) return;
      state.trail.transferPercent = Math.max(0, Math.min(100, Number(value || 0)));
      render();
      publishState();
    }

    function normalizeTrailState() {
      if (!state.trail) return;
      if (Array.isArray(state.trail.spaces)) {
        state.trail.spaces = state.trail.spaces.map((type) => type === "trap" ? "plain" : type);
        state.trail.trapSnare = null;
      }
      if (state.trail.trailSelection && Number(state.trail.trailSelection.remaining || 0) <= 0) {
        state.trail.trailSelection = null;
      }
      if (!state.trail.trailSelection) {
        state.trail.cashSelection = null;
      }
      if (!state.trail.moving) {
        state.trail.movingPlayer = null;
      }
    }

    function trailRollAllowed() {
      const localRole = localOnlineRole();
      normalizeTrailState();
      if (!state.active || state.currentGame !== "tributeTrail") return false;
      if (state.trail && state.trail.setupPending) return false;
      if (state.trail && (state.trail.moving || (state.trail.rollAnimationUntil && Date.now() < state.trail.rollAnimationUntil))) return false;
      if (state.trail && state.trail.pendingCardActivation) return false;
      if (state.trail && state.trail.trailSelection) return false;
      if (state.trail && state.trail.shoppingMode && state.turn === DOM) return false;
      if (!localRole) return true;
      return localRole === state.turn;
    }

    function rollTrailDie() {
      if (!trailRollAllowed()) return;
      if (state.trail && state.trail.pendingCardActivation) return;
      const player = state.turn;
      if (player === SUB) resolveFocusTaxSuccess();
      const pendingPanel = state.trail.pendingPanelActivation ? state.trail.pendingPanelActivation[player] : null;
      if (pendingPanel !== null && pendingPanel !== undefined) {
        delete state.trail.pendingPanelActivation[player];
        state.trail.positions[player] = Number(pendingPanel);
        addLog(`<strong>Echoed Landing triggers.</strong> ${labelFor(player)} activates space ${Number(pendingPanel) + 1}.`);
        const waitingOnCard = resolveTrailSpace(player) === "card";
        if (state.active && !waitingOnCard) passTrailTurn(otherRole(player));
        render();
        publishState();
        return;
      }
      if (state.trail.skip[player]) {
        state.trail.skip[player] = false;
        addLog(`<strong>${labelFor(player)} loses a turn.</strong> Chance keeps them still.`);
        passTrailTurn(otherRole(player));
        render();
        publishState();
        return;
      }
      const sprintRoll = Boolean(state.trail.shoppingMode && player === SUB);
      const sides = Number(state.trail.dieSides[player] || 6);
      const rollDice = sprintRoll
        ? [1 + Math.floor(Math.random() * 6), 1 + Math.floor(Math.random() * 6)]
        : [1 + Math.floor(Math.random() * sides)];
      const roll = rollDice.reduce((sum, value) => sum + value, 0);
      state.trail.rollAnimationUntil = Date.now() + 760;
      state.trail.rollPreview = roll;
      state.trail.rollPreviewDice = rollDice;
      state.trail.lastRoll = {
        player,
        roll,
        sides,
        dice: rollDice
      };
      addLog(`<strong>${labelFor(player)} rolls ${roll}${sprintRoll ? " on a sprint roll" : ""}.</strong>`);
      render();
      const startedAt = Date.now();
      const interval = window.setInterval(() => {
        if (state.currentGame !== "tributeTrail" || Date.now() - startedAt >= 720) {
          window.clearInterval(interval);
          if (state.trail) {
            state.trail.rollPreview = roll;
            state.trail.rollPreviewDice = rollDice;
          }
          render();
          return;
        }
        if (state.trail) {
          const previewDice = sprintRoll
            ? [1 + Math.floor(Math.random() * 6), 1 + Math.floor(Math.random() * 6)]
            : [1 + Math.floor(Math.random() * sides)];
          state.trail.rollPreviewDice = previewDice;
          state.trail.rollPreview = previewDice.reduce((sum, value) => sum + value, 0);
          render();
        }
      }, 70);
      window.setTimeout(() => {
        if (state.currentGame === "tributeTrail") {
          state.trail.rollPreview = null;
          state.trail.rollPreviewDice = null;
          render();
          animateTrailMove(player, roll, () => {
            const waitingOnCard = state.active ? resolveTrailSpace(player) === "card" : false;
            if (state.active && !waitingOnCard) passTrailTurn(otherRole(player));
            render();
          });
        }
      }, 780);
      publishState();
    }

    function animateTrailMove(player, amount, done) {
      if (!state.trail) {
        if (done) done();
        return;
      }
      const direction = Math.sign(amount);
      const steps = Math.abs(Math.round(amount));
      if (!direction || !steps) {
        if (done) done();
        return;
      }
      state.trail.moving = true;
      state.trail.movingPlayer = player;
      let moved = 0;
      const stepOnce = () => {
        if (!state.trail || state.currentGame !== "tributeTrail") return;
        const current = Number(state.trail.positions[player] || 0);
        const next = Math.max(0, Math.min(TRAIL_FINISH, current + direction));
        state.trail.positions[player] = next;
        moved += 1;
        if (next >= TRAIL_FINISH) finishTrailGame(player);
        render();
        if (!state.active || next === current || moved >= steps) {
          window.setTimeout(() => {
            if (done) done();
            if (state.trail && state.currentGame === "tributeTrail") {
              state.trail.moving = false;
              state.trail.movingPlayer = null;
              state.trail.rollAnimationUntil = 0;
              render();
              publishState();
            }
          }, 90);
          return;
        }
        window.setTimeout(stepOnce, 135);
      };
      window.setTimeout(stepOnce, 90);
    }

    function moveTrailPlayer(player, amount, resolveLanding = false) {
      const current = Number(state.trail.positions[player] || 0);
      if (state.trail.shoppingMode && player === DOM) {
        state.trail.positions.dom = TRAIL_FINISH;
        return TRAIL_FINISH;
      }
      const next = Math.max(0, Math.min(TRAIL_FINISH, current + amount));
      state.trail.positions[player] = next;
      if (!resolveLanding) queueForcedTrailPanelActivation(player, next);
      if (next >= TRAIL_FINISH) {
        finishTrailGame(player);
      } else if (resolveLanding && state.active) {
        resolveTrailSpace(player);
      }
      return next;
    }

    function queueForcedTrailPanelActivation(player, index) {
      if (!state.trail || !state.trail.forcedPanelActivation) return;
      const type = effectiveTrailSpaceType(index);
      if (index <= 0 || index >= TRAIL_FINISH || type === "plain" || type === "start" || type === "finish") return;
      state.trail.pendingPanelActivation = {
        ...(state.trail.pendingPanelActivation || {}),
        [player]: index
      };
      addLog(`<strong>Echoed Landing.</strong> ${labelFor(player)} must activate space ${index + 1} at the start of their next turn.`);
    }

    function finishTrailGame(player) {
      state.trail.winner = player;
      if (player === DOM && state.trail.shoppingMode) {
        state.trail.positions.dom = TRAIL_FINISH;
        addLog(`<strong>${state.names.dom} is already at the finish.</strong> Shopping continues until she ends the game or ${state.names.sub} reaches the finish.`);
        return;
      }
      if (player === DOM && !state.trail.shoppingMode) {
        state.active = false;
        state.trail.finishChoicePending = true;
        state.trail.endChoicePending = false;
        state.trail.victorySplashUntil = Date.now() + 2400;
        addLog(`<strong>${labelFor(player)} reaches the finish.</strong> ${state.names.dom} can end the game or go shopping while ${state.names.sub} sprints for the finish.`);
        return;
      }
      state.active = false;
      state.trail.finishChoicePending = false;
      state.trail.shoppingMode = false;
      state.trail.endChoicePending = true;
      state.trail.victorySplashUntil = 0;
      finalizeTrailTributeTransfer();
      addLog(`<strong>${labelFor(player)} reaches the finish.</strong> Tribute Trail belongs to ${labelFor(player)}.`);
    }

    function rectCenter(rect) {
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    }

    function trailMoneyAnchor(role) {
      const marker = els.board ? els.board.querySelector(`.trail-token-marker.${role}`) : null;
      if (marker) return rectCenter(marker.getBoundingClientRect());
      return {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      };
    }

    function trailMoneyTarget(kind) {
      const target = kind === "spending" ? els.trailSpendingAmount : els.trailBankAmount;
      if (target) return rectCenter(target.getBoundingClientRect());
      return {
        x: window.innerWidth - 80,
        y: 96
      };
    }

    function animateTrailMoneyAward(sourceRole, targetKind, emoji, applyAward) {
      const layer = els.trailMoneyFlights;
      if (!layer) {
        applyAward();
        render();
        publishState();
        return;
      }
      const start = trailMoneyAnchor(sourceRole);
      const end = trailMoneyTarget(targetKind);
      const flight = document.createElement("span");
      flight.className = "trail-money-flight";
      flight.textContent = emoji;
      flight.style.setProperty("--from-x", `${start.x}px`);
      flight.style.setProperty("--from-y", `${start.y}px`);
      flight.style.setProperty("--to-x", `${end.x}px`);
      flight.style.setProperty("--to-y", `${end.y}px`);
      layer.appendChild(flight);
      window.requestAnimationFrame(() => flight.classList.add("active"));
      window.setTimeout(() => {
        flight.remove();
        applyAward();
        render();
        publishState();
      }, 790);
    }

    function awardTrailTributeMoney(amount) {
      const value = Math.max(0, Number(amount || 0));
      if (!value) return;
      animateTrailMoneyAward(SUB, "bank", "💶", () => {
        state.trail.tributeBank = Number(state.trail.tributeBank || 0) + value;
      });
    }

    function awardTrailSpendingMoney(amount) {
      const value = Math.max(0, Number(amount || 0));
      if (!value) return;
      animateTrailMoneyAward(DOM, "spending", "💷", () => {
        state.trail.spendingMoney = Number(state.trail.spendingMoney || 0) + value;
      });
    }

    function finalizeTrailTributeTransfer() {
      if (!state.trail || state.trail.tributeTransferred) return 0;
      state.trail.tributeTransferred = true;
      const tribute = Math.max(0, Number(state.trail.tributeBank || 0));
      const percent = Math.max(0, Math.min(100, Number(state.trail.transferPercent || 0)));
      const transfer = Math.round(tribute * percent / 100);
      if (transfer > 0) {
        const before = state.domVault;
        state.domVault += transfer;
        state.lockedTribute = state.domVault;
        recordLedgerEvent({
          type: "tribute",
          label: "Trail Tribute",
          detail: `${percent}% of Trail Tribute closes into the dom bank.`,
          delta: transfer,
          before,
          after: state.domVault
        });
      }
      addLog(`<strong>Trail Tribute closes.</strong> ${money(transfer)} of ${money(tribute)} moves into ${state.names.dom}'s bank at ${percent}%.`);
      return transfer;
    }

    function resolveTrailSpace(player) {
      const index = Number(state.trail.positions[player] || 0);
      const type = effectiveTrailSpaceType(index);
      if (type === "player-card") {
        drawTrailPlayerCard(player);
        return "card";
      } else if (type === "fate-card") {
        drawTrailFateCard(player);
        return "card";
      } else if (type === "cash") {
        const multiplier = trailCashMultiplier(index);
        const claimBonus = Number(state.trail.bankClaims && state.trail.bankClaims[index] || 0);
        const amount = trailCashValue(index) * multiplier + claimBonus;
        if (claimBonus && state.trail.bankClaims) delete state.trail.bankClaims[index];
        if (player === DOM) {
          awardTrailSpendingMoney(amount);
          addLog(`<strong>Cash space.</strong> ${money(amount)} becomes ${state.names.dom}'s spending money${multiplier > 1 ? ` from a x${multiplier} space` : ""}${claimBonus ? ` with ${money(claimBonus)} claimed extra` : ""}.`);
        } else {
          awardTrailTributeMoney(amount);
          addLog(`<strong>Cash space.</strong> ${money(amount)} enters Trail Tribute${multiplier > 1 ? ` from a x${multiplier} space` : ""}${claimBonus ? ` with ${money(claimBonus)} claimed extra` : ""}.`);
        }
      } else if (type === "trap") {
        const snared = player === SUB && state.trail.trapSnare === index;
        const penalty = snared ? -5 : (player === SUB ? -3 : -1);
        if (snared) state.trail.trapSnare = null;
        addLog(`<strong>Trap space.</strong> ${labelFor(player)} is pulled back ${Math.abs(penalty)}.`);
        moveTrailPlayer(player, penalty, false);
      } else if (type === "slide") {
        if (state.trail.slidesSubOnly && player !== SUB) {
          addLog(`<strong>Slide ignored.</strong> Slides only affect ${state.names.sub}.`);
          return "resolved";
        }
        const slide = trailSlides().find((item) => item.from === index);
        if (!slide) return;
        state.trail.positions[player] = slide.to;
        queueForcedTrailPanelActivation(player, slide.to);
        addLog(`<strong>Slide.</strong> ${labelFor(player)} slides back to space ${slide.to + 1}.`);
      }
      return "resolved";
    }

    function trailCashValue(index) {
      if (state.trail && state.trail.spaces[index] === "plain" && trailTrapCashActive()) {
        return Number(state.trail.trapCashValues && state.trail.trapCashValues[index] || 5);
      }
      const values = state.trail && Array.isArray(state.trail.cashValues) ? state.trail.cashValues : [];
      return Number(values[index] || 1);
    }

    function trailSlides() {
      return [...TRAIL_SLIDES, ...((state.trail && state.trail.extraSlides) || [])];
    }

    function trailCardMoney(value) {
      const multiplier = state.trail ? Number(state.trail.cardMoneyMultiplier || 1) : 1;
      return Math.max(1, Number(value || 0)) * multiplier;
    }

    function trailTrapCashActive() {
      return Boolean(state.trail && Number(state.trail.trapCashTurns || 0) > 0);
    }

    function effectiveTrailSpaceType(index) {
      const type = state.trail && state.trail.spaces ? state.trail.spaces[index] : "plain";
      if (type === "plain" && trailTrapCashActive()) return "cash";
      return type;
    }

    function addTrailTrapCashTurns(turns) {
      if (!state.trail) return;
      state.trail.trapCashTurns = Math.max(0, Number(state.trail.trapCashTurns || 0)) + Math.max(1, Number(turns || 1));
      state.trail.trapCashGrace = true;
      const values = { ...(state.trail.trapCashValues || {}) };
      (state.trail.spaces || []).forEach((type, index) => {
        if (type === "plain" && index > 0 && index < TRAIL_FINISH && !values[index]) values[index] = 7 + Math.floor(Math.random() * 6);
      });
      state.trail.trapCashValues = values;
      addLog(`<strong>Blank Cash.</strong> Blank panels become ${money(7)}-${money(12)} cash panels for ${state.trail.trapCashTurns} turn${state.trail.trapCashTurns === 1 ? "" : "s"} total.`);
    }

    function passTrailTurn(nextPlayer) {
      if (!state.trail) {
        state.turn = nextPlayer;
        return;
      }
      const leavingSubTurn = state.turn === SUB && nextPlayer === DOM;
      if (nextPlayer !== state.turn && Number(state.trail.trapCashTurns || 0) > 0) {
        if (state.trail.trapCashGrace) {
          state.trail.trapCashGrace = false;
          if (leavingSubTurn) activatePendingShopSubCard();
          state.turn = nextPlayer;
          return;
        }
        state.trail.trapCashTurns = Math.max(0, Number(state.trail.trapCashTurns || 0) - 1);
        if (state.trail.trapCashTurns <= 0) {
          state.trail.trapCashValues = {};
          addLog("<strong>Blank Cash fades.</strong> Blank panels return to normal.");
        }
      }
      if (leavingSubTurn) activatePendingShopSubCard();
      state.turn = nextPlayer;
    }

    function trailShoppingControlsAllowed() {
      const localRole = localOnlineRole();
      return !localRole || localRole === DOM;
    }

    function makeTrailCardRecord(player, deck, card, activated = false) {
      return {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        player,
        deck,
        source: Number(state.trail.positions[player] || 0),
        effectKey: card.effectKey || "",
        amount: card.amount || 0,
        title: card.title,
        text: card.text,
        activated
      };
    }

    function revealTrailCardRecord(card) {
      if (!state.trail || !card) return;
      if (card.deck === "Chance Deck") {
        state.trail.lastFateCard = card;
      } else {
        state.trail.lastPlayerCard = card;
      }
      state.trail.revealedCard = card;
      state.trail.cardCollapsed = false;
    }

    function activatePurchasedTrailCard(card) {
      if (!state.trail || !card) return;
      card.activated = true;
      revealTrailCardRecord(card);
      addLog(`<strong>${state.names.dom} buys ${card.title}.</strong> ${card.text}`);
      applyTrailCardEffect(card);
    }

    function activatePendingShopSubCard() {
      if (!state.trail || !state.trail.pendingShopSubCard) return;
      const card = state.trail.pendingShopSubCard;
      state.trail.pendingShopSubCard = null;
      card.activated = true;
      revealTrailCardRecord(card);
      addLog(`<strong>Purchased Sub card activates.</strong> ${card.title}: ${card.text}`);
      applyTrailCardEffect(card);
    }

    function startTrailShopping() {
      if (!state.trail || !state.trail.finishChoicePending || !trailShoppingControlsAllowed()) return;
      state.trail.shoppingMode = true;
      state.trail.finishChoicePending = false;
      state.trail.endChoicePending = false;
      state.trail.victorySplashUntil = 0;
      state.trail.winner = null;
      state.active = true;
      passTrailTurn(SUB);
      addLog(`<strong>${state.names.dom} goes shopping.</strong> ${state.names.sub} rolls two dice while racing for the finish.`);
      render();
      publishState();
    }

    function endTrailFromShopping() {
      if (!state.trail || !trailShoppingControlsAllowed()) return;
      state.active = false;
      state.trail.shoppingMode = false;
      state.trail.finishChoicePending = false;
      state.trail.endChoicePending = true;
      state.trail.victorySplashUntil = 0;
      state.trail.winner = DOM;
      finalizeTrailTributeTransfer();
      addLog(`<strong>${state.names.dom} ends the game.</strong> Tribute Trail belongs to ${state.names.dom}.`);
      render();
      publishState();
    }

    function restartTrailFromEnd() {
      if (!state.trail || !state.trail.endChoicePending || !trailShoppingControlsAllowed()) return;
      resetTributeTrailBoard();
      els.log.innerHTML = "";
      addLog(`<strong>Tribute Trail restarted.</strong> ${state.names.dom}'s bank stays at ${money(state.domVault)}.`);
      render();
      publishState();
    }

    function returnToGamesFromTrailEnd() {
      if (!state.trail || !state.trail.endChoicePending || !trailShoppingControlsAllowed()) return;
      state.active = false;
      state.pendingWager = null;
      state.pot = 0;
      state.trail.endChoicePending = false;
      state.trail.finishChoicePending = false;
      state.trail.shoppingMode = false;
      setScreen("select");
      render();
      publishState();
    }

    function trailShopStartAction() {
      if (state.trail && state.trail.setupPending) startTributeTrailRace();
      else if (state.trail && state.trail.endChoicePending) restartTrailFromEnd();
      else startTrailShopping();
    }

    function trailShopWaitAction() {
      if (state.trail && state.trail.endChoicePending) restartTrailFromEnd();
      else waitTrailShoppingTurn();
    }

    function trailShopEndAction() {
      if (state.trail && state.trail.endChoicePending) returnToGamesFromTrailEnd();
      else endTrailFromShopping();
    }

    function waitTrailShoppingTurn() {
      if (!state.trail || !state.trail.shoppingMode || state.turn !== DOM || !trailShoppingControlsAllowed()) return;
      passTrailTurn(SUB);
      addLog(`<strong>${state.names.dom} waits.</strong> ${state.names.sub} gets another sprint roll.`);
      render();
      publishState();
    }

    function buyTrailShoppingCard(deck) {
      if (!state.trail || !state.trail.shoppingMode || state.turn !== DOM || !trailShoppingControlsAllowed()) return;
      const costs = { dom: 6, sub: 3, chance: 4 };
      const cost = costs[deck] || 0;
      if (Number(state.trail.spendingMoney || 0) < cost) return;
      state.trail.spendingMoney = Number(state.trail.spendingMoney || 0) - cost;
      if (deck === "dom") {
        const card = makeTrailCardRecord(DOM, "Dom Deck", drawTrailDomCard(), true);
        activatePurchasedTrailCard(card);
      } else if (deck === "chance") {
        const card = makeTrailCardRecord(DOM, "Chance Deck", drawTrailChanceCard(DOM), true);
        activatePurchasedTrailCard(card);
      } else if (deck === "sub") {
        const card = makeTrailCardRecord(SUB, "Sub Deck", drawTrailSubCard(), false);
        state.trail.pendingShopSubCard = card;
        addLog(`<strong>${state.names.dom} buys a Sub card.</strong> It will activate at the end of ${state.names.sub}'s next turn.`);
      }
      if (state.active && !state.trail.trailSelection && !state.trail.cashSelection && !state.trail.pendingCardActivation) {
        passTrailTurn(SUB);
      }
      render();
      publishState();
    }

    function trailCashMultiplier(index) {
      const multipliers = state.trail && state.trail.cashMultipliers ? state.trail.cashMultipliers : {};
      if (Number(multipliers[index]) > 1) return Number(multipliers[index]);
      return (state.trail && (state.trail.cashDoubled || []).includes(index)) ? 2 : 1;
    }

    function doubleTrailCashSpace(index) {
      if (!state.trail || state.trail.spaces[index] !== "cash") return false;
      const current = trailCashMultiplier(index);
      state.trail.cashMultipliers = {
        ...(state.trail.cashMultipliers || {}),
        [index]: current * 2
      };
      if (!(state.trail.cashDoubled || []).includes(index)) {
        state.trail.cashDoubled = [...(state.trail.cashDoubled || []), index];
      }
      return true;
    }

    function pickTrailCashSpaces(count) {
      const cashSpaces = state.trail.spaces
        .map((type, index) => ({ type, index }))
        .filter((space) => space.type === "cash")
        .map((space) => space.index);
      const picked = [];
      while (cashSpaces.length && picked.length < count) {
        const index = Math.floor(Math.random() * cashSpaces.length);
        picked.push(cashSpaces.splice(index, 1)[0]);
      }
      picked.forEach(doubleTrailCashSpace);
      return picked;
    }

    function drawLimitedTrailCard(deck, cards) {
      if (!state.trail.cardDrawCounts) state.trail.cardDrawCounts = { dom: {}, sub: {}, fate: {} };
      if (!state.trail.cardDrawCounts[deck]) state.trail.cardDrawCounts[deck] = {};
      const counts = state.trail.cardDrawCounts[deck];
      const available = cards.filter((card) => card.limit === null || Number(counts[card.id || card.title] || 0) < Number(card.limit || 0));
      const pool = [];
      available.forEach((card) => {
        const weight = Math.max(1, Number(card.weight || 1));
        for (let index = 0; index < weight; index += 1) pool.push(card);
      });
      const picked = pool[Math.floor(Math.random() * pool.length)] || cards[Math.floor(Math.random() * cards.length)];
      if (picked && picked.limit !== null) {
        const id = picked.id || picked.title;
        counts[id] = Number(counts[id] || 0) + 1;
      }
      return picked;
    }

    function drawTrailPlayerCard(player) {
      const sourceIndex = Number(state.trail.positions[player] || 0);
      const card = player === DOM ? drawTrailDomCard() : drawTrailSubCard();
      state.trail.lastPlayerCard = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        player,
        deck: player === DOM ? "Dom Deck" : "Sub Deck",
        source: sourceIndex,
        effectKey: card.effectKey || "",
        amount: card.amount || 0,
        title: card.title,
        text: card.text,
        activated: false
      };
      state.trail.revealedCard = state.trail.lastPlayerCard;
      state.trail.cardCollapsed = false;
      state.trail.pendingCardActivation = {
        id: state.trail.lastPlayerCard.id,
        player,
        deck: state.trail.lastPlayerCard.deck,
        source: sourceIndex,
        title: card.title,
        text: card.text,
        effectKey: card.effectKey || "",
        amount: card.amount || 0
      };
      addLog(`<strong>${labelFor(player)} draws ${card.title}.</strong> ${card.text}`);
      renderTrailCardReveal();
    }

    function drawTrailDomCard() {
      const gildedCount = 2 + Math.floor(Math.random() * 3);
      const cards = [
        {
          title: "Gilded Markers",
          text: `${state.names.dom} chooses ${gildedCount} cash spaces to double for the rest of the game. This can stack on spaces doubled by earlier cards.`,
          effectKey: "double-cash",
          amount: gildedCount,
          limit: null
        },
        {
          title: "Loaded Stride",
          text: `${state.names.dom}'s die upgrades to d8 for the rest of the game.`,
          effectKey: "dom-d8",
          limit: 1
        },
        {
          title: "Held In Place",
          text: `${state.names.sub} skips their next turn.`,
          effectKey: "sub-skip",
          limit: null
        },
        {
          title: "Slide Ownership",
          text: `Slides only affect ${state.names.sub} for the rest of the game.`,
          effectKey: "slides-sub-only",
          limit: 1
        },
        {
          title: "New Descent",
          text: `${state.names.dom} adds a new slide: choose 57 to 37, 53 to 45, or 34 to 16.`,
          effectKey: "add-slide",
          limit: 3
        },
        {
          title: "Blank Check",
          text: `${state.names.dom} chooses one blank space. It becomes a permanent ${money(trailCardMoney(5))} cash space.`,
          effectKey: "blank-check",
          amount: 5,
          limit: null
        },
        {
          title: "Bank Claim",
          text: `Choose one cash space. The next time anyone lands there, it pays an extra ${money(trailCardMoney(5))}.`,
          effectKey: "bank-claim",
          amount: 5,
          limit: null
        },
        {
          title: "Luxury Toll",
          text: `${state.names.sub} immediately sends ${money(trailCardMoney(5))}.`,
          effectKey: "luxury-toll",
          amount: 5,
          limit: null
        },
        {
          title: "Weighted Path",
          text: `${state.names.sub} moves back 1, then ${state.names.dom} moves forward 1.`,
          effectKey: "weighted-path",
          limit: null
        },
        {
          title: "Blank Treasury",
          text: `All blank panels become cash panels worth ${money(7)}-${money(12)} for 12 turns. If this effect is already active, add 12 turns.`,
          effectKey: "trap-cash",
          amount: 12,
          limit: 2
        }
      ];
      return drawLimitedTrailCard("dom", cards);
    }

    function drawTrailSubCard() {
      const count = 4 + Math.floor(Math.random() * 3);
      const cards = [
        {
          title: "Timeline Worship",
          text: `Like and repost ${count} of ${state.names.dom}'s recent posts. This is a manual prompt, not automated.`,
          effectKey: "instruction-only",
          limit: null
        },
        {
          title: "Public Praise",
          text: `Leave one worshipping or subby comment on a ${state.names.dom} post.`,
          effectKey: "instruction-only",
          limit: 3
        },
        {
          title: "Quote Offering",
          text: `Quote repost one ${state.names.dom} post with a short worship line.`,
          effectKey: "instruction-only",
          limit: 2
        },
        {
          title: "Pinned Worship",
          text: `Like, repost, and comment on ${state.names.dom}'s pinned post.`,
          effectKey: "instruction-only",
          limit: 1
        },
        {
          title: "Tiny Throne Offering",
          text: `Go to ${state.names.dom}'s throne and purchase their lowest priced option.`,
          effectKey: "instruction-only",
          limit: null
        },
        {
          title: "Small Throne Offering",
          text: `Go to ${state.names.dom}'s throne and purchase their second lowest priced option.`,
          effectKey: "instruction-only",
          limit: 2
        },
        {
          title: "Average Throne Offering",
          text: `Go to ${state.names.dom}'s throne and purchase their third lowest priced option.`,
          effectKey: "instruction-only",
          limit: 1
        },
        {
          title: "Lucky Mercy?",
          text: `Move forward 1 and activate the panel landed on.`,
          effectKey: "lucky-mercy",
          limit: null
        },
        {
          title: "$end",
          text: `Send ${money(trailCardMoney(10))} to ${state.names.dom} right now.`,
          effectKey: "sub-send-5",
          amount: 10,
          limit: 2
        },
        {
          title: "Blank Tribute",
          text: `All blank panels become cash panels worth ${money(7)}-${money(12)} for 9 turns. If this effect is already active, add 9 turns.`,
          effectKey: "trap-cash",
          amount: 9,
          limit: 3
        }
      ];
      return drawLimitedTrailCard("sub", cards);
    }

    function drawTrailChanceCard(player) {
      const taxedAmount = 1 + Math.floor(Math.random() * 6);
      const cards = [
        {
          title: "Chance Push",
          text: player === DOM ? `${state.names.dom} moves forward 2.` : `${state.names.sub} moves back 2.`,
          effectKey: "fate-push",
          limit: null
        },
        {
          title: "Stolen Step",
          text: `${state.names.sub} skips their next turn.`,
          effectKey: "sub-skip",
          limit: null
        },
        {
          title: "Clean Break",
          text: `${labelFor(player)} moves forward 1.`,
          effectKey: "player-forward-1",
          limit: null
        },
        {
          title: "Snagged",
          text: `${labelFor(player)} moves back 1.`,
          effectKey: "player-back-1",
          limit: null
        },
        {
          title: "Taxed Path",
          text: `${money(trailCardMoney(taxedAmount))} enters Trail Tribute.`,
          effectKey: "taxed-path",
          amount: taxedAmount,
          limit: null
        },
        {
          title: "Slipstream",
          text: `${labelFor(player)} moves to the next Chance space.`,
          effectKey: "slipstream",
          limit: null
        },
        {
          title: "Shared Toll",
          text: `Both players move back 1, then ${money(trailCardMoney(2))} enters Trail Tribute.`,
          effectKey: "shared-toll",
          amount: 2,
          limit: null
        },
        {
          title: "Rich Text",
          text: `Double the money value listed on all cards in all decks for the rest of the game.`,
          effectKey: "double-card-money",
          limit: 1
        },
        {
          title: "Echoed Landing",
          text: `Forced move effects from slides and cards make the moved player activate the panel they landed on at the start of their next turn for the rest of the game.`,
          effectKey: "forced-panel-activation",
          limit: 1,
          weight: 3
        },
        {
          title: "Blank Flush",
          text: `All blank panels become cash panels worth ${money(7)}-${money(12)} for 7 turns. If this effect is already active, add 7 turns.`,
          effectKey: "trap-cash",
          amount: 7,
          limit: 3
        }
      ];
      return drawLimitedTrailCard("fate", cards);
    }

    function drawTrailFateCard(player) {
      const sourceIndex = Number(state.trail.positions[player] || 0);
      const card = drawTrailChanceCard(player);
      state.trail.lastFateCard = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        player,
        deck: "Chance Deck",
        source: sourceIndex,
        effectKey: card.effectKey || "",
        amount: card.amount || 0,
        title: card.title,
        text: card.text,
        activated: false
      };
      state.trail.revealedCard = state.trail.lastFateCard;
      state.trail.cardCollapsed = false;
      state.trail.pendingCardActivation = {
        id: state.trail.lastFateCard.id,
        player,
        deck: "Chance Deck",
        source: sourceIndex,
        title: card.title,
        text: card.text,
        effectKey: card.effectKey || "",
        amount: card.amount || 0
      };
      addLog(`<strong>${labelFor(player)} draws ${card.title}.</strong> ${card.text}`);
      renderTrailCardReveal();
    }

    function trailCardActivationAllowed(card) {
      if (!card || !state.trail || !state.trail.pendingCardActivation) return false;
      if (state.trail.pendingCardActivation.player !== card.player) return false;
      if (state.trail.pendingCardActivation.id && card.id && state.trail.pendingCardActivation.id !== card.id) return false;
      const localRole = localOnlineRole();
      return !localRole || localRole === card.player;
    }

    function trailPendingCardRecord() {
      if (!state.trail) return null;
      const pending = state.trail.pendingCardActivation;
      if (!pending) return null;
      return {
        id: pending.id || "",
        player: pending.player,
        deck: pending.deck || "Card",
        source: Number(pending.source || 0),
        effectKey: pending.effectKey || "",
        amount: pending.amount || 0,
        title: pending.title || "Card",
        text: pending.text || "",
        activated: false
      };
    }

    function currentTrailCardForReveal() {
      if (!state.trail) return null;
      return trailPendingCardRecord() || state.trail.revealedCard || null;
    }

    function applyTrailCardEffect(card) {
      const player = card.player;
      switch (card.effectKey) {
        case "instruction-only":
          break;
        case "double-cash": {
          const needed = Math.max(2, Math.min(4, Number(card.amount || 2)));
          state.trail.trailSelection = {
            type: "double-cash",
            label: "cash spaces",
            remaining: needed,
            total: needed,
            picked: []
          };
          state.trail.cashSelection = state.trail.trailSelection;
          addLog(`<strong>Gilded Markers waits.</strong> ${state.names.dom} must choose ${needed} cash spaces to double.`);
          break;
        }
        case "dom-d8":
          state.trail.dieSides.dom = Math.max(8, Number(state.trail.dieSides.dom || 6));
          break;
        case "slides-sub-only":
          state.trail.slidesSubOnly = true;
          break;
        case "add-slide":
          state.trail.trailSelection = {
            type: "add-slide",
            label: "slide location",
            remaining: 1,
            options: [
              { from: 56, to: 36 },
              { from: 52, to: 44 },
              { from: 33, to: 15 }
            ]
          };
          break;
        case "blank-check":
          state.trail.trailSelection = {
            type: "blank-check",
            label: "blank space",
            remaining: 1,
            amount: trailCardMoney(card.amount || 5)
          };
          break;
        case "bank-claim":
          state.trail.trailSelection = {
            type: "bank-claim",
            label: "cash space",
            remaining: 1,
            amount: trailCardMoney(card.amount || 5)
          };
          break;
        case "luxury-toll":
          break;
        case "weighted-path":
          moveTrailPlayer(SUB, -1, false);
          moveTrailPlayer(DOM, 1, false);
          break;
        case "sub-skip":
          state.trail.skip.sub = true;
          break;
        case "fate-push":
          moveTrailPlayer(player, player === DOM ? 2 : -2, false);
          break;
        case "player-forward-1":
          moveTrailPlayer(player, 1, false);
          break;
        case "player-back-1":
          moveTrailPlayer(player, -1, false);
          break;
        case "taxed-path":
          awardTrailTributeMoney(trailCardMoney(card.amount || 1));
          break;
        case "sub-send-5":
          break;
        case "sub-send":
          awardTrailTributeMoney(trailCardMoney(card.amount || 1));
          break;
        case "lucky-mercy":
          moveTrailPlayer(player, 1, false);
          if (state.active) resolveTrailSpace(player);
          break;
        case "slipstream":
          moveTrailPlayerToNextType(player, "fate-card");
          break;
        case "cash-drift":
          driftNearestTrailCash(player);
          break;
        case "trap-bloom":
          bloomTrailTrap();
          break;
        case "shared-toll":
          moveTrailPlayer(DOM, -1, false);
          moveTrailPlayer(SUB, -1, false);
          awardTrailTributeMoney(trailCardMoney(card.amount || 2));
          break;
        case "double-card-money":
          state.trail.cardMoneyMultiplier = Number(state.trail.cardMoneyMultiplier || 1) * 2;
          addLog(`<strong>Rich Text.</strong> Card money values are now x${state.trail.cardMoneyMultiplier}.`);
          break;
        case "forced-panel-activation":
          state.trail.forcedPanelActivation = true;
          addLog(`<strong>Echoed Landing.</strong> Forced movement will echo at the start of future turns.`);
          break;
        case "trap-cash":
          addTrailTrapCashTurns(card.amount || 3);
          break;
        default:
          break;
      }
    }

    function activateTrailCard() {
      const card = state.currentGame === "tributeTrail" && state.trail ? trailPendingCardRecord() : null;
      if (!trailCardActivationAllowed(card)) return false;
      state.trail.pendingCardActivation = null;
      state.trail.revealedCard = card;
      card.activated = true;
      addLog(`<strong>${labelFor(card.player)} activates ${card.title}.</strong>`);
      applyTrailCardEffect(card);
      normalizeTrailState();
      if (state.active && !state.trail.trailSelection) passTrailTurn(otherRole(card.player));
      state.trail.cardCollapsed = true;
      render();
      publishState();
      return true;
    }

    function moveTrailPlayerToNextType(player, type) {
      if (!state.trail) return false;
      const current = Number(state.trail.positions[player] || 0);
      for (let index = current + 1; index < TRAIL_LENGTH; index += 1) {
        if (state.trail.spaces[index] === type) {
          state.trail.positions[player] = index;
          addLog(`<strong>Slipstream.</strong> ${labelFor(player)} moves to the next ${trailSpaceLabel(type)} space.`);
          return true;
        }
      }
      addLog(`<strong>Slipstream fizzles.</strong> No matching space ahead.`);
      return false;
    }

    function driftNearestTrailCash(player) {
      if (!state.trail) return false;
      const current = Number(state.trail.positions[player] || 0);
      const cashIndexes = state.trail.spaces
        .map((type, index) => ({ type, index }))
        .filter((space) => space.type === "cash" && space.index < TRAIL_FINISH && state.trail.spaces[space.index + 1] === "plain")
        .sort((a, b) => Math.abs(a.index - current) - Math.abs(b.index - current));
      const picked = cashIndexes[0];
      if (!picked) {
        addLog(`<strong>Cash Drift fizzles.</strong> No cash space can drift forward.`);
        return false;
      }
      state.trail.spaces[picked.index] = "plain";
      state.trail.spaces[picked.index + 1] = "cash";
      state.trail.cashValues[picked.index + 1] = trailCashValue(picked.index);
      state.trail.cashValues[picked.index] = 1;
      if (state.trail.cashMultipliers && state.trail.cashMultipliers[picked.index]) {
        state.trail.cashMultipliers[picked.index + 1] = state.trail.cashMultipliers[picked.index];
        delete state.trail.cashMultipliers[picked.index];
      }
      addLog(`<strong>Cash Drift.</strong> A cash space slides forward one space.`);
      return true;
    }

    function bloomTrailTrap() {
      if (!state.trail) return false;
      const plainSpaces = state.trail.spaces
        .map((type, index) => ({ type, index }))
        .filter((space) => space.type === "plain" && space.index > 0 && space.index < TRAIL_FINISH);
      if (!plainSpaces.length) return false;
      const picked = plainSpaces[Math.floor(Math.random() * plainSpaces.length)];
      state.trail.spaces[picked.index] = "trap";
      addLog(`<strong>Trap Bloom.</strong> A path space becomes a trap.`);
      return true;
    }

    function trailSelectionAllowed() {
      if (!state.trail || !state.trail.trailSelection) return false;
      const localRole = localOnlineRole();
      return !localRole || localRole === DOM;
    }

    function trailSpaceSelectionCandidate(index) {
      if (!state.trail || !state.trail.trailSelection) return false;
      const selection = state.trail.trailSelection;
      const type = state.trail.spaces[index];
      if (selection.type === "double-cash" || selection.type === "bank-claim") return type === "cash";
      if (selection.type === "blank-check") return type === "plain";
      if (selection.type === "add-slide") return (selection.options || []).some((option) => option.from === index);
      return false;
    }

    function trailSpaceSelectable(index) {
      return trailSelectionAllowed() && trailSpaceSelectionCandidate(index);
    }

    function selectTrailSpace(index) {
      if (!state.trail || !state.trail.trailSelection || !trailSelectionAllowed() || !trailSpaceSelectionCandidate(index)) return;
      const selection = state.trail.trailSelection;
      if (selection.type === "double-cash") {
        doubleTrailCashSpace(index);
        selection.picked = [...(selection.picked || []), index];
        selection.remaining = Math.max(0, Number(selection.remaining || 0) - 1);
        addLog(`<strong>Gilded Marker placed.</strong> Space ${index + 1} now pays x${trailCashMultiplier(index)}.`);
      } else if (selection.type === "bank-claim") {
        state.trail.bankClaims = {
          ...(state.trail.bankClaims || {}),
          [index]: (Number(state.trail.bankClaims && state.trail.bankClaims[index] || 0) + Math.max(1, Number(selection.amount || 5)))
        };
        selection.remaining = 0;
        addLog(`<strong>Bank Claim placed.</strong> Space ${index + 1} will pay extra.`);
      } else if (selection.type === "blank-check") {
        state.trail.spaces[index] = "cash";
        state.trail.cashValues[index] = Math.max(1, Number(selection.amount || 5));
        selection.remaining = 0;
        addLog(`<strong>Blank Check placed.</strong> Space ${index + 1} becomes a cash space.`);
      } else if (selection.type === "add-slide") {
        const option = (selection.options || []).find((item) => item.from === index);
        if (option) {
          state.trail.extraSlides = [...(state.trail.extraSlides || []), option];
          state.trail.spaces[option.from] = "slide";
          selection.remaining = 0;
          addLog(`<strong>New Descent.</strong> A slide now drops from space ${option.from + 1} to ${option.to + 1}.`);
        }
      }
      if (Number(selection.remaining || 0) <= 0) {
        state.trail.cashSelection = null;
        state.trail.trailSelection = null;
        state.trail.pendingCardActivation = null;
        state.trail.moving = false;
        state.trail.movingPlayer = null;
        state.trail.rollAnimationUntil = 0;
        if (state.active) passTrailTurn(SUB);
      }
      render();
      publishState();
    }

    function clearTrailCardReveal(allowActivation = true) {
      if (!state.trail) return;
      const card = currentTrailCardForReveal();
      if (!card) return;
      if (allowActivation && state.trail.pendingCardActivation && trailCardActivationAllowed(card)) {
        activateTrailCard();
        return;
      }
      if (state.trail.pendingCardActivation) return;
      const touchLike = window.matchMedia && window.matchMedia("(hover: none)").matches;
      if (!state.trail.cardCollapsed) {
        state.trail.cardCollapsed = true;
      } else if (touchLike) {
        state.trail.cardCollapsed = false;
      }
      renderTrailCardReveal();
      publishState();
    }

    function renderTrailCardReveal() {
      const trailVisible = state.screen === "game" && state.currentGame === "tributeTrail";
      const card = trailVisible && state.trail ? currentTrailCardForReveal() : null;
      const pendingCard = Boolean(state.trail && state.trail.pendingCardActivation && card && !card.activated);
      els.trailBankPill.classList.toggle("hidden", !trailVisible);
      els.trailCardModal.classList.toggle("hidden", !card);
      els.trailCardModal.classList.toggle("compact", Boolean(card && !pendingCard && state.trail.cardCollapsed));
      els.trailCardReveal.classList.remove("dom-deck", "sub-deck", "chance-deck");
      if (!card) return;
      const deckClass = String(card.deck || "").toLowerCase().includes("dom")
        ? "dom-deck"
        : (String(card.deck || "").toLowerCase().includes("sub") ? "sub-deck" : "chance-deck");
      els.trailCardReveal.classList.add(deckClass);
      els.trailCardDeck.textContent = `${card.deck || "Card"} - ${labelFor(card.player)}`;
      els.trailCardTitle.textContent = card.title || "Card";
      els.trailCardText.textContent = card.text || "";
      if (state.trail.pendingCardActivation && !card.activated) {
        els.trailCardAction.textContent = trailCardActivationAllowed(card)
          ? "Click to activate this card."
          : `Waiting for ${labelFor(card.player)} to activate.`;
      } else if (state.trail.trailSelection) {
        const selection = state.trail.trailSelection;
        if (selection.type === "add-slide") {
          const canChooseSlide = trailSelectionAllowed();
          els.trailCardAction.innerHTML = `
            <span>${canChooseSlide ? "Choose a slide location." : `Waiting for ${state.names.dom} to choose a slide location.`}</span>
            <span class="setup-actions">
              ${(selection.options || []).map((option) => `<button data-trail-select-space="${option.from}"${canChooseSlide ? "" : " disabled"}>${option.from + 1} to ${option.to + 1}</button>`).join("")}
            </span>
          `;
        } else {
          els.trailCardAction.textContent = trailSelectionAllowed()
            ? `Choose ${selection.remaining} ${selection.label || "space"}${selection.remaining === 1 ? "" : "s"}.`
            : `Waiting for ${state.names.dom} to choose ${selection.label || "spaces"}.`;
        }
      } else {
        els.trailCardAction.textContent = "Card activated.";
      }
    }

    function renderTrailShopModal() {
      const trail = state.screen === "game" && state.currentGame === "tributeTrail" ? state.trail : null;
      const busy = Boolean(trail && (trail.pendingCardActivation || trail.trailSelection || trail.cashSelection || trail.moving));
      const victorySplash = Boolean(trail && trail.victorySplashUntil && Date.now() < trail.victorySplashUntil);
      const show = Boolean(trail && !busy && (trail.setupPending || victorySplash || trail.finishChoicePending || trail.endChoicePending || (trail.shoppingMode && state.turn === DOM && state.active)));
      els.trailShopModal.classList.toggle("hidden", !show);
      els.trailShopModal.classList.toggle("trail-victory-splash", victorySplash);
      if (!show) return;
      const canControl = trailShoppingControlsAllowed();
      const spending = Number(trail.spendingMoney || 0);
      els.trailTransferPicker.classList.toggle("hidden", !trail.setupPending);
      if (trail.setupPending) {
        const percent = Math.max(0, Math.min(100, Number(trail.transferPercent || 0)));
        els.trailShopTitle.textContent = "Trail Tribute";
        els.trailShopText.textContent = `${state.names.dom} chooses how much Trail Tribute moves into her bank when the game ends.`;
        els.trailTransferSlider.value = String(percent);
        els.trailTransferSlider.disabled = !canControl;
        els.trailTransferValue.textContent = `${percent}%`;
        els.trailShopOptions.classList.add("hidden");
        els.trailShopStartBtn.classList.remove("hidden");
        els.trailShopWaitBtn.classList.add("hidden");
        els.trailShopEndBtn.classList.add("hidden");
        els.trailShopStartBtn.textContent = "Start Trail";
        els.trailShopStartBtn.disabled = !canControl;
        return;
      }
      els.trailTransferPicker.classList.add("hidden");
      els.trailShopStartBtn.textContent = "Go Shopping";
      if (victorySplash) {
        els.trailShopTitle.textContent = `${state.names.dom} wins`;
        els.trailShopText.textContent = `${state.names.sub} has been beaten to the finish.`;
        els.trailShopOptions.classList.add("hidden");
        els.trailShopStartBtn.classList.add("hidden");
        els.trailShopWaitBtn.classList.add("hidden");
        els.trailShopEndBtn.classList.add("hidden");
        window.clearTimeout(renderTrailShopModal.timer);
        renderTrailShopModal.timer = window.setTimeout(render, Math.max(80, trail.victorySplashUntil - Date.now() + 20));
        return;
      }
      if (trail.endChoicePending) {
        els.trailShopTitle.textContent = "Trail Complete";
        els.trailShopText.textContent = `${state.names.dom} decides whether to run Tribute Trail again or return to the game list.`;
        els.trailShopOptions.classList.add("hidden");
        els.trailShopStartBtn.classList.add("hidden");
        els.trailShopWaitBtn.classList.remove("hidden");
        els.trailShopEndBtn.classList.remove("hidden");
        els.trailShopWaitBtn.textContent = "Restart";
        els.trailShopEndBtn.textContent = "Game Select";
        els.trailShopWaitBtn.disabled = !canControl;
        els.trailShopEndBtn.disabled = !canControl;
        return;
      }
      els.trailShopWaitBtn.textContent = "Wait";
      els.trailShopEndBtn.textContent = "End Game";
      if (trail.finishChoicePending) {
        els.trailShopTitle.textContent = `${state.names.dom} reached the end`;
        els.trailShopText.textContent = "End the game now, or go shopping. Shopping lets the dom buy cards on each dom turn until the sub reaches the end or the dom ends the game. While shopping is active, the sub rolls two dice to sprint toward the finish.";
        els.trailShopOptions.classList.add("hidden");
        els.trailShopStartBtn.classList.remove("hidden");
        els.trailShopWaitBtn.classList.add("hidden");
        els.trailShopEndBtn.classList.remove("hidden");
        els.trailShopStartBtn.disabled = !canControl;
        els.trailShopEndBtn.disabled = !canControl;
        return;
      }
      els.trailShopTitle.textContent = "Trail Shopping";
      els.trailShopText.textContent = spending > 0
        ? `${state.names.dom} has ${money(spending)} spending money. Buy a card, wait for ${state.names.sub} to sprint, or end the game.`
        : `${state.names.dom} is out of spending money. Wait for ${state.names.sub} to sprint, or end the game.`;
      els.trailShopOptions.classList.remove("hidden");
      els.trailShopStartBtn.classList.add("hidden");
      els.trailShopWaitBtn.classList.remove("hidden");
      els.trailShopEndBtn.classList.remove("hidden");
      els.trailShopOptions.querySelectorAll("[data-trail-shop]").forEach((button) => {
        const costs = { dom: 6, sub: 3, chance: 4 };
        button.disabled = !canControl || spending < Number(costs[button.dataset.trailShop] || 0);
      });
      els.trailShopWaitBtn.disabled = !canControl;
      els.trailShopEndBtn.disabled = !canControl;
    }

    function renderBlackjackSettingsModal() {
      const show = state.screen === "game"
        && state.currentGame === "tributeTwentyOne"
        && state.twentyOne
        && state.twentyOne.setupPending;
      els.blackjackSettingsModal.classList.toggle("hidden", !show);
      if (!show) return;
      const role = localOnlineRole();
      const canChoose = !state.online.room || role === DOM;
      const rounds = state.twentyOne.settings.rounds || "single";
      els.blackjackSettingsText.textContent = canChoose
        ? "Choose how long this Blackjack table runs."
        : `${state.names.dom} is choosing the Blackjack settings.`;
      els.blackjackSettingsModal.querySelectorAll("[data-blackjack-rounds]").forEach((button) => {
        button.classList.toggle("primary", button.dataset.blackjackRounds === rounds);
        button.disabled = !canChoose;
      });
      els.blackjackSettingsConfirmBtn.disabled = !canChoose;
    }

    function renderChessSettingsModal() {
      if (!els.chessSettingsModal) return;
      const key = timerSetupActiveKey();
      const game = timerGameState(key);
      const show = Boolean(key && game);
      els.chessSettingsModal.classList.toggle("hidden", !show);
      if (!show) return;
      const role = localOnlineRole();
      const canChoose = !state.online.room || role === DOM;
      const label = timerGameLabel(key);
      const mode = game.timerMode || "none";
      const target = game.timerTarget === "sub" ? "sub" : "both";
      if (els.turnTimerSettingsTitle) els.turnTimerSettingsTitle.textContent = `${label} Settings`;
      if (els.chessSettingsText) {
        els.chessSettingsText.textContent = canChoose
          ? `Choose whether this ${label} game uses a timer.`
          : `${state.names.dom} is choosing the ${label} settings.`;
      }
      els.chessSettingsModal.querySelectorAll("[data-chess-timer]").forEach((button) => {
        button.classList.toggle("primary", (button.dataset.chessTimer || "none") === mode);
        button.disabled = !canChoose;
      });
      els.chessSettingsModal.querySelectorAll("[data-chess-timer-target]").forEach((button) => {
        button.classList.toggle("primary", (button.dataset.chessTimerTarget || "both") === target);
        button.disabled = !canChoose || mode === "none";
      });
      if (els.chessCustomTimerRow) els.chessCustomTimerRow.classList.toggle("hidden", mode !== "custom");
      if (els.chessCustomTimerInput) {
        els.chessCustomTimerInput.value = turnTimerMinutes("custom", game.customTimerMinutes);
        els.chessCustomTimerInput.disabled = !canChoose;
      }
      if (els.reversiHintToggleRow) els.reversiHintToggleRow.classList.toggle("hidden", key !== "reversi");
      if (els.reversiHintToggle) {
        els.reversiHintToggle.checked = game.showNumberHints !== false;
        els.reversiHintToggle.disabled = !canChoose;
      }
      if (els.chessSettingsConfirmBtn) {
        els.chessSettingsConfirmBtn.textContent = `Start ${label}`;
        els.chessSettingsConfirmBtn.disabled = !canChoose;
      }
    }

    function renderCheckersQueenModal() {
      const setup = state.screen === "game" && state.currentGame === "tributeCheckers" && state.checkers
        ? state.checkers.queenSetup
        : null;
      els.checkersQueenModal.classList.toggle("hidden", !setup);
      if (!setup) return;
      const role = localOnlineRole();
      const stage = setup.stage || "sub";
      const isLocal = !state.online.room || !role;
      if (stage === "domThrone") {
        const canChoose = isLocal || role === DOM;
        els.checkersQueenTitle.textContent = "Start Crowned?";
        els.checkersQueenText.textContent = canChoose
          ? `Do you want ${state.names.dom} to start with a queen?`
          : `${state.names.dom} is deciding whether to start with a queen.`;
        els.checkersQueenYesBtn.textContent = "Start With Queen";
        els.checkersQueenNoBtn.textContent = "Start Normal";
        els.checkersQueenYesBtn.disabled = !canChoose;
        els.checkersQueenNoBtn.disabled = !canChoose;
        return;
      }
      if (stage === "sub") {
        const canChoose = isLocal || role === SUB;
        els.checkersQueenTitle.textContent = "Offer Her A Queen";
        els.checkersQueenText.textContent = canChoose
          ? `Does ${state.names.sub} allow ${state.names.dom} to start with a queen?`
          : `${state.names.sub} is deciding whether ${state.names.dom} deserves to start with a queen.`;
        els.checkersQueenYesBtn.textContent = "Allow Queen";
        els.checkersQueenNoBtn.textContent = "Deny Her";
        els.checkersQueenYesBtn.disabled = !canChoose;
        els.checkersQueenNoBtn.disabled = !canChoose;
        return;
      }
      const canChoose = isLocal || role === DOM;
      els.checkersQueenTitle.textContent = "Take The Crown?";
      els.checkersQueenText.textContent = canChoose
        ? `${state.names.sub} did not think you deserved a queen. Take one anyway? If you do, Queen's Drain becomes $2 / $4 / $6 this game.`
        : `${state.names.dom} is deciding whether to take the queen anyway.`;
      els.checkersQueenYesBtn.textContent = "Take Queen";
      els.checkersQueenNoBtn.textContent = "Start Normal";
      els.checkersQueenYesBtn.disabled = !canChoose;
      els.checkersQueenNoBtn.disabled = !canChoose;
    }

    function renderHigherLowerMercyModal() {
      if (!els.higherLowerMercyModal) return;
      const game = state.currentGame === "higherLower" && state.higherLower ? state.higherLower : null;
      const role = localOnlineRole();
      const canDecide = Boolean(game && game.mercyPending && domAdvantageControlsAllowed(role));
      els.higherLowerMercyModal.classList.toggle("hidden", !canDecide);
      if (!canDecide) return;
      const possible = higherLowerDomPossibleWin(game);
      els.higherLowerMercyText.textContent = `${state.names.sub} wants mercy after ${Number(game.wrongStreak || 0)} wrong calls. ${state.names.dom}, they want you to cash out at ${money(possible)}, but do they deserve it for being a pathetic beggar?`;
      els.higherLowerMercyCollectBtn.disabled = false;
      els.higherLowerMercyDenyBtn.disabled = false;
      els.higherLowerMercyPunishBtn.disabled = false;
    }

    function renderCheckersQueenSplash() {
      const checkers = state.screen === "game" && state.currentGame === "tributeCheckers" ? state.checkers : null;
      const remaining = checkers ? Math.max(0, Number(checkers.queenSplashUntil || 0) - Date.now()) : 0;
      const show = Boolean(checkers && checkers.queenSplashMessage && remaining > 0 && shouldShowSubOnlyMedia());
      els.checkersQueenSplash.classList.toggle("active", show);
      els.checkersQueenSplashText.textContent = show ? checkers.queenSplashMessage : "";
      window.clearTimeout(renderCheckersQueenSplash.timer);
      if (show) {
        renderCheckersQueenSplash.timer = window.setTimeout(render, remaining + 40);
      }
    }

    function resetPrototype() {
      state.pendingWager = null;
      if (state.currentGame === "tributeChess") {
        resetTributeChessBoard();
        els.log.innerHTML = "";
        addLog(`<strong>Tribute Chess reset.</strong> ${state.names.dom}'s bank stays at ${money(state.domVault)}.`);
        render();
        publishState();
        return;
      }
      if (state.currentGame === "tributeCheckers") {
        resetTributeCheckersBoard();
        els.log.innerHTML = "";
        addLog(`<strong>Tribute Checkers reset.</strong> ${state.names.dom}'s bank stays at ${money(state.domVault)}.`);
        render();
        publishState();
        return;
      }
      if (state.currentGame === "tributeReversi") {
        resetTributeReversiBoard();
        els.log.innerHTML = "";
        addLog(`<strong>Tribute Reversi reset.</strong> ${state.names.dom}'s bank stays at ${money(state.domVault)}.`);
        render();
        publishState();
        return;
      }
      if (state.currentGame === "tributeTwentyOne") {
        resetTributeTwentyOneBoard();
        els.log.innerHTML = "";
        addLog(`<strong>Tribute Blackjack reset.</strong> ${state.names.dom}'s bank stays at ${money(state.domVault)}.`);
        render();
        publishState();
        return;
      }
      if (state.currentGame === "higherLower") {
        resetHigherLowerBoard();
        els.log.innerHTML = "";
        addLog(`<strong>Higher / Lower reset.</strong> ${state.names.dom}'s bank stays at ${money(state.domVault)}.`);
        render();
        publishState();
        return;
      }
      if (state.currentGame === "tributeCrazyEights") {
        resetCrazyEightsBoard();
        els.log.innerHTML = "";
        addLog(`<strong>Tribute 8s reset.</strong> ${state.names.dom}'s bank stays at ${money(state.domVault)}.`);
        render();
        publishState();
        return;
      }
      if (state.currentGame === "doubleSolitaire") {
        resetDoubleSolitaireBoard();
        els.log.innerHTML = "";
        addLog(`<strong>Solitaire Duel reset.</strong> ${state.names.dom}'s bank stays at ${money(state.domVault)}.`);
        render();
        publishState();
        return;
      }
      if (state.currentGame === "tributeTicTacToe") {
        resetTributeTicTacToeBoard();
        els.log.innerHTML = "";
        addLog(`<strong>Tribute Tic Tac Toe reset.</strong> ${state.names.dom}'s bank stays at ${money(state.domVault)}.`);
        render();
        publishState();
        return;
      }
      if (state.currentGame === "wheelSpin") {
        resetWheelSpinBoard();
        els.log.innerHTML = "";
        addLog(`<strong>Wheel Spin reset.</strong> ${state.names.dom}'s bank stays at ${money(state.domVault)}.`);
        render();
        publishState();
        return;
      }
      if (state.currentGame === "tributeTrail") {
        resetTributeTrailBoard();
        els.log.innerHTML = "";
        addLog(`<strong>Tribute Trail reset.</strong> ${state.names.dom}'s bank stays at ${money(state.domVault)}.`);
        render();
        publishState();
        return;
      }
      if (state.currentGame === "obedienceOrders") {
        resetObedienceOrdersBoard();
        els.log.innerHTML = "";
        addLog(`<strong>Obedience Orders reset.</strong> ${state.names.dom}'s bank stays at ${money(state.domVault)}.`);
        render();
        publishState();
        return;
      }
      if (state.currentGame === "tributeFleet") {
        resetTributeFleetBoard();
        els.log.innerHTML = "";
        addLog(`<strong>Tribute Fleet reset.</strong> ${state.names.dom}'s bank stays at ${money(state.domVault)}.`);
        render();
        publishState();
        return;
      }
      resetTributeFourBoard();
      els.log.innerHTML = "";
      addLog(`<strong>Tribute Four reset.</strong> ${state.names.dom}'s bank stays at ${money(state.domVault)}.`);
      render();
      publishState();
    }

    function resetCurrentGameToAmountChoice(message = `<strong>Ready for the next Throne amount.</strong>`) {
      state.pendingWager = null;
      state.normalReplayPrompt = null;
      if (state.currentGame === "tributeChess") {
        resetTributeChessBoard();
      } else if (state.currentGame === "tributeCheckers") {
        resetTributeCheckersBoard();
      } else if (state.currentGame === "tributeReversi") {
        resetTributeReversiBoard();
      } else if (state.currentGame === "tributeTwentyOne") {
        resetTributeTwentyOneBoard();
      } else if (state.currentGame === "higherLower") {
        resetHigherLowerBoard();
      } else if (state.currentGame === "tributeCrazyEights") {
        resetCrazyEightsBoard();
      } else if (state.currentGame === "doubleSolitaire") {
        resetDoubleSolitaireBoard();
      } else if (state.currentGame === "tributeTicTacToe") {
        resetTributeTicTacToeBoard();
      } else if (state.currentGame === "wheelSpin") {
        resetWheelSpinBoard();
      } else if (state.currentGame === "tributeTrail") {
        resetTributeTrailBoard();
      } else if (state.currentGame === "obedienceOrders") {
        resetObedienceOrdersBoard();
      } else if (state.currentGame === "tributeFleet") {
        resetTributeFleetBoard();
      } else {
        resetTributeFourBoard();
      }
      state.active = false;
      state.mode = "normal";
      state.pot = 0;
      applyDefaultBet();
      addLog(message);
      render();
      publishState();
    }

    function handleThroneKissDismiss(event) {
      if (!throneKissSplashActive()) return;
      if (state.screen !== "game") return;
      const clickedGameScreen = event.target === els.throneKissSplash
        || (els.gameScreen && els.gameScreen.contains(event.target))
        || (els.outcomeSplash && els.outcomeSplash.contains(event.target));
      if (!clickedGameScreen) return;
      event.preventDefault();
      event.stopPropagation();
      hideOutcomeSplash();
      hideThroneKissSplash();
      resetCurrentGameToAmountChoice();
    }

    function resetTributeFourBoard() {
      state.board = createBoard();
      state.turn = SUB;
      state.active = false;
      state.mode = "normal";
      state.pot = 0;
      state.lockedTribute = state.domVault;
      state.reclaimPassAvailable = false;
      state.skipAvailable = false;
      state.skipArmed = false;
      state.blockedColumns = [];
      state.lockColumnAvailable = false;
      state.lockColumnMode = false;
      state.lockedColumn = null;
      state.pressureDropAvailable = false;
      state.pressureDropArmed = false;
      state.pressureDropColumn = null;
      state.domOpened = false;
      state.winningCells = [];
    }

    function resetTributeFleetBoard() {
      state.turn = SUB;
      state.active = false;
      state.mode = "normal";
      state.pot = 0;
      state.lockedTribute = state.domVault;
      state.blockedColumns = [];
      state.skipAvailable = false;
      state.skipArmed = false;
      state.reclaimPassAvailable = false;
      state.domOpened = false;
      state.winningCells = [];
      state.fleet = createFleetState();
    }

    function resetTributeTwentyOneBoard() {
      state.turn = SUB;
      state.active = false;
      state.mode = "normal";
      state.pot = 0;
      state.lockedTribute = state.domVault;
      state.winningCells = [];
      state.twentyOne = createTwentyOneState();
    }

    function resetHigherLowerBoard() {
      state.turn = SUB;
      state.active = false;
      state.mode = "normal";
      state.pot = 0;
      state.lockedTribute = state.domVault;
      state.winningCells = [];
      state.higherLower = createHigherLowerState();
    }

    function resetTributeCheckersBoard() {
      state.turn = SUB;
      state.active = false;
      state.mode = "normal";
      state.pot = 0;
      state.lockedTribute = state.domVault;
      state.winningCells = [];
      state.checkers = createCheckersState();
    }

    function startCheckersNormalMatch() {
      const bet = prepareRound("normal");
      if (bet === null) return;
      const starter = chooseStartingPlayer();
      preserveTiltLevel(() => startCheckersSetup(starter, `${normalRoundAmountIntro(bet)} ${labelFor(starter)} moves first.`));
      finishRoundStart(`${normalRoundAmountIntro(bet)} ${state.names.dom} chooses the Checkers settings.`, false);
    }

    function startCheckersReclaimMatch() {
      const pot = prepareRound("reclaim", "game");
      if (pot === null) return;
      startCheckersSetup(DOM, `<strong>Reclaim game:</strong> ${state.names.sub} is trying to win back ${money(pot)}. ${state.names.dom} starts after settings. Tilt level ${state.tiltLevel}.`);
      finishRoundStart(`<strong>Reclaim game:</strong> ${state.names.sub} is trying to win back ${money(pot)}. ${state.names.dom} chooses the Checkers settings.`, false);
    }

    function startCheckersSetup(starter, intro) {
      state.checkers = createCheckersState();
      state.checkers.setupPending = true;
      state.checkers.pendingStarter = starter;
      state.checkers.pendingIntro = intro;
      state.checkers.timerMode = "none";
      state.checkers.timerTarget = "both";
      state.checkers.customTimerMinutes = 10;
      state.turn = DOM;
      state.active = true;
      render();
    }

    function beginCheckersQueenSetup(starter) {
      state.checkers = createCheckersState();
      state.turn = starter;
      state.active = false;
      if (isThroneSession()) {
        if (reclaimPerksActive() && domAdvantagesEnabled()) {
          state.checkers.queenSetup = {
            stage: "domThrone",
            starter,
            decidedAt: 0
          };
        } else {
          state.checkers.queenSetup = null;
          state.active = true;
        }
        return;
      }
      state.checkers.queenSetup = {
        stage: "sub",
        starter,
        decidedAt: 0
      };
    }

    function resetCheckersMatch(starter) {
      state.checkers = createCheckersState();
      state.turn = starter;
      state.active = true;
    }

    function randomCheckersQueenRow() {
      const roll = Math.random();
      if (roll < 0.70) return 0;
      if (roll < 0.95) return 1;
      return 2;
    }

    function giveDomStartingCheckersQueen() {
      const board = state.checkers.board;
      const preferredRow = randomCheckersQueenRow();
      const rows = [preferredRow, 0, 1, 2].filter((row, index, list) => list.indexOf(row) === index);
      let candidates = [];
      rows.some((row) => {
        candidates = board[row]
          .map((piece, col) => piece && piece.role === DOM && !piece.king ? { row, col } : null)
          .filter(Boolean);
        return candidates.length > 0;
      });
      if (!candidates.length) {
        board.forEach((row, rowIndex) => row.forEach((piece, col) => {
          if (piece && piece.role === DOM && !piece.king) candidates.push({ row: rowIndex, col });
        }));
      }
      if (!candidates.length) return null;
      const chosen = candidates[Math.floor(Math.random() * candidates.length)];
      board[chosen.row][chosen.col].king = true;
      return chosen;
    }

    function finishCheckersQueenSetup() {
      const starter = state.checkers.queenSetup && state.checkers.queenSetup.starter || state.turn || SUB;
      state.checkers.queenSetup = null;
      state.turn = starter;
      state.active = true;
      resetChessClockTick();
      addLog(`<strong>Checkers begins.</strong> ${labelFor(starter)} moves first.`);
      render();
      publishState();
    }

    function subAllowsCheckersQueen() {
      if (state.currentGame !== "tributeCheckers" || !state.checkers.queenSetup) return;
      if (state.online.room && localOnlineRole() !== SUB) return;
      giveDomStartingCheckersQueen();
      addLog(`<strong>Queen granted.</strong> ${state.names.sub} worships properly and begs ${state.names.dom} to start crowned.`);
      finishCheckersQueenSetup();
    }

    function subRefusesCheckersQueen() {
      if (state.currentGame !== "tributeCheckers" || !state.checkers.queenSetup) return;
      if (state.online.room && localOnlineRole() !== SUB) return;
      state.checkers.queenSetup.stage = "dom";
      addLog(`<strong>Queen denied?</strong> ${state.names.sub} decided ${state.names.dom} did not deserve a queen.`);
      render();
      publishState();
    }

    function domDeclinesCheckersQueen() {
      if (state.currentGame !== "tributeCheckers" || !state.checkers.queenSetup || state.checkers.queenSetup.stage !== "dom") return;
      if (state.online.room && localOnlineRole() !== DOM) return;
      addLog(`<strong>No starting queen.</strong> ${state.names.dom} lets the board begin without mercy.`);
      finishCheckersQueenSetup();
    }

    function domDeclinesThroneCheckersQueen() {
      if (state.currentGame !== "tributeCheckers" || !state.checkers.queenSetup || state.checkers.queenSetup.stage !== "domThrone") return;
      if (state.online.room && localOnlineRole() !== DOM) return;
      addLog(`<strong>No starting queen.</strong> ${state.names.dom} starts the throne game normally.`);
      finishCheckersQueenSetup();
    }

    function domStartsThroneCheckersWithQueen() {
      if (state.currentGame !== "tributeCheckers" || !state.checkers.queenSetup || state.checkers.queenSetup.stage !== "domThrone") return;
      if (state.online.room && localOnlineRole() !== DOM) return;
      giveDomStartingCheckersQueen();
      addLog(`<strong>Queen chosen.</strong> ${state.names.dom} starts the throne game crowned.`);
      finishCheckersQueenSetup();
    }

    function domTakesCheckersQueen() {
      if (state.currentGame !== "tributeCheckers" || !state.checkers.queenSetup || state.checkers.queenSetup.stage !== "dom") return;
      if (state.online.room && localOnlineRole() !== DOM) return;
      state.checkers.queenDrainBoost = true;
      giveDomStartingCheckersQueen();
      state.checkers.queenSplashMessage = `You disappointed ${state.names.dom}. Now you'll regret it.`;
      state.checkers.queenSplashUntil = Date.now() + 2600;
      addLog(`<strong>Queen taken.</strong> ${state.names.sub} disappointed ${state.names.dom}. They will regret making her claim the crown herself.`);
      finishCheckersQueenSetup();
    }

    function checkersDirections(piece) {
      if (!piece) return [];
      if (piece.king) return [[1, -1], [1, 1], [-1, -1], [-1, 1]];
      return piece.role === DOM ? [[1, -1], [1, 1]] : [[-1, -1], [-1, 1]];
    }

    function checkersInside(row, col) {
      return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    function checkersCoordMatches(coord, row, col) {
      return Boolean(coord && coord.row === row && coord.col === col);
    }

    function checkersPiecePinned(row, col) {
      return Boolean(state.checkers.pinned && state.checkers.pinned.row === row && state.checkers.pinned.col === col && state.checkers.pinned.turns > 0);
    }

    function checkersPieceFrozen(row, col) {
      return Boolean(state.checkers.frozen && state.checkers.frozen.row === row && state.checkers.frozen.col === col && state.checkers.frozen.turns > 0);
    }

    function checkersDomQueens() {
      const queens = [];
      state.checkers.board.forEach((row, rowIndex) => row.forEach((piece, colIndex) => {
        if (piece && piece.role === DOM && piece.king) queens.push({ row: rowIndex, col: colIndex });
      }));
      return queens;
    }

    function checkersAdjacentToDomQueen(row, col) {
      return checkersDomQueens().some((queen) => Math.abs(queen.row - row) === 1 && Math.abs(queen.col - col) === 1);
    }

    function checkersPullTarget(row, col) {
      const board = state.checkers.board;
      return checkersDomQueens().map((queen) => {
        const rowDistance = queen.row - row;
        const colDistance = queen.col - col;
        if (Math.abs(rowDistance) !== Math.abs(colDistance)) return null;
        if (Math.abs(rowDistance) < 2 || Math.abs(rowDistance) > 3) return null;
        const targetRow = row + Math.sign(rowDistance);
        const targetCol = col + Math.sign(colDistance);
        if (!checkersInside(targetRow, targetCol) || board[targetRow][targetCol]) return null;
        return { row: targetRow, col: targetCol };
      }).find(Boolean);
    }

    function checkersQueenDrainAmount() {
      const claims = Number(state.checkers.claims || 0);
      const boost = Boolean(state.checkers.queenDrainBoost);
      if (claims >= 6) return boost ? 6 : 3;
      if (claims >= 3) return boost ? 4 : 2;
      return boost ? 2 : 1;
    }

    function applyCheckersCaptureRewards(piece, capturedPiece, captureRow, captureCol) {
      if (!piece || piece.role !== DOM || !capturedPiece || capturedPiece.role !== SUB) return;
      triggerSubLossPressure({ weight: 1, banner: true, message: true, source: "checkers" });
      if (state.checkers) state.checkers.captureBanner = state.lossPressure && state.lossPressure.captureBanner;
      state.checkers.claims = Number(state.checkers.claims || 0) + 1;
      addLog(`<strong>Claim taken.</strong> ${state.names.dom} gains 1 Claim from the captured piece.`);
      if (checkersCoordMatches(state.checkers.marked, captureRow, captureCol)) {
        state.checkers.claims = Number(state.checkers.claims || 0) + 2;
        const before = state.domVault;
        state.domVault += 2;
        state.lockedTribute = state.domVault;
        recordLedgerEvent({
          type: "drain",
          label: "Marked Piece Claimed",
          detail: `${state.names.dom} drains a marked checkers piece.`,
          delta: 2,
          before,
          after: state.domVault
        });
        state.checkers.marked = null;
        addLog(`<strong>Marked piece claimed.</strong> ${state.names.dom} gains +2 Claim and drains ${money(2)}.`);
      }
      if (piece.king) {
        const bonus = Number(state.checkers.hungryCrown || 0) > 0 ? 2 : 0;
        const drain = checkersQueenDrainAmount() + bonus;
        if (bonus) state.checkers.hungryCrown = Math.max(0, Number(state.checkers.hungryCrown || 0) - 1);
        const before = state.domVault;
        state.domVault += drain;
        state.lockedTribute = state.domVault;
        recordLedgerEvent({
          type: "drain",
          label: "Queen's Drain",
          detail: `${state.names.dom}'s queen drains a captured piece.`,
          delta: drain,
          before,
          after: state.domVault
        });
        state.checkers.queenDrainTotal = Number(state.checkers.queenDrainTotal || 0) + drain;
        addLog(`<strong>Queen's Drain.</strong> ${state.names.dom}'s queen drains ${money(drain)} into her bank.`);
      }
    }

    function checkersMovesFor(row, col, capturesOnly = false) {
      const board = state.checkers.board;
      const piece = board[row] && board[row][col];
      if (!piece || piece.role !== state.turn || checkersPieceFrozen(row, col)) return [];
      const pinned = checkersPiecePinned(row, col);
      const moves = [];
      checkersDirections(piece).forEach(([dr, dc]) => {
        const stepRow = row + dr;
        const stepCol = col + dc;
        const jumpRow = row + dr * 2;
        const jumpCol = col + dc * 2;
        if (checkersInside(jumpRow, jumpCol)
          && board[stepRow][stepCol]
          && board[stepRow][stepCol].role !== piece.role
          && !board[jumpRow][jumpCol]) {
          moves.push({ from: [row, col], to: [jumpRow, jumpCol], capture: [stepRow, stepCol] });
        } else if (!capturesOnly && !pinned && checkersInside(stepRow, stepCol) && !board[stepRow][stepCol]) {
          moves.push({ from: [row, col], to: [stepRow, stepCol], capture: null });
        }
      });
      return moves;
    }

    function allCheckersMoves(role = state.turn) {
      const priorTurn = state.turn;
      state.turn = role;
      const captures = [];
      const quiet = [];
      for (let row = 0; row < 8; row += 1) {
        for (let col = 0; col < 8; col += 1) {
          const moves = checkersMovesFor(row, col, false);
          moves.forEach((move) => (move.capture ? captures : quiet).push(move));
        }
      }
      state.turn = priorTurn;
      return captures.length ? captures : quiet;
    }

    function useTargetedCheckersPower(row, col) {
      const mode = state.checkers.powerMode;
      if (!mode) return false;
      if (!domAdvantageControlsAllowed(localOnlineRole())) return true;
      const board = state.checkers.board;
      const piece = board[row] && board[row][col];
      if (!piece || piece.role !== SUB) return true;
      if (mode === "crownPull") {
        const target = checkersPullTarget(row, col);
        if (!target) {
          addLog(`<strong>Crown Pull failed.</strong> Choose a ${state.names.sub} piece diagonally two or three spaces from a queen with an empty square between.`);
          render();
          return true;
        }
        spendCheckersPower("crownPull");
        board[target.row][target.col] = piece;
        board[row][col] = null;
        if (checkersCoordMatches(state.checkers.marked, row, col)) state.checkers.marked = { row: target.row, col: target.col };
        state.checkers.powerMode = "";
        addLog(`<strong>Crown Pull.</strong> ${state.names.dom}'s queen pulls a ${state.names.sub} piece closer.`);
      } else if (mode === "marked") {
        spendCheckersPower("marked");
        state.checkers.marked = { row, col };
        state.checkers.powerMode = "";
        addLog(`<strong>Marked.</strong> One ${state.names.sub} piece is worth extra Claim and cash if captured.`);
      } else if (mode === "pinned") {
        spendCheckersPower("pinned");
        state.checkers.pinned = { row, col, turns: 1 };
        state.checkers.powerMode = "";
        addLog(`<strong>Pinned.</strong> One ${state.names.sub} piece can only move by capture on its next turn.`);
      } else if (mode === "takeover") {
        if (piece.king || !checkersAdjacentToDomQueen(row, col)) {
          addLog(`<strong>Takeover failed.</strong> Choose a regular ${state.names.sub} piece adjacent to a ${state.names.dom} queen.`);
          render();
          return true;
        }
        spendCheckersPower("takeover");
        piece.role = DOM;
        piece.king = false;
        if (checkersCoordMatches(state.checkers.marked, row, col)) state.checkers.marked = null;
        if (checkersCoordMatches(state.checkers.pinned, row, col)) state.checkers.pinned = null;
        state.checkers.powerMode = "";
        addLog(`<strong>Takeover.</strong> ${state.names.dom}'s queen claims a nearby ${state.names.sub} piece.`);
      }
      state.checkers.selected = null;
      state.checkers.legalMoves = [];
      const winner = checkersWinner();
      if (winner) {
        endCheckersMatch(winner, `${labelFor(winner)} controls the board.`);
        return true;
      }
      render();
      publishState();
      return true;
    }

    function selectCheckersSquare(row, col) {
      if (state.currentGame !== "tributeCheckers" || !state.active) return;
      if (state.checkers && state.checkers.setupPending) return;
      if (state.checkers.powerMode || state.checkers.lockMode) {
        if (state.checkers.lockMode) {
          lockCheckersPiece(row, col);
          return;
        }
        useTargetedCheckersPower(row, col);
        return;
      }
      if (localOnlineRole() && localOnlineRole() !== state.turn) return;
      const selected = state.checkers.selected;
      if (selected) {
        const move = (state.checkers.legalMoves || []).find((candidate) => candidate.to[0] === row && candidate.to[1] === col);
        if (move) {
          moveCheckersPiece(move);
          return;
        }
      }
      const piece = state.checkers.board[row] && state.checkers.board[row][col];
      if (!piece || piece.role !== state.turn) return;
      const forcedCaptures = allCheckersMoves(state.turn).filter((move) => move.capture);
      const legal = checkersMovesFor(row, col, forcedCaptures.length > 0);
      if (!legal.length) return;
      state.checkers.selected = [row, col];
      state.checkers.legalMoves = legal;
      render();
    }

    function moveCheckersPiece(move) {
      const board = state.checkers.board;
      const [fromRow, fromCol] = move.from;
      const [toRow, toCol] = move.to;
      const piece = board[fromRow][fromCol];
      board[fromRow][fromCol] = null;
      board[toRow][toCol] = piece;
      if (piece && piece.role === SUB) resolveFocusTaxSuccess();
      if (checkersCoordMatches(state.checkers.marked, fromRow, fromCol)) state.checkers.marked = { row: toRow, col: toCol };
      if (move.capture) {
        const capturedPiece = board[move.capture[0]][move.capture[1]];
        applyCheckersCaptureRewards(piece, capturedPiece, move.capture[0], move.capture[1]);
        board[move.capture[0]][move.capture[1]] = null;
      }
      if ((piece.role === DOM && toRow === 7) || (piece.role === SUB && toRow === 0)) {
        piece.king = true;
      }
      if (checkersCoordMatches(state.checkers.pinned, fromRow, fromCol)) state.checkers.pinned = null;
      if (piece.role === SUB && Number(state.checkers.tollArmed || 0) > 0) {
        state.checkers.tollArmed = Math.max(0, Number(state.checkers.tollArmed || 0) - 1);
        if (checkersAdjacentToDomQueen(toRow, toCol)) {
          const before = state.domVault;
          state.domVault += 1;
          state.lockedTribute = state.domVault;
          recordLedgerEvent({
            type: "drain",
            label: "Tribute Toll",
            detail: `${state.names.sub} ends beside a queen.`,
            delta: 1,
            before,
            after: state.domVault
          });
          addLog(`<strong>Tribute Toll.</strong> ${state.names.sub} ends beside a queen, so ${money(1)} drains into ${state.names.dom}'s bank.`);
        }
      }
      state.checkers.selected = null;
      state.checkers.legalMoves = [];
      if (move.capture) {
        const nextCaptures = checkersMovesFor(toRow, toCol, true);
        if (nextCaptures.length) {
          state.checkers.selected = [toRow, toCol];
          state.checkers.legalMoves = nextCaptures;
          addLog(`<strong>${labelFor(state.turn)} jumps.</strong> Another capture is required.`);
          render();
          publishState();
          return;
        }
      }
      const winner = checkersWinner();
      if (winner) {
        endCheckersMatch(winner, `${labelFor(winner)} controls the board.`);
        return;
      }
      passCheckersTurn();
      render();
      publishState();
    }

    function passCheckersTurn() {
      const leaving = state.turn;
      if (state.checkers.frozen && state.checkers.frozen.role === leaving) {
        state.checkers.frozen.turns -= 1;
        if (state.checkers.frozen.turns <= 0) state.checkers.frozen = null;
      }
      if (leaving === SUB && state.checkers.pinned) {
        state.checkers.pinned.turns -= 1;
        if (state.checkers.pinned.turns <= 0) state.checkers.pinned = null;
      }
      state.turn = otherRole(state.turn);
      const moves = allCheckersMoves(state.turn);
      if (!moves.length) {
        const winner = leaving;
        endCheckersMatch(winner, `${labelFor(state.turn)} has no legal move.`);
      }
    }

    function checkersWinner() {
      const pieces = { [DOM]: 0, [SUB]: 0 };
      state.checkers.board.forEach((row) => row.forEach((piece) => {
        if (piece) pieces[piece.role] += 1;
      }));
      if (!pieces[DOM]) return SUB;
      if (!pieces[SUB]) return DOM;
      return null;
    }

    function canLockCheckersPiece() {
      return state.currentGame === "tributeCheckers"
        && state.active
        && reclaimPerksActive()
        && domAdvantagesEnabled()
        && state.turn === DOM
        && state.checkers.lockAvailable
        && (!state.online.room || localOnlineRole() === DOM);
    }

    function lockCheckersPiece(row, col) {
      if (!canLockCheckersPiece()) return;
      const piece = state.checkers.board[row] && state.checkers.board[row][col];
      if (!piece || piece.role !== SUB) return;
      state.checkers.frozen = { row, col, role: SUB, turns: 1 };
      state.checkers.lockAvailable = false;
      state.checkers.lockMode = false;
      addLog(`<strong>Lock Piece.</strong> ${state.names.dom} freezes one ${state.names.sub} piece for its next turn.`);
      render();
      publishState();
    }

    function endCheckersMatch(winner, reason) {
      state.active = false;
      const result = settleRoundBank(winner);
      if (result.outcome === "subReclaim") {
        addLog(`<strong>${state.names.sub} wins reclaim.</strong> ${reason} ${money(result.amount)} is taken back from ${state.names.dom}'s bank.`);
      } else if (result.outcome === "subNormal") {
        addLog(`<strong>${state.names.sub} wins.</strong> ${reason} Nothing enters ${state.names.dom}'s bank.`);
      } else if (result.outcome === "domReclaim") {
        addLog(`<strong>${state.names.dom} wins reclaim.</strong> ${reason} ${money(result.amount)} is added to her bank.`);
      } else if (result.outcome === "domThrone") {
        addLog(`<strong>${state.names.sub} loses.</strong> ${reason} The Throne page opens automatically.`);
      } else {
        addLog(`<strong>${state.names.dom} wins.</strong> ${reason} ${money(result.amount)} moves into her bank.`);
      }
      state.pot = 0;
      render();
      publishState();
    }

    function resetWheelSpinBoard() {
      state.turn = isThroneSession() ? DOM : SUB;
      state.active = true;
      state.mode = "normal";
      state.pot = 0;
      state.lockedTribute = state.domVault;
      state.winningCells = [];
      state.wheel = createWheelState();
      state.wheel.slices = createCurrentWheelSlices();
      state.wheel.unlocked = isThroneSession();
    }

    function startWheelSpinNormalMatch() {
      spinWheel();
    }

    function startWheelSpinReclaimMatch() {
      spinWheel();
    }

    function spinWheel() {
      refreshWheelLimitWindow();
      if (!state.active || state.wheel.spinning) return;
      const throneWheel = isThroneSession();
      if (localOnlineRole() && localOnlineRole() !== (throneWheel ? DOM : SUB)) return;
      if (!throneWheel && !state.wheel.unlocked) {
        addLog(`<strong class="danger">Wheel locked.</strong> ${state.names.dom} must unlock it before ${state.names.sub} can spin.`);
        render();
        return;
      }
      if (wheelSpinsRemaining() <= 0) {
        addLog(`<strong class="danger">Wheel locked.</strong> Spins refresh in ${formatWheelTime(wheelLimitRemainingMs())}.`);
        render();
        return;
      }
      const resultIndex = Math.floor(Math.random() * 36);
      const selectedValue = state.wheel.slices[resultIndex];
      resolveFocusTaxSuccess();
      const sliceAngle = Math.PI * 2 / 36;
      const rotations = 8 + Math.floor(Math.random() * 4);
      const startAngle = Number(state.wheel.angle || 0);
      const targetAngle = startAngle
        + rotations * Math.PI * 2
        + normalizeWheelDelta(startAngle, -Math.PI / 2 - (resultIndex + 0.5) * sliceAngle);
      state.wheel.spinning = true;
      state.wheel.spinStartedAt = Date.now();
      state.wheel.spinDuration = 7600;
      state.wheel.startAngle = startAngle;
      state.wheel.targetAngle = targetAngle;
      state.wheel.resultIndex = resultIndex;
      state.wheel.result = null;
      state.wheel.unlocked = throneWheel ? true : false;
      state.wheel.finalPayout = null;
      state.wheel.finalBankDelta = null;
      state.wheel.resultNotes = [];
      state.wheel.nudgeUsed = false;
      if (!(throneWheel && selectedValue === WHEEL_THRONE_FREE_SPIN)) state.wheel.spinsUsed += 1;
      addLog(throneWheel
        ? `<strong>${state.names.dom} spins the Throne wheel.</strong>`
        : `<strong>${state.names.sub} spins the wheel.</strong>`);
      render();
      publishState();
    }

    function unlockWheelSpin() {
      refreshWheelLimitWindow();
      if (isThroneSession()) return;
      if (!canUseWheelDomTools() || wheelSpinsRemaining() <= 0) return;
      const riskMode = wheelRiskModeInfo();
      if (state.domVault < riskMode.cost) {
        addLog(`<strong class="danger">Wheel tribute needed.</strong> ${state.names.dom} needs ${money(riskMode.cost)} in her bank to unlock ${riskMode.label}.`);
        render();
        return;
      }
      const spendBless = Boolean(state.wheel.blessActive);
      const spendGreedy = Boolean(state.wheel.greedyDom);
      if (spendBless && wheelPowerRemaining("bless") <= 0) {
        addLog(`<strong class="danger">Bless spent.</strong> Bless refreshes in ${formatWheelTime(wheelLimitRemainingMs())}.`);
        render();
        return;
      }
      if (spendGreedy && wheelPowerRemaining("greedy") <= 0) {
        addLog(`<strong class="danger">Greedy spent.</strong> Greedy Dom refreshes in ${formatWheelTime(wheelLimitRemainingMs())}.`);
        render();
        return;
      }
      if (spendBless) state.wheel.blessUses += 1;
      if (spendGreedy) state.wheel.greedyUses += 1;
      applyWheelBankDelta(-riskMode.cost, "Wheel Unlock Cost", `${riskMode.label} spin paid before unlock.`);
      state.wheel.unlocked = true;
      playWheelUnlockDing();
      const powers = [];
      if (spendBless) powers.push("Bless");
      if (spendGreedy) powers.push("Greedy Dom");
      showOutcomeSplash({
        tone: "gold",
        kicker: "Wheel Unlocked",
        title: `${riskMode.label} Spin Permitted`,
        detail: `${money(riskMode.cost)} paid. ${state.names.sub} can spin now.`
      });
      addLog(`<strong>${state.names.dom} unlocks ${riskMode.label} Wheel.</strong> ${money(riskMode.cost)} leaves her bank. ${powers.length ? `${powers.join(" and ")} locked in. ` : ""}${state.names.sub} can spin now.`);
      render();
      publishState();
    }

    function playWheelUnlockDing() {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const context = new AudioContext();
        const now = context.currentTime;
        const master = context.createGain();
        master.gain.setValueAtTime(0.0001, now);
        master.gain.exponentialRampToValueAtTime(0.18, now + 0.018);
        master.gain.exponentialRampToValueAtTime(0.0001, now + 0.72);
        master.connect(context.destination);
        [
          { frequency: 880, start: 0, duration: 0.26 },
          { frequency: 1320, start: 0.12, duration: 0.34 }
        ].forEach(({ frequency, start, duration }) => {
          const oscillator = context.createOscillator();
          const gain = context.createGain();
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(frequency, now + start);
          gain.gain.setValueAtTime(0.0001, now + start);
          gain.gain.exponentialRampToValueAtTime(0.7, now + start + 0.018);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + start + duration);
          oscillator.connect(gain);
          gain.connect(master);
          oscillator.start(now + start);
          oscillator.stop(now + start + duration + 0.03);
        });
        window.setTimeout(() => context.close().catch(() => {}), 900);
      } catch (error) {
        // Audio is a nice-to-have; gameplay should never depend on it.
      }
    }

    function refreshWheelLimitWindow(now = Date.now()) {
      const started = Number(state.wheel.limitWindowStartedAt || 0);
      if (!started || now - started >= wheelLimitWindowMs()) {
        state.wheel.limitWindowStartedAt = now;
        state.wheel.slices = createCurrentWheelSlices();
        state.wheel.spinsUsed = 0;
        state.wheel.blessUses = 0;
        state.wheel.greedyUses = 0;
        state.wheel.nudgeUses = 0;
      }
    }

    function wheelLimitWindowMs() {
      return isThroneSession() ? WHEEL_THRONE_LIMIT_WINDOW_MS : WHEEL_LIMIT_WINDOW_MS;
    }

    function wheelSpinLimit() {
      return isThroneSession() ? WHEEL_THRONE_SPIN_LIMIT : WHEEL_SPIN_LIMIT;
    }

    function wheelLimitRemainingMs(now = Date.now()) {
      refreshWheelLimitWindow(now);
      return Math.max(0, wheelLimitWindowMs() - (now - Number(state.wheel.limitWindowStartedAt || now)));
    }

    function wheelSpinsRemaining() {
      refreshWheelLimitWindow();
      return Math.max(0, wheelSpinLimit() - Number(state.wheel.spinsUsed || 0));
    }

    function wheelPowerRemaining(power) {
      refreshWheelLimitWindow();
      const key = `${power}Uses`;
      const limit = power === "nudge" ? WHEEL_NUDGE_LIMIT : WHEEL_POWER_LIMIT;
      return Math.max(0, limit - Number(state.wheel[key] || 0));
    }

    function formatWheelTime(ms) {
      const total = Math.ceil(ms / 1000);
      const minutes = Math.floor(total / 60);
      const seconds = total % 60;
      return `${minutes}:${String(seconds).padStart(2, "0")}`;
    }

    function currentWheelAngle(now = Date.now()) {
      if (!state.wheel.spinning) return Number(state.wheel.angle || 0);
      const elapsed = now - Number(state.wheel.spinStartedAt || now);
      const duration = Math.max(1, Number(state.wheel.spinDuration || 1));
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      return Number(state.wheel.startAngle || 0)
        + (Number(state.wheel.targetAngle || 0) - Number(state.wheel.startAngle || 0)) * eased;
    }

    function normalizeWheelDelta(fromAngle, targetAngle) {
      const full = Math.PI * 2;
      let delta = (targetAngle - fromAngle) % full;
      if (delta < 0) delta += full;
      return delta;
    }

    function finishWheelSpin() {
      if (!state.wheel.spinning) return;
      const throneWheel = isThroneSession();
      if (localOnlineRole() && localOnlineRole() !== (throneWheel ? DOM : SUB)) return;
      state.wheel.spinning = false;
      state.wheel.angle = state.wheel.targetAngle;
      const value = state.wheel.slices[state.wheel.resultIndex];
      state.wheel.result = value;
      if (throneWheel) {
        finishThroneWheelSpin(value);
        return;
      }
      const result = resolveWheelPayout(value);
      state.wheel.finalPayout = result.payout;
      state.wheel.resultNotes = result.notes;
      state.active = true;
      if (result.payout > 0) {
        state.wheel.finalBankDelta = result.payout;
        applyWheelBankDelta(result.payout, "Wheel Tribute", `Landed on ${wheelValueText(value)}.`);
        showOutcomeSplash({
          tone: "dom",
          kicker: "Wheel Tribute",
          title: `Dom Profit +${money(result.payout)}`,
          detail: `The wheel lands on ${wheelValueText(value)}.`
        });
        addLog(`<strong>${state.names.dom} takes the spin.</strong> The wheel lands on ${wheelValueText(value)}${result.notes.length ? ` (${result.notes.join(", ")})` : ""}. ${money(result.payout)} enters her bank.`);
      } else if (result.payout < 0) {
        const bankDelta = wheelBankDeltaForPayout(result.payout, state.domVault);
        state.wheel.finalBankDelta = bankDelta;
        applyWheelBankDelta(bankDelta, "Wheel Bank Drained", `Landed on ${wheelValueText(value)}.`);
        if (bankDelta < 0) {
          showOutcomeSplash({
            tone: "danger",
            kicker: "Bank Drained",
            title: `Dom Loss -${money(Math.abs(bankDelta))}`,
            detail: `The wheel lands on ${wheelValueText(value)}.`
          });
          addLog(`<strong>${state.names.dom} loses the spin.</strong> The wheel lands on ${wheelValueText(value)}${result.notes.length ? ` (${result.notes.join(", ")})` : ""}. ${money(Math.abs(bankDelta))} leaves her bank.`);
        } else {
          showOutcomeSplash({
            tone: "gold",
            kicker: "Empty Bank",
            title: "Loss Dodged",
            detail: `${state.names.dom}'s bank is already empty.`
          });
          addLog(`<strong>${state.names.dom} dodges the loss.</strong> The wheel lands on ${wheelValueText(value)}, but her bank is already empty.`);
        }
      } else {
        state.wheel.finalBankDelta = 0;
        showOutcomeSplash({
          tone: "gold",
          kicker: "Blank",
          title: "No Tribute Paid",
          detail: "The wheel spares the bank."
        });
        addLog(`<strong>${state.names.sub} hits blank.</strong> Nothing enters ${state.names.dom}'s bank.`);
      }
      state.pot = 0;
      render();
      publishState();
    }

    function resolveWheelPayout(value, index) {
      const notes = [];
      let payout = Number(value || 0);
      const riskMode = wheelRiskModeInfo();
      if (state.wheel.greedyDom) {
        if (value === riskMode.prizeValue) {
          payout = riskMode.greedyPrize;
          notes.push(`greedy ${money(riskMode.prizeValue)} becomes ${money(riskMode.greedyPrize)}`);
        } else if (value === 0) {
          payout = riskMode.greedyBlank;
          notes.push(`greedy blank becomes ${money(riskMode.greedyBlank)}`);
        } else if (value > 0) {
          payout = 0;
          notes.push(`greedy ${money(value)} becomes blank`);
        }
      }
      if (payout > 0 && state.wheel.blessActive) {
        const upgraded = wheelUpgradeValue(value, riskMode);
        if (upgraded > payout) {
          notes.push(`blessed to ${money(upgraded)}`);
          payout = upgraded;
        }
      }
      if (payout > 0 && riskMode.bonus > 0) {
        payout += riskMode.bonus;
        notes.push(`${riskMode.label} bonus +${money(riskMode.bonus)}`);
      }
      return { payout, notes };
    }

    function wheelRiskModeInfo(mode = state.wheel && state.wheel.riskMode) {
      return WHEEL_RISK_MODES[mode] || WHEEL_RISK_MODES.normal;
    }

    function wheelRiskModeBonusText(info = wheelRiskModeInfo()) {
      const prizeText = info.prizeValue > 25 ? `${money(info.prizeValue)} prizes` : `${money(info.prizeValue)} prizes`;
      return info.bonus > 0 ? `${prizeText}; winning spaces pay +${money(info.bonus)}.` : `${prizeText}; winning spaces pay normal value.`;
    }

    function setWheelRiskMode(mode) {
      if (!canUseWheelDomTools() || state.wheel.unlocked) return;
      if (!WHEEL_RISK_MODES[mode]) return;
      state.wheel.riskMode = mode;
      state.wheel.slices = createWheelSlices(mode);
      state.wheel.angle = 0;
      state.wheel.resultIndex = null;
      state.wheel.result = null;
      state.wheel.finalPayout = null;
      state.wheel.finalBankDelta = null;
      state.wheel.resultNotes = [];
      state.wheel.nudgeUsed = false;
      render();
      publishState();
    }

    function wheelBankDeltaForPayout(payout, startingVault = state.domVault) {
      const amount = Number(payout || 0);
      if (amount >= 0) return amount;
      return -Math.min(Math.max(0, Number(startingVault || 0)), Math.abs(amount));
    }

    function applyWheelBankDelta(delta, label = "Wheel Bank", detail = "") {
      const before = Number(state.domVault || 0);
      state.domVault = Math.max(0, before + Number(delta || 0));
      state.lockedTribute = state.domVault;
      const applied = state.domVault - before;
      if (applied !== 0) {
        recordLedgerEvent({
          type: applied < 0 ? (label.includes("Unlock") ? "cost" : "loss") : "wheel",
          label,
          detail,
          delta: applied,
          before,
          after: state.domVault
        });
      }
    }

    function wheelUpgradeValue(value, riskMode = wheelRiskModeInfo()) {
      return Number(riskMode.blessMap && riskMode.blessMap[value]) || value;
    }

    function wheelBlessText(info = wheelRiskModeInfo()) {
      const entries = Object.entries(info.blessMap || {})
        .map(([from, to]) => `${money(Number(from))}->${money(Number(to))}`);
      return entries.length ? entries.join(", ") : "cash spaces keep their values";
    }

    function wheelGreedyText(info = wheelRiskModeInfo()) {
      return `${money(info.prizeValue)}->${money(info.greedyPrize)}, blank->${money(info.greedyBlank)}, lower cash->blank`;
    }

    function canUseWheelDomTools() {
      return state.currentGame === "wheelSpin"
        && state.active
        && !state.wheel.spinning
        && !state.wheel.unlocked
        && !isThroneSession()
        && (!state.online.room || localOnlineRole() === DOM);
    }

    function toggleWheelBless() {
      refreshWheelLimitWindow();
      if (!canUseWheelDomTools()) return;
      if (!state.wheel.blessActive && wheelPowerRemaining("bless") <= 0) {
        addLog(`<strong class="danger">Bless spent.</strong> Bless refreshes in ${formatWheelTime(wheelLimitRemainingMs())}.`);
        render();
        return;
      }
      state.wheel.blessActive = !state.wheel.blessActive;
      addLog(state.wheel.blessActive
        ? `<strong>${state.names.dom} arms Bless.</strong> All cash slices upgrade when the wheel is unlocked.`
        : `<strong>${state.names.dom} clears Bless.</strong>`);
      render();
      publishState();
    }

    function toggleGreedyDom() {
      refreshWheelLimitWindow();
      if (!canUseWheelDomTools()) return;
      if (!state.wheel.greedyDom && wheelPowerRemaining("greedy") <= 0) {
        addLog(`<strong class="danger">Greedy spent.</strong> Greedy Dom refreshes in ${formatWheelTime(wheelLimitRemainingMs())}.`);
        render();
        return;
      }
      state.wheel.greedyDom = !state.wheel.greedyDom;
      addLog(state.wheel.greedyDom
        ? `<strong>${state.names.dom} arms Greedy.</strong> $25 pays $60, blanks pay $30, $1/$2/$5/$10 become blanks, and minus slots stay dangerous when the wheel is unlocked.`
        : `<strong>${state.names.dom} clears Greedy Dom.</strong>`);
      render();
      publishState();
    }

    function canNudgeWheel() {
      return state.currentGame === "wheelSpin"
        && !isThroneSession()
        && !state.wheel.spinning
        && state.wheel.resultIndex !== null
        && !state.wheel.nudgeUsed
        && wheelPowerRemaining("nudge") > 0
        && (!state.online.room || localOnlineRole() === DOM);
    }

    function nudgeWheel(direction) {
      refreshWheelLimitWindow();
      if (!canNudgeWheel()) return;
      if (wheelPowerRemaining("nudge") <= 0) {
        addLog(`<strong class="danger">Nudge spent.</strong> Nudge refreshes in ${formatWheelTime(wheelLimitRemainingMs())}.`);
        render();
        return;
      }
      const oldPayout = Number(state.wheel.finalPayout || 0);
      const oldBankDelta = Number(state.wheel.finalBankDelta ?? oldPayout);
      const oldValue = state.wheel.result;
      const nextIndex = (state.wheel.resultIndex + direction + 36) % 36;
      const sliceAngle = Math.PI * 2 / 36;
      const nextValue = state.wheel.slices[nextIndex];
      state.wheel.resultIndex = nextIndex;
      state.wheel.result = nextValue;
      state.wheel.angle -= direction * sliceAngle;
      const result = resolveWheelPayout(nextValue);
      state.wheel.finalPayout = result.payout;
      const nudgeAmount = Math.abs(direction);
      state.wheel.resultNotes = [...result.notes, `nudged ${direction > 0 ? "forward" : "back"} ${nudgeAmount}`];
      state.wheel.nudgeUsed = true;
      state.wheel.nudgeUses += 1;
      const baseVault = Math.max(0, Number(state.domVault || 0) - oldBankDelta);
      const newBankDelta = wheelBankDeltaForPayout(result.payout, baseVault);
      state.wheel.finalBankDelta = newBankDelta;
      const delta = newBankDelta - oldBankDelta;
      const before = state.domVault;
      state.domVault = Math.max(0, baseVault + newBankDelta);
      state.lockedTribute = state.domVault;
      if (state.domVault !== before) {
        recordLedgerEvent({
          type: delta < 0 ? "loss" : "wheel",
          label: "Wheel Nudge",
          detail: `${wheelValueText(oldValue)} becomes ${wheelValueText(nextValue)}.`,
          delta: state.domVault - before,
          before,
          after: state.domVault
        });
      }
      const deltaText = `${delta >= 0 ? "+" : "-"}${money(Math.abs(delta))}`;
      addLog(`<strong>${state.names.dom} nudges the wheel ${direction > 0 ? "forward" : "back"} ${nudgeAmount}.</strong> ${wheelValueText(oldValue)} becomes ${wheelValueText(nextValue)}; result is now ${wheelSignedMoney(result.payout)} and the bank adjusts by ${deltaText}.`);
      render();
      publishState();
    }

    function wheelValueText(value) {
      if (value === WHEEL_THRONE_FREE_SPIN) return "+ free spin";
      return value === 0 ? "blank" : wheelSignedMoney(value);
    }

    function wheelSignedMoney(value) {
      if (value === WHEEL_THRONE_FREE_SPIN) return "+ free spin";
      const amount = Number(value || 0);
      if (amount < 0) return `-${money(Math.abs(amount))}`;
      return money(amount);
    }

    function resetTributeTicTacToeBoard() {
      state.board = createTicTacToeBoard();
      state.turn = SUB;
      state.active = false;
      state.mode = "normal";
      state.pot = 0;
      state.lockedTribute = state.domVault;
      state.winningCells = [];
      state.skipAvailable = false;
      state.skipArmed = false;
      state.reclaimPassAvailable = false;
      state.blockedColumns = [];
      state.domOpened = false;
    }

    function setTicTacToeFormat(formatId) {
      if (state.currentGame !== "tributeTicTacToe") return;
      if (state.active || state.pot > 0) return;
      if (state.online.room && localOnlineRole() !== DOM) return;
      const format = ticTacToeFormatOptions().find((option) => option.id === formatId) || currentTicTacToeFormat();
      state.ticTacToe = normalizeTicTacToeState({ ...state.ticTacToe, format: format.id });
      render();
      publishState();
    }

    function finishThroneWheelSpin(value) {
      state.wheel.finalBankDelta = 0;
      state.wheel.resultNotes = [];
      state.active = true;
      const amount = Number(value || 0);
      if (value === WHEEL_THRONE_FREE_SPIN) {
        state.wheel.finalPayout = 0;
        state.wheel.resultNotes = ["free spin"];
        showOutcomeSplash({
          tone: "gold",
          kicker: "Free Spin",
          title: "The Dom Keeps Spinning",
          detail: "That slice does not spend one of the hourly spins."
        });
        addLog(`<strong>Free spin.</strong> ${state.names.dom} keeps her spin count and can spin again.`);
      } else if (amount > 0) {
        const before = state.domVault;
        state.wheel.finalPayout = amount;
        state.settings.pendingThroneDemand = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          game: "Wheel Spin",
          amount,
          createdAt: Date.now()
        };
        recordLedgerEvent({
          type: "demand",
          label: "Throne Wheel Opened",
          detail: `The Throne wheel lands on ${money(amount)} and opens the payment page automatically.`,
          delta: 0,
          before,
          after: state.domVault
        });
        demandPayment({ automatic: true });
        showOutcomeSplash({
          tone: "dom",
          kicker: "Throne Wheel",
          title: `${money(amount)} Tribute`,
          detail: `${state.names.sub}'s Throne page opens for ${money(roundThroneTributeAmount(amount))}.`
        });
        addLog(`<strong>Throne Wheel hits ${money(amount)}.</strong> ${state.names.sub}'s Throne page opens automatically.`);
      } else {
        state.wheel.finalPayout = 0;
        showOutcomeSplash({
          tone: "gold",
          kicker: "Blank",
          title: "No Tribute Sent",
          detail: "The wheel lands blank."
        });
        addLog(`<strong>Throne Wheel hits blank.</strong> No payment page opens.`);
      }
      state.pot = 0;
      render();
      publishState();
    }

    function resetTicTacToeMatchProgress() {
      state.ticTacToe = normalizeTicTacToeState(state.ticTacToe);
      const format = currentTicTacToeFormat();
      state.ticTacToe.format = format.id;
      state.ticTacToe.target = format.target;
      state.ticTacToe.maxBoards = format.maxBoards;
      state.ticTacToe.scores = { sub: 0, dom: 0, draws: 0 };
      state.ticTacToe.boardNumber = 1;
      state.ticTacToe.matchActive = true;
      state.ticTacToe.pendingNextBoard = false;
      state.ticTacToe.lastBoardWinner = null;
      state.winningCells = [];
    }

    function ticTacToeStartNextBoard(message = "") {
      state.board = createTicTacToeBoard();
      state.winningCells = [];
      state.ticTacToe = normalizeTicTacToeState({
        ...state.ticTacToe,
        pendingNextBoard: false,
        lastBoardWinner: null
      });
      state.turn = state.mode === "reclaim" ? DOM : chooseStartingPlayer();
      state.active = true;
      if (message) addLog(message);
    }

    function resetTributeChessBoard() {
      state.turn = SUB;
      state.active = false;
      state.mode = "normal";
      state.pot = 0;
      state.lockedTribute = state.domVault;
      state.winningCells = [];
      state.chess = createChessState();
    }

    function startTicTacToeNormalMatch() {
      const bet = prepareRound("normal");
      if (bet === null) return;
      resetTicTacToeMatchProgress();
      ticTacToeStartNextBoard();
      const format = currentTicTacToeFormat();
      finishRoundStart(`${normalRoundAmountIntro(bet)} ${format.label}: first to ${format.target} board wins takes the match. ${labelFor(state.turn)} starts board 1.`);
    }

    function startTicTacToeSetupMatch() {
      if (state.currentGame !== "tributeTicTacToe") return;
      if (state.active || state.pot > 0 || state.pendingWager || state.normalReplayPrompt) return;
      if (state.online.room && localOnlineRole() !== DOM) return;
      wagerStartBypass = true;
      try {
        startNormalMatch();
      } finally {
        wagerStartBypass = false;
      }
    }

    function startTicTacToeReclaimMatch() {
      const pot = prepareRound("reclaim", "match");
      if (pot === null) return;
      resetTicTacToeMatchProgress();
      ticTacToeStartNextBoard();
      const format = currentTicTacToeFormat();
      finishRoundStart(`<strong>Reclaim match:</strong> ${state.names.sub} tries to take back ${money(pot)} across ${format.label}. ${state.names.dom} starts boards and drawn boards count for her.`);
    }

    function ticTacToeMatchWinner() {
      const game = normalizeTicTacToeState(state.ticTacToe);
      if (game.scores.sub >= game.target) return SUB;
      if (game.scores.dom >= game.target) return DOM;
      return null;
    }

    function ticTacToeScoreText() {
      const scores = normalizeTicTacToeState(state.ticTacToe).scores;
      return `${state.names.sub} ${scores.sub}, ${state.names.dom} ${scores.dom}${scores.draws ? `, draws ${scores.draws}` : ""}`;
    }

    function finishTicTacToeBoard(boardWinner, cells = []) {
      state.active = false;
      state.winningCells = cells;
      state.ticTacToe = normalizeTicTacToeState(state.ticTacToe);
      const scoredWinner = boardWinner === "draw" && state.mode === "reclaim" ? DOM : boardWinner;
      if (scoredWinner === SUB || scoredWinner === DOM) {
        state.ticTacToe.scores[scoredWinner] += 1;
        if (scoredWinner === DOM) {
          triggerSubLossPressure({
            weight: 1,
            message: true,
            messageThreshold: 3,
            strengthBoost: 0.05,
            source: "tic-tac-toe-board"
          });
        }
      } else {
        state.ticTacToe.scores.draws += 1;
      }
      state.ticTacToe.lastBoardWinner = boardWinner;
      const matchWinner = ticTacToeMatchWinner();
      if (matchWinner) {
        state.ticTacToe.matchActive = false;
        const result = settleRoundBank(matchWinner);
        const scoreText = ticTacToeScoreText();
        if (result.outcome === "subReclaim") {
          addLog(`<strong>${state.names.sub} wins the Tic Tac Toe match.</strong> ${scoreText}. ${money(result.amount)} is taken back from ${state.names.dom}'s bank.`);
        } else if (result.outcome === "subNormal") {
          addLog(`<strong>${state.names.sub} wins the Tic Tac Toe match.</strong> ${scoreText}. Nothing enters ${state.names.dom}'s bank.`);
        } else if (result.outcome === "domReclaim") {
          addLog(`<strong>${state.names.dom} wins the Tic Tac Toe reclaim match.</strong> ${scoreText}. ${money(result.amount)} is added to her bank.`);
        } else if (result.outcome === "domNormal") {
          addLog(`<strong>${state.names.dom} wins the Tic Tac Toe match.</strong> ${scoreText}. ${money(result.amount)} moves into her bank.`);
        } else if (result.outcome === "domThrone") {
          addLog(`<strong>${state.names.sub} loses the Tic Tac Toe match.</strong> ${scoreText}. The Throne page opens automatically.`);
        }
        state.pot = 0;
        render();
        publishState();
        return;
      }
      state.ticTacToe.pendingNextBoard = true;
      addLog(boardWinner === "draw"
        ? `<strong>Board ${state.ticTacToe.boardNumber} draws.</strong> ${state.mode === "reclaim" ? `${state.names.dom} claims the board. ` : ""}${ticTacToeScoreText()}.`
        : `<strong>${labelFor(boardWinner)} takes board ${state.ticTacToe.boardNumber}.</strong> ${ticTacToeScoreText()}.`);
      render();
      publishState();
    }

    function continueTicTacToeMatch() {
      if (state.currentGame !== "tributeTicTacToe" || !state.ticTacToe || !state.ticTacToe.pendingNextBoard) return;
      if (state.online.room && localOnlineRole() && localOnlineRole() !== DOM) return;
      state.ticTacToe.boardNumber += 1;
      ticTacToeStartNextBoard(`<strong>Board ${state.ticTacToe.boardNumber} starts.</strong> ${labelFor(state.turn)} moves first.`);
      render();
      publishState();
    }

    function playTicTacToe(row, col) {
      if (!state.active || state.currentGame !== "tributeTicTacToe") return;
      if (localOnlineRole() && localOnlineRole() !== state.turn) return;
      if (state.board[row][col]) return;
      const player = state.turn;
      state.board[row][col] = player;
      if (player === SUB) resolveFocusTaxSuccess();
      const result = evaluateTicTacToe();
      if (result.winner) {
        finishTicTacToeBoard(result.winner, result.cells);
        return;
      }
      if (isTicTacToeFull()) {
        finishTicTacToeBoard("draw", []);
        return;
      }
      state.turn = state.turn === SUB ? DOM : SUB;
      render();
      publishState();
    }

    function evaluateTicTacToe() {
      const lines = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
      ];
      for (const cells of lines) {
        const [a, b, c] = cells;
        const value = state.board[a[0]][a[1]];
        if (value && value === state.board[b[0]][b[1]] && value === state.board[c[0]][c[1]]) {
          return { winner: value, cells };
        }
      }
      return { winner: null, cells: [] };
    }

    function isTicTacToeFull() {
      return state.board.every((row) => row.every(Boolean));
    }

    function chessEngine() {
      if (typeof window.Chess !== "function") return null;
      const game = state.chess.fen === "start" ? new window.Chess() : new window.Chess(state.chess.fen);
      return game;
    }

    function startChessNormalMatch() {
      const bet = prepareRound("normal");
      if (bet === null) return;
      const starter = chooseStartingPlayer();
      const colors = starter === SUB ? { w: SUB, b: DOM } : { w: DOM, b: SUB };
      preserveTiltLevel(() => startChessSetup(colors, `${normalRoundAmountIntro(bet)} ${labelFor(starter)} plays white and starts.`));
      finishRoundStart(`${normalRoundAmountIntro(bet)} ${state.names.dom} chooses the Chess settings.`, false);
    }

    function startChessReclaimMatch() {
      const pot = prepareRound("reclaim");
      if (pot === null) return;
      startChessSetup({ w: DOM, b: SUB }, `<strong>Reclaim game:</strong> ${state.names.sub} is trying to win back ${money(pot)}. ${state.names.dom} plays white.`);
      finishRoundStart(`<strong>Reclaim game:</strong> ${state.names.sub} is trying to win back ${money(pot)}. ${state.names.dom} chooses the Chess settings.`, false);
    }

    function startChessSetup(colors, intro) {
      state.chess = createChessState();
      state.chess.setupPending = true;
      state.chess.pendingColors = colors;
      state.chess.pendingIntro = intro;
      state.chess.timerMode = "none";
      state.chess.timerTarget = "both";
      state.chess.customTimerMinutes = 10;
      state.turn = DOM;
      state.active = true;
      render();
    }

    function resetChessMatch(colors, timerMode = "none", customMinutes = 10, timerTarget = "both") {
      const game = typeof window.Chess !== "function" ? null : new window.Chess();
      state.chess = createChessState();
      state.chess.fen = game ? game.fen() : "start";
      state.chess.colors = colors;
      state.chess.queenStance = chessQueenStancesActive() ? "none" : "";
      setupChessTimers(timerMode, customMinutes, timerTarget);
      state.turn = colors.w;
      state.active = true;
      render();
    }

    function timerGameKey() {
      if (state.currentGame === "tributeChess") return "chess";
      if (state.currentGame === "tributeCheckers") return "checkers";
      if (state.currentGame === "tributeReversi") return "reversi";
      return "";
    }

    function timerGameLabel(key = timerGameKey()) {
      if (key === "checkers") return "Checkers";
      if (key === "reversi") return "Reversi";
      return "Chess";
    }

    function timerGameState(key = timerGameKey()) {
      if (key === "chess") return state.chess;
      if (key === "checkers") return state.checkers;
      if (key === "reversi") return state.reversi;
      return null;
    }

    function timerSetupActiveKey() {
      if (state.screen !== "game") return "";
      return ["chess", "checkers", "reversi"].find((key) => {
        const game = timerGameState(key);
        if (!game || !game.setupPending) return false;
        if (key === "chess") return state.currentGame === "tributeChess";
        if (key === "checkers") return state.currentGame === "tributeCheckers";
        return state.currentGame === "tributeReversi";
      }) || "";
    }

    function turnTimerMinutes(mode, customMinutes) {
      if (mode === "custom") return Math.max(1, Math.min(60, Math.round(Number(customMinutes || 10))));
      if (mode === "5" || mode === "10" || mode === "15") return Number(mode);
      return 0;
    }

    function chessTimerMinutes(mode = state.chess && state.chess.timerMode, customMinutes = state.chess && state.chess.customTimerMinutes) {
      return turnTimerMinutes(mode, customMinutes);
    }

    function setupTurnTimers(game, mode = "none", customMinutes = 10, timerTarget = "both") {
      if (!game) return;
      const minutes = turnTimerMinutes(mode, customMinutes);
      game.timerMode = minutes > 0 ? (mode === "custom" ? "custom" : String(minutes)) : "none";
      game.timerTarget = timerTarget === "sub" ? "sub" : "both";
      game.customTimerMinutes = Math.max(1, Math.min(60, Math.round(Number(customMinutes || 10))));
      const ms = minutes * 60 * 1000;
      game.timers = { sub: ms, dom: game.timerTarget === "sub" ? 0 : ms };
      game.timerLastTick = ms > 0 ? Date.now() : 0;
    }

    function setupChessTimers(mode = "none", customMinutes = 10, timerTarget = "both") {
      setupTurnTimers(state.chess, mode, customMinutes, timerTarget);
    }

    function turnTimerActive() {
      const key = timerGameKey();
      const game = timerGameState(key);
      if (!key || !game || !state.active || game.setupPending) return false;
      if (key === "checkers" && game.queenSetup) return false;
      return turnTimerMinutes(game.timerMode, game.customTimerMinutes) > 0;
    }

    function chessTimerActive() {
      return Boolean(state.currentGame === "tributeChess" && turnTimerActive());
    }

    function turnClockPaused() {
      const key = timerGameKey();
      const game = timerGameState(key);
      if (!turnTimerActive() || !game) return true;
      if (key === "chess") {
        return Boolean(
          state.chess.freezeMode
          || state.chess.commandMode
          || state.chess.repositionMode
          || (els.tributeFourPowerModal && !els.tributeFourPowerModal.classList.contains("hidden"))
          || (els.chessSettingsModal && !els.chessSettingsModal.classList.contains("hidden"))
        );
      }
      return Boolean(
        (els.tributeFourPowerModal && !els.tributeFourPowerModal.classList.contains("hidden"))
        || (els.chessSettingsModal && !els.chessSettingsModal.classList.contains("hidden"))
      );
    }

    function chessClockPaused() {
      return state.currentGame !== "tributeChess" || turnClockPaused();
    }

    function syncTurnClock() {
      if (!turnTimerActive()) return;
      const game = timerGameState();
      if (!game) return;
      if (turnClockPaused()) {
        game.timerLastTick = Date.now();
        return;
      }
      const now = Date.now();
      const last = Number(game.timerLastTick || now);
      const elapsed = Math.max(0, now - last);
      game.timerLastTick = now;
      if (!elapsed || (state.turn !== SUB && state.turn !== DOM)) return;
      if (game.timerTarget === "sub" && state.turn !== SUB) return;
      game.timers[state.turn] = Math.max(0, Number(game.timers[state.turn] || 0) - elapsed);
      if (game.timers[state.turn] <= 0) {
        const winner = otherRole(state.turn);
        const reason = `${labelFor(state.turn)} runs out of time.`;
        if (state.currentGame === "tributeCheckers") endCheckersMatch(winner, reason);
        else if (state.currentGame === "tributeReversi") endReversiMatch(winner, reason);
        else endChessMatch(winner, reason);
      }
    }

    function syncChessClock() {
      syncTurnClock();
    }

    function resetChessClockTick() {
      const game = timerGameState();
      if (game && turnTimerMinutes(game.timerMode, game.customTimerMinutes) > 0) game.timerLastTick = Date.now();
    }

    function formatChessClock(ms) {
      const safe = Math.max(0, Math.ceil(Number(ms || 0) / 1000));
      const minutes = Math.floor(safe / 60);
      const seconds = safe % 60;
      return `${minutes}:${String(seconds).padStart(2, "0")}`;
    }

    function setChessTimerMode(mode) {
      const key = timerSetupActiveKey();
      const game = timerGameState(key);
      if (!key || !game) return;
      if (state.online.room && localOnlineRole() !== DOM) return;
      game.timerMode = ["none", "5", "10", "15", "custom"].includes(String(mode)) ? String(mode) : "none";
      if (game.timerMode === "none") game.timerTarget = "both";
      if (els.chessCustomTimerInput) {
        game.customTimerMinutes = turnTimerMinutes("custom", els.chessCustomTimerInput.value);
      }
      render();
      publishState();
    }

    function setChessTimerTarget(target) {
      const key = timerSetupActiveKey();
      const game = timerGameState(key);
      if (!key || !game) return;
      if (state.online.room && localOnlineRole() !== DOM) return;
      if ((game.timerMode || "none") === "none") return;
      game.timerTarget = target === "sub" ? "sub" : "both";
      render();
      publishState();
    }

    function confirmChessSettings() {
      const key = timerSetupActiveKey();
      const game = timerGameState(key);
      if (!key || !game) return;
      if (state.online.room && localOnlineRole() !== DOM) return;
      const mode = game.timerMode || "none";
      const target = game.timerTarget === "sub" ? "sub" : "both";
      const customMinutes = turnTimerMinutes("custom", els.chessCustomTimerInput && els.chessCustomTimerInput.value);
      const label = timerGameLabel(key);
      if (key === "chess") {
        const colors = state.chess.pendingColors || { w: SUB, b: DOM };
        const intro = state.chess.pendingIntro || `${labelFor(colors.w)} plays white and starts.`;
        resetChessMatch(colors, mode, customMinutes, target);
        addLog(intro);
      } else if (key === "checkers") {
        const starter = state.checkers.pendingStarter || SUB;
        const intro = state.checkers.pendingIntro || `${labelFor(starter)} moves first.`;
        beginCheckersQueenSetup(starter);
        setupTurnTimers(state.checkers, mode, customMinutes, target);
        state.checkers.setupPending = false;
        addLog(intro);
      } else if (key === "reversi") {
        const starter = state.reversi.pendingStarter || SUB;
        const intro = state.reversi.pendingIntro || `${labelFor(starter)} plays dark and moves first.`;
        const showNumberHints = els.reversiHintToggle ? els.reversiHintToggle.checked : state.reversi.showNumberHints !== false;
        state.reversi = createReversiState();
        state.reversi.showNumberHints = showNumberHints;
        state.reversi.commandAvailable = reversiTierActive(5);
        setupTurnTimers(state.reversi, mode, customMinutes, target);
        state.turn = starter;
        state.active = true;
        addLog(intro);
      }
      const minutes = turnTimerMinutes(mode, customMinutes);
      addLog(minutes > 0
        ? `<strong>${label} clock set.</strong> ${target === "sub" ? `${state.names.sub} has` : "Each player has"} ${minutes} minute${minutes === 1 ? "" : "s"}.`
        : `<strong>No ${label} clock.</strong> This game has no timer.`);
      render();
      publishState();
    }

    function roleForChessColor(color) {
      return state.chess.colors[color];
    }

    function colorForChessRole(role) {
      return state.chess.colors.w === role ? "w" : "b";
    }

    function chessQueenStancesActive() {
      if (!domAdvantagesEnabled() || state.currentGame !== "tributeChess" || !reclaimPerksActive()) return false;
      if (state.settings.queenPowerMode === "off") return false;
      if (state.settings.queenPowerMode === "always") return true;
      return state.tiltLevel >= 1;
    }

    const CHESS_CAPTURE_BANNER_IMAGES = [
      "https://files.catbox.moe/7bvb39.png",
      "https://files.catbox.moe/0ocegf.png",
      "https://files.catbox.moe/kxk7wg.png",
      "https://files.catbox.moe/fyo046.png",
      "https://files.catbox.moe/33hapd.png",
      "https://files.catbox.moe/33t824.png",
      "https://files.catbox.moe/ngiqcy.png",
      "https://files.catbox.moe/7we9vn.png",
      "https://files.catbox.moe/yi2peq.png",
      "https://files.catbox.moe/c49iie.png",
      "https://files.catbox.moe/be3iji.png",
      "https://files.catbox.moe/k9ah90.png",
      "https://files.catbox.moe/hxoart.png",
      "https://files.catbox.moe/jyz348.png",
      "https://files.catbox.moe/cl7h0g.png",
      "https://files.catbox.moe/ylbua6.png",
      "https://files.catbox.moe/y7p7iq.png",
      "https://files.catbox.moe/nr1ky5.png",
      "https://files.catbox.moe/rpdwhr.png",
      "https://files.catbox.moe/5urzk7.png",
      "https://files.catbox.moe/lht0a4.png",
      "https://files.catbox.moe/s0172e.png",
      "https://files.catbox.moe/kxznif.png"
    ];
    const CHESS_CAPTURE_BANNER_MS = 5800;

    function randomItemAvoidingRecent(pool, recent, maxRecent = 4) {
      if (!Array.isArray(pool) || !pool.length) return "";
      const avoidCount = Math.min(Math.max(0, maxRecent), Math.max(0, pool.length - 1));
      const recentSet = new Set((Array.isArray(recent) ? recent : []).slice(-avoidCount));
      const choices = pool.filter((item) => item && !recentSet.has(item));
      const activePool = choices.length ? choices : pool;
      return activePool[Math.floor(Math.random() * activePool.length)] || "";
    }

    function rememberRecentItem(recent, item, maxRecent = 4) {
      if (!item) return Array.isArray(recent) ? recent.slice(-maxRecent) : [];
      return [...(Array.isArray(recent) ? recent : []), item].filter(Boolean).slice(-maxRecent);
    }

    function randomCaptureBannerImage(captureState) {
      return randomItemAvoidingRecent(CHESS_CAPTURE_BANNER_IMAGES, captureState && captureState.recentCaptureBanners, 5);
    }

    function ensureLossPressure() {
      if (!state.lossPressure) state.lossPressure = createLossPressureState();
      return state.lossPressure;
    }

    function resetLossPressure() {
      state.lossPressure = createLossPressureState();
    }

    function showLossPressureCaptureBanner() {
      const pressure = ensureLossPressure();
      const url = randomCaptureBannerImage(pressure);
      if (!url) return;
      pressure.recentCaptureBanners = rememberRecentItem(pressure.recentCaptureBanners, url, 5);
      pressure.captureBanner = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        url,
        until: Date.now() + CHESS_CAPTURE_BANNER_MS
      };
    }

    function showChessCaptureBanner() {
      showLossPressureCaptureBanner();
      if (!state.chess) return;
      state.chess.captureBanner = state.lossPressure && state.lossPressure.captureBanner;
    }

    function showLossPressurePulse(losses, strengthBoost = 0) {
      const pressure = ensureLossPressure();
      pressure.capturePulse = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        losses,
        strength: Math.min(1, 0.24 + losses * 0.075 + strengthBoost),
        until: Date.now() + 1450
      };
    }

    function showChessPieceLossPulse() {
      if (!state.chess) return;
      state.chess.subPiecesLostToDom = Number(state.chess.subPiecesLostToDom || 0) + 1;
      ensureLossPressure().count = Math.max(Number(state.lossPressure.count || 0), Number(state.chess.subPiecesLostToDom || 0));
      triggerSubLossPressure({
        weight: 0,
        message: true,
        source: "chess"
      });
    }

    function lossPressureMessageText(losses) {
      const soft = [
        "Another piece for her.",
        "She noticed that one.",
        "Give in.",
        "For her.",
        "One more.",
        "Good loss.",
        "Feed her.",
        "Tribute her."
      ];
      const tempting = [
        "Give her another. You know you want to.",
        "Stop guarding them so carefully.",
        "Sacrifice looks better every time.",
        "Give up.",
        "Surrender.",
        "Send to her.",
        "$end to her.",
        "Let her win.",
        "Drain for her.",
        "Make her richer."
      ];
      const deep = [
        "Feed her board. Empty yours.",
        "Let her take until there is nothing left.",
        "SURRENDER.",
        "GIVE UP.",
        "PAY HER.",
        "EMPTY OUT.",
        "LOSE FOR HER.",
        "TRIBUTE BELONGS TO HER.",
        "YOUR PIECES ARE HERS.",
        "LET HER DRAIN YOU."
      ];
      const pool = losses >= 12 ? deep : (losses >= 9 ? tempting : soft);
      const pressure = ensureLossPressure();
      const text = randomItemAvoidingRecent(pool, pressure.recentCaptureMessages, Math.min(4, pool.length - 1));
      pressure.recentCaptureMessages = rememberRecentItem(pressure.recentCaptureMessages, text, Math.min(4, pool.length - 1));
      return text || soft[0];
    }

    function chessPieceLossMessageText(losses) {
      return lossPressureMessageText(losses);
    }

    function showLossPressureMessage(losses, threshold = 5) {
      if (losses < threshold) return;
      const pressure = ensureLossPressure();
      const tier = losses >= 12 ? 3 : (losses >= 9 ? 2 : 1);
      const duration = 2600 + tier * 700 + Math.min(1200, Math.max(0, losses - 5) * 120);
      const startX = 18 + Math.random() * 22;
      const startY = 43 + Math.random() * 22;
      const driftX = 20 + Math.random() * 24;
      const driftY = -8 + Math.random() * 16;
      pressure.captureMessage = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        text: lossPressureMessageText(losses),
        tier,
        losses,
        startX,
        startY,
        driftX,
        driftY,
        duration,
        until: Date.now() + duration
      };
    }

    function showChessPieceLossMessage(losses) {
      showLossPressureMessage(losses);
      if (!state.chess) return;
      state.chess.captureMessage = state.lossPressure && state.lossPressure.captureMessage;
    }

    function triggerSubLossPressure(options = {}) {
      const pressure = ensureLossPressure();
      const weight = Math.max(0, Math.round(Number(options.weight || 1)));
      if (weight > 0) pressure.count = Number(pressure.count || 0) + weight;
      const losses = Math.max(1, Number(pressure.count || 0));
      if (options.banner) showLossPressureCaptureBanner();
      showLossPressurePulse(losses, Number(options.strengthBoost || 0));
      if (options.message !== false) showLossPressureMessage(losses, Number(options.messageThreshold || 5));
    }

    function pressureEligibleGame(game = state.currentGame) {
      return [
        "tributeFour",
        "tributeFleet",
        "tributeChess",
        "tributeCheckers",
        "tributeReversi",
        "tributeTicTacToe",
        "higherLower"
      ].includes(game);
    }

    function triggerSubRoundLossPressure(weight = 3) {
      if (!pressureEligibleGame()) return;
      triggerSubLossPressure({
        weight,
        message: true,
        messageThreshold: 1,
        strengthBoost: 0.12,
        source: "round-loss"
      });
    }

    function showCheckersCaptureBanner() {
      showLossPressureCaptureBanner();
      if (!state.checkers) return;
      state.checkers.captureBanner = state.lossPressure && state.lossPressure.captureBanner;
    }

    function lossPressureEffectVisible(type) {
      const role = localOnlineRole();
      if (role !== DOM) return true;
      if (type === "banner") return Boolean(state.settings.domSeePressureBanners);
      if (type === "text") return Boolean(state.settings.domSeePressureText);
      if (type === "pulse") return Boolean(state.settings.domSeePressurePulse);
      return true;
    }

    function renderChessCaptureBanner() {
      if (!els.chessCaptureBanner) return;
      const banner = state.lossPressure && state.lossPressure.captureBanner
        ? state.lossPressure.captureBanner
        : (state.currentGame === "tributeCheckers"
          ? state.checkers && state.checkers.captureBanner
          : state.chess && state.chess.captureBanner);
      const show = Boolean(
        state.screen === "game"
        && lossPressureEffectVisible("banner")
        && banner
        && banner.url
        && Number(banner.until || 0) > Date.now()
      );
      els.chessCaptureBanner.classList.toggle("hidden", !show);
      if (!show) {
        els.chessCaptureBanner.innerHTML = "";
        return;
      }
      els.chessCaptureBanner.innerHTML = `<img src="${escapeHtml(banner.url)}" alt="" aria-hidden="true">`;
      window.clearTimeout(renderChessCaptureBanner.timer);
      renderChessCaptureBanner.timer = window.setTimeout(renderChessCaptureBanner, Math.max(80, Number(banner.until || 0) - Date.now() + 40));
    }

    function renderPieceLossPulse() {
      if (!els.pieceLossPulse) return;
      const pulse = state.lossPressure && state.lossPressure.capturePulse
        ? state.lossPressure.capturePulse
        : (state.currentGame === "tributeChess" && state.chess ? state.chess.capturePulse : null);
      const show = Boolean(
        state.screen === "game"
        && lossPressureEffectVisible("pulse")
        && pulse
        && Number(pulse.until || 0) > Date.now()
      );
      els.pieceLossPulse.classList.toggle("hidden", !show);
      if (!show) return;
      const strength = Math.max(0.2, Math.min(1, Number(pulse.strength || 0.35)));
      els.pieceLossPulse.style.setProperty("--piece-loss-strength", strength.toFixed(2));
      els.pieceLossPulse.style.setProperty("--piece-loss-scale", (1 + strength * 0.08).toFixed(3));
      els.pieceLossPulse.style.setProperty("--piece-loss-hot", (strength * 0.34).toFixed(3));
      els.pieceLossPulse.style.setProperty("--piece-loss-violet", (strength * 0.28).toFixed(3));
      els.pieceLossPulse.style.setProperty("--piece-loss-red", (strength * 0.22).toFixed(3));
      els.pieceLossPulse.style.setProperty("--piece-loss-purple", (strength * 0.28).toFixed(3));
      els.pieceLossPulse.style.setProperty("--piece-loss-peak", (0.28 + strength * 0.42).toFixed(3));
      els.pieceLossPulse.style.setProperty("--piece-loss-dip", (0.12 + strength * 0.28).toFixed(3));
      els.pieceLossPulse.style.setProperty("--piece-loss-mid", (0.18 + strength * 0.32).toFixed(3));
      els.pieceLossPulse.style.setProperty("--piece-loss-saturate", (1.05 + strength * 0.55).toFixed(3));
      els.pieceLossPulse.dataset.losses = String(pulse.losses || 1);
      window.clearTimeout(renderPieceLossPulse.timer);
      renderPieceLossPulse.timer = window.setTimeout(renderPieceLossPulse, Math.max(80, Number(pulse.until || 0) - Date.now() + 40));
    }

    function renderPieceLossSpiral() {
      if (!els.pieceLossSpiral) return;
      const mobileLike = (window.matchMedia && (
        window.matchMedia("(hover: none)").matches
        || window.matchMedia("(pointer: coarse)").matches
      )) || (window.innerWidth || 0) < 760;
      const losses = state.currentGame === "tributeChess" && state.chess
        ? Math.max(Number(state.chess.subPiecesLostToDom || 0), Number(state.lossPressure && state.lossPressure.count || 0))
        : Number(state.lossPressure && state.lossPressure.count || 0);
      const rapidFire = Boolean(state.settings.redditeryRapidFire && redditeryAutoPopupAllowed());
      const show = Boolean(!mobileLike && (
        rapidFire
        || (lossPressureEffectVisible("pulse") && state.screen === "game" && state.active && losses >= 8)
      ));
      if (!show) {
        els.pieceLossSpiral.classList.remove("fade-in");
        els.pieceLossSpiral.classList.remove("active");
        window.clearTimeout(renderPieceLossSpiral.hideTimer);
        renderPieceLossSpiral.hideTimer = window.setTimeout(() => {
          if (!els.pieceLossSpiral || els.pieceLossSpiral.classList.contains("active")) return;
          els.pieceLossSpiral.classList.add("hidden");
        }, 220);
        els.pieceLossSpiral.style.removeProperty("--piece-loss-spiral-opacity");
        return;
      }
      const opacity = rapidFire ? 0.095 : Math.min(0.14, 0.045 + (losses - 8) * 0.012);
      els.pieceLossSpiral.style.setProperty("--piece-loss-spiral-opacity", opacity.toFixed(3));
      window.clearTimeout(renderPieceLossSpiral.hideTimer);
      if (els.pieceLossSpiral.classList.contains("hidden")) {
        els.pieceLossSpiral.classList.remove("hidden");
        els.pieceLossSpiral.classList.remove("active");
        els.pieceLossSpiral.classList.add("fade-in");
        window.requestAnimationFrame(() => {
          if (!els.pieceLossSpiral) return;
          window.requestAnimationFrame(() => els.pieceLossSpiral.classList.add("active"));
        });
      } else {
        els.pieceLossSpiral.classList.add("active");
      }
    }

    function renderPieceLossMessage() {
      if (!els.pieceLossMessage) return;
      const message = state.lossPressure && state.lossPressure.captureMessage
        ? state.lossPressure.captureMessage
        : (state.currentGame === "tributeChess" && state.chess ? state.chess.captureMessage : null);
      const show = Boolean(
        lossPressureEffectVisible("text")
        && state.screen === "game"
        && message
        && message.text
        && Number(message.until || 0) > Date.now()
      );
      els.pieceLossMessage.classList.toggle("hidden", !show);
      if (!show) {
        els.pieceLossMessage.textContent = "";
        return;
      }
      const duration = Math.max(1800, Number(message.duration || 3200));
      els.pieceLossMessage.textContent = message.text;
      els.pieceLossMessage.className = `piece-loss-message tier-${message.tier || 1}`;
      els.pieceLossMessage.style.setProperty("--piece-loss-message-x", `${Number(message.startX || 30).toFixed(1)}vw`);
      els.pieceLossMessage.style.setProperty("--piece-loss-message-y", `${Number(message.startY || 54).toFixed(1)}vh`);
      els.pieceLossMessage.style.setProperty("--piece-loss-message-drift-x", `${Number(message.driftX || 24).toFixed(1)}vw`);
      els.pieceLossMessage.style.setProperty("--piece-loss-message-drift-y", `${Number(message.driftY || 0).toFixed(1)}vh`);
      els.pieceLossMessage.style.setProperty("--piece-loss-message-duration", `${duration}ms`);
      window.clearTimeout(renderPieceLossMessage.timer);
      renderPieceLossMessage.timer = window.setTimeout(renderPieceLossMessage, Math.max(80, Number(message.until || 0) - Date.now() + 40));
    }

    function queenAffectedTypes() {
      if (state.tiltLevel >= 5) return ["p", "n", "b", "r", "q"];
      if (state.tiltLevel >= 4) return ["p", "n", "b", "r"];
      if (state.tiltLevel >= 3) return ["p", "n", "b"];
      if (state.tiltLevel >= 2) return ["p", "n"];
      if (state.tiltLevel >= 1) return ["p"];
      if (state.settings.queenPowerMode === "always") return ["p"];
      return [];
    }

    function queenAffectedLabel() {
      const labels = {
        p: "pawns",
        n: "knights",
        b: "bishops",
        r: "rooks",
        q: "queen"
      };
      return queenAffectedTypes().map(type => labels[type]).join(", ");
    }

    function findDomQueenSquare(game) {
      const domColor = colorForChessRole(DOM);
      const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
      for (let rank = 1; rank <= 8; rank += 1) {
        for (const file of files) {
          const square = `${file}${rank}`;
          const piece = game.get(square);
          if (piece && piece.color === domColor && piece.type === "q") return square;
        }
      }
      return null;
    }

    function canUseDomQueenPower(game) {
      if (!game || !state.active || state.currentGame !== "tributeChess" || state.mode !== "reclaim") return false;
      if (!domAdvantagesEnabled() || !queenPowerControlsAllowed(localOnlineRole())) return false;
      if (state.settings.queenPowerMode === "off") return false;
      if (state.chess.freezeMode || state.chess.commandMode || state.chess.repositionMode) return false;
      return roleForChessColor(game.turn()) === DOM || state.chess.postDomPowerWindow;
    }

    function squareCoords(square) {
      return {
        file: square.charCodeAt(0) - 97,
        rank: Number(square[1]) - 1
      };
    }

    function coordsSquare(file, rank) {
      return `${String.fromCharCode(97 + file)}${rank + 1}`;
    }

    function areAdjacentSquares(first, second) {
      if (!first || !second || first === second) return false;
      const a = squareCoords(first);
      const b = squareCoords(second);
      return Math.max(Math.abs(a.file - b.file), Math.abs(a.rank - b.rank)) === 1;
    }

    function expandFenBoard(boardFen) {
      return boardFen.split("/").map((row) => (
        row.split("").flatMap((char) => /\d/.test(char) ? Array(Number(char)).fill("") : [char])
      ));
    }

    function compressFenBoard(rows) {
      return rows.map((row) => {
        let result = "";
        let empty = 0;
        row.forEach((cell) => {
          if (!cell) {
            empty += 1;
          } else {
            if (empty) {
              result += empty;
              empty = 0;
            }
            result += cell;
          }
        });
        return result + (empty ? empty : "");
      }).join("/");
    }

    function queenLineHasSight(game, queenSquare, targetSquare) {
      if (!queenSquare || queenSquare === targetSquare) return false;
      const queen = squareCoords(queenSquare);
      const target = squareCoords(targetSquare);
      const df = Math.sign(target.file - queen.file);
      const dr = Math.sign(target.rank - queen.rank);
      const aligned = queen.file === target.file
        || queen.rank === target.rank
        || Math.abs(target.file - queen.file) === Math.abs(target.rank - queen.rank);
      if (!aligned) return false;
      let file = queen.file + df;
      let rank = queen.rank + dr;
      while (file !== target.file || rank !== target.rank) {
        if (game.get(coordsSquare(file, rank))) return false;
        file += df;
        rank += dr;
      }
      return true;
    }

    function isQueenAffectedPiece(piece) {
      return Boolean(piece && piece.color === colorForChessRole(SUB) && queenAffectedTypes().includes(piece.type));
    }

    function isQueenGazedSquare(game, square, piece) {
      return chessQueenStancesActive()
        && state.chess.queenStance === "gaze"
        && isQueenAffectedPiece(piece)
        && queenLineHasSight(game, findDomQueenSquare(game), square);
    }

    function isQueenLeashedSquare(game, square, piece) {
      if (!chessQueenStancesActive() || state.chess.queenStance !== "leash" || !isQueenAffectedPiece(piece)) return false;
      const queenSquare = findDomQueenSquare(game);
      if (!queenSquare) return false;
      const queen = squareCoords(queenSquare);
      const target = squareCoords(square);
      return Math.max(Math.abs(queen.file - target.file), Math.abs(queen.rank - target.rank)) <= 1;
    }

    function countLeashedSubPieces(game) {
      let count = 0;
      const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
      for (let rank = 1; rank <= 8; rank += 1) {
        for (const file of files) {
          const square = `${file}${rank}`;
          if (isQueenLeashedSquare(game, square, game.get(square))) count += 1;
        }
      }
      return count;
    }

    function awardRandomQueenCharge(reason, count = 1) {
      if (!chessQueenStancesActive() || state.chess.queenTriggerUsed) return;
      state.chess.charges += count;
      state.chess.queenTriggerUsed = true;
      const chargeText = count === 1
        ? "1 queen charge"
        : `${count} queen charges`;
      addLog(`<strong>Queen's ${stanceLabel(state.chess.queenStance)}.</strong> ${reason} ${state.names.dom} gains ${chargeText}.`);
    }

    function stanceLabel(stance) {
      return {
        none: "None",
        gaze: "Gaze",
        tithe: "Tithe",
        leash: "Leash"
      }[stance] || "Stance";
    }

    function queenStanceDescription() {
      const affected = queenAffectedLabel() || "affected pieces";
      return {
        none: "None: the queen has no active stance.",
        gaze: `Gaze: when ${state.names.sub} moves ${affected} in the dom queen's line of sight, ${state.names.dom} gains 1 queen charge.`,
        tithe: `Tithe: when ${state.names.dom}'s queen captures ${affected}, she gains 1 queen charge.`,
        leash: `Leash: nearby ${affected} must stay near the dom queen or capture her; when the sub ends a turn, ${state.names.dom} gains 1 queen charge per leashed unit.`
      }[state.chess.queenStance || "none"];
    }

    function chargeLabel(type) {
      return {
        reposition: "Reposition",
        freeze: "Freeze",
        shield: "Shield",
        skip: "Skip",
        command: "Command"
      }[type] || "Queen";
    }

    function queenPowerCost(type) {
      return {
        reposition: 1,
        freeze: 1,
        shield: 2,
        skip: 2,
        command: 3
      }[type] || 0;
    }

    function canUseQueenPowerType(type) {
      const game = chessEngine();
      if (!game || !state.active || state.currentGame !== "tributeChess" || state.mode !== "reclaim") return false;
      const localRole = localOnlineRole();
      if (localRole && localRole !== DOM) return false;
      if (state.chess.charges < queenPowerCost(type)) return false;
      const movingRole = roleForChessColor(game.turn());
      if (type === "reposition") return canUseDomQueenPower(game) && !state.chess.repositionUsed && Boolean(findDomQueenSquare(game));
      if (type === "shield") return canUseDomQueenPower(game) && !state.chess.queenShield && Boolean(findDomQueenSquare(game));
      if (state.chess.freezeMode || state.chess.repositionMode || state.chess.commandMode) return false;
      if (movingRole !== DOM) return false;
      if (type === "skip") return !state.chess.skipQueued;
      return type === "freeze" || type === "command";
    }

    function renderQueenCharges() {
      const value = state.chess.charges || 0;
      return ["reposition", "freeze", "shield", "skip", "command"].map((type) => {
        const cost = queenPowerCost(type);
        const filled = Math.min(value, cost);
        const active = (type === "freeze" && state.chess.freezeMode)
          || (type === "reposition" && state.chess.repositionMode)
          || (type === "shield" && state.chess.queenShield)
          || (type === "command" && state.chess.commandMode);
        const ready = value >= cost;
        const disabled = !canUseQueenPowerType(type);
        const pips = Array.from({ length: cost }, (_, index) => (
          `<span class="charge-pip ${index < filled ? "filled" : ""}"></span>`
        )).join("");
        return `<button class="charge-chip ${ready ? "ready" : ""} ${active ? "active" : ""}" data-queen-power="${type}" style="--pip-count:${cost}" ${disabled ? "disabled" : ""}>
          <span class="charge-label">${chargeLabel(type)}</span>
          <span class="charge-count">${value}/${cost}</span>
          <span class="charge-pips">${pips}</span>
        </button>`;
      }).join("");
    }

    function activateQueenPower(type) {
      if (!canUseQueenPowerType(type)) return;
      if (type === "reposition") chessRepositionAction();
      else if (type === "freeze") chessFreezeAction();
      else if (type === "shield") chessShieldAction();
      else if (type === "skip") chessSkipAction();
      else if (type === "command") chessDomPrimaryAction();
    }

    function chessSquareClick(square) {
      const game = chessEngine();
      if (!game || !state.active) return;
      syncChessClock();
      if (!state.active) return;
      const movingRole = roleForChessColor(game.turn());
      const localRole = localOnlineRole();
      const commandMove = state.chess.commandMode && queenPowerControlsAllowed(localRole) && movingRole === SUB;

      const piece = game.get(square);
      if (state.chess.freezeMode && queenPowerControlsAllowed(localRole)) {
        freezeChessSquare(square, piece);
        return;
      }

      if (state.chess.repositionMode && queenPowerControlsAllowed(localRole)) {
        repositionQueen(square, piece);
        return;
      }

      if (!commandMove && localRole && localRole !== movingRole) return;

      if (!state.chess.selected) {
        if (!piece || piece.color !== game.turn()) return;
        if (!commandMove && square === state.chess.freezeSquare && movingRole === SUB) return;
        state.chess.selected = square;
        state.chess.legalMoves = legalChessMoves(game, square, commandMove);
        render();
        return;
      }

      const move = state.chess.legalMoves.find((candidate) => candidate.to === square)
        || state.chess.legalMoves.find((candidate) => chessCastleRookSquare(candidate) === square);
      if (!move) {
        state.chess.selected = null;
        state.chess.legalMoves = [];
        render();
        return;
      }
      const fromSquare = state.chess.selected;
      const movingPiece = game.get(fromSquare);
      const capturedPiece = move.manualCastle ? null : game.get(move.to);
      const gazeTriggered = movingRole === SUB && !commandMove && isQueenGazedSquare(game, fromSquare, movingPiece);
      const titheTriggered = movingRole === DOM
        && chessQueenStancesActive()
        && state.chess.queenStance === "tithe"
        && movingPiece
        && movingPiece.type === "q"
        && isQueenAffectedPiece(capturedPiece);
      const result = move.manualCastle
        ? applyManualChessCastle(game, move)
        : game.move({ from: fromSquare, to: move.to, promotion: "q" });
      if (!result) return;
      const movedRole = movingRole;
      const capturedRole = capturedPiece
        ? roleForChessColor(capturedPiece.color)
        : (result.captured ? (movedRole === DOM ? SUB : DOM) : null);
      if (capturedRole === SUB) {
        showChessCaptureBanner();
        if (movedRole === DOM || commandMove) showChessPieceLossPulse();
      }
      if (movedRole === SUB && !commandMove) resolveFocusTaxSuccess();
      state.chess.fen = game.fen();
      if (state.chess.freezeSquare === fromSquare) {
        state.chess.freezeSquare = square;
      } else if (state.chess.freezeSquare) {
        const frozenPiece = game.get(state.chess.freezeSquare);
        if (!frozenPiece || frozenPiece.color !== colorForChessRole(SUB)) {
          state.chess.freezeSquare = null;
          state.chess.freezeTurnsRemaining = 0;
        }
      }
      state.chess.selected = null;
      state.chess.legalMoves = [];
      state.chess.commandMode = false;
      if (movedRole === SUB) tickChessFreeze();
      if (gazeTriggered) awardRandomQueenCharge(`${state.names.sub} moves through the queen's sight.`);
      if (titheTriggered) awardRandomQueenCharge(`${state.names.dom}'s queen claims an affected piece.`);
      if (movedRole === SUB && !commandMove && state.chess.queenStance === "leash") {
        const leashedCount = countLeashedSubPieces(game);
        if (leashedCount > 0) {
          awardRandomQueenCharge(`${state.names.sub} ends the turn with ${leashedCount} leashed unit${leashedCount === 1 ? "" : "s"}.`, leashedCount);
        }
      }
      addLog(commandMove
        ? `<strong>Command Move.</strong> ${state.names.dom} moves ${state.names.sub}'s piece.`
        : `<strong>${labelFor(movedRole)} moves.</strong>`);
      resolveChessAfterMove(game, movedRole);
    }

    function chessCastleRookSquare(move) {
      const flags = String(move && move.flags || "");
      if (!flags.includes("k") && !flags.includes("q")) return "";
      const rank = String(move.from || "").slice(1);
      if (!rank) return "";
      return `${flags.includes("k") ? "h" : "a"}${rank}`;
    }

    function chessSquareAttackedBy(game, square, byColor) {
      const target = squareCoords(square);
      const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
      const enemyPawnRank = byColor === "w" ? target.rank - 1 : target.rank + 1;
      for (const fileOffset of [-1, 1]) {
        const pawnFile = target.file + fileOffset;
        if (pawnFile >= 0 && pawnFile < 8 && enemyPawnRank >= 0 && enemyPawnRank < 8) {
          const pawn = game.get(coordsSquare(pawnFile, enemyPawnRank));
          if (pawn && pawn.color === byColor && pawn.type === "p") return true;
        }
      }
      const jumps = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];
      for (const [df, dr] of jumps) {
        const file = target.file + df;
        const rank = target.rank + dr;
        if (file < 0 || file >= 8 || rank < 0 || rank >= 8) continue;
        const piece = game.get(coordsSquare(file, rank));
        if (piece && piece.color === byColor && piece.type === "n") return true;
      }
      for (const df of [-1, 0, 1]) {
        for (const dr of [-1, 0, 1]) {
          if (!df && !dr) continue;
          const file = target.file + df;
          const rank = target.rank + dr;
          if (file < 0 || file >= 8 || rank < 0 || rank >= 8) continue;
          const piece = game.get(coordsSquare(file, rank));
          if (piece && piece.color === byColor && piece.type === "k") return true;
        }
      }
      const rays = [
        [1, 0, "rq"], [-1, 0, "rq"], [0, 1, "rq"], [0, -1, "rq"],
        [1, 1, "bq"], [1, -1, "bq"], [-1, 1, "bq"], [-1, -1, "bq"]
      ];
      for (const [df, dr, attackers] of rays) {
        let file = target.file + df;
        let rank = target.rank + dr;
        while (file >= 0 && file < 8 && rank >= 0 && rank < 8) {
          const piece = game.get(coordsSquare(file, rank));
          if (piece) {
            if (piece.color === byColor && attackers.includes(piece.type)) return true;
            break;
          }
          file += df;
          rank += dr;
        }
      }
      return false;
    }

    function checkedChessKingSquare(game) {
      if (!game) return "";
      const color = game.turn();
      const enemy = color === "w" ? "b" : "w";
      const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
      for (let rank = 1; rank <= 8; rank += 1) {
        for (const file of files) {
          const square = `${file}${rank}`;
          const piece = game.get(square);
          if (piece && piece.color === color && piece.type === "k") {
            return chessSquareAttackedBy(game, square, enemy) ? square : "";
          }
        }
      }
      return "";
    }

    function manualChessCastleMove(game, square, side) {
      const color = game.turn();
      const rank = color === "w" ? "1" : "8";
      const kingSquare = `e${rank}`;
      if (square !== kingSquare) return null;
      const king = game.get(kingSquare);
      if (!king || king.color !== color || king.type !== "k") return null;
      const rookSquare = `${side === "k" ? "h" : "a"}${rank}`;
      const rook = game.get(rookSquare);
      if (!rook || rook.color !== color || rook.type !== "r") return null;
      const between = side === "k" ? [`f${rank}`, `g${rank}`] : [`d${rank}`, `c${rank}`, `b${rank}`];
      if (between.some((pathSquare) => game.get(pathSquare))) return null;
      const enemy = color === "w" ? "b" : "w";
      const safeSquares = side === "k" ? [kingSquare, `f${rank}`, `g${rank}`] : [kingSquare, `d${rank}`, `c${rank}`];
      if (safeSquares.some((safeSquare) => chessSquareAttackedBy(game, safeSquare, enemy))) return null;
      return {
        from: kingSquare,
        to: `${side === "k" ? "g" : "c"}${rank}`,
        flags: side,
        piece: "k",
        color,
        manualCastle: true
      };
    }

    function manualChessCastleMoves(game, square) {
      return ["k", "q"].map((side) => manualChessCastleMove(game, square, side)).filter(Boolean);
    }

    function applyManualChessCastle(game, move) {
      const parts = game.fen().split(" ");
      const rows = expandFenBoard(parts[0]);
      const color = move.color || game.turn();
      const rank = color === "w" ? "1" : "8";
      const row = color === "w" ? 7 : 0;
      const kingside = String(move.flags || "").includes("k");
      rows[row][4] = "";
      rows[row][kingside ? 6 : 2] = color === "w" ? "K" : "k";
      rows[row][kingside ? 7 : 0] = "";
      rows[row][kingside ? 5 : 3] = color === "w" ? "R" : "r";
      parts[0] = compressFenBoard(rows);
      parts[1] = color === "w" ? "b" : "w";
      parts[2] = String(parts[2] || "-").replace(color === "w" ? /[KQ]/g : /[kq]/g, "") || "-";
      parts[3] = "-";
      parts[4] = String(Number(parts[4] || 0) + 1);
      if (color === "b") parts[5] = String(Number(parts[5] || 1) + 1);
      const fen = parts.join(" ");
      if (typeof game.load === "function") game.load(fen);
      return {
        color,
        from: move.from,
        to: move.to,
        flags: move.flags,
        piece: "k",
        san: kingside ? "O-O" : "O-O-O",
        fen
      };
    }

    function legalChessMoves(game, square, commandMove) {
      const moves = game.moves({ square, verbose: true });
      const movingRole = roleForChessColor(game.turn());
      if (!commandMove && square === state.chess.freezeSquare && movingRole === SUB) return [];
      const piece = game.get(square);
      let legalMoves = piece && piece.type === "k"
        ? [...moves, ...manualChessCastleMoves(game, square).filter((manualMove) => !moves.some((move) => move.to === manualMove.to))]
        : moves;
      if (!commandMove && movingRole === SUB && state.chess.queenShield && piece && piece.type === "p") {
        const queenSquare = findDomQueenSquare(game);
        legalMoves = legalMoves.filter((move) => move.to !== queenSquare);
      }
      if (!commandMove && movingRole === SUB && isQueenLeashedSquare(game, square, piece)) {
        const queenSquare = findDomQueenSquare(game);
        return legalMoves.filter((move) => move.to === queenSquare || isQueenLeashedSquare(game, move.to, piece));
      }
      return legalMoves;
    }

    function freezeChessSquare(square, piece) {
      if (!state.chess.freezeMode || !piece || piece.color !== colorForChessRole(SUB)) return;
      state.chess.freezeSquare = square;
      state.chess.freezeTurnsRemaining = 2;
      state.chess.charges = Math.max(0, state.chess.charges - 1);
      state.chess.freezeMode = false;
      addLog(`<strong>Freeze.</strong> ${state.names.dom} freezes one ${state.names.sub} piece for the next two ${state.names.sub} turns.`);
      render();
      publishState();
    }

    function chessFreezeAction() {
      if (state.currentGame !== "tributeChess" || !state.active || state.chess.charges < 1) return;
      if (!queenPowerControlsAllowed(localOnlineRole())) return;
      const game = chessEngine();
      if (!game || roleForChessColor(game.turn()) !== DOM) return;
      state.chess.freezeMode = true;
      state.chess.selected = null;
      state.chess.legalMoves = [];
      addLog(`<strong>Freeze ready.</strong> ${state.names.dom} can click one ${state.names.sub} piece.`);
      render();
      publishState();
    }

    function tickChessFreeze() {
      if (!state.chess.freezeSquare || state.chess.freezeTurnsRemaining <= 0) return;
      state.chess.freezeTurnsRemaining -= 1;
      if (state.chess.freezeTurnsRemaining <= 0) {
        state.chess.freezeSquare = null;
        state.chess.freezeTurnsRemaining = 0;
        addLog(`<strong>Freeze fades.</strong> ${state.names.sub}'s piece is free again.`);
      }
    }

    function chessDomPrimaryAction() {
      if (state.currentGame !== "tributeChess" || !state.active) return;
      if (!queenPowerControlsAllowed(localOnlineRole())) return;
      const game = chessEngine();
      if (!game) return;
      if (state.chess.commandMode || state.chess.freezeMode) return;
      if (roleForChessColor(game.turn()) === DOM && state.chess.charges >= 3) {
        state.chess.charges -= 3;
        state.chess.commandQueued = true;
        addLog(`<strong>Command Move queued.</strong> It will activate on ${state.names.sub}'s next turn.`);
        render();
        publishState();
        return;
      }
    }

    function chessSkipAction() {
      if (state.currentGame !== "tributeChess" || !state.active || state.chess.charges < 2) return;
      if (!queenPowerControlsAllowed(localOnlineRole())) return;
      const game = chessEngine();
      if (!game || roleForChessColor(game.turn()) !== DOM) return;
      if (state.chess.commandMode || state.chess.freezeMode) return;
      state.chess.charges -= 2;
      state.chess.skipQueued = true;
      addLog(`<strong>Skip queued.</strong> It will skip ${state.names.sub}'s next turn.`);
      render();
      publishState();
    }

    function chessRepositionAction() {
      if (state.currentGame !== "tributeChess" || !state.active || state.chess.charges < 1) return;
      const game = chessEngine();
      if (!canUseDomQueenPower(game)) return;
      if (!findDomQueenSquare(game)) return;
      state.chess.repositionMode = true;
      state.chess.selected = null;
      state.chess.legalMoves = [];
      addLog(`<strong>Reposition ready.</strong> ${state.names.dom} can move her queen to one adjacent empty square.`);
      render();
      publishState();
    }

    function repositionQueen(square, piece) {
      if (!state.chess.repositionMode || piece || state.chess.charges < 1) return;
      const game = chessEngine();
      if (!game || !state.active || !queenPowerControlsAllowed(localOnlineRole())) return;
      if (!(roleForChessColor(game.turn()) === DOM || state.chess.postDomPowerWindow)) return;
      const queenSquare = findDomQueenSquare(game);
      if (!areAdjacentSquares(queenSquare, square)) return;
      const parts = state.chess.fen.split(" ");
      const board = expandFenBoard(parts[0]);
      const from = squareCoords(queenSquare);
      const to = squareCoords(square);
      board[7 - from.rank][from.file] = "";
      board[7 - to.rank][to.file] = colorForChessRole(DOM) === "w" ? "Q" : "q";
      parts[0] = compressFenBoard(board);
      state.chess.fen = parts.join(" ");
      state.chess.charges = Math.max(0, state.chess.charges - 1);
      state.chess.repositionMode = false;
      state.chess.repositionUsed = true;
      addLog(`<strong>Reposition.</strong> ${state.names.dom}'s queen slides to ${square}.`);
      render();
      publishState();
    }

    function chessShieldAction() {
      if (state.currentGame !== "tributeChess" || !state.active || state.chess.charges < 2 || state.chess.queenShield) return;
      const game = chessEngine();
      if (!canUseDomQueenPower(game)) return;
      if (!findDomQueenSquare(game)) return;
      state.chess.charges -= 2;
      state.chess.queenShield = true;
      addLog(`<strong>Shield.</strong> ${state.names.dom}'s queen cannot be captured by pawns until ${state.names.dom}'s next turn.`);
      render();
      publishState();
    }

    function setQueenStance(stance) {
      if (!["none", "gaze", "tithe", "leash"].includes(stance)) return;
      if (!chessQueenStancesActive() || !state.active) return;
      if (!queenPowerControlsAllowed(localOnlineRole())) return;
      const game = chessEngine();
      if (!game || roleForChessColor(game.turn()) !== DOM) return;
      if (state.chess.freezeMode || state.chess.commandMode) return;
      state.chess.queenStance = stance;
      addLog(`<strong>Queen stance.</strong> ${state.names.dom}'s queen shifts to ${stanceLabel(stance)}.`);
      render();
      publishState();
    }

    function setChessFenTurn(color) {
      const parts = state.chess.fen.split(" ");
      if (parts.length >= 2) {
        parts[1] = color;
        state.chess.fen = parts.join(" ");
      }
    }

    function resolveChessAfterMove(game, movedRole) {
      if (isChessGameOver(game)) {
        if (isChessCheckmate(game)) {
          endChessMatch(movedRole, `${labelFor(movedRole)} delivers checkmate.`);
        } else if (state.mode === "reclaim") {
          endChessMatch(DOM, `Drawn positions go to ${state.names.dom} in reclaim.`);
        } else {
          endChessMatch("draw", "The game is drawn.");
        }
        return;
      }
      state.turn = roleForChessColor(game.turn());
      state.chess.postDomPowerWindow = movedRole === DOM && state.turn === SUB;
      if (state.turn === DOM) {
        state.chess.postDomPowerWindow = false;
        state.chess.repositionUsed = false;
        if (state.chess.queenShield) {
          state.chess.queenShield = false;
          addLog(`<strong>Shield fades.</strong> ${state.names.dom}'s queen can be captured by pawns again.`);
        }
      }
      state.chess.queenTriggerUsed = false;
      activateQueuedChessPowers();
      resetChessClockTick();
      render();
      publishState();
    }

    function activateQueuedChessPowers() {
      if (state.mode !== "reclaim" || state.turn !== SUB) return;
      if (state.chess.skipQueued) {
        state.chess.skipQueued = false;
        setChessFenTurn(colorForChessRole(DOM));
        state.turn = DOM;
        state.chess.postDomPowerWindow = false;
        state.chess.repositionUsed = false;
        if (state.chess.queenShield) {
          state.chess.queenShield = false;
          addLog(`<strong>Shield fades.</strong> ${state.names.dom}'s queen can be captured by pawns again.`);
        }
        state.chess.queenTriggerUsed = false;
        state.chess.freezeMode = false;
        state.chess.commandMode = false;
        addLog(`<strong>Skip.</strong> ${state.names.sub}'s turn is skipped. ${state.names.dom} moves again.`);
        resetChessClockTick();
        return;
      }
      if (state.chess.commandQueued) {
        state.chess.commandQueued = false;
        state.chess.commandMode = true;
        addLog(`<strong>Command Move active.</strong> ${state.names.dom} may move one legal ${state.names.sub} piece.`);
      }
    }

    function isChessGameOver(game) {
      if (typeof game.game_over === "function") return game.game_over();
      if (typeof game.isGameOver === "function") return game.isGameOver();
      return false;
    }

    function isChessCheckmate(game) {
      if (typeof game.in_checkmate === "function") return game.in_checkmate();
      if (typeof game.isCheckmate === "function") return game.isCheckmate();
      return false;
    }

    function endChessMatch(winner, reason) {
      state.active = false;
      const result = settleRoundBank(winner);
      if (result.outcome === "subReclaim") {
        addLog(`<strong>${state.names.sub} wins reclaim.</strong> ${reason} ${money(result.amount)} is taken back from ${state.names.dom}'s bank.`);
      } else if (result.outcome === "subNormal") {
        addLog(`<strong>${state.names.sub} wins.</strong> ${reason} Nothing enters ${state.names.dom}'s bank.`);
      } else if (result.outcome === "domReclaim") {
        addLog(`<strong>${state.names.dom} wins reclaim.</strong> ${reason} ${money(result.amount)} is added to her bank.`);
      } else if (result.outcome === "domNormal") {
        addLog(`<strong>${state.names.dom} wins.</strong> ${reason} ${money(result.amount)} moves into her bank.`);
      } else if (result.outcome === "domThrone") {
        addLog(`<strong>${state.names.sub} loses.</strong> ${reason} The Throne page opens automatically.`);
      } else {
        addLog(`<strong>Draw.</strong> ${reason}`);
      }
      state.pot = 0;
      render();
      publishState();
    }

    function startTwentyOneNormalMatch() {
      const bet = prepareRound("normal");
      if (bet === null) return;
      preserveTiltLevel(startTwentyOneSetup);
      finishRoundStart(`${normalRoundAmountIntro(bet)} ${state.names.dom} chooses the Blackjack settings.`, false);
    }

    function startTwentyOneReclaimMatch() {
      const pot = prepareRound("reclaim", "hand");
      if (pot === null) return;
      startTwentyOneSetup();
      finishRoundStart(`<strong>Reclaim table:</strong> ${state.names.sub} is trying to win back ${money(pot)} from ${state.names.dom}'s bank. ${state.names.dom} chooses the Blackjack settings.`, false);
    }

    function startTwentyOneSetup() {
      state.twentyOne = createTwentyOneState();
      state.twentyOne.setupPending = true;
      state.twentyOne.settings = { rounds: "single", powers: "on" };
      state.twentyOne.targetMarks = 1;
      state.twentyOne.marks = { dom: 0, sub: 0 };
      state.turn = DOM;
      state.active = true;
      render();
    }

    function blackjackPowersEnabled() {
      return Boolean(state.twentyOne && reclaimPerksActive() && domAdvantagesEnabled());
    }

    function setBlackjackRounds(rounds) {
      if (state.currentGame !== "tributeTwentyOne" || !state.twentyOne.setupPending) return;
      if (state.online.room && localOnlineRole() !== DOM) return;
      const format = blackjackRoundFormat(rounds);
      state.twentyOne.settings.rounds = format.id;
      state.twentyOne.targetMarks = format.target;
      render();
      publishState();
    }

    function confirmBlackjackSettings() {
      if (state.currentGame !== "tributeTwentyOne" || !state.twentyOne.setupPending) return;
      if (state.online.room && localOnlineRole() !== DOM) return;
      const format = blackjackRoundFormat(state.twentyOne.settings.rounds);
      state.twentyOne.setupPending = false;
      state.twentyOne.marks = { dom: 0, sub: 0 };
      state.twentyOne.settings.rounds = format.id;
      state.twentyOne.targetMarks = format.target;
      addLog(`<strong>Blackjack settings locked.</strong> ${format.label}.`);
      resetTwentyOneHand(true);
      publishState();
    }

    function startNextTwentyOneHand() {
      if (state.currentGame !== "tributeTwentyOne" || !state.twentyOne.nextHandPending) return;
      if (state.online.room && localOnlineRole() !== DOM) return;
      state.twentyOne.nextHandPending = false;
      resetTwentyOneHand(true);
      addLog(`<strong>Next hand.</strong> ${blackjackRoundFormat(state.twentyOne.settings.rounds).label} wins the table.`);
      publishState();
    }

    function resetTwentyOneHand(keepMatch = false) {
      const previous = keepMatch && state.twentyOne ? {
        settings: { ...(state.twentyOne.settings || { rounds: "single", powers: "on" }) },
        marks: { ...(state.twentyOne.marks || { dom: 0, sub: 0 }) },
        targetMarks: Number(state.twentyOne.targetMarks || 1),
        nextHandPending: Boolean(state.twentyOne.nextHandPending)
      } : null;
      state.twentyOne = createTwentyOneState();
      if (previous) {
        state.twentyOne.settings = previous.settings;
        state.twentyOne.marks = previous.marks;
        state.twentyOne.targetMarks = previous.targetMarks;
        state.twentyOne.nextHandPending = false;
      }
      state.twentyOne.deck = shuffleDeck(createTwentyOneDeck());
      state.twentyOne.hands.sub.push(drawTwentyOneCard());
      state.twentyOne.hands.dom.push(drawTwentyOneCard());
      state.twentyOne.hands.sub.push(drawTwentyOneCard());
      state.twentyOne.hands.dom.push(drawTwentyOneCard());
      state.twentyOne.revealDom = false;
      state.twentyOne.stood = false;
      state.twentyOne.dealerTurn = false;
      state.twentyOne.pushLuckPending = false;
      state.twentyOne.pushLuckQueued = false;
      state.twentyOne.pushLuckAvailable = blackjackPowersEnabled() && state.mode === "reclaim" && domAdvantagesEnabled() && state.tiltLevel >= 3;
      state.twentyOne.softSaveAvailable = blackjackPowersEnabled() && state.mode === "reclaim" && domAdvantagesEnabled() && state.tiltLevel >= 2;
      state.twentyOne.outcome = "";
      state.turn = SUB;
      state.active = true;
      render();
    }

    function createTwentyOneDeck() {
      const suits = ["S", "H", "D", "C"];
      const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
      const deck = [];
      suits.forEach((suit) => ranks.forEach((rank) => deck.push(`${rank}${suit}`)));
      return deck;
    }

    function createSolitaireState() {
      return {
        stock: [],
        waste: [],
        foundations: [[], [], [], []],
        tableau: [[], [], [], [], [], [], []],
        selected: null,
        moves: 0,
        started: false,
        initialDeal: null,
        undoStack: [],
        noMovesPrompt: false,
        message: "Build all four foundations from Ace to King."
      };
    }

    function createMemoryMatchState() {
      return {
        size: "4x3",
        cards: [],
        flipped: [],
        moves: 0,
        matches: 0,
        loading: false,
        locked: false,
        reveal: null,
        message: "Pick a size, then match every pair."
      };
    }

    function createBrainDrainSnapState() {
      return {
        status: "idle",
        previous: null,
        current: null,
        score: 0,
        streak: 0,
        iq: 3,
        round: 0,
        deadline: 0,
        roundMs: 5200,
        timeRatio: 1,
        loading: false,
        message: "Tap Snap when the new image matches the last category."
      };
    }

    function createDoubleSolitaireState() {
      return {
        boards: {
          sub: createSolitaireState(),
          dom: createSolitaireState()
        },
        viewed: SUB,
        winner: null,
        message: "Start a bet to deal both Klondike boards.",
        lastAction: ""
      };
    }

    function createCrazyEightsState() {
      return {
        deck: [],
        discard: [],
        hands: { sub: [], dom: [] },
        currentSuit: "S",
        pendingWild: null,
        winner: null,
        message: "Start a bet to deal Tribute 8s.",
        lastAction: "",
        drawnThisTurn: false
      };
    }

    function shuffleDeck(deck) {
      const copy = [...deck];
      for (let i = copy.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }

    function drawTwentyOneCard() {
      if (!state.twentyOne.deck.length) state.twentyOne.deck = shuffleDeck(createTwentyOneDeck());
      return state.twentyOne.deck.pop();
    }

    function resetCrazyEightsBoard() {
      state.crazyEights = createCrazyEightsState();
      state.active = false;
      state.turn = SUB;
      state.mode = "normal";
      state.pot = 0;
      state.winningCells = [];
    }

    function dealCrazyEights(firstTurn = SUB) {
      let deck = shuffleDeck(createTwentyOneDeck());
      const hands = { sub: [], dom: [] };
      for (let i = 0; i < 7; i += 1) {
        hands.sub.push(deck.pop());
        hands.dom.push(deck.pop());
      }
      let starter = deck.pop();
      while (starter && starter.slice(0, -1) === "8") {
        deck.unshift(starter);
        deck = shuffleDeck(deck);
        starter = deck.pop();
      }
      state.crazyEights = {
        ...createCrazyEightsState(),
        deck,
        discard: starter ? [starter] : [],
        hands,
        currentSuit: starter ? starter.slice(-1) : "S",
        message: `${labelFor(firstTurn)} starts. Match rank or suit, or play an 8 to choose suit.`,
        lastAction: starter ? `Opening card: ${rankName(starter.slice(0, -1))} of ${suitName(starter.slice(-1))}.` : "",
        drawnThisTurn: false
      };
      state.turn = firstTurn;
      state.active = true;
    }

    function startCrazyEightsNormalMatch() {
      const bet = prepareRound("normal", "Tribute 8s game");
      if (bet === null) return;
      const starter = chooseStartingPlayer();
      dealCrazyEights(starter);
      finishRoundStart(`${normalRoundAmountIntro(bet)} ${labelFor(starter)} takes the first Tribute 8s turn.`, false);
    }

    function startCrazyEightsReclaimMatch() {
      const pot = prepareRound("reclaim", "Tribute 8s game");
      if (pot === null) return;
      dealCrazyEights(DOM);
      finishRoundStart(`<strong>Reclaim game:</strong> ${state.names.sub} is trying to win back ${money(pot)} in Tribute 8s. ${state.names.dom} starts with control.`, false);
    }

    function crazyEightsTopCard(game = state.crazyEights) {
      return game && game.discard && game.discard[game.discard.length - 1] || null;
    }

    function crazyEightsCanPlay(card, game = state.crazyEights) {
      const top = crazyEightsTopCard(game);
      if (!card || !top) return false;
      const rank = card.slice(0, -1);
      return rank === "8" || rank === top.slice(0, -1) || card.slice(-1) === game.currentSuit;
    }

    function crazyEightsHasPlayable(player = state.turn) {
      const hand = state.crazyEights && state.crazyEights.hands && state.crazyEights.hands[player] || [];
      return hand.some((card) => crazyEightsCanPlay(card));
    }

    function drawCrazyEightsCard(player) {
      const game = state.crazyEights;
      if (!game.deck.length && game.discard.length > 1) {
        const top = game.discard.pop();
        game.deck = shuffleDeck(game.discard);
        game.discard = [top];
      }
      const card = game.deck.pop();
      if (card) game.hands[player].push(card);
      return card || null;
    }

    function crazyEightsAdvanceTurn(nextTurn) {
      state.turn = nextTurn;
      state.crazyEights.drawnThisTurn = false;
    }

    function finishCrazyEights(winner, reason) {
      state.crazyEights.winner = winner;
      state.crazyEights.message = reason;
      state.active = false;
      state.pendingWager = null;
      settleRoundBank(winner);
      addLog(`<strong>Tribute 8s ends.</strong> ${reason}`);
      render();
      publishState();
    }

    function applyCrazyEightsPlayedCard(player, card) {
      const game = state.crazyEights;
      const opponent = otherRole(player);
      const rank = card.slice(0, -1);
      const suit = card.slice(-1);
      game.discard.push(card);
      game.currentSuit = suit;
      game.drawnThisTurn = false;
      game.pendingWild = null;
      if (!game.hands[player].length) {
        finishCrazyEights(player, `${labelFor(player)} empties their hand.`);
        return;
      }
      if (rank === "2") {
        drawCrazyEightsCard(opponent);
        drawCrazyEightsCard(opponent);
        game.message = `${labelFor(opponent)} draws 2. ${labelFor(player)} keeps control.`;
        game.lastAction = `${labelFor(player)} played a 2 and trapped ${labelFor(opponent)} with two cards.`;
        crazyEightsAdvanceTurn(player);
      } else if (rank === "Q") {
        game.message = `${labelFor(player)} skips ${labelFor(opponent)} and plays again.`;
        game.lastAction = `${labelFor(player)} played a queen skip.`;
        crazyEightsAdvanceTurn(player);
      } else if (rank === "A") {
        drawCrazyEightsCard(opponent);
        if (player === DOM) {
          drawCrazyEightsCard(opponent);
          game.message = `Tribute Tax. ${labelFor(SUB)} draws 2 and ${labelFor(DOM)} keeps control.`;
          game.lastAction = `${labelFor(DOM)} played an ace and taxed ${labelFor(SUB)} for two cards.`;
          crazyEightsAdvanceTurn(DOM);
        } else {
          game.message = `Desperate Dodge. ${labelFor(DOM)} draws 1, then takes control.`;
          game.lastAction = `${labelFor(SUB)} played an ace to make ${labelFor(DOM)} draw one card.`;
          crazyEightsAdvanceTurn(DOM);
        }
      } else {
        game.message = `${labelFor(opponent)} to play. Match ${rankName(rank)} or ${suitName(game.currentSuit)}.`;
        game.lastAction = `${labelFor(player)} played ${rankName(rank)} of ${suitName(suit)}.`;
        crazyEightsAdvanceTurn(opponent);
      }
      render();
      publishState();
    }

    function playCrazyEightsCard(index) {
      if (state.currentGame !== "tributeCrazyEights" || !state.active || state.crazyEights.pendingWild) return;
      const role = localOnlineRole();
      if (role && role !== state.turn) return;
      const player = state.turn;
      const hand = state.crazyEights.hands[player] || [];
      const card = hand[index];
      if (!crazyEightsCanPlay(card)) {
        state.crazyEights.message = "That card does not match the rank, suit, or wild rule.";
        render();
        return;
      }
      if (card.slice(0, -1) === "8") {
        state.crazyEights.pendingWild = { player, index };
        state.crazyEights.message = `${labelFor(player)} played an 8. Choose the next suit.`;
        render();
        publishState();
        return;
      }
      hand.splice(index, 1);
      applyCrazyEightsPlayedCard(player, card);
    }

    function chooseCrazyEightsSuit(suit) {
      const game = state.crazyEights;
      if (state.currentGame !== "tributeCrazyEights" || !state.active || !game.pendingWild) return;
      const role = localOnlineRole();
      const player = game.pendingWild.player;
      if (role && role !== player) return;
      const hand = game.hands[player] || [];
      const card = hand.splice(Number(game.pendingWild.index), 1)[0];
      if (!card) {
        game.pendingWild = null;
        render();
        return;
      }
      game.discard.push(card);
      game.currentSuit = suit;
      game.pendingWild = null;
      game.drawnThisTurn = false;
      if (!hand.length) {
        finishCrazyEights(player, `${labelFor(player)} empties their hand with a wild 8.`);
        return;
      }
      const opponent = otherRole(player);
      game.message = `${labelFor(player)} calls ${suitName(suit)}. ${labelFor(opponent)} must match it or play another 8.`;
      game.lastAction = `${labelFor(player)} played an 8 and chose ${suitName(suit)}.`;
      crazyEightsAdvanceTurn(opponent);
      render();
      publishState();
    }

    function drawCrazyEightsTurnCard() {
      if (state.currentGame !== "tributeCrazyEights" || !state.active || state.crazyEights.pendingWild) return;
      const role = localOnlineRole();
      if (role && role !== state.turn) return;
      const player = state.turn;
      const card = drawCrazyEightsCard(player);
      state.crazyEights.drawnThisTurn = true;
      state.crazyEights.message = card
        ? `${labelFor(player)} draws a card${crazyEightsCanPlay(card) ? " and can play if it fits." : "."}`
        : "No cards left to draw.";
      state.crazyEights.lastAction = `${labelFor(player)} drew from the deck.`;
      if (!crazyEightsHasPlayable(player)) {
        const opponent = otherRole(player);
        state.crazyEights.message = `${labelFor(player)} has no play after drawing. ${labelFor(opponent)} takes the turn.`;
        crazyEightsAdvanceTurn(opponent);
      }
      render();
      publishState();
    }

    function handleCrazyEightsBoardClick(event) {
      if (state.currentGame !== "tributeCrazyEights") return;
      const suitButton = event.target.closest("[data-crazy8-suit]");
      if (suitButton) {
        chooseCrazyEightsSuit(suitButton.dataset.crazy8Suit);
        return;
      }
      const action = event.target.closest("[data-crazy8-action]");
      if (action && action.dataset.crazy8Action === "draw") {
        drawCrazyEightsTurnCard();
        return;
      }
      const cardButton = event.target.closest("[data-crazy8-card-index]");
      if (cardButton) {
        playCrazyEightsCard(Number(cardButton.dataset.crazy8CardIndex));
      }
    }

    function resetDoubleSolitaireBoard() {
      state.doubleSolitaire = createDoubleSolitaireState();
      state.active = false;
      state.turn = SUB;
      state.mode = "normal";
      state.pot = 0;
      state.winningCells = [];
    }

    function dealDoubleSolitaireBoard() {
      const deck = shuffleDeck(createTwentyOneDeck()).map((card) => ({ card, faceUp: false }));
      const tableau = [[], [], [], [], [], [], []];
      for (let column = 0; column < 7; column += 1) {
        for (let count = 0; count <= column; count += 1) {
          const next = deck.pop();
          next.faceUp = count === column;
          tableau[column].push(next);
        }
      }
      const board = {
        ...createSolitaireState(),
        stock: deck.map((entry) => entry.card),
        tableau,
        started: true,
        message: "Move cards freely. Drawing a stock card ends your turn."
      };
      board.initialDeal = solitaireSnapshot(board);
      return board;
    }

    function startDoubleSolitaireGame(firstTurn, introHtml) {
      localDoubleSolitaireViewed = null;
      state.doubleSolitaire = {
        ...createDoubleSolitaireState(),
        boards: {
          sub: dealDoubleSolitaireBoard(),
          dom: dealDoubleSolitaireBoard()
        },
        viewed: firstTurn,
        message: `${labelFor(firstTurn)} starts. Drawing a stock card passes control.`,
        lastAction: ""
      };
      state.turn = firstTurn;
      state.active = true;
      finishRoundStart(introHtml, false);
    }

    function startDoubleSolitaireNormalMatch() {
      const bet = prepareRound("normal", "Solitaire Duel race");
      if (bet === null) return;
      const starter = chooseStartingPlayer();
      startDoubleSolitaireGame(starter, `${normalRoundAmountIntro(bet)} ${labelFor(starter)} starts the Solitaire Duel race.`);
    }

    function startDoubleSolitaireReclaimMatch() {
      const pot = prepareRound("reclaim", "Solitaire Duel race");
      if (pot === null) return;
      startDoubleSolitaireGame(DOM, `<strong>Reclaim race:</strong> ${state.names.sub} is trying to win back ${money(pot)} in Solitaire Duel. ${state.names.dom} starts.`);
    }

    function localDoubleSolitaireViewedPlayer() {
      if (localDoubleSolitaireViewed === DOM || localDoubleSolitaireViewed === SUB) return localDoubleSolitaireViewed;
      const role = localOnlineRole();
      if (role === DOM || role === SUB) return role;
      return state.doubleSolitaire && state.doubleSolitaire.viewed === DOM ? DOM : SUB;
    }

    function doubleSolitaireBoard(player = localDoubleSolitaireViewedPlayer()) {
      return state.doubleSolitaire && state.doubleSolitaire.boards && state.doubleSolitaire.boards[player] || createSolitaireState();
    }

    function doubleSolitaireFoundationCount(player) {
      return (doubleSolitaireBoard(player).foundations || []).reduce((total, pile) => total + pile.length, 0);
    }

    function doubleSolitaireCanAct(player = state.turn) {
      const role = localOnlineRole();
      return state.currentGame === "doubleSolitaire"
        && state.active
        && state.turn === player
        && (!role || role === player);
    }

    function doubleSolitaireSelectionKey(selection) {
      if (!selection) return "";
      return `${selection.source}:${selection.column ?? ""}:${selection.index ?? ""}:${selection.foundation ?? ""}`;
    }

    function doubleSolitaireSelectedCards(player) {
      const board = doubleSolitaireBoard(player);
      const selection = board.selected;
      if (!selection) return [];
      if (selection.source === "waste") {
        const card = board.waste[board.waste.length - 1];
        return card ? [card] : [];
      }
      if (selection.source === "foundation") {
        const pile = board.foundations[selection.foundation] || [];
        const card = pile[pile.length - 1];
        return card ? [card] : [];
      }
      if (selection.source === "tableau") {
        return (board.tableau[selection.column] || []).slice(selection.index).filter((entry) => entry.faceUp).map((entry) => entry.card);
      }
      return [];
    }

    function canPlaceDoubleSolitaireOnTableau(board, cards, column) {
      if (!cards.length) return false;
      const moving = cards[0];
      const pile = board.tableau[column] || [];
      const top = pile[pile.length - 1];
      if (!top) return solitaireRank(moving) === 13;
      return top.faceUp
        && solitaireColor(top.card) !== solitaireColor(moving)
        && solitaireRank(top.card) === solitaireRank(moving) + 1;
    }

    function canPlaceDoubleSolitaireOnFoundation(board, cards, foundation) {
      if (cards.length !== 1) return false;
      const card = cards[0];
      if (solitaireFoundationIndex(card) !== foundation) return false;
      const pile = board.foundations[foundation] || [];
      const top = pile[pile.length - 1];
      return top ? solitaireRank(card) === solitaireRank(top) + 1 : solitaireRank(card) === 1;
    }

    function removeDoubleSolitaireSelectedCards(player) {
      const board = doubleSolitaireBoard(player);
      const selection = board.selected;
      if (!selection) return [];
      if (selection.source === "waste") {
        const card = board.waste.pop();
        return card ? [card] : [];
      }
      if (selection.source === "foundation") {
        const pile = board.foundations[selection.foundation] || [];
        const card = pile.pop();
        return card ? [card] : [];
      }
      if (selection.source === "tableau") {
        const pile = board.tableau[selection.column] || [];
        const moved = pile.splice(selection.index).map((entry) => entry.card);
        const newTop = pile[pile.length - 1];
        if (newTop && !newTop.faceUp) newTop.faceUp = true;
        return moved;
      }
      return [];
    }

    function maybeFinishDoubleSolitaire(player) {
      if (doubleSolitaireFoundationCount(player) < 52) return false;
      finishDoubleSolitaire(player, `${labelFor(player)} completes all four foundations.`);
      return true;
    }

    function finishDoubleSolitaire(winner, reason) {
      state.doubleSolitaire.winner = winner;
      state.doubleSolitaire.message = reason;
      state.active = false;
      state.pendingWager = null;
      settleRoundBank(winner);
      addLog(`<strong>Solitaire Duel ends.</strong> ${reason}`);
      render();
      publishState();
    }

    function doubleSolitaireGiveUpPlayer() {
      const role = localOnlineRole();
      if (role === DOM || role === SUB) return role;
      return localDoubleSolitaireViewedPlayer();
    }

    function giveUpDoubleSolitaire(player = doubleSolitaireGiveUpPlayer()) {
      if (state.currentGame !== "doubleSolitaire" || !state.active || (player !== DOM && player !== SUB)) return;
      const role = localOnlineRole();
      if (role && role !== player) return;
      if (player === DOM) {
        const message = `${labelFor(DOM)} ends the Solitaire Duel race.`;
        resetDoubleSolitaireBoard();
        applyDefaultBet();
        state.normalReplayPrompt = null;
        state.pendingWager = null;
        localDoubleSolitaireViewed = null;
        state.doubleSolitaire.message = "Start a bet to deal both Klondike boards.";
        addLog(`<strong>Solitaire Duel reset.</strong> ${message}`);
        render();
        publishState();
        return;
      }
      finishDoubleSolitaire(DOM, `${labelFor(SUB)} gives up. ${labelFor(DOM)} claims the race.`);
    }

    function passDoubleSolitaireTurn(player, actionText) {
      const next = otherRole(player);
      state.turn = next;
      state.doubleSolitaire.message = `${labelFor(next)} takes the turn.`;
      state.doubleSolitaire.lastAction = actionText;
      Object.values(state.doubleSolitaire.boards || {}).forEach((board) => {
        if (board) board.selected = null;
      });
    }

    function selectDoubleSolitaireSource(player, selection) {
      if (!doubleSolitaireCanAct(player)) return;
      const board = doubleSolitaireBoard(player);
      const cards = doubleSolitaireSelectedCards(player);
      const nextCards = (() => {
        if (selection.source === "waste") {
          const card = board.waste[board.waste.length - 1];
          return card ? [card] : [];
        }
        if (selection.source === "foundation") {
          const pile = board.foundations[selection.foundation] || [];
          const card = pile[pile.length - 1];
          return card ? [card] : [];
        }
        if (selection.source === "tableau") {
          return (board.tableau[selection.column] || []).slice(selection.index).filter((entry) => entry.faceUp).map((entry) => entry.card);
        }
        return [];
      })();
      if (!nextCards.length) return;
      const current = doubleSolitaireSelectionKey(board.selected);
      const next = doubleSolitaireSelectionKey(selection);
      board.selected = current === next ? null : selection;
      state.doubleSolitaire.message = board.selected
        ? `${labelFor(player)} selected ${nextCards.length > 1 ? `${nextCards.length} cards` : nextCards[0]}.`
        : "Selection cleared.";
      render();
      publishState();
      void cards;
    }

    function moveDoubleSolitaireToTableau(player, column) {
      if (!doubleSolitaireCanAct(player)) return;
      const board = doubleSolitaireBoard(player);
      const cards = doubleSolitaireSelectedCards(player);
      if (!board.selected || !canPlaceDoubleSolitaireOnTableau(board, cards, column)) {
        state.doubleSolitaire.message = "That card cannot be placed there.";
        render();
        return;
      }
      const source = board.selected.source;
      const moved = removeDoubleSolitaireSelectedCards(player);
      board.tableau[column].push(...moved.map((card) => ({ card, faceUp: true })));
      board.selected = null;
      board.moves += 1;
      state.doubleSolitaire.message = source === "waste"
        ? `${labelFor(player)} moved from waste to tableau.`
        : `${labelFor(player)} moved to tableau.`;
      render();
      publishState();
    }

    function moveDoubleSolitaireToFoundation(player, foundation) {
      if (!doubleSolitaireCanAct(player)) return;
      const board = doubleSolitaireBoard(player);
      const cards = doubleSolitaireSelectedCards(player);
      const target = solitaireFoundationTarget(cards, foundation);
      if (!board.selected || !canPlaceDoubleSolitaireOnFoundation(board, cards, target)) {
        state.doubleSolitaire.message = "That card cannot go to that foundation.";
        render();
        return;
      }
      const source = board.selected.source;
      const moved = removeDoubleSolitaireSelectedCards(player);
      board.foundations[target].push(moved[0]);
      board.selected = null;
      board.moves += 1;
      if (maybeFinishDoubleSolitaire(player)) return;
      state.doubleSolitaire.message = source === "waste"
        ? `${labelFor(player)} built a foundation from waste.`
        : `${labelFor(player)} built a foundation.`;
      render();
      publishState();
    }

    function drawDoubleSolitaireStock(player) {
      if (!doubleSolitaireCanAct(player)) return;
      const board = doubleSolitaireBoard(player);
      board.selected = null;
      if (board.stock.length) {
        board.waste.push(board.stock.pop());
        board.message = "Card drawn.";
        passDoubleSolitaireTurn(player, `${labelFor(player)} drew from stock.`);
      } else if (board.waste.length) {
        board.stock = board.waste.reverse();
        board.waste = [];
        state.doubleSolitaire.message = `${labelFor(player)} recycled their waste into stock and keeps the turn.`;
        state.doubleSolitaire.lastAction = `${labelFor(player)} reset their stock.`;
      } else {
        state.doubleSolitaire.message = "No cards left in stock.";
      }
      render();
      publishState();
    }

    function viewDoubleSolitaireBoard(player) {
      if (player !== DOM && player !== SUB) return;
      localDoubleSolitaireViewed = player;
      render();
    }

    function handleDoubleSolitaireBoardClick(event) {
      if (state.currentGame !== "doubleSolitaire") return;
      const viewButton = event.target.closest("[data-double-solitaire-view]");
      if (viewButton) {
        viewDoubleSolitaireBoard(viewButton.dataset.doubleSolitaireView);
        return;
      }
      const viewed = localDoubleSolitaireViewedPlayer();
      const action = event.target.closest("[data-double-solitaire-action]");
      if (action && action.dataset.doubleSolitaireAction === "give-up") {
        giveUpDoubleSolitaire(action.dataset.doubleSolitairePlayer || doubleSolitaireGiveUpPlayer());
        return;
      }
      if (action && action.dataset.doubleSolitaireAction === "stock") {
        drawDoubleSolitaireStock(viewed);
        return;
      }
      const sourceTarget = event.target.closest("[data-double-solitaire-source]");
      if (sourceTarget) {
        const source = sourceTarget.dataset.doubleSolitaireSource;
        if (source === "waste") {
          selectDoubleSolitaireSource(viewed, { source: "waste" });
          return;
        }
        if (source === "foundation") {
          const foundation = Number(sourceTarget.dataset.foundationIndex);
          const selection = { source: "foundation", foundation };
          const board = doubleSolitaireBoard(viewed);
          if (doubleSolitaireSelectionKey(board.selected) === doubleSolitaireSelectionKey(selection)) selectDoubleSolitaireSource(viewed, selection);
          else if (board.selected) moveDoubleSolitaireToFoundation(viewed, foundation);
          else selectDoubleSolitaireSource(viewed, selection);
          return;
        }
        if (source === "tableau") {
          const column = Number(sourceTarget.dataset.tableauColumn);
          const index = Number(sourceTarget.dataset.cardIndex);
          const selection = { source: "tableau", column, index };
          const board = doubleSolitaireBoard(viewed);
          if (doubleSolitaireSelectionKey(board.selected) === doubleSolitaireSelectionKey(selection)) selectDoubleSolitaireSource(viewed, selection);
          else if (board.selected) moveDoubleSolitaireToTableau(viewed, column);
          else selectDoubleSolitaireSource(viewed, selection);
          return;
        }
      }
      const location = event.target.closest("[data-double-solitaire-location]");
      if (!location) return;
      const board = doubleSolitaireBoard(viewed);
      if (!board.selected) return;
      if (location.dataset.doubleSolitaireLocation === "foundation") {
        moveDoubleSolitaireToFoundation(viewed, Number(location.dataset.foundationIndex));
      } else if (location.dataset.doubleSolitaireLocation === "tableau") {
        moveDoubleSolitaireToTableau(viewed, Number(location.dataset.tableauColumn));
      }
    }

    const HIGHER_LOWER_DEFAULT_TARGET = 15;
    const HIGHER_LOWER_MIN_TARGET = 1;
    const HIGHER_LOWER_MAX_TARGET = 50;
    const HIGHER_LOWER_WRONG_STEP = 5;
    const HIGHER_LOWER_PULSE_SECONDS = 10;

    function higherLowerTarget(value) {
      const target = Math.round(Number(value || HIGHER_LOWER_DEFAULT_TARGET));
      return Math.max(HIGHER_LOWER_MIN_TARGET, Math.min(HIGHER_LOWER_MAX_TARGET, target));
    }

    function higherLowerCashOutPayout(game = state.higherLower) {
      const streak = Number(game && game.streak || 0);
      const target = higherLowerTarget(game && game.targetStreak);
      return streak >= target ? Number(game && game.pendingOwed || 0) : 0;
    }

    function higherLowerDomPossibleWin(game = state.higherLower) {
      return Number(game && game.pendingOwed || 0);
    }

    function higherLowerEndAmount(overrideAmount = null) {
      if (overrideAmount !== null && overrideAmount !== undefined) return normalizeBuyIn(Number(overrideAmount));
      return Math.max(0, Math.round(higherLowerDomPossibleWin()));
    }

    function settleHigherLowerPulse(publish = false) {
      const game = state.higherLower;
      if (!game || !game.pulseActive || !game.pulseStartedAt) return 0;
      const elapsed = Math.min(HIGHER_LOWER_PULSE_SECONDS, Math.max(0, Math.floor((Date.now() - Number(game.pulseStartedAt || 0)) / 1000)));
      const alreadyAdded = Number(game.pulseAdded || 0);
      const add = Math.max(0, elapsed - alreadyAdded);
      if (add > 0) {
        game.pendingOwed = Number(game.pendingOwed || 0) + add;
        game.pulseAdded = alreadyAdded + add;
      }
      if (game.pulseAdded >= HIGHER_LOWER_PULSE_SECONDS) game.pulseActive = false;
      if (add > 0 && publish) {
        render();
        publishState();
      }
      return add;
    }

    function higherLowerDomControlsAllowed(role = localOnlineRole()) {
      if (role === SPECTATOR) return false;
      return !role || role === DOM;
    }

    function higherLowerCanSubAct() {
      return state.active
        && !state.higherLower.powerMenuOpen
        && (!localOnlineRole() || localOnlineRole() === SUB);
    }

    function higherLowerUpcomingCards(count = 3) {
      const deck = state.higherLower && state.higherLower.deck || [];
      const cards = [];
      for (let i = 1; i <= count; i += 1) {
        const card = deck[deck.length - i];
        if (card) cards.push(card);
      }
      return cards;
    }

    function higherLowerSetUpcomingCards(cards) {
      if (!state.higherLower.deck.length) state.higherLower.deck = shuffleDeck(createTwentyOneDeck());
      const wanted = cards.filter(Boolean);
      const wantedSet = new Set(wanted);
      const remaining = state.higherLower.deck.filter((card) => !wantedSet.has(card));
      while (remaining.length < wanted.length) {
        const fallback = shuffleDeck(createTwentyOneDeck()).find((card) => !wantedSet.has(card));
        if (!fallback) break;
        remaining.unshift(fallback);
      }
      state.higherLower.deck = [
        ...remaining,
        ...wanted.slice().reverse()
      ];
    }

    function higherLowerCardFromParts(rank, suit) {
      const safeRank = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"].includes(rank) ? rank : "A";
      const safeSuit = ["S", "H", "D", "C"].includes(suit) ? suit : "S";
      return `${safeRank}${safeSuit}`;
    }

    function toggleHigherLowerPowerMenu(forceOpen = null) {
      if (state.currentGame !== "higherLower" || !state.active) return;
      if (!higherLowerDomControlsAllowed()) return;
      if (Number(state.higherLower.powerCharges || 0) <= 0 && forceOpen !== false) return;
      state.higherLower.powerMenuOpen = forceOpen === null ? !state.higherLower.powerMenuOpen : Boolean(forceOpen);
      state.higherLower.fateMessage = state.higherLower.powerMenuOpen
        ? `${state.names.dom} is choosing their fate.`
        : "";
      render();
      publishState();
    }

    function consumeHigherLowerPower() {
      if (!state.higherLower || Number(state.higherLower.powerCharges || 0) <= 0) return false;
      state.higherLower.powerCharges = Math.max(0, Number(state.higherLower.powerCharges || 0) - 1);
      state.higherLower.powerMenuOpen = false;
      return true;
    }

    function useHigherLowerPower(power, options = {}) {
      if (state.currentGame !== "higherLower" || !state.active) return;
      if (!higherLowerDomControlsAllowed()) return;
      if (!consumeHigherLowerPower()) return;
      if (power === "hide") {
        state.higherLower.hideNextCard = true;
        state.higherLower.fateMessage = "The next card will be hidden. Good luck loser~";
        addLog(`<strong>${state.names.dom} hides the next card.</strong> Good luck loser~`);
      } else if (power === "fix") {
        const first = higherLowerCardFromParts(options.rank1, options.suit1);
        const second = higherLowerCardFromParts(options.rank2, options.suit2);
        higherLowerSetUpcomingCards([first, second]);
        state.higherLower.fateMessage = `${state.names.dom} stacks the next two cards.`;
        addLog(`<strong>${state.names.dom} fixes fate.</strong> The next two cards are chosen.`);
      } else if (power === "suit") {
        state.higherLower.suitCallPending = true;
        state.higherLower.fateMessage = `${state.names.sub} must call the next suit.`;
        addLog(`<strong>${state.names.dom} changes the call.</strong> ${state.names.sub} must pick the next suit.`);
      } else if (power === "pulse") {
        state.higherLower.pulseActive = true;
        state.higherLower.pulseStartedAt = Date.now();
        state.higherLower.pulseAdded = 0;
        state.higherLower.fateMessage = "Tribute Pulse is ticking. Every second adds to owed.";
        addLog(`<strong>${state.names.dom} starts Tribute Pulse.</strong> Every second adds ${money(1)} to the owed counter.`);
      }
      render();
      publishState();
    }

    function setHigherLowerGiveUpDraft(amount) {
      if (!state.higherLower) return;
      state.higherLower.giveUpDraftAmount = normalizeBuyIn(Number(amount));
      render();
    }

    function offerHigherLowerGiveUp(amount) {
      if (state.currentGame !== "higherLower" || !state.active) return;
      if (!higherLowerDomControlsAllowed()) return;
      settleHigherLowerPulse(false);
      const offerAmount = normalizeBuyIn(Number(amount || state.higherLower.giveUpDraftAmount || higherLowerDomPossibleWin() || 5));
      state.higherLower.giveUpDraftAmount = offerAmount;
      state.higherLower.giveUpOffer = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        amount: offerAmount,
        createdAt: Date.now()
      };
      state.higherLower.fateMessage = `${state.names.dom} offers to let ${state.names.sub} give up for ${money(offerAmount)}.`;
      addLog(`<strong>${state.names.dom} offers give up.</strong> ${state.names.sub} can end the run for ${money(offerAmount)}.`);
      render();
      publishState();
    }

    function cancelHigherLowerGiveUp() {
      if (state.currentGame !== "higherLower" || !state.higherLower) return;
      const role = localOnlineRole();
      if (role === SPECTATOR) return;
      state.higherLower.giveUpOffer = null;
      state.higherLower.fateMessage = "";
      addLog(`<strong>Give up offer closed.</strong> The Higher / Lower run continues.`);
      render();
      publishState();
    }

    function acceptHigherLowerGiveUp() {
      if (state.currentGame !== "higherLower" || !state.active || !state.higherLower.giveUpOffer) return;
      if (localOnlineRole() && localOnlineRole() !== SUB) return;
      const amount = normalizeBuyIn(Number(state.higherLower.giveUpOffer.amount || 1));
      state.higherLower.giveUpOffer = null;
      endHigherLower(DOM, `${state.names.sub} gives up for ${money(amount)}.`, amount);
    }

    function startHigherLowerNormalMatch() {
      const target = higherLowerTarget(state.higherLower && state.higherLower.queuedTargetStreak);
      state.pot = 0;
      state.mode = "normal";
      state.winningCells = [];
      state.normalReplayPrompt = null;
      state.settings.focusTax = { active: false, uses: 0 };
      state.lossPressure = createLossPressureState();
      state.higherLower = createHigherLowerState();
      state.higherLower.queuedTargetStreak = target;
      state.higherLower.targetStreak = target;
      state.higherLower.baseTribute = 0;
      state.higherLower.deck = shuffleDeck(createTwentyOneDeck());
      state.higherLower.currentCard = drawHigherLowerCard();
      state.turn = SUB;
      state.active = true;
      finishRoundStart(`<strong>Higher / Lower started.</strong> ${state.names.sub} must call ${target} cards right in a row to cash out. Wrong calls start at ${money(1)} owed.`);
    }

    function drawHigherLowerCard() {
      if (!state.higherLower.deck.length) state.higherLower.deck = shuffleDeck(createTwentyOneDeck());
      return state.higherLower.deck.pop();
    }

    function higherLowerCardValue(card) {
      const rank = String(card || "").slice(0, -1);
      if (rank === "A") return 14;
      if (rank === "K") return 13;
      if (rank === "Q") return 12;
      if (rank === "J") return 11;
      return Number(rank || 0);
    }

    function higherLowerGuess(direction) {
      if (state.currentGame !== "higherLower" || !state.active || !state.higherLower.currentCard) return;
      if (!higherLowerCanSubAct()) return;
      const pulseAdded = settleHigherLowerPulse(false);
      resolveFocusTaxSuccess();
      const previous = state.higherLower.currentCard;
      const shouldHideDrawnCard = Boolean(state.higherLower.hideNextCard);
      const next = drawHigherLowerCard();
      const previousValue = higherLowerCardValue(previous);
      const nextValue = higherLowerCardValue(next);
      const suitCall = Boolean(state.higherLower.suitCallPending);
      const actual = suitCall
        ? next.slice(-1)
        : (nextValue > previousValue ? "higher" : (nextValue < previousValue ? "lower" : "same"));
      state.higherLower.lastCard = previous;
      state.higherLower.currentCard = next;
      state.higherLower.hideCurrentCard = shouldHideDrawnCard;
      state.higherLower.hideNextCard = false;
      state.higherLower.suitCallPending = false;
      state.higherLower.fateMessage = shouldHideDrawnCard
        ? "Good luck loser~"
        : "";
      if (direction === actual) {
        const gain = 1;
        state.higherLower.wrongStreak = 0;
        state.higherLower.streak += gain;
        state.higherLower.bestStreak = Math.max(state.higherLower.bestStreak, state.higherLower.streak);
        const target = higherLowerTarget(state.higherLower.targetStreak);
        const milestone = Math.floor(Number(state.higherLower.streak || 0) / 5);
        const previousMilestone = Number(state.higherLower.lastPowerMilestone || 0);
        if (milestone > previousMilestone) {
          const gained = milestone - previousMilestone;
          state.higherLower.powerCharges = Number(state.higherLower.powerCharges || 0) + gained;
          state.higherLower.lastPowerMilestone = milestone;
          addLog(`<strong>${state.names.dom} gains ${gained === 1 ? "a power" : `${gained} powers`}.</strong> ${state.names.sub} reached a ${state.higherLower.streak}-card streak.`);
        }
        const actualText = suitCall ? suitName(actual) : actual;
        const pulseText = pulseAdded ? ` Tribute Pulse added ${money(pulseAdded)}.` : "";
        state.higherLower.result = shouldHideDrawnCard
          ? `The hidden card was ${suitCall ? `a ${actualText}` : actualText}. Streak ${state.higherLower.streak}. ${state.higherLower.streak >= target ? "Cash out reached." : `Cash out unlocks at ${target}.`}`
          : (suitCall
            ? `${rankName(next.slice(0, -1))} of ${suitName(actual)} was the next card. Streak ${state.higherLower.streak}. ${state.higherLower.streak >= target ? "Cash out reached." : `Cash out unlocks at ${target}.`}`
            : `${rankName(next.slice(0, -1))} was ${actualText}. Streak ${state.higherLower.streak}. ${state.higherLower.streak >= target ? "Cash out reached." : `Cash out unlocks at ${target}.`}`);
        state.higherLower.result += pulseText;
        addLog(`<strong>Correct.</strong> ${state.names.sub} called ${suitCall ? suitName(direction) : direction}. Streak ${state.higherLower.streak}.`);
        if (state.higherLower.streak >= target) {
          endHigherLower(SUB, `${state.names.sub} reaches the ${target}-card cash-out streak.`);
          return;
        }
        render();
        publishState();
        return;
      }
      state.higherLower.streak = 0;
      state.higherLower.lastPowerMilestone = 0;
      state.higherLower.wrongStreak = Number(state.higherLower.wrongStreak || 0) + 1;
      state.higherLower.totalWrongs = Number(state.higherLower.totalWrongs || 0) + 1;
      const penalty = Number(state.higherLower.wrongPenalty || 1);
      state.higherLower.pendingOwed = Number(state.higherLower.pendingOwed || 0) + penalty;
      const leveledUp = state.higherLower.wrongStreak % HIGHER_LOWER_WRONG_STEP === 0;
      if (leveledUp) {
        state.higherLower.wrongPenalty = penalty + 1;
      }
      const owed = higherLowerDomPossibleWin();
      const wrongActual = suitCall ? suitName(actual) : actual;
      const pulseText = pulseAdded ? ` Tribute Pulse added ${money(pulseAdded)}.` : "";
      state.higherLower.result = `${shouldHideDrawnCard ? "The hidden card" : rankName(next.slice(0, -1))} was ${suitCall ? `a ${wrongActual}` : wrongActual}. Wrong streak ${state.higherLower.wrongStreak}. ${money(penalty)} added to the owed counter${leveledUp ? `, and wrong calls now add ${money(state.higherLower.wrongPenalty)}.` : "."}${pulseText}`;
      addLog(`<strong>Wrong.</strong> ${state.names.sub} called ${suitCall ? suitName(direction) : direction}, but the card was ${suitCall ? wrongActual : actual}. Pending owed rises to ${money(owed)}${leveledUp ? `; wrong calls now add ${money(state.higherLower.wrongPenalty)}.` : "."}${pulseText}`);
      triggerSubLossPressure({
        weight: 1,
        message: true,
        messageThreshold: 5,
        strengthBoost: leveledUp ? 0.08 : 0,
        source: "higher-lower-wrong"
      });
      render();
      publishState();
    }

    function cashOutHigherLower() {
      if (state.currentGame !== "higherLower" || !state.active) return;
      if (localOnlineRole() && localOnlineRole() !== SUB) return;
      if (Number(state.higherLower.streak || 0) < higherLowerTarget(state.higherLower.targetStreak)) return;
      endHigherLower(SUB, `${state.names.sub} cashes out at streak ${state.higherLower.streak}.`);
    }

    function collectHigherLowerDomWin() {
      if (state.currentGame !== "higherLower" || !state.active) return;
      if (!higherLowerDomControlsAllowed()) return;
      settleHigherLowerPulse(false);
      if (Number(state.higherLower.pendingOwed || 0) <= 0) return;
      endHigherLower(DOM, `${state.names.dom} collects the pending owed counter.`);
    }

    function begHigherLowerMercy() {
      return false;
    }

    function decideHigherLowerMercy(choice) {
      return false;
    }

    function queueHigherLowerReplayPrompt(winner, amount = 0) {
      const outcome = winner === DOM
        ? (isThroneSession() ? "domThrone" : "domNormal")
        : (winner === SUB ? "subNormal" : "draw");
      queueBankReplayPrompt({ outcome, amount });
    }

    function endHigherLower(winner, reason, amountOverride = null) {
      state.higherLower.winner = winner;
      state.active = false;
      state.higherLower.pulseActive = false;
      state.higherLower.powerMenuOpen = false;
      if (winner === DOM) {
        triggerSubRoundLossPressure(2);
        const amount = higherLowerEndAmount(amountOverride);
        const usedOffer = amountOverride !== null && amountOverride !== undefined;
        if (isThroneSession()) {
          const before = state.domVault;
          state.settings.pendingThroneDemand = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            game: "Higher / Lower",
            amount,
            createdAt: Date.now()
          };
          recordLedgerEvent({
            type: "demand",
            label: "Higher / Lower Throne Opened",
            detail: `${state.names.dom} ${usedOffer ? "accepts the give-up price" : "collects the Higher / Lower owed counter"}. The Throne page opens automatically.`,
            delta: 0,
            before,
            after: state.domVault
          });
          demandPayment({ automatic: true });
          addLog(`<strong>${state.names.dom} collects Higher / Lower.</strong> ${reason}`);
          showOutcomeSplash({ tone: "dom", kicker: "Throne Opened", title: `${state.names.dom} gets paid`, detail: `${state.names.sub}'s Throne page opens for ${money(roundThroneTributeAmount(amount))}.` });
          queueHigherLowerReplayPrompt(winner, amount);
          state.pot = 0;
          render();
          publishState();
          return;
        }
        const before = state.domVault;
        state.domVault += amount;
        state.lockedTribute = state.domVault;
        recordLedgerEvent({
          type: "tribute",
          label: "Higher / Lower Break",
          detail: `${state.names.dom} ${usedOffer ? "accepts the give-up price" : "collects the Higher / Lower owed counter"}.`,
          delta: state.domVault - before,
          before,
          after: state.domVault
        });
        addLog(`<strong>${state.names.dom} collects the run.</strong> ${reason} ${money(amount)} moves into her bank.`);
        showOutcomeSplash({ tone: "dom", kicker: "Collected", title: `${state.names.dom} collects`, detail: `${money(amount)} added to her bank.` });
      } else if (winner === SUB) {
        const before = state.domVault;
        state.lockedTribute = state.domVault;
        recordLedgerEvent({
          type: "reclaim",
          label: "Higher / Lower Cash Out",
          detail: `${state.names.sub} reaches the target streak and escapes the pending owed counter.`,
          delta: state.domVault - before,
          before,
          after: state.domVault
        });
        addLog(`<strong>${state.names.sub} cashes out.</strong> ${reason} Pending owed is wiped before ${state.names.dom} can collect.`);
        showOutcomeSplash({ tone: "sub", kicker: "Cashed Out", title: `${state.names.sub} escapes`, detail: `${state.names.dom}'s bank stays unchanged.` });
      } else {
        addLog(`<strong>Higher / Lower ends.</strong> ${reason}`);
      }
      queueHigherLowerReplayPrompt(winner);
      state.pot = 0;
      render();
      publishState();
    }

    function hitTwentyOne() {
      if (state.currentGame !== "tributeTwentyOne" || !state.active) return;
      if (state.turn === SUB) {
        if (localOnlineRole() && localOnlineRole() !== SUB) return;
        resolveFocusTaxSuccess();
        state.twentyOne.hands.sub.push(drawTwentyOneCard());
        addLog(`<strong>${state.names.sub} hits.</strong>`);
        if (twentyOneScore(state.twentyOne.hands.sub).bust) {
          state.twentyOne.revealDom = true;
          endTwentyOneHand(DOM, `${state.names.sub} busts.`);
          return;
        }
      } else if (state.turn === DOM && state.twentyOne.pushLuckPending) {
        pushTwentyOneLuck();
        return;
      } else if (state.turn === DOM && state.twentyOne.dealerTurn) {
        if (localOnlineRole() && localOnlineRole() !== DOM) return;
        state.twentyOne.hands.dom.push(drawTwentyOneCard());
        addLog(`<strong>${state.names.dom} hits the dealer hand.</strong>`);
        const domScore = twentyOneScore(state.twentyOne.hands.dom);
        if (domScore.bust) {
          if (state.twentyOne.softSaveAvailable && domScore.total <= 24) {
            state.twentyOne.softSaveAvailable = false;
            endTwentyOneHand(DOM, `Soft Save catches ${state.names.dom}'s ${domScore.total} and treats it as 21.`);
            return;
          }
          endTwentyOneHand(SUB, `${state.names.dom} busts.`);
          return;
        }
      } else {
        return;
      }
      render();
      publishState();
    }

    function standTwentyOne() {
      if (state.currentGame !== "tributeTwentyOne" || !state.active) return;
      if (state.turn === SUB) {
        if (localOnlineRole() && localOnlineRole() !== SUB) return;
        resolveFocusTaxSuccess();
        state.twentyOne.stood = true;
        state.turn = DOM;
        if (canOfferTwentyOnePushLuck()) {
          state.twentyOne.pushLuckPending = true;
          if (state.twentyOne.pushLuckQueued) {
            addLog(`<strong>${state.names.sub} stands.</strong> ${state.names.dom}'s queued Push Your Luck triggers.`);
            pushTwentyOneLuck(true);
            return;
          }
          addLog(`<strong>${state.names.sub} stands.</strong> ${state.names.dom} may Push Your Luck.`);
        } else {
          state.twentyOne.revealDom = true;
          state.twentyOne.dealerTurn = true;
          addLog(`<strong>${state.names.sub} stands.</strong> ${state.names.dom} takes the dealer turn.`);
        }
        render();
        publishState();
        return;
      }
      if (state.turn === DOM && state.twentyOne.pushLuckPending) {
        declineTwentyOnePushLuck();
        return;
      }
      if (state.turn === DOM && state.twentyOne.dealerTurn) {
        if (localOnlineRole() && localOnlineRole() !== DOM) return;
        const standAt = twentyOneDealerStandMinimum();
        const domScore = twentyOneScore(state.twentyOne.hands.dom);
        if (domScore.total < standAt) {
          addLog(`<strong>${state.names.dom} cannot stand yet.</strong> Dealer hand must reach ${standAt}.`);
          render();
          publishState();
          return;
        }
        addLog(`<strong>${state.names.dom} stands.</strong>`);
        settleTwentyOneDealerHand();
      }
    }

    function canOfferTwentyOnePushLuck() {
      return state.currentGame === "tributeTwentyOne"
        && state.active
        && state.mode === "reclaim"
        && domAdvantagesEnabled()
        && blackjackPowersEnabled()
        && state.tiltLevel >= 3
        && state.twentyOne.pushLuckAvailable;
    }

    function pushTwentyOneLuck(fromQueued = false) {
      if (!state.twentyOne.pushLuckPending || !canOfferTwentyOnePushLuck()) return;
      if (!fromQueued && !domAdvantageControlsAllowed(localOnlineRole())) return;
      state.twentyOne.pushLuckPending = false;
      state.twentyOne.pushLuckQueued = false;
      state.twentyOne.pushLuckAvailable = false;
      state.twentyOne.hands.sub.push(drawTwentyOneCard());
      addLog(`<strong>Push Your Luck.</strong> ${state.names.dom} makes ${state.names.sub} take one more card.`);
      if (twentyOneScore(state.twentyOne.hands.sub).bust) {
        state.twentyOne.revealDom = true;
        endTwentyOneHand(DOM, `${state.names.sub} busts after being pushed.`);
        return;
      }
      state.twentyOne.revealDom = true;
      state.twentyOne.dealerTurn = true;
      state.twentyOne.hands.dom.push(drawTwentyOneCard());
      addLog(`<strong>Kickback.</strong> ${state.names.sub} survives, so ${state.names.dom} takes one card before playing the dealer hand.`);
      const domScore = twentyOneScore(state.twentyOne.hands.dom);
      if (domScore.bust) {
        if (state.twentyOne.softSaveAvailable && domScore.total <= 24) {
          state.twentyOne.softSaveAvailable = false;
          endTwentyOneHand(DOM, `Soft Save catches ${state.names.dom}'s ${domScore.total} and treats it as 21.`);
          return;
        }
        endTwentyOneHand(SUB, `${state.names.dom} busts on the kickback card.`);
        return;
      }
      render();
      publishState();
    }

    function declineTwentyOnePushLuck() {
      if (!state.twentyOne.pushLuckPending) return;
      if (localOnlineRole() && localOnlineRole() !== DOM) return;
      state.twentyOne.pushLuckPending = false;
      state.twentyOne.pushLuckQueued = false;
      state.twentyOne.pushLuckAvailable = false;
      state.twentyOne.revealDom = true;
      state.twentyOne.dealerTurn = true;
      addLog(`<strong>${state.names.dom} lets the stand hold.</strong> Dealer hand begins.`);
      render();
      publishState();
    }

    function twentyOneDealerStandMinimum() {
      return state.mode === "reclaim" && domAdvantagesEnabled() && blackjackPowersEnabled() && state.tiltLevel >= 4 ? 16 : 17;
    }

    function settleTwentyOneDealerHand() {
      state.twentyOne.dealerTurn = false;
      const subScore = twentyOneScore(state.twentyOne.hands.sub);
      const domScore = twentyOneScore(state.twentyOne.hands.dom);
      if (domScore.bust) {
        if (state.twentyOne.softSaveAvailable && domScore.total <= 24) {
          state.twentyOne.softSaveAvailable = false;
          endTwentyOneHand(DOM, `Soft Save catches ${state.names.dom}'s ${domScore.total} and treats it as 21.`);
        } else {
          endTwentyOneHand(SUB, `${state.names.dom} busts.`);
        }
      } else if (domScore.total > subScore.total) {
        endTwentyOneHand(DOM, `${state.names.dom} holds ${domScore.total} against ${subScore.total}.`);
      } else if (subScore.total > domScore.total) {
        if (state.mode === "reclaim" && domAdvantagesEnabled() && blackjackPowersEnabled() && state.tiltLevel >= 5 && subScore.total - domScore.total <= 1) {
          endTwentyOneHand(DOM, `House Sweep takes the close hand: ${subScore.total} against ${domScore.total}.`);
        } else {
          endTwentyOneHand(SUB, `${state.names.sub} holds ${subScore.total} against ${domScore.total}.`);
        }
      } else if (state.mode === "reclaim") {
        endTwentyOneHand(DOM, `Tie at ${domScore.total}. Reclaim ties go to ${state.names.dom}.`);
      } else {
        endTwentyOneHand("draw", `Tie at ${domScore.total}. The pot is returned.`);
      }
    }

    function twentyOneScore(hand) {
      let total = 0;
      let aces = 0;
      hand.forEach((card) => {
        const rank = card.slice(0, -1);
        if (rank === "A") {
          aces += 1;
          total += 11;
        } else if (["K", "Q", "J"].includes(rank)) {
          total += 10;
        } else {
          total += Number(rank);
        }
      });
      while (total > 21 && aces > 0) {
        total -= 10;
        aces -= 1;
      }
      return { total, bust: total > 21 };
    }

    function endTwentyOneHand(winner, reason) {
      state.active = false;
      state.twentyOne.revealDom = true;
      state.twentyOne.pushLuckPending = false;
      state.twentyOne.pushLuckQueued = false;
      state.twentyOne.outcome = reason;

      if (state.twentyOne.targetMarks > 1) {
        if (winner === DOM || winner === SUB) {
          state.twentyOne.marks[winner] = Number(state.twentyOne.marks[winner] || 0) + 1;
          addLog(`<strong>${labelFor(winner)} takes the hand.</strong> ${reason} Marks: ${state.names.dom} ${state.twentyOne.marks.dom}, ${state.names.sub} ${state.twentyOne.marks.sub}.`);
          if (state.twentyOne.marks[winner] < state.twentyOne.targetMarks) {
            state.twentyOne.nextHandPending = true;
            render();
            publishState();
            return;
          }
          addLog(`<strong>${labelFor(winner)} wins the Blackjack table.</strong> ${blackjackRoundFormat(state.twentyOne.settings.rounds).label}.`);
        } else {
          addLog(`<strong>Push.</strong> ${reason} No mark awarded.`);
          state.twentyOne.nextHandPending = true;
          render();
          publishState();
          return;
        }
      }

      const result = settleRoundBank(winner);
      if (result.outcome === "subReclaim") {
        addLog(`<strong>${state.names.sub} wins reclaim.</strong> ${reason} ${money(result.amount)} is taken back from ${state.names.dom}'s bank.`);
      } else if (result.outcome === "subNormal") {
        addLog(`<strong>${state.names.sub} wins.</strong> ${reason} Nothing enters ${state.names.dom}'s bank.`);
      } else if (result.outcome === "domReclaim") {
        addLog(`<strong>${state.names.dom} wins reclaim.</strong> ${reason} ${money(result.amount)} is added to her bank.`);
      } else if (result.outcome === "domNormal") {
        addLog(`<strong>${state.names.dom} wins.</strong> ${reason} ${money(result.amount)} moves into her bank.`);
      } else if (result.outcome === "domThrone") {
        addLog(`<strong>${state.names.sub} loses.</strong> ${reason} The Throne page opens automatically.`);
      } else {
        addLog(`<strong>Push.</strong> ${reason}`);
      }
      state.pot = 0;
      render();
      publishState();
    }

    function startFleetNormalMatch() {
      const bet = prepareRound("normal");
      if (bet === null) return;
      const starter = chooseStartingPlayer();
      preserveTiltLevel(() => beginFleetSetup(starter));
      finishRoundStart(`${normalRoundAmountIntro(bet)} ${state.names.dom} configures the fleets before ${labelFor(starter)} opens fire.`, false);
    }

    function startFleetReclaimMatch() {
      const pot = prepareRound("reclaim", "match");
      if (pot === null) return;
      beginFleetSetup(DOM);
      addLog(`<strong>Reclaim match:</strong> ${state.names.sub} is trying to sink the fleet and reclaim ${money(pot)}. ${state.names.dom} configures the fleets first. Tilt level ${state.tiltLevel}.`);
      publishState();
    }

    function beginFleetSetup(starter) {
      const size = fleetSize();
      const counts = fleetShipCounts();
      state.fleet = createFleetState(size, counts);
      state.fleet.setupPending = true;
      state.fleet.setupStarter = starter;
      state.turn = starter;
      state.active = false;
      state.winningCells = [];
    }

    function resetFleetMatch(firstTurn) {
      const size = fleetSize();
      const counts = fleetShipCounts();
      state.fleet = createFleetState(size, counts);
      state.fleet.ships.dom = placeFleet(state.fleet.boards.dom, DOM);
      state.fleet.ships.sub = placeFleet(state.fleet.boards.sub, SUB);
      state.turn = firstTurn;
      state.active = true;
      state.winningCells = [];
      state.fleet.scanAvailable = state.mode === "reclaim" && domAdvantagesEnabled() && state.tiltLevel >= 1;
      state.fleet.scanReveals = [];
      rollFleetModifiers();
      chooseFleetTurnHazards();
      if (state.mode === "reclaim") {
        const modifierText = state.fleet.modifiers.length
          ? ` Extra modifiers: ${state.fleet.modifiers.map(fleetModifierLabel).join(", ")}.`
          : "";
        addLog(`<strong>Fleet configured.</strong> ${size} x ${size}, ${fleetShipListFromCounts(counts).length} ships.${modifierText}`);
        if (state.fleet.priorityIntel) {
          addLog(`<strong>Priority Intel.</strong> ${state.fleet.priorityIntel.label} contains ${state.fleet.priorityIntel.count} ${state.fleet.priorityIntel.count === 1 ? "ship segment" : "ship segments"}.`);
        }
      } else {
        addLog(`<strong>Fleet configured.</strong> ${size} x ${size}, ${fleetShipListFromCounts(counts).length} ships.`);
      }
      render();
    }

    function fleetModifierCount() {
      if (state.mode !== "reclaim" || !domAdvantagesEnabled()) return 0;
      if (state.tiltLevel >= 5) return 3;
      if (state.tiltLevel >= 4) return 2;
      if (state.tiltLevel >= 2) return 1;
      return 0;
    }

    function rollFleetModifiers() {
      state.fleet.modifiers = [];
      state.fleet.doubleTapAvailable = false;
      state.fleet.commandFog = null;
      state.fleet.noisyWaters = null;
      state.fleet.priorityIntel = null;
      const pool = ["doubleTap", "commandFog", "counterfire", "noisyWaters", "priorityIntel"];
      if (state.mode === "reclaim" && domAdvantagesEnabled() && state.tiltLevel === 3) {
        state.fleet.modifiers.push("commandFog");
        pool.splice(pool.indexOf("commandFog"), 1);
      }
      const targetCount = domAdvantagesEnabled() && state.tiltLevel === 3 ? 2 : fleetModifierCount();
      const count = Math.min(targetCount, state.fleet.modifiers.length + pool.length);
      while (state.fleet.modifiers.length < count) {
        const index = Math.floor(Math.random() * pool.length);
        state.fleet.modifiers.push(pool.splice(index, 1)[0]);
      }
      state.fleet.doubleTapAvailable = state.fleet.modifiers.includes("doubleTap");
      if (state.fleet.modifiers.includes("priorityIntel")) {
        choosePriorityIntel();
      }
    }

    function hasFleetModifier(modifier) {
      return domAdvantagesEnabled() && Boolean(state.fleet.modifiers && state.fleet.modifiers.includes(modifier));
    }

    function fleetModifierLabel(modifier) {
      const labels = {
        doubleTap: "Double Tap",
        commandFog: "Command Fog",
        counterfire: "Dom Counterfire",
        noisyWaters: "Noisy Waters",
        priorityIntel: "Priority Intel"
      };
      return labels[modifier] || modifier;
    }

    function fleetModifierDescription(modifier) {
      const descriptions = {
        doubleTap: "Double Tap: the first time the dom hits, she immediately fires one extra shot.",
        commandFog: "Command Fog: a random row or column is blocked on each sub turn.",
        counterfire: "Dom Counterfire: when the sub misses, there is a 30% chance the dom's Scan recharges.",
        noisyWaters: "Noisy Waters: half of the target board is blocked on each sub turn.",
        priorityIntel: "Priority Intel: the dom gets one row or column clue at the start of reclaim."
      };
      return descriptions[modifier] || `${fleetModifierLabel(modifier)}: active this match.`;
    }

    function fleetModifierChip(modifier) {
      const label = escapeHtml(fleetModifierLabel(modifier));
      const description = escapeHtml(fleetModifierDescription(modifier));
      return `<span class="effect-chip" tabindex="0" data-tooltip="${description}">${label}</span>`;
    }

    function fleetSize() {
      return normalizeFleetSize(state.fleet && state.fleet.size);
    }

    function fleetShipCounts() {
      return normalizeFleetShipCounts(state.fleet && state.fleet.shipCounts, fleetSize());
    }

    function fleetShipListFromCounts(counts = fleetShipCounts()) {
      return Object.keys(FLEET_SHIP_LIMITS)
        .map(Number)
        .sort((a, b) => b - a)
        .flatMap((size) => Array.from({ length: Number(counts[size] || 0) }, () => size));
    }

    function fleetShipSegmentCount(counts = fleetShipCounts()) {
      return Object.keys(FLEET_SHIP_LIMITS).reduce((total, size) => total + Number(size) * Number(counts[size] || 0), 0);
    }

    function fleetSetupValid(size = fleetSize(), counts = fleetShipCounts()) {
      const gridSize = normalizeFleetSize(size);
      const ships = fleetShipListFromCounts(counts);
      return ships.length > 0
        && ships.every((shipSize) => shipSize <= gridSize)
        && fleetShipSegmentCount(counts) <= gridSize * gridSize;
    }

    function updateFleetSetupSize(size) {
      if (state.currentGame !== "tributeFleet" || !state.fleet || !state.fleet.setupPending) return;
      if (state.online.room && localOnlineRole() !== DOM) return;
      const gridSize = normalizeFleetSize(size);
      state.fleet.size = gridSize;
      state.fleet.shipCounts = defaultFleetShipCounts(gridSize);
      render();
      publishState();
    }

    function updateFleetSetupShipCount(shipSize, count) {
      if (state.currentGame !== "tributeFleet" || !state.fleet || !state.fleet.setupPending) return;
      if (state.online.room && localOnlineRole() !== DOM) return;
      const size = String(shipSize);
      if (!Object.prototype.hasOwnProperty.call(FLEET_SHIP_LIMITS, size)) return;
      state.fleet.shipCounts = {
        ...fleetShipCounts(),
        [size]: Math.max(0, Math.min(FLEET_SHIP_LIMITS[size], Math.round(Number(count) || 0)))
      };
      render();
      publishState();
    }

    function confirmFleetSetup() {
      if (state.currentGame !== "tributeFleet" || !state.fleet || !state.fleet.setupPending) return;
      if (state.online.room && localOnlineRole() !== DOM) return;
      const size = fleetSize();
      const counts = fleetShipCounts();
      if (!fleetSetupValid(size, counts)) return;
      beginFleetPlacement(state.fleet.setupStarter || state.turn || SUB);
      publishState();
    }

    function renderFleetSetupPanel() {
      const role = localOnlineRole();
      const canChoose = !state.online.room || !role || role === DOM;
      const size = fleetSize();
      const counts = fleetShipCounts();
      const totalSegments = fleetShipSegmentCount(counts);
      const valid = fleetSetupValid(size, counts);
      els.board.className = "fleet-layout fleet-switch-layout";
      els.board.innerHTML = "";
      const panel = document.createElement("div");
      panel.className = "fleet-panel fleet-setup-panel";
      panel.innerHTML = `
        <div class="fleet-panel-title">
          <h3>Fleet Setup</h3>
          <span>${canChoose ? "Configure the waters" : `${escapeHtml(state.names.dom)} is configuring the fleets`}</span>
        </div>
        <div class="fleet-size-row">
          ${[5, 6, 7].map((option) => `<button class="${option === size ? "primary" : ""}" data-fleet-size="${option}" ${canChoose ? "" : "disabled"}>${option} x ${option}</button>`).join("")}
        </div>
        <div class="fleet-setup-sliders">
          ${[2, 3, 4, 5].map((shipSize) => {
            const value = Number(counts[shipSize] || 0);
            const limit = FLEET_SHIP_LIMITS[shipSize];
            return `
              <label class="fleet-setup-slider">
                <span>${shipSize}-cell ships <strong>${value}</strong></span>
                <input type="range" min="0" max="${limit}" value="${value}" data-fleet-ship-size="${shipSize}" ${canChoose ? "" : "disabled"}>
              </label>
            `;
          }).join("")}
        </div>
        <div class="fleet-setup-summary ${valid ? "" : "danger"}">
          ${fleetShipListFromCounts(counts).length} ships · ${totalSegments}/${size * size} spaces
          ${valid ? "" : " · choose at least one ship and keep the total within the board"}
        </div>
        <button class="primary" data-fleet-confirm ${canChoose && valid ? "" : "disabled"}>Start Fleet</button>
      `;
      panel.querySelectorAll("[data-fleet-size]").forEach((button) => {
        button.addEventListener("click", () => updateFleetSetupSize(button.dataset.fleetSize));
      });
      panel.querySelectorAll("[data-fleet-ship-size]").forEach((input) => {
        input.addEventListener("input", () => updateFleetSetupShipCount(input.dataset.fleetShipSize, input.value));
      });
      const confirm = panel.querySelector("[data-fleet-confirm]");
      if (confirm) confirm.addEventListener("click", confirmFleetSetup);
      els.board.appendChild(panel);
    }

    function createFleetPlacementQueue(counts = fleetShipCounts()) {
      return fleetShipListFromCounts(counts).map((size, index) => ({
        id: `ship-${index}-${size}`,
        size,
        design: FLEET_SHIP_DESIGNS[size] || "patrol"
      }));
    }

    function beginFleetPlacement(starter) {
      const size = fleetSize();
      const counts = fleetShipCounts();
      state.fleet = createFleetState(size, counts);
      state.fleet.setupPending = false;
      state.fleet.placementPending = true;
      state.fleet.placementStarter = starter;
      state.fleet.placementQueue = createFleetPlacementQueue(counts);
      state.fleet.placementReady = { dom: false, sub: false };
      state.turn = starter;
      state.active = false;
      state.winningCells = [];
      addLog(`<strong>Fleet placement.</strong> Each player places their ships and readies up before ${labelFor(starter)} opens fire.`);
      render();
    }

    function fleetPlacementOwner() {
      const role = localOnlineRole();
      if (role === DOM || role === SUB) return role;
      return fleetPlacementComplete(DOM) ? SUB : DOM;
    }

    function fleetPlacementComplete(owner) {
      const queue = state.fleet && Array.isArray(state.fleet.placementQueue) ? state.fleet.placementQueue : [];
      const ships = state.fleet && state.fleet.ships && Array.isArray(state.fleet.ships[owner]) ? state.fleet.ships[owner] : [];
      return queue.length > 0 && ships.length >= queue.length;
    }

    function fleetCurrentPlacementSpec(owner) {
      const queue = state.fleet && Array.isArray(state.fleet.placementQueue) ? state.fleet.placementQueue : [];
      const placement = state.fleet && state.fleet.placement && state.fleet.placement[owner] ? state.fleet.placement[owner] : {};
      const ships = state.fleet && state.fleet.ships && Array.isArray(state.fleet.ships[owner]) ? state.fleet.ships[owner] : [];
      if (placement.replacingId) {
        const replacing = ships.find((ship) => ship.id === placement.replacingId);
        if (replacing) return { id: replacing.id, size: replacing.size, design: replacing.design || FLEET_SHIP_DESIGNS[replacing.size] || "patrol", replacing: true };
      }
      const placedIds = new Set(ships.map((ship) => ship.id));
      return queue.find((ship) => !placedIds.has(ship.id)) || null;
    }

    function fleetPlacementCells(row, col, size, orientation) {
      return Array.from({ length: size }, (_, index) => ({
        row: row + (orientation === "vertical" ? index : 0),
        col: col + (orientation === "horizontal" ? index : 0),
        segment: index
      }));
    }

    function fleetCanPlaceShip(owner, row, col, spec = fleetCurrentPlacementSpec(owner)) {
      if (!spec) return false;
      const placement = state.fleet.placement[owner] || { orientation: "horizontal", replacingId: null };
      const size = fleetSize();
      const cells = fleetPlacementCells(row, col, spec.size, placement.orientation);
      return cells.every((cell) => {
        if (cell.row < 0 || cell.col < 0 || cell.row >= size || cell.col >= size) return false;
        const existing = fleetShipSegment(owner, cell.row, cell.col);
        return !existing || existing.ship.id === placement.replacingId;
      });
    }

    function rebuildFleetPlacementBoard(owner) {
      const size = fleetSize();
      state.fleet.boards[owner] = createFleetGrid(size);
      (state.fleet.ships[owner] || []).forEach((ship) => {
        (ship.cells || []).forEach((cell) => {
          if (state.fleet.boards[owner][cell.row]) state.fleet.boards[owner][cell.row][cell.col] = true;
        });
      });
    }

    function selectFleetShipForReplacement(owner, shipId) {
      if (!state.fleet || !state.fleet.placementPending || !state.fleet.placement[owner]) return;
      if (state.online.room && localOnlineRole() !== owner) return;
      const ship = (state.fleet.ships[owner] || []).find((item) => item.id === shipId);
      if (!ship) return;
      if (!state.fleet.placementReady) state.fleet.placementReady = { dom: false, sub: false };
      state.fleet.placementReady[owner] = false;
      state.fleet.placement[owner].replacingId = ship.id;
      state.fleet.placement[owner].orientation = ship.orientation || "horizontal";
      render();
      publishState();
    }

    function rotateFleetPlacementShip(owner) {
      if (!state.fleet || !state.fleet.placementPending || !state.fleet.placement[owner]) return;
      if (state.online.room && localOnlineRole() !== owner) return;
      if (!state.fleet.placementReady) state.fleet.placementReady = { dom: false, sub: false };
      state.fleet.placementReady[owner] = false;
      state.fleet.placement[owner].orientation = state.fleet.placement[owner].orientation === "vertical" ? "horizontal" : "vertical";
      render();
      publishState();
    }

    function placeFleetPlacementShip(owner, row, col) {
      if (!state.fleet || !state.fleet.placementPending || !state.fleet.placement[owner]) return;
      if (state.online.room && localOnlineRole() !== owner) return;
      const spec = fleetCurrentPlacementSpec(owner);
      if (!spec || !fleetCanPlaceShip(owner, row, col, spec)) return;
      if (!state.fleet.placementReady) state.fleet.placementReady = { dom: false, sub: false };
      state.fleet.placementReady[owner] = false;
      const placement = state.fleet.placement[owner];
      const orientation = placement.orientation || "horizontal";
      const cells = fleetPlacementCells(row, col, spec.size, orientation);
      state.fleet.ships[owner] = (state.fleet.ships[owner] || []).filter((ship) => ship.id !== placement.replacingId && ship.id !== spec.id);
      state.fleet.ships[owner].push({
        id: spec.id,
        size: spec.size,
        design: spec.design || FLEET_SHIP_DESIGNS[spec.size] || "patrol",
        orientation,
        cells
      });
      placement.replacingId = null;
      rebuildFleetPlacementBoard(owner);
      render();
      publishState();
    }

    function randomizeFleetPlacement(owner) {
      if (!state.fleet || !state.fleet.placementPending || !state.fleet.placement[owner]) return;
      if (state.online.room && localOnlineRole() !== owner) return;
      if (!state.fleet.placementReady) state.fleet.placementReady = { dom: false, sub: false };
      state.fleet.placementReady[owner] = false;
      state.fleet.boards[owner] = createFleetGrid(fleetSize());
      state.fleet.ships[owner] = placeFleet(state.fleet.boards[owner], owner);
      state.fleet.placement[owner] = { orientation: "horizontal", replacingId: null };
      render();
      publishState();
    }

    function readyFleetPlacement(owner) {
      if (!state.fleet || !state.fleet.placementPending) return;
      if (state.online.room && localOnlineRole() !== owner) return;
      if (!fleetPlacementComplete(owner)) return;
      if (!state.fleet.placementReady) state.fleet.placementReady = { dom: false, sub: false };
      state.fleet.placementReady[owner] = true;
      if (state.fleet.placement && state.fleet.placement[owner]) state.fleet.placement[owner].replacingId = null;
      if (fleetBothReadyForCombat()) {
        startFleetCombatFromPlacement();
      } else {
        render();
      }
      publishState();
    }

    function startFleetCombatFromPlacement() {
      state.fleet.placementPending = false;
      state.fleet.placementDecisionPending = false;
      state.fleet.setupPending = false;
      state.turn = state.fleet.placementStarter || state.turn || SUB;
      state.active = true;
      state.winningCells = [];
      state.fleet.scanAvailable = state.mode === "reclaim" && domAdvantagesEnabled() && state.tiltLevel >= 1;
      state.fleet.scanReveals = [];
      rollFleetModifiers();
      chooseFleetTurnHazards();
      const size = fleetSize();
      const shipCount = fleetShipListFromCounts(fleetShipCounts()).length;
      const modifierText = state.mode === "reclaim" && state.fleet.modifiers.length
        ? ` Extra modifiers: ${state.fleet.modifiers.map(fleetModifierLabel).join(", ")}.`
        : "";
      addLog(`<strong>Fleet deployed.</strong> ${size} x ${size}, ${shipCount} ships. ${labelFor(state.turn)} opens fire.${modifierText}`);
      if (state.fleet.priorityIntel) {
        addLog(`<strong>Priority Intel.</strong> ${state.fleet.priorityIntel.label} contains ${state.fleet.priorityIntel.count} ${state.fleet.priorityIntel.count === 1 ? "ship segment" : "ship segments"}.`);
      }
      render();
    }

    function fleetReadyForCombat(owner) {
      return state.fleet
        && state.fleet.placementReady
        && state.fleet.placementReady[owner]
        && (state.fleet.placementReuse[owner] === "reuse" || fleetPlacementComplete(owner));
    }

    function fleetBothReadyForCombat() {
      return fleetReadyForCombat(DOM) && fleetReadyForCombat(SUB);
    }

    function restartFleetWithCurrentRules(prompt) {
      if (!prompt || prompt.game !== "tributeFleet" || !normalReplayControlsAllowed()) return;
      const replayMode = prompt.mode === "reclaim" ? "reclaim" : "normal";
      if (replayMode === "reclaim" && state.domVault <= 0) return;
      state.normalReplayPrompt = null;
      hideOutcomeSplash();
      if (isThroneSession()) fadeThroneKissSplashWhenFocused();
      els.betInput.value = normalizeBuyIn(prompt.amount || state.pot || els.betInput.value || 0);
      wagerStartBypass = true;
      try {
        const amount = prepareRound(replayMode, "match");
        if (amount === null) return;
      } finally {
        wagerStartBypass = false;
      }
      const size = fleetSize();
      state.fleet.size = size;
      state.fleet.shipCounts = fleetShipCounts();
      state.fleet.shots = { dom: createShotGrid(size), sub: createShotGrid(size) };
      state.fleet.scanReveals = [];
      state.fleet.modifiers = [];
      state.fleet.doubleTapAvailable = false;
      state.fleet.commandFog = null;
      state.fleet.noisyWaters = null;
      state.fleet.priorityIntel = null;
      state.fleet.setupPending = false;
      state.fleet.placementPending = false;
      state.fleet.placementDecisionPending = true;
      state.fleet.placementStarter = replayMode === "reclaim" ? DOM : chooseStartingPlayer();
      state.fleet.placementReuse = { dom: null, sub: null };
      state.fleet.placementReady = { dom: false, sub: false };
      state.fleet.placement = {
        dom: { orientation: "horizontal", replacingId: null },
        sub: { orientation: "horizontal", replacingId: null }
      };
      rebuildFleetPlacementBoard(DOM);
      rebuildFleetPlacementBoard(SUB);
      state.turn = state.fleet.placementStarter;
      state.active = false;
      addLog(`<strong>Fleet rematch.</strong> Each player chooses whether to reuse their ships or place them again.`);
      render();
      publishState();
    }

    function chooseFleetPlacementReuse(owner, reuse) {
      if (!state.fleet || !state.fleet.placementDecisionPending) return;
      if (state.online.room && localOnlineRole() !== owner) return;
      if (!state.fleet.placementReuse) state.fleet.placementReuse = { dom: null, sub: null };
      if (!state.fleet.placementReady) state.fleet.placementReady = { dom: false, sub: false };
      if (reuse) {
        state.fleet.placementReuse[owner] = "reuse";
        state.fleet.placementReady[owner] = true;
        state.fleet.placement[owner] = { orientation: "horizontal", replacingId: null };
        rebuildFleetPlacementBoard(owner);
      } else {
        state.fleet.placementReuse[owner] = "replace";
        state.fleet.placementReady[owner] = false;
        state.fleet.placementPending = true;
        state.fleet.ships[owner] = [];
        state.fleet.boards[owner] = createFleetGrid(fleetSize());
        state.fleet.placement[owner] = { orientation: "horizontal", replacingId: null };
      }
      if (fleetBothReadyForCombat()) {
        startFleetCombatFromPlacement();
      } else {
        render();
      }
      publishState();
    }

    function choosePriorityIntel() {
      const axis = Math.random() < 0.5 ? "row" : "col";
      const size = fleetSize();
      const index = Math.floor(Math.random() * size);
      let count = 0;
      for (let i = 0; i < size; i += 1) {
        const row = axis === "row" ? index : i;
        const col = axis === "row" ? i : index;
        if (state.fleet.boards.sub[row][col]) count += 1;
      }
      state.fleet.priorityIntel = {
        axis,
        index,
        count,
        label: `${axis === "row" ? "Row" : "Column"} ${index + 1}`
      };
    }

    function placeFleet(grid, owner = "") {
      const size = normalizeFleetSize(grid.length);
      const queuedShips = state.fleet && Array.isArray(state.fleet.placementQueue) && state.fleet.placementQueue.length
        ? state.fleet.placementQueue
        : fleetShipListFromCounts(state.fleet && state.fleet.shipCounts).map((shipSize, index) => ({
          id: `${owner || "ship"}-${shipSize}-${index}`,
          size: shipSize,
          design: FLEET_SHIP_DESIGNS[shipSize] || "patrol"
        }));
      const ships = [];
      queuedShips.forEach((shipSpec, index) => {
        const shipSize = Number(shipSpec.size || shipSpec);
        let placed = false;
        let attempts = 0;
        while (!placed && attempts < 500) {
          attempts += 1;
          const horizontal = Math.random() < 0.5;
          const row = Math.floor(Math.random() * (horizontal ? size : size - shipSize + 1));
          const col = Math.floor(Math.random() * (horizontal ? size - shipSize + 1 : size));
          const cells = [];
          for (let i = 0; i < shipSize; i += 1) {
            cells.push([row + (horizontal ? 0 : i), col + (horizontal ? i : 0)]);
          }
          if (cells.every(([r, c]) => !grid[r][c])) {
            cells.forEach(([r, c]) => {
              grid[r][c] = true;
            });
            ships.push({
              id: shipSpec.id || `${owner || "ship"}-${shipSize}-${index}-${row}-${col}`,
              size: shipSize,
              design: shipSpec.design || FLEET_SHIP_DESIGNS[shipSize] || "patrol",
              orientation: horizontal ? "horizontal" : "vertical",
              cells: cells.map(([r, c], segment) => ({ row: r, col: c, segment }))
            });
            placed = true;
          }
        }
      });
      return ships;
    }

    function otherRole(role) {
      return role === DOM ? SUB : DOM;
    }

    function chooseFleetTurnHazards() {
      chooseCommandFog();
      chooseNoisyWaters();
    }

    function chooseCommandFog() {
      if (state.mode !== "reclaim" || state.turn !== SUB || !hasFleetModifier("commandFog")) {
        state.fleet.commandFog = null;
        return;
      }
      const size = fleetSize();
      state.fleet.commandFog = {
        axis: Math.random() < 0.5 ? "row" : "col",
        index: Math.floor(Math.random() * size)
      };
    }

    function chooseNoisyWaters() {
      if (state.mode !== "reclaim" || state.turn !== SUB || !hasFleetModifier("noisyWaters")) {
        state.fleet.noisyWaters = null;
        return;
      }
      const open = [];
      const size = fleetSize();
      for (let row = 0; row < size; row += 1) {
        for (let col = 0; col < size; col += 1) {
          if (!state.fleet.shots.sub[row][col]) open.push([row, col]);
        }
      }
      const blocked = [];
      const count = Math.min(Math.floor((size * size) / 2), open.length);
      while (blocked.length < count && open.length) {
        const index = Math.floor(Math.random() * open.length);
        blocked.push(open.splice(index, 1)[0]);
      }
      state.fleet.noisyWaters = blocked;
    }

    function isFleetTargetFogged(row, col) {
      if (state.mode !== "reclaim" || state.turn !== SUB || !state.fleet.commandFog) return false;
      return state.fleet.commandFog.axis === "row"
        ? state.fleet.commandFog.index === row
        : state.fleet.commandFog.index === col;
    }

    function isFleetTargetNoisyAllowed(row, col) {
      if (state.mode !== "reclaim" || state.turn !== SUB || !state.fleet.noisyWaters) return true;
      if (!Array.isArray(state.fleet.noisyWaters)) return true;
      return !state.fleet.noisyWaters.some(([r, c]) => r === row && c === col);
    }

    function fleetShipSunkByCell(owner, row, col, attacker = otherRole(owner)) {
      const ships = state.fleet && state.fleet.ships && Array.isArray(state.fleet.ships[owner]) ? state.fleet.ships[owner] : [];
      const ship = ships.find((candidate) => (candidate.cells || []).some((cell) => cell.row === row && cell.col === col));
      if (!ship) return false;
      return (ship.cells || []).every((cell) => state.fleet.shots[attacker][cell.row][cell.col] === "hit");
    }

    function fireFleetShot(row, col) {
      if (!state.active) return;
      if (state.fleet.shotResolving) return;
      if (localOnlineRole() && localOnlineRole() !== state.turn) return;
      if (isFleetTargetFogged(row, col)) return;
      if (!isFleetTargetNoisyAllowed(row, col)) return;
      const attacker = state.turn;
      const target = otherRole(attacker);
      if (state.fleet.shots[attacker][row][col]) return;
      const hit = state.fleet.boards[target][row][col];
      state.fleet.shots[attacker][row][col] = hit ? "hit" : "miss";
      if (attacker === SUB) resolveFocusTaxSuccess();
      const resolvingId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      state.fleet.shotResolving = {
        id: resolvingId,
        attacker,
        target,
        row,
        col,
        result: hit ? "hit" : "miss",
        until: Date.now() + 1000
      };
      addLog(hit
        ? `<strong>${labelFor(attacker)} scores a hit.</strong>`
        : `<strong>${labelFor(attacker)} misses.</strong>`);
      if (attacker === DOM && hit) {
        const sunk = fleetShipSunkByCell(target, row, col, attacker);
        if (sunk) {
          triggerSubLossPressure({
            weight: 2,
            banner: true,
            message: false,
            pulse: false,
            source: "fleet-sunk"
          });
        }
      }
      render();
      publishState();
      window.setTimeout(() => finishFleetShotResolution(resolvingId), 1050);
    }

    function finishFleetShotResolution(resolvingId) {
      if (!state.fleet || !state.fleet.shotResolving || state.fleet.shotResolving.id !== resolvingId) return;
      const { attacker, target, result } = state.fleet.shotResolving;
      const hit = result === "hit";
      state.fleet.shotResolving = null;

      if (fleetAllSunk(target)) {
        endFleetMatch(attacker);
        return;
      }

      if (attacker === DOM && hit && state.fleet.doubleTapAvailable) {
        state.fleet.doubleTapAvailable = false;
        state.turn = DOM;
        state.fleet.commandFog = null;
        state.fleet.noisyWaters = null;
        addLog(`<strong>Double Tap.</strong> ${state.names.dom} keeps control for one more shot.`);
        render();
        publishState();
        return;
      }

      if (attacker === SUB) {
        if (!hit && hasFleetModifier("counterfire")) {
          if (Math.random() < 0.3) {
            state.fleet.scanAvailable = true;
            addLog(`<strong>Dom Counterfire.</strong> ${state.names.sub}'s miss recharges ${state.names.dom}'s Scan.`);
          } else {
            addLog(`<strong>Dom Counterfire.</strong> ${state.names.sub}'s miss draws no response.`);
          }
        }
      }

      state.turn = target;
      chooseFleetTurnHazards();
      render();
      publishState();
    }

    function fleetAllSunk(target) {
      const attacker = otherRole(target);
      const size = fleetSize();
      for (let row = 0; row < size; row += 1) {
        for (let col = 0; col < size; col += 1) {
          if (state.fleet.boards[target][row][col] && state.fleet.shots[attacker][row][col] !== "hit") {
            return false;
          }
        }
      }
      return true;
    }

    function localFleetViewer() {
      const role = localOnlineRole();
      if (role === DOM || role === SUB) return role;
      return state.turn || SUB;
    }

    function defaultFleetViewMode(viewer = localFleetViewer()) {
      return state.active && state.turn && state.turn !== viewer ? "fleet" : "target";
    }

    function fleetViewMode(viewer = localFleetViewer()) {
      if (localFleetViewTurn !== state.turn) {
        localFleetView = null;
        localFleetHoldUntil = 0;
        localFleetViewTurn = state.turn || null;
      }
      if (localFleetView === "fleet" && localFleetHoldUntil && Date.now() >= localFleetHoldUntil) {
        localFleetView = null;
        localFleetHoldUntil = 0;
      }
      return localFleetView === "fleet" || localFleetView === "target" ? localFleetView : defaultFleetViewMode(viewer);
    }

    function setFleetViewMode(mode) {
      localFleetView = mode === "fleet" ? "fleet" : "target";
      localFleetViewTurn = state.turn || null;
      localFleetHoldUntil = 0;
      render();
    }

    function fleetShotCount(attacker, result = "") {
      let count = 0;
      const size = fleetSize();
      for (let row = 0; row < size; row += 1) {
        for (let col = 0; col < size; col += 1) {
          const shot = state.fleet.shots[attacker][row][col];
          if (result ? shot === result : Boolean(shot)) count += 1;
        }
      }
      return count;
    }

    function fleetScan() {
      if (!state.active || state.mode !== "reclaim" || state.currentGame !== "tributeFleet" || state.turn !== DOM || !state.fleet.scanAvailable) return;
      if (!domAdvantageControlsAllowed(localOnlineRole())) return;
      const options = [];
      const size = fleetSize();
      for (let row = 0; row < size; row += 1) {
        for (let col = 0; col < size; col += 1) {
          const alreadyRevealed = state.fleet.scanReveals.some(([r, c]) => r === row && c === col);
          if (state.fleet.boards.sub[row][col] && state.fleet.shots.dom[row][col] !== "hit" && !alreadyRevealed) {
            options.push([row, col]);
          }
        }
      }
      if (!options.length) return;
      state.fleet.scanReveals.push(options[Math.floor(Math.random() * options.length)]);
      state.fleet.scanAvailable = false;
      addLog(`<strong>${state.names.dom} scans the water.</strong> One hidden ship segment is marked.`);
      render();
      publishState();
    }

    function endFleetMatch(winner) {
      state.active = false;
      const result = settleRoundBank(winner);
      if (result.outcome === "subReclaim") {
        addLog(`<strong>${state.names.sub} wins reclaim.</strong> ${money(result.amount)} is taken back from ${state.names.dom}'s bank.`);
      } else if (result.outcome === "subNormal") {
        addLog(`<strong>${state.names.sub} wins.</strong> Nothing enters ${state.names.dom}'s bank.`);
      } else if (result.outcome === "domReclaim") {
        addLog(`<strong>${state.names.dom} wins reclaim.</strong> ${money(result.amount)} is added to her bank. She now has ${money(state.domVault)}.`);
      } else if (result.outcome === "domNormal") {
        addLog(`<strong>${state.names.dom} wins.</strong> ${money(result.amount)} moves into her bank and becomes reclaimable cash.`);
      } else if (result.outcome === "domThrone") {
        addLog(`<strong>${state.names.sub} loses.</strong> The Throne page opens automatically.`);
      }
      state.pot = 0;
      render();
      publishState();
    }

    function trailSpaceLabel(type) {
      const labels = {
        start: "Start",
        finish: "Finish",
        plain: "Blank",
        "player-card": "Card",
        "fate-card": "Chance",
        cash: "Cash",
        trap: "Trap",
        slide: "Slide"
      };
      return labels[type] || "Blank";
    }

    function renderTrailCardPanel(card, emptyText) {
      if (!card) {
        return `<p>${emptyText}</p>`;
      }
      return `
        <p><strong>${escapeHtml(card.title)}</strong></p>
        <p>${escapeHtml(card.text)}</p>
        <p>${escapeHtml(card.deck || "Card")} drawn by ${escapeHtml(labelFor(card.player))}.</p>
      `;
    }

    function trailAnchors() {
      return [
        [125, 88],
        [845, 88],
        [900, 126],
        [850, 190],
        [130, 190],
        [80, 242],
        [125, 295],
        [850, 295],
        [925, 330],
        [925, 382],
        [850, 430],
        [130, 430],
        [55, 462],
        [55, 515],
        [130, 555],
        [710, 555],
        [830, 575],
        [830, 628],
        [900, 640]
      ];
    }

    function catmullRomPoint(p0, p1, p2, p3, t) {
      const t2 = t * t;
      const t3 = t2 * t;
      return {
        x: 0.5 * ((2 * p1[0]) + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
        y: 0.5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)
      };
    }

    function trailSmoothSamples() {
      const anchors = trailAnchors();
      const samples = [];
      let total = 0;
      let previous = null;
      for (let segment = 0; segment < anchors.length - 1; segment += 1) {
        const p0 = anchors[Math.max(0, segment - 1)];
        const p1 = anchors[segment];
        const p2 = anchors[segment + 1];
        const p3 = anchors[Math.min(anchors.length - 1, segment + 2)];
        for (let step = 0; step <= 20; step += 1) {
          if (segment > 0 && step === 0) continue;
          const point = catmullRomPoint(p0, p1, p2, p3, step / 20);
          if (previous) total += Math.hypot(point.x - previous.x, point.y - previous.y);
          samples.push({ ...point, distance: total });
          previous = point;
        }
      }
      return { samples, total };
    }

    function trailPointAtProgress(progress) {
      const { samples, total } = trailSmoothSamples();
      if (!samples.length) return { x: 0, y: 0 };
      const target = Math.max(0, Math.min(1, progress)) * total;
      let index = 1;
      while (index < samples.length - 1 && samples[index].distance < target) index += 1;
      const before = samples[index - 1] || samples[0];
      const after = samples[index] || samples[samples.length - 1];
      const span = Math.max(1, after.distance - before.distance);
      const local = (target - before.distance) / span;
      return {
        x: before.x + (after.x - before.x) * local,
        y: before.y + (after.y - before.y) * local
      };
    }

    function trailSpacePoint(index) {
      return trailPointAtProgress((index + 0.5) / TRAIL_LENGTH);
    }

    function trailRoutePoints() {
      return Array.from({ length: 121 }, (_, index) => trailPointAtProgress(index / 120));
    }

    function trailPathData(points) {
      if (!points.length) return "";
      let data = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
      for (let i = 1; i < points.length; i += 1) {
        const previous = points[i - 1];
        const current = points[i];
        const midX = (previous.x + current.x) / 2;
        const midY = (previous.y + current.y) / 2;
        data += ` Q ${previous.x.toFixed(1)} ${previous.y.toFixed(1)} ${midX.toFixed(1)} ${midY.toFixed(1)}`;
      }
      const last = points[points.length - 1];
      data += ` T ${last.x.toFixed(1)} ${last.y.toFixed(1)}`;
      return data;
    }

    function trailSpaceShortLabel(type) {
      const labels = {
        start: "GO",
        finish: "END",
        plain: "",
        "player-card": "CARD",
        "fate-card": "CHANCE",
        cash: "CASH",
        trap: "TRAP",
        slide: "SLIDE"
      };
      return labels[type] || "";
    }

    function renderTrailSlides(spacePoints) {
      return trailSlides().map((slide) => {
        const from = spacePoints[slide.from];
        const to = spacePoints[slide.to];
        const controlX = (from.x + to.x) / 2 - 80;
        const controlY = (from.y + to.y) / 2 + 58;
        const angle = Math.atan2(to.y - controlY, to.x - controlX);
        const arrowSize = 13;
        const left = {
          x: to.x - Math.cos(angle - 0.55) * arrowSize,
          y: to.y - Math.sin(angle - 0.55) * arrowSize
        };
        const right = {
          x: to.x - Math.cos(angle + 0.55) * arrowSize,
          y: to.y - Math.sin(angle + 0.55) * arrowSize
        };
        return `
          <path class="trail-slide-path" d="M ${from.x.toFixed(1)} ${from.y.toFixed(1)} Q ${controlX.toFixed(1)} ${controlY.toFixed(1)} ${to.x.toFixed(1)} ${to.y.toFixed(1)}"></path>
          <path class="trail-slide-arrow" d="M ${to.x.toFixed(1)} ${to.y.toFixed(1)} L ${left.x.toFixed(1)} ${left.y.toFixed(1)} L ${right.x.toFixed(1)} ${right.y.toFixed(1)} Z"></path>
        `;
      }).join("");
    }

    function trailNormalAtProgress(progress) {
      const previous = trailPointAtProgress(Math.max(0, progress - 0.012));
      const next = trailPointAtProgress(Math.min(1, progress + 0.012));
      const dx = next.x - previous.x;
      const dy = next.y - previous.y;
      const length = Math.max(1, Math.hypot(dx, dy));
      return {
        x: -dy / length,
        y: dx / length
      };
    }

    function trailCurvatureAtProgress(progress) {
      const before = trailPointAtProgress(Math.max(0, progress - 0.018));
      const center = trailPointAtProgress(progress);
      const after = trailPointAtProgress(Math.min(1, progress + 0.018));
      const first = Math.atan2(center.y - before.y, center.x - before.x);
      const second = Math.atan2(after.y - center.y, after.x - center.x);
      let angle = Math.abs(second - first);
      if (angle > Math.PI) angle = (Math.PI * 2) - angle;
      return angle;
    }

    function trailTurnSignAtProgress(progress) {
      const before = trailPointAtProgress(Math.max(0, progress - 0.022));
      const center = trailPointAtProgress(progress);
      const after = trailPointAtProgress(Math.min(1, progress + 0.022));
      const ax = center.x - before.x;
      const ay = center.y - before.y;
      const bx = after.x - center.x;
      const by = after.y - center.y;
      const cross = ax * by - ay * bx;
      if (Math.abs(cross) < 0.01) return 0;
      return cross > 0 ? 1 : -1;
    }

    function trailTrackHalfWidth(progress) {
      const curve = trailCurvatureAtProgress(progress);
      if (curve > 0.46) return 28;
      if (curve > 0.30) return 30;
      if (curve > 0.18) return 32;
      return 32;
    }

    function trailSegmentWidthBoost(index) {
      const wideSpaces = {
        34: 7,
        35: 7,
        46: 3,
        47: 8,
        58: 8
      };
      return wideSpaces[index] || 0;
    }

    function trailSegmentEndpointBoost(index, endpoint) {
      const joinBoosts = {
        33: { end: 7 },
        36: { start: 7 },
        45: { end: 4 },
        48: { start: 6 },
        57: { end: 6 },
        59: { start: 6 }
      };
      const boosts = joinBoosts[index] || {};
      return boosts[endpoint] || 0;
    }

    function trailSegmentPoints(index) {
      const startProgress = index / TRAIL_LENGTH;
      const endProgress = (index + 1) / TRAIL_LENGTH;
      const midProgress = (index + 0.5) / TRAIL_LENGTH;
      const start = trailPointAtProgress(startProgress);
      const end = trailPointAtProgress(endProgress);
      const mid = trailPointAtProgress(midProgress);
      const startNormal = trailNormalAtProgress(startProgress);
      const endNormal = trailNormalAtProgress(endProgress);
      const midNormal = trailNormalAtProgress(midProgress);
      const widthBoost = trailSegmentWidthBoost(index);
      const startHalfWidth = trailTrackHalfWidth(startProgress) + widthBoost + trailSegmentEndpointBoost(index, "start");
      const endHalfWidth = trailTrackHalfWidth(endProgress) + widthBoost + trailSegmentEndpointBoost(index, "end");
      const curve = trailCurvatureAtProgress(midProgress);
      const turnSign = trailTurnSignAtProgress(midProgress);
      const flare = curve > 0.18 && turnSign !== 0 ? Math.min(14 + widthBoost, 6 + curve * 14 + widthBoost) : widthBoost;
      const leftStart = [start.x + startNormal.x * startHalfWidth, start.y + startNormal.y * startHalfWidth];
      const leftEnd = [end.x + endNormal.x * endHalfWidth, end.y + endNormal.y * endHalfWidth];
      const rightEnd = [end.x - endNormal.x * endHalfWidth, end.y - endNormal.y * endHalfWidth];
      const rightStart = [start.x - startNormal.x * startHalfWidth, start.y - startNormal.y * startHalfWidth];
      let points = [leftStart, leftEnd, rightEnd, rightStart];
      if (flare > 0) {
        const outerSign = turnSign > 0 ? -1 : 1;
        const outerNormalStart = outerSign > 0 ? startNormal : { x: -startNormal.x, y: -startNormal.y };
        const outerNormalEnd = outerSign > 0 ? endNormal : { x: -endNormal.x, y: -endNormal.y };
        const outerStartBase = outerSign > 0 ? leftStart : rightStart;
        const outerEndBase = outerSign > 0 ? leftEnd : rightEnd;
        const shoulderA = [
          outerStartBase[0] * 0.55 + outerEndBase[0] * 0.45 + outerNormalStart.x * flare,
          outerStartBase[1] * 0.55 + outerEndBase[1] * 0.45 + outerNormalStart.y * flare
        ];
        const shoulderB = [
          outerStartBase[0] * 0.45 + outerEndBase[0] * 0.55 + outerNormalEnd.x * flare,
          outerStartBase[1] * 0.45 + outerEndBase[1] * 0.55 + outerNormalEnd.y * flare
        ];
        points = outerSign > 0
          ? [leftStart, shoulderA, shoulderB, leftEnd, rightEnd, rightStart]
          : [leftStart, leftEnd, rightEnd, shoulderB, shoulderA, rightStart];
      }
      return points;
    }

    function trailSegmentPolygon(index) {
      return trailSegmentPoints(index).map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
    }

    function polygonCentroid(points) {
      let twiceArea = 0;
      let xTotal = 0;
      let yTotal = 0;
      for (let i = 0; i < points.length; i += 1) {
        const [x1, y1] = points[i];
        const [x2, y2] = points[(i + 1) % points.length];
        const cross = x1 * y2 - x2 * y1;
        twiceArea += cross;
        xTotal += (x1 + x2) * cross;
        yTotal += (y1 + y2) * cross;
      }
      if (Math.abs(twiceArea) < 0.01) {
        return {
          x: points.reduce((sum, [x]) => sum + x, 0) / points.length,
          y: points.reduce((sum, [, y]) => sum + y, 0) / points.length
        };
      }
      return {
        x: xTotal / (3 * twiceArea),
        y: yTotal / (3 * twiceArea)
      };
    }

    function trailSegmentTextPoints(index) {
      const center = polygonCentroid(trailSegmentPoints(index));
      return {
        center,
        number: {
          x: center.x,
          y: center.y
        }
      };
    }

    function renderTrailFinishFlag(point) {
      return `
        <g class="trail-finish-flag" aria-hidden="true">
          <line class="flag-pole" x1="${(point.x - 8).toFixed(1)}" y1="${(point.y - 28).toFixed(1)}" x2="${(point.x - 8).toFixed(1)}" y2="${(point.y - 7).toFixed(1)}"></line>
          <rect class="flag-light" x="${(point.x - 6).toFixed(1)}" y="${(point.y - 29).toFixed(1)}" width="8" height="7"></rect>
          <rect class="flag-dark" x="${(point.x + 2).toFixed(1)}" y="${(point.y - 29).toFixed(1)}" width="8" height="7"></rect>
          <rect class="flag-dark" x="${(point.x - 6).toFixed(1)}" y="${(point.y - 22).toFixed(1)}" width="8" height="7"></rect>
          <rect class="flag-light" x="${(point.x + 2).toFixed(1)}" y="${(point.y - 22).toFixed(1)}" width="8" height="7"></rect>
        </g>
      `;
    }

    function renderTrailDiceButton() {
      const sprintRoll = Boolean(state.trail && state.trail.shoppingMode && state.turn === SUB);
      const sides = state.trail && state.trail.dieSides ? Number(state.trail.dieSides[state.turn] || 6) : 6;
      const canRoll = trailRollAllowed();
      const rolling = Boolean(state.trail && state.trail.rollAnimationUntil && Date.now() < state.trail.rollAnimationUntil);
      const roll = rolling && state.trail && state.trail.rollPreview
        ? state.trail.rollPreview
        : (state.trail && state.trail.lastRoll ? state.trail.lastRoll.roll : "?");
      const dice = rolling && state.trail && Array.isArray(state.trail.rollPreviewDice)
        ? state.trail.rollPreviewDice
        : (state.trail && state.trail.lastRoll && Array.isArray(state.trail.lastRoll.dice) ? state.trail.lastRoll.dice : [roll]);
      const classes = `trail-dice-button${canRoll ? "" : " disabled"}${rolling ? " rolling" : ""}`;
      const diceFaces = sprintRoll || dice.length > 1
        ? `
          <rect class="trail-dice-body" x="432" y="318" width="50" height="56" rx="13" ry="13"></rect>
          <rect class="trail-dice-body" x="498" y="318" width="50" height="56" rx="13" ry="13"></rect>
          <text class="trail-dice-value" x="457" y="346">${dice[0] || "?"}</text>
          <text class="trail-dice-value" x="523" y="346">${dice[1] || "?"}</text>
        `
        : `
          <rect class="trail-dice-body" x="452" y="308" width="76" height="76" rx="16" ry="16"></rect>
          <text class="trail-dice-value" x="490" y="344">${roll}</text>
        `;
      return `
        <g id="trailDiceButton" class="${classes}" role="button" tabindex="${canRoll ? "0" : "-1"}" aria-label="Roll Trail die">
          ${diceFaces}
          <text class="trail-dice-caption" x="490" y="399">${sprintRoll ? "ROLL 2D6" : `ROLL D${sides}`}</text>
        </g>
      `;
    }

    function renderTrailTokenSvg(role, point, stacked) {
      const offset = stacked ? (role === DOM ? -13 : 13) : 0;
      const tokenY = point.y - 18;
      const label = role === DOM ? "D" : "S";
      return `
        <g>
          <circle class="trail-token-marker ${role}" cx="${(point.x + offset).toFixed(1)}" cy="${tokenY.toFixed(1)}" r="15"></circle>
          <text class="trail-token-label" x="${(point.x + offset).toFixed(1)}" y="${tokenY.toFixed(1)}">${label}</text>
        </g>
      `;
    }

    function renderTrailBoard() {
      const trail = state.trail || createTrailState();
      els.board.innerHTML = "";
      els.board.className = "trail-layout";
      const board = document.createElement("div");
      board.className = "trail-board";
      const route = trailPathData(trailRoutePoints());
      const spacePoints = trail.spaces.map((_, index) => trailSegmentTextPoints(index).center);
      const slideOverlays = renderTrailSlides(spacePoints);
      const segments = trail.spaces.map((rawType, index) => {
        const type = effectiveTrailSpaceType(index);
        const occupied = trail.positions.dom === index || trail.positions.sub === index;
        const selectable = trailSpaceSelectionCandidate(index);
        const doubled = type === "cash" && trailCashMultiplier(index) > 1;
        const extraClasses = `${selectable ? " selectable" : ""}${doubled ? " doubled" : ""}`;
        if (type === "finish") {
          const center = trailSegmentTextPoints(index).center;
          return `<circle class="trail-segment ${type}${occupied ? " occupied" : ""}" cx="${center.x.toFixed(1)}" cy="${center.y.toFixed(1)}" r="45"></circle>`;
        }
        return `<polygon class="trail-segment ${type}${occupied ? " occupied" : ""}${extraClasses}" data-trail-space="${index}" points="${trailSegmentPolygon(index)}"></polygon>`;
      }).join("");
      const gildedEdges = trail.spaces.map((type, index) => {
        if (type !== "cash" || trailCashMultiplier(index) <= 1) return "";
        return `<polygon class="trail-gilded-edge" points="${trailSegmentPolygon(index)}"></polygon>`;
      }).join("");
      const nodes = trail.spaces.map((rawType, index) => {
        const type = effectiveTrailSpaceType(index);
        const multiplier = type === "cash" ? trailCashMultiplier(index) : 1;
        const occupied = trail.positions.dom === index || trail.positions.sub === index;
        const shortLabel = type === "cash" ? money(trailCashValue(index)) : trailSpaceShortLabel(type);
        const textPoints = trailSegmentTextPoints(index);
        const centerLabel = shortLabel || "";
        const selectable = trailSpaceSelectionCandidate(index);
        return `
          <g class="trail-node ${type}${occupied ? " occupied" : ""}${selectable ? " selectable" : ""}" data-trail-space="${index}">
            <title>${index + 1}. ${trailSpaceLabel(type)}${multiplier > 1 ? ` x${multiplier}` : ""}</title>
            <text class="trail-node-kind" x="${textPoints.center.x.toFixed(1)}" y="${textPoints.center.y.toFixed(1)}">${multiplier > 1 ? `${centerLabel} x${multiplier}` : centerLabel}</text>
          </g>
        `;
      }).join("");
      const tokenGroups = [DOM, SUB].map((role) => {
        const point = spacePoints[trail.positions[role] || 0];
        const stacked = trail.positions.dom === trail.positions.sub;
        return renderTrailTokenSvg(role, point, stacked);
      }).join("");
      board.innerHTML = `
        <svg class="trail-svg" viewBox="0 0 980 700" role="img" aria-label="Tribute Trail winding board">
          <defs>
            <linearGradient id="trailRouteGradient" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stop-color="rgba(239,199,94,0.55)"></stop>
              <stop offset="50%" stop-color="rgba(240,78,120,0.50)"></stop>
              <stop offset="100%" stop-color="rgba(86,181,255,0.48)"></stop>
            </linearGradient>
          </defs>
          <path class="trail-route-shadow" d="${route}"></path>
          ${segments}
          ${renderTrailFinishFlag(trailSegmentTextPoints(TRAIL_FINISH).center)}
          ${renderTrailDiceButton()}
          ${slideOverlays}
          ${gildedEdges}
          ${nodes}
          ${tokenGroups}
        </svg>
      `;
      els.board.appendChild(board);
      const diceButton = board.querySelector("#trailDiceButton");
      if (diceButton) {
        diceButton.addEventListener("click", rollTrailDie);
        diceButton.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            rollTrailDie();
          }
        });
      }
      board.querySelectorAll("[data-trail-space]").forEach((segment) => {
        segment.addEventListener("click", () => selectTrailSpace(Number(segment.dataset.trailSpace)));
      });

      const panels = document.createElement("div");
      panels.className = "trail-panels";
      panels.innerHTML = `
        <section class="trail-card-panel">
          <h3>Player Deck</h3>
          ${renderTrailCardPanel(trail.lastPlayerCard, "Land on a Card space to draw from the dom or sub deck.")}
        </section>
        <section class="trail-card-panel">
          <h3>Chance Deck</h3>
          ${renderTrailCardPanel(trail.lastFateCard, "Land on a Chance space to draw from the shared deck.")}
        </section>
      `;
      els.board.appendChild(panels);
    }

    function renderCheckersBoard() {
      const checkers = state.checkers || createCheckersState();
      els.board.className = "checkers-board";
      els.board.innerHTML = "";
      const selected = checkers.selected ? `${checkers.selected[0]},${checkers.selected[1]}` : "";
      const legal = new Set((checkers.legalMoves || []).map((move) => `${move.to[0]},${move.to[1]}`));
      for (let row = 0; row < 8; row += 1) {
        for (let col = 0; col < 8; col += 1) {
          const dark = (row + col) % 2 === 1;
          const cell = document.createElement("button");
          cell.className = `checkers-square ${dark ? "dark" : "light"}`;
          if (selected === `${row},${col}`) cell.classList.add("selected");
          if (legal.has(`${row},${col}`)) cell.classList.add("legal");
          const localRole = localOnlineRole();
          cell.disabled = !state.active
            || !dark
            || (checkers.lockMode || checkers.powerMode
              ? Boolean(localRole && localRole !== DOM)
              : Boolean(localRole && localRole !== state.turn));
          cell.setAttribute("aria-label", `Checkers row ${row + 1}, column ${col + 1}`);
          cell.addEventListener("click", () => selectCheckersSquare(row, col));
          const piece = checkers.board[row] && checkers.board[row][col];
          if (piece) {
            const token = document.createElement("span");
            token.className = `checkers-piece ${piece.role}`;
            if (piece.king) token.classList.add("king");
            if (checkersPieceFrozen(row, col)) token.classList.add("frozen");
            if (checkersCoordMatches(checkers.marked, row, col)) token.classList.add("marked");
            if (checkersCoordMatches(checkers.pinned, row, col)) token.classList.add("pinned");
            token.textContent = piece.king && piece.role === SUB ? "K" : "";
            cell.appendChild(token);
          }
          els.board.appendChild(cell);
        }
      }
    }

    function renderBoard() {
      const boardWrap = els.board.closest(".board-wrap");
      if (boardWrap) boardWrap.classList.toggle("trail-board-wrap", state.currentGame === "tributeTrail");
      if (boardWrap) boardWrap.classList.toggle("four-board-wrap", state.currentGame === "tributeFour");
      if (boardWrap) boardWrap.classList.toggle("fleet-board-wrap", state.currentGame === "tributeFleet");
      if (boardWrap) boardWrap.classList.toggle("crazy8-board-wrap", state.currentGame === "tributeCrazyEights" && state.active);
      if (boardWrap) boardWrap.classList.toggle("double-solitaire-board-wrap", state.currentGame === "doubleSolitaire" && state.active);
      if (state.currentGame === "tributeChess") {
        renderChessBoard();
        return;
      }
      if (state.currentGame === "tributeCheckers") {
        renderCheckersBoard();
        return;
      }
      if (state.currentGame === "tributeTwentyOne") {
        renderTwentyOneBoard();
        return;
      }
      if (state.currentGame === "higherLower") {
        renderHigherLowerBoard();
        return;
      }
      if (state.currentGame === "tributeCrazyEights") {
        renderCrazyEightsBoard();
        return;
      }
      if (state.currentGame === "doubleSolitaire") {
        renderDoubleSolitaireBoard();
        return;
      }
      if (state.currentGame === "tributeTicTacToe") {
        renderTicTacToeBoard();
        return;
      }
      if (state.currentGame === "wheelSpin") {
        renderWheelSpinBoard();
        return;
      }
      if (state.currentGame === "tributeTrail") {
        renderTrailBoard();
        return;
      }
      if (state.currentGame === "obedienceOrders") {
        renderObedienceOrdersBoard();
        return;
      }
      if (state.currentGame === "tributeReversi") {
        renderReversiBoard();
        return;
      }
      if (state.currentGame === "tributeFleet") {
        renderFleetBoard();
        return;
      }
      els.board.innerHTML = "";
      els.board.className = "board";
      const winSet = new Set(state.winningCells.map(([r, c]) => `${r},${c}`));
      for (let row = 0; row < ROWS; row += 1) {
        for (let col = 0; col < COLS; col += 1) {
          const cell = document.createElement("button");
          const value = state.board[row][col];
          cell.className = `cell ${value}`;
          if (winSet.has(`${row},${col}`)) cell.classList.add("win");
          if (isColumnBlockedForSub(col)) cell.classList.add("blocked");
          cell.setAttribute("aria-label", value ? `${value} token, column ${col + 1}` : `empty cell, column ${col + 1}`);
          cell.disabled = !state.active || lowestOpenRow(col) < 0 || isColumnBlockedForSub(col) || (localOnlineRole() && localOnlineRole() !== state.turn);
          cell.addEventListener("click", () => dropToken(col));
          els.board.appendChild(cell);
        }
      }
    }

    function renderTicTacToeBoard() {
      els.board.innerHTML = "";
      els.board.className = "ttt-shell";
      state.ticTacToe = normalizeTicTacToeState(state.ticTacToe);
      const game = state.ticTacToe;
      const format = currentTicTacToeFormat();
      const formatOptions = ticTacToeFormatOptions();
      const canPickFormat = !state.active && state.pot <= 0 && (!state.online.room || localOnlineRole() === DOM);
      const canStartMatch = !state.active && state.pot <= 0 && !state.pendingWager && !state.normalReplayPrompt && (!state.online.room || !localOnlineRole() || localOnlineRole() === DOM);
      const canContinue = game.pendingNextBoard && (!state.online.room || !localOnlineRole() || localOnlineRole() === DOM);
      const setup = document.createElement("div");
      setup.className = `ttt-match-panel ${(!state.active || game.pendingNextBoard) ? "ttt-match-popup" : ""}`.trim();
      setup.innerHTML = `
        <div class="ttt-score-row">
          <span>${escapeHtml(state.names.sub)} <strong>${game.scores.sub}</strong></span>
          <span>Board ${game.boardNumber}</span>
          <span>${escapeHtml(state.names.dom)} <strong>${game.scores.dom}</strong></span>
        </div>
        <div class="ttt-format-row">
          ${formatOptions.map((option) => `
            <button type="button" data-ttt-format="${option.id}" class="${option.id === format.id ? "active" : ""}"${canPickFormat ? "" : " disabled"}>${option.label}</button>
          `).join("")}
        </div>
        <p class="ttt-match-note">${format.label}: first to ${format.target} board wins${game.scores.draws ? ` · Draws ${game.scores.draws}` : ""}.</p>
        ${!game.matchActive && state.pot <= 0 && !state.normalReplayPrompt ? `<button type="button" class="primary ttt-next-board-btn" data-ttt-start${canStartMatch ? "" : " disabled"}>Start</button>` : ""}
        ${game.pendingNextBoard ? `<button type="button" class="primary ttt-next-board-btn" data-ttt-next-board${canContinue ? "" : " disabled"}>Start Next Board</button>` : ""}
      `;
      setup.addEventListener("click", (event) => {
        const formatButton = event.target.closest("[data-ttt-format]");
        if (formatButton && !formatButton.disabled) {
          setTicTacToeFormat(formatButton.dataset.tttFormat);
          return;
        }
        const nextButton = event.target.closest("[data-ttt-next-board]");
        if (nextButton && !nextButton.disabled) continueTicTacToeMatch();
        const startButton = event.target.closest("[data-ttt-start]");
        if (startButton && !startButton.disabled) startTicTacToeSetupMatch();
      });
      els.board.appendChild(setup);

      const grid = document.createElement("div");
      grid.className = "ttt-board";
      const winSet = new Set((state.winningCells || []).map(([row, col]) => `${row},${col}`));
      for (let row = 0; row < 3; row += 1) {
        for (let col = 0; col < 3; col += 1) {
          const value = state.board[row] ? state.board[row][col] : EMPTY;
          const cell = document.createElement("button");
          cell.className = `ttt-cell ${value || ""}`;
          if (winSet.has(`${row},${col}`)) cell.classList.add("win");
          cell.textContent = value === SUB ? "X" : (value === DOM ? "O" : "");
          cell.setAttribute("aria-label", value ? `${labelFor(value)} mark` : `empty tic tac toe square`);
          cell.disabled = !state.active || Boolean(value) || (localOnlineRole() && localOnlineRole() !== state.turn);
          cell.addEventListener("click", () => playTicTacToe(row, col));
          grid.appendChild(cell);
        }
      }
      els.board.appendChild(grid);
    }

    function renderObedienceOrdersBoard() {
      const obedience = ensureObedienceOrder();
      els.board.innerHTML = "";
      els.board.className = "obedience-board";
      const canDom = obedienceControlsAllowed(DOM);
      const canSub = obedienceControlsAllowed(SUB);
      const order = obedience.order || [];
      const input = obedience.input || [];
      const isRecall = obedience.phase === "recall";
      const layout = isRecall && obedience.layout.length === OBEDIENCE_GRID_SIZE
        ? obedience.layout
        : Array.from({ length: OBEDIENCE_GRID_SIZE }, (_, index) => index);
      const activeTwist = OBEDIENCE_TWISTS[obedience.twist] || OBEDIENCE_TWISTS.clean;
      const pendingTwist = OBEDIENCE_TWISTS[obedience.pendingTwist] || OBEDIENCE_TWISTS.clean;
      const orderMap = new Map();
      order.forEach((cell, index) => {
        if (!orderMap.has(cell)) orderMap.set(cell, []);
        orderMap.get(cell).push(index + 1);
      });

      const stats = document.createElement("div");
      stats.className = "obedience-stats";
      stats.innerHTML = `
        <span>Pressure <strong>${Number(obedience.pressure || 1)}</strong> / ${OBEDIENCE_MAX_PRESSURE}</span>
        <span>Focus <strong>${Number(obedience.focus || 0)}</strong></span>
        <span>Streak <strong>${escapeHtml(obedience.streakLabel || "Unproven")}</strong></span>
        <span>Order <strong>${order.length}</strong> tiles</span>
        <span>Payout <strong>${money(obediencePressurePayout())}</strong></span>
        <span>Tribute <strong>${money(Number(obedience.tributePaid || 0))}</strong></span>
      `;
      els.board.appendChild(stats);

      const twistBar = document.createElement("div");
      twistBar.className = "obedience-twists";
      twistBar.innerHTML = Object.entries(OBEDIENCE_TWISTS).map(([id, twist]) => `
        <button class="${obedience.pendingTwist === id ? "active" : ""}" data-obedience-twist="${id}"${canDom && !isRecall ? "" : " disabled"}>
          <strong>${escapeHtml(twist.label)}</strong>
          <span>${escapeHtml(twist.detail)}</span>
        </button>
      `).join("");
      els.board.appendChild(twistBar);

      const pressure = document.createElement("div");
      pressure.className = "obedience-pressure";
      pressure.innerHTML = `
        <span>Active: <strong>${escapeHtml(activeTwist.label)}</strong></span>
        <span>Next: <strong>${escapeHtml(pendingTwist.label)}</strong></span>
      `;
      els.board.appendChild(pressure);

      const grid = document.createElement("div");
      grid.className = `obedience-grid ${isRecall ? "recall" : ""}`;
      layout.forEach((cell) => {
        const button = document.createElement("button");
        const tile = obedienceTile(cell);
        const picked = orderMap.has(cell);
        const entered = input.includes(cell);
        const revealed = isRecall && Number.isInteger(obedience.revealedIndex) && order[obedience.revealedIndex] === cell;
        const blind = isRecall && obedience.twist === "blind" && !revealed && !entered;
        button.className = `obedience-cell tone-${tile.tone} ${picked ? "picked" : ""} ${entered ? "entered" : ""} ${revealed ? "revealed" : ""}`;
        button.dataset.obedienceCell = String(cell);
        button.disabled = isRecall ? !canSub : !canDom;
        button.setAttribute("aria-label", `${tile.label} tile`);
        const marks = picked && !isRecall
          ? orderMap.get(cell).map((step) => `<span>${step}</span>`).join("")
          : "";
        const status = isRecall ? (entered ? "Done" : (revealed ? "Next" : "Pick")) : (picked ? "Set" : "Set");
        button.innerHTML = `
          <strong>${blind ? escapeHtml(tile.icon) : escapeHtml(tile.label)}</strong>
          <em>${status}</em>
          <small>${marks}</small>
        `;
        grid.appendChild(button);
      });
      els.board.appendChild(grid);

      const message = document.createElement("p");
      message.className = "obedience-message";
      message.textContent = obedience.message || "Dom picks an order on the grid.";
      els.board.appendChild(message);

      const actions = document.createElement("div");
      actions.className = "obedience-actions";
      if (isRecall) {
        actions.innerHTML = `
          <button class="primary" data-obedience-action="focus"${canSub && obedience.focus > 0 ? "" : " disabled"}>Use Focus</button>
          <button data-obedience-action="reset"${canDom ? "" : " disabled"}>Reset Order</button>
        `;
      } else if (obedience.phase === "complete") {
        actions.innerHTML = `
          <button class="primary" data-obedience-action="press"${canDom ? "" : " disabled"}>Press</button>
          <button data-obedience-action="send"${canDom ? "" : " disabled"}>Repeat Same</button>
          <button data-obedience-action="cashout"${canDom ? "" : " disabled"}>Cash Out</button>
          <button data-obedience-action="reset"${canDom ? "" : " disabled"}>New Order</button>
        `;
      } else if (obedience.phase === "cashed") {
        actions.innerHTML = `
          <button class="primary" data-obedience-action="reset"${canDom ? "" : " disabled"}>New Order</button>
        `;
      } else {
        actions.innerHTML = `
          <button class="primary" data-obedience-action="send"${canDom && order.length >= OBEDIENCE_MIN_ORDER ? "" : " disabled"}>Send Order</button>
          <button data-obedience-action="undo"${canDom && order.length ? "" : " disabled"}>Undo</button>
          <button data-obedience-action="clear"${canDom && order.length ? "" : " disabled"}>Clear</button>
        `;
      }
      els.board.appendChild(actions);
    }

    function renderReversiBoard() {
      const board = reversiBoard();
      const legal = state.active ? reversiLegalMoves(state.turn) : [];
      const legalMap = new Map(legal.map((move) => [`${move.row},${move.col}`, move]));
      const score = reversiScore(board);
      const last = state.reversi && state.reversi.lastMove;
      const viewer = localOnlineRole();
      const showNumbers = reversiCanSeeFlipNumbers(viewer);
      const showWarnings = reversiCanSeePriorityWarnings(viewer);
      els.board.innerHTML = "";
      els.board.className = "reversi-table";

      const status = document.createElement("div");
      status.className = "reversi-status";
      status.innerHTML = `
        <span>${escapeHtml(state.names.sub || "Sub")} <strong>${score.sub}</strong></span>
        <span>${escapeHtml(state.names.dom || "Dom")} <strong>${score.dom}</strong></span>
        <span>Legal <strong>${legal.length}</strong></span>
      `;
      els.board.appendChild(status);

      const grid = document.createElement("div");
      grid.className = "reversi-board";
      for (let row = 0; row < 8; row += 1) {
        for (let col = 0; col < 8; col += 1) {
          const value = board[row][col];
          const key = `${row},${col}`;
          const move = legalMap.get(key);
          const cell = document.createElement("button");
          cell.className = `reversi-cell ${value || ""} ${move ? "legal" : ""}`;
          if (move && showWarnings && reversiIsCorner(row, col)) cell.classList.add("corner-warning");
          if (move && showWarnings && !reversiIsCorner(row, col) && reversiIsEdge(row, col)) cell.classList.add("edge-warning");
          if (reversiLockedMatches(row, col)) cell.classList.add("locked");
          if (last && last.row === row && last.col === col) cell.classList.add("last");
          const role = localOnlineRole();
          const commandPending = state.reversi && state.reversi.commandWindow && !state.reversi.commandMode;
          const commandViewer = state.reversi && state.reversi.commandMode && state.turn === SUB && (!role || role === DOM);
          cell.disabled = !state.active || !move || commandPending || (role && role !== state.turn && !commandViewer);
          cell.setAttribute("aria-label", value
            ? `${labelFor(value)} disc row ${row + 1}, column ${col + 1}`
            : `empty reversi square row ${row + 1}, column ${col + 1}`);
          if (value) {
            const disc = document.createElement("span");
            disc.className = "reversi-disc";
            cell.appendChild(disc);
          } else if (move) {
            const hint = document.createElement("span");
            hint.className = "reversi-hint";
            hint.textContent = showNumbers ? String(move.flips.length) : "";
            cell.appendChild(hint);
          }
          cell.addEventListener("click", () => playReversiMove(row, col));
          grid.appendChild(cell);
        }
      }
      els.board.appendChild(grid);
    }

    function renderWheelSpinBoard() {
      refreshWheelLimitWindow();
      els.board.className = "wheel-table";
      els.board.innerHTML = "";
      const stage = document.createElement("div");
      stage.className = "wheel-stage";
      const canvas = document.createElement("canvas");
      canvas.className = "wheel-canvas";
      canvas.width = 720;
      canvas.height = 720;
      stage.appendChild(canvas);
      const button = document.createElement("button");
      button.className = "primary wheel-center-button";
      button.classList.toggle("ready", !state.wheel.spinning && state.wheel.unlocked);
      button.classList.toggle("locked", !state.wheel.spinning && !state.wheel.unlocked);
      button.textContent = wheelCenterButtonText();
      button.disabled = wheelCenterButtonDisabled();
      button.addEventListener("click", () => {
        if (!state.wheel.spinning) {
          spinWheel();
        }
      });
      button.title = "Spin";
      stage.appendChild(button);
      const result = document.createElement("div");
      result.className = "wheel-result";
      result.textContent = wheelResultText();
      els.board.appendChild(stage);
      els.board.appendChild(result);
      animateWheelCanvas(canvas, result, button);
      if (renderWheelSpinBoard.timer) window.clearTimeout(renderWheelSpinBoard.timer);
      if (state.currentGame === "wheelSpin" && state.screen === "game" && !state.wheel.spinning) {
        renderWheelSpinBoard.timer = window.setTimeout(render, 1000);
      }
    }

    function wheelResultText() {
      if (state.wheel.spinning) return "The wheel is slowing down...";
      if (state.wheel.result !== null) {
        const notes = (state.wheel.resultNotes || []).length ? ` (${state.wheel.resultNotes.join(", ")})` : "";
        if (isThroneSession()) {
          if (state.wheel.result === WHEEL_THRONE_FREE_SPIN) return `Result: ${wheelValueText(state.wheel.result)}${notes}`;
          if (Number(state.wheel.result || 0) > 0) return `Result: ${wheelValueText(state.wheel.result)} -> Throne`;
          return `Result: ${wheelValueText(state.wheel.result)}`;
        }
        return `Result: ${wheelValueText(state.wheel.result)}${notes} -> ${wheelSignedMoney(Number(state.wheel.finalPayout || 0))}`;
      }
      if (isThroneSession()) return `${state.names.dom} has ${wheelSpinsRemaining()} Throne spins left this hour.`;
      if (!state.wheel.unlocked) return `${state.names.dom} must unlock the wheel.`;
      return `${state.names.sub} can press the center to spin.`;
    }

    function wheelCenterButtonText() {
      if (isThroneSession()) {
        if (state.wheel.spinning) return "Spinning";
        if (wheelSpinsRemaining() <= 0) return "No Spins";
        return "Spin";
      }
      if (!state.wheel.spinning && !state.wheel.unlocked) return "Locked";
      if (!state.wheel.spinning) return "Spin";
      return "Spinning";
    }

    function wheelCenterButtonDisabled() {
      if (!state.active) return true;
      if (isThroneSession()) return Boolean(!state.wheel.spinning && ((localOnlineRole() && localOnlineRole() !== DOM) || wheelSpinsRemaining() <= 0)) || state.wheel.spinning;
      if (!state.wheel.spinning) return Boolean(!state.wheel.unlocked || (localOnlineRole() && localOnlineRole() !== SUB) || wheelSpinsRemaining() <= 0);
      return true;
    }

    function wheelSliceDisplay(value) {
      if (value === WHEEL_THRONE_FREE_SPIN) {
        return {
          label: "+FREE",
          color: "#24614c",
          textColor: "#f6ffe9",
          large: true,
          affected: false
        };
      }
      const colors = {
        0: "#15110f",
        "-10": "#4b0f18",
        "-5": "#69202b",
        1: "#214a37",
        2: "#6f1f34",
        5: "#3a213f",
        10: "#7a5520",
        25: "#d4a13a",
        30: "#b88936",
        60: "#f0c766"
      };
      let displayValue = Number(value || 0);
      let affected = false;
      if (!isThroneSession() && state.wheel.greedyDom) {
        if (value === 25) {
          displayValue = 60;
          affected = true;
        } else if (value === 0) {
          displayValue = 30;
          affected = true;
        } else if (value === 1 || value === 2 || value === 5 || value === 10) {
          displayValue = 0;
          affected = true;
        }
      }
      if (!isThroneSession() && displayValue > 0 && state.wheel.blessActive) {
        const upgraded = wheelUpgradeValue(value);
        if (upgraded > displayValue) {
          displayValue = upgraded;
          affected = true;
        }
      }
      return {
        label: displayValue === 0 ? "BLANK" : wheelSignedMoney(displayValue),
        color: colors[displayValue] || colors[value] || "#47332f",
        textColor: displayValue < 0 ? "#ffe1e6" : (displayValue === 0 ? "#f6efe3" : "#fff2c9"),
        large: displayValue >= 25,
        affected
      };
    }

    function renderWheelDomTools() {
      const tools = els.wheelPowerPanel;
      if (!tools) return;
      const visible = state.screen === "game" && state.currentGame === "wheelSpin";
      tools.classList.toggle("hidden", !visible);
      tools.innerHTML = "";
      if (!visible) return;
      if (isThroneSession()) {
        const limitRow = document.createElement("div");
        limitRow.className = "wheel-tool-row";
        limitRow.innerHTML = `<strong>Throne Wheel</strong><span>${wheelSpinsRemaining()} spins left this hour. Cash slices open Throne automatically, + free spin keeps the count, and blank does nothing. Resets in ${formatWheelTime(wheelLimitRemainingMs())}.</span>`;
        const layoutRow = document.createElement("div");
        layoutRow.className = "wheel-tool-row";
        layoutRow.innerHTML = `<strong>Layout</strong><span>1x $100, 2x $50, 4x $25, 6x $10, 10x $5, 5x + free spin, 8 blanks.</span>`;
        tools.appendChild(limitRow);
        tools.appendChild(layoutRow);
        return;
      }
      const canUse = canUseWheelDomTools();
      const limitRow = document.createElement("div");
      limitRow.className = "wheel-tool-row";
      limitRow.innerHTML = `<strong>Refresh</strong><span>${wheelSpinsRemaining()} spins left. Powers: Bless ${wheelPowerRemaining("bless")}, Greedy ${wheelPowerRemaining("greedy")}, Nudge ${wheelPowerRemaining("nudge")}. Resets in ${formatWheelTime(wheelLimitRemainingMs())}.</span>`;

      const modeRow = document.createElement("div");
      modeRow.className = "wheel-tool-row wheel-risk-row";
      modeRow.innerHTML = `<strong>Risk</strong>`;
      Object.entries(WHEEL_RISK_MODES).forEach(([mode, info]) => {
        const button = document.createElement("button");
        button.textContent = `${info.label} ${money(info.cost)}`;
        button.classList.toggle("active", state.wheel.riskMode === mode);
        button.disabled = !canUse || state.wheel.unlocked;
        button.addEventListener("click", () => setWheelRiskMode(mode));
        modeRow.appendChild(button);
      });
      const modeNote = document.createElement("span");
      const selectedMode = wheelRiskModeInfo();
      modeNote.className = "wheel-risk-note";
      modeNote.textContent = `Unlock costs ${money(selectedMode.cost)}. ${wheelRiskModeBonusText(selectedMode)} ${selectedMode.prizeBlankRadius} blank${selectedMode.prizeBlankRadius === 1 ? "" : "s"} on each side of each prize.${selectedMode.extraMinus ? ` Adds ${selectedMode.extraMinus} minus slots.` : ""}`;
      modeRow.appendChild(modeNote);

      const unlockRow = document.createElement("div");
      unlockRow.className = "wheel-tool-row wheel-unlock-row";
      unlockRow.classList.toggle("unlocked", state.wheel.unlocked);
      unlockRow.innerHTML = `<strong>${state.wheel.unlocked ? "Ready" : "Unlock"}</strong>`;
      const unlockButton = document.createElement("button");
      unlockButton.className = "primary wheel-unlock-button";
      unlockButton.classList.toggle("unlocked", state.wheel.unlocked);
      unlockButton.textContent = state.wheel.unlocked ? "Wheel Unlocked" : `Unlock ${selectedMode.label}`;
      unlockButton.disabled = !canUse || state.wheel.unlocked || wheelSpinsRemaining() <= 0 || state.domVault < selectedMode.cost;
      unlockButton.addEventListener("click", unlockWheelSpin);
      unlockRow.appendChild(unlockButton);
      const unlockNote = document.createElement("span");
      unlockNote.className = "wheel-unlock-note";
      unlockNote.textContent = state.wheel.unlocked
        ? `READY: ${state.names.sub} can press Spin now. ${selectedMode.label}: ${wheelRiskModeBonusText(selectedMode)}`
        : `Locked: ${state.names.dom} pays ${money(selectedMode.cost)} to play. ${state.names.sub} cannot spin until this is unlocked.`;
      unlockRow.appendChild(unlockNote);

      const blessRow = document.createElement("div");
      blessRow.className = "wheel-tool-row";
      blessRow.innerHTML = `<strong>Bless</strong>`;
      const blessButton = document.createElement("button");
      blessButton.textContent = "Bless All";
      blessButton.classList.toggle("active", state.wheel.blessActive);
      blessButton.disabled = !canUse || (!state.wheel.blessActive && wheelPowerRemaining("bless") <= 0);
      blessButton.addEventListener("click", toggleWheelBless);
      blessRow.appendChild(blessButton);

      const greedyRow = document.createElement("div");
      greedyRow.className = "wheel-tool-row";
      greedyRow.innerHTML = `<strong>Greedy</strong>`;
      const greedyButton = document.createElement("button");
      greedyButton.textContent = "Greedy Dom";
      greedyButton.classList.toggle("active", state.wheel.greedyDom);
      greedyButton.disabled = !canUse || (!state.wheel.greedyDom && wheelPowerRemaining("greedy") <= 0);
      greedyButton.addEventListener("click", toggleGreedyDom);
      greedyRow.appendChild(greedyButton);

      const nudgeRow = document.createElement("div");
      nudgeRow.className = "wheel-tool-row";
      nudgeRow.innerHTML = `<strong>Nudge</strong>`;
      [
        { label: "Back 2", direction: -2 },
        { label: "Back 1", direction: -1 },
        { label: "Forward 1", direction: 1 },
        { label: "Forward 2", direction: 2 }
      ].forEach(({ label, direction }) => {
        const button = document.createElement("button");
        button.textContent = label;
        button.disabled = !canNudgeWheel();
        button.addEventListener("click", () => nudgeWheel(direction));
        nudgeRow.appendChild(button);
      });

      const status = document.createElement("div");
      status.className = "wheel-result wheel-tool-status";
      status.classList.toggle("ready", state.wheel.unlocked);
      const bits = [];
      if (state.wheel.unlocked) bits.push(`WHEEL UNLOCKED: ${state.names.sub} can spin now`);
      bits.push(`${selectedMode.label}: unlock ${money(selectedMode.cost)}, ${wheelRiskModeBonusText(selectedMode).toLowerCase()}`);
      if (state.wheel.blessActive) bits.push("Bless armed: all cash slices upgrade");
      if (state.wheel.greedyDom) bits.push(`Greedy Dom: ${wheelGreedyText(selectedMode)}, minus stays live`);
      if (state.wheel.nudgeUsed) bits.push("Nudge used");
      status.textContent = bits.join(" | ") || `${state.names.dom} can arm Bless, arm Greedy, or nudge 1 or 2 spaces after the result.`;

      tools.appendChild(limitRow);
      tools.appendChild(modeRow);
      tools.appendChild(unlockRow);
      tools.appendChild(blessRow);
      tools.appendChild(greedyRow);
      tools.appendChild(nudgeRow);
      tools.appendChild(status);
    }

    function animateWheelCanvas(canvas, resultEl, buttonEl) {
      const draw = () => {
        const now = Date.now();
        if (state.wheel.spinning) {
          const elapsed = now - Number(state.wheel.spinStartedAt || now);
          const duration = Math.max(1, Number(state.wheel.spinDuration || 1));
          const progress = Math.min(1, elapsed / duration);
          state.wheel.angle = currentWheelAngle(now);
          if (progress >= 1) {
            finishWheelSpin();
          }
        }
        drawWheel(canvas, state.wheel);
        resultEl.textContent = wheelResultText();
        buttonEl.textContent = wheelCenterButtonText();
        buttonEl.disabled = wheelCenterButtonDisabled();
        if (state.currentGame === "wheelSpin" && state.screen === "game" && state.wheel.spinning) {
          window.requestAnimationFrame(draw);
        }
      };
      draw();
    }

    function drawWheel(canvas, wheel) {
      const ctx = canvas.getContext("2d");
      const size = canvas.width;
      const center = size / 2;
      const radius = center - 18;
      const sliceAngle = Math.PI * 2 / 36;
      ctx.clearRect(0, 0, size, size);
      (wheel.slices || []).forEach((value, index) => {
        const display = wheelSliceDisplay(value);
        const start = Number(wheel.angle || 0) + index * sliceAngle;
        const end = start + sliceAngle;
        ctx.beginPath();
        ctx.moveTo(center, center);
        ctx.arc(center, center, radius, start, end);
        ctx.closePath();
        ctx.fillStyle = display.color;
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 230, 176, 0.28)";
        ctx.lineWidth = 2;
        ctx.stroke();
        const blessed = wheel.blessActive && value > 0 && wheelUpgradeValue(value) > value;
        const greedyAffected = wheel.greedyDom && (value === 0 || value === 1 || value === 2 || value === 5 || value === 10 || value === 25);
        if (blessed || greedyAffected) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(center, center);
          ctx.arc(center, center, radius - 8, start + 0.008, end - 0.008);
          ctx.closePath();
          ctx.strokeStyle = greedyAffected ? "rgba(255, 244, 214, 0.92)" : "rgba(239, 199, 94, 0.88)";
          ctx.lineWidth = greedyAffected ? 7 : 5;
          ctx.stroke();
          ctx.restore();
        }

        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(start + sliceAngle / 2);
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillStyle = display.textColor;
        ctx.font = display.large ? "700 31px Georgia, serif" : "700 24px Georgia, serif";
        ctx.fillText(display.label, radius - 22, 0);
        ctx.restore();
      });
      ctx.beginPath();
      ctx.arc(center, center, 64, 0, Math.PI * 2);
      ctx.fillStyle = "#1c1412";
      ctx.fill();
      ctx.strokeStyle = "rgba(239, 199, 94, 0.82)";
      ctx.lineWidth = 6;
      ctx.stroke();
      ctx.fillStyle = "#efc75e";
      ctx.font = "700 30px Georgia, serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("SPIN", center, center);
    }

    function renderChessBoard() {
      els.board.className = "chess-board";
      els.board.innerHTML = "";
      if (state.chess && state.chess.setupPending) {
        els.board.innerHTML = `<div class="entry">Chess settings are being chosen.</div>`;
        return;
      }
      const game = chessEngine();
      if (!game) {
        els.board.innerHTML = `<div class="entry">Chess engine unavailable. Check the chess.js script connection.</div>`;
        return;
      }
      const legalTargets = new Set((state.chess.legalMoves || []).flatMap((move) => {
        const castleRook = chessCastleRookSquare(move);
        return castleRook ? [move.to, castleRook] : [move.to];
      }));
      const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
      const localRole = localOnlineRole();
      const isLocalTurn = state.active && (!localRole || localRole === roleForChessColor(game.turn()));
      els.board.classList.add(isLocalTurn ? "your-turn" : "waiting-turn");
      const localColor = localRole && localRole !== SPECTATOR ? colorForChessRole(localRole) : "w";
      const ranks = localColor === "b" ? [1, 2, 3, 4, 5, 6, 7, 8] : [8, 7, 6, 5, 4, 3, 2, 1];
      const fileIndexes = localColor === "b" ? [7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6, 7];
      const shieldedQueenSquare = state.chess.queenShield ? findDomQueenSquare(game) : null;
      const checkedKingSquare = checkedChessKingSquare(game);
      for (const rank of ranks) {
        for (const fileIndex of fileIndexes) {
          const square = `${files[fileIndex]}${rank}`;
          const piece = game.get(square);
          const cell = document.createElement("button");
          cell.className = `chess-square ${(rank + fileIndex) % 2 ? "light" : "dark"}`;
          if (state.chess.selected === square) cell.classList.add("selected");
          if (legalTargets.has(square)) cell.classList.add("legal");
          if (state.chess.freezeSquare === square) cell.classList.add("frozen");
          if (checkedKingSquare === square) cell.classList.add("in-check");
          if (shieldedQueenSquare === square) cell.classList.add("queen-shielded");
          if (piece && (isQueenGazedSquare(game, square, piece) || isQueenLeashedSquare(game, square, piece))) {
            cell.classList.add("queen-affected");
          }
          if (piece) cell.classList.add(roleForChessColor(piece.color) === DOM ? "dom-piece" : "sub-piece");
          cell.textContent = piece ? chessPieceGlyph(piece) : "";
          cell.setAttribute("aria-label", piece ? `${piece.color} ${piece.type} on ${square}` : `empty ${square}`);
          cell.disabled = !state.active || localOnlineRole() === SPECTATOR;
          cell.addEventListener("click", () => chessSquareClick(square));
          els.board.appendChild(cell);
        }
      }
    }

    function renderHigherLowerBoard() {
      const game = state.higherLower || createHigherLowerState();
      if (state.currentGame === "higherLower") settleHigherLowerPulse(false);
      const role = localOnlineRole();
      const canAct = higherLowerCanSubAct();
      const domCanAct = higherLowerDomControlsAllowed(role);
      const showSubControls = !role || role === SUB;
      const showDomControls = !role || role === DOM;
      els.board.className = "higher-lower-table";
      els.board.innerHTML = "";

      const panel = document.createElement("section");
      panel.className = "higher-lower-panel";

      const cards = document.createElement("div");
      cards.className = "higher-lower-cards";
      const currentWrap = document.createElement("div");
      currentWrap.className = "higher-lower-card-slot current";
      currentWrap.innerHTML = `<span>Current</span>`;
      const hideCurrentFromView = Boolean(game.hideCurrentCard && role !== DOM);
      currentWrap.appendChild(game.currentCard
        ? renderPlayingCard(hideCurrentFromView ? "HIDDEN_POWER" : game.currentCard, false)
        : renderPlayingCard("AS", true));
      cards.appendChild(currentWrap);
      const futureWrap = document.createElement("div");
      futureWrap.className = "higher-lower-future-slot";
      futureWrap.innerHTML = `<span>Next</span>`;
      const futurePile = document.createElement("div");
      futurePile.className = "higher-lower-future-pile";
      const upcomingCards = state.active ? higherLowerUpcomingCards(3) : [];
      for (let index = 0; index < 3; index += 1) {
        const card = upcomingCards[index];
        const visibleToDom = Boolean(card && domCanAct);
        const rendered = card
          ? renderPlayingCard(visibleToDom ? card : "AS", !visibleToDom)
          : renderPlayingCard("AS", true);
        rendered.style.setProperty("--future-card-index", index);
        rendered.style.setProperty("--future-card-z", 3 - index);
        futurePile.appendChild(rendered);
      }
      futureWrap.appendChild(futurePile);
      cards.appendChild(futureWrap);

      const status = document.createElement("div");
      status.className = "higher-lower-status";
      const target = higherLowerTarget(game.targetStreak || game.queuedTargetStreak);
      const wrongStreak = Number(game.wrongStreak || 0);
      const wrongPenalty = Number(game.wrongPenalty || 1);
      const totalWrongs = Number(game.totalWrongs || 0);
      const streak = Number(game.streak || 0);
      const cashoutRemaining = Math.max(0, target - streak);
      const powerRemaining = streak > 0 && streak % 5 === 0 ? 5 : 5 - (streak % 5);
      const missesUntilPenalty = wrongStreak > 0 && wrongStreak % HIGHER_LOWER_WRONG_STEP === 0
        ? HIGHER_LOWER_WRONG_STEP
        : (HIGHER_LOWER_WRONG_STEP - (wrongStreak % HIGHER_LOWER_WRONG_STEP));
      const pulseRemaining = game.pulseActive
        ? Math.max(0, HIGHER_LOWER_PULSE_SECONDS - Number(game.pulseAdded || 0))
        : 0;
      status.innerHTML = `
        <strong>${state.active ? "Call The Next Card" : "Ready For A Run"}</strong>
        <p>${escapeHtml(game.powerMenuOpen && role !== DOM ? `${state.names.dom} is choosing your fate.` : (game.fateMessage || game.result || (state.active ? `Reach ${target} correct calls in a row to cash out. Wrong calls add ${money(wrongPenalty)} to the pending owed counter; every ${HIGHER_LOWER_WRONG_STEP} wrong in a row raises that by ${money(1)}.` : `${state.names.dom} chooses the cash-out streak. ${state.names.sub} has to hit it without a mistake resetting the streak.`)))}</p>
        <div class="higher-lower-meter">
          <span class="primary countdown">Cashout In <b>${cashoutRemaining}</b></span>
          <span class="primary">Power In <b>${powerRemaining}</b></span>
          <span class="primary">Powers <b>${Number(game.powerCharges || 0)}</b></span>
          ${game.pulseActive ? `<span class="primary pulse">Pulse <b>${pulseRemaining}s</b></span>` : ""}
          <span>Penalty In <b>${missesUntilPenalty}</b></span>
          <span>Wrong +<b>${money(wrongPenalty)}</b></span>
          <span>Misses <b>${totalWrongs}</b></span>
        </div>
      `;

      const actions = document.createElement("div");
      actions.className = "higher-lower-actions";
      if (showSubControls) {
        const guessOptions = game.suitCallPending
          ? [["S", "Spades"], ["H", "Hearts"], ["D", "Diamonds"], ["C", "Clubs"]]
          : [["lower", "Lower"], ["same", "Even"], ["higher", "Higher"]];
        guessOptions.forEach(([guess, label]) => {
          const button = document.createElement("button");
          button.type = "button";
          button.textContent = label;
          button.disabled = !canAct;
          button.addEventListener("click", () => higherLowerGuess(guess));
          actions.appendChild(button);
        });
      }

      if (showDomControls) {
        const powers = document.createElement("button");
        powers.type = "button";
        powers.textContent = game.powerMenuOpen ? "Close Powers" : `Powers (${Number(game.powerCharges || 0)})`;
        powers.disabled = !state.active || !domCanAct || Number(game.powerCharges || 0) <= 0;
        powers.addEventListener("click", () => toggleHigherLowerPowerMenu());
        actions.appendChild(powers);
      }

      const setup = document.createElement("div");
      setup.className = "higher-lower-run-options";
      const setupTarget = higherLowerTarget(game.queuedTargetStreak || game.targetStreak);
      setup.innerHTML = `
        <label class="higher-lower-slider">
          <span>Cash-out streak <b>${setupTarget}</b></span>
          <input type="range" min="${HIGHER_LOWER_MIN_TARGET}" max="${HIGHER_LOWER_MAX_TARGET}" value="${setupTarget}" />
        </label>
        <button type="button" class="primary"><strong>Start Run</strong><span>${state.names.sub} needs ${setupTarget} right in a row</span></button>
      `;
      const slider = setup.querySelector("input");
      const sliderValue = setup.querySelector("b");
      const startButton = setup.querySelector("button");
      const setupLabel = startButton.querySelector("span");
      const canConfigure = !state.active && !state.pendingWager && higherLowerDomControlsAllowed();
      slider.disabled = !canConfigure;
      startButton.disabled = !canConfigure;
      slider.addEventListener("input", () => {
        const value = higherLowerTarget(slider.value);
        sliderValue.textContent = value;
        setupLabel.textContent = `${state.names.sub} needs ${value} right in a row`;
      });
      startButton.addEventListener("click", () => requestHigherLowerRun(slider.value));

      panel.appendChild(cards);
      panel.appendChild(status);
      if (state.active && actions.childNodes.length) panel.appendChild(actions);
      if (!state.active) panel.appendChild(setup);
      const giveUpPanel = state.active ? renderHigherLowerGiveUpPanel(game, domCanAct, role) : null;
      if (giveUpPanel) panel.appendChild(giveUpPanel);
      if (state.active && game.powerMenuOpen && domCanAct) panel.appendChild(renderHigherLowerPowerMenu());
      els.board.appendChild(panel);
    }

    function renderHigherLowerGiveUpPanel(game, domCanAct, role) {
      if (!game || (!game.giveUpOffer && role === SUB)) return null;
      const panel = document.createElement("div");
      panel.className = "higher-lower-give-up";
      const offer = game && game.giveUpOffer;
      const draft = normalizeBuyIn(Number(game && game.giveUpDraftAmount || higherLowerDomPossibleWin(game) || 5));
      if (offer) {
        const amount = normalizeBuyIn(Number(offer.amount || 1));
        panel.innerHTML = `
          <strong>Give Up Offer</strong>
          <p>${escapeHtml(state.names.dom)} will let ${escapeHtml(state.names.sub)} give up for ${money(amount)}.</p>
          <div class="higher-lower-give-up-actions">
            <button type="button" class="danger-button" data-hl-give-up="accept">Give Up For ${money(amount)}</button>
            <button type="button" data-hl-give-up="cancel">${domCanAct ? "Cancel Offer" : "Keep Playing"}</button>
          </div>
        `;
        const accept = panel.querySelector("[data-hl-give-up='accept']");
        const cancel = panel.querySelector("[data-hl-give-up='cancel']");
        accept.disabled = Boolean(role && role !== SUB);
        accept.addEventListener("click", acceptHigherLowerGiveUp);
        cancel.disabled = Boolean(role && role !== DOM && role !== SUB);
        cancel.addEventListener("click", cancelHigherLowerGiveUp);
        return panel;
      }
      panel.innerHTML = `
        <strong>Give Up Price</strong>
        <label>
          <span>Cost to quit</span>
          <input type="number" min="1" step="1" value="${draft}" ${domCanAct ? "" : "disabled"} />
        </label>
        <button type="button" ${domCanAct ? "" : "disabled"}>Send Offer</button>
      `;
      const input = panel.querySelector("input");
      const button = panel.querySelector("button");
      input.addEventListener("change", () => setHigherLowerGiveUpDraft(input.value));
      button.addEventListener("click", () => offerHigherLowerGiveUp(input.value));
      return panel;
    }

    function renderHigherLowerPowerMenu() {
      const menu = document.createElement("div");
      menu.className = "higher-lower-power-menu";
      const rankOptions = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
        .map((rank) => `<option value="${rank}">${rank}</option>`)
        .join("");
      const suitOptions = [
        ["S", "Spades"],
        ["H", "Hearts"],
        ["D", "Diamonds"],
        ["C", "Clubs"]
      ].map(([suit, label]) => `<option value="${suit}">${label}</option>`).join("");
      menu.innerHTML = `
        <div>
          <strong>Choose Their Fate</strong>
          <span>${Number(state.higherLower.powerCharges || 0)} power${Number(state.higherLower.powerCharges || 0) === 1 ? "" : "s"} ready</span>
        </div>
        <button type="button" data-hl-power="hide">Hide Next Card<span>Good luck loser~</span></button>
        <button type="button" data-hl-power="suit">Suit Call<span>They must pick the next suit.</span></button>
        <button type="button" data-hl-power="pulse">Tribute Pulse<span>${money(1)} per second for ${HIGHER_LOWER_PULSE_SECONDS}s.</span></button>
        <div class="higher-lower-fix-card">
          <label>Next <select data-hl-rank="1">${rankOptions}</select><select data-hl-suit="1">${suitOptions}</select></label>
          <label>Then <select data-hl-rank="2">${rankOptions}</select><select data-hl-suit="2">${suitOptions}</select></label>
          <button type="button" data-hl-power="fix">Set Next Two Cards</button>
        </div>
      `;
      menu.querySelector("[data-hl-power='hide']").addEventListener("click", () => useHigherLowerPower("hide"));
      menu.querySelector("[data-hl-power='suit']").addEventListener("click", () => useHigherLowerPower("suit"));
      menu.querySelector("[data-hl-power='pulse']").addEventListener("click", () => useHigherLowerPower("pulse"));
      menu.querySelector("[data-hl-power='fix']").addEventListener("click", () => useHigherLowerPower("fix", {
        rank1: menu.querySelector("[data-hl-rank='1']").value,
        suit1: menu.querySelector("[data-hl-suit='1']").value,
        rank2: menu.querySelector("[data-hl-rank='2']").value,
        suit2: menu.querySelector("[data-hl-suit='2']").value
      }));
      return menu;
    }

    function renderCrazyEightsCardButton(card, player, index, hidden, playable) {
      const button = document.createElement("button");
      button.className = `crazy8-card ${playable ? "playable" : ""}`.trim();
      button.dataset.crazy8CardIndex = String(index);
      button.disabled = hidden || !playable || state.turn !== player || Boolean(state.crazyEights.pendingWild);
      button.setAttribute("aria-label", hidden ? `${labelFor(player)} hidden card` : `${rankName(card.slice(0, -1))} of ${suitName(card.slice(-1))}`);
      button.appendChild(renderPlayingCard(hidden ? "AS" : card, hidden));
      return button;
    }

    function crazyEightsLocalPlayer() {
      const localRole = localOnlineRole();
      if (localRole === DOM || localRole === SUB) return localRole;
      return state.turn === DOM ? DOM : SUB;
    }

    function renderCrazyEightsHand(player, position = "") {
      const game = state.crazyEights || createCrazyEightsState();
      const localRole = localOnlineRole();
      const canSee = !localRole || localRole === player || (localRole === SPECTATOR && !state.online.room);
      const section = document.createElement("section");
      section.className = `crazy8-hand ${player} ${position} ${state.turn === player ? "active" : ""}`.trim();
      const title = document.createElement("div");
      title.className = "crazy8-hand-title";
      title.innerHTML = `<strong>${labelFor(player)}</strong><span>${(game.hands[player] || []).length} card${(game.hands[player] || []).length === 1 ? "" : "s"}</span>`;
      section.appendChild(title);
      const row = document.createElement("div");
      row.className = "crazy8-card-row";
      (game.hands[player] || []).forEach((card, index) => {
        const hidden = !canSee;
        const playable = !hidden && crazyEightsCanPlay(card, game);
        row.appendChild(renderCrazyEightsCardButton(card, player, index, hidden, playable));
      });
      section.appendChild(row);
      return section;
    }

    function renderCrazyEightsBoard() {
      const game = state.crazyEights || createCrazyEightsState();
      els.board.innerHTML = "";
      els.board.className = "board crazy8-table";
      const topCard = crazyEightsTopCard(game);
      const localRole = localOnlineRole();
      const canAct = state.active && (!localRole || localRole === state.turn);
      const localPlayer = crazyEightsLocalPlayer();
      const opponent = otherRole(localPlayer);
      const shell = document.createElement("div");
      shell.className = "crazy8-shell";
      shell.appendChild(renderCrazyEightsHand(opponent, "opponent-hand"));
      const center = document.createElement("section");
      center.className = "crazy8-center";
      const pile = document.createElement("div");
      pile.className = "crazy8-pile";
      const deck = document.createElement("button");
      deck.className = "crazy8-deck";
      deck.dataset.crazy8Action = "draw";
      deck.disabled = !canAct || Boolean(game.pendingWild);
      deck.appendChild(renderPlayingCard("AS", true));
      const deckText = document.createElement("span");
      deckText.textContent = `${game.deck.length} left`;
      deck.appendChild(deckText);
      pile.appendChild(deck);
      const discard = document.createElement("div");
      discard.className = "crazy8-discard";
      discard.appendChild(topCard ? renderPlayingCard(topCard, false) : renderPlayingCard("AS", true));
      pile.appendChild(discard);
      center.appendChild(pile);
      const status = document.createElement("div");
      status.className = "crazy8-status";
      status.innerHTML = `
        <span>Active suit</span>
        <strong>${suitSymbol(game.currentSuit)} ${suitName(game.currentSuit)}</strong>
        <p>${game.message || "Match the rank, suit, or play an 8."}</p>
        ${game.lastAction ? `<small>${game.lastAction}</small>` : ""}
      `;
      center.appendChild(status);
      if (game.pendingWild) {
        const chooser = document.createElement("div");
        chooser.className = "crazy8-suit-chooser";
        chooser.innerHTML = `<strong>${labelFor(game.pendingWild.player)} chooses the next suit</strong>`;
        ["S", "H", "C", "D"].forEach((suit) => {
          const button = document.createElement("button");
          button.dataset.crazy8Suit = suit;
          button.disabled = Boolean(localRole && localRole !== game.pendingWild.player);
          button.textContent = `${suitSymbol(suit)} ${suitName(suit)}`;
          chooser.appendChild(button);
        });
        center.appendChild(chooser);
      }
      shell.appendChild(center);
      shell.appendChild(renderCrazyEightsHand(localPlayer, "local-hand"));
      els.board.appendChild(shell);
    }

    function renderDoubleSolitaireMiniFoundation(player, index) {
      const pile = doubleSolitaireBoard(player).foundations[index] || [];
      const card = pile[pile.length - 1];
      const item = document.createElement("span");
      item.className = "double-solitaire-mini-foundation";
      item.textContent = card
        ? `${suitSymbol(solitaireSuit(card))} ${rankName(card.slice(0, -1))}`
        : SOLITAIRE_FOUNDATION_LABELS[index];
      return item;
    }

    function renderDoubleSolitaireProgress(player) {
      const board = doubleSolitaireBoard(player);
      const viewed = localDoubleSolitaireViewedPlayer();
      const button = document.createElement("button");
      button.className = `double-solitaire-progress ${player} ${viewed === player ? "viewing" : ""} ${state.turn === player ? "active" : ""}`.trim();
      button.dataset.doubleSolitaireView = player;
      const count = doubleSolitaireFoundationCount(player);
      const foundations = document.createElement("div");
      foundations.className = "double-solitaire-mini-foundations";
      SOLITAIRE_FOUNDATION_SUITS.forEach((_, index) => foundations.appendChild(renderDoubleSolitaireMiniFoundation(player, index)));
      const meta = document.createElement("span");
      meta.className = "double-solitaire-progress-meta";
      meta.textContent = `${count}/52 foundations - stock ${board.stock.length} - waste ${board.waste.length}`;
      const title = document.createElement("strong");
      title.textContent = labelFor(player);
      button.appendChild(title);
      button.appendChild(foundations);
      button.appendChild(meta);
      return button;
    }

    function renderDoubleSolitaireCard(card, hidden, attrs = {}) {
      const element = renderPlayingCard(card, hidden);
      Object.entries(attrs).forEach(([key, value]) => {
        element.dataset[key] = String(value);
      });
      if (!hidden) element.dataset.solitairePreviewCard = card;
      element.setAttribute("role", "button");
      element.setAttribute("tabindex", "0");
      return element;
    }

    function renderDoubleSolitaireNoMovesPrompt(board, player) {
      if (!state.active || state.turn !== player || !doubleSolitaireCanAct(player) || solitaireHasAnyLegalMove(board)) return null;
      const prompt = document.createElement("section");
      prompt.className = "double-solitaire-no-moves";
      prompt.innerHTML = `
        <div>
          <strong>No moves found</strong>
          <p>No legal move is available from this board, waste, or reachable draw pile.</p>
        </div>
        <button type="button" data-double-solitaire-action="give-up" data-double-solitaire-player="${player}">Give Up</button>
      `;
      return prompt;
    }

    function renderDoubleSolitaireBoard() {
      const game = state.doubleSolitaire || createDoubleSolitaireState();
      const viewed = localDoubleSolitaireViewedPlayer();
      const board = doubleSolitaireBoard(viewed);
      const selectedKey = doubleSolitaireSelectionKey(board.selected);
      const canAct = doubleSolitaireCanAct(viewed);
      els.board.innerHTML = "";
      els.board.className = "board double-solitaire-table";
      const shell = document.createElement("div");
      shell.className = "double-solitaire-shell";
      const progress = document.createElement("div");
      progress.className = "double-solitaire-progress-row";
      progress.appendChild(renderDoubleSolitaireProgress(DOM));
      progress.appendChild(renderDoubleSolitaireProgress(SUB));
      shell.appendChild(progress);

      const status = document.createElement("section");
      status.className = "double-solitaire-status";
      status.innerHTML = `
        <strong>${labelFor(viewed)} board</strong>
        <span>${state.active ? `${labelFor(state.turn)} to play` : "Waiting for a bet"}</span>
        <p>${game.message || "Build foundations before the other player does."}</p>
        ${game.lastAction ? `<small>${game.lastAction}</small>` : ""}
      `;
      const giveUpPlayer = doubleSolitaireGiveUpPlayer();
      if (state.active && !game.winner && (giveUpPlayer === DOM || giveUpPlayer === SUB)) {
        const giveUpButton = document.createElement("button");
        giveUpButton.className = "double-solitaire-give-up";
        giveUpButton.dataset.doubleSolitaireAction = "give-up";
        giveUpButton.dataset.doubleSolitairePlayer = giveUpPlayer;
        giveUpButton.textContent = "Give Up";
        status.appendChild(giveUpButton);
      }
      shell.appendChild(status);

      const noMovesPrompt = renderDoubleSolitaireNoMovesPrompt(board, viewed);
      if (noMovesPrompt) shell.appendChild(noMovesPrompt);

      const boardEl = document.createElement("section");
      boardEl.className = `double-solitaire-board ${canAct ? "can-act" : ""}`.trim();
      if (state.active && state.turn && viewed !== state.turn && !game.winner) {
        const turnOverlay = document.createElement("div");
        turnOverlay.className = "double-solitaire-turn-overlay";
        turnOverlay.textContent = `${labelFor(state.turn)}'s turn`;
        boardEl.appendChild(turnOverlay);
      }
      const top = document.createElement("div");
      top.className = "double-solitaire-top-row";
      const stock = document.createElement("button");
      stock.className = "double-solitaire-slot stock";
      stock.dataset.doubleSolitaireAction = "stock";
      stock.disabled = !canAct;
      if (board.stock.length) stock.appendChild(renderPlayingCard("AS", true));
      else stock.appendChild(solitaireSlotLabel(board.waste.length ? "Reset" : "Stock"));
      top.appendChild(stock);

      const waste = document.createElement("button");
      waste.className = "double-solitaire-slot waste";
      const wasteCard = board.waste[board.waste.length - 1];
      if (wasteCard) {
        const rendered = renderDoubleSolitaireCard(wasteCard, false, { doubleSolitaireSource: "waste" });
        if (selectedKey === "waste:::") rendered.classList.add("selected");
        waste.appendChild(rendered);
      } else {
        waste.appendChild(solitaireSlotLabel("Waste"));
      }
      top.appendChild(waste);

      SOLITAIRE_FOUNDATION_SUITS.forEach((_, index) => {
        const slot = document.createElement("button");
        slot.className = "double-solitaire-slot foundation";
        slot.dataset.doubleSolitaireLocation = "foundation";
        slot.dataset.foundationIndex = String(index);
        const pile = board.foundations[index] || [];
        const card = pile[pile.length - 1];
        if (card) {
          const rendered = renderDoubleSolitaireCard(card, false, { doubleSolitaireSource: "foundation", foundationIndex: index });
          if (selectedKey === `foundation:::${index}`) rendered.classList.add("selected");
          slot.appendChild(rendered);
        } else {
          slot.appendChild(solitaireSlotLabel(SOLITAIRE_FOUNDATION_LABELS[index], "suit-placeholder"));
        }
        top.appendChild(slot);
      });
      boardEl.appendChild(top);

      const tableau = document.createElement("div");
      tableau.className = "double-solitaire-tableau";
      board.tableau.forEach((pile, column) => {
        const columnEl = document.createElement("div");
        columnEl.className = "double-solitaire-column";
        columnEl.dataset.doubleSolitaireLocation = "tableau";
        columnEl.dataset.tableauColumn = String(column);
        if (!pile.length) columnEl.appendChild(solitaireSlotLabel("K"));
        pile.forEach((entry, index) => {
          const attrs = entry.faceUp
            ? { doubleSolitaireSource: "tableau", tableauColumn: column, cardIndex: index }
            : {};
          const rendered = renderDoubleSolitaireCard(entry.card, !entry.faceUp, attrs);
          rendered.style.setProperty("--solitaire-card-index", index);
          if (selectedKey === `tableau:${column}:${index}:`) rendered.classList.add("selected");
          columnEl.appendChild(rendered);
        });
        tableau.appendChild(columnEl);
      });
      boardEl.appendChild(tableau);
      shell.appendChild(boardEl);
      els.board.appendChild(shell);
    }

    function chessPieceGlyph(piece) {
      const glyphs = {
        wp: "\u2659",
        wn: "\u2658",
        wb: "\u2657",
        wr: "\u2656",
        wq: "\u2655",
        wk: "\u2654",
        bp: "\u265F",
        bn: "\u265E",
        bb: "\u265D",
        br: "\u265C",
        bq: "\u265B",
        bk: "\u265A"
      };
      return glyphs[`${piece.color}${piece.type}`] || "";
    }

    function renderTwentyOneBoard() {
      els.board.className = "twentyone-table";
      els.board.innerHTML = "";
      const target = Number(state.twentyOne.targetMarks || 1);
      const phase = twentyOnePhaseKey();
      els.board.dataset.phase = phase;
      els.board.appendChild(renderTwentyOneHand(DOM));
      els.board.appendChild(renderTwentyOneTableCenter(target));
      els.board.appendChild(renderTwentyOneHand(SUB));
    }

    function renderTwentyOneTableCenter(target) {
      const canNext = state.twentyOne.nextHandPending && (!state.online.room || localOnlineRole() === DOM);
      const center = document.createElement("section");
      center.className = "twentyone-table-center";
      center.appendChild(renderTwentyOneShoe());

      const status = document.createElement("div");
      status.className = "twentyone-status-card";
      const phase = twentyOnePhaseText();
      status.innerHTML = `
        <strong>${phase.title}</strong>
        <span>${phase.detail}</span>
        <div class="twentyone-score-strip">
          <span>${target > 1 ? `First to ${target}` : "1 Round"}</span>
          <span>${state.names.dom}: ${Number(state.twentyOne.marks.dom || 0)}</span>
          <span>${state.names.sub}: ${Number(state.twentyOne.marks.sub || 0)}</span>
          <span>Powers ${blackjackPowersEnabled() ? "On" : "Off"}</span>
        </div>
        ${state.twentyOne.outcome ? `<p>${escapeHtml(state.twentyOne.outcome)}</p>` : ""}
        ${state.twentyOne.nextHandPending ? `<div class="setup-actions"><button id="nextTwentyOneHandBtn" class="primary"${canNext ? "" : " disabled"}>Start Next Hand</button></div>` : ""}
      `;
      center.appendChild(status);

      const actions = renderTwentyOneTableActions();
      center.appendChild(actions || renderTwentyOneActionNote());

      const nextButton = center.querySelector("#nextTwentyOneHandBtn");
      if (nextButton) nextButton.addEventListener("click", startNextTwentyOneHand);
      return center;
    }

    function renderTwentyOneActionNote() {
      const note = document.createElement("div");
      note.className = "twentyone-actions-note";
      note.textContent = twentyOneActionHint();
      return note;
    }

    function twentyOneActionState() {
      const localRole = localOnlineRole();
      const setupPending = Boolean(state.twentyOne.setupPending);
      const pushLuckPending = state.active && state.turn === DOM && state.twentyOne.pushLuckPending;
      const subDecision = state.active && state.turn === SUB && !setupPending;
      const domDealerTurn = state.active && state.turn === DOM && state.twentyOne.dealerTurn;
      const canDraw = (subDecision && (!localRole || localRole === SUB))
        || ((domDealerTurn || pushLuckPending) && (!localRole || localRole === DOM));
      const canHold = (subDecision && (!localRole || localRole === SUB))
        || ((domDealerTurn || pushLuckPending) && (!localRole || localRole === DOM));
      const canPower = Boolean((localRole === DOM || !localRole) && canOpenTwentyOnePowerModal());
      return {
        canDraw,
        canHold,
        canPower,
        drawLabel: pushLuckPending ? "Force Draw" : "Draw",
        holdLabel: pushLuckPending ? "Let Them Hold" : "Hold",
        powerLabel: state.twentyOne.pushLuckQueued ? "Power Queued" : "Power"
      };
    }

    function renderTwentyOneTableActions() {
      if (state.twentyOne.setupPending || state.twentyOne.nextHandPending || !state.active || localOnlineRole() === SPECTATOR) return null;
      const actionState = twentyOneActionState();
      if (!actionState.canDraw && !actionState.canHold && !actionState.canPower) return null;
      const actions = document.createElement("div");
      actions.className = "twentyone-table-actions";
      if (actionState.canDraw || actionState.canHold || !actionState.canPower) {
        const drawButton = document.createElement("button");
        drawButton.type = "button";
        drawButton.textContent = actionState.drawLabel;
        drawButton.disabled = !actionState.canDraw;
        drawButton.addEventListener("click", hitTwentyOne);
        actions.appendChild(drawButton);

        const holdButton = document.createElement("button");
        holdButton.type = "button";
        holdButton.textContent = actionState.holdLabel;
        holdButton.disabled = !actionState.canHold;
        holdButton.addEventListener("click", standTwentyOne);
        actions.appendChild(holdButton);
      }

      if (actionState.canPower) {
        const powerButton = document.createElement("button");
        powerButton.type = "button";
        powerButton.className = "twentyone-power-action";
        powerButton.textContent = actionState.powerLabel;
        powerButton.addEventListener("click", openTwentyOnePowerModal);
        actions.appendChild(powerButton);
      }
      return actions;
    }

    function renderTwentyOneShoe() {
      const shoe = document.createElement("div");
      shoe.className = "twentyone-shoe";
      for (let index = 0; index < 3; index += 1) {
        const card = document.createElement("span");
        card.className = "playing-card hidden-card";
        card.setAttribute("aria-hidden", "true");
        shoe.appendChild(card);
      }
      shoe.setAttribute("aria-label", "Dealer shoe");
      return shoe;
    }

    function twentyOnePhaseKey() {
      if (state.twentyOne.setupPending) return "setup";
      if (state.twentyOne.nextHandPending) return "next-hand";
      if (!state.active) return "closed";
      if (state.twentyOne.pushLuckPending) return "push-luck";
      if (state.turn === SUB && state.twentyOne.pushLuckQueued) return "power-queued";
      if (state.twentyOne.dealerTurn) return "dealer";
      return state.turn === SUB ? "sub" : "dom";
    }

    function twentyOnePhaseText() {
      if (state.twentyOne.setupPending) {
        return { title: "Settings", detail: `${state.names.dom} is setting the table.` };
      }
      if (!state.active) {
        return { title: "Table Closed", detail: "Place a bet or reclaim to start the next hand." };
      }
      if (state.twentyOne.nextHandPending) {
        return { title: "Hand Complete", detail: "The table is waiting for the next hand." };
      }
      if (state.twentyOne.pushLuckPending) {
        return { title: "Push Your Luck", detail: `${state.names.dom} may force one extra ${state.names.sub} card.` };
      }
      if (state.turn === SUB && state.twentyOne.pushLuckQueued) {
        return { title: "Power Queued", detail: `${state.names.dom}'s Push Your Luck is waiting for ${state.names.sub} to stand.` };
      }
      if (state.twentyOne.dealerTurn) {
        return { title: "Dealer Turn", detail: `${state.names.dom} plays the dealer hand.` };
      }
      if (state.turn === SUB) {
        return { title: "Sub Decision", detail: `${state.names.sub} chooses to hit or stand.` };
      }
      return { title: "Dom Decision", detail: `${state.names.dom} controls the table.` };
    }

    function twentyOneActionHint() {
      if (state.twentyOne.setupPending) return "Choose rounds and powers before the cards are dealt.";
      if (state.twentyOne.nextHandPending) return "The next hand starts with a fresh shuffle.";
      if (!state.active) return "The table is waiting for tribute.";
      if (state.twentyOne.pushLuckPending) return "Use Hit to push, or Stand to let them keep it.";
      if (state.turn === SUB && state.twentyOne.pushLuckQueued) return `${state.names.dom}'s Push Your Luck is queued. If ${state.names.sub} stands, one extra card is forced.`;
      if (state.twentyOne.dealerTurn) return "Dealer must reach the table minimum before standing.";
      if (state.turn === SUB) return "Hit draws another card. Stand passes control to the dom.";
      return "Watch the hidden card flip when the dealer turn begins.";
    }

    function renderTwentyOneHand(player) {
      const panel = document.createElement("section");
      panel.className = `hand-panel twentyone-hand ${player === DOM ? "dom-hand" : "sub-hand"}`;
      const hand = state.twentyOne.hands[player] || [];
      const domPeek = state.mode === "reclaim" && domAdvantagesEnabled() && blackjackPowersEnabled() && state.tiltLevel >= 1 && localOnlineRole() === DOM;
      const hiddenDomCard = player === DOM && state.active && !state.twentyOne.revealDom && !domPeek;
      const visibleCards = hiddenDomCard ? hand.slice(0, 1) : hand;
      const score = twentyOneScore(visibleCards);
      const scoreText = hiddenDomCard ? `${score.total}+` : score.total;
      const roleText = player === DOM ? "Dealer hand" : "Player hand";
      panel.dataset.cards = String(hand.length);
      panel.classList.toggle("has-many-cards", hand.length >= 5);
      panel.classList.toggle("has-full-hand", hand.length >= 6);
      panel.classList.toggle("is-active-hand", state.active && !state.twentyOne.setupPending && state.turn === player);
      panel.classList.toggle("is-dealer-turn", state.active && player === DOM && state.twentyOne.dealerTurn);
      panel.innerHTML = `<div class="hand-header"><span>${labelFor(player)} <small>${roleText}</small></span><strong>${hand.length ? scoreText : "-"}</strong></div>`;
      const row = document.createElement("div");
      row.className = "card-row";
      hand.forEach((card, index) => {
        const hidden = hiddenDomCard && index > 0;
        row.appendChild(renderPlayingCard(card, hidden));
      });
      panel.appendChild(row);
      return panel;
    }

    const MEMORY_MATCH_SIZES = {
      "4x3": { columns: 4, rows: 3, pairs: 6 },
      "4x4": { columns: 4, rows: 4, pairs: 8 },
      "5x4": { columns: 5, rows: 4, pairs: 10 }
    };

    function memoryMatchConfig(size = state.memoryMatch && state.memoryMatch.size) {
      return MEMORY_MATCH_SIZES[size] || MEMORY_MATCH_SIZES["4x3"];
    }

    function memoryMatchPlaceholder() {
      const placeholder = document.createElement("div");
      placeholder.className = "memory-match-placeholder";
      placeholder.innerHTML = `
        <span class="memory-match-placeholder-mark">?</span>
        <span class="memory-match-placeholder-text">Match</span>
      `;
      return placeholder;
    }

    function memoryMatchAspectScore(item) {
      const width = Number(item && item.width || 0);
      const height = Number(item && item.height || 0);
      if (!width || !height) return 0.42;
      const ratio = width / height;
      const targetRatio = 5 / 7;
      const distance = Math.abs(ratio - targetRatio);
      const portraitBonus = height >= width ? 0 : -0.18;
      return Math.max(0, 1 - distance * 2.2) + portraitBonus;
    }

    function memoryMatchUniqueItems(items, needed) {
      const seen = new Set(localMemoryMatchRecentUrls);
      const unique = [];
      (Array.isArray(items) ? items : []).forEach((item) => {
        const url = normalizeDistractionSource(item && item.url);
        if (!url || seen.has(url) || unique.some((candidate) => normalizeDistractionSource(candidate.url) === url)) return;
        unique.push({ ...item, url });
      });
      return unique
        .sort((a, b) => memoryMatchAspectScore(b) - memoryMatchAspectScore(a))
        .slice(0, needed);
    }

    async function fetchMemoryMatchImages(pairCount) {
      let collected = [];
      for (let attempt = 0; attempt < 3 && collected.length < pairCount; attempt += 1) {
        const activeSubreddit = pickGoonerSubreddit(localMemoryMatchSubreddit);
        const params = new URLSearchParams({
          source: "peekstr",
          subreddit: activeSubreddit,
          limit: String(Math.max(24, pairCount * 3)),
          page: "0",
          window: "5",
          nonce: `${Date.now()}-${attempt}`
        });
        if (localMemoryMatchAfter) params.set("after", localMemoryMatchAfter);
        const response = await fetch(`/api/redditery-gallery?${params.toString()}`);
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || "Brain Drain Match images failed to load.");
        localMemoryMatchAfter = String(data.after || "");
        localMemoryMatchSubreddit = activeSubreddit;
        const nextItems = memoryMatchUniqueItems(data.items, pairCount - collected.length);
        collected = [...collected, ...nextItems];
        if (!localMemoryMatchAfter && collected.length < pairCount) {
          localMemoryMatchAfter = "";
          localMemoryMatchSubreddit = "";
          localMemoryMatchRecentUrls = [];
        }
      }
      if (collected.length < pairCount) throw new Error("Not enough fresh images came back. Try New Images again.");
      localMemoryMatchRecentUrls = [
        ...collected.map((item) => normalizeDistractionSource(item.url)),
        ...localMemoryMatchRecentUrls
      ].filter(Boolean).slice(0, 80);
      return collected.slice(0, pairCount);
    }
    function buildMemoryMatchDeck(items) {
      const deck = [];
      items.forEach((item, pair) => {
        const url = normalizeDistractionSource(item.url);
        const title = item.title || `Brain Drain image ${pair + 1}`;
        deck.push({ id: `${pair}-a`, pair, url, title, matched: false });
        deck.push({ id: `${pair}-b`, pair, url, title, matched: false });
      });
      return shuffleDeck(deck);
    }

    function preloadMemoryMatchImage(url) {
      const source = normalizeDistractionSource(url);
      if (!source) return Promise.resolve(false);
      return new Promise((resolve) => {
        const image = new Image();
        image.decoding = "async";
        image.referrerPolicy = "no-referrer";
        image.onload = async () => {
          try {
            if (typeof image.decode === "function") await image.decode();
          } catch (error) {
            // Loaded images can still reject decode on some remote hosts; keep the usable cache entry.
          }
          resolve(true);
        };
        image.onerror = () => resolve(false);
        image.src = source;
      });
    }

    async function preloadMemoryMatchImages(items) {
      const uniqueUrls = [...new Set((Array.isArray(items) ? items : [])
        .map((item) => normalizeDistractionSource(item && item.url))
        .filter(Boolean))];
      if (!uniqueUrls.length) return;
      await Promise.allSettled(uniqueUrls.map(preloadMemoryMatchImage));
    }

    function brainDrainSnapCategoryKeys() {
      return Object.keys(GOONER_GALLERY_CATEGORIES).filter((key) => key !== "mixed");
    }

    function brainDrainSnapSubredditForCategory(categoryKey = "captions") {
      const category = GOONER_GALLERY_CATEGORIES[categoryKey] || GOONER_GALLERY_CATEGORIES.captions;
      const subreddits = Array.isArray(category.subreddits) && category.subreddits.length
        ? category.subreddits
        : GOONER_GALLERY_CATEGORIES.captions.subreddits;
      return subreddits[Math.floor(Math.random() * subreddits.length)] || "gooninghentai";
    }

    function brainDrainSnapRoundDuration(round = 1) {
      return Math.max(2400, 5200 - Math.max(0, Number(round) || 0) * 110);
    }

    async function fetchBrainDrainSnapBatch(categoryKey = "captions") {
      const safeCategory = GOONER_GALLERY_CATEGORIES[categoryKey] && categoryKey !== "mixed" ? categoryKey : "captions";
      const subreddit = brainDrainSnapSubredditForCategory(safeCategory);
      const afterKey = `${safeCategory}:${subreddit}`;
      const params = new URLSearchParams({
        source: "peekstr",
        subreddit,
        limit: "18",
        page: "0",
        window: "4",
        nonce: String(Date.now())
      });
      if (localBrainDrainSnapAfter[afterKey]) params.set("after", localBrainDrainSnapAfter[afterKey]);
      const response = await fetch(`/api/redditery-gallery?${params.toString()}`);
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Brain Drain Snap images failed to load.");
      localBrainDrainSnapAfter[afterKey] = String(data.after || "");
      return shuffledGalleryItems(Array.isArray(data.items) ? data.items : [])
        .map((item) => ({
          ...item,
          url: normalizeDistractionSource(item && item.url),
          categoryKey: safeCategory,
          categoryLabel: goonerGalleryCategoryLabel(safeCategory),
          subreddit
        }))
        .filter((item) => item.url);
    }

    async function takeBrainDrainSnapItem(preferredCategory = "") {
      const preferred = GOONER_GALLERY_CATEGORIES[preferredCategory] && preferredCategory !== "mixed"
        ? preferredCategory
        : "";
      const categories = preferred
        ? [preferred, ...shuffleDeck(brainDrainSnapCategoryKeys().filter((key) => key !== preferred))]
        : shuffleDeck(brainDrainSnapCategoryKeys());
      for (const categoryKey of categories) {
        if (!localBrainDrainSnapPools[categoryKey] || !localBrainDrainSnapPools[categoryKey].length) {
          localBrainDrainSnapPools[categoryKey] = await fetchBrainDrainSnapBatch(categoryKey);
        }
        if (localBrainDrainSnapPools[categoryKey] && localBrainDrainSnapPools[categoryKey].length) {
          return localBrainDrainSnapPools[categoryKey].shift();
        }
      }
      return null;
    }

    function stopBrainDrainSnapTimer() {
      if (brainDrainSnapTimerId) {
        window.clearInterval(brainDrainSnapTimerId);
        brainDrainSnapTimerId = null;
      }
    }

    function brainDrainSnapIsMatch(game = state.brainDrainSnap || createBrainDrainSnapState()) {
      return Boolean(game.previous && game.current && game.previous.categoryKey === game.current.categoryKey);
    }

    function brainDrainSnapExpectedAction(game = state.brainDrainSnap || createBrainDrainSnapState()) {
      return brainDrainSnapIsMatch(game) ? "snap" : "next";
    }

    async function startBrainDrainSnap() {
      stopBrainDrainSnapTimer();
      state.brainDrainSnap = {
        ...createBrainDrainSnapState(),
        status: "loading",
        loading: true,
        message: "Loading a fresh snap stream..."
      };
      renderBrainDrainSnap();
      try {
        const firstCategory = randomSnapCategoryKey("");
        const first = await takeBrainDrainSnapItem(firstCategory);
        if (!first) throw new Error("Brain Drain Snap could not find images.");
        await preloadMemoryMatchImage(first.url);
        const roundMs = brainDrainSnapRoundDuration(1);
        state.brainDrainSnap = {
          ...createBrainDrainSnapState(),
          status: "playing",
          current: first,
          round: 1,
          roundMs,
          deadline: Date.now() + roundMs,
          message: "First image. Hit Next."
        };
        startBrainDrainSnapTimer();
      } catch (error) {
        state.brainDrainSnap = {
          ...createBrainDrainSnapState(),
          status: "idle",
          message: String(error && error.message || "Brain Drain Snap could not start.")
        };
      }
      renderBrainDrainSnap();
    }

    function startBrainDrainSnapTimer() {
      stopBrainDrainSnapTimer();
      brainDrainSnapTimerId = window.setInterval(() => {
        const game = state.brainDrainSnap || createBrainDrainSnapState();
        if (state.screen !== "brainDrainSnap" || game.status !== "playing" || game.loading) {
          stopBrainDrainSnapTimer();
          return;
        }
        const remaining = Math.max(0, game.deadline - Date.now());
        game.timeRatio = game.roundMs ? remaining / game.roundMs : 0;
        if (remaining <= 0) {
          answerBrainDrainSnap("timeout");
          return;
        }
        renderBrainDrainSnap();
      }, 100);
    }

    function endBrainDrainSnap(message = "Brain drained.") {
      stopBrainDrainSnapTimer();
      state.brainDrainSnap = {
        ...(state.brainDrainSnap || createBrainDrainSnapState()),
        status: "gameover",
        loading: false,
        timeRatio: 0,
        message
      };
      renderBrainDrainSnap();
    }

    async function dealNextBrainDrainSnap(message = "") {
      const game = state.brainDrainSnap || createBrainDrainSnapState();
      const previous = game.current;
      const nextCategory = randomSnapCategoryKey(previous && previous.categoryKey);
      game.loading = true;
      game.message = "Loading next image...";
      renderBrainDrainSnap();
      try {
        const current = await takeBrainDrainSnapItem(nextCategory);
        if (!current) throw new Error("No more usable snap images came back.");
        await preloadMemoryMatchImage(current.url);
        game.previous = previous;
        game.current = current;
        game.round += 1;
        game.roundMs = brainDrainSnapRoundDuration(game.round);
        game.deadline = Date.now() + game.roundMs;
        game.timeRatio = 1;
        game.loading = false;
        game.status = "playing";
        game.message = message || "Snap if the category matches the last image.";
        startBrainDrainSnapTimer();
      } catch (error) {
        endBrainDrainSnap(String(error && error.message || "Brain Drain Snap ran out of images."));
        return;
      }
      renderBrainDrainSnap();
    }

    async function answerBrainDrainSnap(action = "next") {
      const game = state.brainDrainSnap || createBrainDrainSnapState();
      if (game.status !== "playing" || game.loading || !game.current) return;
      stopBrainDrainSnapTimer();
      const expected = brainDrainSnapExpectedAction(game);
      const correct = action === expected;
      if (correct) {
        game.score += 10 + Math.min(30, game.streak * 2);
        game.streak += 1;
        await dealNextBrainDrainSnap(expected === "snap" ? "Snapped. Keep up." : "Skipped. Stay sharp.");
        return;
      }
      game.iq = Math.max(0, game.iq - 1);
      game.streak = 0;
      if (game.iq <= 0) {
        endBrainDrainSnap(action === "timeout" ? "Timed out. Brain drained." : "Wrong choice. Brain drained.");
        return;
      }
      await dealNextBrainDrainSnap(action === "timeout"
        ? `Too slow. ${game.iq} IQ left.`
        : `Wrong. It was ${expected === "snap" ? "a match" : "not a match"}. ${game.iq} IQ left.`);
    }

    function renderBrainDrainSnap() {
      if (!els.brainDrainSnapScreen || !els.brainDrainSnapCardView) return;
      const game = state.brainDrainSnap || createBrainDrainSnapState();
      if (els.brainDrainSnapStatus) els.brainDrainSnapStatus.textContent = game.message || "Tap Snap when the new image matches the last category.";
      if (els.brainDrainSnapScore) els.brainDrainSnapScore.textContent = String(game.score || 0);
      if (els.brainDrainSnapStreak) els.brainDrainSnapStreak.textContent = String(game.streak || 0);
      if (els.brainDrainSnapIq) els.brainDrainSnapIq.textContent = String(game.iq || 0);
      if (els.brainDrainSnapTimerBar) {
        const ratio = game.status === "playing" ? Math.max(0, Math.min(1, game.timeRatio || 0)) : 0;
        els.brainDrainSnapTimerBar.style.width = `${Math.round(ratio * 100)}%`;
      }
      els.brainDrainSnapCardView.innerHTML = "";
      if (game.loading) {
        const loading = document.createElement("div");
        loading.className = "brain-snap-placeholder";
        loading.textContent = "Loading...";
        els.brainDrainSnapCardView.appendChild(loading);
      } else if (game.current && game.current.url) {
        const image = document.createElement("img");
        image.src = normalizeDistractionSource(game.current.url);
        image.alt = "Brain Drain Snap image";
        image.loading = "eager";
        image.decoding = "async";
        image.referrerPolicy = "no-referrer";
        els.brainDrainSnapCardView.appendChild(image);
        const round = document.createElement("span");
        round.className = "brain-snap-round";
        round.textContent = game.status === "gameover" ? "Done" : `Round ${game.round || 1}`;
        els.brainDrainSnapCardView.appendChild(round);
      } else {
        const empty = document.createElement("div");
        empty.className = "brain-snap-placeholder";
        empty.textContent = "Press New Run";
        els.brainDrainSnapCardView.appendChild(empty);
      }
      const canAnswer = game.status === "playing" && !game.loading && Boolean(game.current);
      if (els.brainDrainSnapNextBtn) els.brainDrainSnapNextBtn.disabled = !canAnswer;
      if (els.brainDrainSnapSnapBtn) els.brainDrainSnapSnapBtn.disabled = !canAnswer;
      if (els.brainDrainSnapHint) {
        els.brainDrainSnapHint.textContent = game.previous
          ? "Match means the new image belongs to the same hidden category as the last one."
          : "First image is free information. Hit Next to begin the chain.";
      }
    }

    async function startMemoryMatch(options = {}) {
      const previous = state.memoryMatch || createMemoryMatchState();
      const size = options.size || previous.size || "4x3";
      const config = memoryMatchConfig(size);
      const reusedItems = !options.newImages && Array.isArray(previous.cards)
        ? previous.cards.filter((card, index, list) => card && card.url && list.findIndex((candidate) => candidate && candidate.pair === card.pair) === index)
        : [];
      state.memoryMatch = {
        ...createMemoryMatchState(),
        size,
        loading: true,
        message: options.newImages ? "Loading a fresh image set..." : "Resetting the board..."
      };
      renderMemoryMatch();
      try {
        const items = reusedItems.length >= config.pairs
          ? reusedItems.slice(0, config.pairs)
          : await fetchMemoryMatchImages(config.pairs);
        state.memoryMatch.message = "Warming up the images...";
        renderMemoryMatch();
        await preloadMemoryMatchImages(items);
        state.memoryMatch = {
          ...createMemoryMatchState(),
          size,
          cards: buildMemoryMatchDeck(items),
          message: "Find every matching pair."
        };
      } catch (error) {
        state.memoryMatch = {
          ...createMemoryMatchState(),
          size,
        message: String(error && error.message || "Brain Drain Match could not load images.")
        };
      }
      renderMemoryMatch();
    }

    function handleMemoryMatchFlip(index) {
      const game = state.memoryMatch || createMemoryMatchState();
      const card = game.cards[index];
      if (!card || game.loading || game.locked || card.matched || game.flipped.includes(index) || game.flipped.length >= 2) return;
      game.flipped = [...game.flipped, index];
      game.message = "Pick one more.";
      if (game.flipped.length === 2) {
        game.moves += 1;
        const [firstIndex, secondIndex] = game.flipped;
        const first = game.cards[firstIndex];
        const second = game.cards[secondIndex];
        if (first && second && first.pair === second.pair) {
          first.matched = true;
          second.matched = true;
          game.matches += 1;
          game.flipped = [];
          game.reveal = { url: first.url, title: first.title || "Matched image" };
          const config = memoryMatchConfig(game.size);
          game.message = game.matches >= config.pairs
            ? `Cleared in ${game.moves} move${game.moves === 1 ? "" : "s"}.`
            : "Matched. Keep going.";
        } else {
          game.locked = true;
          game.message = "No match.";
          window.setTimeout(() => {
            const current = state.memoryMatch || createMemoryMatchState();
            current.flipped = [];
            current.locked = false;
            current.message = "Try another pair.";
            renderMemoryMatch();
          }, 850);
        }
      }
      renderMemoryMatch();
    }

    function renderMemoryMatch() {
      if (!els.memoryMatchScreen || !els.memoryMatchGrid) return;
      const game = state.memoryMatch || createMemoryMatchState();
      const config = memoryMatchConfig(game.size);
      if (els.memoryMatchStatus) {
        els.memoryMatchStatus.textContent = game.loading
          ? game.message
          : `${game.message || "Find every matching pair."} Moves: ${game.moves || 0}.`;
      }
      if (els.memoryMatchMoves) els.memoryMatchMoves.textContent = `${game.moves || 0} move${game.moves === 1 ? "" : "s"}`;
      if (els.memoryMatchMatches) els.memoryMatchMatches.textContent = `${game.matches || 0} / ${config.pairs} pairs`;
      if (els.memoryMatchGrid) {
        els.memoryMatchGrid.style.setProperty("--memory-match-columns", String(config.columns));
        const boardWidth = config.rows >= 4
          ? (config.columns >= 5 ? "780px" : "680px")
          : "760px";
        els.memoryMatchGrid.style.setProperty("--memory-match-board-width", boardWidth);
        els.memoryMatchGrid.innerHTML = "";
        if (game.loading) {
          const loading = document.createElement("div");
          loading.className = "memory-match-empty";
          loading.textContent = "Loading images...";
          els.memoryMatchGrid.appendChild(loading);
        } else if (!game.cards.length) {
          const empty = document.createElement("div");
          empty.className = "memory-match-empty";
          empty.textContent = "Press New Images to deal a board.";
          els.memoryMatchGrid.appendChild(empty);
        } else {
          game.cards.forEach((card, index) => {
            const faceUp = card.matched || game.flipped.includes(index);
            const button = document.createElement("button");
            button.className = `memory-match-tile ${faceUp ? "face-up" : ""} ${card.matched ? "matched" : ""}`.trim();
            button.type = "button";
            button.dataset.memoryIndex = String(index);
            button.disabled = game.locked || card.matched;
            button.setAttribute("aria-label", faceUp ? card.title || "Matched image" : "Face-down memory card");
            if (faceUp) {
              const image = document.createElement("img");
              image.src = card.url;
              image.alt = card.title || "Memory match image";
              image.loading = "eager";
              image.decoding = "async";
              image.referrerPolicy = "no-referrer";
              button.appendChild(image);
            } else {
              button.appendChild(memoryMatchPlaceholder());
            }
            els.memoryMatchGrid.appendChild(button);
          });
        }
      }
      if (els.memoryMatchSizeControls) {
        els.memoryMatchSizeControls.querySelectorAll("[data-memory-size]").forEach((button) => {
          button.classList.toggle("active", button.dataset.memorySize === game.size);
          button.disabled = Boolean(game.loading);
        });
      }
      if (els.memoryMatchNewImagesBtn) els.memoryMatchNewImagesBtn.disabled = Boolean(game.loading);
      if (els.memoryMatchRestartBtn) els.memoryMatchRestartBtn.disabled = Boolean(game.loading || !game.cards.length);
      if (els.memoryMatchReveal && els.memoryMatchRevealImage) {
        const reveal = game.reveal && normalizeDistractionSource(game.reveal.url) ? game.reveal : null;
        els.memoryMatchReveal.classList.toggle("hidden", !reveal);
        if (reveal) {
          els.memoryMatchRevealImage.referrerPolicy = "no-referrer";
          els.memoryMatchRevealImage.src = reveal.url;
          els.memoryMatchRevealImage.alt = reveal.title || "Matched image";
        } else {
          els.memoryMatchRevealImage.removeAttribute("src");
          els.memoryMatchRevealImage.alt = "Matched image";
        }
      }
    }

    const SOLITAIRE_FOUNDATION_SUITS = ["S", "H", "C", "D"];
    const SOLITAIRE_FOUNDATION_LABELS = ["♠", "♡", "♣", "♢"];
    const SOLITAIRE_PREVIEW_DELAY_MS = 1000;
    const SOLITAIRE_PREVIEW_STILL_RADIUS = 4;
    let solitairePreviewTimer = null;
    let solitairePreviewTarget = null;
    let solitairePreviewCard = "";
    let solitairePreviewX = 0;
    let solitairePreviewY = 0;

    function solitairePreviewEnabled() {
      return state.screen === "solitaire" || (state.screen === "game" && state.currentGame === "doubleSolitaire");
    }

    function hideSolitaireCardPreview() {
      window.clearTimeout(solitairePreviewTimer);
      solitairePreviewTimer = null;
      solitairePreviewTarget = null;
      solitairePreviewCard = "";
      if (!els.solitaireCardPreview) return;
      els.solitaireCardPreview.classList.add("hidden");
      els.solitaireCardPreview.innerHTML = "";
    }

    function showSolitaireCardPreview() {
      if (!els.solitaireCardPreview || !solitairePreviewEnabled() || !solitairePreviewTarget || !solitairePreviewCard) return;
      if (!document.body.contains(solitairePreviewTarget)) {
        hideSolitaireCardPreview();
        return;
      }
      els.solitaireCardPreview.innerHTML = "";
      els.solitaireCardPreview.appendChild(renderPlayingCard(solitairePreviewCard, false));
      els.solitaireCardPreview.classList.remove("hidden");
    }

    function scheduleSolitaireCardPreview(card, target, event) {
      if (!card || !target || !solitairePreviewEnabled()) return;
      window.clearTimeout(solitairePreviewTimer);
      solitairePreviewTarget = target;
      solitairePreviewCard = card;
      solitairePreviewX = event.clientX;
      solitairePreviewY = event.clientY;
      solitairePreviewTimer = window.setTimeout(showSolitaireCardPreview, SOLITAIRE_PREVIEW_DELAY_MS);
    }

    function handleSolitairePreviewPointerOver(event) {
      const target = event.target.closest("[data-solitaire-preview-card]");
      if (!target || !solitairePreviewEnabled()) return;
      if (target === solitairePreviewTarget) return;
      scheduleSolitaireCardPreview(target.dataset.solitairePreviewCard, target, event);
    }

    function handleSolitairePreviewPointerMove(event) {
      const target = event.target.closest("[data-solitaire-preview-card]");
      if (!target || target !== solitairePreviewTarget) return;
      const moved = Math.hypot(event.clientX - solitairePreviewX, event.clientY - solitairePreviewY) > SOLITAIRE_PREVIEW_STILL_RADIUS;
      if (moved) scheduleSolitaireCardPreview(target.dataset.solitairePreviewCard, target, event);
    }

    function handleSolitairePreviewPointerOut(event) {
      const target = event.target.closest("[data-solitaire-preview-card]");
      if (!target || target !== solitairePreviewTarget) return;
      const nextTarget = event.relatedTarget && event.relatedTarget.closest
        ? event.relatedTarget.closest("[data-solitaire-preview-card]")
        : null;
      if (nextTarget !== target) hideSolitaireCardPreview();
    }

    function handleSolitairePreviewPointerDown(event) {
      if (event.pointerType === "mouse") return;
      const target = event.target.closest("[data-solitaire-preview-card]");
      if (!target || !solitairePreviewEnabled()) return;
      scheduleSolitaireCardPreview(target.dataset.solitairePreviewCard, target, event);
    }

    function handleSolitairePreviewPointerEnd(event) {
      if (event.pointerType === "mouse") return;
      hideSolitaireCardPreview();
    }

    function solitaireRank(card) {
      const rank = String(card || "").slice(0, -1);
      if (rank === "A") return 1;
      if (rank === "J") return 11;
      if (rank === "Q") return 12;
      if (rank === "K") return 13;
      return Number(rank || 0);
    }

    function solitaireSuit(card) {
      return String(card || "").slice(-1);
    }

    function solitaireColor(card) {
      const suit = solitaireSuit(card);
      return suit === "H" || suit === "D" ? "red" : "black";
    }

    function solitaireFoundationIndex(card) {
      return SOLITAIRE_FOUNDATION_SUITS.indexOf(solitaireSuit(card));
    }

    function dealSolitaire() {
      const deck = shuffleDeck(createTwentyOneDeck()).map((card) => ({ card, faceUp: false }));
      const tableau = [[], [], [], [], [], [], []];
      for (let column = 0; column < 7; column += 1) {
        for (let count = 0; count <= column; count += 1) {
          const next = deck.pop();
          next.faceUp = count === column;
          tableau[column].push(next);
        }
      }
      const deal = {
        ...createSolitaireState(),
        stock: deck.map((entry) => entry.card),
        tableau,
        started: true,
        message: "Draw from the stock or move visible cards onto alternating colors."
      };
      deal.initialDeal = solitaireSnapshot(deal);
      state.solitaire = deal;
    }

    function solitaireSnapshot(game = state.solitaire || createSolitaireState()) {
      return {
        stock: [...(game.stock || [])],
        waste: [...(game.waste || [])],
        foundations: (game.foundations || [[], [], [], []]).map((pile) => [...pile]),
        tableau: (game.tableau || [[], [], [], [], [], [], []]).map((pile) => pile.map((entry) => ({ ...entry })))
      };
    }

    function solitaireUndoSnapshot(game = state.solitaire || createSolitaireState()) {
      return {
        ...solitaireSnapshot(game),
        moves: Number(game.moves || 0),
        selected: null,
        message: game.message || "Build all four foundations from Ace to King."
      };
    }

    function restoreSolitaireUndoSnapshot(snapshot) {
      const game = state.solitaire || createSolitaireState();
      state.solitaire = {
        ...game,
        stock: [...(snapshot.stock || [])],
        waste: [...(snapshot.waste || [])],
        foundations: (snapshot.foundations || [[], [], [], []]).map((pile) => [...pile]),
        tableau: (snapshot.tableau || [[], [], [], [], [], [], []]).map((pile) => pile.map((entry) => ({ ...entry }))),
        selected: snapshot.selected ? { ...snapshot.selected } : null,
        moves: Number(snapshot.moves || 0),
        started: true,
        message: "Undid the last move."
      };
    }

    function pushSolitaireUndo() {
      const game = state.solitaire || createSolitaireState();
      if (!game.started) return;
      game.undoStack = [
        ...(Array.isArray(game.undoStack) ? game.undoStack : []),
        solitaireUndoSnapshot(game)
      ].slice(-2);
    }

    function undoSolitaireMove() {
      const game = state.solitaire || createSolitaireState();
      const stack = Array.isArray(game.undoStack) ? game.undoStack : [];
      const snapshot = stack.pop();
      if (!snapshot) {
        game.message = "No undo available.";
        renderSolitaire();
        return;
      }
      restoreSolitaireUndoSnapshot(snapshot);
      state.solitaire.undoStack = stack;
      renderSolitaire();
    }

    function restoreSolitaireDeal() {
      const current = state.solitaire || createSolitaireState();
      const snapshot = current.initialDeal;
      if (!snapshot) {
        dealSolitaire();
        return;
      }
      state.solitaire = {
        ...createSolitaireState(),
        stock: [...(snapshot.stock || [])],
        waste: [...(snapshot.waste || [])],
        foundations: (snapshot.foundations || [[], [], [], []]).map((pile) => [...pile]),
        tableau: (snapshot.tableau || [[], [], [], [], [], [], []]).map((pile) => pile.map((entry) => ({ ...entry }))),
        started: true,
        initialDeal: snapshot,
        undoStack: [],
        message: "Deal restarted from the beginning."
      };
    }

    function newSolitaireDeal(message = "New deal started.") {
      hideSolitaireCardPreview();
      dealSolitaire();
      state.solitaire.message = message;
      renderSolitaire();
    }

    function restartSolitaireCurrentDeal() {
      hideSolitaireCardPreview();
      restoreSolitaireDeal();
      renderSolitaire();
    }

    function giveUpSolitaireDeal() {
      hideSolitaireCardPreview();
      state.solitaire = createSolitaireState();
      backToMenuFromSolo();
    }

    function solitaireSelectionKey(selection) {
      if (!selection) return "";
      return `${selection.source}:${selection.column ?? ""}:${selection.index ?? ""}:${selection.foundation ?? ""}`;
    }

    function solitaireSelectedCards(selection = state.solitaire.selected) {
      const game = state.solitaire || createSolitaireState();
      if (!selection) return [];
      if (selection.source === "waste") {
        const card = game.waste[game.waste.length - 1];
        return card ? [card] : [];
      }
      if (selection.source === "foundation") {
        const pile = game.foundations[selection.foundation] || [];
        const card = pile[pile.length - 1];
        return card ? [card] : [];
      }
      if (selection.source === "tableau") {
        return (game.tableau[selection.column] || []).slice(selection.index).filter((entry) => entry.faceUp).map((entry) => entry.card);
      }
      return [];
    }

    function selectSolitaireSource(selection) {
      const cards = solitaireSelectedCards(selection);
      if (!cards.length) return;
      const current = solitaireSelectionKey(state.solitaire.selected);
      const next = solitaireSelectionKey(selection);
      state.solitaire.selected = current === next ? null : selection;
      state.solitaire.message = state.solitaire.selected
        ? `${cards.length > 1 ? `${cards.length} cards` : cards[0]} selected. Choose a place to move.`
        : "Selection cleared.";
      renderSolitaire();
    }

    function drawSolitaireStock() {
      const game = state.solitaire || createSolitaireState();
      game.selected = null;
      if (game.stock.length) {
        pushSolitaireUndo();
        game.waste.push(game.stock.pop());
        game.message = "Card drawn.";
      } else if (game.waste.length) {
        pushSolitaireUndo();
        game.stock = game.waste.reverse();
        game.waste = [];
        game.message = "Waste returned to stock.";
      } else {
        game.message = "No cards left in stock.";
      }
      renderSolitaire();
    }

    function canPlaceSolitaireOnTableau(cards, column) {
      const game = state.solitaire || createSolitaireState();
      return canPlaceSolitaireOnTableauForGame(game, cards, column);
    }

    function canPlaceSolitaireOnTableauForGame(game, cards, column) {
      if (!cards.length) return false;
      const moving = cards[0];
      const pile = game.tableau[column] || [];
      const top = pile[pile.length - 1];
      if (!top) return solitaireRank(moving) === 13;
      return top.faceUp
        && solitaireColor(top.card) !== solitaireColor(moving)
        && solitaireRank(top.card) === solitaireRank(moving) + 1;
    }

    function canPlaceSolitaireOnFoundation(cards, foundation) {
      const game = state.solitaire || createSolitaireState();
      return canPlaceSolitaireOnFoundationForGame(game, cards, foundation);
    }

    function canPlaceSolitaireOnFoundationForGame(game, cards, foundation) {
      if (cards.length !== 1) return false;
      const card = cards[0];
      if (solitaireFoundationIndex(card) !== foundation) return false;
      const pile = game.foundations[foundation] || [];
      const top = pile[pile.length - 1];
      return top ? solitaireRank(card) === solitaireRank(top) + 1 : solitaireRank(card) === 1;
    }

    function solitaireCardHasLegalMove(game, card, origin = {}) {
      if (!card) return false;
      const cards = [card];
      if (canPlaceSolitaireOnFoundationForGame(game, cards, solitaireFoundationIndex(card))) return true;
      return (game.tableau || []).some((_, column) => {
        if (origin.source === "tableau" && origin.column === column) return false;
        return canPlaceSolitaireOnTableauForGame(game, cards, column);
      });
    }

    function solitaireTableauHasLegalMove(game) {
      return (game.tableau || []).some((pile, column) => pile.some((entry, index) => {
        if (!entry.faceUp) return false;
        const cards = pile.slice(index).filter((candidate) => candidate.faceUp).map((candidate) => candidate.card);
        if (!cards.length) return false;
        if (cards.length === 1 && canPlaceSolitaireOnFoundationForGame(game, cards, solitaireFoundationIndex(cards[0]))) return true;
        return (game.tableau || []).some((_, targetColumn) => {
          if (targetColumn === column) return false;
          return canPlaceSolitaireOnTableauForGame(game, cards, targetColumn);
        });
      }));
    }

    function solitaireFoundationsHaveLegalMove(game) {
      return (game.foundations || []).some((pile, foundation) => {
        const card = pile[pile.length - 1];
        return card && solitaireCardHasLegalMove(game, card, { source: "foundation", foundation });
      });
    }

    function solitaireWasteHasLegalMove(game) {
      const card = game.waste && game.waste[game.waste.length - 1];
      return solitaireCardHasLegalMove(game, card, { source: "waste" });
    }

    function solitaireReachableStockHasLegalMove(game) {
      const reachable = [...(game.stock || [])].reverse();
      reachable.push(...[...(game.waste || [])].reverse());
      return reachable.some((card) => solitaireCardHasLegalMove(game, card, { source: "stock" }));
    }

    function solitaireHasAnyLegalMove(game = state.solitaire || createSolitaireState()) {
      if (!game.started || (game.foundations || []).every((pile) => pile.length === 13)) return true;
      return solitaireTableauHasLegalMove(game)
        || solitaireWasteHasLegalMove(game)
        || solitaireReachableStockHasLegalMove(game);
    }

    function solitaireFoundationTarget(cards, fallbackFoundation) {
      if (cards.length !== 1) return fallbackFoundation;
      const suitFoundation = solitaireFoundationIndex(cards[0]);
      return suitFoundation >= 0 ? suitFoundation : fallbackFoundation;
    }

    function removeSolitaireSelectedCards() {
      const game = state.solitaire || createSolitaireState();
      const selection = game.selected;
      if (!selection) return [];
      if (selection.source === "waste") {
        const card = game.waste.pop();
        return card ? [card] : [];
      }
      if (selection.source === "foundation") {
        const pile = game.foundations[selection.foundation] || [];
        const card = pile.pop();
        return card ? [card] : [];
      }
      if (selection.source === "tableau") {
        const pile = game.tableau[selection.column] || [];
        const moved = pile.splice(selection.index).map((entry) => entry.card);
        const newTop = pile[pile.length - 1];
        if (newTop && !newTop.faceUp) newTop.faceUp = true;
        return moved;
      }
      return [];
    }

    function moveSolitaireToTableau(column) {
      const game = state.solitaire || createSolitaireState();
      const cards = solitaireSelectedCards();
      if (!game.selected || !canPlaceSolitaireOnTableau(cards, column)) {
        game.message = "That card cannot be placed there.";
        renderSolitaire();
        return;
      }
      pushSolitaireUndo();
      const moved = removeSolitaireSelectedCards();
      game.tableau[column].push(...moved.map((card) => ({ card, faceUp: true })));
      game.selected = null;
      game.moves += 1;
      game.message = "Moved to tableau.";
      renderSolitaire();
    }

    function moveSolitaireToFoundation(foundation) {
      const game = state.solitaire || createSolitaireState();
      const cards = solitaireSelectedCards();
      if (!game.selected || !canPlaceSolitaireOnFoundation(cards, foundation)) {
        game.message = "That card cannot go to that foundation.";
        renderSolitaire();
        return;
      }
      pushSolitaireUndo();
      const moved = removeSolitaireSelectedCards();
      game.foundations[foundation].push(moved[0]);
      game.selected = null;
      game.moves += 1;
      game.message = game.foundations.every((pile) => pile.length === 13)
        ? `Solitaire cleared in ${game.moves} moves.`
        : "Moved to foundation.";
      renderSolitaire();
    }

    function handleSolitaireClick(event) {
      hideSolitaireCardPreview();
      const action = event.target.closest("[data-solitaire-action]");
      if (action && action.dataset.solitaireAction === "restart-deal") {
        restartSolitaireCurrentDeal();
        return;
      }
      if (action && action.dataset.solitaireAction === "new-deal") {
        newSolitaireDeal();
        return;
      }
      if (action && action.dataset.solitaireAction === "give-up") {
        giveUpSolitaireDeal();
        return;
      }
      if (action && action.dataset.solitaireAction === "undo") {
        undoSolitaireMove();
        return;
      }
      if (action && action.dataset.solitaireAction === "stock") {
        drawSolitaireStock();
        return;
      }
      const cardTarget = event.target.closest("[data-solitaire-source]");
      if (cardTarget) {
        const source = cardTarget.dataset.solitaireSource;
        if (source === "waste") {
          selectSolitaireSource({ source: "waste" });
          return;
        }
        if (source === "foundation") {
          const foundation = Number(cardTarget.dataset.foundationIndex);
          const selection = { source: "foundation", foundation };
          if (solitaireSelectionKey(state.solitaire.selected) === solitaireSelectionKey(selection)) selectSolitaireSource(selection);
          else if (state.solitaire.selected) moveSolitaireToFoundation(solitaireFoundationTarget(solitaireSelectedCards(), foundation));
          else selectSolitaireSource(selection);
          return;
        }
        if (source === "tableau") {
          const column = Number(cardTarget.dataset.tableauColumn);
          const index = Number(cardTarget.dataset.cardIndex);
          const selection = { source: "tableau", column, index };
          if (solitaireSelectionKey(state.solitaire.selected) === solitaireSelectionKey(selection)) selectSolitaireSource(selection);
          else if (state.solitaire.selected) moveSolitaireToTableau(column);
          else selectSolitaireSource(selection);
          return;
        }
      }
      const location = event.target.closest("[data-solitaire-location]");
      if (!location || !state.solitaire.selected) return;
      if (location.dataset.solitaireLocation === "foundation") {
        const foundation = Number(location.dataset.foundationIndex);
        moveSolitaireToFoundation(solitaireFoundationTarget(solitaireSelectedCards(), foundation));
      } else if (location.dataset.solitaireLocation === "tableau") {
        moveSolitaireToTableau(Number(location.dataset.tableauColumn));
      }
    }

    function solitaireSlotLabel(text, className = "") {
      const label = document.createElement("span");
      label.className = `solitaire-slot-label ${className}`.trim();
      label.textContent = text;
      return label;
    }

    function renderSolitaireCard(card, hidden, attrs = {}) {
      const element = renderPlayingCard(card, hidden);
      Object.entries(attrs).forEach(([key, value]) => {
        element.dataset[key] = String(value);
      });
      if (!hidden) element.dataset.solitairePreviewCard = card;
      element.setAttribute("role", "button");
      element.setAttribute("tabindex", "0");
      return element;
    }

    function renderSolitaireNoMovesPrompt(game) {
      const existing = els.solitaireTable && els.solitaireTable.querySelector(".solitaire-no-moves");
      if (existing) existing.remove();
      if (!els.solitaireTable || !game.started || solitaireHasAnyLegalMove(game)) return;
      const prompt = document.createElement("section");
      prompt.className = "solitaire-no-moves";
      prompt.innerHTML = `
        <div>
          <strong>No moves found</strong>
          <p>No legal move is available from the board, waste, or reachable draw pile.</p>
        </div>
        <div class="solitaire-no-moves-actions">
          <button type="button" data-solitaire-action="restart-deal">Restart Deal</button>
          <button type="button" class="primary" data-solitaire-action="new-deal">New Deal</button>
          <button type="button" data-solitaire-action="give-up">Give Up</button>
        </div>
      `;
      els.solitaireTable.insertBefore(prompt, els.solitaireTableau || null);
    }

    function renderSolitaire() {
      const game = state.solitaire || createSolitaireState();
      const selectedKey = solitaireSelectionKey(game.selected);
      if (els.solitaireStatus) {
        els.solitaireStatus.textContent = `${game.message || "Build all four foundations from Ace to King."} Moves: ${game.moves || 0}.`;
      }
      if (els.solitaireUndoBtn) {
        els.solitaireUndoBtn.disabled = !game.started || !(Array.isArray(game.undoStack) && game.undoStack.length);
      }
      if (els.solitaireStock) {
        els.solitaireStock.innerHTML = "";
        if (game.stock.length) els.solitaireStock.appendChild(renderPlayingCard("AS", true));
        else els.solitaireStock.appendChild(solitaireSlotLabel(game.waste.length ? "Reset" : "Stock"));
      }
      if (els.solitaireWaste) {
        els.solitaireWaste.innerHTML = "";
        const card = game.waste[game.waste.length - 1];
        if (card) {
          const rendered = renderSolitaireCard(card, false, { solitaireSource: "waste" });
          if (selectedKey === "waste:::") rendered.classList.add("selected");
          els.solitaireWaste.appendChild(rendered);
        } else {
          els.solitaireWaste.appendChild(solitaireSlotLabel("Waste"));
        }
      }
      document.querySelectorAll(".solitaire-slot.foundation").forEach((slot, index) => {
        slot.innerHTML = "";
        const pile = game.foundations[index] || [];
        const card = pile[pile.length - 1];
        if (card) {
          const rendered = renderSolitaireCard(card, false);
          slot.appendChild(rendered);
        } else {
          slot.appendChild(solitaireSlotLabel(SOLITAIRE_FOUNDATION_LABELS[index], "suit-placeholder"));
        }
      });
      if (els.solitaireTableau) {
        els.solitaireTableau.innerHTML = "";
        game.tableau.forEach((pile, column) => {
          const columnEl = document.createElement("div");
          columnEl.className = "solitaire-column";
          columnEl.dataset.solitaireLocation = "tableau";
          columnEl.dataset.tableauColumn = String(column);
          if (!pile.length) columnEl.appendChild(solitaireSlotLabel("K"));
          pile.forEach((entry, index) => {
            const rendered = renderSolitaireCard(entry.card, !entry.faceUp, entry.faceUp
              ? { solitaireSource: "tableau", tableauColumn: column, cardIndex: index }
              : {});
            rendered.style.setProperty("--solitaire-card-index", index);
            if (selectedKey === `tableau:${column}:${index}:`) rendered.classList.add("selected");
            columnEl.appendChild(rendered);
          });
          els.solitaireTableau.appendChild(columnEl);
        });
      }
      renderSolitaireNoMovesPrompt(game);
    }

    const PLAYING_CARD_ART = {
      AS: "ace_of_spades_full.webp",
      "2S": "2_of_spades_full.webp",
      "3S": "3_of_spades_full.webp",
      "4S": "4_of_spades_full.webp",
      "5S": "5_of_spades_full.webp",
      "6S": "6_of_spades_full.webp",
      "7S": "7_of_spades_full.webp",
      "8S": "8_of_spades_full.webp",
      "9S": "9_of_spades_full.webp",
      "10S": "10_of_spades_full.webp",
      JS: "jack_of_spades_full.webp",
      QS: "queen_of_spades_full.webp",
      KS: "king_of_spades_full.webp",
      AH: "ace_of_hearts_full.webp",
      "2H": "2_of_hearts_full.webp",
      "3H": "3_of_hearts_full.webp",
      "4H": "4_of_hearts_full.webp",
      "5H": "5_of_hearts_full.webp",
      "6H": "6_of_hearts_full.webp",
      "7H": "7_of_hearts_full.webp",
      "8H": "8_of_hearts_full.webp",
      "9H": "9_of_hearts_full.webp",
      "10H": "10_of_hearts_full.webp",
      JH: "jack_of_hearts_full.webp",
      QH: "queen_of_hearts_full.webp",
      KH: "king_of_hearts_full.webp",
      AD: "ace_of_diamonds_full.webp",
      "2D": "2_of_diamonds_full.webp",
      "3D": "3_of_diamonds_full.webp",
      "4D": "4_of_diamonds_full.webp",
      "5D": "5_of_diamonds_full.webp",
      "6D": "6_of_diamonds_full.webp",
      "7D": "7_of_diamonds_full.webp",
      "8D": "8_of_diamonds_full.webp",
      "9D": "9_of_diamonds_full.webp",
      "10D": "10_of_diamonds_full.webp",
      JD: "jack_of_diamonds_full.webp",
      QD: "queen_of_diamonds_full.webp",
      KD: "king_of_diamonds_full.webp",
      AC: "ace_of_clubs_full.webp",
      "2C": "2_of_clubs_full.webp",
      "3C": "3_of_clubs_full.webp",
      "4C": "4_of_clubs_full.webp",
      "5C": "5_of_clubs_full.webp",
      "6C": "6_of_clubs_full.webp",
      "7C": "7_of_clubs_full.webp",
      "8C": "8_of_clubs_full.webp",
      "9C": "9_of_clubs_full.webp",
      "10C": "10_of_clubs_full.webp",
      JC: "jack_of_clubs_full.webp",
      QC: "queen_of_clubs_full.webp",
      KC: "king_of_clubs_full.webp",
      JOKER: "joker_full.png",
      HIDDEN_POWER: "hidden_card_full.png"
    };
    const CUSTOM_FULL_PLAYING_CARDS = new Set(["AS", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS", "AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "QH", "KH", "AD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "QD", "KD", "AC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "JC", "QC", "KC", "JOKER"]);

    function renderPlayingCard(card, hidden) {
      const element = document.createElement("div");
      element.className = "playing-card";
      if (hidden) {
        element.classList.add("hidden-card");
        element.setAttribute("aria-label", "Face-down card");
        return element;
      }
      if (card === "HIDDEN_POWER") {
        element.classList.add("custom-full-card", "higher-lower-hidden-power-card");
        const image = document.createElement("img");
        image.className = "playing-card-art";
        image.src = PLAYING_CARD_ART.HIDDEN_POWER;
        image.alt = "Hidden card";
        image.loading = "lazy";
        image.decoding = "async";
        element.appendChild(image);
        return element;
      }
      if (card === "JOKER") {
        element.classList.add("custom-full-card");
        const image = document.createElement("img");
        image.className = "playing-card-art";
        image.src = PLAYING_CARD_ART.JOKER;
        image.alt = "Joker";
        image.loading = "lazy";
        image.decoding = "async";
        element.appendChild(image);
        return element;
      }
      const suit = card.slice(-1);
      const rank = card.slice(0, -1);
      if (suit === "H" || suit === "D") element.classList.add("red");
      const symbol = suitSymbol(suit);
      const art = CUSTOM_FULL_PLAYING_CARDS.has(`${rank}${suit}`) ? PLAYING_CARD_ART[`${rank}${suit}`] : "";
      if (art) {
        element.classList.add("custom-full-card");
        const image = document.createElement("img");
        image.className = "playing-card-art";
        image.src = art;
        image.alt = `${rankName(rank)} of ${suitName(suit)}`;
        image.loading = "lazy";
        image.decoding = "async";
        element.appendChild(image);
      } else {
        element.appendChild(playingCardCorner(rank, symbol, "top"));
        element.appendChild(playingCardCorner(rank, symbol, "bottom"));
        if (isCourtRank(rank)) {
          element.appendChild(renderPlayingCardCourt(rank, symbol, suit));
        } else {
          element.appendChild(renderPlayingCardPips(rank, symbol));
        }
        const label = document.createElement("span");
        label.className = "playing-card-label";
        label.textContent = `${rankName(rank)} ${suitName(suit)}`;
        element.appendChild(label);
      }
      return element;
    }

    function playingCardCorner(rank, symbol, position) {
      const corner = document.createElement("span");
      corner.className = `playing-card-corner ${position === "bottom" ? "bottom" : ""}`.trim();
      const rankEl = document.createElement("span");
      rankEl.className = "playing-card-rank";
      rankEl.textContent = rank;
      const suitEl = document.createElement("span");
      suitEl.className = "playing-card-suit";
      suitEl.textContent = symbol;
      corner.appendChild(rankEl);
      corner.appendChild(suitEl);
      return corner;
    }

    function isCourtRank(rank) {
      return rank === "J" || rank === "Q" || rank === "K";
    }

    function renderPlayingCardCourt(rank, symbol, suit) {
      const court = document.createElement("div");
      court.className = "playing-card-court";
      court.innerHTML = `
        <span class="playing-card-court-rank">${rank}</span>
        <span class="playing-card-court-suit">${symbol}</span>
        <span class="playing-card-court-name">${rankName(rank)} of ${suitName(suit)}</span>
      `;
      return court;
    }

    function renderPlayingCardPips(rank, symbol) {
      const value = rank === "A" ? 1 : Number(rank);
      const pips = document.createElement("div");
      pips.className = `playing-card-pips ${value === 1 ? "single" : ""}`.trim();
      const count = Number.isFinite(value) ? value : 1;
      pipPositions(count).forEach((point, index) => {
        const pip = document.createElement("span");
        pip.className = `playing-card-pip ${index >= Math.ceil(count / 2) ? "flip" : ""}`.trim();
        pip.style.left = `${point.x / 10}%`;
        pip.style.top = `${point.y / 14}%`;
        pip.textContent = symbol;
        pips.appendChild(pip);
      });
      return pips;
    }

    function rankName(rank) {
      if (rank === "A") return "Ace";
      if (rank === "J") return "Jack";
      if (rank === "Q") return "Queen";
      if (rank === "K") return "King";
      return rank;
    }

    function suitName(suit) {
      if (suit === "H") return "Hearts";
      if (suit === "D") return "Diamonds";
      if (suit === "C") return "Clubs";
      return "Spades";
    }

    function suitSymbol(suit) {
      if (suit === "H") return "\u2665";
      if (suit === "D") return "\u2666";
      if (suit === "C") return "\u2663";
      return "\u2660";
    }

    function fleetShipSegment(owner, row, col) {
      const ships = state.fleet && state.fleet.ships && Array.isArray(state.fleet.ships[owner])
        ? state.fleet.ships[owner]
        : [];
      for (const ship of ships) {
        const segment = (ship.cells || []).find((cell) => cell.row === row && cell.col === col);
        if (segment) {
          return {
            ship,
            segment: Number(segment.segment || 0),
            last: Number(segment.segment || 0) === Number(ship.size || 1) - 1
          };
        }
      }
      return null;
    }

    function renderFleetShipArt(cell, owner, row, col, subtle = false) {
      const segment = fleetShipSegment(owner, row, col);
      if (!segment) return;
      const ship = segment.ship;
      const art = document.createElement("span");
      art.className = [
        "fleet-ship-art",
        `ship-${ship.design || "patrol"}`,
        `ship-size-${ship.size || 1}`,
        `ship-${ship.orientation || "horizontal"}`,
        `ship-segment-${segment.segment}`,
        segment.segment === 0 ? "ship-start" : "",
        segment.last ? "ship-end" : "",
        subtle ? "subtle" : ""
      ].filter(Boolean).join(" ");
      art.innerHTML = `
        <span class="ship-hull"></span>
        <span class="ship-mark ship-mark-a"></span>
        <span class="ship-mark ship-mark-b"></span>
      `;
      cell.appendChild(art);
    }

    function renderFleetPlacementPanel() {
      const role = localOnlineRole();
      const owner = fleetPlacementOwner();
      const canPlace = !state.online.room || role === owner;
      const size = fleetSize();
      const queue = state.fleet && Array.isArray(state.fleet.placementQueue) ? state.fleet.placementQueue : [];
      const placed = state.fleet && state.fleet.ships && Array.isArray(state.fleet.ships[owner]) ? state.fleet.ships[owner] : [];
      const spec = fleetCurrentPlacementSpec(owner);
      const ownerReady = Boolean(state.fleet && state.fleet.placementReady && state.fleet.placementReady[owner]);
      const complete = fleetPlacementComplete(owner);
      const canEdit = canPlace && !ownerReady;
      const placement = state.fleet && state.fleet.placement && state.fleet.placement[owner]
        ? state.fleet.placement[owner]
        : { orientation: "horizontal", replacingId: null };
      const waitingFor = owner === DOM ? state.names.dom : state.names.sub;
      els.board.className = "fleet-layout fleet-switch-layout";
      els.board.innerHTML = "";

      const panel = document.createElement("div");
      panel.className = "fleet-panel fleet-panel-large fleet-placement-panel";
      panel.innerHTML = `
        <div class="fleet-panel-title">
          <h3>${escapeHtml(canPlace ? "Place Your Fleet" : `${waitingFor}'s Fleet`)}</h3>
          <span>${placed.length}/${queue.length} ships placed</span>
        </div>
        <div class="fleet-placement-tools">
          <div>
            <strong>${ownerReady ? "Ready to deploy" : (spec ? `${spec.size}-cell ${spec.design}` : "Fleet placed")}</strong>
            <span>${canPlace
              ? (ownerReady ? "Waiting for the other player to ready up." : (spec ? (placement.replacingId ? "Choose a new position for this ship." : "Pick a valid square to place this ship.") : "Ready up when you like this placement."))
              : `${escapeHtml(waitingFor)} is placing ships.`}</span>
          </div>
          ${spec && !ownerReady ? `<div class="fleet-placement-preview ${placement.orientation}" style="--fleet-preview-size:${spec.size}">${Array.from({ length: spec.size }, (_, index) => `<span class="${index === 0 ? "start" : ""} ${index === spec.size - 1 ? "end" : ""}"></span>`).join("")}</div>` : ""}
          <div class="fleet-placement-actions">
            <button data-fleet-placement-random ${canPlace ? "" : "disabled"}>${complete ? "Rerandomize" : "Random Placement"}</button>
            <button data-fleet-placement-rotate ${canEdit && spec ? "" : "disabled"}>Rotate ${placement.orientation === "vertical" ? "Vertical" : "Horizontal"}</button>
            <button class="primary" data-fleet-placement-ready ${canPlace && complete && !ownerReady ? "" : "disabled"}>${ownerReady ? "Ready" : "Ready Up"}</button>
          </div>
        </div>
      `;
      const grid = document.createElement("div");
      grid.className = "fleet-grid fleet-placement-grid";
      grid.style.setProperty("--fleet-size", size);

      for (let row = 0; row < size; row += 1) {
        for (let col = 0; col < size; col += 1) {
          const cell = document.createElement("button");
          const segment = fleetShipSegment(owner, row, col);
          const valid = canEdit && spec && fleetCanPlaceShip(owner, row, col, spec);
          cell.className = `fleet-cell ${state.fleet.boards[owner][row][col] ? "ship" : ""} ${valid ? "placeable" : ""} ${segment && segment.ship.id === placement.replacingId ? "replacing" : ""}`.trim();
          if (state.fleet.boards[owner][row][col]) renderFleetShipArt(cell, owner, row, col);
          cell.setAttribute("aria-label", `${labelFor(owner)} placement row ${row + 1}, column ${col + 1}`);
          cell.disabled = !canEdit || (!valid && !segment);
          cell.addEventListener("click", () => {
            if (!canPlace) return;
            if (segment) {
              selectFleetShipForReplacement(owner, segment.ship.id);
              return;
            }
            placeFleetPlacementShip(owner, row, col);
          });
          grid.appendChild(cell);
        }
      }

      panel.querySelector("[data-fleet-placement-random]").addEventListener("click", () => randomizeFleetPlacement(owner));
      panel.querySelector("[data-fleet-placement-rotate]").addEventListener("click", () => rotateFleetPlacementShip(owner));
      panel.querySelector("[data-fleet-placement-ready]").addEventListener("click", () => readyFleetPlacement(owner));
      panel.appendChild(grid);
      els.board.appendChild(panel);
    }

    function renderFleetPlacementDecisionPanel() {
      const role = localOnlineRole();
      const owner = role === DOM || role === SUB ? role : fleetPlacementOwner();
      const canChoose = !state.online.room || role === owner;
      const decision = state.fleet && state.fleet.placementReuse ? state.fleet.placementReuse[owner] : null;
      const other = otherRole(owner);
      const otherDecision = state.fleet && state.fleet.placementReuse ? state.fleet.placementReuse[other] : null;
      els.board.className = "fleet-layout fleet-switch-layout";
      els.board.innerHTML = "";
      const panel = document.createElement("div");
      panel.className = "fleet-panel fleet-setup-panel fleet-placement-choice-panel";
      panel.innerHTML = `
        <div class="fleet-panel-title">
          <h3>Fleet Rematch</h3>
          <span>${canChoose ? "Reuse or replace your ships" : `${escapeHtml(labelFor(owner))} is choosing ships`}</span>
        </div>
        <div class="fleet-setup-summary">
          Current rules: ${fleetSize()} x ${fleetSize()} · ${fleetShipListFromCounts(fleetShipCounts()).length} ships
        </div>
        <div class="role-row">
          <button class="primary" data-fleet-reuse="true" ${canChoose && !decision ? "" : "disabled"}>Reuse Placement</button>
          <button data-fleet-reuse="false" ${canChoose && !decision ? "" : "disabled"}>Replace Ships</button>
        </div>
        <div class="fleet-setup-summary">
          ${escapeHtml(labelFor(owner))}: ${decision ? (decision === "reuse" ? "reusing placement" : "replacing ships") : "choosing"}
          · ${escapeHtml(labelFor(other))}: ${otherDecision ? (otherDecision === "reuse" ? "reusing placement" : "replacing ships") : "choosing"}
        </div>
      `;
      panel.querySelectorAll("[data-fleet-reuse]").forEach((button) => {
        button.addEventListener("click", () => chooseFleetPlacementReuse(owner, button.dataset.fleetReuse === "true"));
      });
      els.board.appendChild(panel);
    }

    function renderFleetBoard() {
      if (state.fleet && state.fleet.placementDecisionPending) {
        const role = localOnlineRole();
        const owner = role === DOM || role === SUB ? role : fleetPlacementOwner();
        if (state.fleet.placementReuse && state.fleet.placementReuse[owner] === "replace" && !(state.fleet.placementReady && state.fleet.placementReady[owner])) {
          renderFleetPlacementPanel();
        } else {
          renderFleetPlacementDecisionPanel();
        }
        return;
      }
      if (state.fleet && state.fleet.placementPending) {
        renderFleetPlacementPanel();
        return;
      }
      if (localOnlineRole() === SPECTATOR) {
        renderFleetSpectatorBoard();
        return;
      }
      if (state.fleet && state.fleet.setupPending) {
        renderFleetSetupPanel();
        return;
      }
      const viewer = localFleetViewer();
      const target = otherRole(viewer);
      const view = fleetViewMode();
      const size = fleetSize();
      els.board.className = "fleet-layout fleet-switch-layout";
      els.board.innerHTML = "";

      const switchRow = document.createElement("div");
      switchRow.className = "fleet-switch-row";
      [
        {
          mode: "target",
          kicker: "Attack",
          label: `${labelFor(target)}'s waters`,
          meta: `${fleetShotCount(viewer, "hit")} hits / ${fleetShotCount(viewer)} shots`
        },
        {
          mode: "fleet",
          kicker: "Your Fleet",
          label: `${labelFor(viewer)}'s board`,
          meta: `${fleetShotCount(target, "hit")} hits taken / ${fleetShotCount(target)} incoming`
        }
      ].forEach((item) => {
        const button = document.createElement("button");
        button.className = `fleet-switch-button ${item.mode} ${view === item.mode ? "viewing" : ""} ${state.turn === viewer && item.mode === "target" ? "active" : ""}`.trim();
        button.type = "button";
        button.innerHTML = `<small>${escapeHtml(item.kicker)}</small><strong>${escapeHtml(item.label)}</strong><span>${escapeHtml(item.meta)}</span>`;
        button.addEventListener("click", () => setFleetViewMode(item.mode));
        switchRow.appendChild(button);
      });
      els.board.appendChild(switchRow);

      const panel = document.createElement("div");
      panel.className = `fleet-panel fleet-panel-large ${view}`.trim();
      const canFire = state.active && viewer === state.turn && view === "target";
      panel.innerHTML = `
        <div class="fleet-panel-title">
          <h3>${escapeHtml(view === "target" ? `Enemy waters - ${labelFor(target)}` : `Your fleet - ${labelFor(viewer)}`)}</h3>
          <span>${state.active ? `${escapeHtml(labelFor(state.turn))} to fire` : "Waiting for start"}</span>
        </div>
      `;
      const grid = document.createElement("div");
      grid.className = "fleet-grid";
      grid.style.setProperty("--fleet-size", size);

      for (let row = 0; row < size; row += 1) {
        for (let col = 0; col < size; col += 1) {
          const cell = document.createElement("button");
          if (view === "target") {
            const shot = state.fleet.shots[viewer][row][col];
            const resolving = state.fleet.shotResolving
              && state.fleet.shotResolving.attacker === viewer
              && state.fleet.shotResolving.row === row
              && state.fleet.shotResolving.col === col;
            const revealed = viewer === DOM && state.fleet.scanReveals.some(([r, c]) => r === row && c === col);
            cell.className = `fleet-cell ${shot || ""}`;
            if (resolving) cell.classList.add("resolving-shot");
            if (revealed && !shot) cell.classList.add("revealed");
            if (viewer === SUB && isFleetTargetFogged(row, col)) cell.classList.add("fogged");
            if (viewer === SUB && state.fleet.noisyWaters && !isFleetTargetNoisyAllowed(row, col)) cell.classList.add("noisy");
            if ((revealed || shot === "hit") && state.fleet.boards[target][row][col]) renderFleetShipArt(cell, target, row, col, true);
            cell.setAttribute("aria-label", `${labelFor(target)} waters row ${row + 1}, column ${col + 1}`);
            cell.disabled = !canFire
              || Boolean(state.fleet.shotResolving)
              || Boolean(shot)
              || (viewer === SUB && isFleetTargetFogged(row, col))
              || (viewer === SUB && !isFleetTargetNoisyAllowed(row, col))
              || Boolean(localOnlineRole() && localOnlineRole() !== state.turn);
            cell.addEventListener("click", () => fireFleetShot(row, col));
          } else {
            const incoming = state.fleet.shots[target][row][col];
            const resolving = state.fleet.shotResolving
              && state.fleet.shotResolving.target === viewer
              && state.fleet.shotResolving.row === row
              && state.fleet.shotResolving.col === col;
            cell.className = `fleet-cell ${state.fleet.boards[viewer][row][col] ? "ship" : ""} ${incoming || ""}`;
            if (resolving) cell.classList.add("resolving-shot");
            if (state.fleet.boards[viewer][row][col]) renderFleetShipArt(cell, viewer, row, col);
            cell.setAttribute("aria-label", `${labelFor(viewer)} fleet row ${row + 1}, column ${col + 1}`);
            cell.disabled = true;
          }
          grid.appendChild(cell);
        }
      }

      panel.appendChild(grid);
      if (state.active && state.turn && viewer !== state.turn && view === "target") {
        const turnOverlay = document.createElement("div");
        turnOverlay.className = "fleet-turn-overlay";
        turnOverlay.textContent = `${labelFor(state.turn)}'s turn`;
        panel.appendChild(turnOverlay);
      }
      els.board.appendChild(panel);
      if (localFleetHoldUntil && Date.now() < localFleetHoldUntil) {
        window.clearTimeout(renderFleetBoard.holdTimer);
        renderFleetBoard.holdTimer = window.setTimeout(render, Math.max(0, localFleetHoldUntil - Date.now()) + 30);
      }
    }

    function renderFleetSpectatorBoard() {
      const size = fleetSize();
      els.board.className = "fleet-layout";
      els.board.innerHTML = "";
      [
        { attacker: DOM, target: SUB },
        { attacker: SUB, target: DOM }
      ].forEach(({ attacker, target }) => {
        const panel = document.createElement("div");
        panel.className = "fleet-panel";
        panel.innerHTML = `<h3>${labelFor(attacker)} attacking ${labelFor(target)}</h3>`;
        const grid = document.createElement("div");
        grid.className = "fleet-grid";
        grid.style.setProperty("--fleet-size", size);
        for (let row = 0; row < size; row += 1) {
          for (let col = 0; col < size; col += 1) {
            const cell = document.createElement("button");
            const shot = state.fleet.shots[attacker][row][col];
            cell.className = `fleet-cell ${shot || ""}`;
            cell.setAttribute("aria-label", `${labelFor(attacker)} attack row ${row + 1}, column ${col + 1}`);
            cell.disabled = true;
            grid.appendChild(cell);
          }
        }
        panel.appendChild(grid);
        els.board.appendChild(panel);
      });
    }

    function renderControls() {
      const items = currentTiltStatusItems();
      els.tiltStatus.classList.toggle("hidden", !items.length);
      els.tiltStatus.innerHTML = items.map((item) => `<div class="tilt-status-item">${item}</div>`).join("");
    }

    function currentTiltStatusItems() {
      if (state.screen !== "game") return [];
      if (state.currentGame === "tributeTicTacToe" || state.currentGame === "wheelSpin" || state.currentGame === "tributeTrail" || state.currentGame === "higherLower" || state.currentGame === "tributeCrazyEights" || state.currentGame === "doubleSolitaire") return [];
      if (state.currentGame === "tributeReversi") {
        if (state.mode !== "reclaim") return [];
        const commandText = state.reversi && state.reversi.commandMode
          ? "Command Move armed."
          : (state.reversi && state.reversi.commandWindow
            ? "Command response window open."
            : (state.reversi && state.reversi.commandAvailable ? "Command Move ready." : "Command Move spent or locked."));
        const locked = state.reversi && state.reversi.lockedDisc
          ? `Locked disc: row ${state.reversi.lockedDisc.row + 1}, column ${state.reversi.lockedDisc.col + 1}.`
          : "No locked disc.";
        return [
          `<strong>Current tilt:</strong> level ${state.tiltLevel}: ${reversiTiltSummary()}`,
          `<strong>Reversi edge:</strong> ${commandText} ${locked}`
        ];
      }
      if (state.currentGame === "tributeFleet") {
        const modifiers = state.fleet.modifiers || [];
        const modifierText = modifiers.length
          ? modifiers.map(fleetModifierChip).join("")
          : "none active.";
        return [
          `<strong>Current tilt:</strong> level ${state.tiltLevel}: ${fleetTiltDescription()}`,
          `<strong>Active modifiers:</strong> ${modifierText}`
        ];
      }
      if (state.currentGame === "tributeChess") {
        const affected = queenAffectedLabel() || "no pieces at this tilt";
        return [
          `<strong>Current tilt:</strong> level ${state.tiltLevel}: ${chessTiltSummary()}`,
          `<strong>Affected pieces:</strong> ${affected}.`
        ];
      }
      if (state.currentGame === "tributeCheckers") {
        const armed = state.checkers.powerMode
          ? `${checkersPowerInfo(state.checkers.powerMode).label} armed.`
          : "No targeted power armed.";
        const available = checkersPowerTypes()
          .filter((type) => checkersPowerInfo(type).available)
          .map((type) => checkersPowerInfo(type).label);
        return [
          `<strong>Current tilt:</strong> level ${state.tiltLevel}: ${checkersTiltSummary()}`,
          `<strong>Claim:</strong> ${Number(state.checkers.claims || 0)}. Queen's Drain: ${money(checkersQueenDrainAmount())} per queen capture.`,
          `<strong>Powers:</strong> ${available.length ? available.join(", ") : "none ready"}. ${armed}`
        ];
      }
      if (state.currentGame === "tributeTwentyOne") {
        return [`<strong>Current tilt:</strong> level ${state.tiltLevel}: ${twentyOneTiltSummary()}`];
      }
      const items = [`<strong>Current tilt:</strong> level ${state.tiltLevel}: ${tiltDescription()}`];
      if (state.currentGame === "tributeFour") {
        if (state.lockColumnMode) items.push(`<strong>Lock Column:</strong> ${state.names.dom} is choosing a column to lock.`);
        else if (state.lockedColumn !== null) items.push(`<strong>Lock Column:</strong> column ${state.lockedColumn + 1} is locked for ${state.names.sub}'s next turn.`);
        if (state.pressureDropArmed) items.push(`<strong>Pressure Drop:</strong> armed. ${state.names.sub}'s next chosen column will be forbidden on their following turn.`);
        else if (state.pressureDropColumn !== null) items.push(`<strong>Pressure Drop:</strong> column ${state.pressureDropColumn + 1} is forbidden for ${state.names.sub}'s next turn.`);
      }
      return items;
    }

    function currentGameLabel() {
      if (state.currentGame === "tributeChess") return "Tribute Chess";
      if (state.currentGame === "tributeCheckers") return "Tribute Checkers";
      if (state.currentGame === "tributeReversi") return "Tribute Reversi";
      if (state.currentGame === "tributeTwentyOne") return "Tribute Blackjack";
      if (state.currentGame === "higherLower") return "Higher / Lower";
      if (state.currentGame === "tributeCrazyEights") return "Tribute 8s";
      if (state.currentGame === "doubleSolitaire") return "Solitaire Duel";
      if (state.currentGame === "tributeTicTacToe") return "Tribute Tic Tac Toe";
      if (state.currentGame === "wheelSpin") return "Wheel Spin";
      if (state.currentGame === "tributeTrail") return "Tribute Trail";
      if (state.currentGame === "obedienceOrders") return "Obedience Orders";
      if (state.currentGame === "tributeFleet") return "Tribute Fleet";
      return "Tribute Four";
    }

    function renderRules() {
      els.rulesModalTitle.textContent = `${currentGameLabel()} Rules`;
      renderRulesTabs(state.currentGame === "tributeChess");
      if (state.currentGame === "tributeChess") {
        renderChessRules();
        return;
      }
      if (state.currentGame === "tributeCheckers") {
        renderCheckersRules();
        return;
      }
      if (state.currentGame === "tributeReversi") {
        renderReversiRules();
        return;
      }
      if (state.currentGame === "tributeTwentyOne") {
        renderTwentyOneRules();
        return;
      }
      if (state.currentGame === "higherLower") {
        renderHigherLowerRules();
        return;
      }
      if (state.currentGame === "tributeCrazyEights") {
        renderCrazyEightsRules();
        return;
      }
      if (state.currentGame === "doubleSolitaire") {
        renderDoubleSolitaireRules();
        return;
      }
      if (state.currentGame === "tributeTicTacToe") {
        renderTicTacToeRules();
        return;
      }
      if (state.currentGame === "wheelSpin") {
        renderWheelSpinRules();
        return;
      }
      if (state.currentGame === "tributeTrail") {
        renderTributeTrailRules();
        return;
      }
      if (state.currentGame === "obedienceOrders") {
        renderObedienceOrdersRules();
        return;
      }
      if (state.currentGame === "tributeFleet") {
        renderFleetRules();
        return;
      }
      const rules = [
        `<strong>Goal:</strong> drop tokens into columns and connect four in a row horizontally, vertically, or diagonally.`,
        `<strong>Normal start:</strong> a random player starts.`,
        `<strong>Reclaim start:</strong> ${state.names.dom} starts and wins full-board ties.`,
        `<strong>Power button:</strong> ${state.names.dom} uses the power screen to choose an available reclaim power.`,
        `<strong>Lock Column:</strong> ${state.names.dom} can choose one column that ${state.names.sub} cannot use on their next turn.`,
        `<strong>Pressure Drop:</strong> after ${state.names.sub} chooses a column, that same column can be forbidden on ${state.names.sub}'s following turn.`,
        `<strong>Tilt 0:</strong> ${state.names.dom} starts reclaim and wins ties.`,
        `<strong>Tilt 1:</strong> one random ${state.names.sub} column is blocked each ${state.names.sub} turn.`,
        `<strong>Tilt 2:</strong> ${state.names.dom} gets one Lock Column.`,
        `<strong>Tilt 3:</strong> ${state.names.dom} gets one Pressure Drop.`,
        `<strong>Tilt 4:</strong> ${state.names.dom} gets one Lock Column and one Pressure Drop.`,
        `<strong>Tilt 5+:</strong> ${state.names.dom} gets one Lock Column and one Pressure Drop, plus one random ${state.names.sub} column is blocked each ${state.names.sub} turn.`
      ];
      setRuleList(rules);
    }

    function renderRulesTabs(showTabs) {
      els.rulesTabs.classList.toggle("hidden", !showTabs);
      if (!showTabs) activeRulesTab = "normal";
      els.rulesTabButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.rulesTab === activeRulesTab);
      });
    }

    function setRuleList(rules) {
      els.ruleList.innerHTML = rules.map(rule => `<li>${rule}</li>`).join("");
    }

    function renderCrazyEightsRules() {
      const rules = [
        `<strong>Goal:</strong> empty your hand before your opponent.`,
        `<strong>Start:</strong> ${state.names.sub} chooses a normal bet or reclaim. Each player gets 7 cards and one discard starts the pile.`,
        `<strong>Play:</strong> match the discard rank, match the active suit, or play an 8.`,
        `<strong>8s:</strong> wild. The player chooses the next active suit.`,
        `<strong>2s:</strong> the opponent draws 2 and loses their turn.`,
        `<strong>Queens:</strong> skip the opponent, letting the same player act again.`,
        `<strong>Aces:</strong> ${state.names.dom}'s ace taxes ${state.names.sub} for 2 cards and keeps control. ${state.names.sub}'s ace makes ${state.names.dom} draw 1, then control passes to ${state.names.dom}.`,
        `<strong>Draw:</strong> if you cannot play, draw one card. If you still have no legal play, the turn passes automatically.`,
        `<strong>Normal win:</strong> if ${state.names.dom} empties her hand first, the bet enters her bank. If ${state.names.sub} wins, the bet is safe.`,
        `<strong>Reclaim:</strong> ${state.names.sub} plays to win back ${state.names.dom}'s bank; ${state.names.dom} starts reclaim games.`
      ];
      setRuleList(rules);
    }

    function renderDoubleSolitaireRules() {
      const rules = [
        `<strong>Goal:</strong> race your own Klondike board. First player to build all 52 cards onto foundations wins.`,
        `<strong>Turn flow:</strong> tableau and foundation moves can continue as long as they come from tableau or foundation cards.`,
        `<strong>Draw stack:</strong> drawing a stock card ends your turn immediately. Recycling waste back into stock does not.`,
        `<strong>Waste card:</strong> moving the top waste card is free. Only drawing a fresh stock card passes control.`,
        `<strong>Viewer:</strong> use the two progress panels to switch between ${state.names.dom}'s board and ${state.names.sub}'s board.`,
        `<strong>Progress:</strong> each progress panel shows the four suit foundations, foundation total, stock count, and waste count.`,
        `<strong>Normal win:</strong> if ${state.names.dom} clears first, the bet enters her bank. If ${state.names.sub} clears first, the bet is safe.`,
        `<strong>Reclaim:</strong> ${state.names.sub} plays to win back ${state.names.dom}'s bank; ${state.names.dom} starts reclaim races.`
      ];
      setRuleList(rules);
    }

    function renderTicTacToeRules() {
      const rules = [
        `<strong>Match setup:</strong> before the first board, ${state.names.dom} chooses the match length. First to 1 is available for bank/reclaim games, while Throne games start at Best of 3 or longer.`,
        `<strong>Board goal:</strong> first to make three in a row wins that board. The match ends when someone reaches the selected target.`,
        `<strong>Normal draw:</strong> drawn boards are replayed and do not settle the match.`,
        `<strong>Dom win:</strong> if ${state.names.dom} wins the match, the bet goes to her bank or the Throne page opens in Throne mode.`,
        `<strong>Reclaim:</strong> ${state.names.sub} plays to win back ${state.names.dom}'s bank.`,
        `<strong>Reclaim edge:</strong> ${state.names.dom} plays O first, and drawn reclaim boards go to ${state.names.dom}.`
      ];
      setRuleList(rules);
    }

    function renderReversiRules() {
      const rules = [
        `<strong>Normal bet:</strong> ${state.names.sub} chooses any cash bet. The lobby starting-player setting decides who plays dark and moves first.`,
        `<strong>Table settings:</strong> before the board opens, ${state.names.dom} can set an optional timer and choose whether legal move number hints are visible.`,
        `<strong>Goal:</strong> finish the game with more discs than your opponent.`,
        `<strong>Moves:</strong> place a disc so one or more enemy discs are trapped in a straight line between your new disc and another of your discs.`,
        `<strong>Flip:</strong> all trapped discs in every direction become yours. Legal move hints can show how many discs would flip.`,
        `<strong>Pass:</strong> if a player has no legal move, their turn is skipped automatically.`,
        `<strong>End:</strong> the game ends when neither player has a legal move. Equal normal scores return the pot.`,
        `<strong>Reclaim:</strong> ${state.names.sub} plays to win back ${state.names.dom}'s bank; ${state.names.dom} starts reclaim as the table edge.`,
        `<strong>Tier 0:</strong> both players see flip-count numbers as training wheels.`,
        `<strong>Tier 1:</strong> only ${state.names.dom} sees flip-count numbers. Bratty mode keeps the numbers visible to both players at tier 1.`,
        `<strong>Tier 2:</strong> ${state.names.dom} also sees corner and edge warnings.`,
        `<strong>Tier 3:</strong> ${state.names.dom}'s strong flips pay tribute: 3-4 discs pays $1, 5+ pays $2.`,
        `<strong>Tier 4:</strong> a ${state.names.dom} flip of 4+ discs locks one flipped disc until after ${state.names.sub}'s next move.`,
        `<strong>Tier 5:</strong> ${state.names.dom} gets one Command Move and reclaim ties go to ${state.names.dom}.`,
        `<strong>Tier 6+:</strong> Tribute Flip improves to $2/$4, and taking a corner refreshes Command Move once.`
      ];
      setRuleList(rules);
    }

    function reversiTiltSummary() {
      if (!domAdvantagesEnabled()) return "dom advantages are disabled.";
      if (state.tiltLevel >= 6) return "dom numbers, priority warnings, boosted Tribute Flip, Locked Disc, Command Move, dom reclaim ties, and one corner refresh.";
      if (state.tiltLevel >= 5) return "dom numbers, priority warnings, Tribute Flip, Locked Disc, Command Move, and dom reclaim ties.";
      if (state.tiltLevel >= 4) return "dom numbers, priority warnings, Tribute Flip, and Locked Disc.";
      if (state.tiltLevel >= 3) return "dom numbers, priority warnings, and Tribute Flip.";
      if (state.tiltLevel >= 2) return "dom numbers plus corner and edge warnings.";
      if (state.tiltLevel >= 1) return brattyReversiTrainingNumbers() ? "both players keep training numbers for Bratty." : "only the dom sees flip-count numbers.";
      return "both players see flip-count training numbers.";
    }

    function renderWheelSpinRules() {
      if (isThroneSession()) {
        const rules = [
          `<strong>Spin:</strong> ${state.names.dom} presses the center of the wheel. ${state.names.sub} does not need to unlock or spin it in Throne mode.`,
          `<strong>Hourly limit:</strong> ${state.names.dom} gets 5 Throne wheel spins per hour.`,
          `<strong>Throne layout:</strong> 36 equal-size spaces: 1 $100, 2 $50, 4 $25, 6 $10, 10 $5, 5 + free spin, and 8 blanks.`,
          `<strong>Cash result:</strong> landing on a cash space opens ${state.names.sub}'s Throne page through the extension using that amount, rounded to the nearest $5 if needed.`,
          `<strong>Free spin:</strong> + free spin does not spend one of the 5 hourly spins.`,
          `<strong>Blank:</strong> blank opens nothing and the spin is spent.`,
          `<strong>No powers:</strong> risk modes, Bless, Greedy Dom, Nudge, and unlock costs are disabled for the Throne wheel.`
        ];
        setRuleList(rules);
        return;
      }
      const rules = [
        `<strong>Spin:</strong> ${state.names.sub} presses the center of the wheel to spin. No bet is required in this mode.`,
        `<strong>The wheel:</strong> 36 equal-size spaces. Every space has the same chance to land.`,
        `<strong>Normal layout:</strong> 8 spaces show $1, 7 show $2, 5 show $5, 3 show $10, 2 show $25, 5 show -$5, 2 show -$10, and 4 are blank.`,
        `<strong>Risky layout:</strong> costs $8, pays +$5 on winning spaces, and replaces 2 $1 spaces with 2 extra -$5 spaces.`,
        `<strong>Ruthless layout:</strong> costs $15, removes $1 and $2, upgrades those low spaces into $5/$10 pressure, makes the two prize spaces $50, adds +$10 to winning spaces, keeps 4 extra minus slots, and places two blanks on each side of every $50.`,
        `<strong>Blank placement:</strong> prize clusters are mirrored straight across from each other. Normal and Risky use blank-$25-blank clusters; Ruthless uses blank-blank-$50-blank-blank clusters. The remaining spaces reshuffle whenever the 15-minute wheel timer refreshes.`,
        `<strong>Pointer:</strong> the fixed arrow at the top points to the winning space when the wheel stops.`,
        `<strong>Limits:</strong> the wheel can be spun 8 times every 15 minutes. Bless and Greedy Dom each have 2 uses, while Nudge has 4 uses in that same 15-minute window.`,
        `<strong>Bless:</strong> before the spin, ${state.names.dom} can bless all cash spaces. Normal/Risky: $1->$2, $2->$5, $5->$10, $10->$25, $25->$50. Ruthless: $5->$10, $10->$50, $50->$100.`,
        `<strong>Greedy Dom:</strong> before the spin, Greedy scales with the selected risk. Normal: $25->$60 and blank->$30. Risky: $25->$70 and blank->$35. Ruthless: $50->$110 and blank->$50. Lower cash becomes blank, minus slots stay dangerous, and the risk bonus still applies to winning Greedy spaces.`,
        `<strong>Nudge:</strong> after the wheel stops, ${state.names.dom} can move the result 1 or 2 spaces forward or back once. The bank adjusts to the new result.`,
        `<strong>Cash result:</strong> landing on a cash space adds that amount to ${state.names.dom}'s bank.`,
        `<strong>Minus result:</strong> landing on a minus space removes that amount from ${state.names.dom}'s bank, but the bank cannot go below $0.`,
        `<strong>Blank result:</strong> landing on blank means nothing enters ${state.names.dom}'s bank.`
      ];
      setRuleList(rules);
    }

    function renderObedienceOrdersRules() {
      const rules = [
        `<strong>Goal:</strong> ${state.names.sub} repeats the exact command tile order chosen by ${state.names.dom}.`,
        `<strong>Dom turn:</strong> ${state.names.dom} builds an order, chooses a twist, and sends it at the current Pressure.`,
        `<strong>Sub turn:</strong> ${state.names.sub} repeats the hidden order. Focus can reveal the next required tile.`,
        `<strong>Pressure:</strong> every successful repeat lets ${state.names.dom} press harder, repeat the same order, cash out, or start fresh.`,
        `<strong>Twists:</strong> Blind hides tile labels, Shuffle rearranges the board, Cruel and Greedy increase mistake payouts.`,
        `<strong>Mistake:</strong> a wrong tile immediately pays tribute to ${state.names.dom}'s bank, then ${state.names.dom} can resend or adjust the order.`,
        `<strong>No dom cost:</strong> ${state.names.dom}'s bank is never charged in this mode.`
      ];
      setRuleList(rules);
    }

    function renderTributeTrailRules() {
      const rules = [
        `<strong>Goal:</strong> race along the 60-space path and be the first player to reach the finish.`,
        `<strong>Trail Tribute:</strong> before the first roll, ${state.names.dom} chooses what percentage of Trail Tribute moves into her bank when the game ends.`,
        `<strong>Turns:</strong> the starting player is random. On your turn, click the die in the center of the board and move that many spaces.`,
        `<strong>Space mix:</strong> the board has 15 Card spaces, 15 Chance spaces, 18 Cash spaces, 8 blank spaces, and 2 Slide spaces between Start and Finish.`,
        `<strong>Card spaces:</strong> the same Card space draws from the dom deck or sub deck depending on who lands there.`,
        `<strong>Dom cards:</strong> these can upgrade the dom die, double cash spaces, move players, or make the sub miss a turn.`,
        `<strong>Sub cards:</strong> these are Twitter worship prompts for ${state.names.dom}'s profile, such as liking and reposting a random number of recent posts. They are manual prompts, not automated.`,
        `<strong>Chance spaces:</strong> these draw from the shared Chance deck and resolve movement, skip, or cash effects.`,
        `<strong>Cash spaces:</strong> each cash space shows $1 to $5, with higher values tending to appear later on the trail. If ${state.names.sub} lands there, it enters Trail Tribute. If ${state.names.dom} lands there, it becomes spending money. Doubled cash spaces pay twice the shown amount.`,
        `<strong>Blank spaces:</strong> blank spaces do nothing unless a card temporarily turns them into cash spaces.`,
        `<strong>Slide spaces:</strong> landing there sends the player down the marked slide to an earlier space without triggering that destination space.`,
        `<strong>Finish:</strong> if ${state.names.sub} reaches the end first, the game ends immediately. If ${state.names.dom} reaches the end first, she can end the game or go shopping.`,
        `<strong>Shopping:</strong> while shopping is active, ${state.names.dom} can buy cards on her turn using spending money. Dom cards cost ${money(6)} and activate right away, Sub cards cost ${money(3)} and activate at the end of the next ${state.names.sub} turn, and Chance cards cost ${money(4)} and activate right away. ${state.names.sub} rolls two dice while sprinting for the finish.`,
        `<strong>No bet required:</strong> Tribute Trail does not use normal bets, reclaims, or tilt in this version.`
      ];
      setRuleList(rules);
    }

    function renderChessRules() {
      const normalRules = [
        `<strong>Normal bet:</strong> ${state.names.sub} chooses any cash bet. A random player gets white and starts.`,
        `<strong>Timer:</strong> before the game starts, ${state.names.dom} can choose no timer, 5 minutes, 10 minutes, 15 minutes, or a custom chess clock. The timer can apply to both players or only ${state.names.sub}. If a timed player's clock hits zero, the other player wins.`,
        `<strong>Normal result:</strong> standard chess decides the game. If ${state.names.dom} wins, the bet goes to her bank. Draws return the pot.`,
        `<strong>Reclaim:</strong> ${state.names.sub} plays to win back ${state.names.dom}'s bank. ${state.names.dom} plays white and wins drawn positions.`,
        `<strong>Queen power setting:</strong> Off disables queen powers. Always enables queen powers immediately. Tiered unlocks them from Tilt 1 onward.`,
        `<strong>Who can use queen powers:</strong> the Chess settings can make queen powers dom-only or usable by both players, but reclaim pressure is built around ${state.names.dom}'s queen.`,
        `<strong>Affected piece tiers:</strong> Tilt 1 affects pawns; Tilt 2 adds knights; Tilt 3 adds bishops; Tilt 4 adds rooks; Tilt 5+ adds the queen.`
      ];
      const queenRules = [
        `<strong>Queen charges:</strong> stances earn a shared pool of charges. The charge buttons light up when ${state.names.dom} has enough charges to use that power.`,
        `<strong>None stance:</strong> the queen has no stance effect and earns no stance charges.`,
        `<strong>Gaze stance:</strong> when ${state.names.sub} moves an affected piece through the dom queen's line of sight, ${state.names.dom} gains 1 queen charge.`,
        `<strong>Tithe stance:</strong> when ${state.names.dom}'s queen captures an affected piece, ${state.names.dom} gains 1 queen charge.`,
        `<strong>Leash stance:</strong> affected ${state.names.sub} pieces next to the dom queen are leashed. At the end of ${state.names.sub}'s turn, ${state.names.dom} gains 1 queen charge for each leashed unit.`,
        `<strong>Reposition, cost 1:</strong> after moving, ${state.names.dom} can spend 1 charge to move her queen to one adjacent empty square. Reposition cannot capture.`,
        `<strong>Freeze, cost 1:</strong> on ${state.names.dom}'s turn, she can spend 1 charge and choose one ${state.names.sub} piece. That piece is frozen for the next two ${state.names.sub} turns.`,
        `<strong>Shield, cost 2:</strong> ${state.names.dom}'s queen cannot be captured by pawns until ${state.names.dom}'s next turn.`,
        `<strong>Skip, cost 2:</strong> ${state.names.dom} queues Skip on her turn. The next ${state.names.sub} turn is skipped, letting ${state.names.dom} move again.`,
        `<strong>Command Move, cost 3:</strong> ${state.names.dom} queues Command Move on her turn. On the next ${state.names.sub} turn, ${state.names.dom} moves one legal ${state.names.sub} piece instead.`,
        `<strong>Queued powers:</strong> Freeze, Skip, and Command Move are chosen during ${state.names.dom}'s move and take effect on a following ${state.names.sub} turn.`
      ];
      setRuleList(activeRulesTab === "queen" ? queenRules : normalRules);
    }

    function chessTiltSummary() {
      if (state.tiltLevel >= 1) return `queen stances affect ${queenAffectedLabel()}.`;
      return "dom plays white and wins draws.";
    }

    function checkersTiltSummary() {
      if (!domAdvantagesEnabled()) return "dom advantages are disabled.";
      if (state.tiltLevel >= 5) return "Crown Pull, Marked, Pinned, Hungry Crown, Tribute Toll, and Takeover are available.";
      if (state.tiltLevel >= 4) return "Crown Pull, Marked, Pinned, Hungry Crown, and Tribute Toll are available.";
      if (state.tiltLevel >= 3) return "Crown Pull, Marked, Pinned, and Hungry Crown are available.";
      if (state.tiltLevel >= 2) return "Crown Pull, Marked, and Pinned are available.";
      if (state.tiltLevel >= 1) return "Crown Pull and Marked are available.";
      return "Crown Pull is available.";
    }

    function renderCheckersRules() {
      const rules = [
        `<strong>Goal:</strong> capture every opposing piece or leave the other player with no legal move.`,
        `<strong>Table settings:</strong> before the board opens, ${state.names.dom} can set an optional timer.`,
        `<strong>Movement:</strong> regular pieces move diagonally forward one dark square. Kings move diagonally both ways.`,
        `<strong>Captures:</strong> jumps are forced. If another jump is available after a capture, the same piece must keep jumping.`,
        `<strong>Kings:</strong> a piece that reaches the far side becomes a king.`,
        `<strong>Sub losses:</strong> when ${state.names.dom} captures a ${state.names.sub} piece, the sub-loss pressure layer can show banners, text, pulse, and spiral effects.`,
        `<strong>Dom queens:</strong> ${state.names.dom}'s kings are queens. When a queen captures a ${state.names.sub} piece, cash drains into ${state.names.dom}'s bank.`,
        `<strong>Claim:</strong> ${state.names.dom} gains 1 Claim whenever she captures a ${state.names.sub} piece. Queen's Drain scales with Claim: $1 at 0-2, $2 at 3-5, and $3 at 6+.`,
        `<strong>Starting queen:</strong> before the game starts, ${state.names.sub} is asked whether ${state.names.dom} may begin with a queen. If refused, ${state.names.dom} may take one anyway; doing so raises Queen's Drain to $2, $4, and $6 for that game.`,
        `<strong>Normal start:</strong> a random player starts.`,
        `<strong>Reclaim start:</strong> ${state.names.dom} starts.`,
        `<strong>Reclaim powers:</strong> each unlocked power has 3 uses per game. ${state.names.dom} presses Power, picks a power, then targets the board if needed.`,
        `<strong>Tilt 0:</strong> Crown Pull. Pull a nearby ${state.names.sub} piece one diagonal step closer to a queen if the square between them is empty.`,
        `<strong>Tilt 1:</strong> Marked. Mark one ${state.names.sub} piece; capturing it later gives +2 Claim and drains $2.`,
        `<strong>Tilt 2:</strong> Pinned. Pin one ${state.names.sub} piece so it can only move by capture on its next turn.`,
        `<strong>Tilt 3:</strong> Hungry Crown. The next ${state.names.dom} queen capture drains an extra $2.`,
        `<strong>Tilt 4:</strong> Tribute Toll. If ${state.names.sub}'s next move ends beside a ${state.names.dom} queen, $1 drains.`,
        `<strong>Tilt 5+:</strong> Takeover. A ${state.names.dom} queen can convert an adjacent regular ${state.names.sub} piece.`
      ];
      setRuleList(rules);
    }

    function renderTwentyOneRules() {
      const rules = [
        `<strong>Normal bet:</strong> ${state.names.sub} chooses any cash bet.`,
        `<strong>Table settings:</strong> before the first hand, ${state.names.dom} chooses 1 Round, Best of 3, Best of 5, First to 3, or First to 5.`,
        `<strong>Match scoring:</strong> each won hand gives that player 1 mark. Push hands redeal with no mark. The selected mark target wins the bet or reclaim.`,
        `<strong>Player hand:</strong> ${state.names.sub} chooses Hit or Stand.`,
        `<strong>Dealer hand:</strong> after ${state.names.sub} stands, ${state.names.dom}'s hidden card is revealed and ${state.names.dom} chooses Hit or Stand for the dealer hand.`,
        `<strong>Dealer limit:</strong> ${state.names.dom} cannot stand below 17 unless Dealer Lock is active.`,
        `<strong>Win condition:</strong> closest to 21 wins. Busts lose. Normal ties push.`,
        `<strong>Reclaim:</strong> ${state.names.sub} plays to win back ${state.names.dom}'s bank. Reclaim ties go to ${state.names.dom}.`,
        `<strong>Powers:</strong> Blackjack powers follow the global dom advantage and reclaim perk settings.`,
        `<strong>Tilt 1, Peek:</strong> ${state.names.dom} can see her hidden dealer card.`,
        `<strong>Tilt 2, Soft Save:</strong> once per reclaim, a dom bust from 22 to 24 is treated as 21.`,
        `<strong>Tilt 3, Push Your Luck:</strong> ${state.names.dom} may queue this while ${state.names.sub} is deciding. If ${state.names.sub} stands, it forces one extra ${state.names.sub} card. If ${state.names.sub} survives, ${state.names.dom} immediately takes one kickback card before playing her dealer hand.`,
        `<strong>Tilt 4, Dealer Lock:</strong> ${state.names.dom} can stand on 16 or higher.`,
        `<strong>Tilt 5+, House Sweep:</strong> in reclaim, ${state.names.sub} must beat ${state.names.dom} by at least 2.`
      ];
      setRuleList(rules);
    }

    function twentyOneTiltRules() {
      if (!domAdvantagesEnabled()) return [`Tilt level ${state.tiltLevel}: dom advantages are disabled.`];
      if (!blackjackPowersEnabled()) return [`Tilt level ${state.tiltLevel}: Blackjack powers follow the global dom advantage and reclaim perk settings, and are inactive right now.`];
      const rules = [`Tilt level ${state.tiltLevel}: ${twentyOneTiltSummary()}`];
      if (state.tiltLevel >= 1) rules.push("Peek: the dom can see her hidden dealer card.");
      if (state.tiltLevel >= 2) rules.push("Soft Save: once per reclaim, a dom bust from 22 to 24 is treated as 21.");
      if (state.tiltLevel >= 3) rules.push("Push Your Luck: the dom may queue this while the sub is deciding. If the sub stands, it forces one extra sub card, but surviving subs make the dom take a kickback card.");
      if (state.tiltLevel >= 4) rules.push("Dealer Lock: the dom can stand on 16 or higher.");
      if (state.tiltLevel >= 5) rules.push("House Sweep: in reclaim, the sub must beat the dom by at least 2.");
      return rules;
    }

    function twentyOneTiltSummary() {
      if (!domAdvantagesEnabled()) return "dom advantages are disabled.";
      if (!blackjackPowersEnabled()) return "Blackjack powers are inactive under the current global settings.";
      if (state.tiltLevel >= 5) return "Peek, Soft Save, Push Your Luck, Dealer Lock, and House Sweep.";
      if (state.tiltLevel >= 4) return "Peek, Soft Save, Push Your Luck, and Dealer Lock.";
      if (state.tiltLevel >= 3) return "Peek, Soft Save, and Push Your Luck.";
      if (state.tiltLevel >= 2) return "Peek and Soft Save.";
      if (state.tiltLevel >= 1) return "Peek.";
      return "ties go to the dom.";
    }

    function fleetTiltDescription() {
      if (!domAdvantagesEnabled()) return "dom advantages are disabled.";
      if (state.tiltLevel >= 2) return "the dom gets one scan.";
      if (state.tiltLevel >= 1) return "the dom gets one scan.";
      return "the dom starts the reclaim hunt.";
    }

    function renderFleetRules() {
      const rules = [
        `<strong>Goal:</strong> sink every enemy ship segment to win.`,
        `<strong>Board view:</strong> the board auto-switches locally: enemy waters on your turn, your fleet on their turn. You can still switch manually during the current turn. This does not reveal hidden enemy ships.`,
        `<strong>Normal start:</strong> a random player fires first.`,
        `<strong>Reclaim start:</strong> ${state.names.dom} fires first.`,
        `<strong>Sub losses:</strong> when ${state.names.dom} sinks one of ${state.names.sub}'s ships, a banner can flash as part of the sub-loss pressure settings.`,
        `<strong>Power button:</strong> ${state.names.dom} uses the power screen to use Scan and inspect active modifiers.`,
        `<strong>Scan:</strong> ${state.names.dom} can reveal one hidden ${state.names.sub} ship segment from Tilt 1 onward.`,
        `<strong>Modifiers:</strong> reclaim rounds can add passive effects such as Double Tap, Command Fog, Dom Counterfire, Noisy Waters, and Priority Intel.`,
        `<strong>Tilt 1:</strong> ${state.names.dom} gets Scan.`,
        `<strong>Tilt 2:</strong> Scan plus one random modifier.`,
        `<strong>Tilt 3:</strong> Scan plus one random modifier and Command Fog.`,
        `<strong>Tilt 4:</strong> Scan plus two random modifiers.`,
        `<strong>Tilt 5+:</strong> Scan plus three random modifiers.`
      ];
      setRuleList(rules);
    }

    function renderHigherLowerRules() {
      const rules = [
        `<strong>Goal:</strong> ${state.names.sub} guesses whether the next card is higher, lower, or the same rank as the current card.`,
        `<strong>Card order:</strong> 2 is low, ace is high. Matching ranks are only won by calling Even.`,
        `<strong>Dom setup:</strong> ${state.names.dom} sets the cash-out streak from ${HIGHER_LOWER_MIN_TARGET} to ${HIGHER_LOWER_MAX_TARGET}. The default is ${HIGHER_LOWER_DEFAULT_TARGET}.`,
        `<strong>Correct guess:</strong> the streak rises by 1. Calling Same correctly adds 2 because it is much rarer.`,
        `<strong>Cash out:</strong> ${state.names.sub} can only cash out after reaching the target streak in a row.`,
        `<strong>Wrong guess:</strong> one wrong call resets ${state.names.sub}'s correct streak and adds the current wrong-call amount to the pending owed counter.`,
        `<strong>Wrong-call ramp:</strong> wrong calls start at ${money(1)}. Every ${HIGHER_LOWER_WRONG_STEP} wrong guesses in a row increases future wrong calls by ${money(1)}. Correct guesses do not lower it.`,
        `<strong>Collect:</strong> ${state.names.dom} can collect the pending owed counter before ${state.names.sub} cashes out. Until then, it is not in the bank.`,
        `<strong>Give up offer:</strong> ${state.names.dom} can offer a custom price for ${state.names.sub} to give up. If accepted, that price ends the run instead of the owed counter.`,
        `<strong>Dom preview:</strong> ${state.names.dom} can see the next card plus the following two cards while the run is active.`,
        `<strong>Dom powers:</strong> every 5 correct calls in a row gives ${state.names.dom} a power. Opening the power menu pauses ${state.names.sub}'s buttons while ${state.names.dom} chooses their fate.`,
        `<strong>Power options:</strong> ${state.names.dom} can hide the next card, set the next two cards, force ${state.names.sub} to guess the next card's suit, or start Tribute Pulse.`,
        `<strong>Tribute Pulse:</strong> each second adds ${money(1)} to the pending owed counter for ${HIGHER_LOWER_PULSE_SECONDS} seconds. It stays added whether the next guess is right or wrong.`,
        `<strong>Throne mode:</strong> Higher / Lower uses the final collected or accepted give-up value for the Throne payment.`,
        `<strong>Reclaim:</strong> Higher / Lower does not use reclaim yet. It is a quick normal-bet punishment game for now.`
      ];
      setRuleList(rules);
    }

    function renderText() {
      renderGameChrome();
      const isTrail = state.currentGame === "tributeTrail";
      const isBlackjack = state.currentGame === "tributeTwentyOne";
      const isHigherLower = state.currentGame === "higherLower";
      const isTributeFour = state.currentGame === "tributeFour";
      const isFleet = state.currentGame === "tributeFleet";
      const isCrazyEights = state.currentGame === "tributeCrazyEights";
      const isDoubleSolitaire = state.currentGame === "doubleSolitaire";
      const throneWheelSpin = state.currentGame === "wheelSpin" && isThroneSession();
      const throneCompactBoard = isThroneSession() && (state.currentGame === "tributeFour" || state.currentGame === "tributeFleet");
      const crazyEightsRoundActive = isCrazyEights && state.active;
      const doubleSolitaireRaceActive = isDoubleSolitaire && state.active;
      const wagerLayoutGame = state.screen === "game" && usesRoundFlow() && !isHigherLower;
      els.gameScreen.classList.toggle("trail-wide", isTrail);
      els.gameScreen.classList.toggle("blackjack-wide", isBlackjack);
      els.gameScreen.classList.toggle("wager-wide", wagerLayoutGame);
      els.gameScreen.classList.toggle("higherlower-wide", isHigherLower);
      els.gameScreen.classList.toggle("four-wide", isTributeFour);
      els.gameScreen.classList.toggle("fleet-wide", isFleet);
      els.gameScreen.classList.toggle("crazy8-wide", crazyEightsRoundActive);
      els.gameScreen.classList.toggle("double-solitaire-wide", doubleSolitaireRaceActive);
      els.cashLedgerPanel.classList.toggle("hidden", isTrail || isHigherLower || wagerLayoutGame || crazyEightsRoundActive || doubleSolitaireRaceActive || throneWheelSpin || throneCompactBoard);
      els.cashLedgerPanel.classList.toggle("blackjack-ledger", isBlackjack);
      els.trailBankAmount.textContent = money(state.trail && state.trail.tributeBank || 0);
      els.trailSpendingAmount.textContent = money(state.trail && state.trail.spendingMoney || 0);
      els.pot.textContent = money(isThroneSession() && !state.active ? currentThroneAmount() : state.pot);
      els.domVault.textContent = money(state.domVault);
      els.lockedTribute.textContent = money(state.domVault);
      if (els.turnDomBankPill) els.turnDomBankPill.classList.toggle("hidden", !(isHigherLower || crazyEightsRoundActive || doubleSolitaireRaceActive));
      if (els.turnDomBank) els.turnDomBank.textContent = money(state.domVault);
      if (els.turnOwedPill) els.turnOwedPill.classList.toggle("hidden", !(isHigherLower || crazyEightsRoundActive || doubleSolitaireRaceActive));
      if (els.turnOwedLabel) els.turnOwedLabel.textContent = (crazyEightsRoundActive || doubleSolitaireRaceActive) ? "Pot" : "Owed";
      if (els.turnOwed) els.turnOwed.textContent = money(isHigherLower ? higherLowerDomPossibleWin() : ((crazyEightsRoundActive || doubleSolitaireRaceActive) ? state.pot : 0));
      renderChessClocks();
      if (els.backToMenuBtn) {
        const role = localOnlineRole();
        const blocked = Boolean(state.online.room && role !== DOM);
        els.backToMenuBtn.disabled = blocked;
        els.backToMenuBtn.title = blocked ? "Only the dom can return to games during an online room." : "";
      }
      els.modeLabel.textContent = state.currentGame === "wheelSpin"
        ? (isThroneSession() ? "Throne Wheel" : "Free Spin")
        : (state.currentGame === "tributeTrail" ? "Trail Race" : (state.currentGame === "obedienceOrders" ? "Order Chain" : (state.currentGame === "higherLower" ? "Card Streak" : (state.currentGame === "tributeCrazyEights" ? "Card Duel" : (state.currentGame === "doubleSolitaire" ? "Solitaire Duel" : (state.mode === "reclaim" ? "Reclaim Match" : "Normal Match"))))));

      if (state.currentGame === "wheelSpin") {
        els.turnText.innerHTML = state.wheel.spinning
          ? `<strong>The wheel is spinning.</strong>`
          : (isThroneSession()
            ? `<strong>${state.names.dom}</strong> can spin the Throne wheel. ${wheelSpinsRemaining()} spins left this hour.`
            : (state.wheel.unlocked
            ? `<strong>${state.names.sub}</strong> can press the center to spin.`
            : `<strong>${state.names.dom}</strong> must unlock the wheel for ${state.names.sub}.`));
      } else if (state.currentGame === "tributeTrail") {
        if (state.trail && state.trail.setupPending) {
          els.turnText.innerHTML = `<strong>${state.names.dom}</strong> chooses how much Trail Tribute moves into her bank at the end.`;
        } else if (state.trail && state.trail.trailSelection) {
          const selection = state.trail.trailSelection;
          els.turnText.innerHTML = `<strong>${state.names.dom}</strong> must choose ${selection.remaining || 1} ${selection.label || "space"}${Number(selection.remaining || 1) === 1 ? "" : "s"} before rolling continues.`;
        } else if (state.trail && state.trail.pendingCardActivation) {
          els.turnText.innerHTML = `<strong>${labelFor(state.trail.pendingCardActivation.player)}</strong> must confirm the card before rolling continues.`;
        } else if (state.active) {
          const roll = state.trail.lastRoll;
          const rollText = roll ? ` Last roll: ${labelFor(roll.player)} rolled ${roll.roll}${state.trail.shoppingMode && roll.player === SUB ? " on a sprint roll" : ` on a d${roll.sides}`}.` : "";
          els.turnText.innerHTML = state.trail.shoppingMode
            ? (state.turn === SUB
              ? `<strong>${state.names.sub}</strong> sprints with two dice.${rollText}`
              : `<strong>${state.names.dom}</strong> may shop or end the game.${rollText}`)
            : `<strong>${labelFor(state.turn)}</strong> to roll.${rollText}`;
        } else if (state.trail.winner) {
          els.turnText.innerHTML = `<strong>${labelFor(state.trail.winner)}</strong> reached the finish.`;
        } else {
          els.turnText.innerHTML = `<strong>Tribute Trail</strong> is ready to reset.`;
        }
      } else if (state.currentGame === "obedienceOrders") {
        const obedience = state.obedience || createObedienceState();
        if (obedience.phase === "recall") {
          els.turnText.innerHTML = `<strong>${state.names.sub}</strong> repeats the hidden command order.`;
        } else if (obedience.phase === "complete") {
          els.turnText.innerHTML = `<strong>${state.names.dom}</strong> decides whether to press, twist, or cash out.`;
        } else if (obedience.phase === "cashed") {
          els.turnText.innerHTML = `<strong>Order cashed out.</strong> Start a new duel when ready.`;
        } else {
          els.turnText.innerHTML = `<strong>${state.names.dom}</strong> builds the command order.`;
        }
      } else if (state.currentGame === "higherLower") {
        const streak = Number(state.higherLower && state.higherLower.streak || 0);
        if (state.active) {
          const target = higherLowerTarget(state.higherLower && state.higherLower.targetStreak);
          if (state.higherLower && state.higherLower.powerMenuOpen) {
            els.turnText.innerHTML = `<strong>${state.names.dom}</strong> is choosing ${state.names.sub}'s fate.`;
          } else if (state.higherLower && state.higherLower.suitCallPending) {
            els.turnText.innerHTML = `<strong>${state.names.sub}</strong> must guess the next suit. ${Math.max(0, target - streak)} correct call${Math.max(0, target - streak) === 1 ? "" : "s"} to cash out.`;
          } else {
            els.turnText.innerHTML = `<strong>${state.names.sub}</strong> guesses the next card. ${Math.max(0, target - streak)} correct call${Math.max(0, target - streak) === 1 ? "" : "s"} to cash out.`;
          }
        } else if (state.higherLower && state.higherLower.winner) {
          els.turnText.innerHTML = `<strong>${labelFor(state.higherLower.winner)}</strong> wins the Higher / Lower run.`;
        } else {
          els.turnText.innerHTML = `<strong>${state.names.dom}</strong> sets the Higher / Lower cash-out streak.`;
        }
      } else if (state.currentGame === "tributeCrazyEights") {
        if (state.active && state.crazyEights && state.crazyEights.pendingWild) {
          els.turnText.innerHTML = `<strong>${labelFor(state.crazyEights.pendingWild.player)}</strong> chooses the next suit.`;
        } else if (state.active) {
          els.turnText.innerHTML = `<strong>${labelFor(state.turn)}</strong> to play. Match the discard, draw, or throw an 8.`;
        } else if (state.crazyEights && state.crazyEights.winner) {
          els.turnText.innerHTML = `<strong>${labelFor(state.crazyEights.winner)}</strong> wins Tribute 8s.`;
        } else {
          els.turnText.innerHTML = `<strong>${state.names.sub}</strong> chooses the buy-in to deal Tribute 8s.`;
        }
      } else if (state.currentGame === "doubleSolitaire") {
        const viewed = localDoubleSolitaireViewedPlayer();
        if (state.active) {
          els.turnText.innerHTML = `<strong>${labelFor(state.turn)}</strong> to play. Viewing ${labelFor(viewed)}'s board. Drawing a stock card passes the turn.`;
        } else if (state.doubleSolitaire && state.doubleSolitaire.winner) {
          els.turnText.innerHTML = `<strong>${labelFor(state.doubleSolitaire.winner)}</strong> wins Solitaire Duel.`;
        } else {
          els.turnText.innerHTML = `<strong>${state.names.sub}</strong> chooses the buy-in to deal Solitaire Duel.`;
        }
      } else if (state.currentGame === "tributeTicTacToe") {
        const game = normalizeTicTacToeState(state.ticTacToe);
        const format = currentTicTacToeFormat();
        if (state.active) {
          els.turnText.innerHTML = `<strong>${labelFor(state.turn)}</strong> to move. ${format.label}, ${ticTacToeScoreText()}.`;
        } else if (game.pendingNextBoard) {
          els.turnText.innerHTML = `<strong>Board ${game.boardNumber} finished.</strong> ${state.names.dom} starts the next board when ready. ${ticTacToeScoreText()}.`;
        } else if (game.matchActive) {
          els.turnText.innerHTML = `<strong>Tic Tac Toe match finished.</strong> ${ticTacToeScoreText()}.`;
        } else {
          els.turnText.innerHTML = `<strong>${state.names.dom}</strong> chooses the Tic Tac Toe match length before the first board.`;
        }
      } else if (state.currentGame === "tributeReversi") {
        const score = reversiScore();
        if (state.reversi && state.reversi.setupPending) {
          els.turnText.innerHTML = `<strong>${state.names.dom}</strong> chooses the Reversi settings.`;
        } else if (state.active) {
          const legal = reversiLegalMoves(state.turn).length;
          if (state.reversi && state.reversi.commandWindow) {
            els.turnText.innerHTML = `<strong>${state.names.dom}</strong> may Command Move or let ${state.names.sub} move.`;
          } else if (state.reversi && state.reversi.commandMode) {
            els.turnText.innerHTML = `<strong>${state.names.dom}</strong> chooses ${state.names.sub}'s legal Reversi move.`;
          } else {
            els.turnText.innerHTML = `<strong>${labelFor(state.turn)}</strong> to move. ${legal} legal move${legal === 1 ? "" : "s"}.`;
          }
        } else if (state.reversi && state.reversi.winner) {
          els.turnText.innerHTML = `<strong>${labelFor(state.reversi.winner)}</strong> controls the board. ${state.names.sub}: ${score.sub}, ${state.names.dom}: ${score.dom}.`;
        } else if (score.sub + score.dom > 4) {
          els.turnText.innerHTML = `<strong>Reversi draw.</strong> ${state.names.sub}: ${score.sub}, ${state.names.dom}: ${score.dom}.`;
        } else {
          els.turnText.innerHTML = `<strong>${startingPlayerMode() === "random" ? "Random player" : labelFor(startingPlayerMode())}</strong> starts as dark after the bet is approved.`;
        }
      } else if (state.currentGame === "tributeChess" && state.chess && state.chess.setupPending) {
        els.turnText.innerHTML = `<strong>${state.names.dom}</strong> chooses the Chess timer settings.`;
      } else if (state.currentGame === "tributeCheckers" && state.checkers && state.checkers.setupPending) {
        els.turnText.innerHTML = `<strong>${state.names.dom}</strong> chooses the Checkers settings.`;
      } else if (!state.active) {
        if (state.currentGame === "tributeCheckers" && state.checkers && state.checkers.queenSetup) {
          const stage = state.checkers.queenSetup.stage || "sub";
          els.turnText.innerHTML = stage === "domThrone"
            ? `<strong>${state.names.dom}</strong> decides whether to start with a queen.`
            : stage === "sub"
            ? `<strong>${state.names.sub}</strong> decides whether ${state.names.dom} starts with a queen.`
            : `<strong>${state.names.dom}</strong> decides whether to take the queen anyway.`;
        } else if (state.currentGame === "tributeFleet" && state.fleet && state.fleet.setupPending) {
          els.turnText.innerHTML = `<strong>${state.names.dom}</strong> is configuring the fleet size and ships.`;
        } else if (state.currentGame === "tributeFleet" && state.fleet && state.fleet.placementDecisionPending) {
          els.turnText.innerHTML = `<strong>Fleet rematch.</strong> Each player chooses reuse or replace.`;
        } else if (state.currentGame === "tributeFleet" && state.fleet && state.fleet.placementPending) {
          const owner = fleetPlacementOwner();
          els.turnText.innerHTML = `<strong>${labelFor(owner)}</strong> is placing ships.`;
        } else if (isThroneSession() && state.normalReplayPrompt) {
          els.turnText.innerHTML = `<strong>${currentGameLabel()} finished.</strong> Replay or go back to Game Select.`;
        } else if (isThroneSession()) {
          els.turnText.innerHTML = `<strong>${state.names.dom}</strong> starts the next throne game when ready.`;
        } else {
          els.turnText.innerHTML = state.domVault > 0
            ? `<strong>${state.names.sub}</strong> may make a normal bet or attempt reclaim.`
            : `<strong>${state.names.sub}</strong> must make a normal bet to begin.`;
        }
      } else if (state.currentGame === "tributeTwentyOne") {
        if (state.twentyOne.setupPending) {
          els.turnText.innerHTML = `<strong>${state.names.dom}</strong> chooses the Blackjack settings.`;
        } else if (state.twentyOne.nextHandPending) {
          els.turnText.innerHTML = `<strong>${state.names.dom}</strong> starts the next Blackjack hand.`;
        } else if (state.twentyOne.pushLuckPending) {
          els.turnText.innerHTML = `<strong>${state.names.dom}</strong> may Push Your Luck. Force one more ${state.names.sub} card, or let the stand hold.`;
        } else if (state.twentyOne.dealerTurn) {
          const score = twentyOneScore(state.twentyOne.hands.dom).total;
          const minimum = twentyOneDealerStandMinimum();
          els.turnText.innerHTML = `<strong>${state.names.dom}</strong> controls the dealer hand at ${score}. ${score < minimum ? `Hit until at least ${minimum}.` : "Hit or stand."}`;
        } else {
          els.turnText.innerHTML = `<strong>${state.names.sub}</strong> chooses Hit or Stand. ${reclaimPerksActive() ? "The table is tilted." : "Clean rules, clean stake."}`;
        }
      } else {
        const actor = labelFor(state.turn);
        els.turnText.innerHTML = state.currentGame === "wheelSpin"
          ? (state.wheel.spinning ? `<strong>The wheel is spinning.</strong>` : `<strong>${state.names.sub}</strong> must spin the wheel.`)
          : `<strong>${actor}</strong> to move. ${reclaimPerksActive() ? "The table is tilted." : "Clean rules, clean stake."}`;
      }

      const onlineBlocksSub = Boolean(localOnlineRole() && localOnlineRole() !== SUB);
      const localRole = localOnlineRole();
      const onlineBlocksDom = !domAdvantageControlsAllowed(localRole);
      const isWheelSpin = state.currentGame === "wheelSpin";
      const isFreeGame = isWheelSpin || state.currentGame === "tributeTrail" || state.currentGame === "obedienceOrders";
      const normalOnlyGame = state.currentGame === "higherLower";
      const ticTacToeBetweenBoards = state.currentGame === "tributeTicTacToe" && state.ticTacToe && state.ticTacToe.pendingNextBoard;
      const wagerPending = Boolean(state.pendingWager);
      renderWheelDomTools();
      els.betInput.classList.toggle("hidden", isFreeGame || normalOnlyGame || isThroneSession());
      els.normalBtn.classList.toggle("hidden", isFreeGame || normalOnlyGame);
      els.reclaimBtn.classList.toggle("hidden", isFreeGame || normalOnlyGame || isThroneSession());
      els.reclaimBtn.disabled = state.active || ticTacToeBetweenBoards || wagerPending || state.domVault <= 0 || onlineBlocksSub || isThroneSession();
      els.normalBtn.disabled = state.active || ticTacToeBetweenBoards || wagerPending || onlineBlocksSub;
      els.betInput.disabled = state.active || ticTacToeBetweenBoards || wagerPending || onlineBlocksSub || (!isThroneSession() && state.settings.subBetControl === "locked");
      if (els.potLabel) els.potLabel.textContent = isThroneSession() ? "Throne amount" : "Current pot";
      els.normalBtn.textContent = isThroneSession() ? "Start" : "Bet";
      els.betInput.setAttribute("aria-label", isThroneSession() ? "Throne payment amount" : "Bet amount");
      els.betInput.title = isThroneSession() ? "This amount is used for the Throne demand if the sub loses." : "Bet amount";
      els.hitBtn.classList.toggle("hidden", state.currentGame !== "tributeTwentyOne");
      els.queenRepositionBtn.classList.add("hidden");
      els.queenShieldBtn.classList.add("hidden");
      els.chessSkipBtn.classList.add("hidden");
      els.passBtn.classList.remove("hidden");
      els.queenStanceSelect.classList.add("hidden");
      els.queenChargeText.classList.add("hidden");
      if (state.currentGame === "tributeChess") {
        const queenActive = chessQueenStancesActive();
        els.queenStanceSelect.classList.add("hidden");
        els.queenChargeText.classList.add("hidden");
        els.queenStanceSelect.value = state.chess.queenStance || "none";
        els.hitBtn.classList.add("hidden");
        els.chessSkipBtn.classList.add("hidden");
        els.queenRepositionBtn.classList.add("hidden");
        els.queenShieldBtn.classList.add("hidden");
        els.passBtn.classList.toggle("hidden", !queenActive);
        els.passBtn.disabled = !state.active || !queenActive || !queenPowerControlsAllowed(localRole);
        els.passBtn.textContent = "Power";
      } else if (state.currentGame === "tributeTwentyOne") {
        const pushLuckPending = state.active && state.turn === DOM && state.twentyOne.pushLuckPending;
        const setupPending = Boolean(state.twentyOne.setupPending);
        const subDecision = state.active && state.turn === SUB && !setupPending;
        const domDealerTurn = state.active && state.turn === DOM && state.twentyOne.dealerTurn;
        const canHit = (subDecision && (!localRole || localRole === SUB))
          || ((domDealerTurn || pushLuckPending) && (!localRole || localRole === DOM));
        els.hitBtn.disabled = !canHit;
        els.hitBtn.classList.toggle("hidden", state.currentGame !== "tributeTwentyOne" || localRole === SPECTATOR);
        const domPowerView = Boolean((localRole === DOM || !localRole) && canOpenTwentyOnePowerModal());
        const canStand = (subDecision && (!localRole || localRole === SUB))
          || ((domDealerTurn || pushLuckPending) && (!localRole || localRole === DOM));
        els.passBtn.disabled = domPowerView
          ? false
          : !canStand;
        els.hitBtn.textContent = pushLuckPending ? "Push Them" : "Hit";
        els.passBtn.textContent = pushLuckPending ? "Let Them Stand" : (domPowerView ? "Power" : "Stand");
        els.hitBtn.classList.add("hidden");
        els.passBtn.classList.add("hidden");
      } else if (state.currentGame === "tributeCheckers") {
        els.hitBtn.classList.add("hidden");
        const checkersPowerReady = checkersPowerTypes().some((type) => checkersPowerInfo(type).available);
        const canUsePower = state.active && state.mode === "reclaim" && state.turn === DOM && checkersPowerReady && !onlineBlocksDom;
        els.passBtn.disabled = !canUsePower;
        els.passBtn.textContent = state.checkers.powerMode ? "Power Armed" : "Power";
      } else if (state.currentGame === "tributeFleet") {
        const hasFleetPowers = state.mode === "reclaim" && (state.tiltLevel >= 1 || (state.fleet.modifiers || []).length > 0);
        els.passBtn.disabled = !state.active || !hasFleetPowers || onlineBlocksDom;
        els.passBtn.textContent = "Power";
      } else if (state.currentGame === "tributeTrail") {
        els.passBtn.classList.add("hidden");
      } else if (state.currentGame === "tributeReversi") {
        const canCommand = canUseReversiCommandMove();
        const commandWindow = Boolean(state.reversi && state.reversi.commandWindow && !state.reversi.commandMode);
        els.hitBtn.classList.toggle("hidden", !commandWindow);
        els.hitBtn.disabled = !commandWindow || !domAdvantageControlsAllowed(localRole);
        els.hitBtn.textContent = "Let Them Move";
        els.passBtn.classList.toggle("hidden", !(canCommand || (state.reversi && state.reversi.commandMode)));
        els.passBtn.disabled = !canCommand;
        els.passBtn.textContent = state.reversi && state.reversi.commandMode ? "Command Armed" : "Command Move";
      } else if (state.currentGame === "tributeTicTacToe" || state.currentGame === "wheelSpin" || state.currentGame === "obedienceOrders" || state.currentGame === "higherLower" || state.currentGame === "tributeCrazyEights" || state.currentGame === "doubleSolitaire") {
        els.passBtn.classList.add("hidden");
      } else {
        const tributeFourPowerReady = !state.lockColumnMode && ((state.lockColumnAvailable && !state.lockColumnMode) || (state.pressureDropAvailable && !state.pressureDropArmed));
        els.passBtn.disabled = !state.active || state.mode !== "reclaim" || state.turn !== DOM || !tributeFourPowerReady || onlineBlocksDom;
        if (state.lockColumnMode) {
          els.passBtn.textContent = "Pick Column";
        } else if (state.lockColumnAvailable) {
          els.passBtn.textContent = "Lock Column";
        } else if (state.pressureDropArmed) {
          els.passBtn.textContent = "Armed";
        } else if (state.pressureDropAvailable) {
          els.passBtn.textContent = "Pressure Drop";
        } else {
          els.passBtn.textContent = "Power";
        }
      }
    }

    function renderChessClocks() {
      const show = turnTimerActive();
      const timerState = timerGameState();
      window.clearTimeout(renderChessClocks.timer);
      [els.chessSubClock, els.chessDomClock].forEach((clock) => {
        if (clock) clock.classList.toggle("hidden", !show);
      });
      if (!show || !timerState) return;
      if (els.chessSubClock) {
        els.chessSubClock.classList.toggle("active", state.turn === SUB);
        const value = els.chessSubClock.querySelector("strong");
        if (value) value.textContent = formatChessClock(timerState.timers && timerState.timers.sub);
      }
      if (els.chessDomClock) {
        const domUnlimited = timerState.timerTarget === "sub";
        els.chessDomClock.classList.toggle("active", state.turn === DOM && !domUnlimited);
        els.chessDomClock.classList.toggle("unlimited", domUnlimited);
        const value = els.chessDomClock.querySelector("strong");
        if (value) value.textContent = domUnlimited ? "--:--" : formatChessClock(timerState.timers && timerState.timers.dom);
      }
      renderChessClocks.timer = window.setTimeout(() => {
        syncChessClock();
        renderText();
      }, 250);
    }

    function renderGameChrome() {
      if (state.currentGame === "tributeChess") {
        els.gameTitle.textContent = "Tribute Chess";
        els.gameSubtitle.textContent = "Classic chess with cash stakes. Reclaim turns the dom queen into the source of Freeze, Skip, and Command charges.";
        return;
      }
      if (state.currentGame === "tributeCheckers") {
        els.gameTitle.textContent = "Tribute Checkers";
        els.gameSubtitle.textContent = "Classic checkers with forced jumps, Claim scaling, dom queens, and cash-draining captures.";
        return;
      }
      if (state.currentGame === "tributeReversi") {
        els.gameTitle.textContent = "Tribute Reversi";
        els.gameSubtitle.textContent = "Classic Reversi with cash stakes. Trap lines, flip discs, and finish with control of the board.";
        return;
      }
      if (state.currentGame === "tributeTwentyOne") {
        els.gameTitle.textContent = "Tribute Blackjack";
        els.gameSubtitle.textContent = "Blackjack hands with cash stakes. The sub plays first, then the dom controls the dealer hand and takes the table edge in reclaim.";
        return;
      }
      if (state.currentGame === "higherLower") {
        els.gameTitle.textContent = "Higher / Lower";
        els.gameSubtitle.textContent = "A dom-set card endurance run. The sub chases the cash-out streak while wrong calls build a pending owed counter.";
        return;
      }
      if (state.currentGame === "tributeCrazyEights") {
        els.gameTitle.textContent = "Tribute 8s";
        els.gameSubtitle.textContent = "Crazy Eights with wild suits, draw traps, skips, and ace tribute tax.";
        return;
      }
      if (state.currentGame === "doubleSolitaire") {
        els.gameTitle.textContent = "Solitaire Duel";
        els.gameSubtitle.textContent = "A turn-based Klondike race where drawing a stock card passes control.";
        return;
      }
      if (state.currentGame === "tributeTicTacToe") {
        els.gameTitle.textContent = "Tribute Tic Tac Toe";
        els.gameSubtitle.textContent = "Fast three-in-a-row matches. The dom picks the match length before the first board; reclaim lets her start and take drawn boards.";
        return;
      }
      if (state.currentGame === "wheelSpin") {
        els.gameTitle.textContent = "Wheel Spin";
        els.gameSubtitle.textContent = isThroneSession()
          ? "A Throne tribute wheel with 5 dom spins per hour. Cash slices open the extension for that amount, free spins keep the count, and blanks spare the sub."
          : "A 36-space wheel with equal odds per slice. Cash spaces pay the dom bank, minus spaces drain it, and the fixed arrow marks the result.";
        return;
      }
      if (state.currentGame === "tributeTrail") {
        els.gameTitle.textContent = "Tribute Trail";
        els.gameSubtitle.textContent = "A 60-space board race with card, chance, cash, blank, slide spaces, and a Trail Tribute meter.";
        return;
      }
      if (state.currentGame === "obedienceOrders") {
        els.gameTitle.textContent = "Obedience Orders";
        els.gameSubtitle.textContent = "A command-tile duel. The dom leads, raises pressure, and punishes mistakes.";
        return;
      }
      if (state.currentGame === "tributeFleet") {
        els.gameTitle.textContent = "Tribute Fleet";
        els.gameSubtitle.textContent = "Battleship with cash stakes. Fleets are hidden and auto-placed; normal bets are fair, while reclaim matches tilt the water toward the dom.";
        return;
      }
      els.gameTitle.textContent = "Tribute Four";
      els.gameSubtitle.textContent = "Connect Four with cash stakes. The sub chooses a normal bet to start. If the dom wins, that cash enters her bank; later the sub can risk a tilted reclaim match to win the banked cash back.";
    }

    function render() {
      syncChessClock();
      renderTrailCardReveal();
      renderBoard();
      renderMemoryMatch();
      renderBrainDrainSnap();
      renderControls();
      renderRules();
      renderText();
      renderMenu();
      renderLobby();
      renderSidePanel();
      renderLeaveRoomButtons();
      renderLeaveNotice();
      renderWagerApproval();
      renderThroneAmountConfirmModal();
      renderTrailCardReveal();
      renderTrailShopModal();
      renderBlackjackSettingsModal();
      renderChessSettingsModal();
      renderHigherLowerMercyModal();
      renderCheckersQueenModal();
      renderCheckersQueenSplash();
      renderPieceLossSpiral();
      renderPieceLossPulse();
      renderPieceLossMessage();
      renderChessCaptureBanner();
      renderNormalReplayModal();
      renderDomTriggerOverlay();
      renderBrattyWelcomeModal();
      renderPressureViewPromptModal();
    }

    els.normalBtn.addEventListener("click", startNormalMatch);
    els.reclaimBtn.addEventListener("click", startReclaimMatch);
    if (els.normalReplayBtn) els.normalReplayBtn.addEventListener("click", replayNormalRound);
    if (els.normalFleetNewRulesBtn) els.normalFleetNewRulesBtn.addEventListener("click", restartFleetWithNewRules);
    if (els.normalChangeBetBtn) els.normalChangeBetBtn.addEventListener("click", changeNormalRoundBet);
    document.addEventListener("click", handleThroneKissDismiss, true);
    window.addEventListener("focus", settleDeferredThroneKissFade);
    document.addEventListener("visibilitychange", settleDeferredThroneKissFade);
    if (els.domTriggerPanel) {
      els.domTriggerPanel.addEventListener("click", (event) => {
        const button = event.target.closest("[data-dom-trigger]");
        if (!button || button.disabled) return;
        triggerDomEffect(button.dataset.domTrigger);
      });
    }
    if (els.throneAmountInput) {
      els.throneAmountInput.addEventListener("change", () => updateSettings({ throneAmount: els.throneAmountInput.value }));
      els.throneAmountInput.addEventListener("input", () => updateSettings({ throneAmount: els.throneAmountInput.value }));
    }
    if (els.throneReclaimPerksInput) {
      els.throneReclaimPerksInput.addEventListener("change", () => {
        updateSettings({ throneReclaimPerks: els.throneReclaimPerksInput.checked });
      });
    }
    els.setupSessionModeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const mode = button.dataset.setupSessionMode === "throne" ? "throne" : "bank";
        const changes = {
          sessionMode: mode,
          sessionModePrompted: true,
          normalThroneRequest: null,
          pendingThroneDemand: null
        };
        if (mode === "throne") {
          const easterEgg = activeNameEasterEgg();
          const defaultThroneUrl = easterEgg && easterEgg.defaultThroneUrl ? easterEgg.defaultThroneUrl : "";
          const url = normalizeDomLink((els.setupThroneUrlInput && els.setupThroneUrlInput.value) || state.settings.throneUrl || defaultThroneUrl);
          changes.throneUrl = url;
        }
        updateSettings(changes);
        if (mode === "throne") requestThroneExtensionStatus();
      });
    });
    if (els.setupDefaultBetInput) {
      els.setupDefaultBetInput.addEventListener("change", () => updateSettings({ subDefaultBet: els.setupDefaultBetInput.value }));
      els.setupDefaultBetInput.addEventListener("input", () => updateSettings({ subDefaultBet: els.setupDefaultBetInput.value }));
    }
    if (els.setupThroneAmountInput) {
      els.setupThroneAmountInput.addEventListener("change", () => updateSettings({ throneAmount: els.setupThroneAmountInput.value }));
      els.setupThroneAmountInput.addEventListener("input", () => updateSettings({ throneAmount: els.setupThroneAmountInput.value }));
    }
    if (els.setupStartingPlayerMode) {
      els.setupStartingPlayerMode.addEventListener("change", () => updateSettings({ startingPlayerMode: els.setupStartingPlayerMode.value }));
    }
    if (els.setupDomAdvantageAlwaysInput) {
      els.setupDomAdvantageAlwaysInput.addEventListener("change", () => updateSettings({ reclaimPowersAlways: els.setupDomAdvantageAlwaysInput.checked }));
    }
    if (els.setupDomAdvantageMode) {
      els.setupDomAdvantageMode.addEventListener("change", () => updateSettings({ domAdvantageMode: els.setupDomAdvantageMode.value }));
    }
    if (els.setupSubLinkWarningMode) {
      els.setupSubLinkWarningMode.addEventListener("change", () => updateSettings({ subLinkWarningMode: els.setupSubLinkWarningMode.value }));
    }
    if (els.setupThroneUrlInput) {
      els.setupThroneUrlInput.addEventListener("change", () => updateSettings({ throneUrl: normalizeDomLink(els.setupThroneUrlInput.value) }));
      els.setupThroneUrlInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") updateSettings({ throneUrl: normalizeDomLink(els.setupThroneUrlInput.value) });
      });
    }
    els.resetBtn.addEventListener("click", resetPrototype);
    els.board.addEventListener("click", handleObedienceBoardClick);
    els.board.addEventListener("click", handleCrazyEightsBoardClick);
    els.board.addEventListener("click", handleDoubleSolitaireBoardClick);
    els.board.addEventListener("pointerover", handleSolitairePreviewPointerOver);
    els.board.addEventListener("pointermove", handleSolitairePreviewPointerMove);
    els.board.addEventListener("pointerout", handleSolitairePreviewPointerOut);
    els.board.addEventListener("pointerdown", handleSolitairePreviewPointerDown);
    els.board.addEventListener("pointerup", handleSolitairePreviewPointerEnd);
    els.board.addEventListener("pointercancel", handleSolitairePreviewPointerEnd);
    els.hitBtn.addEventListener("click", () => {
      if (state.currentGame === "tributeChess") {
        chessFreezeAction();
      } else if (state.currentGame === "tributeReversi") {
        declineReversiCommandMove();
      } else {
        hitTwentyOne();
      }
    });
    els.passBtn.addEventListener("click", domPass);
    els.queenRepositionBtn.addEventListener("click", chessRepositionAction);
    els.queenShieldBtn.addEventListener("click", chessShieldAction);
    els.chessSkipBtn.addEventListener("click", chessSkipAction);
    els.queenChargeText.addEventListener("click", (event) => {
      const button = event.target.closest("[data-queen-power]");
      if (!button || button.disabled) return;
      activateQueenPower(button.dataset.queenPower);
    });
    els.queenStanceSelect.addEventListener("change", () => setQueenStance(els.queenStanceSelect.value));
    els.settingsTabs.forEach((button) => {
      button.addEventListener("click", () => updateSettings({ activeTab: button.dataset.settingsTab }));
    });
    els.rulesTabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeRulesTab = button.dataset.rulesTab || "normal";
        renderRules();
      });
    });
    els.gameSelectTabs.forEach((button) => {
      button.addEventListener("click", () => updateSettings({ activeGameTab: button.dataset.gameTab }));
    });
    els.blackjackSettingsModal.querySelectorAll("[data-blackjack-rounds]").forEach((button) => {
      button.addEventListener("click", () => setBlackjackRounds(button.dataset.blackjackRounds));
    });
    els.blackjackSettingsConfirmBtn.addEventListener("click", confirmBlackjackSettings);
    if (els.chessSettingsModal) {
      els.chessSettingsModal.querySelectorAll("[data-chess-timer]").forEach((button) => {
        button.addEventListener("click", () => setChessTimerMode(button.dataset.chessTimer));
      });
      els.chessSettingsModal.querySelectorAll("[data-chess-timer-target]").forEach((button) => {
        button.addEventListener("click", () => setChessTimerTarget(button.dataset.chessTimerTarget));
      });
    }
    if (els.chessCustomTimerInput) {
      els.chessCustomTimerInput.addEventListener("input", () => {
        const game = timerGameState(timerSetupActiveKey());
        if (game) game.customTimerMinutes = turnTimerMinutes("custom", els.chessCustomTimerInput.value);
      });
      els.chessCustomTimerInput.addEventListener("change", () => {
        const game = timerGameState(timerSetupActiveKey());
        if (game) game.customTimerMinutes = turnTimerMinutes("custom", els.chessCustomTimerInput.value);
        render();
        publishState();
      });
    }
    if (els.reversiHintToggle) {
      els.reversiHintToggle.addEventListener("change", () => {
        if (state.currentGame !== "tributeReversi" || !state.reversi || !state.reversi.setupPending) return;
        if (state.online.room && localOnlineRole() !== DOM) return;
        state.reversi.showNumberHints = els.reversiHintToggle.checked;
        render();
        publishState();
      });
    }
    if (els.chessSettingsConfirmBtn) els.chessSettingsConfirmBtn.addEventListener("click", confirmChessSettings);
    els.checkersQueenYesBtn.addEventListener("click", () => {
      const stage = state.checkers && state.checkers.queenSetup && state.checkers.queenSetup.stage;
      if (stage === "domThrone") domStartsThroneCheckersWithQueen();
      else if (stage === "dom") domTakesCheckersQueen();
      else subAllowsCheckersQueen();
    });
    els.checkersQueenNoBtn.addEventListener("click", () => {
      const stage = state.checkers && state.checkers.queenSetup && state.checkers.queenSetup.stage;
      if (stage === "domThrone") domDeclinesThroneCheckersQueen();
      else if (stage === "dom") domDeclinesCheckersQueen();
      else subRefusesCheckersQueen();
    });
    els.sideTabs.forEach((button) => {
      button.addEventListener("click", () => {
        const tab = button.dataset.sideTab || "chat";
        if (sideTabIsOpen(tab)) {
          toggleSidePanel();
          return;
        }
        setSideTab(tab);
      });
    });
    els.sideLedgerSummary.addEventListener("click", (event) => {
      const button = event.target.closest("[data-ledger-action]");
      if (!button) return;
      handleLedgerAction(button.dataset.ledgerAction);
    });
    els.sideLedgerSummary.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && event.target && event.target.id === "ledgerThroneUrlInput") {
        handleLedgerAction("save-throne");
      }
    });
    els.sideToggleBtn.addEventListener("click", toggleSidePanel);
    els.sideRestoreTabs.forEach((button) => {
      button.addEventListener("click", () => {
        const tab = button.dataset.openSideTab || "chat";
        if (sideTabIsOpen(tab)) {
          toggleSidePanel();
          return;
        }
        openSidePanel(tab);
      });
    });
    els.sendChatBtn.addEventListener("click", sendChatMessage);
    els.chatInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") sendChatMessage();
    });
    if (els.domAdvantageMode) els.domAdvantageMode.addEventListener("change", () => updateSettings({ domAdvantageMode: els.domAdvantageMode.value }));
    if (els.domSeePressureBanners) els.domSeePressureBanners.addEventListener("click", () => togglePressureSetting("domSeePressureBanners", els.domSeePressureBanners));
    if (els.domSeePressureText) els.domSeePressureText.addEventListener("click", () => togglePressureSetting("domSeePressureText", els.domSeePressureText));
    if (els.domSeePressurePulse) els.domSeePressurePulse.addEventListener("click", () => togglePressureSetting("domSeePressurePulse", els.domSeePressurePulse));
    if (els.promptPressureBanners) els.promptPressureBanners.addEventListener("click", () => setToggleButtonState(els.promptPressureBanners, !toggleButtonActive(els.promptPressureBanners)));
    if (els.promptPressureText) els.promptPressureText.addEventListener("click", () => setToggleButtonState(els.promptPressureText, !toggleButtonActive(els.promptPressureText)));
    if (els.promptPressurePulse) els.promptPressurePulse.addEventListener("click", () => setToggleButtonState(els.promptPressurePulse, !toggleButtonActive(els.promptPressurePulse)));
    if (els.clearPopupsBtn) els.clearPopupsBtn.addEventListener("click", clearDistractionPopups);
    if (els.domSubBetControl) els.domSubBetControl.addEventListener("change", () => updateSettings({ subBetControl: els.domSubBetControl.value }));
    if (els.subDefaultBetInput) {
      els.subDefaultBetInput.addEventListener("change", () => updateSettings({ subDefaultBet: els.subDefaultBetInput.value }));
      els.subDefaultBetInput.addEventListener("input", () => updateSettings({ subDefaultBet: els.subDefaultBetInput.value }));
    }
    if (els.subLinkWarningMode) els.subLinkWarningMode.addEventListener("change", () => updateSettings({ subLinkWarningMode: els.subLinkWarningMode.value }));
    if (els.domLinkUrlInput && els.domLinkUrlInput !== els.sideDomLinkInput) {
      els.domLinkUrlInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") sendDomLinkRequest();
      });
    }
    els.sideDomLinkInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") sendDomLinkRequest();
    });
    if (els.sendDomLinkBtn) els.sendDomLinkBtn.addEventListener("click", sendDomLinkRequest);
    els.sideSendDomLinkBtn.addEventListener("click", sendDomLinkRequest);
    if (els.postDistractionBtn) els.postDistractionBtn.addEventListener("click", postDistraction);
    if (els.clearDistractionBtn) els.clearDistractionBtn.addEventListener("click", clearDistraction);
    els.sideDistractionMode.addEventListener("change", () => {
      if (subGalleryPrivateMode()) {
        localSubDistractions.distractionMode = els.sideDistractionMode.value || "overlay-sub";
        renderSidePanel();
        return;
      }
      updateSettings({ distractionMode: els.sideDistractionMode.value });
    });
    els.sideDistractionDuration.addEventListener("input", () => {
      const duration = normalizeDistractionDuration(els.sideDistractionDuration.value);
      if (subGalleryPrivateMode()) {
        localSubDistractions.distractionDuration = duration;
        renderSidePanel();
        return;
      }
      updateSettings({ distractionDuration: duration });
    });
    els.sideDistractionInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") postDistraction();
    });
    if (els.uploadDistractionBtn && els.distractionFileInput) {
      els.uploadDistractionBtn.addEventListener("click", () => {
        if (!galleryControlsAllowed()) return;
        els.distractionFileInput.click();
      });
      els.distractionFileInput.addEventListener("change", async () => {
        const file = imageFileFromItems(els.distractionFileInput.files);
        if (!file) {
          els.distractionFileInput.value = "";
          els.sideDistractionStatus.textContent = "Choose a PNG, JPG, GIF, WebP, or BMP image.";
          return;
        }
        try {
          await useLocalDistractionFile(file);
        } finally {
          els.distractionFileInput.value = "";
        }
      });
    }
    els.sideDistractionInput.addEventListener("paste", handleDistractionPaste);
    els.sideDistractionInput.addEventListener("dragover", (event) => {
      event.preventDefault();
      if (galleryControlsAllowed()) els.sideDistractionInput.classList.add("drop-ready");
    });
    els.sideDistractionInput.addEventListener("dragleave", () => {
      els.sideDistractionInput.classList.remove("drop-ready");
    });
    els.sideDistractionInput.addEventListener("drop", handleDistractionDrop);
    if (els.booruLoadButtons) {
      els.booruLoadButtons.forEach((button) => {
        button.addEventListener("click", () => loadBooruGallery(button.dataset.booruSource));
      });
    }
    if (els.booruGallery) {
      els.booruGallery.addEventListener("click", (event) => {
        const button = event.target.closest("[data-booru-gallery-index]");
        if (!button) return;
        selectBooruGalleryImage(button.dataset.booruGalleryIndex);
      });
    }
    if (els.danbooruLoadBtn) els.danbooruLoadBtn.addEventListener("click", () => loadDanbooruGallery({ next: false }));
    if (els.danbooruNextBtn) els.danbooruNextBtn.addEventListener("click", () => loadDanbooruGallery({ next: true }));
    if (els.danbooruGalleryCategory) {
      els.danbooruGalleryCategory.addEventListener("change", () => {
        localDanbooruCategory = String(els.danbooruGalleryCategory.value || "feet").toLowerCase();
        localDanbooruPage = 1;
        localDanbooruCustomTag = "";
        localDanbooruGalleryItems = [];
        if (els.danbooruGalleryStatus) els.danbooruGalleryStatus.textContent = `${danbooruCategoryLabel(localDanbooruCategory)} selected. Press Preset.`;
        renderDanbooruGallery();
        renderControls();
      });
    }
    if (els.danbooruTagInput) {
      els.danbooruTagInput.addEventListener("input", () => queueDanbooruSuggestions(els.danbooruTagInput));
      els.danbooruTagInput.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        const tag = String(els.danbooruTagInput.value || "").trim();
        if (tag) {
          localDanbooruSuggestions = [];
          renderDanbooruSuggestions();
          loadDanbooruGallery({ tag, next: false });
        }
      });
    }
    if (els.danbooruIncludeVideos) {
      els.danbooruIncludeVideos.addEventListener("click", () => {
        setDanbooruIncludeVideos(!localDanbooruIncludeVideos);
      });
    }
    if (els.autoDanbooruIncludeVideos) {
      els.autoDanbooruIncludeVideos.addEventListener("click", () => {
        setDanbooruIncludeVideos(!localDanbooruIncludeVideos);
        updateRedditeryAutoPopupStatus();
      });
    }
    if (els.danbooruUnmuteVideos) {
      els.danbooruUnmuteVideos.addEventListener("click", () => {
        setDanbooruUnmuteVideos(!localDanbooruUnmuteVideos);
      });
    }
    if (els.autoDanbooruUnmuteVideos) {
      els.autoDanbooruUnmuteVideos.addEventListener("click", () => {
        setDanbooruUnmuteVideos(!localDanbooruUnmuteVideos);
        updateRedditeryAutoPopupStatus();
      });
    }
    if (els.danbooruFullVideos) {
      els.danbooruFullVideos.addEventListener("click", () => {
        setBooruAutoPopupFullVideos(!state.settings.booruAutoPopupFullVideos);
      });
    }
    if (els.autoPopupDomPreviewInput) {
      els.autoPopupDomPreviewInput.addEventListener("click", () => {
        setAutoPopupDomPreview(!state.settings.autoPopupDomPreview);
      });
    }
    if (els.soloDanbooruIncludeVideos) {
      els.soloDanbooruIncludeVideos.addEventListener("click", () => {
        setDanbooruIncludeVideos(!localDanbooruIncludeVideos);
        updateRedditeryAutoPopupStatus();
      });
    }
    if (els.soloDanbooruUnmuteVideos) {
      els.soloDanbooruUnmuteVideos.addEventListener("click", () => {
        setDanbooruUnmuteVideos(!localDanbooruUnmuteVideos);
        updateRedditeryAutoPopupStatus();
      });
    }
    if (els.soloDanbooruFullVideos) {
      els.soloDanbooruFullVideos.addEventListener("click", () => {
        setBooruAutoPopupFullVideos(!state.settings.booruAutoPopupFullVideos);
      });
    }
    [els.danbooruDateFilter, els.booruDateFilter, els.soloBooruDateFilter].forEach((select) => {
      if (!select) return;
      select.addEventListener("change", () => setBooruDateFilter(select.value));
    });
    if (els.autoDanbooruTagInput) {
      els.autoDanbooruTagInput.addEventListener("input", () => {
        localDanbooruCustomTag = String(els.autoDanbooruTagInput.value || "").trim();
        resetAutoPopupFeedCursors();
        updateRedditeryAutoPopupStatus();
        queueDanbooruSuggestions(els.autoDanbooruTagInput);
        saveBrattyLocalGalleryPrefs();
      });
      els.autoDanbooruTagInput.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        localDanbooruCustomTag = String(els.autoDanbooruTagInput.value || "").trim();
        resetAutoPopupFeedCursors();
        if (sharedAutoPopupActive()) scheduleNextRedditeryAutoPopup();
        updateRedditeryAutoPopupStatus();
        saveBrattyLocalGalleryPrefs();
      });
    }
    if (els.soloDanbooruTagInput) {
      els.soloDanbooruTagInput.addEventListener("input", () => {
        localDanbooruCustomTag = String(els.soloDanbooruTagInput.value || "").trim();
        resetAutoPopupFeedCursors();
        updateRedditeryAutoPopupStatus();
        queueDanbooruSuggestions(els.soloDanbooruTagInput);
        saveBrattyLocalGalleryPrefs();
      });
      els.soloDanbooruTagInput.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        localDanbooruCustomTag = String(els.soloDanbooruTagInput.value || "").trim();
        resetAutoPopupFeedCursors();
        if (sharedAutoPopupActive()) scheduleNextRedditeryAutoPopup();
        updateRedditeryAutoPopupStatus();
        saveBrattyLocalGalleryPrefs();
      });
    }
    if (els.danbooruSuggestions) {
      els.danbooruSuggestions.addEventListener("click", (event) => {
        const button = event.target.closest("[data-danbooru-suggestion-index]");
        if (!button) return;
        selectDanbooruSuggestion(button.dataset.danbooruSuggestionIndex);
      });
    }
    if (els.autoDanbooruSuggestions) {
      els.autoDanbooruSuggestions.addEventListener("click", (event) => {
        const button = event.target.closest("[data-danbooru-suggestion-index]");
        if (!button) return;
        selectDanbooruSuggestion(button.dataset.danbooruSuggestionIndex, "auto");
      });
    }
    if (els.soloDanbooruSuggestions) {
      els.soloDanbooruSuggestions.addEventListener("click", (event) => {
        const button = event.target.closest("[data-danbooru-suggestion-index]");
        if (!button) return;
        selectDanbooruSuggestion(button.dataset.danbooruSuggestionIndex, "solo");
      });
    }
    if (els.danbooruGallery) {
      els.danbooruGallery.addEventListener("click", (event) => {
        const button = event.target.closest("[data-danbooru-gallery-index]");
        if (!button) return;
        selectDanbooruGalleryImage(button.dataset.danbooruGalleryIndex);
      });
    }
    if (els.redditeryRandomBtn) els.redditeryRandomBtn.addEventListener("click", loadRandomRedditeryImage);
    if (els.goonerGalleryTopBtn) els.goonerGalleryTopBtn.addEventListener("click", resetGoonerGalleryToTop);
    [els.goonerGalleryCategory, els.soloGoonerGalleryCategory].forEach((select) => {
      if (!select) return;
      select.addEventListener("change", () => setGoonerGalleryCategory(select.value));
    });
    if (els.goonerGallerySourcePicker) {
      els.goonerGallerySourcePicker.addEventListener("change", (event) => handleRedditPagePickerChange(event, "gallery"));
      els.goonerGallerySourcePicker.addEventListener("click", (event) => {
        const button = event.target.closest("[data-remove-custom-reddit-page]");
        if (!button) return;
        event.preventDefault();
        event.stopPropagation();
        removeCustomGoonerRedditPage(button.dataset.removeCustomRedditPage);
      });
    }
    if (els.addCustomRedditPageBtn) {
      els.addCustomRedditPageBtn.addEventListener("click", addCustomGoonerRedditPage);
    }
    if (els.customRedditPageInput) {
      els.customRedditPageInput.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        addCustomGoonerRedditPage();
      });
      els.customRedditPageInput.addEventListener("input", () => {
        renderCustomRedditSuggestions([]);
      });
    }
    if (els.customRedditSuggestions) {
      els.customRedditSuggestions.addEventListener("click", (event) => {
        const button = event.target.closest("[data-custom-reddit-suggestion]");
        if (!button) return;
        if (els.customRedditPageInput) {
          els.customRedditPageInput.value = `https://www.reddit.com/r/${button.dataset.customRedditSuggestion}/`;
        }
        addCustomGoonerRedditPage();
      });
    }
    [els.redditeryAutoPopupSourcePicker, els.soloRedditerySourcePicker].forEach((picker) => {
      if (!picker) return;
      picker.addEventListener("change", (event) => handleRedditPagePickerChange(event, "auto"));
    });
    if (els.redditeryAutoPopupToggle) {
      els.redditeryAutoPopupToggle.addEventListener("click", () => {
        setRedditeryAutoPopupEnabled(!state.settings.redditeryAutoPopup);
      });
    }
    if (els.redditeryRapidFireToggle) {
      els.redditeryRapidFireToggle.addEventListener("click", () => {
        setRedditeryRapidFireEnabled(!state.settings.redditeryRapidFire);
      });
    }
    [els.redditeryAutoPopupSource, els.soloRedditeryAutoPopupSource].forEach((select) => {
      if (!select) return;
      select.addEventListener("change", () => {
        resetAutoPopupFeedCursors();
        if (subGalleryPrivateMode() && select === els.redditeryAutoPopupSource && !sharedAutoPopupActive()) {
          localSubDistractions.redditeryAutoPopupSource = select.value === "booru" ? "booru" : "reddit";
          if (localSubDistractions.redditeryAutoPopup) scheduleNextRedditeryAutoPopup();
          else updateRedditeryAutoPopupStatus();
          renderSidePanel();
          return;
        }
        updateSettings({ redditeryAutoPopupSource: select.value === "booru" ? "booru" : "reddit" });
        if (sharedAutoPopupActive()) scheduleNextRedditeryAutoPopup();
      });
    });
    [els.redditeryAutoPopupCategory, els.soloRedditeryAutoPopupCategory].forEach((select) => {
      if (!select) return;
      select.addEventListener("change", () => {
        const category = GOONER_GALLERY_CATEGORIES[String(select.value || "").toLowerCase()] ? String(select.value || "").toLowerCase() : "captions";
        resetAutoPopupFeedCursors();
        if (subGalleryPrivateMode() && select === els.redditeryAutoPopupCategory && !sharedAutoPopupActive()) {
          localSubDistractions.redditeryAutoPopupCategory = category;
          localSubDistractions.redditeryAutoPopupSubreddits = categorySubreddits(category);
          if (localSubDistractions.redditeryAutoPopup) scheduleNextRedditeryAutoPopup();
          else updateRedditeryAutoPopupStatus();
          renderSidePanel();
          return;
        }
        updateSettings({
          redditeryAutoPopupCategory: category,
          redditeryAutoPopupSubreddits: categorySubreddits(category)
        });
        if (sharedAutoPopupActive()) scheduleNextRedditeryAutoPopup();
      });
    });
    if (els.redditeryAutoPopupDuration) {
      els.redditeryAutoPopupDuration.addEventListener("input", () => {
        const duration = normalizeDistractionDuration(els.redditeryAutoPopupDuration.value);
        if (subGalleryPrivateMode() && !sharedAutoPopupActive()) {
          localSubDistractions.redditeryAutoPopupDuration = duration;
          updateRedditeryAutoPopupStatus();
          return;
        }
        updateSettings({ redditeryAutoPopupDuration: duration });
        updateRedditeryAutoPopupStatus();
      });
    }
    if (els.redditeryAutoPopupInterval) {
      els.redditeryAutoPopupInterval.addEventListener("input", () => {
        const interval = normalizeAutoPopupInterval(els.redditeryAutoPopupInterval.value);
        if (subGalleryPrivateMode() && !sharedAutoPopupActive()) {
          localSubDistractions.redditeryAutoPopupInterval = interval;
          if (localSubDistractions.redditeryAutoPopup) scheduleNextRedditeryAutoPopup();
          else updateRedditeryAutoPopupStatus();
          return;
        }
        updateSettings({ redditeryAutoPopupInterval: interval });
        if (sharedAutoPopupActive()) scheduleNextRedditeryAutoPopup();
        else updateRedditeryAutoPopupStatus();
      });
    }
    if (els.soloRedditeryAutoPopupToggle) {
      els.soloRedditeryAutoPopupToggle.addEventListener("click", () => {
        setRedditeryAutoPopupEnabled(!state.settings.redditeryAutoPopup);
      });
    }
    if (els.soloRedditeryAutoPopupDuration) {
      els.soloRedditeryAutoPopupDuration.addEventListener("input", () => {
        updateSettings({ redditeryAutoPopupDuration: normalizeDistractionDuration(els.soloRedditeryAutoPopupDuration.value) });
        updateRedditeryAutoPopupStatus();
      });
    }
    if (els.soloRedditeryAutoPopupInterval) {
      els.soloRedditeryAutoPopupInterval.addEventListener("input", () => {
        updateSettings({ redditeryAutoPopupInterval: normalizeAutoPopupInterval(els.soloRedditeryAutoPopupInterval.value) });
        if (sharedAutoPopupActive()) scheduleNextRedditeryAutoPopup();
        else updateRedditeryAutoPopupStatus();
      });
    }
    if (els.redditeryGallery) {
      els.redditeryGallery.addEventListener("click", (event) => {
        const button = event.target.closest("[data-redditery-gallery-index]");
        if (!button || button.disabled) return;
        selectRedditeryGalleryImage(button.dataset.redditeryGalleryIndex);
      });
    }
    if (els.distractionGallery) {
      els.distractionGallery.addEventListener("click", (event) => {
        const button = event.target.closest("[data-distraction-gallery-id]");
        if (!button || button.disabled) return;
        selectDistractionFromGallery(button.dataset.distractionGalleryId);
      });
    }
    if (els.distractionVideoGallery) {
      els.distractionVideoGallery.addEventListener("click", (event) => {
        const button = event.target.closest("[data-distraction-gallery-id]");
        if (!button || button.disabled) return;
        selectDistractionFromGallery(button.dataset.distractionGalleryId);
      });
    }
    els.galleryCollapsePanels.forEach((panel) => {
      panel.addEventListener("toggle", () => rememberGalleryPanelOpen(panel));
    });
    if (els.cancelDistractionChoiceBtn) els.cancelDistractionChoiceBtn.addEventListener("click", closeDistractionChoice);
    if (els.saveDistractionChoiceBtn) els.saveDistractionChoiceBtn.addEventListener("click", saveChosenDistractionImage);
    if (els.subWallpaperDistractionChoiceBtn) els.subWallpaperDistractionChoiceBtn.addEventListener("click", () => postChosenDistraction("background-sub"));
    if (els.bothWallpaperDistractionChoiceBtn) els.bothWallpaperDistractionChoiceBtn.addEventListener("click", () => postChosenDistraction("background-both"));
    if (els.popupDistractionChoiceBtn) els.popupDistractionChoiceBtn.addEventListener("click", () => postChosenDistraction("overlay-sub"));
    if (els.distractionChoiceDuration) {
      els.distractionChoiceDuration.addEventListener("change", () => {
        const duration = normalizeDistractionDuration(els.distractionChoiceDuration.value);
        els.distractionChoiceDuration.value = duration;
        updateSettings({ distractionDuration: duration });
      });
      els.distractionChoiceDuration.addEventListener("keydown", (event) => {
        if (event.key === "Enter") postChosenDistraction("overlay-sub");
      });
    }
    if (els.distractionChoiceModal) {
      els.distractionChoiceModal.addEventListener("click", (event) => {
        if (event.target === els.distractionChoiceModal) closeDistractionChoice();
      });
    }
    if (els.cancelVideoDistractionChoiceBtn) els.cancelVideoDistractionChoiceBtn.addEventListener("click", closeVideoDistractionChoice);
    if (els.saveVideoDistractionChoiceBtn) els.saveVideoDistractionChoiceBtn.addEventListener("click", saveChosenDistractionImage);
    if (els.subWallpaperVideoDistractionChoiceBtn) els.subWallpaperVideoDistractionChoiceBtn.addEventListener("click", () => postChosenVideoDistraction("background-sub"));
    if (els.bothWallpaperVideoDistractionChoiceBtn) els.bothWallpaperVideoDistractionChoiceBtn.addEventListener("click", () => postChosenVideoDistraction("background-both"));
    if (els.playFullVideoDistractionChoiceBtn) els.playFullVideoDistractionChoiceBtn.addEventListener("click", () => postChosenVideoDistraction("full"));
    if (els.loopTimedVideoDistractionChoiceBtn) els.loopTimedVideoDistractionChoiceBtn.addEventListener("click", () => setVideoLoopChoiceMode("time"));
    if (els.loopCountVideoDistractionChoiceBtn) els.loopCountVideoDistractionChoiceBtn.addEventListener("click", () => setVideoLoopChoiceMode("count"));
    if (els.confirmLoopTimedVideoDistractionChoiceBtn) els.confirmLoopTimedVideoDistractionChoiceBtn.addEventListener("click", () => postChosenVideoDistraction("loop"));
    if (els.confirmLoopCountVideoDistractionChoiceBtn) els.confirmLoopCountVideoDistractionChoiceBtn.addEventListener("click", () => postChosenVideoDistraction("loop-count"));
    if (els.videoDistractionChoiceDuration) {
      els.videoDistractionChoiceDuration.addEventListener("change", () => {
        const duration = normalizeDistractionDuration(els.videoDistractionChoiceDuration.value);
        els.videoDistractionChoiceDuration.value = duration;
        updateSettings({ distractionDuration: duration });
      });
      els.videoDistractionChoiceDuration.addEventListener("keydown", (event) => {
        if (event.key === "Enter") postChosenVideoDistraction("loop");
      });
    }
    if (els.videoDistractionChoiceLoopCount) {
      els.videoDistractionChoiceLoopCount.addEventListener("change", () => {
        els.videoDistractionChoiceLoopCount.value = normalizeVideoLoopCount(els.videoDistractionChoiceLoopCount.value);
      });
      els.videoDistractionChoiceLoopCount.addEventListener("keydown", (event) => {
        if (event.key === "Enter") postChosenVideoDistraction("loop-count");
      });
    }
    if (els.videoDistractionChoiceModal) {
      els.videoDistractionChoiceModal.addEventListener("click", (event) => {
        if (event.target === els.videoDistractionChoiceModal) closeVideoDistractionChoice();
      });
    }
    if (els.autoPopupPreview) els.autoPopupPreview.addEventListener("click", openAutoPopupPreviewModal);
    if (els.closeAutoPopupPreviewBtn) els.closeAutoPopupPreviewBtn.addEventListener("click", closeAutoPopupPreviewModal);
    if (els.clearAutoPopupPreviewBtn) els.clearAutoPopupPreviewBtn.addEventListener("click", clearAutoPopupPreview);
    if (els.saveAutoPopupPreviewBtn) els.saveAutoPopupPreviewBtn.addEventListener("click", saveAutoPopupPreview);
    if (els.downloadAutoPopupPreviewBtn) els.downloadAutoPopupPreviewBtn.addEventListener("click", downloadAutoPopupPreview);
    if (els.autoPopupPreviewModal) {
      els.autoPopupPreviewModal.addEventListener("click", (event) => {
        if (event.target === els.autoPopupPreviewModal) closeAutoPopupPreviewModal();
      });
    }
    els.rulesBtn.addEventListener("click", openRulesModal);
    els.closeRulesBtn.addEventListener("click", closeRulesModal);
    els.rulesModal.addEventListener("click", (event) => {
      if (event.target === els.rulesModal) closeRulesModal();
    });
    if (els.outcomeSplash) els.outcomeSplash.addEventListener("click", hideOutcomeSplash);
    window.setInterval(() => {
      if (resolveFocusTaxTimeout()) return;
      if (state.currentGame === "higherLower" && state.active && state.higherLower && state.higherLower.pulseActive) {
        settleHigherLowerPulse(true);
      }
      renderDomTriggerOverlay();
      renderDomTriggerPanel();
      resolveRedditeryAutoPopup();
    }, 400);
    els.tributeFourPowerOptions.addEventListener("click", (event) => {
      const button = event.target.closest("[data-tribute-four-power], [data-fleet-power], [data-chess-power], [data-checkers-power], [data-twenty-one-power]");
      if (!button || button.disabled) return;
      if (button.dataset.tributeFourPower) {
        selectedTributeFourPower = button.dataset.tributeFourPower;
        renderTributeFourPowerModal();
      } else if (button.dataset.fleetPower) {
        selectedFleetPower = button.dataset.fleetPower;
        renderFleetPowerModal();
      } else if (button.dataset.chessPower) {
        selectedChessPower = button.dataset.chessPower;
        renderChessPowerModal();
      } else if (button.dataset.checkersPower) {
        selectedCheckersPower = button.dataset.checkersPower;
        renderCheckersPowerModal();
      } else if (button.dataset.twentyOnePower) {
        selectedTwentyOnePower = button.dataset.twentyOnePower;
        renderTwentyOnePowerModal();
      }
    });
    els.tributeFourPowerUseBtn.addEventListener("click", useCurrentPowerModalSelection);
    els.tributeFourPowerBackBtn.addEventListener("click", closeTributeFourPowerModal);
    els.tributeFourPowerModal.addEventListener("click", (event) => {
      if (event.target === els.tributeFourPowerModal) closeTributeFourPowerModal();
    });
    els.trailCardReveal.addEventListener("click", (event) => {
      const selectButton = event.target.closest("[data-trail-select-space]");
      if (selectButton) {
        event.stopPropagation();
        selectTrailSpace(Number(selectButton.dataset.trailSelectSpace));
        return;
      }
      clearTrailCardReveal(true);
    });
    els.trailShopStartBtn.addEventListener("click", trailShopStartAction);
    els.trailShopEndBtn.addEventListener("click", trailShopEndAction);
    els.trailShopWaitBtn.addEventListener("click", trailShopWaitAction);
    els.trailTransferSlider.addEventListener("input", () => updateTrailTransferPercent(els.trailTransferSlider.value));
    els.trailShopOptions.querySelectorAll("[data-trail-shop]").forEach((button) => {
      button.addEventListener("click", () => buyTrailShoppingCard(button.dataset.trailShop));
    });
    els.leaveRoomButtons.forEach((button) => {
      button.addEventListener("click", leaveOnlineRoom);
    });
    els.hideLeaveNoticeBtn.addEventListener("click", hideLeaveNotice);
    els.takePlayerOneBtn.addEventListener("click", () => takeAvailableSeat("one"));
    els.takePlayerTwoBtn.addEventListener("click", () => takeAvailableSeat("two"));
    els.returnLobbyNoticeBtn.addEventListener("click", returnToLobbyFromLeaveNotice);
    if (els.queenPowerMode) els.queenPowerMode.addEventListener("change", () => updateSettings({ queenPowerMode: els.queenPowerMode.value }));
    if (els.queenPowerUsers) els.queenPowerUsers.addEventListener("change", () => updateSettings({ queenPowerUsers: els.queenPowerUsers.value }));
    els.backToMenuBtn.addEventListener("click", backToMenu);
    if (els.solitaireBackBtn) els.solitaireBackBtn.addEventListener("click", backToMenuFromSolo);
    if (els.memoryMatchBackBtn) els.memoryMatchBackBtn.addEventListener("click", backToMenuFromSolo);
    if (els.brainDrainSnapBackBtn) els.brainDrainSnapBackBtn.addEventListener("click", backToMenuFromSolo);
    if (els.brainDrainSnapNewBtn) els.brainDrainSnapNewBtn.addEventListener("click", startBrainDrainSnap);
    if (els.brainDrainSnapNextBtn) els.brainDrainSnapNextBtn.addEventListener("click", () => answerBrainDrainSnap("next"));
    if (els.brainDrainSnapSnapBtn) els.brainDrainSnapSnapBtn.addEventListener("click", () => answerBrainDrainSnap("snap"));
    if (els.memoryMatchNewImagesBtn) {
      els.memoryMatchNewImagesBtn.addEventListener("click", () => startMemoryMatch({ newImages: true }));
    }
    if (els.memoryMatchRestartBtn) {
      els.memoryMatchRestartBtn.addEventListener("click", () => startMemoryMatch({ newImages: false }));
    }
    if (els.memoryMatchSizeControls) {
      els.memoryMatchSizeControls.addEventListener("click", (event) => {
        const button = event.target.closest("[data-memory-size]");
        if (!button || button.disabled) return;
        startMemoryMatch({ size: button.dataset.memorySize, newImages: true });
      });
    }
    if (els.memoryMatchGrid) {
      els.memoryMatchGrid.addEventListener("click", (event) => {
        const button = event.target.closest("[data-memory-index]");
        if (!button || !els.memoryMatchGrid.contains(button)) return;
        handleMemoryMatchFlip(Number(button.dataset.memoryIndex));
      });
    }
    if (els.memoryMatchReveal) {
      els.memoryMatchReveal.addEventListener("click", () => {
        if (!state.memoryMatch) return;
        state.memoryMatch.reveal = null;
        renderMemoryMatch();
      });
    }
    if (els.newSolitaireBtn) {
      els.newSolitaireBtn.addEventListener("click", () => {
        newSolitaireDeal();
      });
    }
    if (els.solitaireUndoBtn) {
      els.solitaireUndoBtn.addEventListener("click", undoSolitaireMove);
    }
    if (els.solitaireTable) {
      els.solitaireTable.addEventListener("click", handleSolitaireClick);
      els.solitaireTable.addEventListener("pointerover", handleSolitairePreviewPointerOver);
      els.solitaireTable.addEventListener("pointermove", handleSolitairePreviewPointerMove);
      els.solitaireTable.addEventListener("pointerout", handleSolitairePreviewPointerOut);
      els.solitaireTable.addEventListener("pointerdown", handleSolitairePreviewPointerDown);
      els.solitaireTable.addEventListener("pointerup", handleSolitairePreviewPointerEnd);
      els.solitaireTable.addEventListener("pointercancel", handleSolitairePreviewPointerEnd);
      els.solitaireTable.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        const target = event.target.closest("[data-solitaire-source], [data-solitaire-location], [data-solitaire-action]");
        if (!target) return;
        event.preventDefault();
        handleSolitaireClick(event);
      });
    }
    if (els.continueSetupBtn) els.continueSetupBtn.addEventListener("click", continueToSetup);
    els.confirmLobbyNameBtn.addEventListener("click", confirmLobbyName);
    if (els.lobbyReadyBtn) els.lobbyReadyBtn.addEventListener("click", toggleLobbyReady);
    els.joinRoomBtn.addEventListener("click", joinRoomFromInput);
    els.joinRoomCodeInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") joinRoomFromInput();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeRulesModal();
        closeTributeFourPowerModal();
        closeResetBankModal();
        clearTrailCardReveal(false);
      }
    });
    els.playLocalBtn.addEventListener("click", playLocally);
    if (els.soloGamesBtn) els.soloGamesBtn.addEventListener("click", openSoloGamesMenu);
    els.chooseDomBtn.addEventListener("click", () => chooseOnlineRole(DOM));
    els.chooseSubBtn.addEventListener("click", () => chooseOnlineRole(SUB));
    if (els.sessionBankModeBtn) els.sessionBankModeBtn.addEventListener("click", chooseBankSessionMode);
    if (els.sessionThroneModeBtn) els.sessionThroneModeBtn.addEventListener("click", chooseThroneSessionMode);
    if (els.sessionThroneBackBtn) els.sessionThroneBackBtn.addEventListener("click", () => renderSessionModeModal("choice"));
    if (els.sessionThroneSaveBtn) els.sessionThroneSaveBtn.addEventListener("click", saveThroneSessionMode);
    if (els.sessionThroneUrlInput) {
      els.sessionThroneUrlInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") saveThroneSessionMode();
      });
    }
    if (els.cancelThroneAmountConfirmBtn) els.cancelThroneAmountConfirmBtn.addEventListener("click", closeThroneAmountConfirmModal);
    if (els.confirmThroneAmountBtn) els.confirmThroneAmountBtn.addEventListener("click", confirmThroneAmountAndStart);
    if (els.throneAmountConfirmInput) {
      els.throneAmountConfirmInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") confirmThroneAmountAndStart();
      });
    }
    els.openSubLinkBtn.addEventListener("click", openSubLinkRequest);
    els.declineSubLinkBtn.addEventListener("click", declineSubLinkRequest);
    els.cancelResetBankBtn.addEventListener("click", closeResetBankModal);
    els.confirmResetBankBtn.addEventListener("click", confirmResetBank);
    if (els.declineBrattyWelcomeBtn) els.declineBrattyWelcomeBtn.addEventListener("click", declineBrattyWelcome);
    if (els.acceptBrattyWelcomeBtn) els.acceptBrattyWelcomeBtn.addEventListener("click", acceptBrattyWelcome);
    if (els.savePressurePromptBtn) els.savePressurePromptBtn.addEventListener("click", savePressureViewPrompt);
    if (els.higherLowerMercyCollectBtn) els.higherLowerMercyCollectBtn.addEventListener("click", () => decideHigherLowerMercy("collect"));
    if (els.higherLowerMercyDenyBtn) els.higherLowerMercyDenyBtn.addEventListener("click", () => decideHigherLowerMercy("deny"));
    if (els.higherLowerMercyPunishBtn) els.higherLowerMercyPunishBtn.addEventListener("click", () => decideHigherLowerMercy("punish"));
    els.wagerModal.addEventListener("click", (event) => {
      const button = event.target.closest("[data-wager-action]");
      if (!button) return;
      handleWagerAction(button.dataset.wagerAction, button);
    });
    els.confirmPlayersBtn.addEventListener("click", confirmPlayers);
    const gameOpeners = {
      tributeFour: openTributeFour,
      tributeFleet: openTributeFleet,
      tributeTwentyOne: openTributeTwentyOne,
      higherLower: openHigherLower,
      tributeCrazyEights: openTributeCrazyEights,
      doubleSolitaire: openDoubleSolitaire,
      solitaire: openSolitaire,
      memoryMatch: openMemoryMatch,
      tributeTicTacToe: openTributeTicTacToe,
      wheelSpin: openWheelSpin,
      obedienceOrders: openObedienceOrders,
      tributeTrail: openTributeTrail,
      tributeChess: openTributeChess,
      tributeCheckers: openTributeCheckers,
      tributeReversi: openTributeReversi
    };
    if (els.mainGamesGrid) {
      els.mainGamesGrid.addEventListener("click", (event) => {
        const card = event.target.closest(".game-card[data-open-game]");
        if (!card || !els.mainGamesGrid.contains(card) || card.disabled || card.classList.contains("hidden")) return;
        const opener = gameOpeners[card.dataset.openGame];
        if (!opener) return;
        const soloOpeners = new Set(["solitaire", "memoryMatch"]);
        if (!soloOpeners.has(card.dataset.openGame) && shouldConfirmThroneAmountBeforeGame() && openThroneAmountConfirmModal(card.dataset.openGame, opener)) return;
        opener();
      });
    }
    els.createRoomBtn.addEventListener("click", createOnlineRoom);
    els.copyInviteBtn.addEventListener("click", () => copyInviteLink());
    if (els.copySetupInviteBtn) els.copySetupInviteBtn.addEventListener("click", () => copyInviteLink());
    if (els.copyLeaveInviteBtn) els.copyLeaveInviteBtn.addEventListener("click", () => copyInviteLink(els.leaveNoticeCopyStatus));
    document.querySelectorAll(".role-btn[data-player]").forEach((button) => {
      button.addEventListener("click", () => setRole(button.dataset.player, button.dataset.role));
    });
    document.querySelectorAll("[data-online-role-choice]").forEach((button) => {
      button.addEventListener("click", () => chooseOnlineRole(button.dataset.onlineRoleChoice));
    });
    window.addEventListener("message", handleThroneExtensionMessage);
    setInterval(requestThroneExtensionStatus, 5000);

    addLog(`<strong>Ready.</strong> Pay to start a normal match.`);
    renderRoles();
    setScreen("lobby");
    render();
    joinOnlineRoomFromUrl();
  
