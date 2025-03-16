import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <a
        href="https://github.com/bencodes-au"
        target="_blank"
        rel="noopener noreferrer"
        className="text-2xl hover:text-gray-400 transition"
      >
        <FaGithub />
      </a>
      <a
        href="https://www.linkedin.com/in/ben-gorman-bb705a323"
        target="_blank"
        rel="noopener noreferrer"
        className="text-2xl hover:text-gray-400 transition"
      >
        <FaLinkedin />
      </a>
    </footer>
  );
};

export default Footer;
