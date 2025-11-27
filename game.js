// 中药百草园游戏 - 优化版 JavaScript
// ========================================

// 游戏数据
const gameData = {
    collectedHerbs: [],
    wisdomPoints: 0,
    energyPoints: 10,
    maxEnergy: 10,
    lastEnergyUpdate: Date.now(),
    currentLocation: null,
    currentChallengeType: 'name',
    marketItems: [],
    achievements: [],
    formulas: [],
    tasks: [],
    currentSeason: 'spring',
    currentWeather: 'sunny',
    currentTime: 'morning',
    herbs: [
        // 森林药材
        {
            id: 'gancao',
            name: '甘草',
            icon: 'fa-leaf',
            location: 'forest',
            nature: '甘，平',
            meridian: '心、肺、脾、胃',
            effect: '补脾益气，清热解毒，调和诸药',
            description: '甘草被誉为"国老"，能调和各种药物的性味，在许多方剂中都有应用。其根茎味甜，是中药中最常用的药材之一。',
            rarity: 1
        },
        {
            id: 'huangqin',
            name: '黄芩',
            icon: 'fa-leaf',
            location: 'forest',
            nature: '苦，寒',
            meridian: '肺、胆、脾',
            effect: '清热燥湿，泻火解毒',
            description: '黄芩是常用的清热药，尤其擅长清除上焦湿热。其根部呈黄色。',
            rarity: 2
        },
        {
            id: 'baizhu',
            name: '白术',
            icon: 'fa-pagelines',
            location: 'forest',
            nature: '甘、苦，温',
            meridian: '脾、胃',
            effect: '健脾益气，燥湿利水',
            description: '白术是健脾燥湿的要药，常用于治疗脾胃虚弱所致的各种病症。',
            rarity: 2
        },
        {
            id: 'jinyinhua',
            name: '金银花',
            icon: 'fa-pagelines',
            location: 'forest',
            nature: '甘，寒',
            meridian: '肺、心、胃',
            effect: '清热解毒，凉散风热',
            description: '金银花因花色由白转黄而得名，是清热解毒的常用药。',
            rarity: 1
        },
        {
            id: 'shanzhuyu',
            name: '山茱萸',
            icon: 'fa-tree',
            location: 'forest',
            nature: '酸、涩，微温',
            meridian: '肝、肾',
            effect: '补益肝肾，涩精固脱',
            description: '山茱萸是常用的补益肝肾药，是六味地黄丸的重要组成之一。',
            rarity: 2
        },
        {
            id: 'rougui',
            name: '肉桂',
            icon: 'fa-tree',
            location: 'forest',
            nature: '辛、甘，大热',
            meridian: '肾、脾、心、肝',
            effect: '补火助阳，散寒止痛',
            description: '肉桂是常用的温里药，有浓郁的香气。',
            rarity: 3
        },
        {
            id: 'wuweizi',
            name: '五味子',
            icon: 'fa-circle',
            location: 'forest',
            nature: '酸、甘，温',
            meridian: '肺、心、肾',
            effect: '收敛固涩，益气生津',
            description: '五味子因具甘、酸、辛、苦、咸五种药味而得名。',
            rarity: 2
        },
        {
            id: 'lianqiao',
            name: '连翘',
            icon: 'fa-pagelines',
            location: 'forest',
            nature: '苦，微寒',
            meridian: '肺、心、小肠',
            effect: '清热解毒，消肿散结',
            description: '连翘是常用的清热解毒药，是银翘散的重要组成。',
            rarity: 2
        },
        {
            id: 'baibu',
            name: '百部',
            icon: 'fa-pagelines',
            location: 'forest',
            nature: '甘、苦，微温',
            meridian: '肺',
            effect: '润肺止咳，杀虫灭虱',
            description: '百部是常用的止咳药，尤其擅长治疗久咳。',
            rarity: 2
        },
        {
            id: 'yuzhu',
            name: '玉竹',
            icon: 'fa-pagelines',
            location: 'forest',
            nature: '甘，微寒',
            meridian: '肺、胃',
            effect: '养阴润燥，生津止渴',
            description: '玉竹是常用的养阴药，擅长治疗肺胃阴伤。',
            rarity: 2
        },
        
        // 山地药材
        {
            id: 'renshen',
            name: '人参',
            icon: 'fa-tree',
            location: 'mountain',
            nature: '甘、微苦，平',
            meridian: '脾、肺、心',
            effect: '大补元气，复脉固脱',
            description: '人参被誉为"百草之王"，是名贵的补气药。',
            rarity: 3
        },
        {
            id: 'huangqi',
            name: '黄芪',
            icon: 'fa-tree',
            location: 'mountain',
            nature: '甘，温',
            meridian: '脾、肺',
            effect: '补气升阳，固表止汗',
            description: '黄芪是重要的补气药，常用于治疗气虚乏力。',
            rarity: 2
        },
        {
            id: 'danggui',
            name: '当归',
            icon: 'fa-pagelines',
            location: 'mountain',
            nature: '甘、辛，温',
            meridian: '肝、心、脾',
            effect: '补血活血，调经止痛',
            description: '当归被誉为"血中圣药"，是妇科常用药。',
            rarity: 2
        },
        {
            id: 'shanqi',
            name: '三七',
            icon: 'fa-heart',
            location: 'mountain',
            nature: '甘、微苦，温',
            meridian: '肝、胃',
            effect: '散瘀止血，消肿定痛',
            description: '三七又名田七，是著名的止血药和伤科要药。',
            rarity: 3
        },
        {
            id: 'dangshen',
            name: '党参',
            icon: 'fa-tree',
            location: 'mountain',
            nature: '甘，平',
            meridian: '脾、肺',
            effect: '补中益气，健脾益肺',
            description: '党参是常用的补气药，功效与人参相似但药力较弱。',
            rarity: 2
        },
        {
            id: 'chuanxiong',
            name: '川芎',
            icon: 'fa-leaf',
            location: 'mountain',
            nature: '辛，温',
            meridian: '肝、胆、心包',
            effect: '活血行气，祛风止痛',
            description: '川芎是常用的活血行气药，有"头痛不离川芎"之说。',
            rarity: 2
        },
        {
            id: 'yuanzhi',
            name: '远志',
            icon: 'fa-pagelines',
            location: 'mountain',
            nature: '苦、辛，温',
            meridian: '心、肾、肺',
            effect: '安神益智，祛痰开窍',
            description: '远志是常用的安神药，擅长治疗心肾不交引起的失眠。',
            rarity: 2
        },
        {
            id: 'suanzaoren',
            name: '酸枣仁',
            icon: 'fa-circle',
            location: 'mountain',
            nature: '甘、酸，平',
            meridian: '心、肝、胆',
            effect: '养心益肝，安神敛汗',
            description: '酸枣仁是常用的安神药，擅长治疗虚烦不眠。',
            rarity: 2
        },
        {
            id: 'cangzhu',
            name: '苍术',
            icon: 'fa-pagelines',
            location: 'mountain',
            nature: '辛、苦，温',
            meridian: '脾、胃、肝',
            effect: '燥湿健脾，祛风散寒',
            description: '苍术是常用的燥湿健脾药，擅长治疗湿阻中焦。',
            rarity: 2
        },
        
        // 河边药材
        {
            id: 'fuling',
            name: '茯苓',
            icon: 'fa-circle',
            location: 'river',
            nature: '甘、淡，平',
            meridian: '心、肺、脾、肾',
            effect: '利水渗湿，健脾，宁心',
            description: '茯苓是寄生于松树根上的菌类药材，具有很好的利水渗湿作用。',
            rarity: 1
        },
        {
            id: 'zexie',
            name: '泽泻',
            icon: 'fa-tint',
            location: 'river',
            nature: '甘，寒',
            meridian: '肾、膀胱',
            effect: '利水渗湿，泄热',
            description: '泽泻是常用的利水渗湿药，能清利湿热。',
            rarity: 2
        },
        {
            id: 'shihu',
            name: '石斛',
            icon: 'fa-diamond',
            location: 'river',
            nature: '甘，微寒',
            meridian: '胃、肾',
            effect: '益胃生津，滋阴清热',
            description: '石斛多生长在湿润的石壁上，是名贵的滋阴药材。',
            rarity: 3
        },
        {
            id: 'lianzi',
            name: '莲子',
            icon: 'fa-circle',
            location: 'river',
            nature: '甘、涩，平',
            meridian: '脾、肾、心',
            effect: '补脾止泻，益肾固精',
            description: '莲子既是食品也是药品，有很好的补脾止泻作用。',
            rarity: 1
        },
        {
            id: 'huzhang',
            name: '虎杖',
            icon: 'fa-tree',
            location: 'river',
            nature: '微苦，微寒',
            meridian: '肝、胆、肺',
            effect: '利湿退黄，清热解毒',
            description: '虎杖是常用的利湿退黄药，擅长治疗湿热黄疸。',
            rarity: 2
        },
        
        // 田野药材
        {
            id: 'shengjiang',
            name: '生姜',
            icon: 'fa-circle-o',
            location: 'field',
            nature: '辛，温',
            meridian: '肺、脾、胃',
            effect: '解表散寒，温中止呕',
            description: '生姜既是常用调味品，也是重要的中药，有"呕家圣药"之称。',
            rarity: 1
        },
        {
            id: 'dahuang',
            name: '大黄',
            icon: 'fa-leaf',
            location: 'field',
            nature: '苦，寒',
            meridian: '脾、胃、大肠',
            effect: '泻下攻积，清热泻火',
            description: '大黄有"将军"之称，是强效的泻下药。',
            rarity: 2
        },
        {
            id: 'mahuang',
            name: '麻黄',
            icon: 'fa-pagelines',
            location: 'field',
            nature: '辛、微苦，温',
            meridian: '肺、膀胱',
            effect: '发汗散寒，宣肺平喘',
            description: '麻黄是发汗解表的要药，常用于治疗风寒感冒。',
            rarity: 2
        },
        {
            id: 'guizhi',
            name: '桂枝',
            icon: 'fa-tree',
            location: 'field',
            nature: '辛、甘，温',
            meridian: '心、肺、膀胱',
            effect: '发汗解肌，温通经脉',
            description: '桂枝是肉桂的嫩枝，能温通经脉，助阳化气。',
            rarity: 2
        },
        {
            id: 'bohe',
            name: '薄荷',
            icon: 'fa-leaf',
            location: 'field',
            nature: '辛，凉',
            meridian: '肺、肝',
            effect: '疏散风热，清利头目',
            description: '薄荷有特殊的清凉香气，是常用的辛凉解表药。',
            rarity: 1
        },
        {
            id: 'juhua',
            name: '菊花',
            icon: 'fa-sun-o',
            location: 'field',
            nature: '甘、苦，微寒',
            meridian: '肺、肝',
            effect: '散风清热，平肝明目',
            description: '菊花是常见的观赏植物，也是重要的中药。',
            rarity: 1
        },
        {
            id: 'aicao',
            name: '艾草',
            icon: 'fa-pagelines',
            location: 'field',
            nature: '辛、苦，温',
            meridian: '肝、脾、肾',
            effect: '温经止血，散寒止痛',
            description: '艾草是重要的温经止血药，艾灸疗法就是用艾叶制成的艾条进行灸治。',
            rarity: 1
        },
        {
            id: 'gouqi',
            name: '枸杞',
            icon: 'fa-circle',
            location: 'field',
            nature: '甘，平',
            meridian: '肝、肾',
            effect: '滋补肝肾，益精明目',
            description: '枸杞是常用的滋补肝肾药，也是常见的保健食品。',
            rarity: 1
        },
        {
            id: 'baishao',
            name: '白芍',
            icon: 'fa-pagelines',
            location: 'field',
            nature: '苦、酸，微寒',
            meridian: '肝、脾',
            effect: '养血调经，敛阴止汗',
            description: '白芍是常用的养血调经药，与赤芍同源但炮制方法不同。',
            rarity: 2
        },
        {
            id: 'mudanpi',
            name: '牡丹皮',
            icon: 'fa-pagelines',
            location: 'field',
            nature: '苦、辛，微寒',
            meridian: '心、肝、肾',
            effect: '清热凉血，活血化瘀',
            description: '牡丹皮是常用的清热凉血药，来源于牡丹的根皮。',
            rarity: 2
        },
        {
            id: 'shudi',
            name: '熟地',
            icon: 'fa-circle',
            location: 'field',
            nature: '甘，微温',
            meridian: '肝、肾',
            effect: '滋阴补血，益精填髓',
            description: '熟地是生地黄经过炮制而成，是常用的补血滋阴药。',
            rarity: 2
        },
        {
            id: 'jiegeng',
            name: '桔梗',
            icon: 'fa-pagelines',
            location: 'field',
            nature: '苦、辛，平',
            meridian: '肺',
            effect: '宣肺利咽，祛痰排脓',
            description: '桔梗是常用的宣肺化痰药，擅长治疗咳嗽痰多。',
            rarity: 2
        },
        {
            id: 'zisu',
            name: '紫苏',
            icon: 'fa-leaf',
            location: 'field',
            nature: '辛，温',
            meridian: '肺、脾',
            effect: '解表散寒，行气和胃',
            description: '紫苏是常用的解表药，擅长治疗风寒感冒兼有气滞者。',
            rarity: 1
        },
        {
            id: 'yimucao',
            name: '益母草',
            icon: 'fa-pagelines',
            location: 'field',
            nature: '苦、辛，微寒',
            meridian: '肝、心包、膀胱',
            effect: '活血调经，利水消肿',
            description: '益母草是妇科常用药，擅长治疗月经不调、痛经。',
            rarity: 1
        },
        {
            id: 'baihe',
            name: '百合',
            icon: 'fa-pagelines',
            location: 'field',
            nature: '甘，寒',
            meridian: '心、肺',
            effect: '养阴润肺，清心安神',
            description: '百合是常用的养阴润肺药，擅长治疗肺燥咳嗽。',
            rarity: 1
        }
    ]
};

