interface Invoice {
  customer: string;
  performances: Performance[];
}

interface Performance {
  playID: string;
  audience: number;
}

interface Statement {
  customer: string;
  performances: Array<{ playName: string; audience: number; amount: string }>;
  totalAmount: string;
  volumeCredits: number;
}

interface Play {
  name: string;
  type: string;
}

interface PrintStrategy {
  print(invoice: Invoice): string
}