import asyncio
import os
import glob
from playwright.async_api import async_playwright

PROD_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "Frontend", "my-app", "public", "products"))

async def main():
    svg_files = glob.glob(os.path.join(PROD_DIR, "*.svg"))
    print(f"Found {len(svg_files)} SVG files in {PROD_DIR}")

    async with async_playwright() as p:
        browser = await p.chromium.launch(channel="msedge", headless=True)
        # Create page with exact 900x550 viewport matching SVG viewBox
        page = await browser.new_page(viewport={"width": 900, "height": 550}, device_scale_factor=2)

        for svg_path in svg_files:
            base_name = os.path.splitext(os.path.basename(svg_path))[0]
            png_path = os.path.join(PROD_DIR, f"{base_name}.png")
            
            # Read SVG content
            with open(svg_path, "r", encoding="utf-8") as f:
                svg_content = f.read()

            html_content = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    * {{ margin: 0; padding: 0; box-sizing: border-box; }}
                    body {{ width: 900px; height: 550px; overflow: hidden; background: transparent; }}
                    svg {{ width: 900px; height: 550px; display: block; }}
                </style>
            </head>
            <body>
                {svg_content}
            </body>
            </html>
            """

            await page.set_content(html_content, wait_until="load")
            # Take screenshot directly to png_path
            await page.screenshot(path=png_path, type="png", omit_background=False)
            file_size = os.path.getsize(png_path)
            print(f"Rendered {base_name}.png ({file_size} bytes)")

        await browser.close()
    print("All SVGs converted to real binary PNGs successfully!")

if __name__ == "__main__":
    asyncio.run(main())