// DOM元素
const elements = {
    // 场景元素
    gardenScene: document.getElementById('gardenScene'),
    exploreScene: document.getElementById('exploreScene'),
    minigameScene: document.getElementById('minigameScene'),
    marketScene: document.getElementById('marketScene'),
    formulaScene: document.getElementById('formulaScene'),
    knowledgeScene: document.getElementById('knowledgeScene'),
    
    // 模态框
    guideModal: document.getElementById('guideModal'),
    achievementModal: document.getElementById('achievementModal'),
    taskModal: document.getElementById('taskModal'),
    helpModal: document.getElementById('helpModal'),
    settingsModal: document.getElementById('settingsModal'),
    
    // 按钮
    gardenBtn: document.getElementById('gardenBtn'),
    exploreBtn: document.getElementById('exploreBtn'),
    minigameBtn: document.getElementById('minigameBtn'),
    marketBtn: document.getElementById('marketBtn'),
    formulaBtn: document.getElementById('formulaBtn'),
    knowledgeBtn: document.getElementById('knowledgeBtn'),
    guideBtn: document.getElementById('guideBtn'),
    achievementBtn: document.getElementById('achievementBtn'),
    taskBtn: document.getElementById('taskBtn'),
    helpBtn: document.getElementById('helpBtn'),
    settingsBtn: document.getElementById('settingsBtn'),
    resetBtn: document.getElementById('resetBtn'),
    
    // 关闭按钮
    closeGuideBtn: document.getElementById('closeGuideBtn'),
    closeAchievementBtn: document.getElementById('closeAchievementBtn'),
    closeTaskBtn: document.getElementById('closeTaskBtn'),
    closeHelpBtn: document.getElementById('closeHelpBtn'),
    closeSettingsBtn: document.getElementById('closeSettingsBtn'),
    
    // 状态显示
    collectedCount: document.getElementById('collectedCount'),
    wisdomPoints: document.getElementById('wisdomPoints'),
    energyPoints: document.getElementById('energyPoints'),
    achievementCount: document.getElementById('achievementCount'),
    
    // 季节天气
    currentSeason: document.getElementById('currentSeason'),
    currentWeather: document.getElementById('currentWeather'),
    currentTime: document.getElementById('currentTime'),
    weatherIcon: document.getElementById('weatherIcon'),
    
    // 场景内容
    gardenGrid: document.getElementById('gardenGrid'),
    exploreArea: document.getElementById('exploreArea'),
    exploreInfo: document.getElementById('exploreInfo'),
    collectBtn: document.getElementById('collectBtn'),
    foundHerbName: document.getElementById('foundHerbName'),
    herbNature: document.getElementById('herbNature'),
    herbMeridian: document.getElementById('herbMeridian'),
    herbEffect: document.getElementById('herbEffect'),
    herbDescription: document.getElementById('herbDescription'),
    
    // 挑战
    challengeHerbIcon: document.getElementById('challengeHerbIcon'),
    challengeQuestion: document.getElementById('challengeQuestion'),
    challengeOptions: document.getElementById('challengeOptions'),
    challengeFeedback: document.getElementById('challengeFeedback'),
    feedbackText: document.getElementById('feedbackText'),
    nextChallengeBtn: document.getElementById('nextChallengeBtn'),
    
    // 其他
    herbGuideGrid: document.getElementById('herbGuideGrid'),
    marketGrid: document.getElementById('marketGrid'),
    formulaGrid: document.getElementById('formulaGrid'),
    achievementGrid: document.getElementById('achievementGrid'),
    taskGrid: document.getElementById('taskGrid'),
    
    // 设置按钮
    saveGameBtn: document.getElementById('saveGameBtn'),
    loadGameBtn: document.getElementById('loadGameBtn'),
    exportDataBtn: document.getElementById('exportDataBtn'),
    shareBtn: document.getElementById('shareBtn')
};

