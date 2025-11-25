// This calculates the CCS (Community Credit Score)
// Base Score: 300
// Max Score: 900

export const calculateScore = (transactions: any[]) => {
  let score = 300; // Starting Score

  // 1. Frequency Bonus: +5 points for every transaction (Shows activity)
  score += transactions.length * 5;

  // 2. Volume Bonus: +1 point for every ₹100 exchanged
  const totalVolume = transactions.reduce((sum, t) => sum + t.amount, 0);
  score += Math.floor(totalVolume / 100);

  // 3. Dispute Penalty: -50 points if you have a disputed transaction
  const disputes = transactions.filter(t => t.isDisputed).length;
  score -= (disputes * 50);

  // 4. Good Borrower Bonus: If debt is cleared (credits match debits), +50
  const credit = transactions.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0);
  const debit = transactions.filter(t => t.type === 'debit').reduce((s, t) => s + t.amount, 0);
  
  if (debit >= credit && credit > 0) {
    score += 50; 
  }

  // Cap the score between 300 and 900
  if (score > 900) return 900;
  if (score < 300) return 300;
  
  return score;
};