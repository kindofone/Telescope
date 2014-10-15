viewNav.push({
  route: 'postsDaily',
  label: 'Daily'
});

viewParameters.daily = function (terms) {
  return {
    find: {
      postedAt: {
        $gte: terms.after
      }
    },
    options: {
      limit: 0
    }
  };
}