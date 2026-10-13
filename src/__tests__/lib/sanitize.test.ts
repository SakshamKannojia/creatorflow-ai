import { describe, it, expect } from "vitest";
import { sanitizeHtml, sanitizePlainText } from "@/lib/sanitize";

describe("Sanitization Utilities (Phase 1.4)", () => {
  describe("sanitizeHtml", () => {
    it("strips malicious script tags", () => {
      const malicious = '<p>Hello <script>alert("xss")</script>world</p>';
      const sanitized = sanitizeHtml(malicious);
      expect(sanitized).toBe("<p>Hello world</p>");
      expect(sanitized).not.toContain("<script>");
    });

    it("strips malicious inline onerror attributes", () => {
      const malicious = '<img src="x" onerror="alert(1)" />Safe text';
      const sanitized = sanitizeHtml(malicious);
      expect(sanitized).not.toContain("onerror");
      expect(sanitized).not.toContain("<img");
      expect(sanitized).toContain("Safe text");
    });

    it("preserves safe formatting tags", () => {
      const formatted = "<strong>Bold</strong> and <em>Italic</em> with <br>";
      const sanitized = sanitizeHtml(formatted);
      expect(sanitized).toBe("<strong>Bold</strong> and <em>Italic</em> with <br>");
    });

    it("handles null and undefined gracefully", () => {
      expect(sanitizeHtml(null)).toBe("");
      expect(sanitizeHtml(undefined)).toBe("");
      expect(sanitizeHtml("")).toBe("");
    });
  });

  describe("sanitizePlainText", () => {
    it("strips all HTML tags from plain text inputs", () => {
      const input = "<h1>Viral Hook</h1> <script>stealCookies()</script>";
      expect(sanitizePlainText(input)).toBe("Viral Hook");
    });

    it("trims whitespace", () => {
      const input = "   Clean Title   ";
      expect(sanitizePlainText(input)).toBe("Clean Title");
    });
  });
});
