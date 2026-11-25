import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel="msedge", headless=True)
        page = await browser.new_page(viewport={'width': 1400, 'height': 900})

        await page.goto("http://localhost:3000/products/enterprise-agency-website-cms", wait_until="networkidle")

        gallery_imgs = await page.query_selector_all("section:has-text('Product Interface Gallery') img")
        print("Gallery imgs count:", len(gallery_imgs))
        for i, img in enumerate(gallery_imgs):
            src = await img.get_attribute("src")
            natural_width = await img.evaluate("el => el.naturalWidth")
            natural_height = await img.evaluate("el => el.naturalHeight")
            complete = await img.evaluate("el => el.complete")
            print(f"Img {i}: src={src}, naturalWidth={natural_width}, naturalHeight={natural_height}, complete={complete}")

        # Now click first image to open lightbox
        await gallery_imgs[0].click()
        await asyncio.sleep(1)

        modal_img = await page.query_selector("div.fixed.inset-0 img")
        if modal_img:
            src = await modal_img.get_attribute("src")
            natural_width = await modal_img.evaluate("el => el.naturalWidth")
            natural_height = await modal_img.evaluate("el => el.naturalHeight")
            client_rect = await modal_img.evaluate("el => el.getBoundingClientRect()")
            complete = await modal_img.evaluate("el => el.complete")
            print(f"Modal Img: src={src}, naturalWidth={natural_width}, naturalHeight={natural_height}, complete={complete}, rect={client_rect}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