// 初始化游戏
function initGame() {
    // 尝试从本地存储加载游戏
    const savedData = localStorage.getItem('herbGardenSave');
    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            gameData.collectedHerbs = parsed.collectedHerbs || [];
            gameData.wisdomPoints = parsed.wisdomPoints || 0;
            gameData.energyPoints = parsed.energyPoints || 10;
            gameData.lastEnergyUpdate = parsed.lastEnergyUpdate || Date.now();
            gameData.achievements = parsed.achievements || initAchievements();
            gameData.formulas = parsed.formulas || initFormulas();
            gameData.tasks = parsed.tasks || initTasks();
        } catch (e) {
            console.error('加载游戏数据失败', e);
            resetGameData();
        }
    } else {
        resetGameData();
    }
    
    gameData.marketItems = generateMarketItems();
    gameData.currentSeason = getCurrentSeason();
    gameData.currentWeather = getRandomWeather();
    gameData.currentTime = getCurrentTime();
    
    updateUI();
    renderGarden();
    renderHerbGuide();
    renderMarket();
    renderFormulas();
    renderAchievements();
    renderTasks();
    updateSeasonAndWeather();
    
    // 开始能量恢复
    startEnergyRecovery();
}

// 重置游戏数据
function resetGameData() {
    gameData.collectedHerbs = [];
    gameData.wisdomPoints = 0;
    gameData.energyPoints = 10;
    gameData.lastEnergyUpdate = Date.now();
    gameData.achievements = initAchievements();
    gameData.formulas = initFormulas();
    gameData.tasks = initTasks();
}

// 初始化成就
function initAchievements() {
    return [
        {
            id: 'first_herb',
            name: '初识百草',
            description: '收集第一株草药',
            icon: 'fa-leaf',
            completed: false,
            reward: 10
        },
        {
            id: 'five_herbs',
            name: '小有所成',
            description: '收集5株不同的草药',
            icon: 'fa-tree',
            completed: false,
            reward: 20
        },
        {
            id: 'ten_herbs',
            name: '草药专家',
            description: '收集10株不同的草药',
            icon: 'fa-pagelines',
            completed: false,
            reward: 30
        },
        {
            id: 'all_herbs',
            name: '百草园主',
            description: '收集全部36株草药',
            icon: 'fa-trophy',
            completed: false,
            reward: 100
        },
        {
            id: 'wisdom_master',
            name: '智慧大师',
            description: '累计获得100点智慧值',
            icon: 'fa-graduation-cap',
            completed: false,
            reward: 40
        },
        {
            id: 'challenge_expert',
            name: '辨识达人',
            description: '在辨识挑战中连续答对10题',
            icon: 'fa-star',
            completed: false,
            reward: 50
        },
        {
            id: 'market_shopper',
            name: '市场常客',
            description: '在草药市场购买10株草药',
            icon: 'fa-shopping-cart',
            completed: false,
            reward: 30
        },
        {
            id: 'formula_master',
            name: '配方大师',
            description: '解锁所有中药配方',
            icon: 'fa-flask',
            completed: false,
            reward: 60
        },
        {
            id: 'rare_collector',
            name: '稀有收藏家',
            description: '收集所有稀有度3级草药',
            icon: 'fa-diamond',
            completed: false,
            reward: 80
        },
        {
            id: 'garden_master',
            name: '园艺大师',
            description: '在百草园中同时种植20株草药',
            icon: 'fa-tree',
            completed: false,
            reward: 50
        },
        {
            id: 'knowledge_seeker',
            name: '知识追寻者',
            description: '学习所有中医知识模块',
            icon: 'fa-book',
            completed: false,
            reward: 40
        },
        {
            id: 'explorer',
            name: '探索者',
            description: '在所有地点都进行过探索',
            icon: 'fa-compass',
            completed: false,
            reward: 25
        }
    ];
}

// 初始化中药配方
function initFormulas() {
    return [
        {
            id: 'siwu_tang',
            name: '四物汤',
            description: '补血调经的基础方',
            effect: '补血和血，调经化瘀',
            herbs: ['当归', '川芎', '白芍', '熟地'],
            unlocked: false
        },
        {
            id: 'sijunzi_tang',
            name: '四君子汤',
            description: '益气健脾的基础方',
            effect: '益气健脾，和胃',
            herbs: ['人参', '白术', '茯苓', '甘草'],
            unlocked: false
        },
        {
            id: 'guizhi_tang',
            name: '桂枝汤',
            description: '解肌发表，调和营卫',
            effect: '解肌发表，调和营卫',
            herbs: ['桂枝', '白芍', '甘草', '生姜'],
            unlocked: false
        },
        {
            id: 'juhua_cha',
            name: '菊花茶',
            description: '清肝明目的日常饮品',
            effect: '清热明目，平肝解毒',
            herbs: ['菊花', '薄荷', '甘草'],
            unlocked: false
        },
        {
            id: 'liuwei_dihuang_wan',
            name: '六味地黄丸',
            description: '滋阴补肾的经典方',
            effect: '滋阴补肾，填精益髓',
            herbs: ['熟地', '山茱萸', '泽泻', '牡丹皮', '茯苓'],
            unlocked: false
        },
        {
            id: 'shengmai_yin',
            name: '生脉饮',
            description: '益气养阴的代表方',
            effect: '益气生津，敛阴止汗',
            herbs: ['人参', '五味子'],
            unlocked: false
        },
        {
            id: 'yinqiao_san',
            name: '银翘散',
            description: '辛凉解表的代表方',
            effect: '辛凉解表，清热解毒',
            herbs: ['金银花', '连翘', '薄荷', '桔梗', '甘草'],
            unlocked: false
        }
    ];
}

