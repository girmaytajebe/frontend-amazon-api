
import React from "react";
import classes from"./Footer.module.css";

import usFlag from "../../assets/img/us-flag.jpg";


function Footer() {
  const footerData = [
    {
      title: "Get to Know Us",
      items: [
        { text: "Careers", href: "#" },
        { text: "Blog", href: "#" },
        { text: "About Amazon", href: "#" },
        { text: "Investor Relations", href: "#" },
        { text: "Amazon Devices", href: "#" },
        { text: "Amazon Science", href: "#" },
      ],
    },
    {
      title: "Amazon Payment Products",
      items: [
        { text: "Amazon Business Card", href: "#" },
        { text: "Shop with Points", href: "#" },
        { text: "Reload Your Balance", href: "#" },
        { text: "Amazon Currency Converter", href: "#" },
      ],
    },
    {
      title: "Make Money with Us",
      items: [
        { text: "Sell products on Amazon", href: "#" },
        { text: "Sell on Amazon Business", href: "#" },
        { text: "Sell apps on Amazon", href: "#" },
        { text: "Become an Affiliate", href: "#" },
        { text: "Advertise Your Products", href: "#" },
        { text: "Self-Publish with Us", href: "#" },
        { text: "Host an Amazon Hub", href: "#" },
        { text: "See More Make Money with Us", href: "#" },
      ],
    },

    {
      title: "Let Us Help You",
      items: [
        { text: "Amazon and COVID-19", href: "#" },
        { text: "Your Account", href: "#" },
        { text: "Your Orders", href: "#" },
        { text: "Shipping Rates & Policies", href: "#" },
        { text: "Amazon Prime", href: "#" },
        { text: "Returns & Replacements", href: "#" },
        { text: "Manage Your Content and Devices", href: "#" },
        { text: "Amazon Assistant", href: "#" },
        { text: "Help", href: "#" },
      ],
    },
  ];
  return (
    <div className={classes.footer}>
      <div className={classes.backToTop} id="back">
        <span>
          <a href="#" className="header__clearlink">
            Back to top
          </a>
        </span>
      </div>
      <div className={classes.footer__container} >
        {footerData.map((section, index) => (
          <ul key={index} className="col-6 col-md-3 ">
            <h3>{section.title}</h3>
            {section.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                <a href={item.href}>{item.text}</a>
              </li>
            ))}
          </ul>
        ))}
      </div>
  
      <div className={classes.footer__credit }>
        <h4>
          Built by:-
          <a href="https://girmay23.com/" target="_blank" rel="noreferrer">
            {" "}
            (Girmay Abebe)
          </a>
        </h4>
      </div>
    </div>
  );
}

export default Footer;
