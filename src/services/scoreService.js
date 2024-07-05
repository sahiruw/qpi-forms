const calculateScoreOfEvent = (events) => {
  for (let event of events) {
    let correctOrder = event.Bottles;
    let attempts = event.Attempts;

    let totalScore = 0;
    for (let attempt of attempts) {
      let guessedOrder = attempt.Guesses;

      // Calculate the score based on correct guesses
      let score = guessedOrder.reduce((acc, guess, i) => {
        return acc + (guess === correctOrder[i] ? 1 : 0);
      }, 0);
      totalScore += score/guessedOrder.length;
      attempt["Result"] = {
        Score: score/guessedOrder.length,
        Correct : score,
        Total : guessedOrder.length
      };
    }
    event["AverageScore"] = (totalScore/attempts.length).toFixed(2)
  }

  return events
};

export { calculateScoreOfEvent };
