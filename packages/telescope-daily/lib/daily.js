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
      sort: {createdAt: -1},
      limit: 0
    }
  };
}