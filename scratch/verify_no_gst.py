import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel="msedge", headless=True)
        page = await browser.new_page(viewport={"width": 1400, "height": 900})

        # 1. Check Checkout page
        url_checkout = "http://localhost:3000/checkout?product=enterprise-agency-website-cms"
        print(f"Loading {url_checkout} ...")
        await page.goto(url_checkout, wait_until="networkidle")

        page_content = await page.content()
        assert "GST" not in page_content, "ERROR: 'GST' found on checkout page!"
        print("✓ Confirmed: 'GST' is completely absent from Checkout page!")

        summary_box = page.locator("div:has-text('Order Summary')").last
        out_checkout = r"C:\Users\NEHA ENTERPRISES\.gemini\antigravity\brain\fdfa4813-5675-49ed-95d8-f63766b2350d\verified_checkout_no_gst.png"
        await summary_box.screenshot(path=out_checkout)
        print("Saved checkout snapshot:", out_checkout)

        # 2. Check Product Detail page
        url_prod = "http://localhost:3000/products/enterprise-agency-website-cms"
        print(f"Loading {url_prod} ...")
        await page.goto(url_prod, wait_until="networkidle")

        prod_content = await page.content()
        assert "GST" not in prod_content, "ERROR: 'GST' found on product detail page!"
        print("✓ Confirmed: 'GST' is completely absent from Product Detail page!")

        hero_pills = page.locator("div.flex.flex-wrap.gap-x-5").first
        out_hero = r"C:\Users\NEHA ENTERPRISES\.gemini\antigravity\brain\fdfa4813-5675-49ed-95d8-f63766b2350d\verified_product_no_gst.png"
        await hero_pills.screenshot(path=out_hero)
        print("Saved product detail pills snapshot:", out_hero)

        await browser.close()
    print("All GST removal verifications passed with 100% success!")

if __name__ == "__main__":
    asyncio.run(main())
