Object.values(squirrelAnimations).forEach(season => {
  Object.values(season).forEach(src => {
    const img = new Image();
    img.src = src;
  });
});
