export const calculateCCS = (
    repaymentPunctuality: number, // 0-100
    ledgerConsistency: number,    // 0-100
    freqTrans: number,            // 0-100
    ratings: number               // 0-100
  ): number => {
    // Formula: 300 + (Weights)
    // We scale the inputs to match the 1000 max score logic
    const score = 300 + 
      (repaymentPunctuality * 4) + 
      (ledgerConsistency * 1.5) +   
      (freqTrans * 1) +          
      (ratings * 0.5);             
      
    // Ensure it doesn't exceed 1000
    return Math.min(1000, Math.floor(score));
};