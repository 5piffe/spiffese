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

autoDetectSeason();
