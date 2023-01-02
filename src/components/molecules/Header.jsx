import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import "./test.css";
const Header = (props) => {
  useEffect(() => {
    var list = document.querySelectorAll(".navigation li");
    function activeLink() {
      list.forEach((item) => {
        item.classList.remove("hovered");
      });
      this.classList.add("hovered");
    }
    list.forEach((item) => item.addEventListener("mouseover", activeLink));
    // Menu Toggle
    let toggle = document.querySelector(".toggle");
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");
    toggle.onclick = function () {
      navigation.classList.toggle("active");
      main.classList.toggle("active");
    };

  }, []);
  return (
    <div className="container">
      <div className="navigation">
        <ul>
          <li>
            <Link>
              <span className="icon p-3">
                <img src="student.png" alt="" width="30px" />
              </span>
              <span className="title">{props.name}</span>
            </Link>
          </li>

          <li id="dash">
            <a href="#">
              <span className="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className="title">Dashboard</span>
            </a>
          </li>

          <li id="test">
            <a href="#">
              <span className="icon">
                <ion-icon name="people-outline"></ion-icon>
              </span>
              <span className="title">Test</span>
            </a>
          </li>

          <li>
            <a href="/#contact">
              <span className="icon">
                <ion-icon name="chatbubble-outline"></ion-icon>
              </span>
              <span className="title">Messages</span>
            </a>
          </li>

          <li>
            <a href="/home">
              <span className="icon">
                <ion-icon name="help-outline"></ion-icon>
              </span>
              <span className="title">Help</span>
            </a>
          </li>

          <li id="set">
            <a href="#">
              <span className="icon">
                <ion-icon name="settings-outline"></ion-icon>
              </span>
              <span className="title">Settings</span>
            </a>
          </li>

          <li id="pass">
            <a href="#">
              <span className="icon">
                <ion-icon name="lock-closed-outline"></ion-icon>
              </span>
              <span className="title">Password</span>
            </a>
          </li>

          <li>
            <a href="/teach">
              <span className="icon">
                <ion-icon name="log-out-outline"></ion-icon>
              </span>
              <span className="title">Sign Out</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="main">
        <div className="topbar">
          <div className="toggle">
            <ion-icon name="menu-outline"></ion-icon>
          </div>

          <div className="search">
            <label>
              <input type="text" placeholder="Search here" />
              <ion-icon name="search-outline"></ion-icon>
            </label>
          </div>

          <div className="user" id="profile">
            <img src="user.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
