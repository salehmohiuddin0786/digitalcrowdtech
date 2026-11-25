import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel="msedge", headless=True)
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        await page.goto("http://localhost:3000", wait_until="networkidle")
        
        btn = page.locator("a:has-text('Explore Product')").first
        print("Href:", await btn.get_attribute("href"))
        await btn.scroll_into_view_if_needed()
        await page.wait_for_timeout(500)
        
        # Click with wait for URL
        async with page.expect_navigation():
            await btn.click()
            
        print("URL after navigation:", page.url)
        await browser.close()

asyncio.run(run())
