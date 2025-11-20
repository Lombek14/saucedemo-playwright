import { test, expect } from '../fixtures/hybridTest';

test.describe('@api Mahovastore hybrid API + UI tests', () => {
    test('Hybrid: use apiUser fixture to drive Mahovastore UI', async ({ apiUser, page }) => {
        const firstName = apiUser.first_name;
        const lastName = apiUser.last_name;
        const email = apiUser.email;

        // ---- UI side on Mahovastore ----Homepage
        await page.goto('https://mahovastore.com', { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle(/Mahovastore/i);

        await page.getByRole('button', { name: /Search/i }).click();

        const searchInput = page.getByRole('searchbox', { name: 'Search products' });
        const clickSearchBtn = page.getByRole('button', { name: 'Submit' });

        await expect(searchInput).toBeVisible();

        //fill is coming from API data
        await searchInput.fill(firstName);
        await expect(searchInput).toHaveValue(firstName);
        await clickSearchBtn.click();

        // expected zero result for "Janet"
        await page.waitForLoadState('domcontentloaded');
        const results = page.getByRole('heading', { name: 'Found 0 results for "Janet"' });
        await expect(results).toBeVisible();

        //search again valid product on the same searchbox
        const InputBox = page.getByRole('textbox', { name: 'Search products' });
        await expect(InputBox).toBeVisible();

        await InputBox.click();
        await InputBox.fill('car');
        await expect(InputBox).toHaveValue('car');
        await clickSearchBtn.click();

        await page.waitForLoadState('domcontentloaded');

        const carResultsList = page.getByRole('heading', { name: 'Found 83 results for "car"' });
        await expect(carResultsList).toBeVisible();

        // choose a product from product list
        await page.getByLabel('Car Cleaning Set - Leather').click();

        const image = page.getByRole('img', { name: 'Car Leather Cleaner Set -' }).nth(1);
        const imgDesc = page.getByRole('heading', { name: 'Car Cleaning Set - Leather' });

        await expect(image).toBeVisible();
        await expect(imgDesc).toBeVisible();

        await page.getByRole('button', { name: 'Add to cart' }).click()

        await page.waitForLoadState('domcontentloaded');

        const shoppingCartPage = page.getByRole('heading', { name: /Shopping Cart/i });
        const viewCartBtn = page.getByRole('link', { name: /View Cart/i });

        await page.waitForLoadState('domcontentloaded');

        await expect(shoppingCartPage).toBeVisible();
        await expect(viewCartBtn).toBeVisible();
        await viewCartBtn.click();

        await page.waitForLoadState('domcontentloaded');

        // Validate the shopping cart and the quantity of the cart badge 
        const checkoutBtn = page.getByRole('button', { name: /CHECK OUT/i });
        const cartBadge = page.getByRole('link', { name: '1' });
        await expect(shoppingCartPage).toBeVisible();
        await expect(cartBadge).toHaveText(/[0-9]/);

        await checkoutBtn.click();

        await page.waitForLoadState('domcontentloaded');

        // fill contact email and first/last name with API data to Delivery address
        const expressCheckout = page.getByRole('heading', { name: /Express checkout/i });
        const contact = page.getByRole('heading', { name: /Contact/i });
        const delivery = page.getByRole('heading', { name: /Delivery/i });

        await expect(expressCheckout).toBeVisible();
        await expect(contact).toBeVisible();

        const contactEmail = page.getByRole('textbox', { name: 'Email or mobile phone number' });
        const firstNameInput = page.getByRole('textbox', { name: 'First name' });
        const lastNameInput = page.getByRole('textbox', { name: 'Last name' });

        await contactEmail.click();
        await contactEmail.fill(email);
        await expect(contactEmail).toHaveValue('janet.weaver@reqres.in');

        await expect(delivery).toBeVisible();
        await expect(firstNameInput).toBeVisible();

        await firstNameInput.click();
        await firstNameInput.fill(firstName);
        await expect(firstNameInput).toHaveValue('Janet');

        await expect(lastNameInput).toBeVisible();
        await lastNameInput.click();
        await lastNameInput.fill(lastName);
        await expect(lastNameInput).toHaveValue('Weaver');

        //Go back to cart (without placing any order)
        const returnToCart = page.getByRole('link', { name: 'Cart' });
        await expect(returnToCart).toBeVisible();
        await returnToCart.click();

        await page.waitForLoadState('domcontentloaded');

        const product = page.getByText('Product', { exact: true });
        await expect(product).toBeVisible();

        //Remove item from cart
        const removeProduct = page.getByText(/Remove/i);
        await expect(removeProduct).toBeVisible();
        await removeProduct.click();

        await page.waitForLoadState('domcontentloaded');

        //Validate empty cart
        const emptyCartText = page.getByRole('heading', { name: 'Your cart is currently empty' });
        await expect(emptyCartText).toBeVisible();

        //Click "BACK TO SHOPPING"
        const backToShopping = page.getByRole('link', { name: /Back to shopping/i })
        await expect(backToShopping).toBeVisible();
        await backToShopping.click();

        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL('https://mahovastore.com/collections/all');


    });


});