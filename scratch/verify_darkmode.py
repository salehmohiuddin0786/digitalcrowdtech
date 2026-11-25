import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel='msedge', headless=True)
        page = await browser.new_page(viewport={'width': 1400, 'height': 900})
        await page.goto('http://localhost:3000/products/enterprise-agency-website-cms', wait_until='networkidle')

        # Set dark mode
        await page.evaluate("""() => {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
        }""")
        await asyncio.sleep(0.5)

        dark_out = r'C:\Users\NEHA ENTERPRISES\.gemini\antigravity\brain\fdfa4813-5675-49ed-95d8-f63766b2350d\after_enterprise_agency_darkmode.png'
        await page.screenshot(path=dark_out, full_page=True)
        print('Dark mode screenshot saved:', dark_out)
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
