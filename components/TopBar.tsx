export default function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar__left">
        <div className="topbar__socials">
          <a href="#" aria-label="TikTok"><i className="fab fa-tiktok" /></a>
          <a href="#" aria-label="Instagram"><i className="fab fa-instagram" /></a>
          <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
          <a href="#" aria-label="YouTube"><i className="fab fa-youtube" /></a>
        </div>
      </div>
      <div className="topbar__right">
        <a href="https://wa.me/33757754774" target="_blank" rel="noopener noreferrer">
          💬 +33 7 57 75 47 74
        </a>
        <a href="mailto:contact@permisexpress.fr">
          ✉ contact@permisexpress.fr
        </a>
      </div>
    </div>
  )
}