// 初始化任务
function initTasks() {
    return [
        {
            id: 'daily_explore',
            name: '日常探索',
            description: '在任意地点探索3次',
            icon: 'fa-binoculars',
            completed: false,
            progress: 0,
            target: 3,
            reward: 15,
            type: 'daily'
        },
        {
            id: 'daily_challenge',
            name: '日常挑战',
            description: '完成5次辨识挑战',
            icon: 'fa-graduation-cap',
            completed: false,
            progress: 0,
            target: 5,
            reward: 20,
            type: 'daily'
        },
        {
            id: 'weekly_collection',
            name: '周常收集',
            description: '收集10株不同的草药',
            icon: 'fa-leaf',
            completed: false,
            progress: 0,
            target: 10,
            reward: 50,
            type: 'weekly'
        }
    ];
}

// 获取当前季节
function getCurrentSeason() {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'autumn';
    return 'winter';
}

// 获取随机天气
function getRandomWeather() {
    const weathers = ['sunny', 'cloudy', 'rainy'];
    return weathers[Math.floor(Math.random() * weathers.length)];
}

// 获取当前时间
function getCurrentTime() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    return 'evening';
}

// 开始能量恢复
function startEnergyRecovery() {
    setInterval(() => {
        const now = Date.now();
        const timePassed = now - gameData.lastEnergyUpdate;
        const minutesPassed = Math.floor(timePassed / (1000 * 60));
        
        if (minutesPassed >= 5 && gameData.energyPoints < gameData.maxEnergy) {
            const energyToRecover = Math.floor(minutesPassed / 5);
            gameData.energyPoints = Math.min(gameData.maxEnergy, gameData.energyPoints + energyToRecover);
            gameData.lastEnergyUpdate = now - (minutesPassed % 5) * 60 * 1000;
            updateUI();
            saveGame(true); // 自动保存
        }
    }, 60000);
}

// 更新季节和天气
function updateSeasonAndWeather() {
    const seasonNames = {
        'spring': '春季',
        'summer': '夏季',
        'autumn': '秋季',
        'winter': '冬季'
    };
    
    const weatherNames = {
        'sunny': '晴朗',
        'cloudy': '多云',
        'rainy': '雨天'
    };
    
    const timeNames = {
        'morning': '上午',
        'afternoon': '下午',
        'evening': '晚上'
    };
    
    const weatherIcons = {
        'sunny': 'fa-sun-o',
        'cloudy': 'fa-cloud',
        'rainy': 'fa-tint'
    };
    
    elements.currentSeason.textContent = seasonNames[gameData.currentSeason];
    elements.currentWeather.textContent = weatherNames[gameData.currentWeather];
    elements.currentTime.textContent = timeNames[gameData.currentTime];
    elements.weatherIcon.className = `fa ${weatherIcons[gameData.currentWeather]} mr-2`;
}

// 生成市场商品
function generateMarketItems() {
    const rareHerbs = gameData.herbs.filter(herb => herb.rarity >= 2);
    const shuffled = shuffleArray([...rareHerbs]);
    return shuffled.slice(0, 6).map(herb => ({
        ...herb,
        price: herb.rarity * 15
    }));
}

// 更新UI
function updateUI() {
    elements.collectedCount.textContent = `${gameData.collectedHerbs.length}/${gameData.herbs.length}`;
    elements.wisdomPoints.textContent = gameData.wisdomPoints;
    elements.energyPoints.textContent = `${gameData.energyPoints}/${gameData.maxEnergy}`;
    
    const completedAchievements = gameData.achievements.filter(a => a.completed).length;
    elements.achievementCount.textContent = `${completedAchievements}/${gameData.achievements.length}`;
    
    checkAchievements();
    checkTasks();
    
    if (gameData.collectedHerbs.length === gameData.herbs.length) {
        elements.collectedCount.classList.add('pulse-grow', 'bg-accent/30', 'text-accent');
    }
}

// 检查成就
function checkAchievements() {
    const count = gameData.collectedHerbs.length;
    
    if (count >= 1 && !gameData.achievements[0].completed) {
        completeAchievement('first_herb');
    }
    if (count >= 5 && !gameData.achievements[1].completed) {
        completeAchievement('five_herbs');
    }
    if (count >= 10 && !gameData.achievements[2].completed) {
        completeAchievement('ten_herbs');
    }
    if (count >= 36 && !gameData.achievements[3].completed) {
        completeAchievement('all_herbs');
    }
    if (gameData.wisdomPoints >= 100 && !gameData.achievements[4].completed) {
        completeAchievement('wisdom_master');
    }
    if (count >= 20 && !gameData.achievements[9].completed) {
        completeAchievement('garden_master');
    }
    
    checkFormulas();
}

// 完成成就
function completeAchievement(achievementId) {
    const achievement = gameData.achievements.find(a => a.id === achievementId);
    if (achievement && !achievement.completed) {
        achievement.completed = true;
        gameData.wisdomPoints += achievement.reward;
        showNotification('成就解锁！', `${achievement.name} - 获得 ${achievement.reward} 智慧值`, 'success');
        updateUI();
        renderAchievements();
        saveGame(true);
    }
}

// 检查任务
function checkTasks() {
    const weeklyTask = gameData.tasks.find(t => t.id === 'weekly_collection');
    if (weeklyTask) {
        weeklyTask.progress = gameData.collectedHerbs.length;
        if (weeklyTask.progress >= weeklyTask.target && !weeklyTask.completed) {
            completeTask('weekly_collection');
        }
    }
}

// 完成任务
function completeTask(taskId) {
    const task = gameData.tasks.find(t => t.id === taskId);
    if (task && !task.completed) {
        task.completed = true;
        gameData.wisdomPoints += task.reward;
        showNotification('任务完成！', `${task.name} - 获得 ${task.reward} 智慧值`, 'success');
        updateUI();
        renderTasks();
        saveGame(true);
    }
}

// 检查配方
function checkFormulas() {
    gameData.formulas.forEach(formula => {
        if (!formula.unlocked) {
            const hasAllHerbs = formula.herbs.every(herbName => 
                gameData.collectedHerbs.some(herb => herb.name === herbName)
            );
            if (hasAllHerbs) {
                formula.unlocked = true;
            }
        }
    });
    renderFormulas();
}

// 切换场景
function switchScene(sceneId) {
    // 隐藏所有场景
    Object.values([elements.gardenScene, elements.exploreScene, elements.minigameScene, 
                  elements.marketScene, elements.formulaScene, elements.knowledgeScene])
          .forEach(scene => scene.classList.add('hidden'));
    
    // 重置所有按钮样式
    const sceneButtons = [elements.gardenBtn, elements.exploreBtn, elements.minigameBtn, 
                         elements.marketBtn, elements.formulaBtn, elements.knowledgeBtn];
    sceneButtons.forEach(btn => {
        btn.classList.remove('text-primary', 'font-bold', 'border-b-2', 'border-primary');
        btn.classList.add('text-secondary/70');
    });
    
    // 显示选中的场景
    document.getElementById(sceneId).classList.remove('hidden');
    
    // 更新按钮样式
    const buttonMap = {
        'gardenScene': elements.gardenBtn,
        'exploreScene': elements.exploreBtn,
        'minigameScene': elements.minigameBtn,
        'marketScene': elements.marketBtn,
        'formulaScene': elements.formulaBtn,
        'knowledgeScene': elements.knowledgeBtn
    };
    
    const selectedBtn = buttonMap[sceneId];
    if (selectedBtn) {
        selectedBtn.classList.remove('text-secondary/70');
        selectedBtn.classList.add('text-primary', 'font-bold', 'border-b-2', 'border-primary');
    }
    
    // 特殊处理
    if (sceneId === 'minigameScene') {
        generateChallenge();
    }
}

