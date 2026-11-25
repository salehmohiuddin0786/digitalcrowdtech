import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel="msedge", headless=True)
        context = await browser.new_context(viewport={'width': 1400, 'height': 900})
        page = await context.new_page()

        console_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
        page.on("pageerror", lambda err: console_errors.append(str(err)))

        print("Navigating to http://localhost:3000/products/enterprise-agency-website-cms ...")
        res = await page.goto("http://localhost:3000/products/enterprise-agency-website-cms", wait_until="networkidle", timeout=30000)
        print("Status:", res.status)

        title = await page.title()
        print("Page Title:", title)

        # Check for headings and key sections
        h1 = await page.inner_text("h1")
        print("H1 Text:", h1)

        # Screenshot full page
        desktop_out = r"C:\Users\NEHA ENTERPRISES\.gemini\antigravity\brain\fdfa4813-5675-49ed-95d8-f63766b2350d\after_enterprise_agency_desktop.png"
        await page.screenshot(path=desktop_out, full_page=True)
        print("Desktop screenshot saved:", desktop_out)

        # Mobile viewport test
        await page.set_viewport_size({'width': 390, 'height': 844})
        await asyncio.sleep(1)
        mobile_out = r"C:\Users\NEHA ENTERPRISES\.gemini\antigravity\brain\fdfa4813-5675-49ed-95d8-f63766b2350d\after_enterprise_agency_mobile.png"
        await page.screenshot(path=mobile_out, full_page=True)
        print("Mobile screenshot saved:", mobile_out)

        # Test lightbox click
        await page.set_viewport_size({'width': 1400, 'height': 900})
        # click first screenshot in gallery
        gallery_items = await page.query_selector_all("section:has-text('Product Interface Gallery') img")
        print(f"Found {len(gallery_items)} gallery items")
        if len(gallery_items) > 0:
            await gallery_items[0].click()
            await asyncio.sleep(0.5)
            lightbox_out = r"C:\Users\NEHA ENTERPRISES\.gemini\antigravity\brain\fdfa4813-5675-49ed-95d8-f63766b2350d\after_enterprise_agency_lightbox.png"
            await page.screenshot(path=lightbox_out)
            print("Lightbox screenshot saved:", lightbox_out)

        if console_errors:
            print("Console Errors:", console_errors)
        else:
            print("No console errors detected!")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
