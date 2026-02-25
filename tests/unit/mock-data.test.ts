import { describe, it, expect } from "vitest";
import {
  mockModules,
  mockUsers,
  mockTransactions,
  mockCredentials,
  mockEmployers,
  mockCandidates,
  getModulesByCategory,
  sortModulesByDifficulty,
  getUserTransactions,
  getUsersByLearningStage,
  getFullCandidateProfile,
  sortTransactionsByDateDesc,
} from "../../lib/mock-data";

describe("Mock Data", () => {
  it("should export mock diverse arrays with data", () => {
    expect(mockModules.length).toBeGreaterThan(0);
    expect(mockUsers.length).toBeGreaterThan(0);
    expect(mockTransactions.length).toBeGreaterThan(0);
    expect(mockCredentials.length).toBeGreaterThan(0);
    expect(mockEmployers.length).toBeGreaterThan(0);
    expect(mockCandidates.length).toBeGreaterThan(0);
  });

  it("should have various categories for modules", () => {
    const categories = Array.from(new Set(mockModules.map((m) => m.category)));
    expect(categories.length).toBeGreaterThan(1); // Diverse categories
  });

  describe("Helper Functions", () => {
    it("getModulesByCategory filters modules correctly", () => {
      const web3Modules = getModulesByCategory("Web3");
      expect(web3Modules.every((m) => m.category === "Web3")).toBe(true);
      expect(web3Modules.length).toBeGreaterThan(0);
    });

    it("sortModulesByDifficulty sorts Beginner -> Intermediate -> Advanced", () => {
      const sorted = sortModulesByDifficulty(mockModules);
      const first = sorted[0];
      const last = sorted[sorted.length - 1];
      expect(first.difficulty).toBe("Beginner");
      expect(last.difficulty).toBe("Advanced");
    });

    it("getUserTransactions returns transactions for specific user only", () => {
      const userId = "usr-001";
      const userTx = getUserTransactions(userId);
      expect(userTx.every((tx) => tx.userId === userId)).toBe(true);
      expect(userTx.length).toBeGreaterThan(0);
    });

    it("getUsersByLearningStage correctly filters users", () => {
      const advancedUsers = getUsersByLearningStage("Advanced");
      expect(advancedUsers.every((u) => u.learningStage === "Advanced")).toBe(true);
      expect(advancedUsers.length).toBeGreaterThan(0);
    });

    it("getFullCandidateProfile merges candidate and user info", () => {
      const profile = getFullCandidateProfile("can-001");
      expect(profile).not.toBeNull();
      expect(profile?.user.name).toBe("Charlie Brown"); // Known linked user
      expect(profile?.skills).toContain("React");
    });

    it("sortTransactionsByDateDesc sorts newest to oldest", () => {
      const sorted = sortTransactionsByDateDesc(mockTransactions);
      const isSorted = sorted.every((tx, i) => {
        if (i === 0) return true;
        return new Date(tx.date) <= new Date(sorted[i - 1].date);
      });
      expect(isSorted).toBe(true);
    });
  });
});
