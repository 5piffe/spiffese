function setSeasonTheme(season) {
  document.body.classList.remove('winter', 'spring', 'summer', 'autumn');
  document.body.classList.add(season);
  localStorage.setItem('season', season);
}

function autoDetectSeason() {
  const month = new Date().getMonth() + 1;
  console.log("Month: " + month);
  let season = 'spring'; // Default

  if (month === 12 || month <= 2) {
    season = 'winter';
  } else if (month >= 3 && month <= 5) {
    season = 'spring';
  } else if (month >= 6 && month <= 8) {
    season = 'summer';
  } else {
    season = 'autumn';
  }
  console.log(`month [${month}] --> season set to [${season}]`);
  setSeasonTheme(season);
}

// Let's keep this here, since these animations could be season and/or other theme specific
const squirrelAnimations = {
  base: {
    // UP (jump?)
    // DOWN (fall?)
    RUN_LEFT: "animations/squirrel/base/squirrel_runleft_base.gif",
    RUN_RIGHT: "animations/squirrel/base/squirrel_runright_base.gif",

    BLOCKED_LEFT: "animations/squirrel/base/squirrel_blockedleft_base.gif",
    BLOCKED_RIGHT: "animations/squirrel/base/squirrel_blockedright_base.gif",

    IDLE_LEFT: "animations/squirrel/base/squirrel_idleleft_base.gif",
    IDLE_RIGHT: "animations/squirrel/base/squirrel_idleright_base.gif"
  },
  spring: {
    RUN_LEFT: "animations/squirrel/spring/squirrel_runleft_spring.gif",
    RUN_RIGHT: "animations/squirrel/spring/squirrel_runright_spring.gif",

    BLOCKED_LEFT: "animations/squirrel/spring/squirrel_blockedleft_spring.gif",
    BLOCKED_RIGHT: "animations/squirrel/spring/squirrel_blockedright_spring.gif",

    IDLE_LEFT: "animations/squirrel/spring/squirrel_idleleft_spring.gif",
    IDLE_RIGHT: "animations/squirrel/spring/squirrel_idleright_spring.gif"
  },
  summer: {
    RUN_LEFT: "animations/squirrel/summer/squirrel_runleft_summer.gif",
    RUN_RIGHT: "animations/squirrel/summer/squirrel_runright_summer.gif",

    BLOCKED_LEFT: "animations/squirrel/summer/squirrel_blockedleft_summer.gif",
    BLOCKED_RIGHT: "animations/squirrel/summer/squirrel_blockedright_summer.gif",

    IDLE_LEFT: "animations/squirrel/summer/squirrel_idleleft_summer.gif",
    IDLE_RIGHT: "animations/squirrel/summer/squirrel_idleright_summer.gif"
  },

  // Add other season anims...
}

function GetSquirrelAnimation(direction) {
  let season = localStorage.getItem("season") || "base";
  if (!(season in squirrelAnimations)) {
    season = "base";
  }
  return squirrelAnimations[season][direction];
}

autoDetectSeason();
