/**
 * Generate a random Stellar-style public address
 * Stellar public keys start with "G"
 */
export function createMockWallet() {
  const randomKey = Array.from({ length: 55 }, () =>
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"[Math.floor(Math.random() * 32)]
  ).join("");

  const address = `G${randomKey.slice(0, 55)}`;

  return {
    publicKey: address,
    secretKey: `S${randomKey.slice(0, 55)}`,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Simulate balance checking for a Stellar address
 */
export async function getMockBalance(address: string) {
  simulateRandomError(0.1); 

  await simulateNetworkDelay();

  return {
    address,
    balance: (Math.random() * 1000 + 10).toFixed(2), 
    asset: "XLM",
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Simulate a Stellar transaction submission
 */
export async function submitMockTransaction({
  from,
  to,
  amount,
}: {
  from: string;
  to: string;
  amount: number;
}) {
  simulateRandomError(0.15); 

  await simulateNetworkDelay();

  return {
    transactionHash: generateMockTxHash(),
    from,
    to,
    amount,
    status: "success",
    ledger: Math.floor(Math.random() * 1000000),
    timestamp: new Date().toISOString(),
  };
}

/**
 * Simulate credential verification
 */
export async function verifyMockCredential(credentialId: string) {
  simulateRandomError(0.1);

  await simulateNetworkDelay();

  return {
    credentialId,
    verified: Math.random() > 0.2, // 80% verified
    issuer: "Learnault Authority",
    verifiedAt: new Date().toISOString(),
  };
}

/**
 * Format Stellar address for UI display
 */
export function formatAddress(address: string, chars = 4) {
  if (!address) return "";

  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

/**
 * Simulate network latency (500–1500ms)
 */
function simulateNetworkDelay() {
  const delay = Math.random() * 1000 + 500;

  return new Promise((resolve) => setTimeout(resolve, delay));
}

/**
 * Simulate random blockchain-style failure
 */
function simulateRandomError(probability: number) {
  if (Math.random() < probability) {
    throw new Error("Mock Stellar network error. Please try again.");
  }
}

/**
 * Generate fake transaction hash
 */
function generateMockTxHash() {
  return Array.from({ length: 64 }, () =>
    "abcdef0123456789"[Math.floor(Math.random() * 16)]
  ).join("");
}