// 渲染百草园
function renderGarden() {
    elements.gardenGrid.innerHTML = '';
    
    gameData.collectedHerbs.forEach(herb => {
        const herbCard = document.createElement('div');
        herbCard.className = 'hover-lift bg-white rounded-xl overflow-hidden border border-secondary/20 h-36 md:h-40 flex flex-col slide-up cursor-pointer';
        herbCard.innerHTML = `
            <div class="h-20 md:h-24 overflow-hidden bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                <div class="herb-icon ${getHerbRarityClass(herb)}">
                    <i class="fa ${herb.icon} text-white"></i>
                </div>
            </div>
            <div class="p-2 flex-grow flex flex-col justify-center bg-gradient-to-b from-white to-green-50">
                <h3 class="font-bold text-primary text-center text-xs md:text-sm">${herb.name}</h3>
                <p class="text-xs text-secondary text-center mt-1">已收集</p>
            </div>
        `;
        herbCard.addEventListener('click', () => showHerbDetails(herb));
        elements.gardenGrid.appendChild(herbCard);
    });
    
    const emptyPlots = Math.max(0, 36 - gameData.collectedHerbs.length);
    for (let i = 0; i < Math.min(emptyPlots, 20); i++) {
        const emptyPlot = document.createElement('div');
        emptyPlot.className = 'bg-secondary/5 border-2 border-dashed border-secondary/30 rounded-xl h-36 md:h-40 flex flex-col items-center justify-center hover:bg-secondary/10 transition-colors cursor-pointer';
        emptyPlot.innerHTML = `
            <i class="fa fa-plus-circle text-2xl md:text-3xl text-secondary/50 mb-2"></i>
            <p class="text-xs md:text-sm text-secondary/70 text-center px-2">前往探索<br>获取草药</p>
        `;
        emptyPlot.addEventListener('click', () => switchScene('exploreScene'));
        elements.gardenGrid.appendChild(emptyPlot);
    }
}

// 获取草药稀有度样式类
function getHerbRarityClass(herb) {
    if (herb.id === 'bohe') return 'herb-icon-mint';
    if (herb.id === 'juhua') return 'herb-icon-chrysanthemum';
    if (herb.id === 'aicao') return 'herb-icon-mugwort';
    if (herb.id === 'renshen') return 'herb-icon-ginseng';
    if (herb.id === 'mudanpi') return 'herb-icon-peony';
    if (herb.id === 'lianzi') return 'herb-icon-lotus';
    if (herb.rarity === 1) return 'herb-common';
    if (herb.rarity === 2) return 'herb-rare';
    if (herb.rarity === 3) return 'herb-legendary';
    return 'herb-common';
}

// 显示草药详情
function showHerbDetails(herb) {
    elements.guideModal.classList.remove('hidden');
    elements.guideModal.classList.add('flex');
    renderHerbGuide();
    
    setTimeout(() => {
        const herbElement = document.querySelector(`[data-herb-id="${herb.id}"]`);
        if (herbElement) {
            herbElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            herbElement.classList.add('glow');
            setTimeout(() => herbElement.classList.remove('glow'), 2000);
        }
    }, 300);
}

// 渲染药草图鉴
function renderHerbGuide() {
    elements.herbGuideGrid.innerHTML = '';
    
    if (gameData.collectedHerbs.length === 0) {
        elements.herbGuideGrid.innerHTML = `
            <div class="text-center text-secondary/50 py-8 col-span-full">
                <i class="fa fa-book text-4xl mb-2"></i>
                <p class="text-base md:text-lg">收集草药来填充你的图鉴</p>
                <p class="text-xs md:text-sm mt-1">前往"探索采药"开始你的收集之旅</p>
            </div>
        `;
        return;
    }
    
    const locations = {
        'forest': { name: '森林', herbs: [] },
        'mountain': { name: '山地', herbs: [] },
        'river': { name: '河边', herbs: [] },
        'field': { name: '田野', herbs: [] }
    };
    
    gameData.collectedHerbs.forEach(herb => {
        locations[herb.location].herbs.push(herb);
    });
    
    Object.values(locations).forEach(location => {
        if (location.herbs.length > 0) {
            const locationHeader = document.createElement('div');
            locationHeader.className = 'col-span-full text-primary font-bold border-b border-primary/20 py-2 flex items-center text-sm md:text-base';
            locationHeader.innerHTML = `<i class="fa fa-map-marker mr-2 text-secondary"></i> ${location.name}`;
            elements.herbGuideGrid.appendChild(locationHeader);
            
            location.herbs.forEach(herb => {
                const herbCard = document.createElement('div');
                herbCard.className = 'hover-lift bg-white rounded-xl overflow-hidden border border-secondary/20';
                herbCard.dataset.herbId = herb.id;
                herbCard.innerHTML = `
                    <div class="h-24 md:h-32 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                        <div class="herb-icon ${getHerbRarityClass(herb)}">
                            <i class="fa ${herb.icon} text-white"></i>
                        </div>
                    </div>
                    <div class="p-2 md:p-3 bg-gradient-to-b from-white to-green-50">
                        <h3 class="font-bold text-primary text-sm md:text-base">${herb.name}</h3>
                        <div class="flex mt-1 text-xs flex-wrap gap-1">
                            <span class="bg-secondary/10 text-secondary px-2 py-1 rounded">${herb.nature}</span>
                        </div>
                        <p class="text-xs md:text-sm mt-2 font-medium line-clamp-2">${herb.effect}</p>
                        <p class="text-xs text-secondary/80 mt-2 italic line-clamp-3">${herb.description}</p>
                    </div>
                `;
                elements.herbGuideGrid.appendChild(herbCard);
            });
        }
    });
}

// 探索地点
function exploreLocation(locationId) {
    if (gameData.energyPoints <= 0) {
        showNotification('精力不足', '请等待恢复后再探索！', 'error');
        return;
    }
    
    gameData.currentLocation = locationId;
    gameData.energyPoints--;
    
    // 更新任务进度
    const dailyExplore = gameData.tasks.find(t => t.id === 'daily_explore');
    if (dailyExplore && !dailyExplore.completed) {
        dailyExplore.progress = Math.min(dailyExplore.target, dailyExplore.progress + 1);
        if (dailyExplore.progress >= dailyExplore.target) {
            completeTask('daily_explore');
        }
    }
    
    updateUI();
    saveGame(true);
    
    elements.exploreArea.innerHTML = '';
    
    const locationHerbs = gameData.herbs.filter(herb => herb.location === locationId);
    const numHerbsToShow = 3 + Math.floor(Math.random() * 3);
    const shuffledHerbs = shuffleArray(locationHerbs);
    const herbsToShow = shuffledHerbs.slice(0, numHerbsToShow);
    
    herbsToShow.forEach(herb => {
        const leftPos = 10 + Math.random() * 70;
        const topPos = 10 + Math.random() * 70;
        const isCollected = gameData.collectedHerbs.some(h => h.id === herb.id);
        
        const herbElement = document.createElement('div');
        herbElement.className = `absolute cursor-pointer float ${isCollected ? 'opacity-70' : 'opacity-100'}`;
        herbElement.style.left = `${leftPos}%`;
        herbElement.style.top = `${topPos}%`;
        herbElement.innerHTML = `
            <div class="herb-icon ${getHerbRarityClass(herb)}">
                <i class="fa ${herb.icon} text-white"></i>
            </div>
            ${isCollected ? '<div class="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"><i class="fa fa-check"></i></div>' : ''}
        `;
        
        herbElement.addEventListener('click', () => {
            elements.foundHerbName.textContent = `发现了${herb.name}`;
            elements.herbNature.textContent = herb.nature;
            elements.herbMeridian.textContent = herb.meridian;
            elements.herbEffect.textContent = herb.effect;
            elements.herbDescription.textContent = herb.description;
            elements.exploreInfo.classList.remove('hidden');
            
            elements.collectBtn.dataset.herbId = herb.id;
            
            if (isCollected) {
                elements.collectBtn.disabled = true;
                elements.collectBtn.innerHTML = '<i class="fa fa-check mr-2"></i> 已收集';
                elements.collectBtn.className = 'bg-gray-400 text-white py-2 px-4 md:px-6 rounded-full text-xs md:text-sm cursor-not-allowed font-bold';
            } else {
                elements.collectBtn.disabled = false;
                elements.collectBtn.innerHTML = '<i class="fa fa-hand-paper-o mr-2"></i> 收集草药';
                elements.collectBtn.className = 'bg-gradient-to-r from-accent to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white py-2 px-4 md:px-6 rounded-full text-xs md:text-sm transition-colors hover-lift font-bold';
            }
        });
        
        elements.exploreArea.appendChild(herbElement);
    });
    
    const backgrounds = {
        'forest': 'linear-gradient(to bottom, #d1fae5, #a7f3d0)',
        'mountain': 'linear-gradient(to bottom, #e7e5e4, #d6d3d1)',
        'river': 'linear-gradient(to bottom, #dbeafe, #93c5fd)',
        'field': 'linear-gradient(to bottom, #fef3c7, #fde68a)'
    };
    elements.exploreArea.style.background = backgrounds[locationId] || backgrounds.field;
}

