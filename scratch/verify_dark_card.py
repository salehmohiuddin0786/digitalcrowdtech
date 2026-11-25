import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel='msedge', headless=True)
        page = await browser.new_page(viewport={'width': 1400, 'height': 900})
        await page.goto('http://localhost:3000/products/quickkirana-retail-ecommerce', wait_until='networkidle')

        await page.evaluate("""() => {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
        }""")
        await asyncio.sleep(0.5)

        why_card = page.locator("section:has-text('Built for Real Business Operations')").first
        out = r'C:\Users\NEHA ENTERPRISES\.gemini\antigravity\brain\fdfa4813-5675-49ed-95d8-f63766b2350d\fixed_why_choose_darkmode.png'
        await why_card.screenshot(path=out)
        print('Darkmode snapshot saved:', out)
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
