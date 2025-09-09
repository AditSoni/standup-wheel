# 🎡 Standup Wheel

A simple browser extension that spins a wheel to randomly pick someone for your daily standup…  
or decide who’s gonna jump out of a plane. ✈️🪂  

Perfect for teams that want to keep things light and fun during standups!

---

## 🚀 Features
- 🎯 Randomly pick a person from the wheel.  
- 🖱️ One-click spin from your browser toolbar.  
- ⚡ Works on Chrome (and Chromium-based browsers) and Firefox.  
- 🤹 Keep your standups engaging and fair.

---

## 🛠️ Installation

### 🔹 Chrome (Chromium-based browsers)
1. Open `chrome://extensions` in your browser.  
2. Enable **Developer Mode** (top right).  
3. Click **Load unpacked**.  
4. Select the `standup-wheel/` folder.  
5. Click the extension icon → click to spin! 🎡  

### 🔹 Firefox
1. Open `about:debugging#/runtime/this-firefox` in your browser.  
2. Click **Load Temporary Add-on**.  
3. Select the `manifest.json` from the `standup-wheel/` folder.  
4. Click the extension icon and spin away!  

---

## 🧑‍💻 Customization

You can set **default names** in the wheel by editing `popup.js`.  
Inside the file, update the `defaultNames` array with your team members:  

```js
// popup.js

// You can update this list with default names of your choice
const defaultNames = [
  "Alice",
  "Bob",
  "Charlie"
];
````

Now reload the extension and your updated list will appear in the wheel. 🎡

---

## 📜 License

MIT License – free to use, modify, and share.

---

## ❤️ Credits

Made with vibe coding 😎 and way too many standups.

