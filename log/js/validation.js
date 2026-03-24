function encryptPassword(text) {
  const encoder = new TextEncoder();
  return crypto.subtle.digest("SHA-256", encoder.encode(text)).then((buffer) => {
    const bytes = new Uint8Array(buffer);
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  });
}