// 收集草药
function collectHerb(herbId) {
    const herb = gameData.herbs.find(h => h.id === herbId);
    
    if (herb && !gameData.collectedHerbs.some(h => h.id === herbId)) {
        gameData.collectedHerbs.push(herb);
        
        elements.collectBtn.innerHTML = '<i class="fa fa-check mr-2"></i> 收集成功！';
        elements.collectBtn.className = 'bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 md:px-6 rounded-full text-xs md:text-sm font-bold';
        
        setTimeout(() => {
            elements.exploreInfo.classList.add('hidden');
            renderGarden();
            renderHerbGuide();
            updateUI();
            saveGame(true);
            
            if (gameData.collectedHerbs.length === gameData.herbs.length) {
                setTimeout(() => {
                    showNotification('恭喜！', '你已经收集了全部36种草药，完成了百草园的建设！', 'success');
                    createConfetti();
                }, 1000);
            }
        }, 1500);
    }
}

// 购买草药
function buyHerb(herbId) {
    const herb = gameData.marketItems.find(item => item.id === herbId);
    
    if (!herb) return;
    
    if (gameData.wisdomPoints < herb.price) {
        showNotification('智慧值不足', `需要 ${herb.price} 智慧值`, 'error');
        return;
    }
    
    if (gameData.collectedHerbs.some(h => h.id === herbId)) {
        showNotification('已拥有', '你已经拥有这株草药了', 'error');
        return;
    }
    
    gameData.wisdomPoints -= herb.price;
    gameData.collectedHerbs.push(herb);
    gameData.marketItems = gameData.marketItems.filter(item => item.id !== herbId);
    
    updateUI();
    renderGarden();
    renderHerbGuide();
    renderMarket();
    saveGame(true);
    
    showNotification('购买成功！', `获得了${herb.name}`, 'success');
}

// 生成挑战题
function generateChallenge() {
    const availableHerbs = gameData.collectedHerbs.length > 0 
        ? gameData.collectedHerbs 
        : gameData.herbs;
    
    const randomHerb = availableHerbs[Math.floor(Math.random() * availableHerbs.length)];
    
    elements.challengeHerbIcon.className = `herb-icon ${getHerbRarityClass(randomHerb)}`;
    elements.challengeHerbIcon.innerHTML = `<i class="fa ${randomHerb.icon} text-white"></i>`;
    
    elements.challengeOptions.innerHTML = '';
    
    const challengeTypes = {
        'name': {
            question: '这味中药的名称是？',
            correctAnswer: randomHerb.name,
            getOptions: () => {
                const options = [randomHerb.name];
                while (options.length < 4) {
                    const randomOption = gameData.herbs[Math.floor(Math.random() * gameData.herbs.length)].name;
                    if (!options.includes(randomOption)) {
                        options.push(randomOption);
                    }
                }
                return shuffleArray(options);
            }
        },
        'effect': {
            question: `${randomHerb.name}的主要功效是？`,
            correctAnswer: randomHerb.effect,
            getOptions: () => {
                const options = [randomHerb.effect];
                while (options.length < 4) {
                    const randomOption = gameData.herbs[Math.floor(Math.random() * gameData.herbs.length)].effect;
                    if (!options.includes(randomOption)) {
                        options.push(randomOption);
                    }
                }
                return shuffleArray(options);
            }
        },
        'nature': {
            question: `${randomHerb.name}的性味是？`,
            correctAnswer: randomHerb.nature,
            getOptions: () => {
                const options = [randomHerb.nature];
                while (options.length < 4) {
                    const randomOption = gameData.herbs[Math.floor(Math.random() * gameData.herbs.length)].nature;
                    if (!options.includes(randomOption)) {
                        options.push(randomOption);
                    }
                }
                return shuffleArray(options);
            }
        },
        'meridian': {
            question: `${randomHerb.name}主要归经是？`,
            correctAnswer: randomHerb.meridian,
            getOptions: () => {
                const options = [randomHerb.meridian];
                while (options.length < 4) {
                    const randomOption = gameData.herbs[Math.floor(Math.random() * gameData.herbs.length)].meridian;
                    if (!options.includes(randomOption)) {
                        options.push(randomOption);
                    }
                }
                return shuffleArray(options);
            }
        }
    };
    
    const currentType = challengeTypes[gameData.currentChallengeType];
    elements.challengeQuestion.textContent = currentType.question;
    
    const options = currentType.getOptions();
    options.forEach(option => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'w-full text-left p-2 md:p-3 border border-primary/20 rounded-xl hover:bg-secondary/5 transition-colors text-xs md:text-sm hover-lift';
        optionBtn.textContent = option;
        optionBtn.dataset.correct = option === currentType.correctAnswer;
        optionBtn.dataset.herbId = randomHerb.id;
        optionBtn.addEventListener('click', checkChallengeAnswer);
        elements.challengeOptions.appendChild(optionBtn);
    });
    
    elements.challengeFeedback.classList.add('hidden');
}

// 检查挑战答案
function checkChallengeAnswer(e) {
    const isCorrect = e.target.dataset.correct === 'true';
    const herbId = e.target.dataset.herbId;
    const herb = gameData.herbs.find(h => h.id === herbId);
    
    // 更新任务进度
    const dailyChallenge = gameData.tasks.find(t => t.id === 'daily_challenge');
    if (dailyChallenge && !dailyChallenge.completed) {
        dailyChallenge.progress = Math.min(dailyChallenge.target, dailyChallenge.progress + 1);
        if (dailyChallenge.progress >= dailyChallenge.target) {
            completeTask('daily_challenge');
        }
    }
    
    document.querySelectorAll('#challengeOptions button').forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.correct === 'true') {
            btn.classList.add('bg-green-100', 'border-green-500', 'text-green-800');
        } else if (btn === e.target) {
            btn.classList.add('bg-red-100', 'border-red-500', 'text-red-800');
        }
    });
    
    elements.challengeFeedback.classList.remove('hidden');
    
    if (isCorrect) {
        const points = 5 + Math.floor(Math.random() * 6);
        gameData.wisdomPoints += points;
        updateUI();
        saveGame(true);
        
        elements.feedbackText.innerHTML = `
            <div class="flex flex-col items-center">
                <div class="bg-green-100 text-green-800 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-2">
                    <i class="fa fa-check text-lg md:text-xl"></i>
                </div>
                <p class="text-green-700 font-bold text-base md:text-lg mb-1">回答正确！</p>
                <p class="text-green-600 text-sm md:text-base">获得了${points}点智慧值</p>
                <p class="text-xs md:text-sm mt-2 text-center text-secondary">${herb.description}</p>
            </div>
        `;
        elements.challengeFeedback.className = 'p-3 md:p-4 rounded-xl mb-4 bg-green-50 border border-green-200 fade-in';
    } else {
        elements.feedbackText.innerHTML = `
            <div class="flex flex-col items-center">
                <div class="bg-red-100 text-red-800 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-2">
                    <i class="fa fa-times text-lg md:text-xl"></i>
                </div>
                <p class="text-red-700 font-bold text-base md:text-lg mb-1">回答错误</p>
                <p class="text-xs md:text-sm mt-2 text-center text-secondary">${herb.description}</p>
            </div>
        `;
        elements.challengeFeedback.className = 'p-3 md:p-4 rounded-xl mb-4 bg-red-50 border border-red-200 fade-in';
    }
}

