const form = document.querySelector("form");
const input = document.querySelector("#link-input");
const errorMsg = document.querySelector(".error-msg");
const linksContainer = document.querySelector(".links-container");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputURL = input.value;
  if (inputURL === "") {
    input.classList.add("invalid");
    errorMsg.classList.add("visible");
  } else {
    input.classList.remove("invalid");
    errorMsg.classList.remove("visible");
  }
  input.value = "";
  callAPI(inputURL);
});

let apiURL = "https://api.shrtco.de/v2/shorten?url=";

const callAPI = (inputURL) => {
  fetch(`${apiURL + inputURL}`)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      if (data.ok === true) {
        renderOutput(inputURL, data.result.full_short_link);
      } else {
        input.classList.add("invalid");
      }
    });
};

const renderOutput = (input, shortenUrl) => {
  const link = `
    <li class="link">
        <span class="original-link">https://${input}</span>
        <div class="result">
          <span class="result-link">${shortenUrl}</span>
          <button class="copy-btn">Copy</button>
        </div>
    </li>
    `;
  linksContainer.insertAdjacentHTML("afterbegin", link);

  let resultLink = document.querySelector(".result-link").innerHTML;
  const copyBtn = document.querySelector(".copy-btn");

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(resultLink);
      console.log("content copied");
      copyBtn.innerText = "Copied!";
      copyBtn.classList.add("copied");
    } catch (err) {
      console.error("failed", err);
    }
  };
  copyBtn.addEventListener("click", copyLink);
};

// DROPDOWN MENU

const mobileMenuBtn = document.querySelector(".mobile-menu");
const mobileNav = document.querySelector(".nav-wrapper");

mobileMenuBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
});
