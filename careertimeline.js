const jobs = [
  {
    years: "2026 – 20XX",
    company: "TTK Games",
    companyLink: "https://ttkgames.com/",
    title: "Audio Systems Engineer",
    skills: ["Under NDA"],
    projects: [{ name: "[Unannounced Project]", link: "#" }],
    linesUsed: 6
  },
  {
    years: "2024 – 2025",
    company: "Walker Labs",
    companyLink: "#",
    title: "Audio Software Engineer",
    skills: ["Unreal", "Wwise", "C++"],
    projects: [{ name: "[Alara Prime]", link: "https://playalara.com/" }],
    linesUsed: 7
  },
  {
    years: "2021 – 2024",
    company: "Fall Damage",
    companyLink: "#",
    title: "Audio Programmer",
    skills: ["Unreal", "FMOD", "Wwise", "Unity", "DSP", "C++", "C#"],
    projects: [{ name: "[Alara Prime]", link: "https://playalara.com/" }],
    linesUsed: 10
  },
  {
    years: "2018 – 2021",
    company: "(EDU) Futuregames",
    companyLink: "https://futuregames.se/",
    title: "Game Programmer",
    skills: ["General game-coding", "Source control", "Game engines", "Dev-workflow"],
    projects: [
      { name: "[Unseen Cradle]", link: "https://www.youtube.com/watch?v=o8hcWOg34Vk" },
      { name: "[Cargo Busta]", link: "https://www.youtube.com/watch?v=BE6aekXFxFQ" },
      { name: "[SnowScape]", link: "https://www.youtube.com/watch?v=sRQCzghNx1Q" },
      { name: "[In Between]", link: "https://www.youtube.com/watch?v=j4_2VheEmvU" }],
    linesUsed: 11
  },
  {
    years: "2009 – 2011",
    company: "(EDU) SAE",
    companyLink: "https://www.sae.edu/gbr/audio/",
    title: "Audio Production Program",
    skills: ["Live sound engineering", "Mixing/Mastering", "DAW workflow", "Engineering", "Electronics", "Production"],
    linesUsed: 7
  }
];

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
      event.preventDefault();
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
      if (game.link && game.link !== "#") {
        const gameLinkElement = document.createElement("a");
        gameLinkElement.href = game.link;
        gameLinkElement.classList.add("game-link");
        gameLinkElement.target = "_blank";
        gameLinkElement.innerText = `${game.name}`;
        gameContainer.appendChild(gameLinkElement);
        gameContainer.appendChild(document.createElement("br"));
      } else {
        // plain text
        const span = document.createElement("span");
        span.classList.add("game-link"); // reuse same styling
        span.innerText = game.name;
        gameContainer.appendChild(span);
      }
    });
    writing.appendChild(gameContainer);
  }
  writing.appendChild(skillsElement);

  stemWrapper.appendChild(writing);
}

// Draw timeline
function startTimeline() {
  const treeContainer = document.getElementById("tree-container");
  const numLines = 38; // total number of lines
  let currentLine = 0;
  const lineHeight = 21;

  jobs.forEach((job) => {
    const stemWrapper = document.createElement("div");
    stemWrapper.classList.add("tree-stem-wrapper");

    const stem = document.createElement("div");
    stem.classList.add("tree-stem");

    // set height of stem from linesUsed
    stem.style.height = `${job.linesUsed * lineHeight}px`;

    addJobTitle(
      stemWrapper,
      job.years,
      job.company,
      job.companyLink,
      job.title,
      job.skills,
      job.projects || []
    );

    stemWrapper.appendChild(stem);
    treeContainer.appendChild(stemWrapper);

    setTimeout(() => { stem.style.opacity = 1; }, 30 * currentLine);
    setTimeout(() => {
      const date = stemWrapper.querySelector(".date");
      const writing = stemWrapper.querySelector(".writing");
      if (date) date.style.opacity = 1;
      if (writing) writing.style.opacity = 1;
    }, 40 * currentLine);

    currentLine += job.linesUsed;
  });

  // remaining lines = empty stems
  for (let i = currentLine; i < numLines; i++) {
    const stemWrapper = document.createElement("div");
    stemWrapper.classList.add("tree-stem-wrapper");
    const stem = document.createElement("div");
    stem.classList.add("tree-stem");
    treeContainer.appendChild(stemWrapper);
    stemWrapper.appendChild(stem);
    setTimeout(() => { stem.style.opacity = 1; }, 30 * i);
  }
}