// 渲染市场
function renderMarket() {
    elements.marketGrid.innerHTML = '';
    
    if (gameData.marketItems.length === 0) {
        elements.marketGrid.innerHTML = `
            <div class="text-center text-secondary/50 py-8 col-span-full">
                <i class="fa fa-shopping-cart text-4xl mb-2"></i>
                <p class="text-base md:text-lg">今日市场暂无商品</p>
                <p class="text-xs md:text-sm mt-1">请稍后再来查看</p>
            </div>
        `;
        return;
    }
    
    gameData.marketItems.forEach(item => {
        const isCollected = gameData.collectedHerbs.some(h => h.id === item.id);
        const canAfford = gameData.wisdomPoints >= item.price;
        
        const marketItem = document.createElement('div');
        marketItem.className = 'hover-lift bg-white rounded-xl overflow-hidden border border-secondary/20';
        marketItem.innerHTML = `
            <div class="h-24 md:h-32 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                <div class="herb-icon ${getHerbRarityClass(item)}">
                    <i class="fa ${item.icon} text-white"></i>
                </div>
            </div>
            <div class="p-2 md:p-3 bg-gradient-to-b from-white to-green-50">
                <h3 class="font-bold text-primary text-sm md:text-base">${item.name}</h3>
                <p class="text-xs md:text-sm mt-2 font-medium line-clamp-2">${item.effect}</p>
                <div class="mt-3 flex justify-between items-center">
                    <span class="text-accent font-bold text-xs md:text-sm">${item.price} 智慧</span>
                    <button class="market-buy-btn ${isCollected ? 'bg-gray-400 cursor-not-allowed' : canAfford ? 'bg-accent hover:bg-accent/80' : 'bg-gray-400 cursor-not-allowed'} text-white py-1 px-2 md:px-3 rounded text-xs md:text-sm transition-colors" 
                            data-herb-id="${item.id}" 
                            ${isCollected || !canAfford ? 'disabled' : ''}>
                        ${isCollected ? '已拥有' : canAfford ? '购买' : '不足'}
                    </button>
                </div>
            </div>
        `;
        elements.marketGrid.appendChild(marketItem);
    });
}

// 渲染中药配方
function renderFormulas() {
    elements.formulaGrid.innerHTML = '';
    
    gameData.formulas.forEach(formula => {
        const formulaCard = document.createElement('div');
        formulaCard.className = `hover-lift bg-white rounded-xl overflow-hidden border ${formula.unlocked ? 'border-secondary/20' : 'border-gray-300'} ${formula.unlocked ? '' : 'opacity-70'}`;
        formulaCard.innerHTML = `
            <div class="p-3 md:p-4 bg-gradient-to-b from-white to-green-50">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-bold text-primary text-sm md:text-base">${formula.name}</h3>
                    ${formula.unlocked ? '<span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">已解锁</span>' : '<span class="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">未解锁</span>'}
                </div>
                <p class="text-xs md:text-sm text-secondary mb-3">${formula.description}</p>
                <div class="mb-3">
                    <p class="text-xs text-primary font-bold mb-1">功效：</p>
                    <p class="text-xs md:text-sm text-secondary">${formula.effect}</p>
                </div>
                <div>
                    <p class="text-xs text-primary font-bold mb-1">组成：</p>
                    <div class="flex flex-wrap gap-1">
                        ${formula.herbs.map(herb => {
                            const hasHerb = gameData.collectedHerbs.some(h => h.name === herb);
                            return `<span class="text-xs px-2 py-1 rounded ${hasHerb ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">${herb}</span>`;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
        elements.formulaGrid.appendChild(formulaCard);
    });
}

// 渲染成就
function renderAchievements() {
    elements.achievementGrid.innerHTML = '';
    
    gameData.achievements.forEach(achievement => {
        const achievementCard = document.createElement('div');
        achievementCard.className = `hover-lift bg-white rounded-xl overflow-hidden border ${achievement.completed ? 'border-bronze/30' : 'border-gray-300'} ${achievement.completed ? '' : 'opacity-70'}`;
        achievementCard.innerHTML = `
            <div class="p-3 md:p-4 bg-gradient-to-b from-white to-amber-50">
                <div class="flex items-start mb-3">
                    <div class="achievement-badge mr-3 flex-shrink-0 ${achievement.completed ? '' : 'bg-gray-400'}">
                        <i class="fa ${achievement.icon}"></i>
                    </div>
                    <div>
                        <h3 class="font-bold ${achievement.completed ? 'text-bronze' : 'text-gray-500'} text-sm md:text-base">${achievement.name}</h3>
                        <p class="text-xs md:text-sm text-secondary mt-1">${achievement.description}</p>
                        <div class="mt-2 flex justify-between items-center">
                            <span class="text-xs ${achievement.completed ? 'text-green-600' : 'text-gray-500'} font-bold">
                                ${achievement.completed ? '已完成' : '未完成'}
                            </span>
                            <span class="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                                奖励: ${achievement.reward} 智慧值
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        elements.achievementGrid.appendChild(achievementCard);
    });
}

