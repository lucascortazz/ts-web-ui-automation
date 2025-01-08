"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
function googleSearch(query) {
    return __awaiter(this, void 0, void 0, function* () {
        // Launch browser
        const browser = yield puppeteer_1.default.launch({ headless: false });
        const page = yield browser.newPage();
        // Navigate to Google
        yield page.goto('https://www.google.com');
        // Type the query into the search box
        yield page.type('input[name="q"]', query);
        // Press Enter to submit the search
        yield page.keyboard.press('Enter');
        // Wait for the results page to load
        yield page.waitForSelector('h3');
        // Extract the titles of the search results
        const results = yield page.evaluate(() => {
            const titles = Array.from(document.querySelectorAll('h3'));
            return titles.map(title => title.innerText);
        });
        // Log the results
        console.log('Search results:');
        results.forEach((title, index) => {
            console.log(`${index + 1}: ${title}`);
        });
        // Close the browser
        yield browser.close();
    });
}
// Run the function with your desired search query
googleSearch('TypeScript automation tutorial').catch(console.error);
