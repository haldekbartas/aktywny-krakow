// kontroler statystyk
function StatsCtrl($scope, eventRepository) {
  $scope.statsData = {
    bindto: "#chart",
    data: {
      columns: [
  	       ["Sport", 0],
  	       ["Chill-out", 100]
      ],
      type: "pie"
    }
  };

  eventRepository.getEvents()
    .then(eventRepository.filterEvents)
    .then(events => {
      const { sportEvents, chillOutEvents } = events;
      $scope.statsData.data.columns = [
        ["Sport", sportEvents.length],
        ["Chill-out", chillOutEvents.length]
      ];

      bb.generate($scope.statsData);
    })
    .catch(console.error);
}

export default StatsCtrl;
