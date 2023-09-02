const tabData = [
  {
    id: 1,
    tabLabel: 'Capsule',
    tabImage: 'https://cdn-icons-png.flaticon.com/512/2008/2008160.png',
  },
  {
    id: 2,
    tabLabel: 'Tablet',
    tabImage: 'https://cdn-icons-png.flaticon.com/512/2008/2008164.png',
  },
  {
    id: 3,
    tabLabel: 'Spray',
    tabImage: 'https://cdn-icons-png.flaticon.com/512/8295/8295756.png',
  },
  {
    id: 4,
    tabLabel: 'Injection',
    tabImage: 'https://cdn-icons-png.flaticon.com/512/3359/3359296.png',
  },
  {
    id: 5,
    tabLabel: 'Syrup',
    tabImage: 'https://cdn-icons-png.flaticon.com/512/6944/6944115.png',
  },
  {
    id: 6,
    tabLabel: 'Cream',
    tabImage: 'https://cdn-icons-png.flaticon.com/512/906/906672.png',
  },
  {
    id: 7,
    tabLabel: 'Drops',
    tabImage: 'https://cdn-icons-png.flaticon.com/512/67/67780.png',
  },
];

const foodStatusList = [
  {
    id: 1,
    intake: 'After Meal',
    // tabImage: 'https://cdn-icons-png.flaticon.com/512/2008/2008160.png',
  },
  {
    id: 2,
    intake: 'Before Meal',
    // tabImage: 'https://cdn-icons-png.flaticon.com/512/2008/2008160.png',
  },

  {
    id: 3,
    intake: 'Before Sleep',
    // tabImage: 'https://cdn-icons-png.flaticon.com/512/2008/2008160.png',
  },

  {
    id: 4,
    intake: 'Empty Stomach',
    // tabImage: 'https://cdn-icons-png.flaticon.com/512/2008/2008160.png',
  },
];

const timeOfDay = [
  {id: 1, intakeTime: 'Morning'},
  {id: 2, intakeTime: 'AfterNoon'},
  {id: 3, intakeTime: 'Evening'},
  {id: 4, intakeTime: 'Night'},
];

const COLORS = {
  PRIMARY_COLOR: '#526BF2',
  DARKISH_BLACK: '#242B2E',
  BLACK: '#0D0D0D',
  BLUE: '#383CC1',
  REDDISH: '#FF6263',
  RED: '#F53920',
  LIGHT_BLUE: 'rgba(82,107,242,0.1)',
  WHITE: '#FFFFFF',
};

export {tabData, COLORS, foodStatusList, timeOfDay};
