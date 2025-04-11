document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("header");
  const subtitle = document.getElementById("subtitle");
  const headerText = "SPIFFE";
  const subtitleText = "Game Developer ~ Audio Wizard";
  let headerIndex = 0;
  let subtitleIndex = 0;

  function typeHeader() {
    if (headerIndex < headerText.length) {
      header.innerHTML += headerText[headerIndex];
      headerIndex++;
      setTimeout(typeHeader, 80);
    } else {
      typeSubtitle();
    }
  }

  function typeSubtitle() {
    if (subtitleIndex < subtitleText.length) {
      subtitle.innerHTML += subtitleText[subtitleIndex];
      subtitleIndex++;
      setTimeout(typeSubtitle, 12);
    } else {
      document.getElementById("contact").style.opacity = 1;
      document.getElementById("name").style.opacity = 1;
      startTimeline();
      loadMailCopy();
    }
  }
  typeHeader();

  function loadMailCopy() {
    const emailLink = document.getElementById("email-link");
    const email = "spiffe84@gmail.com";
    const copyMessage = document.getElementById("copy-message");

    emailLink.addEventListener("click", function (event) {
      event.preventDefault(); // don't fuck around with outlook  and stuff, simply copy the damn mail(!)
      navigator.clipboard.writeText(email).then(function () {
        copyMessage.style.display = "block";
        copyMessage.style.opacity = 1;

        setTimeout(function () {
          copyMessage.style.opacity = 0;
          setTimeout(function () {
            copyMessage.style.display = "none";
          }, 500);
        }, 1500);
      }).catch(function (err) {
        console.error("Copy failed: ", err);
      });
    });
  }
});

// Timeline tree thing
function addJobTitle(stemWrapper, dateText, companyName, companyLink, jobTitle, skills, games) {
  const date = document.createElement("div");
  date.classList.add("date");
  date.innerText = dateText;
  stemWrapper.appendChild(date);

  const writing = document.createElement("div");
  writing.classList.add("writing");

  let companyNameElement;
  if (companyLink && companyLink !== "#") {
    companyNameElement = document.createElement("a");
    companyNameElement.href = companyLink;
    companyNameElement.classList.add("company-name");
    companyNameElement.target = "_blank";
    companyNameElement.innerText = companyName;
    writing.appendChild(companyNameElement);
    writing.appendChild(document.createElement("br"));
  } else {
    companyNameElement = document.createElement("div");
    companyNameElement.classList.add("company-name");
    companyNameElement.innerText = companyName;
    writing.appendChild(companyNameElement);
  }

  const jobTitleElement = document.createElement("div");
  jobTitleElement.classList.add("job-title");
  jobTitleElement.innerText = jobTitle;

  const skillsElement = document.createElement("div");
  skillsElement.classList.add("skills");
  skillsElement.innerHTML = skills.map(skill => `<br>${skill}`).join("");

  writing.appendChild(jobTitleElement);

  if (games && games.length > 0) {
    const gameContainer = document.createElement("div");
    games.forEach(game => {
      const gameLinkElement = document.createElement("a");
      gameLinkElement.href = game.link;
      gameLinkElement.classList.add("game-link");
      gameLinkElement.target = "_blank";
      gameLinkElement.innerText = `${game.name}`;
      gameContainer.appendChild(gameLinkElement);
      gameContainer.appendChild(document.createElement("br"));
    });
    writing.appendChild(gameContainer);
  }
  writing.appendChild(skillsElement);

  stemWrapper.appendChild(writing);
}

// Draw timeline
function startTimeline() {
  const treeContainer = document.getElementById("tree-container");
  const numLines = 34;

  let wl = 2;
  let fd = 8;
  let fg = 17;
  let sae = 26;
  let usedLines = [wl, fd, fg, sae];

  // Draw lines
  for (let i = 0; i < numLines; i++) {
    const stemWrapper = document.createElement("div");
    stemWrapper.classList.add("tree-stem-wrapper");

    const stem = document.createElement("div");
    stem.classList.add("tree-stem");

    if (usedLines.includes(i)) {
      if (i === wl) {
        addJobTitle(stemWrapper,
          "2024 – 20xx",
          "Walker Labs",
          "https://www.walkerlabs.com",
          "Audio Software Engineer",
          ["Unreal", "Wwise", "C++"],
          [
            { name: "[Alara Prime]", link: "https://playalara.com/" }
          ]
        );
      }

      if (i === fd) {
        addJobTitle(stemWrapper,
          "2021 – 2024",
          "Fall Damage",
          "#",
          "Audio Programmer",
          ["Unreal", "FMOD", "Wwise", "Unity", "DSP", "C++", "C#"],
          [
            { name: "[Alara Prime]", link: "https://playalara.com/" }
          ]
        );
      }

      if (i === fg) {
        addJobTitle(stemWrapper,
          "2018 – 2021",
          "(EDU) Futuregames",
          "https://futuregames.se/",
          "Game Programmer",
          ["General game-coding", "Source control", "Game engines", "Dev-workflow"],
          [
            { name: "[Unseen Cradle]", link: "https://www.youtube.com/watch?v=o8hcWOg34Vk" },
            { name: "[Cargo Busta]", link: "https://www.youtube.com/watch?v=BE6aekXFxFQ" },
            { name: "[SnowScape]", link: "https://www.youtube.com/watch?v=sRQCzghNx1Q" },
            { name: "[In Between]", link: "https://www.youtube.com/watch?v=j4_2VheEmvU" }
          ]
        );
      }

      if (i === sae) {
        addJobTitle(stemWrapper,
          "2009 – 2011",
          "(EDU) SAE",
          "https://www.sae.org/",
          "Audio Production Program",
          ["Live sound engineering", "Mixing/Mastering", "DAW workflow", "Engineering", "Electronics", "Production"]
        );
      }
    }

    stemWrapper.appendChild(stem);
    treeContainer.appendChild(stemWrapper);

    // Fade tree lines
    setTimeout(function () {
      stem.style.opacity = 1;
    }, 30 * i);

    // Fade text
    if (usedLines.includes(i)) {
      setTimeout(function () {
        const date = stemWrapper.querySelector(".date");
        const writing = stemWrapper.querySelector(".writing");
        if (date) date.style.opacity = 1;
        if (writing) writing.style.opacity = 1;
      }, 40 * i);
    }
  }
}