// 渲染任务
function renderTasks() {
    elements.taskGrid.innerHTML = '';
    
    gameData.tasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = `hover-lift bg-white rounded-xl overflow-hidden border ${task.completed ? 'border-green-300' : 'border-gray-300'} ${task.completed ? '' : 'opacity-90'}`;
        taskCard.innerHTML = `
            <div class="p-3 md:p-4 bg-gradient-to-b from-white to-${task.type === 'daily' ? 'yellow' : task.type === 'weekly' ? 'blue' : 'green'}-50">
                <div class="flex items-start mb-3">
                    <div class="achievement-badge mr-3 flex-shrink-0 ${task.completed ? 'bg-green-500' : 'bg-gray-400'}">
                        <i class="fa ${task.icon}"></i>
                    </div>
                    <div class="flex-grow">
                        <h3 class="font-bold ${task.completed ? 'text-green-600' : 'text-gray-500'} text-sm md:text-base">${task.name}</h3>
                        <p class="text-xs md:text-sm text-secondary mt-1">${task.description}</p>
                        <div class="mt-2">
                            <div class="flex justify-between text-xs text-gray-500 mb-1">
                                <span>进度: ${task.progress}/${task.target}</span>
                            </div>
                            <div class="progress-bar w-full">
                                <div class="progress-fill ${task.completed ? 'bg-green-500' : 'bg-blue-500'}" style="width: ${(task.progress / task.target) * 100}%"></div>
                            </div>
                        </div>
                        <div class="mt-2 flex justify-between items-center">
                            <span class="text-xs ${task.completed ? 'text-green-600' : 'text-gray-500'} font-bold">
                                ${task.completed ? '已完成' : '进行中'}
                            </span>
                            <span class="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                                奖励: ${task.reward} 智慧值
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        elements.taskGrid.appendChild(taskCard);
    });
}

// 保存游戏
function saveGame(silent = false) {
    const saveData = {
        collectedHerbs: gameData.collectedHerbs,
        wisdomPoints: gameData.wisdomPoints,
        energyPoints: gameData.energyPoints,
        lastEnergyUpdate: gameData.lastEnergyUpdate,
        achievements: gameData.achievements,
        formulas: gameData.formulas,
        tasks: gameData.tasks
    };
    
    localStorage.setItem('herbGardenSave', JSON.stringify(saveData));
    if (!silent) {
        showNotification('保存成功', '游戏已保存！', 'success');
    }
}

// 加载游戏
function loadGame() {
    const savedData = localStorage.getItem('herbGardenSave');
    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            gameData.collectedHerbs = parsed.collectedHerbs || [];
            gameData.wisdomPoints = parsed.wisdomPoints || 0;
            gameData.energyPoints = parsed.energyPoints || 10;
            gameData.lastEnergyUpdate = parsed.lastEnergyUpdate || Date.now();
            gameData.achievements = parsed.achievements || initAchievements();
            gameData.formulas = parsed.formulas || initFormulas();
            gameData.tasks = parsed.tasks || initTasks();
            
            updateUI();
            renderGarden();
            renderHerbGuide();
            renderMarket();
            renderFormulas();
            renderAchievements();
            renderTasks();
            
            showNotification('加载成功', '游戏已加载！', 'success');
        } catch (e) {
            showNotification('加载失败', '游戏数据损坏', 'error');
        }
    } else {
        showNotification('没有存档', '没有找到保存的游戏数据！', 'error');
    }
}

// 导出游戏数据
function exportGameData() {
    const exportData = {
        collectedHerbs: gameData.collectedHerbs,
        wisdomPoints: gameData.wisdomPoints,
        achievements: gameData.achievements.filter(a => a.completed),
        formulas: gameData.formulas.filter(f => f.unlocked)
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'herb_garden_data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showNotification('导出成功', '数据已导出！', 'success');
}

// 分享游戏
function shareGame() {
    if (navigator.share) {
        navigator.share({
            title: '中药百草园',
            text: '我正在玩中药百草园游戏，学习中医药知识，快来一起玩吧！',
            url: window.location.href
        }).catch(() => {});
    } else {
        const url = window.location.href;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url)
                .then(() => showNotification('分享成功', '游戏链接已复制到剪贴板！', 'success'))
                .catch(() => showNotification('分享失败', `请手动复制链接：${url}`, 'error'));
        } else {
            showNotification('分享', `请复制链接：${url}`, 'info');
        }
    }
}

// 创建五彩纸屑效果
function createConfetti() {
    const colors = ['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 5 + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

// 显示通知
function showNotification(title, message, type = 'info') {
    const notification = document.createElement('div');
    const colors = {
        'success': 'from-green-500 to-green-600',
        'error': 'from-red-500 to-red-600',
        'info': 'from-blue-500 to-blue-600'
    };
    
    notification.className = `fixed top-4 right-4 bg-gradient-to-r ${colors[type] || colors.info} text-white p-4 rounded-xl shadow-lg z-50 bounce-in max-w-sm`;
    notification.innerHTML = `
        <div class="flex items-start">
            <div class="flex-shrink-0">
                <i class="fa ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-times-circle' : 'fa-info-circle'} text-xl"></i>
            </div>
            <div class="ml-3">
                <p class="font-bold text-sm md:text-base">${title}</p>
                <p class="text-xs md:text-sm mt-1">${message}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

// 工具函数：随机排序数组
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// 事件监听器
function setupEventListeners() {
    // 场景切换
    elements.gardenBtn.addEventListener('click', () => switchScene('gardenScene'));
    elements.exploreBtn.addEventListener('click', () => switchScene('exploreScene'));
    elements.minigameBtn.addEventListener('click', () => switchScene('minigameScene'));
    elements.marketBtn.addEventListener('click', () => switchScene('marketScene'));
    elements.formulaBtn.addEventListener('click', () => switchScene('formulaScene'));
    elements.knowledgeBtn.addEventListener('click', () => switchScene('knowledgeScene'));
    
    // 模态框
    elements.guideBtn.addEventListener('click', () => {
        elements.guideModal.classList.remove('hidden');
        elements.guideModal.classList.add('flex');
    });
    
    elements.achievementBtn.addEventListener('click', () => {
        elements.achievementModal.classList.remove('hidden');
        elements.achievementModal.classList.add('flex');
    });
    
    elements.taskBtn.addEventListener('click', () => {
        elements.taskModal.classList.remove('hidden');
        elements.taskModal.classList.add('flex');
    });
    
    elements.helpBtn.addEventListener('click', () => {
        elements.helpModal.classList.remove('hidden');
        elements.helpModal.classList.add('flex');
    });
    
    elements.settingsBtn.addEventListener('click', () => {
        elements.settingsModal.classList.remove('hidden');
        elements.settingsModal.classList.add('flex');
    });
    
    // 关闭模态框
    elements.closeGuideBtn.addEventListener('click', () => {
        elements.guideModal.classList.add('hidden');
        elements.guideModal.classList.remove('flex');
    });
    
    elements.closeAchievementBtn.addEventListener('click', () => {
        elements.achievementModal.classList.add('hidden');
        elements.achievementModal.classList.remove('flex');
    });
    
    elements.closeTaskBtn.addEventListener('click', () => {
        elements.taskModal.classList.add('hidden');
        elements.taskModal.classList.remove('flex');
    });
    
    elements.closeHelpBtn.addEventListener('click', () => {
        elements.helpModal.classList.add('hidden');
        elements.helpModal.classList.remove('flex');
    });
    
    elements.closeSettingsBtn.addEventListener('click', () => {
        elements.settingsModal.classList.add('hidden');
        elements.settingsModal.classList.remove('flex');
    });
    
    // 重置游戏
    elements.resetBtn.addEventListener('click', () => {
        if (confirm('确定要重新开始游戏吗？所有收集的草药和智慧值将被重置。')) {
            localStorage.removeItem('herbGardenSave');
            location.reload();
        }
    });
    
    // 地点选择
    document.querySelectorAll('.location-card').forEach(card => {
        card.addEventListener('click', () => {
            exploreLocation(card.dataset.location);
        });
    });
    
    // 收集草药
    elements.collectBtn.addEventListener('click', () => {
        const herbId = elements.collectBtn.dataset.herbId;
        if (herbId) {
            collectHerb(herbId);
        }
    });
    
    // 挑战类型选择
    document.querySelectorAll('.challenge-type-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.challenge-type-btn').forEach(b => {
                b.classList.remove('bg-gradient-to-r', 'from-accent', 'to-amber-600', 'text-white');
                b.classList.add('bg-secondary/20', 'hover:bg-secondary/30', 'text-secondary');
            });
            
            btn.classList.remove('bg-secondary/20', 'hover:bg-secondary/30', 'text-secondary');
            btn.classList.add('bg-gradient-to-r', 'from-accent', 'to-amber-600', 'text-white');
            
            gameData.currentChallengeType = btn.dataset.type;
            generateChallenge();
        });
    });
    
    // 下一题挑战
    elements.nextChallengeBtn.addEventListener('click', generateChallenge);
    
    // 购买草药事件委托
    elements.marketGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('market-buy-btn')) {
            const herbId = e.target.dataset.herbId;
            buyHerb(herbId);
        }
    });
    
    // 数据管理
    elements.saveGameBtn.addEventListener('click', () => saveGame(false));
    elements.loadGameBtn.addEventListener('click', loadGame);
    elements.exportDataBtn.addEventListener('click', exportGameData);
    
    // 分享
    elements.shareBtn.addEventListener('click', shareGame);
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    initGame();
    
    // 显示欢迎提示
    setTimeout(() => {
        elements.helpModal.classList.remove('hidden');
        elements.helpModal.classList.add('flex');
    }, 500);
});
