(() => {
  // extension/element.ts
  function element(name, attributes, children) {
    const element2 = document.createElement(name);
    if (attributes) {
      for (const [name2, value] of Object.entries(attributes)) {
        element2.setAttribute(name2, value);
      }
    }
    if (children) {
      element2.append(...children);
    }
    return element2;
  }

  // extension/annoyances/scams.ts
  var SCAMS = [
    [
      "credit-card.jpeg",
      "\u{1F947} You ship: Just your credit card details.We promise to ship: double the money!!! Only for 3 minutes! \u{1F4A1}\u{1F4CC}\u{1F4CC} GET yOURS NOW or else,"
    ],
    [
      "orpheus-picos.jpeg",
      "\u{1FAF8}\u{1FAF8} GET 100 free better than official ORPHEUS PICOS now now nwo!!!!!! OMG get it wee ned STUFF, not to totaly steal your \u{1F979}\u{1F979} MONEY.."
    ],
    [
      "framework.jpeg",
      "Why would you buy something that breaks forever, when you can have something that still breaks but can fix with work and money? Really? I need to know! I'm like dying here."
    ],
    [
      "rpi.jpeg",
      "Make a terminal app in #terminal-craft and get a free Raspberry Pi! Just kidding, we'll take your money and give you nothing. But you can still make a terminal app."
    ],
    [
      "scrapyard.png",
      "Go to cloudflare (for absolutely free!!1!1!!!!), make a silly project, and get totally absolutely free prizes!! Somehow exists all around the world!!"
    ]
  ];
  var popups = 0;
  addEventListener("scroll", () => {
    if (Math.random() < 0.95 || popups >= 5) return;
    popups += 1;
    const scam = SCAMS[Math.floor(Math.random() * SCAMS.length)];
    const image = element("img", {
      src: chrome.runtime.getURL(`./images/${scam[0]}`)
    });
    const text = element("p", void 0, [scam[1]]);
    const button = element("button", void 0, ["Close forever"]);
    button.addEventListener("click", () => {
      popup.remove();
      popups -= 1;
    });
    const popup = element("div", { class: "popup" }, [
      image,
      text,
      button
    ]);
    const width = 300 + 300 * Math.random();
    popup.style.left = `${(innerWidth - width) * Math.random()}px`;
    popup.style.width = `${width}px`;
    document.body.append(popup);
    requestAnimationFrame(() => {
      popup.style.top = `${(innerHeight - popup.clientHeight) * Math.random()}px`;
    });
  });

  // extension/annoyances/crank.ts
  var overlay = element("div", { class: "overlay" });
  document.body.append(overlay);
  function crank(opacity) {
    console.log(opacity);
    overlay.style.opacity = `${opacity}`;
  }

  // extension/annoyances/humidity.ts
  function humidity(humidity2) {
    console.log("Humidity:", humidity2);
  }

  // extension/annoyances/distance.ts
  function distance(distance2) {
    const size = Math.min(Math.max(distance2, 2), 75) / 75;
    console.log("Using size:", size, "from distance:", distance2);
  }

  // extension/dom.ts
  var websocket = new WebSocket("ws://localhost:8000");
  websocket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    console.log("etauhoeush", message);
    if (message.type === "crank") {
      crank(message.value);
    }
    if (message.type === "humidity") {
      humidity(message.value);
    }
    if (message.type === "distance") {
      distance(message.value);
    }
  });
})();
