import asyncio
import os
from playwright.async_api import async_playwright

ARTIFACT_DIR = r"C:\Users\NEHA ENTERPRISES\.gemini\antigravity\brain\fdfa4813-5675-49ed-95d8-f63766b2350d"

PRODUCTS_TO_TEST = [
    {
        "slug": "quickkirana-retail-ecommerce",
        "title": "QuickKirana",
    },
    {
        "slug": "school-management-system",
        "title": "School Management System",
    },
    {
        "slug": "hospital-management-system",
        "title": "Hospital & Clinic Management System",
    },
    {
        "slug": "hospital-clinic-management-system",
        "title": "Hospital & Clinic Management System",
    },
    {
        "slug": "restaurant-management-system",
        "title": "Restaurant Management System",
    },
    {
        "slug": "business-directory-platform",
        "title": "Business Directory Platform",
    },
    {
        "slug": "task-project-management-system",
        "title": "Task & Project Management System",
    },
    {
        "slug": "food-sharing-platform",
        "title": "Food Sharing Platform",
    },
    {
        "slug": "custom-website-mobile-solutions",
        "title": "Custom Website & Mobile App Solutions",
    },
]

async def run_verifications():
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel="msedge", headless=True)
        context = await browser.new_context(viewport={"width": 1440, "height": 900})
        page = await context.new_page()

        print("\n==================================================")
        print("1. VERIFYING ALL PRODUCT ROUTES DIRECTLY")
        print("==================================================")
        for prod in PRODUCTS_TO_TEST:
            url = f"http://localhost:3000/products/{prod['slug']}"
            res = await page.goto(url, wait_until="networkidle")
            assert res.status == 200, f"Failed: {url} returned HTTP {res.status}"
            
            # Check title
            h1 = page.locator("h1").first
            await h1.wait_for(timeout=5000)
            text = await h1.text_content()
            print(f"✓ {url} -> HTTP {res.status} | H1: '{text.strip()}'")

            # Check that "404" or "Not Found" is NOT shown
            assert "404" not in await page.title(), f"Page title contains 404 on {url}"
            assert not await page.locator("text='Error 404'").is_visible(), f"Error 404 shown on {url}"

            # Test Refresh on Product Detail Page
            await page.reload(wait_until="networkidle")
            assert not await page.locator("text='Error 404'").is_visible(), f"Error 404 shown after reload on {url}"
            print(f"  ✓ Browser refresh verified for {prod['slug']}")

        print("\n==================================================")
        print("2. VERIFYING UNKNOWN PRODUCT SLUG (PROPER 404)")
        print("==================================================")
        bad_url = "http://localhost:3000/products/completely-invalid-nonexistent-slug-xyz"
        bad_res = await page.goto(bad_url, wait_until="networkidle")
        # In Next.js client router/SSR, bad_res status or rendered 404
        is_404_visible = await page.locator("text='Error 404'").is_visible() or await page.locator("text='Product or Page Not Found'").is_visible()
        print(f"✓ Invalid URL returned HTTP {bad_res.status} | 404 UI Visible: {is_404_visible}")
        assert is_404_visible, "Branded 404 UI was not rendered for invalid product slug"

        # Capture 404 screenshot
        path_404 = os.path.join(ARTIFACT_DIR, "verified_branded_404.png")
        await page.screenshot(path=path_404)
        print(f"✓ Saved 404 screenshot to {path_404}")

        print("\n==================================================")
        print("3. VERIFYING 'EXPLORE PRODUCT' BUTTONS ON HOMEPAGE")
        print("==================================================")
        await page.goto("http://localhost:3000", wait_until="networkidle")
        services_section = page.locator("#services")
        await services_section.scroll_into_view_if_needed()
        await page.wait_for_timeout(1000)

        explore_buttons = page.locator("a:has-text('Explore Product')")
        btn_count = await explore_buttons.count()
        print(f"Found {btn_count} 'Explore Product' buttons on homepage")
        assert btn_count >= 8, f"Expected at least 8 product cards, found {btn_count}"

        # Click first 'Explore Product' button (QuickKirana)
        first_btn = explore_buttons.first
        href = await first_btn.get_attribute("href")
        print(f"First Explore Product button links to: {href}")
        await first_btn.scroll_into_view_if_needed()
        await page.wait_for_timeout(500)
        
        await first_btn.click()
        await page.wait_for_url("**/products/**", timeout=10000)
        assert "/products/" in page.url, f"Did not navigate to product page, current URL: {page.url}"
        assert not await page.locator("text='Error 404'").is_visible(), "404 encountered after clicking Explore Product"
        print(f"✓ Successfully navigated to: {page.url} without 404")

        # Capture product detail screenshot
        path_prod_detail = os.path.join(ARTIFACT_DIR, "verified_product_detail_page.png")
        await page.screenshot(path=path_prod_detail)
        print(f"✓ Saved product detail screenshot to {path_prod_detail}")

        print("\n==================================================")
        print("4. VERIFYING 'WHY CHOOSE DIGITAL CROWD TECH' SECTION")
        print("==================================================")
        await page.goto("http://localhost:3000#why-choose", wait_until="networkidle")
        await page.wait_for_timeout(1000)

        # Check section visibility
        why_section = page.locator("#why-choose")
        await why_section.scroll_into_view_if_needed()
        assert await why_section.is_visible(), "'#why-choose' section not visible"

        # Check Heading
        h2 = page.locator("h2:has-text('Why Choose Digital Crowd Tech?')").first
        await h2.wait_for(timeout=5000)
        assert await h2.is_visible(), "Heading 'Why Choose Digital Crowd Tech?' not visible"
        print("✓ Section Heading verified: 'Why Choose Digital Crowd Tech?'")

        # Check Subtitle
        sub = page.locator("text='We combine technology, creativity, and innovation to build digital solutions that help businesses grow, operate efficiently, and stay ahead.'").first
        assert await sub.is_visible(), "Subtitle not visible"
        print("✓ Subtitle verified")

        # Verify All 6 Content Cards
        required_cards = [
            ("Customized Solutions", "We develop solutions according to your business requirements instead of forcing you to use generic software."),
            ("Modern Technology", "We use modern technologies and scalable architecture to build reliable digital products."),
            ("User-Friendly Experience", "We focus on intuitive interfaces, smooth navigation, and responsive experiences across devices."),
            ("Complete Digital Solutions", "From websites and applications to business management systems, we provide integrated digital solutions."),
            ("Reliable Support", "We help clients with implementation, troubleshooting, maintenance, and technical support."),
            ("Business-Focused Approach", "We understand business requirements and develop technology that improves productivity and customer experience.")
        ]

        for title, desc in required_cards:
            card_title = page.locator(f"h3:has-text('{title}')").first
            assert await card_title.is_visible(), f"Card '{title}' not visible"
            card_desc = page.locator(f"text='{desc}'").first
            assert await card_desc.is_visible(), f"Description for '{title}' not visible"
            print(f"  ✓ Card verified: '{title}' with complete description")

        # Capture Desktop screenshot of Why Choose Section
        path_why_desktop = os.path.join(ARTIFACT_DIR, "verified_why_choose_desktop.png")
        await page.screenshot(path=path_why_desktop)
        print(f"✓ Saved Why Choose desktop screenshot to {path_why_desktop}")

        # Verify Mobile Viewport for Why Choose Section
        context_mobile = await browser.new_context(viewport={"width": 375, "height": 812}, is_mobile=True)
        page_mobile = await context_mobile.new_page()
        await page_mobile.goto("http://localhost:3000#why-choose", wait_until="networkidle")
        await page_mobile.wait_for_timeout(1000)

        # Confirm all 6 cards render on mobile
        for title, _ in required_cards:
            mobile_card = page_mobile.locator(f"h3:has-text('{title}')").first
            assert await mobile_card.is_visible(), f"Mobile Card '{title}' not visible"

        path_why_mobile = os.path.join(ARTIFACT_DIR, "verified_why_choose_mobile.png")
        await page_mobile.screenshot(path=path_why_mobile)
        print(f"✓ Saved Why Choose mobile screenshot to {path_why_mobile}")

        print("\n==================================================")
        print("ALL VERIFICATIONS COMPLETED SUCCESSFULLY! 🎉")
        print("==================================================")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run_verifications())
