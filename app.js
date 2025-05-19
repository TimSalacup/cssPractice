const videos = document.querySelectorAll("video");
const section2__tabs = document.querySelectorAll(".section2__tab");
let currentSection2Tab = "design";

// CHANGES SECTION 2 WHEN PAGE FULLY LOADS
document.addEventListener("DOMContentLoaded", function () {
  changeSection2Content();
});

// UPDATES currentSection2Tab VARIABLE AND RUNS FUNCTIONS THAT USES SAID VARIABLE.
section2__tabs.forEach((tab) =>
  tab.addEventListener("click", (event) => {
    currentSection2Tab = event.target.innerHTML.toLowerCase();
    toggleActive();
    changeSection2Content();
  })
);

// ADDS CLASS ACTIVE TO SECCTION 2 TABS
const toggleActive = () => {
  section2__tabs.forEach((tab) => {
    if (currentSection2Tab === tab.classList[0]) {
      tab.classList += " active";
    } else tab.classList.remove("active");
  });
};

// CHANGES SECTION 2 CONTENT

const changeSection2Content = () => {
  const section2ContentTitle = document.querySelector(
    ".section2__content--title"
  );
  const section2ContentPara = document.querySelector(
    ".section2__content--para"
  );
  const section2Video = document.querySelector("#section2__video--source");
  const section2VideoPlayer = document.querySelector(".section2__video");
  const section2PhoneVideo = document.querySelector("#phone__video--source");
  const section2PhoneVideoPlayer = document.querySelector(".phone__video");
  const section2IndexArray = ["design", "prototype", "share", "ship"];
  let tabIndex = section2IndexArray.indexOf(currentSection2Tab);

  section2ContentTitle.innerHTML = section2Text[tabIndex].title;
  section2ContentPara.innerHTML = section2Text[tabIndex].para;
  section2Video.src = section2Text[tabIndex].vidSrc;
  section2VideoPlayer.load();
  section2PhoneVideo.src = section2Text[tabIndex + 1].vidSrc;
  section2PhoneVideoPlayer.load();

  setTimeout(() => {
    section2VideoPlayer
      .play()
      .catch((err) => console.warn("Play blocked", err));
    section2PhoneVideoPlayer
      .play()
      .catch((err) => console.warn("Play blocked", err));
  }, 100);
};

// PLAYS THE VIDEOS WHEN THEY GET INTO THE VIEWPORT
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.play();
      } else entry.target.pause();
    });
  },
  { threshold: 0.15 }
);

videos.forEach((video) => {
  observer.observe(video);
  console.log(video);
});

// TEXT FOR SECTION 2
const section2Text = [
  {
    title: "Design in Play or import from Figma.",
    para: "Design on a freeform canvas with access to real native elements like maps, pickers, and input text fields.",
    vidSrc: "./assets/fillerVideo2.mp4",
  },
  {
    title: "Tired of prototypes that don't feel real?",
    para: "Interactions in Play are performant, interruptible, and use Apple's Core Animation so your prototypes use the same tech as a finished mobile app.",
    vidSrc: "./assets/fillerVideo3.mp4",
  },
  {
    title: "Frictionless sharing with Apple App Clips.",
    para: "No web simulations. No app installs. It's the easiest, fastest, highest quality way to share prototypes.",
    vidSrc: "./assets/fillerVideo4.mp4",
  },
  {
    title: "Export your project in Play to Xcode.",
    para: "Export styles, components, full pages & flows directly to Xcode. Integrate external data and keep your Play and Xcode files in sync.",
    vidSrc: "./assets/fillerVideo5.mp4",
  },
  {
    vidSrc: "./assets/fillerVideo6.mp4",
  },
];
