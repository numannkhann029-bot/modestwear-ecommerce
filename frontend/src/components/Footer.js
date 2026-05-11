import React, { useState } from "react";

function Footer() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) return setMsg("⚠️ Enter email");

    setMsg("✅ Subscribed successfully!");
    setEmail("");

    setTimeout(() => setMsg(""), 2000);
  };

  return (
    <>
      {/* 🌊 WAVE */}
      <div style={styles.wave}>
        <svg viewBox="0 0 1440 120" style={styles.svg}>
          <path
            fill="#fff7f2"
            d="M0,64L80,74.7C160,85,320,107,480,101.3C640,96,800,64,960,58.7C1120,53,1280,75,1360,85.3L1440,96V0H0Z"
          ></path>
        </svg>
      </div>

      {/* 🔻 FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.content}>
          <h3 style={styles.logo}>ModestWear</h3>
          <p style={styles.tagline}>Style that defines you ✨</p>

          {/* 📩 NEWSLETTER */}
          <form onSubmit={handleSubscribe} style={styles.newsletter}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.subscribeBtn}>
              Subscribe
            </button>
          </form>

          {msg && <p style={styles.msg}>{msg}</p>}

          {/* 🔗 SOCIAL LINKS */}
          <div style={styles.socials}>
            <a
              href="https://instagram.com/numannn____"
              target="_blank"
              rel="noreferrer"
              style={styles.icon}
            >
              🅾 @numannn____
            </a>

            <a
              href="https://instagram.com/_.zayan_.25"
              target="_blank"
              rel="noreferrer"
              style={styles.icon}
            >
              🅾 @_.zayan_.25
            </a>

            <a href="#" style={styles.icon}>💼 LinkedIn</a>
            <a href="#" style={styles.icon}>🐙 GitHub</a>
            <a href="#" style={styles.icon}>🐦 Twitter</a>
          </div>

          <p style={styles.copy}>
            © 2026 ModestWear | All Rights Reserved ❤️
          </p>
        </div>
      </footer>

      {/* 🎯 FLOATING WHATSAPP */}
      <a
        href="https://wa.me/+91 7276506586"
        target="_blank"
        rel="noreferrer"
        style={styles.whatsapp}
      >
        💬
      </a>
    </>
  );
}

export default Footer;

/* 🎨 PREMIUM STYLES */
const styles = {
  wave: {
    lineHeight: 0,
  },

  svg: {
    display: "block",
    width: "100%",
  },

  footer: {
    padding: "40px 20px",
    background: "linear-gradient(135deg, #ffecd2, #fcb69f)",
    textAlign: "center",
    color: "#5a3e36",
  },

  content: {
    maxWidth: "600px",
    margin: "auto",
  },

  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "5px",
  },

  tagline: {
    fontSize: "14px",
    marginBottom: "20px",
    opacity: 0.8,
  },

  /* 📩 NEWSLETTER */
  newsletter: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "10px",
    flexWrap: "wrap",
  },

  input: {
    padding: "10px",
    borderRadius: "20px",
    border: "1px solid #ddd",
    outline: "none",
    width: "200px",
  },

  subscribeBtn: {
    padding: "10px 15px",
    borderRadius: "20px",
    border: "none",
    background: "#ff8a65",
    color: "#fff",
    cursor: "pointer",
  },

  msg: {
    fontSize: "13px",
    marginBottom: "15px",
  },

  socials: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "15px",
  },

  icon: {
    textDecoration: "none",
    fontSize: "14px",
    color: "#5a3e36",
    padding: "6px 12px",
    borderRadius: "20px",
    background: "#fff",
    transition: "0.3s",
  },

  copy: {
    fontSize: "13px",
    opacity: 0.7,
  },

  /* 🎯 WHATSAPP FLOAT */
  whatsapp: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "#25D366",
    color: "#fff",
    fontSize: "22px",
    padding: "12px",
    borderRadius: "50%",
    textDecoration: "none",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  },
};