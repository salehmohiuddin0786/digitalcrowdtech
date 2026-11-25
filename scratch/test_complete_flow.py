import asyncio
import os
from playwright.async_api import async_playwright

ARTIFACT_DIR = r"C:\Users\NEHA ENTERPRISES\.gemini\antigravity\brain\fdfa4813-5675-49ed-95d8-f63766b2350d"

async def run_tests():
    async with async_playwright() as p:
        # Launch browser using msedge channel
        browser = await p.chromium.launch(channel="msedge", headless=True)
        
        # ----------------------------------------------------
        # 1. TEST HOMEPAGE SHOWCASE (DESKTOP & MOBILE)
        # ----------------------------------------------------
        print("\n--- 1. Testing Homepage Showcase ---")
        context_desktop = await browser.new_context(viewport={"width": 1440, "height": 900})
        page = await context_desktop.new_page()
        
        await page.goto("http://localhost:3000", wait_until="networkidle")
        
        # Check Section Title
        heading_elem = page.locator("text='Explore Our Digital Products'").first
        await heading_elem.wait_for(timeout=10000)
        assert await heading_elem.is_visible(), "Heading 'Explore Our Digital Products' not found"
        print("✓ Section Title verified: 'Explore Our Digital Products'")
        
        # Scroll to services/products section
        services_section = page.locator("#services")
        await services_section.scroll_into_view_if_needed()
        await page.wait_for_timeout(1000)
        
        # Capture Desktop screenshot of Explore Products
        dest_path = os.path.join(ARTIFACT_DIR, "desktop_explore_products.png")
        await page.screenshot(path=dest_path)
        print(f"✓ Saved desktop screenshot: {dest_path}")
        
        # Mobile view of Homepage
        context_mobile = await browser.new_context(viewport={"width": 375, "height": 812}, is_mobile=True)
        page_mobile = await context_mobile.new_page()
        await page_mobile.goto("http://localhost:3000#services", wait_until="networkidle")
        await page_mobile.wait_for_timeout(1000)
        
        dest_mobile = os.path.join(ARTIFACT_DIR, "mobile_explore_products.png")
        await page_mobile.screenshot(path=dest_mobile)
        print(f"✓ Saved mobile screenshot: {dest_mobile}")
        
        # ----------------------------------------------------
        # 2. TEST PRODUCT DETAIL PAGE (/products/[slug])
        # ----------------------------------------------------
        print("\n--- 2. Testing Product Detail Page ---")
        await page.goto("http://localhost:3000/products/quickkirana-retail-ecommerce", wait_until="networkidle")
        
        # Verify Title & Badges
        title_elem = page.locator("h1:has-text('QuickKirana')").first
        assert await title_elem.is_visible(), "Product title not visible"
        print("✓ Product Detail Title verified: QuickKirana")
        
        # Verify Overview section
        overview_elem = page.locator("text='Comprehensive Platform Overview'").first
        assert await overview_elem.is_visible(), "Overview section not found"
        print("✓ Overview Section verified")
        
        # Verify Gallery & Modal Lightbox
        gallery_item = page.locator("text='Product Interface Gallery'").first
        await gallery_item.scroll_into_view_if_needed()
        await page.wait_for_timeout(500)
        
        # Click first screenshot to trigger lightbox
        first_shot = page.locator(".aspect-\\[16\\/10\\]").first
        await first_shot.click()
        await page.wait_for_timeout(500)
        
        # Verify lightbox is visible
        lightbox_close = page.locator("button[aria-label='Close Lightbox']")
        assert await lightbox_close.is_visible(), "Lightbox not open"
        print("✓ Modal Lightbox opened successfully")
        
        # Take lightbox screenshot
        lb_path = os.path.join(ARTIFACT_DIR, "product_detail_lightbox.png")
        await page.screenshot(path=lb_path)
        print(f"✓ Saved lightbox screenshot: {lb_path}")
        
        # Close lightbox
        await lightbox_close.click(force=True)
        await page.wait_for_timeout(500)
        
        # Verify Pricing section
        pricing_elem = page.locator("#pricing")
        await pricing_elem.scroll_into_view_if_needed()
        assert await page.locator("text='Predictable Pricing. Zero Hidden Fees.'").is_visible(), "Pricing section not found"
        print("✓ Transparent Pricing tiers verified")
        
        # Verify Related Products carousel
        related_elem = page.locator("text='Explore More Products'").first
        assert await related_elem.is_visible(), "Related products carousel not found"
        print("✓ 'Explore More Products' carousel verified")
        
        # Verify Business Contact section
        contact_elem = page.locator("text='Interested in This Product?'").first
        assert await contact_elem.is_visible(), "Business contact section not found"
        print("✓ 'Interested in This Product?' contact section verified")
        
        # Capture full detail desktop screenshot
        prod_detail_path = os.path.join(ARTIFACT_DIR, "product_detail_desktop.png")
        await page.screenshot(path=prod_detail_path)
        print(f"✓ Saved product detail screenshot: {prod_detail_path}")
        
        # ----------------------------------------------------
        # 3. TEST CHECKOUT FLOW WITH PHONEPE UPI
        # ----------------------------------------------------
        print("\n--- 3. Testing Checkout & PhonePe Flow ---")
        await page.goto("http://localhost:3000/checkout?product=quickkirana-retail-ecommerce&plan=Starter%20Storefront", wait_until="networkidle")
        
        # Fill in Customer Form
        await page.fill("input[placeholder='e.g. Rahul Sharma']", "Vikram Patel")
        await page.fill("input[placeholder='you@company.com']", "vikram.patel@example.com")
        await page.fill("input[placeholder='10-digit mobile number']", "9876543210")
        await page.fill("input[placeholder='e.g. Apex Retail Pvt Ltd']", "Patel Supermarket LLP")
        await page.fill("textarea[placeholder='Street, City, State, PIN Code']", "Plot 42, Silicon Ridge, Madhapur, Hyderabad, 500081")
        await page.check("input[type='checkbox']")
        
        # Save Step 1 screenshot
        step1_path = os.path.join(ARTIFACT_DIR, "checkout_step1.png")
        await page.screenshot(path=step1_path)
        print(f"✓ Saved checkout step 1 screenshot: {step1_path}")
        
        # Click Proceed to PhonePe Payment
        await page.click("button:has-text('Proceed to PhonePe Payment')")
        
        # Wait for Step 2 PhonePe UI
        phonepe_header = page.locator("text='PhonePe Business UPI Payment'").first
        await phonepe_header.wait_for(timeout=10000)
        assert await phonepe_header.is_visible(), "PhonePe payment view not visible"
        print("✓ Step 2 PhonePe Business Payment interface displayed")
        
        # Verify Merchant VPA is displayed
        assert await page.locator("text='9985960692@ybl'").first.is_visible(), "Merchant VPA not displayed"
        print("✓ PhonePe Merchant VPA 9985960692@ybl verified")
        
        # Save PhonePe QR screenshot
        qr_path = os.path.join(ARTIFACT_DIR, "checkout_phonepe_qr.png")
        await page.screenshot(path=qr_path)
        print(f"✓ Saved PhonePe QR screenshot: {qr_path}")
        
        # Enter 12-digit UTR reference and submit
        await page.fill("input[placeholder*='12-digit']", "432890123456")
        await page.click("button:has-text('Confirm & Complete Order')")
        
        # Wait for Order Confirmation page
        await page.wait_for_url("**/order-confirmation?orderNumber=**", timeout=15000)
        confirm_title = page.locator("text='Payment Submitted for Verification'").first
        await confirm_title.wait_for(timeout=10000)
        assert await confirm_title.is_visible(), "Order confirmation title not visible"
        print("✓ Navigated to Order Confirmation page with verified order receipt")
        
        # Save Confirmation screenshot
        confirm_path = os.path.join(ARTIFACT_DIR, "order_confirmation.png")
        await page.screenshot(path=confirm_path)
        print(f"✓ Saved order confirmation receipt screenshot: {confirm_path}")
        
        # ----------------------------------------------------
        # 4. TEST ADMIN ORDERS VIEW
        # ----------------------------------------------------
        print("\n--- 4. Testing Admin Orders View ---")
        # Log in via admin login page
        await page.goto("http://localhost:3000/admin", wait_until="networkidle")
        await page.fill("input[type='email']", "admin@digitalcrowdtech.in")
        await page.fill("input[type='password']", "admin123")
        await page.click("button[type='submit']")
        await page.wait_for_timeout(1500)
        
        # Navigate to Admin Orders Console
        await page.goto("http://localhost:3000/admin/orders", wait_until="networkidle")
        
        admin_header = page.locator("text='Customer Orders & PhonePe Payments'").first
        await admin_header.wait_for(timeout=10000)
        assert await admin_header.is_visible(), "Admin orders header not visible"
        print("✓ Admin Orders Console loaded successfully")
        
        # Verify the order appears in the table
        order_row = page.locator("text='Vikram Patel'").first
        await order_row.wait_for(timeout=10000)
        assert await order_row.is_visible(), "Placed order not found in admin table"
        print("✓ Newly placed customer order verified in Admin Table")
        
        admin_path = os.path.join(ARTIFACT_DIR, "admin_orders_console.png")
        await page.screenshot(path=admin_path)
        print(f"✓ Saved admin orders screenshot: {admin_path}")
        
        print("\nALL 4 END-TO-END VERIFICATION TESTS PASSED SUCCESSFULLY! 🎉\n")
        
        await browser.close()

if __name__ == "__main__":
    asyncio.run(run_tests())
